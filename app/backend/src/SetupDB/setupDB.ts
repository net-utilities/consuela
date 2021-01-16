import Nano, {Document, IdentifiedDocument, ServerScope } from 'nano';
const { COUCHDB_SERVER, COUCHDB_USER, COUCHDB_PASSWORD } = process.env;

const emit = (arg1:any, arg2: any) => {};
const ipToHost = function (doc: any) {
  emit(doc.ip, {
    "ip": doc.ip,
    "comment": doc.comment,
    "disk": doc.disk,
    "installed_at": doc.installed_at,
    "owner_name": doc.owner_name,
    "enabled": doc.enabled,
    "managed": doc.managed,
    "compute_resource_name": doc.compute_resource_name,
    "compute_profile_name": doc.compute_profile_name,
    "capabilities": doc.capabilities,
    "created_at": doc.created_at,
    "updated_at": doc.updated_at,
    "last_compile": doc.last_compile,
    "global_status_label": doc.global_status_label,
    "uptime_seconds": doc.uptime_seconds,
    "name": doc.name,
    "id": doc.id,
    "expired_on": doc.expired_on,
    "lastChecked": doc.lastChecked
  })
}

const getClient = async (maxWait: number): Promise<ServerScope> => new Promise((resolve, reject) => {

  let waited = 0;

  const t = setInterval(async () => {

      // Create the client
      const dbURL: string = `http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@${COUCHDB_SERVER}`

      try {
        const instance = Nano(dbURL) as ServerScope;
        // Verify functionality by calling a listing of databases
        await instance.db.list();
        clearInterval(t);
        resolve(instance);
    } catch (e) {
        if(waited >= maxWait){
          throw `Maximum wait time of ${maxWait/1000} seconds exceeded while waiting for the database`;
          reject(`Maximum wait time of ${maxWait/1000} seconds exceeded while waiting for the database`);
          clearInterval(t);
        }
        console.log(`Still waiting for the database to start listening on http://${COUCHDB_SERVER}`);
        waited += 1000;
    }
  }, 1000);

});

const initiateDatabase = async (instance: ServerScope) => {

  // Needed to create databases
  const existingDatabases = await instance.db.list();

  const createDb = async (db: string) => {
    if (!existingDatabases.includes(db)) {
      console.log(`${db} is missing, creating it`);
      await instance.db.create(db)
    } else {
      console.log(`${db} exists, skipping creation`);
    }
  }

  console.log('Verifying that system databases exists');
  await createDb('_users');
  await createDb('_global_changes');
  await createDb('_replicator');
  await createDb('foremanservers');
  await createDb('f5poolmembers');

  // Insert the views document
  const foremanDB = instance.use('foremanservers');
  let rev;

  try {
    const existingDocument = await foremanDB.get('_design/ipToData')
    rev = existingDocument._rev;
    console.log('Overwriting _design/ipToData');
  } catch {
    console.log('Creating _design/ipToData');
  }
  let viewDocument: Nano.ViewDocument<any> & { _rev?: string } = {
    _id: '_design/ipToData',
    views: {
      ipToData: {
        map: ipToHost
      }
    }
  };
  if(rev) viewDocument._rev = rev;
  await foremanDB.insert(viewDocument, '_design/ipToData');

};

const main = async (): Promise<void> => {
  console.log(`Waiting for the database to start`);
  const instance: ServerScope = await getClient(300000);
  console.log(`Verifying database structure`);
  await initiateDatabase(instance);
  console.log('Database setup is done');
}

export default main;
