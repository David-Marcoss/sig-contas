import { GenericContainer } from 'testcontainers';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { AppModule } from '../../../app.module';
import { execSync } from 'child_process';

let container;
let prismaClient: PrismaClient;
let app: INestApplication;
let urlConnection: string;

beforeAll(async () => {
  container = await new GenericContainer('postgres:latest')
    .withEnvironment({
      POSTGRES_PASSWORD: '12356',
      POSTGRES_USER: 'root',
      POSTGRES_DB: 'dbTest',
    })
    .withExposedPorts(5432)
    .start();

  const mappedPort = container.getMappedPort(5432);
  urlConnection = `postgresql://root:12356@localhost:${mappedPort}/dbTest`;
  process.env.DATABASE_URL = urlConnection;

  prismaClient = new PrismaClient({
    datasources: {
      db: {
        url: urlConnection,
      },
    },
  });

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
}, 30000);

afterAll(async () => {
  await prismaClient.$disconnect();
  await container.stop();
});

afterEach(() => {
  jest.restoreAllMocks();
});

beforeEach(async () => {
  // Limpa o banco e aplica as migrações
  execSync(`npx prisma migrate reset --force --skip-generate --skip-seed`, {
    env: {
      ...process.env,
      DATABASE_URL: urlConnection,
    },
  });
});

describe('[/user] POST', () => {
  it('should create a user', async () => {
    const userData = {
      nome: 'John',
      telefone: '+5511999999999',
      salario: 1000,
    };

    const response = await request(app.getHttpServer())
      .post('/api/v1/user')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(userData.nome);
    expect(response.body.telefone).toBe(userData.telefone);
    expect(response.body.salario).toBe(userData.salario);
  });
});
