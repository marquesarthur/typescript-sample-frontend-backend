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
const database_1 = require("../db/database");
const employee_1 = require("../model/employee");
const ID_PRIVILEGE = {
    1: "Employee" /* EMPLOYEE */,
    2: "Manager" /* MANAGER */,
    3: "HR" /* HR */,
    4: "Admin" /* ADMIN */
};
class EmployeeValidator {
    constructor(_db) {
        this.canView = (data, requester) => __awaiter(this, void 0, void 0, function* () {
            if (requester.id === data.id)
                return true;
            let role = yield this.getPrivileges(requester.id);
            switch (role) {
                case "Admin" /* ADMIN */:
                    return true;
                case "HR" /* HR */:
                    return true;
                case "Manager" /* MANAGER */:
                    return yield this.isManager(requester.id, data.id);
                case "Employee" /* EMPLOYEE */:
                    return requester.id === data.id;
                default:
                    return false;
            }
        });
        this.canCreate = (requester) => __awaiter(this, void 0, void 0, function* () {
            let role = yield this.getPrivileges(requester.id);
            switch (role) {
                case "Admin" /* ADMIN */:
                    return true;
                case "HR" /* HR */:
                    return true;
                default:
                    return false;
            }
        });
        this.getPrivileges = (id) => __awaiter(this, void 0, void 0, function* () {
            let role = "Employee" /* EMPLOYEE */;
            let statement = "SELECT * FROM employee WHERE id = ?";
            try {
                let result = yield this._db.query(statement, [id]);
                let requester = employee_1.Employee.fromDB(result);
                if (requester.privilege in ID_PRIVILEGE) {
                    role = ID_PRIVILEGE[requester.privilege];
                }
            }
            catch (err) {
                return undefined;
            }
            return role;
        });
        this.isManager = (managerID, employeeID) => __awaiter(this, void 0, void 0, function* () {
            let statement = "SELECT 1 FROM employee WHERE manager_id = ? AND id = ?";
            try {
                let result = yield this._db.query(statement, [managerID, employeeID]);
                return database_1.db.bool(result);
            }
            catch (err) {
                return false;
            }
        });
        this._db = _db;
    }
}
EmployeeValidator.getInstance = (_db) => {
    if (EmployeeValidator._instance === undefined) {
        EmployeeValidator._instance = new EmployeeValidator(_db);
    }
    return EmployeeValidator._instance;
};
exports.EmployeeValidator = EmployeeValidator;
