import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './pen-wVlnz4du.js'
import { t as i } from './plus-JF1OlTCr.js'
import { t as a } from './trash-2-CTdukVHF.js'
import {
  H as o,
  L as s,
  R as c,
  S as l,
  _ as u,
  a as d,
  b as f,
  c as p,
  f as m,
  i as h,
  p as g,
  q as _,
  s as v,
  st as y,
  u as b,
  v as x,
  x as S,
} from './index-CHmnQ-gm.js'
import { t as C } from './errors-CkAloMCx.js'
import { n as w, t as T } from './card-DHbyifQZ.js'
import { a as E, i as D, n as O, o as k, r as A, t as j } from './table-C_vNdqXn.js'
import { t as M } from './badge-C1-D0eUj.js'
var N = y(`loader-circle`, [[`path`, { d: `M21 12a9 9 0 1 1-6.219-8.56`, key: `13zald` }]]),
  P = y(`mail`, [
    [`path`, { d: `m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7`, key: `132q7q` }],
    [`rect`, { x: `2`, y: `4`, width: `20`, height: `16`, rx: `2`, key: `izxlao` }],
  ]),
  F = e(t(), 1),
  I = n()
function L() {
  let [e, t] = (0, F.useState)([]),
    [n, y] = (0, F.useState)(!0),
    [L, R] = (0, F.useState)(!1),
    [z, B] = (0, F.useState)({
      id: ``,
      name: ``,
      surname: ``,
      email: ``,
      oldPassword: ``,
      password: ``,
      passwordConfirm: ``,
      access_level: `Autonomo`,
      plan: `Free`,
      whatsapp: ``,
    }),
    [V, H] = (0, F.useState)(``),
    [U, W] = (0, F.useState)({}),
    [G, K] = (0, F.useState)(!1),
    { user: q } = h(),
    J = async () => {
      try {
        ;(y(!0), t(await d.collection(`users`).getFullList({ sort: `-created` })))
      } catch {
        o.error(`Erro ao carregar usuários`)
      } finally {
        y(!1)
      }
    }
  ;(0, F.useEffect)(() => {
    J()
  }, [])
  let Y = async () => {
      if ((W({}), z.password && z.password !== z.passwordConfirm)) {
        W({ passwordConfirm: `As senhas não coincidem.` })
        return
      }
      try {
        if ((K(!0), z.id)) {
          let e = {
              name: z.name,
              surname: z.surname,
              access_level: z.access_level,
              plan: z.plan,
              whatsapp: z.whatsapp,
            },
            t = !1
          if (
            (z.email !== V && ((e.email = z.email), (t = !0)),
            z.password &&
              ((e.password = z.password), (e.passwordConfirm = z.passwordConfirm), (t = !0)),
            t)
          ) {
            if (!z.oldPassword) {
              ;(W({ oldPassword: `Senha atual é obrigatória para alterar email ou senha.` }), K(!1))
              return
            }
            e.oldPassword = z.oldPassword
          }
          ;(await d.collection(`users`).update(z.id, e),
            o.success(`Usuário atualizado com sucesso`))
        } else {
          let e = {
            name: z.name,
            surname: z.surname,
            email: z.email,
            password: z.password,
            passwordConfirm: z.passwordConfirm,
            access_level: z.access_level,
            plan: z.plan,
            whatsapp: z.whatsapp,
          }
          ;(await d.collection(`users`).create(e), o.success(`Usuário criado com sucesso`))
        }
        ;(R(!1), J())
      } catch (e) {
        let t = C(e)
        Object.keys(t).length > 0
          ? (W(t), o.error(`Verifique os erros nos campos do formulário.`))
          : o.error(
              `Erro ao salvar usuário. Verifique se as senhas coincidem e se o email já está em uso.`,
            )
      } finally {
        K(!1)
      }
    },
    X = async (e) => {
      if (confirm(`Deseja excluir este usuário? Esta ação é irreversível.`))
        try {
          ;(await d.collection(`users`).delete(e), o.success(`Excluído com sucesso`), J())
        } catch {
          o.error(`Erro ao excluir`)
        }
    },
    Z = () => {
      ;(H(``),
        W({}),
        B({
          id: ``,
          name: ``,
          surname: ``,
          email: ``,
          oldPassword: ``,
          password: ``,
          passwordConfirm: ``,
          access_level: `Autonomo`,
          plan: `Free`,
          whatsapp: ``,
        }),
        R(!0))
    },
    Q = (e) => {
      ;(H(e.email || ``),
        W({}),
        B({
          id: e.id,
          name: e.name || ``,
          surname: e.surname || ``,
          email: e.email || ``,
          oldPassword: ``,
          password: ``,
          passwordConfirm: ``,
          access_level: e.access_level || `Autonomo`,
          plan: e.plan || `Free`,
          whatsapp: e.whatsapp || ``,
        }),
        R(!0))
    }
  return (0, I.jsxs)(`div`, {
    className: `space-y-6 animate-fade-in pb-20 md:pb-6`,
    children: [
      (0, I.jsxs)(`div`, {
        className: `flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`,
        children: [
          (0, I.jsxs)(`div`, {
            children: [
              (0, I.jsx)(`h2`, {
                className: `text-2xl font-bold tracking-tight`,
                children: `Usuários e Acessos`,
              }),
              (0, I.jsx)(`p`, {
                className: `text-muted-foreground text-sm`,
                children: `Gerencie quem tem acesso ao sistema`,
              }),
            ],
          }),
          (0, I.jsxs)(c, {
            onClick: Z,
            className: `w-full sm:w-auto`,
            children: [(0, I.jsx)(i, { className: `mr-2 h-4 w-4` }), ` Novo Usuário`],
          }),
        ],
      }),
      (0, I.jsx)(T, {
        children: (0, I.jsx)(w, {
          className: `p-0`,
          children: (0, I.jsx)(`div`, {
            className: `overflow-x-auto w-full`,
            children: (0, I.jsxs)(j, {
              className: `min-w-[600px]`,
              children: [
                (0, I.jsx)(E, {
                  children: (0, I.jsxs)(k, {
                    children: [
                      (0, I.jsx)(D, { children: `Usuário` }),
                      (0, I.jsx)(D, { children: `Contatos` }),
                      (0, I.jsx)(D, { children: `Nível` }),
                      (0, I.jsx)(D, { children: `Plano` }),
                      (0, I.jsx)(D, { className: `text-right`, children: `Ações` }),
                    ],
                  }),
                }),
                (0, I.jsxs)(O, {
                  children: [
                    n
                      ? (0, I.jsx)(k, {
                          children: (0, I.jsx)(A, {
                            colSpan: 5,
                            className: `text-center py-12`,
                            children: (0, I.jsx)(N, {
                              className: `h-6 w-6 animate-spin mx-auto text-primary`,
                            }),
                          }),
                        })
                      : e.map((e) =>
                          (0, I.jsxs)(
                            k,
                            {
                              children: [
                                (0, I.jsx)(A, {
                                  className: `font-medium`,
                                  children: (0, I.jsxs)(`div`, {
                                    className: `flex items-center gap-3`,
                                    children: [
                                      (0, I.jsx)(`div`, {
                                        className: `h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0`,
                                        children: e.avatar
                                          ? (0, I.jsx)(`img`, {
                                              src: d.files.getUrl(e, e.avatar),
                                              alt: e.name,
                                              className: `h-full w-full object-cover`,
                                            })
                                          : (0, I.jsx)(`span`, {
                                              className: `text-primary font-bold`,
                                              children: (e.name?.charAt(0) || `U`).toUpperCase(),
                                            }),
                                      }),
                                      (0, I.jsxs)(`div`, {
                                        children: [e.name || `Sem nome`, ` `, e.surname || ``],
                                      }),
                                    ],
                                  }),
                                }),
                                (0, I.jsx)(A, {
                                  children: (0, I.jsxs)(`div`, {
                                    className: `flex flex-col gap-1 text-sm`,
                                    children: [
                                      (0, I.jsxs)(`div`, {
                                        className: `flex items-center gap-2`,
                                        children: [
                                          (0, I.jsx)(P, {
                                            className: `h-3 w-3 text-muted-foreground shrink-0`,
                                          }),
                                          (0, I.jsx)(`span`, {
                                            className: `break-all whitespace-normal`,
                                            children:
                                              e.email ||
                                              (0, I.jsx)(`span`, {
                                                className: `text-muted-foreground italic`,
                                                children: `Não informado`,
                                              }),
                                          }),
                                        ],
                                      }),
                                      e.whatsapp &&
                                        (0, I.jsxs)(`div`, {
                                          className: `flex items-center gap-2 text-muted-foreground`,
                                          children: [
                                            (0, I.jsx)(`span`, {
                                              className: `text-xs`,
                                              children: `WA:`,
                                            }),
                                            (0, I.jsx)(`span`, {
                                              className: `break-all whitespace-normal`,
                                              children: _(e.whatsapp),
                                            }),
                                          ],
                                        }),
                                    ],
                                  }),
                                }),
                                (0, I.jsx)(A, {
                                  children: (0, I.jsx)(M, {
                                    variant: `outline`,
                                    children: e.access_level || `Autonomo`,
                                  }),
                                }),
                                (0, I.jsx)(A, {
                                  children: (0, I.jsx)(M, {
                                    variant: `secondary`,
                                    children: e.plan || `Free`,
                                  }),
                                }),
                                (0, I.jsx)(A, {
                                  className: `text-right`,
                                  children: (0, I.jsxs)(`div`, {
                                    className: `flex justify-end gap-1`,
                                    children: [
                                      (0, I.jsx)(c, {
                                        variant: `ghost`,
                                        size: `icon`,
                                        onClick: () => Q(e),
                                        title: `Editar`,
                                        children: (0, I.jsx)(r, { className: `h-4 w-4` }),
                                      }),
                                      (0, I.jsx)(c, {
                                        variant: `ghost`,
                                        size: `icon`,
                                        onClick: () => X(e.id),
                                        disabled: e.id === q?.id,
                                        title: `Excluir`,
                                        children: (0, I.jsx)(a, {
                                          className: `h-4 w-4 text-destructive`,
                                        }),
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            e.id,
                          ),
                        ),
                    !n &&
                      e.length === 0 &&
                      (0, I.jsx)(k, {
                        children: (0, I.jsx)(A, {
                          colSpan: 5,
                          className: `text-center py-12 text-muted-foreground`,
                          children: `Nenhum usuário encontrado.`,
                        }),
                      }),
                  ],
                }),
              ],
            }),
          }),
        }),
      }),
      (0, I.jsx)(u, {
        open: L,
        onOpenChange: R,
        children: (0, I.jsxs)(x, {
          className: `w-[95vw] max-w-lg`,
          children: [
            (0, I.jsx)(S, {
              children: (0, I.jsxs)(l, { children: [z.id ? `Editar` : `Novo`, ` Usuário`] }),
            }),
            (0, I.jsxs)(`div`, {
              className: `space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1`,
              children: [
                (0, I.jsxs)(`div`, {
                  className: `grid grid-cols-1 sm:grid-cols-2 gap-4`,
                  children: [
                    (0, I.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, I.jsx)(`label`, { className: `text-sm font-medium`, children: `Nome` }),
                        (0, I.jsx)(s, {
                          value: z.name,
                          onChange: (e) => B({ ...z, name: e.target.value }),
                          placeholder: `Nome`,
                        }),
                        U.name &&
                          (0, I.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: U.name,
                          }),
                      ],
                    }),
                    (0, I.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, I.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `Sobrenome`,
                        }),
                        (0, I.jsx)(s, {
                          value: z.surname,
                          onChange: (e) => B({ ...z, surname: e.target.value }),
                          placeholder: `Sobrenome`,
                        }),
                        U.surname &&
                          (0, I.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: U.surname,
                          }),
                      ],
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `grid grid-cols-1 sm:grid-cols-2 gap-4`,
                  children: [
                    (0, I.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, I.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `E-mail`,
                        }),
                        (0, I.jsx)(s, {
                          type: `email`,
                          value: z.email,
                          onChange: (e) => B({ ...z, email: e.target.value }),
                          placeholder: `exemplo@email.com`,
                        }),
                        U.email &&
                          (0, I.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: U.email,
                          }),
                      ],
                    }),
                    (0, I.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, I.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `WhatsApp`,
                        }),
                        (0, I.jsx)(s, {
                          value: _(z.whatsapp),
                          onChange: (e) => B({ ...z, whatsapp: _(e.target.value) }),
                          placeholder: `(00) 00000-0000`,
                        }),
                        U.whatsapp &&
                          (0, I.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: U.whatsapp,
                          }),
                      ],
                    }),
                  ],
                }),
                z.id &&
                  (z.email !== V || z.password) &&
                  (0, I.jsxs)(`div`, {
                    className: `space-y-2`,
                    children: [
                      (0, I.jsx)(`label`, {
                        className: `text-sm font-medium`,
                        children: `Senha Atual (obrigatória para alterar email ou senha)`,
                      }),
                      (0, I.jsx)(s, {
                        type: `password`,
                        value: z.oldPassword,
                        onChange: (e) => B({ ...z, oldPassword: e.target.value }),
                        placeholder: `Digite a senha atual`,
                      }),
                      U.oldPassword &&
                        (0, I.jsx)(`p`, {
                          className: `text-sm text-destructive`,
                          children: U.oldPassword,
                        }),
                    ],
                  }),
                (0, I.jsxs)(`div`, {
                  className: `grid grid-cols-1 sm:grid-cols-2 gap-4`,
                  children: [
                    (0, I.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, I.jsxs)(`label`, {
                          className: `text-sm font-medium`,
                          children: [`Senha `, z.id && `(Opcional)`],
                        }),
                        (0, I.jsx)(s, {
                          type: `password`,
                          value: z.password,
                          onChange: (e) => B({ ...z, password: e.target.value }),
                          placeholder: `Mínimo 8 caracteres`,
                        }),
                        U.password &&
                          (0, I.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: U.password,
                          }),
                      ],
                    }),
                    (0, I.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, I.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `Confirmar Senha`,
                        }),
                        (0, I.jsx)(s, {
                          type: `password`,
                          value: z.passwordConfirm,
                          onChange: (e) => B({ ...z, passwordConfirm: e.target.value }),
                          placeholder: `Repita a senha`,
                        }),
                        U.passwordConfirm &&
                          (0, I.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: U.passwordConfirm,
                          }),
                      ],
                    }),
                  ],
                }),
                (0, I.jsxs)(`div`, {
                  className: `grid grid-cols-1 sm:grid-cols-2 gap-4`,
                  children: [
                    (0, I.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, I.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `Nível de Acesso`,
                        }),
                        (0, I.jsxs)(v, {
                          value: z.access_level,
                          onValueChange: (e) => B({ ...z, access_level: e }),
                          children: [
                            (0, I.jsx)(m, { children: (0, I.jsx)(g, {}) }),
                            (0, I.jsxs)(p, {
                              children: [
                                (0, I.jsx)(b, { value: `Admin`, children: `Admin` }),
                                (0, I.jsx)(b, { value: `Socio`, children: `Socio` }),
                                (0, I.jsx)(b, { value: `Autonomo`, children: `Autonomo` }),
                              ],
                            }),
                          ],
                        }),
                        U.access_level &&
                          (0, I.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: U.access_level,
                          }),
                      ],
                    }),
                    (0, I.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, I.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `Plano`,
                        }),
                        (0, I.jsxs)(v, {
                          value: z.plan,
                          onValueChange: (e) => B({ ...z, plan: e }),
                          children: [
                            (0, I.jsx)(m, { children: (0, I.jsx)(g, {}) }),
                            (0, I.jsxs)(p, {
                              children: [
                                (0, I.jsx)(b, { value: `Free`, children: `Free` }),
                                (0, I.jsx)(b, { value: `Basic`, children: `Basic` }),
                                (0, I.jsx)(b, { value: `Pro`, children: `Pro` }),
                                (0, I.jsx)(b, { value: `Platinum`, children: `Platinum` }),
                              ],
                            }),
                          ],
                        }),
                        U.plan &&
                          (0, I.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: U.plan,
                          }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, I.jsxs)(f, {
              className: `gap-2 sm:gap-0 mt-2`,
              children: [
                (0, I.jsx)(c, { variant: `outline`, onClick: () => R(!1), children: `Cancelar` }),
                (0, I.jsxs)(c, {
                  onClick: Y,
                  disabled: G,
                  children: [
                    G ? (0, I.jsx)(N, { className: `h-4 w-4 animate-spin mr-2` }) : null,
                    ` Salvar`,
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  })
}
export { L as default }
