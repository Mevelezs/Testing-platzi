/* eslint-disable max-len */
/*
esta en realidad es una prueba de integración; el archivo no lo llamamos con tal porque en la configuración del json le pusimos la extensión .e2e.js
*/
const request = require('supertest');

const mockGetAll = jest.fn(); // si se coloca esta linea debajo de createApp falla ---> ???

const createApp = require('../src/app');

const { generateManyBooks } = require('../src/fakes/book.feke');

jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

describe('Test for books', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('test for [GET] /api/v1/books', () => {
    test('should return a list books', () => {
      // Arrange
      const fakeBooks = generateManyBooks(3);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      return request(app)
        .get('/api/v1/books') // ojo con la ruta, tiene que llevar el / delante.
        .expect(200)
        .then(({ body }) => {
          // Assert
          console.log(body);
          expect(body.length).toEqual(fakeBooks.length);
        });
    });
  });
});
