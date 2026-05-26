import { n as addDays } from './startOfMonth-2OCUkoeN.js'
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subDays.js
/**
 * The {@link subDays} function options.
 */
/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(date, amount, options) {
  return addDays(date, -amount, options)
}
//#endregion
export { subDays as t }

//# sourceMappingURL=subDays-D7_va67k.js.map
