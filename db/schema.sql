-- drop db if exists
DROP DATABASE IF EXISTS employee_tracker_db;
-- create db
CREATE DATABASE employee_tracker_db;
-- use db
USE employee_tracker_db;
-- create department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY (id),
    dep_name VARCHAR(30) NOT NULL,
);
-- create id and dept name columns

-- create role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY (id),
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    dep_id INT NOT NULL, --foreign key
    FOREIGN KEY (dep_id) REFERENCES department(id)
);
-- create id, title, salary, and department-id* columns

-- create employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY (id),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
-- create id, first name, last name, role-id*, and manager-id* columns