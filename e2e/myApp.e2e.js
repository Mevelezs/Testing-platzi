const supertest = require('supertest');
const createApp = require('../src/app.js');
const { config } = require('../src/config/config.js');

describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();

    server = app.listen(7000);

    api = supertest(app);
  });

  test('GET /', async () => {
    const response = await api.get('/');
   // console.log(response);
    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Hola mi server en express');
    expect(response.headers['content-type']).toMatch(/text/);
  });

   describe('GET /nueva-ruta', () => {
     test('should return status code 401', async () => {
       const { statusCode } = await api.get('/nueva-ruta');
       expect(statusCode).toEqual(401);
     });

     test('should return status code 401', async () => {
       const { statusCode } = await api.get('/nueva-ruta').set({
         api: '1234',
       });
       expect(statusCode).toEqual(401);
     });

     test('should return status code 200', async () => {
       const { statusCode } = await api.get('/nueva-ruta').set({
         api: config.apiKey,
       });
       expect(statusCode).toEqual(200);
     });
   });

  afterAll(() => {
    server.close();
  });
});
