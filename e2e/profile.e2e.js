const supertest = require('supertest');

const createApp = require('../src/app.js');
const { models } = require('../src/db/sequelize.js');
const { upSeed, downSeed } = require('./utils/seed.js');

describe('test for profile path', () => {
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

  describe('GET /my-user', () => {
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

    test('shoud return Bad request', async () => {
      const { statusCode } = await api.get('/api/v1/profile/my-user').set({
        Authorization: 'Bearer º12123e',
      });
      expect(statusCode).toEqual(401);
    });

    test('shoud return a user with an access token valid', async () => {
      const user = await models.User.findByPk('1'); // traigo el user de la db

      const { statusCode, body } = await api
        .get('/api/v1/profile/my-user')
        .set({
          Authorization: `Bearer ${access_token}`,
        }); // evaluamos el token
      expect(statusCode).toEqual(200);
      expect(body.email).toEqual(user.email);
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
