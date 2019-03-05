import {createConnection, createPool} from 'mysql';
import {promisify} from 'util';

// const nSQL = require("nano-sql").nSQL;

// import {nSQL} from "nano-sql";
// import {MySQLAdapter} from "nano-mysql";


export class db {

    public static pool = (sql, params) => {
        const dbConfig = {
            host: "192.168.99.100",
            database: "jabc",
            user: "root",
            password: "supersecret"
        };

        return new Promise((resolve, reject) => {
            let conn = createConnection(dbConfig);

            conn.connect((err) => {
                if (err){
                    reject(err);
                }

                conn.query(sql, params, (err, results) => {
                    if (err){
                        reject(err);
                    }
                    console.log(err);
                    resolve(results);
                });
            });
        });



        //
        //
        //
        //     db.getConnection((err, connection) => {
        //         if (err) {
        //             if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        //                 console.error('Database connection was closed.')
        //             }
        //             if (err.code === 'ER_CON_COUNT_ERROR') {
        //                 console.error('Database has too many connections.')
        //             }
        //             if (err.code === 'ECONNREFUSED') {
        //                 console.error('Database connection was refused.')
        //             }
        //         }
        //         if (connection) connection.release();
        //     });
        //
        //     db.query = promisify(db.query);
        //
        //     return db;
        // }

        // public static conn = () => {
        //
        // };

        // public static pool = async (sql, param) => {
        //     nSQL("table")
        //         .model([])
        //         .config({
        //             mode: new MySQLAdapter({ // required
        //                 host: "192.168.99.100",
        //                 database: "jabc",
        //                 user: "root",
        //                 password: "supersecret"
        //             }),
        //
        //         }).connect().then((result) => {
        //             nSQL("employees")
        //                 .query("select")
        //                 .where(["email", "=", param])
        //                 .exec().then((rows) => {
        //                 return rows;
        //             }).catch((err) => {
        //                 return undefined;
        //             });
        //     }).catch((err) => {
        //         return undefined;
        //     });


        // }

    }
}

