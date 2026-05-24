import { a as e } from './index-CHmnQ-gm.js'
var t = (t) =>
    e
      .collection(`clients`)
      .getFullList({ expand: `created_by_id,preferred_barber_id`, sort: `-created`, filter: t }),
  n = (t) => e.collection(`clients`).create(t),
  r = (t, n) => e.collection(`clients`).update(t, n),
  i = () => e.collection(`business_hours`).getFullList({ sort: `day_of_week` }),
  a = (t) =>
    e
      .collection(`client_packages`)
      .getFullList({ expand: `package_id,client_id,barber_id`, sort: `-created`, filter: t }),
  o = () => e.collection(`barbers`).getFullList({ sort: `-created`, expand: `user_id` }),
  s = () => e.collection(`categories`).getFullList({ sort: `-created` }),
  c = (t) =>
    e
      .collection(`appointments`)
      .getFullList({
        expand: `service_id.category_id,barber_id,client_id,client_package_id.package_id`,
        sort: `-date`,
        filter: t,
      }),
  l = (t) =>
    e
      .collection(`appointments`)
      .getFullList({ filter: `client_id='${t}'`, expand: `service_id,barber_id`, sort: `-date` }),
  u = (t) => e.collection(`appointments`).create(t),
  d = (t, n) => e.collection(`appointments`).update(t, n),
  f = () => e.collection(`services`).getFullList({ sort: `-created` }),
  p = () => e.collection(`packages`).getFullList({ expand: `service_id`, sort: `-created` }),
  m = () => e.collection(`products`).getFullList({ sort: `-created` }),
  h = (t) =>
    e
      .collection(`product_purchases`)
      .getFullList({ filter: `client_id='${t}'`, expand: `product_id,barber_id`, sort: `-date` }),
  g = (t) =>
    e
      .collection(`product_purchases`)
      .getFullList({ expand: `product_id,client_id`, sort: `-date`, filter: t }),
  _ = (t) => e.collection(`client_logs`).getFullList({ sort: `-created`, filter: t }),
  v = (t) =>
    e.collection(`commissions`).getFullList({ expand: `barber_id`, sort: `-created`, filter: t }),
  y = () => e.collection(`payment_methods`).getFullList({ sort: `-created` })
export {
  f as _,
  o as a,
  _ as c,
  v as d,
  p as f,
  m as g,
  h,
  l as i,
  a as l,
  g as m,
  n,
  i as o,
  y as p,
  c as r,
  s,
  u as t,
  t as u,
  d as v,
  r as y,
}
