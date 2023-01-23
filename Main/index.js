const { prompt } = require("inquirer");
const db =require("./db");
require("console.table");



const init = () => showMainPrompts();

init();

function showMainPrompts() {
    const choices = [
      { name: "Show All Employees", value: "SHOW_EMPLOYEES" },
      { name: "Add Employee", value: "ADD_EMPLOYEE" },
      { name: "Update Employee Role", value: "UPDATE_EMPLOYEE_ROLE" },
      { name: "Show All Roles", value: "SHOW_ROLES" },
      { name: "Add Role", value: "ADD_ROLE" },
      { name: "Show All Departments", value: "SHOW_DEPARTMENTS" },
      { name: "Add Department", value: "ADD_DEPARTMENT" },
      { name: "Quit", value: "QUIT" }
    ]
  
    prompt({
      type: "list",
      name: "selection",
      message: "Make a selection",
      choices
    }).then(res => {
      let selection = res.selection;
      if (selection === "SHOW_EMPLOYEES"){
        showEmployees();
      } else if (selection === "ADD_EMPLOYEE") {
        addEmployee();
      } else if (selection === "UPDATE_EMPLOYEE_ROLE") {
      updateEmployeeRole();
      } else if (selection === "SHOW_ROLES") {
        showRoles();
      } else if (selection === "ADD_ROLE") {
        addRole();
      } else if (selection === "SHOW_DEPARTMENTS") {
        showDepartments();
      } else if (selection === "ADD_DEPARTMENT") {
        addDepartment();
      } else {
        quit();
    }

    }
    )
  } 

  function showEmployees() {
    db.findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => showMainPrompts());
  }
  










 


  


