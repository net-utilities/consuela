import Nano, { ServerScope, DocumentScope } from 'nano';
import { DBMemberStats } from '../Interfaces/MemberStats';

let databases: {
  f5poolmembers?: DocumentScope<DBMemberStats>,
  foremanservers?: DocumentScope<DBMemberStats>,
} = {
  f5poolmembers: undefined,
  foremanservers: undefined,
}

export default {
  connect: async (dbName: 'f5poolmembers' | 'foremanservers') => {

    const { COUCHDB_SERVER, COUCHDB_USER, COUCHDB_PASSWORD } = process.env;

    const dbURL: string = `http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@${COUCHDB_SERVER}`

    try {
      const instance = Nano(dbURL) as ServerScope;
      const db = instance.db.use(dbName);
      databases[dbName] = db as DocumentScope<DBMemberStats>;
      console.log(`Database ${dbName} connected`);
    } catch (error) {
      throw error;
      throw `Unable to connect to ${dbName}`;
    }
  },
  getDb: (dbName: 'f5poolmembers' | 'foremanservers') => databases[dbName],
};
