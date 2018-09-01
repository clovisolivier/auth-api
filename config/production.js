'use strict';

module.exports = {
    env: 'production',
    db : process.env.MONGOHQ_URL || process.env.MONGOHQ_URI,
    port : process.env.PORT || 4000,
    secureKey : process.env.SECUREKEY || '4DYHobqPfrR6GPFdDTuIIJQnw@J#K2tK1p7NPHV7'
};