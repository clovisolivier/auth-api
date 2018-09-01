var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser'),
    User = require('./api/models/userModel'),
    jsonwebtoken = require("jsonwebtoken"),
    config = require('./config/index');

mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
    if (req.header && req.headers.authorization &&req.headers.authorization.split(' '[0] ==='JWT')){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.secureKey, function(err, decode){
            if(err) req.user =undefined;
            req.user = decode;
            next();
        });
    }else {
        req.user = undefined;
        next();
    }
});

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.use(function(req, res){
    res.status(404).send({url: req.originalUrl +' not found'})
});

app.listen(port);

console.log('todo list Restful AP server started on : ' +port);

module.exports = app;