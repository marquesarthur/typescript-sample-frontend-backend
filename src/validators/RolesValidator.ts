import { sign, verify } from 'jsonwebtoken';
import { Base64 } from 'js-base64';
import {EmployeeService} from "../services/EmployeeService";

export class RolesValidator {

    private _employeeService: EmployeeService;

    constructor() {
        this._employeeService = EmployeeService.getInstance();
    }

    public check = async (req, res, next) => {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        if (token) {
            verify(token, 'secret in some server file', async (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }

                // let hasPermission = await this.hasPermission(req, decoded);
                // if (!hasPermission) {
                //     return res.status(401).json({
                //         success: false,
                //         message: 'Token is not valid'
                //     });
                // }
                // else {
                //
                // }
            });
        } else {
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    };


    // TODO
    private hasPermission = async (req, decoded) => {
        let email = decoded["email"];
        try {
            let employee = await this._employeeService.getEmployeeByEmail(email);
            return true;
        } catch (err) {
            return false;
        }

    }
}