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
