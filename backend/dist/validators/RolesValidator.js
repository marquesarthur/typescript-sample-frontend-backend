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
const EmployeeService_1 = require("../services/EmployeeService");
class RolesValidator {
    constructor() {
        this.check = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            if (token) {
                jsonwebtoken_1.verify(token, 'secret in some server file', (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'Token is not valid'
                        });
                    }
                    else {
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
                }));
            }
            else {
                return res.json({
                    success: false,
                    message: 'Auth token is not supplied'
                });
            }
        });
        // TODO
        this.hasPermission = (req, decoded) => __awaiter(this, void 0, void 0, function* () {
            let email = decoded["email"];
            try {
                let employee = yield this._employeeService.getEmployeeByEmail(email);
                return true;
            }
            catch (err) {
                return false;
            }
        });
        this._employeeService = EmployeeService_1.EmployeeService.getInstance();
    }
}
exports.RolesValidator = RolesValidator;
