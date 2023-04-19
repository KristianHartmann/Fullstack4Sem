import React from "react";

type Props = {
  row: string[];
};

function Row({ row }: Props): JSX.Element {
  return (
    <tr>
      {row.map((cell) => (
        <td key={cell}>{cell}</td>
      ))}
    </tr>
  );
}

export default Row;
