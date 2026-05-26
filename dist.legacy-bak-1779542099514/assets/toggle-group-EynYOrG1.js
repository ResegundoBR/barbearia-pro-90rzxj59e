import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import {
  D as r,
  E as i,
  J as a,
  O as o,
  ct as s,
  dt as c,
  ht as l,
  k as u,
  lt as d,
  pt as f,
  vt as p,
} from './index-Bf5nkyu_.js'
var m = s(`triangle-alert`, [
    [
      `path`,
      {
        d: `m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,
        key: `wmoenq`,
      },
    ],
    [`path`, { d: `M12 9v4`, key: `juzpu7` }],
    [`path`, { d: `M12 17h.01`, key: `p32p05` }],
  ]),
  h = e(t(), 1),
  g = n(),
  _ = `Toggle`,
  v = h.forwardRef((e, t) => {
    let { pressed: n, defaultPressed: r, onPressedChange: i, ...a } = e,
      [o, s] = c({ prop: n, onChange: i, defaultProp: r ?? !1, caller: _ })
    return (0, g.jsx)(f.button, {
      type: `button`,
      'aria-pressed': o,
      'data-state': o ? `on` : `off`,
      'data-disabled': e.disabled ? `` : void 0,
      ...a,
      ref: t,
      onClick: p(e.onClick, () => {
        e.disabled || s(!o)
      }),
    })
  })
v.displayName = _
var y = v,
  b = `ToggleGroup`,
  [x, S] = l(b, [o]),
  C = o(),
  w = h.forwardRef((e, t) => {
    let { type: n, ...r } = e
    if (n === `single`) return (0, g.jsx)(D, { ...r, ref: t })
    if (n === `multiple`) return (0, g.jsx)(O, { ...r, ref: t })
    throw Error(`Missing prop \`type\` expected on \`${b}\``)
  })
w.displayName = b
var [T, E] = x(b),
  D = h.forwardRef((e, t) => {
    let { value: n, defaultValue: r, onValueChange: i = () => {}, ...a } = e,
      [o, s] = c({ prop: n, defaultProp: r ?? ``, onChange: i, caller: b })
    return (0, g.jsx)(T, {
      scope: e.__scopeToggleGroup,
      type: `single`,
      value: h.useMemo(() => (o ? [o] : []), [o]),
      onItemActivate: s,
      onItemDeactivate: h.useCallback(() => s(``), [s]),
      children: (0, g.jsx)(j, { ...a, ref: t }),
    })
  }),
  O = h.forwardRef((e, t) => {
    let { value: n, defaultValue: r, onValueChange: i = () => {}, ...a } = e,
      [o, s] = c({ prop: n, defaultProp: r ?? [], onChange: i, caller: b }),
      l = h.useCallback((e) => s((t = []) => [...t, e]), [s]),
      u = h.useCallback((e) => s((t = []) => t.filter((t) => t !== e)), [s])
    return (0, g.jsx)(T, {
      scope: e.__scopeToggleGroup,
      type: `multiple`,
      value: o,
      onItemActivate: l,
      onItemDeactivate: u,
      children: (0, g.jsx)(j, { ...a, ref: t }),
    })
  })
w.displayName = b
var [k, A] = x(b),
  j = h.forwardRef((e, t) => {
    let {
        __scopeToggleGroup: n,
        disabled: i = !1,
        rovingFocus: a = !0,
        orientation: o,
        dir: s,
        loop: c = !0,
        ...l
      } = e,
      d = C(n),
      p = u(s),
      m = { role: `group`, dir: p, ...l }
    return (0, g.jsx)(k, {
      scope: n,
      rovingFocus: a,
      disabled: i,
      children: a
        ? (0, g.jsx)(r, {
            asChild: !0,
            ...d,
            orientation: o,
            dir: p,
            loop: c,
            children: (0, g.jsx)(f.div, { ...m, ref: t }),
          })
        : (0, g.jsx)(f.div, { ...m, ref: t }),
    })
  }),
  M = `ToggleGroupItem`,
  N = h.forwardRef((e, t) => {
    let n = E(M, e.__scopeToggleGroup),
      r = A(M, e.__scopeToggleGroup),
      a = C(e.__scopeToggleGroup),
      o = n.value.includes(e.value),
      s = r.disabled || e.disabled,
      c = { ...e, pressed: o, disabled: s },
      l = h.useRef(null)
    return r.rovingFocus
      ? (0, g.jsx)(i, {
          asChild: !0,
          ...a,
          focusable: !s,
          active: o,
          ref: l,
          children: (0, g.jsx)(P, { ...c, ref: t }),
        })
      : (0, g.jsx)(P, { ...c, ref: t })
  })
N.displayName = M
var P = h.forwardRef((e, t) => {
    let { __scopeToggleGroup: n, value: r, ...i } = e,
      a = E(M, n),
      o = { role: `radio`, 'aria-checked': e.pressed, 'aria-pressed': void 0 }
    return (0, g.jsx)(v, {
      ...(a.type === `single` ? o : void 0),
      ...i,
      ref: t,
      onPressedChange: (e) => {
        e ? a.onItemActivate(r) : a.onItemDeactivate(r)
      },
    })
  }),
  F = w,
  I = N,
  L = d(
    `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2`,
    {
      variants: {
        variant: {
          default: `bg-transparent`,
          outline: `border border-input bg-transparent hover:bg-accent hover:text-accent-foreground`,
        },
        size: { default: `h-10 px-3 min-w-10`, sm: `h-9 px-2.5 min-w-9`, lg: `h-11 px-5 min-w-11` },
      },
      defaultVariants: { variant: `default`, size: `default` },
    },
  ),
  R = h.forwardRef(({ className: e, variant: t, size: n, ...r }, i) =>
    (0, g.jsx)(y, { ref: i, className: a(L({ variant: t, size: n, className: e })), ...r }),
  )
R.displayName = y.displayName
var z = h.createContext({ size: `default`, variant: `default` }),
  B = h.forwardRef(({ className: e, variant: t, size: n, children: r, ...i }, o) =>
    (0, g.jsx)(F, {
      ref: o,
      className: a(`flex items-center justify-center gap-1`, e),
      ...i,
      children: (0, g.jsx)(z.Provider, { value: { variant: t, size: n }, children: r }),
    }),
  )
B.displayName = F.displayName
var V = h.forwardRef(({ className: e, children: t, variant: n, size: r, ...i }, o) => {
  let s = h.useContext(z)
  return (0, g.jsx)(I, {
    ref: o,
    className: a(L({ variant: s.variant || n, size: s.size || r }), e),
    ...i,
    children: t,
  })
})
V.displayName = I.displayName
export { V as n, m as r, B as t }
