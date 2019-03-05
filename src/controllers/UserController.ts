
const fakeuser = {
    email: 'msarthur@example.com',
}

export class UserController {

    constructor() {

    }

    public static profile = async (req, res, next) => {
        res.json(fakeuser);
    }
}