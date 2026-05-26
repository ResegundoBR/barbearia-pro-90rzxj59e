import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './plus-JF1OlTCr.js'
import { t as i } from './square-pen-Co30ePO_.js'
import {
  L as a,
  R as o,
  S as s,
  _ as c,
  _t as l,
  a as u,
  b as d,
  c as f,
  f as p,
  p as m,
  s as h,
  t as g,
  u as _,
  v,
  x as y,
} from './index-CHmnQ-gm.js'
import { i as b, n as x, r as S, t as C } from './tabs-D0cNoDYu.js'
import { t as w } from './card-DHbyifQZ.js'
import { a as T, i as E, n as D, o as O, r as k, t as A } from './table-C_vNdqXn.js'
import { t as j } from './badge-C1-D0eUj.js'
import { t as M } from './switch-CgEkKv2C.js'
var N = e(t(), 1),
  P = n()
function F() {
  let [e, t] = (0, N.useState)([]),
    [n, b] = (0, N.useState)(!1),
    [x, S] = (0, N.useState)([]),
    [C, F] = (0, N.useState)(`all`),
    [I, L] = (0, N.useState)({
      name: ``,
      price: ``,
      category_id: ``,
      duration_minutes: 30,
      is_active: !0,
    }),
    [R, z] = (0, N.useState)(null),
    { toast: B } = l(),
    V = async () => {
      ;(t(await u.collection(`services`).getFullList({ sort: `-created`, expand: `category_id` })),
        S(await u.collection(`categories`).getFullList({ filter: `type='service'`, sort: `name` })))
    }
  ;(0, N.useEffect)(() => {
    V()
  }, [])
  let H = (e) => {
      ;(e
        ? (L({ ...e, category_id: e.category_id || `none` }), z(e.id))
        : (L({ name: ``, price: ``, category_id: `none`, duration_minutes: 30, is_active: !0 }),
          z(null)),
        b(!0))
    },
    U = async () => {
      try {
        let e = {
          ...I,
          category_id: I.category_id === `none` ? `` : I.category_id,
          price: Number(I.price),
          duration_minutes: Number(I.duration_minutes),
        }
        ;(R
          ? (await u.collection(`services`).update(R, e),
            B({ title: `Serviço atualizado com sucesso!` }))
          : (await u.collection(`services`).create(e), B({ title: `Serviço criado com sucesso!` })),
          b(!1),
          V())
      } catch {
        B({ title: `Erro ao salvar`, variant: `destructive` })
      }
    },
    W = async (e, t) => {
      try {
        ;(await u.collection(`services`).update(e, { is_active: !t }), V())
      } catch {
        B({ title: `Erro ao atualizar status`, variant: `destructive` })
      }
    },
    G = e.filter((e) => C === `all` || e.category_id === C)
  return (0, P.jsxs)(`div`, {
    className: `space-y-4 animate-fade-in`,
    children: [
      (0, P.jsxs)(`div`, {
        className: `flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`,
        children: [
          (0, P.jsx)(`h3`, {
            className: `text-lg font-semibold`,
            children: `Catálogo de Serviços`,
          }),
          (0, P.jsxs)(`div`, {
            className: `flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto`,
            children: [
              (0, P.jsxs)(h, {
                value: C,
                onValueChange: F,
                children: [
                  (0, P.jsx)(p, {
                    className: `w-full sm:w-[200px]`,
                    children: (0, P.jsx)(m, { placeholder: `Todas Categorias` }),
                  }),
                  (0, P.jsxs)(f, {
                    children: [
                      (0, P.jsx)(_, { value: `all`, children: `Todas Categorias` }),
                      x.map((e) => (0, P.jsx)(_, { value: e.id, children: e.name }, e.id)),
                    ],
                  }),
                ],
              }),
              (0, P.jsxs)(o, {
                onClick: () => H(),
                className: `w-full sm:w-auto`,
                children: [(0, P.jsx)(r, { className: `size-4 mr-2` }), ` Novo Serviço`],
              }),
            ],
          }),
        ],
      }),
      (0, P.jsx)(w, {
        className: `border-none shadow-sm overflow-hidden`,
        children: (0, P.jsx)(`div`, {
          className: `overflow-x-auto`,
          children: (0, P.jsxs)(A, {
            children: [
              (0, P.jsx)(T, {
                children: (0, P.jsxs)(O, {
                  children: [
                    (0, P.jsx)(E, { children: `Nome` }),
                    (0, P.jsx)(E, { children: `Preço` }),
                    (0, P.jsx)(E, { children: `Categoria / Comissão (%)` }),
                    (0, P.jsx)(E, { children: `Duração (min)` }),
                    (0, P.jsx)(E, { children: `Status` }),
                    (0, P.jsx)(E, { className: `text-right`, children: `Ações` }),
                  ],
                }),
              }),
              (0, P.jsxs)(D, {
                children: [
                  G.map((e) =>
                    (0, P.jsxs)(
                      O,
                      {
                        className: e.is_active ? `` : `opacity-60`,
                        children: [
                          (0, P.jsx)(k, { className: `font-medium`, children: e.name }),
                          (0, P.jsxs)(k, { children: [`R$ `, e.price?.toFixed(2)] }),
                          (0, P.jsx)(k, {
                            children: e.expand?.category_id
                              ? (0, P.jsxs)(`div`, {
                                  className: `flex items-center gap-2`,
                                  children: [
                                    (0, P.jsx)(`span`, { children: e.expand.category_id.name }),
                                    (0, P.jsxs)(j, {
                                      variant: `outline`,
                                      className: `text-[10px]`,
                                      children: [e.expand.category_id.commission_percentage, `%`],
                                    }),
                                  ],
                                })
                              : (0, P.jsxs)(`span`, {
                                  children: [e.commission_rate || 0, `% (Legado)`],
                                }),
                          }),
                          (0, P.jsxs)(k, { children: [e.duration_minutes, ` min`] }),
                          (0, P.jsx)(k, {
                            children: (0, P.jsxs)(`div`, {
                              className: `flex items-center gap-2`,
                              children: [
                                (0, P.jsx)(M, {
                                  checked: e.is_active,
                                  onCheckedChange: () => W(e.id, e.is_active),
                                }),
                                (0, P.jsx)(j, {
                                  variant: e.is_active ? `default` : `secondary`,
                                  className: `text-[10px]`,
                                  children: e.is_active ? `Ativo` : `Inativo`,
                                }),
                              ],
                            }),
                          }),
                          (0, P.jsx)(k, {
                            className: `text-right`,
                            children: (0, P.jsx)(o, {
                              variant: `ghost`,
                              size: `icon`,
                              onClick: () => H(e),
                              children: (0, P.jsx)(i, { className: `size-4` }),
                            }),
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                  G.length === 0 &&
                    (0, P.jsx)(O, {
                      children: (0, P.jsx)(k, {
                        colSpan: 6,
                        className: `text-center py-6 text-muted-foreground`,
                        children: `Nenhum serviço encontrado.`,
                      }),
                    }),
                ],
              }),
            ],
          }),
        }),
      }),
      (0, P.jsx)(c, {
        open: n,
        onOpenChange: b,
        children: (0, P.jsxs)(v, {
          className: `max-w-md`,
          children: [
            (0, P.jsx)(y, {
              children: (0, P.jsx)(s, { children: R ? `Editar Serviço` : `Novo Serviço` }),
            }),
            (0, P.jsxs)(`div`, {
              className: `space-y-4 py-4`,
              children: [
                (0, P.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, P.jsx)(g, { children: `Nome` }),
                    (0, P.jsx)(a, {
                      value: I.name,
                      onChange: (e) => L({ ...I, name: e.target.value }),
                      placeholder: `Ex: Corte Degradê`,
                    }),
                  ],
                }),
                (0, P.jsxs)(`div`, {
                  className: `grid grid-cols-2 gap-4`,
                  children: [
                    (0, P.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, P.jsx)(g, { children: `Preço (R$)` }),
                        (0, P.jsx)(a, {
                          type: `number`,
                          step: `0.01`,
                          value: I.price,
                          onChange: (e) => L({ ...I, price: e.target.value }),
                          placeholder: `35.00`,
                        }),
                      ],
                    }),
                    (0, P.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, P.jsx)(g, { children: `Categoria de Comissão` }),
                        (0, P.jsxs)(h, {
                          value: I.category_id,
                          onValueChange: (e) => L({ ...I, category_id: e }),
                          children: [
                            (0, P.jsx)(p, {
                              children: (0, P.jsx)(m, { placeholder: `Selecione...` }),
                            }),
                            (0, P.jsxs)(f, {
                              children: [
                                (0, P.jsx)(_, { value: `none`, children: `Nenhuma` }),
                                x.map((e) =>
                                  (0, P.jsxs)(
                                    _,
                                    {
                                      value: e.id,
                                      children: [e.name, ` (`, e.commission_percentage, `%)`],
                                    },
                                    e.id,
                                  ),
                                ),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, P.jsxs)(`div`, {
                  className: `grid grid-cols-2 gap-4`,
                  children: [
                    (0, P.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, P.jsx)(g, { children: `Duração (minutos)` }),
                        (0, P.jsx)(a, {
                          type: `number`,
                          value: I.duration_minutes,
                          onChange: (e) => L({ ...I, duration_minutes: e.target.value }),
                          placeholder: `30`,
                        }),
                      ],
                    }),
                    (0, P.jsxs)(`div`, {
                      className: `flex items-center space-x-2 mt-8`,
                      children: [
                        (0, P.jsx)(M, {
                          checked: I.is_active,
                          onCheckedChange: (e) => L({ ...I, is_active: e }),
                        }),
                        (0, P.jsx)(g, { children: `Serviço Ativo` }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, P.jsx)(d, {
              children: (0, P.jsx)(o, {
                onClick: U,
                className: `w-full sm:w-auto`,
                children: `Salvar Serviço`,
              }),
            }),
          ],
        }),
      }),
    ],
  })
}
function I() {
  let [e, t] = (0, N.useState)([]),
    [n, b] = (0, N.useState)([]),
    [x, S] = (0, N.useState)(!1),
    [C, F] = (0, N.useState)({
      name: ``,
      quantity: 1,
      price: ``,
      duration_minutes: 30,
      is_active: !0,
      periodicity: `semanal`,
      service_id: ``,
    }),
    [I, L] = (0, N.useState)(null),
    { toast: R } = l(),
    z = async () => {
      ;(t(await u.collection(`packages`).getFullList({ sort: `-created`, expand: `service_id` })),
        b(await u.collection(`services`).getFullList({ sort: `name` })))
    }
  ;(0, N.useEffect)(() => {
    z()
  }, [])
  let B = (e) => {
      ;(e
        ? (F({ ...e, periodicity: e.periodicity || `semanal`, service_id: e.service_id || `none` }),
          L(e.id))
        : (F({
            name: ``,
            quantity: 1,
            price: ``,
            duration_minutes: 30,
            is_active: !0,
            periodicity: `semanal`,
            service_id: `none`,
          }),
          L(null)),
        S(!0))
    },
    V = async () => {
      try {
        let e = {
          ...C,
          service_id: C.service_id === `none` ? `` : C.service_id,
          price: Number(C.price),
          quantity: Number(C.quantity),
          duration_minutes: Number(C.duration_minutes),
        }
        ;(I
          ? (await u.collection(`packages`).update(I, e),
            R({ title: `Pacote atualizado com sucesso!` }))
          : (await u.collection(`packages`).create(e), R({ title: `Pacote criado com sucesso!` })),
          S(!1),
          z())
      } catch {
        R({ title: `Erro ao salvar`, variant: `destructive` })
      }
    },
    H = async (e, t) => {
      try {
        ;(await u.collection(`packages`).update(e, { is_active: !t }), z())
      } catch {
        R({ title: `Erro ao atualizar status`, variant: `destructive` })
      }
    }
  return (0, P.jsxs)(`div`, {
    className: `space-y-4 animate-fade-in`,
    children: [
      (0, P.jsxs)(`div`, {
        className: `flex justify-between items-center`,
        children: [
          (0, P.jsx)(`h3`, { className: `text-lg font-semibold`, children: `Gestão de Pacotes` }),
          (0, P.jsxs)(o, {
            onClick: () => B(),
            children: [(0, P.jsx)(r, { className: `size-4 mr-2` }), ` Novo Pacote`],
          }),
        ],
      }),
      (0, P.jsx)(w, {
        className: `border-none shadow-sm overflow-hidden`,
        children: (0, P.jsx)(`div`, {
          className: `overflow-x-auto`,
          children: (0, P.jsxs)(A, {
            children: [
              (0, P.jsx)(T, {
                children: (0, P.jsxs)(O, {
                  children: [
                    (0, P.jsx)(E, { children: `Nome` }),
                    (0, P.jsx)(E, { children: `Serviço Vinculado` }),
                    (0, P.jsx)(E, { children: `Qtd. Usos` }),
                    (0, P.jsx)(E, { children: `Period.` }),
                    (0, P.jsx)(E, { children: `Preço Total` }),
                    (0, P.jsx)(E, { children: `Status` }),
                    (0, P.jsx)(E, { className: `text-right`, children: `Ações` }),
                  ],
                }),
              }),
              (0, P.jsxs)(D, {
                children: [
                  e.map((e) =>
                    (0, P.jsxs)(
                      O,
                      {
                        className: e.is_active ? `` : `opacity-60`,
                        children: [
                          (0, P.jsx)(k, { className: `font-medium`, children: e.name }),
                          (0, P.jsx)(k, { children: e.expand?.service_id?.name || `-` }),
                          (0, P.jsx)(k, { children: e.quantity }),
                          (0, P.jsx)(k, {
                            className: `capitalize`,
                            children: e.periodicity || `-`,
                          }),
                          (0, P.jsxs)(k, { children: [`R$ `, e.price?.toFixed(2)] }),
                          (0, P.jsx)(k, {
                            children: (0, P.jsxs)(`div`, {
                              className: `flex items-center gap-2`,
                              children: [
                                (0, P.jsx)(M, {
                                  checked: e.is_active,
                                  onCheckedChange: () => H(e.id, e.is_active),
                                }),
                                (0, P.jsx)(j, {
                                  variant: e.is_active ? `default` : `secondary`,
                                  className: `text-[10px]`,
                                  children: e.is_active ? `Ativo` : `Inativo`,
                                }),
                              ],
                            }),
                          }),
                          (0, P.jsx)(k, {
                            className: `text-right`,
                            children: (0, P.jsx)(o, {
                              variant: `ghost`,
                              size: `icon`,
                              onClick: () => B(e),
                              children: (0, P.jsx)(i, { className: `size-4` }),
                            }),
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                  e.length === 0 &&
                    (0, P.jsx)(O, {
                      children: (0, P.jsx)(k, {
                        colSpan: 7,
                        className: `text-center py-6 text-muted-foreground`,
                        children: `Nenhum pacote encontrado.`,
                      }),
                    }),
                ],
              }),
            ],
          }),
        }),
      }),
      (0, P.jsx)(c, {
        open: x,
        onOpenChange: S,
        children: (0, P.jsxs)(v, {
          className: `max-w-md`,
          children: [
            (0, P.jsx)(y, {
              children: (0, P.jsx)(s, { children: I ? `Editar Pacote` : `Novo Pacote` }),
            }),
            (0, P.jsxs)(`div`, {
              className: `space-y-4 py-4`,
              children: [
                (0, P.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, P.jsx)(g, { children: `Nome do Pacote` }),
                    (0, P.jsx)(a, {
                      value: C.name,
                      onChange: (e) => F({ ...C, name: e.target.value }),
                      placeholder: `Ex: Pacote 5 Cortes`,
                    }),
                  ],
                }),
                (0, P.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, P.jsx)(g, { children: `Serviço Vinculado` }),
                    (0, P.jsxs)(h, {
                      value: C.service_id,
                      onValueChange: (e) => F({ ...C, service_id: e }),
                      children: [
                        (0, P.jsx)(p, {
                          children: (0, P.jsx)(m, { placeholder: `Selecione um serviço` }),
                        }),
                        (0, P.jsxs)(f, {
                          children: [
                            (0, P.jsx)(_, { value: `none`, children: `Nenhum` }),
                            n.map((e) => (0, P.jsx)(_, { value: e.id, children: e.name }, e.id)),
                          ],
                        }),
                      ],
                    }),
                    (0, P.jsx)(`p`, {
                      className: `text-[13px] text-muted-foreground mt-1`,
                      children: `Vincular um serviço permite que o sistema deduza automaticamente os usos deste pacote ao realizar o serviço correspondente no checkout.`,
                    }),
                  ],
                }),
                (0, P.jsxs)(`div`, {
                  className: `grid grid-cols-2 gap-4`,
                  children: [
                    (0, P.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, P.jsx)(g, { children: `Qtd. de Usos` }),
                        (0, P.jsx)(a, {
                          type: `number`,
                          value: C.quantity,
                          onChange: (e) => F({ ...C, quantity: e.target.value }),
                          placeholder: `5`,
                        }),
                      ],
                    }),
                    (0, P.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, P.jsx)(g, { children: `Periodicidade` }),
                        (0, P.jsxs)(h, {
                          value: C.periodicity,
                          onValueChange: (e) => F({ ...C, periodicity: e }),
                          children: [
                            (0, P.jsx)(p, {
                              children: (0, P.jsx)(m, { placeholder: `Selecione` }),
                            }),
                            (0, P.jsxs)(f, {
                              children: [
                                (0, P.jsx)(_, { value: `semanal`, children: `Semanal` }),
                                (0, P.jsx)(_, { value: `quinzenal`, children: `Quinzenal` }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, P.jsxs)(`div`, {
                  className: `grid grid-cols-2 gap-4`,
                  children: [
                    (0, P.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, P.jsx)(g, { children: `Preço Total (R$)` }),
                        (0, P.jsx)(a, {
                          type: `number`,
                          step: `0.01`,
                          value: C.price,
                          onChange: (e) => F({ ...C, price: e.target.value }),
                          placeholder: `150.00`,
                        }),
                      ],
                    }),
                    (0, P.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, P.jsx)(g, { children: `Duração Padrão (min)` }),
                        (0, P.jsx)(a, {
                          type: `number`,
                          value: C.duration_minutes,
                          onChange: (e) => F({ ...C, duration_minutes: e.target.value }),
                          placeholder: `30`,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, P.jsxs)(`div`, {
                  className: `flex items-center space-x-2 mt-4`,
                  children: [
                    (0, P.jsx)(M, {
                      checked: C.is_active,
                      onCheckedChange: (e) => F({ ...C, is_active: e }),
                    }),
                    (0, P.jsx)(g, { children: `Pacote Ativo` }),
                  ],
                }),
              ],
            }),
            (0, P.jsx)(d, {
              children: (0, P.jsx)(o, {
                onClick: V,
                className: `w-full sm:w-auto`,
                children: `Salvar Pacote`,
              }),
            }),
          ],
        }),
      }),
    ],
  })
}
function L() {
  return (0, P.jsxs)(`div`, {
    className: `p-6 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300`,
    children: [
      (0, P.jsx)(`h1`, {
        className: `text-3xl font-bold tracking-tight`,
        children: `Catálogo de Serviços e Pacotes`,
      }),
      (0, P.jsxs)(C, {
        defaultValue: `services`,
        className: `w-full`,
        children: [
          (0, P.jsxs)(S, {
            className: `mb-4`,
            children: [
              (0, P.jsx)(b, { value: `services`, children: `Serviços` }),
              (0, P.jsx)(b, { value: `packages`, children: `Pacotes` }),
            ],
          }),
          (0, P.jsx)(x, { value: `services`, children: (0, P.jsx)(F, {}) }),
          (0, P.jsx)(x, { value: `packages`, children: (0, P.jsx)(I, {}) }),
        ],
      }),
    ],
  })
}
export { L as default }
