'use strict';

module.exports = {
    env: 'development',
    db : 'mongodb://localhost/Tododb',
    port : process.env.PORT || 4000,
    secureKey : process.env.SECUREKEY || 'G9kPmwz#DlJkBAc!0peJyG96#DcnxoszRQ#NdVWe'
};