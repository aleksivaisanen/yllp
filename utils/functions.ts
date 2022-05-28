/**
 * Check if string is in YYYY-MM-DD format
 * @param date date string
 * @returns boolean value of validation test
 */
export const yyyymmddValidator = (date: string) => {
  if (typeof date !== "string") return false;

  const validationPattern = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

  return validationPattern.test(date);
};

/**
 * Checks Url validity
 * source: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 * @param url url to be validated
 * @returns boolean value of validity check
 */
export const isValidHttpUrl = (url: string) => {
  let _url;

  try {
    _url = new URL(url);
  } catch (_) {
    return false;
  }

  return _url.protocol === "http:" || _url.protocol === "https:";
};

export const currentUrl =
  typeof window === "undefined" ? "" : window?.location?.href;
