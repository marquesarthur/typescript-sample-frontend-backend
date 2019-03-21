import {createConnection, createPool} from 'mysql';
import {promisify} from 'util';

import {Pool} from "mysql";

const dbConfig = {
    host: "192.168.99.100",
    // host: "localhost",
    database: "jabc",
    user: "root",
    password: "supersecret",
    connectionLimit: 15
};

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

    public insert = (sql, params) => {
        let that = this;
        return new Promise((resolve, reject) => {
            that.pool.getConnection((err, conn) => {
                if (err) reject(err);
                conn.query(sql, params, (err, results) => {
                    if (err) reject(err);
                    conn.release();
                    resolve(results.insertId);
                });
            });
        });
    };



    private createConnectionPool = () => {
        this.pool = createPool(dbConfig);
    };

    // necessary for testing purposes
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

    // necessary for testing purposes
    public newConnectionPool = () => {
        let that = this;
        return new Promise((resolve, reject) => {
            that.pool = createPool(dbConfig);
            resolve("success");
        });
    };

    public static bool = (result) => {
        if (result.length === 0) {
            return false;
        }
        if (result.length > 1) {
            return false;
        }
        return true;
    }

}

