import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './calendar-DnDD-UYg.js'
import { t as i } from './calendar-CWpMgv7L.js'
import { t as a } from './circle-check-CN_bbvmP.js'
import { t as o } from './dollar-sign-Vxpsvwbg.js'
import { t as s } from './plus-JF1OlTCr.js'
import { t as c } from './square-pen-Co30ePO_.js'
import {
  E as l,
  J as ee,
  L as u,
  R as d,
  S as f,
  T as te,
  U as ne,
  _ as p,
  _t as re,
  a as m,
  b as h,
  c as g,
  f as _,
  n as ie,
  p as v,
  q as ae,
  r as oe,
  s as y,
  st as b,
  t as x,
  u as S,
  v as C,
  w as se,
  x as w,
  y as ce,
} from './index-CHmnQ-gm.js'
import { g as le, p as ue, t as T, v as E } from './format-BUAFcs3P.js'
import { t as de } from './startOfMonth-Dtw_Bedr.js'
import { n as fe, t as pe } from './endOfWeek-CvLSnSUY.js'
import { t as me } from './subDays-BvwDtwKl.js'
import { d as he, l as ge, m as _e, p as ve, r as ye } from './api-Zu_OBWUL.js'
import { n as be } from './errors-CkAloMCx.js'
import { a as xe, n as D, o as Se, r as Ce, t as O } from './card-DHbyifQZ.js'
import { a as we, i as k, n as Te, o as A, r as j, t as Ee } from './table-C_vNdqXn.js'
import { t as M } from './badge-C1-D0eUj.js'
import { t as N } from './checkbox-Ck8FRrCX.js'
var De = b(`copy`, [
    [`rect`, { width: `14`, height: `14`, x: `8`, y: `8`, rx: `2`, ry: `2`, key: `17jyea` }],
    [`path`, { d: `M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`, key: `zix9uf` }],
  ]),
  Oe = b(`printer`, [
    [
      `path`,
      {
        d: `M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2`,
        key: `143wyd`,
      },
    ],
    [`path`, { d: `M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6`, key: `1itne7` }],
    [`rect`, { x: `6`, y: `14`, width: `12`, height: `8`, rx: `1`, key: `1ue0tg` }],
  ]),
  ke = b(`receipt`, [
    [`path`, { d: `M12 17V7`, key: `pyj7ub` }],
    [`path`, { d: `M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8`, key: `1elt7d` }],
    [
      `path`,
      {
        d: `M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z`,
        key: `ycz6yz`,
      },
    ],
  ]),
  Ae = b(`refresh-cw`, [
    [`path`, { d: `M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`, key: `v9h5vc` }],
    [`path`, { d: `M21 3v5h-5`, key: `1q7to0` }],
    [`path`, { d: `M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`, key: `3uifl3` }],
    [`path`, { d: `M8 16H3v5`, key: `1cv678` }],
  ]),
  je = b(`trash`, [
    [`path`, { d: `M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`, key: `miytrc` }],
    [`path`, { d: `M3 6h18`, key: `d0wm0j` }],
    [`path`, { d: `M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`, key: `e791ji` }],
  ])
function P(e, t) {
  let n = E(e, t?.in)
  return (n.setHours(23, 59, 59, 999), n)
}
var F = e(t(), 1),
  Me = () => m.collection(`barbers`).getFullList({ sort: `-created`, expand: `user_id` }),
  Ne = (e) => m.collection(`barbers`).create(e),
  Pe = (e, t) => m.collection(`barbers`).update(e, t),
  I = n(),
  Fe = [
    { value: 0, label: `Dom` },
    { value: 1, label: `Seg` },
    { value: 2, label: `Ter` },
    { value: 3, label: `Qua` },
    { value: 4, label: `Qui` },
    { value: 5, label: `Sex` },
    { value: 6, label: `Sáb` },
  ]
