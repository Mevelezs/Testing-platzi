function sum(a, b) {
  return a + b;
}

const multiply = (a, b) => a * b;

const subtraction = (a, b) => a - b;

const division = (a, b) => {
  if (b === 0) return null;
  return a / b;
};

module.exports = {
  sum,
  multiply,
  subtraction,
  division,
};
