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
    db.searchAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => showMainPrompts());
  }
  
  function updateEmployeeRole() {
    db.searchAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, last_name, first_name }) => ({
          name: `${last_name} ${first_name}`,
          value: id
        }));
  
        prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Chose an employee's role to update.",
            choices: employeeChoices
          }
        ])
          .then(res => {
            let employeeId = res.employeeId;
            db.searchAllRoles()
              .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                  name: title,
                  value: id
                }));
  
                prompt([
                  {
                    type: "list",
                    name: "roleId",
                    message: "What role would you like to assign the selected employee?",
                    choices: roleChoices
                  }
                ])
                  .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                  .then(() => console.log("Updated employee's role"))
                  .then(() => showMainPrompts())
              });
          });
      })
  }

  function showRoles() {
    db.searchAllRoles()
      .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => showMainPrompts());
  }
  










 


  


