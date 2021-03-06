'use strict';

const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User'),
    async = require('async'),
    crypto = require('crypto'),
    smtpTransport = require('../../../Handlebars.js'),
    config = require('../../../config/index'),
    logger = require('../../../logger'),
    moment = require('moment');

/*
exports.test = function (req, res) {
    return res.status(200).send({message: 'OK'});
};
*/

exports.register = function (req, res) {

    let newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function (err, user) {
        if (err) {
            logger.error(err);
            return res.status(400).send({
                message: err
            });
        } else {
            user.hash_password = undefined;
            logger.info(user);
            return res.json(user);
        }
    })
};

exports.sign_in = function (req, res) {

    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) logger.error(err);
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                res.json({
                    token: jwt.sign({
                        email: user.email,
                        fullName: user.fullName,
                        _id: user._id
                    }, config.secureKey
                    )
                });
            }
        }
    });
};

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorised user!' });
    }
};

exports.forgot_password = function (req, res) {
    async.waterfall([
        function (done) {
            User.findOne({
                email: req.body.email
            }).exec(function (err, user) {
                if (user) {
                    done(err, user);
                } else {
                    done('User not found.');
                }
            });
        },
        function (user, done) {
            crypto.randomBytes(20, function (err, buffer) {
                let token = buffer.toString('hex');
                done(err, user, token);
            });
        },
        function (user, token, done) {
            user.reset_password_token = token;
            user.reset_password_expires = moment().add(1, 'day').valueOf();
            user.save(function (err, user) {
                if (err) {
                    logger.error(err);
                    done(err);
                } else {
                    user.hash_password = undefined;
                    logger.info(user);
                    done(err, user, token);
                }
            })
        },
        function (user, token, done) {
            let data = {
                to: user.email,
                from: config.mailFrom,
                template: 'forgot-password-email',
                subject: 'Password help has arrived!',
                context: {
                    url: config.endpoint + '/reset_password?token=' + token,
                    name: user.fullName.split(' ')[0]
                }
            };
            smtpTransport.sendMail(data, function (err) {
                if (!err) {
                    return res.json({ message: 'Kindly check your email for further instructions' });
                } else {
                    logger.error(err);
                    return done(err);
                }
            })
        }
    ], function (err) {
        logger.error(err);
        return res.status(422).json({ message: err });
    });
};

exports.reset_password = function (req, res, next) {
    User.findOne({
        reset_password_token: req.body.token,
        reset_password_expires: {
            $gt: moment().valueOf()
        }
    }).exec(function (err, user) {
        if (!err && user) {
            if (req.body.newPassword === req.body.verifyPassword) {
                user.hash_password = bcrypt.hashSync(req.body.newPassword, 10);
                user.reset_password_token = undefined;
                user.reset_password_expires = undefined;
                user.save(function (err) {
                    if (err) {
                        logger.error(err);
                        return res.status(422).send({
                            message: err
                        });
                    } else {
                        let data = {
                            to: user.email,
                            from: emailfrom,
                            template: 'reset-password-email',
                            subject: 'Password Reset Confirmation',
                            context: {
                                name: user.fullName.split(' ')[0]
                            }
                        };

                        smtpTransport.sendMail(data, function (err) {
                            if (!err) {
                                return res.json({ message: 'Password reset' });
                            } else {
                                logger.error(err);
                                return done(err);
                            }
                        });
                    }
                });
            } else {
                return res.status(422).send({
                    message: 'Passwords do not match'
                });
            }
        } else {
            return res.status(400).send({
                message: 'Password reset token is invalid or has expired.'
            });
        }
    });
};