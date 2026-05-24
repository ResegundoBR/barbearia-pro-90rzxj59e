import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './eye-EU4oz1u3.js'
import { t as i } from './square-pen-BgqsEwws.js'
import { n as a, r as o, t as s } from './toggle-group-EynYOrG1.js'
import {
  D as c,
  E as l,
  G as u,
  H as d,
  J as f,
  O as p,
  S as m,
  U as h,
  Y as g,
  _,
  _t as v,
  a as y,
  b,
  bt as x,
  c as S,
  ct as C,
  dt as w,
  f as T,
  ft as E,
  ht as D,
  i as ee,
  k as te,
  m as ne,
  n as O,
  p as k,
  pt as A,
  r as re,
  s as j,
  t as M,
  tt as ie,
  u as N,
  v as ae,
  vt as P,
  x as oe,
  yt as se,
} from './index-Bf5nkyu_.js'
import { t as ce } from './format-BUAFcs3P.js'
import { t as F } from './startOfMonth-Dtw_Bedr.js'
import { t as le } from './subDays-BvwDtwKl.js'
import { i as I, n as L, r as ue, t as de } from './tabs-gFjfGirc.js'
import { a as fe, c as pe, m as me, n as he, r as ge, u as _e, y as R } from './api-DxhYzPjr.js'
import { n as z, t as B } from './card-CPm2bQdE.js'
import { a as V, i as H, n as U, o as W, r as G, t as K } from './table-BQplVDEI.js'
import { t as q } from './badge-DDF6d_iC.js'
import { t as ve } from './switch-B9u8388b.js'
var ye = C(`arrow-up-right`, [
    [`path`, { d: `M7 7h10v10`, key: `1tivn9` }],
    [`path`, { d: `M7 17 17 7`, key: `1vkiza` }],
  ]),
  be = C(`medal`, [
    [
      `path`,
      {
        d: `M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15`,
        key: `143lza`,
      },
    ],
    [`path`, { d: `M11 12 5.12 2.2`, key: `qhuxz6` }],
    [`path`, { d: `m13 12 5.88-9.8`, key: `hbye0f` }],
    [`path`, { d: `M8 7h8`, key: `i86dvs` }],
    [`circle`, { cx: `12`, cy: `17`, r: `5`, key: `qbz8iq` }],
    [`path`, { d: `M12 18v-2h-.5`, key: `fawc4q` }],
  ]),
  xe = C(`star`, [
    [
      `path`,
      {
        d: `M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z`,
        key: `r04s7s`,
      },
    ],
  ]),
  Se = C(`user-plus`, [
    [`path`, { d: `M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`, key: `1yyitq` }],
    [`circle`, { cx: `9`, cy: `7`, r: `4`, key: `nufk8` }],
    [`line`, { x1: `19`, x2: `19`, y1: `8`, y2: `14`, key: `1bvyxn` }],
    [`line`, { x1: `22`, x2: `16`, y1: `11`, y2: `11`, key: `1shjgl` }],
  ]),
  J = e(t(), 1),
  Y = n(),
  X = `Radio`,
  [Ce, we] = D(X),
  [Te, Ee] = Ce(X),
  De = J.forwardRef((e, t) => {
    let {
        __scopeRadio: n,
        name: r,
        checked: i = !1,
        required: a,
        disabled: o,
        value: s = `on`,
        onCheck: c,
        form: l,
        ...u
      } = e,
      [d, f] = J.useState(null),
      p = v(t, (e) => f(e)),
      m = J.useRef(!1),
      h = d ? l || !!d.closest(`form`) : !0
    return (0, Y.jsxs)(Te, {
      scope: n,
      checked: i,
      disabled: o,
      children: [
        (0, Y.jsx)(A.button, {
          type: `button`,
          role: `radio`,
          'aria-checked': i,
          'data-state': Me(i),
          'data-disabled': o ? `` : void 0,
          disabled: o,
          value: s,
          ...u,
          ref: p,
          onClick: P(e.onClick, (e) => {
            ;(i || c?.(),
              h && ((m.current = e.isPropagationStopped()), m.current || e.stopPropagation()))
          }),
        }),
        h &&
          (0, Y.jsx)(je, {
            control: d,
            bubbles: !m.current,
            name: r,
            value: s,
            checked: i,
            required: a,
            disabled: o,
            form: l,
            style: { transform: `translateX(-100%)` },
          }),
      ],
    })
  })
De.displayName = X
var Oe = `RadioIndicator`,
  ke = J.forwardRef((e, t) => {
    let { __scopeRadio: n, forceMount: r, ...i } = e,
      a = Ee(Oe, n)
    return (0, Y.jsx)(E, {
      present: r || a.checked,
      children: (0, Y.jsx)(A.span, {
        'data-state': Me(a.checked),
        'data-disabled': a.disabled ? `` : void 0,
        ...i,
        ref: t,
      }),
    })
  })
