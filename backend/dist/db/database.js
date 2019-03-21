"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const dbConfig = {
    host: "192.168.99.100",
    // host: "localhost",
    database: "jabc",
    user: "root",
    password: "supersecret",
    connectionLimit: 15
};
class db {
    constructor() {
        // https://stackoverflow.com/questions/51046665/mocha-hangs-after-tests-have-finished
        this.query = (sql, params) => {
            let that = this;
            return new Promise((resolve, reject) => {
                that.pool.getConnection((err, conn) => {
                    if (err)
                        reject(err);
                    conn.query(sql, params, (err, results) => {
                        if (err)
                            reject(err);
                        conn.release();
                        resolve(results);
                    });
                });
            });
        };
        this.insert = (sql, params) => {
            let that = this;
            return new Promise((resolve, reject) => {
                that.pool.getConnection((err, conn) => {
                    if (err)
                        reject(err);
                    conn.query(sql, params, (err, results) => {
                        if (err)
                            reject(err);
                        conn.release();
                        resolve(results.insertId);
                    });
                });
            });
        };
        this.createConnectionPool = () => {
            this.pool = mysql_1.createPool(dbConfig);
        };
        // necessary for testing purposes
        this.closeConnectionPool = () => {
            return new Promise((resolve, reject) => {
                if (this.pool) {
                    this.pool.end((err) => {
                        if (err)
                            reject(err);
                        resolve("success");
                    });
                }
                else {
                    resolve("success");
                }
            });
        };
        // necessary for testing purposes
        this.newConnectionPool = () => {
            let that = this;
            return new Promise((resolve, reject) => {
                that.pool = mysql_1.createPool(dbConfig);
                resolve("success");
            });
        };
        this.createConnectionPool();
    }
}
db.getInstance = () => {
    if (db._instance === undefined) {
        db._instance = new db();
    }
    return db._instance;
};
db.bool = (result) => {
    if (result.length === 0) {
        return false;
    }
    if (result.length > 1) {
        return false;
    }
    return true;
};
exports.db = db;
