import {db} from "../db/database";
import {Employee} from "../model/employee";
import {Roles} from "../model/roles";



const ID_PRIVILEGE = {
    1: Roles.EMPLOYEE,
    2: Roles.MANAGER,
    3: Roles.HR,
    4: Roles.ADMIN
};


export class EmployeeValidator {
    private static _instance: EmployeeValidator;

    private _db: db;

    constructor(_db) {
        this._db = _db;
    }

    public canView = async (data, requester) => {
        if (requester.id === data.id) return true;
        let role = await this.getPrivileges(requester.id);
        switch (role) {
            case Roles.ADMIN:
                return true;
            case Roles.HR:
                return true;
            case Roles.MANAGER:
                return await this.isManager(requester.id, data.id);
            case Roles.EMPLOYEE:
                return requester.id === data.id;
            default:
                return false;
        }
    };

    public canCreate = async (requester) => {
        let role = await this.getPrivileges(requester.id);
        switch (role) {
            case Roles.ADMIN:
                return true;
            case Roles.HR:
                return true;
            default:
                return false;
        }
    };

    public static getInstance = (_db) => {
        if (EmployeeValidator._instance === undefined) {
            EmployeeValidator._instance = new EmployeeValidator(_db);
        }
        return EmployeeValidator._instance;
    };

    private getPrivileges = async (id) => {
        let role = Roles.EMPLOYEE;
        let statement = "SELECT * FROM employee WHERE id = ?";
        try {
            let result = await this._db.query(statement, [id]);
            let requester = Employee.fromDB(result);
            if (requester.privilege in ID_PRIVILEGE){
                role = ID_PRIVILEGE[requester.privilege];
            }
        } catch (err) {
            return undefined;
        }
        return role;

    };

    private isManager = async (managerID: any, employeeID: any) => {
        let statement = "SELECT 1 FROM employee WHERE manager_id = ? AND id = ?";
        try {
            let result = await this._db.query(statement, [managerID, employeeID]);
            return db.bool(result);
        } catch (err) {
            return false;
        }
    };
}