ke.displayName = Oe
var Ae = `RadioBubbleInput`,
  je = J.forwardRef(({ __scopeRadio: e, control: t, checked: n, bubbles: r = !0, ...i }, a) => {
    let o = J.useRef(null),
      s = v(o, a),
      c = ne(n),
      l = u(t)
    return (
      J.useEffect(() => {
        let e = o.current
        if (!e) return
        let t = window.HTMLInputElement.prototype,
          i = Object.getOwnPropertyDescriptor(t, `checked`).set
        if (c !== n && i) {
          let t = new Event(`click`, { bubbles: r })
          ;(i.call(e, n), e.dispatchEvent(t))
        }
      }, [c, n, r]),
      (0, Y.jsx)(A.input, {
        type: `radio`,
        'aria-hidden': !0,
        defaultChecked: n,
        ...i,
        tabIndex: -1,
        ref: s,
        style: {
          ...i.style,
          ...l,
          position: `absolute`,
          pointerEvents: `none`,
          opacity: 0,
          margin: 0,
        },
      })
    )
  })
je.displayName = Ae
function Me(e) {
  return e ? `checked` : `unchecked`
}
var Ne = [`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`],
  Z = `RadioGroup`,
  [Pe, Fe] = D(Z, [p, we]),
  Ie = p(),
  Le = we(),
  [Re, ze] = Pe(Z),
  Be = J.forwardRef((e, t) => {
    let {
        __scopeRadioGroup: n,
        name: r,
        defaultValue: i,
        value: a,
        required: o = !1,
        disabled: s = !1,
        orientation: l,
        dir: u,
        loop: d = !0,
        onValueChange: f,
        ...p
      } = e,
      m = Ie(n),
      h = te(u),
      [g, _] = w({ prop: a, defaultProp: i ?? null, onChange: f, caller: Z })
    return (0, Y.jsx)(Re, {
      scope: n,
      name: r,
      required: o,
      disabled: s,
      value: g,
      onValueChange: _,
      children: (0, Y.jsx)(c, {
        asChild: !0,
        ...m,
        orientation: l,
        dir: h,
        loop: d,
        children: (0, Y.jsx)(A.div, {
          role: `radiogroup`,
          'aria-required': o,
          'aria-orientation': l,
          'data-disabled': s ? `` : void 0,
          dir: h,
          ...p,
          ref: t,
        }),
      }),
    })
  })
Be.displayName = Z
var Ve = `RadioGroupItem`,
  He = J.forwardRef((e, t) => {
    let { __scopeRadioGroup: n, disabled: r, ...i } = e,
      a = ze(Ve, n),
      o = a.disabled || r,
      s = Ie(n),
      c = Le(n),
      u = J.useRef(null),
      d = v(t, u),
      f = a.value === i.value,
      p = J.useRef(!1)
    return (
      J.useEffect(() => {
        let e = (e) => {
            Ne.includes(e.key) && (p.current = !0)
          },
          t = () => (p.current = !1)
        return (
          document.addEventListener(`keydown`, e),
          document.addEventListener(`keyup`, t),
          () => {
            ;(document.removeEventListener(`keydown`, e), document.removeEventListener(`keyup`, t))
          }
        )
      }, []),
      (0, Y.jsx)(l, {
        asChild: !0,
        ...s,
        focusable: !o,
        active: f,
        children: (0, Y.jsx)(De, {
          disabled: o,
          required: a.required,
          checked: f,
          ...c,
          ...i,
          name: a.name,
          ref: d,
          onCheck: () => a.onValueChange(i.value),
          onKeyDown: P((e) => {
            e.key === `Enter` && e.preventDefault()
          }),
          onFocus: P(i.onFocus, () => {
            p.current && u.current?.click()
          }),
        }),
      })
    )
  })
He.displayName = Ve
var Ue = `RadioGroupIndicator`,
  We = J.forwardRef((e, t) => {
    let { __scopeRadioGroup: n, ...r } = e
    return (0, Y.jsx)(ke, { ...Le(n), ...r, ref: t })
  })
We.displayName = Ue
var Ge = Be,
  Ke = He,
  qe = We,
  Je = J.forwardRef(({ className: e, ...t }, n) =>
    (0, Y.jsx)(Ge, { className: f(`grid gap-2`, e), ...t, ref: n }),
  )
