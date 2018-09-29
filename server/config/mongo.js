
'use strict';
module.exports = function (dbURI) {
    const mongoose = require('mongoose');
    const User = require('../api/models/userModel');

    //Mongo connection
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true);
    mongoose.connect(dbURI, { useNewUrlParser: true });
};