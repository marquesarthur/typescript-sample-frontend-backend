import {db} from "../db/database";
import {Employee} from "../model/employee";


export class EmployeeService {

    private static _instance: EmployeeService;

    private _db: db;

    constructor(_db) {
        this._db = _db;
    }

    public getEmployeeByEmail = async (email) => {
        let statement = "SELECT * FROM employees WHERE email = ?";
        try {
            let result = await this._db.query(statement, [email]);
            return Employee.fromDB(result);
        } catch (err) {
            return undefined;
        }
    };

    public getEmployeeByID = async (id) => {
        let statement = "SELECT * FROM employees WHERE id = ?";
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
    }
}