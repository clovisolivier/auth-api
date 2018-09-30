'use strict';

module.exports = {
    env: 'development',
    db : process.env.MONGODB_URI ,
    port : process.env.PORT ,
    secureKey : process.env.SECUREKEY,
    mailerServiceProvider : process.env.MAILER_SERVICE_PROVIDER,
    sendgrid_username : process.env.SENDGRID_USERNAME,
    sendgrid_password : process.env.SENDGRID_PASSWORD,
    endpoint : process.env.ENDPOINT,
    mailFrom : process.env.MAIL_FROM
};