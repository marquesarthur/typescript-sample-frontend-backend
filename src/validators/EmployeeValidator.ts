import {db} from "../db/database";
import {Employee} from "../model/employee";
import {Roles} from "../model/roles";


const fakeIDRole = {
    1: Roles.EMPLOYEE,
    2: Roles.MANAGER,
    4: Roles.EMPLOYEE
};

const fakeTeam = {
    2: [1]
};


export class EmployeeValidator {
    private static _instance: EmployeeValidator;

    private _db: db;

    constructor(_db) {
        this._db = _db;
    }

    public canView = async (requester, data) => {

        if (requester.id === data.id) return true;

        // TODO: some query to check roles of requester - 1. HR sees everything, 2. Manager. sees his team, 3. Employee sees themselves
        // TODO: you probably don't want that as part of the token due to security issues, but as the secret is on the server side, it may be safe to do so
        // TODO: in that case, you just do something like requester.role
        // let statement = "SELECT * FROM employees WHERE email = ?";
        // try {
        //     let result = await this._db.query(statement, [email]);
        //     return Employee.fromDB(result);
        // } catch (err) {
        //     return undefined;
        // }
        let role = this.getFakeRole(requester.id);
        switch (role) {
            case Roles.ADMIN:
                return true;
            case Roles.HR:
                return true;
            case Roles.MANAGER:
                return this.isManager(requester.id, data.id);
            case Roles.EMPLOYEE:
                return requester.id === data.id;
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

    private getFakeRole = (id) => {
        let role = Roles.EMPLOYEE;
        if (id in fakeIDRole) {
            return fakeIDRole[id];
        }
        return role;
    };

    private isManager = (managerID: any, employeeID: any) => {
        // TODO: probably you want to fetch a list of IDs for the X employees under manager Y
        if (managerID in fakeTeam) {
            return employeeID in fakeTeam[managerID]
        }

        return false;
    };
}