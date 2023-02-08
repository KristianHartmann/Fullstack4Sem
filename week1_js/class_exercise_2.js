function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}
const subtract = (x, y) => {
  return x - y;
};
const square = (x) => {
  return x * x;
};
const divideBy10 = (x) => {
  return x / 10;
};
const calculator = (operator1, operator2, numbers) => {
  return numbers.map((number) => operator2(operator1(number)));
};

function operateOnNumbers(operator, x, y) {
  return operator(x, y);
}

const numbers = [1, 2];
console.log(calculator(square, divideBy10, numbers));
console.log(operateOnNumbers(add, 3, 4)); // 7
console.log(operateOnNumbers(multiply, 3, 4)); // 12
console.log(operateOnNumbers(subtract, 3, 4)); // -1
