use employees;

INSERT INTO department (name)
VALUES
   ("Sales"),
   ("Finance"),
   ("Engineering"),
   ("Human Resources");

INSERT INTO role (title,salary,department_id)
VALUES
   ("Sales Team Member", 30000, 0),
   ("Sales Lead Expert", 70000, 0),
   ("Finance Lead", 80000, 1),
   ("Finace Manager", 100000, 1),
   ("Software Engineer", 85000, 2),
   ("Engineer Lead", 150000, 2),
   ("HR Member", 60000, 3),
   ("HR Manager", 80000, 3);


INSERT INTO employee (last_name, first_name, role_id, manager_id)
VALUES
   ("Mason", "Brick", 0, NULL),
   ("Madden", "Steve", 1, 8),
   ("Hill", "Tommy", 2, 2),
   ("Carter", "Jimmy", 3, NULL),
   ("Johnson", "Bobby", 4, NULL),
   ("Smith", "Eddie", 5, NULL),
   ("Blackson", "Micheal", 6, 4),
   ("Jenkins", "Leroy", 7, 6);
  
   
   
