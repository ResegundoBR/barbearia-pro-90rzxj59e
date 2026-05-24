import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './pencil-SDjJxZDH.js'
import { t as i } from './plus-CKrHCopO.js'
import { t as a } from './square-pen-GxPEgy8W.js'
import { t as o } from './trash-2-B1kkSV9-.js'
import {
  A as s,
  F as c,
  H as l,
  I as u,
  J as d,
  L as f,
  M as p,
  N as m,
  P as h,
  R as g,
  S as ee,
  U as _,
  W as v,
  _ as te,
  _t as y,
  a as b,
  b as ne,
  c as x,
  f as S,
  ht as C,
  i as re,
  j as w,
  mt as T,
  n as ie,
  p as E,
  r as ae,
  s as D,
  t as O,
  u as k,
  v as oe,
  vt as A,
  x as se,
  yt as ce,
  z as j,
} from './index-CXmOAr77.js'
import { i as M, n as N, r as le, t as ue } from './tabs-D-pIkQFb.js'
import { t as de } from './errors-D2AHSWtO.js'
import { a as P, n as F, o as I, r as L, t as R } from './card-B5puzR9W.js'
import { a as fe, i as z, n as pe, o as B, r as V, t as me } from './table-yIASmwa4.js'
import { t as he } from './badge-TQHsDx0A.js'
import { t as H } from './switch-6ge4m8gZ.js'
import { i as U, n as ge, r as W, t as G } from './categories-BiULfYkE.js'
var K = e(t(), 1),
  q = n(),
  J = `AlertDialog`,
  [_e, ve] = C(J, [j]),
  Y = j(),
  ye = (e) => {
    let { __scopeAlertDialog: t, ...n } = e,
      r = Y(t)
    return (0, q.jsx)(c, { ...r, ...n, modal: !0 })
  }
ye.displayName = J
var X = `AlertDialogTrigger`,
  Z = K.forwardRef((e, t) => {
    let { __scopeAlertDialog: n, ...r } = e,
      i = Y(n)
    return (0, q.jsx)(f, { ...i, ...r, ref: t })
  })
Z.displayName = X
var be = `AlertDialogPortal`,
  xe = (e) => {
    let { __scopeAlertDialog: t, ...n } = e,
      r = Y(t)
    return (0, q.jsx)(h, { ...r, ...n })
  }
xe.displayName = be
var Se = `AlertDialogOverlay`,
  Q = K.forwardRef((e, t) => {
    let { __scopeAlertDialog: n, ...r } = e,
      i = Y(n)
    return (0, q.jsx)(m, { ...i, ...r, ref: t })
  })
Q.displayName = Se
var $ = `AlertDialogContent`,
  [Ce, we] = _e($),
  Te = T(`AlertDialogContent`),
  Ee = K.forwardRef((e, t) => {
    let { __scopeAlertDialog: n, children: r, ...i } = e,
      a = Y(n),
      o = K.useRef(null),
      s = y(t, o),
      c = K.useRef(null)
    return (0, q.jsx)(g, {
      contentName: $,
      titleName: De,
      docsSlug: `alert-dialog`,
      children: (0, q.jsx)(Ce, {
        scope: n,
        cancelRef: c,
        children: (0, q.jsxs)(w, {
          role: `alertdialog`,
          ...a,
          ...i,
          ref: s,
          onOpenAutoFocus: A(i.onOpenAutoFocus, (e) => {
            ;(e.preventDefault(), c.current?.focus({ preventScroll: !0 }))
          }),
          onPointerDownOutside: (e) => e.preventDefault(),
          onInteractOutside: (e) => e.preventDefault(),
          children: [(0, q.jsx)(Te, { children: r }), (0, q.jsx)(Fe, { contentRef: o })],
        }),
      }),
    })
  })
Ee.displayName = $
var De = `AlertDialogTitle`,
  Oe = K.forwardRef((e, t) => {
    let { __scopeAlertDialog: n, ...r } = e,
      i = Y(n)
    return (0, q.jsx)(u, { ...i, ...r, ref: t })
  })
Oe.displayName = De
var ke = `AlertDialogDescription`,
  Ae = K.forwardRef((e, t) => {
    let { __scopeAlertDialog: n, ...r } = e,
      i = Y(n)
    return (0, q.jsx)(p, { ...i, ...r, ref: t })
  })
Ae.displayName = ke
var je = `AlertDialogAction`,
  Me = K.forwardRef((e, t) => {
    let { __scopeAlertDialog: n, ...r } = e,
      i = Y(n)
    return (0, q.jsx)(s, { ...i, ...r, ref: t })
  })
Me.displayName = je
var Ne = `AlertDialogCancel`,
  Pe = K.forwardRef((e, t) => {
    let { __scopeAlertDialog: n, ...r } = e,
      { cancelRef: i } = we(Ne, n),
      a = Y(n),
      o = y(t, i)
    return (0, q.jsx)(s, { ...a, ...r, ref: o })
  })
Pe.displayName = Ne
var Fe = ({ contentRef: e }) => {
    let t = `\`${$}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${$}\` by passing a \`${ke}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${$}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`
    return (
      K.useEffect(() => {
        document.getElementById(e.current?.getAttribute(`aria-describedby`)) || console.warn(t)
      }, [t, e]),
      null
    )
  },
  Ie = ye,
  Le = xe,
  Re = Q,
  ze = Ee,
  Be = Me,
  Ve = Pe,
  He = Oe,
  Ue = Ae,
  We = Ie,
  Ge = Le,
  Ke = K.forwardRef(({ className: e, ...t }, n) =>
    (0, q.jsx)(Re, {
      className: d(
        `fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`,
        e,
      ),
      ...t,
      ref: n,
    }),
  )
Ke.displayName = Re.displayName
var qe = K.forwardRef(({ className: e, ...t }, n) =>
  (0, q.jsxs)(Ge, {
    children: [
      (0, q.jsx)(Ke, {}),
      (0, q.jsx)(ze, {
        ref: n,
        className: d(
          `fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg`,
          e,
        ),
        ...t,
      }),
    ],
  }),
)
qe.displayName = ze.displayName
var Je = ({ className: e, ...t }) =>
  (0, q.jsx)(`div`, { className: d(`flex flex-col space-y-2 text-center sm:text-left`, e), ...t })
Je.displayName = `AlertDialogHeader`
var Ye = ({ className: e, ...t }) =>
  (0, q.jsx)(`div`, {
    className: d(`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2`, e),
    ...t,
  })
