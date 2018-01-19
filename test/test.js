var request = require('supertest');
var should = require('should');
var expect  = require('chai').expect;

describe('Auth app', function() {
  const app = require('../server')
  const token;
it('load the main page', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('should create user session for valid user', function (done) {
    request(app)
      .post('/login')
      .set('Accept','application/json')
      .send({"email": "chandan@gmail.com", "password": "123"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(res.body.message).to.equal('Login Successful');
      });
  });
  it('should not create user session for valid user', function (done) {
    request(app)
      .post('/login')
      .set('Accept','application/json')
      .send({"name": "c@gmail.com", "password": "123"})
      .expect('Content-Type', /json/)
      .expect(403)
      .end(function (err, res) {
      });
  });
  it('should convert image for valid user', function (done) {
    request(app)
      .post('/upload')
      .set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200,done())
  });

});