import {IMemberStats, DeviceMemberStats} from '../../Device.interfaces';

const IncreaseDaysWithoutConnections = (currentStats: DeviceMemberStats, dbStats: IMemberStats): boolean => {
  return currentStats['serverside.totConns'].value <= dbStats['serverside.totConns'].value;
}

export default IncreaseDaysWithoutConnections;
