const supertest = require('supertest');
const createApp = require('../src/app.js');
const { models } = require('../src/db/sequelize.js');
const { upSeed, downSeed } = require('./utils/umzug.js');

const mockSendMail = jest.fn(); // función espía ( mira si el método fua llamado )

jest.mock('nodemailer', () => {
  return {
    createTransport: jest.fn().mockImplementation(() => {// reeplaza a la función real createTeansport
      // cuando se ejecute create tranport devuelve lo que hay auí y no lo de la función real (72 auth.service.js)
      return {
        sendMail: mockSendMail // sendMail está en (81 auth.service.js)
      }
    })
  }

}); // con esto la prueba sabe que cuando se llama a node-mailer no lo llame realmente sino al mock

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

  describe('POST /recovery', () => {
    
    beforeAll(() => {
      mockSendMail.mockClear() // limpiamos el mock (buena práctica)
    });

    test('shoud return Bad request, status code 401 with invalid email', async () => {
      const inputData = { email: 'fakemail@mail.com', password: 'admin123' };

      const { statusCode, body } = await api
        .post('/api/v1/auth/recovery')
        .send(inputData); // no olvidar el / antes del path

      expect(statusCode).toBe(401);
      expect(body.message).toMatch(/Unauthorized/);
    });

    test('shoud return send email', async () => {

      const user = await models.User.findByPk('1');

      const inputData = { email: user.email };

      mockSendMail.mockResolvedValue(true); // resuelve con una promesa y le da valor al sendMail cuando es llamado

      const { statusCode, body } = await api
        .post('/api/v1/auth/recovery')
        .send(inputData); // no olvidar el / antes del path

      expect(statusCode).toBe(200);
      expect(body.message).toEqual('mail sent');
      expect(mockSendMail).toHaveBeenCalled(); // comprueba si la fn fué llamada (sendMail)
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
