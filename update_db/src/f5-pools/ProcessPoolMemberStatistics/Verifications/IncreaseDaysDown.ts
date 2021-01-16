import { DeviceMemberStats } from '../../Device.interfaces';
import logger from '../../../logger/winston';

const IncreaseDaysDown = (currentStats: DeviceMemberStats): boolean => {
  const increase = !['up', 'unchecked'].includes(currentStats.monitorStatus.description);

  // Troubleshooting purposes
  logger.info({ statsType: 'daysDown', member: `${currentStats.poolName}${currentStats.nodeName}`, increase: increase});
  return !['up', 'unchecked'].includes(currentStats.monitorStatus.description);
}

export default IncreaseDaysDown;
