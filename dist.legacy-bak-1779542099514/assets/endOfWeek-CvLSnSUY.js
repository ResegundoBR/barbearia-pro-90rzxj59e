import { _ as e, m as t, p as n, v as r } from './format-BUAFcs3P.js'
function i(e, r, i) {
  let [a, o] = t(i?.in, e, r)
  return +n(a) == +n(o)
}
function a(e, t) {
  let n = r(e, t?.in),
    i = n.getMonth()
  return (n.setFullYear(n.getFullYear(), i + 1, 0), n.setHours(23, 59, 59, 999), n)
}
function o(t, n) {
  let i = e(),
    a =
      n?.weekStartsOn ??
      n?.locale?.options?.weekStartsOn ??
      i.weekStartsOn ??
      i.locale?.options?.weekStartsOn ??
      0,
    o = r(t, n?.in),
    s = o.getDay(),
    c = (s < a ? -7 : 0) + 6 - (s - a)
  return (o.setDate(o.getDate() + c), o.setHours(23, 59, 59, 999), o)
}
export { a as n, i as r, o as t }
