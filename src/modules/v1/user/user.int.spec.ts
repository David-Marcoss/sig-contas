import { AppModule } from '../../../app.module';
import { TestEnvironment } from '../../../../test/test-setup';
import * as request from 'supertest';

describe('User Module Integration Tests', () => {
  beforeAll(async () => {
    await TestEnvironment.initializeApp(AppModule);
  });

  afterAll(async () => {
    await TestEnvironment.app.close();
  });

  it('should create a user', async () => {
    const userData = {
      nome: 'John',
      telefone: '+5511999999999',
      salario: 1000,
    };

    const response = await request(TestEnvironment.app.getHttpServer())
      .post('/api/v1/user')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(userData.nome);
  });
});
