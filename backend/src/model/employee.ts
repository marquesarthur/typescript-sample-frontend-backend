export interface IEmployee {
    SIN?: string;
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    privilege?: number;
    role?: number;
    manager?: number;
}

export class Employee implements IEmployee {

    constructor() {
    }

    static fromDB = (result) => {
        if (result.length === 0) {
            throw Error("Empty result");
        }
        if (result.length > 1) {
            throw Error("More than one result for query");
        }

        let employee = result[0];
        let x: IEmployee = new Employee();
        x.id = Number(employee["id"]);
        x.firstName = employee["first_name"];
        x.lastName = employee["last_name"];
        x.email = employee["email"];
        x.password = employee["password"];
        x.privilege = employee["privileges_id"];
        x.manager = employee["manager_id"];
        return x;
    }
}