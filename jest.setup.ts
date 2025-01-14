import { TestEnvironment } from './test/test-setup';
// Inicializa o ambiente de teste
beforeAll(async () => {
  await TestEnvironment.setup();
});
// Encerra o ambiente de teste
afterAll(async () => {
  await TestEnvironment.tearDown();
});
// Limpa o banco de dados antes de cada teste
beforeEach(() => {
  TestEnvironment.resetDatabase();
});
