export const convertMinutesToHoursString = (minutesAmonut: number) => {
  const hours = Math.floor(minutesAmonut / 60);
  const minutes = minutesAmonut % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};
