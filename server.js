var config = require('./config/index'),
    express = require('express'),
    winstonInstance = require('./logger'),
    expressWinston = require('express-winston'),
    app = express(),
    port = process.env.PORT,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    User = require('./api/models/userModel'),
    bodyParser = require('body-parser'),
    jsonwebtoken = require("jsonwebtoken"),
    cors = require('cors'),
    logger = require('./logger'),
    helmet = require('helmet'),
    cookieParser = require('cookie-parser'),
    compress = require('compression'),
    methodOverride =require('method-override'),
    path = require('path'),
    appRoot = require('app-root-path'),
    morgan = require('morgan');

    app.use(morgan('tiny'));
//Mongo connection
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.db, { useNewUrlParser: true });

// Body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// header settings
app.use(cors());

// auth
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

// Swagger doc
/*app.use(express.static(path.join(appRoot.path, 'swagger')));
app.get('*', (req, res) => {
    res.sendFile(path.join(appRoot.path, 'swagger/index.html'));
  });*/

/*
app.use(express.static(path.join(appRoot.path, 'swagger')));
app.get('/swagger', (req, res) => {
    res.sendFile(path.join(appRoot.path, 'swagger/index.html'));
  });

logger.info('Swagger API running!');
*/

// Routing
var routes = require('./api/routes/routes');
routes(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Error path
app.use(function (req, res) {
    logger.info(req.originalUrl + ' not found');
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.use(expressWinston.errorLogger({
    winstonInstance
  }));

app.listen(port);

logger.info('Authentication API server started on : ' + port);

module.exports = app;