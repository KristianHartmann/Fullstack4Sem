import React from "react";
import Headers from "./Headers";
import Row from "./Row";

type Person = {
  id: number;
  name: string;
  age: number;
};

type Props = {
  people: Person[];
};

function Table({ people }: Props): JSX.Element {
  const headers = ["ID", "Name", "Age"];

  return (
    <table>
      <Headers headers={headers} />
      <tbody>
        {people.map(({ id, name, age }) => (
          <Row key={id} row={[id.toString(), name, age.toString()]} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
