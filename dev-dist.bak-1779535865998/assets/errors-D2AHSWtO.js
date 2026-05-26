import { o as e } from './index-CXmOAr77.js'
function t(t) {
  if (!(t instanceof e)) return {}
  let n = t.response?.data
  if (!n || typeof n != `object`) return {}
  let r = {}
  for (let [e, t] of Object.entries(n))
    t &&
      typeof t == `object` &&
      `message` in t &&
      typeof t.message == `string` &&
      (r[e] = t.message)
  return r
}
function n(n) {
  if (!(n instanceof e)) return n instanceof Error ? n.message : `An unexpected error occurred.`
  let r = Object.values(t(n))
  return r.length > 0 ? r.join(` `) : n.message || `An unexpected error occurred.`
}
export { n, t }
