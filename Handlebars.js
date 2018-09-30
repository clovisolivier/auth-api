const hbs = require('nodemailer-express-handlebars'),
    config = require('./config');
    path = require('path'),
    nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: config.mailerServiceProvider ,
    auth: {
        user: config.sendgrid_username,
        pass : config.sendgrid_password
    }
});

const handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./server/api/templates/'),
    extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

module.exports = smtpTransport;