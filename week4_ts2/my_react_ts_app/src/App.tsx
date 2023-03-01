import { useState, useEffect } from "react";
import "./App.css";

function InputField(props: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return <input type="text" value={props.value} onChange={props.onChange} />;
}

function NameDisplay(props: { name: string }) {
  return <h1>{props.name}</h1>;
}

function PeopleViewer() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3008/person")
      .then((response) => response.json())
      .then((data) => setPeople(data));
  }, []);

  return (
    <div>
      {people.map((person) => (
        <p>{JSON.stringify(person, null, 2)}</p>
      ))}
    </div>
  );
}

function App() {
  const [name, setName] = useState("initial name");

  const handleInputNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  return (
    <div className="App">
      <InputField value={name} onChange={handleInputNameChange} />
      <NameDisplay name={name} />
      <PeopleViewer />
    </div>
  );
}

export default App;
