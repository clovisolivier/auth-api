'use strict';

var app = require('../server.js'),
chai = require('chai'),
request = require('supertest');

var expect = chai.expect;

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
    var user = {
        email : 'test.test@gmail.com',
        password: 'passwordTest'
    }
    var task = {
        name: 'integration test'
    };
    var token ='';
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