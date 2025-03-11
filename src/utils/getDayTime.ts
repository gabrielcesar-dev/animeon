export const getTodayStartTime = (): number => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

export const getTodayEndTime = (): number => {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  return date.getTime();
};
