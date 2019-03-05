
// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// import { Base64 } from 'js-base64';

// import app from '../src/app/App';

// chai.use(chaiHttp);
// const expect = chai.expect;

// describe('POST /login', () => {

//   let userCredentials = {
//     email: 'msarthur@example.com',
//     password: Base64.encode('secret')
//   }

//   let token = undefined;

//   before(() => {
//     chai.request(app).
//       post('/login')
//       .set('content-type', 'application/json')
//       .send(userCredentials)
//       .then(res => {
//         token = res.body.token;
//       })
//   })


//   it('response should have a valid oauth token', () => {

//     // CryptoJS.PBKDF2(password, salt, { keySize: 512/32, iterations: iterations });

//     return chai.request(app).
//       post('/login')
//       .set('content-type', 'application/json')
//       .set('authorization', `Bearer ${token}`)
//       .send(userCredentials)
//       .then(res => {
//         expect(res.status).to.equal(200);
//         expect(res).to.be.json;
//         expect(res.body.success).to.be.true;
//       });
//   });

// });