IF EXISTS (SELECT name FROM sys.databases WHERE name = 'employees')
BEGIN
    DROP DATABASE employees;
END

CREATE DATABASE employees;
GO
USE employees;
GO

CREATE TABLE department (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) 
);

CREATE TABLE role (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) ,
    salary DECIMAL UNSIGNED ,
    department_id INT UNSIGNED ,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
    INDEX (department_id)
);

CREATE TABLE employee (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    last_name VARCHAR(30) ,
    first_name VARCHAR(30) ,
    role_id INT UNSIGNED ,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT UNSIGNED,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
    INDEX (role_id),
    INDEX (manager_id)
);
