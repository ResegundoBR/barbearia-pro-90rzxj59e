import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './pen-n5TRUUzm.js'
import { t as i } from './plus-CKrHCopO.js'
import { t as a } from './trash-2-B1kkSV9-.js'
import {
  H as o,
  S as s,
  U as c,
  _ as l,
  a as u,
  b as d,
  c as f,
  ct as p,
  f as m,
  i as h,
  p as g,
  q as _,
  s as v,
  u as y,
  v as b,
  x,
} from './index-CXmOAr77.js'
import { t as S } from './errors-D2AHSWtO.js'
import { n as C, t as w } from './card-B5puzR9W.js'
import { a as T, i as E, n as D, o as O, r as k, t as A } from './table-yIASmwa4.js'
import { t as j } from './badge-TQHsDx0A.js'
var M = p(`loader-circle`, [[`path`, { d: `M21 12a9 9 0 1 1-6.219-8.56`, key: `13zald` }]]),
  N = p(`mail`, [
    [`path`, { d: `m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7`, key: `132q7q` }],
    [`rect`, { x: `2`, y: `4`, width: `20`, height: `16`, rx: `2`, key: `izxlao` }],
  ]),
  P = e(t(), 1),
  F = n()
function I() {
  let [e, t] = (0, P.useState)([]),
    [n, p] = (0, P.useState)(!0),
    [I, L] = (0, P.useState)(!1),
    [R, z] = (0, P.useState)({
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
    [B, V] = (0, P.useState)(``),
    [H, U] = (0, P.useState)({}),
    [W, G] = (0, P.useState)(!1),
    { user: K } = h(),
    q = async () => {
      try {
        ;(p(!0), t(await u.collection(`users`).getFullList({ sort: `-created` })))
      } catch {
        _.error(`Erro ao carregar usuários`)
      } finally {
        p(!1)
      }
    }
  ;(0, P.useEffect)(() => {
    q()
  }, [])
  let J = async () => {
      if ((U({}), R.password && R.password !== R.passwordConfirm)) {
        U({ passwordConfirm: `As senhas não coincidem.` })
        return
      }
      try {
        if ((G(!0), R.id)) {
          let e = {
              name: R.name,
              surname: R.surname,
              access_level: R.access_level,
              plan: R.plan,
              whatsapp: R.whatsapp,
            },
            t = !1
          if (
            (R.email !== B && ((e.email = R.email), (t = !0)),
            R.password &&
              ((e.password = R.password), (e.passwordConfirm = R.passwordConfirm), (t = !0)),
            t)
          ) {
            if (!R.oldPassword) {
              ;(U({ oldPassword: `Senha atual é obrigatória para alterar email ou senha.` }), G(!1))
              return
            }
            e.oldPassword = R.oldPassword
          }
          ;(await u.collection(`users`).update(R.id, e),
            _.success(`Usuário atualizado com sucesso`))
        } else {
          let e = {
            name: R.name,
            surname: R.surname,
            email: R.email,
            password: R.password,
            passwordConfirm: R.passwordConfirm,
            access_level: R.access_level,
            plan: R.plan,
            whatsapp: R.whatsapp,
          }
          ;(await u.collection(`users`).create(e), _.success(`Usuário criado com sucesso`))
        }
        ;(L(!1), q())
      } catch (e) {
        let t = S(e)
        Object.keys(t).length > 0
          ? (U(t), _.error(`Verifique os erros nos campos do formulário.`))
          : _.error(
              `Erro ao salvar usuário. Verifique se as senhas coincidem e se o email já está em uso.`,
            )
      } finally {
        G(!1)
      }
    },
    Y = async (e) => {
      if (confirm(`Deseja excluir este usuário? Esta ação é irreversível.`))
        try {
          ;(await u.collection(`users`).delete(e), _.success(`Excluído com sucesso`), q())
        } catch {
          _.error(`Erro ao excluir`)
        }
    },
    X = () => {
      ;(V(``),
        U({}),
        z({
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
        L(!0))
    },
    Z = (e) => {
      ;(V(e.email || ``),
        U({}),
        z({
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
        L(!0))
    }
  return (0, F.jsxs)(`div`, {
    className: `space-y-6 animate-fade-in pb-20 md:pb-6`,
    children: [
      (0, F.jsxs)(`div`, {
        className: `flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`,
        children: [
          (0, F.jsxs)(`div`, {
            children: [
              (0, F.jsx)(`h2`, {
                className: `text-2xl font-bold tracking-tight`,
                children: `Usuários e Acessos`,
              }),
              (0, F.jsx)(`p`, {
                className: `text-muted-foreground text-sm`,
                children: `Gerencie quem tem acesso ao sistema`,
              }),
            ],
          }),
          (0, F.jsxs)(c, {
            onClick: X,
            className: `w-full sm:w-auto`,
            children: [(0, F.jsx)(i, { className: `mr-2 h-4 w-4` }), ` Novo Usuário`],
          }),
        ],
      }),
      (0, F.jsx)(w, {
        children: (0, F.jsx)(C, {
          className: `p-0`,
          children: (0, F.jsx)(`div`, {
            className: `overflow-x-auto w-full`,
            children: (0, F.jsxs)(A, {
              className: `min-w-[600px]`,
              children: [
                (0, F.jsx)(T, {
                  children: (0, F.jsxs)(O, {
                    children: [
                      (0, F.jsx)(E, { children: `Usuário` }),
                      (0, F.jsx)(E, { children: `Contatos` }),
                      (0, F.jsx)(E, { children: `Nível` }),
                      (0, F.jsx)(E, { children: `Plano` }),
                      (0, F.jsx)(E, { className: `text-right`, children: `Ações` }),
                    ],
                  }),
                }),
                (0, F.jsxs)(D, {
                  children: [
                    n
                      ? (0, F.jsx)(O, {
                          children: (0, F.jsx)(k, {
                            colSpan: 5,
                            className: `text-center py-12`,
                            children: (0, F.jsx)(M, {
                              className: `h-6 w-6 animate-spin mx-auto text-primary`,
                            }),
                          }),
                        })
                      : e.map((e) =>
                          (0, F.jsxs)(
                            O,
                            {
                              children: [
                                (0, F.jsx)(k, {
                                  className: `font-medium`,
                                  children: (0, F.jsxs)(`div`, {
                                    className: `flex items-center gap-3`,
                                    children: [
                                      (0, F.jsx)(`div`, {
                                        className: `h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0`,
                                        children: e.avatar
                                          ? (0, F.jsx)(`img`, {
                                              src: u.files.getUrl(e, e.avatar),
                                              alt: e.name,
                                              className: `h-full w-full object-cover`,
                                            })
                                          : (0, F.jsx)(`span`, {
                                              className: `text-primary font-bold`,
                                              children: (e.name?.charAt(0) || `U`).toUpperCase(),
                                            }),
                                      }),
                                      (0, F.jsxs)(`div`, {
                                        children: [e.name || `Sem nome`, ` `, e.surname || ``],
                                      }),
                                    ],
                                  }),
                                }),
                                (0, F.jsx)(k, {
                                  children: (0, F.jsxs)(`div`, {
                                    className: `flex flex-col gap-1 text-sm`,
                                    children: [
                                      (0, F.jsxs)(`div`, {
                                        className: `flex items-center gap-2`,
                                        children: [
                                          (0, F.jsx)(N, {
                                            className: `h-3 w-3 text-muted-foreground shrink-0`,
                                          }),
                                          (0, F.jsx)(`span`, {
                                            className: `break-all whitespace-normal`,
                                            children:
                                              e.email ||
                                              (0, F.jsx)(`span`, {
                                                className: `text-muted-foreground italic`,
                                                children: `Não informado`,
                                              }),
                                          }),
                                        ],
                                      }),
                                      e.whatsapp &&
                                        (0, F.jsxs)(`div`, {
                                          className: `flex items-center gap-2 text-muted-foreground`,
                                          children: [
                                            (0, F.jsx)(`span`, {
                                              className: `text-xs`,
                                              children: `WA:`,
                                            }),
                                            (0, F.jsx)(`span`, {
                                              className: `break-all whitespace-normal`,
                                              children: e.whatsapp,
                                            }),
                                          ],
                                        }),
                                    ],
                                  }),
                                }),
                                (0, F.jsx)(k, {
                                  children: (0, F.jsx)(j, {
                                    variant: `outline`,
                                    children: e.access_level || `Autonomo`,
                                  }),
                                }),
                                (0, F.jsx)(k, {
                                  children: (0, F.jsx)(j, {
                                    variant: `secondary`,
                                    children: e.plan || `Free`,
                                  }),
                                }),
                                (0, F.jsx)(k, {
                                  className: `text-right`,
                                  children: (0, F.jsxs)(`div`, {
                                    className: `flex justify-end gap-1`,
                                    children: [
                                      (0, F.jsx)(c, {
                                        variant: `ghost`,
                                        size: `icon`,
                                        onClick: () => Z(e),
                                        title: `Editar`,
                                        children: (0, F.jsx)(r, { className: `h-4 w-4` }),
                                      }),
                                      (0, F.jsx)(c, {
                                        variant: `ghost`,
                                        size: `icon`,
                                        onClick: () => Y(e.id),
                                        disabled: e.id === K?.id,
                                        title: `Excluir`,
                                        children: (0, F.jsx)(a, {
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
                      (0, F.jsx)(O, {
                        children: (0, F.jsx)(k, {
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
      (0, F.jsx)(l, {
        open: I,
        onOpenChange: L,
        children: (0, F.jsxs)(b, {
          className: `w-[95vw] max-w-lg`,
          children: [
            (0, F.jsx)(x, {
              children: (0, F.jsxs)(s, { children: [R.id ? `Editar` : `Novo`, ` Usuário`] }),
            }),
            (0, F.jsxs)(`div`, {
              className: `space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1`,
              children: [
                (0, F.jsxs)(`div`, {
                  className: `grid grid-cols-1 sm:grid-cols-2 gap-4`,
                  children: [
                    (0, F.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, F.jsx)(`label`, { className: `text-sm font-medium`, children: `Nome` }),
                        (0, F.jsx)(o, {
                          value: R.name,
                          onChange: (e) => z({ ...R, name: e.target.value }),
                          placeholder: `Nome`,
                        }),
                        H.name &&
                          (0, F.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: H.name,
                          }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, F.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `Sobrenome`,
                        }),
                        (0, F.jsx)(o, {
                          value: R.surname,
                          onChange: (e) => z({ ...R, surname: e.target.value }),
                          placeholder: `Sobrenome`,
                        }),
                        H.surname &&
                          (0, F.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: H.surname,
                          }),
                      ],
                    }),
                  ],
                }),
                (0, F.jsxs)(`div`, {
                  className: `grid grid-cols-1 sm:grid-cols-2 gap-4`,
                  children: [
                    (0, F.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, F.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `E-mail`,
                        }),
                        (0, F.jsx)(o, {
                          type: `email`,
                          value: R.email,
                          onChange: (e) => z({ ...R, email: e.target.value }),
                          placeholder: `exemplo@email.com`,
                        }),
                        H.email &&
                          (0, F.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: H.email,
                          }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, F.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `WhatsApp`,
                        }),
                        (0, F.jsx)(o, {
                          value: R.whatsapp,
                          onChange: (e) => z({ ...R, whatsapp: e.target.value }),
                          placeholder: `(00) 00000-0000`,
                        }),
                        H.whatsapp &&
                          (0, F.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: H.whatsapp,
                          }),
                      ],
                    }),
                  ],
                }),
                R.id &&
                  (R.email !== B || R.password) &&
                  (0, F.jsxs)(`div`, {
                    className: `space-y-2`,
                    children: [
                      (0, F.jsx)(`label`, {
                        className: `text-sm font-medium`,
                        children: `Senha Atual (obrigatória para alterar email ou senha)`,
                      }),
                      (0, F.jsx)(o, {
                        type: `password`,
                        value: R.oldPassword,
                        onChange: (e) => z({ ...R, oldPassword: e.target.value }),
                        placeholder: `Digite a senha atual`,
                      }),
                      H.oldPassword &&
                        (0, F.jsx)(`p`, {
                          className: `text-sm text-destructive`,
                          children: H.oldPassword,
                        }),
                    ],
                  }),
                (0, F.jsxs)(`div`, {
                  className: `grid grid-cols-1 sm:grid-cols-2 gap-4`,
                  children: [
                    (0, F.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, F.jsxs)(`label`, {
                          className: `text-sm font-medium`,
                          children: [`Senha `, R.id && `(Opcional)`],
                        }),
                        (0, F.jsx)(o, {
                          type: `password`,
                          value: R.password,
                          onChange: (e) => z({ ...R, password: e.target.value }),
                          placeholder: `Mínimo 8 caracteres`,
                        }),
                        H.password &&
                          (0, F.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: H.password,
                          }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, F.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `Confirmar Senha`,
                        }),
                        (0, F.jsx)(o, {
                          type: `password`,
                          value: R.passwordConfirm,
                          onChange: (e) => z({ ...R, passwordConfirm: e.target.value }),
                          placeholder: `Repita a senha`,
                        }),
                        H.passwordConfirm &&
                          (0, F.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: H.passwordConfirm,
                          }),
                      ],
                    }),
                  ],
                }),
                (0, F.jsxs)(`div`, {
                  className: `grid grid-cols-1 sm:grid-cols-2 gap-4`,
                  children: [
                    (0, F.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, F.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `Nível de Acesso`,
                        }),
                        (0, F.jsxs)(v, {
                          value: R.access_level,
                          onValueChange: (e) => z({ ...R, access_level: e }),
                          children: [
                            (0, F.jsx)(m, { children: (0, F.jsx)(g, {}) }),
                            (0, F.jsxs)(f, {
                              children: [
                                (0, F.jsx)(y, { value: `Admin`, children: `Admin` }),
                                (0, F.jsx)(y, { value: `Socio`, children: `Socio` }),
                                (0, F.jsx)(y, { value: `Autonomo`, children: `Autonomo` }),
                              ],
                            }),
                          ],
                        }),
                        H.access_level &&
                          (0, F.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: H.access_level,
                          }),
                      ],
                    }),
                    (0, F.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, F.jsx)(`label`, {
                          className: `text-sm font-medium`,
                          children: `Plano`,
                        }),
                        (0, F.jsxs)(v, {
                          value: R.plan,
                          onValueChange: (e) => z({ ...R, plan: e }),
                          children: [
                            (0, F.jsx)(m, { children: (0, F.jsx)(g, {}) }),
                            (0, F.jsxs)(f, {
                              children: [
                                (0, F.jsx)(y, { value: `Free`, children: `Free` }),
                                (0, F.jsx)(y, { value: `Basic`, children: `Basic` }),
                                (0, F.jsx)(y, { value: `Pro`, children: `Pro` }),
                                (0, F.jsx)(y, { value: `Platinum`, children: `Platinum` }),
                              ],
                            }),
                          ],
                        }),
                        H.plan &&
                          (0, F.jsx)(`p`, {
                            className: `text-sm text-destructive`,
                            children: H.plan,
                          }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, F.jsxs)(d, {
              className: `gap-2 sm:gap-0 mt-2`,
              children: [
                (0, F.jsx)(c, { variant: `outline`, onClick: () => L(!1), children: `Cancelar` }),
                (0, F.jsxs)(c, {
                  onClick: J,
                  disabled: W,
                  children: [
                    W ? (0, F.jsx)(M, { className: `h-4 w-4 animate-spin mr-2` }) : null,
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
export { I as default }
