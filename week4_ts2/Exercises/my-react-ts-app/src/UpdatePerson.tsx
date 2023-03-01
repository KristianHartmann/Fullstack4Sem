import React, { useState, useEffect } from "react";

interface Person {
  id: number;
  name: string;
  age: number;
  city: string;
  occupation: string;
}

const UpdatePerson: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editPerson, setEditPerson] = useState<Person>({
    id: 0,
    name: "",
    age: 0,
    city: "",
    occupation: "",
  });

  useEffect(() => {
    fetch("http://localhost:3008/person/")
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error(error));
  }, []);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditPerson(people[index]);
  };

  const handleSaveClick = () => {
    if (editIndex !== null) {
      fetch(`http://localhost:3008/person/${editPerson.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editPerson),
      })
        .then(() => {
          const updatedPeople = [...people];
          updatedPeople[editIndex] = editPerson;
          setPeople(updatedPeople);
          setEditIndex(null);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleCancelClick = () => {
    setEditIndex(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditPerson((prevEditPerson) => ({ ...prevEditPerson, [name]: value }));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
          <th>Occupation</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person, index) => (
          <tr key={person.id}>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  name="name"
                  value={editPerson.name}
                  onChange={handleInputChange}
                />
              ) : (
                person.name
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="number"
                  name="age"
                  value={editPerson.age}
                  onChange={handleInputChange}
                />
              ) : (
                person.age
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  name="city"
                  value={editPerson.city}
                  onChange={handleInputChange}
                />
              ) : (
                person.city
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  name="occupation"
                  value={editPerson.occupation}
                  onChange={handleInputChange}
                />
              ) : (
                person.occupation
              )}
            </td>
            <td>
              {editIndex === index ? (
                <>
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </>
              ) : (
                <button onClick={() => handleEditClick(index)}>Edit</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UpdatePerson;
