'use strict';

const app = require('../server.js'),
chai = require('chai'),
request = require('supertest');

const expect = chai.expect;

describe('Todos list API Integration Tests', function(){
    describe('#GET / Tasks', function (){
        it('should get all tasks', function (done){
            request(app).get('/tasks')
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                
                done();
            });
        });
    });
});

describe('API Tests', function(){
    let user = {
        email : 'test.test@gmail.com',
        password: 'passwordTest'
    }
    let task = {
        name: 'integration test'
    };
    let token ='';
    describe('# Get all tasks', function() {
        it('should get all tasks', function (done){
            request(app).get('/tasks')
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });


    describe('# Create task', function() {
        it('should not create a task', function (done){
            request(app).post('/tasks').send(task)
            .end(function(err, res){
                expect(res.statusCode).to.equal(401);
                done();
            });
        });
    })

    describe('#POST /auth/sign_in', function (){
       
        it('should be signed_in', function (done){
            request(app).post('/auth/sign_in').send(user)
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body.token).to.exist;
                token = res.body.token;
                done();
            });
        });
    });

    describe('# Create task', function() {
        it('should create a task', function (done){
            request(app).post('/tasks')
            .set('Authorization', 'JWT '+token)
            .send(task)
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body.name).to.equal(task.name);
                task = res.body;
                done();
            });
        });
    })
});