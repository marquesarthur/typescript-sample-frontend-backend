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
const employee_1 = require("../model/employee");
class DocumentService {
    constructor(_db) {
        this.getDocumentData = (id) => __awaiter(this, void 0, void 0, function* () {
            let statement = "SELECT * FROM employee WHERE id = ?";
            try {
                let result = yield this._db.query(statement, [id]);
                return employee_1.Employee.fromDB(result);
            }
            catch (err) {
                return undefined;
            }
        });
        this._db = _db;
    }
}
DocumentService.getInstance = (_db) => {
    if (DocumentService._instance === undefined) {
        DocumentService._instance = new DocumentService(_db);
    }
    return DocumentService._instance;
};
exports.DocumentService = DocumentService;
