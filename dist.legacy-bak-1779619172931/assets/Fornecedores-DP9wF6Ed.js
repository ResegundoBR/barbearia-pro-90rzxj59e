import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './clock-CXcmCz5Z.js'
import { t as i } from './plus-DMg46kH-.js'
import {
  H as a,
  S as o,
  U as s,
  _ as c,
  a as l,
  b as u,
  bt as d,
  ct as f,
  n as p,
  t as m,
  v as h,
  x as g,
  yt as _,
} from './index-Bf5nkyu_.js'
import { t as v } from './errors-rlX-Zddb.js'
import { a as y, i as b, n as x, o as S, r as C, t as w } from './table-BQplVDEI.js'
import { t as T } from './badge-DDF6d_iC.js'
import { t as E } from './checkbox-Y0NzEs2T.js'
import { t as D } from './categories-yeFErE7I.js'
var O = f(`building-2`, [
    [`path`, { d: `M10 12h4`, key: `a56b0p` }],
    [`path`, { d: `M10 8h4`, key: `1sr2af` }],
    [`path`, { d: `M14 21v-3a2 2 0 0 0-4 0v3`, key: `1rgiei` }],
    [
      `path`,
      {
        d: `M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2`,
        key: `secmi2`,
      },
    ],
    [`path`, { d: `M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16`, key: `16ra0t` }],
  ]),
  k = f(`external-link`, [
    [`path`, { d: `M15 3h6v6`, key: `1q9fwt` }],
    [`path`, { d: `M10 14 21 3`, key: `gplh6r` }],
    [`path`, { d: `M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`, key: `a6xqqp` }],
  ]),
  A = e(t(), 1),
  j = () =>
    l
      .collection(`inventory_purchases`)
      .getFullList({ sort: `-created`, expand: `product_id,supplier_id` }),
  M = n(),
  N = (e) => {
    let t = e.replace(/\D/g, ``)
    return t.length <= 11
      ? t.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, `$1.$2.$3-$4`)
      : t.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, `$1.$2.$3/$4-$5`)
  }
