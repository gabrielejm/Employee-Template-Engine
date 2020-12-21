const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const employee = [
  {
    type: "list",
    message: "What type of team member would you like to add?",
    name: "role",
    choices: ["Engineer", "Intern", "I do not want to add any more team members"],
  },
];

const manager = [
  {
    type: "input",
    message: "What is your manager's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your manager's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your manager's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your manager's office phone number?",
    name: "officeNumber",
  },
];

const engineer = [
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your engineer's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your engineer's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your engineer's Github username?",
    name: "github",
  },
];

const intern = [
  {
    type: "input",
    message: "What is your intern's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your intern's ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your intern's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your intern's school?",
    name: "school",
  },
];

addEmployee = () => {
  inquirer.prompt(employee).then(function (data) {
    if (data.role === "Engineer") {
      addEngineer();
    }
    if (data.role === "Intern") {
      addIntern();
    } else {
      saveTeam();
    }
  });
};

addEngineer = () => {
  inquirer.prompt(engineer).then(function (data) {
    const engineer = new Engineer(data.name, data.id, data.email, data.github);
    employees.push(engineer);
    addEmployee();
  });
};

addManager = () => {
  inquirer.prompt(manager).then(function (data) {
    const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
    employees.push(manager);
    addEmployee();
  });
};

addIntern = () => {
  inquirer.prompt(intern).then(function (data) {
    const intern = new Intern(data.name, data.id, data.email, data.school);
    employees.push(intern);
    addEmployee();
  });
};

saveTeam = () => {
  writeToFile();
};

writeToFile = () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(employees), "utf-8");
};

init = () => {
  addManager();
};

init();
