const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');

// import statements
// create inquirer questions
// connect to database
// create functions for each inquirer question
// create function for main menu
// call main menu function

const mainMenu = () => {
    // ask what user wants to do
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add New Employee', 'Add New Department', 'Add New Role', 'Update Employee Role', 'Exit']
        }
    ])
        .then((answer) => {
            // switch statement to get answer
            switch (answer.mainMenu) {
                // call functions for each inquirer question
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'Add New Employee':
                    addNewEmployee();
                    break;
                case 'Add New Department':
                    addNewDepartment();
                    break;
                case 'Add New Role':
                    addNewRole();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    db.end();
                    return;
            }
        });
};
const viewAllEmployees = () => {
    // query database
    const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    INNER JOIN role r ON e.role_id = r.id
    INNER JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON m.id = e.manager_id`;
    db.promise().query(query)
        .then(([results]) => {
            // show all employees
            console.table(results);
            // call mainMenu()
            mainMenu();
        })
        // catch error
        .catch((err) => {
            console.error('Could not find employees', err);
        });
};

const viewAllDepartments = () => {
    // query database
    var query = `SELECT * FROM department`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Could not find departments');
        } else {
            // show all departments
            console.table(results);
            // call mainMenu()
            mainMenu();
        }
    });

}

const viewAllRoles = () => {
    // query database
    var query = `SELECT * FROM role`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Could not find roles');
        } else {
            // show all roles
            console.table(results);
            // call mainMenu()
            mainMenu();
        }
    });
}

const addNewRole = () => {
    // ask name of role
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?',
            validate: roleNameInput => {
                if (roleNameInput) {
                    return true;
                } else {
                    console.log('Please enter a role name!');
                    return false;
                }
            }
        },
        // ask salary of role
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?',
            validate: roleSalaryInput => {
                if (roleSalaryInput) {
                    return true;
                } else {
                    console.log('Please enter a role salary!');
                    return false;
                }
            }
        }
    ]).then((answer) => {
        const { roleName, roleSalary } = answer;
        db.promise().query('SELECT id, dep_name FROM department')
            .then(([departments]) => {
                const departmentChoices = departments.map((dept) => ({
                    name: dept.dep_name,
                    value: dept.id,
                }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Which department does the role belong to?',
                        choices: departmentChoices
                    },
                ]}).then((answer) => {
                    const { departmentId } = answer;
                    db.promise().query('INSERT INTO role (title, salary, dep_id) VALUES (?, ?, ?)', [roleName, roleSalary, departmentId])
                        .then(() => {
                            console.log('New role added!');
                            mainMenu();
                        })
                        .catch((err) => {
                            console.error('Could not add role', err);
                        });
                });
    });
};

const addNewDepartment = () => {
    // ask name of department
    // insert new department into database
    // return confirmation message
    // call mainMenu()
}

const addNewEmployee = () => {
    // ask name of employee
    // ask role of employee
    // ask manager of employee
    // if yes, add manager to employee
    // insert new employee into database
    // return confirmation message
    // call mainMenu()
}

const updateEmployeeRole = () => {
    //     // query database for list of employees
    //     // give list of employees to choose from
    //     // ask which employee to update
    //     // query database for list of roles
    //     // give list of roles to choose from
    //     // ask which role to update to
    //     // update employee role in database
    //     // return confirmation message
    //     // call mainMenu()
}

mainMenu();
// call mainMenu()

// export statements
module.exports = connection;

