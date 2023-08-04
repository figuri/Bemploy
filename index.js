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
                // ask which department the role belongs to
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Which department does the role belong to?',
                        choices: departmentChoices
                    },
                    // insert new role into database
                    // return confirmation message 
                ]).then((answer) => {
                    const { departmentId } = answer;
                    db.promise().query('INSERT INTO role (title, salary, dep_id) VALUES (?, ?, ?)', [roleName, roleSalary, departmentId])
                        .then(() => {
                            console.log('New role added!');
                            mainMenu();
                        })
                        .catch((err) => {
                            console.error('Could not add role', err);
                            mainMenu();
                        });
                });
            });
    });
}

const addNewDepartment = () => {
    // ask name of department
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?',
            validate: departmentNameInput => {
                // validate input
                if (departmentNameInput) {
                    return true;
                } else {
                    console.log('Please enter a department name!');
                    return false;
                }
            }
        }
    ]).then((answer) => {
        // insert new department into database
        const { departmentName } = answer;
        db.promise().query('INSERT INTO department (dep_name) VALUES (?)', [departmentName])
            .then(() => {   
                // return confirmation message
                console.log('New department added!');
                    // call mainMenu()
                mainMenu();
            })
            .catch((err) => {
                console.error('Could not add department', err);
            });
    });
    
 

}

const addNewEmployee = () => {
    // ask name of employee
    inquirer.prompt([
        // ask first name
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'What is the first name of the employee?',
            validate: employeeFirstNameInput => {
                if (employeeFirstNameInput) {
                    return true;
                } else {
                    console.log('Please enter a first name!');
                    return false;
                }
            }
        },
        {
            // ask last name
            type: 'input',
            name: 'employeeLastName',
            message: 'What is the last name of the employee?',
            validate: employeeLastNameInput => {
                if (employeeLastNameInput) {
                    return true;
                } else {
                    console.log('Please enter a last name!');
                    return false;
                }
            }
        }
        // get all roles from database
    ]).then((answer) => {
        const { employeeFirstName, employeeLastName } = answer;
        db.promise().query('SELECT id, title FROM role')
            .then(([roles]) => {
                const roleChoices = roles.map((role) => ({
                    name: role.title,
                    value: role.id,
                }));
                inquirer.prompt([
                    // ask role of employee
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'What is the role of the employee?',
                        choices: roleChoices
                    },
                    // ask if employee has manager
                ]).then((answer) => {
                    const { roleId } = answer;
                    inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'hasManager',
                            message: 'Does the employee have a manager?',
                            default: false,
                        },
                    ]).then((answer) => {
                        // if employee has manager, ask for manager
                        const { hasManager } = answer;
                        if (hasManager) {
                            db.promise().query('SELECT id, first_name, last_name FROM employee')
                                .then(([employees]) => {
                                    const managerChoices = employees.map((employee) => ({
                                        name: `${employee.first_name} ${employee.last_name}`,
                                        value: employee.id,
                                    }));
                                    inquirer.prompt([
                                        // ask for manager
                                        {
                                            type: 'list',
                                            name: 'managerId',
                                            message: 'Who is the manager of the employee?',
                                            choices: managerChoices
                                        },
                                    ]).then((answer) => {
                                        const { managerId } = answer;
                                        // insert employee into database
                                        db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employeeFirstName, employeeLastName, roleId, managerId])
                                            .then(() => {
                                                console.log('New employee added!');
                                                mainMenu();
                                            })
                                            .catch((err) => {
                                                console.error('Could not add employee', err);
                                                mainMenu();
                                            });
                                    });
                                });
                                // if employee does not have manager, insert employee into database
                        } else {
                            db.promise().query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [employeeFirstName, employeeLastName, roleId])
                                .then(() => {
                                    console.log('New employee added!');
                                    mainMenu();
                                })
                                .catch((err) => {
                                    console.error('Could not add employee', err);
                                    mainMenu();
                                });
                        }
                    });
                });
            });
    });
}

const updateEmployeeRole = () => {
    // ask which employee to update
    db.promise().query('SELECT id, first_name, last_name FROM employee')
        .then(([employees]) => {
            const employeeChoices = employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            }));
            inquirer.prompt([
                // ask which employee to update
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Which employee would you like to update?',
                    choices: employeeChoices
                },
            ]).then((answer) => {
                const { employeeId } = answer;
                // ask which role to update to
                db.promise().query('SELECT id, title FROM role')
                    .then(([roles]) => {
                        const roleChoices = roles.map((role) => ({
                            name: role.title,
                            value: role.id,
                        }));
                        inquirer.prompt([
                            // ask new role of employee
                            {
                                type: 'list',
                                name: 'roleId',
                                message: 'What is the new role of the employee?',
                                choices: roleChoices
                            },
                        ]).then((answer) => {
                            const { roleId } = answer;
                            // update employee role in database
                            db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId])
                                .then(() => {
                                    console.log('Employee role updated!');
                                    mainMenu();
                                })
                                .catch((err) => {
                                    console.error('Could not update employee role', err);
                                    mainMenu();
                                });
                        });
                    });
            });
        });
}

mainMenu();
// call mainMenu()

// export statements
module.exports = connection;

