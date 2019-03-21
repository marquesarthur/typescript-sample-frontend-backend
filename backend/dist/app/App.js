"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const LoginController_1 = require("../controllers/LoginController");
const EmployeeController_1 = require("../controllers/EmployeeController");
const TokenValidator_1 = require("../validators/TokenValidator");
const EmployeeService_1 = require("../services/EmployeeService");
const EmployeeValidator_1 = require("../validators/EmployeeValidator");
const database_1 = require("../db/database");
const DocumentService_1 = require("../services/DocumentService");
const DocumentController_1 = require("../controllers/DocumentController");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // dependency injection
        let _db = database_1.db.getInstance();
        let _employeeService = EmployeeService_1.EmployeeService.getInstance(_db);
        let _documentsService = DocumentService_1.DocumentService.getInstance(_db);
        let _employeeValidator = EmployeeValidator_1.EmployeeValidator.getInstance(_db);
        let loginCtrl = new LoginController_1.LoginController(_employeeService);
        let employeeCtrl = new EmployeeController_1.EmployeeController(_employeeService, _employeeValidator);
        let documentCtrl = new DocumentController_1.DocumentController(_employeeService, _documentsService, _employeeValidator);
        let tokenValidator = new TokenValidator_1.TokenValidator();
        router.post('/login', loginCtrl.login);
        router.post('/logout', loginCtrl.logout);
        // placeholder route handler
        router.get('/api/v1/employee/:id', tokenValidator.check, employeeCtrl.profile);
        router.post('/api/v1/employee', tokenValidator.check, employeeCtrl.create);
        router.post('/api/v1/employee/:id/document/:docid', tokenValidator.check, documentCtrl.upload);
        router.get('/api/v1/employee/:id/document/:docid', tokenValidator.check, documentCtrl.get);
        this.express.use('/', router);
    }
}
exports.default = new App().express;
