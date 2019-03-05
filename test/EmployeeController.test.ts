import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {Base64} from 'js-base64';

import app from '../src/app/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/v1/profile', () => {

    let userCredentials = {
        email: 'msarthur@example.com',
        password: Base64.encode('secret')
    };

    let token = undefined;

    before(() => {
        return chai.request(app).post('/login')
            .set('content-type', 'application/json')
            .send(userCredentials)
            .then(res => {
                token = res.body.token;
            })
    });


    it('response should have a valid oauth token', () => {
        return chai.request(app).get('/api/v1/employee/1')
            .set('authorization', `Bearer ${token}`)
            .then(res => {
                expect(res.status).to.equal(200);
            });
    });

});