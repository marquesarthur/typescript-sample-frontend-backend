
const fakeuser = {
    email: 'msarthur@example.com',
}

export class UserController {

    constructor() {

    }

    public static profile = (req, res, next) => {
        res.json(fakeuser);
    }
}