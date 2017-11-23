import mongoose from 'mongoose';
import logger from './logger';

export default {
  init: (mongoDbDetails) => {
    mongoose.connect(`mongodb://${mongoDbDetails.userName}:${mongoDbDetails.password}@${mongoDbDetails.host}:${mongoDbDetails.port}/${mongoDbDetails.dbName}`);

    mongoose.connection.once('open', () => {
      logger.info('info', 'Mongoose connection open');
    });

    mongoose.connection.on('connected', () => {
      logger.info('info', 'Mongoose connection established');
    }); 

    mongoose.connection.on('error', (err) => {  
      logger.error('crit', 'Mongoose connection issues', err);
    }); 

    mongoose.connection.on('disconnected', () => {
      logger.info('infon', 'Mongoose connection disconnected');
    });

    process.on('SIGINT', () => {  
      mongoose.connection.close(() => { 
        logger.info('info', 'Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
      }); 
    });
  }
};