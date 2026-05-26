import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import {
  G as r,
  J as i,
  _t as a,
  at as o,
  dt as s,
  ft as c,
  ht as l,
  m as u,
  pt as d,
  vt as f,
} from './index-Bf5nkyu_.js'
var p = e(t(), 1),
  m = n(),
  h = `Checkbox`,
  [g, _] = l(h),
  [v, y] = g(h)
function b(e) {
  let {
      __scopeCheckbox: t,
      checked: n,
      children: r,
      defaultChecked: i,
      disabled: a,
      form: o,
      name: c,
      onCheckedChange: l,
      required: u,
      value: d = `on`,
      internal_do_not_use_render: f,
    } = e,
    [g, _] = s({ prop: n, defaultProp: i ?? !1, onChange: l, caller: h }),
    [y, b] = p.useState(null),
    [x, S] = p.useState(null),
    C = p.useRef(!1),
    w = y ? !!o || !!y.closest(`form`) : !0,
    T = {
      checked: g,
      disabled: a,
      setChecked: _,
      control: y,
      setControl: b,
      name: c,
      form: o,
      value: d,
      hasConsumerStoppedPropagationRef: C,
      required: u,
      defaultChecked: k(i) ? !1 : i,
      isFormControl: w,
      bubbleInput: x,
      setBubbleInput: S,
    }
  return (0, m.jsx)(v, { scope: t, ...T, children: O(f) ? f(T) : r })
}
var x = `CheckboxTrigger`,
  S = p.forwardRef(({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, i) => {
    let {
        control: o,
        value: s,
        disabled: c,
        checked: l,
        required: u,
        setControl: h,
        setChecked: g,
        hasConsumerStoppedPropagationRef: _,
        isFormControl: v,
        bubbleInput: b,
      } = y(x, e),
      S = a(i, h),
      C = p.useRef(l)
    return (
      p.useEffect(() => {
        let e = o?.form
        if (e) {
          let t = () => g(C.current)
          return (e.addEventListener(`reset`, t), () => e.removeEventListener(`reset`, t))
        }
      }, [o, g]),
      (0, m.jsx)(d.button, {
        type: `button`,
        role: `checkbox`,
        'aria-checked': k(l) ? `mixed` : l,
        'aria-required': u,
        'data-state': A(l),
        'data-disabled': c ? `` : void 0,
        disabled: c,
        value: s,
        ...r,
        ref: S,
        onKeyDown: f(t, (e) => {
          e.key === `Enter` && e.preventDefault()
        }),
        onClick: f(n, (e) => {
          ;(g((e) => (k(e) ? !0 : !e)),
            b && v && ((_.current = e.isPropagationStopped()), _.current || e.stopPropagation()))
        }),
      })
    )
  })
S.displayName = x
var C = p.forwardRef((e, t) => {
  let {
    __scopeCheckbox: n,
    name: r,
    checked: i,
    defaultChecked: a,
    required: o,
    disabled: s,
    value: c,
    onCheckedChange: l,
    form: u,
    ...d
  } = e
  return (0, m.jsx)(b, {
    __scopeCheckbox: n,
    checked: i,
    defaultChecked: a,
    disabled: s,
    required: o,
    onCheckedChange: l,
    name: r,
    form: u,
    value: c,
    internal_do_not_use_render: ({ isFormControl: e }) =>
      (0, m.jsxs)(m.Fragment, {
        children: [
          (0, m.jsx)(S, { ...d, ref: t, __scopeCheckbox: n }),
          e && (0, m.jsx)(D, { __scopeCheckbox: n }),
        ],
      }),
  })
})
C.displayName = h
var w = `CheckboxIndicator`,
  T = p.forwardRef((e, t) => {
    let { __scopeCheckbox: n, forceMount: r, ...i } = e,
      a = y(w, n)
    return (0, m.jsx)(c, {
      present: r || k(a.checked) || a.checked === !0,
      children: (0, m.jsx)(d.span, {
        'data-state': A(a.checked),
        'data-disabled': a.disabled ? `` : void 0,
        ...i,
        ref: t,
        style: { pointerEvents: `none`, ...e.style },
      }),
    })
  })
T.displayName = w
var E = `CheckboxBubbleInput`,
  D = p.forwardRef(({ __scopeCheckbox: e, ...t }, n) => {
    let {
        control: i,
        hasConsumerStoppedPropagationRef: o,
        checked: s,
        defaultChecked: c,
        required: l,
        disabled: f,
        name: h,
        value: g,
        form: _,
        bubbleInput: v,
        setBubbleInput: b,
      } = y(E, e),
      x = a(n, b),
      S = u(s),
      C = r(i)
    p.useEffect(() => {
      let e = v
      if (!e) return
      let t = window.HTMLInputElement.prototype,
        n = Object.getOwnPropertyDescriptor(t, `checked`).set,
        r = !o.current
      if (S !== s && n) {
        let t = new Event(`click`, { bubbles: r })
        ;((e.indeterminate = k(s)), n.call(e, k(s) ? !1 : s), e.dispatchEvent(t))
      }
    }, [v, S, s, o])
    let w = p.useRef(k(s) ? !1 : s)
    return (0, m.jsx)(d.input, {
      type: `checkbox`,
      'aria-hidden': !0,
      defaultChecked: c ?? w.current,
      required: l,
      disabled: f,
      name: h,
      value: g,
      form: _,
      ...t,
      tabIndex: -1,
      ref: x,
      style: {
        ...t.style,
        ...C,
        position: `absolute`,
        pointerEvents: `none`,
        opacity: 0,
        margin: 0,
        transform: `translateX(-100%)`,
      },
    })
  })
D.displayName = E
function O(e) {
  return typeof e == `function`
}
function k(e) {
  return e === `indeterminate`
}
function A(e) {
  return k(e) ? `indeterminate` : e ? `checked` : `unchecked`
}
var j = p.forwardRef(({ className: e, ...t }, n) =>
  (0, m.jsx)(C, {
    ref: n,
    className: i(
      `peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground`,
      e,
    ),
    ...t,
    children: (0, m.jsx)(T, {
      className: i(`flex items-center justify-center text-current`),
      children: (0, m.jsx)(o, { className: `h-4 w-4` }),
    }),
  }),
)
j.displayName = C.displayName
export { j as t }
