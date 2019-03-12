import {EmployeeService} from "../services/EmployeeService";
import {EmployeeValidator} from "../validators/EmployeeValidator";
import {DocumentService} from "../services/DocumentService";


export class DocumentController {

    private _employeeService: EmployeeService;
    private _documentsService: DocumentService;
    private _employeeValidator: EmployeeValidator;

    constructor(_employeeService, _documentsService, _employeeValidator) {
        this._employeeService = _employeeService;
        this._documentsService = _documentsService;
        this._employeeValidator = _employeeValidator;
    }

    public upload = async (req, res, next) => {
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
    };

    public get = async (req, res, next) => {
        let id = req.params.id;
        let docid = req.params.docid;

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
    };
}