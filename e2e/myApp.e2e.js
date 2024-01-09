const supertest = require('supertest');
const createApp = require('../src/app.js');

describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    app = createApp();

    server = app.listen(7000);

    api = supertest(app);
  });

  test('GET /', async () => {
    const response = await api.get('/');
    console.log(response);
    expect(response).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Hola mi server en express');
    expect(response.headers['content-type']).toMatch(/text/);
  });

  afterEach(() => {
    server.close();
  });
});
