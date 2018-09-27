'use strict';

module.exports = {
    env: 'production',
    db : process.env.MONGODB_URI ,
    port : process.env.PORT ,
    secureKey : process.env.SECUREKEY 
};