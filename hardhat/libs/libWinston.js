const {createLogger,format,transports} = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

require('dotenv').config();


const logDir = process.env.LOGDIR

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new transports.File({filename: logDir+'aa.log'})
    ]
});

module.exports.Log = function(message)
{
    logger.log('info',message);
}