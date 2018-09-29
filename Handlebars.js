const hbs = require('nodemailer-express-handlebars'),
    path = require('path'),
    email = process.env.SENDGRID_USERNAME,
    pass = process.env.SENDGRID_PASSWORD,
    nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER ,
    auth: {
        user: email,
        pass : pass
    }
});

const handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./api/templates/'),
    extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

module.exports = smtpTransport;