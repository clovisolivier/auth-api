winston = require('winston');

    const {  createLogger, format, transports } = require('winston');
    const { combine, timestamp, label, prettyPrint } = format;

const logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' , 'timestamp':true}),
      new winston.transports.File({ filename: 'combined.log' , 'timestamp':true})
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

  module.exports = logger;