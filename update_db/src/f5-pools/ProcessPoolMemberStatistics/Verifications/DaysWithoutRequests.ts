import {IMemberStats, DeviceMemberStats} from '../../Device.interfaces';

const IncreaseDaysWithoutRequests = (currentStats: DeviceMemberStats, dbStats: IMemberStats): boolean => {
  return currentStats.totRequests.value <= dbStats.totRequests.value;
}

export default IncreaseDaysWithoutRequests;
