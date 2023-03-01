import { useState } from "react";
import { Person } from "./IPerson";

interface DeletePersonProps {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
}

const DeletePerson: React.FC<DeletePersonProps> = ({ people, setPeople }) => {
  const handleDeleteLatestPerson = () => {
    const latestPerson = people[people.length - 1];
    if (!latestPerson) return; // Check if there's no person to delete
    setPeople((prevPeople) =>
      prevPeople.filter((person) => person.id !== latestPerson.id)
    );

    fetch(`http://localhost:3008/person/${latestPerson.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <button type="submit" onClick={handleDeleteLatestPerson}>
        Delete Latest Person
      </button>
    </div>
  );
};

export default DeletePerson;
