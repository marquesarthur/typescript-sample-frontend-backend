import {EmployeeService} from "../services/EmployeeService";
import {EmployeeValidator} from "../validators/EmployeeValidator";
import {Employee, IEmployee} from "../model/employee";


export class EmployeeController {

    private _employeeService: EmployeeService;
    private _employeeValidator: EmployeeValidator;

    constructor(_employeeService, _employeeValidator) {
        this._employeeService = _employeeService;
        this._employeeValidator = _employeeValidator;
    }

    public profile = async (req, res, next) => {
        let id = req.params.id;

        try {
            let employee = await this._employeeService.getEmployeeByID(id);
            let requestedBy = await this._employeeService.getEmployeeByID(req.decoded.id);

            if (await this._employeeValidator.canView(employee, requestedBy)) {
                res.json(employee);
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Unable to view employee profile'
                });
            }

        } catch (err) {
            res.status(400).json({
                success: false,
                message: 'Unable to fetch data from employee/requester'
            });
        }
    }

    public create = async (req, res, next) => {
        let data = req.body;
        try {
            let requestedBy = await this._employeeService.getEmployeeByID(req.decoded.id);
            if (await this._employeeValidator.canCreate(requestedBy)) {
                let employee: IEmployee = JSON.parse(JSON.stringify(data));
                let result = await this._employeeService.insertEmployee(employee);
                res.status(201).json(result);
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Unable to view employee profile'
                });
            }

        } catch (err) {
            res.status(400).json({
                success: false,
                message: 'Unable to fetch data from employee/requester'
            });
        }
    }

}