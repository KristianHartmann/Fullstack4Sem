import React from "react";

type Props = {
  headers: string[];
};

function Headers({ headers }: Props): JSX.Element {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}

export default Headers;
