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

// buildTeam = () => {
//   //switch or conditional statement to find if its engineer or intern, run function
//   if ((employee.choices = "Engineer")) {
//     addEngineer();
//   } else if ((employee.choices = "Intern")) {
//     addIntern();
//   }
// };

addEmployee = () => {
  inquirer.prompt(employee).then(function (data) {
    if (data.role === "Engineer") {
      addEngineer();
    } else if (data.role === "Intern") {
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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
