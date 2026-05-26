import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './plus-DMg46kH-.js'
import { t as i } from './square-pen-BgqsEwws.js'
import { t as a } from './trash-2-Btu9QKZW.js'
import {
  H as o,
  S as s,
  U as c,
  _ as l,
  a as u,
  b as d,
  c as f,
  f as p,
  i as m,
  n as h,
  p as g,
  r as _,
  s as v,
  t as y,
  u as b,
  v as x,
  x as S,
  yt as C,
} from './index-Bf5nkyu_.js'
import { a as w, n as T, o as E, r as D, t as O } from './card-CPm2bQdE.js'
import { a as k, i as A, n as j, o as M, r as N, t as P } from './table-BQplVDEI.js'
import { t as F } from './switch-B9u8388b.js'
var I = e(t(), 1),
  L = n()
function R() {
  let { user: e } = m(),
    { toast: t } = C(),
    [n, R] = (0, I.useState)([]),
    [z, B] = (0, I.useState)(!1),
    [V, H] = (0, I.useState)(null),
    [U, W] = (0, I.useState)({ name: ``, type: `other`, fee_percentage: 0, is_active: !0 }),
    G = async () => {
      try {
        R(await u.collection(`payment_methods`).getFullList({ sort: `name` }))
      } catch (e) {
        console.error(e)
      }
    },
    { hasAccess: K, isAdmin: q } = _(),
    J = q || K(`financeiro`)
  if (
    ((0, I.useEffect)(() => {
      J && G()
    }, [e, J]),
    h(
      `payment_methods`,
      () => {
        J && G()
      },
      J,
    ),
    !J)
  )
    return (0, L.jsx)(`div`, {
      className: `p-8 text-center text-muted-foreground`,
      children: `Acesso Restrito.`,
    })
  let Y = (e) => {
      ;(e
        ? (W({
            name: e.name,
            type: e.type,
            fee_percentage: e.fee_percentage || 0,
            is_active: e.is_active,
          }),
          H(e.id))
        : (W({ name: ``, type: `other`, fee_percentage: 0, is_active: !0 }), H(null)),
        B(!0))
    },
    X = async () => {
      try {
        let e = {
          name: U.name,
          type: U.type,
          fee_percentage: Number(U.fee_percentage),
          is_active: U.is_active,
        }
        ;(V
          ? (await u.collection(`payment_methods`).update(V, e), t({ title: `Método atualizado!` }))
          : (await u.collection(`payment_methods`).create(e), t({ title: `Método criado!` })),
          B(!1),
          G())
      } catch {
        t({ title: `Erro ao salvar`, variant: `destructive` })
      }
    },
    Z = async (e) => {
      if (confirm(`Remover este método de pagamento?`))
        try {
          ;(await u.collection(`payment_methods`).delete(e), t({ title: `Removido` }), G())
        } catch {
          t({ title: `Erro ao remover`, variant: `destructive` })
        }
    },
    Q = async (e, n) => {
      try {
        ;(await u.collection(`payment_methods`).update(e, { is_active: n }), G())
      } catch {
        t({ title: `Erro ao atualizar`, variant: `destructive` })
      }
    },
    $ = {
      credit_card: `Cartão de Crédito`,
      debit_card: `Cartão de Débito`,
      pix: `Pix`,
      cash: `Dinheiro`,
      other: `Outro`,
    }
  return (0, L.jsxs)(`div`, {
    className: `space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in`,
    children: [
      (0, L.jsxs)(`div`, {
        children: [
          (0, L.jsx)(`h2`, {
            className: `text-3xl font-bold tracking-tight`,
            children: `Financeiro`,
          }),
          (0, L.jsx)(`p`, {
            className: `text-muted-foreground`,
            children: `Gerencie métodos de pagamento, taxas de cartão e Pix.`,
          }),
        ],
      }),
      (0, L.jsxs)(O, {
        className: `border-border shadow-sm`,
        children: [
          (0, L.jsxs)(w, {
            className: `flex flex-row items-center justify-between pb-2`,
            children: [
              (0, L.jsxs)(`div`, {
                className: `space-y-1`,
                children: [
                  (0, L.jsx)(E, { children: `Métodos de Pagamento e Taxas` }),
                  (0, L.jsx)(D, {
                    children: `Configure as taxas cobradas por cada método para dedução de comissões e repasses.`,
                  }),
                ],
              }),
              (0, L.jsxs)(c, {
                onClick: () => Y(),
                children: [(0, L.jsx)(r, { className: `size-4 mr-2` }), ` Novo Método`],
              }),
            ],
          }),
          (0, L.jsx)(T, {
            className: `p-0 md:p-6 overflow-x-auto`,
            children: (0, L.jsxs)(P, {
              className: `min-w-[600px]`,
              children: [
                (0, L.jsx)(k, {
                  children: (0, L.jsxs)(M, {
                    children: [
                      (0, L.jsx)(A, { children: `Nome` }),
                      (0, L.jsx)(A, { children: `Tipo` }),
                      (0, L.jsx)(A, { className: `text-right`, children: `Taxa (%)` }),
                      (0, L.jsx)(A, { className: `text-center`, children: `Ativo no Checkout` }),
                      (0, L.jsx)(A, { className: `text-right`, children: `Ações` }),
                    ],
                  }),
                }),
                (0, L.jsxs)(j, {
                  children: [
                    n.map((e) =>
                      (0, L.jsxs)(
                        M,
                        {
                          children: [
                            (0, L.jsx)(N, { className: `font-medium`, children: e.name }),
                            (0, L.jsx)(N, { children: $[e.type] || e.type }),
                            (0, L.jsxs)(N, {
                              className: `text-right`,
                              children: [e.fee_percentage, `%`],
                            }),
                            (0, L.jsx)(N, {
                              className: `text-center`,
                              children: (0, L.jsx)(F, {
                                checked: e.is_active,
                                onCheckedChange: (t) => Q(e.id, t),
                              }),
                            }),
                            (0, L.jsxs)(N, {
                              className: `text-right`,
                              children: [
                                (0, L.jsx)(c, {
                                  variant: `ghost`,
                                  size: `icon`,
                                  onClick: () => Y(e),
                                  children: (0, L.jsx)(i, { className: `size-4` }),
                                }),
                                (0, L.jsx)(c, {
                                  variant: `ghost`,
                                  size: `icon`,
                                  className: `text-destructive hover:bg-destructive/10`,
                                  onClick: () => Z(e.id),
                                  children: (0, L.jsx)(a, { className: `size-4` }),
                                }),
                              ],
                            }),
                          ],
                        },
                        e.id,
                      ),
                    ),
                    n.length === 0 &&
                      (0, L.jsx)(M, {
                        children: (0, L.jsx)(N, {
                          colSpan: 5,
                          className: `text-center py-6 text-muted-foreground`,
                          children: `Nenhum método cadastrado.`,
                        }),
                      }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, L.jsx)(l, {
        open: z,
        onOpenChange: B,
        children: (0, L.jsxs)(x, {
          children: [
            (0, L.jsx)(S, {
              children: (0, L.jsx)(s, { children: V ? `Editar Método` : `Novo Método` }),
            }),
            (0, L.jsxs)(`div`, {
              className: `space-y-4 py-4`,
              children: [
                (0, L.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, L.jsx)(y, { children: `Nome do Método` }),
                    (0, L.jsx)(o, {
                      className: `min-h-[44px]`,
                      value: U.name,
                      onChange: (e) => W({ ...U, name: e.target.value }),
                      placeholder: `Ex: Cartão de Crédito - Visa`,
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `grid grid-cols-2 gap-4`,
                  children: [
                    (0, L.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, L.jsx)(y, { children: `Tipo` }),
                        (0, L.jsxs)(v, {
                          value: U.type,
                          onValueChange: (e) => W({ ...U, type: e }),
                          children: [
                            (0, L.jsx)(p, {
                              className: `min-h-[44px]`,
                              children: (0, L.jsx)(g, {}),
                            }),
                            (0, L.jsxs)(f, {
                              children: [
                                (0, L.jsx)(b, {
                                  value: `credit_card`,
                                  children: `Cartão de Crédito`,
                                }),
                                (0, L.jsx)(b, {
                                  value: `debit_card`,
                                  children: `Cartão de Débito`,
                                }),
                                (0, L.jsx)(b, { value: `pix`, children: `Pix` }),
                                (0, L.jsx)(b, { value: `cash`, children: `Dinheiro` }),
                                (0, L.jsx)(b, { value: `other`, children: `Outro` }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, L.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, L.jsx)(y, { children: `Taxa / Fee (%)` }),
                        (0, L.jsx)(o, {
                          type: `number`,
                          className: `min-h-[44px]`,
                          min: `0`,
                          step: `0.01`,
                          value: U.fee_percentage,
                          onChange: (e) => W({ ...U, fee_percentage: Number(e.target.value) }),
                          placeholder: `0.00`,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, L.jsxs)(`div`, {
                  className: `flex items-center space-x-2 pt-2`,
                  children: [
                    (0, L.jsx)(F, {
                      checked: U.is_active,
                      onCheckedChange: (e) => W({ ...U, is_active: e }),
                    }),
                    (0, L.jsx)(y, { children: `Ativo no Checkout` }),
                  ],
                }),
              ],
            }),
            (0, L.jsx)(d, {
              children: (0, L.jsx)(c, {
                onClick: X,
                className: `w-full sm:w-auto`,
                children: `Salvar Método`,
              }),
            }),
          ],
        }),
      }),
    ],
  })
}
export { R as default }
