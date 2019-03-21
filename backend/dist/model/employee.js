"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    constructor() {
    }
}
Employee.fromDB = (result) => {
    if (result.length === 0) {
        throw Error("Empty result");
    }
    if (result.length > 1) {
        throw Error("More than one result for query");
    }
    let employee = result[0];
    let x = new Employee();
    x.id = Number(employee["id"]);
    x.firstName = employee["first_name"];
    x.lastName = employee["last_name"];
    x.email = employee["email"];
    x.password = employee["password"];
    x.privilege = employee["privileges_id"];
    x.manager = employee["manager_id"];
    return x;
};
exports.Employee = Employee;
