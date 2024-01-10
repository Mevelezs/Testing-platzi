const supertest = require('supertest');
const createApp = require('../src/app.js');
const { models } = require('../src/db/sequelize.js')

describe('test for user path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();

    server = app.listen(7000);

    api = supertest(app);
  });

  describe('GET /users/{id}', () => {
    test('should return a user', async () => {

      const user = await models.User.findByPk('2'); // trae de la db
      const { statusCode, body } = await api.get(`/api/v1/users/${user.id}`); // trae de la app

      expect(statusCode).toEqual(200); // compara respuesta
      expect(body.id).toEqual(user.id); // compara db y app
      expect(body.email).toMatch(user.email)
    })
  });

  describe('POST /users', () => {
    test('shoud return Bad request, status code 400 with invalid email', async () => {
      const inputData = { email: '-------', password: 'admin123' };

      const { statusCode, body } = await api
        .post('/api/v1/users')
        .send(inputData); // no olvidar el / antes del path
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/email/);
    });

    test('should return Bad request, status code 400 with invalid password ', async () => {
      const inputData = {
        email: 'john@doe.com',
        password: '---',
      };
      const { statusCode, body } = await api
        .post('/api/v1/users')
        .send(inputData);

      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/password/);
    });

    // test('should return valid data with status code 200', async () => {
    //   const inputData = { email: 'mail@mial.co', password: 'admin123' };
    //   const response = await api.post('/api/v1/users').send(inputData);

    //   expect(response.statusCode).toBe(201);
    //   expect(response.body.email).toMatch(`${inputData.email}`);
    // });
  });

  describe('PUt /users', () => {});

  afterAll(() => {
    server.close();
  });
});
