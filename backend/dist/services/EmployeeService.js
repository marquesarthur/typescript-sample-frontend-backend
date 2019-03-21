"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("../model/employee");
class EmployeeService {
    constructor(_db) {
        this.getEmployeeByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            let statement = "SELECT * FROM employee WHERE email = ?";
            try {
                let result = yield this._db.query(statement, [email]);
                return employee_1.Employee.fromDB(result);
            }
            catch (err) {
                return undefined;
            }
        });
        this.getEmployeeByID = (id) => __awaiter(this, void 0, void 0, function* () {
            let statement = "SELECT * FROM employee WHERE id = ?";
            try {
                let result = yield this._db.query(statement, [id]);
                return employee_1.Employee.fromDB(result);
            }
            catch (err) {
                return undefined;
            }
        });
        this.insertEmployee = (employee) => __awaiter(this, void 0, void 0, function* () {
            let statement = "INSERT INTO  employee (first_name, last_name, password, SIN, email, role_id, privileges_id, manager_id, status) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ONBOARDING')";
            let params = [employee.firstName, employee.lastName, employee.password, employee.SIN, employee.email, employee.role, employee.privilege, employee.manager];
            try {
                let insertedId = yield this._db.insert(statement, params);
                return yield this.getEmployeeByID(insertedId);
            }
            catch (err) {
                return undefined;
            }
        });
        this._db = _db;
    }
}
EmployeeService.getInstance = (_db) => {
    if (EmployeeService._instance === undefined) {
        EmployeeService._instance = new EmployeeService(_db);
    }
    return EmployeeService._instance;
};
exports.EmployeeService = EmployeeService;
