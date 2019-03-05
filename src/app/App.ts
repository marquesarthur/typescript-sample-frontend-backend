import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import { nSQL } from "nano-sql";
import { MySQLAdapter } from "nano-mysql";
import {LoginController} from "../controllers/LoginController";
import {UserController} from "../controllers/UserController";
import {Roles} from "../validators/RolesValidator";


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
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    
    router.post('/login', LoginController.login);
    router.post('/logout', LoginController.logout);


    // placeholder route handler
    router.get('/api/user/:id', Roles.check, UserController.profile );
    this.express.use('/', router);
  }

  private database(): void {
    nSQL([
    ]).config({
        mode: new MySQLAdapter({ // required
                host: "localhost",
                database: "jabc",
                user: "root",
                password: "supersecret"
        }),
    }).connect();
  }

}

export default new App().express;