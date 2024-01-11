const supertest = require('supertest');
const createApp = require('../src/app.js');
const { models } = require('../src/db/sequelize.js');
const { upSeed, downSeed } = require('./utils/seed.js');

describe('test for login path', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();

    server = app.listen(7000);

    api = supertest(app);

    await upSeed();
  });

  describe('POST /login', () => {
    test('shoud return Bad request, status code 401 with invalid email', async () => {
      const inputData = { email: 'fakemail@mail.com', password: 'admin123' };

      const { statusCode, body } = await api
        .post('/api/v1/auth/login')
        .send(inputData); // no olvidar el / antes del path

      expect(statusCode).toBe(401);
      expect(body.message).toMatch(/Unauthorized/);
    });

    test('shoud return status code 200', async () => {
      const user = await models.User.findByPk('1');

      const inputData = { email: user.email, password: 'admin123' }; // la contraseña está hasehada hay que saberla (se arreglará)

      const { statusCode, body } = await api
        .post('/api/v1/auth/login')
        .send(inputData); // no olvidar el / antes del path

      expect(statusCode).toBe(200);
      expect(body.user.email).toEqual(user.email);
      expect(body.access_token).toBeTruthy();
      expect(body.user.password).toBeUndefined();
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
