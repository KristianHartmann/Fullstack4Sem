const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function greeting(name) {
  console.log(`Hello, ${name}!`);
  readline.close();
}
const greetingUppercase = (name) => {
  console.log(`Hello, ${name.toUpperCase()}!`);
  readline.close();
};
const greetingLength = (name) => {
  console.log(`Hello, ${name}! Your name is ${name.length} letters long.`);
  readline.close();
};

function processUserInput(callback) {
  readline.question(`What's your name? `, callback);
}

processUserInput(greetingLength);
processUserInput(greetingUppercase);
processUserInput(greeting);
