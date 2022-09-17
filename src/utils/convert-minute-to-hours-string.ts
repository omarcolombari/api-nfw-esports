export const convertMinutesToHoursString = (minutesAmonut: number) => {
  const hours = Math.floor(minutesAmonut / 60);
  const minutes = minutesAmonut % 60;

  return `${hours}:${minutes}`;
};
