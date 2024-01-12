/* eslint-disable max-len */

/*
Para hacer pruebas e2e hay creamos una nueva coneccion a una base de datos de pruebas, inyectamos unas semillas de información y que serviran como data de prueba y las extraemos par a mirar el comportamiento de los endpoints.

Como se crea una nueba conección los test anteriores no van a pasar
*/

/* eslint-disable max-len */
/*
esta en realidad es una prueba de integración; el archivo no lo llamamos con tal porque en la configuración del json le pusimos la extensión .e2e.js
*/
const request = require('supertest');
const { MongoClient } = require('mongodb'); // trayendo el driver de mongo para la conección

const createApp = require('../src/app');
const { config } = require('../src/config');

// const { generateManyBooks } = require('../src/fakes/book.feke');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

describe('Test for books', () => {
  let app = null;
  let server = null;
  let database = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(3002);
    const client = new MongoClient(MONGO_URI, {
      // generando conección con el cliente de mongo con la url
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect(); // conectando
    database = client.db(DB_NAME); // estableciendo la db
  });

  describe('test for [GET] /api/v1/books', () => {
    test('should return a list books', async () => {
      // Arrange
      const seedData = await database.collection('books').insertMany([
        // se podrían generar dinamicamente con fake
        {
          name: 'Book 1',
          year: 1998,
          author: 'Saramago',
        },
        {
          name: 'Book 2',
          year: 1999,
          author: 'Saramago',
        },
      ]);
      console.log(seedData);
      // Act
      return request(app)
        .get('/api/v1/books') // ojo con la ruta, tiene que llevar el / delante.
        .expect(200)
        .then(({ body }) => {
          // Assert
          console.log(body);
          expect(body.length).toEqual(seedData.insertedCount);
        });
    });
  });

  afterAll(async () => {
    await server.close();
    await database.dropDatabase(); // borra la info de la db; debería ser en un afteEach para que cada prueba tenga su seed de datos.
  });
});
