export class Employee {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

    constructor(id, firstName, lastName, email, password) {
        this.id = Number(id);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;

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
            employee["Last_name"],
            employee["email"],
            employee["passwd"]);
    }
}