import winston, { transport } from 'winston';
import LogzioWinstonTransport from 'winston-logzio';
import { logzioConfig } from '../config';


const winstonTransports: transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ message: true }),
    )
  })
]

// Verify that the logz.io config has a valid config
if (!Object.values(logzioConfig).some(v => v === '')){
  console.log('Valid logz.io config found. Adding it to the transports array.')
  winstonTransports.push(
    new LogzioWinstonTransport(
      {
        level: 'info',
        name: logzioConfig.type,
        protocol: 'https',
        port: '8071',
        type: logzioConfig.type,
        token: logzioConfig.token,
        host: logzioConfig.listenerHost,
      }
    )
  )
} else {
  console.log('Did not find any valid logz.io config, skipping.')
}

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: winstonTransports
});

export default logger;
