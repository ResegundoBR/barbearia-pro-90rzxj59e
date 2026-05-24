import { v as toDate, y as constructFrom } from './format-CWjaJ3sL.js'
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addDays.js
/**
 * The {@link addDays} function options.
 */
/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 * @param options - An object with options
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(date, amount, options) {
  const _date = toDate(date, options?.in)
  if (isNaN(amount)) return constructFrom(options?.in || date, NaN)
  if (!amount) return _date
  _date.setDate(_date.getDate() + amount)
  return _date
}
//#endregion
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfMonth.js
/**
 * The {@link startOfMonth} function options.
 */
/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date. The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments.
 * Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed,
 * or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth(date, options) {
  const _date = toDate(date, options?.in)
  _date.setDate(1)
  _date.setHours(0, 0, 0, 0)
  return _date
}
//#endregion
export { addDays as n, startOfMonth as t }

//# sourceMappingURL=startOfMonth-CxgXnncx.js.map
