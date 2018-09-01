'use strict';

module.exports = {
    env: 'development',
    db : process.env.MONGODB_URI || 'mongodb://localhost/Tododb',
    port : process.env.PORT || 4000,
    secureKey : process.env.SECUREKEY || 'G9kPmwz#DlJkBAc!0peJyG96#DcnxoszRQ#NdVWe'
};