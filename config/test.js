'use strict';

module.exports = {
    env: 'test',
    db : process.env.MONGODB_URI || 'mongodb://localhost/TododbTest',
    port : process.env.PORT || 4100,
    secureKey : process.env.SECUREKEY || 'RSlOv#87K@xwzbsxe#cq0nBE9uQFeFGQpJ7l25lY^xBth$G&6'
};