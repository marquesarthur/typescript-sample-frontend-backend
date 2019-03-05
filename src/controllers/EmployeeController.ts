import {EmployeeService} from "../services/EmployeeService";

const fakeuser = {
    email: 'msarthur@example.com',
}

export class EmployeeController {

    private _employeeService: EmployeeService;

    constructor() {
        this._employeeService = EmployeeService.getInstance();
    }

    public profile = async (req, res, next) => {
        let id = req.params.id;

        res.json(fakeuser);
    }
}