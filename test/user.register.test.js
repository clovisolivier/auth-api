'use strict';

var app = require('../server.js'),
chai = require('chai'),
request = require('supertest');
// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

var expect = chai.expect;

describe('Todos list API Registration Tests', function(){
    describe('#POST /auth/register', function (){
        var user = {
            fullName : 'fullNameTest',
            email : 'test.test@gmail.com'
        }
        it('should not be registered, missing password', function (done){
            request(app).post('/auth/register').send(user)
            .end(function(err, res){
                expect(res.statusCode).to.equal(500);
                done();
            });
        });
    });

    describe('#POST /auth/register', function (){
        var user = {
            fullName : 'fullNameTest',
            email : 'test.test@gmail.com',
            password : 'passwordTest'
        }
        it('should not be registered', function (done){
            request(app).post('/auth/register').send(user)
            .end(function(err, res){
                expect(res.statusCode).to.equal(400);
                done();
            });
        });
    });

    describe('#POST /auth/register', function (){
        var user = {
            fullName : 'fullNameTest',
            email : chance.email(),
            password : 'passwordTest'
        }
        it('should be registered', function (done){
            request(app).post('/auth/register').send(user)
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body.fullName).to.equal(user.fullName);
                expect(res.body.email).to.equal(user.email);
                done();
            });
        });
    });
});

