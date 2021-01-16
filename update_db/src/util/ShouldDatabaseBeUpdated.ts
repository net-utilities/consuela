const ShouldDatabaseBeUpdated = (lastChecked: number, currentDate: number): boolean => {

  const currentDay = new Date(currentDate).getDay();
  const lastCheckedDay = new Date(lastChecked).getDay();

  return (currentDay !== lastCheckedDay);
}

export default ShouldDatabaseBeUpdated;
