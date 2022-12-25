// asserttions ó Matchers

test('test obj', () => { // los objetos se chequean con toEqual
  const data = { name: 'Mauricio' };
  data.lastname = 'Vélez';
  expect(data).toEqual({ name: 'Mauricio', lastname: 'Vélez' });
});

test('null', () => {
  const data = null;
  expect(data).toBeNull(); // chequea que el valor sea nulo.
  expect(data).toBeDefined(); // chequea que el valor esté definido.
  expect(data).not.toBeUndefined(); // chequea que sea undefine y con el not lo niega
});

test('booleans', () => {
  expect(true).toEqual(true); // para validar buleanos.
  expect(false).toEqual(false);

  expect(0).toBeFalsy(); // El cero se considera falso.
  expect('').toBeFalsy();

  expect(1).toBeTruthy(); // El 1 es true
});

test('estrings', () => {
  expect('Christop').toMatch(/stop/);
});

test('arrays', () => {
  const numbers = [1, 4, 3, 6];
  expect(numbers).toContain(3); // revisa si el arreglo contiene el numero.
});
