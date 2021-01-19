import {IDeviceGroup, IF5Config, IReport} from '../config.interfaces';
import DBUtil from '../util/DBUtil';
import Queue from 'better-queue';
import {DocumentScope} from 'nano';
import GetBigIPReportDeviceGroups from './BigIPReportDeviceGroups/GetBigIPReportDeviceGroups';
import {IMemberStats} from './Device.interfaces';
import {Device} from './Device';
import {reportConfig} from '../config';
import logger from '../logger/winston';

/**
 *  Retrieves pool member statistics from the devices specified in the f5Config parameter
 */

// Initiate the report that will be used in the report transports
const report: IReport = {
  poolsDown: 0,
  noData: 0,
  failedDevices: [],
}

const q = new Queue(async function(task: {id: string, deviceGroup: IDeviceGroup, f5Config: IF5Config }, cb) {

  const { id, deviceGroup, f5Config } = task;

  for (const deviceDNS of deviceGroup.devices) {
    const device: Device = new Device(deviceDNS, deviceGroup.name, f5Config.username, f5Config.password);
    if (await device.isActive()) {
      logger.info(`${deviceDNS} is active, getting pools`);
      await device.getPools();
    } else {
      logger.info(`${deviceDNS} is not active, skipping it.`);
    }
  }
  cb(null)

}, { concurrent: 10 });

q.on('task_failed', (taskId: string, errorMessage) => {
  logger.error(`Not able to reach ${taskId}`);
  report.failedDevices.push(taskId);
});

q.on('drain', async () => {
  logger.info('Done with fetching pool stats');
  await generateReport();
  process.exit(0);
});

const GetStats: (f5Config: IF5Config) => Promise<void> = async (f5Config) => {

  // If configure get the device groups from BigIPReport
  let deviceGroups: IDeviceGroup[] = [];

  if (f5Config.bigipReportBaseUrl && f5Config.bigipReportBaseUrl != '') {
    deviceGroups = deviceGroups.concat(await GetBigIPReportDeviceGroups(f5Config.bigipReportBaseUrl));
  }

  // Remove ignored device groups
  deviceGroups = deviceGroups.filter(dg => !f5Config.ignoreDeviceGroups.some(ignoredDg => ignoredDg.toLowerCase() === dg.name.toLowerCase()));
  deviceGroups = deviceGroups.concat(f5Config.explicitDeviceGroups);

  for (const deviceGroup of deviceGroups) {
    logger.info(`Adding device group ${deviceGroup.name} to the queue`);
    q.push({id: deviceGroup.name, deviceGroup: deviceGroup, f5Config: f5Config });
  }

}

async function generateReport () {

  // Generate the report
  const db = await DBUtil.getDb('f5poolmembers') as DocumentScope<IMemberStats>
  if (!db) throw 'Database not found';
  const result = await db.find({
    "limit": 10000,
    "selector": {
      "$and": [
        {
          "_id": {
            "$gt": null
          }
        },
        {
          "lastChecked": {
            "$gt": (Date.now() - 86400000),
          }
        },
      ],
      "$or": [
        {
          "daysDown": {
            "$gt": reportConfig.reportWhen?.poolsDownDays
          }
        },
        {
          "daysWithoutData": {
            "$gt": reportConfig.reportWhen?.noDataDays
          }
        },
      ],
    },
  });

  // Increase the counters for things that has been down for longer than <poolDownDays>
  // or has not received any data for <noDataDays>
  for (const doc of result.docs) {
    if (doc.daysDown >= reportConfig.reportWhen.poolsDownDays) report.poolsDown++
    if (doc.daysWithoutData >= reportConfig.reportWhen.noDataDays) report.noData++
  }

  // If the report has any non-compliant entries, send it through the configured transports
  if (Object.values(report).some(v => v > 0) || report.failedDevices.length > 0) {
    for (const transport of reportConfig.reportTransports || []) {
      await transport(report);
    }
  }
}

export default GetStats;
