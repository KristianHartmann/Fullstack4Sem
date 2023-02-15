// person.ts

class Person {
  constructor(public name: string, public age: number, public gender: string) {}
}

function populatePersons(numPersons: number): Person[] {
  let persons: Person[] = [];
  for (let i = 0; i < numPersons; i++) {
    const name = "Person " + (i + 1);
    const age = Math.floor(Math.random() * 50) + 20;
    const gender = i % 2 == 0 ? "Male" : "Female";
    persons.push(new Person(name, age, gender));
  }
  return persons;
}

function generateTable(persons: Person[]) {
  const table = document.getElementById("person-table")!;
  const tbody = table.getElementsByTagName("tbody")[0];

  tbody.innerHTML = ""; // Clear table

  // Create rows for each person
  for (let person of persons) {
    const row = document.createElement("tr");

    // Add cells for each property of the person
    const nameCell = document.createElement("td");
    nameCell.innerText = person.name;
    row.appendChild(nameCell);

    const ageCell = document.createElement("td");
    ageCell.innerText = String(person.age);
    row.appendChild(ageCell);

    const genderCell = document.createElement("td");
    genderCell.innerText = person.gender;
    row.appendChild(genderCell);

    tbody.appendChild(row);
  }
}

function sortTable(persons: Person[], ascending: boolean) {
  if (ascending) {
    persons.sort((a, b) => a.age - b.age);
  } else {
    persons.sort((a, b) => b.age - a.age);
  }
}

let persons = populatePersons(10);
generateTable(persons);

let ascending = true;
const sortBtn = document.getElementById("sort-btn")!;
sortBtn.addEventListener("click", () => {
  sortTable(persons, ascending);
  ascending = !ascending;
  generateTable(persons);
});
