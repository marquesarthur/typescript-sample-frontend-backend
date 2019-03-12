import {db} from "../db/database";
import {Employee, IEmployee} from "../model/employee";


export class EmployeeService {

    private static _instance: EmployeeService;

    private _db: db;

    constructor(_db) {
        this._db = _db;
    }

    public getEmployeeByEmail = async (email) => {
        let statement = "SELECT * FROM employee WHERE email = ?";
        try {
            let result = await this._db.query(statement, [email]);
            return Employee.fromDB(result);
        } catch (err) {
            return undefined;
        }
    };

    public getEmployeeByID = async (id) => {
        let statement = "SELECT * FROM employee WHERE id = ?";
        try {
            let result = await this._db.query(statement, [id]);
            return Employee.fromDB(result);
        } catch (err) {
            return undefined;
        }
    };

    public static getInstance = (_db) => {
        if (EmployeeService._instance === undefined) {
            EmployeeService._instance = new EmployeeService(_db);
        }
        return EmployeeService._instance;
    };

    public insertEmployee = async (employee: IEmployee) => {
        let statement = "INSERT INTO  employee (first_name, last_name, password, SIN, email, role_id, privileges_id, manager_id, status) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ONBOARDING')";
        let params = [employee.firstName, employee.lastName, employee.password, employee.SIN, employee.email, employee.role, employee.privilege, employee.manager];
        try {
            let insertedId = await this._db.insert(statement, params);
            return await this.getEmployeeByID(insertedId);
        } catch (err) {
            return undefined;
        }
    }
}