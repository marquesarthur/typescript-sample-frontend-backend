
INSERT INTO competency (description) VALUES ('Grade assignments');
INSERT INTO competency (description) VALUES ('Meet teams');
INSERT INTO competency (description) VALUES ('Talk to sponsors');
INSERT INTO competency (description) VALUES ('Coding Backend');
INSERT INTO competency (description) VALUES ('Coding Frontend');

INSERT INTO role(short_description, long_description) VALUES ('TA', 'CPSC 319 - TA');
INSERT INTO role(short_description, long_description) VALUES ('Student', 'CPSC 319 - Student');


INSERT INTO role_competency VALUES (1, 1);
INSERT INTO role_competency VALUES (1, 2);
INSERT INTO role_competency VALUES (1, 3);
INSERT INTO role_competency VALUES (2, 3);
INSERT INTO role_competency VALUES (2, 4);
INSERT INTO role_competency VALUES (2, 5);


INSERT INTO privilege(description) VALUES ('EMPLOYEE');
INSERT INTO privilege(description) VALUES ('MANAGER');
INSERT INTO privilege(description) VALUES ('HR');
INSERT INTO privilege(description) VALUES ('ADMIN');



-- 1 -- Arthur - ADMIN
INSERT INTO  employee (first_name, last_name, password, SIN, email, role_id, privileges_id, status) VALUES ('Arthur', '-', 'c2VjcmV0', '12345678', 'arthur@email.com', 1, 4, 'ACTIVE');
-- 2
INSERT INTO  employee (first_name, last_name, password, SIN, email, role_id, privileges_id, manager_id, status) VALUES ('Joao', '-', 'c2VjcmV0', '12345678', 'joao@email.com', 2, 1, 1, 'ACTIVE');
-- 3
INSERT INTO  employee (first_name, last_name, password, SIN, email, role_id, privileges_id, manager_id, status) VALUES ('Hugo', '-', 'c2VjcmV0', '12345678', 'hugo@email.com', 2, 1, 1, 'ACTIVE');
-- 4 -- Lisley HR
INSERT INTO  employee (first_name, last_name, password, SIN, email, role_id, privileges_id, status) VALUES ('Lisley', '-', 'c2VjcmV0', '12345678', 'lisley@email.com', 2, 4, 'ACTIVE');
-- 5
INSERT INTO  employee (first_name, last_name, password, SIN, email, role_id, privileges_id, manager_id, status) VALUES ('Boris', '-', 'c2VjcmV0', '12345678', 'boris@email.com', 2, 3, 4, 'ACTIVE');
-- 6
INSERT INTO  employee (first_name, last_name, password, SIN, email, role_id, privileges_id, status) VALUES ('Bidu', '-', 'c2VjcmV0', '12345678', 'bidu@email.com', 2, 2, 'ACTIVE');
-- 7
INSERT INTO  employee (first_name, last_name, password, SIN, email, role_id, privileges_id, manager_id, status) VALUES ('Cid', '-', 'c2VjcmV0', '12345678', 'cid@email.com', 2, 1, 6, 'ACTIVE');
