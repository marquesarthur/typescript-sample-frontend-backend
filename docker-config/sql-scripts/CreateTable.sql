-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-03-12 04:24:29.02

-- tables
-- Table: comment
CREATE TABLE comment (
    id int NOT NULL AUTO_INCREMENT,
    employee_id int NOT NULL,
    visible_to_employee bool NOT NULL,
    text varchar(512) NOT NULL,
    performance_report_id int NOT NULL,
    date timestamp NOT NULL,
    CONSTRAINT comment_pk PRIMARY KEY (id)
);

-- Table: competency
CREATE TABLE competency (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(128) NOT NULL,
    CONSTRAINT competency_pk PRIMARY KEY (id)
);

-- Table: document
CREATE TABLE document (
    id int NOT NULL AUTO_INCREMENT,
    data blob NOT NULL,
    employee_id int NOT NULL,
    onboarding_id int NOT NULL,
    status varchar(32) NOT NULL,
    CONSTRAINT document_pk PRIMARY KEY (id)
);

-- Table: employee
CREATE TABLE employee (
    first_name varchar(128) NOT NULL,
    last_name varchar(128) NOT NULL,
    password varchar(128) NOT NULL,
    SIN varchar(32) NOT NULL,
    email varchar(128) NOT NULL,
    role_id int NOT NULL,
    privileges_id int NOT NULL,
    id int NOT NULL AUTO_INCREMENT,
    manager_id int NULL,
    status varchar(32) NOT NULL,
    CONSTRAINT employee_pk PRIMARY KEY (id)
);

-- Table: individual_work_plan
CREATE TABLE individual_work_plan (
    id int NOT NULL AUTO_INCREMENT,
    employee_id int NOT NULL,
    section_1 json NOT NULL,
    section_2 json NOT NULL,
    section_3 json NOT NULL,
    section_4 json NOT NULL,
    year timestamp NOT NULL,
    CONSTRAINT individual_work_plan_pk PRIMARY KEY (id)
);

-- Table: onboarding
CREATE TABLE onboarding (
    id int NOT NULL AUTO_INCREMENT,
    employee_id int NOT NULL,
    hr_id int NOT NULL,
    CONSTRAINT onboarding_pk PRIMARY KEY (id)
);

-- Table: performance_report
CREATE TABLE performance_report (
    id int NOT NULL AUTO_INCREMENT,
    individual_work_plan_id int NOT NULL,
    section_1 json NOT NULL,
    section_2 json NOT NULL,
    section_3 json NOT NULL,
    section_4 json NOT NULL,
    year timestamp NOT NULL,
    CONSTRAINT performance_report_pk PRIMARY KEY (id)
);

-- Table: privilege
CREATE TABLE privilege (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(32) NOT NULL,
    CONSTRAINT privilege_pk PRIMARY KEY (id)
);

-- Table: role
CREATE TABLE role (
    id int NOT NULL AUTO_INCREMENT,
    short_description varchar(128) NOT NULL,
    long_description varchar(128) NOT NULL,
    CONSTRAINT role_pk PRIMARY KEY (id)
);

-- Table: role_competency
CREATE TABLE role_competency (
    id_role int NOT NULL,
    id_competency int NOT NULL,
    CONSTRAINT role_competency_pk PRIMARY KEY (id_role,id_competency)
);

-- foreign keys


-- Reference: comment_performance_report (table: comment)
ALTER TABLE comment ADD CONSTRAINT comment_performance_report FOREIGN KEY comment_performance_report (performance_report_id)
    REFERENCES performance_report (id);

-- Reference: competencies_role_competency (table: role_competency)
ALTER TABLE role_competency ADD CONSTRAINT competencies_role_competency FOREIGN KEY competencies_role_competency (id_competency)
    REFERENCES competency (id);

-- Reference: document_employee (table: document)
ALTER TABLE document ADD CONSTRAINT document_employee FOREIGN KEY document_employee (employee_id)
    REFERENCES employee (id);

-- Reference: document_onboarding (table: document)
ALTER TABLE document ADD CONSTRAINT document_onboarding FOREIGN KEY document_onboarding (onboarding_id)
    REFERENCES onboarding (id);

-- Reference: employee_employee (table: employee)
ALTER TABLE employee ADD CONSTRAINT employee_employee FOREIGN KEY employee_employee (manager_id)
    REFERENCES employee (id);

-- Reference: employee_privileges (table: employee)
ALTER TABLE employee ADD CONSTRAINT employee_privileges FOREIGN KEY employee_privileges (privileges_id)
    REFERENCES privilege (id);

-- Reference: employee_role (table: employee)
ALTER TABLE employee ADD CONSTRAINT employee_role FOREIGN KEY employee_role (role_id)
    REFERENCES role (id);

-- Reference: individual_work_plan_employee (table: individual_work_plan)
ALTER TABLE individual_work_plan ADD CONSTRAINT individual_work_plan_employee FOREIGN KEY individual_work_plan_employee (employee_id)
    REFERENCES employee (id);

-- Reference: onboarding_employee (table: onboarding)
ALTER TABLE onboarding ADD CONSTRAINT onboarding_employee FOREIGN KEY onboarding_employee (employee_id)
    REFERENCES employee (id);

-- Reference: onboarding_hr (table: onboarding)
ALTER TABLE onboarding ADD CONSTRAINT onboarding_hr FOREIGN KEY onboarding_hr (hr_id)
    REFERENCES employee (id);

-- Reference: performance_report_individual_work_plan (table: performance_report)
ALTER TABLE performance_report ADD CONSTRAINT performance_report_individual_work_plan FOREIGN KEY performance_report_individual_work_plan (individual_work_plan_id)
    REFERENCES individual_work_plan (id);

-- Reference: role_role_competency (table: role_competency)
ALTER TABLE role_competency ADD CONSTRAINT role_role_competency FOREIGN KEY role_role_competency (id_role)
    REFERENCES role (id);

-- End of file.

