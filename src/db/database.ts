import { createConnection, createPool } from 'mysql';
import {promisify} from 'util';

export class db {

    public static pool = () => {
        const dbConfig = {
            host: "localhost",
            database: "jabc",
            user: "root",
            password: "supersecret",
            connectionLimit: 10,
        }
    
        const db: any = createPool(dbConfig);
        
    

        db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.')
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.')
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.')
                }
            }
            if (connection) connection.release();
        });
    
        db.query = promisify(db.query);

        return db;
    }
}

