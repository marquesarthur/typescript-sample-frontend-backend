import {createConnection, createPool} from 'mysql';
import {promisify} from 'util';


export class db {

    public static pool = (sql, params) => {
        const dbConfig = {
            host: "192.168.99.100",
            database: "jabc",
            user: "root",
            password: "supersecret",
            connectionLimit: 15
        };

        return new Promise((resolve, reject) => {
            let conn = createPool(dbConfig);
            conn.query(sql, params, (err, results) => {
                if (err) {
                    reject(err);
                }
                console.log(err);
                resolve(results);
            });
        });
    }
}

