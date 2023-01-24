const { prompt } = require("inquirer");
const db =require("./db");
require("console.table");
// const mysql = require('mysql2/promise');

// const connection =  mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'your_database'
// });



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
      } else if (selection === "SHOW_EMPLOYEES_BY_DEPARTMENT") {
        showEmployeesByDepartment();
      } else if (selection=== "SHOW_EMPLOYEES_BY_MANAGER") {
        showEmployeesByManager();
      } else if (selection === "ADD_EMPLOYEE") {
        addEmployee();
      } else if (selection=== "REMOVE_EMPLOYEE") {
        removeEmployee();
      } else if (selection === "UPDATE_EMPLOYEE_ROLE") {
      updateEmployeeRole();
      } else if (selection === "UPDATE_EMPLOYEE_MANAGER") {
        updateEmployeeManager();
      } else if (selection === "SHOW_ROLES") {
        showRoles();
      } else if (selection === "ADD_ROLE") {
        addRole();
      } else if (selection === "REMOVE_ROLE") {
        removeRole();
      } else if (selection === "SHOW_UTILIZED_BUDGET_BY_DEPARTMENT") {
        showUtilizedBudgetByDepartment();
      }   else if (selection === "SHOW_DEPARTMENTS") {
        showDepartments();
      } else if (selection === "ADD_DEPARTMENT") {
        addDepartment();
      } else if (selection === "REMOVE_DEPARTMENT") {
        removeDepartment();
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
  
  function addRole() {
    db.searchAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
  
        prompt([
          {
            name: "title", message: "What is the name of the role?"
          },
          {
            name: "salary",message: "What is the salary of the role?"
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentChoices
          }
        ])
          .then(role => {
            db.createRole(role)
              .then(() => console.log(`Added ${role.title} to the database`))
              .then(() => showMainPrompts())
          })
      })
  }

  function showDepartments() {
    db.searchAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => showMainPrompts());
  }

  function addDepartment() {
    prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ])
      .then(res => {
        let name = res;
        db.createDepartment(name)
          .then(() => console.log(`Added ${name.name} to the database`))
          .then(() => showMainPrompts())
      })
  } 

  // removeDepartment(departmentId) {
  //   return this.connection.promise().query(
  //     "DELETE FROM department WHERE id = ?",
  //     departmentId
  //   );
  // }

  // removeEmployee(employeeId) {
  //   return this.connection.promise().query(
  //     "DELETE FROM employee WHERE id = ?",
  //     employeeId
  //   );
  // }


  function addEmployee() {
    prompt([
      {
        name: "last_name",
        message: "What is the employee's last name?"
      },
      {
        name: "first_name",
        message: "What is the employee's first name?"
      }
    ])
      .then(res => {
        let lastName = res.last_name;
        let firstName = res.first_name;
  
        db.searchAllRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
  
            prompt({
              type: "list",
              name: "roleId",
              message: "What is the employee's role?",
              choices: roleChoices
            })
              .then(res => {
                let roleId = res.roleId;
  
                db.searchAllEmployees()
                  .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, last_name, first_name }) => ({
                      name: `${last_name} ${first_name}`,
                      value: id
                    }));
  
                    managerChoices.unshift({ name: "None", value: null });
  
                    prompt({
                      type: "list",
                      name: "managerId",
                      message: "Who is the employee's manager?",
                      choices: managerChoices
                    })
                      .then(res => {
                        let employee = {
                          manager_id: res.managerId,
                          role_id: roleId,
                          last_name: lastName,
                          first_name: firstName
                        }
  
                        db.createEmployee(employee);
                      })
                      .then(() => console.log(
                        `Added ${lastName} ${firstName} to the database`
                      ))
                      .then(() => showMainPrompts())
                  })
              })
          })
      })
  }

  // Exit the application
function quit() {
  console.log("See Ya!");
  process.exit();
}









 


  


