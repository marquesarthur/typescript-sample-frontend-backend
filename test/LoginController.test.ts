
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Base64 } from 'js-base64';

import app from '../src/app/App';

import { db } from "../src/db/database";


chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /login', () => {

  let userCredentials = {
    email: 'arthur@email.com',
    password: Base64.encode('secret')
  };

    before(() => {
        let _db = db.getInstance();
        return _db.newConnectionPool();
    });

  it('response should have a valid oauth token', async () => {
    // CryptoJS.PBKDF2(password, salt, { keySize: 512/32, iterations: iterations });


    return chai.request(app).
      post('/login')
      .set('content-type', 'application/json')
      .send(userCredentials)
      .then(res => {
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.token).not.to.be.undefined;
        expect(res.body.success).to.be.true;
      });
  });

  it('response should fail when no email/password is provided', () => {

    // CryptoJS.PBKDF2(password, salt, { keySize: 512/32, iterations: iterations });

    return chai.request(app).
      post('/login')
      .set('content-type', 'application/json')
      .send({})
      .then(res => {
        expect(res.status).to.equal(400);
        expect(res).to.be.json;
        expect(res.body.success).to.be.false;
      });
  });

  it('response should fail when wrong password is provided', () => {

    userCredentials.password = Base64.encode('wrong-secret');

    return chai.request(app).
      post('/login')
      .set('content-type', 'application/json')
      .send(userCredentials)
      .then(res => {
        expect(res.status).to.equal(403);
        expect(res).to.be.json;
        expect(res.body.success).to.be.false;
      });
  });

  it('response should fail when wrong username is provided', () => {

    userCredentials.email = "wrong@email.com";

    return chai.request(app).
      post('/login')
      .set('content-type', 'application/json')
      .send(userCredentials)
      .then(res => {
        expect(res.status).to.equal(403);
        expect(res).to.be.json;
        expect(res.body.success).to.be.false;
      });
  });

  after(() => {
    let _db = db.getInstance();
    return _db.closeConnectionPool();
  });
});