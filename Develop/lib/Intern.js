// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern {
  // Just like constructor functions, classes can accept arguments
  constructor(name, id, email, school) {
    this.name = name;
    this.role = "Intern";
    this.id = id;
    this.email = email;
    this.school = school;
  }
}

module.exports = Intern;
