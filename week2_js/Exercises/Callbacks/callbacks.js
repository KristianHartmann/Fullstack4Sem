const caluclate = (x, y, operation) => {
  return operation(x, y);
};

const add = (x, y) => {
  return x + y;
};
const subtract = (x, y) => {
  return x - y;
};
const multiply = (x, y) => {
  return x * y;
};

const division = (x, y) => {
  return x / y;
};
console.log(caluclate(1, 2, add));
console.log(caluclate(1, 2, subtract));
console.log(caluclate(1, 2, multiply));
console.log(caluclate(1, 2, division));
