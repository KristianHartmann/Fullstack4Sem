const helloWorld = (name: string): string => {
  return `Hello from ${name}`;
};
document.getElementById("root")!.innerHTML = helloWorld("TypeScript");
