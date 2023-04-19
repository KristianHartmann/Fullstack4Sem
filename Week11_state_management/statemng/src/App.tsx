import React from "react";
import Table from "./Table";
import TableRow from "./Row";
import TableHeaderCell from "./Headers";

const people = [
  { id: 1, name: "Helle", age: 20 },
  { id: 2, name: "Ib", age: 30 },
  { id: 3, name: "Bodil", age: 40 },
  { id: 4, name: "Yasmin", age: 32 },
];

function App(): JSX.Element {
  return (
    <div>
      <Table people={people} />
    </div>
  );
}

export default App;
