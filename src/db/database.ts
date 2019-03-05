import {createConnection, createPool} from 'mysql';
import {promisify} from 'util';

import {Pool} from "mysql";


export class db {
    
    private static _instance: db;
    private pool: Pool;
    
    constructor() {
        this.createConnectionPool();
    }
    
    
    public static getInstance = () => {
        if (db._instance === undefined) {
            db._instance = new db();
        }
        return db._instance;
    };

    // https://stackoverflow.com/questions/51046665/mocha-hangs-after-tests-have-finished
    public query = (sql, params) => {
        let that = this;
        return new Promise((resolve, reject) => {
            that.pool.getConnection((err, conn) => {
                if (err) reject(err);
                conn.query(sql, params, (err, results) => {
                    if (err) reject(err);
                    conn.release();
                    resolve(results);
                });
            });
        });
    };

    private createConnectionPool = () => {
        const dbConfig = {
            // host: "192.168.99.100",
            host: "localhost",
            database: "jabc",
            user: "root",
            password: "supersecret",
            connectionLimit: 15
        };
        this.pool = createPool(dbConfig);
    };

    public closeConnectionPool = () => {
        return new Promise((resolve, reject) => {
            if (this.pool) {
                this.pool.end((err) => {
                    if (err) reject(err);
                    resolve("success");
                });
            } else {
                resolve("success");
            }
        });
    };

}

