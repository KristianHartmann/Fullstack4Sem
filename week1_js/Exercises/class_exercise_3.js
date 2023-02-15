class Employee {
  constructor(name, salary, hireDate) {
    this.name = name;
    this.salary = salary;
    this.hireDate = hireDate;
  }

  toString() {
    return `Employee: ${this.name}, Salary: ${this.salary}, Hire Date: ${this.hireDate}`;
  }
}

class Manager extends Employee {
  constructor(
    name,
    salary,
    hireDate,
    jobTitle,
    descriptionOfJob,
    employeesManaged
  ) {
    super(name, salary, hireDate);
    this.jobTitle = jobTitle;
    this.descriptionOfJob = descriptionOfJob;
    this.employeesManaged = employeesManaged;
  }

  toString() {
    return `${super.toString()}. Job Title: ${
      this.jobTitle
    }, Description of Job: ${this.descriptionOfJob}, Employees Managed: ${
      this.employeesManaged
    }`;
  }
}

class Department {
  constructor(departmentName, employees) {
    this.departmentName = departmentName;
    this.employees = employees;
  }
  toString() {
    let employeeNames = this.employees
      .map((employee) => employee.name)
      .join(",");
    return `${this.employees[0].toString()}. Department Name: ${
      this.departmentName
    }, Employees: ${employeeNames}`;
  }
}

const steve = new Employee("Steve Taylor", 50000, "01/01/2015");
const marc = new Employee("Marc", 40000, "02/01/2015");
const manager = new Manager(
  "Steve Taylor",
  50000,
  "01/01/2015",
  "Manager",
  "Manager of the Sales Department",
  2
);
const department = new Department("Sales", [steve, marc]);
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (const element of numbers) {
  console.log(element);
}

for (const prop in steve) {
  console.log(`obj.${prop} = ${steve[prop]}`);
}

const calculator = (...numbers) => 1 + numbers;

const { jobTitle, descriptionOfJob, ...rest } = manager;
console.log(jobTitle); // 'Steve Taylor'
console.log(descriptionOfJob); // 'Manager of the Sales Department'
console.log(rest); // {}

console.log(department.toString());
