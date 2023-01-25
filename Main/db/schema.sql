-- IF EXISTS (SELECT name FROM sys.databases WHERE name = "employees")
-- BEGIN
--     DROP DATABASE employees;
-- END

-- CREATE DATABASE employees;
-- GO
-- USE employees;
-- GO
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) 
);

-- CREATE TABLE role (
--     id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--     title VARCHAR(30) ,
--     salary DECIMAL UNSIGNED ,
--     department_id INT UNSIGNED ,
--     FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
--     INDEX (department_id)
-- );

-- CREATE TABLE employee (
--     id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--     last_name VARCHAR(30) ,
--     first_name VARCHAR(30) ,
--     role_id INT UNSIGNED ,
--     FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
--     manager_id INT UNSIGNED,
--     FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
--     INDEX (role_id),
--     INDEX (manager_id)
-- );
CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  last_name VARCHAR(30) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);