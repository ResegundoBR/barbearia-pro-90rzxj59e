import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './clock-UGD0Uw80.js'
import { n as i, t as a } from './ImportDialog-B_V_6ez4.js'
import { t as o } from './plus-JF1OlTCr.js'
import {
  K as s,
  L as c,
  R as l,
  S as u,
  W as d,
  _ as f,
  _t as p,
  a as m,
  b as h,
  i as g,
  n as _,
  q as v,
  st as y,
  t as b,
  v as x,
  vt as S,
  x as C,
} from './index-CHmnQ-gm.js'
import { t as w } from './errors-CkAloMCx.js'
import { a as T, i as E, n as D, o as O, r as k, t as A } from './table-C_vNdqXn.js'
import { t as j } from './badge-C1-D0eUj.js'
import { t as ee } from './checkbox-Ck8FRrCX.js'
import { t as te } from './categories-DLbOPAME.js'
var M = y(`building-2`, [
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
  N = y(`external-link`, [
    [`path`, { d: `M15 3h6v6`, key: `1q9fwt` }],
    [`path`, { d: `M10 14 21 3`, key: `gplh6r` }],
    [`path`, { d: `M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`, key: `a6xqqp` }],
  ]),
  P = e(t(), 1),
  F = () =>
    m
      .collection(`inventory_purchases`)
      .getFullList({ sort: `-created`, expand: `product_id,supplier_id` }),
  I = n()
function L() {
  let { user: e } = g(),
    [t, n] = (0, P.useState)([]),
    [y, L] = (0, P.useState)([]),
    [R, z] = (0, P.useState)([]),
    [B, V] = (0, P.useState)(!0),
    [H, U] = (0, P.useState)(!1),
    [W, G] = (0, P.useState)(``),
    [K, q] = (0, P.useState)({
      name: ``,
      document: ``,
      address: ``,
      phone: ``,
      whatsapp: ``,
      contact_person: ``,
      category_id: [],
    }),
    [J, Y] = (0, P.useState)({}),
    [X, Z] = (0, P.useState)(!1),
    { toast: Q } = p(),
    ne = async (t) => {
      let n = 0,
        r = 0,
        i = [],
        a = new Map(y.map((e) => [e.name.toLowerCase().trim(), e.id]))
      for (let o = 0; o < t.length; o++) {
        let c = t[o]
        try {
          let t = s(c, [`nome`, `razao social`]),
            r = s(c, [`documento`, `cpf/cnpj`, `cnpj`, `cpf`]),
            i = s(c, [`endereco`, `endereço`]),
            o = s(c, [`contato`, `pessoa de contato`]),
            l = s(c, [`telefone`, `fone`, `whatsapp`, `wpp`, `whatsapp/fone`]),
            u = s(c, [`categoria`])
          if (!t) throw Error(`Nome é obrigatório`)
          let d = r.toString().replace(/\D/g, ``)
          if (!d) throw Error(`CPF/CNPJ é obrigatório`)
          let f = []
          if (u) {
            let t = u.trim(),
              n = t.toLowerCase()
            if (a.has(n)) f.push(a.get(n))
            else {
              let r = await m.collection(`categories`).create({
                name: t,
                type: `product`,
                organization_id: e?.organization_id || e?.expand?.organization_id?.id,
              })
              ;(a.set(n, r.id), f.push(r.id))
            }
          }
          ;(await m.collection(`suppliers`).create({
            name: t,
            document: d,
            address: i,
            contact_person: o,
            whatsapp: l.toString().replace(/\D/g, ``),
            phone: l.toString().replace(/\D/g, ``),
            category_id: f,
            organization_id: e?.organization_id || e?.expand?.organization_id?.id,
          }),
            n++)
        } catch (e) {
          ;(r++, i.push(`Linha ${o + 2}: ${e.message}`))
        }
      }
      return (n > 0 && $(), { success: n, errors: r, errorsList: i })
    },
    $ = async () => {
      try {
        let [e, t, r] = await Promise.all([
          m.collection(`suppliers`).getFullList({ sort: `name`, expand: `category_id` }),
          m.collection(`categories`).getFullList({ filter: `type="product"` }),
          F(),
        ])
        ;(n(e), L(t), z(r))
      } catch (e) {
        console.error(e)
      } finally {
        V(!1)
      }
    }
  return (
    (0, P.useEffect)(() => {
      $()
    }, []),
    _(`suppliers`, $),
    _(`categories`, $),
    _(`inventory_purchases`, $),
    (0, I.jsxs)(`div`, {
      className: `space-y-6 max-w-6xl mx-auto`,
      children: [
        (0, I.jsxs)(`div`, {
          className: `flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4`,
          children: [
            (0, I.jsx)(`h2`, {
              className: `text-2xl font-bold tracking-tight`,
              children: `Compras/Fornec.`,
            }),
            (0, I.jsxs)(`div`, {
              className: `flex gap-2`,
              children: [
                (0, I.jsxs)(l, {
                  variant: `outline`,
                  onClick: () => Z(!0),
                  children: [(0, I.jsx)(i, { className: `size-4 mr-2` }), `Importar`],
                }),
                (0, I.jsxs)(l, {
                  onClick: () => {
                    ;(q({
                      name: ``,
                      document: ``,
                      address: ``,
                      phone: ``,
                      whatsapp: ``,
                      contact_person: ``,
                      category_id: [],
                    }),
                      Y({}),
                      U(!0))
                  },
                  children: [(0, I.jsx)(o, { className: `size-4 mr-2` }), `Novo Fornecedor`],
                }),
              ],
            }),
          ],
        }),
        (0, I.jsx)(a, { open: X, onOpenChange: Z, title: `Importar Fornecedores`, onImport: ne }),
        (0, I.jsx)(`div`, {
          className: `border rounded-md bg-card`,
          children: (0, I.jsxs)(A, {
            children: [
              (0, I.jsx)(T, {
                children: (0, I.jsxs)(O, {
                  children: [
                    (0, I.jsx)(E, { children: `Nome / Razão Social` }),
                    (0, I.jsx)(E, { children: `CNPJ/CPF` }),
                    (0, I.jsx)(E, { children: `Contato` }),
                    (0, I.jsx)(E, { children: `Categorias` }),
                    (0, I.jsx)(E, { className: `text-right`, children: `Ações` }),
                  ],
                }),
              }),
              (0, I.jsx)(D, {
                children: B
                  ? (0, I.jsx)(O, {
                      children: (0, I.jsx)(k, {
                        colSpan: 5,
                        className: `text-center py-6`,
                        children: `Carregando...`,
                      }),
                    })
                  : t.length === 0
                    ? (0, I.jsx)(O, {
                        children: (0, I.jsx)(k, {
                          colSpan: 5,
                          className: `text-center py-6`,
                          children: `Nenhum fornecedor cadastrado.`,
                        }),
                      })
                    : t.map((e) =>
                        (0, I.jsxs)(
                          O,
                          {
                            children: [
                              (0, I.jsx)(k, {
                                className: `font-medium`,
                                children: (0, I.jsxs)(`div`, {
                                  className: `flex items-center gap-2`,
                                  children: [
                                    (0, I.jsx)(M, { className: `size-4 text-muted-foreground` }),
                                    e.name,
                                    R.some(
                                      (t) => t.supplier_id === e.id && t.status === `pending`,
                                    ) &&
                                      (0, I.jsxs)(j, {
                                        variant: `secondary`,
                                        className: `bg-amber-500 text-white hover:bg-amber-600 border-0 ml-2 shadow-sm font-semibold tracking-wide`,
                                        children: [
                                          (0, I.jsx)(r, { className: `w-3 h-3 mr-1` }),
                                          `Compra Pendente`,
                                        ],
                                      }),
                                  ],
                                }),
                              }),
                              (0, I.jsx)(k, { children: d(e.document) }),
                              (0, I.jsxs)(k, {
                                children: [
                                  e.contact_person,
                                  (0, I.jsx)(`br`, {}),
                                  (0, I.jsx)(`span`, {
                                    className: `text-xs text-muted-foreground`,
                                    children: v(e.whatsapp || e.phone),
                                  }),
                                ],
                              }),
                              (0, I.jsx)(k, {
                                children: (0, I.jsx)(`div`, {
                                  className: `flex flex-wrap gap-1`,
                                  children: e.expand?.category_id?.map((e) =>
                                    (0, I.jsx)(
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
                              (0, I.jsx)(k, {
                                className: `text-right`,
                                children: (0, I.jsx)(l, {
                                  variant: `ghost`,
                                  size: `icon`,
                                  asChild: !0,
                                  children: (0, I.jsx)(S, {
                                    to: `/fornecedores/${e.id}`,
                                    children: (0, I.jsx)(N, { className: `size-4` }),
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
        (0, I.jsx)(f, {
          open: H,
          onOpenChange: U,
          children: (0, I.jsxs)(x, {
            className: `max-w-lg max-h-[90vh] overflow-y-auto`,
            children: [
              (0, I.jsx)(C, { children: (0, I.jsx)(u, { children: `Novo Fornecedor` }) }),
              (0, I.jsxs)(`div`, {
                className: `grid gap-4 py-4`,
                children: [
                  (0, I.jsxs)(`div`, {
                    className: `space-y-2`,
                    children: [
                      (0, I.jsx)(b, { children: `Nome / Razão Social *` }),
                      (0, I.jsx)(c, {
                        value: K.name,
                        onChange: (e) => q({ ...K, name: e.target.value }),
                      }),
                      J.name &&
                        (0, I.jsx)(`p`, {
                          className: `text-sm text-destructive`,
                          children: J.name,
                        }),
                    ],
                  }),
                  (0, I.jsxs)(`div`, {
                    className: `space-y-2`,
                    children: [
                      (0, I.jsx)(b, { children: `CPF / CNPJ *` }),
                      (0, I.jsx)(c, {
                        value: d(K.document),
                        onChange: (e) => q({ ...K, document: e.target.value }),
                        maxLength: 18,
                      }),
                      J.document &&
                        (0, I.jsx)(`p`, {
                          className: `text-sm text-destructive`,
                          children: J.document,
                        }),
                    ],
                  }),
                  (0, I.jsxs)(`div`, {
                    className: `space-y-2`,
                    children: [
                      (0, I.jsx)(b, { children: `Endereço` }),
                      (0, I.jsx)(c, {
                        value: K.address,
                        onChange: (e) => q({ ...K, address: e.target.value }),
                      }),
                    ],
                  }),
                  (0, I.jsxs)(`div`, {
                    className: `grid grid-cols-2 gap-4`,
                    children: [
                      (0, I.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, I.jsx)(b, { children: `Pessoa de Contato` }),
                          (0, I.jsx)(c, {
                            value: K.contact_person,
                            onChange: (e) => q({ ...K, contact_person: e.target.value }),
                          }),
                        ],
                      }),
                      (0, I.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, I.jsx)(b, { children: `WhatsApp / Fone` }),
                          (0, I.jsx)(c, {
                            value: v(K.whatsapp),
                            onChange: (e) => q({ ...K, whatsapp: v(e.target.value) }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, I.jsxs)(`div`, {
                    className: `space-y-2 pt-2`,
                    children: [
                      (0, I.jsx)(b, { children: `Tipos de Produtos Fornecidos` }),
                      (0, I.jsx)(`div`, {
                        className: `flex flex-wrap gap-3 border p-3 rounded-md mb-2 max-h-[150px] overflow-y-auto`,
                        children: y.map((e) =>
                          (0, I.jsxs)(
                            `label`,
                            {
                              className: `flex items-center space-x-2`,
                              children: [
                                (0, I.jsx)(ee, {
                                  checked: K.category_id.includes(e.id),
                                  onCheckedChange: (t) => {
                                    q(
                                      t
                                        ? { ...K, category_id: [...K.category_id, e.id] }
                                        : {
                                            ...K,
                                            category_id: K.category_id.filter((t) => t !== e.id),
                                          },
                                    )
                                  },
                                }),
                                (0, I.jsx)(`span`, { className: `text-sm`, children: e.name }),
                              ],
                            },
                            e.id,
                          ),
                        ),
                      }),
                      (0, I.jsxs)(`div`, {
                        className: `flex items-center gap-2`,
                        children: [
                          (0, I.jsx)(c, {
                            placeholder: `Nova categoria...`,
                            value: W,
                            onChange: (e) => G(e.target.value),
                            className: `h-8 text-sm`,
                          }),
                          (0, I.jsx)(l, {
                            type: `button`,
                            size: `sm`,
                            variant: `secondary`,
                            onClick: async () => {
                              if (W.trim())
                                try {
                                  let e = await te({ name: W.trim(), type: `product` })
                                  ;(L([...y, e]),
                                    q({ ...K, category_id: [...K.category_id, e.id] }),
                                    G(``))
                                } catch {
                                  Q({ title: `Erro ao criar categoria`, variant: `destructive` })
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
              (0, I.jsxs)(h, {
                children: [
                  (0, I.jsx)(l, { variant: `outline`, onClick: () => U(!1), children: `Cancelar` }),
                  (0, I.jsx)(l, {
                    onClick: async () => {
                      Y({})
                      try {
                        let e = K.document.replace(/\D/g, ``)
                        ;(await m.collection(`suppliers`).create({ ...K, document: e }),
                          Q({ title: `Fornecedor cadastrado` }),
                          U(!1))
                      } catch (e) {
                        let t = w(e)
                        Object.keys(t).length > 0
                          ? Y(t)
                          : Q({ title: `Erro`, description: e.message, variant: `destructive` })
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
export { L as default }
