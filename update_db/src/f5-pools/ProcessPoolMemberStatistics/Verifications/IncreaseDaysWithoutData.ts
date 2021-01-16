import {IMemberStats, DeviceMemberStats} from '../../Device.interfaces';

const IncreaseDaysWithoutData = (currentStats: DeviceMemberStats, dbStats: IMemberStats): boolean => {
  return currentStats['serverside.pktsIn'].value <= dbStats['serverside.pktsIn'].value;
}

export default IncreaseDaysWithoutData;
