import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import {LoginController} from "../controllers/LoginController";
import {EmployeeController} from "../controllers/EmployeeController";
import {RolesValidator} from "../validators/RolesValidator";


// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();

        let loginCtrl = new LoginController();
        let employeeCtrl = new EmployeeController();
        let rolesValidator = new RolesValidator();

        router.post('/login', loginCtrl.login);
        router.post('/logout', loginCtrl.logout);


        // placeholder route handler
        router.get('/api/v1/employee/:id', rolesValidator.check, employeeCtrl.profile);
        this.express.use('/', router);
    }
}

export default new App().express;