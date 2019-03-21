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
class DocumentController {
    constructor(_employeeService, _documentsService, _employeeValidator) {
        this.upload = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                let employee = yield this._employeeService.getEmployeeByID(id);
                let requestedBy = yield this._employeeService.getEmployeeByID(req.decoded.id);
                if (yield this._employeeValidator.canView(employee, requestedBy)) {
                    res.json(employee);
                }
                else {
                    res.status(403).json({
                        success: false,
                        message: 'Unable to view employee profile'
                    });
                }
            }
            catch (err) {
                res.status(400).json({
                    success: false,
                    message: 'Unable to fetch data from employee/requester'
                });
            }
        });
        this.get = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let docid = req.params.docid;
            try {
                let employee = yield this._employeeService.getEmployeeByID(id);
                let requestedBy = yield this._employeeService.getEmployeeByID(req.decoded.id);
                if (yield this._employeeValidator.canView(employee, requestedBy)) {
                    res.json(employee);
                }
                else {
                    res.status(403).json({
                        success: false,
                        message: 'Unable to view employee profile'
                    });
                }
            }
            catch (err) {
                res.status(400).json({
                    success: false,
                    message: 'Unable to fetch data from employee/requester'
                });
            }
        });
        this._employeeService = _employeeService;
        this._documentsService = _documentsService;
        this._employeeValidator = _employeeValidator;
    }
}
exports.DocumentController = DocumentController;
