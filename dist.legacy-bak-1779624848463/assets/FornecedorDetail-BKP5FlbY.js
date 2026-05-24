import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './arrow-left-DdpNmNLk.js'
import { t as i } from './calendar-DnDD-UYg.js'
import {
  L as a,
  R as o,
  S as s,
  W as c,
  _ as l,
  _t as u,
  a as d,
  b as f,
  c as p,
  f as m,
  it as h,
  n as g,
  p as _,
  q as v,
  s as y,
  st as b,
  t as x,
  u as S,
  v as C,
  vt as w,
  x as T,
  xt as E,
} from './index-CHmnQ-gm.js'
import { t as D } from './format-BUAFcs3P.js'
import { a as O, n as k, o as A, t as j } from './card-DHbyifQZ.js'
var M = b(`shopping-cart`, [
    [`circle`, { cx: `8`, cy: `21`, r: `1`, key: `jimo8o` }],
    [`circle`, { cx: `19`, cy: `21`, r: `1`, key: `13723u` }],
    [
      `path`,
      {
        d: `M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12`,
        key: `9zh506`,
      },
    ],
  ]),
  N = e(t(), 1),
  P = n()
function F() {
  let { id: e } = E(),
    [t, n] = (0, N.useState)(null),
    [b, F] = (0, N.useState)([]),
    [I, L] = (0, N.useState)([]),
    [R, z] = (0, N.useState)(!1),
    [B, V] = (0, N.useState)({
      product_id: ``,
      quantity: `1`,
      unit_price: ``,
      price_paid: ``,
      purchase_date: new Date().toISOString().split(`T`)[0],
      status: `pending`,
    }),
    [H, U] = (0, N.useState)({}),
    [W, G] = (0, N.useState)(null),
    { toast: K } = u()
  ;(0, N.useEffect)(() => {
    B.product_id
      ? d
          .collection(`inventory_purchases`)
          .getFirstListItem(`product_id="${B.product_id}"`, {
            sort: `-purchase_date`,
            expand: `supplier_id`,
          })
          .then((e) => G(e))
          .catch(() => G(null))
      : G(null)
  }, [B.product_id])
  let q = (e) => {
      V((t) => {
        let n = Number(t.unit_price) || 0,
          r = Number(e) || 0
        return { ...t, quantity: e, price_paid: r > 0 && n > 0 ? (r * n).toFixed(2) : t.price_paid }
      })
    },
    J = (e) => {
      V((t) => {
        let n = Number(t.quantity) || 0,
          r = Number(e) || 0
        return {
          ...t,
          unit_price: e,
          price_paid: n > 0 && r > 0 ? (n * r).toFixed(2) : t.price_paid,
        }
      })
    },
    Y = async () => {
      if (e)
        try {
          ;(n(await d.collection(`suppliers`).getOne(e, { expand: `category_id` })),
            F(
              await d
                .collection(`inventory_purchases`)
                .getFullList({
                  filter: `supplier_id="${e}"`,
                  sort: `-purchase_date`,
                  expand: `product_id`,
                }),
            ),
            L(await d.collection(`products`).getFullList()))
        } catch (e) {
          console.error(e)
        }
    }
  ;((0, N.useEffect)(() => {
    Y()
  }, [e]),
    g(`suppliers`, Y),
    g(`inventory_purchases`, Y))
  let X = async () => {
      let t = {}
      if (
        (B.product_id || (t.product_id = `Selecione um produto`),
        B.price_paid || (t.price_paid = `Informe o total da compra`),
        B.purchase_date || (t.purchase_date = `Informe a data`),
        Object.keys(t).length > 0)
      ) {
        ;(U(t), K({ title: `Verifique os campos obrigatórios`, variant: `destructive` }))
        return
      }
      U({})
      try {
        let t = new Date().toISOString()
        if (B.purchase_date) {
          let e = new Date(B.purchase_date)
          isNaN(e.getTime()) || (t = new Date(B.purchase_date + `T12:00:00.000Z`).toISOString())
        }
        ;(await d
          .collection(`inventory_purchases`)
          .create({
            supplier_id: e,
            product_id: B.product_id,
            quantity: Number(B.quantity) || 1,
            unit_price: Number(B.unit_price) || 0,
            price_paid: Number(B.price_paid) || 0,
            purchase_date: t,
            status: B.status,
            received_at: B.status === `received` ? new Date().toISOString() : null,
          }),
          K({ title: `Compra registrada com sucesso` }),
          z(!1),
          V({
            ...B,
            price_paid: ``,
            unit_price: ``,
            product_id: ``,
            quantity: `1`,
            status: `pending`,
          }),
          Y())
      } catch (e) {
        K({ title: `Erro ao registrar`, description: e.message, variant: `destructive` })
      }
    },
    Z = async (e) => {
      try {
        ;(await d
          .collection(`inventory_purchases`)
          .update(e, { status: `received`, received_at: new Date().toISOString() }),
          K({ title: `Recebimento confirmado com sucesso` }),
          Y())
      } catch (e) {
        K({ title: `Erro ao confirmar`, description: e.message, variant: `destructive` })
      }
    }
  return t
    ? (0, P.jsxs)(`div`, {
        className: `space-y-6 max-w-5xl mx-auto`,
        children: [
          (0, P.jsxs)(`div`, {
            className: `flex items-center gap-4`,
            children: [
              (0, P.jsx)(o, {
                variant: `outline`,
                size: `icon`,
                asChild: !0,
                children: (0, P.jsx)(w, {
                  to: `/fornecedores`,
                  children: (0, P.jsx)(r, { className: `size-4` }),
                }),
              }),
              (0, P.jsxs)(`div`, {
                children: [
                  (0, P.jsx)(`h2`, {
                    className: `text-2xl font-bold tracking-tight`,
                    children: t.name,
                  }),
                  (0, P.jsxs)(`p`, {
                    className: `text-muted-foreground text-sm`,
                    children: [
                      t.document && `Documento: ${c(t.document)} | `,
                      `Contato: `,
                      t.contact_person || `N/A`,
                      ` `,
                      t.whatsapp && `(${v(t.whatsapp)})`,
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, P.jsxs)(`div`, {
            className: `grid grid-cols-1 md:grid-cols-3 gap-6`,
            children: [
              (0, P.jsxs)(j, {
                className: `md:col-span-1 h-min`,
                children: [
                  (0, P.jsx)(O, {
                    children: (0, P.jsx)(A, { children: `Detalhes do Fornecedor` }),
                  }),
                  (0, P.jsxs)(k, {
                    className: `space-y-4`,
                    children: [
                      (0, P.jsxs)(`div`, {
                        children: [
                          (0, P.jsx)(`p`, {
                            className: `text-sm font-semibold`,
                            children: `Endereço`,
                          }),
                          (0, P.jsx)(`p`, {
                            className: `text-sm text-muted-foreground`,
                            children: t.address || `Não informado`,
                          }),
                        ],
                      }),
                      (0, P.jsxs)(`div`, {
                        children: [
                          (0, P.jsx)(`p`, {
                            className: `text-sm font-semibold`,
                            children: `Telefone`,
                          }),
                          (0, P.jsx)(`p`, {
                            className: `text-sm text-muted-foreground`,
                            children: v(t.phone) || `Não informado`,
                          }),
                        ],
                      }),
                      (0, P.jsxs)(`div`, {
                        children: [
                          (0, P.jsx)(`p`, {
                            className: `text-sm font-semibold`,
                            children: `Categorias Fornecidas`,
                          }),
                          (0, P.jsxs)(`div`, {
                            className: `flex flex-wrap gap-1 mt-1`,
                            children: [
                              t.expand?.category_id?.map((e) =>
                                (0, P.jsx)(
                                  `span`,
                                  {
                                    className: `text-xs bg-secondary px-2 py-1 rounded-full`,
                                    children: e.name,
                                  },
                                  e.id,
                                ),
                              ),
                              !t.expand?.category_id &&
                                (0, P.jsx)(`span`, {
                                  className: `text-sm text-muted-foreground`,
                                  children: `Nenhuma categoria`,
                                }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, P.jsxs)(j, {
                className: `md:col-span-2`,
                children: [
                  (0, P.jsxs)(O, {
                    className: `flex flex-row items-center justify-between pb-2`,
                    children: [
                      (0, P.jsx)(A, { children: `Histórico de Compras` }),
                      (0, P.jsxs)(o, {
                        size: `sm`,
                        onClick: () => z(!0),
                        children: [
                          (0, P.jsx)(M, { className: `size-4 mr-2` }),
                          ` Registrar Compra`,
                        ],
                      }),
                    ],
                  }),
                  (0, P.jsx)(k, {
                    children:
                      b.length === 0
                        ? (0, P.jsx)(`p`, {
                            className: `text-muted-foreground py-4 text-center`,
                            children: `Nenhuma compra registrada com este fornecedor.`,
                          })
                        : (0, P.jsx)(`div`, {
                            className: `space-y-3 mt-4 max-h-[500px] overflow-y-auto pr-2`,
                            children: b.map((e) => {
                              let t = e.status || `pending`
                              return (0, P.jsxs)(
                                `div`,
                                {
                                  className: `flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-muted/10 gap-3`,
                                  children: [
                                    (0, P.jsxs)(`div`, {
                                      className: `flex items-start sm:items-center gap-3`,
                                      children: [
                                        (0, P.jsx)(`div`, {
                                          className: `bg-primary/10 p-2 rounded-full mt-1 sm:mt-0 shrink-0`,
                                          children: (0, P.jsx)(i, {
                                            className: `size-4 text-primary`,
                                          }),
                                        }),
                                        (0, P.jsxs)(`div`, {
                                          children: [
                                            (0, P.jsxs)(`div`, {
                                              className: `flex flex-wrap items-center gap-2`,
                                              children: [
                                                (0, P.jsx)(`p`, {
                                                  className: `font-semibold text-sm`,
                                                  children:
                                                    e.expand?.product_id?.name ||
                                                    `Produto Excluído`,
                                                }),
                                                t === `pending`
                                                  ? (0, P.jsx)(`span`, {
                                                      className: `bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] font-medium px-2 py-0.5 rounded-full`,
                                                      children: `Pendente`,
                                                    })
                                                  : (0, P.jsx)(`span`, {
                                                      className: `bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-medium px-2 py-0.5 rounded-full`,
                                                      children: `Recebido`,
                                                    }),
                                              ],
                                            }),
                                            (0, P.jsxs)(`p`, {
                                              className: `text-xs text-muted-foreground mt-1`,
                                              children: [
                                                `Data: `,
                                                D(new Date(e.purchase_date), `dd/MM/yyyy`),
                                                ` | Qtd:`,
                                                ` `,
                                                e.quantity,
                                              ],
                                            }),
                                            t === `received` &&
                                              e.received_at &&
                                              (0, P.jsxs)(`p`, {
                                                className: `text-xs text-muted-foreground mt-0.5`,
                                                children: [
                                                  `Recebido em: `,
                                                  D(new Date(e.received_at), `dd/MM/yyyy HH:mm`),
                                                ],
                                              }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, P.jsxs)(`div`, {
                                      className: `flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0 border-t sm:border-t-0 pt-2 sm:pt-0`,
                                      children: [
                                        (0, P.jsxs)(`div`, {
                                          className: `text-left sm:text-right`,
                                          children: [
                                            (0, P.jsxs)(`p`, {
                                              className: `font-bold text-sm`,
                                              children: [`R$ `, e.price_paid?.toFixed(2)],
                                            }),
                                            e.unit_price &&
                                              (0, P.jsxs)(`p`, {
                                                className: `text-xs text-muted-foreground`,
                                                children: [`Unit: R$ `, e.unit_price.toFixed(2)],
                                              }),
                                          ],
                                        }),
                                        t === `pending` &&
                                          (0, P.jsxs)(o, {
                                            size: `sm`,
                                            variant: `secondary`,
                                            onClick: () => Z(e.id),
                                            children: [
                                              (0, P.jsx)(h, { className: `size-4 mr-1` }),
                                              `Confirmar`,
                                            ],
                                          }),
                                      ],
                                    }),
                                  ],
                                },
                                e.id,
                              )
                            }),
                          }),
                  }),
                ],
              }),
            ],
          }),
          (0, P.jsx)(l, {
            open: R,
            onOpenChange: z,
            children: (0, P.jsxs)(C, {
              children: [
                (0, P.jsx)(T, { children: (0, P.jsx)(s, { children: `Registrar Nova Compra` }) }),
                (0, P.jsxs)(`div`, {
                  className: `grid gap-4 py-4`,
                  children: [
                    (0, P.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, P.jsx)(x, { children: `Produto *` }),
                        (0, P.jsxs)(y, {
                          value: B.product_id,
                          onValueChange: (e) => {
                            ;(V({ ...B, product_id: e }), U((e) => ({ ...e, product_id: `` })))
                          },
                          children: [
                            (0, P.jsx)(m, {
                              className: H.product_id ? `border-red-500` : ``,
                              children: (0, P.jsx)(_, { placeholder: `Selecione o produto...` }),
                            }),
                            (0, P.jsx)(p, {
                              children: I.map((e) =>
                                (0, P.jsx)(S, { value: e.id, children: e.name }, e.id),
                              ),
                            }),
                          ],
                        }),
                        H.product_id &&
                          (0, P.jsx)(`p`, {
                            className: `text-xs text-red-500`,
                            children: H.product_id,
                          }),
                      ],
                    }),
                    W &&
                      (0, P.jsxs)(`div`, {
                        className: `bg-muted/50 p-3 rounded-md text-sm`,
                        children: [
                          (0, P.jsx)(`p`, {
                            className: `font-semibold text-muted-foreground mb-1`,
                            children: `Última Compra do Produto:`,
                          }),
                          (0, P.jsxs)(`p`, {
                            children: [
                              `Fornecedor: `,
                              W.expand?.supplier_id?.name || `Desconhecido`,
                            ],
                          }),
                          (0, P.jsxs)(`p`, {
                            children: [
                              `Preço Unitário: R$`,
                              ` `,
                              W.unit_price
                                ? W.unit_price.toFixed(2)
                                : (W.price_paid / W.quantity).toFixed(2),
                            ],
                          }),
                          (0, P.jsxs)(`p`, {
                            children: [`Data: `, D(new Date(W.purchase_date), `dd/MM/yyyy`)],
                          }),
                        ],
                      }),
                    (0, P.jsxs)(`div`, {
                      className: `grid grid-cols-2 md:grid-cols-3 gap-4`,
                      children: [
                        (0, P.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, P.jsx)(x, { children: `Qtd` }),
                            (0, P.jsx)(a, {
                              type: `number`,
                              value: B.quantity,
                              onChange: (e) => q(e.target.value),
                            }),
                          ],
                        }),
                        (0, P.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, P.jsx)(x, { children: `Preço Unit.` }),
                            (0, P.jsx)(a, {
                              type: `number`,
                              step: `0.01`,
                              value: B.unit_price,
                              onChange: (e) => J(e.target.value),
                            }),
                          ],
                        }),
                        (0, P.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, P.jsx)(x, { children: `Total Compra *` }),
                            (0, P.jsx)(a, {
                              type: `number`,
                              step: `0.01`,
                              className: H.price_paid ? `border-red-500` : ``,
                              value: B.price_paid,
                              onChange: (e) => {
                                ;(V({ ...B, price_paid: e.target.value }),
                                  U((e) => ({ ...e, price_paid: `` })))
                              },
                            }),
                            H.price_paid &&
                              (0, P.jsx)(`p`, {
                                className: `text-xs text-red-500`,
                                children: H.price_paid,
                              }),
                          ],
                        }),
                        (0, P.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, P.jsx)(x, { children: `Data *` }),
                            (0, P.jsx)(a, {
                              type: `date`,
                              className: H.purchase_date ? `border-red-500` : ``,
                              value: B.purchase_date,
                              onChange: (e) => {
                                ;(V({ ...B, purchase_date: e.target.value }),
                                  U((e) => ({ ...e, purchase_date: `` })))
                              },
                            }),
                            H.purchase_date &&
                              (0, P.jsx)(`p`, {
                                className: `text-xs text-red-500`,
                                children: H.purchase_date,
                              }),
                          ],
                        }),
                        (0, P.jsxs)(`div`, {
                          className: `space-y-2`,
                          children: [
                            (0, P.jsx)(x, { children: `Status *` }),
                            (0, P.jsxs)(y, {
                              value: B.status,
                              onValueChange: (e) => V({ ...B, status: e }),
                              children: [
                                (0, P.jsx)(m, {
                                  children: (0, P.jsx)(_, { placeholder: `Selecione...` }),
                                }),
                                (0, P.jsxs)(p, {
                                  children: [
                                    (0, P.jsx)(S, { value: `pending`, children: `Pendente` }),
                                    (0, P.jsx)(S, { value: `received`, children: `Recebido` }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, P.jsxs)(f, {
                  children: [
                    (0, P.jsx)(o, {
                      variant: `outline`,
                      onClick: () => {
                        ;(z(!1), U({}))
                      },
                      children: `Cancelar`,
                    }),
                    (0, P.jsx)(o, { onClick: X, children: `Salvar Compra` }),
                  ],
                }),
              ],
            }),
          }),
        ],
      })
    : (0, P.jsx)(`div`, { className: `p-8`, children: `Carregando...` })
}
export { F as default }
