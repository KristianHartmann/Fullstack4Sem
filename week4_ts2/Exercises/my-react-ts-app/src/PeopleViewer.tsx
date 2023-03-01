import { useState } from "react";
import reactLogo from "./assets/react.svg";
import ".//PeopleViewer.css";
import { useEffect } from "react";
import DeletePerson from "./DeletePerson";
import AddPerson from "./AddPerson";
import UpdatePerson from "./UpdatePerson";

interface Person {
  id: number;
  name: string;
  age: number;
  city: string;
  occupation: string;
}

function PeopleViewer() {
  const [people, setPeople] = useState<Person[]>([]);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [newPerson, setNewPerson] = useState({
    id: 0,
    name: "",
    age: 0,
    city: "",
    occupation: "",
  });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    fetch("http://localhost:3008/person")
      .then((response) => response.json())
      .then((data) => setPeople(data));
  }, []);

  const handlePersonAdded = async () => {
    // Fetch the updated people data after adding a new person
    const response = await fetch("http://localhost:3008/person");
    const data = await response.json();
    setPeople(data);
  };

  const handleSortByAge = () => {
    const sortedPeople = [...people].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });
    setPeople(sortedPeople);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleEditClick = (person: Person) => {
    setEditingPerson(person);
    setSelectedPerson(person);
  };

  return (
    <div className="people-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>
              Age{" "}
              <button type="button" onClick={handleSortByAge}>
                {sortOrder === "asc" ? "▲" : "▼"}
              </button>
            </th>
            <th>City</th>
            <th>Occupation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.city}</td>
              <td>{person.occupation}</td>
              <td>
                <button onClick={() => handleEditClick(person)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddPerson people={people} onPersonAdded={handlePersonAdded} />
      <DeletePerson people={people} setPeople={setPeople} />
      <UpdatePerson />
    </div>
  );
}

export default PeopleViewer;