function P() {
  let [e, t] = (0, A.useState)([]),
    [n, f] = (0, A.useState)([]),
    [P, F] = (0, A.useState)([]),
    [I, L] = (0, A.useState)(!0),
    [R, z] = (0, A.useState)(!1),
    [B, V] = (0, A.useState)(``),
    [H, U] = (0, A.useState)({
      name: ``,
      document: ``,
      address: ``,
      phone: ``,
      whatsapp: ``,
      contact_person: ``,
      category_id: [],
    }),
    [W, G] = (0, A.useState)({}),
    { toast: K } = _(),
    q = async () => {
      try {
        let [e, n, r] = await Promise.all([
          l.collection(`suppliers`).getFullList({ sort: `name`, expand: `category_id` }),
          l.collection(`categories`).getFullList({ filter: `type="product"` }),
          j(),
        ])
        ;(t(e), f(n), F(r))
      } catch (e) {
        console.error(e)
      } finally {
        L(!1)
      }
    }
  return (
    (0, A.useEffect)(() => {
      q()
    }, []),
    p(`suppliers`, q),
    p(`categories`, q),
    p(`inventory_purchases`, q),
    (0, M.jsxs)(`div`, {
      className: `space-y-6 max-w-6xl mx-auto`,
      children: [
        (0, M.jsxs)(`div`, {
          className: `flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4`,
          children: [
            (0, M.jsx)(`h2`, {
              className: `text-2xl font-bold tracking-tight`,
              children: `Compras/Fornec.`,
            }),
            (0, M.jsxs)(s, {
              onClick: () => {
                ;(U({
                  name: ``,
                  document: ``,
                  address: ``,
                  phone: ``,
                  whatsapp: ``,
                  contact_person: ``,
                  category_id: [],
                }),
                  G({}),
                  z(!0))
              },
              children: [(0, M.jsx)(i, { className: `size-4 mr-2` }), `Novo Fornecedor`],
            }),
          ],
        }),
        (0, M.jsx)(`div`, {
          className: `border rounded-md bg-card`,
          children: (0, M.jsxs)(w, {
            children: [
              (0, M.jsx)(y, {
                children: (0, M.jsxs)(S, {
                  children: [
                    (0, M.jsx)(b, { children: `Nome / Razão Social` }),
                    (0, M.jsx)(b, { children: `CNPJ/CPF` }),
                    (0, M.jsx)(b, { children: `Contato` }),
                    (0, M.jsx)(b, { children: `Categorias` }),
                    (0, M.jsx)(b, { className: `text-right`, children: `Ações` }),
                  ],
                }),
              }),
              (0, M.jsx)(x, {
                children: I
                  ? (0, M.jsx)(S, {
                      children: (0, M.jsx)(C, {
                        colSpan: 5,
                        className: `text-center py-6`,
                        children: `Carregando...`,
                      }),
                    })
                  : e.length === 0
                    ? (0, M.jsx)(S, {
                        children: (0, M.jsx)(C, {
                          colSpan: 5,
                          className: `text-center py-6`,
                          children: `Nenhum fornecedor cadastrado.`,
                        }),
                      })
                    : e.map((e) =>
                        (0, M.jsxs)(
                          S,
                          {
                            children: [
                              (0, M.jsx)(C, {
                                className: `font-medium`,
                                children: (0, M.jsxs)(`div`, {
                                  className: `flex items-center gap-2`,
                                  children: [
                                    (0, M.jsx)(O, { className: `size-4 text-muted-foreground` }),
                                    e.name,
                                    P.some(
                                      (t) => t.supplier_id === e.id && t.status === `pending`,
                                    ) &&
                                      (0, M.jsxs)(T, {
                                        variant: `secondary`,
                                        className: `bg-amber-500 text-white hover:bg-amber-600 border-0 ml-2 shadow-sm font-semibold tracking-wide`,
                                        children: [
                                          (0, M.jsx)(r, { className: `w-3 h-3 mr-1` }),
                                          `Compra Pendente`,
                                        ],
                                      }),
                                  ],
                                }),
                              }),
                              (0, M.jsx)(C, { children: N(e.document) }),
                              (0, M.jsxs)(C, {
                                children: [
                                  e.contact_person,
                                  (0, M.jsx)(`br`, {}),
                                  (0, M.jsx)(`span`, {
                                    className: `text-xs text-muted-foreground`,
                                    children: e.whatsapp || e.phone,
                                  }),
                                ],
                              }),
                              (0, M.jsx)(C, {
                                children: (0, M.jsx)(`div`, {
                                  className: `flex flex-wrap gap-1`,
                                  children: e.expand?.category_id?.map((e) =>
                                    (0, M.jsx)(
                                      `span`,
                                      {
                                        className: `text-[10px] bg-secondary px-1.5 py-0.5 rounded-full`,
                                        children: e.name,
                                      },
                                      e.id,
                                    ),
                                  ),
                                }),
                              }),
                              (0, M.jsx)(C, {
                                className: `text-right`,
                                children: (0, M.jsx)(s, {
                                  variant: `ghost`,
                                  size: `icon`,
                                  asChild: !0,
                                  children: (0, M.jsx)(d, {
                                    to: `/fornecedores/${e.id}`,
                                    children: (0, M.jsx)(k, { className: `size-4` }),
                                  }),
                                }),
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
        (0, M.jsx)(c, {
          open: R,
          onOpenChange: z,
          children: (0, M.jsxs)(h, {
            className: `max-w-lg max-h-[90vh] overflow-y-auto`,
            children: [
              (0, M.jsx)(g, { children: (0, M.jsx)(o, { children: `Novo Fornecedor` }) }),
              (0, M.jsxs)(`div`, {
                className: `grid gap-4 py-4`,
                children: [
                  (0, M.jsxs)(`div`, {
                    className: `space-y-2`,
                    children: [
                      (0, M.jsx)(m, { children: `Nome / Razão Social *` }),
                      (0, M.jsx)(a, {
                        value: H.name,
                        onChange: (e) => U({ ...H, name: e.target.value }),
                      }),
                      W.name &&
                        (0, M.jsx)(`p`, {
                          className: `text-sm text-destructive`,
                          children: W.name,
                        }),
                    ],
                  }),
                  (0, M.jsxs)(`div`, {
                    className: `space-y-2`,
                    children: [
                      (0, M.jsx)(m, { children: `CPF / CNPJ *` }),
                      (0, M.jsx)(a, {
                        value: N(H.document),
                        onChange: (e) => U({ ...H, document: e.target.value }),
                        maxLength: 18,
                      }),
                      W.document &&
                        (0, M.jsx)(`p`, {
                          className: `text-sm text-destructive`,
                          children: W.document,
                        }),
                    ],
                  }),
                  (0, M.jsxs)(`div`, {
                    className: `space-y-2`,
                    children: [
                      (0, M.jsx)(m, { children: `Endereço` }),
                      (0, M.jsx)(a, {
                        value: H.address,
                        onChange: (e) => U({ ...H, address: e.target.value }),
                      }),
                    ],
                  }),
                  (0, M.jsxs)(`div`, {
                    className: `grid grid-cols-2 gap-4`,
                    children: [
                      (0, M.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, M.jsx)(m, { children: `Pessoa de Contato` }),
                          (0, M.jsx)(a, {
                            value: H.contact_person,
                            onChange: (e) => U({ ...H, contact_person: e.target.value }),
                          }),
                        ],
                      }),
                      (0, M.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, M.jsx)(m, { children: `WhatsApp / Fone` }),
                          (0, M.jsx)(a, {
                            value: H.whatsapp,
                            onChange: (e) => U({ ...H, whatsapp: e.target.value }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, M.jsxs)(`div`, {
                    className: `space-y-2 pt-2`,
                    children: [
                      (0, M.jsx)(m, { children: `Tipos de Produtos Fornecidos` }),
                      (0, M.jsx)(`div`, {
                        className: `flex flex-wrap gap-3 border p-3 rounded-md mb-2 max-h-[150px] overflow-y-auto`,
                        children: n.map((e) =>
                          (0, M.jsxs)(
                            `label`,
                            {
                              className: `flex items-center space-x-2`,
                              children: [
                                (0, M.jsx)(E, {
                                  checked: H.category_id.includes(e.id),
                                  onCheckedChange: (t) => {
                                    U(
                                      t
                                        ? { ...H, category_id: [...H.category_id, e.id] }
                                        : {
                                            ...H,
                                            category_id: H.category_id.filter((t) => t !== e.id),
                                          },
                                    )
                                  },
                                }),
                                (0, M.jsx)(`span`, { className: `text-sm`, children: e.name }),
                              ],
                            },
                            e.id,
                          ),
                        ),
                      }),
                      (0, M.jsxs)(`div`, {
                        className: `flex items-center gap-2`,
                        children: [
                          (0, M.jsx)(a, {
                            placeholder: `Nova categoria...`,
                            value: B,
                            onChange: (e) => V(e.target.value),
                            className: `h-8 text-sm`,
                          }),
                          (0, M.jsx)(s, {
                            type: `button`,
                            size: `sm`,
                            variant: `secondary`,
                            onClick: async () => {
                              if (B.trim())
                                try {
                                  let e = await D({ name: B.trim(), type: `product` })
                                  ;(f([...n, e]),
                                    U({ ...H, category_id: [...H.category_id, e.id] }),
                                    V(``))
                                } catch {
                                  K({ title: `Erro ao criar categoria`, variant: `destructive` })
                                }
                            },
                            children: `Adicionar`,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, M.jsxs)(u, {
                children: [
                  (0, M.jsx)(s, { variant: `outline`, onClick: () => z(!1), children: `Cancelar` }),
                  (0, M.jsx)(s, {
                    onClick: async () => {
                      G({})
                      try {
                        let e = H.document.replace(/\D/g, ``)
                        ;(await l.collection(`suppliers`).create({ ...H, document: e }),
                          K({ title: `Fornecedor cadastrado` }),
                          z(!1))
                      } catch (e) {
                        let t = v(e)
                        Object.keys(t).length > 0
                          ? G(t)
                          : K({ title: `Erro`, description: e.message, variant: `destructive` })
                      }
                    },
                    children: `Salvar`,
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    })
  )
}
export { P as default }
