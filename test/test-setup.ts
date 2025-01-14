import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

// configura ambiente de teste
export class TestEnvironment {
  private static container: StartedTestContainer;
  static prismaClient: PrismaClient;
  static app: INestApplication;
  static urlConnection: string;

  static async setup(): Promise<void> {
    // Inicia o contêiner do PostgreSQL
    if (!this.container) {
      this.container = await new GenericContainer('postgres:latest')
        .withEnvironment({
          POSTGRES_PASSWORD: '12356',
          POSTGRES_USER: 'root',
          POSTGRES_DB: 'dbTest',
        })
        .withExposedPorts(5432)
        .start();

      const mappedPort = this.container.getMappedPort(5432);
      this.urlConnection = `postgresql://root:12356@localhost:${mappedPort}/dbTest`;
      process.env.DATABASE_URL = this.urlConnection;

      // Inicia o PrismaClient
      this.prismaClient = new PrismaClient({
        datasources: {
          db: {
            url: this.urlConnection,
          },
        },
      });
    }
  }
  // Inicializa a aplicação NestJS
  static async initializeApp(module: any): Promise<void> {
    const moduleRef = await Test.createTestingModule({
      imports: [module],
    }).compile();

    this.app = moduleRef.createNestApplication();
    this.app.useGlobalPipes(new ValidationPipe());
    await this.app.init();
  }
  // Encerra o ambiente de teste
  static async tearDown(): Promise<void> {
    await this.prismaClient.$disconnect();
    if (this.container) {
      await this.container.stop();
    }
  }
  // Limpa o banco de dados e aplica as migrações
  static resetDatabase(): void {
    execSync(`npx prisma migrate reset --force --skip-generate --skip-seed`, {
      env: {
        ...process.env,
        DATABASE_URL: this.urlConnection,
      },
    });
  }
}
