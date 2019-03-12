export class Employee {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public privilege: number;
    public manager_id: number;

    constructor(id, firstName, lastName, email, password, privilege, manager_id) {
        this.id = Number(id);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.privilege = privilege;
        this.manager_id = manager_id;

    }

    static fromDB = (result) => {
        if (result.length === 0) {
            throw Error("Empty result");
        }
        if (result.length > 1) {
            throw Error("More than one result for query");
        }

        let employee = result[0];

        return new Employee(employee["id"],
            employee["first_name"],
            employee["last_name"],
            employee["email"],
            employee["password"],
            employee["privileges_id"],
            employee["manager_id"]);
    }
}