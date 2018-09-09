var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    User = require('./api/models/userModel'),
    bodyParser = require('body-parser'),
    jsonwebtoken = require("jsonwebtoken"),
    config = require('./config/index'),
    cors = require('cors'),
    winston = require('winston');

    const { createLogger, format, transports } = require('winston');
    const { combine, timestamp, label, prettyPrint } = format;

const logger = winston.createLogger({
    format: format.combine(
        format.label()
      ),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

  //
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }


//Mongo connection
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.db, { useNewUrlParser: true });

// Body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
var routes = require('./api/routes/todoListRoutes');
routes(app);

// Swagger doc
app.use(express.static('dist'));
logger.info('Swagger API running!');

// Default path
app.use(function (req, res) {
    logger.info(req.originalUrl + ' not found');
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

logger.info('Authentication API server started on : ' + port);

module.exports = app;