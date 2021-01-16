import { IMemberStats } from '../../Device.interfaces';

const ShouldDatabaseBeUpdated = (dbStats: IMemberStats, currentDate: number): boolean => {
  const dbDate = new Date(dbStats.lastChecked);
  const now = new Date(currentDate);

  return (dbDate.getUTCDate() !== now.getUTCDate());
}

export default ShouldDatabaseBeUpdated;
