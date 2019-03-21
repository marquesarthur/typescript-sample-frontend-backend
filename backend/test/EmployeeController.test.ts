import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {Base64} from 'js-base64';
import { db } from "../src/db/database";
import app from '../src/app/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/v1/profile as Employee', () => {

    let userCredentials = {
        email: 'arthur@email.com',
        password: Base64.encode('secret')
    };

    let token = undefined;

    before(() => {
        let _db = db.getInstance();
        return _db.newConnectionPool();
    });

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
        userCredentials.email = 'bidu@email.com';
        return chai.request(app).post('/login')
            .set('content-type', 'application/json')
            .send(userCredentials)
            .then(res => {
                token = res.body.token;
                return chai.request(app).get('/api/v1/employee/2')
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
        email: 'bidu@email.com',
        password: Base64.encode('secret')
    };

    let token = undefined;

    before(() => {
        let _db = db.getInstance();
        return _db.newConnectionPool().then(() => {
            return chai.request(app).post('/login')
                .set('content-type', 'application/json')
                .send(userCredentials)
                .then(res => {
                    token = res.body.token;
                });
        });
    });

    it('manager should be able to see her own profile', () => {
        return chai.request(app).get('/api/v1/employee/6')
            .set('authorization', `Bearer ${token}`)
            .then(res => {
                expect(res.status).to.equal(200);
            });
    });

    it('manager should be able to see her underlings profile ', () => {
        return chai.request(app).get('/api/v1/employee/7')
            .set('authorization', `Bearer ${token}`)
            .then(res => {
                expect(res.status).to.equal(200);
            });
    });



    it('manager should NOT be able to see underlings under another manager supervision', () => {
        return chai.request(app).get('/api/v1/employee/3')
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

describe('POST /api/v1/employee as Admin', () => {

    let userCredentials = {
        email: 'arthur@email.com',
        password: Base64.encode('secret')
    };

    let token = undefined;

    before(() => {
        let _db = db.getInstance();
        return _db.newConnectionPool().then(() => {
            return chai.request(app).post('/login')
                .set('content-type', 'application/json')
                .send(userCredentials)
                .then(res => {
                    token = res.body.token;
                })
        });
    });

    // INSERT INTO  employee (first_name, last_name, password, SIN, email, role_id, privileges_id, manager, status) VALUES ('Joao', '-', 'c2VjcmV0', '12345678', 'joao@email.com', 2, 1, 1, 'ACTIVE');
    it('admin should be able to insert enployee', () => {
        let r = new Date().getTime();
        let data = {
            firstName: "Hello",
            lastName: "World",
            password: Base64.encode('secret'),
            SIN: '12345656',
            email: `unique${r}@example.com`,
            role: 2,
            privilege: 2,
            manager: 1,
            status: 'ACTIVE'
        };
        return chai.request(app).post('/api/v1/employee')
            .set('content-type', 'application/json')
            .set('authorization', `Bearer ${token}`)
            .send(data)
            .then(res => {
                expect(res.status).to.equal(201); // means created
                expect(res.body.id).not.to.be.undefined; // the response should contain an ID for the newly created entity
            });
    });

    after(() => {
        let _db = db.getInstance();
        return _db.closeConnectionPool();
    });
});