const supertest = require('supertest');
const createApp = require('../src/app.js');
const { models } = require('../src/db/sequelize.js');
const { upSeed, downSeed } = require('./utils/umzug.js');

describe('test for products path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();

    server = app.listen(7000);

    api = supertest(app);

    await upSeed();
  });

  describe('GET /products ', () => {
    test('shoud return products', async () => {
      const { statusCode, body } = await api.get('/api/v1/products');

      const products = await models.Product.findAll();

      expect(statusCode).toBe(200);
      expect(body.length).toEqual(products.length);
      expect(body[0].category).toBeTruthy(); // para asegurarnos de que está trayendo la relación
    });

    test('shoud return 2 products with limit = 2 and offset = 0', async () => {
      // paginación
      const limit = 2;
      const offset = 0;
      const { statusCode, body } = await api.get(
        `/api/v1/products?limit=${limit}&offset=${offset}`
      );

      expect(statusCode).toBe(200);
      expect(body.length).toEqual(2);
    });

    test('shoud return 2 products with limit = 2 and offset = 2', async () => {
      // paginación
      const limit = 2;
      const offset = 2;
      const { statusCode, body } = await api.get(
        `/api/v1/products?limit=${limit}&offset=${offset}`
      );

      expect(statusCode).toBe(200);
      expect(body.length).toEqual(1);
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
