
import { sign } from 'jsonwebtoken';
import { Base64 } from 'js-base64';


const fakeuser = {
    email: 'msarthur@example.com',
    password: Base64.encode('secret')
}

export class LoginController {

    constructor() {

    }

    public static login = (req, res, next) => {
        let email = req.body.email;
        let password = Base64.decode(req.body.password);

        if (email && password) {
            if (email === fakeuser.email && password === Base64.decode(fakeuser.password)) {
                LoginController.generateToken(req, res, next, { email: email, password: password })
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    }

    public static generateToken = (req, res, next, data) => {
        let token = sign(data,
            'secret in some server file',
            {
                expiresIn: '24h' // expires in 24 hours
            }
        );
        // return the JWT token for the future API calls
        res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
        });
    }

    public static logout = (req, res, next) => {

    }
}