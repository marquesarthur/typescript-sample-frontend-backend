import {db} from "../db/database";
import {Employee} from "../model/employee";


export class EmployeeService {

    private static _instance: EmployeeService;

    constructor() {

    }

    public getEmployeeByEmail = async (email) => {
        let query = "SELECT * FROM employees WHERE email = ?"; // query database to get all the players
        try {
            let result = await db.pool(query, [email]);
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