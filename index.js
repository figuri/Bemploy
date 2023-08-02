const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');

// import statements
// create inquirer questions
// connect to database
// create functions for each inquirer question
// create function for main menu
// call main menu function




const viewAllEmployees = () => {
   
    // query database
    // display results
    // show all employees
    // call mainMenu()
}

const viewAllDepartments = () => {
    // query database
    // display results
    // show all departments
    // call mainMenu()
}

const viewAllRoles = () => {
    // query database
    // display results
    // show all roles
    // call mainMenu()
}

const addNewRole = () => {
    // ask name of role
    // ask salary of role
    // query department table for list of departments
    // give list of departments to choose from
    // ask which department role belongs to
    // insert new role into database
    // return confirmation message
    // call mainMenu()
}

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

const mainMenu = () => {
    // ask what user wants to do
    // call appropriate function
}

// call mainMenu()

// export statements


