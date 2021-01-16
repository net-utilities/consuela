import fetch from 'node-fetch';
import BigIPReportDeviceGroup from './GetBigIPReportDeviceGroups.interfaces';
import {IDeviceGroup} from '../../config.interfaces';
import logger from '../../logger/winston';

const GetBigIPReportDeviceGroups = async (baseUrl: string): Promise<IDeviceGroup[]> => {
  logger.info(`Fetching device groups from ${baseUrl}/json/devicegroups.json`);
  const deviceGroups: BigIPReportDeviceGroup[] = await fetch(`${baseUrl}/json/devicegroups.json`).then(res => res.json());
  return deviceGroups.map(dg => {
    return { name: dg.name, devices: dg.ips }
  })
}

export default GetBigIPReportDeviceGroups;
