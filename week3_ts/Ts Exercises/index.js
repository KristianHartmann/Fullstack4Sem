"use strict";
const helloWorld = (name) => {
    return `Hello from ${name}`;
};
document.getElementById("root").innerHTML = helloWorld("TypeScript");