Je.displayName = Ge.displayName
var Q = J.forwardRef(({ className: e, ...t }, n) =>
  (0, Y.jsx)(Ke, {
    ref: n,
    className: f(
      `aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
      e,
    ),
    ...t,
    children: (0, Y.jsx)(qe, {
      className: `flex items-center justify-center`,
      children: (0, Y.jsx)(ie, { className: `h-2.5 w-2.5 fill-current text-current` }),
    }),
  }),
)
Q.displayName = Ke.displayName
function Ye() {
  let [e, t] = (0, J.useState)(`current_month`),
    [n, r] = (0, J.useState)([]),
    [i, c] = (0, J.useState)([]),
    [l, u] = (0, J.useState)(!1),
    [d, f] = (0, J.useState)(`revenue`),
    [p, m] = (0, J.useState)(`Qtd`),
    [h, g] = (0, J.useState)(0),
    _ = () => g((e) => e + 1)
  ;(O(`appointments`, _),
    O(`product_purchases`, _),
    O(`client_logs`, _),
    (0, J.useEffect)(() => {
      async function t() {
        u(!0)
        try {
          let t = new Date(),
            n = F(t)
          ;(e === `last_3_months` && (n = le(t, 90)), e === `last_6_months` && (n = le(t, 180)))
          let i = `created >= '${ce(n, `yyyy-MM-dd`) + ` 00:00:00.000Z`}'`,
            [a, o, s, l, u, d] = await Promise.all([
              _e(),
              ge(i),
              me(i),
              pe(`event_type = 'no_show' && ${i}`),
              y.collection(`services`).getFullList(),
              y.collection(`products`).getFullList(),
            ]),
            f = {},
            p = {}
          ;(a.forEach((e) => {
            f[e.id] = { client: e, totalSpent: 0, totalVisits: 0, noShows: 0 }
          }),
            o.forEach((e) => {
              if (
                e.status === `Concluído` &&
                (e.client_id &&
                  f[e.client_id] &&
                  ((f[e.client_id].totalSpent += e.price || e.expand?.service_id?.price || 0),
                  (f[e.client_id].totalVisits += 1)),
                e.service_id)
              ) {
                if (!p[e.service_id]) {
                  let t = u.find((t) => t.id === e.service_id)
                  p[e.service_id] = {
                    id: e.service_id,
                    name: t?.name || `Serviço`,
                    type: `Serviço`,
                    qtd: 0,
                    vlr: 0,
                  }
                }
                ;((p[e.service_id].qtd += 1),
                  (p[e.service_id].vlr += e.price || e.expand?.service_id?.price || 0))
              }
            }),
            s.forEach((e) => {
              if (
                (e.client_id &&
                  f[e.client_id] &&
                  (f[e.client_id].totalSpent += e.price_at_sale || 0),
                e.product_id)
              ) {
                if (!p[e.product_id]) {
                  let t = d.find((t) => t.id === e.product_id)
                  p[e.product_id] = {
                    id: e.product_id,
                    name: t?.name || `Produto`,
                    type: `Produto`,
                    qtd: 0,
                    vlr: 0,
                  }
                }
                ;((p[e.product_id].qtd += 1), (p[e.product_id].vlr += e.price_at_sale || 0))
              }
            }),
            l.forEach((e) => {
              f[e.client_id] && (f[e.client_id].noShows += 1)
            }),
            r(Object.values(f)),
            c(Object.values(p)))
        } catch (e) {
          console.error(e)
        } finally {
          u(!1)
        }
      }
      t()
    }, [e, h]))
  let v = (0, J.useMemo)(() => {
      let e = n.filter((e) => e.totalVisits > 0 || e.totalSpent > 0)
      return d === `revenue`
        ? e.sort((e, t) => t.totalSpent - e.totalSpent)
        : e.sort((e, t) => t.totalVisits - e.totalVisits)
    }, [n, d]),
    b = (0, J.useMemo)(
      () => n.filter((e) => e.noShows > 0).sort((e, t) => t.noShows - e.noShows),
      [n],
    ),
    C = (0, J.useMemo)(() => {
      let e = [...i]
      return p === `Vlr`
        ? e.sort((e, t) => t.vlr - e.vlr).slice(0, 10)
        : e.sort((e, t) => t.qtd - e.qtd).slice(0, 10)
    }, [i, p]),
    w = Math.max(...n.map((e) => e.totalSpent), 1),
    E = Math.max(...n.map((e) => e.totalVisits), 1)
  return (0, Y.jsx)(`div`, {
    className: `space-y-4`,
    children: (0, Y.jsxs)(de, {
      defaultValue: `top`,
      className: `w-full`,
      children: [
        (0, Y.jsxs)(`div`, {
          className: `flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4`,
          children: [
            (0, Y.jsxs)(ue, {
              children: [
                (0, Y.jsx)(I, { value: `top`, children: `Top Clientes` }),
                (0, Y.jsx)(I, { value: `items`, children: `Itens mais vendidos` }),
                (0, Y.jsx)(I, { value: `noshow`, children: `Análise de Faltas` }),
              ],
            }),
            (0, Y.jsxs)(j, {
              value: e,
              onValueChange: t,
              children: [
                (0, Y.jsx)(T, {
                  className: `w-[180px]`,
                  children: (0, Y.jsx)(k, { placeholder: `Período` }),
                }),
                (0, Y.jsxs)(S, {
                  children: [
                    (0, Y.jsx)(N, { value: `current_month`, children: `Mês Atual` }),
                    (0, Y.jsx)(N, { value: `last_3_months`, children: `Últimos 3 Meses` }),
                    (0, Y.jsx)(N, { value: `last_6_months`, children: `Últimos 6 Meses` }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, Y.jsxs)(L, {
          value: `top`,
          className: `space-y-4 mt-0`,
          children: [
            (0, Y.jsx)(`div`, {
              className: `flex justify-end`,
              children: (0, Y.jsxs)(s, {
                type: `single`,
                value: d,
                onValueChange: (e) => {
                  e && f(e)
                },
                className: `bg-muted p-1 rounded-md border`,
                children: [
                  (0, Y.jsx)(a, {
                    value: `revenue`,
                    className: `px-4 font-medium text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-background data-[state=on]:shadow-sm`,
                    children: `Faturamento`,
                  }),
                  (0, Y.jsx)(a, {
                    value: `frequency`,
                    className: `px-4 font-medium text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-background data-[state=on]:shadow-sm`,
                    children: `Atendimento`,
                  }),
                ],
              }),
            }),
            (0, Y.jsx)(B, {
              children: (0, Y.jsx)(z, {
                className: `p-0 overflow-x-auto`,
                children: (0, Y.jsxs)(K, {
                  className: `min-w-[600px]`,
                  children: [
                    (0, Y.jsx)(V, {
                      children: (0, Y.jsxs)(W, {
                        children: [
                          (0, Y.jsx)(H, { children: `Cliente` }),
                          (0, Y.jsx)(H, { className: `text-right`, children: `Total Gasto` }),
                          (0, Y.jsx)(H, { className: `text-center`, children: `Visitas` }),
                          (0, Y.jsx)(H, { className: `text-center`, children: `Status` }),
                        ],
                      }),
                    }),
                    (0, Y.jsx)(U, {
                      children: l
                        ? (0, Y.jsx)(W, {
                            children: (0, Y.jsx)(G, {
                              colSpan: 4,
                              className: `text-center py-8`,
                              children: `Carregando...`,
                            }),
                          })
                        : v.length === 0
                          ? (0, Y.jsx)(W, {
                              children: (0, Y.jsx)(G, {
                                colSpan: 4,
                                className: `text-center py-8 text-muted-foreground`,
                                children: `Nenhum dado encontrado para o período.`,
                              }),
                            })
                          : v
                              .slice(0, 7)
                              .map((e) =>
                                (0, Y.jsxs)(
                                  W,
                                  {
                                    children: [
                                      (0, Y.jsx)(G, {
                                        children: (0, Y.jsxs)(`div`, {
                                          className: `flex flex-col`,
                                          children: [
                                            (0, Y.jsxs)(x, {
                                              to: `/clientes/${e.client.id}`,
                                              className: `font-medium hover:underline text-primary flex items-center gap-1`,
                                              children: [
                                                e.client.name || `Cliente`,
                                                ` `,
                                                e.client.surname || ``,
                                                ` `,
                                                (0, Y.jsx)(ye, { className: `size-3` }),
                                              ],
                                            }),
                                            e.client.expand?.preferred_barber_id?.name &&
                                              (0, Y.jsxs)(`span`, {
                                                className: `text-xs text-muted-foreground mt-0.5`,
                                                children: [
                                                  `Profissional: `,
                                                  e.client.expand.preferred_barber_id.name,
                                                ],
                                              }),
                                          ],
                                        }),
                                      }),
                                      (0, Y.jsx)(G, {
                                        className: `text-right`,
                                        children: new Intl.NumberFormat(`pt-BR`, {
                                          style: `currency`,
                                          currency: `BRL`,
                                        }).format(e.totalSpent),
                                      }),
                                      (0, Y.jsx)(G, {
                                        className: `text-center`,
                                        children: e.totalVisits,
                                      }),
                                      (0, Y.jsx)(G, {
                                        className: `text-center`,
                                        children: (0, Y.jsxs)(`div`, {
                                          className: `flex justify-center gap-2`,
                                          children: [
                                            e.totalSpent >= w * 0.7 &&
                                              e.totalSpent > 0 &&
                                              (0, Y.jsxs)(q, {
                                                className: `bg-amber-500 hover:bg-amber-600 gap-1 text-white`,
                                                children: [
                                                  (0, Y.jsx)(be, { className: `size-3` }),
                                                  ` VIP`,
                                                ],
                                              }),
                                            e.totalVisits >= E * 0.7 &&
                                              e.totalVisits > 0 &&
                                              e.totalSpent < w * 0.7 &&
                                              (0, Y.jsxs)(q, {
                                                variant: `secondary`,
                                                className: `gap-1`,
                                                children: [
                                                  (0, Y.jsx)(xe, { className: `size-3` }),
                                                  ` Frequente`,
                                                ],
                                              }),
                                            e.noShows > 2 &&
                                              (0, Y.jsx)(q, {
                                                variant: `destructive`,
                                                children: `Risco de Fuga`,
                                              }),
                                          ],
                                        }),
                                      }),
                                    ],
                                  },
                                  e.client.id,
                                ),
                              ),
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        (0, Y.jsxs)(L, {
          value: `items`,
          className: `space-y-4 mt-0`,
          children: [
            (0, Y.jsx)(`div`, {
              className: `flex justify-end`,
              children: (0, Y.jsxs)(s, {
                type: `single`,
                value: p,
                onValueChange: (e) => {
                  e && m(e)
                },
                className: `bg-muted p-1 rounded-md border`,
                children: [
                  (0, Y.jsx)(a, {
                    value: `Qtd`,
                    className: `px-4 font-medium text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-background data-[state=on]:shadow-sm`,
                    children: `Qtd`,
                  }),
                  (0, Y.jsx)(a, {
                    value: `Vlr`,
                    className: `px-4 font-medium text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-background data-[state=on]:shadow-sm`,
                    children: `Vlr`,
                  }),
                ],
              }),
            }),
            (0, Y.jsx)(B, {
              children: (0, Y.jsx)(z, {
                className: `p-0 overflow-x-auto`,
                children: (0, Y.jsxs)(K, {
                  className: `min-w-[600px]`,
                  children: [
                    (0, Y.jsx)(V, {
                      children: (0, Y.jsxs)(W, {
                        children: [
                          (0, Y.jsx)(H, { children: `Item` }),
                          (0, Y.jsx)(H, { className: `text-center`, children: `Tipo` }),
                          (0, Y.jsx)(H, { className: `text-center`, children: `Quantidade` }),
                          (0, Y.jsx)(H, { className: `text-right`, children: `Valor Total` }),
                        ],
                      }),
                    }),
                    (0, Y.jsx)(U, {
                      children: l
                        ? (0, Y.jsx)(W, {
                            children: (0, Y.jsx)(G, {
                              colSpan: 4,
                              className: `text-center py-8`,
                              children: `Carregando...`,
                            }),
                          })
                        : C.length === 0
                          ? (0, Y.jsx)(W, {
                              children: (0, Y.jsx)(G, {
                                colSpan: 4,
                                className: `text-center py-8 text-muted-foreground`,
                                children: `Nenhum dado encontrado para o período.`,
                              }),
                            })
                          : C.map((e) =>
                              (0, Y.jsxs)(
                                W,
                                {
                                  children: [
                                    (0, Y.jsx)(G, {
                                      className: `font-medium text-primary`,
                                      children: e.name,
                                    }),
                                    (0, Y.jsx)(G, {
                                      className: `text-center`,
                                      children: (0, Y.jsx)(q, {
                                        variant: `outline`,
                                        className:
                                          e.type === `Serviço`
                                            ? `bg-blue-50 text-blue-700 border-blue-200`
                                            : `bg-purple-50 text-purple-700 border-purple-200`,
                                        children: e.type,
                                      }),
                                    }),
                                    (0, Y.jsx)(G, {
                                      className: `text-center font-bold`,
                                      children: e.qtd,
                                    }),
                                    (0, Y.jsx)(G, {
                                      className: `text-right`,
                                      children: new Intl.NumberFormat(`pt-BR`, {
                                        style: `currency`,
                                        currency: `BRL`,
                                      }).format(e.vlr),
                                    }),
                                  ],
                                },
                                e.id,
                              ),
                            ),
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        (0, Y.jsx)(L, {
          value: `noshow`,
          className: `space-y-4 mt-0`,
          children: (0, Y.jsx)(B, {
            children: (0, Y.jsx)(z, {
              className: `p-0 overflow-x-auto`,
              children: (0, Y.jsxs)(K, {
                className: `min-w-[600px]`,
                children: [
                  (0, Y.jsx)(V, {
                    children: (0, Y.jsxs)(W, {
                      children: [
                        (0, Y.jsx)(H, { children: `Cliente` }),
                        (0, Y.jsx)(H, { className: `text-center`, children: `Faltas` }),
                        (0, Y.jsx)(H, { className: `text-center`, children: `Visitas Realizadas` }),
                        (0, Y.jsx)(H, { className: `text-center`, children: `Status` }),
                      ],
                    }),
                  }),
                  (0, Y.jsx)(U, {
                    children: l
                      ? (0, Y.jsx)(W, {
                          children: (0, Y.jsx)(G, {
                            colSpan: 4,
                            className: `text-center py-8`,
                            children: `Carregando...`,
                          }),
                        })
                      : b.length === 0
                        ? (0, Y.jsx)(W, {
                            children: (0, Y.jsx)(G, {
                              colSpan: 4,
                              className: `text-center py-8 text-muted-foreground`,
                              children: `Nenhum no-show registrado no período.`,
                            }),
                          })
                        : b
                            .slice(0, 7)
                            .map((e) =>
                              (0, Y.jsxs)(
                                W,
                                {
                                  children: [
                                    (0, Y.jsx)(G, {
                                      children: (0, Y.jsxs)(`div`, {
                                        className: `flex flex-col`,
                                        children: [
                                          (0, Y.jsxs)(x, {
                                            to: `/clientes/${e.client.id}`,
                                            className: `font-medium hover:underline text-primary flex items-center gap-1`,
                                            children: [
                                              e.client.name || `Cliente`,
                                              ` `,
                                              e.client.surname || ``,
                                              ` `,
                                              (0, Y.jsx)(ye, { className: `size-3` }),
                                            ],
                                          }),
                                          e.client.expand?.preferred_barber_id?.name &&
                                            (0, Y.jsxs)(`span`, {
                                              className: `text-xs text-muted-foreground mt-0.5`,
                                              children: [
                                                `Profissional: `,
                                                e.client.expand.preferred_barber_id.name,
                                              ],
                                            }),
                                        ],
                                      }),
                                    }),
                                    (0, Y.jsx)(G, {
                                      className: `text-center font-bold text-destructive`,
                                      children: e.noShows,
                                    }),
                                    (0, Y.jsx)(G, {
                                      className: `text-center`,
                                      children: e.totalVisits,
                                    }),
                                    (0, Y.jsx)(G, {
                                      className: `text-center`,
                                      children:
                                        e.noShows >= 2
                                          ? (0, Y.jsxs)(q, {
                                              variant: `destructive`,
                                              className: `gap-1`,
                                              children: [
                                                (0, Y.jsx)(o, { className: `size-3` }),
                                                ` Atenção`,
                                              ],
                                            })
                                          : (0, Y.jsx)(q, {
                                              variant: `outline`,
                                              children: `Monitorar`,
                                            }),
                                    }),
                                  ],
                                },
                                e.client.id,
                              ),
                            ),
                  }),
                ],
              }),
            }),
          }),
        }),
      ],
    }),
  })
}
var Xe = (e) => {
    if (!e) return ``
    let t = e.replace(/\D/g, ``)
    return (
      t.length > 11 && (t = t.slice(0, 11)),
      t.length > 10
        ? t.replace(/^(\d{2})(\d{5})(\d{4}).*/, `($1) $2-$3`)
        : t.length > 5
          ? t.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, `($1) $2-$3`)
          : t.length > 2
            ? t.replace(/^(\d{2})(\d{0,5})/, `($1) $2`)
            : t
    )
  },
  $ = {
    name: ``,
    surname: ``,
    phone: ``,
    phone_secondary: ``,
    email: ``,
    birthday: ``,
    location_type: `nearby`,
    is_active: !0,
    preferred_barber_id: ``,
  }
function Ze() {
  let { user: e } = ee(),
    { hasAccess: t } = re(),
    [n, a] = (0, J.useState)([]),
    [o, s] = (0, J.useState)([]),
    [c, l] = (0, J.useState)(!1),
    [u, f] = (0, J.useState)($),
    [p, v] = (0, J.useState)(null),
    { toast: y } = se(),
    C = async () => {
      ;(a(await _e()), s(await fe()))
    }
  ;((0, J.useEffect)(() => {
    C()
  }, []),
    O(`clients`, C))
  let w = o.find((t) => t.user_id === e?.id || t.name === e?.name),
    E = (e) => {
      ;(f({
        ...e,
        is_active: e.is_active ?? !0,
        phone_secondary: e.phone_secondary || ``,
        preferred_barber_id: e.preferred_barber_id || ``,
      }),
        v(e.id),
        l(!0))
    },
    D = () => {
      ;(f($), v(null), l(!0))
    },
    te = async (e) => {
      e.preventDefault()
      try {
        let e = { ...u }
        ;(!p && w && (e.created_by_id = w.id),
          (!e.preferred_barber_id || e.preferred_barber_id === `none`) &&
            (e.preferred_barber_id = ``),
          p ? await R(p, e) : await he(e),
          y({ title: p ? `Cliente atualizado!` : `Cliente cadastrado com sucesso!` }),
          l(!1))
      } catch {
        y({ title: `Erro ao salvar`, variant: `destructive` })
      }
    },
    ne = async (e, t) => {
      await R(e, { is_active: !t })
    },
    [A, ie] = (0, J.useState)(``),
    [P, ce] = (0, J.useState)(`all`),
    F = n.filter((e) => {
      let t =
          !A ||
          `${e.name} ${e.surname || ``}`.toLowerCase().includes(A.toLowerCase()) ||
          (e.phone && e.phone.includes(A)),
        n = P === `all` || e.preferred_barber_id === P
      return t && n
    })
  return (0, Y.jsxs)(`div`, {
    className: `space-y-6 max-w-5xl mx-auto pb-20 md:pb-6`,
    children: [
      (0, Y.jsxs)(`div`, {
        className: `flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`,
        children: [
          (0, Y.jsxs)(`div`, {
            children: [
              (0, Y.jsx)(`h2`, {
                className: `text-2xl font-bold tracking-tight`,
                children: `Clientes (CRM)`,
              }),
              (0, Y.jsx)(`p`, {
                className: `text-muted-foreground`,
                children: `Gerencie seus clientes e acompanhe histórico.`,
              }),
            ],
          }),
          t(`action_delete`) &&
            (0, Y.jsxs)(h, {
              onClick: D,
              className: `gap-2`,
              children: [(0, Y.jsx)(Se, { className: `size-4` }), ` Novo Cliente`],
            }),
        ],
      }),
      (0, Y.jsxs)(de, {
        defaultValue: `lista`,
        children: [
          (0, Y.jsxs)(ue, {
            className: `mb-4`,
            children: [
              (0, Y.jsx)(I, { value: `lista`, children: `Lista de Clientes` }),
              (e?.access_level === `Admin` || e?.access_level === `Socio`) &&
                (0, Y.jsx)(I, { value: `ranking`, children: `Fidelidade e Rankings` }),
            ],
          }),
          (0, Y.jsxs)(L, {
            value: `lista`,
            className: `space-y-4 mt-0`,
            children: [
              (0, Y.jsxs)(`div`, {
                className: `flex flex-col sm:flex-row items-center gap-4 mb-4`,
                children: [
                  (0, Y.jsx)(d, {
                    placeholder: `Buscar por nome ou telefone...`,
                    value: A,
                    onChange: (e) => ie(e.target.value),
                    className: `w-full sm:max-w-sm`,
                  }),
                  (0, Y.jsxs)(j, {
                    value: P,
                    onValueChange: ce,
                    children: [
                      (0, Y.jsx)(T, {
                        className: `w-full sm:max-w-[250px]`,
                        children: (0, Y.jsx)(k, { placeholder: `Todos os profissionais` }),
                      }),
                      (0, Y.jsxs)(S, {
                        children: [
                          (0, Y.jsx)(N, { value: `all`, children: `Todos os profissionais` }),
                          o.map((e) => (0, Y.jsx)(N, { value: e.id, children: e.name }, e.id)),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, Y.jsx)(_, {
                open: c,
                onOpenChange: l,
                children: (0, Y.jsxs)(ae, {
                  className: `max-w-2xl`,
                  children: [
                    (0, Y.jsx)(oe, {
                      children: (0, Y.jsx)(m, {
                        children: p ? `Editar Cliente` : `Cadastrar Cliente`,
                      }),
                    }),
                    (0, Y.jsxs)(`form`, {
                      onSubmit: te,
                      className: `space-y-4`,
                      children: [
                        (0, Y.jsxs)(`div`, {
                          className: `grid grid-cols-1 md:grid-cols-2 gap-4`,
                          children: [
                            (0, Y.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, Y.jsx)(M, { children: `Nome` }),
                                (0, Y.jsx)(d, {
                                  required: !0,
                                  className: `min-h-[44px]`,
                                  value: u.name,
                                  onChange: (e) => f({ ...u, name: e.target.value }),
                                }),
                              ],
                            }),
                            (0, Y.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, Y.jsx)(M, { children: `Sobrenome` }),
                                (0, Y.jsx)(d, {
                                  className: `min-h-[44px]`,
                                  value: u.surname,
                                  onChange: (e) => f({ ...u, surname: e.target.value }),
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, Y.jsxs)(`div`, {
                          className: `grid grid-cols-1 md:grid-cols-2 gap-4`,
                          children: [
                            (0, Y.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, Y.jsx)(M, { children: `Celular Principal` }),
                                (0, Y.jsx)(d, {
                                  required: !0,
                                  className: `min-h-[44px]`,
                                  value: u.phone,
                                  onChange: (e) => f({ ...u, phone: Xe(e.target.value) }),
                                  placeholder: `(00) 00000-0000`,
                                }),
                              ],
                            }),
                            (0, Y.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, Y.jsx)(M, { children: `Celular Secundário` }),
                                (0, Y.jsx)(d, {
                                  className: `min-h-[44px]`,
                                  value: u.phone_secondary,
                                  onChange: (e) => f({ ...u, phone_secondary: Xe(e.target.value) }),
                                  placeholder: `(00) 00000-0000`,
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, Y.jsxs)(`div`, {
                          className: `grid grid-cols-1 md:grid-cols-2 gap-4`,
                          children: [
                            (0, Y.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, Y.jsx)(M, { children: `Nascimento` }),
                                (0, Y.jsx)(d, {
                                  type: `date`,
                                  className: `min-h-[44px]`,
                                  value: u.birthday?.split(`T`)[0] || ``,
                                  onChange: (e) => f({ ...u, birthday: e.target.value }),
                                }),
                              ],
                            }),
                            (0, Y.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, Y.jsx)(M, { children: `Profissional Preferido` }),
                                (0, Y.jsxs)(j, {
                                  value: u.preferred_barber_id || `none`,
                                  onValueChange: (e) => f({ ...u, preferred_barber_id: e }),
                                  children: [
                                    (0, Y.jsx)(T, {
                                      className: `min-h-[44px]`,
                                      children: (0, Y.jsx)(k, { placeholder: `Nenhum` }),
                                    }),
                                    (0, Y.jsxs)(S, {
                                      children: [
                                        (0, Y.jsx)(N, { value: `none`, children: `Nenhum` }),
                                        o.map((e) =>
                                          (0, Y.jsx)(N, { value: e.id, children: e.name }, e.id),
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, Y.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, Y.jsx)(M, { children: `Localização` }),
                            (0, Y.jsxs)(Je, {
                              value: u.location_type,
                              onValueChange: (e) => f({ ...u, location_type: e }),
                              className: `flex flex-wrap gap-4 mt-2`,
                              children: [
                                (0, Y.jsxs)(`div`, {
                                  className: `flex items-center space-x-2`,
                                  children: [
                                    (0, Y.jsx)(Q, { value: `passage`, id: `r1` }),
                                    (0, Y.jsx)(M, { htmlFor: `r1`, children: `De Passagem` }),
                                  ],
                                }),
                                (0, Y.jsxs)(`div`, {
                                  className: `flex items-center space-x-2`,
                                  children: [
                                    (0, Y.jsx)(Q, { value: `nearby`, id: `r2` }),
                                    (0, Y.jsx)(M, { htmlFor: `r2`, children: `Mora Perto` }),
                                  ],
                                }),
                                (0, Y.jsxs)(`div`, {
                                  className: `flex items-center space-x-2`,
                                  children: [
                                    (0, Y.jsx)(Q, { value: `mora_cidade`, id: `r4` }),
                                    (0, Y.jsx)(M, { htmlFor: `r4`, children: `Mora Cidade` }),
                                  ],
                                }),
                                (0, Y.jsxs)(`div`, {
                                  className: `flex items-center space-x-2`,
                                  children: [
                                    (0, Y.jsx)(Q, { value: `other_city`, id: `r3` }),
                                    (0, Y.jsx)(M, { htmlFor: `r3`, children: `Outra Cidade` }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, Y.jsx)(b, {
                          children: (0, Y.jsx)(h, {
                            type: `submit`,
                            className: `w-full mt-4`,
                            children: `Salvar`,
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, Y.jsx)(B, {
                children: (0, Y.jsx)(z, {
                  className: `p-0 overflow-x-auto`,
                  children: (0, Y.jsxs)(K, {
                    className: `min-w-[600px]`,
                    children: [
                      (0, Y.jsx)(V, {
                        children: (0, Y.jsxs)(W, {
                          children: [
                            (0, Y.jsx)(H, { children: `Cliente` }),
                            (0, Y.jsx)(H, { children: `Contatos` }),
                            (0, Y.jsx)(H, { className: `text-center`, children: `Ativo` }),
                            (0, Y.jsx)(H, { className: `text-right`, children: `Ações` }),
                          ],
                        }),
                      }),
                      (0, Y.jsxs)(U, {
                        children: [
                          F.map((e) =>
                            (0, Y.jsxs)(
                              W,
                              {
                                className: e.is_active === !1 ? `opacity-50` : ``,
                                children: [
                                  (0, Y.jsxs)(G, {
                                    children: [
                                      (0, Y.jsxs)(`div`, {
                                        className: `font-medium text-base`,
                                        children: [
                                          e.name || `Cliente sem nome`,
                                          ` `,
                                          e.surname || ``,
                                        ],
                                      }),
                                      (0, Y.jsxs)(`div`, {
                                        className: `text-xs text-muted-foreground mt-1 space-y-0.5`,
                                        children: [
                                          e.expand?.created_by_id &&
                                            (0, Y.jsxs)(`div`, {
                                              className: `flex items-center gap-1.5 mt-1`,
                                              children: [
                                                (0, Y.jsx)(`span`, {
                                                  className: `text-xs text-muted-foreground`,
                                                  children: `Cadastrado por:`,
                                                }),
                                                (0, Y.jsx)(`span`, {
                                                  className: `font-medium text-xs text-muted-foreground`,
                                                  children: e.expand.created_by_id.name,
                                                }),
                                              ],
                                            }),
                                          e.expand?.preferred_barber_id &&
                                            (0, Y.jsxs)(`div`, {
                                              className: `flex items-center gap-1.5 mt-1`,
                                              children: [
                                                (0, Y.jsx)(`span`, {
                                                  className: `text-xs text-muted-foreground`,
                                                  children: `Atendido por:`,
                                                }),
                                                (0, Y.jsx)(`span`, {
                                                  className: `text-[10px] font-bold px-2 py-0.5 rounded-full`,
                                                  style: {
                                                    backgroundColor:
                                                      e.expand.preferred_barber_id.color ||
                                                      `hsl(var(--primary))`,
                                                    color: g(
                                                      e.expand.preferred_barber_id.color ||
                                                        `hsl(var(--primary))`,
                                                    ),
                                                  },
                                                  children: e.expand.preferred_barber_id.name,
                                                }),
                                              ],
                                            }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, Y.jsx)(G, {
                                    children: (0, Y.jsxs)(`div`, {
                                      className: `space-y-1`,
                                      children: [
                                        (0, Y.jsx)(`div`, { children: e.phone }),
                                        e.phone_secondary &&
                                          (0, Y.jsxs)(`div`, {
                                            className: `text-sm text-muted-foreground`,
                                            children: [e.phone_secondary, ` (Sec)`],
                                          }),
                                      ],
                                    }),
                                  }),
                                  (0, Y.jsx)(G, {
                                    className: `text-center`,
                                    children: (0, Y.jsx)(ve, {
                                      checked: e.is_active !== !1,
                                      onCheckedChange: () => ne(e.id, e.is_active !== !1),
                                      disabled: !t(`action_delete`),
                                    }),
                                  }),
                                  (0, Y.jsxs)(G, {
                                    className: `text-right space-x-2`,
                                    children: [
                                      t(`action_delete`) &&
                                        (0, Y.jsx)(h, {
                                          variant: `ghost`,
                                          size: `icon`,
                                          onClick: () => E(e),
                                          children: (0, Y.jsx)(i, { className: `size-4` }),
                                        }),
                                      (0, Y.jsx)(h, {
                                        variant: `ghost`,
                                        size: `icon`,
                                        asChild: !0,
                                        children: (0, Y.jsx)(x, {
                                          to: `/clientes/${e.id}`,
                                          children: (0, Y.jsx)(r, { className: `size-4` }),
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              e.id,
                            ),
                          ),
                          F.length === 0 &&
                            (0, Y.jsx)(W, {
                              children: (0, Y.jsx)(G, {
                                colSpan: 4,
                                className: `text-center py-6 text-muted-foreground`,
                                children: `Nenhum cliente encontrado.`,
                              }),
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
            ],
          }),
          (e?.access_level === `Admin` || e?.access_level === `Socio`) &&
            (0, Y.jsx)(L, { value: `ranking`, className: `mt-0`, children: (0, Y.jsx)(Ye, {}) }),
        ],
      }),
    ],
  })
}
export { Ze as default }
