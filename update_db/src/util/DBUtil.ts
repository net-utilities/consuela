import Nano, { ServerScope, DocumentScope } from 'nano';
import { IMemberStats } from '../f5-pools/Device.interfaces';
import logger from '../logger/winston';
import { couchDBConfig } from '../config';

let database: DocumentScope<IMemberStats>;

export default {
  connect: async () => {
    const dbURL = `http://${couchDBConfig.couchDBUser}:${couchDBConfig.couchDBPassword}@${couchDBConfig.couchDBServer}`;
    const instance = Nano(dbURL) as ServerScope;
    database = instance.db.use('f5poolmembers') as DocumentScope<IMemberStats>;
    logger.info(`Databases connected`);
  },
  getDb: (dbName: 'f5poolmembers') => {
    return database;
  },
};
