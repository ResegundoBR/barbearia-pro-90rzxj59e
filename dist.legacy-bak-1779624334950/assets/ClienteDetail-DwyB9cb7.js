import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './arrow-left-DdpNmNLk.js'
import {
  $ as i,
  G as a,
  R as o,
  S as s,
  U as c,
  Z as l,
  _ as u,
  a as d,
  at as f,
  b as p,
  c as m,
  f as h,
  n as g,
  p as _,
  q as v,
  rt as y,
  s as b,
  st as x,
  t as S,
  tt as C,
  u as w,
  v as ee,
  vt as te,
  x as ne,
  xt as T,
} from './index-CHmnQ-gm.js'
import { t as E } from './format-BUAFcs3P.js'
import { h as D, i as O, l as k } from './api-Zu_OBWUL.js'
import { a as A, n as j, o as M, t as N } from './card-DHbyifQZ.js'
import { t as P } from './badge-C1-D0eUj.js'
import { t as F } from './progress-Dbv_Mm3H.js'
var re = x(`file-text`, [
    [
      `path`,
      {
        d: `M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,
        key: `1oefj6`,
      },
    ],
    [`path`, { d: `M14 2v5a1 1 0 0 0 1 1h5`, key: `wfsgrz` }],
    [`path`, { d: `M10 9H8`, key: `b1mrlr` }],
    [`path`, { d: `M16 13H8`, key: `t4e002` }],
    [`path`, { d: `M16 17H8`, key: `z1uh3a` }],
  ]),
  I = x(`thumbs-down`, [
    [
      `path`,
      {
        d: `M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z`,
        key: `m61m77`,
      },
    ],
    [`path`, { d: `M17 14V2`, key: `8ymqnk` }],
  ]),
  L = x(`thumbs-up`, [
    [
      `path`,
      {
        d: `M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z`,
        key: `emmmcr`,
      },
    ],
    [`path`, { d: `M7 10v12`, key: `1qc93n` }],
  ]),
  R = e(t(), 1),
  z = n(),
  B = R.forwardRef(({ className: e, ...t }, n) =>
    (0, z.jsx)(`textarea`, {
      className: c(
        `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        e,
      ),
      ref: n,
      ...t,
    }),
  )
