import React, { useState, useEffect, FormEvent } from "react";
import { Person } from "./IPerson";

interface AddPersonProps {
  onPersonAdded: () => void;
  people: Person[];
}

const AddPerson: React.FC<AddPersonProps> = ({ onPersonAdded, people }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");

  useEffect(() => {
    // Find the latest ID in the people array
    const latestId = Math.max(...people.map((person) => person.id), 0);
    // Set the new ID to the latest ID + 1
    setId(latestId + 1);
  }, [people]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a new person object
    const newPerson: Person = {
      id,
      name,
      age,
      city,
      occupation,
    };

    // Send the new person object to the server to add it to the JSON list
    const response = await fetch("http://localhost:3008/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });

    if (response.ok) {
      // Notify the parent component that a new person was added
      onPersonAdded();
      // Clear the form inputs
      setName("");
      setAge(0);
      setCity("");
      setOccupation("");
      setId(id + 1); // Update the ID for the next person
    } else {
      console.error("Failed to add person");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
      </label>
      <br />
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <br />
      <label>
        Occupation:
        <input
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Person</button>
    </form>
  );
};

export default AddPerson;
