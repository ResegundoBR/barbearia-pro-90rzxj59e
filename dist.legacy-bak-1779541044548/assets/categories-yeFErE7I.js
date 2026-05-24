import { a as e } from './index-Bf5nkyu_.js'
var t = () => e.collection(`categories`).getFullList({ sort: `-created` }),
  n = (t) => e.collection(`categories`).create(t),
  r = (t, n) => e.collection(`categories`).update(t, n),
  i = (t) => e.collection(`categories`).delete(t)
export { r as i, i as n, t as r, n as t }