function Ie() {
  let { hasAccess: e } = oe(),
    t = e(`staff_edit`),
    [n, b] = (0, F.useState)([]),
    [E, Ie] = (0, F.useState)([]),
    [Le, Re] = (0, F.useState)([]),
    [ze, Be] = (0, F.useState)([]),
    [Ve, He] = (0, F.useState)([]),
    [Ue, We] = (0, F.useState)([]),
    [L, R] = (0, F.useState)(`this_month`),
    [z, Ge] = (0, F.useState)(),
    [Ke, qe] = (0, F.useState)(!1),
    [B, Je] = (0, F.useState)(null),
    [Ye, Xe] = (0, F.useState)([]),
    [Ze, Qe] = (0, F.useState)(`tudo`),
    [$e, et] = (0, F.useState)([]),
    [V, tt] = (0, F.useState)(null),
    [nt, rt] = (0, F.useState)(!1),
    [H, it] = (0, F.useState)(null),
    [U, at] = (0, F.useState)([]),
    [W, ot] = (0, F.useState)([]),
    [G, st] = (0, F.useState)(`pix`),
    [ct, lt] = (0, F.useState)(!1),
    [ut, dt] = (0, F.useState)(!1),
    [ft, pt] = (0, F.useState)(null),
    [K, mt] = (0, F.useState)(null),
    [ht, gt] = (0, F.useState)(`Barbearia Pro`),
    [_t, vt] = (0, F.useState)(!1),
    [yt, bt] = (0, F.useState)(!1),
    [q, J] = (0, F.useState)({
      name: ``,
      work_level: `autonomo`,
      work_regime: `fixed`,
      commission_type: `percentage`,
      commission_value: 0,
      color: `#3b82f6`,
      payment_schedule_config: {
        frequency: `semanal`,
        cycles: [
          { workDays: [1, 2, 3], paymentDay: 4 },
          { workDays: [4, 5, 6], paymentDay: 1 },
        ],
      },
    }),
    xt = (e, t) => {
      let n = e.getDay(),
        r = `semanal`,
        i = [
          { workDays: [1, 2, 3], paymentDay: 4 },
          { workDays: [4, 5, 6], paymentDay: 1 },
          { workDays: [0], paymentDay: 1 },
        ]
      t && t.cycles && t.cycles.length > 0 && ((r = t.frequency || `semanal`), (i = t.cycles))
      let a = i.find((e) => e.workDays.includes(n))
      a ||= { workDays: [n], paymentDay: (n + 7) % 7 || 1 }
      let o = (a.paymentDay - n + 7) % 7
      o === 0 && (o = 7)
      let s = new Date(e)
      return (s.setDate(s.getDate() + o), r === `quinzenal` && s.setDate(s.getDate() + 7), s)
    },
    { toast: Y } = re(),
    X = async () => {
      ;(b(await Me()), Ie(await he()))
      try {
        ;(et(await ve()),
          Re(await m.collection(`services`).getFullList({ expand: `category_id` })),
          Be(await m.collection(`products`).getFullList({ expand: `category_id` })),
          He(await m.collection(`packages`).getFullList()),
          We(await m.collection(`commission_rules`).getFullList()))
      } catch {}
      try {
        let e = await m.collection(`settings`).getFirstListItem(`key='business_info'`)
        e && e.value && e.value.name && gt(e.value.name)
      } catch {}
    }
  ;((0, F.useEffect)(() => {
    X()
  }, []),
    ie(`barbers`, X),
    ie(`commissions`, X),
    ie(`appointments`, X),
    ie(`checkouts`, X),
    (0, F.useEffect)(() => {
      B && wt(B)
    }, [E, L, z]))
  let St = () => {
      let e = new Date()
      switch (L) {
        case `this_month`:
          return { from: de(e), to: fe(e) }
        case `this_week`:
          return { from: le(e), to: pe(e) }
        case `last_30`:
          return { from: me(e, 30), to: P(e) }
        case `last_7`:
          return { from: me(e, 7), to: P(e) }
        case `all_time`:
          return { from: new Date(0), to: new Date(2100, 1, 1) }
        case `custom`:
          return z && z.from
            ? { from: ue(z.from), to: z.to ? P(z.to) : P(z.from) }
            : { from: new Date(0), to: new Date(2100, 1, 1) }
        default:
          return { from: de(e), to: fe(e) }
      }
    },
    Z = St()
  E.filter((e) => {
    let t = e.date ? new Date(e.date) : new Date(e.created)
    return t >= Z.from && t <= Z.to
  })
  let Ct = (e, t, n) => {
      let r = Ue.find(
        (r) =>
          r.barber_id === n &&
          (r.item_type === e || (e === `package_sale` && r.item_type === `package`)) &&
          r.item_id === t,
      )
      if (
        ((r ||= Ue.find(
          (n) =>
            !n.barber_id &&
            (n.item_type === e || (e === `package_sale` && n.item_type === `package`)) &&
            n.item_id === t,
        )),
        r)
      )
        return { type: r.type, value: r.value }
      let i = 0,
        a = 0
      if (e === `service`) {
        let e = Le.find((e) => e.id === t)
        ;((i = e?.commission_rate || 0), (a = e?.expand?.category_id?.commission_percentage || 0))
      } else if (e === `product`)
        a = ze.find((e) => e.id === t)?.expand?.category_id?.commission_percentage || 0
      else if (e === `package` || e === `package_sale`) {
        let e = Ve.find((e) => e.id === t),
          n = Le.find((t) => t.id === e?.service_id)
        ;((i = n?.commission_rate || 0), (a = n?.expand?.category_id?.commission_percentage || 0))
      }
      return i > 0 ? { type: `percentage`, value: i } : { type: `percentage`, value: a }
    },
    wt = async (e) => {
      Je(e)
      try {
        let t = await ye(`barber_id='${e.id}' && status='Concluído'`),
          n = await _e(`barber_id='${e.id}'`),
          r = await ge(`barber_id='${e.id}'`),
          i = await m
            .collection(`checkouts`)
            .getFullList({ filter: `barber_id='${e.id}'`, expand: `client_id` })
            .catch(() => []),
          a = St(),
          o = E.filter((t) => {
            if (t.barber_id !== e.id || t.is_advance) return !1
            let n = t.date ? new Date(t.date) : new Date(t.created)
            return n >= a.from && n <= a.to
          })
        o.forEach((i) => {
          let a = Q[i.type] || i.type,
            o = i.gross_amount || 0,
            s = !1,
            c = null
          if (i.appointment_id) {
            let n = t.find((e) => e.id === i.appointment_id)
            n &&
              ((a = n.expand?.service_id?.name || `Serviço`),
              (o ||= n.price || n.expand?.service_id?.price || 0),
              (s = !!n.client_package_id),
              (c = Ct(`service`, n.service_id, e.id)))
          } else if (i.product_purchase_id) {
            let t = n.find((e) => e.id === i.product_purchase_id)
            t &&
              ((a = t.expand?.product_id?.name || `Produto`),
              (o ||= t.price_at_sale || 0),
              (c = Ct(`product`, t.product_id, e.id)))
          } else if (i.client_package_id) {
            let t = r.find((e) => e.id === i.client_package_id)
            t &&
              ((a = t.expand?.package_id?.name || `Pacote`),
              (o ||= t.expand?.package_id?.price || 0),
              (c = Ct(`package`, t.package_id, e.id)))
          } else
            i.type === `consumption` &&
              ((a = `Consumo Interno`), (c = { type: `fixed`, value: Math.abs(i.amount) }))
          ;((i._itemName = a), (i._itemPrice = o), (i._packageUsed = s), (i._commissionInfo = c))
        })
        let s = new Map(),
          c = []
        o.forEach((e) => {
          e.checkout_id
            ? (s.has(e.checkout_id) || s.set(e.checkout_id, []), s.get(e.checkout_id).push(e))
            : c.push(e)
        })
        let l = []
        ;(s.forEach((e, t) => {
          let n = i.find((e) => e.id === t),
            r = e.reduce((e, t) => e + (t.gross_amount || 0), 0),
            a = e.reduce((e, t) => e + (t.amount || 0), 0),
            o = n?.expand?.client_id?.name || `Avulso`,
            s = n?.date ? new Date(n.date) : new Date(e[0].created),
            c = new Set(e.map((e) => e.type)),
            ee =
              e.length > 1
                ? `${e.length} Itens (${Array.from(c)
                    .map((e) => Q[e] || e)
                    .join(`, `)})`
                : e[0]._itemName,
            u = e.every((e) => e.status === `paid`),
            d = e.some((e) => e.status === `paid`),
            f = u ? `paid` : d ? `partial` : `pending`
          l.push({
            id: t,
            isConsolidated: !0,
            checkoutNumber: n?.checkout_number,
            checkoutObj: n,
            type: `Pedido`,
            client: o,
            item: ee,
            date: s,
            time: T(s, `HH:mm`),
            packageUsed: e.some((e) => e._packageUsed),
            price: n?.total_amount === void 0 ? r : n.total_amount,
            commission: a,
            dueDate: e[0].due_date ? new Date(e[0].due_date) : null,
            commDate: e[0].date ? new Date(e[0].date) : s,
            commissionObj: e[0],
            basePrice: r,
            comms: e,
            status: f,
          })
        }),
          c.forEach((e) => {
            let i = e.date ? new Date(e.date) : new Date(e.created),
              a = Q[e.type] || e.type
            e.type === `consumption`
              ? (a = `Consumo`)
              : e.appointment_id
                ? (a = `Serviço`)
                : e.product_purchase_id
                  ? (a = `Produto`)
                  : e.client_package_id && (a = `Pacote`)
            let o = `-`
            if (e.appointment_id) {
              let n = t.find((t) => t.id === e.appointment_id)
              n && (o = n.expand?.client_id?.name || `Avulso`)
            } else if (e.product_purchase_id) {
              let t = n.find((t) => t.id === e.product_purchase_id)
              t && (o = t.expand?.client_id?.name || `Avulso`)
            } else if (e.client_package_id) {
              let t = r.find((t) => t.id === e.client_package_id)
              t && (o = t.expand?.client_id?.name || `Avulso`)
            }
            l.push({
              id: e.id,
              isConsolidated: !1,
              checkoutNumber: null,
              checkoutObj: null,
              type: a,
              client: o,
              item: e._itemName,
              date: i,
              time: T(i, `HH:mm`),
              packageUsed: e._packageUsed,
              price: e._itemPrice,
              commission: e.amount || 0,
              dueDate: e.due_date ? new Date(e.due_date) : null,
              commDate: e.date ? new Date(e.date) : new Date(e.created),
              commissionObj: e,
              basePrice: e._itemPrice,
              comms: [e],
              status: e.status || `pending`,
            })
          }),
          l.sort((e, t) => t.commDate.getTime() - e.commDate.getTime()),
          Xe(l))
      } catch {
        Y({ title: `Erro ao carregar detalhes`, variant: `destructive` })
      }
    },
    Tt = (0, F.useMemo)(
      () =>
        Ye.filter((e) =>
          Ze === `pago` ? e.status === `paid` : Ze === `a_pagar` ? e.status !== `paid` : !0,
        ),
      [Ye, Ze],
    ),
    Et = (0, F.useMemo)(() => {
      let e = 0,
        t = 0,
        n = 0
      return (
        Ye.forEach((r) => {
          ;((e += r.price),
            r.status === `paid`
              ? (t += r.commission)
              : r.status === `partial`
                ? r.comms.forEach((e) => {
                    e.status === `paid` ? (t += e.amount || 0) : (n += e.amount || 0)
                  })
                : (n += r.commission))
        }),
        { totalVendas: e, totalPago: t, totalAPagar: n }
      )
    }, [Ye]),
    Dt = () => {
      let e = document.getElementById(`printable-report`)?.innerHTML
      if (!e) return
      let t = window.open(``, ``, `width=900,height=650`)
      t &&
        (t.document.write(`
        <html>
          <head>
            <title>Relatório Detalhado de Comissões</title>
            <style>
              body { font-family: sans-serif; padding: 20px; color: #333; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; border: none; }
              th, td { padding: 12px 8px; text-align: left; border: none; }
              th { background-color: #f4f4f4; border: none; }
              .text-right { text-align: right; }
              .font-bold { font-weight: bold; }
              .header { margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
              .summary { display: flex; justify-content: space-between; margin-top: 20px; font-size: 16px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>Relatório Detalhado - ${B?.name}</h2>
              <p>Comissões Pendentes</p>
              <p>Gerado em: ${new Date().toLocaleString(`pt-BR`)}</p>
            </div>
            ${e}
          </body>
        </html>
      `),
        t.document.close(),
        t.focus(),
        setTimeout(() => {
          ;(t.print(), t.close())
        }, 250))
    },
    Ot = () => {
      ;(J({
        name: ``,
        work_level: `autonomo`,
        work_regime: `fixed`,
        commission_type: `percentage`,
        commission_value: 0,
        color: `#3b82f6`,
        payment_schedule_config: {
          frequency: `semanal`,
          cycles: [
            { workDays: [1, 2, 3], paymentDay: 4 },
            { workDays: [4, 5, 6], paymentDay: 1 },
          ],
        },
      }),
        qe(!0))
    },
    kt = (e) => {
      ;(J({
        id: e.id,
        name: e.name || ``,
        work_level: e.work_level || `autonomo`,
        work_regime: e.work_regime || `fixed`,
        commission_type: e.commission_type || `percentage`,
        commission_value: e.commission_value || 0,
        color: e.color || `#3b82f6`,
        payment_schedule_config: e.payment_schedule_config || {
          frequency: `semanal`,
          cycles: [
            { workDays: [1, 2, 3], paymentDay: 4 },
            { workDays: [4, 5, 6], paymentDay: 1 },
          ],
        },
      }),
        qe(!0))
    },
    At = () => {
      J((e) => ({
        ...e,
        payment_schedule_config: {
          ...e.payment_schedule_config,
          cycles: [...(e.payment_schedule_config?.cycles || []), { workDays: [], paymentDay: 1 }],
        },
      }))
    },
    jt = (e) => {
      let t = [...q.payment_schedule_config.cycles]
      ;(t.splice(e, 1),
        J((e) => ({ ...e, payment_schedule_config: { ...e.payment_schedule_config, cycles: t } })))
    },
    Mt = (e, t, n) => {
      let r = [...q.payment_schedule_config.cycles],
        i = r[e]
      ;(n ? (i.workDays = [...i.workDays, t]) : (i.workDays = i.workDays.filter((e) => e !== t)),
        J((e) => ({ ...e, payment_schedule_config: { ...e.payment_schedule_config, cycles: r } })))
    },
    Nt = (e, t) => {
      let n = [...q.payment_schedule_config.cycles]
      ;((n[e].paymentDay = t),
        J((e) => ({ ...e, payment_schedule_config: { ...e.payment_schedule_config, cycles: n } })))
    },
    Q = {
      service: `Serviço`,
      product: `Produto`,
      package_sale: `Pacote`,
      package: `Pacote`,
      category: `Categoria`,
      consumption: `Consumo Interno`,
    },
    Pt = async () => {
      bt(!0)
      try {
        let e = ue(Z.from).toISOString().replace(`T`, ` `),
          t = P(Z.to).toISOString().replace(`T`, ` `),
          n = await m.send(`/backend/v1/commissions/reconcile`, {
            method: `POST`,
            body: JSON.stringify({ startDate: e, endDate: t }),
            headers: { 'Content-Type': `application/json` },
          })
        ;(Y({
          title: `Reconciliação concluída`,
          description: `Foram geradas ${n.createdCount} e atualizadas ${n.updatedCount} comissões.`,
        }),
          X())
      } catch (e) {
        Y({ title: `Erro`, description: be(e), variant: `destructive` })
      } finally {
        bt(!1)
      }
    },
    Ft = async (e) => {
      it(e)
      try {
        let t = await m
          .collection(`commissions`)
          .getFullList({
            filter: `barber_id='${e.id}' && status!='paid'`,
            sort: `due_date,-created`,
          })
        ;(at(t), ot(t.map((e) => e.id)), st(`pix`), pt(null), rt(!0))
      } catch {
        Y({ title: `Erro ao carregar comissões`, variant: `destructive` })
      }
    },
    It = (e) => {
      ot((t) => (t.includes(e) ? t.filter((t) => t !== e) : [...t, e]))
    },
    Lt = (e) => {
      ot(e ? U.map((e) => e.id) : [])
    },
    Rt = async () => {
      if (W.length === 0)
        return Y({ title: `Selecione ao menos uma comissão`, variant: `destructive` })
      if (!G) return Y({ title: `Selecione a forma de pagamento`, variant: `destructive` })
      lt(!0)
      try {
        await m.send(`/backend/v1/commissions/pay`, {
          method: `POST`,
          body: JSON.stringify({ commissionIds: W, paymentMethod: G }),
          headers: { 'Content-Type': `application/json` },
        })
        let e = U.filter((e) => W.includes(e.id)),
          t = e.reduce((e, t) => e + (t.amount || 0), 0),
          n = e.filter((e) => (e.amount || 0) >= 0),
          r = e.filter((e) => (e.amount || 0) < 0),
          i = `*Recibo de Pagamento*\n\nOlá ${H?.name},\nRecebemos o pagamento de suas comissões no valor de *R$ ${t.toFixed(2)}*.\n\nDetalhes:\n${n.map(
            (e) =>
              `- ${T(e.date ? new Date(e.date) : new Date(e.created), `dd/MM/yyyy`)}: R$ ${(e.amount || 0).toFixed(2)} (${Q[e.type] || e.type})`,
          ).join(`
`)}`
        ;(r.length > 0 &&
          (i += `\n\nDeduções / Consumo Interno:\n${r.map(
            (e) =>
              `- ${T(e.date ? new Date(e.date) : new Date(e.created), `dd/MM/yyyy`)}: R$ ${(e.amount || 0).toFixed(2)} (${Q[e.type] || e.type})`,
          ).join(`
`)}`),
          (i += `

Obrigado!`))
        let a = (H?.expand?.user_id?.whatsapp || H?.expand?.user_id?.phone || ``).replace(
            /\D/g,
            ``,
          ),
          o = a
            ? `https://api.whatsapp.com/send?phone=55${a}&text=${encodeURIComponent(i)}`
            : `https://api.whatsapp.com/send?text=${encodeURIComponent(i)}`,
          s =
            G === `pix` ? `Pix` : G === `cash` ? `Dinheiro` : G === `debito` ? `Débito` : `Crédito`
        ;(mt({ barberName: H?.name, date: new Date(), items: e, total: t, method: s }),
          pt({ url: o, text: i }),
          Y({ title: `Pagamento registrado com sucesso!` }),
          rt(!1),
          dt(!0),
          X())
      } catch (e) {
        Y({ title: `Erro ao processar pagamento`, description: be(e), variant: `destructive` })
      } finally {
        lt(!1)
      }
    },
    zt = (e) => (e === `credito` ? `credit_card` : e === `debito` ? `debit_card` : e),
    $ = (0, F.useMemo)(() => {
      if (!V) return null
      let e = V.comms || [],
        t = V.commissionObj?.payment_method || `other`,
        n = $e.find((e) => e.type === zt(t) || e.name.toLowerCase() === t.toLowerCase()),
        r = n?.fee_percentage || 0,
        i = B?.work_level === `socio`,
        a = e
          .map((e) => {
            let t = e.amount !== 0 || (i && e._itemPrice > 0)
            return {
              item: e._itemName,
              type: Q[e.type] || e.type,
              price: e._itemPrice,
              netCommission: e.amount || 0,
              isCommissionable: t,
              commissionInfo: e._commissionInfo,
              rawType: e.type,
            }
          })
          .filter((e) => e.isCommissionable),
        o = e
          .map((e) => {
            let t = e.amount !== 0 || (i && e._itemPrice > 0)
            return {
              item: e._itemName,
              type: Q[e.type] || e.type,
              price: e._itemPrice,
              netCommission: e.amount || 0,
              isCommissionable: t,
              rawType: e.type,
            }
          })
          .filter((e) => !e.isCommissionable),
        s = o.filter((e) => e.rawType === `product`),
        c = o.filter((e) => e.rawType !== `product`),
        l = a.reduce((e, t) => e + t.price, 0),
        ee = a.map((e) => {
          let t = ``
          return (
            (t = i
              ? `Sócio 100%`
              : e.commissionInfo?.type === `percentage`
                ? `${e.commissionInfo.value}%`
                : e.commissionInfo?.type === `fixed`
                  ? `Fixo R$ ${e.commissionInfo.value.toFixed(2)}`
                  : `Desconhecido`),
            { label: `${e.item} (${t})`, value: e.netCommission }
          )
        }),
        u = V.packageUsed
          ? `Uso de Pacote`
          : V.checkoutObj?.payment_method || n?.name || t || `Não informado`
      return {
        professionalName: B?.name,
        clientName: V.client,
        date: V.date || V.commDate,
        paymentMethodName: u,
        checkoutNumber: V.checkoutNumber,
        snapshot: V.checkoutObj?.items_snapshot || null,
        totalPaid: V.price,
        nonCommProducts: s,
        nonCommOthers: c,
        commissionableItems: a,
        commissionBase: l,
        memoryLines: ee,
        feePercentage: r,
        netCommission: V.commission,
      }
    }, [V, B, $e])
  return (0, I.jsxs)(`div`, {
    className: `space-y-6 max-w-6xl mx-auto pb-10`,
    children: [
      (0, I.jsxs)(`div`, {
        children: [
          (0, I.jsx)(`h2`, {
            className: `text-2xl font-bold tracking-tight`,
            children: `Equipes & Comissões`,
          }),
          (0, I.jsx)(`p`, {
            className: `text-muted-foreground`,
            children: `Gestão de profissionais e acompanhamento de comissões.`,
          }),
        ],
      }),
      (0, I.jsxs)(`div`, {
        className: `flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`,
        children: [
          (0, I.jsxs)(`div`, {
            className: `flex flex-wrap items-center gap-2`,
            children: [
              (0, I.jsx)(d, {
                variant: L === `all_time` ? `default` : `outline`,
                size: `sm`,
                onClick: () => R(`all_time`),
                children: `Período Todo`,
              }),
              (0, I.jsx)(d, {
                variant: L === `this_month` ? `default` : `outline`,
                size: `sm`,
                onClick: () => R(`this_month`),
                children: `Este mês`,
              }),
              (0, I.jsx)(d, {
                variant: L === `this_week` ? `default` : `outline`,
                size: `sm`,
                onClick: () => R(`this_week`),
                children: `Esta semana`,
              }),
              (0, I.jsx)(d, {
                variant: L === `last_30` ? `default` : `outline`,
                size: `sm`,
                onClick: () => R(`last_30`),
                children: `Últimos 30 dias`,
              }),
              (0, I.jsx)(d, {
                variant: L === `last_7` ? `default` : `outline`,
                size: `sm`,
                onClick: () => R(`last_7`),
                children: `Últimos 7 dias`,
              }),
              (0, I.jsxs)(se, {
                children: [
                  (0, I.jsx)(l, {
                    asChild: !0,
                    children: (0, I.jsxs)(d, {
                      variant: L === `custom` ? `default` : `outline`,
                      size: `sm`,
                      className: `gap-2`,
                      children: [
                        (0, I.jsx)(r, { className: `size-4` }),
                        L === `custom` && z?.from
                          ? z.to
                            ? (0, I.jsxs)(I.Fragment, {
                                children: [T(z.from, `dd/MM/yy`), ` - `, T(z.to, `dd/MM/yy`)],
                              })
                            : T(z.from, `dd/MM/yy`)
                          : `Intervalo`,
                      ],
                    }),
                  }),
                  (0, I.jsx)(te, {
                    className: `w-auto p-0`,
                    align: `end`,
                    children: (0, I.jsx)(i, {
                      initialFocus: !0,
                      mode: `range`,
                      defaultMonth: z?.from,
                      selected: z,
                      onSelect: (e) => {
                        ;(Ge(e), R(`custom`))
                      },
                      numberOfMonths: 2,
                    }),
                  }),
                ],
              }),
            ],
          }),
          t &&
            (0, I.jsxs)(`div`, {
              className: `flex gap-2`,
              children: [
                (0, I.jsxs)(d, {
                  variant: `outline`,
                  onClick: Pt,
                  disabled: yt,
                  children: [
                    (0, I.jsx)(Ae, { className: `size-4 mr-2 ${yt ? `animate-spin` : ``}` }),
                    `Recalcular`,
                  ],
                }),
                (0, I.jsxs)(d, {
                  onClick: Ot,
                  children: [
                    (0, I.jsx)(s, { className: `size-4 mr-2` }),
                    ` Adicionar Profissional`,
                  ],
                }),
              ],
            }),
        ],
      }),
      (0, I.jsx)(O, {
        children: (0, I.jsx)(D, {
          className: `p-0 overflow-x-auto overflow-y-hidden`,
          children: (0, I.jsxs)(Ee, {
            className: `min-w-[800px]`,
            children: [
              (0, I.jsx)(we, {
                children: (0, I.jsxs)(A, {
                  children: [
                    (0, I.jsx)(k, { className: `whitespace-nowrap`, children: `Profissional` }),
                    (0, I.jsx)(k, {
                      className: `whitespace-nowrap`,
                      children: `Contato (WhatsApp)`,
                    }),
                    (0, I.jsx)(k, { className: `whitespace-nowrap`, children: `Nível` }),
                    (0, I.jsx)(k, {
                      className: `whitespace-nowrap`,
                      children: `Comissão a Receber`,
                    }),
                    (0, I.jsx)(k, { className: `whitespace-nowrap`, children: `A Pagar` }),
                    (0, I.jsx)(k, { className: `text-right whitespace-nowrap`, children: `Ações` }),
                  ],
                }),
              }),
              (0, I.jsxs)(Te, {
                children: [
                  n.map((e) => {
                    let n = E.filter((t) => t.barber_id === e.id).filter(
                        (e) => e.status !== `paid`,
                      ),
                      r = n.reduce((e, t) => e + (t.amount || 0), 0),
                      i = T(
                        n.reduce((t, n) => {
                          let r = n.due_date
                            ? new Date(n.due_date)
                            : xt(
                                n.date ? new Date(n.date) : new Date(n.created),
                                e.payment_schedule_config,
                              )
                          return !t || r < t ? r : t
                        }, null) || xt(new Date(), e.payment_schedule_config),
                        `dd/MM/yyyy`,
                      )
                    return (0, I.jsxs)(
                      A,
                      {
                        children: [
                          (0, I.jsx)(j, {
                            className: `font-medium`,
                            children: (0, I.jsxs)(`div`, {
                              className: `flex items-center gap-3`,
                              children: [
                                (0, I.jsx)(`div`, {
                                  className: `h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0`,
                                  children: e.avatar
                                    ? (0, I.jsx)(`img`, {
                                        src: e.avatar,
                                        alt: e.name,
                                        className: `h-full w-full object-cover`,
                                      })
                                    : e.expand?.user_id?.avatar
                                      ? (0, I.jsx)(`img`, {
                                          src: m.files.getUrl(
                                            e.expand.user_id,
                                            e.expand.user_id.avatar,
                                          ),
                                          alt: e.name,
                                          className: `h-full w-full object-cover`,
                                        })
                                      : (0, I.jsx)(`span`, {
                                          className: `text-primary font-bold`,
                                          children: e.name.charAt(0).toUpperCase(),
                                        }),
                                }),
                                (0, I.jsx)(`div`, {
                                  children: (0, I.jsx)(`span`, { children: e.name }),
                                }),
                              ],
                            }),
                          }),
                          (0, I.jsx)(j, {
                            children: e.expand?.user_id?.whatsapp
                              ? ae(e.expand.user_id.whatsapp)
                              : (0, I.jsx)(`span`, {
                                  className: `text-muted-foreground italic`,
                                  children: `Não informado`,
                                }),
                          }),
                          (0, I.jsx)(j, {
                            children: (0, I.jsx)(M, {
                              variant: `outline`,
                              className:
                                e.work_level === `socio`
                                  ? `bg-blue-600 text-white border-blue-700 hover:bg-blue-700`
                                  : `bg-slate-100 text-slate-800 border-slate-300`,
                              children: e.work_level === `socio` ? `Sócio` : `Autônomo`,
                            }),
                          }),
                          (0, I.jsxs)(j, {
                            className: `font-bold text-base text-amber-600`,
                            children: [`R$ `, r.toFixed(2)],
                          }),
                          (0, I.jsx)(j, {
                            children:
                              e.work_level === `socio`
                                ? (0, I.jsx)(M, {
                                    className: `bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide border-0 shadow-sm`,
                                    children: `Pago na hora`,
                                  })
                                : (0, I.jsxs)(`div`, {
                                    className: `flex flex-col`,
                                    children: [
                                      (0, I.jsx)(`span`, {
                                        className: `font-bold text-yellow-500 dark:text-yellow-400`,
                                        children: i,
                                      }),
                                      (0, I.jsx)(`span`, {
                                        className: `text-xs text-muted-foreground`,
                                        children: `Próx. Acerto`,
                                      }),
                                    ],
                                  }),
                          }),
                          (0, I.jsx)(j, {
                            className: `text-right`,
                            children: (0, I.jsxs)(`div`, {
                              className: `flex justify-end gap-2`,
                              children: [
                                (0, I.jsx)(d, {
                                  variant: `ghost`,
                                  size: `icon`,
                                  onClick: () => wt(e),
                                  title: `Relatório Detalhado`,
                                  children: (0, I.jsx)(o, { className: `size-4 text-emerald-600` }),
                                }),
                                t &&
                                  (0, I.jsx)(d, {
                                    variant: `ghost`,
                                    size: `icon`,
                                    onClick: () => Ft(e),
                                    title: `Pagar Comissões`,
                                    children: (0, I.jsx)(ee, { className: `size-4 text-blue-600` }),
                                  }),
                                t &&
                                  (0, I.jsx)(d, {
                                    variant: `ghost`,
                                    size: `icon`,
                                    onClick: () => kt(e),
                                    title: `Editar Profissional`,
                                    children: (0, I.jsx)(c, { className: `size-4 text-slate-600` }),
                                  }),
                              ],
                            }),
                          }),
                        ],
                      },
                      e.id,
                    )
                  }),
                  n.length === 0 &&
                    (0, I.jsx)(A, {
                      children: (0, I.jsx)(j, {
                        colSpan: 6,
                        className: `text-center py-6 text-muted-foreground`,
                        children: `Nenhum profissional encontrado.`,
                      }),
                    }),
                ],
              }),
            ],
          }),
        }),
      }),
      (0, I.jsx)(p, {
        open: !!B,
        onOpenChange: (e) => !e && Je(null),
        children: (0, I.jsxs)(C, {
          className: `max-w-[95vw] lg:max-w-6xl xl:max-w-7xl max-h-[90vh] flex flex-col`,
          children: [
            (0, I.jsxs)(w, {
              className: `flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`,
              children: [
                (0, I.jsxs)(f, { children: [`Relatório Financeiro - `, B?.name] }),
                (0, I.jsxs)(`div`, {
                  className: `flex flex-wrap gap-2 sm:mr-4`,
                  children: [
                    (0, I.jsxs)(y, {
                      value: Ze,
                      onValueChange: Qe,
                      children: [
                        (0, I.jsx)(_, {
                          className: `w-[140px] h-9`,
                          children: (0, I.jsx)(v, { placeholder: `Status` }),
                        }),
                        (0, I.jsxs)(g, {
                          children: [
                            (0, I.jsx)(S, { value: `tudo`, children: `Tudo` }),
                            (0, I.jsx)(S, { value: `pago`, children: `Pago` }),
                            (0, I.jsx)(S, { value: `a_pagar`, children: `A Pagar` }),
                          ],
                        }),
                      ],
                    }),
                    (0, I.jsxs)(d, {
                      variant: `outline`,
                      size: `sm`,
                      onClick: async () => {
                        ;(await Pt(), B && wt(B))
                      },
                      disabled: yt,
                      children: [
                        (0, I.jsx)(Ae, { className: `size-4 mr-2 ${yt ? `animate-spin` : ``}` }),
                        `Recalcular`,
                      ],
                    }),
                    (0, I.jsxs)(d, {
                      variant: `outline`,
                      size: `sm`,
                      onClick: Dt,
                      children: [(0, I.jsx)(Oe, { className: `size-4 mr-2` }), ` Imprimir`],
                    }),
                  ],
                }),
              ],
            }),
            (0, I.jsxs)(`div`, {
              className: `grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2`,
              children: [
                (0, I.jsx)(O, {
                  className: `bg-muted/30 border-none shadow-sm`,
                  children: (0, I.jsxs)(D, {
                    className: `p-4 flex flex-col items-center justify-center`,
                    children: [
                      (0, I.jsx)(`span`, {
                        className: `text-sm font-medium text-muted-foreground uppercase tracking-wider`,
                        children: `Total Vendas`,
                      }),
                      (0, I.jsxs)(`span`, {
                        className: `text-2xl font-bold mt-1`,
                        children: [`R$ `, Et.totalVendas.toFixed(2)],
                      }),
                    ],
                  }),
                }),
                (0, I.jsx)(O, {
                  className: `bg-emerald-50 border-emerald-100 shadow-sm`,
                  children: (0, I.jsxs)(D, {
                    className: `p-4 flex flex-col items-center justify-center`,
                    children: [
                      (0, I.jsx)(`span`, {
                        className: `text-sm font-medium text-emerald-700 uppercase tracking-wider`,
                        children: `Total Pago`,
                      }),
                      (0, I.jsxs)(`span`, {
                        className: `text-2xl font-bold text-emerald-600 mt-1`,
                        children: [`R$ `, Et.totalPago.toFixed(2)],
                      }),
                    ],
                  }),
                }),
                (0, I.jsx)(O, {
                  className: `bg-amber-50 border-amber-100 shadow-sm`,
                  children: (0, I.jsxs)(D, {
                    className: `p-4 flex flex-col items-center justify-center`,
                    children: [
                      (0, I.jsx)(`span`, {
                        className: `text-sm font-medium text-amber-700 uppercase tracking-wider`,
                        children: `Total a Pagar`,
                      }),
                      (0, I.jsxs)(`span`, {
                        className: `text-2xl font-bold text-amber-600 mt-1`,
                        children: [`R$ `, Et.totalAPagar.toFixed(2)],
                      }),
                    ],
                  }),
                }),
              ],
            }),
            (0, I.jsx)(`div`, {
              className: `flex-1 mt-4 min-h-0 bg-background`,
              children: (0, I.jsx)(`div`, {
                id: `printable-report`,
                className: `h-full`,
                children: (0, I.jsxs)(Ee, {
                  wrapperClassName: `styled-scrollbar border-none`,
                  className: `min-w-[1100px] border-none`,
                  children: [
                    (0, I.jsx)(we, {
                      className: `border-none`,
                      children: (0, I.jsxs)(A, {
                        className: `border-none hover:bg-transparent`,
                        children: [
                          (0, I.jsx)(k, {
                            className: `whitespace-nowrap sticky left-0 z-20 bg-background px-4 py-3 border-none`,
                            children: `# Checkout`,
                          }),
                          (0, I.jsx)(k, {
                            className: `whitespace-nowrap px-4 py-3 border-none`,
                            children: `Data/Hora`,
                          }),
                          (0, I.jsx)(k, {
                            className: `whitespace-nowrap px-4 py-3 border-none`,
                            children: `Tipo`,
                          }),
                          (0, I.jsx)(k, {
                            className: `whitespace-nowrap min-w-[200px] px-4 py-3 border-none`,
                            children: `Descrição`,
                          }),
                          (0, I.jsx)(k, {
                            className: `whitespace-nowrap px-4 py-3 border-none`,
                            children: `Cliente`,
                          }),
                          (0, I.jsx)(k, {
                            className: `whitespace-nowrap px-4 py-3 border-none`,
                            children: `Vencimento`,
                          }),
                          (0, I.jsx)(k, {
                            className: `whitespace-nowrap px-4 py-3 border-none`,
                            children: `Status`,
                          }),
                          (0, I.jsx)(k, {
                            className: `text-right whitespace-nowrap px-4 py-3 border-none`,
                            children: `Valor Bruto`,
                          }),
                          (0, I.jsx)(k, {
                            className: `text-right whitespace-nowrap px-4 py-3 border-none`,
                            children: `Comissão`,
                          }),
                          (0, I.jsx)(k, {
                            className: `text-right whitespace-nowrap sticky right-0 z-20 bg-background px-4 py-3 border-none`,
                            children: `Ações`,
                          }),
                        ],
                      }),
                    }),
                    (0, I.jsxs)(Te, {
                      className: `border-none`,
                      children: [
                        Tt.map((e, t) =>
                          (0, I.jsxs)(
                            A,
                            {
                              className: `group/row border-none hover:bg-muted/50 transition-colors`,
                              children: [
                                (0, I.jsx)(j, {
                                  className: `font-mono text-muted-foreground sticky left-0 z-10 bg-background group-hover/row:bg-muted/50 transition-colors px-4 py-3 border-none`,
                                  children: e.checkoutNumber ? `#${e.checkoutNumber}` : `-`,
                                }),
                                (0, I.jsxs)(j, {
                                  className: `px-4 py-3 border-none`,
                                  children: [T(e.date, `dd/MM/yyyy`), ` às `, e.time],
                                }),
                                (0, I.jsx)(j, {
                                  className: `px-4 py-3 border-none`,
                                  children: (0, I.jsx)(M, {
                                    variant: `outline`,
                                    className:
                                      e.type === `Pedido`
                                        ? `bg-orange-100 text-orange-800 border-orange-200`
                                        : e.type === `Serviço`
                                          ? `bg-blue-100 text-blue-800 border-blue-200`
                                          : e.type === `Produto`
                                            ? `bg-purple-100 text-purple-800 border-purple-200`
                                            : `bg-gray-100 text-gray-800 border-gray-200`,
                                    children: e.type,
                                  }),
                                }),
                                (0, I.jsx)(j, {
                                  className: `px-4 py-3 border-none`,
                                  children: e.item,
                                }),
                                (0, I.jsx)(j, {
                                  className: `px-4 py-3 border-none`,
                                  children: e.client,
                                }),
                                (0, I.jsx)(j, {
                                  className: `px-4 py-3 border-none`,
                                  children: (0, I.jsx)(`span`, {
                                    className: `font-medium text-muted-foreground`,
                                    children: e.dueDate
                                      ? T(e.dueDate, `dd/MM/yyyy`)
                                      : T(xt(e.commDate, B?.payment_schedule_config), `dd/MM/yyyy`),
                                  }),
                                }),
                                (0, I.jsx)(j, {
                                  className: `px-4 py-3 border-none`,
                                  children: (0, I.jsx)(M, {
                                    className: ne(
                                      `font-bold uppercase border-0 text-[11px] tracking-wider shadow-sm`,
                                      e.status === `paid`
                                        ? `bg-[#10b981] hover:bg-[#059669] text-white`
                                        : e.status === `partial`
                                          ? `bg-orange-400 hover:bg-orange-500 text-white`
                                          : `bg-[#f59e0b] hover:bg-[#d97706] text-white`,
                                    ),
                                    children:
                                      e.status === `paid`
                                        ? `Pago`
                                        : e.status === `partial`
                                          ? `Parcial`
                                          : `Pendente`,
                                  }),
                                }),
                                (0, I.jsxs)(j, {
                                  className: `text-right px-4 py-3 border-none`,
                                  children: [`R$ `, e.price.toFixed(2)],
                                }),
                                (0, I.jsxs)(j, {
                                  className: `text-right font-semibold px-4 py-3 border-none ${e.commission < 0 ? `text-red-600` : `text-emerald-600`}`,
                                  children: [`R$ `, e.commission.toFixed(2)],
                                }),
                                (0, I.jsx)(j, {
                                  className: `text-right sticky right-0 z-10 bg-background group-hover/row:bg-muted/50 transition-colors px-4 py-3 border-none`,
                                  children: (0, I.jsx)(d, {
                                    variant: `ghost`,
                                    size: `icon`,
                                    onClick: () => tt(e),
                                    title: `Memória de Cálculo`,
                                    children: (0, I.jsx)(ke, {
                                      className: `size-4 text-slate-600`,
                                    }),
                                  }),
                                }),
                              ],
                            },
                            `${e.id}-${t}`,
                          ),
                        ),
                        Tt.length === 0 &&
                          (0, I.jsx)(A, {
                            className: `border-none`,
                            children: (0, I.jsx)(j, {
                              colSpan: 10,
                              className: `text-center py-8 text-muted-foreground border-none`,
                              children: `Nenhuma transação encontrada com os filtros selecionados.`,
                            }),
                          }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            (0, I.jsx)(h, {
              className: `mt-4 border-t pt-4`,
              children: (0, I.jsx)(d, {
                variant: `ghost`,
                onClick: () => Je(null),
                children: `Fechar`,
              }),
            }),
          ],
        }),
      }),
      (0, I.jsxs)(O, {
        className: `mt-8 border-none shadow-sm`,
        children: [
          (0, I.jsxs)(xe, {
            className: `bg-muted/30 pb-4 border-b`,
            children: [
              (0, I.jsx)(Se, { className: `text-xl`, children: `Configurações de Pagamento` }),
              (0, I.jsx)(Ce, {
                children: `As regras de vencimento agora são configuradas individualmente para cada profissional Autônomo.`,
              }),
            ],
          }),
          (0, I.jsxs)(D, {
            className: `pt-6 space-y-4`,
            children: [
              (0, I.jsxs)(`div`, {
                className: `p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3`,
                children: [
                  (0, I.jsx)(`div`, {
                    className: `mt-0.5`,
                    children: (0, I.jsx)(M, {
                      variant: `outline`,
                      className: `bg-blue-100 text-blue-800 border-blue-200`,
                      children: `Autônomo`,
                    }),
                  }),
                  (0, I.jsx)(`p`, {
                    className: `text-sm text-blue-800 dark:text-blue-200`,
                    children: `As datas da coluna "A Pagar" são calculadas automaticamente com base nos ciclos definidos no perfil de cada profissional.`,
                  }),
                ],
              }),
              (0, I.jsxs)(`div`, {
                className: `p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-start gap-3`,
                children: [
                  (0, I.jsx)(`div`, {
                    className: `mt-0.5`,
                    children: (0, I.jsx)(M, {
                      className: `bg-emerald-500 hover:bg-emerald-600 border-0`,
                      children: `Sócio`,
                    }),
                  }),
                  (0, I.jsxs)(`p`, {
                    className: `text-sm text-emerald-800 dark:text-emerald-200`,
                    children: [
                      `Profissionais com nível de trabalho configurado como "Sócio" recebem comissionamento integral. O status de suas transações é sempre classificado como`,
                      ` `,
                      (0, I.jsx)(`strong`, { children: `"Pago na hora"` }),
                      `.`,
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, I.jsx)(p, {
        open: Ke,
        onOpenChange: qe,
        children: (0, I.jsxs)(C, {
          className: `sm:max-w-[425px] max-h-[85vh] overflow-y-auto`,
          children: [
            (0, I.jsx)(w, {
              children: (0, I.jsx)(f, {
                children: q.id ? `Editar Profissional` : `Novo Profissional`,
              }),
            }),
            (0, I.jsxs)(`form`, {
              onSubmit: async (e) => {
                e.preventDefault()
                try {
                  let e = { ...q }
                  if (
                    (e.work_level === `socio`
                      ? ((e.commission_type = `percentage`), (e.commission_value = 100))
                      : (e.commission_value = Math.max(0, Number(e.commission_value))),
                    e.id)
                  ) {
                    let { id: t, ...n } = e
                    ;(await Pe(t, n), Y({ title: `Profissional atualizado!` }))
                  } else {
                    let { id: t, ...n } = e
                    ;(await Ne(n), Y({ title: `Profissional salvo!` }))
                  }
                  ;(qe(!1), X())
                } catch (e) {
                  Y({ title: `Erro ao salvar`, description: be(e), variant: `destructive` })
                }
              },
              className: `space-y-4 py-2`,
              children: [
                (0, I.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, I.jsx)(x, { children: `Nome` }),
                    (0, I.jsx)(u, {
                      required: !0,
                      value: q.name,
                      onChange: (e) => J({ ...q, name: e.target.value }),
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `grid grid-cols-2 gap-4`,
                  children: [
                    (0, I.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, I.jsx)(x, { children: `Nível de Trabalho` }),
                        (0, I.jsxs)(y, {
                          value: q.work_level,
                          onValueChange: (e) => J({ ...q, work_level: e }),
                          children: [
                            (0, I.jsx)(_, { children: (0, I.jsx)(v, {}) }),
                            (0, I.jsxs)(g, {
                              children: [
                                (0, I.jsx)(S, {
                                  value: `autonomo`,
                                  children: `Autônomo (Comissionado)`,
                                }),
                                (0, I.jsx)(S, { value: `socio`, children: `Sócio (100% Repasse)` }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, I.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, I.jsx)(x, { children: `Regime (Disponibilidade)` }),
                        (0, I.jsxs)(y, {
                          value: q.work_regime || `fixed`,
                          onValueChange: (e) => J({ ...q, work_regime: e }),
                          children: [
                            (0, I.jsx)(_, { children: (0, I.jsx)(v, {}) }),
                            (0, I.jsxs)(g, {
                              children: [
                                (0, I.jsx)(S, { value: `fixed`, children: `Horário Fixo` }),
                                (0, I.jsx)(S, { value: `on_demand`, children: `Sob Demanda` }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, I.jsx)(x, { children: `Cor de Identificação` }),
                    (0, I.jsxs)(`div`, {
                      className: `flex items-center gap-2`,
                      children: [
                        (0, I.jsx)(u, {
                          type: `color`,
                          value: q.color || `#3b82f6`,
                          onChange: (e) => J({ ...q, color: e.target.value }),
                          className: `w-12 h-10 p-1 cursor-pointer`,
                        }),
                        (0, I.jsx)(u, {
                          type: `text`,
                          value: q.color || `#3b82f6`,
                          onChange: (e) => J({ ...q, color: e.target.value }),
                          className: `flex-1 font-mono uppercase`,
                          placeholder: `#000000`,
                        }),
                      ],
                    }),
                  ],
                }),
                q.work_level === `autonomo` &&
                  (0, I.jsxs)(`div`, {
                    className: `space-y-4 border p-4 rounded-lg bg-muted/20`,
                    children: [
                      (0, I.jsxs)(`div`, {
                        className: `grid grid-cols-2 gap-4 pb-4 border-b border-border/50`,
                        children: [
                          (0, I.jsxs)(`div`, {
                            className: `space-y-2`,
                            children: [
                              (0, I.jsx)(x, { className: `text-sm`, children: `Tipo de Comissão` }),
                              (0, I.jsxs)(y, {
                                value: q.commission_type || `percentage`,
                                onValueChange: (e) => J({ ...q, commission_type: e }),
                                children: [
                                  (0, I.jsx)(_, { children: (0, I.jsx)(v, {}) }),
                                  (0, I.jsxs)(g, {
                                    children: [
                                      (0, I.jsx)(S, {
                                        value: `percentage`,
                                        children: `Porcentagem (%)`,
                                      }),
                                      (0, I.jsx)(S, {
                                        value: `fixed`,
                                        children: `Valor Fixo (R$)`,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, I.jsxs)(`div`, {
                            className: `space-y-2`,
                            children: [
                              (0, I.jsx)(x, { className: `text-sm`, children: `Valor Base` }),
                              (0, I.jsx)(u, {
                                type: `number`,
                                min: `0`,
                                step: `0.01`,
                                value: q.commission_value ?? ``,
                                onChange: (e) => J({ ...q, commission_value: e.target.value }),
                                placeholder: q.commission_type === `percentage` ? `%` : `R$`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, I.jsx)(`div`, {
                        className: `flex items-center justify-between pt-2`,
                        children: (0, I.jsx)(x, {
                          className: `text-base font-semibold`,
                          children: `Configuração de Pagamento`,
                        }),
                      }),
                      (0, I.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, I.jsx)(x, { className: `text-sm`, children: `Frequência` }),
                          (0, I.jsxs)(y, {
                            value: q.payment_schedule_config?.frequency || `semanal`,
                            onValueChange: (e) =>
                              J({
                                ...q,
                                payment_schedule_config: {
                                  ...q.payment_schedule_config,
                                  frequency: e,
                                },
                              }),
                            children: [
                              (0, I.jsx)(_, { children: (0, I.jsx)(v, {}) }),
                              (0, I.jsxs)(g, {
                                children: [
                                  (0, I.jsx)(S, { value: `semanal`, children: `Semanal` }),
                                  (0, I.jsx)(S, { value: `quinzenal`, children: `Quinzenal` }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, I.jsxs)(`div`, {
                        className: `space-y-3`,
                        children: [
                          (0, I.jsxs)(`div`, {
                            className: `flex items-center justify-between`,
                            children: [
                              (0, I.jsx)(x, {
                                className: `text-sm`,
                                children: `Ciclos de Pagamento`,
                              }),
                              (0, I.jsxs)(d, {
                                type: `button`,
                                variant: `outline`,
                                size: `sm`,
                                onClick: At,
                                children: [
                                  (0, I.jsx)(s, { className: `size-3 mr-1` }),
                                  ` Adicionar`,
                                ],
                              }),
                            ],
                          }),
                          q.payment_schedule_config?.cycles?.map((e, t) =>
                            (0, I.jsxs)(
                              `div`,
                              {
                                className: `border p-3 rounded-md space-y-3 bg-background relative`,
                                children: [
                                  (0, I.jsx)(d, {
                                    type: `button`,
                                    variant: `ghost`,
                                    size: `icon`,
                                    className: `absolute right-2 top-2 h-6 w-6 text-destructive hover:bg-destructive/10`,
                                    onClick: () => jt(t),
                                    children: (0, I.jsx)(je, { className: `size-3` }),
                                  }),
                                  (0, I.jsxs)(`div`, {
                                    className: `space-y-2 pr-8`,
                                    children: [
                                      (0, I.jsx)(x, {
                                        className: `text-xs text-muted-foreground`,
                                        children: `Dias Trabalhados`,
                                      }),
                                      (0, I.jsx)(`div`, {
                                        className: `flex flex-wrap gap-2`,
                                        children: Fe.map((n) =>
                                          (0, I.jsxs)(
                                            `div`,
                                            {
                                              className: `flex items-center space-x-1`,
                                              children: [
                                                (0, I.jsx)(N, {
                                                  id: `cycle-${t}-day-${n.value}`,
                                                  checked: e.workDays?.includes(n.value),
                                                  onCheckedChange: (e) => Mt(t, n.value, !!e),
                                                }),
                                                (0, I.jsx)(x, {
                                                  htmlFor: `cycle-${t}-day-${n.value}`,
                                                  className: `text-xs font-normal cursor-pointer`,
                                                  children: n.label,
                                                }),
                                              ],
                                            },
                                            n.value,
                                          ),
                                        ),
                                      }),
                                    ],
                                  }),
                                  (0, I.jsxs)(`div`, {
                                    className: `space-y-2`,
                                    children: [
                                      (0, I.jsx)(x, {
                                        className: `text-xs text-muted-foreground`,
                                        children: `Dia do Pagamento`,
                                      }),
                                      (0, I.jsxs)(y, {
                                        value: e.paymentDay?.toString(),
                                        onValueChange: (e) => Nt(t, parseInt(e)),
                                        children: [
                                          (0, I.jsx)(_, {
                                            className: `h-8`,
                                            children: (0, I.jsx)(v, {}),
                                          }),
                                          (0, I.jsx)(g, {
                                            children: Fe.map((e) =>
                                              (0, I.jsx)(
                                                S,
                                                { value: e.value.toString(), children: e.label },
                                                e.value,
                                              ),
                                            ),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              t,
                            ),
                          ),
                          (!q.payment_schedule_config?.cycles ||
                            q.payment_schedule_config.cycles.length === 0) &&
                            (0, I.jsx)(`p`, {
                              className: `text-sm text-muted-foreground text-center py-2 border border-dashed rounded-md`,
                              children: `Nenhum ciclo configurado.`,
                            }),
                        ],
                      }),
                    ],
                  }),
                (0, I.jsx)(h, {
                  className: `pt-4`,
                  children: (0, I.jsx)(d, { type: `submit`, children: `Salvar` }),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, I.jsx)(p, {
        open: nt,
        onOpenChange: rt,
        children: (0, I.jsxs)(C, {
          className: `max-w-3xl max-h-[90vh] flex flex-col`,
          children: [
            (0, I.jsxs)(w, {
              children: [
                (0, I.jsxs)(f, { children: [`Pagar Comissões - `, H?.name] }),
                (0, I.jsx)(ce, {
                  children: `Selecione as comissões que deseja baixar como pagas.`,
                }),
              ],
            }),
            (0, I.jsx)(`div`, {
              className: `overflow-x-auto overflow-y-auto flex-1 mt-4 border rounded-md max-h-[40vh]`,
              children: (0, I.jsxs)(Ee, {
                className: `min-w-[500px]`,
                children: [
                  (0, I.jsx)(we, {
                    children: (0, I.jsxs)(A, {
                      children: [
                        (0, I.jsx)(k, {
                          className: `w-[50px]`,
                          children: (0, I.jsx)(N, {
                            checked: W.length === U.length && U.length > 0,
                            onCheckedChange: (e) => Lt(!!e),
                          }),
                        }),
                        (0, I.jsx)(k, { className: `whitespace-nowrap`, children: `Data` }),
                        (0, I.jsx)(k, { className: `whitespace-nowrap`, children: `Tipo` }),
                        (0, I.jsx)(k, {
                          className: `text-right whitespace-nowrap`,
                          children: `Valor`,
                        }),
                      ],
                    }),
                  }),
                  (0, I.jsx)(Te, {
                    children: (() => {
                      let e = U.filter((e) => (e.amount || 0) >= 0),
                        t = U.filter((e) => (e.amount || 0) < 0),
                        n = e.filter((e) => {
                          let t = e.date ? new Date(e.date) : new Date(e.created)
                          return t >= Z.from && t <= Z.to
                        }),
                        r = e.filter(
                          (e) => (e.date ? new Date(e.date) : new Date(e.created)) < Z.from,
                        ),
                        i = e.filter(
                          (e) => (e.date ? new Date(e.date) : new Date(e.created)) > Z.to,
                        )
                      return (0, I.jsxs)(I.Fragment, {
                        children: [
                          n.length > 0 &&
                            (0, I.jsxs)(I.Fragment, {
                              children: [
                                (0, I.jsx)(A, {
                                  className: `bg-muted/50 hover:bg-muted/50`,
                                  children: (0, I.jsx)(j, {
                                    colSpan: 4,
                                    className: `font-semibold text-xs uppercase text-muted-foreground`,
                                    children: `Comissões do Período`,
                                  }),
                                }),
                                n.map((e) =>
                                  (0, I.jsxs)(
                                    A,
                                    {
                                      children: [
                                        (0, I.jsx)(j, {
                                          children: (0, I.jsx)(N, {
                                            checked: W.includes(e.id),
                                            onCheckedChange: () => It(e.id),
                                          }),
                                        }),
                                        (0, I.jsx)(j, {
                                          children: T(
                                            e.date ? new Date(e.date) : new Date(e.created),
                                            `dd/MM/yyyy`,
                                          ),
                                        }),
                                        (0, I.jsx)(j, { children: Q[e.type] || e.type }),
                                        (0, I.jsxs)(j, {
                                          className: `text-right`,
                                          children: [`R$ `, (e.amount || 0).toFixed(2)],
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                              ],
                            }),
                          r.length > 0 &&
                            (0, I.jsxs)(I.Fragment, {
                              children: [
                                (0, I.jsx)(A, {
                                  className: `bg-muted/50 hover:bg-muted/50`,
                                  children: (0, I.jsx)(j, {
                                    colSpan: 4,
                                    className: `font-semibold text-xs uppercase text-muted-foreground`,
                                    children: `Saldos Anteriores`,
                                  }),
                                }),
                                r.map((e) =>
                                  (0, I.jsxs)(
                                    A,
                                    {
                                      children: [
                                        (0, I.jsx)(j, {
                                          children: (0, I.jsx)(N, {
                                            checked: W.includes(e.id),
                                            onCheckedChange: () => It(e.id),
                                          }),
                                        }),
                                        (0, I.jsx)(j, {
                                          children: T(
                                            e.date ? new Date(e.date) : new Date(e.created),
                                            `dd/MM/yyyy`,
                                          ),
                                        }),
                                        (0, I.jsx)(j, { children: Q[e.type] || e.type }),
                                        (0, I.jsxs)(j, {
                                          className: `text-right`,
                                          children: [`R$ `, (e.amount || 0).toFixed(2)],
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                              ],
                            }),
                          i.length > 0 &&
                            (0, I.jsxs)(I.Fragment, {
                              children: [
                                (0, I.jsx)(A, {
                                  className: `bg-muted/50 hover:bg-muted/50`,
                                  children: (0, I.jsx)(j, {
                                    colSpan: 4,
                                    className: `font-semibold text-xs uppercase text-muted-foreground`,
                                    children: `Comissões Futuras`,
                                  }),
                                }),
                                i.map((e) =>
                                  (0, I.jsxs)(
                                    A,
                                    {
                                      children: [
                                        (0, I.jsx)(j, {
                                          children: (0, I.jsx)(N, {
                                            checked: W.includes(e.id),
                                            onCheckedChange: () => It(e.id),
                                          }),
                                        }),
                                        (0, I.jsx)(j, {
                                          children: T(
                                            e.date ? new Date(e.date) : new Date(e.created),
                                            `dd/MM/yyyy`,
                                          ),
                                        }),
                                        (0, I.jsx)(j, { children: Q[e.type] || e.type }),
                                        (0, I.jsxs)(j, {
                                          className: `text-right`,
                                          children: [`R$ `, (e.amount || 0).toFixed(2)],
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                              ],
                            }),
                          t.length > 0 &&
                            (0, I.jsxs)(I.Fragment, {
                              children: [
                                (0, I.jsx)(A, {
                                  className: `bg-red-50 hover:bg-red-50`,
                                  children: (0, I.jsx)(j, {
                                    colSpan: 4,
                                    className: `font-semibold text-xs uppercase text-red-600`,
                                    children: `Deduções / Consumo Interno`,
                                  }),
                                }),
                                t.map((e) =>
                                  (0, I.jsxs)(
                                    A,
                                    {
                                      children: [
                                        (0, I.jsx)(j, {
                                          children: (0, I.jsx)(N, {
                                            checked: W.includes(e.id),
                                            onCheckedChange: () => It(e.id),
                                          }),
                                        }),
                                        (0, I.jsx)(j, {
                                          children: T(
                                            e.date ? new Date(e.date) : new Date(e.created),
                                            `dd/MM/yyyy`,
                                          ),
                                        }),
                                        (0, I.jsx)(j, {
                                          className: `text-red-600`,
                                          children: Q[e.type] || e.type,
                                        }),
                                        (0, I.jsxs)(j, {
                                          className: `text-right text-red-600 font-medium`,
                                          children: [`R$ `, (e.amount || 0).toFixed(2)],
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                              ],
                            }),
                          U.length === 0 &&
                            (0, I.jsx)(A, {
                              children: (0, I.jsx)(j, {
                                colSpan: 4,
                                className: `text-center py-8 text-muted-foreground`,
                                children: `Nenhuma comissão pendente encontrada.`,
                              }),
                            }),
                        ],
                      })
                    })(),
                  }),
                ],
              }),
            }),
            (0, I.jsxs)(`div`, {
              className: `mt-4 flex flex-col gap-4 shrink-0`,
              children: [
                (0, I.jsxs)(`div`, {
                  className: `flex justify-between items-center bg-muted/30 p-4 rounded-lg`,
                  children: [
                    (0, I.jsx)(`span`, {
                      className: `font-semibold`,
                      children: `Total Selecionado:`,
                    }),
                    (0, I.jsxs)(`span`, {
                      className: `text-xl font-bold text-emerald-600`,
                      children: [
                        `R$`,
                        ` `,
                        U.filter((e) => W.includes(e.id))
                          .reduce((e, t) => e + (t.amount || 0), 0)
                          .toFixed(2),
                      ],
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, I.jsx)(x, { children: `Forma de Pagamento` }),
                    (0, I.jsxs)(y, {
                      value: G,
                      onValueChange: st,
                      children: [
                        (0, I.jsx)(_, { children: (0, I.jsx)(v, { placeholder: `Selecione...` }) }),
                        (0, I.jsxs)(g, {
                          children: [
                            (0, I.jsx)(S, { value: `pix`, children: `Pix` }),
                            (0, I.jsx)(S, { value: `cash`, children: `Dinheiro` }),
                            (0, I.jsx)(S, { value: `debito`, children: `Cartão de Débito` }),
                            (0, I.jsx)(S, { value: `credito`, children: `Cartão de Crédito` }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, I.jsxs)(h, {
              className: `mt-4`,
              children: [
                (0, I.jsx)(d, {
                  variant: `ghost`,
                  onClick: () => rt(!1),
                  disabled: ct,
                  children: `Cancelar`,
                }),
                (0, I.jsx)(d, {
                  onClick: Rt,
                  disabled: ct || W.length === 0,
                  children: ct ? `Processando...` : `Confirmar Pagamento`,
                }),
              ],
            }),
          ],
        }),
      }),
      (0, I.jsx)(p, {
        open: ut,
        onOpenChange: dt,
        children: (0, I.jsxs)(C, {
          className: `sm:max-w-md bg-stone-50`,
          children: [
            (0, I.jsx)(w, {
              children: (0, I.jsx)(f, {
                className: `text-center text-xl text-primary`,
                children: `Pagamento Concluído!`,
              }),
            }),
            (0, I.jsxs)(`div`, {
              className: `bg-white p-6 border-y-2 border-dashed border-gray-300 shadow-sm font-mono text-sm space-y-4 my-2 max-h-[50vh] overflow-y-auto`,
              children: [
                (0, I.jsxs)(`div`, {
                  className: `text-center space-y-1`,
                  children: [
                    (0, I.jsx)(`h3`, { className: `font-bold text-lg`, children: ht }),
                    (0, I.jsx)(`p`, { children: `Recibo de Comissões` }),
                    (0, I.jsx)(`p`, { children: T(K?.date || new Date(), `dd/MM/yyyy HH:mm`) }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `border-t border-dashed border-gray-300 pt-3`,
                  children: [
                    (0, I.jsxs)(`p`, {
                      children: [
                        (0, I.jsx)(`strong`, { children: `Profissional:` }),
                        ` `,
                        K?.barberName,
                      ],
                    }),
                    (0, I.jsxs)(`p`, {
                      children: [
                        (0, I.jsx)(`strong`, { children: `Forma de Pag.:` }),
                        ` `,
                        K?.method,
                      ],
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `border-t border-dashed border-gray-300 pt-3 space-y-2`,
                  children: [
                    (0, I.jsxs)(`div`, {
                      className: `grid grid-cols-12 font-bold mb-1 border-b border-gray-100 pb-1`,
                      children: [
                        (0, I.jsx)(`div`, { className: `col-span-8`, children: `Descrição` }),
                        (0, I.jsx)(`div`, {
                          className: `col-span-4 text-right`,
                          children: `Valor`,
                        }),
                      ],
                    }),
                    K?.items
                      .filter((e) => (e.amount || 0) >= 0)
                      .map((e, t) =>
                        (0, I.jsxs)(
                          `div`,
                          {
                            className: `grid grid-cols-12 text-gray-700 py-0.5`,
                            children: [
                              (0, I.jsxs)(`div`, {
                                className: `col-span-8 truncate pr-2`,
                                title: `${T(e.date ? new Date(e.date) : new Date(e.created), `dd/MM/yy`)} - ${Q[e.type] || e.type}`,
                                children: [
                                  T(e.date ? new Date(e.date) : new Date(e.created), `dd/MM/yy`),
                                  ` `,
                                  Q[e.type] || e.type,
                                ],
                              }),
                              (0, I.jsxs)(`div`, {
                                className: `col-span-4 text-right`,
                                children: [`R$ `, (e.amount || 0).toFixed(2)],
                              }),
                            ],
                          },
                          t,
                        ),
                      ),
                    K?.items.some((e) => (e.amount || 0) < 0) &&
                      (0, I.jsxs)(I.Fragment, {
                        children: [
                          (0, I.jsx)(`div`, {
                            className: `grid grid-cols-12 font-bold mt-4 mb-1 border-b border-gray-100 pb-1 text-red-800`,
                            children: (0, I.jsx)(`div`, {
                              className: `col-span-12`,
                              children: `Deduções / Consumo Interno`,
                            }),
                          }),
                          K?.items
                            .filter((e) => (e.amount || 0) < 0)
                            .map((e, t) =>
                              (0, I.jsxs)(
                                `div`,
                                {
                                  className: `grid grid-cols-12 text-red-600 py-0.5`,
                                  children: [
                                    (0, I.jsxs)(`div`, {
                                      className: `col-span-8 truncate pr-2`,
                                      title: `${T(e.date ? new Date(e.date) : new Date(e.created), `dd/MM/yy`)} - ${Q[e.type] || e.type}`,
                                      children: [
                                        T(
                                          e.date ? new Date(e.date) : new Date(e.created),
                                          `dd/MM/yy`,
                                        ),
                                        ` `,
                                        Q[e.type] || e.type,
                                      ],
                                    }),
                                    (0, I.jsxs)(`div`, {
                                      className: `col-span-4 text-right`,
                                      children: [`R$ `, (e.amount || 0).toFixed(2)],
                                    }),
                                  ],
                                },
                                `deduction-${t}`,
                              ),
                            ),
                        ],
                      }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `border-t border-dashed border-gray-300 pt-3 flex justify-between font-bold text-base`,
                  children: [
                    (0, I.jsx)(`span`, { children: `TOTAL PAGO` }),
                    (0, I.jsxs)(`span`, { children: [`R$ `, K?.total.toFixed(2)] }),
                  ],
                }),
              ],
            }),
            (0, I.jsxs)(`div`, {
              className: `flex flex-col gap-3 mt-2`,
              children: [
                (0, I.jsxs)(d, {
                  onClick: () => {
                    let e = ft?.text || ``
                    ;(navigator.clipboard.writeText(e.replace(/\*/g, ``)),
                      vt(!0),
                      setTimeout(() => vt(!1), 2e3))
                  },
                  className: `w-full gap-2 bg-[#F97316] hover:bg-[#EA580C] text-black border-none`,
                  children: [
                    _t
                      ? (0, I.jsx)(a, { className: `size-4 text-black` })
                      : (0, I.jsx)(De, { className: `size-4 text-black` }),
                    _t ? `Copiado!` : `Copiar Recibo`,
                  ],
                }),
                (0, I.jsxs)(d, {
                  onClick: () => {
                    ft?.url && window.open(ft.url, `_blank`)
                  },
                  className: `bg-green-600 hover:bg-green-700 text-white gap-2 w-full`,
                  children: [(0, I.jsx)(ee, { className: `size-4` }), `Enviar via WhatsApp`],
                }),
              ],
            }),
            (0, I.jsx)(h, {
              className: `mt-2`,
              children: (0, I.jsx)(d, {
                variant: `ghost`,
                onClick: () => dt(!1),
                children: `Fechar`,
              }),
            }),
          ],
        }),
      }),
      (0, I.jsx)(p, {
        open: !!V,
        onOpenChange: (e) => !e && tt(null),
        children: (0, I.jsxs)(C, {
          className: `sm:max-w-sm bg-white text-black font-mono shadow-xl max-h-[90vh] overflow-y-auto rounded-md border border-gray-300`,
          children: [
            (0, I.jsx)(w, {
              className: `mb-2`,
              children: (0, I.jsxs)(f, {
                className: `flex flex-col items-center justify-center space-y-2`,
                children: [
                  (0, I.jsx)(ke, { className: `size-8 text-black` }),
                  (0, I.jsx)(`span`, {
                    className: `text-xl font-bold uppercase tracking-widest text-black`,
                    children: `Recibo de Comissão`,
                  }),
                ],
              }),
            }),
            $ &&
              (0, I.jsxs)(`div`, {
                className: `space-y-4 text-sm`,
                children: [
                  (0, I.jsxs)(`div`, {
                    className: `space-y-1 text-center border-b border-dashed border-gray-400 pb-4`,
                    children: [
                      (0, I.jsx)(`p`, {
                        className: `font-bold text-base uppercase tracking-wider`,
                        children: ht,
                      }),
                      $.checkoutNumber &&
                        (0, I.jsxs)(`p`, {
                          className: `text-lg font-black uppercase tracking-widest text-primary mt-1 mb-2`,
                          children: [`Pedido #`, $.checkoutNumber],
                        }),
                      (0, I.jsxs)(`p`, {
                        className: `text-gray-600`,
                        children: [`Profissional: `, $.professionalName],
                      }),
                      (0, I.jsxs)(`p`, {
                        className: `text-gray-600`,
                        children: [`Cliente: `, $.clientName],
                      }),
                      (0, I.jsx)(`p`, {
                        className: `text-gray-600`,
                        children: T($.date, `dd/MM/yyyy HH:mm`),
                      }),
                      (0, I.jsxs)(`p`, {
                        className: `text-gray-600`,
                        children: [`Pgto: `, $.paymentMethodName],
                      }),
                    ],
                  }),
                  (0, I.jsxs)(`div`, {
                    className: `flex justify-between font-bold text-base bg-gray-100 p-2 rounded`,
                    children: [
                      (0, I.jsx)(`span`, { children: `Total Pago:` }),
                      (0, I.jsxs)(`span`, { children: [`R$ `, $.totalPaid.toFixed(2)] }),
                    ],
                  }),
                  $.snapshot && $.snapshot.length > 0
                    ? (0, I.jsxs)(`div`, {
                        className: `space-y-1 border border-gray-200 rounded p-2 bg-gray-50 mb-4`,
                        children: [
                          (0, I.jsx)(`p`, {
                            className: `font-bold uppercase text-gray-800 text-xs mb-2 border-b pb-1`,
                            children: `Itens do Pedido (Snapshot)`,
                          }),
                          $.snapshot.map((e, t) =>
                            (0, I.jsxs)(
                              `div`,
                              {
                                className: `flex justify-between text-gray-800 py-0.5`,
                                children: [
                                  (0, I.jsxs)(`span`, {
                                    className: `truncate max-w-[200px]`,
                                    children: [
                                      e.quantity > 1 ? `${e.quantity}x ` : ``,
                                      e.name,
                                      ` `,
                                      e.packageUsed ? `(Pacote)` : ``,
                                    ],
                                  }),
                                  (0, I.jsxs)(`span`, {
                                    children: [
                                      `R$`,
                                      ` `,
                                      e.packageUsed
                                        ? `0.00`
                                        : (e.price * (e.quantity || 1)).toFixed(2),
                                    ],
                                  }),
                                ],
                              },
                              `snap-${t}`,
                            ),
                          ),
                        ],
                      })
                    : (0, I.jsxs)(I.Fragment, {
                        children: [
                          $.nonCommProducts.length > 0 &&
                            (0, I.jsxs)(`div`, {
                              className: `space-y-1`,
                              children: [
                                (0, I.jsx)(`p`, {
                                  className: `font-bold uppercase text-gray-500 text-xs mt-4 mb-2`,
                                  children: `Produtos (Sem Comissão)`,
                                }),
                                $.nonCommProducts.map((e, t) =>
                                  (0, I.jsxs)(
                                    `div`,
                                    {
                                      className: `flex justify-between text-gray-500`,
                                      children: [
                                        (0, I.jsx)(`span`, {
                                          className: `truncate max-w-[200px]`,
                                          children: e.item,
                                        }),
                                        (0, I.jsxs)(`span`, {
                                          children: [`R$ `, e.price.toFixed(2)],
                                        }),
                                      ],
                                    },
                                    t,
                                  ),
                                ),
                                (0, I.jsx)(`div`, {
                                  className: `border-t border-dashed border-gray-300 my-2`,
                                }),
                              ],
                            }),
                          $.nonCommOthers.length > 0 &&
                            (0, I.jsxs)(`div`, {
                              className: `space-y-1`,
                              children: [
                                (0, I.jsx)(`p`, {
                                  className: `font-bold uppercase text-gray-500 text-xs mt-4 mb-2`,
                                  children: `Outros (Sem Comissão)`,
                                }),
                                $.nonCommOthers.map((e, t) =>
                                  (0, I.jsxs)(
                                    `div`,
                                    {
                                      className: `flex justify-between text-gray-500`,
                                      children: [
                                        (0, I.jsx)(`span`, {
                                          className: `truncate max-w-[200px]`,
                                          children: e.item,
                                        }),
                                        (0, I.jsxs)(`span`, {
                                          children: [`R$ `, e.price.toFixed(2)],
                                        }),
                                      ],
                                    },
                                    t,
                                  ),
                                ),
                                (0, I.jsx)(`div`, {
                                  className: `border-t border-dashed border-gray-300 my-2`,
                                }),
                              ],
                            }),
                          (0, I.jsxs)(`div`, {
                            className: `space-y-1`,
                            children: [
                              (0, I.jsx)(`p`, {
                                className: `font-bold uppercase text-gray-800 text-xs mt-4 mb-2`,
                                children: `Itens Comissionáveis`,
                              }),
                              $.commissionableItems.map((e, t) =>
                                (0, I.jsxs)(
                                  `div`,
                                  {
                                    className: `flex justify-between text-gray-800`,
                                    children: [
                                      (0, I.jsx)(`span`, {
                                        className: `truncate max-w-[200px]`,
                                        children: e.item,
                                      }),
                                      (0, I.jsxs)(`span`, {
                                        children: [`R$ `, e.price.toFixed(2)],
                                      }),
                                    ],
                                  },
                                  t,
                                ),
                              ),
                            ],
                          }),
                        ],
                      }),
                  (0, I.jsx)(`div`, { className: `border-t border-dashed border-gray-400 my-4` }),
                  (0, I.jsxs)(`div`, {
                    className: `space-y-1 bg-yellow-50/50 p-2 rounded border border-yellow-100`,
                    children: [
                      (0, I.jsx)(`p`, {
                        className: `font-bold uppercase text-gray-800 text-xs mb-2`,
                        children: `Memória de Cálculo`,
                      }),
                      (0, I.jsxs)(`div`, {
                        className: `flex justify-between text-sm text-gray-600 mb-2 border-b border-gray-200 pb-1`,
                        children: [
                          (0, I.jsx)(`span`, { children: `Base Comissionável:` }),
                          (0, I.jsxs)(`span`, {
                            className: `font-medium`,
                            children: [`R$ `, $.commissionBase.toFixed(2)],
                          }),
                        ],
                      }),
                      $.memoryLines.map((e, t) =>
                        (0, I.jsxs)(
                          `div`,
                          {
                            className: `flex justify-between text-gray-800 text-xs`,
                            children: [
                              (0, I.jsx)(`span`, { children: e.label }),
                              (0, I.jsxs)(`span`, {
                                className: `font-medium`,
                                children: [`R$ `, e.value.toFixed(2)],
                              }),
                            ],
                          },
                          t,
                        ),
                      ),
                    ],
                  }),
                  (0, I.jsx)(`div`, { className: `border-t border-black border-2 my-4` }),
                  (0, I.jsxs)(`div`, {
                    className: `flex justify-between font-black text-lg uppercase tracking-wide`,
                    children: [
                      (0, I.jsx)(`span`, { children: `Total a Pagar:` }),
                      (0, I.jsxs)(`span`, { children: [`R$ `, $.netCommission.toFixed(2)] }),
                    ],
                  }),
                ],
              }),
            (0, I.jsxs)(h, {
              className: `mt-4 flex-col sm:flex-col gap-2 border-t border-dashed border-gray-300 pt-4`,
              children: [
                (0, I.jsxs)(d, {
                  className: `w-full font-sans font-medium bg-[#F97316] hover:bg-[#EA580C] text-black border-none`,
                  onClick: () => {
                    let e = `================================
`
                    ;((e += `       RECIBO DE COMISSÃO
`),
                      (e += `================================

`),
                      (e += `Pedido #${$?.checkoutNumber || `N/A`}\n`),
                      (e += `Data: ${T($?.date || new Date(), `dd/MM/yyyy HH:mm`)}\n`),
                      (e += `Profissional: ${$?.professionalName}\n`),
                      (e += `Cliente: ${$?.clientName}\n\n`),
                      (e += `DETALHES DA VENDA:
`),
                      (e += `--------------------------------
`),
                      $?.commissionableItems?.forEach((t) => {
                        ;((e += `${t.item}\n`),
                          (e += `Valor: R$ ${t.price.toFixed(2)}\n`),
                          (e += `--------------------------------
`))
                      }),
                      (e += `\nBase de Cálculo: R$ ${$?.commissionBase?.toFixed(2)}\n\n`),
                      (e += `MEMÓRIA DE CÁLCULO:
`),
                      $?.memoryLines?.forEach((t) => {
                        e += `${t.label}: R$ ${t.value.toFixed(2)}\n`
                      }),
                      (e += `--------------------------------
`),
                      (e += `TOTAL A PAGAR: R$ ${$?.netCommission?.toFixed(2)}\n`),
                      (e += `================================
`),
                      navigator.clipboard.writeText(e),
                      vt(!0),
                      setTimeout(() => vt(!1), 2e3))
                  },
                  children: [
                    _t
                      ? (0, I.jsx)(a, { className: `w-4 h-4 mr-2` })
                      : (0, I.jsx)(De, { className: `w-4 h-4 mr-2` }),
                    _t ? `Copiado!` : `Copiar Recibo`,
                  ],
                }),
                (0, I.jsx)(d, {
                  variant: `outline`,
                  className: `w-full font-sans border-gray-300 hover:bg-gray-100`,
                  onClick: () => tt(null),
                  children: `Fechar`,
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  })
}
export { Ie as default }
