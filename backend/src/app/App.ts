import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import {LoginController} from "../controllers/LoginController";
import {EmployeeController} from "../controllers/EmployeeController";
import {TokenValidator} from "../validators/TokenValidator";
import {EmployeeService} from "../services/EmployeeService";
import {EmployeeValidator} from "../validators/EmployeeValidator";
import {db} from "../db/database";
import {DocumentService} from "../services/DocumentService";
import {DocumentController} from "../controllers/DocumentController";


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

        // dependency injection

        let _db = db.getInstance();

        let _employeeService = EmployeeService.getInstance(_db);
        let _documentsService = DocumentService.getInstance(_db);
        let _employeeValidator = EmployeeValidator.getInstance(_db);

        let loginCtrl = new LoginController(_employeeService);
        let employeeCtrl = new EmployeeController(_employeeService, _employeeValidator);
        let documentCtrl = new DocumentController(_employeeService, _documentsService, _employeeValidator);
        let tokenValidator = new TokenValidator();

        router.post('/login', loginCtrl.login);
        router.post('/logout', loginCtrl.logout);


        // placeholder route handler
        router.get('/api/v1/employee/:id', tokenValidator.check, employeeCtrl.profile);
        router.post('/api/v1/employee', tokenValidator.check, employeeCtrl.create);
        router.post('/api/v1/employee/:id/document/:docid', tokenValidator.check, documentCtrl.upload);
        router.get('/api/v1/employee/:id/document/:docid', tokenValidator.check, documentCtrl.get);

        router.get('/',  (req, res) => {
            res.send(`
                <!DOCTYPE html>
                <html>
                  <head>
                    <title>Hello</title>
                  </head>
                  <body>
                    <div id="content"></div>
            
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.2/react.js"></script>
                    <script src="/resources/app-client.js"></script>
                  </body>
                </html>
              `);
        });

        console.log(path.join(__dirname, '..', 'web'));
        this.express.use("/resources", express.static(path.join(__dirname, '..', 'web')));
        this.express.use('/', router);
    }
}

export default new App().express;