const express = require('express'),
    path = require('path'),
    config = require('../../config'),
    logger = require('../../logger'),
    winstonInstance = require('../../logger'),
    expressWinston = require('express-winston'),
    jsonwebtoken = require("jsonwebtoken"),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    helmet = require('helmet'),
    cookieParser = require('cookie-parser'),
    compress = require('compression'),
    methodOverride = require('method-override');

const app = express();
app.use(morgan('tiny'));

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
// Routing
const routes = require('../api/routes/routes');
routes(app);

app.use(express.static(path.join(__dirname, '../../public')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '../../public/index.html'));
});
// Error path
app.use(function (req, res) {
    logger.info(req.originalUrl + ' not found');
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.use(expressWinston.errorLogger({
    winstonInstance
}));

module.exports = app;