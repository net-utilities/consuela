import IncreaseDaysWithoutConnections from './Verifications/IncreaseDaysWithoutConnection';
import IncreaseDaysWithoutRequests from './Verifications/DaysWithoutRequests';
import IncreaseDaysDown from './Verifications/IncreaseDaysDown';
import IncreaseDaysWithoutData from './Verifications/IncreaseDaysWithoutData';
import ShouldDatabaseBeUpdated from '../../util/ShouldDatabaseBeUpdated';
import DBUtil from '../../util/DBUtil';
import { DeviceMemberStats, IMemberStats } from '../Device.interfaces';
import {DocumentScope} from "nano";
import logger from '../../logger/winston';

const ProcessPoolMemberStatistics: (deviceName: string, deviceGroupName: string, currentStats: DeviceMemberStats) => Promise<void> =
  async (deviceName, deviceGroupName, currentStats) => {

    const dbKey = `${deviceGroupName}${currentStats.poolName.description}${currentStats.nodeName.description}:${currentStats.port.value}`;
    const db = DBUtil.getDb('f5poolmembers') as DocumentScope<IMemberStats>;
    if(!db) throw 'Unable to connect to the database';

    let dbStats: IMemberStats;
    try {
      dbStats = await db.get(dbKey)
      logger.debug(`${dbKey} exists}`)
    } catch (e){
      if(e.reason !== 'missing') throw e;
      // No document exists, crease a new one
      logger.info(`_id ${dbKey} did not exist, creating it`);
      dbStats = {
        ...currentStats,
        _id: dbKey,
        deviceName: deviceName,
        deviceGroupName: deviceGroupName,
        daysDown: 0,
        daysWithoutConnections: 0,
        daysWithoutData: 0,
        daysWithoutRequests: 0,
        lastChecked: 0,
      }
    }

    const currentTime = Date.now();

    // Verify that the stats comes from the same device
    if(dbStats.deviceName === deviceName) {
      if (ShouldDatabaseBeUpdated(dbStats.lastChecked, currentTime)) {
        logger.info(`Last test for ${dbKey} was made on a previous day, updating stats`);
        dbStats.daysDown = IncreaseDaysDown(currentStats) ? ++dbStats.daysDown : 0;
        dbStats.daysWithoutConnections = IncreaseDaysWithoutConnections(currentStats, dbStats) ? ++dbStats.daysWithoutConnections : 0;
        dbStats.daysWithoutData = IncreaseDaysWithoutData(currentStats, dbStats) ? ++dbStats.daysWithoutData : 0;
        dbStats.daysWithoutRequests = IncreaseDaysWithoutRequests(currentStats, dbStats) ? ++dbStats.daysWithoutRequests : 0;
        dbStats.lastChecked = currentTime;
        await db.insert(dbStats);
      } else {
        logger.info(`Fresh document for ${dbKey} exists, no update will be made`);
      }
    } else {

      // A failover has occurred, replace the stats with the current device stats and wait until the next day
      logger.warn('A failover has occurred, update stats document and wait until the next day');
      dbStats = {
        ...dbStats,                 // Start with databaseDocument
        ...currentStats,            // Then overwrite the connectionStats
        deviceName: deviceName,     // Then overwrite the device name
      }
      dbStats.deviceName = deviceName;
      await db.insert(dbStats);
    }

}

export default ProcessPoolMemberStatistics;