Ye.displayName = `AlertDialogFooter`
var Xe = K.forwardRef(({ className: e, ...t }, n) =>
  (0, q.jsx)(He, { ref: n, className: d(`text-lg font-semibold`, e), ...t }),
)
Xe.displayName = He.displayName
var Ze = K.forwardRef(({ className: e, ...t }, n) =>
  (0, q.jsx)(Ue, { ref: n, className: d(`text-sm text-muted-foreground`, e), ...t }),
)
Ze.displayName = Ue.displayName
var Qe = K.forwardRef(({ className: e, ...t }, n) =>
  (0, q.jsx)(Be, { ref: n, className: d(v(), e), ...t }),
)
Qe.displayName = Be.displayName
var $e = K.forwardRef(({ className: e, ...t }, n) =>
  (0, q.jsx)(Ve, { ref: n, className: d(v({ variant: `outline` }), `mt-2 sm:mt-0`, e), ...t }),
)
$e.displayName = Ve.displayName
function et() {
  let [e, t] = (0, K.useState)([]),
    [n, a] = (0, K.useState)(!0),
    [s, c] = (0, K.useState)(!1),
    [u, d] = (0, K.useState)(null),
    [f, p] = (0, K.useState)({ name: ``, type: `product`, commission_percentage: `` }),
    [m, h] = (0, K.useState)({}),
    [g, v] = (0, K.useState)(null),
    { toast: y } = ce(),
    b = async () => {
      try {
        t(await W())
      } catch (e) {
        console.error(e)
      } finally {
        a(!1)
      }
    }
  ;((0, K.useEffect)(() => {
    b()
  }, []),
    ie(`categories`, () => {
      b()
    }))
  let C = (e) => {
    ;(h({}),
      e
        ? (d(e.id),
          p({
            name: e.name || ``,
            type: e.type || `product`,
            commission_percentage: e.commission_percentage?.toString() || ``,
          }))
        : (d(null), p({ name: ``, type: `product`, commission_percentage: `` })),
      c(!0))
  }
  return (0, q.jsxs)(`div`, {
    className: `space-y-4`,
    children: [
      (0, q.jsxs)(`div`, {
        className: `flex justify-between items-center`,
        children: [
          (0, q.jsx)(`h2`, {
            className: `text-lg font-semibold`,
            children: `Listagem de Categorias`,
          }),
          (0, q.jsxs)(_, {
            onClick: () => C(),
            children: [(0, q.jsx)(i, { className: `size-4 mr-2` }), `Nova Categoria`],
          }),
        ],
      }),
      (0, q.jsx)(`div`, {
        className: `border rounded-md`,
        children: (0, q.jsxs)(me, {
          children: [
            (0, q.jsx)(fe, {
              children: (0, q.jsxs)(B, {
                children: [
                  (0, q.jsx)(z, { children: `Nome` }),
                  (0, q.jsx)(z, { children: `Tipo` }),
                  (0, q.jsx)(z, { children: `Comissão (%)` }),
                  (0, q.jsx)(z, { className: `text-right`, children: `Ações` }),
                ],
              }),
            }),
            (0, q.jsx)(pe, {
              children: n
                ? (0, q.jsx)(B, {
                    children: (0, q.jsx)(V, {
                      colSpan: 4,
                      className: `text-center py-6 text-muted-foreground`,
                      children: `Carregando...`,
                    }),
                  })
                : e.length === 0
                  ? (0, q.jsx)(B, {
                      children: (0, q.jsx)(V, {
                        colSpan: 4,
                        className: `text-center py-6 text-muted-foreground`,
                        children: `Nenhuma categoria encontrada.`,
                      }),
                    })
                  : e.map((e) =>
                      (0, q.jsxs)(
                        B,
                        {
                          children: [
                            (0, q.jsx)(V, { className: `font-medium`, children: e.name }),
                            (0, q.jsx)(V, {
                              children: e.type === `service` ? `Serviço` : `Produto`,
                            }),
                            (0, q.jsx)(V, { children: e.commission_percentage ?? `-` }),
                            (0, q.jsxs)(V, {
                              className: `text-right space-x-2`,
                              children: [
                                (0, q.jsx)(_, {
                                  variant: `ghost`,
                                  size: `icon`,
                                  onClick: () => C(e),
                                  children: (0, q.jsx)(r, {
                                    className: `size-4 text-muted-foreground`,
                                  }),
                                }),
                                (0, q.jsx)(_, {
                                  variant: `ghost`,
                                  size: `icon`,
                                  onClick: () => v(e.id),
                                  children: (0, q.jsx)(o, {
                                    className: `size-4 text-destructive/80 hover:text-destructive`,
                                  }),
                                }),
                              ],
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
      (0, q.jsx)(te, {
        open: s,
        onOpenChange: c,
        children: (0, q.jsxs)(oe, {
          children: [
            (0, q.jsx)(se, {
              children: (0, q.jsx)(ee, { children: u ? `Editar Categoria` : `Nova Categoria` }),
            }),
            (0, q.jsxs)(`div`, {
              className: `space-y-4 py-4`,
              children: [
                (0, q.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, q.jsx)(O, { children: `Nome *` }),
                    (0, q.jsx)(l, {
                      value: f.name,
                      onChange: (e) => p({ ...f, name: e.target.value }),
                      placeholder: `Ex: Cabelo, Barba, Pomadas...`,
                    }),
                    m.name &&
                      (0, q.jsx)(`p`, {
                        className: `text-sm text-destructive font-medium`,
                        children: m.name,
                      }),
                  ],
                }),
                (0, q.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, q.jsx)(O, { children: `Tipo *` }),
                    (0, q.jsxs)(D, {
                      value: f.type,
                      onValueChange: (e) => p({ ...f, type: e }),
                      children: [
                        (0, q.jsx)(S, { children: (0, q.jsx)(E, {}) }),
                        (0, q.jsxs)(x, {
                          children: [
                            (0, q.jsx)(k, { value: `product`, children: `Produto` }),
                            (0, q.jsx)(k, { value: `service`, children: `Serviço` }),
                          ],
                        }),
                      ],
                    }),
                    m.type &&
                      (0, q.jsx)(`p`, {
                        className: `text-sm text-destructive font-medium`,
                        children: m.type,
                      }),
                  ],
                }),
                (0, q.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, q.jsx)(O, { children: `Porcentagem de Comissão (%)` }),
                    (0, q.jsx)(l, {
                      type: `number`,
                      step: `0.01`,
                      placeholder: `Ex: 50`,
                      value: f.commission_percentage,
                      onChange: (e) => p({ ...f, commission_percentage: e.target.value }),
                    }),
                    (0, q.jsx)(`p`, {
                      className: `text-xs text-muted-foreground`,
                      children: `Comissão padrão aplicada aos itens desta categoria.`,
                    }),
                    m.commission_percentage &&
                      (0, q.jsx)(`p`, {
                        className: `text-sm text-destructive font-medium`,
                        children: m.commission_percentage,
                      }),
                  ],
                }),
              ],
            }),
            (0, q.jsxs)(ne, {
              children: [
                (0, q.jsx)(_, { variant: `outline`, onClick: () => c(!1), children: `Cancelar` }),
                (0, q.jsx)(_, {
                  onClick: async () => {
                    if ((h({}), f.commission_percentage)) {
                      let e = Number(f.commission_percentage)
                      if (isNaN(e) || e < 0 || e > 100) {
                        h({ commission_percentage: `O valor deve estar entre 0 e 100` })
                        return
                      }
                    }
                    try {
                      let e = {
                        name: f.name,
                        type: f.type,
                        commission_percentage: f.commission_percentage
                          ? Number(f.commission_percentage)
                          : null,
                      }
                      ;(u
                        ? (await U(u, e), y({ title: `Categoria atualizada` }))
                        : (await G(e), y({ title: `Categoria criada` })),
                        c(!1))
                    } catch (e) {
                      let t = de(e)
                      Object.keys(t).length > 0
                        ? h(t)
                        : y({
                            title: `Erro ao salvar`,
                            description: e.message,
                            variant: `destructive`,
                          })
                    }
                  },
                  children: `Salvar`,
                }),
              ],
            }),
          ],
        }),
      }),
      (0, q.jsx)(We, {
        open: !!g,
        onOpenChange: (e) => !e && v(null),
        children: (0, q.jsxs)(qe, {
          children: [
            (0, q.jsxs)(Je, {
              children: [
                (0, q.jsx)(Xe, { children: `Excluir categoria` }),
                (0, q.jsx)(Ze, {
                  children: `Deseja realmente excluir esta categoria? Esta ação não pode ser desfeita.`,
                }),
              ],
            }),
            (0, q.jsxs)(Ye, {
              children: [
                (0, q.jsx)($e, { children: `Cancelar` }),
                (0, q.jsx)(Qe, {
                  className: `bg-destructive text-destructive-foreground hover:bg-destructive/90`,
                  onClick: async () => {
                    if (g)
                      try {
                        ;(await ge(g), y({ title: `Categoria excluída` }), v(null))
                      } catch (e) {
                        y({
                          title: `Erro ao excluir`,
                          description: e.message,
                          variant: `destructive`,
                        })
                      }
                  },
                  children: `Excluir`,
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  })
}
function tt() {
  let { user: e } = re(),
    { isAdmin: t } = ae(),
    { toast: n } = ce(),
    [r, s] = (0, K.useState)(``),
    [c, u] = (0, K.useState)(``),
    [d, f] = (0, K.useState)(null),
    [p, m] = (0, K.useState)(``),
    [h, g] = (0, K.useState)({
      inventory_owner_id: ``,
      default_product_commission: 10,
      enable_third_party_commission: !0,
      enable_professional_consumption: !0,
    }),
    [v, y] = (0, K.useState)([]),
    [C, w] = (0, K.useState)(!1),
    [T, ie] = (0, K.useState)(null),
    [A, j] = (0, K.useState)({
      event_type: `new_appointment`,
      recipients: [],
      channel: `internal`,
      timing_unit: `hours_minutes`,
      timing_hours: 0,
      timing_minutes: 0,
      timing_days: 0,
      is_active: !0,
    }),
    de = async () => {
      try {
        let e = await b.collection(`settings`).getFullList(),
          t = e.find((e) => e.key === `logo`)
        t && (s(t.id), t.logo && u(b.files.getURL(t, t.logo)))
        let n = e.find((e) => e.key === `financial_config`)
        n &&
          (m(n.id),
          g(
            n.value || {
              inventory_owner_id: ``,
              default_product_commission: 10,
              enable_third_party_commission: !0,
            },
          ))
        let r = e.find((e) => e.key === `role_permissions`)
        ;(r
          ? (ge(r.id), G(r.value || { Admin: [`*`], Socio: [], Autonomo: [] }))
          : G({
              Admin: [`*`],
              Socio: [
                `agenda`,
                `clientes`,
                `checkout`,
                `staff`,
                `dash_tab_overview`,
                `dash_block_revenue`,
                `dash_block_clients`,
                `dash_block_new_clients`,
                `dash_block_ticket_serv`,
                `dash_block_ticket_prod`,
                `dash_block_peak`,
                `dash_block_history`,
                `dash_block_top_sellers`,
                `dash_block_forecast`,
                `dash_block_alerts`,
              ],
              Autonomo: [
                `agenda`,
                `dash_tab_overview`,
                `dash_block_revenue`,
                `dash_block_history`,
                `dash_block_peak`,
                `dash_block_forecast`,
              ],
            }),
          y(await b.collection(`barbers`).getFullList({ sort: `name` })))
        let i = await b.collection(`business_hours`).getFullList({ sort: `day_of_week` })
        Y(
          [
            { day_of_week: `0`, is_active: !1, open_time: `09:00`, close_time: `18:00` },
            { day_of_week: `1`, is_active: !0, open_time: `09:00`, close_time: `18:00` },
            { day_of_week: `2`, is_active: !0, open_time: `09:00`, close_time: `18:00` },
            { day_of_week: `3`, is_active: !0, open_time: `09:00`, close_time: `18:00` },
            { day_of_week: `4`, is_active: !0, open_time: `09:00`, close_time: `18:00` },
            { day_of_week: `5`, is_active: !0, open_time: `09:00`, close_time: `18:00` },
            { day_of_week: `6`, is_active: !0, open_time: `09:00`, close_time: `18:00` },
          ].map((e) => i.find((t) => t.day_of_week === e.day_of_week) || e),
        )
      } catch (e) {
        console.error(e)
      }
    }
  ;(0, K.useEffect)(() => {
    t && (de(), Z())
  }, [e, t])
  let [U, ge] = (0, K.useState)(``),
    [W, G] = (0, K.useState)({ Admin: [`*`], Socio: [], Autonomo: [] }),
    [J, _e] = (0, K.useState)([]),
    [ve, Y] = (0, K.useState)([]),
    ye = async () => {
      try {
        for (let e of ve)
          e.id
            ? await b.collection(`business_hours`).update(e.id, e)
            : await b.collection(`business_hours`).create(e)
        n({ title: `Horários atualizados com sucesso!` })
      } catch {
        n({ title: `Erro ao salvar horários`, variant: `destructive` })
      }
    },
    X = (e, t, n) => {
      let r = [...ve]
      ;((r[e] = { ...r[e], [t]: n }), Y(r))
    },
    Z = async () => {
      try {
        _e(await b.collection(`notification_rules`).getFullList())
      } catch {}
    }
  if (!t)
    return (0, q.jsx)(`div`, {
      className: `p-8 text-center text-muted-foreground`,
      children: `Acesso Restrito. Apenas administradores podem acessar esta página.`,
    })
  let be = (e) => {
      let t = e.target.files?.[0]
      t && (f(t), u(URL.createObjectURL(t)))
    },
    xe = async () => {
      if (!d) return
      let e = new FormData()
      ;(e.append(`logo`, d), e.append(`key`, `logo`), e.append(`value`, JSON.stringify({})))
      try {
        ;(r
          ? await b.collection(`settings`).update(r, e)
          : s((await b.collection(`settings`).create(e)).id),
          n({
            title: `Logo atualizado com sucesso!`,
            description: `O logotipo foi salvo e já está ativo.`,
          }),
          f(null),
          window.dispatchEvent(new Event(`logo-updated`)))
      } catch (e) {
        ;(console.error(`Save logo error:`, e),
          n({
            title: `Erro ao salvar logo`,
            description: `Verifique se o arquivo é um PNG/JPG válido e tente novamente.`,
            variant: `destructive`,
          }))
      }
    },
    Se = async () => {
      let e = { key: `role_permissions`, value: W }
      try {
        ;(U
          ? await b.collection(`settings`).update(U, e)
          : ge((await b.collection(`settings`).create(e)).id),
          n({ title: `Permissões atualizadas com sucesso! Recarregue a página para aplicar.` }))
      } catch {
        n({ title: `Erro ao salvar permissões`, variant: `destructive` })
      }
    },
    Q = (e, t) => {
      G((n) => {
        let r = n[e] || [],
          i = r.includes(t) ? r.filter((e) => e !== t) : [...r, t]
        return { ...n, [e]: i }
      })
    },
    $ = [
      { id: `agenda`, label: `Agenda`, category: `Módulos do Menu` },
      { id: `clientes`, label: `Clientes`, category: `Módulos do Menu` },
      { id: `checkout`, label: `Checkout (POS)`, category: `Módulos do Menu` },
      { id: `financeiro`, label: `Financeiro`, category: `Módulos do Menu` },
      { id: `estoque`, label: `Serviços & Pacotes`, category: `Módulos do Menu` },
      { id: `produtos`, label: `Produtos`, category: `Módulos do Menu` },
      { id: `fornecedores`, label: `Compras / Fornecedores`, category: `Módulos do Menu` },
      { id: `staff`, label: `Equipe & Comissões`, category: `Módulos do Menu` },
      { id: `settings`, label: `Configurações`, category: `Módulos do Menu` },
      { id: `users`, label: `Usuários e Acessos`, category: `Módulos do Menu` },
      { id: `dash_tab_overview`, label: `Aba: Visão Geral`, category: `Dashboard` },
      { id: `dash_tab_financial`, label: `Aba: Financeiro`, category: `Dashboard` },
      { id: `dash_tab_packages`, label: `Aba: Pacotes Ativos`, category: `Dashboard` },
      {
        id: `dash_block_revenue`,
        label: `Bloco: Faturamento`,
        category: `Dashboard (Visão Geral)`,
      },
      {
        id: `dash_block_clients`,
        label: `Bloco: Clientes Atendidos`,
        category: `Dashboard (Visão Geral)`,
      },
      {
        id: `dash_block_new_clients`,
        label: `Bloco: Novos Clientes`,
        category: `Dashboard (Visão Geral)`,
      },
      {
        id: `dash_block_ticket_serv`,
        label: `Bloco: Ticket Médio Serv.`,
        category: `Dashboard (Visão Geral)`,
      },
      {
        id: `dash_block_ticket_prod`,
        label: `Bloco: Ticket Médio Prod.`,
        category: `Dashboard (Visão Geral)`,
      },
      {
        id: `dash_block_peak`,
        label: `Bloco: Horários de Pico`,
        category: `Dashboard (Visão Geral)`,
      },
      {
        id: `dash_block_top_sellers`,
        label: `Bloco: Top Vendas / Mix`,
        category: `Dashboard (Visão Geral)`,
      },
      {
        id: `dash_block_forecast`,
        label: `Bloco: Previsão de Recebimento`,
        category: `Dashboard (Visão Geral)`,
      },
      { id: `dash_block_alerts`, label: `Bloco: Alertas`, category: `Dashboard (Visão Geral)` },
      {
        id: `dash_block_history`,
        label: `Bloco: Histórico/Gráficos`,
        category: `Dashboard (Visão Geral)`,
      },
    ],
    Ce = Array.from(new Set($.map((e) => e.category))),
    we = async () => {
      if (!h.inventory_owner_id) {
        n({ title: `Selecione o Gestor de Estoque.`, variant: `destructive` })
        return
      }
      let e = { key: `financial_config`, value: h }
      try {
        ;(p
          ? await b.collection(`settings`).update(p, e)
          : m((await b.collection(`settings`).create(e)).id),
          n({ title: `Regras Financeiras atualizadas com sucesso!` }))
      } catch {
        n({ title: `Erro ao salvar regras financeiras`, variant: `destructive` })
      }
    },
    Te = (e) => {
      if (e) {
        let t = e.timing_unit || `hours_minutes`,
          n = 0,
          r = 0,
          i = 0
        if (t === `days`) i = e.timing_offset || 0
        else {
          let t = e.timing_offset || 0
          ;((n = Math.floor(t / 60)), (r = t % 60))
        }
        ;(j({
          event_type: e.event_type,
          recipients: e.recipients || [],
          channel: e.channel || `internal`,
          timing_unit: t,
          timing_hours: n,
          timing_minutes: r,
          timing_days: i,
          is_active: e.is_active,
        }),
          ie(e.id))
      } else
        (j({
          event_type: `new_appointment`,
          recipients: [],
          channel: `internal`,
          timing_unit: `hours_minutes`,
          timing_hours: 0,
          timing_minutes: 0,
          timing_days: 0,
          is_active: !0,
        }),
          ie(null))
      w(!0)
    },
    Ee = async () => {
      try {
        let e = 0
        e =
          A.timing_unit === `days`
            ? Number(A.timing_days) || 0
            : (Number(A.timing_hours) || 0) * 60 + (Number(A.timing_minutes) || 0)
        let t = {
          event_type: A.event_type,
          recipients: A.recipients,
          channel: A.channel,
          timing_unit: A.timing_unit,
          timing_offset: e,
          is_active: A.is_active,
        }
        ;(T
          ? (await b.collection(`notification_rules`).update(T, t),
            n({ title: `Regra atualizada!` }))
          : (await b.collection(`notification_rules`).create(t), n({ title: `Regra criada!` })),
          w(!1),
          Z())
      } catch {
        n({ title: `Erro ao salvar regra`, variant: `destructive` })
      }
    },
    De = async (e) => {
      if (confirm(`Tem certeza que deseja remover esta regra?`))
        try {
          ;(await b.collection(`notification_rules`).delete(e), n({ title: `Regra removida` }), Z())
        } catch {
          n({ title: `Erro ao remover regra`, variant: `destructive` })
        }
    },
    Oe = (e) => {
      j((t) => ({
        ...t,
        recipients: t.recipients.includes(e)
          ? t.recipients.filter((t) => t !== e)
          : [...t.recipients, e],
      }))
    }
  return (0, q.jsxs)(`div`, {
    className: `space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in`,
    children: [
      (0, q.jsxs)(`div`, {
        children: [
          (0, q.jsx)(`h2`, {
            className: `text-3xl font-bold tracking-tight`,
            children: `Configurações do Sistema`,
          }),
          (0, q.jsx)(`p`, {
            className: `text-muted-foreground`,
            children: `Gerencie a identidade visual e as categorias de serviços e produtos.`,
          }),
        ],
      }),
      (0, q.jsxs)(ue, {
        defaultValue: `geral`,
        className: `w-full`,
        children: [
          (0, q.jsxs)(le, {
            className: `mb-6 flex-wrap h-auto`,
            children: [
              (0, q.jsx)(M, { value: `geral`, children: `Geral (Marca)` }),
              (0, q.jsx)(M, { value: `business_hours`, children: `Horário de Funcionamento` }),
              (0, q.jsx)(M, { value: `permissions`, children: `Permissões de Acesso` }),
              (0, q.jsx)(M, { value: `categories`, children: `Configurações de Categorias` }),
              (0, q.jsx)(M, { value: `financial`, children: `Regras Financeiras` }),
              (0, q.jsx)(M, { value: `notifications`, children: `Gerenciamento de Notificações` }),
            ],
          }),
          (0, q.jsx)(N, {
            value: `business_hours`,
            className: `space-y-4`,
            children: (0, q.jsxs)(R, {
              className: `border-border shadow-sm max-w-3xl`,
              children: [
                (0, q.jsxs)(P, {
                  className: `flex flex-row items-center justify-between`,
                  children: [
                    (0, q.jsxs)(`div`, {
                      children: [
                        (0, q.jsx)(I, { children: `Horário de Funcionamento` }),
                        (0, q.jsx)(L, {
                          children: `Defina os dias e horários de funcionamento da barbearia.`,
                        }),
                      ],
                    }),
                    (0, q.jsx)(_, { onClick: ye, children: `Salvar Horários` }),
                  ],
                }),
                (0, q.jsx)(F, {
                  children: (0, q.jsx)(`div`, {
                    className: `space-y-4`,
                    children: ve.map((e, t) => {
                      let n = [
                        `Domingo`,
                        `Segunda`,
                        `Terça`,
                        `Quarta`,
                        `Quinta`,
                        `Sexta`,
                        `Sábado`,
                      ][parseInt(e.day_of_week)]
                      return (0, q.jsxs)(
                        `div`,
                        {
                          className: `flex items-center justify-between p-3 border rounded-md`,
                          children: [
                            (0, q.jsxs)(`div`, {
                              className: `flex items-center gap-4 w-1/3`,
                              children: [
                                (0, q.jsx)(H, {
                                  checked: e.is_active,
                                  onCheckedChange: (e) => X(t, `is_active`, e),
                                }),
                                (0, q.jsx)(O, { className: `font-semibold`, children: n }),
                              ],
                            }),
                            (0, q.jsx)(`div`, {
                              className: `flex items-center gap-2 flex-1 justify-end`,
                              children: e.is_active
                                ? (0, q.jsxs)(q.Fragment, {
                                    children: [
                                      (0, q.jsx)(l, {
                                        type: `time`,
                                        value: e.open_time,
                                        onChange: (e) => X(t, `open_time`, e.target.value),
                                        className: `w-32`,
                                      }),
                                      (0, q.jsx)(`span`, {
                                        className: `text-muted-foreground`,
                                        children: `até`,
                                      }),
                                      (0, q.jsx)(l, {
                                        type: `time`,
                                        value: e.close_time,
                                        onChange: (e) => X(t, `close_time`, e.target.value),
                                        className: `w-32`,
                                      }),
                                    ],
                                  })
                                : (0, q.jsx)(`span`, {
                                    className: `text-muted-foreground text-sm italic mr-12`,
                                    children: `Fechado`,
                                  }),
                            }),
                          ],
                        },
                        e.day_of_week,
                      )
                    }),
                  }),
                }),
              ],
            }),
          }),
          (0, q.jsx)(N, {
            value: `permissions`,
            className: `space-y-4`,
            children: (0, q.jsxs)(R, {
              className: `border-border shadow-sm`,
              children: [
                (0, q.jsxs)(P, {
                  className: `flex flex-row items-center justify-between`,
                  children: [
                    (0, q.jsxs)(`div`, {
                      children: [
                        (0, q.jsx)(I, { children: `Controle de Acesso (RBAC)` }),
                        (0, q.jsx)(L, {
                          children: `Defina o que cada perfil pode acessar no sistema.`,
                        }),
                      ],
                    }),
                    (0, q.jsx)(_, { onClick: Se, children: `Salvar Permissões` }),
                  ],
                }),
                (0, q.jsx)(F, {
                  children: (0, q.jsxs)(me, {
                    children: [
                      (0, q.jsx)(fe, {
                        children: (0, q.jsxs)(B, {
                          children: [
                            (0, q.jsx)(z, { children: `Permissão` }),
                            (0, q.jsx)(z, {
                              className: `text-center w-[120px]`,
                              children: `Sócio`,
                            }),
                            (0, q.jsx)(z, {
                              className: `text-center w-[120px]`,
                              children: `Autônomo`,
                            }),
                          ],
                        }),
                      }),
                      (0, q.jsx)(pe, {
                        children: Ce.map((e) =>
                          (0, q.jsxs)(
                            K.Fragment,
                            {
                              children: [
                                (0, q.jsx)(B, {
                                  className: `bg-muted/50 hover:bg-muted/50`,
                                  children: (0, q.jsx)(V, {
                                    colSpan: 3,
                                    className: `font-bold text-primary py-2`,
                                    children: e,
                                  }),
                                }),
                                $.filter((t) => t.category === e).map((e) =>
                                  (0, q.jsxs)(
                                    B,
                                    {
                                      children: [
                                        (0, q.jsx)(V, {
                                          className: `font-medium text-sm pl-6`,
                                          children: e.label,
                                        }),
                                        (0, q.jsx)(V, {
                                          className: `text-center`,
                                          children: (0, q.jsx)(H, {
                                            checked: (W.Socio || []).includes(e.id),
                                            onCheckedChange: () => Q(`Socio`, e.id),
                                          }),
                                        }),
                                        (0, q.jsx)(V, {
                                          className: `text-center`,
                                          children: (0, q.jsx)(H, {
                                            checked: (W.Autonomo || []).includes(e.id),
                                            onCheckedChange: () => Q(`Autonomo`, e.id),
                                          }),
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                              ],
                            },
                            e,
                          ),
                        ),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
          (0, q.jsx)(N, {
            value: `geral`,
            className: `space-y-4`,
            children: (0, q.jsxs)(R, {
              className: `max-w-2xl border-border shadow-sm`,
              children: [
                (0, q.jsxs)(P, {
                  children: [
                    (0, q.jsx)(I, { children: `Identidade Visual` }),
                    (0, q.jsx)(L, {
                      children: `Faça upload do logotipo da barbearia (PNG recomendado).`,
                    }),
                  ],
                }),
                (0, q.jsx)(F, {
                  className: `space-y-4`,
                  children: (0, q.jsxs)(`div`, {
                    className: `flex items-center gap-6`,
                    children: [
                      (0, q.jsx)(`div`, {
                        className: `w-32 h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-card overflow-hidden shrink-0`,
                        children: c
                          ? (0, q.jsx)(`img`, {
                              src: c,
                              alt: `Logo`,
                              className: `w-full h-full object-contain p-2`,
                            })
                          : (0, q.jsx)(`span`, {
                              className: `text-xs text-muted-foreground text-center px-4`,
                              children: `Sem Logo`,
                            }),
                      }),
                      (0, q.jsxs)(`div`, {
                        className: `space-y-2 flex-1`,
                        children: [
                          (0, q.jsx)(O, { children: `Arquivo de Logo` }),
                          (0, q.jsx)(l, {
                            type: `file`,
                            accept: `image/png, image/jpeg, image/svg+xml`,
                            onChange: be,
                          }),
                          (0, q.jsx)(_, {
                            onClick: xe,
                            disabled: !d,
                            className: `mt-2 w-full sm:w-auto`,
                            children: `Atualizar Logo`,
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
          (0, q.jsx)(N, {
            value: `categories`,
            children: (0, q.jsxs)(R, {
              className: `border-border shadow-sm`,
              children: [
                (0, q.jsxs)(P, {
                  children: [
                    (0, q.jsx)(I, { children: `Categorias do Sistema` }),
                    (0, q.jsx)(L, {
                      children: `Gerencie as classificações de serviços e produtos e suas comissões padrão.`,
                    }),
                  ],
                }),
                (0, q.jsx)(F, { children: (0, q.jsx)(et, {}) }),
              ],
            }),
          }),
          (0, q.jsx)(N, {
            value: `financial`,
            className: `space-y-4`,
            children: (0, q.jsxs)(R, {
              className: `border-border shadow-sm max-w-2xl`,
              children: [
                (0, q.jsxs)(P, {
                  children: [
                    (0, q.jsx)(I, { children: `Regras Financeiras` }),
                    (0, q.jsx)(L, {
                      children: `Configure as regras globais de financeiro, comissões e gestão de estoque.`,
                    }),
                  ],
                }),
                (0, q.jsxs)(F, {
                  className: `space-y-4`,
                  children: [
                    (0, q.jsxs)(`div`, {
                      className: `space-y-2 border-b pb-4`,
                      children: [
                        (0, q.jsx)(O, { children: `Gestor Global de Estoque` }),
                        (0, q.jsxs)(D, {
                          value: h.inventory_owner_id,
                          onValueChange: (e) => g({ ...h, inventory_owner_id: e }),
                          children: [
                            (0, q.jsx)(S, {
                              children: (0, q.jsx)(E, {
                                placeholder: `Selecione o gestor de estoque...`,
                              }),
                            }),
                            (0, q.jsx)(x, {
                              children: v.map((e) =>
                                (0, q.jsx)(k, { value: e.id, children: e.name }, e.id),
                              ),
                            }),
                          ],
                        }),
                        (0, q.jsx)(`p`, {
                          className: `text-xs text-muted-foreground`,
                          children: `O gestor de estoque recebe o lucro das vendas de produtos não-comissionadas.`,
                        }),
                      ],
                    }),
                    (0, q.jsxs)(`div`, {
                      className: `flex items-center justify-between rounded-lg border p-4 bg-card/50`,
                      children: [
                        (0, q.jsxs)(`div`, {
                          className: `space-y-1 mr-4`,
                          children: [
                            (0, q.jsx)(O, {
                              className: `text-base`,
                              children: `Comissão de Venda de Terceiros`,
                            }),
                            (0, q.jsx)(`p`, {
                              className: `text-sm text-muted-foreground`,
                              children: `Ativa o repasse de comissão para barbeiros quando venderem produtos do gestor de estoque. Se desativado, toda a venda vai para o gestor.`,
                            }),
                          ],
                        }),
                        (0, q.jsx)(H, {
                          checked: h.enable_third_party_commission,
                          onCheckedChange: (e) => g({ ...h, enable_third_party_commission: e }),
                        }),
                      ],
                    }),
                    h.enable_third_party_commission &&
                      (0, q.jsxs)(`div`, {
                        className: `space-y-2 bg-muted/30 p-4 rounded-md border border-dashed`,
                        children: [
                          (0, q.jsx)(O, { children: `Comissão Padrão de Produtos (%)` }),
                          (0, q.jsx)(l, {
                            type: `number`,
                            min: `0`,
                            max: `100`,
                            value: h.default_product_commission,
                            onChange: (e) =>
                              g({ ...h, default_product_commission: Number(e.target.value) }),
                            className: `max-w-[200px]`,
                          }),
                          (0, q.jsx)(`p`, {
                            className: `text-xs text-muted-foreground`,
                            children: `Aplicada se o produto não possuir uma regra de categoria específica.`,
                          }),
                        ],
                      }),
                    (0, q.jsxs)(`div`, {
                      className: `flex items-center justify-between rounded-lg border p-4 bg-card/50`,
                      children: [
                        (0, q.jsxs)(`div`, {
                          className: `space-y-1 mr-4`,
                          children: [
                            (0, q.jsx)(O, {
                              className: `text-base`,
                              children: `Consumo Profissional`,
                            }),
                            (0, q.jsx)(`p`, {
                              className: `text-sm text-muted-foreground`,
                              children: `Permite registrar produtos consumidos internamente pelos profissionais, deduzindo o preço de custo de suas comissões automaticamente.`,
                            }),
                          ],
                        }),
                        (0, q.jsx)(H, {
                          checked: h.enable_professional_consumption ?? !0,
                          onCheckedChange: (e) => g({ ...h, enable_professional_consumption: e }),
                        }),
                      ],
                    }),
                    (0, q.jsx)(_, {
                      onClick: we,
                      className: `mt-4`,
                      children: `Salvar Regras Financeiras`,
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, q.jsxs)(N, {
            value: `notifications`,
            className: `space-y-4`,
            children: [
              (0, q.jsxs)(`div`, {
                className: `flex justify-between items-center`,
                children: [
                  (0, q.jsx)(`h3`, {
                    className: `text-lg font-semibold`,
                    children: `Regras de Notificação`,
                  }),
                  (0, q.jsxs)(_, {
                    onClick: () => Te(),
                    children: [(0, q.jsx)(i, { className: `size-4 mr-2` }), ` Nova Regra`],
                  }),
                ],
              }),
              (0, q.jsx)(R, {
                className: `border-border shadow-sm`,
                children: (0, q.jsxs)(me, {
                  children: [
                    (0, q.jsx)(fe, {
                      children: (0, q.jsxs)(B, {
                        children: [
                          (0, q.jsx)(z, { children: `Evento` }),
                          (0, q.jsx)(z, { children: `Destinatários` }),
                          (0, q.jsx)(z, { children: `Canal` }),
                          (0, q.jsx)(z, { className: `text-right`, children: `Ações` }),
                        ],
                      }),
                    }),
                    (0, q.jsxs)(pe, {
                      children: [
                        J.map((e) =>
                          (0, q.jsxs)(
                            B,
                            {
                              className: e.is_active ? `` : `opacity-50`,
                              children: [
                                (0, q.jsxs)(V, {
                                  className: `font-medium`,
                                  children: [
                                    e.event_type === `new_appointment` && `Novo Agendamento`,
                                    e.event_type === `cancellation` &&
                                      `Cancelamento de Agendamento`,
                                    e.event_type === `no_show` && `Não Comparecimento (No-Show)`,
                                    e.event_type === `retention` && `Alerta de Retenção Geral`,
                                    e.event_type === `recorrencia_barba` &&
                                      `Alerta de Retenção (Barba)`,
                                    e.event_type === `recorrencia_cabelo` &&
                                      `Alerta de Retenção (Cabelo)`,
                                    e.event_type === `no_show_3dias` && `No-show após 3 dias`,
                                    e.event_type === `other` && `Outros`,
                                  ],
                                }),
                                (0, q.jsx)(V, {
                                  children: (0, q.jsxs)(`div`, {
                                    className: `flex gap-2`,
                                    children: [
                                      e.recipients?.map((e) =>
                                        (0, q.jsx)(he, { variant: `outline`, children: e }, e),
                                      ),
                                      (!e.recipients || e.recipients.length === 0) &&
                                        (0, q.jsx)(`span`, {
                                          className: `text-muted-foreground text-xs`,
                                          children: `Nenhum`,
                                        }),
                                    ],
                                  }),
                                }),
                                (0, q.jsx)(V, {
                                  className: `capitalize text-muted-foreground`,
                                  children:
                                    e.channel === `internal` ? `Sistema Interno` : e.channel,
                                }),
                                (0, q.jsxs)(V, {
                                  className: `text-right`,
                                  children: [
                                    (0, q.jsx)(_, {
                                      variant: `ghost`,
                                      size: `icon`,
                                      onClick: () => Te(e),
                                      children: (0, q.jsx)(a, { className: `size-4` }),
                                    }),
                                    (0, q.jsx)(_, {
                                      variant: `ghost`,
                                      size: `icon`,
                                      className: `text-destructive hover:bg-destructive/10`,
                                      onClick: () => De(e.id),
                                      children: (0, q.jsx)(o, { className: `size-4` }),
                                    }),
                                  ],
                                }),
                              ],
                            },
                            e.id,
                          ),
                        ),
                        J.length === 0 &&
                          (0, q.jsx)(B, {
                            children: (0, q.jsx)(V, {
                              colSpan: 4,
                              className: `text-center py-6 text-muted-foreground`,
                              children: `Nenhuma regra encontrada.`,
                            }),
                          }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      (0, q.jsx)(te, {
        open: C,
        onOpenChange: w,
        children: (0, q.jsxs)(oe, {
          children: [
            (0, q.jsx)(se, {
              children: (0, q.jsx)(ee, {
                children: T ? `Editar Regra de Notificação` : `Nova Regra de Notificação`,
              }),
            }),
            (0, q.jsxs)(`div`, {
              className: `space-y-4 py-4`,
              children: [
                (0, q.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, q.jsx)(O, { children: `Tipo de Evento` }),
                    (0, q.jsxs)(D, {
                      value: A.event_type,
                      onValueChange: (e) => j({ ...A, event_type: e }),
                      children: [
                        (0, q.jsx)(S, { children: (0, q.jsx)(E, {}) }),
                        (0, q.jsxs)(x, {
                          children: [
                            (0, q.jsx)(k, {
                              value: `new_appointment`,
                              children: `Novo Agendamento`,
                            }),
                            (0, q.jsx)(k, {
                              value: `cancellation`,
                              children: `Cancelamento de Agendamento`,
                            }),
                            (0, q.jsx)(k, {
                              value: `no_show`,
                              children: `Não Comparecimento (No-Show)`,
                            }),
                            (0, q.jsx)(k, {
                              value: `retention`,
                              children: `Alerta de Retenção Geral`,
                            }),
                            (0, q.jsx)(k, {
                              value: `recorrencia_barba`,
                              children: `Alerta de Retenção (Barba)`,
                            }),
                            (0, q.jsx)(k, {
                              value: `recorrencia_cabelo`,
                              children: `Alerta de Retenção (Cabelo)`,
                            }),
                            (0, q.jsx)(k, {
                              value: `no_show_3dias`,
                              children: `No-show após 3 dias`,
                            }),
                            (0, q.jsx)(k, { value: `other`, children: `Outros` }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, q.jsxs)(`div`, {
                  className: `space-y-2`,
                  children: [
                    (0, q.jsx)(O, { children: `Destinatários (Perfis)` }),
                    (0, q.jsx)(`div`, {
                      className: `flex gap-2 border p-3 rounded-md`,
                      children: [`Admin`, `Socio`, `Autonomo`].map((e) =>
                        (0, q.jsx)(
                          he,
                          {
                            variant: A.recipients.includes(e) ? `default` : `outline`,
                            className: `cursor-pointer`,
                            onClick: () => Oe(e),
                            children: e,
                          },
                          e,
                        ),
                      ),
                    }),
                  ],
                }),
                (0, q.jsxs)(`div`, {
                  className: `grid grid-cols-2 gap-4`,
                  children: [
                    (0, q.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, q.jsx)(O, { children: `Canal de Envio` }),
                        (0, q.jsxs)(D, {
                          value: A.channel,
                          onValueChange: (e) => j({ ...A, channel: e }),
                          children: [
                            (0, q.jsx)(S, { children: (0, q.jsx)(E, {}) }),
                            (0, q.jsxs)(x, {
                              children: [
                                (0, q.jsx)(k, { value: `internal`, children: `Sistema Interno` }),
                                (0, q.jsx)(k, { value: `whatsapp`, children: `WhatsApp` }),
                                (0, q.jsx)(k, { value: `email`, children: `Email` }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, q.jsxs)(`div`, {
                      className: `space-y-3`,
                      children: [
                        (0, q.jsx)(O, { children: `Tempo de Disparo (Offset)` }),
                        (0, q.jsxs)(`div`, {
                          className: `flex gap-4 mb-2`,
                          children: [
                            (0, q.jsxs)(`label`, {
                              className: `flex items-center gap-2 cursor-pointer`,
                              children: [
                                (0, q.jsx)(`input`, {
                                  type: `radio`,
                                  name: `timing_unit`,
                                  checked: A.timing_unit === `hours_minutes`,
                                  onChange: () => j({ ...A, timing_unit: `hours_minutes` }),
                                }),
                                (0, q.jsx)(`span`, {
                                  className: `text-sm`,
                                  children: `Horas/Minutos`,
                                }),
                              ],
                            }),
                            (0, q.jsxs)(`label`, {
                              className: `flex items-center gap-2 cursor-pointer`,
                              children: [
                                (0, q.jsx)(`input`, {
                                  type: `radio`,
                                  name: `timing_unit`,
                                  checked: A.timing_unit === `days`,
                                  onChange: () => j({ ...A, timing_unit: `days` }),
                                }),
                                (0, q.jsx)(`span`, { className: `text-sm`, children: `Dias` }),
                              ],
                            }),
                          ],
                        }),
                        A.timing_unit === `hours_minutes`
                          ? (0, q.jsxs)(`div`, {
                              className: `flex gap-2`,
                              children: [
                                (0, q.jsxs)(`div`, {
                                  className: `flex-1 space-y-1`,
                                  children: [
                                    (0, q.jsx)(O, { className: `text-xs`, children: `Horas` }),
                                    (0, q.jsx)(l, {
                                      type: `number`,
                                      min: `0`,
                                      value: A.timing_hours,
                                      onChange: (e) =>
                                        j({ ...A, timing_hours: Number(e.target.value) }),
                                    }),
                                  ],
                                }),
                                (0, q.jsxs)(`div`, {
                                  className: `flex-1 space-y-1`,
                                  children: [
                                    (0, q.jsx)(O, { className: `text-xs`, children: `Minutos` }),
                                    (0, q.jsx)(l, {
                                      type: `number`,
                                      min: `0`,
                                      max: `59`,
                                      value: A.timing_minutes,
                                      onChange: (e) =>
                                        j({ ...A, timing_minutes: Number(e.target.value) }),
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : (0, q.jsxs)(`div`, {
                              className: `space-y-1`,
                              children: [
                                (0, q.jsx)(O, { className: `text-xs`, children: `Dias` }),
                                (0, q.jsx)(l, {
                                  type: `number`,
                                  min: `0`,
                                  value: A.timing_days,
                                  onChange: (e) => j({ ...A, timing_days: Number(e.target.value) }),
                                }),
                              ],
                            }),
                      ],
                    }),
                  ],
                }),
                (0, q.jsxs)(`div`, {
                  className: `flex items-center space-x-2 pt-2`,
                  children: [
                    (0, q.jsx)(`input`, {
                      type: `checkbox`,
                      id: `is_active`,
                      checked: A.is_active,
                      onChange: (e) => j({ ...A, is_active: e.target.checked }),
                      className: `rounded border-gray-300 text-primary focus:ring-primary`,
                    }),
                    (0, q.jsx)(O, {
                      htmlFor: `is_active`,
                      className: `cursor-pointer`,
                      children: `Regra Ativa`,
                    }),
                  ],
                }),
              ],
            }),
            (0, q.jsx)(ne, {
              children: (0, q.jsx)(_, {
                onClick: Ee,
                className: `w-full sm:w-auto`,
                children: `Salvar Regra`,
              }),
            }),
          ],
        }),
      }),
    ],
  })
}
export { tt as default }
