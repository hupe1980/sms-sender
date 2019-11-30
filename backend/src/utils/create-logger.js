const winston = require('winston');

let logger;

module.exports.createLogger = () => {
  if (!logger) {
    logger = winston.createLogger({
      level: 'debug',
      format: winston.format.json(),
      transports: [new winston.transports.Console()]
    });
  }

  return logger;
};
