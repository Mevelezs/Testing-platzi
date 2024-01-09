const supertest = require('supertest');
const express = require('express');


describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    app = express();

    app.get('/hello', (req, res) => {
      res.status(200).json({ name: 'mauricio', latName: 'Vélez' });
    });

    server = app.listen(5000);

    api = supertest(app);
  });

  test('GET /hello', async () => {
    const response = await api.get('/hello'); // El api hace un request a la aplicacion en el endpoint dado
    expect(response).toBeTruthy(); // valida si existe o no
    expect(response.statusCode).toEqual(200); // valida el status code
    expect(response.body.name).toEqual('mauricio'); // lo que viene en el cuerpo de la respuesta
    expect(response.headers['content-type']).toMatch(/json/); // Pruebas del formato
  });

  afterEach(() => {
    server.close()
  } )
});
