import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {Base64} from 'js-base64';
import { db } from "../src/db/database";
import app from '../src/app/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/v1/profile as Employee', () => {

    let userCredentials = {
        email: 'msarthur@example.com',
        password: Base64.encode('secret')
    };

    let token = undefined;



    it('employee should be able to see her own profile', () => {
        return chai.request(app).post('/login')
            .set('content-type', 'application/json')
            .send(userCredentials)
            .then(res => {
                token = res.body.token;
                return chai.request(app).get('/api/v1/employee/1')
                    .set('authorization', `Bearer ${token}`)
                    .then(res => {
                        expect(res.status).to.equal(200);
                    });
            });

    });

    it('employee should NOT be able to see others profile', () => {
        userCredentials.email = 'helena@example.com';
        return chai.request(app).post('/login')
            .set('content-type', 'application/json')
            .send(userCredentials)
            .then(res => {
                token = res.body.token;
                return chai.request(app).get('/api/v1/employee/1')
                    .set('authorization', `Bearer ${token}`)
                    .then(res => {
                        expect(res.status).to.equal(403);
                    });
            });

    });

    after(() => {
        let _db = db.getInstance();
        return _db.closeConnectionPool();
    });
});

describe('GET /api/v1/profile as Manager', () => {

    let userCredentials = {
        email: 'delreen@example.com',
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

    it('manager should be able to see her own profile', () => {
        return chai.request(app).get('/api/v1/employee/2')
            .set('authorization', `Bearer ${token}`)
            .then(res => {
                expect(res.status).to.equal(200);
            });
    });

    it('manager should be able to see her underlings profile', () => {
        return chai.request(app).get('/api/v1/employee/1')
            .set('authorization', `Bearer ${token}`)
            .then(res => {
                expect(res.status).to.equal(200);
            });
    });

    it('manager should NOT be able to see underlings under another manager supervision', () => {
        return chai.request(app).get('/api/v1/employee/4')
            .set('authorization', `Bearer ${token}`)
            .then(res => {
                expect(res.status).to.equal(403);
            });
    });

    after(() => {
        let _db = db.getInstance();
        return _db.closeConnectionPool();
    });
});