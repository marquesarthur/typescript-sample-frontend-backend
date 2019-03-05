import {createConnection, createPool} from 'mysql';
import {promisify} from 'util';


export class db {

    // https://stackoverflow.com/questions/51046665/mocha-hangs-after-tests-have-finished
    public static pool = (sql, params) => {
        const dbConfig = {
            host: "192.168.99.100",
            database: "jabc",
            user: "root",
            password: "supersecret",
            connectionLimit: 15
        };

        return new Promise((resolve, reject) => {
            let pool = createPool(dbConfig);

            pool.getConnection((err, conn) => {
                if (err) reject(err);
                conn.query(sql, params, (err, results) => {
                    if (err) reject(err);
                    conn.release();
                    resolve(results);
                });
            });
        });
    }
}

