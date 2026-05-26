import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import {
  A as r,
  D as i,
  O as a,
  U as o,
  V as s,
  dt as c,
  ft as l,
  gt as u,
  k as d,
  pt as f,
  ut as p,
} from './index-CHmnQ-gm.js'
var m = e(t(), 1),
  h = n(),
  g = `Tabs`,
  [_, v] = f(g, [d]),
  y = d(),
  [b, x] = _(g),
  S = m.forwardRef((e, t) => {
    let {
        __scopeTabs: n,
        value: i,
        onValueChange: a,
        defaultValue: o,
        orientation: c = `horizontal`,
        dir: u,
        activationMode: d = `automatic`,
        ...f
      } = e,
      m = r(u),
      [_, v] = p({ prop: i, onChange: a, defaultProp: o ?? ``, caller: g })
    return (0, h.jsx)(b, {
      scope: n,
      baseId: s(),
      value: _,
      onValueChange: v,
      orientation: c,
      dir: m,
      activationMode: d,
      children: (0, h.jsx)(l.div, { dir: m, 'data-orientation': c, ...f, ref: t }),
    })
  })
S.displayName = g
var C = `TabsList`,
  w = m.forwardRef((e, t) => {
    let { __scopeTabs: n, loop: r = !0, ...i } = e,
      o = x(C, n),
      s = y(n)
    return (0, h.jsx)(a, {
      asChild: !0,
      ...s,
      orientation: o.orientation,
      dir: o.dir,
      loop: r,
      children: (0, h.jsx)(l.div, {
        role: `tablist`,
        'aria-orientation': o.orientation,
        ...i,
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
      d = k(s.baseId, r),
      f = A(s.baseId, r),
      p = r === s.value
    return (0, h.jsx)(i, {
      asChild: !0,
      ...c,
      focusable: !a,
      active: p,
      children: (0, h.jsx)(l.button, {
        type: `button`,
        role: `tab`,
        'aria-selected': p,
        'aria-controls': f,
        'data-state': p ? `active` : `inactive`,
        'data-disabled': a ? `` : void 0,
        disabled: a,
        id: d,
        ...o,
        ref: t,
        onMouseDown: u(e.onMouseDown, (e) => {
          !a && e.button === 0 && e.ctrlKey === !1 ? s.onValueChange(r) : e.preventDefault()
        }),
        onKeyDown: u(e.onKeyDown, (e) => {
          ;[` `, `Enter`].includes(e.key) && s.onValueChange(r)
        }),
        onFocus: u(e.onFocus, () => {
          let e = s.activationMode !== `manual`
          !p && !a && e && s.onValueChange(r)
        }),
      }),
    })
  })
E.displayName = T
var D = `TabsContent`,
  O = m.forwardRef((e, t) => {
    let { __scopeTabs: n, value: r, forceMount: i, children: a, ...o } = e,
      s = x(D, n),
      u = k(s.baseId, r),
      d = A(s.baseId, r),
      f = r === s.value,
      p = m.useRef(f)
    return (
      m.useEffect(() => {
        let e = requestAnimationFrame(() => (p.current = !1))
        return () => cancelAnimationFrame(e)
      }, []),
      (0, h.jsx)(c, {
        present: i || f,
        children: ({ present: n }) =>
          (0, h.jsx)(l.div, {
            'data-state': f ? `active` : `inactive`,
            'data-orientation': s.orientation,
            role: `tabpanel`,
            'aria-labelledby': u,
            hidden: !n,
            id: d,
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
      className: o(
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
    className: o(
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
    className: o(
      `mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`,
      e,
    ),
    ...t,
  }),
)
R.displayName = P.displayName
export { L as i, R as n, I as r, F as t }
