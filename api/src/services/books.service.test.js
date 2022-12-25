const { generateManyBooks, generateOneBook } = require('../fakes/book.feke');
const BooksService = require('./books.service');
// inicio de la simulacion de datos
// si no se construyen los datos fakes, el test va a la base de datos directamente y puede
// cambiar cosas

// const fakeBooks = [
//   {
//     _id: 1,
//     name: 'Harry Poter',
//   },
//   {
//     _id: 2,
//     name: 'Duro de Matar',
//   },
// ];

// const MongoLibStub = {
//   getAll: () => [...fakeBooks],
//   create: () => {},
// };

// jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => MongoLibStub));

// /// fin de la simulación

// describe('Test for books services', () => {
//   let service;

//   beforeEach(() => {
//     service = new BooksService();
//     jest.clearAllMocks();
//   });

//   describe('test for getBooks', () => {
//     test('should return a list of books', async () => {
//       const books = await service.getBooks();
//       console.log(books);
//       expect(books.length).toEqual(2);
//     });

//     test('sholud return a name', async () => {
//       const books = await service.getBooks();
//       console.log(books[0].name);
//       expect(books[0].name).toEqual('Harry Poter');
//     });
//   });
// });

// SPIES
// espiando los métodos e incertando data fake en cada una de las pruebas

const mockGetAll = jest.fn();

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

/// fin de la simulación

describe('Test for books services2', () => {
  let service1;

  beforeEach(() => {
    service1 = new BooksService();
    jest.clearAllMocks();
  });

  describe('test for getBooks', () => {
    test('should return a list of books', async () => {
      // Arrange
      const fakeBooks1 = generateManyBooks(20);
      mockGetAll.mockResolvedValue(fakeBooks1);// inyección de dependencias en el espía.
      // Act
      const books = await service1.getBooks({});
      console.log(books);
      // Asserts
      expect(books.length).toEqual(fakeBooks1.length);
      expect(mockGetAll).toHaveBeenCalled(); // pregunta si fué llamado.
      expect(mockGetAll).toHaveBeenCalledTimes(1);// cuantas veces fue llamado
      expect(mockGetAll).toHaveBeenCalledWith('books', {}); // si llamado con 'books y la query
    });

    test('sholud return a name', async () => {
      const fakeBooks1 = generateOneBook();
      mockGetAll.mockResolvedValue(fakeBooks1);
      const books = await service1.getBooks();
      console.log({ 1: books.name, 2: fakeBooks1.name });
      expect(books.name).toEqual(fakeBooks1.name);
    });
  });
});

/*

Las pruebas del epia y las primeras son incompatibles, ambas usan el mismo estado.
comentar unas para que pasen las otras.

*/
