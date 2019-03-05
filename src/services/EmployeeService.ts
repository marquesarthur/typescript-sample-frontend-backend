import {db} from "../db/database";
import {Employee} from "../model/employee";


export class EmployeeService {

    private static _instance: EmployeeService;

    private _db: db;

    constructor() {
        this._db = db.getInstance();
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

    public static getInstance = () => {
        if (EmployeeService._instance === undefined) {
            EmployeeService._instance = new EmployeeService();
        }
        return EmployeeService._instance;
    }
}