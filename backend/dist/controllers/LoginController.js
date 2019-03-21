"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const js_base64_1 = require("js-base64");
class LoginController {
    constructor(_employeeService) {
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let email = req.body.email;
            let password = js_base64_1.Base64.decode(req.body.password);
            if (email && password) {
                try {
                    let employee = yield this._employeeService.getEmployeeByEmail(email);
                    if (employee && email === employee.email && password === js_base64_1.Base64.decode(employee.password)) {
                        this.generateToken(req, res, next, employee);
                    }
                    else {
                        res.status(403).json({
                            success: false,
                            message: 'Incorrect username or password',
                            user: employee
                        });
                    }
                }
                catch (err) {
                    res.status(403).json({
                        success: false,
                        message: 'Incorrect username or password',
                    });
                }
            }
            else {
                res.status(400).json({
                    success: false,
                    message: 'Authentication failed! Please check the request'
                });
            }
        });
        this.generateToken = (req, res, next, data) => __awaiter(this, void 0, void 0, function* () {
            let token = jsonwebtoken_1.sign({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            }, 'secret in some server file', {
                expiresIn: '24h' // expires in 24 hours
            });
            // return the JWT token for the future API calls
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        });
        this.logout = (req, res, next) => {
        };
        this._employeeService = _employeeService;
    }
}
exports.LoginController = LoginController;
