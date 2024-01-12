const request = require('supertest');

const createApp = require('../src/app'); // me traigo el app la monto y la pongo a correr

describe('Test for hello endpoint', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    // antes de todo creo el app y la monto
    app = createApp();
    server = app.listen(3001); // toma la app y la pne a correr en un puerto en especifico
  });

  afterAll(async () => {
    // después de todo
    await server.close(); // función de expess para cerr el server (app), es asincrono
  });

  describe('Pruebas for [GET] /', () => {
    test('should return "Hello World!" ', () =>
      request(app) // invoco la app con supertest
        .get('/') // chequeo el endpoint (quiero ir a get / )
        .expect(200) // de lo anterior espero como respuesta un 200
        .then((response) => {
          // espero la respuesta y la chequeo
          expect(response.text).toEqual('Hello World!'); // espero que la respuesta sea un texto igual a Hello World
        })); // para esto la app tiene que estar corriendo
  });

  afterAll(async () => {
    await server.close();
  });
});
