var express = require('express'),
    swaggerpath = express(),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser'),
    User = require('./api/models/userModel'),
    jsonwebtoken = require("jsonwebtoken"),
    config = require('./config/index'),
    argv = require('minimist')(process.argv.slice(2)),
    cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
app.use(function (req, res, next) {
    if (req.header && req.headers.authorization && req.headers.authorization.split(' '[0] === 'JWT')) {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.secureKey, function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

var routes = require('./api/routes/todoListRoutes');
routes(app);

//app.use("/v1", swaggerpath);
var swagger = require('swagger-node-express').createNew(swaggerpath);
//app.use(express.static('dist'));
swagger.setApiInfo({
    title: "Auth API doc",
    description: "API to manage user authentification",
    termsOfServiceUrl: "",
    contact: "clovis.olivier@gmail.com",
    license: "MIT",
    licenseUrl: "https://opensource.org/licenses/MIT"
});
/*
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

*/
app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

swagger.configureSwaggerPaths('', 'api-docs', '');

// Configure the API domain
var domain = 'localhost';
if (argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".')


// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
console.log('snapJob API running on ' + applicationUrl);


swagger.configure(applicationUrl, '1.0.0');

app.listen(port);

console.log('todo list Restful AP server started on : ' + port);

module.exports = app;