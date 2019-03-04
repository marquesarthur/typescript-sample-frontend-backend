"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const js_base64_1 = require("js-base64");
const fakeuser = {
    email: 'msarthur@example.com',
    password: js_base64_1.Base64.encode('secret')
};
class LoginController {
    constructor() {
    }
}
LoginController.login = (req, res, next) => {
    let email = req.body.email;
    let password = js_base64_1.Base64.decode(req.body.password);
    if (email && password) {
        if (email === fakeuser.email && password === js_base64_1.Base64.decode(fakeuser.password)) {
            LoginController.generateToken(req, res, next, { email: email, password: password });
        }
        else {
            res.status(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
};
LoginController.generateToken = (req, res, next, data) => {
    let token = jsonwebtoken_1.sign(data, 'secret in some server file', {
        expiresIn: '24h' // expires in 24 hours
    });
    // return the JWT token for the future API calls
    res.json({
        success: true,
        message: 'Authentication successful!',
        token: token
    });
};
LoginController.logout = (req, res, next) => {
};
exports.LoginController = LoginController;
