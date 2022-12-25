const Person = require('./04-person');

describe('Test for person', () => { // set de pruebas
  let person;
  beforeEach(() => { // hace algo antes de las pruebas
    person = new Person('Mauricio', 45, 1.7);
  });

  test('should return down', () => {
    person.weight = 45;
    const imc = person.calcIMC();
    expect(imc).toBe('down');
  });

  test('should return normal', () => {
    person.weight = 62;
    const imc = person.calcIMC();
    expect(imc).toBe('normal');
  });
});
