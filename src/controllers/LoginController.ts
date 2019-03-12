import {sign} from 'jsonwebtoken';
import {Base64} from 'js-base64';
import {EmployeeService} from "../services/EmployeeService";


export class LoginController {

    private _employeeService: EmployeeService;

    constructor(_employeeService) {
        this._employeeService = _employeeService;
    }

    public login = async (req, res, next) => {
        let email = req.body.email;
        let password = Base64.decode(req.body.password);

        if (email && password) {
            try {
                let employee = await this._employeeService.getEmployeeByEmail(email);
                if (employee && email === employee.email && password === Base64.decode(employee.password)) {
                    this.generateToken(req, res, next, employee)
                } else {
                    res.status(403).json({
                        success: false,
                        message: 'Incorrect username or password',
                        user: employee
                    });
                }

            } catch (err) {
                res.status(403).json({
                    success: false,
                    message: 'Incorrect username or password',
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    };

    public generateToken = async (req, res, next, data) => {
        let token = sign({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            },
            'secret in some server file',
            {
                expiresIn: '24h' // expires in 24 hours
            }
        );
        // return the JWT token for the future API calls
        res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
        });
    };

    public logout = (req, res, next) => {

    };
}