import { getPreferredLocale } from "./i18n";

const SEVEN_DAYS_IN_MILLISECONDS = 604800000;

/**
 * Today: return time (hour, minutes)
 * Last week: return weekday + hour
 * Same year: return month day
 * Other year: return year month day
 * @param date Date to format
 * @returns Date formatted relatively
 */
export const getRelativeTime = (date: Date | number) => {
  if (typeof date === "number") date = new Date(date);
  const dateTimestamp = date.getTime();
  const dateDayOfTheMonth = date.getDate();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();

  const now = new Date();
  const nowTimestamp = now.getTime();
  const nowDayOfTheMonth = now.getDate();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();

  const locale = getPreferredLocale();

  // same day
  if (
    dateDayOfTheMonth === nowDayOfTheMonth &&
    dateMonth === nowMonth &&
    dateYear === nowYear
  ) {
    return date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
    });
  }
  // last week
  if (
    nowTimestamp > dateTimestamp &&
    nowTimestamp - SEVEN_DAYS_IN_MILLISECONDS < dateTimestamp
  ) {
    return date.toLocaleTimeString(locale, {
      weekday: "short",
      hour: "numeric",
    });
  }
  // same year
  if (dateYear === nowYear) {
    return date.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
    });
  }
  // other
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
