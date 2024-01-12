const supertest = require('supertest');
const createApp = require('../src/app.js');
const { models } = require('../src/db/sequelize.js');
const { upSeed, downSeed } = require('./utils/umzug.js');

describe('test for categories path', () => {
  let app = null;
  let server = null;
  let api = null;
  let access_token = null;

  beforeAll(async () => {
    app = createApp();

    server = app.listen(7000);

    api = supertest(app);

    await upSeed();
  });

  describe('POST /categories with admin user', () => {
    beforeAll(async () => {
      const user = await models.User.findByPk('1'); // traigo el user de la db

      const inputData = {
        email: user.email,
        password: 'admin123',
      };
      const loginResponse = await api
        .post('/api/v1/auth/login')
        .send(inputData); // nos logeamos

      const { body } = loginResponse;
      access_token = body.access_token; // sacamos el token
    });

    test('shoud return Bad request, status code 401', async () => {
      const inputData = {
        name: 'New Category',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
      };

      const { statusCode } = await api
        .post('/api/v1/categories')
        .send(inputData);

      expect(statusCode).toBe(401);
    });

    test('shoud return status code 201 and a new category', async () => {
      const inputData = {
        name: 'New Category',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
      };

      const { statusCode, body } = await api
        .post('/api/v1/categories')
        .set({ Authorization: `Bearer ${access_token}` })
        .send(inputData);

      expect(statusCode).toBe(201);

      const category = await models.Category.findByPk(body.id);

      expect(category.name).toEqual(inputData.name);
      expect(category.image).toEqual(inputData.image);
    });

    afterAll(() => {
      access_token = null;
    });
  });

  describe('POST /categories with customer user', () => {
    beforeAll(async () => {
      const user = await models.User.findByPk('2'); // traigo el user de la db

      const inputData = {
        email: user.email,
        password: 'customer123',
      };
      const loginResponse = await api
        .post('/api/v1/auth/login')
        .send(inputData); // nos logeamos

      const { body } = loginResponse;
      access_token = body.access_token; // sacamos el token
    });

    test('shoud return Bad request, status code 401 without token', async () => {
      const inputData = {
        name: 'New Category',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
      };

      const { statusCode } = await api
        .post('/api/v1/categories')
        .send(inputData);

      expect(statusCode).toBe(401);
    });

    test('shoud return status code 401, with customer token', async () => {
      const inputData = {
        name: 'New Category',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
      };

      const { statusCode } = await api
        .post('/api/v1/categories')
        .set({ Authorization: `Bearer ${access_token}` })
        .send(inputData);

      expect(statusCode).toBe(401);
    });

    afterAll(() => {
      access_token = null;
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
