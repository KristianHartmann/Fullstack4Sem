const caluclate = (x, y, operation) => {
  return new Promise((resolve, reject) => {
    if (typeof x !== "number" || typeof y !== "number") {
      reject("x and y must be numbers");
    }
    if (typeof operation !== "function") {
      reject("operation must be a function");
    }
    if (operation === division && y === 0) {
      reject("division by zero is not allowed");
    }
    resolve(operation(x, y));
  });
};
const awaitCalculate = async (x, y, operation) => {
  return await operation(x, y);
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

const testCaluate = async () => {
  try {
    const result = await caluclate(1, 2, add);
    const result2 = await caluclate(1, 2, subtract);
    const result3 = await caluclate(1, 2, multiply);
    const result4 = await caluclate(1, 2, division);
    const all = await Promise.all([result, result2, result3, result4]);
    console.log(all);
  } catch (err) {
    console.error(err);
  }
};

const promiseCalculateTest = () => {
  caluclate(2, 3, add)
    .then((result) => {
      console.log(`Addition result: ${result}`);
      return caluclate(result, 2, subtract);
    })
    .then((result) => {
      console.log(`Subtraction result: ${result}`);
      return caluclate(result, 3, multiply);
    })
    .then((result) => {
      console.log(`Multiplication result: ${result}`);
      return caluclate(result, 2, division);
    })
    .then((result) => {
      console.log(`Division result: ${result}`);
    })
    .catch((error) => {
      console.error(error);
    });
};
const awaitCaluateTest = () => {
  caluclate(2, 3, add)
    .then((result) => {
      console.log(`Addition result: ${result}`);
      return caluclate(result, 2, subtract);
    })
    .then((result) => {
      console.log(`Subtraction result: ${result}`);
      return caluclate(result, 3, multiply);
    })
    .then((result) => {
      console.log(`Multiplication result: ${result}`);
      return caluclate(result, 2, division);
    })
    .then((result) => {
      console.log(`Division result: ${result}`);
    })
    .catch((error) => {
      console.error(error);
    });
};

// testCaluate();
// promiseCalculateTest();
// awaitCaluateTest();
