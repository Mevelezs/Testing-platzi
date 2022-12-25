const { division, multiply, subtraction } = require('./02-operations');

test('divide a / b', () => {
  expect(division(5, 2)).toBe(2.5);
  expect(division(4, 0)).toBeNull();
});

test('multiply a * b', () => {
  expect(multiply(3, 5)).toBe(15);
  expect(multiply(6, 0)).toBe(0);
});

test('subtract a - b', () => {
  expect(subtraction(4, 2)).toBe(2);
  expect(subtraction(3, 10)).toBe(-7);
});

const sum = require('./01-sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
