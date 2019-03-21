import {db} from "../db/database";
import {Employee} from "../model/employee";


export class DocumentService {

    private static _instance: DocumentService;

    private _db: db;

    constructor(_db) {
        this._db = _db;
    }

    public getDocumentData = async (id) => {
        let statement = "SELECT * FROM employee WHERE id = ?";
        try {
            let result = await this._db.query(statement, [id]);
            return Employee.fromDB(result);
        } catch (err) {
            return undefined;
        }
    };

    public static getInstance = (_db) => {
        if (DocumentService._instance === undefined) {
            DocumentService._instance = new DocumentService(_db);
        }
        return DocumentService._instance;
    }
}