B.displayName = `Textarea`
function V({ p: e, status: t, used: n, total: r, progress: i, packageAppointments: a }) {
  let [s, c] = (0, R.useState)(!1)
  return (0, z.jsxs)(N, {
    className: `overflow-hidden`,
    children: [
      (0, z.jsx)(`div`, {
        className: `p-4 cursor-pointer hover:bg-muted/10 transition-colors`,
        onClick: () => c(!s),
        children: (0, z.jsxs)(`div`, {
          className: `flex flex-col md:flex-row md:items-center justify-between gap-4`,
          children: [
            (0, z.jsxs)(`div`, {
              className: `space-y-1 flex-1`,
              children: [
                (0, z.jsxs)(`div`, {
                  className: `flex items-center gap-2`,
                  children: [
                    (0, z.jsx)(`h4`, {
                      className: `font-bold text-lg`,
                      children: e.expand?.package_id?.name || `Pacote`,
                    }),
                    (0, z.jsx)(P, {
                      variant:
                        t === `Ativo` ? `default` : t === `Concluído` ? `secondary` : `destructive`,
                      children: t,
                    }),
                  ],
                }),
                (0, z.jsxs)(`div`, {
                  className: `flex justify-between text-sm text-muted-foreground`,
                  children: [
                    (0, z.jsxs)(`span`, {
                      children: [`Data da Compra: `, E(new Date(e.created), `dd/MM/yyyy`)],
                    }),
                    (0, z.jsxs)(`span`, {
                      children: [
                        `Validade:`,
                        ` `,
                        e.expires_at ? E(new Date(e.expires_at), `dd/MM/yyyy`) : `Sem validade`,
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, z.jsxs)(`div`, {
              className: `w-full md:w-64 space-y-1 shrink-0`,
              children: [
                (0, z.jsxs)(`div`, {
                  className: `flex justify-between text-sm`,
                  children: [
                    (0, z.jsxs)(`span`, { children: [n, ` / `, r, ` usadas`] }),
                    (0, z.jsxs)(`span`, {
                      className: `font-medium`,
                      children: [e.remaining_uses, ` sessões restantes`],
                    }),
                  ],
                }),
                (0, z.jsx)(F, {
                  value: i,
                  className: `h-2 ${i <= 25 ? `[&>div]:bg-green-500` : i <= 50 ? `[&>div]:bg-blue-500` : i <= 75 ? `[&>div]:bg-orange-500` : `[&>div]:bg-red-500`}`,
                }),
              ],
            }),
            (0, z.jsx)(o, {
              variant: `ghost`,
              size: `icon`,
              className: `shrink-0 hidden md:flex`,
              asChild: !0,
              children: (0, z.jsx)(`div`, {
                children: s
                  ? (0, z.jsx)(C, { className: `size-5` })
                  : (0, z.jsx)(y, { className: `size-5` }),
              }),
            }),
          ],
        }),
      }),
      s &&
        (0, z.jsxs)(`div`, {
          className: `p-4 border-t bg-muted/5 space-y-3 animate-fade-in-down`,
          children: [
            (0, z.jsx)(`h5`, { className: `font-semibold text-sm`, children: `Histórico de Uso` }),
            a.length === 0
              ? (0, z.jsx)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: `Nenhuma sessão utilizada ainda.`,
                })
              : (0, z.jsx)(`div`, {
                  className: `space-y-2`,
                  children: a.map((e) =>
                    (0, z.jsxs)(
                      `div`,
                      {
                        className: `flex justify-between items-center bg-background border p-2 rounded-md text-sm`,
                        children: [
                          (0, z.jsxs)(`div`, {
                            className: `flex flex-col`,
                            children: [
                              (0, z.jsx)(`span`, {
                                className: `font-medium`,
                                children: e.expand?.service_id?.name || `Serviço`,
                              }),
                              (0, z.jsx)(`span`, {
                                className: `text-xs text-muted-foreground`,
                                children: E(new Date(e.date), `dd/MM/yyyy`),
                              }),
                            ],
                          }),
                          (0, z.jsx)(P, { variant: `outline`, children: e.status }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                }),
          ],
        }),
    ],
  })
}
function H() {
  let { id: e } = T(),
    [t, n] = (0, R.useState)(null),
    [c, y] = (0, R.useState)([]),
    [x, C] = (0, R.useState)([]),
    [F, H] = (0, R.useState)([]),
    [U, W] = (0, R.useState)([]),
    [G, K] = (0, R.useState)(!1),
    [q, J] = (0, R.useState)([]),
    [Y, X] = (0, R.useState)({ details: ``, sentiment: `neutral`, barber_id: `` }),
    Z = async () => {
      if (e)
        try {
          ;(n(await d.collection(`clients`).getOne(e)),
            y(await O(e)),
            C(await D(e)),
            H((await k()).filter((t) => t.client_id === e)))
          try {
            ;(W(
              await d
                .collection(`client_logs`)
                .getFullList({ filter: `client_id="${e}"`, sort: `-created`, expand: `barber_id` }),
            ),
              J(await d.collection(`barbers`).getFullList()))
          } catch {}
        } catch (e) {
          console.error(e)
        }
    }
  ;((0, R.useEffect)(() => {
    Z()
  }, [e]),
    g(`clients`, (t) => {
      t.record.id === e && Z()
    }),
    g(`appointments`, Z),
    g(`product_purchases`, Z),
    g(`client_packages`, Z),
    g(`client_logs`, Z))
  let Q = (0, R.useMemo)(() => {
      let e = c.filter((e) => e.status === `Concluído`),
        t = e.reduce((e, t) => e + (t.price || t.expand?.service_id?.price || 0), 0),
        n = x.reduce((e, t) => e + (t.price_at_sale || 0), 0),
        r = {}
      e.forEach((e) => {
        let t = e.expand?.service_id?.name
        t && (r[t] = (r[t] || 0) + 1)
      })
      let i = Object.entries(r).sort((e, t) => t[1] - e[1])[0],
        a = i ? `${i[0]} (${i[1]})` : `Nenhum`
      return { visits: e.length, totalServices: t, totalProducts: n, mostUsed: a }
    }, [c, x]),
    $ = (0, R.useMemo)(() => {
      let e = []
      return (
        c.forEach((t) =>
          e.push({
            id: t.id,
            type: `service`,
            date: new Date(t.date),
            title: t.expand?.service_id?.name || `Serviço`,
            barberName: t.expand?.barber_id?.name || `Sem profissional`,
            barberColor: t.expand?.barber_id?.color || `hsl(var(--primary))`,
            val: t.price || t.expand?.service_id?.price,
          }),
        ),
        x.forEach((t) =>
          e.push({
            id: t.id,
            type: `product`,
            date: new Date(t.date || t.created),
            title: t.expand?.product_id?.name || `Produto`,
            barberName: t.expand?.barber_id?.name || `Sem profissional`,
            barberColor: t.expand?.barber_id?.color || `hsl(var(--primary))`,
            val: t.price_at_sale,
          }),
        ),
        F.forEach((t) =>
          e.push({
            id: t.id,
            type: `package`,
            date: new Date(t.created),
            title: t.expand?.package_id?.name || `Pacote`,
            barberName: t.expand?.barber_id?.name || `Sem profissional`,
            barberColor: t.expand?.barber_id?.color || `hsl(var(--primary))`,
            val: t.expand?.package_id?.price,
          }),
        ),
        e.sort((e, t) => t.date.getTime() - e.date.getTime())
      )
    }, [c, x, F])
  return t
    ? (0, z.jsxs)(`div`, {
        className: `space-y-6 max-w-5xl mx-auto`,
        children: [
          (0, z.jsxs)(`div`, {
            className: `flex items-center gap-4`,
            children: [
              (0, z.jsx)(o, {
                variant: `outline`,
                size: `icon`,
                asChild: !0,
                children: (0, z.jsx)(te, {
                  to: `/clientes`,
                  children: (0, z.jsx)(r, { className: `size-4` }),
                }),
              }),
              (0, z.jsxs)(`div`, {
                children: [
                  (0, z.jsxs)(`h2`, {
                    className: `text-2xl font-bold tracking-tight`,
                    children: [t.name, ` `, t.surname],
                  }),
                  (t.phone || t.phone_secondary) &&
                    (0, z.jsx)(`div`, {
                      className: `flex items-center gap-2 mt-1`,
                      children: (0, z.jsxs)(`p`, {
                        className: `text-muted-foreground text-sm font-medium`,
                        children: [v(t.phone), t.phone_secondary && ` | ${v(t.phone_secondary)}`],
                      }),
                    }),
                  (0, z.jsxs)(`p`, {
                    className: `text-muted-foreground mt-1 text-sm`,
                    children: [
                      `Cadastrado em: `,
                      E(new Date(t.created), `dd/MM/yyyy`),
                      ` | Cliente desde:`,
                      ` `,
                      $.length > 0 ? E($[$.length - 1].date, `dd/MM/yyyy`) : `N/A`,
                    ],
                  }),
                ],
              }),
              t.is_active === !1 &&
                (0, z.jsx)(P, {
                  variant: `destructive`,
                  className: `ml-auto`,
                  children: `Inativo`,
                }),
            ],
          }),
          (0, z.jsxs)(`div`, {
            className: `grid grid-cols-2 md:grid-cols-4 gap-4`,
            children: [
              (0, z.jsx)(N, {
                children: (0, z.jsxs)(j, {
                  className: `p-4`,
                  children: [
                    (0, z.jsx)(`p`, {
                      className: `text-sm text-muted-foreground`,
                      children: `Total Visitas`,
                    }),
                    (0, z.jsx)(`p`, { className: `text-2xl font-bold`, children: Q.visits }),
                  ],
                }),
              }),
              (0, z.jsx)(N, {
                children: (0, z.jsxs)(j, {
                  className: `p-4`,
                  children: [
                    (0, z.jsx)(`p`, {
                      className: `text-sm text-muted-foreground`,
                      children: `Serviço Favorito`,
                    }),
                    (0, z.jsx)(`p`, {
                      className: `text-xl font-bold truncate`,
                      children: Q.mostUsed,
                    }),
                  ],
                }),
              }),
              (0, z.jsx)(N, {
                children: (0, z.jsxs)(j, {
                  className: `p-4`,
                  children: [
                    (0, z.jsx)(`p`, {
                      className: `text-sm text-muted-foreground`,
                      children: `Gasto Serviços`,
                    }),
                    (0, z.jsxs)(`p`, {
                      className: `text-2xl font-bold`,
                      children: [`R$ `, Q.totalServices.toFixed(2)],
                    }),
                  ],
                }),
              }),
              (0, z.jsx)(N, {
                children: (0, z.jsxs)(j, {
                  className: `p-4`,
                  children: [
                    (0, z.jsx)(`p`, {
                      className: `text-sm text-muted-foreground`,
                      children: `Gasto Produtos`,
                    }),
                    (0, z.jsxs)(`p`, {
                      className: `text-2xl font-bold`,
                      children: [`R$ `, Q.totalProducts.toFixed(2)],
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, z.jsxs)(`div`, {
            className: `space-y-4`,
            children: [
              (0, z.jsx)(`h3`, {
                className: `text-xl font-bold tracking-tight`,
                children: `Meus Pacotes`,
              }),
              F.length === 0
                ? (0, z.jsx)(`p`, {
                    className: `text-muted-foreground bg-muted/20 p-4 rounded-lg border`,
                    children: `Este cliente não possui pacotes ativos.`,
                  })
                : (0, z.jsx)(`div`, {
                    className: `grid grid-cols-1 gap-4`,
                    children: F.map((e) => {
                      let t = e.expires_at && new Date(e.expires_at) < new Date(),
                        n = e.remaining_uses === 0 ? `Concluído` : t ? `Expirado` : `Ativo`,
                        r = e.expand?.package_id?.quantity || 1,
                        i = r - e.remaining_uses
                      return (0, z.jsx)(
                        V,
                        {
                          p: e,
                          status: n,
                          used: i,
                          total: r,
                          progress: (i / r) * 100,
                          packageAppointments: c.filter((t) => t.client_package_id === e.id),
                        },
                        e.id,
                      )
                    }),
                  }),
            ],
          }),
          (0, z.jsxs)(`div`, {
            className: `grid grid-cols-1 md:grid-cols-2 gap-6`,
            children: [
              (0, z.jsxs)(N, {
                children: [
                  (0, z.jsx)(A, {
                    children: (0, z.jsx)(M, { children: `Histórico de Atividades` }),
                  }),
                  (0, z.jsx)(j, {
                    children:
                      $.length === 0
                        ? (0, z.jsx)(`p`, {
                            className: `text-muted-foreground`,
                            children: `Nenhuma atividade registrada.`,
                          })
                        : (0, z.jsx)(`div`, {
                            className: `space-y-4 max-h-[500px] overflow-y-auto pr-2`,
                            children: $.map((e) =>
                              (0, z.jsxs)(
                                `div`,
                                {
                                  className: `flex items-center justify-between p-3 border rounded-lg`,
                                  children: [
                                    (0, z.jsxs)(`div`, {
                                      className: `flex items-center gap-3`,
                                      children: [
                                        e.type === `service` &&
                                          (0, z.jsx)(f, { className: `size-5 text-blue-500` }),
                                        e.type === `product` &&
                                          (0, z.jsx)(l, { className: `size-5 text-green-500` }),
                                        e.type === `package` &&
                                          (0, z.jsx)(i, { className: `size-5 text-purple-500` }),
                                        (0, z.jsxs)(`div`, {
                                          children: [
                                            (0, z.jsxs)(`div`, {
                                              className: `flex items-center gap-2`,
                                              children: [
                                                (0, z.jsx)(`p`, {
                                                  className: `font-medium`,
                                                  children: e.title,
                                                }),
                                                (0, z.jsx)(`span`, {
                                                  className: `text-[10px] font-bold px-2 py-0.5 rounded-full`,
                                                  style: {
                                                    backgroundColor: e.barberColor,
                                                    color: a(e.barberColor),
                                                  },
                                                  children: e.barberName,
                                                }),
                                              ],
                                            }),
                                            (0, z.jsx)(`p`, {
                                              className: `text-xs text-muted-foreground mt-0.5`,
                                              children: E(e.date, `dd/MM/yyyy HH:mm`),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, z.jsxs)(`span`, {
                                      className: `font-bold`,
                                      children: [`R$ `, (e.val || 0).toFixed(2)],
                                    }),
                                  ],
                                },
                                e.id,
                              ),
                            ),
                          }),
                  }),
                ],
              }),
              (0, z.jsxs)(N, {
                children: [
                  (0, z.jsxs)(A, {
                    className: `flex flex-row items-center justify-between pb-2`,
                    children: [
                      (0, z.jsx)(M, { children: `Observações e Ocorrências` }),
                      (0, z.jsx)(o, {
                        size: `sm`,
                        onClick: () => K(!0),
                        children: `Nova Ocorrência`,
                      }),
                    ],
                  }),
                  (0, z.jsx)(j, {
                    children:
                      U.length === 0
                        ? (0, z.jsx)(`p`, {
                            className: `text-muted-foreground`,
                            children: `Nenhuma ocorrência registrada.`,
                          })
                        : (0, z.jsx)(`div`, {
                            className: `space-y-4 max-h-[500px] overflow-y-auto pr-2 pt-2`,
                            children: U.map((e) =>
                              (0, z.jsxs)(
                                `div`,
                                {
                                  className: `p-3 border rounded-lg ${e.sentiment === `positive` ? `bg-green-500/5 border-green-200` : e.sentiment === `negative` ? `bg-red-500/5 border-red-200` : `bg-muted/20`}`,
                                  children: [
                                    (0, z.jsxs)(`div`, {
                                      className: `flex items-center gap-2 mb-1`,
                                      children: [
                                        e.sentiment === `positive`
                                          ? (0, z.jsx)(L, { className: `size-4 text-green-500` })
                                          : e.sentiment === `negative`
                                            ? (0, z.jsx)(I, { className: `size-4 text-red-500` })
                                            : (0, z.jsx)(re, {
                                                className: `size-4 text-muted-foreground`,
                                              }),
                                        (0, z.jsx)(`span`, {
                                          className: `text-xs font-semibold px-2 py-0.5 rounded ${e.sentiment === `positive` ? `bg-green-500/10 text-green-700` : e.sentiment === `negative` ? `bg-red-500/10 text-red-700` : `bg-primary/10 text-primary`}`,
                                          children:
                                            e.event_type === `no_show`
                                              ? `FALTOU`
                                              : e.event_type === `reschedule`
                                                ? `Remarcação`
                                                : e.event_type === `manual_entry`
                                                  ? `Registro Manual`
                                                  : e.event_type,
                                        }),
                                        e.expand?.barber_id &&
                                          (0, z.jsxs)(`span`, {
                                            className: `text-xs text-muted-foreground ml-2`,
                                            children: [`por `, e.expand.barber_id.name],
                                          }),
                                        (0, z.jsx)(`span`, {
                                          className: `text-xs text-muted-foreground ml-auto`,
                                          children: E(new Date(e.created), `dd/MM/yyyy HH:mm`),
                                        }),
                                      ],
                                    }),
                                    (0, z.jsx)(`p`, {
                                      className: `text-sm mt-2`,
                                      children: e.details,
                                    }),
                                  ],
                                },
                                e.id,
                              ),
                            ),
                          }),
                  }),
                ],
              }),
            ],
          }),
          (0, z.jsx)(u, {
            open: G,
            onOpenChange: K,
            children: (0, z.jsxs)(ee, {
              children: [
                (0, z.jsx)(ne, {
                  children: (0, z.jsx)(s, { children: `Nova Ocorrência / Observação` }),
                }),
                (0, z.jsxs)(`div`, {
                  className: `space-y-4 py-4`,
                  children: [
                    (0, z.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, z.jsx)(S, { children: `Descrição` }),
                        (0, z.jsx)(B, {
                          placeholder: `Detalhes da ocorrência...`,
                          value: Y.details,
                          onChange: (e) => X({ ...Y, details: e.target.value }),
                        }),
                      ],
                    }),
                    (0, z.jsxs)(`div`, {
                      className: `grid grid-cols-2 gap-4`,
                      children: [
                        (0, z.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, z.jsx)(S, { children: `Sentimento` }),
                            (0, z.jsxs)(b, {
                              value: Y.sentiment,
                              onValueChange: (e) => X({ ...Y, sentiment: e }),
                              children: [
                                (0, z.jsx)(h, {
                                  children: (0, z.jsx)(_, { placeholder: `Selecione...` }),
                                }),
                                (0, z.jsxs)(m, {
                                  children: [
                                    (0, z.jsx)(w, { value: `neutral`, children: `Neutro` }),
                                    (0, z.jsx)(w, { value: `positive`, children: `Positivo` }),
                                    (0, z.jsx)(w, { value: `negative`, children: `Negativo` }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, z.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, z.jsx)(S, { children: `Profissional` }),
                            (0, z.jsxs)(b, {
                              value: Y.barber_id,
                              onValueChange: (e) => X({ ...Y, barber_id: e }),
                              children: [
                                (0, z.jsx)(h, {
                                  children: (0, z.jsx)(_, {
                                    placeholder: `Selecione o profissional...`,
                                  }),
                                }),
                                (0, z.jsx)(m, {
                                  children: q.map((e) =>
                                    (0, z.jsx)(w, { value: e.id, children: e.name }, e.id),
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, z.jsxs)(p, {
                  children: [
                    (0, z.jsx)(o, {
                      variant: `outline`,
                      onClick: () => K(!1),
                      children: `Cancelar`,
                    }),
                    (0, z.jsx)(o, {
                      onClick: async () => {
                        if (!(!e || !Y.details))
                          try {
                            ;(await d
                              .collection(`client_logs`)
                              .create({
                                client_id: e,
                                event_type: `manual_entry`,
                                details: Y.details,
                                sentiment: Y.sentiment === `neutral` ? `` : Y.sentiment,
                                barber_id: Y.barber_id || null,
                              }),
                              K(!1),
                              X({ details: ``, sentiment: `neutral`, barber_id: `` }),
                              Z())
                          } catch (e) {
                            console.error(e)
                          }
                      },
                      disabled: !Y.details,
                      children: `Salvar`,
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      })
    : (0, z.jsx)(`div`, { className: `p-8`, children: `Carregando...` })
}
export { H as default }
