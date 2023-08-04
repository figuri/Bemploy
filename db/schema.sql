-- drop db if exists
DROP DATABASE IF EXISTS employee_tracker_db;
-- create db
CREATE DATABASE employee_tracker_db;
-- use db
USE employee_tracker_db;

-- create department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(30) NOT NULL
);

-- create role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    dep_id INT NOT NULL,
    FOREIGN KEY (dep_id) REFERENCES department(id)
);

-- create employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- add foreign key constraints
ALTER TABLE role ADD CONSTRAINT fk_role_department FOREIGN KEY (dep_id) REFERENCES department(id);
ALTER TABLE employee ADD CONSTRAINT fk_employee_role FOREIGN KEY (role_id) REFERENCES role(id);
ALTER TABLE employee ADD CONSTRAINT fk_employee_manager FOREIGN KEY (manager_id) REFERENCES employee(id);