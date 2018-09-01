'use strict';

var app = require('../server.js'),
chai = require('chai'),
request = require('supertest');
// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

var expect = chai.expect;

describe('Todos list API Sign_in Tests', function(){
    describe('#POST /auth/sign_in', function (){
        var user = {
            email : 'test.test@gmail.com',
            password: 'passwordTest'
        }
        it('should be signed_in', function (done){
            request(app).post('/auth/sign_in').send(user)
            .end(function(err, res){
                expect(res.statusCode).to.equal(200);
                expect(res.body.token).to.exist;
                done();
            });
        });
    });

    describe('#POST /auth/sign_in', function (){
        var user = {
            email : 'test.test@gmail.com',
            password: 'passwordtest'
        }
        it('should not be signed_in', function (done){
            request(app).post('/auth/sign_in').send(user)
            .end(function(err, res){
                expect(res.statusCode).to.equal(401);
                expect(res.body.token).to.not.exist;
                done();
            });
        });
    });

    
});

