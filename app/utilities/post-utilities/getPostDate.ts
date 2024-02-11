import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  intlFormat,
  isYesterday,
} from "date-fns";

export function getPostDate(timePosted: Date) {
  const currentDate = new Date();

  const secondsDifference = differenceInSeconds(currentDate, timePosted);
  const minutesDifference = differenceInMinutes(currentDate, timePosted);
  const hoursDifference = differenceInHours(currentDate, timePosted);
  const daysDifference = differenceInDays(currentDate, timePosted);

  if (secondsDifference < 60) {
    return `${secondsDifference} second${
      secondsDifference === 1 ? "" : "s"
    } ago`;
  }

  if (minutesDifference < 60) {
    return `${minutesDifference} minute${
      minutesDifference === 1 ? "" : "s"
    } ago`;
  }

  if (hoursDifference < 24) {
    return `${hoursDifference} hour${hoursDifference === 1 ? "" : "s"} ago`;
  }

  if (isYesterday(timePosted)) {
    return `Yesterday`;
  }

  if (daysDifference < 7) {
    return `${daysDifference} day${daysDifference === 1 ? "" : "s"} ago`;
  }

  return `${intlFormat(timePosted)}`;
}
