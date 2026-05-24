import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import {
  D as r,
  E as i,
  J as a,
  K as o,
  O as s,
  dt as c,
  ft as l,
  ht as u,
  k as d,
  pt as f,
  vt as p,
} from './index-CXmOAr77.js'
var m = e(t(), 1),
  h = n(),
  g = `Tabs`,
  [_, v] = u(g, [s]),
  y = s(),
  [b, x] = _(g),
  S = m.forwardRef((e, t) => {
    let {
        __scopeTabs: n,
        value: r,
        onValueChange: i,
        defaultValue: a,
        orientation: s = `horizontal`,
        dir: l,
        activationMode: u = `automatic`,
        ...p
      } = e,
      m = d(l),
      [_, v] = c({ prop: r, onChange: i, defaultProp: a ?? ``, caller: g })
    return (0, h.jsx)(b, {
      scope: n,
      baseId: o(),
      value: _,
      onValueChange: v,
      orientation: s,
      dir: m,
      activationMode: u,
      children: (0, h.jsx)(f.div, { dir: m, 'data-orientation': s, ...p, ref: t }),
    })
  })
S.displayName = g
var C = `TabsList`,
  w = m.forwardRef((e, t) => {
    let { __scopeTabs: n, loop: i = !0, ...a } = e,
      o = x(C, n),
      s = y(n)
    return (0, h.jsx)(r, {
      asChild: !0,
      ...s,
      orientation: o.orientation,
      dir: o.dir,
      loop: i,
      children: (0, h.jsx)(f.div, {
        role: `tablist`,
        'aria-orientation': o.orientation,
        ...a,
        ref: t,
      }),
    })
  })
w.displayName = C
var T = `TabsTrigger`,
  E = m.forwardRef((e, t) => {
    let { __scopeTabs: n, value: r, disabled: a = !1, ...o } = e,
      s = x(T, n),
      c = y(n),
      l = k(s.baseId, r),
      u = A(s.baseId, r),
      d = r === s.value
    return (0, h.jsx)(i, {
      asChild: !0,
      ...c,
      focusable: !a,
      active: d,
      children: (0, h.jsx)(f.button, {
        type: `button`,
        role: `tab`,
        'aria-selected': d,
        'aria-controls': u,
        'data-state': d ? `active` : `inactive`,
        'data-disabled': a ? `` : void 0,
        disabled: a,
        id: l,
        ...o,
        ref: t,
        onMouseDown: p(e.onMouseDown, (e) => {
          !a && e.button === 0 && e.ctrlKey === !1 ? s.onValueChange(r) : e.preventDefault()
        }),
        onKeyDown: p(e.onKeyDown, (e) => {
          ;[` `, `Enter`].includes(e.key) && s.onValueChange(r)
        }),
        onFocus: p(e.onFocus, () => {
          let e = s.activationMode !== `manual`
          !d && !a && e && s.onValueChange(r)
        }),
      }),
    })
  })
E.displayName = T
var D = `TabsContent`,
  O = m.forwardRef((e, t) => {
    let { __scopeTabs: n, value: r, forceMount: i, children: a, ...o } = e,
      s = x(D, n),
      c = k(s.baseId, r),
      u = A(s.baseId, r),
      d = r === s.value,
      p = m.useRef(d)
    return (
      m.useEffect(() => {
        let e = requestAnimationFrame(() => (p.current = !1))
        return () => cancelAnimationFrame(e)
      }, []),
      (0, h.jsx)(l, {
        present: i || d,
        children: ({ present: n }) =>
          (0, h.jsx)(f.div, {
            'data-state': d ? `active` : `inactive`,
            'data-orientation': s.orientation,
            role: `tabpanel`,
            'aria-labelledby': c,
            hidden: !n,
            id: u,
            tabIndex: 0,
            ...o,
            ref: t,
            style: { ...e.style, animationDuration: p.current ? `0s` : void 0 },
            children: n && a,
          }),
      })
    )
  })
O.displayName = D
function k(e, t) {
  return `${e}-trigger-${t}`
}
function A(e, t) {
  return `${e}-content-${t}`
}
var j = S,
  M = w,
  N = E,
  P = O,
  F = j,
  I = m.forwardRef(({ className: e, ...t }, n) =>
    (0, h.jsx)(M, {
      ref: n,
      className: a(
        `inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground`,
        e,
      ),
      ...t,
    }),
  )
I.displayName = M.displayName
var L = m.forwardRef(({ className: e, ...t }, n) =>
  (0, h.jsx)(N, {
    ref: n,
    className: a(
      `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm`,
      e,
    ),
    ...t,
  }),
)
L.displayName = N.displayName
var R = m.forwardRef(({ className: e, ...t }, n) =>
  (0, h.jsx)(P, {
    ref: n,
    className: a(
      `mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`,
      e,
    ),
    ...t,
  }),
)
R.displayName = P.displayName
export { L as i, R as n, I as r, F as t }
