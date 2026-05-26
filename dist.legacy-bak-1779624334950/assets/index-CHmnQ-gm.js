const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/Login-BMotmTfT.js',
      'assets/jsx-runtime-m7G7yzlP.js',
      'assets/circle-alert-k-OsdNmx.js',
      'assets/card-DHbyifQZ.js',
      'assets/RecuperarSenha-DtCS3SUu.js',
      'assets/circle-check-CN_bbvmP.js',
      'assets/Index-5qTMb0v4.js',
      'assets/progress-Dbv_Mm3H.js',
      'assets/tabs-D0cNoDYu.js',
      'assets/toggle-group-CgKlvgUY.js',
      'assets/format-BUAFcs3P.js',
      'assets/startOfMonth-Dtw_Bedr.js',
      'assets/endOfWeek-CvLSnSUY.js',
      'assets/pt-BR-DgoESwTe.js',
      'assets/clock-UGD0Uw80.js',
      'assets/dollar-sign-Vxpsvwbg.js',
      'assets/badge-C1-D0eUj.js',
      'assets/table-C_vNdqXn.js',
      'assets/api-Zu_OBWUL.js',
      'assets/Agenda-Dmxe8SSj.js',
      'assets/calendar-CWpMgv7L.js',
      'assets/subDays-BvwDtwKl.js',
      'assets/calendar-DnDD-UYg.js',
      'assets/pen-wVlnz4du.js',
      'assets/plus-JF1OlTCr.js',
      'assets/scissors-CF2dCbcK.js',
      'assets/errors-CkAloMCx.js',
      'assets/Clientes-CyLN5AJK.js',
      'assets/switch-CgEkKv2C.js',
      'assets/eye-D9fW5TjU.js',
      'assets/ImportDialog-B_V_6ez4.js',
      'assets/square-pen-Co30ePO_.js',
      'assets/ClienteDetail-DwyB9cb7.js',
      'assets/arrow-left-DdpNmNLk.js',
      'assets/Estoque-Kaz3JeSb.js',
      'assets/Checkout-Csx1Rtf5.js',
      'assets/trash-2-CTdukVHF.js',
      'assets/Staff-Dja8RVPM.js',
      'assets/checkbox-Ck8FRrCX.js',
      'assets/Settings-Ct8jVHuF.js',
      'assets/Users-s_RTRIik.js',
      'assets/Financeiro--OiGoda8.js',
      'assets/ProdutosCategorias-DQjAXKCM.js',
      'assets/categories-DLbOPAME.js',
      'assets/Fornecedores-CTUzGguU.js',
      'assets/FornecedorDetail-BKP5FlbY.js',
      'assets/NotFound-DzQBMWdM.js',
    ]),
) => i.map((i) => d[i])
import { a as e, n as t, r as n, t as r } from './jsx-runtime-m7G7yzlP.js'
;(function () {
  let e = document.createElement(`link`).relList
  if (e && e.supports && e.supports(`modulepreload`)) return
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e)
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes) e.tagName === `LINK` && e.rel === `modulepreload` && n(e)
  }).observe(document, { childList: !0, subtree: !0 })
  function t(e) {
    let t = {}
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
          ? (t.credentials = `omit`)
          : (t.credentials = `same-origin`),
      t
    )
  }
  function n(e) {
    if (e.ep) return
    e.ep = !0
    let n = t(e)
    fetch(e.href, n)
  }
})()
var i = n((e) => {
    function t(e, t) {
      var n = e.length
      e.push(t)
      a: for (; 0 < n; ) {
        var r = (n - 1) >>> 1,
          a = e[r]
        if (0 < i(a, t)) ((e[r] = t), (e[n] = a), (n = r))
        else break a
      }
    }
    function n(e) {
      return e.length === 0 ? null : e[0]
    }
    function r(e) {
      if (e.length === 0) return null
      var t = e[0],
        n = e.pop()
      if (n !== t) {
        e[0] = n
        a: for (var r = 0, a = e.length, o = a >>> 1; r < o; ) {
          var s = 2 * (r + 1) - 1,
            c = e[s],
            l = s + 1,
            u = e[l]
          if (0 > i(c, n))
            l < a && 0 > i(u, c)
              ? ((e[r] = u), (e[l] = n), (r = l))
              : ((e[r] = c), (e[s] = n), (r = s))
          else if (l < a && 0 > i(u, n)) ((e[r] = u), (e[l] = n), (r = l))
          else break a
        }
      }
      return t
    }
    function i(e, t) {
      var n = e.sortIndex - t.sortIndex
      return n === 0 ? e.id - t.id : n
    }
    if (
      ((e.unstable_now = void 0),
      typeof performance == `object` && typeof performance.now == `function`)
    ) {
      var a = performance
      e.unstable_now = function () {
        return a.now()
      }
    } else {
      var o = Date,
        s = o.now()
      e.unstable_now = function () {
        return o.now() - s
      }
    }
    var c = [],
      l = [],
      u = 1,
      d = null,
      f = 3,
      p = !1,
      m = !1,
      h = !1,
      g = !1,
      _ = typeof setTimeout == `function` ? setTimeout : null,
      v = typeof clearTimeout == `function` ? clearTimeout : null,
      y = typeof setImmediate < `u` ? setImmediate : null
    function b(e) {
      for (var i = n(l); i !== null; ) {
        if (i.callback === null) r(l)
        else if (i.startTime <= e) (r(l), (i.sortIndex = i.expirationTime), t(c, i))
        else break
        i = n(l)
      }
    }
    function x(e) {
      if (((h = !1), b(e), !m))
        if (n(c) !== null) ((m = !0), S || ((S = !0), O()))
        else {
          var t = n(l)
          t !== null && j(x, t.startTime - e)
        }
    }
    var S = !1,
      C = -1,
      w = 5,
      T = -1
    function E() {
      return g ? !0 : !(e.unstable_now() - T < w)
    }
    function D() {
      if (((g = !1), S)) {
        var t = e.unstable_now()
        T = t
        var i = !0
        try {
          a: {
            ;((m = !1), h && ((h = !1), v(C), (C = -1)), (p = !0))
            var a = f
            try {
              b: {
                for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E()); ) {
                  var o = d.callback
                  if (typeof o == `function`) {
                    ;((d.callback = null), (f = d.priorityLevel))
                    var s = o(d.expirationTime <= t)
                    if (((t = e.unstable_now()), typeof s == `function`)) {
                      ;((d.callback = s), b(t), (i = !0))
                      break b
                    }
                    ;(d === n(c) && r(c), b(t))
                  } else r(c)
                  d = n(c)
                }
                if (d !== null) i = !0
                else {
                  var u = n(l)
                  ;(u !== null && j(x, u.startTime - t), (i = !1))
                }
              }
              break a
            } finally {
              ;((d = null), (f = a), (p = !1))
            }
            i = void 0
          }
        } finally {
          i ? O() : (S = !1)
        }
      }
    }
    var O
    if (typeof y == `function`)
      O = function () {
        y(D)
      }
    else if (typeof MessageChannel < `u`) {
      var k = new MessageChannel(),
        A = k.port2
      ;((k.port1.onmessage = D),
        (O = function () {
          A.postMessage(null)
        }))
    } else
      O = function () {
        _(D, 0)
      }
    function j(t, n) {
      C = _(function () {
        t(e.unstable_now())
      }, n)
    }
    ;((e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (e) {
        e.callback = null
      }),
      (e.unstable_forceFrameRate = function (e) {
        0 > e || 125 < e
          ? console.error(
              `forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`,
            )
          : (w = 0 < e ? Math.floor(1e3 / e) : 5)
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return f
      }),
      (e.unstable_next = function (e) {
        switch (f) {
          case 1:
          case 2:
          case 3:
            var t = 3
            break
          default:
            t = f
        }
        var n = f
        f = t
        try {
          return e()
        } finally {
          f = n
        }
      }),
      (e.unstable_requestPaint = function () {
        g = !0
      }),
      (e.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break
          default:
            e = 3
        }
        var n = f
        f = e
        try {
          return t()
        } finally {
          f = n
        }
      }),
      (e.unstable_scheduleCallback = function (r, i, a) {
        var o = e.unstable_now()
        switch (
          (typeof a == `object` && a
            ? ((a = a.delay), (a = typeof a == `number` && 0 < a ? o + a : o))
            : (a = o),
          r)
        ) {
          case 1:
            var s = -1
            break
          case 2:
            s = 250
            break
          case 5:
            s = 1073741823
            break
          case 4:
            s = 1e4
            break
          default:
            s = 5e3
        }
        return (
          (s = a + s),
          (r = {
            id: u++,
            callback: i,
            priorityLevel: r,
            startTime: a,
            expirationTime: s,
            sortIndex: -1,
          }),
          a > o
            ? ((r.sortIndex = a),
              t(l, r),
              n(c) === null && r === n(l) && (h ? (v(C), (C = -1)) : (h = !0), j(x, a - o)))
            : ((r.sortIndex = s), t(c, r), m || p || ((m = !0), S || ((S = !0), O()))),
          r
        )
      }),
      (e.unstable_shouldYield = E),
      (e.unstable_wrapCallback = function (e) {
        var t = f
        return function () {
          var n = f
          f = t
          try {
            return e.apply(this, arguments)
          } finally {
            f = n
          }
        }
      }))
  }),
  a = n((e, t) => {
    t.exports = i()
  }),
  o = n((e) => {
    var n = t()
    function r(e) {
      var t = `https://react.dev/errors/` + e
      if (1 < arguments.length) {
        t += `?args[]=` + encodeURIComponent(arguments[1])
        for (var n = 2; n < arguments.length; n++)
          t += `&args[]=` + encodeURIComponent(arguments[n])
      }
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      )
    }
    function i() {}
    var a = {
        d: {
          f: i,
          r: function () {
            throw Error(r(522))
          },
          D: i,
          C: i,
          L: i,
          m: i,
          X: i,
          S: i,
          M: i,
        },
        p: 0,
        findDOMNode: null,
      },
      o = Symbol.for(`react.portal`)
    function s(e, t, n) {
      var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
      return {
        $$typeof: o,
        key: r == null ? null : `` + r,
        children: e,
        containerInfo: t,
        implementation: n,
      }
    }
    var c = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
    function l(e, t) {
      if (e === `font`) return ``
      if (typeof t == `string`) return t === `use-credentials` ? t : ``
    }
    ;((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a),
      (e.createPortal = function (e, t) {
        var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
        if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)) throw Error(r(299))
        return s(e, t, null, n)
      }),
      (e.flushSync = function (e) {
        var t = c.T,
          n = a.p
        try {
          if (((c.T = null), (a.p = 2), e)) return e()
        } finally {
          ;((c.T = t), (a.p = n), a.d.f())
        }
      }),
      (e.preconnect = function (e, t) {
        typeof e == `string` &&
          (t
            ? ((t = t.crossOrigin),
              (t = typeof t == `string` ? (t === `use-credentials` ? t : ``) : void 0))
            : (t = null),
          a.d.C(e, t))
      }),
      (e.prefetchDNS = function (e) {
        typeof e == `string` && a.d.D(e)
      }),
      (e.preinit = function (e, t) {
        if (typeof e == `string` && t && typeof t.as == `string`) {
          var n = t.as,
            r = l(n, t.crossOrigin),
            i = typeof t.integrity == `string` ? t.integrity : void 0,
            o = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0
          n === `style`
            ? a.d.S(e, typeof t.precedence == `string` ? t.precedence : void 0, {
                crossOrigin: r,
                integrity: i,
                fetchPriority: o,
              })
            : n === `script` &&
              a.d.X(e, {
                crossOrigin: r,
                integrity: i,
                fetchPriority: o,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              })
        }
      }),
      (e.preinitModule = function (e, t) {
        if (typeof e == `string`)
          if (typeof t == `object` && t) {
            if (t.as == null || t.as === `script`) {
              var n = l(t.as, t.crossOrigin)
              a.d.M(e, {
                crossOrigin: n,
                integrity: typeof t.integrity == `string` ? t.integrity : void 0,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              })
            }
          } else t ?? a.d.M(e)
      }),
      (e.preload = function (e, t) {
        if (typeof e == `string` && typeof t == `object` && t && typeof t.as == `string`) {
          var n = t.as,
            r = l(n, t.crossOrigin)
          a.d.L(e, n, {
            crossOrigin: r,
            integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            nonce: typeof t.nonce == `string` ? t.nonce : void 0,
            type: typeof t.type == `string` ? t.type : void 0,
            fetchPriority: typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
            referrerPolicy: typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
            imageSrcSet: typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
            imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : void 0,
            media: typeof t.media == `string` ? t.media : void 0,
          })
        }
      }),
      (e.preloadModule = function (e, t) {
        if (typeof e == `string`)
          if (t) {
            var n = l(t.as, t.crossOrigin)
            a.d.m(e, {
              as: typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
              crossOrigin: n,
              integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            })
          } else a.d.m(e)
      }),
      (e.requestFormReset = function (e) {
        a.d.r(e)
      }),
      (e.unstable_batchedUpdates = function (e, t) {
        return e(t)
      }),
      (e.useFormState = function (e, t, n) {
        return c.H.useFormState(e, t, n)
      }),
      (e.useFormStatus = function () {
        return c.H.useHostTransitionStatus()
      }),
      (e.version = `19.2.5`))
  }),
  s = n((e, t) => {
    function n() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)
        } catch (e) {
          console.error(e)
        }
    }
    ;(n(), (t.exports = o()))
  }),
  c = n((e) => {
    var n = a(),
      r = t(),
      i = s()
    function o(e) {
      var t = `https://react.dev/errors/` + e
      if (1 < arguments.length) {
        t += `?args[]=` + encodeURIComponent(arguments[1])
        for (var n = 2; n < arguments.length; n++)
          t += `&args[]=` + encodeURIComponent(arguments[n])
      }
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      )
    }
    function c(e) {
      return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
    }
    function l(e) {
      var t = e,
        n = e
      if (e.alternate) for (; t.return; ) t = t.return
      else {
        e = t
        do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return))
        while (e)
      }
      return t.tag === 3 ? n : null
    }
    function u(e) {
      if (e.tag === 13) {
        var t = e.memoizedState
        if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
          return t.dehydrated
      }
      return null
    }
    function d(e) {
      if (e.tag === 31) {
        var t = e.memoizedState
        if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
          return t.dehydrated
      }
      return null
    }
    function f(e) {
      if (l(e) !== e) throw Error(o(188))
    }
    function p(e) {
      var t = e.alternate
      if (!t) {
        if (((t = l(e)), t === null)) throw Error(o(188))
        return t === e ? e : null
      }
      for (var n = e, r = t; ; ) {
        var i = n.return
        if (i === null) break
        var a = i.alternate
        if (a === null) {
          if (((r = i.return), r !== null)) {
            n = r
            continue
          }
          break
        }
        if (i.child === a.child) {
          for (a = i.child; a; ) {
            if (a === n) return (f(i), e)
            if (a === r) return (f(i), t)
            a = a.sibling
          }
          throw Error(o(188))
        }
        if (n.return !== r.return) ((n = i), (r = a))
        else {
          for (var s = !1, c = i.child; c; ) {
            if (c === n) {
              ;((s = !0), (n = i), (r = a))
              break
            }
            if (c === r) {
              ;((s = !0), (r = i), (n = a))
              break
            }
            c = c.sibling
          }
          if (!s) {
            for (c = a.child; c; ) {
              if (c === n) {
                ;((s = !0), (n = a), (r = i))
                break
              }
              if (c === r) {
                ;((s = !0), (r = a), (n = i))
                break
              }
              c = c.sibling
            }
            if (!s) throw Error(o(189))
          }
        }
        if (n.alternate !== r) throw Error(o(190))
      }
      if (n.tag !== 3) throw Error(o(188))
      return n.stateNode.current === n ? e : t
    }
    function m(e) {
      var t = e.tag
      if (t === 5 || t === 26 || t === 27 || t === 6) return e
      for (e = e.child; e !== null; ) {
        if (((t = m(e)), t !== null)) return t
        e = e.sibling
      }
      return null
    }
    var h = Object.assign,
      g = Symbol.for(`react.element`),
      _ = Symbol.for(`react.transitional.element`),
      v = Symbol.for(`react.portal`),
      y = Symbol.for(`react.fragment`),
      b = Symbol.for(`react.strict_mode`),
      x = Symbol.for(`react.profiler`),
      S = Symbol.for(`react.consumer`),
      C = Symbol.for(`react.context`),
      w = Symbol.for(`react.forward_ref`),
      T = Symbol.for(`react.suspense`),
      E = Symbol.for(`react.suspense_list`),
      D = Symbol.for(`react.memo`),
      O = Symbol.for(`react.lazy`),
      k = Symbol.for(`react.activity`),
      A = Symbol.for(`react.memo_cache_sentinel`),
      j = Symbol.iterator
    function ee(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (j && e[j]) || e[`@@iterator`]), typeof e == `function` ? e : null)
    }
    var te = Symbol.for(`react.client.reference`)
    function ne(e) {
      if (e == null) return null
      if (typeof e == `function`) return e.$$typeof === te ? null : e.displayName || e.name || null
      if (typeof e == `string`) return e
      switch (e) {
        case y:
          return `Fragment`
        case x:
          return `Profiler`
        case b:
          return `StrictMode`
        case T:
          return `Suspense`
        case E:
          return `SuspenseList`
        case k:
          return `Activity`
      }
      if (typeof e == `object`)
        switch (e.$$typeof) {
          case v:
            return `Portal`
          case C:
            return e.displayName || `Context`
          case S:
            return (e._context.displayName || `Context`) + `.Consumer`
          case w:
            var t = e.render
            return (
              (e = e.displayName),
              (e ||=
                ((e = t.displayName || t.name || ``),
                e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
              e
            )
          case D:
            return ((t = e.displayName || null), t === null ? ne(e.type) || `Memo` : t)
          case O:
            ;((t = e._payload), (e = e._init))
            try {
              return ne(e(t))
            } catch {}
        }
      return null
    }
    var M = Array.isArray,
      N = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      P = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      re = { pending: !1, data: null, method: null, action: null },
      ie = [],
      ae = -1
    function oe(e) {
      return { current: e }
    }
    function se(e) {
      0 > ae || ((e.current = ie[ae]), (ie[ae] = null), ae--)
    }
    function F(e, t) {
      ;(ae++, (ie[ae] = e.current), (e.current = t))
    }
    var ce = oe(null),
      le = oe(null),
      ue = oe(null),
      de = oe(null)
    function fe(e, t) {
      switch ((F(ue, t), F(le, e), F(ce, null), t.nodeType)) {
        case 9:
        case 11:
          e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0
          break
        default:
          if (((e = t.tagName), (t = t.namespaceURI))) ((t = Vd(t)), (e = Hd(t, e)))
          else
            switch (e) {
              case `svg`:
                e = 1
                break
              case `math`:
                e = 2
                break
              default:
                e = 0
            }
      }
      ;(se(ce), F(ce, e))
    }
    function pe() {
      ;(se(ce), se(le), se(ue))
    }
    function me(e) {
      e.memoizedState !== null && F(de, e)
      var t = ce.current,
        n = Hd(t, e.type)
      t !== n && (F(le, e), F(ce, n))
    }
    function he(e) {
      ;(le.current === e && (se(ce), se(le)), de.current === e && (se(de), (Qf._currentValue = re)))
    }
    var ge, _e
    function ve(e) {
      if (ge === void 0)
        try {
          throw Error()
        } catch (e) {
          var t = e.stack.trim().match(/\n( *(at )?)/)
          ;((ge = (t && t[1]) || ``),
            (_e =
              -1 <
              e.stack.indexOf(`
    at`)
                ? ` (<anonymous>)`
                : -1 < e.stack.indexOf(`@`)
                  ? `@unknown:0:0`
                  : ``))
        }
      return (
        `
` +
        ge +
        e +
        _e
      )
    }
    var ye = !1
    function be(e, t) {
      if (!e || ye) return ``
      ye = !0
      var n = Error.prepareStackTrace
      Error.prepareStackTrace = void 0
      try {
        var r = {
          DetermineComponentFrameRoot: function () {
            try {
              if (t) {
                var n = function () {
                  throw Error()
                }
                if (
                  (Object.defineProperty(n.prototype, `props`, {
                    set: function () {
                      throw Error()
                    },
                  }),
                  typeof Reflect == `object` && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(n, [])
                  } catch (e) {
                    var r = e
                  }
                  Reflect.construct(e, [], n)
                } else {
                  try {
                    n.call()
                  } catch (e) {
                    r = e
                  }
                  e.call(n.prototype)
                }
              } else {
                try {
                  throw Error()
                } catch (e) {
                  r = e
                }
                ;(n = e()) && typeof n.catch == `function` && n.catch(function () {})
              }
            } catch (e) {
              if (e && r && typeof e.stack == `string`) return [e.stack, r.stack]
            }
            return [null, null]
          },
        }
        r.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`
        var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, `name`)
        i &&
          i.configurable &&
          Object.defineProperty(r.DetermineComponentFrameRoot, `name`, {
            value: `DetermineComponentFrameRoot`,
          })
        var a = r.DetermineComponentFrameRoot(),
          o = a[0],
          s = a[1]
        if (o && s) {
          var c = o.split(`
`),
            l = s.split(`
`)
          for (i = r = 0; r < c.length && !c[r].includes(`DetermineComponentFrameRoot`); ) r++
          for (; i < l.length && !l[i].includes(`DetermineComponentFrameRoot`); ) i++
          if (r === c.length || i === l.length)
            for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i]; ) i--
          for (; 1 <= r && 0 <= i; r--, i--)
            if (c[r] !== l[i]) {
              if (r !== 1 || i !== 1)
                do
                  if ((r--, i--, 0 > i || c[r] !== l[i])) {
                    var u =
                      `
` + c[r].replace(` at new `, ` at `)
                    return (
                      e.displayName &&
                        u.includes(`<anonymous>`) &&
                        (u = u.replace(`<anonymous>`, e.displayName)),
                      u
                    )
                  }
                while (1 <= r && 0 <= i)
              break
            }
        }
      } finally {
        ;((ye = !1), (Error.prepareStackTrace = n))
      }
      return (n = e ? e.displayName || e.name : ``) ? ve(n) : ``
    }
    function xe(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return ve(e.type)
        case 16:
          return ve(`Lazy`)
        case 13:
          return e.child !== t && t !== null ? ve(`Suspense Fallback`) : ve(`Suspense`)
        case 19:
          return ve(`SuspenseList`)
        case 0:
        case 15:
          return be(e.type, !1)
        case 11:
          return be(e.type.render, !1)
        case 1:
          return be(e.type, !0)
        case 31:
          return ve(`Activity`)
        default:
          return ``
      }
    }
    function Se(e) {
      try {
        var t = ``,
          n = null
        do ((t += xe(e, n)), (n = e), (e = e.return))
        while (e)
        return t
      } catch (e) {
        return (
          `
Error generating stack: ` +
          e.message +
          `
` +
          e.stack
        )
      }
    }
    var Ce = Object.prototype.hasOwnProperty,
      we = n.unstable_scheduleCallback,
      Te = n.unstable_cancelCallback,
      Ee = n.unstable_shouldYield,
      De = n.unstable_requestPaint,
      Oe = n.unstable_now,
      ke = n.unstable_getCurrentPriorityLevel,
      Ae = n.unstable_ImmediatePriority,
      je = n.unstable_UserBlockingPriority,
      Me = n.unstable_NormalPriority,
      Ne = n.unstable_LowPriority,
      Pe = n.unstable_IdlePriority,
      Fe = n.log,
      Ie = n.unstable_setDisableYieldValue,
      Le = null,
      Re = null
    function ze(e) {
      if ((typeof Fe == `function` && Ie(e), Re && typeof Re.setStrictMode == `function`))
        try {
          Re.setStrictMode(Le, e)
        } catch {}
    }
    var Be = Math.clz32 ? Math.clz32 : Ue,
      Ve = Math.log,
      He = Math.LN2
    function Ue(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((Ve(e) / He) | 0)) | 0)
    }
    var We = 256,
      Ge = 262144,
      Ke = 4194304
    function qe(e) {
      var t = e & 42
      if (t !== 0) return t
      switch (e & -e) {
        case 1:
          return 1
        case 2:
          return 2
        case 4:
          return 4
        case 8:
          return 8
        case 16:
          return 16
        case 32:
          return 32
        case 64:
          return 64
        case 128:
          return 128
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return e & 261888
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 3932160
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560
        case 67108864:
          return 67108864
        case 134217728:
          return 134217728
        case 268435456:
          return 268435456
        case 536870912:
          return 536870912
        case 1073741824:
          return 0
        default:
          return e
      }
    }
    function Je(e, t, n) {
      var r = e.pendingLanes
      if (r === 0) return 0
      var i = 0,
        a = e.suspendedLanes,
        o = e.pingedLanes
      e = e.warmLanes
      var s = r & 134217727
      return (
        s === 0
          ? ((s = r & ~a),
            s === 0
              ? o === 0
                ? n || ((n = r & ~e), n !== 0 && (i = qe(n)))
                : (i = qe(o))
              : (i = qe(s)))
          : ((r = s & ~a),
            r === 0
              ? ((o &= s), o === 0 ? n || ((n = s & ~e), n !== 0 && (i = qe(n))) : (i = qe(o)))
              : (i = qe(r))),
        i === 0
          ? 0
          : t !== 0 &&
              t !== i &&
              (t & a) === 0 &&
              ((a = i & -i), (n = t & -t), a >= n || (a === 32 && n & 4194048))
            ? t
            : i
      )
    }
    function Ye(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
    }
    function Xe(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1
        default:
          return -1
      }
    }
    function Ze() {
      var e = Ke
      return ((Ke <<= 1), !(Ke & 62914560) && (Ke = 4194304), e)
    }
    function Qe(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e)
      return t
    }
    function $e(e, t) {
      ;((e.pendingLanes |= t),
        t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)))
    }
    function et(e, t, n, r, i, a) {
      var o = e.pendingLanes
      ;((e.pendingLanes = n),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.warmLanes = 0),
        (e.expiredLanes &= n),
        (e.entangledLanes &= n),
        (e.errorRecoveryDisabledLanes &= n),
        (e.shellSuspendCounter = 0))
      var s = e.entanglements,
        c = e.expirationTimes,
        l = e.hiddenUpdates
      for (n = o & ~n; 0 < n; ) {
        var u = 31 - Be(n),
          d = 1 << u
        ;((s[u] = 0), (c[u] = -1))
        var f = l[u]
        if (f !== null)
          for (l[u] = null, u = 0; u < f.length; u++) {
            var p = f[u]
            p !== null && (p.lane &= -536870913)
          }
        n &= ~d
      }
      ;(r !== 0 && tt(e, r, 0),
        a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t)))
    }
    function tt(e, t, n) {
      ;((e.pendingLanes |= t), (e.suspendedLanes &= ~t))
      var r = 31 - Be(t)
      ;((e.entangledLanes |= t),
        (e.entanglements[r] = e.entanglements[r] | 1073741824 | (n & 261930)))
    }
    function nt(e, t) {
      var n = (e.entangledLanes |= t)
      for (e = e.entanglements; n; ) {
        var r = 31 - Be(n),
          i = 1 << r
        ;((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i))
      }
    }
    function rt(e, t) {
      var n = t & -t
      return ((n = n & 42 ? 1 : it(n)), (n & (e.suspendedLanes | t)) === 0 ? n : 0)
    }
    function it(e) {
      switch (e) {
        case 2:
          e = 1
          break
        case 8:
          e = 4
          break
        case 32:
          e = 16
          break
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          e = 128
          break
        case 268435456:
          e = 134217728
          break
        default:
          e = 0
      }
      return e
    }
    function at(e) {
      return ((e &= -e), 2 < e ? (8 < e ? (e & 134217727 ? 32 : 268435456) : 8) : 2)
    }
    function ot() {
      var e = P.p
      return e === 0 ? ((e = window.event), e === void 0 ? 32 : mp(e.type)) : e
    }
    function st(e, t) {
      var n = P.p
      try {
        return ((P.p = e), t())
      } finally {
        P.p = n
      }
    }
    var ct = Math.random().toString(36).slice(2),
      lt = `__reactFiber$` + ct,
      ut = `__reactProps$` + ct,
      dt = `__reactContainer$` + ct,
      ft = `__reactEvents$` + ct,
      pt = `__reactListeners$` + ct,
      mt = `__reactHandles$` + ct,
      ht = `__reactResources$` + ct,
      gt = `__reactMarker$` + ct
    function _t(e) {
      ;(delete e[lt], delete e[ut], delete e[ft], delete e[pt], delete e[mt])
    }
    function vt(e) {
      var t = e[lt]
      if (t) return t
      for (var n = e.parentNode; n; ) {
        if ((t = n[dt] || n[lt])) {
          if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
            for (e = df(e); e !== null; ) {
              if ((n = e[lt])) return n
              e = df(e)
            }
          return t
        }
        ;((e = n), (n = e.parentNode))
      }
      return null
    }
    function yt(e) {
      if ((e = e[lt] || e[dt])) {
        var t = e.tag
        if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e
      }
      return null
    }
    function bt(e) {
      var t = e.tag
      if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode
      throw Error(o(33))
    }
    function xt(e) {
      var t = e[ht]
      return ((t ||= e[ht] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t)
    }
    function St(e) {
      e[gt] = !0
    }
    var Ct = new Set(),
      wt = {}
    function Tt(e, t) {
      ;(Et(e, t), Et(e + `Capture`, t))
    }
    function Et(e, t) {
      for (wt[e] = t, e = 0; e < t.length; e++) Ct.add(t[e])
    }
    var Dt = RegExp(
        `^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`,
      ),
      Ot = {},
      kt = {}
    function At(e) {
      return Ce.call(kt, e)
        ? !0
        : Ce.call(Ot, e)
          ? !1
          : Dt.test(e)
            ? (kt[e] = !0)
            : ((Ot[e] = !0), !1)
    }
    function jt(e, t, n) {
      if (At(t))
        if (n === null) e.removeAttribute(t)
        else {
          switch (typeof n) {
            case `undefined`:
            case `function`:
            case `symbol`:
              e.removeAttribute(t)
              return
            case `boolean`:
              var r = t.toLowerCase().slice(0, 5)
              if (r !== `data-` && r !== `aria-`) {
                e.removeAttribute(t)
                return
              }
          }
          e.setAttribute(t, `` + n)
        }
    }
    function Mt(e, t, n) {
      if (n === null) e.removeAttribute(t)
      else {
        switch (typeof n) {
          case `undefined`:
          case `function`:
          case `symbol`:
          case `boolean`:
            e.removeAttribute(t)
            return
        }
        e.setAttribute(t, `` + n)
      }
    }
    function Nt(e, t, n, r) {
      if (r === null) e.removeAttribute(n)
      else {
        switch (typeof r) {
          case `undefined`:
          case `function`:
          case `symbol`:
          case `boolean`:
            e.removeAttribute(n)
            return
        }
        e.setAttributeNS(t, n, `` + r)
      }
    }
    function Pt(e) {
      switch (typeof e) {
        case `bigint`:
        case `boolean`:
        case `number`:
        case `string`:
        case `undefined`:
          return e
        case `object`:
          return e
        default:
          return ``
      }
    }
    function Ft(e) {
      var t = e.type
      return (e = e.nodeName) && e.toLowerCase() === `input` && (t === `checkbox` || t === `radio`)
    }
    function It(e, t, n) {
      var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
      if (
        !e.hasOwnProperty(t) &&
        r !== void 0 &&
        typeof r.get == `function` &&
        typeof r.set == `function`
      ) {
        var i = r.get,
          a = r.set
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return i.call(this)
            },
            set: function (e) {
              ;((n = `` + e), a.call(this, e))
            },
          }),
          Object.defineProperty(e, t, { enumerable: r.enumerable }),
          {
            getValue: function () {
              return n
            },
            setValue: function (e) {
              n = `` + e
            },
            stopTracking: function () {
              ;((e._valueTracker = null), delete e[t])
            },
          }
        )
      }
    }
    function Lt(e) {
      if (!e._valueTracker) {
        var t = Ft(e) ? `checked` : `value`
        e._valueTracker = It(e, t, `` + e[t])
      }
    }
    function Rt(e) {
      if (!e) return !1
      var t = e._valueTracker
      if (!t) return !0
      var n = t.getValue(),
        r = ``
      return (
        e && (r = Ft(e) ? (e.checked ? `true` : `false`) : e.value),
        (e = r),
        e === n ? !1 : (t.setValue(e), !0)
      )
    }
    function zt(e) {
      if (((e ||= typeof document < `u` ? document : void 0), e === void 0)) return null
      try {
        return e.activeElement || e.body
      } catch {
        return e.body
      }
    }
    var Bt = /[\n"\\]/g
    function Vt(e) {
      return e.replace(Bt, function (e) {
        return `\\` + e.charCodeAt(0).toString(16) + ` `
      })
    }
    function Ht(e, t, n, r, i, a, o, s) {
      ;((e.name = ``),
        o != null && typeof o != `function` && typeof o != `symbol` && typeof o != `boolean`
          ? (e.type = o)
          : e.removeAttribute(`type`),
        t == null
          ? (o !== `submit` && o !== `reset`) || e.removeAttribute(`value`)
          : o === `number`
            ? ((t === 0 && e.value === ``) || e.value != t) && (e.value = `` + Pt(t))
            : e.value !== `` + Pt(t) && (e.value = `` + Pt(t)),
        t == null
          ? n == null
            ? r != null && e.removeAttribute(`value`)
            : Wt(e, o, Pt(n))
          : Wt(e, o, Pt(t)),
        i == null && a != null && (e.defaultChecked = !!a),
        i != null && (e.checked = i && typeof i != `function` && typeof i != `symbol`),
        s != null && typeof s != `function` && typeof s != `symbol` && typeof s != `boolean`
          ? (e.name = `` + Pt(s))
          : e.removeAttribute(`name`))
    }
    function Ut(e, t, n, r, i, a, o, s) {
      if (
        (a != null &&
          typeof a != `function` &&
          typeof a != `symbol` &&
          typeof a != `boolean` &&
          (e.type = a),
        t != null || n != null)
      ) {
        if (!((a !== `submit` && a !== `reset`) || t != null)) {
          Lt(e)
          return
        }
        ;((n = n == null ? `` : `` + Pt(n)),
          (t = t == null ? n : `` + Pt(t)),
          s || t === e.value || (e.value = t),
          (e.defaultValue = t))
      }
      ;((r ??= i),
        (r = typeof r != `function` && typeof r != `symbol` && !!r),
        (e.checked = s ? e.checked : !!r),
        (e.defaultChecked = !!r),
        o != null &&
          typeof o != `function` &&
          typeof o != `symbol` &&
          typeof o != `boolean` &&
          (e.name = o),
        Lt(e))
    }
    function Wt(e, t, n) {
      ;(t === `number` && zt(e.ownerDocument) === e) ||
        e.defaultValue === `` + n ||
        (e.defaultValue = `` + n)
    }
    function Gt(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {}
        for (var i = 0; i < n.length; i++) t[`$` + n[i]] = !0
        for (n = 0; n < e.length; n++)
          ((i = t.hasOwnProperty(`$` + e[n].value)),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0))
      } else {
        for (n = `` + Pt(n), t = null, i = 0; i < e.length; i++) {
          if (e[i].value === n) {
            ;((e[i].selected = !0), r && (e[i].defaultSelected = !0))
            return
          }
          t !== null || e[i].disabled || (t = e[i])
        }
        t !== null && (t.selected = !0)
      }
    }
    function Kt(e, t, n) {
      if (t != null && ((t = `` + Pt(t)), t !== e.value && (e.value = t), n == null)) {
        e.defaultValue !== t && (e.defaultValue = t)
        return
      }
      e.defaultValue = n == null ? `` : `` + Pt(n)
    }
    function qt(e, t, n, r) {
      if (t == null) {
        if (r != null) {
          if (n != null) throw Error(o(92))
          if (M(r)) {
            if (1 < r.length) throw Error(o(93))
            r = r[0]
          }
          n = r
        }
        ;((n ??= ``), (t = n))
      }
      ;((n = Pt(t)),
        (e.defaultValue = n),
        (r = e.textContent),
        r === n && r !== `` && r !== null && (e.value = r),
        Lt(e))
    }
    function Jt(e, t) {
      if (t) {
        var n = e.firstChild
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t
          return
        }
      }
      e.textContent = t
    }
    var Yt = new Set(
      `animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(
        ` `,
      ),
    )
    function Xt(e, t, n) {
      var r = t.indexOf(`--`) === 0
      n == null || typeof n == `boolean` || n === ``
        ? r
          ? e.setProperty(t, ``)
          : t === `float`
            ? (e.cssFloat = ``)
            : (e[t] = ``)
        : r
          ? e.setProperty(t, n)
          : typeof n != `number` || n === 0 || Yt.has(t)
            ? t === `float`
              ? (e.cssFloat = n)
              : (e[t] = (`` + n).trim())
            : (e[t] = n + `px`)
    }
    function Zt(e, t, n) {
      if (t != null && typeof t != `object`) throw Error(o(62))
      if (((e = e.style), n != null)) {
        for (var r in n)
          !n.hasOwnProperty(r) ||
            (t != null && t.hasOwnProperty(r)) ||
            (r.indexOf(`--`) === 0
              ? e.setProperty(r, ``)
              : r === `float`
                ? (e.cssFloat = ``)
                : (e[r] = ``))
        for (var i in t) ((r = t[i]), t.hasOwnProperty(i) && n[i] !== r && Xt(e, i, r))
      } else for (var a in t) t.hasOwnProperty(a) && Xt(e, a, t[a])
    }
    function Qt(e) {
      if (e.indexOf(`-`) === -1) return !1
      switch (e) {
        case `annotation-xml`:
        case `color-profile`:
        case `font-face`:
        case `font-face-src`:
        case `font-face-uri`:
        case `font-face-format`:
        case `font-face-name`:
        case `missing-glyph`:
          return !1
        default:
          return !0
      }
    }
    var $t = new Map([
        [`acceptCharset`, `accept-charset`],
        [`htmlFor`, `for`],
        [`httpEquiv`, `http-equiv`],
        [`crossOrigin`, `crossorigin`],
        [`accentHeight`, `accent-height`],
        [`alignmentBaseline`, `alignment-baseline`],
        [`arabicForm`, `arabic-form`],
        [`baselineShift`, `baseline-shift`],
        [`capHeight`, `cap-height`],
        [`clipPath`, `clip-path`],
        [`clipRule`, `clip-rule`],
        [`colorInterpolation`, `color-interpolation`],
        [`colorInterpolationFilters`, `color-interpolation-filters`],
        [`colorProfile`, `color-profile`],
        [`colorRendering`, `color-rendering`],
        [`dominantBaseline`, `dominant-baseline`],
        [`enableBackground`, `enable-background`],
        [`fillOpacity`, `fill-opacity`],
        [`fillRule`, `fill-rule`],
        [`floodColor`, `flood-color`],
        [`floodOpacity`, `flood-opacity`],
        [`fontFamily`, `font-family`],
        [`fontSize`, `font-size`],
        [`fontSizeAdjust`, `font-size-adjust`],
        [`fontStretch`, `font-stretch`],
        [`fontStyle`, `font-style`],
        [`fontVariant`, `font-variant`],
        [`fontWeight`, `font-weight`],
        [`glyphName`, `glyph-name`],
        [`glyphOrientationHorizontal`, `glyph-orientation-horizontal`],
        [`glyphOrientationVertical`, `glyph-orientation-vertical`],
        [`horizAdvX`, `horiz-adv-x`],
        [`horizOriginX`, `horiz-origin-x`],
        [`imageRendering`, `image-rendering`],
        [`letterSpacing`, `letter-spacing`],
        [`lightingColor`, `lighting-color`],
        [`markerEnd`, `marker-end`],
        [`markerMid`, `marker-mid`],
        [`markerStart`, `marker-start`],
        [`overlinePosition`, `overline-position`],
        [`overlineThickness`, `overline-thickness`],
        [`paintOrder`, `paint-order`],
        [`panose-1`, `panose-1`],
        [`pointerEvents`, `pointer-events`],
        [`renderingIntent`, `rendering-intent`],
        [`shapeRendering`, `shape-rendering`],
        [`stopColor`, `stop-color`],
        [`stopOpacity`, `stop-opacity`],
        [`strikethroughPosition`, `strikethrough-position`],
        [`strikethroughThickness`, `strikethrough-thickness`],
        [`strokeDasharray`, `stroke-dasharray`],
        [`strokeDashoffset`, `stroke-dashoffset`],
        [`strokeLinecap`, `stroke-linecap`],
        [`strokeLinejoin`, `stroke-linejoin`],
        [`strokeMiterlimit`, `stroke-miterlimit`],
        [`strokeOpacity`, `stroke-opacity`],
        [`strokeWidth`, `stroke-width`],
        [`textAnchor`, `text-anchor`],
        [`textDecoration`, `text-decoration`],
        [`textRendering`, `text-rendering`],
        [`transformOrigin`, `transform-origin`],
        [`underlinePosition`, `underline-position`],
        [`underlineThickness`, `underline-thickness`],
        [`unicodeBidi`, `unicode-bidi`],
        [`unicodeRange`, `unicode-range`],
        [`unitsPerEm`, `units-per-em`],
        [`vAlphabetic`, `v-alphabetic`],
        [`vHanging`, `v-hanging`],
        [`vIdeographic`, `v-ideographic`],
        [`vMathematical`, `v-mathematical`],
        [`vectorEffect`, `vector-effect`],
        [`vertAdvY`, `vert-adv-y`],
        [`vertOriginX`, `vert-origin-x`],
        [`vertOriginY`, `vert-origin-y`],
        [`wordSpacing`, `word-spacing`],
        [`writingMode`, `writing-mode`],
        [`xmlnsXlink`, `xmlns:xlink`],
        [`xHeight`, `x-height`],
      ]),
      en =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i
    function tn(e) {
      return en.test(`` + e)
        ? `javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`
        : e
    }
    function nn() {}
    var rn = null
    function an(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      )
    }
    var on = null,
      sn = null
    function cn(e) {
      var t = yt(e)
      if (t && (e = t.stateNode)) {
        var n = e[ut] || null
        a: switch (((e = t.stateNode), t.type)) {
          case `input`:
            if (
              (Ht(
                e,
                n.value,
                n.defaultValue,
                n.defaultValue,
                n.checked,
                n.defaultChecked,
                n.type,
                n.name,
              ),
              (t = n.name),
              n.type === `radio` && t != null)
            ) {
              for (n = e; n.parentNode; ) n = n.parentNode
              for (
                n = n.querySelectorAll(`input[name="` + Vt(`` + t) + `"][type="radio"]`), t = 0;
                t < n.length;
                t++
              ) {
                var r = n[t]
                if (r !== e && r.form === e.form) {
                  var i = r[ut] || null
                  if (!i) throw Error(o(90))
                  Ht(
                    r,
                    i.value,
                    i.defaultValue,
                    i.defaultValue,
                    i.checked,
                    i.defaultChecked,
                    i.type,
                    i.name,
                  )
                }
              }
              for (t = 0; t < n.length; t++) ((r = n[t]), r.form === e.form && Rt(r))
            }
            break a
          case `textarea`:
            Kt(e, n.value, n.defaultValue)
            break a
          case `select`:
            ;((t = n.value), t != null && Gt(e, !!n.multiple, t, !1))
        }
      }
    }
    var ln = !1
    function un(e, t, n) {
      if (ln) return e(t, n)
      ln = !0
      try {
        return e(t)
      } finally {
        if (
          ((ln = !1),
          (on !== null || sn !== null) &&
            (bu(), on && ((t = on), (e = sn), (sn = on = null), cn(t), e)))
        )
          for (t = 0; t < e.length; t++) cn(e[t])
      }
    }
    function dn(e, t) {
      var n = e.stateNode
      if (n === null) return null
      var r = n[ut] || null
      if (r === null) return null
      n = r[t]
      a: switch (t) {
        case `onClick`:
        case `onClickCapture`:
        case `onDoubleClick`:
        case `onDoubleClickCapture`:
        case `onMouseDown`:
        case `onMouseDownCapture`:
        case `onMouseMove`:
        case `onMouseMoveCapture`:
        case `onMouseUp`:
        case `onMouseUpCapture`:
        case `onMouseEnter`:
          ;((r = !r.disabled) ||
            ((e = e.type),
            (r = !(e === `button` || e === `input` || e === `select` || e === `textarea`))),
            (e = !r))
          break a
        default:
          e = !1
      }
      if (e) return null
      if (n && typeof n != `function`) throw Error(o(231, t, typeof n))
      return n
    }
    var fn = !(
        typeof window > `u` ||
        window.document === void 0 ||
        window.document.createElement === void 0
      ),
      pn = !1
    if (fn)
      try {
        var mn = {}
        ;(Object.defineProperty(mn, `passive`, {
          get: function () {
            pn = !0
          },
        }),
          window.addEventListener(`test`, mn, mn),
          window.removeEventListener(`test`, mn, mn))
      } catch {
        pn = !1
      }
    var hn = null,
      gn = null,
      _n = null
    function vn() {
      if (_n) return _n
      var e,
        t = gn,
        n = t.length,
        r,
        i = `value` in hn ? hn.value : hn.textContent,
        a = i.length
      for (e = 0; e < n && t[e] === i[e]; e++);
      var o = n - e
      for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
      return (_n = i.slice(e, 1 < r ? 1 - r : void 0))
    }
    function yn(e) {
      var t = e.keyCode
      return (
        `charCode` in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      )
    }
    function bn() {
      return !0
    }
    function xn() {
      return !1
    }
    function Sn(e) {
      function t(t, n, r, i, a) {
        for (var o in ((this._reactName = t),
        (this._targetInst = r),
        (this.type = n),
        (this.nativeEvent = i),
        (this.target = a),
        (this.currentTarget = null),
        e))
          e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(i) : i[o]))
        return (
          (this.isDefaultPrevented = (
            i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented
          )
            ? bn
            : xn),
          (this.isPropagationStopped = xn),
          this
        )
      }
      return (
        h(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0
            var e = this.nativeEvent
            e &&
              (e.preventDefault
                ? e.preventDefault()
                : typeof e.returnValue != `unknown` && (e.returnValue = !1),
              (this.isDefaultPrevented = bn))
          },
          stopPropagation: function () {
            var e = this.nativeEvent
            e &&
              (e.stopPropagation
                ? e.stopPropagation()
                : typeof e.cancelBubble != `unknown` && (e.cancelBubble = !0),
              (this.isPropagationStopped = bn))
          },
          persist: function () {},
          isPersistent: bn,
        }),
        t
      )
    }
    var Cn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      wn = Sn(Cn),
      Tn = h({}, Cn, { view: 0, detail: 0 }),
      En = Sn(Tn),
      Dn,
      On,
      kn,
      An = h({}, Tn, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Vn,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
          return e.relatedTarget === void 0
            ? e.fromElement === e.srcElement
              ? e.toElement
              : e.fromElement
            : e.relatedTarget
        },
        movementX: function (e) {
          return `movementX` in e
            ? e.movementX
            : (e !== kn &&
                (kn && e.type === `mousemove`
                  ? ((Dn = e.screenX - kn.screenX), (On = e.screenY - kn.screenY))
                  : (On = Dn = 0),
                (kn = e)),
              Dn)
        },
        movementY: function (e) {
          return `movementY` in e ? e.movementY : On
        },
      }),
      jn = Sn(An),
      Mn = Sn(h({}, An, { dataTransfer: 0 })),
      Nn = Sn(h({}, Tn, { relatedTarget: 0 })),
      Pn = Sn(h({}, Cn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
      Fn = Sn(
        h({}, Cn, {
          clipboardData: function (e) {
            return `clipboardData` in e ? e.clipboardData : window.clipboardData
          },
        }),
      ),
      In = Sn(h({}, Cn, { data: 0 })),
      Ln = {
        Esc: `Escape`,
        Spacebar: ` `,
        Left: `ArrowLeft`,
        Up: `ArrowUp`,
        Right: `ArrowRight`,
        Down: `ArrowDown`,
        Del: `Delete`,
        Win: `OS`,
        Menu: `ContextMenu`,
        Apps: `ContextMenu`,
        Scroll: `ScrollLock`,
        MozPrintableKey: `Unidentified`,
      },
      Rn = {
        8: `Backspace`,
        9: `Tab`,
        12: `Clear`,
        13: `Enter`,
        16: `Shift`,
        17: `Control`,
        18: `Alt`,
        19: `Pause`,
        20: `CapsLock`,
        27: `Escape`,
        32: ` `,
        33: `PageUp`,
        34: `PageDown`,
        35: `End`,
        36: `Home`,
        37: `ArrowLeft`,
        38: `ArrowUp`,
        39: `ArrowRight`,
        40: `ArrowDown`,
        45: `Insert`,
        46: `Delete`,
        112: `F1`,
        113: `F2`,
        114: `F3`,
        115: `F4`,
        116: `F5`,
        117: `F6`,
        118: `F7`,
        119: `F8`,
        120: `F9`,
        121: `F10`,
        122: `F11`,
        123: `F12`,
        144: `NumLock`,
        145: `ScrollLock`,
        224: `Meta`,
      },
      zn = { Alt: `altKey`, Control: `ctrlKey`, Meta: `metaKey`, Shift: `shiftKey` }
    function Bn(e) {
      var t = this.nativeEvent
      return t.getModifierState ? t.getModifierState(e) : (e = zn[e]) ? !!t[e] : !1
    }
    function Vn() {
      return Bn
    }
    var Hn = Sn(
        h({}, Tn, {
          key: function (e) {
            if (e.key) {
              var t = Ln[e.key] || e.key
              if (t !== `Unidentified`) return t
            }
            return e.type === `keypress`
              ? ((e = yn(e)), e === 13 ? `Enter` : String.fromCharCode(e))
              : e.type === `keydown` || e.type === `keyup`
                ? Rn[e.keyCode] || `Unidentified`
                : ``
          },
          code: 0,
          location: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          repeat: 0,
          locale: 0,
          getModifierState: Vn,
          charCode: function (e) {
            return e.type === `keypress` ? yn(e) : 0
          },
          keyCode: function (e) {
            return e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0
          },
          which: function (e) {
            return e.type === `keypress`
              ? yn(e)
              : e.type === `keydown` || e.type === `keyup`
                ? e.keyCode
                : 0
          },
        }),
      ),
      Un = Sn(
        h({}, An, {
          pointerId: 0,
          width: 0,
          height: 0,
          pressure: 0,
          tangentialPressure: 0,
          tiltX: 0,
          tiltY: 0,
          twist: 0,
          pointerType: 0,
          isPrimary: 0,
        }),
      ),
      Wn = Sn(
        h({}, Tn, {
          touches: 0,
          targetTouches: 0,
          changedTouches: 0,
          altKey: 0,
          metaKey: 0,
          ctrlKey: 0,
          shiftKey: 0,
          getModifierState: Vn,
        }),
      ),
      Gn = Sn(h({}, Cn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
      Kn = Sn(
        h({}, An, {
          deltaX: function (e) {
            return `deltaX` in e ? e.deltaX : `wheelDeltaX` in e ? -e.wheelDeltaX : 0
          },
          deltaY: function (e) {
            return `deltaY` in e
              ? e.deltaY
              : `wheelDeltaY` in e
                ? -e.wheelDeltaY
                : `wheelDelta` in e
                  ? -e.wheelDelta
                  : 0
          },
          deltaZ: 0,
          deltaMode: 0,
        }),
      ),
      qn = Sn(h({}, Cn, { newState: 0, oldState: 0 })),
      Jn = [9, 13, 27, 32],
      Yn = fn && `CompositionEvent` in window,
      Xn = null
    fn && `documentMode` in document && (Xn = document.documentMode)
    var Zn = fn && `TextEvent` in window && !Xn,
      Qn = fn && (!Yn || (Xn && 8 < Xn && 11 >= Xn)),
      I = ` `,
      $n = !1
    function er(e, t) {
      switch (e) {
        case `keyup`:
          return Jn.indexOf(t.keyCode) !== -1
        case `keydown`:
          return t.keyCode !== 229
        case `keypress`:
        case `mousedown`:
        case `focusout`:
          return !0
        default:
          return !1
      }
    }
    function L(e) {
      return ((e = e.detail), typeof e == `object` && `data` in e ? e.data : null)
    }
    var R = !1
    function tr(e, t) {
      switch (e) {
        case `compositionend`:
          return L(t)
        case `keypress`:
          return t.which === 32 ? (($n = !0), I) : null
        case `textInput`:
          return ((e = t.data), e === I && $n ? null : e)
        default:
          return null
      }
    }
    function nr(e, t) {
      if (R)
        return e === `compositionend` || (!Yn && er(e, t))
          ? ((e = vn()), (_n = gn = hn = null), (R = !1), e)
          : null
      switch (e) {
        case `paste`:
          return null
        case `keypress`:
          if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
            if (t.char && 1 < t.char.length) return t.char
            if (t.which) return String.fromCharCode(t.which)
          }
          return null
        case `compositionend`:
          return Qn && t.locale !== `ko` ? null : t.data
        default:
          return null
      }
    }
    var rr = {
      color: !0,
      date: !0,
      datetime: !0,
      'datetime-local': !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    }
    function ir(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase()
      return t === `input` ? !!rr[e.type] : t === `textarea`
    }
    function ar(e, t, n, r) {
      ;(on ? (sn ? sn.push(r) : (sn = [r])) : (on = r),
        (t = Ed(t, `onChange`)),
        0 < t.length &&
          ((n = new wn(`onChange`, `change`, null, n, r)), e.push({ event: n, listeners: t })))
    }
    var or = null,
      sr = null
    function cr(e) {
      yd(e, 0)
    }
    function lr(e) {
      if (Rt(bt(e))) return e
    }
    function ur(e, t) {
      if (e === `change`) return t
    }
    var dr = !1
    if (fn) {
      var z
      if (fn) {
        var fr = `oninput` in document
        if (!fr) {
          var pr = document.createElement(`div`)
          ;(pr.setAttribute(`oninput`, `return;`), (fr = typeof pr.oninput == `function`))
        }
        z = fr
      } else z = !1
      dr = z && (!document.documentMode || 9 < document.documentMode)
    }
    function mr() {
      or && (or.detachEvent(`onpropertychange`, hr), (sr = or = null))
    }
    function hr(e) {
      if (e.propertyName === `value` && lr(sr)) {
        var t = []
        ;(ar(t, sr, e, an(e)), un(cr, t))
      }
    }
    function gr(e, t, n) {
      e === `focusin`
        ? (mr(), (or = t), (sr = n), or.attachEvent(`onpropertychange`, hr))
        : e === `focusout` && mr()
    }
    function _r(e) {
      if (e === `selectionchange` || e === `keyup` || e === `keydown`) return lr(sr)
    }
    function vr(e, t) {
      if (e === `click`) return lr(t)
    }
    function yr(e, t) {
      if (e === `input` || e === `change`) return lr(t)
    }
    function br(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t)
    }
    var xr = typeof Object.is == `function` ? Object.is : br
    function Sr(e, t) {
      if (xr(e, t)) return !0
      if (typeof e != `object` || !e || typeof t != `object` || !t) return !1
      var n = Object.keys(e),
        r = Object.keys(t)
      if (n.length !== r.length) return !1
      for (r = 0; r < n.length; r++) {
        var i = n[r]
        if (!Ce.call(t, i) || !xr(e[i], t[i])) return !1
      }
      return !0
    }
    function Cr(e) {
      for (; e && e.firstChild; ) e = e.firstChild
      return e
    }
    function wr(e, t) {
      var n = Cr(e)
      e = 0
      for (var r; n; ) {
        if (n.nodeType === 3) {
          if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e }
          e = r
        }
        a: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling
              break a
            }
            n = n.parentNode
          }
          n = void 0
        }
        n = Cr(n)
      }
    }
    function Tr(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? Tr(e, t.parentNode)
              : `contains` in e
                ? e.contains(t)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(t) & 16)
                  : !1
        : !1
    }
    function Er(e) {
      e =
        e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
          ? e.ownerDocument.defaultView
          : window
      for (var t = zt(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == `string`
        } catch {
          n = !1
        }
        if (n) e = t.contentWindow
        else break
        t = zt(e.document)
      }
      return t
    }
    function Dr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase()
      return (
        t &&
        ((t === `input` &&
          (e.type === `text` ||
            e.type === `search` ||
            e.type === `tel` ||
            e.type === `url` ||
            e.type === `password`)) ||
          t === `textarea` ||
          e.contentEditable === `true`)
      )
    }
    var Or = fn && `documentMode` in document && 11 >= document.documentMode,
      kr = null,
      Ar = null,
      jr = null,
      Mr = !1
    function Nr(e, t, n) {
      var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument
      Mr ||
        kr == null ||
        kr !== zt(r) ||
        ((r = kr),
        `selectionStart` in r && Dr(r)
          ? (r = { start: r.selectionStart, end: r.selectionEnd })
          : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
            (r = {
              anchorNode: r.anchorNode,
              anchorOffset: r.anchorOffset,
              focusNode: r.focusNode,
              focusOffset: r.focusOffset,
            })),
        (jr && Sr(jr, r)) ||
          ((jr = r),
          (r = Ed(Ar, `onSelect`)),
          0 < r.length &&
            ((t = new wn(`onSelect`, `select`, null, t, n)),
            e.push({ event: t, listeners: r }),
            (t.target = kr))))
    }
    function Pr(e, t) {
      var n = {}
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n[`Webkit` + e] = `webkit` + t),
        (n[`Moz` + e] = `moz` + t),
        n
      )
    }
    var Fr = {
        animationend: Pr(`Animation`, `AnimationEnd`),
        animationiteration: Pr(`Animation`, `AnimationIteration`),
        animationstart: Pr(`Animation`, `AnimationStart`),
        transitionrun: Pr(`Transition`, `TransitionRun`),
        transitionstart: Pr(`Transition`, `TransitionStart`),
        transitioncancel: Pr(`Transition`, `TransitionCancel`),
        transitionend: Pr(`Transition`, `TransitionEnd`),
      },
      Ir = {},
      Lr = {}
    fn &&
      ((Lr = document.createElement(`div`).style),
      `AnimationEvent` in window ||
        (delete Fr.animationend.animation,
        delete Fr.animationiteration.animation,
        delete Fr.animationstart.animation),
      `TransitionEvent` in window || delete Fr.transitionend.transition)
    function Rr(e) {
      if (Ir[e]) return Ir[e]
      if (!Fr[e]) return e
      var t = Fr[e],
        n
      for (n in t) if (t.hasOwnProperty(n) && n in Lr) return (Ir[e] = t[n])
      return e
    }
    var zr = Rr(`animationend`),
      Br = Rr(`animationiteration`),
      Vr = Rr(`animationstart`),
      Hr = Rr(`transitionrun`),
      Ur = Rr(`transitionstart`),
      Wr = Rr(`transitioncancel`),
      Gr = Rr(`transitionend`),
      Kr = new Map(),
      qr =
        `abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(
          ` `,
        )
    qr.push(`scrollEnd`)
    function Jr(e, t) {
      ;(Kr.set(e, t), Tt(t, [e]))
    }
    var Yr =
        typeof reportError == `function`
          ? reportError
          : function (e) {
              if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
                var t = new window.ErrorEvent(`error`, {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof e == `object` && e && typeof e.message == `string`
                      ? String(e.message)
                      : String(e),
                  error: e,
                })
                if (!window.dispatchEvent(t)) return
              } else if (typeof process == `object` && typeof process.emit == `function`) {
                process.emit(`uncaughtException`, e)
                return
              }
              console.error(e)
            },
      Xr = [],
      Zr = 0,
      Qr = 0
    function $r() {
      for (var e = Zr, t = (Qr = Zr = 0); t < e; ) {
        var n = Xr[t]
        Xr[t++] = null
        var r = Xr[t]
        Xr[t++] = null
        var i = Xr[t]
        Xr[t++] = null
        var a = Xr[t]
        if (((Xr[t++] = null), r !== null && i !== null)) {
          var o = r.pending
          ;(o === null ? (i.next = i) : ((i.next = o.next), (o.next = i)), (r.pending = i))
        }
        a !== 0 && ri(n, i, a)
      }
    }
    function ei(e, t, n, r) {
      ;((Xr[Zr++] = e),
        (Xr[Zr++] = t),
        (Xr[Zr++] = n),
        (Xr[Zr++] = r),
        (Qr |= r),
        (e.lanes |= r),
        (e = e.alternate),
        e !== null && (e.lanes |= r))
    }
    function ti(e, t, n, r) {
      return (ei(e, t, n, r), ii(e))
    }
    function ni(e, t) {
      return (ei(e, null, null, t), ii(e))
    }
    function ri(e, t, n) {
      e.lanes |= n
      var r = e.alternate
      r !== null && (r.lanes |= n)
      for (var i = !1, a = e.return; a !== null; )
        ((a.childLanes |= n),
          (r = a.alternate),
          r !== null && (r.childLanes |= n),
          a.tag === 22 && ((e = a.stateNode), e === null || e._visibility & 1 || (i = !0)),
          (e = a),
          (a = a.return))
      return e.tag === 3
        ? ((a = e.stateNode),
          i &&
            t !== null &&
            ((i = 31 - Be(n)),
            (e = a.hiddenUpdates),
            (r = e[i]),
            r === null ? (e[i] = [t]) : r.push(t),
            (t.lane = n | 536870912)),
          a)
        : null
    }
    function ii(e) {
      if (50 < du) throw ((du = 0), (fu = null), Error(o(185)))
      for (var t = e.return; t !== null; ) ((e = t), (t = e.return))
      return e.tag === 3 ? e.stateNode : null
    }
    var ai = {}
    function oi(e, t, n, r) {
      ;((this.tag = e),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.refCleanup = this.ref = null),
        (this.pendingProps = t),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null))
    }
    function si(e, t, n, r) {
      return new oi(e, t, n, r)
    }
    function ci(e) {
      return ((e = e.prototype), !(!e || !e.isReactComponent))
    }
    function li(e, t) {
      var n = e.alternate
      return (
        n === null
          ? ((n = si(e.tag, t, e.key, e.mode)),
            (n.elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.type = e.type),
            (n.flags = 0),
            (n.subtreeFlags = 0),
            (n.deletions = null)),
        (n.flags = e.flags & 65011712),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        (n.refCleanup = e.refCleanup),
        n
      )
    }
    function ui(e, t) {
      e.flags &= 65011714
      var n = e.alternate
      return (
        n === null
          ? ((e.childLanes = 0),
            (e.lanes = t),
            (e.child = null),
            (e.subtreeFlags = 0),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.updateQueue = null),
            (e.dependencies = null),
            (e.stateNode = null))
          : ((e.childLanes = n.childLanes),
            (e.lanes = n.lanes),
            (e.child = n.child),
            (e.subtreeFlags = 0),
            (e.deletions = null),
            (e.memoizedProps = n.memoizedProps),
            (e.memoizedState = n.memoizedState),
            (e.updateQueue = n.updateQueue),
            (e.type = n.type),
            (t = n.dependencies),
            (e.dependencies =
              t === null ? null : { lanes: t.lanes, firstContext: t.firstContext })),
        e
      )
    }
    function di(e, t, n, r, i, a) {
      var s = 0
      if (((r = e), typeof e == `function`)) ci(e) && (s = 1)
      else if (typeof e == `string`)
        s = Uf(e, n, ce.current) ? 26 : e === `html` || e === `head` || e === `body` ? 27 : 5
      else
        a: switch (e) {
          case k:
            return ((e = si(31, n, t, i)), (e.elementType = k), (e.lanes = a), e)
          case y:
            return fi(n.children, i, a, t)
          case b:
            ;((s = 8), (i |= 24))
            break
          case x:
            return ((e = si(12, n, t, i | 2)), (e.elementType = x), (e.lanes = a), e)
          case T:
            return ((e = si(13, n, t, i)), (e.elementType = T), (e.lanes = a), e)
          case E:
            return ((e = si(19, n, t, i)), (e.elementType = E), (e.lanes = a), e)
          default:
            if (typeof e == `object` && e)
              switch (e.$$typeof) {
                case C:
                  s = 10
                  break a
                case S:
                  s = 9
                  break a
                case w:
                  s = 11
                  break a
                case D:
                  s = 14
                  break a
                case O:
                  ;((s = 16), (r = null))
                  break a
              }
            ;((s = 29), (n = Error(o(130, e === null ? `null` : typeof e, ``))), (r = null))
        }
      return ((t = si(s, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = a), t)
    }
    function fi(e, t, n, r) {
      return ((e = si(7, e, r, t)), (e.lanes = n), e)
    }
    function pi(e, t, n) {
      return ((e = si(6, e, null, t)), (e.lanes = n), e)
    }
    function mi(e) {
      var t = si(18, null, null, 0)
      return ((t.stateNode = e), t)
    }
    function hi(e, t, n) {
      return (
        (t = si(4, e.children === null ? [] : e.children, e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      )
    }
    var gi = new WeakMap()
    function _i(e, t) {
      if (typeof e == `object` && e) {
        var n = gi.get(e)
        return n === void 0 ? ((t = { value: e, source: t, stack: Se(t) }), gi.set(e, t), t) : n
      }
      return { value: e, source: t, stack: Se(t) }
    }
    var vi = [],
      yi = 0,
      bi = null,
      xi = 0,
      Si = [],
      Ci = 0,
      wi = null,
      Ti = 1,
      Ei = ``
    function Di(e, t) {
      ;((vi[yi++] = xi), (vi[yi++] = bi), (bi = e), (xi = t))
    }
    function Oi(e, t, n) {
      ;((Si[Ci++] = Ti), (Si[Ci++] = Ei), (Si[Ci++] = wi), (wi = e))
      var r = Ti
      e = Ei
      var i = 32 - Be(r) - 1
      ;((r &= ~(1 << i)), (n += 1))
      var a = 32 - Be(t) + i
      if (30 < a) {
        var o = i - (i % 5)
        ;((a = (r & ((1 << o) - 1)).toString(32)),
          (r >>= o),
          (i -= o),
          (Ti = (1 << (32 - Be(t) + i)) | (n << i) | r),
          (Ei = a + e))
      } else ((Ti = (1 << a) | (n << i) | r), (Ei = e))
    }
    function ki(e) {
      e.return !== null && (Di(e, 1), Oi(e, 1, 0))
    }
    function Ai(e) {
      for (; e === bi; ) ((bi = vi[--yi]), (vi[yi] = null), (xi = vi[--yi]), (vi[yi] = null))
      for (; e === wi; )
        ((wi = Si[--Ci]),
          (Si[Ci] = null),
          (Ei = Si[--Ci]),
          (Si[Ci] = null),
          (Ti = Si[--Ci]),
          (Si[Ci] = null))
    }
    function ji(e, t) {
      ;((Si[Ci++] = Ti), (Si[Ci++] = Ei), (Si[Ci++] = wi), (Ti = t.id), (Ei = t.overflow), (wi = e))
    }
    var Mi = null,
      B = null,
      V = !1,
      Ni = null,
      Pi = !1,
      Fi = Error(o(519))
    function Ii(e) {
      throw (
        Hi(
          _i(
            Error(
              o(
                418,
                1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? `text` : `HTML`,
                ``,
              ),
            ),
            e,
          ),
        ),
        Fi
      )
    }
    function Li(e) {
      var t = e.stateNode,
        n = e.type,
        r = e.memoizedProps
      switch (((t[lt] = e), (t[ut] = r), n)) {
        case `dialog`:
          ;(Q(`cancel`, t), Q(`close`, t))
          break
        case `iframe`:
        case `object`:
        case `embed`:
          Q(`load`, t)
          break
        case `video`:
        case `audio`:
          for (n = 0; n < _d.length; n++) Q(_d[n], t)
          break
        case `source`:
          Q(`error`, t)
          break
        case `img`:
        case `image`:
        case `link`:
          ;(Q(`error`, t), Q(`load`, t))
          break
        case `details`:
          Q(`toggle`, t)
          break
        case `input`:
          ;(Q(`invalid`, t),
            Ut(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0))
          break
        case `select`:
          Q(`invalid`, t)
          break
        case `textarea`:
          ;(Q(`invalid`, t), qt(t, r.value, r.defaultValue, r.children))
      }
      ;((n = r.children),
        (typeof n != `string` && typeof n != `number` && typeof n != `bigint`) ||
        t.textContent === `` + n ||
        !0 === r.suppressHydrationWarning ||
        Md(t.textContent, n)
          ? (r.popover != null && (Q(`beforetoggle`, t), Q(`toggle`, t)),
            r.onScroll != null && Q(`scroll`, t),
            r.onScrollEnd != null && Q(`scrollend`, t),
            r.onClick != null && (t.onclick = nn),
            (t = !0))
          : (t = !1),
        t || Ii(e, !0))
    }
    function Ri(e) {
      for (Mi = e.return; Mi; )
        switch (Mi.tag) {
          case 5:
          case 31:
          case 13:
            Pi = !1
            return
          case 27:
          case 3:
            Pi = !0
            return
          default:
            Mi = Mi.return
        }
    }
    function zi(e) {
      if (e !== Mi) return !1
      if (!V) return (Ri(e), (V = !0), !1)
      var t = e.tag,
        n
      if (
        ((n = t !== 3 && t !== 27) &&
          ((n = t === 5) &&
            ((n = e.type), (n = !(n !== `form` && n !== `button`) || Ud(e.type, e.memoizedProps))),
          (n = !n)),
        n && B && Ii(e),
        Ri(e),
        t === 13)
      ) {
        if (((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e)) throw Error(o(317))
        B = uf(e)
      } else if (t === 31) {
        if (((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e)) throw Error(o(317))
        B = uf(e)
      } else
        t === 27
          ? ((t = B), Zd(e.type) ? ((e = lf), (lf = null), (B = e)) : (B = t))
          : (B = Mi ? cf(e.stateNode.nextSibling) : null)
      return !0
    }
    function Bi() {
      ;((B = Mi = null), (V = !1))
    }
    function Vi() {
      var e = Ni
      return (e !== null && (Zl === null ? (Zl = e) : Zl.push.apply(Zl, e), (Ni = null)), e)
    }
    function Hi(e) {
      Ni === null ? (Ni = [e]) : Ni.push(e)
    }
    var Ui = oe(null),
      Wi = null,
      Gi = null
    function Ki(e, t, n) {
      ;(F(Ui, t._currentValue), (t._currentValue = n))
    }
    function qi(e) {
      ;((e._currentValue = Ui.current), se(Ui))
    }
    function Ji(e, t, n) {
      for (; e !== null; ) {
        var r = e.alternate
        if (
          ((e.childLanes & t) === t
            ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t)
            : ((e.childLanes |= t), r !== null && (r.childLanes |= t)),
          e === n)
        )
          break
        e = e.return
      }
    }
    function Yi(e, t, n, r) {
      var i = e.child
      for (i !== null && (i.return = e); i !== null; ) {
        var a = i.dependencies
        if (a !== null) {
          var s = i.child
          a = a.firstContext
          a: for (; a !== null; ) {
            var c = a
            a = i
            for (var l = 0; l < t.length; l++)
              if (c.context === t[l]) {
                ;((a.lanes |= n),
                  (c = a.alternate),
                  c !== null && (c.lanes |= n),
                  Ji(a.return, n, e),
                  r || (s = null))
                break a
              }
            a = c.next
          }
        } else if (i.tag === 18) {
          if (((s = i.return), s === null)) throw Error(o(341))
          ;((s.lanes |= n),
            (a = s.alternate),
            a !== null && (a.lanes |= n),
            Ji(s, n, e),
            (s = null))
        } else s = i.child
        if (s !== null) s.return = i
        else
          for (s = i; s !== null; ) {
            if (s === e) {
              s = null
              break
            }
            if (((i = s.sibling), i !== null)) {
              ;((i.return = s.return), (s = i))
              break
            }
            s = s.return
          }
        i = s
      }
    }
    function Xi(e, t, n, r) {
      e = null
      for (var i = t, a = !1; i !== null; ) {
        if (!a) {
          if (i.flags & 524288) a = !0
          else if (i.flags & 262144) break
        }
        if (i.tag === 10) {
          var s = i.alternate
          if (s === null) throw Error(o(387))
          if (((s = s.memoizedProps), s !== null)) {
            var c = i.type
            xr(i.pendingProps.value, s.value) || (e === null ? (e = [c]) : e.push(c))
          }
        } else if (i === de.current) {
          if (((s = i.alternate), s === null)) throw Error(o(387))
          s.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
            (e === null ? (e = [Qf]) : e.push(Qf))
        }
        i = i.return
      }
      ;(e !== null && Yi(t, e, n, r), (t.flags |= 262144))
    }
    function Zi(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!xr(e.context._currentValue, e.memoizedValue)) return !0
        e = e.next
      }
      return !1
    }
    function Qi(e) {
      ;((Wi = e), (Gi = null), (e = e.dependencies), e !== null && (e.firstContext = null))
    }
    function $i(e) {
      return ta(Wi, e)
    }
    function ea(e, t) {
      return (Wi === null && Qi(e), ta(e, t))
    }
    function ta(e, t) {
      var n = t._currentValue
      if (((t = { context: t, memoizedValue: n, next: null }), Gi === null)) {
        if (e === null) throw Error(o(308))
        ;((Gi = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288))
      } else Gi = Gi.next = t
      return n
    }
    var na =
        typeof AbortController < `u`
          ? AbortController
          : function () {
              var e = [],
                t = (this.signal = {
                  aborted: !1,
                  addEventListener: function (t, n) {
                    e.push(n)
                  },
                })
              this.abort = function () {
                ;((t.aborted = !0),
                  e.forEach(function (e) {
                    return e()
                  }))
              }
            },
      ra = n.unstable_scheduleCallback,
      ia = n.unstable_NormalPriority,
      aa = {
        $$typeof: C,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      }
    function oa() {
      return { controller: new na(), data: new Map(), refCount: 0 }
    }
    function sa(e) {
      ;(e.refCount--,
        e.refCount === 0 &&
          ra(ia, function () {
            e.controller.abort()
          }))
    }
    var ca = null,
      la = 0,
      ua = 0,
      da = null
    function fa(e, t) {
      if (ca === null) {
        var n = (ca = [])
        ;((la = 0),
          (ua = dd()),
          (da = {
            status: `pending`,
            value: void 0,
            then: function (e) {
              n.push(e)
            },
          }))
      }
      return (la++, t.then(pa, pa), t)
    }
    function pa() {
      if (--la === 0 && ca !== null) {
        da !== null && (da.status = `fulfilled`)
        var e = ca
        ;((ca = null), (ua = 0), (da = null))
        for (var t = 0; t < e.length; t++) (0, e[t])()
      }
    }
    function ma(e, t) {
      var n = [],
        r = {
          status: `pending`,
          value: null,
          reason: null,
          then: function (e) {
            n.push(e)
          },
        }
      return (
        e.then(
          function () {
            ;((r.status = `fulfilled`), (r.value = t))
            for (var e = 0; e < n.length; e++) (0, n[e])(t)
          },
          function (e) {
            for (r.status = `rejected`, r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0)
          },
        ),
        r
      )
    }
    var ha = N.S
    N.S = function (e, t) {
      ;((eu = Oe()),
        typeof t == `object` && t && typeof t.then == `function` && fa(e, t),
        ha !== null && ha(e, t))
    }
    var ga = oe(null)
    function _a() {
      var e = ga.current
      return e === null ? q.pooledCache : e
    }
    function va(e, t) {
      t === null ? F(ga, ga.current) : F(ga, t.pool)
    }
    function ya() {
      var e = _a()
      return e === null ? null : { parent: aa._currentValue, pool: e }
    }
    var ba = Error(o(460)),
      xa = Error(o(474)),
      Sa = Error(o(542)),
      Ca = { then: function () {} }
    function wa(e) {
      return ((e = e.status), e === `fulfilled` || e === `rejected`)
    }
    function Ta(e, t, n) {
      switch (
        ((n = e[n]), n === void 0 ? e.push(t) : n !== t && (t.then(nn, nn), (t = n)), t.status)
      ) {
        case `fulfilled`:
          return t.value
        case `rejected`:
          throw ((e = t.reason), ka(e), e)
        default:
          if (typeof t.status == `string`) t.then(nn, nn)
          else {
            if (((e = q), e !== null && 100 < e.shellSuspendCounter)) throw Error(o(482))
            ;((e = t),
              (e.status = `pending`),
              e.then(
                function (e) {
                  if (t.status === `pending`) {
                    var n = t
                    ;((n.status = `fulfilled`), (n.value = e))
                  }
                },
                function (e) {
                  if (t.status === `pending`) {
                    var n = t
                    ;((n.status = `rejected`), (n.reason = e))
                  }
                },
              ))
          }
          switch (t.status) {
            case `fulfilled`:
              return t.value
            case `rejected`:
              throw ((e = t.reason), ka(e), e)
          }
          throw ((Da = t), ba)
      }
    }
    function Ea(e) {
      try {
        var t = e._init
        return t(e._payload)
      } catch (e) {
        throw typeof e == `object` && e && typeof e.then == `function` ? ((Da = e), ba) : e
      }
    }
    var Da = null
    function Oa() {
      if (Da === null) throw Error(o(459))
      var e = Da
      return ((Da = null), e)
    }
    function ka(e) {
      if (e === ba || e === Sa) throw Error(o(483))
    }
    var Aa = null,
      ja = 0
    function Ma(e) {
      var t = ja
      return ((ja += 1), Aa === null && (Aa = []), Ta(Aa, e, t))
    }
    function Na(e, t) {
      ;((t = t.props.ref), (e.ref = t === void 0 ? null : t))
    }
    function Pa(e, t) {
      throw t.$$typeof === g
        ? Error(o(525))
        : ((e = Object.prototype.toString.call(t)),
          Error(
            o(
              31,
              e === `[object Object]` ? `object with keys {` + Object.keys(t).join(`, `) + `}` : e,
            ),
          ))
    }
    function Fa(e) {
      function t(t, n) {
        if (e) {
          var r = t.deletions
          r === null ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n)
        }
      }
      function n(n, r) {
        if (!e) return null
        for (; r !== null; ) (t(n, r), (r = r.sibling))
        return null
      }
      function r(e) {
        for (var t = new Map(); e !== null; )
          (e.key === null ? t.set(e.index, e) : t.set(e.key, e), (e = e.sibling))
        return t
      }
      function i(e, t) {
        return ((e = li(e, t)), (e.index = 0), (e.sibling = null), e)
      }
      function a(t, n, r) {
        return (
          (t.index = r),
          e
            ? ((r = t.alternate),
              r === null
                ? ((t.flags |= 67108866), n)
                : ((r = r.index), r < n ? ((t.flags |= 67108866), n) : r))
            : ((t.flags |= 1048576), n)
        )
      }
      function s(t) {
        return (e && t.alternate === null && (t.flags |= 67108866), t)
      }
      function c(e, t, n, r) {
        return t === null || t.tag !== 6
          ? ((t = pi(n, e.mode, r)), (t.return = e), t)
          : ((t = i(t, n)), (t.return = e), t)
      }
      function l(e, t, n, r) {
        var a = n.type
        return a === y
          ? d(e, t, n.props.children, r, n.key)
          : t !== null &&
              (t.elementType === a ||
                (typeof a == `object` && a && a.$$typeof === O && Ea(a) === t.type))
            ? ((t = i(t, n.props)), Na(t, n), (t.return = e), t)
            : ((t = di(n.type, n.key, n.props, null, e.mode, r)), Na(t, n), (t.return = e), t)
      }
      function u(e, t, n, r) {
        return t === null ||
          t.tag !== 4 ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? ((t = hi(n, e.mode, r)), (t.return = e), t)
          : ((t = i(t, n.children || [])), (t.return = e), t)
      }
      function d(e, t, n, r, a) {
        return t === null || t.tag !== 7
          ? ((t = fi(n, e.mode, r, a)), (t.return = e), t)
          : ((t = i(t, n)), (t.return = e), t)
      }
      function f(e, t, n) {
        if ((typeof t == `string` && t !== ``) || typeof t == `number` || typeof t == `bigint`)
          return ((t = pi(`` + t, e.mode, n)), (t.return = e), t)
        if (typeof t == `object` && t) {
          switch (t.$$typeof) {
            case _:
              return (
                (n = di(t.type, t.key, t.props, null, e.mode, n)), Na(n, t), (n.return = e), n
              )
            case v:
              return ((t = hi(t, e.mode, n)), (t.return = e), t)
            case O:
              return ((t = Ea(t)), f(e, t, n))
          }
          if (M(t) || ee(t)) return ((t = fi(t, e.mode, n, null)), (t.return = e), t)
          if (typeof t.then == `function`) return f(e, Ma(t), n)
          if (t.$$typeof === C) return f(e, ea(e, t), n)
          Pa(e, t)
        }
        return null
      }
      function p(e, t, n, r) {
        var i = t === null ? null : t.key
        if ((typeof n == `string` && n !== ``) || typeof n == `number` || typeof n == `bigint`)
          return i === null ? c(e, t, `` + n, r) : null
        if (typeof n == `object` && n) {
          switch (n.$$typeof) {
            case _:
              return n.key === i ? l(e, t, n, r) : null
            case v:
              return n.key === i ? u(e, t, n, r) : null
            case O:
              return ((n = Ea(n)), p(e, t, n, r))
          }
          if (M(n) || ee(n)) return i === null ? d(e, t, n, r, null) : null
          if (typeof n.then == `function`) return p(e, t, Ma(n), r)
          if (n.$$typeof === C) return p(e, t, ea(e, n), r)
          Pa(e, n)
        }
        return null
      }
      function m(e, t, n, r, i) {
        if ((typeof r == `string` && r !== ``) || typeof r == `number` || typeof r == `bigint`)
          return ((e = e.get(n) || null), c(t, e, `` + r, i))
        if (typeof r == `object` && r) {
          switch (r.$$typeof) {
            case _:
              return ((e = e.get(r.key === null ? n : r.key) || null), l(t, e, r, i))
            case v:
              return ((e = e.get(r.key === null ? n : r.key) || null), u(t, e, r, i))
            case O:
              return ((r = Ea(r)), m(e, t, n, r, i))
          }
          if (M(r) || ee(r)) return ((e = e.get(n) || null), d(t, e, r, i, null))
          if (typeof r.then == `function`) return m(e, t, n, Ma(r), i)
          if (r.$$typeof === C) return m(e, t, n, ea(t, r), i)
          Pa(t, r)
        }
        return null
      }
      function h(i, o, s, c) {
        for (
          var l = null, u = null, d = o, h = (o = 0), g = null;
          d !== null && h < s.length;
          h++
        ) {
          d.index > h ? ((g = d), (d = null)) : (g = d.sibling)
          var _ = p(i, d, s[h], c)
          if (_ === null) {
            d === null && (d = g)
            break
          }
          ;(e && d && _.alternate === null && t(i, d),
            (o = a(_, o, h)),
            u === null ? (l = _) : (u.sibling = _),
            (u = _),
            (d = g))
        }
        if (h === s.length) return (n(i, d), V && Di(i, h), l)
        if (d === null) {
          for (; h < s.length; h++)
            ((d = f(i, s[h], c)),
              d !== null && ((o = a(d, o, h)), u === null ? (l = d) : (u.sibling = d), (u = d)))
          return (V && Di(i, h), l)
        }
        for (d = r(d); h < s.length; h++)
          ((g = m(d, i, h, s[h], c)),
            g !== null &&
              (e && g.alternate !== null && d.delete(g.key === null ? h : g.key),
              (o = a(g, o, h)),
              u === null ? (l = g) : (u.sibling = g),
              (u = g)))
        return (
          e &&
            d.forEach(function (e) {
              return t(i, e)
            }),
          V && Di(i, h),
          l
        )
      }
      function g(i, s, c, l) {
        if (c == null) throw Error(o(151))
        for (
          var u = null, d = null, h = s, g = (s = 0), _ = null, v = c.next();
          h !== null && !v.done;
          g++, v = c.next()
        ) {
          h.index > g ? ((_ = h), (h = null)) : (_ = h.sibling)
          var y = p(i, h, v.value, l)
          if (y === null) {
            h === null && (h = _)
            break
          }
          ;(e && h && y.alternate === null && t(i, h),
            (s = a(y, s, g)),
            d === null ? (u = y) : (d.sibling = y),
            (d = y),
            (h = _))
        }
        if (v.done) return (n(i, h), V && Di(i, g), u)
        if (h === null) {
          for (; !v.done; g++, v = c.next())
            ((v = f(i, v.value, l)),
              v !== null && ((s = a(v, s, g)), d === null ? (u = v) : (d.sibling = v), (d = v)))
          return (V && Di(i, g), u)
        }
        for (h = r(h); !v.done; g++, v = c.next())
          ((v = m(h, i, g, v.value, l)),
            v !== null &&
              (e && v.alternate !== null && h.delete(v.key === null ? g : v.key),
              (s = a(v, s, g)),
              d === null ? (u = v) : (d.sibling = v),
              (d = v)))
        return (
          e &&
            h.forEach(function (e) {
              return t(i, e)
            }),
          V && Di(i, g),
          u
        )
      }
      function b(e, r, a, c) {
        if (
          (typeof a == `object` && a && a.type === y && a.key === null && (a = a.props.children),
          typeof a == `object` && a)
        ) {
          switch (a.$$typeof) {
            case _:
              a: {
                for (var l = a.key; r !== null; ) {
                  if (r.key === l) {
                    if (((l = a.type), l === y)) {
                      if (r.tag === 7) {
                        ;(n(e, r.sibling), (c = i(r, a.props.children)), (c.return = e), (e = c))
                        break a
                      }
                    } else if (
                      r.elementType === l ||
                      (typeof l == `object` && l && l.$$typeof === O && Ea(l) === r.type)
                    ) {
                      ;(n(e, r.sibling), (c = i(r, a.props)), Na(c, a), (c.return = e), (e = c))
                      break a
                    }
                    n(e, r)
                    break
                  } else t(e, r)
                  r = r.sibling
                }
                a.type === y
                  ? ((c = fi(a.props.children, e.mode, c, a.key)), (c.return = e), (e = c))
                  : ((c = di(a.type, a.key, a.props, null, e.mode, c)),
                    Na(c, a),
                    (c.return = e),
                    (e = c))
              }
              return s(e)
            case v:
              a: {
                for (l = a.key; r !== null; ) {
                  if (r.key === l)
                    if (
                      r.tag === 4 &&
                      r.stateNode.containerInfo === a.containerInfo &&
                      r.stateNode.implementation === a.implementation
                    ) {
                      ;(n(e, r.sibling), (c = i(r, a.children || [])), (c.return = e), (e = c))
                      break a
                    } else {
                      n(e, r)
                      break
                    }
                  else t(e, r)
                  r = r.sibling
                }
                ;((c = hi(a, e.mode, c)), (c.return = e), (e = c))
              }
              return s(e)
            case O:
              return ((a = Ea(a)), b(e, r, a, c))
          }
          if (M(a)) return h(e, r, a, c)
          if (ee(a)) {
            if (((l = ee(a)), typeof l != `function`)) throw Error(o(150))
            return ((a = l.call(a)), g(e, r, a, c))
          }
          if (typeof a.then == `function`) return b(e, r, Ma(a), c)
          if (a.$$typeof === C) return b(e, r, ea(e, a), c)
          Pa(e, a)
        }
        return (typeof a == `string` && a !== ``) || typeof a == `number` || typeof a == `bigint`
          ? ((a = `` + a),
            r !== null && r.tag === 6
              ? (n(e, r.sibling), (c = i(r, a)), (c.return = e), (e = c))
              : (n(e, r), (c = pi(a, e.mode, c)), (c.return = e), (e = c)),
            s(e))
          : n(e, r)
      }
      return function (e, t, n, r) {
        try {
          ja = 0
          var i = b(e, t, n, r)
          return ((Aa = null), i)
        } catch (t) {
          if (t === ba || t === Sa) throw t
          var a = si(29, t, null, e.mode)
          return ((a.lanes = r), (a.return = e), a)
        }
      }
    }
    var Ia = Fa(!0),
      La = Fa(!1),
      Ra = !1
    function za(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      }
    }
    function Ba(e, t) {
      ;((e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null,
          }))
    }
    function Va(e) {
      return { lane: e, tag: 0, payload: null, callback: null, next: null }
    }
    function Ha(e, t, n) {
      var r = e.updateQueue
      if (r === null) return null
      if (((r = r.shared), K & 2)) {
        var i = r.pending
        return (
          i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
          (r.pending = t),
          (t = ii(e)),
          ri(e, null, n),
          t
        )
      }
      return (ei(e, r, t, n), ii(e))
    }
    function Ua(e, t, n) {
      if (((t = t.updateQueue), t !== null && ((t = t.shared), n & 4194048))) {
        var r = t.lanes
        ;((r &= e.pendingLanes), (n |= r), (t.lanes = n), nt(e, n))
      }
    }
    function Wa(e, t) {
      var n = e.updateQueue,
        r = e.alternate
      if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
          a = null
        if (((n = n.firstBaseUpdate), n !== null)) {
          do {
            var o = { lane: n.lane, tag: n.tag, payload: n.payload, callback: null, next: null }
            ;(a === null ? (i = a = o) : (a = a.next = o), (n = n.next))
          } while (n !== null)
          a === null ? (i = a = t) : (a = a.next = t)
        } else i = a = t
        ;((n = {
          baseState: r.baseState,
          firstBaseUpdate: i,
          lastBaseUpdate: a,
          shared: r.shared,
          callbacks: r.callbacks,
        }),
          (e.updateQueue = n))
        return
      }
      ;((e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t))
    }
    var Ga = !1
    function Ka() {
      if (Ga) {
        var e = da
        if (e !== null) throw e
      }
    }
    function qa(e, t, n, r) {
      Ga = !1
      var i = e.updateQueue
      Ra = !1
      var a = i.firstBaseUpdate,
        o = i.lastBaseUpdate,
        s = i.shared.pending
      if (s !== null) {
        i.shared.pending = null
        var c = s,
          l = c.next
        ;((c.next = null), o === null ? (a = l) : (o.next = l), (o = c))
        var u = e.alternate
        u !== null &&
          ((u = u.updateQueue),
          (s = u.lastBaseUpdate),
          s !== o && (s === null ? (u.firstBaseUpdate = l) : (s.next = l), (u.lastBaseUpdate = c)))
      }
      if (a !== null) {
        var d = i.baseState
        ;((o = 0), (u = l = c = null), (s = a))
        do {
          var f = s.lane & -536870913,
            p = f !== s.lane
          if (p ? (Y & f) === f : (r & f) === f) {
            ;(f !== 0 && f === ua && (Ga = !0),
              u !== null &&
                (u = u.next =
                  { lane: 0, tag: s.tag, payload: s.payload, callback: null, next: null }))
            a: {
              var m = e,
                g = s
              f = t
              var _ = n
              switch (g.tag) {
                case 1:
                  if (((m = g.payload), typeof m == `function`)) {
                    d = m.call(_, d, f)
                    break a
                  }
                  d = m
                  break a
                case 3:
                  m.flags = (m.flags & -65537) | 128
                case 0:
                  if (
                    ((m = g.payload), (f = typeof m == `function` ? m.call(_, d, f) : m), f == null)
                  )
                    break a
                  d = h({}, d, f)
                  break a
                case 2:
                  Ra = !0
              }
            }
            ;((f = s.callback),
              f !== null &&
                ((e.flags |= 64),
                p && (e.flags |= 8192),
                (p = i.callbacks),
                p === null ? (i.callbacks = [f]) : p.push(f)))
          } else
            ((p = { lane: f, tag: s.tag, payload: s.payload, callback: s.callback, next: null }),
              u === null ? ((l = u = p), (c = d)) : (u = u.next = p),
              (o |= f))
          if (((s = s.next), s === null)) {
            if (((s = i.shared.pending), s === null)) break
            ;((p = s),
              (s = p.next),
              (p.next = null),
              (i.lastBaseUpdate = p),
              (i.shared.pending = null))
          }
        } while (1)
        ;(u === null && (c = d),
          (i.baseState = c),
          (i.firstBaseUpdate = l),
          (i.lastBaseUpdate = u),
          a === null && (i.shared.lanes = 0),
          (Gl |= o),
          (e.lanes = o),
          (e.memoizedState = d))
      }
    }
    function Ja(e, t) {
      if (typeof e != `function`) throw Error(o(191, e))
      e.call(t)
    }
    function Ya(e, t) {
      var n = e.callbacks
      if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ja(n[e], t)
    }
    var Xa = oe(null),
      Za = oe(0)
    function Qa(e, t) {
      ;((e = Ul), F(Za, e), F(Xa, t), (Ul = e | t.baseLanes))
    }
    function $a() {
      ;(F(Za, Ul), F(Xa, Xa.current))
    }
    function eo() {
      ;((Ul = Za.current), se(Xa), se(Za))
    }
    var H = oe(null),
      to = null
    function no(e) {
      var t = e.alternate
      ;(F(so, so.current & 1),
        F(H, e),
        to === null && (t === null || Xa.current !== null || t.memoizedState !== null) && (to = e))
    }
    function ro(e) {
      ;(F(so, so.current), F(H, e), to === null && (to = e))
    }
    function io(e) {
      e.tag === 22 ? (F(so, so.current), F(H, e), to === null && (to = e)) : ao(e)
    }
    function ao() {
      ;(F(so, so.current), F(H, H.current))
    }
    function oo(e) {
      ;(se(H), to === e && (to = null), se(so))
    }
    var so = oe(0)
    function co(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var n = t.memoizedState
          if (n !== null && ((n = n.dehydrated), n === null || af(n) || of(n))) return t
        } else if (
          t.tag === 19 &&
          (t.memoizedProps.revealOrder === `forwards` ||
            t.memoizedProps.revealOrder === `backwards` ||
            t.memoizedProps.revealOrder === `unstable_legacy-backwards` ||
            t.memoizedProps.revealOrder === `together`)
        ) {
          if (t.flags & 128) return t
        } else if (t.child !== null) {
          ;((t.child.return = t), (t = t.child))
          continue
        }
        if (t === e) break
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null
          t = t.return
        }
        ;((t.sibling.return = t.return), (t = t.sibling))
      }
      return null
    }
    var lo = 0,
      U = null,
      W = null,
      uo = null,
      fo = !1,
      po = !1,
      G = !1,
      mo = 0,
      ho = 0,
      go = null,
      _o = 0
    function vo() {
      throw Error(o(321))
    }
    function yo(e, t) {
      if (t === null) return !1
      for (var n = 0; n < t.length && n < e.length; n++) if (!xr(e[n], t[n])) return !1
      return !0
    }
    function bo(e, t, n, r, i, a) {
      return (
        (lo = a),
        (U = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (N.H = e === null || e.memoizedState === null ? Ls : Rs),
        (G = !1),
        (a = n(r, i)),
        (G = !1),
        po && (a = So(t, n, r, i)),
        xo(e),
        a
      )
    }
    function xo(e) {
      N.H = Is
      var t = W !== null && W.next !== null
      if (((lo = 0), (uo = W = U = null), (fo = !1), (ho = 0), (go = null), t)) throw Error(o(300))
      e === null || tc || ((e = e.dependencies), e !== null && Zi(e) && (tc = !0))
    }
    function So(e, t, n, r) {
      U = e
      var i = 0
      do {
        if ((po && (go = null), (ho = 0), (po = !1), 25 <= i)) throw Error(o(301))
        if (((i += 1), (uo = W = null), e.updateQueue != null)) {
          var a = e.updateQueue
          ;((a.lastEffect = null),
            (a.events = null),
            (a.stores = null),
            a.memoCache != null && (a.memoCache.index = 0))
        }
        ;((N.H = zs), (a = t(n, r)))
      } while (po)
      return a
    }
    function Co() {
      var e = N.H,
        t = e.useState()[0]
      return (
        (t = typeof t.then == `function` ? Ao(t) : t),
        (e = e.useState()[0]),
        (W === null ? null : W.memoizedState) !== e && (U.flags |= 1024),
        t
      )
    }
    function wo() {
      var e = mo !== 0
      return ((mo = 0), e)
    }
    function To(e, t, n) {
      ;((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n))
    }
    function Eo(e) {
      if (fo) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue
          ;(t !== null && (t.pending = null), (e = e.next))
        }
        fo = !1
      }
      ;((lo = 0), (uo = W = U = null), (po = !1), (ho = mo = 0), (go = null))
    }
    function Do() {
      var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null }
      return (uo === null ? (U.memoizedState = uo = e) : (uo = uo.next = e), uo)
    }
    function Oo() {
      if (W === null) {
        var e = U.alternate
        e = e === null ? null : e.memoizedState
      } else e = W.next
      var t = uo === null ? U.memoizedState : uo.next
      if (t !== null) ((uo = t), (W = e))
      else {
        if (e === null) throw U.alternate === null ? Error(o(467)) : Error(o(310))
        ;((W = e),
          (e = {
            memoizedState: W.memoizedState,
            baseState: W.baseState,
            baseQueue: W.baseQueue,
            queue: W.queue,
            next: null,
          }),
          uo === null ? (U.memoizedState = uo = e) : (uo = uo.next = e))
      }
      return uo
    }
    function ko() {
      return { lastEffect: null, events: null, stores: null, memoCache: null }
    }
    function Ao(e) {
      var t = ho
      return (
        (ho += 1),
        go === null && (go = []),
        (e = Ta(go, e, t)),
        (t = U),
        (uo === null ? t.memoizedState : uo.next) === null &&
          ((t = t.alternate), (N.H = t === null || t.memoizedState === null ? Ls : Rs)),
        e
      )
    }
    function jo(e) {
      if (typeof e == `object` && e) {
        if (typeof e.then == `function`) return Ao(e)
        if (e.$$typeof === C) return $i(e)
      }
      throw Error(o(438, String(e)))
    }
    function Mo(e) {
      var t = null,
        n = U.updateQueue
      if ((n !== null && (t = n.memoCache), t == null)) {
        var r = U.alternate
        r !== null &&
          ((r = r.updateQueue),
          r !== null &&
            ((r = r.memoCache),
            r != null &&
              (t = {
                data: r.data.map(function (e) {
                  return e.slice()
                }),
                index: 0,
              })))
      }
      if (
        ((t ??= { data: [], index: 0 }),
        n === null && ((n = ko()), (U.updateQueue = n)),
        (n.memoCache = t),
        (n = t.data[t.index]),
        n === void 0)
      )
        for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = A
      return (t.index++, n)
    }
    function No(e, t) {
      return typeof t == `function` ? t(e) : t
    }
    function Po(e) {
      return Fo(Oo(), W, e)
    }
    function Fo(e, t, n) {
      var r = e.queue
      if (r === null) throw Error(o(311))
      r.lastRenderedReducer = n
      var i = e.baseQueue,
        a = r.pending
      if (a !== null) {
        if (i !== null) {
          var s = i.next
          ;((i.next = a.next), (a.next = s))
        }
        ;((t.baseQueue = i = a), (r.pending = null))
      }
      if (((a = e.baseState), i === null)) e.memoizedState = a
      else {
        t = i.next
        var c = (s = null),
          l = null,
          u = t,
          d = !1
        do {
          var f = u.lane & -536870913
          if (f === u.lane ? (lo & f) === f : (Y & f) === f) {
            var p = u.revertLane
            if (p === 0)
              (l !== null &&
                (l = l.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    gesture: null,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null,
                  }),
                f === ua && (d = !0))
            else if ((lo & p) === p) {
              ;((u = u.next), p === ua && (d = !0))
              continue
            } else
              ((f = {
                lane: 0,
                revertLane: u.revertLane,
                gesture: null,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null,
              }),
                l === null ? ((c = l = f), (s = a)) : (l = l.next = f),
                (U.lanes |= p),
                (Gl |= p))
            ;((f = u.action), G && n(a, f), (a = u.hasEagerState ? u.eagerState : n(a, f)))
          } else
            ((p = {
              lane: f,
              revertLane: u.revertLane,
              gesture: u.gesture,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
              l === null ? ((c = l = p), (s = a)) : (l = l.next = p),
              (U.lanes |= f),
              (Gl |= f))
          u = u.next
        } while (u !== null && u !== t)
        if (
          (l === null ? (s = a) : (l.next = c),
          !xr(a, e.memoizedState) && ((tc = !0), d && ((n = da), n !== null)))
        )
          throw n
        ;((e.memoizedState = a), (e.baseState = s), (e.baseQueue = l), (r.lastRenderedState = a))
      }
      return (i === null && (r.lanes = 0), [e.memoizedState, r.dispatch])
    }
    function Io(e) {
      var t = Oo(),
        n = t.queue
      if (n === null) throw Error(o(311))
      n.lastRenderedReducer = e
      var r = n.dispatch,
        i = n.pending,
        a = t.memoizedState
      if (i !== null) {
        n.pending = null
        var s = (i = i.next)
        do ((a = e(a, s.action)), (s = s.next))
        while (s !== i)
        ;(xr(a, t.memoizedState) || (tc = !0),
          (t.memoizedState = a),
          t.baseQueue === null && (t.baseState = a),
          (n.lastRenderedState = a))
      }
      return [a, r]
    }
    function Lo(e, t, n) {
      var r = U,
        i = Oo(),
        a = V
      if (a) {
        if (n === void 0) throw Error(o(407))
        n = n()
      } else n = t()
      var s = !xr((W || i).memoizedState, n)
      if (
        (s && ((i.memoizedState = n), (tc = !0)),
        (i = i.queue),
        cs(Bo.bind(null, r, i, e), [e]),
        i.getSnapshot !== t || s || (uo !== null && uo.memoizedState.tag & 1))
      ) {
        if (
          ((r.flags |= 2048),
          rs(9, { destroy: void 0 }, zo.bind(null, r, i, n, t), null),
          q === null)
        )
          throw Error(o(349))
        a || lo & 127 || Ro(r, t, n)
      }
      return n
    }
    function Ro(e, t, n) {
      ;((e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = U.updateQueue),
        t === null
          ? ((t = ko()), (U.updateQueue = t), (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)))
    }
    function zo(e, t, n, r) {
      ;((t.value = n), (t.getSnapshot = r), Vo(t) && Ho(e))
    }
    function Bo(e, t, n) {
      return n(function () {
        Vo(t) && Ho(e)
      })
    }
    function Vo(e) {
      var t = e.getSnapshot
      e = e.value
      try {
        var n = t()
        return !xr(e, n)
      } catch {
        return !0
      }
    }
    function Ho(e) {
      var t = ni(e, 2)
      t !== null && hu(t, e, 2)
    }
    function Uo(e) {
      var t = Do()
      if (typeof e == `function`) {
        var n = e
        if (((e = n()), G)) {
          ze(!0)
          try {
            n()
          } finally {
            ze(!1)
          }
        }
      }
      return (
        (t.memoizedState = t.baseState = e),
        (t.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: No,
          lastRenderedState: e,
        }),
        t
      )
    }
    function Wo(e, t, n, r) {
      return ((e.baseState = n), Fo(e, W, typeof r == `function` ? r : No))
    }
    function Go(e, t, n, r, i) {
      if (Ns(e)) throw Error(o(485))
      if (((e = t.action), e !== null)) {
        var a = {
          payload: i,
          action: e,
          next: null,
          isTransition: !0,
          status: `pending`,
          value: null,
          reason: null,
          listeners: [],
          then: function (e) {
            a.listeners.push(e)
          },
        }
        ;(N.T === null ? (a.isTransition = !1) : n(!0),
          r(a),
          (n = t.pending),
          n === null
            ? ((a.next = t.pending = a), Ko(t, a))
            : ((a.next = n.next), (t.pending = n.next = a)))
      }
    }
    function Ko(e, t) {
      var n = t.action,
        r = t.payload,
        i = e.state
      if (t.isTransition) {
        var a = N.T,
          o = {}
        N.T = o
        try {
          var s = n(i, r),
            c = N.S
          ;(c !== null && c(o, s), qo(e, t, s))
        } catch (n) {
          Yo(e, t, n)
        } finally {
          ;(a !== null && o.types !== null && (a.types = o.types), (N.T = a))
        }
      } else
        try {
          ;((a = n(i, r)), qo(e, t, a))
        } catch (n) {
          Yo(e, t, n)
        }
    }
    function qo(e, t, n) {
      typeof n == `object` && n && typeof n.then == `function`
        ? n.then(
            function (n) {
              Jo(e, t, n)
            },
            function (n) {
              return Yo(e, t, n)
            },
          )
        : Jo(e, t, n)
    }
    function Jo(e, t, n) {
      ;((t.status = `fulfilled`),
        (t.value = n),
        Xo(t),
        (e.state = n),
        (t = e.pending),
        t !== null &&
          ((n = t.next), n === t ? (e.pending = null) : ((n = n.next), (t.next = n), Ko(e, n))))
    }
    function Yo(e, t, n) {
      var r = e.pending
      if (((e.pending = null), r !== null)) {
        r = r.next
        do ((t.status = `rejected`), (t.reason = n), Xo(t), (t = t.next))
        while (t !== r)
      }
      e.action = null
    }
    function Xo(e) {
      e = e.listeners
      for (var t = 0; t < e.length; t++) (0, e[t])()
    }
    function Zo(e, t) {
      return t
    }
    function Qo(e, t) {
      if (V) {
        var n = q.formState
        if (n !== null) {
          a: {
            var r = U
            if (V) {
              if (B) {
                b: {
                  for (var i = B, a = Pi; i.nodeType !== 8; ) {
                    if (!a) {
                      i = null
                      break b
                    }
                    if (((i = cf(i.nextSibling)), i === null)) {
                      i = null
                      break b
                    }
                  }
                  ;((a = i.data), (i = a === `F!` || a === `F` ? i : null))
                }
                if (i) {
                  ;((B = cf(i.nextSibling)), (r = i.data === `F!`))
                  break a
                }
              }
              Ii(r)
            }
            r = !1
          }
          r && (t = n[0])
        }
      }
      return (
        (n = Do()),
        (n.memoizedState = n.baseState = t),
        (r = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Zo,
          lastRenderedState: t,
        }),
        (n.queue = r),
        (n = As.bind(null, U, r)),
        (r.dispatch = n),
        (r = Uo(!1)),
        (a = Ms.bind(null, U, !1, r.queue)),
        (r = Do()),
        (i = { state: t, dispatch: null, action: e, pending: null }),
        (r.queue = i),
        (n = Go.bind(null, U, i, a, n)),
        (i.dispatch = n),
        (r.memoizedState = e),
        [t, n, !1]
      )
    }
    function $o(e) {
      return es(Oo(), W, e)
    }
    function es(e, t, n) {
      if (
        ((t = Fo(e, t, Zo)[0]),
        (e = Po(No)[0]),
        typeof t == `object` && t && typeof t.then == `function`)
      )
        try {
          var r = Ao(t)
        } catch (e) {
          throw e === ba ? Sa : e
        }
      else r = t
      t = Oo()
      var i = t.queue,
        a = i.dispatch
      return (
        n !== t.memoizedState &&
          ((U.flags |= 2048), rs(9, { destroy: void 0 }, ts.bind(null, i, n), null)),
        [r, a, e]
      )
    }
    function ts(e, t) {
      e.action = t
    }
    function ns(e) {
      var t = Oo(),
        n = W
      if (n !== null) return es(t, n, e)
      ;(Oo(), (t = t.memoizedState), (n = Oo()))
      var r = n.queue.dispatch
      return ((n.memoizedState = e), [t, r, !1])
    }
    function rs(e, t, n, r) {
      return (
        (e = { tag: e, create: n, deps: r, inst: t, next: null }),
        (t = U.updateQueue),
        t === null && ((t = ko()), (U.updateQueue = t)),
        (n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
        e
      )
    }
    function is() {
      return Oo().memoizedState
    }
    function as(e, t, n, r) {
      var i = Do()
      ;((U.flags |= e),
        (i.memoizedState = rs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r)))
    }
    function os(e, t, n, r) {
      var i = Oo()
      r = r === void 0 ? null : r
      var a = i.memoizedState.inst
      W !== null && r !== null && yo(r, W.memoizedState.deps)
        ? (i.memoizedState = rs(t, a, n, r))
        : ((U.flags |= e), (i.memoizedState = rs(1 | t, a, n, r)))
    }
    function ss(e, t) {
      as(8390656, 8, e, t)
    }
    function cs(e, t) {
      os(2048, 8, e, t)
    }
    function ls(e) {
      U.flags |= 4
      var t = U.updateQueue
      if (t === null) ((t = ko()), (U.updateQueue = t), (t.events = [e]))
      else {
        var n = t.events
        n === null ? (t.events = [e]) : n.push(e)
      }
    }
    function us(e) {
      var t = Oo().memoizedState
      return (
        ls({ ref: t, nextImpl: e }),
        function () {
          if (K & 2) throw Error(o(440))
          return t.impl.apply(void 0, arguments)
        }
      )
    }
    function ds(e, t) {
      return os(4, 2, e, t)
    }
    function fs(e, t) {
      return os(4, 4, e, t)
    }
    function ps(e, t) {
      if (typeof t == `function`) {
        e = e()
        var n = t(e)
        return function () {
          typeof n == `function` ? n() : t(null)
        }
      }
      if (t != null)
        return (
          (e = e()),
          (t.current = e),
          function () {
            t.current = null
          }
        )
    }
    function ms(e, t, n) {
      ;((n = n == null ? null : n.concat([e])), os(4, 4, ps.bind(null, t, e), n))
    }
    function hs() {}
    function gs(e, t) {
      var n = Oo()
      t = t === void 0 ? null : t
      var r = n.memoizedState
      return t !== null && yo(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e)
    }
    function _s(e, t) {
      var n = Oo()
      t = t === void 0 ? null : t
      var r = n.memoizedState
      if (t !== null && yo(t, r[1])) return r[0]
      if (((r = e()), G)) {
        ze(!0)
        try {
          e()
        } finally {
          ze(!1)
        }
      }
      return ((n.memoizedState = [r, t]), r)
    }
    function vs(e, t, n) {
      return n === void 0 || (lo & 1073741824 && !(Y & 261930))
        ? (e.memoizedState = t)
        : ((e.memoizedState = n), (e = mu()), (U.lanes |= e), (Gl |= e), n)
    }
    function ys(e, t, n, r) {
      return xr(n, t)
        ? n
        : Xa.current === null
          ? !(lo & 42) || (lo & 1073741824 && !(Y & 261930))
            ? ((tc = !0), (e.memoizedState = n))
            : ((e = mu()), (U.lanes |= e), (Gl |= e), t)
          : ((e = vs(e, n, r)), xr(e, t) || (tc = !0), e)
    }
    function bs(e, t, n, r, i) {
      var a = P.p
      P.p = a !== 0 && 8 > a ? a : 8
      var o = N.T,
        s = {}
      ;((N.T = s), Ms(e, !1, t, n))
      try {
        var c = i(),
          l = N.S
        ;(l !== null && l(s, c),
          typeof c == `object` && c && typeof c.then == `function`
            ? js(e, t, ma(c, r), pu(e))
            : js(e, t, r, pu(e)))
      } catch (n) {
        js(e, t, { then: function () {}, status: `rejected`, reason: n }, pu())
      } finally {
        ;((P.p = a), o !== null && s.types !== null && (o.types = s.types), (N.T = o))
      }
    }
    function xs() {}
    function Ss(e, t, n, r) {
      if (e.tag !== 5) throw Error(o(476))
      var i = Cs(e).queue
      bs(
        e,
        i,
        t,
        re,
        n === null
          ? xs
          : function () {
              return (ws(e), n(r))
            },
      )
    }
    function Cs(e) {
      var t = e.memoizedState
      if (t !== null) return t
      t = {
        memoizedState: re,
        baseState: re,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: No,
          lastRenderedState: re,
        },
        next: null,
      }
      var n = {}
      return (
        (t.next = {
          memoizedState: n,
          baseState: n,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: No,
            lastRenderedState: n,
          },
          next: null,
        }),
        (e.memoizedState = t),
        (e = e.alternate),
        e !== null && (e.memoizedState = t),
        t
      )
    }
    function ws(e) {
      var t = Cs(e)
      ;(t.next === null && (t = e.alternate.memoizedState), js(e, t.next.queue, {}, pu()))
    }
    function Ts() {
      return $i(Qf)
    }
    function Es() {
      return Oo().memoizedState
    }
    function Ds() {
      return Oo().memoizedState
    }
    function Os(e) {
      for (var t = e.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var n = pu()
            e = Va(n)
            var r = Ha(t, e, n)
            ;(r !== null && (hu(r, t, n), Ua(r, t, n)), (t = { cache: oa() }), (e.payload = t))
            return
        }
        t = t.return
      }
    }
    function ks(e, t, n) {
      var r = pu()
      ;((n = {
        lane: r,
        revertLane: 0,
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
        Ns(e) ? Ps(t, n) : ((n = ti(e, t, n, r)), n !== null && (hu(n, e, r), Fs(n, t, r))))
    }
    function As(e, t, n) {
      js(e, t, n, pu())
    }
    function js(e, t, n, r) {
      var i = {
        lane: r,
        revertLane: 0,
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }
      if (Ns(e)) Ps(t, i)
      else {
        var a = e.alternate
        if (
          e.lanes === 0 &&
          (a === null || a.lanes === 0) &&
          ((a = t.lastRenderedReducer), a !== null)
        )
          try {
            var o = t.lastRenderedState,
              s = a(o, n)
            if (((i.hasEagerState = !0), (i.eagerState = s), xr(s, o)))
              return (ei(e, t, i, 0), q === null && $r(), !1)
          } catch {}
        if (((n = ti(e, t, i, r)), n !== null)) return (hu(n, e, r), Fs(n, t, r), !0)
      }
      return !1
    }
    function Ms(e, t, n, r) {
      if (
        ((r = {
          lane: 2,
          revertLane: dd(),
          gesture: null,
          action: r,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        Ns(e))
      ) {
        if (t) throw Error(o(479))
      } else ((t = ti(e, n, r, 2)), t !== null && hu(t, e, 2))
    }
    function Ns(e) {
      var t = e.alternate
      return e === U || (t !== null && t === U)
    }
    function Ps(e, t) {
      po = fo = !0
      var n = e.pending
      ;(n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t))
    }
    function Fs(e, t, n) {
      if (n & 4194048) {
        var r = t.lanes
        ;((r &= e.pendingLanes), (n |= r), (t.lanes = n), nt(e, n))
      }
    }
    var Is = {
      readContext: $i,
      use: jo,
      useCallback: vo,
      useContext: vo,
      useEffect: vo,
      useImperativeHandle: vo,
      useLayoutEffect: vo,
      useInsertionEffect: vo,
      useMemo: vo,
      useReducer: vo,
      useRef: vo,
      useState: vo,
      useDebugValue: vo,
      useDeferredValue: vo,
      useTransition: vo,
      useSyncExternalStore: vo,
      useId: vo,
      useHostTransitionStatus: vo,
      useFormState: vo,
      useActionState: vo,
      useOptimistic: vo,
      useMemoCache: vo,
      useCacheRefresh: vo,
    }
    Is.useEffectEvent = vo
    var Ls = {
        readContext: $i,
        use: jo,
        useCallback: function (e, t) {
          return ((Do().memoizedState = [e, t === void 0 ? null : t]), e)
        },
        useContext: $i,
        useEffect: ss,
        useImperativeHandle: function (e, t, n) {
          ;((n = n == null ? null : n.concat([e])), as(4194308, 4, ps.bind(null, t, e), n))
        },
        useLayoutEffect: function (e, t) {
          return as(4194308, 4, e, t)
        },
        useInsertionEffect: function (e, t) {
          as(4, 2, e, t)
        },
        useMemo: function (e, t) {
          var n = Do()
          t = t === void 0 ? null : t
          var r = e()
          if (G) {
            ze(!0)
            try {
              e()
            } finally {
              ze(!1)
            }
          }
          return ((n.memoizedState = [r, t]), r)
        },
        useReducer: function (e, t, n) {
          var r = Do()
          if (n !== void 0) {
            var i = n(t)
            if (G) {
              ze(!0)
              try {
                n(t)
              } finally {
                ze(!1)
              }
            }
          } else i = t
          return (
            (r.memoizedState = r.baseState = i),
            (e = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: i,
            }),
            (r.queue = e),
            (e = e.dispatch = ks.bind(null, U, e)),
            [r.memoizedState, e]
          )
        },
        useRef: function (e) {
          var t = Do()
          return ((e = { current: e }), (t.memoizedState = e))
        },
        useState: function (e) {
          e = Uo(e)
          var t = e.queue,
            n = As.bind(null, U, t)
          return ((t.dispatch = n), [e.memoizedState, n])
        },
        useDebugValue: hs,
        useDeferredValue: function (e, t) {
          return vs(Do(), e, t)
        },
        useTransition: function () {
          var e = Uo(!1)
          return ((e = bs.bind(null, U, e.queue, !0, !1)), (Do().memoizedState = e), [!1, e])
        },
        useSyncExternalStore: function (e, t, n) {
          var r = U,
            i = Do()
          if (V) {
            if (n === void 0) throw Error(o(407))
            n = n()
          } else {
            if (((n = t()), q === null)) throw Error(o(349))
            Y & 127 || Ro(r, t, n)
          }
          i.memoizedState = n
          var a = { value: n, getSnapshot: t }
          return (
            (i.queue = a),
            ss(Bo.bind(null, r, a, e), [e]),
            (r.flags |= 2048),
            rs(9, { destroy: void 0 }, zo.bind(null, r, a, n, t), null),
            n
          )
        },
        useId: function () {
          var e = Do(),
            t = q.identifierPrefix
          if (V) {
            var n = Ei,
              r = Ti
            ;((n = (r & ~(1 << (32 - Be(r) - 1))).toString(32) + n),
              (t = `_` + t + `R_` + n),
              (n = mo++),
              0 < n && (t += `H` + n.toString(32)),
              (t += `_`))
          } else ((n = _o++), (t = `_` + t + `r_` + n.toString(32) + `_`))
          return (e.memoizedState = t)
        },
        useHostTransitionStatus: Ts,
        useFormState: Qo,
        useActionState: Qo,
        useOptimistic: function (e) {
          var t = Do()
          t.memoizedState = t.baseState = e
          var n = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null,
          }
          return ((t.queue = n), (t = Ms.bind(null, U, !0, n)), (n.dispatch = t), [e, t])
        },
        useMemoCache: Mo,
        useCacheRefresh: function () {
          return (Do().memoizedState = Os.bind(null, U))
        },
        useEffectEvent: function (e) {
          var t = Do(),
            n = { impl: e }
          return (
            (t.memoizedState = n),
            function () {
              if (K & 2) throw Error(o(440))
              return n.impl.apply(void 0, arguments)
            }
          )
        },
      },
      Rs = {
        readContext: $i,
        use: jo,
        useCallback: gs,
        useContext: $i,
        useEffect: cs,
        useImperativeHandle: ms,
        useInsertionEffect: ds,
        useLayoutEffect: fs,
        useMemo: _s,
        useReducer: Po,
        useRef: is,
        useState: function () {
          return Po(No)
        },
        useDebugValue: hs,
        useDeferredValue: function (e, t) {
          return ys(Oo(), W.memoizedState, e, t)
        },
        useTransition: function () {
          var e = Po(No)[0],
            t = Oo().memoizedState
          return [typeof e == `boolean` ? e : Ao(e), t]
        },
        useSyncExternalStore: Lo,
        useId: Es,
        useHostTransitionStatus: Ts,
        useFormState: $o,
        useActionState: $o,
        useOptimistic: function (e, t) {
          return Wo(Oo(), W, e, t)
        },
        useMemoCache: Mo,
        useCacheRefresh: Ds,
      }
    Rs.useEffectEvent = us
    var zs = {
      readContext: $i,
      use: jo,
      useCallback: gs,
      useContext: $i,
      useEffect: cs,
      useImperativeHandle: ms,
      useInsertionEffect: ds,
      useLayoutEffect: fs,
      useMemo: _s,
      useReducer: Io,
      useRef: is,
      useState: function () {
        return Io(No)
      },
      useDebugValue: hs,
      useDeferredValue: function (e, t) {
        var n = Oo()
        return W === null ? vs(n, e, t) : ys(n, W.memoizedState, e, t)
      },
      useTransition: function () {
        var e = Io(No)[0],
          t = Oo().memoizedState
        return [typeof e == `boolean` ? e : Ao(e), t]
      },
      useSyncExternalStore: Lo,
      useId: Es,
      useHostTransitionStatus: Ts,
      useFormState: ns,
      useActionState: ns,
      useOptimistic: function (e, t) {
        var n = Oo()
        return W === null ? ((n.baseState = e), [e, n.queue.dispatch]) : Wo(n, W, e, t)
      },
      useMemoCache: Mo,
      useCacheRefresh: Ds,
    }
    zs.useEffectEvent = us
    function Bs(e, t, n, r) {
      ;((t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : h({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n))
    }
    var Vs = {
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals
        var r = pu(),
          i = Va(r)
        ;((i.payload = t),
          n != null && (i.callback = n),
          (t = Ha(e, i, r)),
          t !== null && (hu(t, e, r), Ua(t, e, r)))
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals
        var r = pu(),
          i = Va(r)
        ;((i.tag = 1),
          (i.payload = t),
          n != null && (i.callback = n),
          (t = Ha(e, i, r)),
          t !== null && (hu(t, e, r), Ua(t, e, r)))
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals
        var n = pu(),
          r = Va(n)
        ;((r.tag = 2),
          t != null && (r.callback = t),
          (t = Ha(e, r, n)),
          t !== null && (hu(t, e, n), Ua(t, e, n)))
      },
    }
    function Hs(e, t, n, r, i, a, o) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == `function`
          ? e.shouldComponentUpdate(r, a, o)
          : t.prototype && t.prototype.isPureReactComponent
            ? !Sr(n, r) || !Sr(i, a)
            : !0
      )
    }
    function Us(e, t, n, r) {
      ;((e = t.state),
        typeof t.componentWillReceiveProps == `function` && t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == `function` &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && Vs.enqueueReplaceState(t, t.state, null))
    }
    function Ws(e, t) {
      var n = t
      if (`ref` in t) for (var r in ((n = {}), t)) r !== `ref` && (n[r] = t[r])
      if ((e = e.defaultProps))
        for (var i in (n === t && (n = h({}, n)), e)) n[i] === void 0 && (n[i] = e[i])
      return n
    }
    function Gs(e) {
      Yr(e)
    }
    function Ks(e) {
      console.error(e)
    }
    function qs(e) {
      Yr(e)
    }
    function Js(e, t) {
      try {
        var n = e.onUncaughtError
        n(t.value, { componentStack: t.stack })
      } catch (e) {
        setTimeout(function () {
          throw e
        })
      }
    }
    function Ys(e, t, n) {
      try {
        var r = e.onCaughtError
        r(n.value, { componentStack: n.stack, errorBoundary: t.tag === 1 ? t.stateNode : null })
      } catch (e) {
        setTimeout(function () {
          throw e
        })
      }
    }
    function Xs(e, t, n) {
      return (
        (n = Va(n)),
        (n.tag = 3),
        (n.payload = { element: null }),
        (n.callback = function () {
          Js(e, t)
        }),
        n
      )
    }
    function Zs(e) {
      return ((e = Va(e)), (e.tag = 3), e)
    }
    function Qs(e, t, n, r) {
      var i = n.type.getDerivedStateFromError
      if (typeof i == `function`) {
        var a = r.value
        ;((e.payload = function () {
          return i(a)
        }),
          (e.callback = function () {
            Ys(t, n, r)
          }))
      }
      var o = n.stateNode
      o !== null &&
        typeof o.componentDidCatch == `function` &&
        (e.callback = function () {
          ;(Ys(t, n, r),
            typeof i != `function` && (ru === null ? (ru = new Set([this])) : ru.add(this)))
          var e = r.stack
          this.componentDidCatch(r.value, { componentStack: e === null ? `` : e })
        })
    }
    function $s(e, t, n, r, i) {
      if (((n.flags |= 32768), typeof r == `object` && r && typeof r.then == `function`)) {
        if (((t = n.alternate), t !== null && Xi(t, n, i, !0), (n = H.current), n !== null)) {
          switch (n.tag) {
            case 31:
            case 13:
              return (
                to === null ? Du() : n.alternate === null && Wl === 0 && (Wl = 3),
                (n.flags &= -257),
                (n.flags |= 65536),
                (n.lanes = i),
                r === Ca
                  ? (n.flags |= 16384)
                  : ((t = n.updateQueue),
                    t === null ? (n.updateQueue = new Set([r])) : t.add(r),
                    Gu(e, r, i)),
                !1
              )
            case 22:
              return (
                (n.flags |= 65536),
                r === Ca
                  ? (n.flags |= 16384)
                  : ((t = n.updateQueue),
                    t === null
                      ? ((t = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([r]),
                        }),
                        (n.updateQueue = t))
                      : ((n = t.retryQueue), n === null ? (t.retryQueue = new Set([r])) : n.add(r)),
                    Gu(e, r, i)),
                !1
              )
          }
          throw Error(o(435, n.tag))
        }
        return (Gu(e, r, i), Du(), !1)
      }
      if (V)
        return (
          (t = H.current),
          t === null
            ? (r !== Fi && ((t = Error(o(423), { cause: r })), Hi(_i(t, n))),
              (e = e.current.alternate),
              (e.flags |= 65536),
              (i &= -i),
              (e.lanes |= i),
              (r = _i(r, n)),
              (i = Xs(e.stateNode, r, i)),
              Wa(e, i),
              Wl !== 4 && (Wl = 2))
            : (!(t.flags & 65536) && (t.flags |= 256),
              (t.flags |= 65536),
              (t.lanes = i),
              r !== Fi && ((e = Error(o(422), { cause: r })), Hi(_i(e, n)))),
          !1
        )
      var a = Error(o(520), { cause: r })
      if (((a = _i(a, n)), Xl === null ? (Xl = [a]) : Xl.push(a), Wl !== 4 && (Wl = 2), t === null))
        return !0
      ;((r = _i(r, n)), (n = t))
      do {
        switch (n.tag) {
          case 3:
            return (
              (n.flags |= 65536),
              (e = i & -i),
              (n.lanes |= e),
              (e = Xs(n.stateNode, r, e)),
              Wa(n, e),
              !1
            )
          case 1:
            if (
              ((t = n.type),
              (a = n.stateNode),
              !(n.flags & 128) &&
                (typeof t.getDerivedStateFromError == `function` ||
                  (a !== null &&
                    typeof a.componentDidCatch == `function` &&
                    (ru === null || !ru.has(a)))))
            )
              return (
                (n.flags |= 65536),
                (i &= -i),
                (n.lanes |= i),
                (i = Zs(i)),
                Qs(i, e, n, r),
                Wa(n, i),
                !1
              )
        }
        n = n.return
      } while (n !== null)
      return !1
    }
    var ec = Error(o(461)),
      tc = !1
    function nc(e, t, n, r) {
      t.child = e === null ? La(t, null, n, r) : Ia(t, e.child, n, r)
    }
    function rc(e, t, n, r, i) {
      n = n.render
      var a = t.ref
      if (`ref` in r) {
        var o = {}
        for (var s in r) s !== `ref` && (o[s] = r[s])
      } else o = r
      return (
        Qi(t),
        (r = bo(e, t, n, o, a, i)),
        (s = wo()),
        e !== null && !tc
          ? (To(e, t, i), Dc(e, t, i))
          : (V && s && ki(t), (t.flags |= 1), nc(e, t, r, i), t.child)
      )
    }
    function ic(e, t, n, r, i) {
      if (e === null) {
        var a = n.type
        return typeof a == `function` && !ci(a) && a.defaultProps === void 0 && n.compare === null
          ? ((t.tag = 15), (t.type = a), ac(e, t, a, r, i))
          : ((e = di(n.type, null, r, t, t.mode, i)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e))
      }
      if (((a = e.child), !Oc(e, i))) {
        var o = a.memoizedProps
        if (((n = n.compare), (n = n === null ? Sr : n), n(o, r) && e.ref === t.ref))
          return Dc(e, t, i)
      }
      return ((t.flags |= 1), (e = li(a, r)), (e.ref = t.ref), (e.return = t), (t.child = e))
    }
    function ac(e, t, n, r, i) {
      if (e !== null) {
        var a = e.memoizedProps
        if (Sr(a, r) && e.ref === t.ref)
          if (((tc = !1), (t.pendingProps = r = a), Oc(e, i))) e.flags & 131072 && (tc = !0)
          else return ((t.lanes = e.lanes), Dc(e, t, i))
      }
      return pc(e, t, n, r, i)
    }
    function oc(e, t, n, r) {
      var i = r.children,
        a = e === null ? null : e.memoizedState
      if (
        (e === null &&
          t.stateNode === null &&
          (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        r.mode === `hidden`)
      ) {
        if (t.flags & 128) {
          if (((a = a === null ? n : a.baseLanes | n), e !== null)) {
            for (r = t.child = e.child, i = 0; r !== null; )
              ((i = i | r.lanes | r.childLanes), (r = r.sibling))
            r = i & ~a
          } else ((r = 0), (t.child = null))
          return cc(e, t, a, n, r)
        }
        if (n & 536870912)
          ((t.memoizedState = { baseLanes: 0, cachePool: null }),
            e !== null && va(t, a === null ? null : a.cachePool),
            a === null ? $a() : Qa(t, a),
            io(t))
        else return ((r = t.lanes = 536870912), cc(e, t, a === null ? n : a.baseLanes | n, n, r))
      } else
        a === null
          ? (e !== null && va(t, null), $a(), ao(t))
          : (va(t, a.cachePool), Qa(t, a), ao(t), (t.memoizedState = null))
      return (nc(e, t, i, n), t.child)
    }
    function sc(e, t) {
      return (
        (e !== null && e.tag === 22) ||
          t.stateNode !== null ||
          (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        t.sibling
      )
    }
    function cc(e, t, n, r, i) {
      var a = _a()
      return (
        (a = a === null ? null : { parent: aa._currentValue, pool: a }),
        (t.memoizedState = { baseLanes: n, cachePool: a }),
        e !== null && va(t, null),
        $a(),
        io(t),
        e !== null && Xi(e, t, r, !0),
        (t.childLanes = i),
        null
      )
    }
    function lc(e, t) {
      return (
        (t = Sc({ mode: t.mode, children: t.children }, e.mode)),
        (t.ref = e.ref),
        (e.child = t),
        (t.return = e),
        t
      )
    }
    function uc(e, t, n) {
      return (
        Ia(t, e.child, null, n),
        (e = lc(t, t.pendingProps)),
        (e.flags |= 2),
        oo(t),
        (t.memoizedState = null),
        e
      )
    }
    function dc(e, t, n) {
      var r = t.pendingProps,
        i = (t.flags & 128) != 0
      if (((t.flags &= -129), e === null)) {
        if (V) {
          if (r.mode === `hidden`) return ((e = lc(t, r)), (t.lanes = 536870912), sc(null, e))
          if (
            (ro(t),
            (e = B)
              ? ((e = rf(e, Pi)),
                (e = e !== null && e.data === `&` ? e : null),
                e !== null &&
                  ((t.memoizedState = {
                    dehydrated: e,
                    treeContext: wi === null ? null : { id: Ti, overflow: Ei },
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (n = mi(e)),
                  (n.return = t),
                  (t.child = n),
                  (Mi = t),
                  (B = null)))
              : (e = null),
            e === null)
          )
            throw Ii(t)
          return ((t.lanes = 536870912), null)
        }
        return lc(t, r)
      }
      var a = e.memoizedState
      if (a !== null) {
        var s = a.dehydrated
        if ((ro(t), i))
          if (t.flags & 256) ((t.flags &= -257), (t = uc(e, t, n)))
          else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null))
          else throw Error(o(558))
        else if ((tc || Xi(e, t, n, !1), (i = (n & e.childLanes) !== 0), tc || i)) {
          if (((r = q), r !== null && ((s = rt(r, n)), s !== 0 && s !== a.retryLane)))
            throw ((a.retryLane = s), ni(e, s), hu(r, e, s), ec)
          ;(Du(), (t = uc(e, t, n)))
        } else
          ((e = a.treeContext),
            (B = cf(s.nextSibling)),
            (Mi = t),
            (V = !0),
            (Ni = null),
            (Pi = !1),
            e !== null && ji(t, e),
            (t = lc(t, r)),
            (t.flags |= 4096))
        return t
      }
      return (
        (e = li(e.child, { mode: r.mode, children: r.children })),
        (e.ref = t.ref),
        (t.child = e),
        (e.return = t),
        e
      )
    }
    function fc(e, t) {
      var n = t.ref
      if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816)
      else {
        if (typeof n != `function` && typeof n != `object`) throw Error(o(284))
        ;(e === null || e.ref !== n) && (t.flags |= 4194816)
      }
    }
    function pc(e, t, n, r, i) {
      return (
        Qi(t),
        (n = bo(e, t, n, r, void 0, i)),
        (r = wo()),
        e !== null && !tc
          ? (To(e, t, i), Dc(e, t, i))
          : (V && r && ki(t), (t.flags |= 1), nc(e, t, n, i), t.child)
      )
    }
    function mc(e, t, n, r, i, a) {
      return (
        Qi(t),
        (t.updateQueue = null),
        (n = So(t, r, n, i)),
        xo(e),
        (r = wo()),
        e !== null && !tc
          ? (To(e, t, a), Dc(e, t, a))
          : (V && r && ki(t), (t.flags |= 1), nc(e, t, n, a), t.child)
      )
    }
    function hc(e, t, n, r, i) {
      if ((Qi(t), t.stateNode === null)) {
        var a = ai,
          o = n.contextType
        ;(typeof o == `object` && o && (a = $i(o)),
          (a = new n(r, a)),
          (t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null),
          (a.updater = Vs),
          (t.stateNode = a),
          (a._reactInternals = t),
          (a = t.stateNode),
          (a.props = r),
          (a.state = t.memoizedState),
          (a.refs = {}),
          za(t),
          (o = n.contextType),
          (a.context = typeof o == `object` && o ? $i(o) : ai),
          (a.state = t.memoizedState),
          (o = n.getDerivedStateFromProps),
          typeof o == `function` && (Bs(t, n, o, r), (a.state = t.memoizedState)),
          typeof n.getDerivedStateFromProps == `function` ||
            typeof a.getSnapshotBeforeUpdate == `function` ||
            (typeof a.UNSAFE_componentWillMount != `function` &&
              typeof a.componentWillMount != `function`) ||
            ((o = a.state),
            typeof a.componentWillMount == `function` && a.componentWillMount(),
            typeof a.UNSAFE_componentWillMount == `function` && a.UNSAFE_componentWillMount(),
            o !== a.state && Vs.enqueueReplaceState(a, a.state, null),
            qa(t, r, a, i),
            Ka(),
            (a.state = t.memoizedState)),
          typeof a.componentDidMount == `function` && (t.flags |= 4194308),
          (r = !0))
      } else if (e === null) {
        a = t.stateNode
        var s = t.memoizedProps,
          c = Ws(n, s)
        a.props = c
        var l = a.context,
          u = n.contextType
        ;((o = ai), typeof u == `object` && u && (o = $i(u)))
        var d = n.getDerivedStateFromProps
        ;((u = typeof d == `function` || typeof a.getSnapshotBeforeUpdate == `function`),
          (s = t.pendingProps !== s),
          u ||
            (typeof a.UNSAFE_componentWillReceiveProps != `function` &&
              typeof a.componentWillReceiveProps != `function`) ||
            ((s || l !== o) && Us(t, a, r, o)),
          (Ra = !1))
        var f = t.memoizedState
        ;((a.state = f),
          qa(t, r, a, i),
          Ka(),
          (l = t.memoizedState),
          s || f !== l || Ra
            ? (typeof d == `function` && (Bs(t, n, d, r), (l = t.memoizedState)),
              (c = Ra || Hs(t, n, c, r, f, l, o))
                ? (u ||
                    (typeof a.UNSAFE_componentWillMount != `function` &&
                      typeof a.componentWillMount != `function`) ||
                    (typeof a.componentWillMount == `function` && a.componentWillMount(),
                    typeof a.UNSAFE_componentWillMount == `function` &&
                      a.UNSAFE_componentWillMount()),
                  typeof a.componentDidMount == `function` && (t.flags |= 4194308))
                : (typeof a.componentDidMount == `function` && (t.flags |= 4194308),
                  (t.memoizedProps = r),
                  (t.memoizedState = l)),
              (a.props = r),
              (a.state = l),
              (a.context = o),
              (r = c))
            : (typeof a.componentDidMount == `function` && (t.flags |= 4194308), (r = !1)))
      } else {
        ;((a = t.stateNode),
          Ba(e, t),
          (o = t.memoizedProps),
          (u = Ws(n, o)),
          (a.props = u),
          (d = t.pendingProps),
          (f = a.context),
          (l = n.contextType),
          (c = ai),
          typeof l == `object` && l && (c = $i(l)),
          (s = n.getDerivedStateFromProps),
          (l = typeof s == `function` || typeof a.getSnapshotBeforeUpdate == `function`) ||
            (typeof a.UNSAFE_componentWillReceiveProps != `function` &&
              typeof a.componentWillReceiveProps != `function`) ||
            ((o !== d || f !== c) && Us(t, a, r, c)),
          (Ra = !1),
          (f = t.memoizedState),
          (a.state = f),
          qa(t, r, a, i),
          Ka())
        var p = t.memoizedState
        o !== d || f !== p || Ra || (e !== null && e.dependencies !== null && Zi(e.dependencies))
          ? (typeof s == `function` && (Bs(t, n, s, r), (p = t.memoizedState)),
            (u =
              Ra ||
              Hs(t, n, u, r, f, p, c) ||
              (e !== null && e.dependencies !== null && Zi(e.dependencies)))
              ? (l ||
                  (typeof a.UNSAFE_componentWillUpdate != `function` &&
                    typeof a.componentWillUpdate != `function`) ||
                  (typeof a.componentWillUpdate == `function` && a.componentWillUpdate(r, p, c),
                  typeof a.UNSAFE_componentWillUpdate == `function` &&
                    a.UNSAFE_componentWillUpdate(r, p, c)),
                typeof a.componentDidUpdate == `function` && (t.flags |= 4),
                typeof a.getSnapshotBeforeUpdate == `function` && (t.flags |= 1024))
              : (typeof a.componentDidUpdate != `function` ||
                  (o === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                typeof a.getSnapshotBeforeUpdate != `function` ||
                  (o === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = r),
                (t.memoizedState = p)),
            (a.props = r),
            (a.state = p),
            (a.context = c),
            (r = u))
          : (typeof a.componentDidUpdate != `function` ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != `function` ||
              (o === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (r = !1))
      }
      return (
        (a = r),
        fc(e, t),
        (r = (t.flags & 128) != 0),
        a || r
          ? ((a = t.stateNode),
            (n = r && typeof n.getDerivedStateFromError != `function` ? null : a.render()),
            (t.flags |= 1),
            e !== null && r
              ? ((t.child = Ia(t, e.child, null, i)), (t.child = Ia(t, null, n, i)))
              : nc(e, t, n, i),
            (t.memoizedState = a.state),
            (e = t.child))
          : (e = Dc(e, t, i)),
        e
      )
    }
    function gc(e, t, n, r) {
      return (Bi(), (t.flags |= 256), nc(e, t, n, r), t.child)
    }
    var _c = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null }
    function vc(e) {
      return { baseLanes: e, cachePool: ya() }
    }
    function yc(e, t, n) {
      return ((e = e === null ? 0 : e.childLanes & ~n), t && (e |= Jl), e)
    }
    function bc(e, t, n) {
      var r = t.pendingProps,
        i = !1,
        a = (t.flags & 128) != 0,
        s
      if (
        ((s = a) || (s = e !== null && e.memoizedState === null ? !1 : (so.current & 2) != 0),
        s && ((i = !0), (t.flags &= -129)),
        (s = (t.flags & 32) != 0),
        (t.flags &= -33),
        e === null)
      ) {
        if (V) {
          if (
            (i ? no(t) : ao(t),
            (e = B)
              ? ((e = rf(e, Pi)),
                (e = e !== null && e.data !== `&` ? e : null),
                e !== null &&
                  ((t.memoizedState = {
                    dehydrated: e,
                    treeContext: wi === null ? null : { id: Ti, overflow: Ei },
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (n = mi(e)),
                  (n.return = t),
                  (t.child = n),
                  (Mi = t),
                  (B = null)))
              : (e = null),
            e === null)
          )
            throw Ii(t)
          return (of(e) ? (t.lanes = 32) : (t.lanes = 536870912), null)
        }
        var c = r.children
        return (
          (r = r.fallback),
          i
            ? (ao(t),
              (i = t.mode),
              (c = Sc({ mode: `hidden`, children: c }, i)),
              (r = fi(r, i, n, null)),
              (c.return = t),
              (r.return = t),
              (c.sibling = r),
              (t.child = c),
              (r = t.child),
              (r.memoizedState = vc(n)),
              (r.childLanes = yc(e, s, n)),
              (t.memoizedState = _c),
              sc(null, r))
            : (no(t), xc(t, c))
        )
      }
      var l = e.memoizedState
      if (l !== null && ((c = l.dehydrated), c !== null)) {
        if (a)
          t.flags & 256
            ? (no(t), (t.flags &= -257), (t = Cc(e, t, n)))
            : t.memoizedState === null
              ? (ao(t),
                (c = r.fallback),
                (i = t.mode),
                (r = Sc({ mode: `visible`, children: r.children }, i)),
                (c = fi(c, i, n, null)),
                (c.flags |= 2),
                (r.return = t),
                (c.return = t),
                (r.sibling = c),
                (t.child = r),
                Ia(t, e.child, null, n),
                (r = t.child),
                (r.memoizedState = vc(n)),
                (r.childLanes = yc(e, s, n)),
                (t.memoizedState = _c),
                (t = sc(null, r)))
              : (ao(t), (t.child = e.child), (t.flags |= 128), (t = null))
        else if ((no(t), of(c))) {
          if (((s = c.nextSibling && c.nextSibling.dataset), s)) var u = s.dgst
          ;((s = u),
            (r = Error(o(419))),
            (r.stack = ``),
            (r.digest = s),
            Hi({ value: r, source: null, stack: null }),
            (t = Cc(e, t, n)))
        } else if ((tc || Xi(e, t, n, !1), (s = (n & e.childLanes) !== 0), tc || s)) {
          if (((s = q), s !== null && ((r = rt(s, n)), r !== 0 && r !== l.retryLane)))
            throw ((l.retryLane = r), ni(e, r), hu(s, e, r), ec)
          ;(af(c) || Du(), (t = Cc(e, t, n)))
        } else
          af(c)
            ? ((t.flags |= 192), (t.child = e.child), (t = null))
            : ((e = l.treeContext),
              (B = cf(c.nextSibling)),
              (Mi = t),
              (V = !0),
              (Ni = null),
              (Pi = !1),
              e !== null && ji(t, e),
              (t = xc(t, r.children)),
              (t.flags |= 4096))
        return t
      }
      return i
        ? (ao(t),
          (c = r.fallback),
          (i = t.mode),
          (l = e.child),
          (u = l.sibling),
          (r = li(l, { mode: `hidden`, children: r.children })),
          (r.subtreeFlags = l.subtreeFlags & 65011712),
          u === null ? ((c = fi(c, i, n, null)), (c.flags |= 2)) : (c = li(u, c)),
          (c.return = t),
          (r.return = t),
          (r.sibling = c),
          (t.child = r),
          sc(null, r),
          (r = t.child),
          (c = e.child.memoizedState),
          c === null
            ? (c = vc(n))
            : ((i = c.cachePool),
              i === null
                ? (i = ya())
                : ((l = aa._currentValue), (i = i.parent === l ? i : { parent: l, pool: l })),
              (c = { baseLanes: c.baseLanes | n, cachePool: i })),
          (r.memoizedState = c),
          (r.childLanes = yc(e, s, n)),
          (t.memoizedState = _c),
          sc(e.child, r))
        : (no(t),
          (n = e.child),
          (e = n.sibling),
          (n = li(n, { mode: `visible`, children: r.children })),
          (n.return = t),
          (n.sibling = null),
          e !== null &&
            ((s = t.deletions), s === null ? ((t.deletions = [e]), (t.flags |= 16)) : s.push(e)),
          (t.child = n),
          (t.memoizedState = null),
          n)
    }
    function xc(e, t) {
      return ((t = Sc({ mode: `visible`, children: t }, e.mode)), (t.return = e), (e.child = t))
    }
    function Sc(e, t) {
      return ((e = si(22, e, null, t)), (e.lanes = 0), e)
    }
    function Cc(e, t, n) {
      return (
        Ia(t, e.child, null, n),
        (e = xc(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      )
    }
    function wc(e, t, n) {
      e.lanes |= t
      var r = e.alternate
      ;(r !== null && (r.lanes |= t), Ji(e.return, t, n))
    }
    function Tc(e, t, n, r, i, a) {
      var o = e.memoizedState
      o === null
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailMode: i,
            treeForkCount: a,
          })
        : ((o.isBackwards = t),
          (o.rendering = null),
          (o.renderingStartTime = 0),
          (o.last = r),
          (o.tail = n),
          (o.tailMode = i),
          (o.treeForkCount = a))
    }
    function Ec(e, t, n) {
      var r = t.pendingProps,
        i = r.revealOrder,
        a = r.tail
      r = r.children
      var o = so.current,
        s = (o & 2) != 0
      if (
        (s ? ((o = (o & 1) | 2), (t.flags |= 128)) : (o &= 1),
        F(so, o),
        nc(e, t, r, n),
        (r = V ? xi : 0),
        !s && e !== null && e.flags & 128)
      )
        a: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && wc(e, n, t)
          else if (e.tag === 19) wc(e, n, t)
          else if (e.child !== null) {
            ;((e.child.return = e), (e = e.child))
            continue
          }
          if (e === t) break a
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break a
            e = e.return
          }
          ;((e.sibling.return = e.return), (e = e.sibling))
        }
      switch (i) {
        case `forwards`:
          for (n = t.child, i = null; n !== null; )
            ((e = n.alternate), e !== null && co(e) === null && (i = n), (n = n.sibling))
          ;((n = i),
            n === null ? ((i = t.child), (t.child = null)) : ((i = n.sibling), (n.sibling = null)),
            Tc(t, !1, i, n, a, r))
          break
        case `backwards`:
        case `unstable_legacy-backwards`:
          for (n = null, i = t.child, t.child = null; i !== null; ) {
            if (((e = i.alternate), e !== null && co(e) === null)) {
              t.child = i
              break
            }
            ;((e = i.sibling), (i.sibling = n), (n = i), (i = e))
          }
          Tc(t, !0, n, null, a, r)
          break
        case `together`:
          Tc(t, !1, null, null, void 0, r)
          break
        default:
          t.memoizedState = null
      }
      return t.child
    }
    function Dc(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies), (Gl |= t.lanes), (n & t.childLanes) === 0)
      )
        if (e !== null) {
          if ((Xi(e, t, n, !1), (n & t.childLanes) === 0)) return null
        } else return null
      if (e !== null && t.child !== e.child) throw Error(o(153))
      if (t.child !== null) {
        for (
          e = t.child, n = li(e, e.pendingProps), t.child = n, n.return = t;
          e.sibling !== null;
        )
          ((e = e.sibling), (n = n.sibling = li(e, e.pendingProps)), (n.return = t))
        n.sibling = null
      }
      return t.child
    }
    function Oc(e, t) {
      return (e.lanes & t) === 0 ? ((e = e.dependencies), !!(e !== null && Zi(e))) : !0
    }
    function kc(e, t, n) {
      switch (t.tag) {
        case 3:
          ;(fe(t, t.stateNode.containerInfo), Ki(t, aa, e.memoizedState.cache), Bi())
          break
        case 27:
        case 5:
          me(t)
          break
        case 4:
          fe(t, t.stateNode.containerInfo)
          break
        case 10:
          Ki(t, t.type, t.memoizedProps.value)
          break
        case 31:
          if (t.memoizedState !== null) return ((t.flags |= 128), ro(t), null)
          break
        case 13:
          var r = t.memoizedState
          if (r !== null)
            return r.dehydrated === null
              ? (n & t.child.childLanes) === 0
                ? (no(t), (e = Dc(e, t, n)), e === null ? null : e.sibling)
                : bc(e, t, n)
              : (no(t), (t.flags |= 128), null)
          no(t)
          break
        case 19:
          var i = (e.flags & 128) != 0
          if (
            ((r = (n & t.childLanes) !== 0), (r ||= (Xi(e, t, n, !1), (n & t.childLanes) !== 0)), i)
          ) {
            if (r) return Ec(e, t, n)
            t.flags |= 128
          }
          if (
            ((i = t.memoizedState),
            i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
            F(so, so.current),
            r)
          )
            break
          return null
        case 22:
          return ((t.lanes = 0), oc(e, t, n, t.pendingProps))
        case 24:
          Ki(t, aa, e.memoizedState.cache)
      }
      return Dc(e, t, n)
    }
    function Ac(e, t, n) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps) tc = !0
        else {
          if (!Oc(e, n) && !(t.flags & 128)) return ((tc = !1), kc(e, t, n))
          tc = !!(e.flags & 131072)
        }
      else ((tc = !1), V && t.flags & 1048576 && Oi(t, xi, t.index))
      switch (((t.lanes = 0), t.tag)) {
        case 16:
          a: {
            var r = t.pendingProps
            if (((e = Ea(t.elementType)), (t.type = e), typeof e == `function`))
              ci(e)
                ? ((r = Ws(e, r)), (t.tag = 1), (t = hc(null, t, e, r, n)))
                : ((t.tag = 0), (t = pc(null, t, e, r, n)))
            else {
              if (e != null) {
                var i = e.$$typeof
                if (i === w) {
                  ;((t.tag = 11), (t = rc(null, t, e, r, n)))
                  break a
                } else if (i === D) {
                  ;((t.tag = 14), (t = ic(null, t, e, r, n)))
                  break a
                }
              }
              throw ((t = ne(e) || e), Error(o(306, t, ``)))
            }
          }
          return t
        case 0:
          return pc(e, t, t.type, t.pendingProps, n)
        case 1:
          return ((r = t.type), (i = Ws(r, t.pendingProps)), hc(e, t, r, i, n))
        case 3:
          a: {
            if ((fe(t, t.stateNode.containerInfo), e === null)) throw Error(o(387))
            r = t.pendingProps
            var a = t.memoizedState
            ;((i = a.element), Ba(e, t), qa(t, r, null, n))
            var s = t.memoizedState
            if (
              ((r = s.cache),
              Ki(t, aa, r),
              r !== a.cache && Yi(t, [aa], n, !0),
              Ka(),
              (r = s.element),
              a.isDehydrated)
            )
              if (
                ((a = { element: r, isDehydrated: !1, cache: s.cache }),
                (t.updateQueue.baseState = a),
                (t.memoizedState = a),
                t.flags & 256)
              ) {
                t = gc(e, t, r, n)
                break a
              } else if (r !== i) {
                ;((i = _i(Error(o(424)), t)), Hi(i), (t = gc(e, t, r, n)))
                break a
              } else {
                switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                  case 9:
                    e = e.body
                    break
                  default:
                    e = e.nodeName === `HTML` ? e.ownerDocument.body : e
                }
                for (
                  B = cf(e.firstChild),
                    Mi = t,
                    V = !0,
                    Ni = null,
                    Pi = !0,
                    n = La(t, null, r, n),
                    t.child = n;
                  n;
                )
                  ((n.flags = (n.flags & -3) | 4096), (n = n.sibling))
              }
            else {
              if ((Bi(), r === i)) {
                t = Dc(e, t, n)
                break a
              }
              nc(e, t, r, n)
            }
            t = t.child
          }
          return t
        case 26:
          return (
            fc(e, t),
            e === null
              ? (n = kf(t.type, null, t.pendingProps, null))
                ? (t.memoizedState = n)
                : V ||
                  ((n = t.type),
                  (e = t.pendingProps),
                  (r = Bd(ue.current).createElement(n)),
                  (r[lt] = t),
                  (r[ut] = e),
                  Pd(r, n, e),
                  St(r),
                  (t.stateNode = r))
              : (t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
            null
          )
        case 27:
          return (
            me(t),
            e === null &&
              V &&
              ((r = t.stateNode = ff(t.type, t.pendingProps, ue.current)),
              (Mi = t),
              (Pi = !0),
              (i = B),
              Zd(t.type) ? ((lf = i), (B = cf(r.firstChild))) : (B = i)),
            nc(e, t, t.pendingProps.children, n),
            fc(e, t),
            e === null && (t.flags |= 4194304),
            t.child
          )
        case 5:
          return (
            e === null &&
              V &&
              ((i = r = B) &&
                ((r = tf(r, t.type, t.pendingProps, Pi)),
                r === null
                  ? (i = !1)
                  : ((t.stateNode = r), (Mi = t), (B = cf(r.firstChild)), (Pi = !1), (i = !0))),
              i || Ii(t)),
            me(t),
            (i = t.type),
            (a = t.pendingProps),
            (s = e === null ? null : e.memoizedProps),
            (r = a.children),
            Ud(i, a) ? (r = null) : s !== null && Ud(i, s) && (t.flags |= 32),
            t.memoizedState !== null && ((i = bo(e, t, Co, null, null, n)), (Qf._currentValue = i)),
            fc(e, t),
            nc(e, t, r, n),
            t.child
          )
        case 6:
          return (
            e === null &&
              V &&
              ((e = n = B) &&
                ((n = nf(n, t.pendingProps, Pi)),
                n === null ? (e = !1) : ((t.stateNode = n), (Mi = t), (B = null), (e = !0))),
              e || Ii(t)),
            null
          )
        case 13:
          return bc(e, t, n)
        case 4:
          return (
            fe(t, t.stateNode.containerInfo),
            (r = t.pendingProps),
            e === null ? (t.child = Ia(t, null, r, n)) : nc(e, t, r, n),
            t.child
          )
        case 11:
          return rc(e, t, t.type, t.pendingProps, n)
        case 7:
          return (nc(e, t, t.pendingProps, n), t.child)
        case 8:
          return (nc(e, t, t.pendingProps.children, n), t.child)
        case 12:
          return (nc(e, t, t.pendingProps.children, n), t.child)
        case 10:
          return ((r = t.pendingProps), Ki(t, t.type, r.value), nc(e, t, r.children, n), t.child)
        case 9:
          return (
            (i = t.type._context),
            (r = t.pendingProps.children),
            Qi(t),
            (i = $i(i)),
            (r = r(i)),
            (t.flags |= 1),
            nc(e, t, r, n),
            t.child
          )
        case 14:
          return ic(e, t, t.type, t.pendingProps, n)
        case 15:
          return ac(e, t, t.type, t.pendingProps, n)
        case 19:
          return Ec(e, t, n)
        case 31:
          return dc(e, t, n)
        case 22:
          return oc(e, t, n, t.pendingProps)
        case 24:
          return (
            Qi(t),
            (r = $i(aa)),
            e === null
              ? ((i = _a()),
                i === null &&
                  ((i = q),
                  (a = oa()),
                  (i.pooledCache = a),
                  a.refCount++,
                  a !== null && (i.pooledCacheLanes |= n),
                  (i = a)),
                (t.memoizedState = { parent: r, cache: i }),
                za(t),
                Ki(t, aa, i))
              : ((e.lanes & n) !== 0 && (Ba(e, t), qa(t, null, null, n), Ka()),
                (i = e.memoizedState),
                (a = t.memoizedState),
                i.parent === r
                  ? ((r = a.cache), Ki(t, aa, r), r !== i.cache && Yi(t, [aa], n, !0))
                  : ((i = { parent: r, cache: r }),
                    (t.memoizedState = i),
                    t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i),
                    Ki(t, aa, r))),
            nc(e, t, t.pendingProps.children, n),
            t.child
          )
        case 29:
          throw t.pendingProps
      }
      throw Error(o(156, t.tag))
    }
    function jc(e) {
      e.flags |= 4
    }
    function Mc(e, t, n, r, i) {
      if (((t = (e.mode & 32) != 0) && (t = !1), t)) {
        if (((e.flags |= 16777216), (i & 335544128) === i))
          if (e.stateNode.complete) e.flags |= 8192
          else if (wu()) e.flags |= 8192
          else throw ((Da = Ca), xa)
      } else e.flags &= -16777217
    }
    function Nc(e, t) {
      if (t.type !== `stylesheet` || t.state.loading & 4) e.flags &= -16777217
      else if (((e.flags |= 16777216), !Wf(t)))
        if (wu()) e.flags |= 8192
        else throw ((Da = Ca), xa)
    }
    function Pc(e, t) {
      ;(t !== null && (e.flags |= 4),
        e.flags & 16384 && ((t = e.tag === 22 ? 536870912 : Ze()), (e.lanes |= t), (Yl |= t)))
    }
    function Fc(e, t) {
      if (!V)
        switch (e.tailMode) {
          case `hidden`:
            t = e.tail
            for (var n = null; t !== null; ) (t.alternate !== null && (n = t), (t = t.sibling))
            n === null ? (e.tail = null) : (n.sibling = null)
            break
          case `collapsed`:
            n = e.tail
            for (var r = null; n !== null; ) (n.alternate !== null && (r = n), (n = n.sibling))
            r === null
              ? t || e.tail === null
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (r.sibling = null)
        }
    }
    function Ic(e) {
      var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0
      if (t)
        for (var i = e.child; i !== null; )
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags & 65011712),
            (r |= i.flags & 65011712),
            (i.return = e),
            (i = i.sibling))
      else
        for (i = e.child; i !== null; )
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags),
            (r |= i.flags),
            (i.return = e),
            (i = i.sibling))
      return ((e.subtreeFlags |= r), (e.childLanes = n), t)
    }
    function Lc(e, t, n) {
      var r = t.pendingProps
      switch ((Ai(t), t.tag)) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (Ic(t), null)
        case 1:
          return (Ic(t), null)
        case 3:
          return (
            (n = t.stateNode),
            (r = null),
            e !== null && (r = e.memoizedState.cache),
            t.memoizedState.cache !== r && (t.flags |= 2048),
            qi(aa),
            pe(),
            n.pendingContext && ((n.context = n.pendingContext), (n.pendingContext = null)),
            (e === null || e.child === null) &&
              (zi(t)
                ? jc(t)
                : e === null ||
                  (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                  ((t.flags |= 1024), Vi())),
            Ic(t),
            null
          )
        case 26:
          var i = t.type,
            a = t.memoizedState
          return (
            e === null
              ? (jc(t), a === null ? (Ic(t), Mc(t, i, null, r, n)) : (Ic(t), Nc(t, a)))
              : a
                ? a === e.memoizedState
                  ? (Ic(t), (t.flags &= -16777217))
                  : (jc(t), Ic(t), Nc(t, a))
                : ((e = e.memoizedProps), e !== r && jc(t), Ic(t), Mc(t, i, e, r, n)),
            null
          )
        case 27:
          if ((he(t), (n = ue.current), (i = t.type), e !== null && t.stateNode != null))
            e.memoizedProps !== r && jc(t)
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(o(166))
              return (Ic(t), null)
            }
            ;((e = ce.current), zi(t) ? Li(t, e) : ((e = ff(i, r, n)), (t.stateNode = e), jc(t)))
          }
          return (Ic(t), null)
        case 5:
          if ((he(t), (i = t.type), e !== null && t.stateNode != null))
            e.memoizedProps !== r && jc(t)
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(o(166))
              return (Ic(t), null)
            }
            if (((a = ce.current), zi(t))) Li(t, a)
            else {
              var s = Bd(ue.current)
              switch (a) {
                case 1:
                  a = s.createElementNS(`http://www.w3.org/2000/svg`, i)
                  break
                case 2:
                  a = s.createElementNS(`http://www.w3.org/1998/Math/MathML`, i)
                  break
                default:
                  switch (i) {
                    case `svg`:
                      a = s.createElementNS(`http://www.w3.org/2000/svg`, i)
                      break
                    case `math`:
                      a = s.createElementNS(`http://www.w3.org/1998/Math/MathML`, i)
                      break
                    case `script`:
                      ;((a = s.createElement(`div`)),
                        (a.innerHTML = `<script><\/script>`),
                        (a = a.removeChild(a.firstChild)))
                      break
                    case `select`:
                      ;((a =
                        typeof r.is == `string`
                          ? s.createElement(`select`, { is: r.is })
                          : s.createElement(`select`)),
                        r.multiple ? (a.multiple = !0) : r.size && (a.size = r.size))
                      break
                    default:
                      a =
                        typeof r.is == `string`
                          ? s.createElement(i, { is: r.is })
                          : s.createElement(i)
                  }
              }
              ;((a[lt] = t), (a[ut] = r))
              a: for (s = t.child; s !== null; ) {
                if (s.tag === 5 || s.tag === 6) a.appendChild(s.stateNode)
                else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                  ;((s.child.return = s), (s = s.child))
                  continue
                }
                if (s === t) break a
                for (; s.sibling === null; ) {
                  if (s.return === null || s.return === t) break a
                  s = s.return
                }
                ;((s.sibling.return = s.return), (s = s.sibling))
              }
              t.stateNode = a
              a: switch ((Pd(a, i, r), i)) {
                case `button`:
                case `input`:
                case `select`:
                case `textarea`:
                  r = !!r.autoFocus
                  break a
                case `img`:
                  r = !0
                  break a
                default:
                  r = !1
              }
              r && jc(t)
            }
          }
          return (
            Ic(t), Mc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null
          )
        case 6:
          if (e && t.stateNode != null) e.memoizedProps !== r && jc(t)
          else {
            if (typeof r != `string` && t.stateNode === null) throw Error(o(166))
            if (((e = ue.current), zi(t))) {
              if (((e = t.stateNode), (n = t.memoizedProps), (r = null), (i = Mi), i !== null))
                switch (i.tag) {
                  case 27:
                  case 5:
                    r = i.memoizedProps
                }
              ;((e[lt] = t),
                (e = !!(
                  e.nodeValue === n ||
                  (r !== null && !0 === r.suppressHydrationWarning) ||
                  Md(e.nodeValue, n)
                )),
                e || Ii(t, !0))
            } else ((e = Bd(e).createTextNode(r)), (e[lt] = t), (t.stateNode = e))
          }
          return (Ic(t), null)
        case 31:
          if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
            if (((r = zi(t)), n !== null)) {
              if (e === null) {
                if (!r) throw Error(o(318))
                if (((e = t.memoizedState), (e = e === null ? null : e.dehydrated), !e))
                  throw Error(o(557))
                e[lt] = t
              } else (Bi(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4))
              ;(Ic(t), (e = !1))
            } else
              ((n = Vi()),
                e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n),
                (e = !0))
            if (!e) return t.flags & 256 ? (oo(t), t) : (oo(t), null)
            if (t.flags & 128) throw Error(o(558))
          }
          return (Ic(t), null)
        case 13:
          if (
            ((r = t.memoizedState),
            e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (((i = zi(t)), r !== null && r.dehydrated !== null)) {
              if (e === null) {
                if (!i) throw Error(o(318))
                if (((i = t.memoizedState), (i = i === null ? null : i.dehydrated), !i))
                  throw Error(o(317))
                i[lt] = t
              } else (Bi(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4))
              ;(Ic(t), (i = !1))
            } else
              ((i = Vi()),
                e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i),
                (i = !0))
            if (!i) return t.flags & 256 ? (oo(t), t) : (oo(t), null)
          }
          return (
            oo(t),
            t.flags & 128
              ? ((t.lanes = n), t)
              : ((n = r !== null),
                (e = e !== null && e.memoizedState !== null),
                n &&
                  ((r = t.child),
                  (i = null),
                  r.alternate !== null &&
                    r.alternate.memoizedState !== null &&
                    r.alternate.memoizedState.cachePool !== null &&
                    (i = r.alternate.memoizedState.cachePool.pool),
                  (a = null),
                  r.memoizedState !== null &&
                    r.memoizedState.cachePool !== null &&
                    (a = r.memoizedState.cachePool.pool),
                  a !== i && (r.flags |= 2048)),
                n !== e && n && (t.child.flags |= 8192),
                Pc(t, t.updateQueue),
                Ic(t),
                null)
          )
        case 4:
          return (pe(), e === null && Sd(t.stateNode.containerInfo), Ic(t), null)
        case 10:
          return (qi(t.type), Ic(t), null)
        case 19:
          if ((se(so), (r = t.memoizedState), r === null)) return (Ic(t), null)
          if (((i = (t.flags & 128) != 0), (a = r.rendering), a === null))
            if (i) Fc(r, !1)
            else {
              if (Wl !== 0 || (e !== null && e.flags & 128))
                for (e = t.child; e !== null; ) {
                  if (((a = co(e)), a !== null)) {
                    for (
                      t.flags |= 128,
                        Fc(r, !1),
                        e = a.updateQueue,
                        t.updateQueue = e,
                        Pc(t, e),
                        t.subtreeFlags = 0,
                        e = n,
                        n = t.child;
                      n !== null;
                    )
                      (ui(n, e), (n = n.sibling))
                    return (F(so, (so.current & 1) | 2), V && Di(t, r.treeForkCount), t.child)
                  }
                  e = e.sibling
                }
              r.tail !== null &&
                Oe() > tu &&
                ((t.flags |= 128), (i = !0), Fc(r, !1), (t.lanes = 4194304))
            }
          else {
            if (!i)
              if (((e = co(a)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (i = !0),
                  (e = e.updateQueue),
                  (t.updateQueue = e),
                  Pc(t, e),
                  Fc(r, !0),
                  r.tail === null && r.tailMode === `hidden` && !a.alternate && !V)
                )
                  return (Ic(t), null)
              } else
                2 * Oe() - r.renderingStartTime > tu &&
                  n !== 536870912 &&
                  ((t.flags |= 128), (i = !0), Fc(r, !1), (t.lanes = 4194304))
            r.isBackwards
              ? ((a.sibling = t.child), (t.child = a))
              : ((e = r.last), e === null ? (t.child = a) : (e.sibling = a), (r.last = a))
          }
          return r.tail === null
            ? (Ic(t), null)
            : ((e = r.tail),
              (r.rendering = e),
              (r.tail = e.sibling),
              (r.renderingStartTime = Oe()),
              (e.sibling = null),
              (n = so.current),
              F(so, i ? (n & 1) | 2 : n & 1),
              V && Di(t, r.treeForkCount),
              e)
        case 22:
        case 23:
          return (
            oo(t),
            eo(),
            (r = t.memoizedState !== null),
            e === null
              ? r && (t.flags |= 8192)
              : (e.memoizedState !== null) !== r && (t.flags |= 8192),
            r
              ? n & 536870912 &&
                !(t.flags & 128) &&
                (Ic(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : Ic(t),
            (n = t.updateQueue),
            n !== null && Pc(t, n.retryQueue),
            (n = null),
            e !== null &&
              e.memoizedState !== null &&
              e.memoizedState.cachePool !== null &&
              (n = e.memoizedState.cachePool.pool),
            (r = null),
            t.memoizedState !== null &&
              t.memoizedState.cachePool !== null &&
              (r = t.memoizedState.cachePool.pool),
            r !== n && (t.flags |= 2048),
            e !== null && se(ga),
            null
          )
        case 24:
          return (
            (n = null),
            e !== null && (n = e.memoizedState.cache),
            t.memoizedState.cache !== n && (t.flags |= 2048),
            qi(aa),
            Ic(t),
            null
          )
        case 25:
          return null
        case 30:
          return null
      }
      throw Error(o(156, t.tag))
    }
    function Rc(e, t) {
      switch ((Ai(t), t.tag)) {
        case 1:
          return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null)
        case 3:
          return (
            qi(aa),
            pe(),
            (e = t.flags),
            e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
          )
        case 26:
        case 27:
        case 5:
          return (he(t), null)
        case 31:
          if (t.memoizedState !== null) {
            if ((oo(t), t.alternate === null)) throw Error(o(340))
            Bi()
          }
          return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null)
        case 13:
          if ((oo(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
            if (t.alternate === null) throw Error(o(340))
            Bi()
          }
          return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null)
        case 19:
          return (se(so), null)
        case 4:
          return (pe(), null)
        case 10:
          return (qi(t.type), null)
        case 22:
        case 23:
          return (
            oo(t),
            eo(),
            e !== null && se(ga),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          )
        case 24:
          return (qi(aa), null)
        case 25:
          return null
        default:
          return null
      }
    }
    function zc(e, t) {
      switch ((Ai(t), t.tag)) {
        case 3:
          ;(qi(aa), pe())
          break
        case 26:
        case 27:
        case 5:
          he(t)
          break
        case 4:
          pe()
          break
        case 31:
          t.memoizedState !== null && oo(t)
          break
        case 13:
          oo(t)
          break
        case 19:
          se(so)
          break
        case 10:
          qi(t.type)
          break
        case 22:
        case 23:
          ;(oo(t), eo(), e !== null && se(ga))
          break
        case 24:
          qi(aa)
      }
    }
    function Bc(e, t) {
      try {
        var n = t.updateQueue,
          r = n === null ? null : n.lastEffect
        if (r !== null) {
          var i = r.next
          n = i
          do {
            if ((n.tag & e) === e) {
              r = void 0
              var a = n.create,
                o = n.inst
              ;((r = a()), (o.destroy = r))
            }
            n = n.next
          } while (n !== i)
        }
      } catch (e) {
        Z(t, t.return, e)
      }
    }
    function Vc(e, t, n) {
      try {
        var r = t.updateQueue,
          i = r === null ? null : r.lastEffect
        if (i !== null) {
          var a = i.next
          r = a
          do {
            if ((r.tag & e) === e) {
              var o = r.inst,
                s = o.destroy
              if (s !== void 0) {
                ;((o.destroy = void 0), (i = t))
                var c = n,
                  l = s
                try {
                  l()
                } catch (e) {
                  Z(i, c, e)
                }
              }
            }
            r = r.next
          } while (r !== a)
        }
      } catch (e) {
        Z(t, t.return, e)
      }
    }
    function Hc(e) {
      var t = e.updateQueue
      if (t !== null) {
        var n = e.stateNode
        try {
          Ya(t, n)
        } catch (t) {
          Z(e, e.return, t)
        }
      }
    }
    function Uc(e, t, n) {
      ;((n.props = Ws(e.type, e.memoizedProps)), (n.state = e.memoizedState))
      try {
        n.componentWillUnmount()
      } catch (n) {
        Z(e, t, n)
      }
    }
    function Wc(e, t) {
      try {
        var n = e.ref
        if (n !== null) {
          switch (e.tag) {
            case 26:
            case 27:
            case 5:
              var r = e.stateNode
              break
            case 30:
              r = e.stateNode
              break
            default:
              r = e.stateNode
          }
          typeof n == `function` ? (e.refCleanup = n(r)) : (n.current = r)
        }
      } catch (n) {
        Z(e, t, n)
      }
    }
    function Gc(e, t) {
      var n = e.ref,
        r = e.refCleanup
      if (n !== null)
        if (typeof r == `function`)
          try {
            r()
          } catch (n) {
            Z(e, t, n)
          } finally {
            ;((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null))
          }
        else if (typeof n == `function`)
          try {
            n(null)
          } catch (n) {
            Z(e, t, n)
          }
        else n.current = null
    }
    function Kc(e) {
      var t = e.type,
        n = e.memoizedProps,
        r = e.stateNode
      try {
        a: switch (t) {
          case `button`:
          case `input`:
          case `select`:
          case `textarea`:
            n.autoFocus && r.focus()
            break a
          case `img`:
            n.src ? (r.src = n.src) : n.srcSet && (r.srcset = n.srcSet)
        }
      } catch (t) {
        Z(e, e.return, t)
      }
    }
    function qc(e, t, n) {
      try {
        var r = e.stateNode
        ;(Fd(r, e.type, n, t), (r[ut] = t))
      } catch (t) {
        Z(e, e.return, t)
      }
    }
    function Jc(e) {
      return (
        e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Zd(e.type)) || e.tag === 4
      )
    }
    function Yc(e) {
      a: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || Jc(e.return)) return null
          e = e.return
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
        ) {
          if ((e.tag === 27 && Zd(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
            continue a
          ;((e.child.return = e), (e = e.child))
        }
        if (!(e.flags & 2)) return e.stateNode
      }
    }
    function Xc(e, t, n) {
      var r = e.tag
      if (r === 5 || r === 6)
        ((e = e.stateNode),
          t
            ? (n.nodeType === 9
                ? n.body
                : n.nodeName === `HTML`
                  ? n.ownerDocument.body
                  : n
              ).insertBefore(e, t)
            : ((t = n.nodeType === 9 ? n.body : n.nodeName === `HTML` ? n.ownerDocument.body : n),
              t.appendChild(e),
              (n = n._reactRootContainer),
              n != null || t.onclick !== null || (t.onclick = nn)))
      else if (
        r !== 4 &&
        (r === 27 && Zd(e.type) && ((n = e.stateNode), (t = null)), (e = e.child), e !== null)
      )
        for (Xc(e, t, n), e = e.sibling; e !== null; ) (Xc(e, t, n), (e = e.sibling))
    }
    function Zc(e, t, n) {
      var r = e.tag
      if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e))
      else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), (e = e.child), e !== null))
        for (Zc(e, t, n), e = e.sibling; e !== null; ) (Zc(e, t, n), (e = e.sibling))
    }
    function Qc(e) {
      var t = e.stateNode,
        n = e.memoizedProps
      try {
        for (var r = e.type, i = t.attributes; i.length; ) t.removeAttributeNode(i[0])
        ;(Pd(t, r, n), (t[lt] = e), (t[ut] = n))
      } catch (t) {
        Z(e, e.return, t)
      }
    }
    var $c = !1,
      el = !1,
      tl = !1,
      nl = typeof WeakSet == `function` ? WeakSet : Set,
      rl = null
    function il(e, t) {
      if (((e = e.containerInfo), (Rd = sp), (e = Er(e)), Dr(e))) {
        if (`selectionStart` in e) var n = { start: e.selectionStart, end: e.selectionEnd }
        else
          a: {
            n = ((n = e.ownerDocument) && n.defaultView) || window
            var r = n.getSelection && n.getSelection()
            if (r && r.rangeCount !== 0) {
              n = r.anchorNode
              var i = r.anchorOffset,
                a = r.focusNode
              r = r.focusOffset
              try {
                ;(n.nodeType, a.nodeType)
              } catch {
                n = null
                break a
              }
              var s = 0,
                c = -1,
                l = -1,
                u = 0,
                d = 0,
                f = e,
                p = null
              b: for (;;) {
                for (
                  var m;
                  f !== n || (i !== 0 && f.nodeType !== 3) || (c = s + i),
                    f !== a || (r !== 0 && f.nodeType !== 3) || (l = s + r),
                    f.nodeType === 3 && (s += f.nodeValue.length),
                    (m = f.firstChild) !== null;
                )
                  ((p = f), (f = m))
                for (;;) {
                  if (f === e) break b
                  if (
                    (p === n && ++u === i && (c = s),
                    p === a && ++d === r && (l = s),
                    (m = f.nextSibling) !== null)
                  )
                    break
                  ;((f = p), (p = f.parentNode))
                }
                f = m
              }
              n = c === -1 || l === -1 ? null : { start: c, end: l }
            } else n = null
          }
        n ||= { start: 0, end: 0 }
      } else n = null
      for (zd = { focusedElem: e, selectionRange: n }, sp = !1, rl = t; rl !== null; )
        if (((t = rl), (e = t.child), t.subtreeFlags & 1028 && e !== null))
          ((e.return = t), (rl = e))
        else
          for (; rl !== null; ) {
            switch (((t = rl), (a = t.alternate), (e = t.flags), t.tag)) {
              case 0:
                if (e & 4 && ((e = t.updateQueue), (e = e === null ? null : e.events), e !== null))
                  for (n = 0; n < e.length; n++) ((i = e[n]), (i.ref.impl = i.nextImpl))
                break
              case 11:
              case 15:
                break
              case 1:
                if (e & 1024 && a !== null) {
                  ;((e = void 0),
                    (n = t),
                    (i = a.memoizedProps),
                    (a = a.memoizedState),
                    (r = n.stateNode))
                  try {
                    var h = Ws(n.type, i)
                    ;((e = r.getSnapshotBeforeUpdate(h, a)),
                      (r.__reactInternalSnapshotBeforeUpdate = e))
                  } catch (e) {
                    Z(n, n.return, e)
                  }
                }
                break
              case 3:
                if (e & 1024) {
                  if (((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)) ef(e)
                  else if (n === 1)
                    switch (e.nodeName) {
                      case `HEAD`:
                      case `HTML`:
                      case `BODY`:
                        ef(e)
                        break
                      default:
                        e.textContent = ``
                    }
                }
                break
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break
              default:
                if (e & 1024) throw Error(o(163))
            }
            if (((e = t.sibling), e !== null)) {
              ;((e.return = t.return), (rl = e))
              break
            }
            rl = t.return
          }
    }
    function al(e, t, n) {
      var r = n.flags
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ;(bl(e, n), r & 4 && Bc(5, n))
          break
        case 1:
          if ((bl(e, n), r & 4))
            if (((e = n.stateNode), t === null))
              try {
                e.componentDidMount()
              } catch (e) {
                Z(n, n.return, e)
              }
            else {
              var i = Ws(n.type, t.memoizedProps)
              t = t.memoizedState
              try {
                e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate)
              } catch (e) {
                Z(n, n.return, e)
              }
            }
          ;(r & 64 && Hc(n), r & 512 && Wc(n, n.return))
          break
        case 3:
          if ((bl(e, n), r & 64 && ((e = n.updateQueue), e !== null))) {
            if (((t = null), n.child !== null))
              switch (n.child.tag) {
                case 27:
                case 5:
                  t = n.child.stateNode
                  break
                case 1:
                  t = n.child.stateNode
              }
            try {
              Ya(e, t)
            } catch (e) {
              Z(n, n.return, e)
            }
          }
          break
        case 27:
          t === null && r & 4 && Qc(n)
        case 26:
        case 5:
          ;(bl(e, n), t === null && r & 4 && Kc(n), r & 512 && Wc(n, n.return))
          break
        case 12:
          bl(e, n)
          break
        case 31:
          ;(bl(e, n), r & 4 && dl(e, n))
          break
        case 13:
          ;(bl(e, n),
            r & 4 && fl(e, n),
            r & 64 &&
              ((e = n.memoizedState),
              e !== null && ((e = e.dehydrated), e !== null && ((n = Ju.bind(null, n)), sf(e, n)))))
          break
        case 22:
          if (((r = n.memoizedState !== null || $c), !r)) {
            ;((t = (t !== null && t.memoizedState !== null) || el), (i = $c))
            var a = el
            ;(($c = r),
              (el = t) && !a ? Sl(e, n, (n.subtreeFlags & 8772) != 0) : bl(e, n),
              ($c = i),
              (el = a))
          }
          break
        case 30:
          break
        default:
          bl(e, n)
      }
    }
    function ol(e) {
      var t = e.alternate
      ;(t !== null && ((e.alternate = null), ol(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 && ((t = e.stateNode), t !== null && _t(t)),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null))
    }
    var sl = null,
      cl = !1
    function ll(e, t, n) {
      for (n = n.child; n !== null; ) (ul(e, t, n), (n = n.sibling))
    }
    function ul(e, t, n) {
      if (Re && typeof Re.onCommitFiberUnmount == `function`)
        try {
          Re.onCommitFiberUnmount(Le, n)
        } catch {}
      switch (n.tag) {
        case 26:
          ;(el || Gc(n, t),
            ll(e, t, n),
            n.memoizedState
              ? n.memoizedState.count--
              : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)))
          break
        case 27:
          el || Gc(n, t)
          var r = sl,
            i = cl
          ;(Zd(n.type) && ((sl = n.stateNode), (cl = !1)),
            ll(e, t, n),
            pf(n.stateNode),
            (sl = r),
            (cl = i))
          break
        case 5:
          el || Gc(n, t)
        case 6:
          if (((r = sl), (i = cl), (sl = null), ll(e, t, n), (sl = r), (cl = i), sl !== null))
            if (cl)
              try {
                ;(sl.nodeType === 9
                  ? sl.body
                  : sl.nodeName === `HTML`
                    ? sl.ownerDocument.body
                    : sl
                ).removeChild(n.stateNode)
              } catch (e) {
                Z(n, t, e)
              }
            else
              try {
                sl.removeChild(n.stateNode)
              } catch (e) {
                Z(n, t, e)
              }
          break
        case 18:
          sl !== null &&
            (cl
              ? ((e = sl),
                Qd(
                  e.nodeType === 9 ? e.body : e.nodeName === `HTML` ? e.ownerDocument.body : e,
                  n.stateNode,
                ),
                Np(e))
              : Qd(sl, n.stateNode))
          break
        case 4:
          ;((r = sl),
            (i = cl),
            (sl = n.stateNode.containerInfo),
            (cl = !0),
            ll(e, t, n),
            (sl = r),
            (cl = i))
          break
        case 0:
        case 11:
        case 14:
        case 15:
          ;(Vc(2, n, t), el || Vc(4, n, t), ll(e, t, n))
          break
        case 1:
          ;(el ||
            (Gc(n, t),
            (r = n.stateNode),
            typeof r.componentWillUnmount == `function` && Uc(n, t, r)),
            ll(e, t, n))
          break
        case 21:
          ll(e, t, n)
          break
        case 22:
          ;((el = (r = el) || n.memoizedState !== null), ll(e, t, n), (el = r))
          break
        default:
          ll(e, t, n)
      }
    }
    function dl(e, t) {
      if (
        t.memoizedState === null &&
        ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
      ) {
        e = e.dehydrated
        try {
          Np(e)
        } catch (e) {
          Z(t, t.return, e)
        }
      }
    }
    function fl(e, t) {
      if (
        t.memoizedState === null &&
        ((e = t.alternate),
        e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
      )
        try {
          Np(e)
        } catch (e) {
          Z(t, t.return, e)
        }
    }
    function pl(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode
          return (t === null && (t = e.stateNode = new nl()), t)
        case 22:
          return (
            (e = e.stateNode), (t = e._retryCache), t === null && (t = e._retryCache = new nl()), t
          )
        default:
          throw Error(o(435, e.tag))
      }
    }
    function ml(e, t) {
      var n = pl(e)
      t.forEach(function (t) {
        if (!n.has(t)) {
          n.add(t)
          var r = Yu.bind(null, e, t)
          t.then(r, r)
        }
      })
    }
    function hl(e, t) {
      var n = t.deletions
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            a = e,
            s = t,
            c = s
          a: for (; c !== null; ) {
            switch (c.tag) {
              case 27:
                if (Zd(c.type)) {
                  ;((sl = c.stateNode), (cl = !1))
                  break a
                }
                break
              case 5:
                ;((sl = c.stateNode), (cl = !1))
                break a
              case 3:
              case 4:
                ;((sl = c.stateNode.containerInfo), (cl = !0))
                break a
            }
            c = c.return
          }
          if (sl === null) throw Error(o(160))
          ;(ul(a, s, i),
            (sl = null),
            (cl = !1),
            (a = i.alternate),
            a !== null && (a.return = null),
            (i.return = null))
        }
      if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (_l(t, e), (t = t.sibling))
    }
    var gl = null
    function _l(e, t) {
      var n = e.alternate,
        r = e.flags
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ;(hl(t, e), vl(e), r & 4 && (Vc(3, e, e.return), Bc(3, e), Vc(5, e, e.return)))
          break
        case 1:
          ;(hl(t, e),
            vl(e),
            r & 512 && (el || n === null || Gc(n, n.return)),
            r & 64 &&
              $c &&
              ((e = e.updateQueue),
              e !== null &&
                ((r = e.callbacks),
                r !== null &&
                  ((n = e.shared.hiddenCallbacks),
                  (e.shared.hiddenCallbacks = n === null ? r : n.concat(r))))))
          break
        case 26:
          var i = gl
          if ((hl(t, e), vl(e), r & 512 && (el || n === null || Gc(n, n.return)), r & 4)) {
            var a = n === null ? null : n.memoizedState
            if (((r = e.memoizedState), n === null))
              if (r === null)
                if (e.stateNode === null) {
                  a: {
                    ;((r = e.type), (n = e.memoizedProps), (i = i.ownerDocument || i))
                    b: switch (r) {
                      case `title`:
                        ;((a = i.getElementsByTagName(`title`)[0]),
                          (!a ||
                            a[gt] ||
                            a[lt] ||
                            a.namespaceURI === `http://www.w3.org/2000/svg` ||
                            a.hasAttribute(`itemprop`)) &&
                            ((a = i.createElement(r)),
                            i.head.insertBefore(a, i.querySelector(`head > title`))),
                          Pd(a, r, n),
                          (a[lt] = e),
                          St(a),
                          (r = a))
                        break a
                      case `link`:
                        var s = Vf(`link`, `href`, i).get(r + (n.href || ``))
                        if (s) {
                          for (var c = 0; c < s.length; c++)
                            if (
                              ((a = s[c]),
                              a.getAttribute(`href`) ===
                                (n.href == null || n.href === `` ? null : n.href) &&
                                a.getAttribute(`rel`) === (n.rel == null ? null : n.rel) &&
                                a.getAttribute(`title`) === (n.title == null ? null : n.title) &&
                                a.getAttribute(`crossorigin`) ===
                                  (n.crossOrigin == null ? null : n.crossOrigin))
                            ) {
                              s.splice(c, 1)
                              break b
                            }
                        }
                        ;((a = i.createElement(r)), Pd(a, r, n), i.head.appendChild(a))
                        break
                      case `meta`:
                        if ((s = Vf(`meta`, `content`, i).get(r + (n.content || ``)))) {
                          for (c = 0; c < s.length; c++)
                            if (
                              ((a = s[c]),
                              a.getAttribute(`content`) ===
                                (n.content == null ? null : `` + n.content) &&
                                a.getAttribute(`name`) === (n.name == null ? null : n.name) &&
                                a.getAttribute(`property`) ===
                                  (n.property == null ? null : n.property) &&
                                a.getAttribute(`http-equiv`) ===
                                  (n.httpEquiv == null ? null : n.httpEquiv) &&
                                a.getAttribute(`charset`) ===
                                  (n.charSet == null ? null : n.charSet))
                            ) {
                              s.splice(c, 1)
                              break b
                            }
                        }
                        ;((a = i.createElement(r)), Pd(a, r, n), i.head.appendChild(a))
                        break
                      default:
                        throw Error(o(468, r))
                    }
                    ;((a[lt] = e), St(a), (r = a))
                  }
                  e.stateNode = r
                } else Hf(i, e.type, e.stateNode)
              else e.stateNode = If(i, r, e.memoizedProps)
            else
              a === r
                ? r === null && e.stateNode !== null && qc(e, e.memoizedProps, n.memoizedProps)
                : (a === null
                    ? n.stateNode !== null && ((n = n.stateNode), n.parentNode.removeChild(n))
                    : a.count--,
                  r === null ? Hf(i, e.type, e.stateNode) : If(i, r, e.memoizedProps))
          }
          break
        case 27:
          ;(hl(t, e),
            vl(e),
            r & 512 && (el || n === null || Gc(n, n.return)),
            n !== null && r & 4 && qc(e, e.memoizedProps, n.memoizedProps))
          break
        case 5:
          if ((hl(t, e), vl(e), r & 512 && (el || n === null || Gc(n, n.return)), e.flags & 32)) {
            i = e.stateNode
            try {
              Jt(i, ``)
            } catch (t) {
              Z(e, e.return, t)
            }
          }
          ;(r & 4 &&
            e.stateNode != null &&
            ((i = e.memoizedProps), qc(e, i, n === null ? i : n.memoizedProps)),
            r & 1024 && (tl = !0))
          break
        case 6:
          if ((hl(t, e), vl(e), r & 4)) {
            if (e.stateNode === null) throw Error(o(162))
            ;((r = e.memoizedProps), (n = e.stateNode))
            try {
              n.nodeValue = r
            } catch (t) {
              Z(e, e.return, t)
            }
          }
          break
        case 3:
          if (
            ((Bf = null),
            (i = gl),
            (gl = gf(t.containerInfo)),
            hl(t, e),
            (gl = i),
            vl(e),
            r & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              Np(t.containerInfo)
            } catch (t) {
              Z(e, e.return, t)
            }
          tl && ((tl = !1), yl(e))
          break
        case 4:
          ;((r = gl), (gl = gf(e.stateNode.containerInfo)), hl(t, e), vl(e), (gl = r))
          break
        case 12:
          ;(hl(t, e), vl(e))
          break
        case 31:
          ;(hl(t, e),
            vl(e),
            r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), ml(e, r))))
          break
        case 13:
          ;(hl(t, e),
            vl(e),
            e.child.flags & 8192 &&
              (e.memoizedState !== null) != (n !== null && n.memoizedState !== null) &&
              ($l = Oe()),
            r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), ml(e, r))))
          break
        case 22:
          i = e.memoizedState !== null
          var l = n !== null && n.memoizedState !== null,
            u = $c,
            d = el
          if ((($c = u || i), (el = d || l), hl(t, e), (el = d), ($c = u), vl(e), r & 8192))
            a: for (
              t = e.stateNode,
                t._visibility = i ? t._visibility & -2 : t._visibility | 1,
                i && (n === null || l || $c || el || xl(e)),
                n = null,
                t = e;
              ;
            ) {
              if (t.tag === 5 || t.tag === 26) {
                if (n === null) {
                  l = n = t
                  try {
                    if (((a = l.stateNode), i))
                      ((s = a.style),
                        typeof s.setProperty == `function`
                          ? s.setProperty(`display`, `none`, `important`)
                          : (s.display = `none`))
                    else {
                      c = l.stateNode
                      var f = l.memoizedProps.style,
                        p = f != null && f.hasOwnProperty(`display`) ? f.display : null
                      c.style.display = p == null || typeof p == `boolean` ? `` : (`` + p).trim()
                    }
                  } catch (e) {
                    Z(l, l.return, e)
                  }
                }
              } else if (t.tag === 6) {
                if (n === null) {
                  l = t
                  try {
                    l.stateNode.nodeValue = i ? `` : l.memoizedProps
                  } catch (e) {
                    Z(l, l.return, e)
                  }
                }
              } else if (t.tag === 18) {
                if (n === null) {
                  l = t
                  try {
                    var m = l.stateNode
                    i ? $d(m, !0) : $d(l.stateNode, !1)
                  } catch (e) {
                    Z(l, l.return, e)
                  }
                }
              } else if (
                ((t.tag !== 22 && t.tag !== 23) || t.memoizedState === null || t === e) &&
                t.child !== null
              ) {
                ;((t.child.return = t), (t = t.child))
                continue
              }
              if (t === e) break a
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) break a
                ;(n === t && (n = null), (t = t.return))
              }
              ;(n === t && (n = null), (t.sibling.return = t.return), (t = t.sibling))
            }
          r & 4 &&
            ((r = e.updateQueue),
            r !== null && ((n = r.retryQueue), n !== null && ((r.retryQueue = null), ml(e, n))))
          break
        case 19:
          ;(hl(t, e),
            vl(e),
            r & 4 && ((r = e.updateQueue), r !== null && ((e.updateQueue = null), ml(e, r))))
          break
        case 30:
          break
        case 21:
          break
        default:
          ;(hl(t, e), vl(e))
      }
    }
    function vl(e) {
      var t = e.flags
      if (t & 2) {
        try {
          for (var n, r = e.return; r !== null; ) {
            if (Jc(r)) {
              n = r
              break
            }
            r = r.return
          }
          if (n == null) throw Error(o(160))
          switch (n.tag) {
            case 27:
              var i = n.stateNode
              Zc(e, Yc(e), i)
              break
            case 5:
              var a = n.stateNode
              ;(n.flags & 32 && (Jt(a, ``), (n.flags &= -33)), Zc(e, Yc(e), a))
              break
            case 3:
            case 4:
              var s = n.stateNode.containerInfo
              Xc(e, Yc(e), s)
              break
            default:
              throw Error(o(161))
          }
        } catch (t) {
          Z(e, e.return, t)
        }
        e.flags &= -3
      }
      t & 4096 && (e.flags &= -4097)
    }
    function yl(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e
          ;(yl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling))
        }
    }
    function bl(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; ) (al(e, t.alternate, t), (t = t.sibling))
    }
    function xl(e) {
      for (e = e.child; e !== null; ) {
        var t = e
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ;(Vc(4, t, t.return), xl(t))
            break
          case 1:
            Gc(t, t.return)
            var n = t.stateNode
            ;(typeof n.componentWillUnmount == `function` && Uc(t, t.return, n), xl(t))
            break
          case 27:
            pf(t.stateNode)
          case 26:
          case 5:
            ;(Gc(t, t.return), xl(t))
            break
          case 22:
            t.memoizedState === null && xl(t)
            break
          case 30:
            xl(t)
            break
          default:
            xl(t)
        }
        e = e.sibling
      }
    }
    function Sl(e, t, n) {
      for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null; ) {
        var r = t.alternate,
          i = e,
          a = t,
          o = a.flags
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            ;(Sl(i, a, n), Bc(4, a))
            break
          case 1:
            if ((Sl(i, a, n), (r = a), (i = r.stateNode), typeof i.componentDidMount == `function`))
              try {
                i.componentDidMount()
              } catch (e) {
                Z(r, r.return, e)
              }
            if (((r = a), (i = r.updateQueue), i !== null)) {
              var s = r.stateNode
              try {
                var c = i.shared.hiddenCallbacks
                if (c !== null)
                  for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ja(c[i], s)
              } catch (e) {
                Z(r, r.return, e)
              }
            }
            ;(n && o & 64 && Hc(a), Wc(a, a.return))
            break
          case 27:
            Qc(a)
          case 26:
          case 5:
            ;(Sl(i, a, n), n && r === null && o & 4 && Kc(a), Wc(a, a.return))
            break
          case 12:
            Sl(i, a, n)
            break
          case 31:
            ;(Sl(i, a, n), n && o & 4 && dl(i, a))
            break
          case 13:
            ;(Sl(i, a, n), n && o & 4 && fl(i, a))
            break
          case 22:
            ;(a.memoizedState === null && Sl(i, a, n), Wc(a, a.return))
            break
          case 30:
            break
          default:
            Sl(i, a, n)
        }
        t = t.sibling
      }
    }
    function Cl(e, t) {
      var n = null
      ;(e !== null &&
        e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (n = e.memoizedState.cachePool.pool),
        (e = null),
        t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (e = t.memoizedState.cachePool.pool),
        e !== n && (e != null && e.refCount++, n != null && sa(n)))
    }
    function wl(e, t) {
      ;((e = null),
        t.alternate !== null && (e = t.alternate.memoizedState.cache),
        (t = t.memoizedState.cache),
        t !== e && (t.refCount++, e != null && sa(e)))
    }
    function Tl(e, t, n, r) {
      if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (El(e, t, n, r), (t = t.sibling))
    }
    function El(e, t, n, r) {
      var i = t.flags
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          ;(Tl(e, t, n, r), i & 2048 && Bc(9, t))
          break
        case 1:
          Tl(e, t, n, r)
          break
        case 3:
          ;(Tl(e, t, n, r),
            i & 2048 &&
              ((e = null),
              t.alternate !== null && (e = t.alternate.memoizedState.cache),
              (t = t.memoizedState.cache),
              t !== e && (t.refCount++, e != null && sa(e))))
          break
        case 12:
          if (i & 2048) {
            ;(Tl(e, t, n, r), (e = t.stateNode))
            try {
              var a = t.memoizedProps,
                o = a.id,
                s = a.onPostCommit
              typeof s == `function` &&
                s(o, t.alternate === null ? `mount` : `update`, e.passiveEffectDuration, -0)
            } catch (e) {
              Z(t, t.return, e)
            }
          } else Tl(e, t, n, r)
          break
        case 31:
          Tl(e, t, n, r)
          break
        case 13:
          Tl(e, t, n, r)
          break
        case 23:
          break
        case 22:
          ;((a = t.stateNode),
            (o = t.alternate),
            t.memoizedState === null
              ? a._visibility & 2
                ? Tl(e, t, n, r)
                : ((a._visibility |= 2), Dl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1))
              : a._visibility & 2
                ? Tl(e, t, n, r)
                : Ol(e, t),
            i & 2048 && Cl(o, t))
          break
        case 24:
          ;(Tl(e, t, n, r), i & 2048 && wl(t.alternate, t))
          break
        default:
          Tl(e, t, n, r)
      }
    }
    function Dl(e, t, n, r, i) {
      for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null; ) {
        var a = e,
          o = t,
          s = n,
          c = r,
          l = o.flags
        switch (o.tag) {
          case 0:
          case 11:
          case 15:
            ;(Dl(a, o, s, c, i), Bc(8, o))
            break
          case 23:
            break
          case 22:
            var u = o.stateNode
            ;(o.memoizedState === null
              ? ((u._visibility |= 2), Dl(a, o, s, c, i))
              : u._visibility & 2
                ? Dl(a, o, s, c, i)
                : Ol(a, o),
              i && l & 2048 && Cl(o.alternate, o))
            break
          case 24:
            ;(Dl(a, o, s, c, i), i && l & 2048 && wl(o.alternate, o))
            break
          default:
            Dl(a, o, s, c, i)
        }
        t = t.sibling
      }
    }
    function Ol(e, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var n = e,
            r = t,
            i = r.flags
          switch (r.tag) {
            case 22:
              ;(Ol(n, r), i & 2048 && Cl(r.alternate, r))
              break
            case 24:
              ;(Ol(n, r), i & 2048 && wl(r.alternate, r))
              break
            default:
              Ol(n, r)
          }
          t = t.sibling
        }
    }
    var kl = 8192
    function Al(e, t, n) {
      if (e.subtreeFlags & kl) for (e = e.child; e !== null; ) (jl(e, t, n), (e = e.sibling))
    }
    function jl(e, t, n) {
      switch (e.tag) {
        case 26:
          ;(Al(e, t, n),
            e.flags & kl && e.memoizedState !== null && Gf(n, gl, e.memoizedState, e.memoizedProps))
          break
        case 5:
          Al(e, t, n)
          break
        case 3:
        case 4:
          var r = gl
          ;((gl = gf(e.stateNode.containerInfo)), Al(e, t, n), (gl = r))
          break
        case 22:
          e.memoizedState === null &&
            ((r = e.alternate),
            r !== null && r.memoizedState !== null
              ? ((r = kl), (kl = 16777216), Al(e, t, n), (kl = r))
              : Al(e, t, n))
          break
        default:
          Al(e, t, n)
      }
    }
    function Ml(e) {
      var t = e.alternate
      if (t !== null && ((e = t.child), e !== null)) {
        t.child = null
        do ((t = e.sibling), (e.sibling = null), (e = t))
        while (e !== null)
      }
    }
    function Nl(e) {
      var t = e.deletions
      if (e.flags & 16) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var r = t[n]
            ;((rl = r), Il(r, e))
          }
        Ml(e)
      }
      if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Pl(e), (e = e.sibling))
    }
    function Pl(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          ;(Nl(e), e.flags & 2048 && Vc(9, e, e.return))
          break
        case 3:
          Nl(e)
          break
        case 12:
          Nl(e)
          break
        case 22:
          var t = e.stateNode
          e.memoizedState !== null &&
          t._visibility & 2 &&
          (e.return === null || e.return.tag !== 13)
            ? ((t._visibility &= -3), Fl(e))
            : Nl(e)
          break
        default:
          Nl(e)
      }
    }
    function Fl(e) {
      var t = e.deletions
      if (e.flags & 16) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var r = t[n]
            ;((rl = r), Il(r, e))
          }
        Ml(e)
      }
      for (e = e.child; e !== null; ) {
        switch (((t = e), t.tag)) {
          case 0:
          case 11:
          case 15:
            ;(Vc(8, t, t.return), Fl(t))
            break
          case 22:
            ;((n = t.stateNode), n._visibility & 2 && ((n._visibility &= -3), Fl(t)))
            break
          default:
            Fl(t)
        }
        e = e.sibling
      }
    }
    function Il(e, t) {
      for (; rl !== null; ) {
        var n = rl
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Vc(8, n, t)
            break
          case 23:
          case 22:
            if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
              var r = n.memoizedState.cachePool.pool
              r != null && r.refCount++
            }
            break
          case 24:
            sa(n.memoizedState.cache)
        }
        if (((r = n.child), r !== null)) ((r.return = n), (rl = r))
        else
          a: for (n = e; rl !== null; ) {
            r = rl
            var i = r.sibling,
              a = r.return
            if ((ol(r), r === n)) {
              rl = null
              break a
            }
            if (i !== null) {
              ;((i.return = a), (rl = i))
              break a
            }
            rl = a
          }
      }
    }
    var Ll = {
        getCacheForType: function (e) {
          var t = $i(aa),
            n = t.data.get(e)
          return (n === void 0 && ((n = e()), t.data.set(e, n)), n)
        },
        cacheSignal: function () {
          return $i(aa).controller.signal
        },
      },
      Rl = typeof WeakMap == `function` ? WeakMap : Map,
      K = 0,
      q = null,
      J = null,
      Y = 0,
      X = 0,
      zl = null,
      Bl = !1,
      Vl = !1,
      Hl = !1,
      Ul = 0,
      Wl = 0,
      Gl = 0,
      Kl = 0,
      ql = 0,
      Jl = 0,
      Yl = 0,
      Xl = null,
      Zl = null,
      Ql = !1,
      $l = 0,
      eu = 0,
      tu = 1 / 0,
      nu = null,
      ru = null,
      iu = 0,
      au = null,
      ou = null,
      su = 0,
      cu = 0,
      lu = null,
      uu = null,
      du = 0,
      fu = null
    function pu() {
      return K & 2 && Y !== 0 ? Y & -Y : N.T === null ? ot() : dd()
    }
    function mu() {
      if (Jl === 0)
        if (!(Y & 536870912) || V) {
          var e = Ge
          ;((Ge <<= 1), !(Ge & 3932160) && (Ge = 262144), (Jl = e))
        } else Jl = 536870912
      return ((e = H.current), e !== null && (e.flags |= 32), Jl)
    }
    function hu(e, t, n) {
      ;(((e === q && (X === 2 || X === 9)) || e.cancelPendingCommit !== null) &&
        (Su(e, 0), yu(e, Y, Jl, !1)),
        $e(e, n),
        (!(K & 2) || e !== q) &&
          (e === q && (!(K & 2) && (Kl |= n), Wl === 4 && yu(e, Y, Jl, !1)), rd(e)))
    }
    function gu(e, t, n) {
      if (K & 6) throw Error(o(327))
      var r = (!n && (t & 127) == 0 && (t & e.expiredLanes) === 0) || Ye(e, t),
        i = r ? Au(e, t) : Ou(e, t, !0),
        a = r
      do {
        if (i === 0) {
          Vl && !r && yu(e, t, 0, !1)
          break
        } else {
          if (((n = e.current.alternate), a && !vu(n))) {
            ;((i = Ou(e, t, !1)), (a = !1))
            continue
          }
          if (i === 2) {
            if (((a = t), e.errorRecoveryDisabledLanes & a)) var s = 0
            else
              ((s = e.pendingLanes & -536870913),
                (s = s === 0 ? (s & 536870912 ? 536870912 : 0) : s))
            if (s !== 0) {
              t = s
              a: {
                var c = e
                i = Xl
                var l = c.current.memoizedState.isDehydrated
                if ((l && (Su(c, s).flags |= 256), (s = Ou(c, s, !1)), s !== 2)) {
                  if (Hl && !l) {
                    ;((c.errorRecoveryDisabledLanes |= a), (Kl |= a), (i = 4))
                    break a
                  }
                  ;((a = Zl),
                    (Zl = i),
                    a !== null && (Zl === null ? (Zl = a) : Zl.push.apply(Zl, a)))
                }
                i = s
              }
              if (((a = !1), i !== 2)) continue
            }
          }
          if (i === 1) {
            ;(Su(e, 0), yu(e, t, 0, !0))
            break
          }
          a: {
            switch (((r = e), (a = i), a)) {
              case 0:
              case 1:
                throw Error(o(345))
              case 4:
                if ((t & 4194048) !== t) break
              case 6:
                yu(r, t, Jl, !Bl)
                break a
              case 2:
                Zl = null
                break
              case 3:
              case 5:
                break
              default:
                throw Error(o(329))
            }
            if ((t & 62914560) === t && ((i = $l + 300 - Oe()), 10 < i)) {
              if ((yu(r, t, Jl, !Bl), Je(r, 0, !0) !== 0)) break a
              ;((su = t),
                (r.timeoutHandle = Kd(
                  _u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, a, `Throttled`, -0, 0),
                  i,
                )))
              break a
            }
            _u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, a, null, -0, 0)
          }
        }
        break
      } while (1)
      rd(e)
    }
    function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
      if (((e.timeoutHandle = -1), (d = t.subtreeFlags), d & 8192 || (d & 16785408) == 16785408)) {
        ;((d = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: !0,
          waitingForViewTransition: !1,
          unsuspend: nn,
        }),
          jl(t, a, d))
        var m = (a & 62914560) === a ? $l - Oe() : (a & 4194048) === a ? eu - Oe() : 0
        if (((m = qf(d, m)), m !== null)) {
          ;((su = a),
            (e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p))),
            yu(e, a, o, !l))
          return
        }
      }
      Lu(e, t, a, n, r, i, o, s, c)
    }
    function vu(e) {
      for (var t = e; ; ) {
        var n = t.tag
        if (
          (n === 0 || n === 11 || n === 15) &&
          t.flags & 16384 &&
          ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
        )
          for (var r = 0; r < n.length; r++) {
            var i = n[r],
              a = i.getSnapshot
            i = i.value
            try {
              if (!xr(a(), i)) return !1
            } catch {
              return !1
            }
          }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) ((n.return = t), (t = n))
        else {
          if (t === e) break
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0
            t = t.return
          }
          ;((t.sibling.return = t.return), (t = t.sibling))
        }
      }
      return !0
    }
    function yu(e, t, n, r) {
      ;((t &= ~ql),
        (t &= ~Kl),
        (e.suspendedLanes |= t),
        (e.pingedLanes &= ~t),
        r && (e.warmLanes |= t),
        (r = e.expirationTimes))
      for (var i = t; 0 < i; ) {
        var a = 31 - Be(i),
          o = 1 << a
        ;((r[a] = -1), (i &= ~o))
      }
      n !== 0 && tt(e, n, t)
    }
    function bu() {
      return K & 6 ? !0 : (id(0, !1), !1)
    }
    function xu() {
      if (J !== null) {
        if (X === 0) var e = J.return
        else ((e = J), (Gi = Wi = null), Eo(e), (Aa = null), (ja = 0), (e = J))
        for (; e !== null; ) (zc(e.alternate, e), (e = e.return))
        J = null
      }
    }
    function Su(e, t) {
      var n = e.timeoutHandle
      ;(n !== -1 && ((e.timeoutHandle = -1), qd(n)),
        (n = e.cancelPendingCommit),
        n !== null && ((e.cancelPendingCommit = null), n()),
        (su = 0),
        xu(),
        (q = e),
        (J = n = li(e.current, null)),
        (Y = t),
        (X = 0),
        (zl = null),
        (Bl = !1),
        (Vl = Ye(e, t)),
        (Hl = !1),
        (Yl = Jl = ql = Kl = Gl = Wl = 0),
        (Zl = Xl = null),
        (Ql = !1),
        t & 8 && (t |= t & 32))
      var r = e.entangledLanes
      if (r !== 0)
        for (e = e.entanglements, r &= t; 0 < r; ) {
          var i = 31 - Be(r),
            a = 1 << i
          ;((t |= e[i]), (r &= ~a))
        }
      return ((Ul = t), $r(), n)
    }
    function Cu(e, t) {
      ;((U = null),
        (N.H = Is),
        t === ba || t === Sa
          ? ((t = Oa()), (X = 3))
          : t === xa
            ? ((t = Oa()), (X = 4))
            : (X = t === ec ? 8 : typeof t == `object` && t && typeof t.then == `function` ? 6 : 1),
        (zl = t),
        J === null && ((Wl = 1), Js(e, _i(t, e.current))))
    }
    function wu() {
      var e = H.current
      return e === null
        ? !0
        : (Y & 4194048) === Y
          ? to === null
          : (Y & 62914560) === Y || Y & 536870912
            ? e === to
            : !1
    }
    function Tu() {
      var e = N.H
      return ((N.H = Is), e === null ? Is : e)
    }
    function Eu() {
      var e = N.A
      return ((N.A = Ll), e)
    }
    function Du() {
      ;((Wl = 4),
        Bl || ((Y & 4194048) !== Y && H.current !== null) || (Vl = !0),
        (!(Gl & 134217727) && !(Kl & 134217727)) || q === null || yu(q, Y, Jl, !1))
    }
    function Ou(e, t, n) {
      var r = K
      K |= 2
      var i = Tu(),
        a = Eu()
      ;((q !== e || Y !== t) && ((nu = null), Su(e, t)), (t = !1))
      var o = Wl
      a: do
        try {
          if (X !== 0 && J !== null) {
            var s = J,
              c = zl
            switch (X) {
              case 8:
                ;(xu(), (o = 6))
                break a
              case 3:
              case 2:
              case 9:
              case 6:
                H.current === null && (t = !0)
                var l = X
                if (((X = 0), (zl = null), Pu(e, s, c, l), n && Vl)) {
                  o = 0
                  break a
                }
                break
              default:
                ;((l = X), (X = 0), (zl = null), Pu(e, s, c, l))
            }
          }
          ;(ku(), (o = Wl))
          break
        } catch (t) {
          Cu(e, t)
        }
      while (1)
      return (
        t && e.shellSuspendCounter++,
        (Gi = Wi = null),
        (K = r),
        (N.H = i),
        (N.A = a),
        J === null && ((q = null), (Y = 0), $r()),
        o
      )
    }
    function ku() {
      for (; J !== null; ) Mu(J)
    }
    function Au(e, t) {
      var n = K
      K |= 2
      var r = Tu(),
        i = Eu()
      q !== e || Y !== t ? ((nu = null), (tu = Oe() + 500), Su(e, t)) : (Vl = Ye(e, t))
      a: do
        try {
          if (X !== 0 && J !== null) {
            t = J
            var a = zl
            b: switch (X) {
              case 1:
                ;((X = 0), (zl = null), Pu(e, t, a, 1))
                break
              case 2:
              case 9:
                if (wa(a)) {
                  ;((X = 0), (zl = null), Nu(t))
                  break
                }
                ;((t = function () {
                  ;((X !== 2 && X !== 9) || q !== e || (X = 7), rd(e))
                }),
                  a.then(t, t))
                break a
              case 3:
                X = 7
                break a
              case 4:
                X = 5
                break a
              case 7:
                wa(a) ? ((X = 0), (zl = null), Nu(t)) : ((X = 0), (zl = null), Pu(e, t, a, 7))
                break
              case 5:
                var s = null
                switch (J.tag) {
                  case 26:
                    s = J.memoizedState
                  case 5:
                  case 27:
                    var c = J
                    if (s ? Wf(s) : c.stateNode.complete) {
                      ;((X = 0), (zl = null))
                      var l = c.sibling
                      if (l !== null) J = l
                      else {
                        var u = c.return
                        u === null ? (J = null) : ((J = u), Fu(u))
                      }
                      break b
                    }
                }
                ;((X = 0), (zl = null), Pu(e, t, a, 5))
                break
              case 6:
                ;((X = 0), (zl = null), Pu(e, t, a, 6))
                break
              case 8:
                ;(xu(), (Wl = 6))
                break a
              default:
                throw Error(o(462))
            }
          }
          ju()
          break
        } catch (t) {
          Cu(e, t)
        }
      while (1)
      return (
        (Gi = Wi = null),
        (N.H = r),
        (N.A = i),
        (K = n),
        J === null ? ((q = null), (Y = 0), $r(), Wl) : 0
      )
    }
    function ju() {
      for (; J !== null && !Ee(); ) Mu(J)
    }
    function Mu(e) {
      var t = Ac(e.alternate, e, Ul)
      ;((e.memoizedProps = e.pendingProps), t === null ? Fu(e) : (J = t))
    }
    function Nu(e) {
      var t = e,
        n = t.alternate
      switch (t.tag) {
        case 15:
        case 0:
          t = mc(n, t, t.pendingProps, t.type, void 0, Y)
          break
        case 11:
          t = mc(n, t, t.pendingProps, t.type.render, t.ref, Y)
          break
        case 5:
          Eo(t)
        default:
          ;(zc(n, t), (t = J = ui(t, Ul)), (t = Ac(n, t, Ul)))
      }
      ;((e.memoizedProps = e.pendingProps), t === null ? Fu(e) : (J = t))
    }
    function Pu(e, t, n, r) {
      ;((Gi = Wi = null), Eo(t), (Aa = null), (ja = 0))
      var i = t.return
      try {
        if ($s(e, i, t, n, Y)) {
          ;((Wl = 1), Js(e, _i(n, e.current)), (J = null))
          return
        }
      } catch (t) {
        if (i !== null) throw ((J = i), t)
        ;((Wl = 1), Js(e, _i(n, e.current)), (J = null))
        return
      }
      t.flags & 32768
        ? (V || r === 1
            ? (e = !0)
            : Vl || Y & 536870912
              ? (e = !1)
              : ((Bl = e = !0),
                (r === 2 || r === 9 || r === 3 || r === 6) &&
                  ((r = H.current), r !== null && r.tag === 13 && (r.flags |= 16384))),
          Iu(t, e))
        : Fu(t)
    }
    function Fu(e) {
      var t = e
      do {
        if (t.flags & 32768) {
          Iu(t, Bl)
          return
        }
        e = t.return
        var n = Lc(t.alternate, t, Ul)
        if (n !== null) {
          J = n
          return
        }
        if (((t = t.sibling), t !== null)) {
          J = t
          return
        }
        J = t = e
      } while (t !== null)
      Wl === 0 && (Wl = 5)
    }
    function Iu(e, t) {
      do {
        var n = Rc(e.alternate, e)
        if (n !== null) {
          ;((n.flags &= 32767), (J = n))
          return
        }
        if (
          ((n = e.return),
          n !== null && ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
          !t && ((e = e.sibling), e !== null))
        ) {
          J = e
          return
        }
        J = e = n
      } while (e !== null)
      ;((Wl = 6), (J = null))
    }
    function Lu(e, t, n, r, i, a, s, c, l) {
      e.cancelPendingCommit = null
      do Hu()
      while (iu !== 0)
      if (K & 6) throw Error(o(327))
      if (t !== null) {
        if (t === e.current) throw Error(o(177))
        if (
          ((a = t.lanes | t.childLanes),
          (a |= Qr),
          et(e, n, a, s, c, l),
          e === q && ((J = q = null), (Y = 0)),
          (ou = t),
          (au = e),
          (su = n),
          (cu = a),
          (lu = i),
          (uu = r),
          t.subtreeFlags & 10256 || t.flags & 10256
            ? ((e.callbackNode = null),
              (e.callbackPriority = 0),
              Xu(Me, function () {
                return (Uu(), null)
              }))
            : ((e.callbackNode = null), (e.callbackPriority = 0)),
          (r = (t.flags & 13878) != 0),
          t.subtreeFlags & 13878 || r)
        ) {
          ;((r = N.T), (N.T = null), (i = P.p), (P.p = 2), (s = K), (K |= 4))
          try {
            il(e, t, n)
          } finally {
            ;((K = s), (P.p = i), (N.T = r))
          }
        }
        ;((iu = 1), Ru(), zu(), Bu())
      }
    }
    function Ru() {
      if (iu === 1) {
        iu = 0
        var e = au,
          t = ou,
          n = (t.flags & 13878) != 0
        if (t.subtreeFlags & 13878 || n) {
          ;((n = N.T), (N.T = null))
          var r = P.p
          P.p = 2
          var i = K
          K |= 4
          try {
            _l(t, e)
            var a = zd,
              o = Er(e.containerInfo),
              s = a.focusedElem,
              c = a.selectionRange
            if (o !== s && s && s.ownerDocument && Tr(s.ownerDocument.documentElement, s)) {
              if (c !== null && Dr(s)) {
                var l = c.start,
                  u = c.end
                if ((u === void 0 && (u = l), `selectionStart` in s))
                  ((s.selectionStart = l), (s.selectionEnd = Math.min(u, s.value.length)))
                else {
                  var d = s.ownerDocument || document,
                    f = (d && d.defaultView) || window
                  if (f.getSelection) {
                    var p = f.getSelection(),
                      m = s.textContent.length,
                      h = Math.min(c.start, m),
                      g = c.end === void 0 ? h : Math.min(c.end, m)
                    !p.extend && h > g && ((o = g), (g = h), (h = o))
                    var _ = wr(s, h),
                      v = wr(s, g)
                    if (
                      _ &&
                      v &&
                      (p.rangeCount !== 1 ||
                        p.anchorNode !== _.node ||
                        p.anchorOffset !== _.offset ||
                        p.focusNode !== v.node ||
                        p.focusOffset !== v.offset)
                    ) {
                      var y = d.createRange()
                      ;(y.setStart(_.node, _.offset),
                        p.removeAllRanges(),
                        h > g
                          ? (p.addRange(y), p.extend(v.node, v.offset))
                          : (y.setEnd(v.node, v.offset), p.addRange(y)))
                    }
                  }
                }
              }
              for (d = [], p = s; (p = p.parentNode); )
                p.nodeType === 1 && d.push({ element: p, left: p.scrollLeft, top: p.scrollTop })
              for (typeof s.focus == `function` && s.focus(), s = 0; s < d.length; s++) {
                var b = d[s]
                ;((b.element.scrollLeft = b.left), (b.element.scrollTop = b.top))
              }
            }
            ;((sp = !!Rd), (zd = Rd = null))
          } finally {
            ;((K = i), (P.p = r), (N.T = n))
          }
        }
        ;((e.current = t), (iu = 2))
      }
    }
    function zu() {
      if (iu === 2) {
        iu = 0
        var e = au,
          t = ou,
          n = (t.flags & 8772) != 0
        if (t.subtreeFlags & 8772 || n) {
          ;((n = N.T), (N.T = null))
          var r = P.p
          P.p = 2
          var i = K
          K |= 4
          try {
            al(e, t.alternate, t)
          } finally {
            ;((K = i), (P.p = r), (N.T = n))
          }
        }
        iu = 3
      }
    }
    function Bu() {
      if (iu === 4 || iu === 3) {
        ;((iu = 0), De())
        var e = au,
          t = ou,
          n = su,
          r = uu
        t.subtreeFlags & 10256 || t.flags & 10256
          ? (iu = 5)
          : ((iu = 0), (ou = au = null), Vu(e, e.pendingLanes))
        var i = e.pendingLanes
        if (
          (i === 0 && (ru = null),
          at(n),
          (t = t.stateNode),
          Re && typeof Re.onCommitFiberRoot == `function`)
        )
          try {
            Re.onCommitFiberRoot(Le, t, void 0, (t.current.flags & 128) == 128)
          } catch {}
        if (r !== null) {
          ;((t = N.T), (i = P.p), (P.p = 2), (N.T = null))
          try {
            for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
              var s = r[o]
              a(s.value, { componentStack: s.stack })
            }
          } finally {
            ;((N.T = t), (P.p = i))
          }
        }
        ;(su & 3 && Hu(),
          rd(e),
          (i = e.pendingLanes),
          n & 261930 && i & 42 ? (e === fu ? du++ : ((du = 0), (fu = e))) : (du = 0),
          id(0, !1))
      }
    }
    function Vu(e, t) {
      ;(e.pooledCacheLanes &= t) === 0 &&
        ((t = e.pooledCache), t != null && ((e.pooledCache = null), sa(t)))
    }
    function Hu() {
      return (Ru(), zu(), Bu(), Uu())
    }
    function Uu() {
      if (iu !== 5) return !1
      var e = au,
        t = cu
      cu = 0
      var n = at(su),
        r = N.T,
        i = P.p
      try {
        ;((P.p = 32 > n ? 32 : n), (N.T = null), (n = lu), (lu = null))
        var a = au,
          s = su
        if (((iu = 0), (ou = au = null), (su = 0), K & 6)) throw Error(o(331))
        var c = K
        if (
          ((K |= 4),
          Pl(a.current),
          El(a, a.current, s, n),
          (K = c),
          id(0, !1),
          Re && typeof Re.onPostCommitFiberRoot == `function`)
        )
          try {
            Re.onPostCommitFiberRoot(Le, a)
          } catch {}
        return !0
      } finally {
        ;((P.p = i), (N.T = r), Vu(e, t))
      }
    }
    function Wu(e, t, n) {
      ;((t = _i(n, t)),
        (t = Xs(e.stateNode, t, 2)),
        (e = Ha(e, t, 2)),
        e !== null && ($e(e, 2), rd(e)))
    }
    function Z(e, t, n) {
      if (e.tag === 3) Wu(e, e, n)
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            Wu(t, e, n)
            break
          } else if (t.tag === 1) {
            var r = t.stateNode
            if (
              typeof t.type.getDerivedStateFromError == `function` ||
              (typeof r.componentDidCatch == `function` && (ru === null || !ru.has(r)))
            ) {
              ;((e = _i(n, e)),
                (n = Zs(2)),
                (r = Ha(t, n, 2)),
                r !== null && (Qs(n, r, t, e), $e(r, 2), rd(r)))
              break
            }
          }
          t = t.return
        }
    }
    function Gu(e, t, n) {
      var r = e.pingCache
      if (r === null) {
        r = e.pingCache = new Rl()
        var i = new Set()
        r.set(t, i)
      } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)))
      i.has(n) || ((Hl = !0), i.add(n), (e = Ku.bind(null, e, t, n)), t.then(e, e))
    }
    function Ku(e, t, n) {
      var r = e.pingCache
      ;(r !== null && r.delete(t),
        (e.pingedLanes |= e.suspendedLanes & n),
        (e.warmLanes &= ~n),
        q === e &&
          (Y & n) === n &&
          (Wl === 4 || (Wl === 3 && (Y & 62914560) === Y && 300 > Oe() - $l)
            ? !(K & 2) && Su(e, 0)
            : (ql |= n),
          Yl === Y && (Yl = 0)),
        rd(e))
    }
    function qu(e, t) {
      ;(t === 0 && (t = Ze()), (e = ni(e, t)), e !== null && ($e(e, t), rd(e)))
    }
    function Ju(e) {
      var t = e.memoizedState,
        n = 0
      ;(t !== null && (n = t.retryLane), qu(e, n))
    }
    function Yu(e, t) {
      var n = 0
      switch (e.tag) {
        case 31:
        case 13:
          var r = e.stateNode,
            i = e.memoizedState
          i !== null && (n = i.retryLane)
          break
        case 19:
          r = e.stateNode
          break
        case 22:
          r = e.stateNode._retryCache
          break
        default:
          throw Error(o(314))
      }
      ;(r !== null && r.delete(t), qu(e, n))
    }
    function Xu(e, t) {
      return we(e, t)
    }
    var Zu = null,
      Qu = null,
      $u = !1,
      ed = !1,
      td = !1,
      nd = 0
    function rd(e) {
      ;(e !== Qu && e.next === null && (Qu === null ? (Zu = Qu = e) : (Qu = Qu.next = e)),
        (ed = !0),
        $u || (($u = !0), ud()))
    }
    function id(e, t) {
      if (!td && ed) {
        td = !0
        do
          for (var n = !1, r = Zu; r !== null; ) {
            if (!t)
              if (e !== 0) {
                var i = r.pendingLanes
                if (i === 0) var a = 0
                else {
                  var o = r.suspendedLanes,
                    s = r.pingedLanes
                  ;((a = (1 << (31 - Be(42 | e) + 1)) - 1),
                    (a &= i & ~(o & ~s)),
                    (a = a & 201326741 ? (a & 201326741) | 1 : a ? a | 2 : 0))
                }
                a !== 0 && ((n = !0), ld(r, a))
              } else
                ((a = Y),
                  (a = Je(
                    r,
                    r === q ? a : 0,
                    r.cancelPendingCommit !== null || r.timeoutHandle !== -1,
                  )),
                  !(a & 3) || Ye(r, a) || ((n = !0), ld(r, a)))
            r = r.next
          }
        while (n)
        td = !1
      }
    }
    function ad() {
      od()
    }
    function od() {
      ed = $u = !1
      var e = 0
      nd !== 0 && Gd() && (e = nd)
      for (var t = Oe(), n = null, r = Zu; r !== null; ) {
        var i = r.next,
          a = sd(r, t)
        ;(a === 0
          ? ((r.next = null), n === null ? (Zu = i) : (n.next = i), i === null && (Qu = n))
          : ((n = r), (e !== 0 || a & 3) && (ed = !0)),
          (r = i))
      }
      ;((iu !== 0 && iu !== 5) || id(e, !1), nd !== 0 && (nd = 0))
    }
    function sd(e, t) {
      for (
        var n = e.suspendedLanes,
          r = e.pingedLanes,
          i = e.expirationTimes,
          a = e.pendingLanes & -62914561;
        0 < a;
      ) {
        var o = 31 - Be(a),
          s = 1 << o,
          c = i[o]
        ;(c === -1
          ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Xe(s, t))
          : c <= t && (e.expiredLanes |= s),
          (a &= ~s))
      }
      if (
        ((t = q),
        (n = Y),
        (n = Je(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
        (r = e.callbackNode),
        n === 0 || (e === t && (X === 2 || X === 9)) || e.cancelPendingCommit !== null)
      )
        return (
          r !== null && r !== null && Te(r), (e.callbackNode = null), (e.callbackPriority = 0)
        )
      if (!(n & 3) || Ye(e, n)) {
        if (((t = n & -n), t === e.callbackPriority)) return t
        switch ((r !== null && Te(r), at(n))) {
          case 2:
          case 8:
            n = je
            break
          case 32:
            n = Me
            break
          case 268435456:
            n = Pe
            break
          default:
            n = Me
        }
        return (
          (r = cd.bind(null, e)), (n = we(n, r)), (e.callbackPriority = t), (e.callbackNode = n), t
        )
      }
      return (
        r !== null && r !== null && Te(r), (e.callbackPriority = 2), (e.callbackNode = null), 2
      )
    }
    function cd(e, t) {
      if (iu !== 0 && iu !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null)
      var n = e.callbackNode
      if (Hu() && e.callbackNode !== n) return null
      var r = Y
      return (
        (r = Je(e, e === q ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
        r === 0
          ? null
          : (gu(e, r, t),
            sd(e, Oe()),
            e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null)
      )
    }
    function ld(e, t) {
      if (Hu()) return null
      gu(e, t, !0)
    }
    function ud() {
      Yd(function () {
        K & 6 ? we(Ae, ad) : od()
      })
    }
    function dd() {
      if (nd === 0) {
        var e = ua
        ;(e === 0 && ((e = We), (We <<= 1), !(We & 261888) && (We = 256)), (nd = e))
      }
      return nd
    }
    function fd(e) {
      return e == null || typeof e == `symbol` || typeof e == `boolean`
        ? null
        : typeof e == `function`
          ? e
          : tn(`` + e)
    }
    function pd(e, t) {
      var n = t.ownerDocument.createElement(`input`)
      return (
        (n.name = t.name),
        (n.value = t.value),
        e.id && n.setAttribute(`form`, e.id),
        t.parentNode.insertBefore(n, t),
        (e = new FormData(e)),
        n.parentNode.removeChild(n),
        e
      )
    }
    function md(e, t, n, r, i) {
      if (t === `submit` && n && n.stateNode === i) {
        var a = fd((i[ut] || null).action),
          o = r.submitter
        o &&
          ((t = (t = o[ut] || null) ? fd(t.formAction) : o.getAttribute(`formAction`)),
          t !== null && ((a = t), (o = null)))
        var s = new wn(`action`, `action`, null, r, i)
        e.push({
          event: s,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (r.defaultPrevented) {
                  if (nd !== 0) {
                    var e = o ? pd(i, o) : new FormData(i)
                    Ss(n, { pending: !0, data: e, method: i.method, action: a }, null, e)
                  }
                } else
                  typeof a == `function` &&
                    (s.preventDefault(),
                    (e = o ? pd(i, o) : new FormData(i)),
                    Ss(n, { pending: !0, data: e, method: i.method, action: a }, a, e))
              },
              currentTarget: i,
            },
          ],
        })
      }
    }
    for (var hd = 0; hd < qr.length; hd++) {
      var gd = qr[hd]
      Jr(gd.toLowerCase(), `on` + (gd[0].toUpperCase() + gd.slice(1)))
    }
    ;(Jr(zr, `onAnimationEnd`),
      Jr(Br, `onAnimationIteration`),
      Jr(Vr, `onAnimationStart`),
      Jr(`dblclick`, `onDoubleClick`),
      Jr(`focusin`, `onFocus`),
      Jr(`focusout`, `onBlur`),
      Jr(Hr, `onTransitionRun`),
      Jr(Ur, `onTransitionStart`),
      Jr(Wr, `onTransitionCancel`),
      Jr(Gr, `onTransitionEnd`),
      Et(`onMouseEnter`, [`mouseout`, `mouseover`]),
      Et(`onMouseLeave`, [`mouseout`, `mouseover`]),
      Et(`onPointerEnter`, [`pointerout`, `pointerover`]),
      Et(`onPointerLeave`, [`pointerout`, `pointerover`]),
      Tt(
        `onChange`,
        `change click focusin focusout input keydown keyup selectionchange`.split(` `),
      ),
      Tt(
        `onSelect`,
        `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(
          ` `,
        ),
      ),
      Tt(`onBeforeInput`, [`compositionend`, `keypress`, `textInput`, `paste`]),
      Tt(`onCompositionEnd`, `compositionend focusout keydown keypress keyup mousedown`.split(` `)),
      Tt(
        `onCompositionStart`,
        `compositionstart focusout keydown keypress keyup mousedown`.split(` `),
      ),
      Tt(
        `onCompositionUpdate`,
        `compositionupdate focusout keydown keypress keyup mousedown`.split(` `),
      ))
    var _d =
        `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(
          ` `,
        ),
      vd = new Set(
        `beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d),
      )
    function yd(e, t) {
      t = (t & 4) != 0
      for (var n = 0; n < e.length; n++) {
        var r = e[n],
          i = r.event
        r = r.listeners
        a: {
          var a = void 0
          if (t)
            for (var o = r.length - 1; 0 <= o; o--) {
              var s = r[o],
                c = s.instance,
                l = s.currentTarget
              if (((s = s.listener), c !== a && i.isPropagationStopped())) break a
              ;((a = s), (i.currentTarget = l))
              try {
                a(i)
              } catch (e) {
                Yr(e)
              }
              ;((i.currentTarget = null), (a = c))
            }
          else
            for (o = 0; o < r.length; o++) {
              if (
                ((s = r[o]),
                (c = s.instance),
                (l = s.currentTarget),
                (s = s.listener),
                c !== a && i.isPropagationStopped())
              )
                break a
              ;((a = s), (i.currentTarget = l))
              try {
                a(i)
              } catch (e) {
                Yr(e)
              }
              ;((i.currentTarget = null), (a = c))
            }
        }
      }
    }
    function Q(e, t) {
      var n = t[ft]
      n === void 0 && (n = t[ft] = new Set())
      var r = e + `__bubble`
      n.has(r) || (Cd(t, e, 2, !1), n.add(r))
    }
    function bd(e, t, n) {
      var r = 0
      ;(t && (r |= 4), Cd(n, e, r, t))
    }
    var xd = `_reactListening` + Math.random().toString(36).slice(2)
    function Sd(e) {
      if (!e[xd]) {
        ;((e[xd] = !0),
          Ct.forEach(function (t) {
            t !== `selectionchange` && (vd.has(t) || bd(t, !1, e), bd(t, !0, e))
          }))
        var t = e.nodeType === 9 ? e : e.ownerDocument
        t === null || t[xd] || ((t[xd] = !0), bd(`selectionchange`, !1, t))
      }
    }
    function Cd(e, t, n, r) {
      switch (mp(t)) {
        case 2:
          var i = cp
          break
        case 8:
          i = lp
          break
        default:
          i = up
      }
      ;((n = i.bind(null, t, n, e)),
        (i = void 0),
        !pn || (t !== `touchstart` && t !== `touchmove` && t !== `wheel`) || (i = !0),
        r
          ? i === void 0
            ? e.addEventListener(t, n, !0)
            : e.addEventListener(t, n, { capture: !0, passive: i })
          : i === void 0
            ? e.addEventListener(t, n, !1)
            : e.addEventListener(t, n, { passive: i }))
    }
    function wd(e, t, n, r, i) {
      var a = r
      if (!(t & 1) && !(t & 2) && r !== null)
        a: for (;;) {
          if (r === null) return
          var o = r.tag
          if (o === 3 || o === 4) {
            var s = r.stateNode.containerInfo
            if (s === i) break
            if (o === 4)
              for (o = r.return; o !== null; ) {
                var c = o.tag
                if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return
                o = o.return
              }
            for (; s !== null; ) {
              if (((o = vt(s)), o === null)) return
              if (((c = o.tag), c === 5 || c === 6 || c === 26 || c === 27)) {
                r = a = o
                continue a
              }
              s = s.parentNode
            }
          }
          r = r.return
        }
      un(function () {
        var r = a,
          i = an(n),
          o = []
        a: {
          var s = Kr.get(e)
          if (s !== void 0) {
            var c = wn,
              u = e
            switch (e) {
              case `keypress`:
                if (yn(n) === 0) break a
              case `keydown`:
              case `keyup`:
                c = Hn
                break
              case `focusin`:
                ;((u = `focus`), (c = Nn))
                break
              case `focusout`:
                ;((u = `blur`), (c = Nn))
                break
              case `beforeblur`:
              case `afterblur`:
                c = Nn
                break
              case `click`:
                if (n.button === 2) break a
              case `auxclick`:
              case `dblclick`:
              case `mousedown`:
              case `mousemove`:
              case `mouseup`:
              case `mouseout`:
              case `mouseover`:
              case `contextmenu`:
                c = jn
                break
              case `drag`:
              case `dragend`:
              case `dragenter`:
              case `dragexit`:
              case `dragleave`:
              case `dragover`:
              case `dragstart`:
              case `drop`:
                c = Mn
                break
              case `touchcancel`:
              case `touchend`:
              case `touchmove`:
              case `touchstart`:
                c = Wn
                break
              case zr:
              case Br:
              case Vr:
                c = Pn
                break
              case Gr:
                c = Gn
                break
              case `scroll`:
              case `scrollend`:
                c = En
                break
              case `wheel`:
                c = Kn
                break
              case `copy`:
              case `cut`:
              case `paste`:
                c = Fn
                break
              case `gotpointercapture`:
              case `lostpointercapture`:
              case `pointercancel`:
              case `pointerdown`:
              case `pointermove`:
              case `pointerout`:
              case `pointerover`:
              case `pointerup`:
                c = Un
                break
              case `toggle`:
              case `beforetoggle`:
                c = qn
            }
            var d = (t & 4) != 0,
              f = !d && (e === `scroll` || e === `scrollend`),
              p = d ? (s === null ? null : s + `Capture`) : s
            d = []
            for (var m = r, h; m !== null; ) {
              var g = m
              if (
                ((h = g.stateNode),
                (g = g.tag),
                (g !== 5 && g !== 26 && g !== 27) ||
                  h === null ||
                  p === null ||
                  ((g = dn(m, p)), g != null && d.push(Td(m, g, h))),
                f)
              )
                break
              m = m.return
            }
            0 < d.length && ((s = new c(s, u, null, n, i)), o.push({ event: s, listeners: d }))
          }
        }
        if (!(t & 7)) {
          a: {
            if (
              ((s = e === `mouseover` || e === `pointerover`),
              (c = e === `mouseout` || e === `pointerout`),
              s && n !== rn && (u = n.relatedTarget || n.fromElement) && (vt(u) || u[dt]))
            )
              break a
            if (
              (c || s) &&
              ((s =
                i.window === i
                  ? i
                  : (s = i.ownerDocument)
                    ? s.defaultView || s.parentWindow
                    : window),
              c
                ? ((u = n.relatedTarget || n.toElement),
                  (c = r),
                  (u = u ? vt(u) : null),
                  u !== null &&
                    ((f = l(u)), (d = u.tag), u !== f || (d !== 5 && d !== 27 && d !== 6)) &&
                    (u = null))
                : ((c = null), (u = r)),
              c !== u)
            ) {
              if (
                ((d = jn),
                (g = `onMouseLeave`),
                (p = `onMouseEnter`),
                (m = `mouse`),
                (e === `pointerout` || e === `pointerover`) &&
                  ((d = Un), (g = `onPointerLeave`), (p = `onPointerEnter`), (m = `pointer`)),
                (f = c == null ? s : bt(c)),
                (h = u == null ? s : bt(u)),
                (s = new d(g, m + `leave`, c, n, i)),
                (s.target = f),
                (s.relatedTarget = h),
                (g = null),
                vt(i) === r &&
                  ((d = new d(p, m + `enter`, u, n, i)),
                  (d.target = h),
                  (d.relatedTarget = f),
                  (g = d)),
                (f = g),
                c && u)
              )
                b: {
                  for (d = Dd, p = c, m = u, h = 0, g = p; g; g = d(g)) h++
                  g = 0
                  for (var _ = m; _; _ = d(_)) g++
                  for (; 0 < h - g; ) ((p = d(p)), h--)
                  for (; 0 < g - h; ) ((m = d(m)), g--)
                  for (; h--; ) {
                    if (p === m || (m !== null && p === m.alternate)) {
                      d = p
                      break b
                    }
                    ;((p = d(p)), (m = d(m)))
                  }
                  d = null
                }
              else d = null
              ;(c !== null && Od(o, s, c, d, !1), u !== null && f !== null && Od(o, f, u, d, !0))
            }
          }
          a: {
            if (
              ((s = r ? bt(r) : window),
              (c = s.nodeName && s.nodeName.toLowerCase()),
              c === `select` || (c === `input` && s.type === `file`))
            )
              var v = ur
            else if (ir(s))
              if (dr) v = yr
              else {
                v = _r
                var y = gr
              }
            else
              ((c = s.nodeName),
                !c || c.toLowerCase() !== `input` || (s.type !== `checkbox` && s.type !== `radio`)
                  ? r && Qt(r.elementType) && (v = ur)
                  : (v = vr))
            if ((v &&= v(e, r))) {
              ar(o, v, n, i)
              break a
            }
            ;(y && y(e, s, r),
              e === `focusout` &&
                r &&
                s.type === `number` &&
                r.memoizedProps.value != null &&
                Wt(s, `number`, s.value))
          }
          switch (((y = r ? bt(r) : window), e)) {
            case `focusin`:
              ;(ir(y) || y.contentEditable === `true`) && ((kr = y), (Ar = r), (jr = null))
              break
            case `focusout`:
              jr = Ar = kr = null
              break
            case `mousedown`:
              Mr = !0
              break
            case `contextmenu`:
            case `mouseup`:
            case `dragend`:
              ;((Mr = !1), Nr(o, n, i))
              break
            case `selectionchange`:
              if (Or) break
            case `keydown`:
            case `keyup`:
              Nr(o, n, i)
          }
          var b
          if (Yn)
            b: {
              switch (e) {
                case `compositionstart`:
                  var x = `onCompositionStart`
                  break b
                case `compositionend`:
                  x = `onCompositionEnd`
                  break b
                case `compositionupdate`:
                  x = `onCompositionUpdate`
                  break b
              }
              x = void 0
            }
          else
            R
              ? er(e, n) && (x = `onCompositionEnd`)
              : e === `keydown` && n.keyCode === 229 && (x = `onCompositionStart`)
          ;(x &&
            (Qn &&
              n.locale !== `ko` &&
              (R || x !== `onCompositionStart`
                ? x === `onCompositionEnd` && R && (b = vn())
                : ((hn = i), (gn = `value` in hn ? hn.value : hn.textContent), (R = !0))),
            (y = Ed(r, x)),
            0 < y.length &&
              ((x = new In(x, e, null, n, i)),
              o.push({ event: x, listeners: y }),
              b ? (x.data = b) : ((b = L(n)), b !== null && (x.data = b)))),
            (b = Zn ? tr(e, n) : nr(e, n)) &&
              ((x = Ed(r, `onBeforeInput`)),
              0 < x.length &&
                ((y = new In(`onBeforeInput`, `beforeinput`, null, n, i)),
                o.push({ event: y, listeners: x }),
                (y.data = b))),
            md(o, e, r, n, i))
        }
        yd(o, t)
      })
    }
    function Td(e, t, n) {
      return { instance: e, listener: t, currentTarget: n }
    }
    function Ed(e, t) {
      for (var n = t + `Capture`, r = []; e !== null; ) {
        var i = e,
          a = i.stateNode
        if (
          ((i = i.tag),
          (i !== 5 && i !== 26 && i !== 27) ||
            a === null ||
            ((i = dn(e, n)),
            i != null && r.unshift(Td(e, i, a)),
            (i = dn(e, t)),
            i != null && r.push(Td(e, i, a))),
          e.tag === 3)
        )
          return r
        e = e.return
      }
      return []
    }
    function Dd(e) {
      if (e === null) return null
      do e = e.return
      while (e && e.tag !== 5 && e.tag !== 27)
      return e || null
    }
    function Od(e, t, n, r, i) {
      for (var a = t._reactName, o = []; n !== null && n !== r; ) {
        var s = n,
          c = s.alternate,
          l = s.stateNode
        if (((s = s.tag), c !== null && c === r)) break
        ;((s !== 5 && s !== 26 && s !== 27) ||
          l === null ||
          ((c = l),
          i
            ? ((l = dn(n, a)), l != null && o.unshift(Td(n, l, c)))
            : i || ((l = dn(n, a)), l != null && o.push(Td(n, l, c)))),
          (n = n.return))
      }
      o.length !== 0 && e.push({ event: t, listeners: o })
    }
    var kd = /\r\n?/g,
      Ad = /\u0000|\uFFFD/g
    function jd(e) {
      return (typeof e == `string` ? e : `` + e)
        .replace(
          kd,
          `
`,
        )
        .replace(Ad, ``)
    }
    function Md(e, t) {
      return ((t = jd(t)), jd(e) === t)
    }
    function $(e, t, n, r, i, a) {
      switch (n) {
        case `children`:
          typeof r == `string`
            ? t === `body` || (t === `textarea` && r === ``) || Jt(e, r)
            : (typeof r == `number` || typeof r == `bigint`) && t !== `body` && Jt(e, `` + r)
          break
        case `className`:
          Mt(e, `class`, r)
          break
        case `tabIndex`:
          Mt(e, `tabindex`, r)
          break
        case `dir`:
        case `role`:
        case `viewBox`:
        case `width`:
        case `height`:
          Mt(e, n, r)
          break
        case `style`:
          Zt(e, r, a)
          break
        case `data`:
          if (t !== `object`) {
            Mt(e, `data`, r)
            break
          }
        case `src`:
        case `href`:
          if (r === `` && (t !== `a` || n !== `href`)) {
            e.removeAttribute(n)
            break
          }
          if (
            r == null ||
            typeof r == `function` ||
            typeof r == `symbol` ||
            typeof r == `boolean`
          ) {
            e.removeAttribute(n)
            break
          }
          ;((r = tn(`` + r)), e.setAttribute(n, r))
          break
        case `action`:
        case `formAction`:
          if (typeof r == `function`) {
            e.setAttribute(
              n,
              `javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`,
            )
            break
          } else
            typeof a == `function` &&
              (n === `formAction`
                ? (t !== `input` && $(e, t, `name`, i.name, i, null),
                  $(e, t, `formEncType`, i.formEncType, i, null),
                  $(e, t, `formMethod`, i.formMethod, i, null),
                  $(e, t, `formTarget`, i.formTarget, i, null))
                : ($(e, t, `encType`, i.encType, i, null),
                  $(e, t, `method`, i.method, i, null),
                  $(e, t, `target`, i.target, i, null)))
          if (r == null || typeof r == `symbol` || typeof r == `boolean`) {
            e.removeAttribute(n)
            break
          }
          ;((r = tn(`` + r)), e.setAttribute(n, r))
          break
        case `onClick`:
          r != null && (e.onclick = nn)
          break
        case `onScroll`:
          r != null && Q(`scroll`, e)
          break
        case `onScrollEnd`:
          r != null && Q(`scrollend`, e)
          break
        case `dangerouslySetInnerHTML`:
          if (r != null) {
            if (typeof r != `object` || !(`__html` in r)) throw Error(o(61))
            if (((n = r.__html), n != null)) {
              if (i.children != null) throw Error(o(60))
              e.innerHTML = n
            }
          }
          break
        case `multiple`:
          e.multiple = r && typeof r != `function` && typeof r != `symbol`
          break
        case `muted`:
          e.muted = r && typeof r != `function` && typeof r != `symbol`
          break
        case `suppressContentEditableWarning`:
        case `suppressHydrationWarning`:
        case `defaultValue`:
        case `defaultChecked`:
        case `innerHTML`:
        case `ref`:
          break
        case `autoFocus`:
          break
        case `xlinkHref`:
          if (
            r == null ||
            typeof r == `function` ||
            typeof r == `boolean` ||
            typeof r == `symbol`
          ) {
            e.removeAttribute(`xlink:href`)
            break
          }
          ;((n = tn(`` + r)), e.setAttributeNS(`http://www.w3.org/1999/xlink`, `xlink:href`, n))
          break
        case `contentEditable`:
        case `spellCheck`:
        case `draggable`:
        case `value`:
        case `autoReverse`:
        case `externalResourcesRequired`:
        case `focusable`:
        case `preserveAlpha`:
          r != null && typeof r != `function` && typeof r != `symbol`
            ? e.setAttribute(n, `` + r)
            : e.removeAttribute(n)
          break
        case `inert`:
        case `allowFullScreen`:
        case `async`:
        case `autoPlay`:
        case `controls`:
        case `default`:
        case `defer`:
        case `disabled`:
        case `disablePictureInPicture`:
        case `disableRemotePlayback`:
        case `formNoValidate`:
        case `hidden`:
        case `loop`:
        case `noModule`:
        case `noValidate`:
        case `open`:
        case `playsInline`:
        case `readOnly`:
        case `required`:
        case `reversed`:
        case `scoped`:
        case `seamless`:
        case `itemScope`:
          r && typeof r != `function` && typeof r != `symbol`
            ? e.setAttribute(n, ``)
            : e.removeAttribute(n)
          break
        case `capture`:
        case `download`:
          !0 === r
            ? e.setAttribute(n, ``)
            : !1 !== r && r != null && typeof r != `function` && typeof r != `symbol`
              ? e.setAttribute(n, r)
              : e.removeAttribute(n)
          break
        case `cols`:
        case `rows`:
        case `size`:
        case `span`:
          r != null && typeof r != `function` && typeof r != `symbol` && !isNaN(r) && 1 <= r
            ? e.setAttribute(n, r)
            : e.removeAttribute(n)
          break
        case `rowSpan`:
        case `start`:
          r == null || typeof r == `function` || typeof r == `symbol` || isNaN(r)
            ? e.removeAttribute(n)
            : e.setAttribute(n, r)
          break
        case `popover`:
          ;(Q(`beforetoggle`, e), Q(`toggle`, e), jt(e, `popover`, r))
          break
        case `xlinkActuate`:
          Nt(e, `http://www.w3.org/1999/xlink`, `xlink:actuate`, r)
          break
        case `xlinkArcrole`:
          Nt(e, `http://www.w3.org/1999/xlink`, `xlink:arcrole`, r)
          break
        case `xlinkRole`:
          Nt(e, `http://www.w3.org/1999/xlink`, `xlink:role`, r)
          break
        case `xlinkShow`:
          Nt(e, `http://www.w3.org/1999/xlink`, `xlink:show`, r)
          break
        case `xlinkTitle`:
          Nt(e, `http://www.w3.org/1999/xlink`, `xlink:title`, r)
          break
        case `xlinkType`:
          Nt(e, `http://www.w3.org/1999/xlink`, `xlink:type`, r)
          break
        case `xmlBase`:
          Nt(e, `http://www.w3.org/XML/1998/namespace`, `xml:base`, r)
          break
        case `xmlLang`:
          Nt(e, `http://www.w3.org/XML/1998/namespace`, `xml:lang`, r)
          break
        case `xmlSpace`:
          Nt(e, `http://www.w3.org/XML/1998/namespace`, `xml:space`, r)
          break
        case `is`:
          jt(e, `is`, r)
          break
        case `innerText`:
        case `textContent`:
          break
        default:
          ;(!(2 < n.length) || (n[0] !== `o` && n[0] !== `O`) || (n[1] !== `n` && n[1] !== `N`)) &&
            ((n = $t.get(n) || n), jt(e, n, r))
      }
    }
    function Nd(e, t, n, r, i, a) {
      switch (n) {
        case `style`:
          Zt(e, r, a)
          break
        case `dangerouslySetInnerHTML`:
          if (r != null) {
            if (typeof r != `object` || !(`__html` in r)) throw Error(o(61))
            if (((n = r.__html), n != null)) {
              if (i.children != null) throw Error(o(60))
              e.innerHTML = n
            }
          }
          break
        case `children`:
          typeof r == `string`
            ? Jt(e, r)
            : (typeof r == `number` || typeof r == `bigint`) && Jt(e, `` + r)
          break
        case `onScroll`:
          r != null && Q(`scroll`, e)
          break
        case `onScrollEnd`:
          r != null && Q(`scrollend`, e)
          break
        case `onClick`:
          r != null && (e.onclick = nn)
          break
        case `suppressContentEditableWarning`:
        case `suppressHydrationWarning`:
        case `innerHTML`:
        case `ref`:
          break
        case `innerText`:
        case `textContent`:
          break
        default:
          if (!wt.hasOwnProperty(n))
            a: {
              if (
                n[0] === `o` &&
                n[1] === `n` &&
                ((i = n.endsWith(`Capture`)),
                (t = n.slice(2, i ? n.length - 7 : void 0)),
                (a = e[ut] || null),
                (a = a == null ? null : a[n]),
                typeof a == `function` && e.removeEventListener(t, a, i),
                typeof r == `function`)
              ) {
                ;(typeof a != `function` &&
                  a !== null &&
                  (n in e ? (e[n] = null) : e.hasAttribute(n) && e.removeAttribute(n)),
                  e.addEventListener(t, r, i))
                break a
              }
              n in e ? (e[n] = r) : !0 === r ? e.setAttribute(n, ``) : jt(e, n, r)
            }
      }
    }
    function Pd(e, t, n) {
      switch (t) {
        case `div`:
        case `span`:
        case `svg`:
        case `path`:
        case `a`:
        case `g`:
        case `p`:
        case `li`:
          break
        case `img`:
          ;(Q(`error`, e), Q(`load`, e))
          var r = !1,
            i = !1,
            a
          for (a in n)
            if (n.hasOwnProperty(a)) {
              var s = n[a]
              if (s != null)
                switch (a) {
                  case `src`:
                    r = !0
                    break
                  case `srcSet`:
                    i = !0
                    break
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    throw Error(o(137, t))
                  default:
                    $(e, t, a, s, n, null)
                }
            }
          ;(i && $(e, t, `srcSet`, n.srcSet, n, null), r && $(e, t, `src`, n.src, n, null))
          return
        case `input`:
          Q(`invalid`, e)
          var c = (a = s = i = null),
            l = null,
            u = null
          for (r in n)
            if (n.hasOwnProperty(r)) {
              var d = n[r]
              if (d != null)
                switch (r) {
                  case `name`:
                    i = d
                    break
                  case `type`:
                    s = d
                    break
                  case `checked`:
                    l = d
                    break
                  case `defaultChecked`:
                    u = d
                    break
                  case `value`:
                    a = d
                    break
                  case `defaultValue`:
                    c = d
                    break
                  case `children`:
                  case `dangerouslySetInnerHTML`:
                    if (d != null) throw Error(o(137, t))
                    break
                  default:
                    $(e, t, r, d, n, null)
                }
            }
          Ut(e, a, c, l, u, s, i, !1)
          return
        case `select`:
          for (i in (Q(`invalid`, e), (r = s = a = null), n))
            if (n.hasOwnProperty(i) && ((c = n[i]), c != null))
              switch (i) {
                case `value`:
                  a = c
                  break
                case `defaultValue`:
                  s = c
                  break
                case `multiple`:
                  r = c
                default:
                  $(e, t, i, c, n, null)
              }
          ;((t = a),
            (n = s),
            (e.multiple = !!r),
            t == null ? n != null && Gt(e, !!r, n, !0) : Gt(e, !!r, t, !1))
          return
        case `textarea`:
          for (s in (Q(`invalid`, e), (a = i = r = null), n))
            if (n.hasOwnProperty(s) && ((c = n[s]), c != null))
              switch (s) {
                case `value`:
                  r = c
                  break
                case `defaultValue`:
                  i = c
                  break
                case `children`:
                  a = c
                  break
                case `dangerouslySetInnerHTML`:
                  if (c != null) throw Error(o(91))
                  break
                default:
                  $(e, t, s, c, n, null)
              }
          qt(e, r, i, a)
          return
        case `option`:
          for (l in n)
            if (n.hasOwnProperty(l) && ((r = n[l]), r != null))
              switch (l) {
                case `selected`:
                  e.selected = r && typeof r != `function` && typeof r != `symbol`
                  break
                default:
                  $(e, t, l, r, n, null)
              }
          return
        case `dialog`:
          ;(Q(`beforetoggle`, e), Q(`toggle`, e), Q(`cancel`, e), Q(`close`, e))
          break
        case `iframe`:
        case `object`:
          Q(`load`, e)
          break
        case `video`:
        case `audio`:
          for (r = 0; r < _d.length; r++) Q(_d[r], e)
          break
        case `image`:
          ;(Q(`error`, e), Q(`load`, e))
          break
        case `details`:
          Q(`toggle`, e)
          break
        case `embed`:
        case `source`:
        case `link`:
          ;(Q(`error`, e), Q(`load`, e))
        case `area`:
        case `base`:
        case `br`:
        case `col`:
        case `hr`:
        case `keygen`:
        case `meta`:
        case `param`:
        case `track`:
        case `wbr`:
        case `menuitem`:
          for (u in n)
            if (n.hasOwnProperty(u) && ((r = n[u]), r != null))
              switch (u) {
                case `children`:
                case `dangerouslySetInnerHTML`:
                  throw Error(o(137, t))
                default:
                  $(e, t, u, r, n, null)
              }
          return
        default:
          if (Qt(t)) {
            for (d in n)
              n.hasOwnProperty(d) && ((r = n[d]), r !== void 0 && Nd(e, t, d, r, n, void 0))
            return
          }
      }
      for (c in n) n.hasOwnProperty(c) && ((r = n[c]), r != null && $(e, t, c, r, n, null))
    }
    function Fd(e, t, n, r) {
      switch (t) {
        case `div`:
        case `span`:
        case `svg`:
        case `path`:
        case `a`:
        case `g`:
        case `p`:
        case `li`:
          break
        case `input`:
          var i = null,
            a = null,
            s = null,
            c = null,
            l = null,
            u = null,
            d = null
          for (m in n) {
            var f = n[m]
            if (n.hasOwnProperty(m) && f != null)
              switch (m) {
                case `checked`:
                  break
                case `value`:
                  break
                case `defaultValue`:
                  l = f
                default:
                  r.hasOwnProperty(m) || $(e, t, m, null, r, f)
              }
          }
          for (var p in r) {
            var m = r[p]
            if (((f = n[p]), r.hasOwnProperty(p) && (m != null || f != null)))
              switch (p) {
                case `type`:
                  a = m
                  break
                case `name`:
                  i = m
                  break
                case `checked`:
                  u = m
                  break
                case `defaultChecked`:
                  d = m
                  break
                case `value`:
                  s = m
                  break
                case `defaultValue`:
                  c = m
                  break
                case `children`:
                case `dangerouslySetInnerHTML`:
                  if (m != null) throw Error(o(137, t))
                  break
                default:
                  m !== f && $(e, t, p, m, r, f)
              }
          }
          Ht(e, s, c, l, u, d, a, i)
          return
        case `select`:
          for (a in ((m = s = c = p = null), n))
            if (((l = n[a]), n.hasOwnProperty(a) && l != null))
              switch (a) {
                case `value`:
                  break
                case `multiple`:
                  m = l
                default:
                  r.hasOwnProperty(a) || $(e, t, a, null, r, l)
              }
          for (i in r)
            if (((a = r[i]), (l = n[i]), r.hasOwnProperty(i) && (a != null || l != null)))
              switch (i) {
                case `value`:
                  p = a
                  break
                case `defaultValue`:
                  c = a
                  break
                case `multiple`:
                  s = a
                default:
                  a !== l && $(e, t, i, a, r, l)
              }
          ;((t = c),
            (n = s),
            (r = m),
            p == null
              ? !!r != !!n && (t == null ? Gt(e, !!n, n ? [] : ``, !1) : Gt(e, !!n, t, !0))
              : Gt(e, !!n, p, !1))
          return
        case `textarea`:
          for (c in ((m = p = null), n))
            if (((i = n[c]), n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c)))
              switch (c) {
                case `value`:
                  break
                case `children`:
                  break
                default:
                  $(e, t, c, null, r, i)
              }
          for (s in r)
            if (((i = r[s]), (a = n[s]), r.hasOwnProperty(s) && (i != null || a != null)))
              switch (s) {
                case `value`:
                  p = i
                  break
                case `defaultValue`:
                  m = i
                  break
                case `children`:
                  break
                case `dangerouslySetInnerHTML`:
                  if (i != null) throw Error(o(91))
                  break
                default:
                  i !== a && $(e, t, s, i, r, a)
              }
          Kt(e, p, m)
          return
        case `option`:
          for (var h in n)
            if (((p = n[h]), n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)))
              switch (h) {
                case `selected`:
                  e.selected = !1
                  break
                default:
                  $(e, t, h, null, r, p)
              }
          for (l in r)
            if (
              ((p = r[l]), (m = n[l]), r.hasOwnProperty(l) && p !== m && (p != null || m != null))
            )
              switch (l) {
                case `selected`:
                  e.selected = p && typeof p != `function` && typeof p != `symbol`
                  break
                default:
                  $(e, t, l, p, r, m)
              }
          return
        case `img`:
        case `link`:
        case `area`:
        case `base`:
        case `br`:
        case `col`:
        case `embed`:
        case `hr`:
        case `keygen`:
        case `meta`:
        case `param`:
        case `source`:
        case `track`:
        case `wbr`:
        case `menuitem`:
          for (var g in n)
            ((p = n[g]),
              n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p))
          for (u in r)
            if (
              ((p = r[u]), (m = n[u]), r.hasOwnProperty(u) && p !== m && (p != null || m != null))
            )
              switch (u) {
                case `children`:
                case `dangerouslySetInnerHTML`:
                  if (p != null) throw Error(o(137, t))
                  break
                default:
                  $(e, t, u, p, r, m)
              }
          return
        default:
          if (Qt(t)) {
            for (var _ in n)
              ((p = n[_]),
                n.hasOwnProperty(_) &&
                  p !== void 0 &&
                  !r.hasOwnProperty(_) &&
                  Nd(e, t, _, void 0, r, p))
            for (d in r)
              ((p = r[d]),
                (m = n[d]),
                !r.hasOwnProperty(d) ||
                  p === m ||
                  (p === void 0 && m === void 0) ||
                  Nd(e, t, d, p, r, m))
            return
          }
      }
      for (var v in n)
        ((p = n[v]),
          n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p))
      for (f in r)
        ((p = r[f]),
          (m = n[f]),
          !r.hasOwnProperty(f) || p === m || (p == null && m == null) || $(e, t, f, p, r, m))
    }
    function Id(e) {
      switch (e) {
        case `css`:
        case `script`:
        case `font`:
        case `img`:
        case `image`:
        case `input`:
        case `link`:
          return !0
        default:
          return !1
      }
    }
    function Ld() {
      if (typeof performance.getEntriesByType == `function`) {
        for (
          var e = 0, t = 0, n = performance.getEntriesByType(`resource`), r = 0;
          r < n.length;
          r++
        ) {
          var i = n[r],
            a = i.transferSize,
            o = i.initiatorType,
            s = i.duration
          if (a && s && Id(o)) {
            for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
              var c = n[r],
                l = c.startTime
              if (l > s) break
              var u = c.transferSize,
                d = c.initiatorType
              u && Id(d) && ((c = c.responseEnd), (o += u * (c < s ? 1 : (s - l) / (c - l))))
            }
            if ((--r, (t += (8 * (a + o)) / (i.duration / 1e3)), e++, 10 < e)) break
          }
        }
        if (0 < e) return t / e / 1e6
      }
      return navigator.connection && ((e = navigator.connection.downlink), typeof e == `number`)
        ? e
        : 5
    }
    var Rd = null,
      zd = null
    function Bd(e) {
      return e.nodeType === 9 ? e : e.ownerDocument
    }
    function Vd(e) {
      switch (e) {
        case `http://www.w3.org/2000/svg`:
          return 1
        case `http://www.w3.org/1998/Math/MathML`:
          return 2
        default:
          return 0
      }
    }
    function Hd(e, t) {
      if (e === 0)
        switch (t) {
          case `svg`:
            return 1
          case `math`:
            return 2
          default:
            return 0
        }
      return e === 1 && t === `foreignObject` ? 0 : e
    }
    function Ud(e, t) {
      return (
        e === `textarea` ||
        e === `noscript` ||
        typeof t.children == `string` ||
        typeof t.children == `number` ||
        typeof t.children == `bigint` ||
        (typeof t.dangerouslySetInnerHTML == `object` &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      )
    }
    var Wd = null
    function Gd() {
      var e = window.event
      return e && e.type === `popstate` ? (e === Wd ? !1 : ((Wd = e), !0)) : ((Wd = null), !1)
    }
    var Kd = typeof setTimeout == `function` ? setTimeout : void 0,
      qd = typeof clearTimeout == `function` ? clearTimeout : void 0,
      Jd = typeof Promise == `function` ? Promise : void 0,
      Yd =
        typeof queueMicrotask == `function`
          ? queueMicrotask
          : Jd === void 0
            ? Kd
            : function (e) {
                return Jd.resolve(null).then(e).catch(Xd)
              }
    function Xd(e) {
      setTimeout(function () {
        throw e
      })
    }
    function Zd(e) {
      return e === `head`
    }
    function Qd(e, t) {
      var n = t,
        r = 0
      do {
        var i = n.nextSibling
        if ((e.removeChild(n), i && i.nodeType === 8))
          if (((n = i.data), n === `/$` || n === `/&`)) {
            if (r === 0) {
              ;(e.removeChild(i), Np(t))
              return
            }
            r--
          } else if (n === `$` || n === `$?` || n === `$~` || n === `$!` || n === `&`) r++
          else if (n === `html`) pf(e.ownerDocument.documentElement)
          else if (n === `head`) {
            ;((n = e.ownerDocument.head), pf(n))
            for (var a = n.firstChild; a; ) {
              var o = a.nextSibling,
                s = a.nodeName
              ;(a[gt] ||
                s === `SCRIPT` ||
                s === `STYLE` ||
                (s === `LINK` && a.rel.toLowerCase() === `stylesheet`) ||
                n.removeChild(a),
                (a = o))
            }
          } else n === `body` && pf(e.ownerDocument.body)
        n = i
      } while (n)
      Np(t)
    }
    function $d(e, t) {
      var n = e
      e = 0
      do {
        var r = n.nextSibling
        if (
          (n.nodeType === 1
            ? t
              ? ((n._stashedDisplay = n.style.display), (n.style.display = `none`))
              : ((n.style.display = n._stashedDisplay || ``),
                n.getAttribute(`style`) === `` && n.removeAttribute(`style`))
            : n.nodeType === 3 &&
              (t
                ? ((n._stashedText = n.nodeValue), (n.nodeValue = ``))
                : (n.nodeValue = n._stashedText || ``)),
          r && r.nodeType === 8)
        )
          if (((n = r.data), n === `/$`)) {
            if (e === 0) break
            e--
          } else (n !== `$` && n !== `$?` && n !== `$~` && n !== `$!`) || e++
        n = r
      } while (n)
    }
    function ef(e) {
      var t = e.firstChild
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var n = t
        switch (((t = t.nextSibling), n.nodeName)) {
          case `HTML`:
          case `HEAD`:
          case `BODY`:
            ;(ef(n), _t(n))
            continue
          case `SCRIPT`:
          case `STYLE`:
            continue
          case `LINK`:
            if (n.rel.toLowerCase() === `stylesheet`) continue
        }
        e.removeChild(n)
      }
    }
    function tf(e, t, n, r) {
      for (; e.nodeType === 1; ) {
        var i = n
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!r && (e.nodeName !== `INPUT` || e.type !== `hidden`)) break
        } else if (!r)
          if (t === `input` && e.type === `hidden`) {
            var a = i.name == null ? null : `` + i.name
            if (i.type === `hidden` && e.getAttribute(`name`) === a) return e
          } else return e
        else if (!e[gt])
          switch (t) {
            case `meta`:
              if (!e.hasAttribute(`itemprop`)) break
              return e
            case `link`:
              if (
                ((a = e.getAttribute(`rel`)),
                (a === `stylesheet` && e.hasAttribute(`data-precedence`)) ||
                  a !== i.rel ||
                  e.getAttribute(`href`) !== (i.href == null || i.href === `` ? null : i.href) ||
                  e.getAttribute(`crossorigin`) !==
                    (i.crossOrigin == null ? null : i.crossOrigin) ||
                  e.getAttribute(`title`) !== (i.title == null ? null : i.title))
              )
                break
              return e
            case `style`:
              if (e.hasAttribute(`data-precedence`)) break
              return e
            case `script`:
              if (
                ((a = e.getAttribute(`src`)),
                (a !== (i.src == null ? null : i.src) ||
                  e.getAttribute(`type`) !== (i.type == null ? null : i.type) ||
                  e.getAttribute(`crossorigin`) !==
                    (i.crossOrigin == null ? null : i.crossOrigin)) &&
                  a &&
                  e.hasAttribute(`async`) &&
                  !e.hasAttribute(`itemprop`))
              )
                break
              return e
            default:
              return e
          }
        if (((e = cf(e.nextSibling)), e === null)) break
      }
      return null
    }
    function nf(e, t, n) {
      if (t === ``) return null
      for (; e.nodeType !== 3; )
        if (
          ((e.nodeType !== 1 || e.nodeName !== `INPUT` || e.type !== `hidden`) && !n) ||
          ((e = cf(e.nextSibling)), e === null)
        )
          return null
      return e
    }
    function rf(e, t) {
      for (; e.nodeType !== 8; )
        if (
          ((e.nodeType !== 1 || e.nodeName !== `INPUT` || e.type !== `hidden`) && !t) ||
          ((e = cf(e.nextSibling)), e === null)
        )
          return null
      return e
    }
    function af(e) {
      return e.data === `$?` || e.data === `$~`
    }
    function of(e) {
      return e.data === `$!` || (e.data === `$?` && e.ownerDocument.readyState !== `loading`)
    }
    function sf(e, t) {
      var n = e.ownerDocument
      if (e.data === `$~`) e._reactRetry = t
      else if (e.data !== `$?` || n.readyState !== `loading`) t()
      else {
        var r = function () {
          ;(t(), n.removeEventListener(`DOMContentLoaded`, r))
        }
        ;(n.addEventListener(`DOMContentLoaded`, r), (e._reactRetry = r))
      }
    }
    function cf(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType
        if (t === 1 || t === 3) break
        if (t === 8) {
          if (
            ((t = e.data),
            t === `$` ||
              t === `$!` ||
              t === `$?` ||
              t === `$~` ||
              t === `&` ||
              t === `F!` ||
              t === `F`)
          )
            break
          if (t === `/$` || t === `/&`) return null
        }
      }
      return e
    }
    var lf = null
    function uf(e) {
      e = e.nextSibling
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data
          if (n === `/$` || n === `/&`) {
            if (t === 0) return cf(e.nextSibling)
            t--
          } else (n !== `$` && n !== `$!` && n !== `$?` && n !== `$~` && n !== `&`) || t++
        }
        e = e.nextSibling
      }
      return null
    }
    function df(e) {
      e = e.previousSibling
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data
          if (n === `$` || n === `$!` || n === `$?` || n === `$~` || n === `&`) {
            if (t === 0) return e
            t--
          } else (n !== `/$` && n !== `/&`) || t++
        }
        e = e.previousSibling
      }
      return null
    }
    function ff(e, t, n) {
      switch (((t = Bd(n)), e)) {
        case `html`:
          if (((e = t.documentElement), !e)) throw Error(o(452))
          return e
        case `head`:
          if (((e = t.head), !e)) throw Error(o(453))
          return e
        case `body`:
          if (((e = t.body), !e)) throw Error(o(454))
          return e
        default:
          throw Error(o(451))
      }
    }
    function pf(e) {
      for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0])
      _t(e)
    }
    var mf = new Map(),
      hf = new Set()
    function gf(e) {
      return typeof e.getRootNode == `function`
        ? e.getRootNode()
        : e.nodeType === 9
          ? e
          : e.ownerDocument
    }
    var _f = P.d
    P.d = { f: vf, r: yf, D: Sf, C: Cf, L: wf, m: Tf, X: Df, S: Ef, M: Of }
    function vf() {
      var e = _f.f(),
        t = bu()
      return e || t
    }
    function yf(e) {
      var t = yt(e)
      t !== null && t.tag === 5 && t.type === `form` ? ws(t) : _f.r(e)
    }
    var bf = typeof document > `u` ? null : document
    function xf(e, t, n) {
      var r = bf
      if (r && typeof t == `string` && t) {
        var i = Vt(t)
        ;((i = `link[rel="` + e + `"][href="` + i + `"]`),
          typeof n == `string` && (i += `[crossorigin="` + n + `"]`),
          hf.has(i) ||
            (hf.add(i),
            (e = { rel: e, crossOrigin: n, href: t }),
            r.querySelector(i) === null &&
              ((t = r.createElement(`link`)), Pd(t, `link`, e), St(t), r.head.appendChild(t))))
      }
    }
    function Sf(e) {
      ;(_f.D(e), xf(`dns-prefetch`, e, null))
    }
    function Cf(e, t) {
      ;(_f.C(e, t), xf(`preconnect`, e, t))
    }
    function wf(e, t, n) {
      _f.L(e, t, n)
      var r = bf
      if (r && e && t) {
        var i = `link[rel="preload"][as="` + Vt(t) + `"]`
        t === `image` && n && n.imageSrcSet
          ? ((i += `[imagesrcset="` + Vt(n.imageSrcSet) + `"]`),
            typeof n.imageSizes == `string` && (i += `[imagesizes="` + Vt(n.imageSizes) + `"]`))
          : (i += `[href="` + Vt(e) + `"]`)
        var a = i
        switch (t) {
          case `style`:
            a = Af(e)
            break
          case `script`:
            a = Pf(e)
        }
        mf.has(a) ||
          ((e = h(
            { rel: `preload`, href: t === `image` && n && n.imageSrcSet ? void 0 : e, as: t },
            n,
          )),
          mf.set(a, e),
          r.querySelector(i) !== null ||
            (t === `style` && r.querySelector(jf(a))) ||
            (t === `script` && r.querySelector(Ff(a))) ||
            ((t = r.createElement(`link`)), Pd(t, `link`, e), St(t), r.head.appendChild(t)))
      }
    }
    function Tf(e, t) {
      _f.m(e, t)
      var n = bf
      if (n && e) {
        var r = t && typeof t.as == `string` ? t.as : `script`,
          i = `link[rel="modulepreload"][as="` + Vt(r) + `"][href="` + Vt(e) + `"]`,
          a = i
        switch (r) {
          case `audioworklet`:
          case `paintworklet`:
          case `serviceworker`:
          case `sharedworker`:
          case `worker`:
          case `script`:
            a = Pf(e)
        }
        if (
          !mf.has(a) &&
          ((e = h({ rel: `modulepreload`, href: e }, t)), mf.set(a, e), n.querySelector(i) === null)
        ) {
          switch (r) {
            case `audioworklet`:
            case `paintworklet`:
            case `serviceworker`:
            case `sharedworker`:
            case `worker`:
            case `script`:
              if (n.querySelector(Ff(a))) return
          }
          ;((r = n.createElement(`link`)), Pd(r, `link`, e), St(r), n.head.appendChild(r))
        }
      }
    }
    function Ef(e, t, n) {
      _f.S(e, t, n)
      var r = bf
      if (r && e) {
        var i = xt(r).hoistableStyles,
          a = Af(e)
        t ||= `default`
        var o = i.get(a)
        if (!o) {
          var s = { loading: 0, preload: null }
          if ((o = r.querySelector(jf(a)))) s.loading = 5
          else {
            ;((e = h({ rel: `stylesheet`, href: e, 'data-precedence': t }, n)),
              (n = mf.get(a)) && Rf(e, n))
            var c = (o = r.createElement(`link`))
            ;(St(c),
              Pd(c, `link`, e),
              (c._p = new Promise(function (e, t) {
                ;((c.onload = e), (c.onerror = t))
              })),
              c.addEventListener(`load`, function () {
                s.loading |= 1
              }),
              c.addEventListener(`error`, function () {
                s.loading |= 2
              }),
              (s.loading |= 4),
              Lf(o, t, r))
          }
          ;((o = { type: `stylesheet`, instance: o, count: 1, state: s }), i.set(a, o))
        }
      }
    }
    function Df(e, t) {
      _f.X(e, t)
      var n = bf
      if (n && e) {
        var r = xt(n).hoistableScripts,
          i = Pf(e),
          a = r.get(i)
        a ||
          ((a = n.querySelector(Ff(i))),
          a ||
            ((e = h({ src: e, async: !0 }, t)),
            (t = mf.get(i)) && zf(e, t),
            (a = n.createElement(`script`)),
            St(a),
            Pd(a, `link`, e),
            n.head.appendChild(a)),
          (a = { type: `script`, instance: a, count: 1, state: null }),
          r.set(i, a))
      }
    }
    function Of(e, t) {
      _f.M(e, t)
      var n = bf
      if (n && e) {
        var r = xt(n).hoistableScripts,
          i = Pf(e),
          a = r.get(i)
        a ||
          ((a = n.querySelector(Ff(i))),
          a ||
            ((e = h({ src: e, async: !0, type: `module` }, t)),
            (t = mf.get(i)) && zf(e, t),
            (a = n.createElement(`script`)),
            St(a),
            Pd(a, `link`, e),
            n.head.appendChild(a)),
          (a = { type: `script`, instance: a, count: 1, state: null }),
          r.set(i, a))
      }
    }
    function kf(e, t, n, r) {
      var i = (i = ue.current) ? gf(i) : null
      if (!i) throw Error(o(446))
      switch (e) {
        case `meta`:
        case `title`:
          return null
        case `style`:
          return typeof n.precedence == `string` && typeof n.href == `string`
            ? ((t = Af(n.href)),
              (n = xt(i).hoistableStyles),
              (r = n.get(t)),
              r || ((r = { type: `style`, instance: null, count: 0, state: null }), n.set(t, r)),
              r)
            : { type: `void`, instance: null, count: 0, state: null }
        case `link`:
          if (
            n.rel === `stylesheet` &&
            typeof n.href == `string` &&
            typeof n.precedence == `string`
          ) {
            e = Af(n.href)
            var a = xt(i).hoistableStyles,
              s = a.get(e)
            if (
              (s ||
                ((i = i.ownerDocument || i),
                (s = {
                  type: `stylesheet`,
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                a.set(e, s),
                (a = i.querySelector(jf(e))) && !a._p && ((s.instance = a), (s.state.loading = 5)),
                mf.has(e) ||
                  ((n = {
                    rel: `preload`,
                    as: `style`,
                    href: n.href,
                    crossOrigin: n.crossOrigin,
                    integrity: n.integrity,
                    media: n.media,
                    hrefLang: n.hrefLang,
                    referrerPolicy: n.referrerPolicy,
                  }),
                  mf.set(e, n),
                  a || Nf(i, e, n, s.state))),
              t && r === null)
            )
              throw Error(o(528, ``))
            return s
          }
          if (t && r !== null) throw Error(o(529, ``))
          return null
        case `script`:
          return (
            (t = n.async),
            (n = n.src),
            typeof n == `string` && t && typeof t != `function` && typeof t != `symbol`
              ? ((t = Pf(n)),
                (n = xt(i).hoistableScripts),
                (r = n.get(t)),
                r || ((r = { type: `script`, instance: null, count: 0, state: null }), n.set(t, r)),
                r)
              : { type: `void`, instance: null, count: 0, state: null }
          )
        default:
          throw Error(o(444, e))
      }
    }
    function Af(e) {
      return `href="` + Vt(e) + `"`
    }
    function jf(e) {
      return `link[rel="stylesheet"][` + e + `]`
    }
    function Mf(e) {
      return h({}, e, { 'data-precedence': e.precedence, precedence: null })
    }
    function Nf(e, t, n, r) {
      e.querySelector(`link[rel="preload"][as="style"][` + t + `]`)
        ? (r.loading = 1)
        : ((t = e.createElement(`link`)),
          (r.preload = t),
          t.addEventListener(`load`, function () {
            return (r.loading |= 1)
          }),
          t.addEventListener(`error`, function () {
            return (r.loading |= 2)
          }),
          Pd(t, `link`, n),
          St(t),
          e.head.appendChild(t))
    }
    function Pf(e) {
      return `[src="` + Vt(e) + `"]`
    }
    function Ff(e) {
      return `script[async]` + e
    }
    function If(e, t, n) {
      if ((t.count++, t.instance === null))
        switch (t.type) {
          case `style`:
            var r = e.querySelector(`style[data-href~="` + Vt(n.href) + `"]`)
            if (r) return ((t.instance = r), St(r), r)
            var i = h({}, n, {
              'data-href': n.href,
              'data-precedence': n.precedence,
              href: null,
              precedence: null,
            })
            return (
              (r = (e.ownerDocument || e).createElement(`style`)),
              St(r),
              Pd(r, `style`, i),
              Lf(r, n.precedence, e),
              (t.instance = r)
            )
          case `stylesheet`:
            i = Af(n.href)
            var a = e.querySelector(jf(i))
            if (a) return ((t.state.loading |= 4), (t.instance = a), St(a), a)
            ;((r = Mf(n)),
              (i = mf.get(i)) && Rf(r, i),
              (a = (e.ownerDocument || e).createElement(`link`)),
              St(a))
            var s = a
            return (
              (s._p = new Promise(function (e, t) {
                ;((s.onload = e), (s.onerror = t))
              })),
              Pd(a, `link`, r),
              (t.state.loading |= 4),
              Lf(a, n.precedence, e),
              (t.instance = a)
            )
          case `script`:
            return (
              (a = Pf(n.src)),
              (i = e.querySelector(Ff(a)))
                ? ((t.instance = i), St(i), i)
                : ((r = n),
                  (i = mf.get(a)) && ((r = h({}, n)), zf(r, i)),
                  (e = e.ownerDocument || e),
                  (i = e.createElement(`script`)),
                  St(i),
                  Pd(i, `link`, r),
                  e.head.appendChild(i),
                  (t.instance = i))
            )
          case `void`:
            return null
          default:
            throw Error(o(443, t.type))
        }
      else
        t.type === `stylesheet` &&
          !(t.state.loading & 4) &&
          ((r = t.instance), (t.state.loading |= 4), Lf(r, n.precedence, e))
      return t.instance
    }
    function Lf(e, t, n) {
      for (
        var r = n.querySelectorAll(
            `link[rel="stylesheet"][data-precedence],style[data-precedence]`,
          ),
          i = r.length ? r[r.length - 1] : null,
          a = i,
          o = 0;
        o < r.length;
        o++
      ) {
        var s = r[o]
        if (s.dataset.precedence === t) a = s
        else if (a !== i) break
      }
      a
        ? a.parentNode.insertBefore(e, a.nextSibling)
        : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild))
    }
    function Rf(e, t) {
      ;((e.crossOrigin ??= t.crossOrigin),
        (e.referrerPolicy ??= t.referrerPolicy),
        (e.title ??= t.title))
    }
    function zf(e, t) {
      ;((e.crossOrigin ??= t.crossOrigin),
        (e.referrerPolicy ??= t.referrerPolicy),
        (e.integrity ??= t.integrity))
    }
    var Bf = null
    function Vf(e, t, n) {
      if (Bf === null) {
        var r = new Map(),
          i = (Bf = new Map())
        i.set(n, r)
      } else ((i = Bf), (r = i.get(n)), r || ((r = new Map()), i.set(n, r)))
      if (r.has(e)) return r
      for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
        var a = n[i]
        if (
          !(a[gt] || a[lt] || (e === `link` && a.getAttribute(`rel`) === `stylesheet`)) &&
          a.namespaceURI !== `http://www.w3.org/2000/svg`
        ) {
          var o = a.getAttribute(t) || ``
          o = e + o
          var s = r.get(o)
          s ? s.push(a) : r.set(o, [a])
        }
      }
      return r
    }
    function Hf(e, t, n) {
      ;((e = e.ownerDocument || e),
        e.head.insertBefore(n, t === `title` ? e.querySelector(`head > title`) : null))
    }
    function Uf(e, t, n) {
      if (n === 1 || t.itemProp != null) return !1
      switch (e) {
        case `meta`:
        case `title`:
          return !0
        case `style`:
          if (typeof t.precedence != `string` || typeof t.href != `string` || t.href === ``) break
          return !0
        case `link`:
          if (
            typeof t.rel != `string` ||
            typeof t.href != `string` ||
            t.href === `` ||
            t.onLoad ||
            t.onError
          )
            break
          switch (t.rel) {
            case `stylesheet`:
              return ((e = t.disabled), typeof t.precedence == `string` && e == null)
            default:
              return !0
          }
        case `script`:
          if (
            t.async &&
            typeof t.async != `function` &&
            typeof t.async != `symbol` &&
            !t.onLoad &&
            !t.onError &&
            t.src &&
            typeof t.src == `string`
          )
            return !0
      }
      return !1
    }
    function Wf(e) {
      return !(e.type === `stylesheet` && !(e.state.loading & 3))
    }
    function Gf(e, t, n, r) {
      if (
        n.type === `stylesheet` &&
        (typeof r.media != `string` || !1 !== matchMedia(r.media).matches) &&
        !(n.state.loading & 4)
      ) {
        if (n.instance === null) {
          var i = Af(r.href),
            a = t.querySelector(jf(i))
          if (a) {
            ;((t = a._p),
              typeof t == `object` &&
                t &&
                typeof t.then == `function` &&
                (e.count++, (e = Jf.bind(e)), t.then(e, e)),
              (n.state.loading |= 4),
              (n.instance = a),
              St(a))
            return
          }
          ;((a = t.ownerDocument || t),
            (r = Mf(r)),
            (i = mf.get(i)) && Rf(r, i),
            (a = a.createElement(`link`)),
            St(a))
          var o = a
          ;((o._p = new Promise(function (e, t) {
            ;((o.onload = e), (o.onerror = t))
          })),
            Pd(a, `link`, r),
            (n.instance = a))
        }
        ;(e.stylesheets === null && (e.stylesheets = new Map()),
          e.stylesheets.set(n, t),
          (t = n.state.preload) &&
            !(n.state.loading & 3) &&
            (e.count++,
            (n = Jf.bind(e)),
            t.addEventListener(`load`, n),
            t.addEventListener(`error`, n)))
      }
    }
    var Kf = 0
    function qf(e, t) {
      return (
        e.stylesheets && e.count === 0 && Xf(e, e.stylesheets),
        0 < e.count || 0 < e.imgCount
          ? function (n) {
              var r = setTimeout(function () {
                if ((e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
                  var t = e.unsuspend
                  ;((e.unsuspend = null), t())
                }
              }, 6e4 + t)
              0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld())
              var i = setTimeout(
                function () {
                  if (
                    ((e.waitingForImages = !1),
                    e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend))
                  ) {
                    var t = e.unsuspend
                    ;((e.unsuspend = null), t())
                  }
                },
                (e.imgBytes > Kf ? 50 : 800) + t,
              )
              return (
                (e.unsuspend = n),
                function () {
                  ;((e.unsuspend = null), clearTimeout(r), clearTimeout(i))
                }
              )
            }
          : null
      )
    }
    function Jf() {
      if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
        if (this.stylesheets) Xf(this, this.stylesheets)
        else if (this.unsuspend) {
          var e = this.unsuspend
          ;((this.unsuspend = null), e())
        }
      }
    }
    var Yf = null
    function Xf(e, t) {
      ;((e.stylesheets = null),
        e.unsuspend !== null &&
          (e.count++, (Yf = new Map()), t.forEach(Zf, e), (Yf = null), Jf.call(e)))
    }
    function Zf(e, t) {
      if (!(t.state.loading & 4)) {
        var n = Yf.get(e)
        if (n) var r = n.get(null)
        else {
          ;((n = new Map()), Yf.set(e, n))
          for (
            var i = e.querySelectorAll(`link[data-precedence],style[data-precedence]`), a = 0;
            a < i.length;
            a++
          ) {
            var o = i[a]
            ;(o.nodeName === `LINK` || o.getAttribute(`media`) !== `not all`) &&
              (n.set(o.dataset.precedence, o), (r = o))
          }
          r && n.set(null, r)
        }
        ;((i = t.instance),
          (o = i.getAttribute(`data-precedence`)),
          (a = n.get(o) || r),
          a === r && n.set(null, i),
          n.set(o, i),
          this.count++,
          (r = Jf.bind(this)),
          i.addEventListener(`load`, r),
          i.addEventListener(`error`, r),
          a
            ? a.parentNode.insertBefore(i, a.nextSibling)
            : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(i, e.firstChild)),
          (t.state.loading |= 4))
      }
    }
    var Qf = {
      $$typeof: C,
      Provider: null,
      Consumer: null,
      _currentValue: re,
      _currentValue2: re,
      _threadCount: 0,
    }
    function $f(e, t, n, r, i, a, o, s, c) {
      ;((this.tag = 1),
        (this.containerInfo = e),
        (this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode =
          this.next =
          this.pendingContext =
          this.context =
          this.cancelPendingCommit =
            null),
        (this.callbackPriority = 0),
        (this.expirationTimes = Qe(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = Qe(0)),
        (this.hiddenUpdates = Qe(null)),
        (this.identifierPrefix = r),
        (this.onUncaughtError = i),
        (this.onCaughtError = a),
        (this.onRecoverableError = o),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = c),
        (this.incompleteTransitions = new Map()))
    }
    function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
      return (
        (e = new $f(e, t, n, o, c, l, u, d, s)),
        (t = 1),
        !0 === a && (t |= 24),
        (a = si(3, null, null, t)),
        (e.current = a),
        (a.stateNode = e),
        (t = oa()),
        t.refCount++,
        (e.pooledCache = t),
        t.refCount++,
        (a.memoizedState = { element: r, isDehydrated: n, cache: t }),
        za(a),
        e
      )
    }
    function tp(e) {
      return e ? ((e = ai), e) : ai
    }
    function np(e, t, n, r, i, a) {
      ;((i = tp(i)),
        r.context === null ? (r.context = i) : (r.pendingContext = i),
        (r = Va(t)),
        (r.payload = { element: n }),
        (a = a === void 0 ? null : a),
        a !== null && (r.callback = a),
        (n = Ha(e, r, t)),
        n !== null && (hu(n, e, t), Ua(n, e, t)))
    }
    function rp(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane
        e.retryLane = n !== 0 && n < t ? n : t
      }
    }
    function ip(e, t) {
      ;(rp(e, t), (e = e.alternate) && rp(e, t))
    }
    function ap(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = ni(e, 67108864)
        ;(t !== null && hu(t, e, 67108864), ip(e, 67108864))
      }
    }
    function op(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = pu()
        t = it(t)
        var n = ni(e, t)
        ;(n !== null && hu(n, e, t), ip(e, t))
      }
    }
    var sp = !0
    function cp(e, t, n, r) {
      var i = N.T
      N.T = null
      var a = P.p
      try {
        ;((P.p = 2), up(e, t, n, r))
      } finally {
        ;((P.p = a), (N.T = i))
      }
    }
    function lp(e, t, n, r) {
      var i = N.T
      N.T = null
      var a = P.p
      try {
        ;((P.p = 8), up(e, t, n, r))
      } finally {
        ;((P.p = a), (N.T = i))
      }
    }
    function up(e, t, n, r) {
      if (sp) {
        var i = dp(r)
        if (i === null) (wd(e, t, r, fp, n), Cp(e, r))
        else if (Tp(i, e, t, n, r)) r.stopPropagation()
        else if ((Cp(e, r), t & 4 && -1 < Sp.indexOf(e))) {
          for (; i !== null; ) {
            var a = yt(i)
            if (a !== null)
              switch (a.tag) {
                case 3:
                  if (((a = a.stateNode), a.current.memoizedState.isDehydrated)) {
                    var o = qe(a.pendingLanes)
                    if (o !== 0) {
                      var s = a
                      for (s.pendingLanes |= 2, s.entangledLanes |= 2; o; ) {
                        var c = 1 << (31 - Be(o))
                        ;((s.entanglements[1] |= c), (o &= ~c))
                      }
                      ;(rd(a), !(K & 6) && ((tu = Oe() + 500), id(0, !1)))
                    }
                  }
                  break
                case 31:
                case 13:
                  ;((s = ni(a, 2)), s !== null && hu(s, a, 2), bu(), ip(a, 2))
              }
            if (((a = dp(r)), a === null && wd(e, t, r, fp, n), a === i)) break
            i = a
          }
          i !== null && r.stopPropagation()
        } else wd(e, t, r, null, n)
      }
    }
    function dp(e) {
      return ((e = an(e)), pp(e))
    }
    var fp = null
    function pp(e) {
      if (((fp = null), (e = vt(e)), e !== null)) {
        var t = l(e)
        if (t === null) e = null
        else {
          var n = t.tag
          if (n === 13) {
            if (((e = u(t)), e !== null)) return e
            e = null
          } else if (n === 31) {
            if (((e = d(t)), e !== null)) return e
            e = null
          } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null
            e = null
          } else t !== e && (e = null)
        }
      }
      return ((fp = e), null)
    }
    function mp(e) {
      switch (e) {
        case `beforetoggle`:
        case `cancel`:
        case `click`:
        case `close`:
        case `contextmenu`:
        case `copy`:
        case `cut`:
        case `auxclick`:
        case `dblclick`:
        case `dragend`:
        case `dragstart`:
        case `drop`:
        case `focusin`:
        case `focusout`:
        case `input`:
        case `invalid`:
        case `keydown`:
        case `keypress`:
        case `keyup`:
        case `mousedown`:
        case `mouseup`:
        case `paste`:
        case `pause`:
        case `play`:
        case `pointercancel`:
        case `pointerdown`:
        case `pointerup`:
        case `ratechange`:
        case `reset`:
        case `resize`:
        case `seeked`:
        case `submit`:
        case `toggle`:
        case `touchcancel`:
        case `touchend`:
        case `touchstart`:
        case `volumechange`:
        case `change`:
        case `selectionchange`:
        case `textInput`:
        case `compositionstart`:
        case `compositionend`:
        case `compositionupdate`:
        case `beforeblur`:
        case `afterblur`:
        case `beforeinput`:
        case `blur`:
        case `fullscreenchange`:
        case `focus`:
        case `hashchange`:
        case `popstate`:
        case `select`:
        case `selectstart`:
          return 2
        case `drag`:
        case `dragenter`:
        case `dragexit`:
        case `dragleave`:
        case `dragover`:
        case `mousemove`:
        case `mouseout`:
        case `mouseover`:
        case `pointermove`:
        case `pointerout`:
        case `pointerover`:
        case `scroll`:
        case `touchmove`:
        case `wheel`:
        case `mouseenter`:
        case `mouseleave`:
        case `pointerenter`:
        case `pointerleave`:
          return 8
        case `message`:
          switch (ke()) {
            case Ae:
              return 2
            case je:
              return 8
            case Me:
            case Ne:
              return 32
            case Pe:
              return 268435456
            default:
              return 32
          }
        default:
          return 32
      }
    }
    var hp = !1,
      gp = null,
      _p = null,
      vp = null,
      yp = new Map(),
      bp = new Map(),
      xp = [],
      Sp =
        `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(
          ` `,
        )
    function Cp(e, t) {
      switch (e) {
        case `focusin`:
        case `focusout`:
          gp = null
          break
        case `dragenter`:
        case `dragleave`:
          _p = null
          break
        case `mouseover`:
        case `mouseout`:
          vp = null
          break
        case `pointerover`:
        case `pointerout`:
          yp.delete(t.pointerId)
          break
        case `gotpointercapture`:
        case `lostpointercapture`:
          bp.delete(t.pointerId)
      }
    }
    function wp(e, t, n, r, i, a) {
      return e === null || e.nativeEvent !== a
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: a,
            targetContainers: [i],
          }),
          t !== null && ((t = yt(t)), t !== null && ap(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e)
    }
    function Tp(e, t, n, r, i) {
      switch (t) {
        case `focusin`:
          return ((gp = wp(gp, e, t, n, r, i)), !0)
        case `dragenter`:
          return ((_p = wp(_p, e, t, n, r, i)), !0)
        case `mouseover`:
          return ((vp = wp(vp, e, t, n, r, i)), !0)
        case `pointerover`:
          var a = i.pointerId
          return (yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0)
        case `gotpointercapture`:
          return ((a = i.pointerId), bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0)
      }
      return !1
    }
    function Ep(e) {
      var t = vt(e.target)
      if (t !== null) {
        var n = l(t)
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = u(n)), t !== null)) {
              ;((e.blockedOn = t),
                st(e.priority, function () {
                  op(n)
                }))
              return
            }
          } else if (t === 31) {
            if (((t = d(n)), t !== null)) {
              ;((e.blockedOn = t),
                st(e.priority, function () {
                  op(n)
                }))
              return
            }
          } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null
            return
          }
        }
      }
      e.blockedOn = null
    }
    function Dp(e) {
      if (e.blockedOn !== null) return !1
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = dp(e.nativeEvent)
        if (n === null) {
          n = e.nativeEvent
          var r = new n.constructor(n.type, n)
          ;((rn = r), n.target.dispatchEvent(r), (rn = null))
        } else return ((t = yt(n)), t !== null && ap(t), (e.blockedOn = n), !1)
        t.shift()
      }
      return !0
    }
    function Op(e, t, n) {
      Dp(e) && n.delete(t)
    }
    function kp() {
      ;((hp = !1),
        gp !== null && Dp(gp) && (gp = null),
        _p !== null && Dp(_p) && (_p = null),
        vp !== null && Dp(vp) && (vp = null),
        yp.forEach(Op),
        bp.forEach(Op))
    }
    function Ap(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        hp || ((hp = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, kp)))
    }
    var jp = null
    function Mp(e) {
      jp !== e &&
        ((jp = e),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
          jp === e && (jp = null)
          for (var t = 0; t < e.length; t += 3) {
            var n = e[t],
              r = e[t + 1],
              i = e[t + 2]
            if (typeof r != `function`) {
              if (pp(r || n) === null) continue
              break
            }
            var a = yt(n)
            a !== null &&
              (e.splice(t, 3),
              (t -= 3),
              Ss(a, { pending: !0, data: i, method: n.method, action: r }, r, i))
          }
        }))
    }
    function Np(e) {
      function t(t) {
        return Ap(t, e)
      }
      ;(gp !== null && Ap(gp, e),
        _p !== null && Ap(_p, e),
        vp !== null && Ap(vp, e),
        yp.forEach(t),
        bp.forEach(t))
      for (var n = 0; n < xp.length; n++) {
        var r = xp[n]
        r.blockedOn === e && (r.blockedOn = null)
      }
      for (; 0 < xp.length && ((n = xp[0]), n.blockedOn === null); )
        (Ep(n), n.blockedOn === null && xp.shift())
      if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
        for (r = 0; r < n.length; r += 3) {
          var i = n[r],
            a = n[r + 1],
            o = i[ut] || null
          if (typeof a == `function`) o || Mp(n)
          else if (o) {
            var s = null
            if (a && a.hasAttribute(`formAction`)) {
              if (((i = a), (o = a[ut] || null))) s = o.formAction
              else if (pp(i) !== null) continue
            } else s = o.action
            ;(typeof s == `function` ? (n[r + 1] = s) : (n.splice(r, 3), (r -= 3)), Mp(n))
          }
        }
    }
    function Pp() {
      function e(e) {
        e.canIntercept &&
          e.info === `react-transition` &&
          e.intercept({
            handler: function () {
              return new Promise(function (e) {
                return (i = e)
              })
            },
            focusReset: `manual`,
            scroll: `manual`,
          })
      }
      function t() {
        ;(i !== null && (i(), (i = null)), r || setTimeout(n, 20))
      }
      function n() {
        if (!r && !navigation.transition) {
          var e = navigation.currentEntry
          e &&
            e.url != null &&
            navigation.navigate(e.url, {
              state: e.getState(),
              info: `react-transition`,
              history: `replace`,
            })
        }
      }
      if (typeof navigation == `object`) {
        var r = !1,
          i = null
        return (
          navigation.addEventListener(`navigate`, e),
          navigation.addEventListener(`navigatesuccess`, t),
          navigation.addEventListener(`navigateerror`, t),
          setTimeout(n, 100),
          function () {
            ;((r = !0),
              navigation.removeEventListener(`navigate`, e),
              navigation.removeEventListener(`navigatesuccess`, t),
              navigation.removeEventListener(`navigateerror`, t),
              i !== null && (i(), (i = null)))
          }
        )
      }
    }
    function Fp(e) {
      this._internalRoot = e
    }
    ;((Ip.prototype.render = Fp.prototype.render =
      function (e) {
        var t = this._internalRoot
        if (t === null) throw Error(o(409))
        var n = t.current
        np(n, pu(), e, t, null, null)
      }),
      (Ip.prototype.unmount = Fp.prototype.unmount =
        function () {
          var e = this._internalRoot
          if (e !== null) {
            this._internalRoot = null
            var t = e.containerInfo
            ;(np(e.current, 2, null, e, null, null), bu(), (t[dt] = null))
          }
        }))
    function Ip(e) {
      this._internalRoot = e
    }
    Ip.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = ot()
        e = { blockedOn: null, target: e, priority: t }
        for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
        ;(xp.splice(n, 0, e), n === 0 && Ep(e))
      }
    }
    var Lp = r.version
    if (Lp !== `19.2.5`) throw Error(o(527, Lp, `19.2.5`))
    P.findDOMNode = function (e) {
      var t = e._reactInternals
      if (t === void 0)
        throw typeof e.render == `function`
          ? Error(o(188))
          : ((e = Object.keys(e).join(`,`)), Error(o(268, e)))
      return ((e = p(t)), (e = e === null ? null : m(e)), (e = e === null ? null : e.stateNode), e)
    }
    var Rp = {
      bundleType: 0,
      version: `19.2.5`,
      rendererPackageName: `react-dom`,
      currentDispatcherRef: N,
      reconcilerVersion: `19.2.5`,
    }
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
      var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__
      if (!zp.isDisabled && zp.supportsFiber)
        try {
          ;((Le = zp.inject(Rp)), (Re = zp))
        } catch {}
    }
    e.createRoot = function (e, t) {
      if (!c(e)) throw Error(o(299))
      var n = !1,
        r = ``,
        i = Gs,
        a = Ks,
        s = qs
      return (
        t != null &&
          (!0 === t.unstable_strictMode && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
          t.onCaughtError !== void 0 && (a = t.onCaughtError),
          t.onRecoverableError !== void 0 && (s = t.onRecoverableError)),
        (t = ep(e, 1, !1, null, null, n, r, null, i, a, s, Pp)),
        (e[dt] = t.current),
        Sd(e),
        new Fp(t)
      )
    }
  }),
  l = n((e, t) => {
    function n() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)
        } catch (e) {
          console.error(e)
        }
    }
    ;(n(), (t.exports = c()))
  }),
  u = e(t(), 1),
  d = e(s(), 1),
  f = l(),
  p = `modulepreload`,
  m = function (e) {
    return `/` + e
  },
  h = {},
  g = function (e, t, n) {
    let r = Promise.resolve()
    if (t && t.length > 0) {
      let e = document.getElementsByTagName(`link`),
        i = document.querySelector(`meta[property=csp-nonce]`),
        a = i?.nonce || i?.getAttribute(`nonce`)
      function o(e) {
        return Promise.all(
          e.map((e) =>
            Promise.resolve(e).then(
              (e) => ({ status: `fulfilled`, value: e }),
              (e) => ({ status: `rejected`, reason: e }),
            ),
          ),
        )
      }
      r = o(
        t.map((t) => {
          if (((t = m(t, n)), t in h)) return
          h[t] = !0
          let r = t.endsWith(`.css`),
            i = r ? `[rel="stylesheet"]` : ``
          if (n)
            for (let n = e.length - 1; n >= 0; n--) {
              let i = e[n]
              if (i.href === t && (!r || i.rel === `stylesheet`)) return
            }
          else if (document.querySelector(`link[href="${t}"]${i}`)) return
          let o = document.createElement(`link`)
          if (
            ((o.rel = r ? `stylesheet` : p),
            r || (o.as = `script`),
            (o.crossOrigin = ``),
            (o.href = t),
            a && o.setAttribute(`nonce`, a),
            document.head.appendChild(o),
            r)
          )
            return new Promise((e, n) => {
              ;(o.addEventListener(`load`, e),
                o.addEventListener(`error`, () => n(Error(`Unable to preload CSS for ${t}`))))
            })
        }),
      )
    }
    function i(e) {
      let t = new Event(`vite:preloadError`, { cancelable: !0 })
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented)) throw e
    }
    return r.then((t) => {
      for (let e of t || []) e.status === `rejected` && i(e.reason)
      return e().catch(i)
    })
  },
  _ = `popstate`
function v(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `pathname` in e &&
    `search` in e &&
    `hash` in e &&
    `state` in e &&
    `key` in e
  )
}
function y(e = {}) {
  function t(e, t) {
    let n = t.state?.masked,
      { pathname: r, search: i, hash: a } = n || e.location
    return w(
      ``,
      { pathname: r, search: i, hash: a },
      (t.state && t.state.usr) || null,
      (t.state && t.state.key) || `default`,
      n
        ? { pathname: e.location.pathname, search: e.location.search, hash: e.location.hash }
        : void 0,
    )
  }
  function n(e, t) {
    return typeof t == `string` ? t : T(t)
  }
  return D(t, n, null, e)
}
function b(e, t) {
  if (e === !1 || e == null) throw Error(t)
}
function x(e, t) {
  if (!e) {
    typeof console < `u` && console.warn(t)
    try {
      throw Error(t)
    } catch {}
  }
}
function S() {
  return Math.random().toString(36).substring(2, 10)
}
function C(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
    masked: e.unstable_mask ? { pathname: e.pathname, search: e.search, hash: e.hash } : void 0,
  }
}
function w(e, t, n = null, r, i) {
  return {
    pathname: typeof e == `string` ? e : e.pathname,
    search: ``,
    hash: ``,
    ...(typeof t == `string` ? E(t) : t),
    state: n,
    key: (t && t.key) || r || S(),
    unstable_mask: i,
  }
}
function T({ pathname: e = `/`, search: t = ``, hash: n = `` }) {
  return (
    t && t !== `?` && (e += t.charAt(0) === `?` ? t : `?` + t),
    n && n !== `#` && (e += n.charAt(0) === `#` ? n : `#` + n),
    e
  )
}
function E(e) {
  let t = {}
  if (e) {
    let n = e.indexOf(`#`)
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)))
    let r = e.indexOf(`?`)
    ;(r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))), e && (t.pathname = e))
  }
  return t
}
function D(e, t, n, r = {}) {
  let { window: i = document.defaultView, v5Compat: a = !1 } = r,
    o = i.history,
    s = `POP`,
    c = null,
    l = u()
  l ?? ((l = 0), o.replaceState({ ...o.state, idx: l }, ``))
  function u() {
    return (o.state || { idx: null }).idx
  }
  function d() {
    s = `POP`
    let e = u(),
      t = e == null ? null : e - l
    ;((l = e), c && c({ action: s, location: h.location, delta: t }))
  }
  function f(e, t) {
    s = `PUSH`
    let r = v(e) ? e : w(h.location, e, t)
    ;(n && n(r, e), (l = u() + 1))
    let d = C(r, l),
      f = h.createHref(r.unstable_mask || r)
    try {
      o.pushState(d, ``, f)
    } catch (e) {
      if (e instanceof DOMException && e.name === `DataCloneError`) throw e
      i.location.assign(f)
    }
    a && c && c({ action: s, location: h.location, delta: 1 })
  }
  function p(e, t) {
    s = `REPLACE`
    let r = v(e) ? e : w(h.location, e, t)
    ;(n && n(r, e), (l = u()))
    let i = C(r, l),
      d = h.createHref(r.unstable_mask || r)
    ;(o.replaceState(i, ``, d), a && c && c({ action: s, location: h.location, delta: 0 }))
  }
  function m(e) {
    return O(e)
  }
  let h = {
    get action() {
      return s
    },
    get location() {
      return e(i, o)
    },
    listen(e) {
      if (c) throw Error(`A history only accepts one active listener`)
      return (
        i.addEventListener(_, d),
        (c = e),
        () => {
          ;(i.removeEventListener(_, d), (c = null))
        }
      )
    },
    createHref(e) {
      return t(i, e)
    },
    createURL: m,
    encodeLocation(e) {
      let t = m(e)
      return { pathname: t.pathname, search: t.search, hash: t.hash }
    },
    push: f,
    replace: p,
    go(e) {
      return o.go(e)
    },
  }
  return h
}
function O(e, t = !1) {
  let n = `http://localhost`
  ;(typeof window < `u` &&
    (n = window.location.origin === `null` ? window.location.href : window.location.origin),
    b(n, `No window.location.(origin|href) available to create URL`))
  let r = typeof e == `string` ? e : T(e)
  return ((r = r.replace(/ $/, `%20`)), !t && r.startsWith(`//`) && (r = n + r), new URL(r, n))
}
function k(e, t, n = `/`) {
  return A(e, t, n, !1)
}
function A(e, t, n, r) {
  let i = fe((typeof t == `string` ? E(t) : t).pathname || `/`, n)
  if (i == null) return null
  let a = ee(e)
  ne(a)
  let o = null
  for (let e = 0; o == null && e < a.length; ++e) {
    let t = de(i)
    o = ce(a[e], t, r)
  }
  return o
}
function j(e, t) {
  let { route: n, pathname: r, params: i } = e
  return { id: n.id, pathname: r, params: i, data: t[n.id], loaderData: t[n.id], handle: n.handle }
}
function ee(e, t = [], n = [], r = ``, i = !1) {
  let a = (e, a, o = i, s) => {
    let c = {
      relativePath: s === void 0 ? e.path || `` : s,
      caseSensitive: e.caseSensitive === !0,
      childrenIndex: a,
      route: e,
    }
    if (c.relativePath.startsWith(`/`)) {
      if (!c.relativePath.startsWith(r) && o) return
      ;(b(
        c.relativePath.startsWith(r),
        `Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (c.relativePath = c.relativePath.slice(r.length)))
    }
    let l = xe([r, c.relativePath]),
      u = n.concat(c)
    ;(e.children &&
      e.children.length > 0 &&
      (b(
        e.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${l}".`,
      ),
      ee(e.children, t, u, l, o)),
      !(e.path == null && !e.index) && t.push({ path: l, score: se(l, e.index), routesMeta: u }))
  }
  return (
    e.forEach((e, t) => {
      if (e.path === `` || !e.path?.includes(`?`)) a(e, t)
      else for (let n of te(e.path)) a(e, t, !0, n)
    }),
    t
  )
}
function te(e) {
  let t = e.split(`/`)
  if (t.length === 0) return []
  let [n, ...r] = t,
    i = n.endsWith(`?`),
    a = n.replace(/\?$/, ``)
  if (r.length === 0) return i ? [a, ``] : [a]
  let o = te(r.join(`/`)),
    s = []
  return (
    s.push(...o.map((e) => (e === `` ? a : [a, e].join(`/`)))),
    i && s.push(...o),
    s.map((t) => (e.startsWith(`/`) && t === `` ? `/` : t))
  )
}
function ne(e) {
  e.sort((e, t) =>
    e.score === t.score
      ? F(
          e.routesMeta.map((e) => e.childrenIndex),
          t.routesMeta.map((e) => e.childrenIndex),
        )
      : t.score - e.score,
  )
}
var M = /^:[\w-]+$/,
  N = 3,
  P = 2,
  re = 1,
  ie = 10,
  ae = -2,
  oe = (e) => e === `*`
function se(e, t) {
  let n = e.split(`/`),
    r = n.length
  return (
    n.some(oe) && (r += ae),
    t && (r += P),
    n.filter((e) => !oe(e)).reduce((e, t) => e + (M.test(t) ? N : t === `` ? re : ie), r)
  )
}
function F(e, t) {
  return e.length === t.length && e.slice(0, -1).every((e, n) => e === t[n])
    ? e[e.length - 1] - t[t.length - 1]
    : 0
}
function ce(e, t, n = !1) {
  let { routesMeta: r } = e,
    i = {},
    a = `/`,
    o = []
  for (let e = 0; e < r.length; ++e) {
    let s = r[e],
      c = e === r.length - 1,
      l = a === `/` ? t : t.slice(a.length) || `/`,
      u = le({ path: s.relativePath, caseSensitive: s.caseSensitive, end: c }, l),
      d = s.route
    if (
      (!u &&
        c &&
        n &&
        !r[r.length - 1].route.index &&
        (u = le({ path: s.relativePath, caseSensitive: s.caseSensitive, end: !1 }, l)),
      !u)
    )
      return null
    ;(Object.assign(i, u.params),
      o.push({
        params: i,
        pathname: xe([a, u.pathname]),
        pathnameBase: Ce(xe([a, u.pathnameBase])),
        route: d,
      }),
      u.pathnameBase !== `/` && (a = xe([a, u.pathnameBase])))
  }
  return o
}
function le(e, t) {
  typeof e == `string` && (e = { path: e, caseSensitive: !1, end: !0 })
  let [n, r] = ue(e.path, e.caseSensitive, e.end),
    i = t.match(n)
  if (!i) return null
  let a = i[0],
    o = a.replace(/(.)\/+$/, `$1`),
    s = i.slice(1)
  return {
    params: r.reduce((e, { paramName: t, isOptional: n }, r) => {
      if (t === `*`) {
        let e = s[r] || ``
        o = a.slice(0, a.length - e.length).replace(/(.)\/+$/, `$1`)
      }
      let i = s[r]
      return (n && !i ? (e[t] = void 0) : (e[t] = (i || ``).replace(/%2F/g, `/`)), e)
    }, {}),
    pathname: a,
    pathnameBase: o,
    pattern: e,
  }
}
function ue(e, t = !1, n = !0) {
  x(
    e === `*` || !e.endsWith(`*`) || e.endsWith(`/*`),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, `/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, `/*`)}".`,
  )
  let r = [],
    i =
      `^` +
      e
        .replace(/\/*\*?$/, ``)
        .replace(/^\/*/, `/`)
        .replace(/[\\.*+^${}|()[\]]/g, `\\$&`)
        .replace(/\/:([\w-]+)(\?)?/g, (e, t, n, i, a) => {
          if ((r.push({ paramName: t, isOptional: n != null }), n)) {
            let t = a.charAt(i + e.length)
            return t && t !== `/` ? `/([^\\/]*)` : `(?:/([^\\/]*))?`
          }
          return `/([^\\/]+)`
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, `(/$1)?$2`)
  return (
    e.endsWith(`*`)
      ? (r.push({ paramName: `*` }), (i += e === `*` || e === `/*` ? `(.*)$` : `(?:\\/(.+)|\\/*)$`))
      : n
        ? (i += `\\/*$`)
        : e !== `` && e !== `/` && (i += `(?:(?=\\/|$))`),
    [new RegExp(i, t ? void 0 : `i`), r]
  )
}
function de(e) {
  try {
    return e
      .split(`/`)
      .map((e) => decodeURIComponent(e).replace(/\//g, `%2F`))
      .join(`/`)
  } catch (t) {
    return (
      x(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    )
  }
}
function fe(e, t) {
  if (t === `/`) return e
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null
  let n = t.endsWith(`/`) ? t.length - 1 : t.length,
    r = e.charAt(n)
  return r && r !== `/` ? null : e.slice(n) || `/`
}
var pe = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
function me(e, t = `/`) {
  let { pathname: n, search: r = ``, hash: i = `` } = typeof e == `string` ? E(e) : e,
    a
  return (
    n ? ((n = be(n)), (a = n.startsWith(`/`) ? he(n.substring(1), `/`) : he(n, t))) : (a = t),
    { pathname: a, search: we(r), hash: Te(i) }
  )
}
function he(e, t) {
  let n = Se(t).split(`/`)
  return (
    e.split(`/`).forEach((e) => {
      e === `..` ? n.length > 1 && n.pop() : e !== `.` && n.push(e)
    }),
    n.length > 1 ? n.join(`/`) : `/`
  )
}
function ge(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}
function _e(e) {
  return e.filter((e, t) => t === 0 || (e.route.path && e.route.path.length > 0))
}
function ve(e) {
  let t = _e(e)
  return t.map((e, n) => (n === t.length - 1 ? e.pathname : e.pathnameBase))
}
function ye(e, t, n, r = !1) {
  let i
  typeof e == `string`
    ? (i = E(e))
    : ((i = { ...e }),
      b(!i.pathname || !i.pathname.includes(`?`), ge(`?`, `pathname`, `search`, i)),
      b(!i.pathname || !i.pathname.includes(`#`), ge(`#`, `pathname`, `hash`, i)),
      b(!i.search || !i.search.includes(`#`), ge(`#`, `search`, `hash`, i)))
  let a = e === `` || i.pathname === ``,
    o = a ? `/` : i.pathname,
    s
  if (o == null) s = n
  else {
    let e = t.length - 1
    if (!r && o.startsWith(`..`)) {
      let t = o.split(`/`)
      for (; t[0] === `..`; ) (t.shift(), --e)
      i.pathname = t.join(`/`)
    }
    s = e >= 0 ? t[e] : `/`
  }
  let c = me(i, s),
    l = o && o !== `/` && o.endsWith(`/`),
    u = (a || o === `.`) && n.endsWith(`/`)
  return (!c.pathname.endsWith(`/`) && (l || u) && (c.pathname += `/`), c)
}
var be = (e) => e.replace(/\/\/+/g, `/`),
  xe = (e) => be(e.join(`/`)),
  Se = (e) => e.replace(/\/+$/, ``),
  Ce = (e) => Se(e).replace(/^\/*/, `/`),
  we = (e) => (!e || e === `?` ? `` : e.startsWith(`?`) ? e : `?` + e),
  Te = (e) => (!e || e === `#` ? `` : e.startsWith(`#`) ? e : `#` + e),
  Ee = class {
    constructor(e, t, n, r = !1) {
      ;((this.status = e),
        (this.statusText = t || ``),
        (this.internal = r),
        n instanceof Error ? ((this.data = n.toString()), (this.error = n)) : (this.data = n))
    }
  }
function De(e) {
  return (
    e != null &&
    typeof e.status == `number` &&
    typeof e.statusText == `string` &&
    typeof e.internal == `boolean` &&
    `data` in e
  )
}
function Oe(e) {
  return xe(e.map((e) => e.route.path).filter(Boolean)) || `/`
}
var ke =
  typeof window < `u` && window.document !== void 0 && window.document.createElement !== void 0
function Ae(e, t) {
  let n = e
  if (typeof n != `string` || !pe.test(n)) return { absoluteURL: void 0, isExternal: !1, to: n }
  let r = n,
    i = !1
  if (ke)
    try {
      let e = new URL(window.location.href),
        r = n.startsWith(`//`) ? new URL(e.protocol + n) : new URL(n),
        a = fe(r.pathname, t)
      r.origin === e.origin && a != null ? (n = a + r.search + r.hash) : (i = !0)
    } catch {
      x(
        !1,
        `<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      )
    }
  return { absoluteURL: r, isExternal: i, to: n }
}
Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`)
var je = [`POST`, `PUT`, `PATCH`, `DELETE`]
new Set(je)
var Me = [`GET`, ...je]
new Set(Me)
var Ne = u.createContext(null)
Ne.displayName = `DataRouter`
var Pe = u.createContext(null)
Pe.displayName = `DataRouterState`
var Fe = u.createContext(!1)
function Ie() {
  return u.useContext(Fe)
}
var Le = u.createContext({ isTransitioning: !1 })
Le.displayName = `ViewTransition`
var Re = u.createContext(new Map())
Re.displayName = `Fetchers`
var ze = u.createContext(null)
ze.displayName = `Await`
var Be = u.createContext(null)
Be.displayName = `Navigation`
var Ve = u.createContext(null)
Ve.displayName = `Location`
var He = u.createContext({ outlet: null, matches: [], isDataRoute: !1 })
He.displayName = `Route`
var Ue = u.createContext(null)
Ue.displayName = `RouteError`
var We = `REACT_ROUTER_ERROR`,
  Ge = `REDIRECT`,
  Ke = `ROUTE_ERROR_RESPONSE`
function qe(e) {
  if (e.startsWith(`${We}:${Ge}:{`))
    try {
      let t = JSON.parse(e.slice(28))
      if (
        typeof t == `object` &&
        t &&
        typeof t.status == `number` &&
        typeof t.statusText == `string` &&
        typeof t.location == `string` &&
        typeof t.reloadDocument == `boolean` &&
        typeof t.replace == `boolean`
      )
        return t
    } catch {}
}
function Je(e) {
  if (e.startsWith(`${We}:${Ke}:{`))
    try {
      let t = JSON.parse(e.slice(40))
      if (
        typeof t == `object` &&
        t &&
        typeof t.status == `number` &&
        typeof t.statusText == `string`
      )
        return new Ee(t.status, t.statusText, t.data)
    } catch {}
}
function Ye(e, { relative: t } = {}) {
  b(Xe(), `useHref() may be used only in the context of a <Router> component.`)
  let { basename: n, navigator: r } = u.useContext(Be),
    { hash: i, pathname: a, search: o } = at(e, { relative: t }),
    s = a
  return (
    n !== `/` && (s = a === `/` ? n : xe([n, a])), r.createHref({ pathname: s, search: o, hash: i })
  )
}
function Xe() {
  return u.useContext(Ve) != null
}
function Ze() {
  return (
    b(Xe(), `useLocation() may be used only in the context of a <Router> component.`),
    u.useContext(Ve).location
  )
}
var Qe = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`
function $e(e) {
  u.useContext(Be).static || u.useLayoutEffect(e)
}
function et() {
  let { isDataRoute: e } = u.useContext(He)
  return e ? wt() : tt()
}
function tt() {
  b(Xe(), `useNavigate() may be used only in the context of a <Router> component.`)
  let e = u.useContext(Ne),
    { basename: t, navigator: n } = u.useContext(Be),
    { matches: r } = u.useContext(He),
    { pathname: i } = Ze(),
    a = JSON.stringify(ve(r)),
    o = u.useRef(!1)
  return (
    $e(() => {
      o.current = !0
    }),
    u.useCallback(
      (r, s = {}) => {
        if ((x(o.current, Qe), !o.current)) return
        if (typeof r == `number`) {
          n.go(r)
          return
        }
        let c = ye(r, JSON.parse(a), i, s.relative === `path`)
        ;(e == null && t !== `/` && (c.pathname = c.pathname === `/` ? t : xe([t, c.pathname])),
          (s.replace ? n.replace : n.push)(c, s.state, s))
      },
      [t, n, a, i, e],
    )
  )
}
var nt = u.createContext(null)
function rt(e) {
  let t = u.useContext(He).outlet
  return u.useMemo(() => t && u.createElement(nt.Provider, { value: e }, t), [t, e])
}
function it() {
  let { matches: e } = u.useContext(He)
  return e[e.length - 1]?.params ?? {}
}
function at(e, { relative: t } = {}) {
  let { matches: n } = u.useContext(He),
    { pathname: r } = Ze(),
    i = JSON.stringify(ve(n))
  return u.useMemo(() => ye(e, JSON.parse(i), r, t === `path`), [e, i, r, t])
}
function ot(e, t) {
  return st(e, t)
}
function st(e, t, n) {
  b(Xe(), `useRoutes() may be used only in the context of a <Router> component.`)
  let { navigator: r } = u.useContext(Be),
    { matches: i } = u.useContext(He),
    a = i[i.length - 1],
    o = a ? a.params : {},
    s = a ? a.pathname : `/`,
    c = a ? a.pathnameBase : `/`,
    l = a && a.route
  {
    let e = (l && l.path) || ``
    Et(
      s,
      !l || e.endsWith(`*`) || e.endsWith(`*?`),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e === `/` ? `*` : `${e}/*`}">.`,
    )
  }
  let d = Ze(),
    f
  if (t) {
    let e = typeof t == `string` ? E(t) : t
    ;(b(
      c === `/` || e.pathname?.startsWith(c),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`,
    ),
      (f = e))
  } else f = d
  let p = f.pathname || `/`,
    m = p
  if (c !== `/`) {
    let e = c.replace(/^\//, ``).split(`/`)
    m = `/` + p.replace(/^\//, ``).split(`/`).slice(e.length).join(`/`)
  }
  let h = k(e, { pathname: m })
  ;(x(l || h != null, `No routes matched location "${f.pathname}${f.search}${f.hash}" `),
    x(
      h == null ||
        h[h.length - 1].route.element !== void 0 ||
        h[h.length - 1].route.Component !== void 0 ||
        h[h.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${f.pathname}${f.search}${f.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ))
  let g = mt(
    h &&
      h.map((e) =>
        Object.assign({}, e, {
          params: Object.assign({}, o, e.params),
          pathname: xe([
            c,
            r.encodeLocation
              ? r.encodeLocation(
                  e.pathname.replace(/%/g, `%25`).replace(/\?/g, `%3F`).replace(/#/g, `%23`),
                ).pathname
              : e.pathname,
          ]),
          pathnameBase:
            e.pathnameBase === `/`
              ? c
              : xe([
                  c,
                  r.encodeLocation
                    ? r.encodeLocation(
                        e.pathnameBase
                          .replace(/%/g, `%25`)
                          .replace(/\?/g, `%3F`)
                          .replace(/#/g, `%23`),
                      ).pathname
                    : e.pathnameBase,
                ]),
        }),
      ),
    i,
    n,
  )
  return t && g
    ? u.createElement(
        Ve.Provider,
        {
          value: {
            location: {
              pathname: `/`,
              search: ``,
              hash: ``,
              state: null,
              key: `default`,
              unstable_mask: void 0,
              ...f,
            },
            navigationType: `POP`,
          },
        },
        g,
      )
    : g
}
function ct() {
  let e = Ct(),
    t = De(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    r = `rgba(200,200,200, 0.5)`,
    i = { padding: `0.5rem`, backgroundColor: r },
    a = { padding: `2px 4px`, backgroundColor: r },
    o = null
  return (
    console.error(`Error handled by React Router default ErrorBoundary:`, e),
    (o = u.createElement(
      u.Fragment,
      null,
      u.createElement(`p`, null, `💿 Hey developer 👋`),
      u.createElement(
        `p`,
        null,
        `You can provide a way better UX than this when your app throws errors by providing your own `,
        u.createElement(`code`, { style: a }, `ErrorBoundary`),
        ` or`,
        ` `,
        u.createElement(`code`, { style: a }, `errorElement`),
        ` prop on your route.`,
      ),
    )),
    u.createElement(
      u.Fragment,
      null,
      u.createElement(`h2`, null, `Unexpected Application Error!`),
      u.createElement(`h3`, { style: { fontStyle: `italic` } }, t),
      n ? u.createElement(`pre`, { style: i }, n) : null,
      o,
    )
  )
}
var lt = u.createElement(ct, null),
  ut = class extends u.Component {
    constructor(e) {
      ;(super(e),
        (this.state = { location: e.location, revalidation: e.revalidation, error: e.error }))
    }
    static getDerivedStateFromError(e) {
      return { error: e }
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location || (t.revalidation !== `idle` && e.revalidation === `idle`)
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error === void 0 ? t.error : e.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          }
    }
    componentDidCatch(e, t) {
      this.props.onError
        ? this.props.onError(e, t)
        : console.error(`React Router caught the following error during render`, e)
    }
    render() {
      let e = this.state.error
      if (
        this.context &&
        typeof e == `object` &&
        e &&
        `digest` in e &&
        typeof e.digest == `string`
      ) {
        let t = Je(e.digest)
        t && (e = t)
      }
      let t =
        e === void 0
          ? this.props.children
          : u.createElement(
              He.Provider,
              { value: this.props.routeContext },
              u.createElement(Ue.Provider, { value: e, children: this.props.component }),
            )
      return this.context ? u.createElement(ft, { error: e }, t) : t
    }
  }
ut.contextType = Fe
var dt = new WeakMap()
function ft({ children: e, error: t }) {
  let { basename: n } = u.useContext(Be)
  if (typeof t == `object` && t && `digest` in t && typeof t.digest == `string`) {
    let e = qe(t.digest)
    if (e) {
      let r = dt.get(t)
      if (r) throw r
      let i = Ae(e.location, n)
      if (ke && !dt.get(t))
        if (i.isExternal || e.reloadDocument) window.location.href = i.absoluteURL || i.to
        else {
          let n = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(i.to, { replace: e.replace }),
          )
          throw (dt.set(t, n), n)
        }
      return u.createElement(`meta`, {
        httpEquiv: `refresh`,
        content: `0;url=${i.absoluteURL || i.to}`,
      })
    }
  }
  return e
}
function pt({ routeContext: e, match: t, children: n }) {
  let r = u.useContext(Ne)
  return (
    r &&
      r.static &&
      r.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = t.route.id),
    u.createElement(He.Provider, { value: e }, n)
  )
}
function mt(e, t = [], n) {
  let r = n?.state
  if (e == null) {
    if (!r) return null
    if (r.errors) e = r.matches
    else if (t.length === 0 && !r.initialized && r.matches.length > 0) e = r.matches
    else return null
  }
  let i = e,
    a = r?.errors
  if (a != null) {
    let e = i.findIndex((e) => e.route.id && a?.[e.route.id] !== void 0)
    ;(b(
      e >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`,
    ),
      (i = i.slice(0, Math.min(i.length, e + 1))))
  }
  let o = !1,
    s = -1
  if (n && r) {
    o = r.renderFallback
    for (let e = 0; e < i.length; e++) {
      let t = i[e]
      if (((t.route.HydrateFallback || t.route.hydrateFallbackElement) && (s = e), t.route.id)) {
        let { loaderData: e, errors: a } = r,
          c = t.route.loader && !e.hasOwnProperty(t.route.id) && (!a || a[t.route.id] === void 0)
        if (t.route.lazy || c) {
          ;(n.isStatic && (o = !0), (i = s >= 0 ? i.slice(0, s + 1) : [i[0]]))
          break
        }
      }
    }
  }
  let c = n?.onError,
    l =
      r && c
        ? (e, t) => {
            c(e, {
              location: r.location,
              params: r.matches?.[0]?.params ?? {},
              unstable_pattern: Oe(r.matches),
              errorInfo: t,
            })
          }
        : void 0
  return i.reduceRight((e, n, c) => {
    let d,
      f = !1,
      p = null,
      m = null
    r &&
      ((d = a && n.route.id ? a[n.route.id] : void 0),
      (p = n.route.errorElement || lt),
      o &&
        (s < 0 && c === 0
          ? (Et(
              `route-fallback`,
              !1,
              'No `HydrateFallback` element provided to render during initial hydration',
            ),
            (f = !0),
            (m = null))
          : s === c && ((f = !0), (m = n.route.hydrateFallbackElement || null))))
    let h = t.concat(i.slice(0, c + 1)),
      g = () => {
        let t
        return (
          (t = d
            ? p
            : f
              ? m
              : n.route.Component
                ? u.createElement(n.route.Component, null)
                : n.route.element
                  ? n.route.element
                  : e),
          u.createElement(pt, {
            match: n,
            routeContext: { outlet: e, matches: h, isDataRoute: r != null },
            children: t,
          })
        )
      }
    return r && (n.route.ErrorBoundary || n.route.errorElement || c === 0)
      ? u.createElement(ut, {
          location: r.location,
          revalidation: r.revalidation,
          component: p,
          error: d,
          children: g(),
          routeContext: { outlet: null, matches: h, isDataRoute: !0 },
          onError: l,
        })
      : g()
  }, null)
}
function ht(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function gt(e) {
  let t = u.useContext(Ne)
  return (b(t, ht(e)), t)
}
function _t(e) {
  let t = u.useContext(Pe)
  return (b(t, ht(e)), t)
}
function vt(e) {
  let t = u.useContext(He)
  return (b(t, ht(e)), t)
}
function yt(e) {
  let t = vt(e),
    n = t.matches[t.matches.length - 1]
  return (b(n.route.id, `${e} can only be used on routes that contain a unique "id"`), n.route.id)
}
function bt() {
  return yt(`useRouteId`)
}
function xt() {
  return _t(`useNavigation`).navigation
}
function St() {
  let { matches: e, loaderData: t } = _t(`useMatches`)
  return u.useMemo(() => e.map((e) => j(e, t)), [e, t])
}
function Ct() {
  let e = u.useContext(Ue),
    t = _t(`useRouteError`),
    n = yt(`useRouteError`)
  return e === void 0 ? t.errors?.[n] : e
}
function wt() {
  let { router: e } = gt(`useNavigate`),
    t = yt(`useNavigate`),
    n = u.useRef(!1)
  return (
    $e(() => {
      n.current = !0
    }),
    u.useCallback(
      async (r, i = {}) => {
        ;(x(n.current, Qe),
          n.current &&
            (typeof r == `number`
              ? await e.navigate(r)
              : await e.navigate(r, { fromRouteId: t, ...i })))
      },
      [e, t],
    )
  )
}
var Tt = {}
function Et(e, t, n) {
  !t && !Tt[e] && ((Tt[e] = !0), x(!1, n))
}
u.memo(Dt)
function Dt({ routes: e, future: t, state: n, isStatic: r, onError: i }) {
  return st(e, void 0, { state: n, isStatic: r, onError: i, future: t })
}
function Ot({ to: e, replace: t, state: n, relative: r }) {
  b(Xe(), `<Navigate> may be used only in the context of a <Router> component.`)
  let { static: i } = u.useContext(Be)
  x(
    !i,
    `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`,
  )
  let { matches: a } = u.useContext(He),
    { pathname: o } = Ze(),
    s = et(),
    c = ye(e, ve(a), o, r === `path`),
    l = JSON.stringify(c)
  return (
    u.useEffect(() => {
      s(JSON.parse(l), { replace: t, state: n, relative: r })
    }, [s, l, r, t, n]),
    null
  )
}
function kt(e) {
  return rt(e.context)
}
function At(e) {
  b(
    !1,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`,
  )
}
function jt({
  basename: e = `/`,
  children: t = null,
  location: n,
  navigationType: r = `POP`,
  navigator: i,
  static: a = !1,
  unstable_useTransitions: o,
}) {
  b(
    !Xe(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`,
  )
  let s = e.replace(/^\/*/, `/`),
    c = u.useMemo(
      () => ({ basename: s, navigator: i, static: a, unstable_useTransitions: o, future: {} }),
      [s, i, a, o],
    )
  typeof n == `string` && (n = E(n))
  let {
      pathname: l = `/`,
      search: d = ``,
      hash: f = ``,
      state: p = null,
      key: m = `default`,
      unstable_mask: h,
    } = n,
    g = u.useMemo(() => {
      let e = fe(l, s)
      return e == null
        ? null
        : {
            location: { pathname: e, search: d, hash: f, state: p, key: m, unstable_mask: h },
            navigationType: r,
          }
    }, [s, l, d, f, p, m, r, h])
  return (
    x(
      g != null,
      `<Router basename="${s}"> is not able to match the URL "${l}${d}${f}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    g == null
      ? null
      : u.createElement(
          Be.Provider,
          { value: c },
          u.createElement(Ve.Provider, { children: t, value: g }),
        )
  )
}
function Mt({ children: e, location: t }) {
  return ot(Nt(e), t)
}
u.Component
function Nt(e, t = []) {
  let n = []
  return (
    u.Children.forEach(e, (e, r) => {
      if (!u.isValidElement(e)) return
      let i = [...t, r]
      if (e.type === u.Fragment) {
        n.push.apply(n, Nt(e.props.children, i))
        return
      }
      ;(b(
        e.type === At,
        `[${typeof e.type == `string` ? e.type : e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        b(!e.props.index || !e.props.children, `An index route cannot have child routes.`))
      let a = {
        id: e.props.id || i.join(`-`),
        caseSensitive: e.props.caseSensitive,
        element: e.props.element,
        Component: e.props.Component,
        index: e.props.index,
        path: e.props.path,
        middleware: e.props.middleware,
        loader: e.props.loader,
        action: e.props.action,
        hydrateFallbackElement: e.props.hydrateFallbackElement,
        HydrateFallback: e.props.HydrateFallback,
        errorElement: e.props.errorElement,
        ErrorBoundary: e.props.ErrorBoundary,
        hasErrorBoundary:
          e.props.hasErrorBoundary === !0 ||
          e.props.ErrorBoundary != null ||
          e.props.errorElement != null,
        shouldRevalidate: e.props.shouldRevalidate,
        handle: e.props.handle,
        lazy: e.props.lazy,
      }
      ;(e.props.children && (a.children = Nt(e.props.children, i)), n.push(a))
    }),
    n
  )
}
var Pt = `get`,
  Ft = `application/x-www-form-urlencoded`
function It(e) {
  return typeof HTMLElement < `u` && e instanceof HTMLElement
}
function Lt(e) {
  return It(e) && e.tagName.toLowerCase() === `button`
}
function Rt(e) {
  return It(e) && e.tagName.toLowerCase() === `form`
}
function zt(e) {
  return It(e) && e.tagName.toLowerCase() === `input`
}
function Bt(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
function Vt(e, t) {
  return e.button === 0 && (!t || t === `_self`) && !Bt(e)
}
var Ht = null
function Ut() {
  if (Ht === null)
    try {
      ;(new FormData(document.createElement(`form`), 0), (Ht = !1))
    } catch {
      Ht = !0
    }
  return Ht
}
var Wt = new Set([`application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`])
function Gt(e) {
  return e != null && !Wt.has(e)
    ? (x(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ft}"`,
      ),
      null)
    : e
}
function Kt(e, t) {
  let n, r, i, a, o
  if (Rt(e)) {
    let o = e.getAttribute(`action`)
    ;((r = o ? fe(o, t) : null),
      (n = e.getAttribute(`method`) || Pt),
      (i = Gt(e.getAttribute(`enctype`)) || Ft),
      (a = new FormData(e)))
  } else if (Lt(e) || (zt(e) && (e.type === `submit` || e.type === `image`))) {
    let o = e.form
    if (o == null) throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`)
    let s = e.getAttribute(`formaction`) || o.getAttribute(`action`)
    if (
      ((r = s ? fe(s, t) : null),
      (n = e.getAttribute(`formmethod`) || o.getAttribute(`method`) || Pt),
      (i = Gt(e.getAttribute(`formenctype`)) || Gt(o.getAttribute(`enctype`)) || Ft),
      (a = new FormData(o, e)),
      !Ut())
    ) {
      let { name: t, type: n, value: r } = e
      if (n === `image`) {
        let e = t ? `${t}.` : ``
        ;(a.append(`${e}x`, `0`), a.append(`${e}y`, `0`))
      } else t && a.append(t, r)
    }
  } else if (It(e))
    throw Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`,
    )
  else ((n = Pt), (r = null), (i = Ft), (o = e))
  return (
    a && i === `text/plain` && ((o = a), (a = void 0)),
    { action: r, method: n.toLowerCase(), encType: i, formData: a, body: o }
  )
}
Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`)
var qt = {
    '&': `\\u0026`,
    '>': `\\u003e`,
    '<': `\\u003c`,
    '\u2028': `\\u2028`,
    '\u2029': `\\u2029`,
  },
  Jt = /[&><\u2028\u2029]/g
function Yt(e) {
  return e.replace(Jt, (e) => qt[e])
}
function Xt(e, t) {
  if (e === !1 || e == null) throw Error(t)
}
function Zt(e, t, n, r) {
  let i =
    typeof e == `string`
      ? new URL(e, typeof window > `u` ? `server://singlefetch/` : window.location.origin)
      : e
  return (
    n
      ? i.pathname.endsWith(`/`)
        ? (i.pathname = `${i.pathname}_.${r}`)
        : (i.pathname = `${i.pathname}.${r}`)
      : i.pathname === `/`
        ? (i.pathname = `_root.${r}`)
        : t && fe(i.pathname, t) === `/`
          ? (i.pathname = `${Se(t)}/_root.${r}`)
          : (i.pathname = `${Se(i.pathname)}.${r}`),
    i
  )
}
async function Qt(e, t) {
  if (e.id in t) return t[e.id]
  try {
    let n = await g(() => import(e.module), [])
    return ((t[e.id] = n), n)
  } catch (t) {
    return (
      console.error(`Error loading route module \`${e.module}\`, reloading page...`),
      console.error(t),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    )
  }
}
function $t(e) {
  return e != null && typeof e.page == `string`
}
function en(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === `preload` && typeof e.imageSrcSet == `string` && typeof e.imageSizes == `string`
      : typeof e.rel == `string` && typeof e.href == `string`
}
async function tn(e, t, n) {
  return sn(
    (
      await Promise.all(
        e.map(async (e) => {
          let r = t.routes[e.route.id]
          if (r) {
            let e = await Qt(r, n)
            return e.links ? e.links() : []
          }
          return []
        }),
      )
    )
      .flat(1)
      .filter(en)
      .filter((e) => e.rel === `stylesheet` || e.rel === `preload`)
      .map((e) =>
        e.rel === `stylesheet` ? { ...e, rel: `prefetch`, as: `style` } : { ...e, rel: `prefetch` },
      ),
  )
}
function nn(e, t, n, r, i, a) {
  let o = (e, t) => (n[t] ? e.route.id !== n[t].route.id : !0),
    s = (e, t) =>
      n[t].pathname !== e.pathname ||
      (n[t].route.path?.endsWith(`*`) && n[t].params[`*`] !== e.params[`*`])
  return a === `assets`
    ? t.filter((e, t) => o(e, t) || s(e, t))
    : a === `data`
      ? t.filter((t, a) => {
          let c = r.routes[t.route.id]
          if (!c || !c.hasLoader) return !1
          if (o(t, a) || s(t, a)) return !0
          if (t.route.shouldRevalidate) {
            let r = t.route.shouldRevalidate({
              currentUrl: new URL(i.pathname + i.search + i.hash, window.origin),
              currentParams: n[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: t.params,
              defaultShouldRevalidate: !0,
            })
            if (typeof r == `boolean`) return r
          }
          return !0
        })
      : []
}
function rn(e, t, { includeHydrateFallback: n } = {}) {
  return an(
    e
      .map((e) => {
        let r = t.routes[e.route.id]
        if (!r) return []
        let i = [r.module]
        return (
          r.clientActionModule && (i = i.concat(r.clientActionModule)),
          r.clientLoaderModule && (i = i.concat(r.clientLoaderModule)),
          n && r.hydrateFallbackModule && (i = i.concat(r.hydrateFallbackModule)),
          r.imports && (i = i.concat(r.imports)),
          i
        )
      })
      .flat(1),
  )
}
function an(e) {
  return [...new Set(e)]
}
function on(e) {
  let t = {},
    n = Object.keys(e).sort()
  for (let r of n) t[r] = e[r]
  return t
}
function sn(e, t) {
  let n = new Set(),
    r = new Set(t)
  return e.reduce((e, i) => {
    if (t && !$t(i) && i.as === `script` && i.href && r.has(i.href)) return e
    let a = JSON.stringify(on(i))
    return (n.has(a) || (n.add(a), e.push({ key: a, link: i })), e)
  }, [])
}
function cn() {
  let e = u.useContext(Ne)
  return (Xt(e, `You must render this element inside a <DataRouterContext.Provider> element`), e)
}
function ln() {
  let e = u.useContext(Pe)
  return (
    Xt(e, `You must render this element inside a <DataRouterStateContext.Provider> element`), e
  )
}
var un = u.createContext(void 0)
un.displayName = `FrameworkContext`
function dn() {
  let e = u.useContext(un)
  return (Xt(e, `You must render this element inside a <HydratedRouter> element`), e)
}
function fn(e, t) {
  let n = u.useContext(un),
    [r, i] = u.useState(!1),
    [a, o] = u.useState(!1),
    { onFocus: s, onBlur: c, onMouseEnter: l, onMouseLeave: d, onTouchStart: f } = t,
    p = u.useRef(null)
  ;(u.useEffect(() => {
    if ((e === `render` && o(!0), e === `viewport`)) {
      let e = new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            o(e.isIntersecting)
          })
        },
        { threshold: 0.5 },
      )
      return (
        p.current && e.observe(p.current),
        () => {
          e.disconnect()
        }
      )
    }
  }, [e]),
    u.useEffect(() => {
      if (r) {
        let e = setTimeout(() => {
          o(!0)
        }, 100)
        return () => {
          clearTimeout(e)
        }
      }
    }, [r]))
  let m = () => {
      i(!0)
    },
    h = () => {
      ;(i(!1), o(!1))
    }
  return n
    ? e === `intent`
      ? [
          a,
          p,
          {
            onFocus: pn(s, m),
            onBlur: pn(c, h),
            onMouseEnter: pn(l, m),
            onMouseLeave: pn(d, h),
            onTouchStart: pn(f, m),
          },
        ]
      : [a, p, {}]
    : [!1, p, {}]
}
function pn(e, t) {
  return (n) => {
    ;(e && e(n), n.defaultPrevented || t(n))
  }
}
function mn({ page: e, ...t }) {
  let n = Ie(),
    { router: r } = cn(),
    i = u.useMemo(() => k(r.routes, e, r.basename), [r.routes, e, r.basename])
  return i
    ? n
      ? u.createElement(gn, { page: e, matches: i, ...t })
      : u.createElement(_n, { page: e, matches: i, ...t })
    : null
}
function hn(e) {
  let { manifest: t, routeModules: n } = dn(),
    [r, i] = u.useState([])
  return (
    u.useEffect(() => {
      let r = !1
      return (
        tn(e, t, n).then((e) => {
          r || i(e)
        }),
        () => {
          r = !0
        }
      )
    }, [e, t, n]),
    r
  )
}
function gn({ page: e, matches: t, ...n }) {
  let r = Ze(),
    { future: i } = dn(),
    { basename: a } = cn(),
    o = u.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return []
      let n = Zt(e, a, i.unstable_trailingSlashAwareDataRequests, `rsc`),
        o = !1,
        s = []
      for (let e of t) typeof e.route.shouldRevalidate == `function` ? (o = !0) : s.push(e.route.id)
      return (
        o && s.length > 0 && n.searchParams.set(`_routes`, s.join(`,`)), [n.pathname + n.search]
      )
    }, [a, i.unstable_trailingSlashAwareDataRequests, e, r, t])
  return u.createElement(
    u.Fragment,
    null,
    o.map((e) => u.createElement(`link`, { key: e, rel: `prefetch`, as: `fetch`, href: e, ...n })),
  )
}
function _n({ page: e, matches: t, ...n }) {
  let r = Ze(),
    { future: i, manifest: a, routeModules: o } = dn(),
    { basename: s } = cn(),
    { loaderData: c, matches: l } = ln(),
    d = u.useMemo(() => nn(e, t, l, a, r, `data`), [e, t, l, a, r]),
    f = u.useMemo(() => nn(e, t, l, a, r, `assets`), [e, t, l, a, r]),
    p = u.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return []
      let n = new Set(),
        l = !1
      if (
        (t.forEach((e) => {
          let t = a.routes[e.route.id]
          !t ||
            !t.hasLoader ||
            ((!d.some((t) => t.route.id === e.route.id) &&
              e.route.id in c &&
              o[e.route.id]?.shouldRevalidate) ||
            t.hasClientLoader
              ? (l = !0)
              : n.add(e.route.id))
        }),
        n.size === 0)
      )
        return []
      let u = Zt(e, s, i.unstable_trailingSlashAwareDataRequests, `data`)
      return (
        l &&
          n.size > 0 &&
          u.searchParams.set(
            `_routes`,
            t
              .filter((e) => n.has(e.route.id))
              .map((e) => e.route.id)
              .join(`,`),
          ),
        [u.pathname + u.search]
      )
    }, [s, i.unstable_trailingSlashAwareDataRequests, c, r, a, d, t, e, o]),
    m = u.useMemo(() => rn(f, a), [f, a]),
    h = hn(f)
  return u.createElement(
    u.Fragment,
    null,
    p.map((e) => u.createElement(`link`, { key: e, rel: `prefetch`, as: `fetch`, href: e, ...n })),
    m.map((e) => u.createElement(`link`, { key: e, rel: `modulepreload`, href: e, ...n })),
    h.map(({ key: e, link: t }) =>
      u.createElement(`link`, {
        key: e,
        nonce: n.nonce,
        ...t,
        crossOrigin: t.crossOrigin ?? n.crossOrigin,
      }),
    ),
  )
}
function vn(...e) {
  return (t) => {
    e.forEach((e) => {
      typeof e == `function` ? e(t) : e != null && (e.current = t)
    })
  }
}
u.Component
var yn =
  typeof window < `u` && window.document !== void 0 && window.document.createElement !== void 0
try {
  yn && (window.__reactRouterVersion = `7.14.2`)
} catch {}
function bn({ basename: e, children: t, unstable_useTransitions: n, window: r }) {
  let i = u.useRef()
  i.current ??= y({ window: r, v5Compat: !0 })
  let a = i.current,
    [o, s] = u.useState({ action: a.action, location: a.location }),
    c = u.useCallback(
      (e) => {
        n === !1 ? s(e) : u.startTransition(() => s(e))
      },
      [n],
    )
  return (
    u.useLayoutEffect(() => a.listen(c), [a, c]),
    u.createElement(jt, {
      basename: e,
      children: t,
      location: o.location,
      navigationType: o.action,
      navigator: a,
      unstable_useTransitions: n,
    })
  )
}
function xn({ basename: e, children: t, history: n, unstable_useTransitions: r }) {
  let [i, a] = u.useState({ action: n.action, location: n.location }),
    o = u.useCallback(
      (e) => {
        r === !1 ? a(e) : u.startTransition(() => a(e))
      },
      [r],
    )
  return (
    u.useLayoutEffect(() => n.listen(o), [n, o]),
    u.createElement(jt, {
      basename: e,
      children: t,
      location: i.location,
      navigationType: i.action,
      navigator: n,
      unstable_useTransitions: r,
    })
  )
}
xn.displayName = `unstable_HistoryRouter`
var Sn = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Cn = u.forwardRef(function (
    {
      onClick: e,
      discover: t = `render`,
      prefetch: n = `none`,
      relative: r,
      reloadDocument: i,
      replace: a,
      unstable_mask: o,
      state: s,
      target: c,
      to: l,
      preventScrollReset: d,
      viewTransition: f,
      unstable_defaultShouldRevalidate: p,
      ...m
    },
    h,
  ) {
    let { basename: g, navigator: _, unstable_useTransitions: v } = u.useContext(Be),
      y = typeof l == `string` && Sn.test(l),
      b = Ae(l, g)
    l = b.to
    let x = Ye(l, { relative: r }),
      S = Ze(),
      C = null
    if (o) {
      let e = ye(o, [], S.unstable_mask ? S.unstable_mask.pathname : `/`, !0)
      ;(g !== `/` && (e.pathname = e.pathname === `/` ? g : xe([g, e.pathname])),
        (C = _.createHref(e)))
    }
    let [w, T, E] = fn(n, m),
      D = An(l, {
        replace: a,
        unstable_mask: o,
        state: s,
        target: c,
        preventScrollReset: d,
        relative: r,
        viewTransition: f,
        unstable_defaultShouldRevalidate: p,
        unstable_useTransitions: v,
      })
    function O(t) {
      ;(e && e(t), t.defaultPrevented || D(t))
    }
    let k = !(b.isExternal || i),
      A = u.createElement(`a`, {
        ...m,
        ...E,
        href: (k ? C : void 0) || b.absoluteURL || x,
        onClick: k ? O : e,
        ref: vn(h, T),
        target: c,
        'data-discover': !y && t === `render` ? `true` : void 0,
      })
    return w && !y ? u.createElement(u.Fragment, null, A, u.createElement(mn, { page: x })) : A
  })
Cn.displayName = `Link`
var wn = u.forwardRef(function (
  {
    'aria-current': e = `page`,
    caseSensitive: t = !1,
    className: n = ``,
    end: r = !1,
    style: i,
    to: a,
    viewTransition: o,
    children: s,
    ...c
  },
  l,
) {
  let d = at(a, { relative: c.relative }),
    f = Ze(),
    p = u.useContext(Pe),
    { navigator: m, basename: h } = u.useContext(Be),
    g = p != null && Bn(d) && o === !0,
    _ = m.encodeLocation ? m.encodeLocation(d).pathname : d.pathname,
    v = f.pathname,
    y = p && p.navigation && p.navigation.location ? p.navigation.location.pathname : null
  ;(t || ((v = v.toLowerCase()), (y = y ? y.toLowerCase() : null), (_ = _.toLowerCase())),
    y && h && (y = fe(y, h) || y))
  let b = _ !== `/` && _.endsWith(`/`) ? _.length - 1 : _.length,
    x = v === _ || (!r && v.startsWith(_) && v.charAt(b) === `/`),
    S = y != null && (y === _ || (!r && y.startsWith(_) && y.charAt(_.length) === `/`)),
    C = { isActive: x, isPending: S, isTransitioning: g },
    w = x ? e : void 0,
    T
  T =
    typeof n == `function`
      ? n(C)
      : [n, x ? `active` : null, S ? `pending` : null, g ? `transitioning` : null]
          .filter(Boolean)
          .join(` `)
  let E = typeof i == `function` ? i(C) : i
  return u.createElement(
    Cn,
    { ...c, 'aria-current': w, className: T, ref: l, style: E, to: a, viewTransition: o },
    typeof s == `function` ? s(C) : s,
  )
})
wn.displayName = `NavLink`
var Tn = u.forwardRef(
  (
    {
      discover: e = `render`,
      fetcherKey: t,
      navigate: n,
      reloadDocument: r,
      replace: i,
      state: a,
      method: o = Pt,
      action: s,
      onSubmit: c,
      relative: l,
      preventScrollReset: d,
      viewTransition: f,
      unstable_defaultShouldRevalidate: p,
      ...m
    },
    h,
  ) => {
    let { unstable_useTransitions: g } = u.useContext(Be),
      _ = Nn(),
      v = Pn(s, { relative: l }),
      y = o.toLowerCase() === `get` ? `get` : `post`,
      b = typeof s == `string` && Sn.test(s)
    return u.createElement(`form`, {
      ref: h,
      method: y,
      action: v,
      onSubmit: r
        ? c
        : (e) => {
            if ((c && c(e), e.defaultPrevented)) return
            e.preventDefault()
            let r = e.nativeEvent.submitter,
              s = r?.getAttribute(`formmethod`) || o,
              m = () =>
                _(r || e.currentTarget, {
                  fetcherKey: t,
                  method: s,
                  navigate: n,
                  replace: i,
                  state: a,
                  relative: l,
                  preventScrollReset: d,
                  viewTransition: f,
                  unstable_defaultShouldRevalidate: p,
                })
            g && n !== !1 ? u.startTransition(() => m()) : m()
          },
      ...m,
      'data-discover': !b && e === `render` ? `true` : void 0,
    })
  },
)
Tn.displayName = `Form`
function En({ getKey: e, storageKey: t, ...n }) {
  let r = u.useContext(un),
    { basename: i } = u.useContext(Be),
    a = Ze(),
    o = St()
  Rn({ getKey: e, storageKey: t })
  let s = u.useMemo(() => {
    if (!r || !e) return null
    let t = Ln(a, o, i, e)
    return t === a.key ? null : t
  }, [])
  if (!r || r.isSpaMode) return null
  let c = ((e, t) => {
    if (!window.history.state || !window.history.state.key) {
      let e = Math.random().toString(32).slice(2)
      window.history.replaceState({ key: e }, ``)
    }
    try {
      let n = JSON.parse(sessionStorage.getItem(e) || `{}`)[t || window.history.state.key]
      typeof n == `number` && window.scrollTo(0, n)
    } catch (t) {
      ;(console.error(t), sessionStorage.removeItem(e))
    }
  }).toString()
  return u.createElement(`script`, {
    ...n,
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: `(${c})(${Yt(JSON.stringify(t || Fn))}, ${Yt(JSON.stringify(s))})`,
    },
  })
}
En.displayName = `ScrollRestoration`
function Dn(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function On(e) {
  let t = u.useContext(Ne)
  return (b(t, Dn(e)), t)
}
function kn(e) {
  let t = u.useContext(Pe)
  return (b(t, Dn(e)), t)
}
function An(
  e,
  {
    target: t,
    replace: n,
    unstable_mask: r,
    state: i,
    preventScrollReset: a,
    relative: o,
    viewTransition: s,
    unstable_defaultShouldRevalidate: c,
    unstable_useTransitions: l,
  } = {},
) {
  let d = et(),
    f = Ze(),
    p = at(e, { relative: o })
  return u.useCallback(
    (m) => {
      if (Vt(m, t)) {
        m.preventDefault()
        let t = n === void 0 ? T(f) === T(p) : n,
          h = () =>
            d(e, {
              replace: t,
              unstable_mask: r,
              state: i,
              preventScrollReset: a,
              relative: o,
              viewTransition: s,
              unstable_defaultShouldRevalidate: c,
            })
        l ? u.startTransition(() => h()) : h()
      }
    },
    [f, d, p, n, r, i, t, e, a, o, s, c, l],
  )
}
var jn = 0,
  Mn = () => `__${String(++jn)}__`
function Nn() {
  let { router: e } = On(`useSubmit`),
    { basename: t } = u.useContext(Be),
    n = bt(),
    r = e.fetch,
    i = e.navigate
  return u.useCallback(
    async (e, a = {}) => {
      let { action: o, method: s, encType: c, formData: l, body: u } = Kt(e, t)
      a.navigate === !1
        ? await r(a.fetcherKey || Mn(), n, a.action || o, {
            unstable_defaultShouldRevalidate: a.unstable_defaultShouldRevalidate,
            preventScrollReset: a.preventScrollReset,
            formData: l,
            body: u,
            formMethod: a.method || s,
            formEncType: a.encType || c,
            flushSync: a.flushSync,
          })
        : await i(a.action || o, {
            unstable_defaultShouldRevalidate: a.unstable_defaultShouldRevalidate,
            preventScrollReset: a.preventScrollReset,
            formData: l,
            body: u,
            formMethod: a.method || s,
            formEncType: a.encType || c,
            replace: a.replace,
            state: a.state,
            fromRouteId: n,
            flushSync: a.flushSync,
            viewTransition: a.viewTransition,
          })
    },
    [r, i, t, n],
  )
}
function Pn(e, { relative: t } = {}) {
  let { basename: n } = u.useContext(Be),
    r = u.useContext(He)
  b(r, `useFormAction must be used inside a RouteContext`)
  let [i] = r.matches.slice(-1),
    a = { ...at(e || `.`, { relative: t }) },
    o = Ze()
  if (e == null) {
    a.search = o.search
    let e = new URLSearchParams(a.search),
      t = e.getAll(`index`)
    if (t.some((e) => e === ``)) {
      ;(e.delete(`index`), t.filter((e) => e).forEach((t) => e.append(`index`, t)))
      let n = e.toString()
      a.search = n ? `?${n}` : ``
    }
  }
  return (
    (!e || e === `.`) &&
      i.route.index &&
      (a.search = a.search ? a.search.replace(/^\?/, `?index&`) : `?index`),
    n !== `/` && (a.pathname = a.pathname === `/` ? n : xe([n, a.pathname])),
    T(a)
  )
}
var Fn = `react-router-scroll-positions`,
  In = {}
function Ln(e, t, n, r) {
  let i = null
  return (
    r && (i = r(n === `/` ? e : { ...e, pathname: fe(e.pathname, n) || e.pathname }, t)),
    (i ??= e.key),
    i
  )
}
function Rn({ getKey: e, storageKey: t } = {}) {
  let { router: n } = On(`useScrollRestoration`),
    { restoreScrollPosition: r, preventScrollReset: i } = kn(`useScrollRestoration`),
    { basename: a } = u.useContext(Be),
    o = Ze(),
    s = St(),
    c = xt()
  ;(u.useEffect(
    () => (
      (window.history.scrollRestoration = `manual`),
      () => {
        window.history.scrollRestoration = `auto`
      }
    ),
    [],
  ),
    zn(
      u.useCallback(() => {
        if (c.state === `idle`) {
          let t = Ln(o, s, a, e)
          In[t] = window.scrollY
        }
        try {
          sessionStorage.setItem(t || Fn, JSON.stringify(In))
        } catch (e) {
          x(
            !1,
            `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`,
          )
        }
        window.history.scrollRestoration = `auto`
      }, [c.state, e, a, o, s, t]),
    ),
    typeof document < `u` &&
      (u.useLayoutEffect(() => {
        try {
          let e = sessionStorage.getItem(t || Fn)
          e && (In = JSON.parse(e))
        } catch {}
      }, [t]),
      u.useLayoutEffect(() => {
        let t = n?.enableScrollRestoration(
          In,
          () => window.scrollY,
          e ? (t, n) => Ln(t, n, a, e) : void 0,
        )
        return () => t && t()
      }, [n, a, e]),
      u.useLayoutEffect(() => {
        if (r !== !1) {
          if (typeof r == `number`) {
            window.scrollTo(0, r)
            return
          }
          try {
            if (o.hash) {
              let e = document.getElementById(decodeURIComponent(o.hash.slice(1)))
              if (e) {
                e.scrollIntoView()
                return
              }
            }
          } catch {
            x(
              !1,
              `"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`,
            )
          }
          i !== !0 && window.scrollTo(0, 0)
        }
      }, [o, r, i])))
}
function zn(e, t) {
  let { capture: n } = t || {}
  u.useEffect(() => {
    let t = n == null ? void 0 : { capture: n }
    return (
      window.addEventListener(`pagehide`, e, t),
      () => {
        window.removeEventListener(`pagehide`, e, t)
      }
    )
  }, [e, n])
}
function Bn(e, { relative: t } = {}) {
  let n = u.useContext(Le)
  b(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  )
  let { basename: r } = On(`useViewTransitionState`),
    i = at(e, { relative: t })
  if (!n.isTransitioning) return !1
  let a = fe(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    o = fe(n.nextLocation.pathname, r) || n.nextLocation.pathname
  return le(i.pathname, o) != null || le(i.pathname, a) != null
}
var Vn = 1,
  Hn = 1e6,
  Un = 0
function Wn() {
  return ((Un = (Un + 1) % (2 ** 53 - 1)), Un.toString())
}
var Gn = new Map(),
  Kn = (e) => {
    if (Gn.has(e)) return
    let t = setTimeout(() => {
      ;(Gn.delete(e), Xn({ type: `REMOVE_TOAST`, toastId: e }))
    }, Hn)
    Gn.set(e, t)
  },
  qn = (e, t) => {
    switch (t.type) {
      case `ADD_TOAST`:
        return { ...e, toasts: [t.toast, ...e.toasts].slice(0, Vn) }
      case `UPDATE_TOAST`:
        return {
          ...e,
          toasts: e.toasts.map((e) => (e.id === t.toast.id ? { ...e, ...t.toast } : e)),
        }
      case `DISMISS_TOAST`: {
        let { toastId: n } = t
        return (
          n
            ? Kn(n)
            : e.toasts.forEach((e) => {
                Kn(e.id)
              }),
          {
            ...e,
            toasts: e.toasts.map((e) => (e.id === n || n === void 0 ? { ...e, open: !1 } : e)),
          }
        )
      }
      case `REMOVE_TOAST`:
        return t.toastId === void 0
          ? { ...e, toasts: [] }
          : { ...e, toasts: e.toasts.filter((e) => e.id !== t.toastId) }
    }
  },
  Jn = [],
  Yn = { toasts: [] }
function Xn(e) {
  ;((Yn = qn(Yn, e)),
    Jn.forEach((e) => {
      e(Yn)
    }))
}
function Zn({ ...e }) {
  let t = Wn(),
    n = (e) => Xn({ type: `UPDATE_TOAST`, toast: { ...e, id: t } }),
    r = () => Xn({ type: `DISMISS_TOAST`, toastId: t })
  return (
    Xn({
      type: `ADD_TOAST`,
      toast: {
        ...e,
        id: t,
        open: !0,
        onOpenChange: (e) => {
          e || r()
        },
      },
    }),
    { id: t, dismiss: r, update: n }
  )
}
function Qn() {
  let [e, t] = u.useState(Yn)
  return (
    u.useEffect(
      () => (
        Jn.push(t),
        () => {
          let e = Jn.indexOf(t)
          e > -1 && Jn.splice(e, 1)
        }
      ),
      [e],
    ),
    { ...e, toast: Zn, dismiss: (e) => Xn({ type: `DISMISS_TOAST`, toastId: e }) }
  )
}
typeof window < `u` && window.document && window.document.createElement
function I(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (r) {
    if ((e?.(r), n === !1 || !r.defaultPrevented)) return t?.(r)
  }
}
function $n(e, t) {
  if (typeof e == `function`) return e(t)
  e != null && (e.current = t)
}
function er(...e) {
  return (t) => {
    let n = !1,
      r = e.map((e) => {
        let r = $n(e, t)
        return (!n && typeof r == `function` && (n = !0), r)
      })
    if (n)
      return () => {
        for (let t = 0; t < r.length; t++) {
          let n = r[t]
          typeof n == `function` ? n() : $n(e[t], null)
        }
      }
  }
}
function L(...e) {
  return u.useCallback(er(...e), e)
}
var R = r()
function tr(e, t) {
  let n = u.createContext(t),
    r = (e) => {
      let { children: t, ...r } = e,
        i = u.useMemo(() => r, Object.values(r))
      return (0, R.jsx)(n.Provider, { value: i, children: t })
    }
  r.displayName = e + `Provider`
  function i(r) {
    let i = u.useContext(n)
    if (i) return i
    if (t !== void 0) return t
    throw Error(`\`${r}\` must be used within \`${e}\``)
  }
  return [r, i]
}
function nr(e, t = []) {
  let n = []
  function r(t, r) {
    let i = u.createContext(r),
      a = n.length
    n = [...n, r]
    let o = (t) => {
      let { scope: n, children: r, ...o } = t,
        s = n?.[e]?.[a] || i,
        c = u.useMemo(() => o, Object.values(o))
      return (0, R.jsx)(s.Provider, { value: c, children: r })
    }
    o.displayName = t + `Provider`
    function s(n, o) {
      let s = o?.[e]?.[a] || i,
        c = u.useContext(s)
      if (c) return c
      if (r !== void 0) return r
      throw Error(`\`${n}\` must be used within \`${t}\``)
    }
    return [o, s]
  }
  let i = () => {
    let t = n.map((e) => u.createContext(e))
    return function (n) {
      let r = n?.[e] || t
      return u.useMemo(() => ({ [`__scope${e}`]: { ...n, [e]: r } }), [n, r])
    }
  }
  return ((i.scopeName = e), [r, rr(i, ...t)])
}
function rr(...e) {
  let t = e[0]
  if (e.length === 1) return t
  let n = () => {
    let n = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }))
    return function (e) {
      let r = n.reduce((t, { useScope: n, scopeName: r }) => {
        let i = n(e)[`__scope${r}`]
        return { ...t, ...i }
      }, {})
      return u.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r])
    }
  }
  return ((n.scopeName = t.scopeName), n)
}
function ir(e) {
  let t = ar(e),
    n = u.forwardRef((e, n) => {
      let { children: r, ...i } = e,
        a = u.Children.toArray(r),
        o = a.find(cr)
      if (o) {
        let e = o.props.children,
          r = a.map((t) =>
            t === o
              ? u.Children.count(e) > 1
                ? u.Children.only(null)
                : u.isValidElement(e)
                  ? e.props.children
                  : null
              : t,
          )
        return (0, R.jsx)(t, {
          ...i,
          ref: n,
          children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null,
        })
      }
      return (0, R.jsx)(t, { ...i, ref: n, children: r })
    })
  return ((n.displayName = `${e}.Slot`), n)
}
function ar(e) {
  let t = u.forwardRef((e, t) => {
    let { children: n, ...r } = e
    if (u.isValidElement(n)) {
      let e = ur(n),
        i = lr(r, n.props)
      return (n.type !== u.Fragment && (i.ref = t ? er(t, e) : e), u.cloneElement(n, i))
    }
    return u.Children.count(n) > 1 ? u.Children.only(null) : null
  })
  return ((t.displayName = `${e}.SlotClone`), t)
}
var or = Symbol(`radix.slottable`)
function sr(e) {
  let t = ({ children: e }) => (0, R.jsx)(R.Fragment, { children: e })
  return ((t.displayName = `${e}.Slottable`), (t.__radixId = or), t)
}
function cr(e) {
  return (
    u.isValidElement(e) &&
    typeof e.type == `function` &&
    `__radixId` in e.type &&
    e.type.__radixId === or
  )
}
function lr(e, t) {
  let n = { ...t }
  for (let r in t) {
    let i = e[r],
      a = t[r]
    ;/^on[A-Z]/.test(r)
      ? i && a
        ? (n[r] = (...e) => {
            let t = a(...e)
            return (i(...e), t)
          })
        : i && (n[r] = i)
      : r === `style`
        ? (n[r] = { ...i, ...a })
        : r === `className` && (n[r] = [i, a].filter(Boolean).join(` `))
  }
  return { ...e, ...n }
}
function ur(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref)
}
function dr(e) {
  let t = e + `CollectionProvider`,
    [n, r] = nr(t),
    [i, a] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    o = (e) => {
      let { scope: t, children: n } = e,
        r = u.useRef(null),
        a = u.useRef(new Map()).current
      return (0, R.jsx)(i, { scope: t, itemMap: a, collectionRef: r, children: n })
    }
  o.displayName = t
  let s = e + `CollectionSlot`,
    c = ir(s),
    l = u.forwardRef((e, t) => {
      let { scope: n, children: r } = e
      return (0, R.jsx)(c, { ref: L(t, a(s, n).collectionRef), children: r })
    })
  l.displayName = s
  let d = e + `CollectionItemSlot`,
    f = `data-radix-collection-item`,
    p = ir(d),
    m = u.forwardRef((e, t) => {
      let { scope: n, children: r, ...i } = e,
        o = u.useRef(null),
        s = L(t, o),
        c = a(d, n)
      return (
        u.useEffect(() => (c.itemMap.set(o, { ref: o, ...i }), () => void c.itemMap.delete(o))),
        (0, R.jsx)(p, { [f]: ``, ref: s, children: r })
      )
    })
  m.displayName = d
  function h(t) {
    let n = a(e + `CollectionConsumer`, t)
    return u.useCallback(() => {
      let e = n.collectionRef.current
      if (!e) return []
      let t = Array.from(e.querySelectorAll(`[${f}]`))
      return Array.from(n.itemMap.values()).sort(
        (e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current),
      )
    }, [n.collectionRef, n.itemMap])
  }
  return [{ Provider: o, Slot: l, ItemSlot: m }, h, r]
}
var z = [
  `a`,
  `button`,
  `div`,
  `form`,
  `h2`,
  `h3`,
  `img`,
  `input`,
  `label`,
  `li`,
  `nav`,
  `ol`,
  `p`,
  `select`,
  `span`,
  `svg`,
  `ul`,
].reduce((e, t) => {
  let n = ir(`Primitive.${t}`),
    r = u.forwardRef((e, r) => {
      let { asChild: i, ...a } = e,
        o = i ? n : t
      return (
        typeof window < `u` && (window[Symbol.for(`radix-ui`)] = !0),
        (0, R.jsx)(o, { ...a, ref: r })
      )
    })
  return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r })
}, {})
function fr(e, t) {
  e && d.flushSync(() => e.dispatchEvent(t))
}
function pr(e) {
  let t = u.useRef(e)
  return (
    u.useEffect(() => {
      t.current = e
    }),
    u.useMemo(
      () =>
        (...e) =>
          t.current?.(...e),
      [],
    )
  )
}
function mr(e, t = globalThis?.document) {
  let n = pr(e)
  u.useEffect(() => {
    let e = (e) => {
      e.key === `Escape` && n(e)
    }
    return (
      t.addEventListener(`keydown`, e, { capture: !0 }),
      () => t.removeEventListener(`keydown`, e, { capture: !0 })
    )
  }, [n, t])
}
var hr = `DismissableLayer`,
  gr = `dismissableLayer.update`,
  _r = `dismissableLayer.pointerDownOutside`,
  vr = `dismissableLayer.focusOutside`,
  yr,
  br = u.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  xr = u.forwardRef((e, t) => {
    let {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: i,
        onFocusOutside: a,
        onInteractOutside: o,
        onDismiss: s,
        ...c
      } = e,
      l = u.useContext(br),
      [d, f] = u.useState(null),
      p = d?.ownerDocument ?? globalThis?.document,
      [, m] = u.useState({}),
      h = L(t, (e) => f(e)),
      g = Array.from(l.layers),
      [_] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1),
      v = g.indexOf(_),
      y = d ? g.indexOf(d) : -1,
      b = l.layersWithOutsidePointerEventsDisabled.size > 0,
      x = y >= v,
      S = wr((e) => {
        let t = e.target,
          n = [...l.branches].some((e) => e.contains(t))
        !x || n || (i?.(e), o?.(e), e.defaultPrevented || s?.())
      }, p),
      C = Tr((e) => {
        let t = e.target
        ;[...l.branches].some((e) => e.contains(t)) || (a?.(e), o?.(e), e.defaultPrevented || s?.())
      }, p)
    return (
      mr((e) => {
        y === l.layers.size - 1 && (r?.(e), !e.defaultPrevented && s && (e.preventDefault(), s()))
      }, p),
      u.useEffect(() => {
        if (d)
          return (
            n &&
              (l.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((yr = p.body.style.pointerEvents), (p.body.style.pointerEvents = `none`)),
              l.layersWithOutsidePointerEventsDisabled.add(d)),
            l.layers.add(d),
            Er(),
            () => {
              n &&
                l.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (p.body.style.pointerEvents = yr)
            }
          )
      }, [d, p, n, l]),
      u.useEffect(
        () => () => {
          d && (l.layers.delete(d), l.layersWithOutsidePointerEventsDisabled.delete(d), Er())
        },
        [d, l],
      ),
      u.useEffect(() => {
        let e = () => m({})
        return (document.addEventListener(gr, e), () => document.removeEventListener(gr, e))
      }, []),
      (0, R.jsx)(z.div, {
        ...c,
        ref: h,
        style: { pointerEvents: b ? (x ? `auto` : `none`) : void 0, ...e.style },
        onFocusCapture: I(e.onFocusCapture, C.onFocusCapture),
        onBlurCapture: I(e.onBlurCapture, C.onBlurCapture),
        onPointerDownCapture: I(e.onPointerDownCapture, S.onPointerDownCapture),
      })
    )
  })
xr.displayName = hr
var Sr = `DismissableLayerBranch`,
  Cr = u.forwardRef((e, t) => {
    let n = u.useContext(br),
      r = u.useRef(null),
      i = L(t, r)
    return (
      u.useEffect(() => {
        let e = r.current
        if (e)
          return (
            n.branches.add(e),
            () => {
              n.branches.delete(e)
            }
          )
      }, [n.branches]),
      (0, R.jsx)(z.div, { ...e, ref: i })
    )
  })
Cr.displayName = Sr
function wr(e, t = globalThis?.document) {
  let n = pr(e),
    r = u.useRef(!1),
    i = u.useRef(() => {})
  return (
    u.useEffect(() => {
      let e = (e) => {
          if (e.target && !r.current) {
            let r = function () {
                Dr(_r, n, a, { discrete: !0 })
              },
              a = { originalEvent: e }
            e.pointerType === `touch`
              ? (t.removeEventListener(`click`, i.current),
                (i.current = r),
                t.addEventListener(`click`, i.current, { once: !0 }))
              : r()
          } else t.removeEventListener(`click`, i.current)
          r.current = !1
        },
        a = window.setTimeout(() => {
          t.addEventListener(`pointerdown`, e)
        }, 0)
      return () => {
        ;(window.clearTimeout(a),
          t.removeEventListener(`pointerdown`, e),
          t.removeEventListener(`click`, i.current))
      }
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  )
}
function Tr(e, t = globalThis?.document) {
  let n = pr(e),
    r = u.useRef(!1)
  return (
    u.useEffect(() => {
      let e = (e) => {
        e.target && !r.current && Dr(vr, n, { originalEvent: e }, { discrete: !1 })
      }
      return (t.addEventListener(`focusin`, e), () => t.removeEventListener(`focusin`, e))
    }, [t, n]),
    { onFocusCapture: () => (r.current = !0), onBlurCapture: () => (r.current = !1) }
  )
}
function Er() {
  let e = new CustomEvent(gr)
  document.dispatchEvent(e)
}
function Dr(e, t, n, { discrete: r }) {
  let i = n.originalEvent.target,
    a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n })
  ;(t && i.addEventListener(e, t, { once: !0 }), r ? fr(i, a) : i.dispatchEvent(a))
}
var Or = xr,
  kr = Cr,
  Ar = globalThis?.document ? u.useLayoutEffect : () => {},
  jr = `Portal`,
  Mr = u.forwardRef((e, t) => {
    let { container: n, ...r } = e,
      [i, a] = u.useState(!1)
    Ar(() => a(!0), [])
    let o = n || (i && globalThis?.document?.body)
    return o ? d.createPortal((0, R.jsx)(z.div, { ...r, ref: t }), o) : null
  })
Mr.displayName = jr
function Nr(e, t) {
  return u.useReducer((e, n) => t[e][n] ?? e, e)
}
var Pr = (e) => {
  let { present: t, children: n } = e,
    r = Fr(t),
    i = typeof n == `function` ? n({ present: r.isPresent }) : u.Children.only(n),
    a = L(r.ref, Lr(i))
  return typeof n == `function` || r.isPresent ? u.cloneElement(i, { ref: a }) : null
}
Pr.displayName = `Presence`
function Fr(e) {
  let [t, n] = u.useState(),
    r = u.useRef(null),
    i = u.useRef(e),
    a = u.useRef(`none`),
    [o, s] = Nr(e ? `mounted` : `unmounted`, {
      mounted: { UNMOUNT: `unmounted`, ANIMATION_OUT: `unmountSuspended` },
      unmountSuspended: { MOUNT: `mounted`, ANIMATION_END: `unmounted` },
      unmounted: { MOUNT: `mounted` },
    })
  return (
    u.useEffect(() => {
      let e = Ir(r.current)
      a.current = o === `mounted` ? e : `none`
    }, [o]),
    Ar(() => {
      let t = r.current,
        n = i.current
      if (n !== e) {
        let r = a.current,
          o = Ir(t)
        ;(e
          ? s(`MOUNT`)
          : o === `none` || t?.display === `none`
            ? s(`UNMOUNT`)
            : s(n && r !== o ? `ANIMATION_OUT` : `UNMOUNT`),
          (i.current = e))
      }
    }, [e, s]),
    Ar(() => {
      if (t) {
        let e,
          n = t.ownerDocument.defaultView ?? window,
          o = (a) => {
            let o = Ir(r.current).includes(CSS.escape(a.animationName))
            if (a.target === t && o && (s(`ANIMATION_END`), !i.current)) {
              let r = t.style.animationFillMode
              ;((t.style.animationFillMode = `forwards`),
                (e = n.setTimeout(() => {
                  t.style.animationFillMode === `forwards` && (t.style.animationFillMode = r)
                })))
            }
          },
          c = (e) => {
            e.target === t && (a.current = Ir(r.current))
          }
        return (
          t.addEventListener(`animationstart`, c),
          t.addEventListener(`animationcancel`, o),
          t.addEventListener(`animationend`, o),
          () => {
            ;(n.clearTimeout(e),
              t.removeEventListener(`animationstart`, c),
              t.removeEventListener(`animationcancel`, o),
              t.removeEventListener(`animationend`, o))
          }
        )
      } else s(`ANIMATION_END`)
    }, [t, s]),
    {
      isPresent: [`mounted`, `unmountSuspended`].includes(o),
      ref: u.useCallback((e) => {
        ;((r.current = e ? getComputedStyle(e) : null), n(e))
      }, []),
    }
  )
}
function Ir(e) {
  return e?.animationName || `none`
}
function Lr(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref)
}
var Rr = u.useInsertionEffect || Ar
function zr({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
  let [i, a, o] = Br({ defaultProp: t, onChange: n }),
    s = e !== void 0,
    c = s ? e : i
  {
    let t = u.useRef(e !== void 0)
    u.useEffect(() => {
      let e = t.current
      ;(e !== s &&
        console.warn(
          `${r} is changing from ${e ? `controlled` : `uncontrolled`} to ${s ? `controlled` : `uncontrolled`}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (t.current = s))
    }, [s, r])
  }
  return [
    c,
    u.useCallback(
      (t) => {
        if (s) {
          let n = Vr(t) ? t(e) : t
          n !== e && o.current?.(n)
        } else a(t)
      },
      [s, e, a, o],
    ),
  ]
}
function Br({ defaultProp: e, onChange: t }) {
  let [n, r] = u.useState(e),
    i = u.useRef(n),
    a = u.useRef(t)
  return (
    Rr(() => {
      a.current = t
    }, [t]),
    u.useEffect(() => {
      i.current !== n && (a.current?.(n), (i.current = n))
    }, [n, i]),
    [n, r, a]
  )
}
function Vr(e) {
  return typeof e == `function`
}
var Hr = Object.freeze({
    position: `absolute`,
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: `hidden`,
    clip: `rect(0, 0, 0, 0)`,
    whiteSpace: `nowrap`,
    wordWrap: `normal`,
  }),
  Ur = `VisuallyHidden`,
  Wr = u.forwardRef((e, t) => (0, R.jsx)(z.span, { ...e, ref: t, style: { ...Hr, ...e.style } }))
Wr.displayName = Ur
var Gr = Wr,
  Kr = `ToastProvider`,
  [qr, Jr, Yr] = dr(`Toast`),
  [Xr, Zr] = nr(`Toast`, [Yr]),
  [Qr, $r] = Xr(Kr),
  ei = (e) => {
    let {
        __scopeToast: t,
        label: n = `Notification`,
        duration: r = 5e3,
        swipeDirection: i = `right`,
        swipeThreshold: a = 50,
        children: o,
      } = e,
      [s, c] = u.useState(null),
      [l, d] = u.useState(0),
      f = u.useRef(!1),
      p = u.useRef(!1)
    return (
      n.trim() ||
        console.error(
          `Invalid prop \`label\` supplied to \`${Kr}\`. Expected non-empty \`string\`.`,
        ),
      (0, R.jsx)(qr.Provider, {
        scope: t,
        children: (0, R.jsx)(Qr, {
          scope: t,
          label: n,
          duration: r,
          swipeDirection: i,
          swipeThreshold: a,
          toastCount: l,
          viewport: s,
          onViewportChange: c,
          onToastAdd: u.useCallback(() => d((e) => e + 1), []),
          onToastRemove: u.useCallback(() => d((e) => e - 1), []),
          isFocusedToastEscapeKeyDownRef: f,
          isClosePausedRef: p,
          children: o,
        }),
      })
    )
  }
ei.displayName = Kr
var ti = `ToastViewport`,
  ni = [`F8`],
  ri = `toast.viewportPause`,
  ii = `toast.viewportResume`,
  ai = u.forwardRef((e, t) => {
    let { __scopeToast: n, hotkey: r = ni, label: i = `Notifications ({hotkey})`, ...a } = e,
      o = $r(ti, n),
      s = Jr(n),
      c = u.useRef(null),
      l = u.useRef(null),
      d = u.useRef(null),
      f = u.useRef(null),
      p = L(t, f, o.onViewportChange),
      m = r.join(`+`).replace(/Key/g, ``).replace(/Digit/g, ``),
      h = o.toastCount > 0
    ;(u.useEffect(() => {
      let e = (e) => {
        r.length !== 0 && r.every((t) => e[t] || e.code === t) && f.current?.focus()
      }
      return (
        document.addEventListener(`keydown`, e), () => document.removeEventListener(`keydown`, e)
      )
    }, [r]),
      u.useEffect(() => {
        let e = c.current,
          t = f.current
        if (h && e && t) {
          let n = () => {
              if (!o.isClosePausedRef.current) {
                let e = new CustomEvent(ri)
                ;(t.dispatchEvent(e), (o.isClosePausedRef.current = !0))
              }
            },
            r = () => {
              if (o.isClosePausedRef.current) {
                let e = new CustomEvent(ii)
                ;(t.dispatchEvent(e), (o.isClosePausedRef.current = !1))
              }
            },
            i = (t) => {
              e.contains(t.relatedTarget) || r()
            },
            a = () => {
              e.contains(document.activeElement) || r()
            }
          return (
            e.addEventListener(`focusin`, n),
            e.addEventListener(`focusout`, i),
            e.addEventListener(`pointermove`, n),
            e.addEventListener(`pointerleave`, a),
            window.addEventListener(`blur`, n),
            window.addEventListener(`focus`, r),
            () => {
              ;(e.removeEventListener(`focusin`, n),
                e.removeEventListener(`focusout`, i),
                e.removeEventListener(`pointermove`, n),
                e.removeEventListener(`pointerleave`, a),
                window.removeEventListener(`blur`, n),
                window.removeEventListener(`focus`, r))
            }
          )
        }
      }, [h, o.isClosePausedRef]))
    let g = u.useCallback(
      ({ tabbingDirection: e }) => {
        let t = s().map((t) => {
          let n = t.ref.current,
            r = [n, ...Mi(n)]
          return e === `forwards` ? r : r.reverse()
        })
        return (e === `forwards` ? t.reverse() : t).flat()
      },
      [s],
    )
    return (
      u.useEffect(() => {
        let e = f.current
        if (e) {
          let t = (t) => {
            let n = t.altKey || t.ctrlKey || t.metaKey
            if (t.key === `Tab` && !n) {
              let n = document.activeElement,
                r = t.shiftKey
              if (t.target === e && r) {
                l.current?.focus()
                return
              }
              let i = g({ tabbingDirection: r ? `backwards` : `forwards` }),
                a = i.findIndex((e) => e === n)
              B(i.slice(a + 1)) ? t.preventDefault() : r ? l.current?.focus() : d.current?.focus()
            }
          }
          return (e.addEventListener(`keydown`, t), () => e.removeEventListener(`keydown`, t))
        }
      }, [s, g]),
      (0, R.jsxs)(kr, {
        ref: c,
        role: `region`,
        'aria-label': i.replace(`{hotkey}`, m),
        tabIndex: -1,
        style: { pointerEvents: h ? void 0 : `none` },
        children: [
          h &&
            (0, R.jsx)(si, {
              ref: l,
              onFocusFromOutsideViewport: () => {
                B(g({ tabbingDirection: `forwards` }))
              },
            }),
          (0, R.jsx)(qr.Slot, {
            scope: n,
            children: (0, R.jsx)(z.ol, { tabIndex: -1, ...a, ref: p }),
          }),
          h &&
            (0, R.jsx)(si, {
              ref: d,
              onFocusFromOutsideViewport: () => {
                B(g({ tabbingDirection: `backwards` }))
              },
            }),
        ],
      })
    )
  })
ai.displayName = ti
var oi = `ToastFocusProxy`,
  si = u.forwardRef((e, t) => {
    let { __scopeToast: n, onFocusFromOutsideViewport: r, ...i } = e,
      a = $r(oi, n)
    return (0, R.jsx)(Wr, {
      tabIndex: 0,
      ...i,
      ref: t,
      style: { position: `fixed` },
      onFocus: (e) => {
        let t = e.relatedTarget
        a.viewport?.contains(t) || r()
      },
    })
  })
si.displayName = oi
var ci = `Toast`,
  li = `toast.swipeStart`,
  ui = `toast.swipeMove`,
  di = `toast.swipeCancel`,
  fi = `toast.swipeEnd`,
  pi = u.forwardRef((e, t) => {
    let { forceMount: n, open: r, defaultOpen: i, onOpenChange: a, ...o } = e,
      [s, c] = zr({ prop: r, defaultProp: i ?? !0, onChange: a, caller: ci })
    return (0, R.jsx)(Pr, {
      present: n || s,
      children: (0, R.jsx)(gi, {
        open: s,
        ...o,
        ref: t,
        onClose: () => c(!1),
        onPause: pr(e.onPause),
        onResume: pr(e.onResume),
        onSwipeStart: I(e.onSwipeStart, (e) => {
          e.currentTarget.setAttribute(`data-swipe`, `start`)
        }),
        onSwipeMove: I(e.onSwipeMove, (e) => {
          let { x: t, y: n } = e.detail.delta
          ;(e.currentTarget.setAttribute(`data-swipe`, `move`),
            e.currentTarget.style.setProperty(`--radix-toast-swipe-move-x`, `${t}px`),
            e.currentTarget.style.setProperty(`--radix-toast-swipe-move-y`, `${n}px`))
        }),
        onSwipeCancel: I(e.onSwipeCancel, (e) => {
          ;(e.currentTarget.setAttribute(`data-swipe`, `cancel`),
            e.currentTarget.style.removeProperty(`--radix-toast-swipe-move-x`),
            e.currentTarget.style.removeProperty(`--radix-toast-swipe-move-y`),
            e.currentTarget.style.removeProperty(`--radix-toast-swipe-end-x`),
            e.currentTarget.style.removeProperty(`--radix-toast-swipe-end-y`))
        }),
        onSwipeEnd: I(e.onSwipeEnd, (e) => {
          let { x: t, y: n } = e.detail.delta
          ;(e.currentTarget.setAttribute(`data-swipe`, `end`),
            e.currentTarget.style.removeProperty(`--radix-toast-swipe-move-x`),
            e.currentTarget.style.removeProperty(`--radix-toast-swipe-move-y`),
            e.currentTarget.style.setProperty(`--radix-toast-swipe-end-x`, `${t}px`),
            e.currentTarget.style.setProperty(`--radix-toast-swipe-end-y`, `${n}px`),
            c(!1))
        }),
      }),
    })
  })
pi.displayName = ci
var [mi, hi] = Xr(ci, { onClose() {} }),
  gi = u.forwardRef((e, t) => {
    let {
        __scopeToast: n,
        type: r = `foreground`,
        duration: i,
        open: a,
        onClose: o,
        onEscapeKeyDown: s,
        onPause: c,
        onResume: l,
        onSwipeStart: f,
        onSwipeMove: p,
        onSwipeCancel: m,
        onSwipeEnd: h,
        ...g
      } = e,
      _ = $r(ci, n),
      [v, y] = u.useState(null),
      b = L(t, (e) => y(e)),
      x = u.useRef(null),
      S = u.useRef(null),
      C = i || _.duration,
      w = u.useRef(0),
      T = u.useRef(C),
      E = u.useRef(0),
      { onToastAdd: D, onToastRemove: O } = _,
      k = pr(() => {
        ;(v?.contains(document.activeElement) && _.viewport?.focus(), o())
      }),
      A = u.useCallback(
        (e) => {
          !e ||
            e === 1 / 0 ||
            (window.clearTimeout(E.current),
            (w.current = new Date().getTime()),
            (E.current = window.setTimeout(k, e)))
        },
        [k],
      )
    ;(u.useEffect(() => {
      let e = _.viewport
      if (e) {
        let t = () => {
            ;(A(T.current), l?.())
          },
          n = () => {
            let e = new Date().getTime() - w.current
            ;((T.current -= e), window.clearTimeout(E.current), c?.())
          }
        return (
          e.addEventListener(ri, n),
          e.addEventListener(ii, t),
          () => {
            ;(e.removeEventListener(ri, n), e.removeEventListener(ii, t))
          }
        )
      }
    }, [_.viewport, C, c, l, A]),
      u.useEffect(() => {
        a && !_.isClosePausedRef.current && A(C)
      }, [a, C, _.isClosePausedRef, A]),
      u.useEffect(() => (D(), () => O()), [D, O]))
    let j = u.useMemo(() => (v ? Di(v) : null), [v])
    return _.viewport
      ? (0, R.jsxs)(R.Fragment, {
          children: [
            j &&
              (0, R.jsx)(_i, {
                __scopeToast: n,
                role: `status`,
                'aria-live': r === `foreground` ? `assertive` : `polite`,
                children: j,
              }),
            (0, R.jsx)(mi, {
              scope: n,
              onClose: k,
              children: d.createPortal(
                (0, R.jsx)(qr.ItemSlot, {
                  scope: n,
                  children: (0, R.jsx)(Or, {
                    asChild: !0,
                    onEscapeKeyDown: I(s, () => {
                      ;(_.isFocusedToastEscapeKeyDownRef.current || k(),
                        (_.isFocusedToastEscapeKeyDownRef.current = !1))
                    }),
                    children: (0, R.jsx)(z.li, {
                      tabIndex: 0,
                      'data-state': a ? `open` : `closed`,
                      'data-swipe-direction': _.swipeDirection,
                      ...g,
                      ref: b,
                      style: { userSelect: `none`, touchAction: `none`, ...e.style },
                      onKeyDown: I(e.onKeyDown, (e) => {
                        e.key === `Escape` &&
                          (s?.(e.nativeEvent),
                          e.nativeEvent.defaultPrevented ||
                            ((_.isFocusedToastEscapeKeyDownRef.current = !0), k()))
                      }),
                      onPointerDown: I(e.onPointerDown, (e) => {
                        e.button === 0 && (x.current = { x: e.clientX, y: e.clientY })
                      }),
                      onPointerMove: I(e.onPointerMove, (e) => {
                        if (!x.current) return
                        let t = e.clientX - x.current.x,
                          n = e.clientY - x.current.y,
                          r = !!S.current,
                          i = [`left`, `right`].includes(_.swipeDirection),
                          a = [`left`, `up`].includes(_.swipeDirection) ? Math.min : Math.max,
                          o = i ? a(0, t) : 0,
                          s = i ? 0 : a(0, n),
                          c = e.pointerType === `touch` ? 10 : 2,
                          l = { x: o, y: s },
                          u = { originalEvent: e, delta: l }
                        r
                          ? ((S.current = l), Oi(ui, p, u, { discrete: !1 }))
                          : ki(l, _.swipeDirection, c)
                            ? ((S.current = l),
                              Oi(li, f, u, { discrete: !1 }),
                              e.target.setPointerCapture(e.pointerId))
                            : (Math.abs(t) > c || Math.abs(n) > c) && (x.current = null)
                      }),
                      onPointerUp: I(e.onPointerUp, (e) => {
                        let t = S.current,
                          n = e.target
                        if (
                          (n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId),
                          (S.current = null),
                          (x.current = null),
                          t)
                        ) {
                          let n = e.currentTarget,
                            r = { originalEvent: e, delta: t }
                          ;(ki(t, _.swipeDirection, _.swipeThreshold)
                            ? Oi(fi, h, r, { discrete: !0 })
                            : Oi(di, m, r, { discrete: !0 }),
                            n.addEventListener(`click`, (e) => e.preventDefault(), { once: !0 }))
                        }
                      }),
                    }),
                  }),
                }),
                _.viewport,
              ),
            }),
          ],
        })
      : null
  }),
  _i = (e) => {
    let { __scopeToast: t, children: n, ...r } = e,
      i = $r(ci, t),
      [a, o] = u.useState(!1),
      [s, c] = u.useState(!1)
    return (
      Ai(() => o(!0)),
      u.useEffect(() => {
        let e = window.setTimeout(() => c(!0), 1e3)
        return () => window.clearTimeout(e)
      }, []),
      s
        ? null
        : (0, R.jsx)(Mr, {
            asChild: !0,
            children: (0, R.jsx)(Wr, {
              ...r,
              children: a && (0, R.jsxs)(R.Fragment, { children: [i.label, ` `, n] }),
            }),
          })
    )
  },
  vi = `ToastTitle`,
  yi = u.forwardRef((e, t) => {
    let { __scopeToast: n, ...r } = e
    return (0, R.jsx)(z.div, { ...r, ref: t })
  })
yi.displayName = vi
var bi = `ToastDescription`,
  xi = u.forwardRef((e, t) => {
    let { __scopeToast: n, ...r } = e
    return (0, R.jsx)(z.div, { ...r, ref: t })
  })
xi.displayName = bi
var Si = `ToastAction`,
  Ci = u.forwardRef((e, t) => {
    let { altText: n, ...r } = e
    return n.trim()
      ? (0, R.jsx)(Ei, { altText: n, asChild: !0, children: (0, R.jsx)(Ti, { ...r, ref: t }) })
      : (console.error(
          `Invalid prop \`altText\` supplied to \`${Si}\`. Expected non-empty \`string\`.`,
        ),
        null)
  })
Ci.displayName = Si
var wi = `ToastClose`,
  Ti = u.forwardRef((e, t) => {
    let { __scopeToast: n, ...r } = e,
      i = hi(wi, n)
    return (0, R.jsx)(Ei, {
      asChild: !0,
      children: (0, R.jsx)(z.button, {
        type: `button`,
        ...r,
        ref: t,
        onClick: I(e.onClick, i.onClose),
      }),
    })
  })
Ti.displayName = wi
var Ei = u.forwardRef((e, t) => {
  let { __scopeToast: n, altText: r, ...i } = e
  return (0, R.jsx)(z.div, {
    'data-radix-toast-announce-exclude': ``,
    'data-radix-toast-announce-alt': r || void 0,
    ...i,
    ref: t,
  })
})
function Di(e) {
  let t = []
  return (
    Array.from(e.childNodes).forEach((e) => {
      if ((e.nodeType === e.TEXT_NODE && e.textContent && t.push(e.textContent), ji(e))) {
        let n = e.ariaHidden || e.hidden || e.style.display === `none`,
          r = e.dataset.radixToastAnnounceExclude === ``
        if (!n)
          if (r) {
            let n = e.dataset.radixToastAnnounceAlt
            n && t.push(n)
          } else t.push(...Di(e))
      }
    }),
    t
  )
}
function Oi(e, t, n, { discrete: r }) {
  let i = n.originalEvent.currentTarget,
    a = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: n })
  ;(t && i.addEventListener(e, t, { once: !0 }), r ? fr(i, a) : i.dispatchEvent(a))
}
var ki = (e, t, n = 0) => {
  let r = Math.abs(e.x),
    i = Math.abs(e.y),
    a = r > i
  return t === `left` || t === `right` ? a && r > n : !a && i > n
}
function Ai(e = () => {}) {
  let t = pr(e)
  Ar(() => {
    let e = 0,
      n = 0
    return (
      (e = window.requestAnimationFrame(() => (n = window.requestAnimationFrame(t)))),
      () => {
        ;(window.cancelAnimationFrame(e), window.cancelAnimationFrame(n))
      }
    )
  }, [t])
}
function ji(e) {
  return e.nodeType === e.ELEMENT_NODE
}
function Mi(e) {
  let t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (e) => {
        let t = e.tagName === `INPUT` && e.type === `hidden`
        return e.disabled || e.hidden || t
          ? NodeFilter.FILTER_SKIP
          : e.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP
      },
    })
  for (; n.nextNode(); ) t.push(n.currentNode)
  return t
}
function B(e) {
  let t = document.activeElement
  return e.some((e) => (e === t ? !0 : (e.focus(), document.activeElement !== t)))
}
var V = ei,
  Ni = ai,
  Pi = pi,
  Fi = yi,
  Ii = xi,
  Li = Ci,
  Ri = Ti
function zi(e) {
  var t,
    n,
    r = ``
  if (typeof e == `string` || typeof e == `number`) r += e
  else if (typeof e == `object`)
    if (Array.isArray(e)) {
      var i = e.length
      for (t = 0; t < i; t++) e[t] && (n = zi(e[t])) && (r && (r += ` `), (r += n))
    } else for (n in e) e[n] && (r && (r += ` `), (r += n))
  return r
}
function Bi() {
  for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++)
    (e = arguments[n]) && (t = zi(e)) && (r && (r += ` `), (r += t))
  return r
}
var Vi = (e) => (typeof e == `boolean` ? `${e}` : e === 0 ? `0` : e),
  Hi = Bi,
  Ui = (e, t) => (n) => {
    if (t?.variants == null) return Hi(e, n?.class, n?.className)
    let { variants: r, defaultVariants: i } = t,
      a = Object.keys(r).map((e) => {
        let t = n?.[e],
          a = i?.[e]
        if (t === null) return null
        let o = Vi(t) || Vi(a)
        return r[e][o]
      }),
      o =
        n &&
        Object.entries(n).reduce((e, t) => {
          let [n, r] = t
          return (r === void 0 || (e[n] = r), e)
        }, {})
    return Hi(
      e,
      a,
      t?.compoundVariants?.reduce((e, t) => {
        let { class: n, className: r, ...a } = t
        return Object.entries(a).every((e) => {
          let [t, n] = e
          return Array.isArray(n) ? n.includes({ ...i, ...o }[t]) : { ...i, ...o }[t] === n
        })
          ? [...e, n, r]
          : e
      }, []),
      n?.class,
      n?.className,
    )
  },
  Wi = (...e) =>
    e
      .filter((e, t, n) => !!e && e.trim() !== `` && n.indexOf(e) === t)
      .join(` `)
      .trim(),
  Gi = (e) => e.replace(/([a-z0-9])([A-Z])/g, `$1-$2`).toLowerCase(),
  Ki = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => (n ? n.toUpperCase() : t.toLowerCase())),
  qi = (e) => {
    let t = Ki(e)
    return t.charAt(0).toUpperCase() + t.slice(1)
  },
  Ji = {
    xmlns: `http://www.w3.org/2000/svg`,
    width: 24,
    height: 24,
    viewBox: `0 0 24 24`,
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 2,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  },
  Yi = (e) => {
    for (let t in e) if (t.startsWith(`aria-`) || t === `role` || t === `title`) return !0
    return !1
  },
  Xi = (0, u.forwardRef)(
    (
      {
        color: e = `currentColor`,
        size: t = 24,
        strokeWidth: n = 2,
        absoluteStrokeWidth: r,
        className: i = ``,
        children: a,
        iconNode: o,
        ...s
      },
      c,
    ) =>
      (0, u.createElement)(
        `svg`,
        {
          ref: c,
          ...Ji,
          width: t,
          height: t,
          stroke: e,
          strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
          className: Wi(`lucide`, i),
          ...(!a && !Yi(s) && { 'aria-hidden': `true` }),
          ...s,
        },
        [...o.map(([e, t]) => (0, u.createElement)(e, t)), ...(Array.isArray(a) ? a : [a])],
      ),
  ),
  Zi = (e, t) => {
    let n = (0, u.forwardRef)(({ className: n, ...r }, i) =>
      (0, u.createElement)(Xi, {
        ref: i,
        iconNode: t,
        className: Wi(`lucide-${Gi(qi(e))}`, `lucide-${e}`, n),
        ...r,
      }),
    )
    return ((n.displayName = qi(e)), n)
  },
  Qi = Zi(`badge-dollar-sign`, [
    [
      `path`,
      {
        d: `M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z`,
        key: `3c2336`,
      },
    ],
    [`path`, { d: `M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8`, key: `1h4pet` }],
    [`path`, { d: `M12 18V6`, key: `zqpxq5` }],
  ]),
  $i = Zi(`bell`, [
    [`path`, { d: `M10.268 21a2 2 0 0 0 3.464 0`, key: `vwvbt9` }],
    [
      `path`,
      {
        d: `M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326`,
        key: `11g9vi`,
      },
    ],
  ]),
  ea = Zi(`calendar-days`, [
    [`path`, { d: `M8 2v4`, key: `1cmpym` }],
    [`path`, { d: `M16 2v4`, key: `4m81vk` }],
    [`rect`, { width: `18`, height: `18`, x: `3`, y: `4`, rx: `2`, key: `1hopcy` }],
    [`path`, { d: `M3 10h18`, key: `8toen8` }],
    [`path`, { d: `M8 14h.01`, key: `6423bh` }],
    [`path`, { d: `M12 14h.01`, key: `1etili` }],
    [`path`, { d: `M16 14h.01`, key: `1gbofw` }],
    [`path`, { d: `M8 18h.01`, key: `lrp35t` }],
    [`path`, { d: `M12 18h.01`, key: `mhygvu` }],
    [`path`, { d: `M16 18h.01`, key: `kzsmim` }],
  ]),
  ta = Zi(`check`, [[`path`, { d: `M20 6 9 17l-5-5`, key: `1gmf2c` }]]),
  na = Zi(`chevron-down`, [[`path`, { d: `m6 9 6 6 6-6`, key: `qrunsl` }]]),
  ra = Zi(`chevron-right`, [[`path`, { d: `m9 18 6-6-6-6`, key: `mthhwq` }]]),
  ia = Zi(`chevron-up`, [[`path`, { d: `m18 15-6-6-6 6`, key: `153udz` }]]),
  aa = Zi(`circle-user`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`circle`, { cx: `12`, cy: `10`, r: `3`, key: `ilqhr7` }],
    [`path`, { d: `M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662`, key: `154egf` }],
  ]),
  oa = Zi(`circle`, [[`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }]]),
  sa = Zi(`crown`, [
    [
      `path`,
      {
        d: `M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z`,
        key: `1vdc57`,
      },
    ],
    [`path`, { d: `M5 21h14`, key: `11awu3` }],
  ]),
  ca = Zi(`layout-dashboard`, [
    [`rect`, { width: `7`, height: `9`, x: `3`, y: `3`, rx: `1`, key: `10lvy0` }],
    [`rect`, { width: `7`, height: `5`, x: `14`, y: `3`, rx: `1`, key: `16une8` }],
    [`rect`, { width: `7`, height: `9`, x: `14`, y: `12`, rx: `1`, key: `1hutg5` }],
    [`rect`, { width: `7`, height: `5`, x: `3`, y: `16`, rx: `1`, key: `ldoo1y` }],
  ]),
  la = Zi(`log-out`, [
    [`path`, { d: `m16 17 5-5-5-5`, key: `1bji2h` }],
    [`path`, { d: `M21 12H9`, key: `dn1m92` }],
    [`path`, { d: `M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`, key: `1uf3rs` }],
  ]),
  ua = Zi(`menu`, [
    [`path`, { d: `M4 5h16`, key: `1tepv9` }],
    [`path`, { d: `M4 12h16`, key: `1lakjw` }],
    [`path`, { d: `M4 19h16`, key: `1djgab` }],
  ]),
  da = Zi(`package`, [
    [
      `path`,
      {
        d: `M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z`,
        key: `1a0edw`,
      },
    ],
    [`path`, { d: `M12 22V12`, key: `d0xqtd` }],
    [`polyline`, { points: `3.29 7 12 12 20.71 7`, key: `ousv84` }],
    [`path`, { d: `m7.5 4.27 9 5.15`, key: `1c824w` }],
  ]),
  fa = Zi(`panel-left`, [
    [`rect`, { width: `18`, height: `18`, x: `3`, y: `3`, rx: `2`, key: `afitv7` }],
    [`path`, { d: `M9 3v18`, key: `fh3hqa` }],
  ]),
  pa = Zi(`search`, [
    [`path`, { d: `m21 21-4.34-4.34`, key: `14j7rj` }],
    [`circle`, { cx: `11`, cy: `11`, r: `8`, key: `4ej97u` }],
  ]),
  ma = Zi(`settings`, [
    [
      `path`,
      {
        d: `M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915`,
        key: `1i5ecw`,
      },
    ],
    [`circle`, { cx: `12`, cy: `12`, r: `3`, key: `1v7zrd` }],
  ]),
  ha = Zi(`shopping-bag`, [
    [`path`, { d: `M16 10a4 4 0 0 1-8 0`, key: `1ltviw` }],
    [`path`, { d: `M3.103 6.034h17.794`, key: `awc11p` }],
    [
      `path`,
      {
        d: `M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z`,
        key: `o988cm`,
      },
    ],
  ]),
  ga = Zi(`truck`, [
    [`path`, { d: `M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2`, key: `wrbu53` }],
    [`path`, { d: `M15 18H9`, key: `1lyqi6` }],
    [
      `path`,
      {
        d: `M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14`,
        key: `lysw3i`,
      },
    ],
    [`circle`, { cx: `17`, cy: `18`, r: `2`, key: `332jqn` }],
    [`circle`, { cx: `7`, cy: `18`, r: `2`, key: `19iecd` }],
  ]),
  _a = Zi(`users`, [
    [`path`, { d: `M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`, key: `1yyitq` }],
    [`path`, { d: `M16 3.128a4 4 0 0 1 0 7.744`, key: `16gr8j` }],
    [`path`, { d: `M22 21v-2a4 4 0 0 0-3-3.87`, key: `kshegd` }],
    [`circle`, { cx: `9`, cy: `7`, r: `4`, key: `nufk8` }],
  ]),
  va = Zi(`wallet`, [
    [
      `path`,
      {
        d: `M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1`,
        key: `18etb6`,
      },
    ],
    [`path`, { d: `M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4`, key: `xoc0q4` }],
  ]),
  ya = Zi(`x`, [
    [`path`, { d: `M18 6 6 18`, key: `1bl5f8` }],
    [`path`, { d: `m6 6 12 12`, key: `d8bk6v` }],
  ]),
  ba = `-`,
  xa = (e) => {
    let t = Ta(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e
    return {
      getClassGroupId: (e) => {
        let n = e.split(ba)
        return (n[0] === `` && n.length !== 1 && n.shift(), Sa(n, t) || wa(e))
      },
      getConflictingClassGroupIds: (e, t) => {
        let i = n[e] || []
        return t && r[e] ? [...i, ...r[e]] : i
      },
    }
  },
  Sa = (e, t) => {
    if (e.length === 0) return t.classGroupId
    let n = e[0],
      r = t.nextPart.get(n),
      i = r ? Sa(e.slice(1), r) : void 0
    if (i) return i
    if (t.validators.length === 0) return
    let a = e.join(ba)
    return t.validators.find(({ validator: e }) => e(a))?.classGroupId
  },
  Ca = /^\[(.+)\]$/,
  wa = (e) => {
    if (Ca.test(e)) {
      let t = Ca.exec(e)[1],
        n = t?.substring(0, t.indexOf(`:`))
      if (n) return `arbitrary..` + n
    }
  },
  Ta = (e) => {
    let { theme: t, prefix: n } = e,
      r = { nextPart: new Map(), validators: [] }
    return (
      ka(Object.entries(e.classGroups), n).forEach(([e, n]) => {
        Ea(n, r, e, t)
      }),
      r
    )
  },
  Ea = (e, t, n, r) => {
    e.forEach((e) => {
      if (typeof e == `string`) {
        let r = e === `` ? t : Da(t, e)
        r.classGroupId = n
        return
      }
      if (typeof e == `function`) {
        if (Oa(e)) {
          Ea(e(r), t, n, r)
          return
        }
        t.validators.push({ validator: e, classGroupId: n })
        return
      }
      Object.entries(e).forEach(([e, i]) => {
        Ea(i, Da(t, e), n, r)
      })
    })
  },
  Da = (e, t) => {
    let n = e
    return (
      t.split(ba).forEach((e) => {
        ;(n.nextPart.has(e) || n.nextPart.set(e, { nextPart: new Map(), validators: [] }),
          (n = n.nextPart.get(e)))
      }),
      n
    )
  },
  Oa = (e) => e.isThemeGetter,
  ka = (e, t) =>
    t
      ? e.map(([e, n]) => [
          e,
          n.map((e) =>
            typeof e == `string`
              ? t + e
              : typeof e == `object`
                ? Object.fromEntries(Object.entries(e).map(([e, n]) => [t + e, n]))
                : e,
          ),
        ])
      : e,
  Aa = (e) => {
    if (e < 1) return { get: () => void 0, set: () => {} }
    let t = 0,
      n = new Map(),
      r = new Map(),
      i = (i, a) => {
        ;(n.set(i, a), t++, t > e && ((t = 0), (r = n), (n = new Map())))
      }
    return {
      get(e) {
        let t = n.get(e)
        if (t !== void 0) return t
        if ((t = r.get(e)) !== void 0) return (i(e, t), t)
      },
      set(e, t) {
        n.has(e) ? n.set(e, t) : i(e, t)
      },
    }
  },
  ja = `!`,
  Ma = (e) => {
    let { separator: t, experimentalParseClassName: n } = e,
      r = t.length === 1,
      i = t[0],
      a = t.length,
      o = (e) => {
        let n = [],
          o = 0,
          s = 0,
          c
        for (let l = 0; l < e.length; l++) {
          let u = e[l]
          if (o === 0) {
            if (u === i && (r || e.slice(l, l + a) === t)) {
              ;(n.push(e.slice(s, l)), (s = l + a))
              continue
            }
            if (u === `/`) {
              c = l
              continue
            }
          }
          u === `[` ? o++ : u === `]` && o--
        }
        let l = n.length === 0 ? e : e.substring(s),
          u = l.startsWith(ja)
        return {
          modifiers: n,
          hasImportantModifier: u,
          baseClassName: u ? l.substring(1) : l,
          maybePostfixModifierPosition: c && c > s ? c - s : void 0,
        }
      }
    return n ? (e) => n({ className: e, parseClassName: o }) : o
  },
  Na = (e) => {
    if (e.length <= 1) return e
    let t = [],
      n = []
    return (
      e.forEach((e) => {
        e[0] === `[` ? (t.push(...n.sort(), e), (n = [])) : n.push(e)
      }),
      t.push(...n.sort()),
      t
    )
  },
  Pa = (e) => ({ cache: Aa(e.cacheSize), parseClassName: Ma(e), ...xa(e) }),
  Fa = /\s+/,
  Ia = (e, t) => {
    let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i } = t,
      a = [],
      o = e.trim().split(Fa),
      s = ``
    for (let e = o.length - 1; e >= 0; --e) {
      let t = o[e],
        {
          modifiers: c,
          hasImportantModifier: l,
          baseClassName: u,
          maybePostfixModifierPosition: d,
        } = n(t),
        f = !!d,
        p = r(f ? u.substring(0, d) : u)
      if (!p) {
        if (!f) {
          s = t + (s.length > 0 ? ` ` + s : s)
          continue
        }
        if (((p = r(u)), !p)) {
          s = t + (s.length > 0 ? ` ` + s : s)
          continue
        }
        f = !1
      }
      let m = Na(c).join(`:`),
        h = l ? m + ja : m,
        g = h + p
      if (a.includes(g)) continue
      a.push(g)
      let _ = i(p, f)
      for (let e = 0; e < _.length; ++e) {
        let t = _[e]
        a.push(h + t)
      }
      s = t + (s.length > 0 ? ` ` + s : s)
    }
    return s
  }
function La() {
  let e = 0,
    t,
    n,
    r = ``
  for (; e < arguments.length; ) (t = arguments[e++]) && (n = Ra(t)) && (r && (r += ` `), (r += n))
  return r
}
var Ra = (e) => {
  if (typeof e == `string`) return e
  let t,
    n = ``
  for (let r = 0; r < e.length; r++) e[r] && (t = Ra(e[r])) && (n && (n += ` `), (n += t))
  return n
}
function za(e, ...t) {
  let n,
    r,
    i,
    a = o
  function o(o) {
    return (
      (n = Pa(t.reduce((e, t) => t(e), e()))), (r = n.cache.get), (i = n.cache.set), (a = s), s(o)
    )
  }
  function s(e) {
    let t = r(e)
    if (t) return t
    let a = Ia(e, n)
    return (i(e, a), a)
  }
  return function () {
    return a(La.apply(null, arguments))
  }
}
var Ba = (e) => {
    let t = (t) => t[e] || []
    return ((t.isThemeGetter = !0), t)
  },
  Va = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  Ha = /^\d+\/\d+$/,
  Ua = new Set([`px`, `full`, `screen`]),
  Wa = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Ga =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Ka = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  qa = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Ja =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Ya = (e) => Za(e) || Ua.has(e) || Ha.test(e),
  Xa = (e) => lo(e, `length`, U),
  Za = (e) => !!e && !Number.isNaN(Number(e)),
  Qa = (e) => lo(e, `number`, Za),
  $a = (e) => !!e && Number.isInteger(Number(e)),
  eo = (e) => e.endsWith(`%`) && Za(e.slice(0, -1)),
  H = (e) => Va.test(e),
  to = (e) => Wa.test(e),
  no = new Set([`length`, `size`, `percentage`]),
  ro = (e) => lo(e, no, W),
  io = (e) => lo(e, `position`, W),
  ao = new Set([`image`, `url`]),
  oo = (e) => lo(e, ao, fo),
  so = (e) => lo(e, ``, uo),
  co = () => !0,
  lo = (e, t, n) => {
    let r = Va.exec(e)
    return r ? (r[1] ? (typeof t == `string` ? r[1] === t : t.has(r[1])) : n(r[2])) : !1
  },
  U = (e) => Ga.test(e) && !Ka.test(e),
  W = () => !1,
  uo = (e) => qa.test(e),
  fo = (e) => Ja.test(e),
  po = za(() => {
    let e = Ba(`colors`),
      t = Ba(`spacing`),
      n = Ba(`blur`),
      r = Ba(`brightness`),
      i = Ba(`borderColor`),
      a = Ba(`borderRadius`),
      o = Ba(`borderSpacing`),
      s = Ba(`borderWidth`),
      c = Ba(`contrast`),
      l = Ba(`grayscale`),
      u = Ba(`hueRotate`),
      d = Ba(`invert`),
      f = Ba(`gap`),
      p = Ba(`gradientColorStops`),
      m = Ba(`gradientColorStopPositions`),
      h = Ba(`inset`),
      g = Ba(`margin`),
      _ = Ba(`opacity`),
      v = Ba(`padding`),
      y = Ba(`saturate`),
      b = Ba(`scale`),
      x = Ba(`sepia`),
      S = Ba(`skew`),
      C = Ba(`space`),
      w = Ba(`translate`),
      T = () => [`auto`, `contain`, `none`],
      E = () => [`auto`, `hidden`, `clip`, `visible`, `scroll`],
      D = () => [`auto`, H, t],
      O = () => [H, t],
      k = () => [``, Ya, Xa],
      A = () => [`auto`, Za, H],
      j = () => [
        `bottom`,
        `center`,
        `left`,
        `left-bottom`,
        `left-top`,
        `right`,
        `right-bottom`,
        `right-top`,
        `top`,
      ],
      ee = () => [`solid`, `dashed`, `dotted`, `double`, `none`],
      te = () => [
        `normal`,
        `multiply`,
        `screen`,
        `overlay`,
        `darken`,
        `lighten`,
        `color-dodge`,
        `color-burn`,
        `hard-light`,
        `soft-light`,
        `difference`,
        `exclusion`,
        `hue`,
        `saturation`,
        `color`,
        `luminosity`,
      ],
      ne = () => [`start`, `end`, `center`, `between`, `around`, `evenly`, `stretch`],
      M = () => [``, `0`, H],
      N = () => [`auto`, `avoid`, `all`, `avoid-page`, `page`, `left`, `right`, `column`],
      P = () => [Za, H]
    return {
      cacheSize: 500,
      separator: `:`,
      theme: {
        colors: [co],
        spacing: [Ya, Xa],
        blur: [`none`, ``, to, H],
        brightness: P(),
        borderColor: [e],
        borderRadius: [`none`, ``, `full`, to, H],
        borderSpacing: O(),
        borderWidth: k(),
        contrast: P(),
        grayscale: M(),
        hueRotate: P(),
        invert: M(),
        gap: O(),
        gradientColorStops: [e],
        gradientColorStopPositions: [eo, Xa],
        inset: D(),
        margin: D(),
        opacity: P(),
        padding: O(),
        saturate: P(),
        scale: P(),
        sepia: M(),
        skew: P(),
        space: O(),
        translate: O(),
      },
      classGroups: {
        aspect: [{ aspect: [`auto`, `square`, `video`, H] }],
        container: [`container`],
        columns: [{ columns: [to] }],
        'break-after': [{ 'break-after': N() }],
        'break-before': [{ 'break-before': N() }],
        'break-inside': [{ 'break-inside': [`auto`, `avoid`, `avoid-page`, `avoid-column`] }],
        'box-decoration': [{ 'box-decoration': [`slice`, `clone`] }],
        box: [{ box: [`border`, `content`] }],
        display: [
          `block`,
          `inline-block`,
          `inline`,
          `flex`,
          `inline-flex`,
          `table`,
          `inline-table`,
          `table-caption`,
          `table-cell`,
          `table-column`,
          `table-column-group`,
          `table-footer-group`,
          `table-header-group`,
          `table-row-group`,
          `table-row`,
          `flow-root`,
          `grid`,
          `inline-grid`,
          `contents`,
          `list-item`,
          `hidden`,
        ],
        float: [{ float: [`right`, `left`, `none`, `start`, `end`] }],
        clear: [{ clear: [`left`, `right`, `both`, `none`, `start`, `end`] }],
        isolation: [`isolate`, `isolation-auto`],
        'object-fit': [{ object: [`contain`, `cover`, `fill`, `none`, `scale-down`] }],
        'object-position': [{ object: [...j(), H] }],
        overflow: [{ overflow: E() }],
        'overflow-x': [{ 'overflow-x': E() }],
        'overflow-y': [{ 'overflow-y': E() }],
        overscroll: [{ overscroll: T() }],
        'overscroll-x': [{ 'overscroll-x': T() }],
        'overscroll-y': [{ 'overscroll-y': T() }],
        position: [`static`, `fixed`, `absolute`, `relative`, `sticky`],
        inset: [{ inset: [h] }],
        'inset-x': [{ 'inset-x': [h] }],
        'inset-y': [{ 'inset-y': [h] }],
        start: [{ start: [h] }],
        end: [{ end: [h] }],
        top: [{ top: [h] }],
        right: [{ right: [h] }],
        bottom: [{ bottom: [h] }],
        left: [{ left: [h] }],
        visibility: [`visible`, `invisible`, `collapse`],
        z: [{ z: [`auto`, $a, H] }],
        basis: [{ basis: D() }],
        'flex-direction': [{ flex: [`row`, `row-reverse`, `col`, `col-reverse`] }],
        'flex-wrap': [{ flex: [`wrap`, `wrap-reverse`, `nowrap`] }],
        flex: [{ flex: [`1`, `auto`, `initial`, `none`, H] }],
        grow: [{ grow: M() }],
        shrink: [{ shrink: M() }],
        order: [{ order: [`first`, `last`, `none`, $a, H] }],
        'grid-cols': [{ 'grid-cols': [co] }],
        'col-start-end': [{ col: [`auto`, { span: [`full`, $a, H] }, H] }],
        'col-start': [{ 'col-start': A() }],
        'col-end': [{ 'col-end': A() }],
        'grid-rows': [{ 'grid-rows': [co] }],
        'row-start-end': [{ row: [`auto`, { span: [$a, H] }, H] }],
        'row-start': [{ 'row-start': A() }],
        'row-end': [{ 'row-end': A() }],
        'grid-flow': [{ 'grid-flow': [`row`, `col`, `dense`, `row-dense`, `col-dense`] }],
        'auto-cols': [{ 'auto-cols': [`auto`, `min`, `max`, `fr`, H] }],
        'auto-rows': [{ 'auto-rows': [`auto`, `min`, `max`, `fr`, H] }],
        gap: [{ gap: [f] }],
        'gap-x': [{ 'gap-x': [f] }],
        'gap-y': [{ 'gap-y': [f] }],
        'justify-content': [{ justify: [`normal`, ...ne()] }],
        'justify-items': [{ 'justify-items': [`start`, `end`, `center`, `stretch`] }],
        'justify-self': [{ 'justify-self': [`auto`, `start`, `end`, `center`, `stretch`] }],
        'align-content': [{ content: [`normal`, ...ne(), `baseline`] }],
        'align-items': [{ items: [`start`, `end`, `center`, `baseline`, `stretch`] }],
        'align-self': [{ self: [`auto`, `start`, `end`, `center`, `stretch`, `baseline`] }],
        'place-content': [{ 'place-content': [...ne(), `baseline`] }],
        'place-items': [{ 'place-items': [`start`, `end`, `center`, `baseline`, `stretch`] }],
        'place-self': [{ 'place-self': [`auto`, `start`, `end`, `center`, `stretch`] }],
        p: [{ p: [v] }],
        px: [{ px: [v] }],
        py: [{ py: [v] }],
        ps: [{ ps: [v] }],
        pe: [{ pe: [v] }],
        pt: [{ pt: [v] }],
        pr: [{ pr: [v] }],
        pb: [{ pb: [v] }],
        pl: [{ pl: [v] }],
        m: [{ m: [g] }],
        mx: [{ mx: [g] }],
        my: [{ my: [g] }],
        ms: [{ ms: [g] }],
        me: [{ me: [g] }],
        mt: [{ mt: [g] }],
        mr: [{ mr: [g] }],
        mb: [{ mb: [g] }],
        ml: [{ ml: [g] }],
        'space-x': [{ 'space-x': [C] }],
        'space-x-reverse': [`space-x-reverse`],
        'space-y': [{ 'space-y': [C] }],
        'space-y-reverse': [`space-y-reverse`],
        w: [{ w: [`auto`, `min`, `max`, `fit`, `svw`, `lvw`, `dvw`, H, t] }],
        'min-w': [{ 'min-w': [H, t, `min`, `max`, `fit`] }],
        'max-w': [
          { 'max-w': [H, t, `none`, `full`, `min`, `max`, `fit`, `prose`, { screen: [to] }, to] },
        ],
        h: [{ h: [H, t, `auto`, `min`, `max`, `fit`, `svh`, `lvh`, `dvh`] }],
        'min-h': [{ 'min-h': [H, t, `min`, `max`, `fit`, `svh`, `lvh`, `dvh`] }],
        'max-h': [{ 'max-h': [H, t, `min`, `max`, `fit`, `svh`, `lvh`, `dvh`] }],
        size: [{ size: [H, t, `auto`, `min`, `max`, `fit`] }],
        'font-size': [{ text: [`base`, to, Xa] }],
        'font-smoothing': [`antialiased`, `subpixel-antialiased`],
        'font-style': [`italic`, `not-italic`],
        'font-weight': [
          {
            font: [
              `thin`,
              `extralight`,
              `light`,
              `normal`,
              `medium`,
              `semibold`,
              `bold`,
              `extrabold`,
              `black`,
              Qa,
            ],
          },
        ],
        'font-family': [{ font: [co] }],
        'fvn-normal': [`normal-nums`],
        'fvn-ordinal': [`ordinal`],
        'fvn-slashed-zero': [`slashed-zero`],
        'fvn-figure': [`lining-nums`, `oldstyle-nums`],
        'fvn-spacing': [`proportional-nums`, `tabular-nums`],
        'fvn-fraction': [`diagonal-fractions`, `stacked-fractions`],
        tracking: [{ tracking: [`tighter`, `tight`, `normal`, `wide`, `wider`, `widest`, H] }],
        'line-clamp': [{ 'line-clamp': [`none`, Za, Qa] }],
        leading: [{ leading: [`none`, `tight`, `snug`, `normal`, `relaxed`, `loose`, Ya, H] }],
        'list-image': [{ 'list-image': [`none`, H] }],
        'list-style-type': [{ list: [`none`, `disc`, `decimal`, H] }],
        'list-style-position': [{ list: [`inside`, `outside`] }],
        'placeholder-color': [{ placeholder: [e] }],
        'placeholder-opacity': [{ 'placeholder-opacity': [_] }],
        'text-alignment': [{ text: [`left`, `center`, `right`, `justify`, `start`, `end`] }],
        'text-color': [{ text: [e] }],
        'text-opacity': [{ 'text-opacity': [_] }],
        'text-decoration': [`underline`, `overline`, `line-through`, `no-underline`],
        'text-decoration-style': [{ decoration: [...ee(), `wavy`] }],
        'text-decoration-thickness': [{ decoration: [`auto`, `from-font`, Ya, Xa] }],
        'underline-offset': [{ 'underline-offset': [`auto`, Ya, H] }],
        'text-decoration-color': [{ decoration: [e] }],
        'text-transform': [`uppercase`, `lowercase`, `capitalize`, `normal-case`],
        'text-overflow': [`truncate`, `text-ellipsis`, `text-clip`],
        'text-wrap': [{ text: [`wrap`, `nowrap`, `balance`, `pretty`] }],
        indent: [{ indent: O() }],
        'vertical-align': [
          {
            align: [
              `baseline`,
              `top`,
              `middle`,
              `bottom`,
              `text-top`,
              `text-bottom`,
              `sub`,
              `super`,
              H,
            ],
          },
        ],
        whitespace: [
          { whitespace: [`normal`, `nowrap`, `pre`, `pre-line`, `pre-wrap`, `break-spaces`] },
        ],
        break: [{ break: [`normal`, `words`, `all`, `keep`] }],
        hyphens: [{ hyphens: [`none`, `manual`, `auto`] }],
        content: [{ content: [`none`, H] }],
        'bg-attachment': [{ bg: [`fixed`, `local`, `scroll`] }],
        'bg-clip': [{ 'bg-clip': [`border`, `padding`, `content`, `text`] }],
        'bg-opacity': [{ 'bg-opacity': [_] }],
        'bg-origin': [{ 'bg-origin': [`border`, `padding`, `content`] }],
        'bg-position': [{ bg: [...j(), io] }],
        'bg-repeat': [{ bg: [`no-repeat`, { repeat: [``, `x`, `y`, `round`, `space`] }] }],
        'bg-size': [{ bg: [`auto`, `cover`, `contain`, ro] }],
        'bg-image': [
          { bg: [`none`, { 'gradient-to': [`t`, `tr`, `r`, `br`, `b`, `bl`, `l`, `tl`] }, oo] },
        ],
        'bg-color': [{ bg: [e] }],
        'gradient-from-pos': [{ from: [m] }],
        'gradient-via-pos': [{ via: [m] }],
        'gradient-to-pos': [{ to: [m] }],
        'gradient-from': [{ from: [p] }],
        'gradient-via': [{ via: [p] }],
        'gradient-to': [{ to: [p] }],
        rounded: [{ rounded: [a] }],
        'rounded-s': [{ 'rounded-s': [a] }],
        'rounded-e': [{ 'rounded-e': [a] }],
        'rounded-t': [{ 'rounded-t': [a] }],
        'rounded-r': [{ 'rounded-r': [a] }],
        'rounded-b': [{ 'rounded-b': [a] }],
        'rounded-l': [{ 'rounded-l': [a] }],
        'rounded-ss': [{ 'rounded-ss': [a] }],
        'rounded-se': [{ 'rounded-se': [a] }],
        'rounded-ee': [{ 'rounded-ee': [a] }],
        'rounded-es': [{ 'rounded-es': [a] }],
        'rounded-tl': [{ 'rounded-tl': [a] }],
        'rounded-tr': [{ 'rounded-tr': [a] }],
        'rounded-br': [{ 'rounded-br': [a] }],
        'rounded-bl': [{ 'rounded-bl': [a] }],
        'border-w': [{ border: [s] }],
        'border-w-x': [{ 'border-x': [s] }],
        'border-w-y': [{ 'border-y': [s] }],
        'border-w-s': [{ 'border-s': [s] }],
        'border-w-e': [{ 'border-e': [s] }],
        'border-w-t': [{ 'border-t': [s] }],
        'border-w-r': [{ 'border-r': [s] }],
        'border-w-b': [{ 'border-b': [s] }],
        'border-w-l': [{ 'border-l': [s] }],
        'border-opacity': [{ 'border-opacity': [_] }],
        'border-style': [{ border: [...ee(), `hidden`] }],
        'divide-x': [{ 'divide-x': [s] }],
        'divide-x-reverse': [`divide-x-reverse`],
        'divide-y': [{ 'divide-y': [s] }],
        'divide-y-reverse': [`divide-y-reverse`],
        'divide-opacity': [{ 'divide-opacity': [_] }],
        'divide-style': [{ divide: ee() }],
        'border-color': [{ border: [i] }],
        'border-color-x': [{ 'border-x': [i] }],
        'border-color-y': [{ 'border-y': [i] }],
        'border-color-s': [{ 'border-s': [i] }],
        'border-color-e': [{ 'border-e': [i] }],
        'border-color-t': [{ 'border-t': [i] }],
        'border-color-r': [{ 'border-r': [i] }],
        'border-color-b': [{ 'border-b': [i] }],
        'border-color-l': [{ 'border-l': [i] }],
        'divide-color': [{ divide: [i] }],
        'outline-style': [{ outline: [``, ...ee()] }],
        'outline-offset': [{ 'outline-offset': [Ya, H] }],
        'outline-w': [{ outline: [Ya, Xa] }],
        'outline-color': [{ outline: [e] }],
        'ring-w': [{ ring: k() }],
        'ring-w-inset': [`ring-inset`],
        'ring-color': [{ ring: [e] }],
        'ring-opacity': [{ 'ring-opacity': [_] }],
        'ring-offset-w': [{ 'ring-offset': [Ya, Xa] }],
        'ring-offset-color': [{ 'ring-offset': [e] }],
        shadow: [{ shadow: [``, `inner`, `none`, to, so] }],
        'shadow-color': [{ shadow: [co] }],
        opacity: [{ opacity: [_] }],
        'mix-blend': [{ 'mix-blend': [...te(), `plus-lighter`, `plus-darker`] }],
        'bg-blend': [{ 'bg-blend': te() }],
        filter: [{ filter: [``, `none`] }],
        blur: [{ blur: [n] }],
        brightness: [{ brightness: [r] }],
        contrast: [{ contrast: [c] }],
        'drop-shadow': [{ 'drop-shadow': [``, `none`, to, H] }],
        grayscale: [{ grayscale: [l] }],
        'hue-rotate': [{ 'hue-rotate': [u] }],
        invert: [{ invert: [d] }],
        saturate: [{ saturate: [y] }],
        sepia: [{ sepia: [x] }],
        'backdrop-filter': [{ 'backdrop-filter': [``, `none`] }],
        'backdrop-blur': [{ 'backdrop-blur': [n] }],
        'backdrop-brightness': [{ 'backdrop-brightness': [r] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [c] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': [l] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [u] }],
        'backdrop-invert': [{ 'backdrop-invert': [d] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [_] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [y] }],
        'backdrop-sepia': [{ 'backdrop-sepia': [x] }],
        'border-collapse': [{ border: [`collapse`, `separate`] }],
        'border-spacing': [{ 'border-spacing': [o] }],
        'border-spacing-x': [{ 'border-spacing-x': [o] }],
        'border-spacing-y': [{ 'border-spacing-y': [o] }],
        'table-layout': [{ table: [`auto`, `fixed`] }],
        caption: [{ caption: [`top`, `bottom`] }],
        transition: [
          { transition: [`none`, `all`, ``, `colors`, `opacity`, `shadow`, `transform`, H] },
        ],
        duration: [{ duration: P() }],
        ease: [{ ease: [`linear`, `in`, `out`, `in-out`, H] }],
        delay: [{ delay: P() }],
        animate: [{ animate: [`none`, `spin`, `ping`, `pulse`, `bounce`, H] }],
        transform: [{ transform: [``, `gpu`, `none`] }],
        scale: [{ scale: [b] }],
        'scale-x': [{ 'scale-x': [b] }],
        'scale-y': [{ 'scale-y': [b] }],
        rotate: [{ rotate: [$a, H] }],
        'translate-x': [{ 'translate-x': [w] }],
        'translate-y': [{ 'translate-y': [w] }],
        'skew-x': [{ 'skew-x': [S] }],
        'skew-y': [{ 'skew-y': [S] }],
        'transform-origin': [
          {
            origin: [
              `center`,
              `top`,
              `top-right`,
              `right`,
              `bottom-right`,
              `bottom`,
              `bottom-left`,
              `left`,
              `top-left`,
              H,
            ],
          },
        ],
        accent: [{ accent: [`auto`, e] }],
        appearance: [{ appearance: [`none`, `auto`] }],
        cursor: [
          {
            cursor: [
              `auto`,
              `default`,
              `pointer`,
              `wait`,
              `text`,
              `move`,
              `help`,
              `not-allowed`,
              `none`,
              `context-menu`,
              `progress`,
              `cell`,
              `crosshair`,
              `vertical-text`,
              `alias`,
              `copy`,
              `no-drop`,
              `grab`,
              `grabbing`,
              `all-scroll`,
              `col-resize`,
              `row-resize`,
              `n-resize`,
              `e-resize`,
              `s-resize`,
              `w-resize`,
              `ne-resize`,
              `nw-resize`,
              `se-resize`,
              `sw-resize`,
              `ew-resize`,
              `ns-resize`,
              `nesw-resize`,
              `nwse-resize`,
              `zoom-in`,
              `zoom-out`,
              H,
            ],
          },
        ],
        'caret-color': [{ caret: [e] }],
        'pointer-events': [{ 'pointer-events': [`none`, `auto`] }],
        resize: [{ resize: [`none`, `y`, `x`, ``] }],
        'scroll-behavior': [{ scroll: [`auto`, `smooth`] }],
        'scroll-m': [{ 'scroll-m': O() }],
        'scroll-mx': [{ 'scroll-mx': O() }],
        'scroll-my': [{ 'scroll-my': O() }],
        'scroll-ms': [{ 'scroll-ms': O() }],
        'scroll-me': [{ 'scroll-me': O() }],
        'scroll-mt': [{ 'scroll-mt': O() }],
        'scroll-mr': [{ 'scroll-mr': O() }],
        'scroll-mb': [{ 'scroll-mb': O() }],
        'scroll-ml': [{ 'scroll-ml': O() }],
        'scroll-p': [{ 'scroll-p': O() }],
        'scroll-px': [{ 'scroll-px': O() }],
        'scroll-py': [{ 'scroll-py': O() }],
        'scroll-ps': [{ 'scroll-ps': O() }],
        'scroll-pe': [{ 'scroll-pe': O() }],
        'scroll-pt': [{ 'scroll-pt': O() }],
        'scroll-pr': [{ 'scroll-pr': O() }],
        'scroll-pb': [{ 'scroll-pb': O() }],
        'scroll-pl': [{ 'scroll-pl': O() }],
        'snap-align': [{ snap: [`start`, `end`, `center`, `align-none`] }],
        'snap-stop': [{ snap: [`normal`, `always`] }],
        'snap-type': [{ snap: [`none`, `x`, `y`, `both`] }],
        'snap-strictness': [{ snap: [`mandatory`, `proximity`] }],
        touch: [{ touch: [`auto`, `none`, `manipulation`] }],
        'touch-x': [{ 'touch-pan': [`x`, `left`, `right`] }],
        'touch-y': [{ 'touch-pan': [`y`, `up`, `down`] }],
        'touch-pz': [`touch-pinch-zoom`],
        select: [{ select: [`none`, `text`, `all`, `auto`] }],
        'will-change': [{ 'will-change': [`auto`, `scroll`, `contents`, `transform`, H] }],
        fill: [{ fill: [e, `none`] }],
        'stroke-w': [{ stroke: [Ya, Xa, Qa] }],
        stroke: [{ stroke: [e, `none`] }],
        sr: [`sr-only`, `not-sr-only`],
        'forced-color-adjust': [{ 'forced-color-adjust': [`auto`, `none`] }],
      },
      conflictingClassGroups: {
        overflow: [`overflow-x`, `overflow-y`],
        overscroll: [`overscroll-x`, `overscroll-y`],
        inset: [`inset-x`, `inset-y`, `start`, `end`, `top`, `right`, `bottom`, `left`],
        'inset-x': [`right`, `left`],
        'inset-y': [`top`, `bottom`],
        flex: [`basis`, `grow`, `shrink`],
        gap: [`gap-x`, `gap-y`],
        p: [`px`, `py`, `ps`, `pe`, `pt`, `pr`, `pb`, `pl`],
        px: [`pr`, `pl`],
        py: [`pt`, `pb`],
        m: [`mx`, `my`, `ms`, `me`, `mt`, `mr`, `mb`, `ml`],
        mx: [`mr`, `ml`],
        my: [`mt`, `mb`],
        size: [`w`, `h`],
        'font-size': [`leading`],
        'fvn-normal': [
          `fvn-ordinal`,
          `fvn-slashed-zero`,
          `fvn-figure`,
          `fvn-spacing`,
          `fvn-fraction`,
        ],
        'fvn-ordinal': [`fvn-normal`],
        'fvn-slashed-zero': [`fvn-normal`],
        'fvn-figure': [`fvn-normal`],
        'fvn-spacing': [`fvn-normal`],
        'fvn-fraction': [`fvn-normal`],
        'line-clamp': [`display`, `overflow`],
        rounded: [
          `rounded-s`,
          `rounded-e`,
          `rounded-t`,
          `rounded-r`,
          `rounded-b`,
          `rounded-l`,
          `rounded-ss`,
          `rounded-se`,
          `rounded-ee`,
          `rounded-es`,
          `rounded-tl`,
          `rounded-tr`,
          `rounded-br`,
          `rounded-bl`,
        ],
        'rounded-s': [`rounded-ss`, `rounded-es`],
        'rounded-e': [`rounded-se`, `rounded-ee`],
        'rounded-t': [`rounded-tl`, `rounded-tr`],
        'rounded-r': [`rounded-tr`, `rounded-br`],
        'rounded-b': [`rounded-br`, `rounded-bl`],
        'rounded-l': [`rounded-tl`, `rounded-bl`],
        'border-spacing': [`border-spacing-x`, `border-spacing-y`],
        'border-w': [
          `border-w-s`,
          `border-w-e`,
          `border-w-t`,
          `border-w-r`,
          `border-w-b`,
          `border-w-l`,
        ],
        'border-w-x': [`border-w-r`, `border-w-l`],
        'border-w-y': [`border-w-t`, `border-w-b`],
        'border-color': [
          `border-color-s`,
          `border-color-e`,
          `border-color-t`,
          `border-color-r`,
          `border-color-b`,
          `border-color-l`,
        ],
        'border-color-x': [`border-color-r`, `border-color-l`],
        'border-color-y': [`border-color-t`, `border-color-b`],
        'scroll-m': [
          `scroll-mx`,
          `scroll-my`,
          `scroll-ms`,
          `scroll-me`,
          `scroll-mt`,
          `scroll-mr`,
          `scroll-mb`,
          `scroll-ml`,
        ],
        'scroll-mx': [`scroll-mr`, `scroll-ml`],
        'scroll-my': [`scroll-mt`, `scroll-mb`],
        'scroll-p': [
          `scroll-px`,
          `scroll-py`,
          `scroll-ps`,
          `scroll-pe`,
          `scroll-pt`,
          `scroll-pr`,
          `scroll-pb`,
          `scroll-pl`,
        ],
        'scroll-px': [`scroll-pr`, `scroll-pl`],
        'scroll-py': [`scroll-pt`, `scroll-pb`],
        touch: [`touch-x`, `touch-y`, `touch-pz`],
        'touch-x': [`touch`],
        'touch-y': [`touch`],
        'touch-pz': [`touch`],
      },
      conflictingClassGroupModifiers: { 'font-size': [`leading`] },
    }
  })
function G(...e) {
  return po(Bi(e))
}
function mo(e) {
  return e
    .toLowerCase()
    .normalize(`NFD`)
    .replace(/[\u0300-\u036f]/g, ``)
    .trim()
}
function ho(e, t) {
  let n = Object.keys(e).reduce((t, n) => ((t[mo(n)] = e[n]), t), {})
  for (let e of t) if (n[e] !== void 0) return n[e]
  return ``
}
function go(e) {
  if (!e) return ``
  let t = e.replace(/\D/g, ``)
  return t.length <= 11
    ? t.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, `$1.$2.$3-$4`)
    : t.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, `$1.$2.$3/$4-$5`)
}
function _o(e) {
  if (!e) return ``
  let t = e.replace(/\D/g, ``).slice(0, 11)
  return t.length >= 11
    ? `(${t.slice(0, 2)}) ${t.slice(2, 7)}-${t.slice(7)}`
    : t.length >= 7
      ? `(${t.slice(0, 2)}) ${t.slice(2, 6)}-${t.slice(6)}`
      : t.length >= 3
        ? `(${t.slice(0, 2)}) ${t.slice(2)}`
        : t.length > 0
          ? `(${t}`
          : ``
}
function vo(e) {
  if (!e) return `#ffffff`
  let t = e.replace(`#`, ``)
  if (
    t.startsWith(`hsl`) ||
    t.startsWith(`rgb`) ||
    t.startsWith(`var`) ||
    (t.length === 3 &&
      (t = t
        .split(``)
        .map((e) => e + e)
        .join(``)),
    t.length !== 6)
  )
    return `#ffffff`
  let n = parseInt(t.substr(0, 2), 16),
    r = parseInt(t.substr(2, 2), 16),
    i = parseInt(t.substr(4, 2), 16)
  return isNaN(n) || isNaN(r) || isNaN(i)
    ? `#ffffff`
    : (n * 299 + r * 587 + i * 114) / 1e3 >= 128
      ? `#000000`
      : `#ffffff`
}
var yo = V,
  bo = u.forwardRef(({ className: e, ...t }, n) =>
    (0, R.jsx)(Ni, {
      ref: n,
      className: G(
        `fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]`,
        e,
      ),
      ...t,
    }),
  )
bo.displayName = Ni.displayName
var xo = Ui(
    `group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full`,
    {
      variants: {
        variant: {
          default: `border bg-background text-foreground`,
          destructive: `destructive group border-destructive bg-destructive text-destructive-foreground`,
        },
      },
      defaultVariants: { variant: `default` },
    },
  ),
  So = u.forwardRef(({ className: e, variant: t, ...n }, r) =>
    (0, R.jsx)(Pi, { ref: r, className: G(xo({ variant: t }), e), ...n }),
  )
So.displayName = Pi.displayName
var Co = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(Li, {
    ref: n,
    className: G(
      `inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive`,
      e,
    ),
    ...t,
  }),
)
Co.displayName = Li.displayName
var wo = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(Ri, {
    ref: n,
    className: G(
      `absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600`,
      e,
    ),
    'toast-close': ``,
    ...t,
    children: (0, R.jsx)(ya, { className: `h-4 w-4` }),
  }),
)
wo.displayName = Ri.displayName
var To = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(Fi, { ref: n, className: G(`text-sm font-semibold`, e), ...t }),
)
To.displayName = Fi.displayName
var Eo = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(Ii, { ref: n, className: G(`text-sm opacity-90`, e), ...t }),
)
Eo.displayName = Ii.displayName
function Do() {
  let { toasts: e } = Qn()
  return (0, R.jsxs)(yo, {
    children: [
      e.map(function ({ id: e, title: t, description: n, action: r, ...i }) {
        return (0, R.jsxs)(
          So,
          {
            ...i,
            children: [
              (0, R.jsxs)(`div`, {
                className: `grid gap-1`,
                children: [
                  t && (0, R.jsx)(To, { children: t }),
                  n && (0, R.jsx)(Eo, { children: n }),
                ],
              }),
              r,
              (0, R.jsx)(wo, {}),
            ],
          },
          e,
        )
      }),
      (0, R.jsx)(bo, {}),
    ],
  })
}
var Oo = (e, t, n, r, i, a, o, s) => {
    let c = document.documentElement,
      l = [`light`, `dark`]
    function u(t) {
      ;((Array.isArray(e) ? e : [e]).forEach((e) => {
        let n = e === `class`,
          r = n && a ? i.map((e) => a[e] || e) : i
        n ? (c.classList.remove(...r), c.classList.add(a && a[t] ? a[t] : t)) : c.setAttribute(e, t)
      }),
        d(t))
    }
    function d(e) {
      s && l.includes(e) && (c.style.colorScheme = e)
    }
    function f() {
      return window.matchMedia(`(prefers-color-scheme: dark)`).matches ? `dark` : `light`
    }
    if (r) u(r)
    else
      try {
        let e = localStorage.getItem(t) || n
        u(o && e === `system` ? f() : e)
      } catch {}
  },
  ko = u.createContext(void 0),
  Ao = { setTheme: (e) => {}, themes: [] },
  jo = () => u.useContext(ko) ?? Ao
u.memo(
  ({
    forcedTheme: e,
    storageKey: t,
    attribute: n,
    enableSystem: r,
    enableColorScheme: i,
    defaultTheme: a,
    value: o,
    themes: s,
    nonce: c,
    scriptProps: l,
  }) => {
    let d = JSON.stringify([n, t, a, e, s, o, r, i]).slice(1, -1)
    return u.createElement(`script`, {
      ...l,
      suppressHydrationWarning: !0,
      nonce: typeof window > `u` ? c : ``,
      dangerouslySetInnerHTML: { __html: `(${Oo.toString()})(${d})` },
    })
  },
)
function Mo(e) {
  if (!e || typeof document > `u`) return
  let t = document.head || document.getElementsByTagName(`head`)[0],
    n = document.createElement(`style`)
  ;((n.type = `text/css`),
    t.appendChild(n),
    n.styleSheet ? (n.styleSheet.cssText = e) : n.appendChild(document.createTextNode(e)))
}
var No = (e) => {
    switch (e) {
      case `success`:
        return Io
      case `info`:
        return Ro
      case `warning`:
        return Lo
      case `error`:
        return zo
      default:
        return null
    }
  },
  Po = Array(12).fill(0),
  Fo = ({ visible: e, className: t }) =>
    u.createElement(
      `div`,
      { className: [`sonner-loading-wrapper`, t].filter(Boolean).join(` `), 'data-visible': e },
      u.createElement(
        `div`,
        { className: `sonner-spinner` },
        Po.map((e, t) =>
          u.createElement(`div`, { className: `sonner-loading-bar`, key: `spinner-bar-${t}` }),
        ),
      ),
    ),
  Io = u.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 20 20`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
    },
    u.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z`,
      clipRule: `evenodd`,
    }),
  ),
  Lo = u.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 24 24`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
    },
    u.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z`,
      clipRule: `evenodd`,
    }),
  ),
  Ro = u.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 20 20`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
    },
    u.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z`,
      clipRule: `evenodd`,
    }),
  ),
  zo = u.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 20 20`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
    },
    u.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z`,
      clipRule: `evenodd`,
    }),
  ),
  Bo = u.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      width: `12`,
      height: `12`,
      viewBox: `0 0 24 24`,
      fill: `none`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
    },
    u.createElement(`line`, { x1: `18`, y1: `6`, x2: `6`, y2: `18` }),
    u.createElement(`line`, { x1: `6`, y1: `6`, x2: `18`, y2: `18` }),
  ),
  Vo = () => {
    let [e, t] = u.useState(document.hidden)
    return (
      u.useEffect(() => {
        let e = () => {
          t(document.hidden)
        }
        return (
          document.addEventListener(`visibilitychange`, e),
          () => window.removeEventListener(`visibilitychange`, e)
        )
      }, []),
      e
    )
  },
  Ho = 1,
  Uo = new (class {
    constructor() {
      ;((this.subscribe = (e) => (
        this.subscribers.push(e),
        () => {
          let t = this.subscribers.indexOf(e)
          this.subscribers.splice(t, 1)
        }
      )),
        (this.publish = (e) => {
          this.subscribers.forEach((t) => t(e))
        }),
        (this.addToast = (e) => {
          ;(this.publish(e), (this.toasts = [...this.toasts, e]))
        }),
        (this.create = (e) => {
          let { message: t, ...n } = e,
            r = typeof e?.id == `number` || e.id?.length > 0 ? e.id : Ho++,
            i = this.toasts.find((e) => e.id === r),
            a = e.dismissible === void 0 ? !0 : e.dismissible
          return (
            this.dismissedToasts.has(r) && this.dismissedToasts.delete(r),
            i
              ? (this.toasts = this.toasts.map((n) =>
                  n.id === r
                    ? (this.publish({ ...n, ...e, id: r, title: t }),
                      { ...n, ...e, id: r, dismissible: a, title: t })
                    : n,
                ))
              : this.addToast({ title: t, ...n, dismissible: a, id: r }),
            r
          )
        }),
        (this.dismiss = (e) => (
          e
            ? (this.dismissedToasts.add(e),
              requestAnimationFrame(() =>
                this.subscribers.forEach((t) => t({ id: e, dismiss: !0 })),
              ))
            : this.toasts.forEach((e) => {
                this.subscribers.forEach((t) => t({ id: e.id, dismiss: !0 }))
              }),
          e
        )),
        (this.message = (e, t) => this.create({ ...t, message: e })),
        (this.error = (e, t) => this.create({ ...t, message: e, type: `error` })),
        (this.success = (e, t) => this.create({ ...t, type: `success`, message: e })),
        (this.info = (e, t) => this.create({ ...t, type: `info`, message: e })),
        (this.warning = (e, t) => this.create({ ...t, type: `warning`, message: e })),
        (this.loading = (e, t) => this.create({ ...t, type: `loading`, message: e })),
        (this.promise = (e, t) => {
          if (!t) return
          let n
          t.loading !== void 0 &&
            (n = this.create({
              ...t,
              promise: e,
              type: `loading`,
              message: t.loading,
              description: typeof t.description == `function` ? void 0 : t.description,
            }))
          let r = Promise.resolve(e instanceof Function ? e() : e),
            i = n !== void 0,
            a,
            o = r
              .then(async (e) => {
                if (((a = [`resolve`, e]), u.isValidElement(e)))
                  ((i = !1), this.create({ id: n, type: `default`, message: e }))
                else if (Go(e) && !e.ok) {
                  i = !1
                  let r =
                      typeof t.error == `function`
                        ? await t.error(`HTTP error! status: ${e.status}`)
                        : t.error,
                    a =
                      typeof t.description == `function`
                        ? await t.description(`HTTP error! status: ${e.status}`)
                        : t.description,
                    o = typeof r == `object` && !u.isValidElement(r) ? r : { message: r }
                  this.create({ id: n, type: `error`, description: a, ...o })
                } else if (e instanceof Error) {
                  i = !1
                  let r = typeof t.error == `function` ? await t.error(e) : t.error,
                    a = typeof t.description == `function` ? await t.description(e) : t.description,
                    o = typeof r == `object` && !u.isValidElement(r) ? r : { message: r }
                  this.create({ id: n, type: `error`, description: a, ...o })
                } else if (t.success !== void 0) {
                  i = !1
                  let r = typeof t.success == `function` ? await t.success(e) : t.success,
                    a = typeof t.description == `function` ? await t.description(e) : t.description,
                    o = typeof r == `object` && !u.isValidElement(r) ? r : { message: r }
                  this.create({ id: n, type: `success`, description: a, ...o })
                }
              })
              .catch(async (e) => {
                if (((a = [`reject`, e]), t.error !== void 0)) {
                  i = !1
                  let r = typeof t.error == `function` ? await t.error(e) : t.error,
                    a = typeof t.description == `function` ? await t.description(e) : t.description,
                    o = typeof r == `object` && !u.isValidElement(r) ? r : { message: r }
                  this.create({ id: n, type: `error`, description: a, ...o })
                }
              })
              .finally(() => {
                ;(i && (this.dismiss(n), (n = void 0)), t.finally == null || t.finally.call(t))
              }),
            s = () =>
              new Promise((e, t) => o.then(() => (a[0] === `reject` ? t(a[1]) : e(a[1]))).catch(t))
          return typeof n != `string` && typeof n != `number`
            ? { unwrap: s }
            : Object.assign(n, { unwrap: s })
        }),
        (this.custom = (e, t) => {
          let n = t?.id || Ho++
          return (this.create({ jsx: e(n), id: n, ...t }), n)
        }),
        (this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id))),
        (this.subscribers = []),
        (this.toasts = []),
        (this.dismissedToasts = new Set()))
    }
  })(),
  Wo = (e, t) => {
    let n = t?.id || Ho++
    return (Uo.addToast({ title: e, ...t, id: n }), n)
  },
  Go = (e) =>
    e &&
    typeof e == `object` &&
    `ok` in e &&
    typeof e.ok == `boolean` &&
    `status` in e &&
    typeof e.status == `number`,
  Ko = Object.assign(
    Wo,
    {
      success: Uo.success,
      info: Uo.info,
      warning: Uo.warning,
      error: Uo.error,
      custom: Uo.custom,
      message: Uo.message,
      promise: Uo.promise,
      dismiss: Uo.dismiss,
      loading: Uo.loading,
    },
    { getHistory: () => Uo.toasts, getToasts: () => Uo.getActiveToasts() },
  )
Mo(
  `[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}`,
)
function qo(e) {
  return e.label !== void 0
}
var Jo = 3,
  Yo = `24px`,
  Xo = `16px`,
  Zo = 4e3,
  Qo = 356,
  $o = 14,
  es = 45,
  ts = 200
function ns(...e) {
  return e.filter(Boolean).join(` `)
}
function rs(e) {
  let [t, n] = e.split(`-`),
    r = []
  return (t && r.push(t), n && r.push(n), r)
}
var is = (e) => {
  let {
      invert: t,
      toast: n,
      unstyled: r,
      interacting: i,
      setHeights: a,
      visibleToasts: o,
      heights: s,
      index: c,
      toasts: l,
      expanded: d,
      removeToast: f,
      defaultRichColors: p,
      closeButton: m,
      style: h,
      cancelButtonStyle: g,
      actionButtonStyle: _,
      className: v = ``,
      descriptionClassName: y = ``,
      duration: b,
      position: x,
      gap: S,
      expandByDefault: C,
      classNames: w,
      icons: T,
      closeButtonAriaLabel: E = `Close toast`,
    } = e,
    [D, O] = u.useState(null),
    [k, A] = u.useState(null),
    [j, ee] = u.useState(!1),
    [te, ne] = u.useState(!1),
    [M, N] = u.useState(!1),
    [P, re] = u.useState(!1),
    [ie, ae] = u.useState(!1),
    [oe, se] = u.useState(0),
    [F, ce] = u.useState(0),
    le = u.useRef(n.duration || b || Zo),
    ue = u.useRef(null),
    de = u.useRef(null),
    fe = c === 0,
    pe = c + 1 <= o,
    me = n.type,
    he = n.dismissible !== !1,
    ge = n.className || ``,
    _e = n.descriptionClassName || ``,
    ve = u.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]),
    ye = u.useMemo(() => n.closeButton ?? m, [n.closeButton, m]),
    be = u.useMemo(() => n.duration || b || Zo, [n.duration, b]),
    xe = u.useRef(0),
    Se = u.useRef(0),
    Ce = u.useRef(0),
    we = u.useRef(null),
    [Te, Ee] = x.split(`-`),
    De = u.useMemo(() => s.reduce((e, t, n) => (n >= ve ? e : e + t.height), 0), [s, ve]),
    Oe = Vo(),
    ke = n.invert || t,
    Ae = me === `loading`
  ;((Se.current = u.useMemo(() => ve * S + De, [ve, De])),
    u.useEffect(() => {
      le.current = be
    }, [be]),
    u.useEffect(() => {
      ee(!0)
    }, []),
    u.useEffect(() => {
      let e = de.current
      if (e) {
        let t = e.getBoundingClientRect().height
        return (
          ce(t),
          a((e) => [{ toastId: n.id, height: t, position: n.position }, ...e]),
          () => a((e) => e.filter((e) => e.toastId !== n.id))
        )
      }
    }, [a, n.id]),
    u.useLayoutEffect(() => {
      if (!j) return
      let e = de.current,
        t = e.style.height
      e.style.height = `auto`
      let r = e.getBoundingClientRect().height
      ;((e.style.height = t),
        ce(r),
        a((e) =>
          e.find((e) => e.toastId === n.id)
            ? e.map((e) => (e.toastId === n.id ? { ...e, height: r } : e))
            : [{ toastId: n.id, height: r, position: n.position }, ...e],
        ))
    }, [j, n.title, n.description, a, n.id, n.jsx, n.action, n.cancel]))
  let je = u.useCallback(() => {
    ;(ne(!0),
      se(Se.current),
      a((e) => e.filter((e) => e.toastId !== n.id)),
      setTimeout(() => {
        f(n)
      }, ts))
  }, [n, f, a, Se])
  ;(u.useEffect(() => {
    if ((n.promise && me === `loading`) || n.duration === 1 / 0 || n.type === `loading`) return
    let e
    return (
      d || i || Oe
        ? (() => {
            if (Ce.current < xe.current) {
              let e = new Date().getTime() - xe.current
              le.current -= e
            }
            Ce.current = new Date().getTime()
          })()
        : le.current !== 1 / 0 &&
          ((xe.current = new Date().getTime()),
          (e = setTimeout(() => {
            ;(n.onAutoClose == null || n.onAutoClose.call(n, n), je())
          }, le.current))),
      () => clearTimeout(e)
    )
  }, [d, i, n, me, Oe, je]),
    u.useEffect(() => {
      n.delete && (je(), n.onDismiss == null || n.onDismiss.call(n, n))
    }, [je, n.delete]))
  function Me() {
    return T?.loading
      ? u.createElement(
          `div`,
          {
            className: ns(w?.loader, n?.classNames?.loader, `sonner-loader`),
            'data-visible': me === `loading`,
          },
          T.loading,
        )
      : u.createElement(Fo, {
          className: ns(w?.loader, n?.classNames?.loader),
          visible: me === `loading`,
        })
  }
  let Ne = n.icon || T?.[me] || No(me)
  return u.createElement(
    `li`,
    {
      tabIndex: 0,
      ref: de,
      className: ns(
        v,
        ge,
        w?.toast,
        n?.classNames?.toast,
        w?.default,
        w?.[me],
        n?.classNames?.[me],
      ),
      'data-sonner-toast': ``,
      'data-rich-colors': n.richColors ?? p,
      'data-styled': !(n.jsx || n.unstyled || r),
      'data-mounted': j,
      'data-promise': !!n.promise,
      'data-swiped': ie,
      'data-removed': te,
      'data-visible': pe,
      'data-y-position': Te,
      'data-x-position': Ee,
      'data-index': c,
      'data-front': fe,
      'data-swiping': M,
      'data-dismissible': he,
      'data-type': me,
      'data-invert': ke,
      'data-swipe-out': P,
      'data-swipe-direction': k,
      'data-expanded': !!(d || (C && j)),
      'data-testid': n.testId,
      style: {
        '--index': c,
        '--toasts-before': c,
        '--z-index': l.length - c,
        '--offset': `${te ? oe : Se.current}px`,
        '--initial-height': C ? `auto` : `${F}px`,
        ...h,
        ...n.style,
      },
      onDragEnd: () => {
        ;(N(!1), O(null), (we.current = null))
      },
      onPointerDown: (e) => {
        e.button !== 2 &&
          (Ae ||
            !he ||
            ((ue.current = new Date()),
            se(Se.current),
            e.target.setPointerCapture(e.pointerId),
            e.target.tagName !== `BUTTON` &&
              (N(!0), (we.current = { x: e.clientX, y: e.clientY }))))
      },
      onPointerUp: () => {
        if (P || !he) return
        we.current = null
        let e = Number(
            de.current?.style.getPropertyValue(`--swipe-amount-x`).replace(`px`, ``) || 0,
          ),
          t = Number(de.current?.style.getPropertyValue(`--swipe-amount-y`).replace(`px`, ``) || 0),
          r = new Date().getTime() - ue.current?.getTime(),
          i = D === `x` ? e : t,
          a = Math.abs(i) / r
        if (Math.abs(i) >= es || a > 0.11) {
          ;(se(Se.current),
            n.onDismiss == null || n.onDismiss.call(n, n),
            A(D === `x` ? (e > 0 ? `right` : `left`) : t > 0 ? `down` : `up`),
            je(),
            re(!0))
          return
        } else {
          var o, s
          ;((o = de.current) == null || o.style.setProperty(`--swipe-amount-x`, `0px`),
            (s = de.current) == null || s.style.setProperty(`--swipe-amount-y`, `0px`))
        }
        ;(ae(!1), N(!1), O(null))
      },
      onPointerMove: (t) => {
        var n, r
        if (!we.current || !he || window.getSelection()?.toString().length > 0) return
        let i = t.clientY - we.current.y,
          a = t.clientX - we.current.x,
          o = e.swipeDirections ?? rs(x)
        !D && (Math.abs(a) > 1 || Math.abs(i) > 1) && O(Math.abs(a) > Math.abs(i) ? `x` : `y`)
        let s = { x: 0, y: 0 },
          c = (e) => 1 / (1.5 + Math.abs(e) / 20)
        if (D === `y`) {
          if (o.includes(`top`) || o.includes(`bottom`))
            if ((o.includes(`top`) && i < 0) || (o.includes(`bottom`) && i > 0)) s.y = i
            else {
              let e = i * c(i)
              s.y = Math.abs(e) < Math.abs(i) ? e : i
            }
        } else if (D === `x` && (o.includes(`left`) || o.includes(`right`)))
          if ((o.includes(`left`) && a < 0) || (o.includes(`right`) && a > 0)) s.x = a
          else {
            let e = a * c(a)
            s.x = Math.abs(e) < Math.abs(a) ? e : a
          }
        ;((Math.abs(s.x) > 0 || Math.abs(s.y) > 0) && ae(!0),
          (n = de.current) == null || n.style.setProperty(`--swipe-amount-x`, `${s.x}px`),
          (r = de.current) == null || r.style.setProperty(`--swipe-amount-y`, `${s.y}px`))
      },
    },
    ye && !n.jsx && me !== `loading`
      ? u.createElement(
          `button`,
          {
            'aria-label': E,
            'data-disabled': Ae,
            'data-close-button': !0,
            onClick:
              Ae || !he
                ? () => {}
                : () => {
                    ;(je(), n.onDismiss == null || n.onDismiss.call(n, n))
                  },
            className: ns(w?.closeButton, n?.classNames?.closeButton),
          },
          T?.close ?? Bo,
        )
      : null,
    (me || n.icon || n.promise) && n.icon !== null && (T?.[me] !== null || n.icon)
      ? u.createElement(
          `div`,
          { 'data-icon': ``, className: ns(w?.icon, n?.classNames?.icon) },
          n.promise || (n.type === `loading` && !n.icon) ? n.icon || Me() : null,
          n.type === `loading` ? null : Ne,
        )
      : null,
    u.createElement(
      `div`,
      { 'data-content': ``, className: ns(w?.content, n?.classNames?.content) },
      u.createElement(
        `div`,
        { 'data-title': ``, className: ns(w?.title, n?.classNames?.title) },
        n.jsx ? n.jsx : typeof n.title == `function` ? n.title() : n.title,
      ),
      n.description
        ? u.createElement(
            `div`,
            {
              'data-description': ``,
              className: ns(y, _e, w?.description, n?.classNames?.description),
            },
            typeof n.description == `function` ? n.description() : n.description,
          )
        : null,
    ),
    u.isValidElement(n.cancel)
      ? n.cancel
      : n.cancel && qo(n.cancel)
        ? u.createElement(
            `button`,
            {
              'data-button': !0,
              'data-cancel': !0,
              style: n.cancelButtonStyle || g,
              onClick: (e) => {
                qo(n.cancel) &&
                  he &&
                  (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), je())
              },
              className: ns(w?.cancelButton, n?.classNames?.cancelButton),
            },
            n.cancel.label,
          )
        : null,
    u.isValidElement(n.action)
      ? n.action
      : n.action && qo(n.action)
        ? u.createElement(
            `button`,
            {
              'data-button': !0,
              'data-action': !0,
              style: n.actionButtonStyle || _,
              onClick: (e) => {
                qo(n.action) &&
                  (n.action.onClick == null || n.action.onClick.call(n.action, e),
                  !e.defaultPrevented && je())
              },
              className: ns(w?.actionButton, n?.classNames?.actionButton),
            },
            n.action.label,
          )
        : null,
  )
}
function as() {
  if (typeof window > `u` || typeof document > `u`) return `ltr`
  let e = document.documentElement.getAttribute(`dir`)
  return e === `auto` || !e ? window.getComputedStyle(document.documentElement).direction : e
}
function os(e, t) {
  let n = {}
  return (
    [e, t].forEach((e, t) => {
      let r = t === 1,
        i = r ? `--mobile-offset` : `--offset`,
        a = r ? Xo : Yo
      function o(e) {
        ;[`top`, `right`, `bottom`, `left`].forEach((t) => {
          n[`${i}-${t}`] = typeof e == `number` ? `${e}px` : e
        })
      }
      typeof e == `number` || typeof e == `string`
        ? o(e)
        : typeof e == `object`
          ? [`top`, `right`, `bottom`, `left`].forEach((t) => {
              e[t] === void 0
                ? (n[`${i}-${t}`] = a)
                : (n[`${i}-${t}`] = typeof e[t] == `number` ? `${e[t]}px` : e[t])
            })
          : o(a)
    }),
    n
  )
}
var ss = u.forwardRef(function (e, t) {
    let {
        id: n,
        invert: r,
        position: i = `bottom-right`,
        hotkey: a = [`altKey`, `KeyT`],
        expand: o,
        closeButton: s,
        className: c,
        offset: l,
        mobileOffset: f,
        theme: p = `light`,
        richColors: m,
        duration: h,
        style: g,
        visibleToasts: _ = Jo,
        toastOptions: v,
        dir: y = as(),
        gap: b = $o,
        icons: x,
        containerAriaLabel: S = `Notifications`,
      } = e,
      [C, w] = u.useState([]),
      T = u.useMemo(
        () => (n ? C.filter((e) => e.toasterId === n) : C.filter((e) => !e.toasterId)),
        [C, n],
      ),
      E = u.useMemo(
        () => Array.from(new Set([i].concat(T.filter((e) => e.position).map((e) => e.position)))),
        [T, i],
      ),
      [D, O] = u.useState([]),
      [k, A] = u.useState(!1),
      [j, ee] = u.useState(!1),
      [te, ne] = u.useState(
        p === `system`
          ? typeof window < `u` &&
            window.matchMedia &&
            window.matchMedia(`(prefers-color-scheme: dark)`).matches
            ? `dark`
            : `light`
          : p,
      ),
      M = u.useRef(null),
      N = a.join(`+`).replace(/Key/g, ``).replace(/Digit/g, ``),
      P = u.useRef(null),
      re = u.useRef(!1),
      ie = u.useCallback((e) => {
        w(
          (t) => (
            t.find((t) => t.id === e.id)?.delete || Uo.dismiss(e.id),
            t.filter(({ id: t }) => t !== e.id)
          ),
        )
      }, [])
    return (
      u.useEffect(
        () =>
          Uo.subscribe((e) => {
            if (e.dismiss) {
              requestAnimationFrame(() => {
                w((t) => t.map((t) => (t.id === e.id ? { ...t, delete: !0 } : t)))
              })
              return
            }
            setTimeout(() => {
              d.flushSync(() => {
                w((t) => {
                  let n = t.findIndex((t) => t.id === e.id)
                  return n === -1
                    ? [e, ...t]
                    : [...t.slice(0, n), { ...t[n], ...e }, ...t.slice(n + 1)]
                })
              })
            })
          }),
        [C],
      ),
      u.useEffect(() => {
        if (p !== `system`) {
          ne(p)
          return
        }
        if (
          (p === `system` &&
            (window.matchMedia && window.matchMedia(`(prefers-color-scheme: dark)`).matches
              ? ne(`dark`)
              : ne(`light`)),
          typeof window > `u`)
        )
          return
        let e = window.matchMedia(`(prefers-color-scheme: dark)`)
        try {
          e.addEventListener(`change`, ({ matches: e }) => {
            ne(e ? `dark` : `light`)
          })
        } catch {
          e.addListener(({ matches: e }) => {
            try {
              ne(e ? `dark` : `light`)
            } catch (e) {
              console.error(e)
            }
          })
        }
      }, [p]),
      u.useEffect(() => {
        C.length <= 1 && A(!1)
      }, [C]),
      u.useEffect(() => {
        let e = (e) => {
          if (a.every((t) => e[t] || e.code === t)) {
            var t
            ;(A(!0), (t = M.current) == null || t.focus())
          }
          e.code === `Escape` &&
            (document.activeElement === M.current || M.current?.contains(document.activeElement)) &&
            A(!1)
        }
        return (
          document.addEventListener(`keydown`, e), () => document.removeEventListener(`keydown`, e)
        )
      }, [a]),
      u.useEffect(() => {
        if (M.current)
          return () => {
            P.current &&
              (P.current.focus({ preventScroll: !0 }), (P.current = null), (re.current = !1))
          }
      }, [M.current]),
      u.createElement(
        `section`,
        {
          ref: t,
          'aria-label': `${S} ${N}`,
          tabIndex: -1,
          'aria-live': `polite`,
          'aria-relevant': `additions text`,
          'aria-atomic': `false`,
          suppressHydrationWarning: !0,
        },
        E.map((t, n) => {
          let [i, a] = t.split(`-`)
          return T.length
            ? u.createElement(
                `ol`,
                {
                  key: t,
                  dir: y === `auto` ? as() : y,
                  tabIndex: -1,
                  ref: M,
                  className: c,
                  'data-sonner-toaster': !0,
                  'data-sonner-theme': te,
                  'data-y-position': i,
                  'data-x-position': a,
                  style: {
                    '--front-toast-height': `${D[0]?.height || 0}px`,
                    '--width': `${Qo}px`,
                    '--gap': `${b}px`,
                    ...g,
                    ...os(l, f),
                  },
                  onBlur: (e) => {
                    re.current &&
                      !e.currentTarget.contains(e.relatedTarget) &&
                      ((re.current = !1),
                      (P.current &&= (P.current.focus({ preventScroll: !0 }), null)))
                  },
                  onFocus: (e) => {
                    ;(e.target instanceof HTMLElement &&
                      e.target.dataset.dismissible === `false`) ||
                      re.current ||
                      ((re.current = !0), (P.current = e.relatedTarget))
                  },
                  onMouseEnter: () => A(!0),
                  onMouseMove: () => A(!0),
                  onMouseLeave: () => {
                    j || A(!1)
                  },
                  onDragEnd: () => A(!1),
                  onPointerDown: (e) => {
                    ;(e.target instanceof HTMLElement &&
                      e.target.dataset.dismissible === `false`) ||
                      ee(!0)
                  },
                  onPointerUp: () => ee(!1),
                },
                T.filter((e) => (!e.position && n === 0) || e.position === t).map((n, i) =>
                  u.createElement(is, {
                    key: n.id,
                    icons: x,
                    index: i,
                    toast: n,
                    defaultRichColors: m,
                    duration: v?.duration ?? h,
                    className: v?.className,
                    descriptionClassName: v?.descriptionClassName,
                    invert: r,
                    visibleToasts: _,
                    closeButton: v?.closeButton ?? s,
                    interacting: j,
                    position: t,
                    style: v?.style,
                    unstyled: v?.unstyled,
                    classNames: v?.classNames,
                    cancelButtonStyle: v?.cancelButtonStyle,
                    actionButtonStyle: v?.actionButtonStyle,
                    closeButtonAriaLabel: v?.closeButtonAriaLabel,
                    removeToast: ie,
                    toasts: T.filter((e) => e.position == n.position),
                    heights: D.filter((e) => e.position == n.position),
                    setHeights: O,
                    expandByDefault: o,
                    gap: b,
                    expanded: k,
                    swipeDirections: e.swipeDirections,
                  }),
                ),
              )
            : null
        }),
      )
    )
  }),
  cs = ({ ...e }) => {
    let { theme: t = `system` } = jo()
    return (0, R.jsx)(ss, {
      theme: t,
      className: `toaster group`,
      toastOptions: {
        classNames: {
          toast: `group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg`,
          description: `group-[.toast]:text-muted-foreground`,
          actionButton: `group-[.toast]:bg-primary group-[.toast]:text-primary-foreground`,
          cancelButton: `group-[.toast]:bg-muted group-[.toast]:text-muted-foreground`,
        },
      },
      ...e,
    })
  },
  ls = u.useId || (() => void 0),
  us = 0
function ds(e) {
  let [t, n] = u.useState(ls())
  return (
    Ar(() => {
      e || n((e) => e ?? String(us++))
    }, [e]),
    e || (t ? `radix-${t}` : ``)
  )
}
var fs = [`top`, `right`, `bottom`, `left`],
  ps = Math.min,
  ms = Math.max,
  hs = Math.round,
  gs = Math.floor,
  _s = (e) => ({ x: e, y: e }),
  vs = { left: `right`, right: `left`, bottom: `top`, top: `bottom` }
function ys(e, t, n) {
  return ms(e, ps(t, n))
}
function bs(e, t) {
  return typeof e == `function` ? e(t) : e
}
function xs(e) {
  return e.split(`-`)[0]
}
function Ss(e) {
  return e.split(`-`)[1]
}
function Cs(e) {
  return e === `x` ? `y` : `x`
}
function ws(e) {
  return e === `y` ? `height` : `width`
}
function Ts(e) {
  let t = e[0]
  return t === `t` || t === `b` ? `y` : `x`
}
function Es(e) {
  return Cs(Ts(e))
}
function Ds(e, t, n) {
  n === void 0 && (n = !1)
  let r = Ss(e),
    i = Es(e),
    a = ws(i),
    o =
      i === `x`
        ? r === (n ? `end` : `start`)
          ? `right`
          : `left`
        : r === `start`
          ? `bottom`
          : `top`
  return (t.reference[a] > t.floating[a] && (o = Is(o)), [o, Is(o)])
}
function Os(e) {
  let t = Is(e)
  return [ks(e), t, ks(t)]
}
function ks(e) {
  return e.includes(`start`) ? e.replace(`start`, `end`) : e.replace(`end`, `start`)
}
var As = [`left`, `right`],
  js = [`right`, `left`],
  Ms = [`top`, `bottom`],
  Ns = [`bottom`, `top`]
function Ps(e, t, n) {
  switch (e) {
    case `top`:
    case `bottom`:
      return n ? (t ? js : As) : t ? As : js
    case `left`:
    case `right`:
      return t ? Ms : Ns
    default:
      return []
  }
}
function Fs(e, t, n, r) {
  let i = Ss(e),
    a = Ps(xs(e), n === `start`, r)
  return (i && ((a = a.map((e) => e + `-` + i)), t && (a = a.concat(a.map(ks)))), a)
}
function Is(e) {
  let t = xs(e)
  return vs[t] + e.slice(t.length)
}
function Ls(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e }
}
function Rs(e) {
  return typeof e == `number` ? { top: e, right: e, bottom: e, left: e } : Ls(e)
}
function zs(e) {
  let { x: t, y: n, width: r, height: i } = e
  return { width: r, height: i, top: n, left: t, right: t + r, bottom: n + i, x: t, y: n }
}
function Bs(e, t, n) {
  let { reference: r, floating: i } = e,
    a = Ts(t),
    o = Es(t),
    s = ws(o),
    c = xs(t),
    l = a === `y`,
    u = r.x + r.width / 2 - i.width / 2,
    d = r.y + r.height / 2 - i.height / 2,
    f = r[s] / 2 - i[s] / 2,
    p
  switch (c) {
    case `top`:
      p = { x: u, y: r.y - i.height }
      break
    case `bottom`:
      p = { x: u, y: r.y + r.height }
      break
    case `right`:
      p = { x: r.x + r.width, y: d }
      break
    case `left`:
      p = { x: r.x - i.width, y: d }
      break
    default:
      p = { x: r.x, y: r.y }
  }
  switch (Ss(t)) {
    case `start`:
      p[o] -= f * (n && l ? -1 : 1)
      break
    case `end`:
      p[o] += f * (n && l ? -1 : 1)
      break
  }
  return p
}
async function Vs(e, t) {
  t === void 0 && (t = {})
  let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e,
    {
      boundary: c = `clippingAncestors`,
      rootBoundary: l = `viewport`,
      elementContext: u = `floating`,
      altBoundary: d = !1,
      padding: f = 0,
    } = bs(t, e),
    p = Rs(f),
    m = o[d ? (u === `floating` ? `reference` : `floating`) : u],
    h = zs(
      await i.getClippingRect({
        element:
          ((await (i.isElement == null ? void 0 : i.isElement(m))) ?? !0)
            ? m
            : m.contextElement ||
              (await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating))),
        boundary: c,
        rootBoundary: l,
        strategy: s,
      }),
    ),
    g =
      u === `floating`
        ? { x: n, y: r, width: a.floating.width, height: a.floating.height }
        : a.reference,
    _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)),
    v = ((await (i.isElement == null ? void 0 : i.isElement(_))) &&
      (await (i.getScale == null ? void 0 : i.getScale(_)))) || { x: 1, y: 1 },
    y = zs(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: o,
            rect: g,
            offsetParent: _,
            strategy: s,
          })
        : g,
    )
  return {
    top: (h.top - y.top + p.top) / v.y,
    bottom: (y.bottom - h.bottom + p.bottom) / v.y,
    left: (h.left - y.left + p.left) / v.x,
    right: (y.right - h.right + p.right) / v.x,
  }
}
var Hs = 50,
  Us = async (e, t, n) => {
    let { placement: r = `bottom`, strategy: i = `absolute`, middleware: a = [], platform: o } = n,
      s = o.detectOverflow ? o : { ...o, detectOverflow: Vs },
      c = await (o.isRTL == null ? void 0 : o.isRTL(t)),
      l = await o.getElementRects({ reference: e, floating: t, strategy: i }),
      { x: u, y: d } = Bs(l, r, c),
      f = r,
      p = 0,
      m = {}
    for (let n = 0; n < a.length; n++) {
      let h = a[n]
      if (!h) continue
      let { name: g, fn: _ } = h,
        {
          x: v,
          y,
          data: b,
          reset: x,
        } = await _({
          x: u,
          y: d,
          initialPlacement: r,
          placement: f,
          strategy: i,
          middlewareData: m,
          rects: l,
          platform: s,
          elements: { reference: e, floating: t },
        })
      ;((u = v ?? u),
        (d = y ?? d),
        (m[g] = { ...m[g], ...b }),
        x &&
          p < Hs &&
          (p++,
          typeof x == `object` &&
            (x.placement && (f = x.placement),
            x.rects &&
              (l =
                x.rects === !0
                  ? await o.getElementRects({ reference: e, floating: t, strategy: i })
                  : x.rects),
            ({ x: u, y: d } = Bs(l, f, c))),
          (n = -1)))
    }
    return { x: u, y: d, placement: f, strategy: i, middlewareData: m }
  },
  Ws = (e) => ({
    name: `arrow`,
    options: e,
    async fn(t) {
      let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t,
        { element: l, padding: u = 0 } = bs(e, t) || {}
      if (l == null) return {}
      let d = Rs(u),
        f = { x: n, y: r },
        p = Es(i),
        m = ws(p),
        h = await o.getDimensions(l),
        g = p === `y`,
        _ = g ? `top` : `left`,
        v = g ? `bottom` : `right`,
        y = g ? `clientHeight` : `clientWidth`,
        b = a.reference[m] + a.reference[p] - f[p] - a.floating[m],
        x = f[p] - a.reference[p],
        S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)),
        C = S ? S[y] : 0
      ;(!C || !(await (o.isElement == null ? void 0 : o.isElement(S)))) &&
        (C = s.floating[y] || a.floating[m])
      let w = b / 2 - x / 2,
        T = C / 2 - h[m] / 2 - 1,
        E = ps(d[_], T),
        D = ps(d[v], T),
        O = E,
        k = C - h[m] - D,
        A = C / 2 - h[m] / 2 + w,
        j = ys(O, A, k),
        ee =
          !c.arrow &&
          Ss(i) != null &&
          A !== j &&
          a.reference[m] / 2 - (A < O ? E : D) - h[m] / 2 < 0,
        te = ee ? (A < O ? A - O : A - k) : 0
      return {
        [p]: f[p] + te,
        data: { [p]: j, centerOffset: A - j - te, ...(ee && { alignmentOffset: te }) },
        reset: ee,
      }
    },
  }),
  Gs = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `flip`,
        options: e,
        async fn(t) {
          var n
          let {
              placement: r,
              middlewareData: i,
              rects: a,
              initialPlacement: o,
              platform: s,
              elements: c,
            } = t,
            {
              mainAxis: l = !0,
              crossAxis: u = !0,
              fallbackPlacements: d,
              fallbackStrategy: f = `bestFit`,
              fallbackAxisSideDirection: p = `none`,
              flipAlignment: m = !0,
              ...h
            } = bs(e, t)
          if ((n = i.arrow) != null && n.alignmentOffset) return {}
          let g = xs(r),
            _ = Ts(o),
            v = xs(o) === o,
            y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)),
            b = d || (v || !m ? [Is(o)] : Os(o)),
            x = p !== `none`
          !d && x && b.push(...Fs(o, m, p, y))
          let S = [o, ...b],
            C = await s.detectOverflow(t, h),
            w = [],
            T = i.flip?.overflows || []
          if ((l && w.push(C[g]), u)) {
            let e = Ds(r, a, y)
            w.push(C[e[0]], C[e[1]])
          }
          if (((T = [...T, { placement: r, overflows: w }]), !w.every((e) => e <= 0))) {
            let e = (i.flip?.index || 0) + 1,
              t = S[e]
            if (
              t &&
              (!(u === `alignment` && _ !== Ts(t)) ||
                T.every((e) => (Ts(e.placement) === _ ? e.overflows[0] > 0 : !0)))
            )
              return { data: { index: e, overflows: T }, reset: { placement: t } }
            let n = T.filter((e) => e.overflows[0] <= 0).sort(
              (e, t) => e.overflows[1] - t.overflows[1],
            )[0]?.placement
            if (!n)
              switch (f) {
                case `bestFit`: {
                  let e = T.filter((e) => {
                    if (x) {
                      let t = Ts(e.placement)
                      return t === _ || t === `y`
                    }
                    return !0
                  })
                    .map((e) => [
                      e.placement,
                      e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0),
                    ])
                    .sort((e, t) => e[1] - t[1])[0]?.[0]
                  e && (n = e)
                  break
                }
                case `initialPlacement`:
                  n = o
                  break
              }
            if (r !== n) return { reset: { placement: n } }
          }
          return {}
        },
      }
    )
  }
function Ks(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  }
}
function qs(e) {
  return fs.some((t) => e[t] >= 0)
}
var Js = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `hide`,
        options: e,
        async fn(t) {
          let { rects: n, platform: r } = t,
            { strategy: i = `referenceHidden`, ...a } = bs(e, t)
          switch (i) {
            case `referenceHidden`: {
              let e = Ks(
                await r.detectOverflow(t, { ...a, elementContext: `reference` }),
                n.reference,
              )
              return { data: { referenceHiddenOffsets: e, referenceHidden: qs(e) } }
            }
            case `escaped`: {
              let e = Ks(await r.detectOverflow(t, { ...a, altBoundary: !0 }), n.floating)
              return { data: { escapedOffsets: e, escaped: qs(e) } }
            }
            default:
              return {}
          }
        },
      }
    )
  },
  Ys = new Set([`left`, `top`])
async function Xs(e, t) {
  let { placement: n, platform: r, elements: i } = e,
    a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
    o = xs(n),
    s = Ss(n),
    c = Ts(n) === `y`,
    l = Ys.has(o) ? -1 : 1,
    u = a && c ? -1 : 1,
    d = bs(t, e),
    {
      mainAxis: f,
      crossAxis: p,
      alignmentAxis: m,
    } = typeof d == `number`
      ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
      : { mainAxis: d.mainAxis || 0, crossAxis: d.crossAxis || 0, alignmentAxis: d.alignmentAxis }
  return (
    s && typeof m == `number` && (p = s === `end` ? m * -1 : m),
    c ? { x: p * u, y: f * l } : { x: f * l, y: p * u }
  )
}
var Zs = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: `offset`,
        options: e,
        async fn(t) {
          var n
          let { x: r, y: i, placement: a, middlewareData: o } = t,
            s = await Xs(t, e)
          return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset
            ? {}
            : { x: r + s.x, y: i + s.y, data: { ...s, placement: a } }
        },
      }
    )
  },
  Qs = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `shift`,
        options: e,
        async fn(t) {
          let { x: n, y: r, placement: i, platform: a } = t,
            {
              mainAxis: o = !0,
              crossAxis: s = !1,
              limiter: c = {
                fn: (e) => {
                  let { x: t, y: n } = e
                  return { x: t, y: n }
                },
              },
              ...l
            } = bs(e, t),
            u = { x: n, y: r },
            d = await a.detectOverflow(t, l),
            f = Ts(xs(i)),
            p = Cs(f),
            m = u[p],
            h = u[f]
          if (o) {
            let e = p === `y` ? `top` : `left`,
              t = p === `y` ? `bottom` : `right`,
              n = m + d[e],
              r = m - d[t]
            m = ys(n, m, r)
          }
          if (s) {
            let e = f === `y` ? `top` : `left`,
              t = f === `y` ? `bottom` : `right`,
              n = h + d[e],
              r = h - d[t]
            h = ys(n, h, r)
          }
          let g = c.fn({ ...t, [p]: m, [f]: h })
          return { ...g, data: { x: g.x - n, y: g.y - r, enabled: { [p]: o, [f]: s } } }
        },
      }
    )
  },
  $s = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t,
            { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = bs(e, t),
            u = { x: n, y: r },
            d = Ts(i),
            f = Cs(d),
            p = u[f],
            m = u[d],
            h = bs(s, t),
            g =
              typeof h == `number`
                ? { mainAxis: h, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...h }
          if (c) {
            let e = f === `y` ? `height` : `width`,
              t = a.reference[f] - a.floating[e] + g.mainAxis,
              n = a.reference[f] + a.reference[e] - g.mainAxis
            p < t ? (p = t) : p > n && (p = n)
          }
          if (l) {
            let e = f === `y` ? `width` : `height`,
              t = Ys.has(xs(i)),
              n =
                a.reference[d] -
                a.floating[e] +
                ((t && o.offset?.[d]) || 0) +
                (t ? 0 : g.crossAxis),
              r =
                a.reference[d] +
                a.reference[e] +
                (t ? 0 : o.offset?.[d] || 0) -
                (t ? g.crossAxis : 0)
            m < n ? (m = n) : m > r && (m = r)
          }
          return { [f]: p, [d]: m }
        },
      }
    )
  },
  ec = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `size`,
        options: e,
        async fn(t) {
          var n, r
          let { placement: i, rects: a, platform: o, elements: s } = t,
            { apply: c = () => {}, ...l } = bs(e, t),
            u = await o.detectOverflow(t, l),
            d = xs(i),
            f = Ss(i),
            p = Ts(i) === `y`,
            { width: m, height: h } = a.floating,
            g,
            _
          d === `top` || d === `bottom`
            ? ((g = d),
              (_ =
                f === ((await (o.isRTL == null ? void 0 : o.isRTL(s.floating))) ? `start` : `end`)
                  ? `left`
                  : `right`))
            : ((_ = d), (g = f === `end` ? `top` : `bottom`))
          let v = h - u.top - u.bottom,
            y = m - u.left - u.right,
            b = ps(h - u[g], v),
            x = ps(m - u[_], y),
            S = !t.middlewareData.shift,
            C = b,
            w = x
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y),
            (r = t.middlewareData.shift) != null && r.enabled.y && (C = v),
            S && !f)
          ) {
            let e = ms(u.left, 0),
              t = ms(u.right, 0),
              n = ms(u.top, 0),
              r = ms(u.bottom, 0)
            p
              ? (w = m - 2 * (e !== 0 || t !== 0 ? e + t : ms(u.left, u.right)))
              : (C = h - 2 * (n !== 0 || r !== 0 ? n + r : ms(u.top, u.bottom)))
          }
          await c({ ...t, availableWidth: w, availableHeight: C })
          let T = await o.getDimensions(s.floating)
          return m !== T.width || h !== T.height ? { reset: { rects: !0 } } : {}
        },
      }
    )
  }
function tc() {
  return typeof window < `u`
}
function nc(e) {
  return ac(e) ? (e.nodeName || ``).toLowerCase() : `#document`
}
function rc(e) {
  var t
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}
function ic(e) {
  return ((ac(e) ? e.ownerDocument : e.document) || window.document)?.documentElement
}
function ac(e) {
  return tc() ? e instanceof Node || e instanceof rc(e).Node : !1
}
function oc(e) {
  return tc() ? e instanceof Element || e instanceof rc(e).Element : !1
}
function sc(e) {
  return tc() ? e instanceof HTMLElement || e instanceof rc(e).HTMLElement : !1
}
function cc(e) {
  return !tc() || typeof ShadowRoot > `u`
    ? !1
    : e instanceof ShadowRoot || e instanceof rc(e).ShadowRoot
}
function lc(e) {
  let { overflow: t, overflowX: n, overflowY: r, display: i } = bc(e)
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== `inline` && i !== `contents`
}
function uc(e) {
  return /^(table|td|th)$/.test(nc(e))
}
function dc(e) {
  try {
    if (e.matches(`:popover-open`)) return !0
  } catch {}
  try {
    return e.matches(`:modal`)
  } catch {
    return !1
  }
}
var fc = /transform|translate|scale|rotate|perspective|filter/,
  pc = /paint|layout|strict|content/,
  mc = (e) => !!e && e !== `none`,
  hc
function gc(e) {
  let t = oc(e) ? bc(e) : e
  return (
    mc(t.transform) ||
    mc(t.translate) ||
    mc(t.scale) ||
    mc(t.rotate) ||
    mc(t.perspective) ||
    (!vc() && (mc(t.backdropFilter) || mc(t.filter))) ||
    fc.test(t.willChange || ``) ||
    pc.test(t.contain || ``)
  )
}
function _c(e) {
  let t = Sc(e)
  for (; sc(t) && !yc(t); ) {
    if (gc(t)) return t
    if (dc(t)) return null
    t = Sc(t)
  }
  return null
}
function vc() {
  return (
    (hc ??= typeof CSS < `u` && CSS.supports && CSS.supports(`-webkit-backdrop-filter`, `none`)), hc
  )
}
function yc(e) {
  return /^(html|body|#document)$/.test(nc(e))
}
function bc(e) {
  return rc(e).getComputedStyle(e)
}
function xc(e) {
  return oc(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY }
}
function Sc(e) {
  if (nc(e) === `html`) return e
  let t = e.assignedSlot || e.parentNode || (cc(e) && e.host) || ic(e)
  return cc(t) ? t.host : t
}
function Cc(e) {
  let t = Sc(e)
  return yc(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : sc(t) && lc(t) ? t : Cc(t)
}
function wc(e, t, n) {
  ;(t === void 0 && (t = []), n === void 0 && (n = !0))
  let r = Cc(e),
    i = r === e.ownerDocument?.body,
    a = rc(r)
  if (i) {
    let e = Tc(a)
    return t.concat(a, a.visualViewport || [], lc(r) ? r : [], e && n ? wc(e) : [])
  } else return t.concat(r, wc(r, [], n))
}
function Tc(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}
function Ec(e) {
  let t = bc(e),
    n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0,
    i = sc(e),
    a = i ? e.offsetWidth : n,
    o = i ? e.offsetHeight : r,
    s = hs(n) !== a || hs(r) !== o
  return (s && ((n = a), (r = o)), { width: n, height: r, $: s })
}
function Dc(e) {
  return oc(e) ? e : e.contextElement
}
function Oc(e) {
  let t = Dc(e)
  if (!sc(t)) return _s(1)
  let n = t.getBoundingClientRect(),
    { width: r, height: i, $: a } = Ec(t),
    o = (a ? hs(n.width) : n.width) / r,
    s = (a ? hs(n.height) : n.height) / i
  return (
    (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), { x: o, y: s }
  )
}
var kc = _s(0)
function Ac(e) {
  let t = rc(e)
  return !vc() || !t.visualViewport
    ? kc
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
}
function jc(e, t, n) {
  return (t === void 0 && (t = !1), !n || (t && n !== rc(e)) ? !1 : t)
}
function Mc(e, t, n, r) {
  ;(t === void 0 && (t = !1), n === void 0 && (n = !1))
  let i = e.getBoundingClientRect(),
    a = Dc(e),
    o = _s(1)
  t && (r ? oc(r) && (o = Oc(r)) : (o = Oc(e)))
  let s = jc(a, n, r) ? Ac(a) : _s(0),
    c = (i.left + s.x) / o.x,
    l = (i.top + s.y) / o.y,
    u = i.width / o.x,
    d = i.height / o.y
  if (a) {
    let e = rc(a),
      t = r && oc(r) ? rc(r) : r,
      n = e,
      i = Tc(n)
    for (; i && r && t !== n; ) {
      let e = Oc(i),
        t = i.getBoundingClientRect(),
        r = bc(i),
        a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x,
        o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y
      ;((c *= e.x),
        (l *= e.y),
        (u *= e.x),
        (d *= e.y),
        (c += a),
        (l += o),
        (n = rc(i)),
        (i = Tc(n)))
    }
  }
  return zs({ width: u, height: d, x: c, y: l })
}
function Nc(e, t) {
  let n = xc(e).scrollLeft
  return t ? t.left + n : Mc(ic(e)).left + n
}
function Pc(e, t) {
  let n = e.getBoundingClientRect()
  return { x: n.left + t.scrollLeft - Nc(e, n), y: n.top + t.scrollTop }
}
function Fc(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: i } = e,
    a = i === `fixed`,
    o = ic(r),
    s = t ? dc(t.floating) : !1
  if (r === o || (s && a)) return n
  let c = { scrollLeft: 0, scrollTop: 0 },
    l = _s(1),
    u = _s(0),
    d = sc(r)
  if ((d || (!d && !a)) && ((nc(r) !== `body` || lc(o)) && (c = xc(r)), d)) {
    let e = Mc(r)
    ;((l = Oc(r)), (u.x = e.x + r.clientLeft), (u.y = e.y + r.clientTop))
  }
  let f = o && !d && !a ? Pc(o, c) : _s(0)
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y,
  }
}
function Ic(e) {
  return Array.from(e.getClientRects())
}
function Lc(e) {
  let t = ic(e),
    n = xc(e),
    r = e.ownerDocument.body,
    i = ms(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    a = ms(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight),
    o = -n.scrollLeft + Nc(e),
    s = -n.scrollTop
  return (
    bc(r).direction === `rtl` && (o += ms(t.clientWidth, r.clientWidth) - i),
    { width: i, height: a, x: o, y: s }
  )
}
var Rc = 25
function zc(e, t) {
  let n = rc(e),
    r = ic(e),
    i = n.visualViewport,
    a = r.clientWidth,
    o = r.clientHeight,
    s = 0,
    c = 0
  if (i) {
    ;((a = i.width), (o = i.height))
    let e = vc()
    ;(!e || (e && t === `fixed`)) && ((s = i.offsetLeft), (c = i.offsetTop))
  }
  let l = Nc(r)
  if (l <= 0) {
    let e = r.ownerDocument,
      t = e.body,
      n = getComputedStyle(t),
      i =
        (e.compatMode === `CSS1Compat` && parseFloat(n.marginLeft) + parseFloat(n.marginRight)) ||
        0,
      o = Math.abs(r.clientWidth - t.clientWidth - i)
    o <= Rc && (a -= o)
  } else l <= Rc && (a += l)
  return { width: a, height: o, x: s, y: c }
}
function Bc(e, t) {
  let n = Mc(e, !0, t === `fixed`),
    r = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    a = sc(e) ? Oc(e) : _s(1)
  return { width: e.clientWidth * a.x, height: e.clientHeight * a.y, x: i * a.x, y: r * a.y }
}
function Vc(e, t, n) {
  let r
  if (t === `viewport`) r = zc(e, n)
  else if (t === `document`) r = Lc(ic(e))
  else if (oc(t)) r = Bc(t, n)
  else {
    let n = Ac(e)
    r = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height }
  }
  return zs(r)
}
function Hc(e, t) {
  let n = Sc(e)
  return n === t || !oc(n) || yc(n) ? !1 : bc(n).position === `fixed` || Hc(n, t)
}
function Uc(e, t) {
  let n = t.get(e)
  if (n) return n
  let r = wc(e, [], !1).filter((e) => oc(e) && nc(e) !== `body`),
    i = null,
    a = bc(e).position === `fixed`,
    o = a ? Sc(e) : e
  for (; oc(o) && !yc(o); ) {
    let t = bc(o),
      n = gc(o)
    ;(!n && t.position === `fixed` && (i = null),
      (
        a
          ? !n && !i
          : (!n &&
              t.position === `static` &&
              i &&
              (i.position === `absolute` || i.position === `fixed`)) ||
            (lc(o) && !n && Hc(e, o))
      )
        ? (r = r.filter((e) => e !== o))
        : (i = t),
      (o = Sc(o)))
  }
  return (t.set(e, r), r)
}
function Wc(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e,
    a = [...(n === `clippingAncestors` ? (dc(t) ? [] : Uc(t, this._c)) : [].concat(n)), r],
    o = Vc(t, a[0], i),
    s = o.top,
    c = o.right,
    l = o.bottom,
    u = o.left
  for (let e = 1; e < a.length; e++) {
    let n = Vc(t, a[e], i)
    ;((s = ms(n.top, s)), (c = ps(n.right, c)), (l = ps(n.bottom, l)), (u = ms(n.left, u)))
  }
  return { width: c - u, height: l - s, x: u, y: s }
}
function Gc(e) {
  let { width: t, height: n } = Ec(e)
  return { width: t, height: n }
}
function Kc(e, t, n) {
  let r = sc(t),
    i = ic(t),
    a = n === `fixed`,
    o = Mc(e, !0, a, t),
    s = { scrollLeft: 0, scrollTop: 0 },
    c = _s(0)
  function l() {
    c.x = Nc(i)
  }
  if (r || (!r && !a))
    if (((nc(t) !== `body` || lc(i)) && (s = xc(t)), r)) {
      let e = Mc(t, !0, a, t)
      ;((c.x = e.x + t.clientLeft), (c.y = e.y + t.clientTop))
    } else i && l()
  a && !r && i && l()
  let u = i && !r && !a ? Pc(i, s) : _s(0)
  return {
    x: o.left + s.scrollLeft - c.x - u.x,
    y: o.top + s.scrollTop - c.y - u.y,
    width: o.width,
    height: o.height,
  }
}
function qc(e) {
  return bc(e).position === `static`
}
function Jc(e, t) {
  if (!sc(e) || bc(e).position === `fixed`) return null
  if (t) return t(e)
  let n = e.offsetParent
  return (ic(e) === n && (n = n.ownerDocument.body), n)
}
function Yc(e, t) {
  let n = rc(e)
  if (dc(e)) return n
  if (!sc(e)) {
    let t = Sc(e)
    for (; t && !yc(t); ) {
      if (oc(t) && !qc(t)) return t
      t = Sc(t)
    }
    return n
  }
  let r = Jc(e, t)
  for (; r && uc(r) && qc(r); ) r = Jc(r, t)
  return r && yc(r) && qc(r) && !gc(r) ? n : r || _c(e) || n
}
var Xc = async function (e) {
  let t = this.getOffsetParent || Yc,
    n = this.getDimensions,
    r = await n(e.floating)
  return {
    reference: Kc(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  }
}
function Zc(e) {
  return bc(e).direction === `rtl`
}
var Qc = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Fc,
  getDocumentElement: ic,
  getClippingRect: Wc,
  getOffsetParent: Yc,
  getElementRects: Xc,
  getClientRects: Ic,
  getDimensions: Gc,
  getScale: Oc,
  isElement: oc,
  isRTL: Zc,
}
function $c(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
}
function el(e, t) {
  let n = null,
    r,
    i = ic(e)
  function a() {
    var e
    ;(clearTimeout(r), (e = n) == null || e.disconnect(), (n = null))
  }
  function o(s, c) {
    ;(s === void 0 && (s = !1), c === void 0 && (c = 1), a())
    let l = e.getBoundingClientRect(),
      { left: u, top: d, width: f, height: p } = l
    if ((s || t(), !f || !p)) return
    let m = gs(d),
      h = gs(i.clientWidth - (u + f)),
      g = gs(i.clientHeight - (d + p)),
      _ = gs(u),
      v = {
        rootMargin: -m + `px ` + -h + `px ` + -g + `px ` + -_ + `px`,
        threshold: ms(0, ps(1, c)) || 1,
      },
      y = !0
    function b(t) {
      let n = t[0].intersectionRatio
      if (n !== c) {
        if (!y) return o()
        n
          ? o(!1, n)
          : (r = setTimeout(() => {
              o(!1, 1e-7)
            }, 1e3))
      }
      ;(n === 1 && !$c(l, e.getBoundingClientRect()) && o(), (y = !1))
    }
    try {
      n = new IntersectionObserver(b, { ...v, root: i.ownerDocument })
    } catch {
      n = new IntersectionObserver(b, v)
    }
    n.observe(e)
  }
  return (o(!0), a)
}
function tl(e, t, n, r) {
  r === void 0 && (r = {})
  let {
      ancestorScroll: i = !0,
      ancestorResize: a = !0,
      elementResize: o = typeof ResizeObserver == `function`,
      layoutShift: s = typeof IntersectionObserver == `function`,
      animationFrame: c = !1,
    } = r,
    l = Dc(e),
    u = i || a ? [...(l ? wc(l) : []), ...(t ? wc(t) : [])] : []
  u.forEach((e) => {
    ;(i && e.addEventListener(`scroll`, n, { passive: !0 }), a && e.addEventListener(`resize`, n))
  })
  let d = l && s ? el(l, n) : null,
    f = -1,
    p = null
  o &&
    ((p = new ResizeObserver((e) => {
      let [r] = e
      ;(r &&
        r.target === l &&
        p &&
        t &&
        (p.unobserve(t),
        cancelAnimationFrame(f),
        (f = requestAnimationFrame(() => {
          var e
          ;(e = p) == null || e.observe(t)
        }))),
        n())
    })),
    l && !c && p.observe(l),
    t && p.observe(t))
  let m,
    h = c ? Mc(e) : null
  c && g()
  function g() {
    let t = Mc(e)
    ;(h && !$c(h, t) && n(), (h = t), (m = requestAnimationFrame(g)))
  }
  return (
    n(),
    () => {
      var e
      ;(u.forEach((e) => {
        ;(i && e.removeEventListener(`scroll`, n), a && e.removeEventListener(`resize`, n))
      }),
        d?.(),
        (e = p) == null || e.disconnect(),
        (p = null),
        c && cancelAnimationFrame(m))
    }
  )
}
var nl = Zs,
  rl = Qs,
  il = Gs,
  al = ec,
  ol = Js,
  sl = Ws,
  cl = $s,
  ll = (e, t, n) => {
    let r = new Map(),
      i = { platform: Qc, ...n },
      a = { ...i.platform, _c: r }
    return Us(e, t, { ...i, platform: a })
  },
  ul = typeof document < `u` ? u.useLayoutEffect : function () {}
function dl(e, t) {
  if (e === t) return !0
  if (typeof e != typeof t) return !1
  if (typeof e == `function` && e.toString() === t.toString()) return !0
  let n, r, i
  if (e && t && typeof e == `object`) {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1
      for (r = n; r-- !== 0; ) if (!dl(e[r], t[r])) return !1
      return !0
    }
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length)) return !1
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, i[r])) return !1
    for (r = n; r-- !== 0; ) {
      let n = i[r]
      if (!(n === `_owner` && e.$$typeof) && !dl(e[n], t[n])) return !1
    }
    return !0
  }
  return e !== e && t !== t
}
function fl(e) {
  return typeof window > `u` ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
}
function pl(e, t) {
  let n = fl(e)
  return Math.round(t * n) / n
}
function ml(e) {
  let t = u.useRef(e)
  return (
    ul(() => {
      t.current = e
    }),
    t
  )
}
function hl(e) {
  e === void 0 && (e = {})
  let {
      placement: t = `bottom`,
      strategy: n = `absolute`,
      middleware: r = [],
      platform: i,
      elements: { reference: a, floating: o } = {},
      transform: s = !0,
      whileElementsMounted: c,
      open: l,
    } = e,
    [f, p] = u.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [m, h] = u.useState(r)
  dl(m, r) || h(r)
  let [g, _] = u.useState(null),
    [v, y] = u.useState(null),
    b = u.useCallback((e) => {
      e !== w.current && ((w.current = e), _(e))
    }, []),
    x = u.useCallback((e) => {
      e !== T.current && ((T.current = e), y(e))
    }, []),
    S = a || g,
    C = o || v,
    w = u.useRef(null),
    T = u.useRef(null),
    E = u.useRef(f),
    D = c != null,
    O = ml(c),
    k = ml(i),
    A = ml(l),
    j = u.useCallback(() => {
      if (!w.current || !T.current) return
      let e = { placement: t, strategy: n, middleware: m }
      ;(k.current && (e.platform = k.current),
        ll(w.current, T.current, e).then((e) => {
          let t = { ...e, isPositioned: A.current !== !1 }
          ee.current &&
            !dl(E.current, t) &&
            ((E.current = t),
            d.flushSync(() => {
              p(t)
            }))
        }))
    }, [m, t, n, k, A])
  ul(() => {
    l === !1 &&
      E.current.isPositioned &&
      ((E.current.isPositioned = !1), p((e) => ({ ...e, isPositioned: !1 })))
  }, [l])
  let ee = u.useRef(!1)
  ;(ul(
    () => (
      (ee.current = !0),
      () => {
        ee.current = !1
      }
    ),
    [],
  ),
    ul(() => {
      if ((S && (w.current = S), C && (T.current = C), S && C)) {
        if (O.current) return O.current(S, C, j)
        j()
      }
    }, [S, C, j, O, D]))
  let te = u.useMemo(
      () => ({ reference: w, floating: T, setReference: b, setFloating: x }),
      [b, x],
    ),
    ne = u.useMemo(() => ({ reference: S, floating: C }), [S, C]),
    M = u.useMemo(() => {
      let e = { position: n, left: 0, top: 0 }
      if (!ne.floating) return e
      let t = pl(ne.floating, f.x),
        r = pl(ne.floating, f.y)
      return s
        ? {
            ...e,
            transform: `translate(` + t + `px, ` + r + `px)`,
            ...(fl(ne.floating) >= 1.5 && { willChange: `transform` }),
          }
        : { position: n, left: t, top: r }
    }, [n, s, ne.floating, f.x, f.y])
  return u.useMemo(
    () => ({ ...f, update: j, refs: te, elements: ne, floatingStyles: M }),
    [f, j, te, ne, M],
  )
}
var gl = (e) => {
    function t(e) {
      return {}.hasOwnProperty.call(e, `current`)
    }
    return {
      name: `arrow`,
      options: e,
      fn(n) {
        let { element: r, padding: i } = typeof e == `function` ? e(n) : e
        return r && t(r)
          ? r.current == null
            ? {}
            : sl({ element: r.current, padding: i }).fn(n)
          : r
            ? sl({ element: r, padding: i }).fn(n)
            : {}
      },
    }
  },
  _l = (e, t) => {
    let n = nl(e)
    return { name: n.name, fn: n.fn, options: [e, t] }
  },
  vl = (e, t) => {
    let n = rl(e)
    return { name: n.name, fn: n.fn, options: [e, t] }
  },
  yl = (e, t) => ({ fn: cl(e).fn, options: [e, t] }),
  bl = (e, t) => {
    let n = il(e)
    return { name: n.name, fn: n.fn, options: [e, t] }
  },
  xl = (e, t) => {
    let n = al(e)
    return { name: n.name, fn: n.fn, options: [e, t] }
  },
  Sl = (e, t) => {
    let n = ol(e)
    return { name: n.name, fn: n.fn, options: [e, t] }
  },
  Cl = (e, t) => {
    let n = gl(e)
    return { name: n.name, fn: n.fn, options: [e, t] }
  },
  wl = `Arrow`,
  Tl = u.forwardRef((e, t) => {
    let { children: n, width: r = 10, height: i = 5, ...a } = e
    return (0, R.jsx)(z.svg, {
      ...a,
      ref: t,
      width: r,
      height: i,
      viewBox: `0 0 30 10`,
      preserveAspectRatio: `none`,
      children: e.asChild ? n : (0, R.jsx)(`polygon`, { points: `0,0 30,0 15,10` }),
    })
  })
Tl.displayName = wl
var El = Tl
function Dl(e) {
  let [t, n] = u.useState(void 0)
  return (
    Ar(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight })
        let t = new ResizeObserver((t) => {
          if (!Array.isArray(t) || !t.length) return
          let r = t[0],
            i,
            a
          if (`borderBoxSize` in r) {
            let e = r.borderBoxSize,
              t = Array.isArray(e) ? e[0] : e
            ;((i = t.inlineSize), (a = t.blockSize))
          } else ((i = e.offsetWidth), (a = e.offsetHeight))
          n({ width: i, height: a })
        })
        return (t.observe(e, { box: `border-box` }), () => t.unobserve(e))
      } else n(void 0)
    }, [e]),
    t
  )
}
var Ol = `Popper`,
  [kl, Al] = nr(Ol),
  [jl, Ml] = kl(Ol),
  Nl = (e) => {
    let { __scopePopper: t, children: n } = e,
      [r, i] = u.useState(null)
    return (0, R.jsx)(jl, { scope: t, anchor: r, onAnchorChange: i, children: n })
  }
Nl.displayName = Ol
var Pl = `PopperAnchor`,
  Fl = u.forwardRef((e, t) => {
    let { __scopePopper: n, virtualRef: r, ...i } = e,
      a = Ml(Pl, n),
      o = u.useRef(null),
      s = L(t, o),
      c = u.useRef(null)
    return (
      u.useEffect(() => {
        let e = c.current
        ;((c.current = r?.current || o.current), e !== c.current && a.onAnchorChange(c.current))
      }),
      r ? null : (0, R.jsx)(z.div, { ...i, ref: s })
    )
  })
Fl.displayName = Pl
var Il = `PopperContent`,
  [Ll, Rl] = kl(Il),
  K = u.forwardRef((e, t) => {
    let {
        __scopePopper: n,
        side: r = `bottom`,
        sideOffset: i = 0,
        align: a = `center`,
        alignOffset: o = 0,
        arrowPadding: s = 0,
        avoidCollisions: c = !0,
        collisionBoundary: l = [],
        collisionPadding: d = 0,
        sticky: f = `partial`,
        hideWhenDetached: p = !1,
        updatePositionStrategy: m = `optimized`,
        onPlaced: h,
        ...g
      } = e,
      _ = Ml(Il, n),
      [v, y] = u.useState(null),
      b = L(t, (e) => y(e)),
      [x, S] = u.useState(null),
      C = Dl(x),
      w = C?.width ?? 0,
      T = C?.height ?? 0,
      E = r + (a === `center` ? `` : `-` + a),
      D = typeof d == `number` ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d },
      O = Array.isArray(l) ? l : [l],
      k = O.length > 0,
      A = { padding: D, boundary: O.filter(X), altBoundary: k },
      {
        refs: j,
        floatingStyles: ee,
        placement: te,
        isPositioned: ne,
        middlewareData: M,
      } = hl({
        strategy: `fixed`,
        placement: E,
        whileElementsMounted: (...e) => tl(...e, { animationFrame: m === `always` }),
        elements: { reference: _.anchor },
        middleware: [
          _l({ mainAxis: i + T, alignmentAxis: o }),
          c && vl({ mainAxis: !0, crossAxis: !1, limiter: f === `partial` ? yl() : void 0, ...A }),
          c && bl({ ...A }),
          xl({
            ...A,
            apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
              let { width: i, height: a } = t.reference,
                o = e.floating.style
              ;(o.setProperty(`--radix-popper-available-width`, `${n}px`),
                o.setProperty(`--radix-popper-available-height`, `${r}px`),
                o.setProperty(`--radix-popper-anchor-width`, `${i}px`),
                o.setProperty(`--radix-popper-anchor-height`, `${a}px`))
            },
          }),
          x && Cl({ element: x, padding: s }),
          zl({ arrowWidth: w, arrowHeight: T }),
          p && Sl({ strategy: `referenceHidden`, ...A }),
        ],
      }),
      [N, P] = Bl(te),
      re = pr(h)
    Ar(() => {
      ne && re?.()
    }, [ne, re])
    let ie = M.arrow?.x,
      ae = M.arrow?.y,
      oe = M.arrow?.centerOffset !== 0,
      [se, F] = u.useState()
    return (
      Ar(() => {
        v && F(window.getComputedStyle(v).zIndex)
      }, [v]),
      (0, R.jsx)(`div`, {
        ref: j.setFloating,
        'data-radix-popper-content-wrapper': ``,
        style: {
          ...ee,
          transform: ne ? ee.transform : `translate(0, -200%)`,
          minWidth: `max-content`,
          zIndex: se,
          '--radix-popper-transform-origin': [M.transformOrigin?.x, M.transformOrigin?.y].join(` `),
          ...(M.hide?.referenceHidden && { visibility: `hidden`, pointerEvents: `none` }),
        },
        dir: e.dir,
        children: (0, R.jsx)(Ll, {
          scope: n,
          placedSide: N,
          onArrowChange: S,
          arrowX: ie,
          arrowY: ae,
          shouldHideArrow: oe,
          children: (0, R.jsx)(z.div, {
            'data-side': N,
            'data-align': P,
            ...g,
            ref: b,
            style: { ...g.style, animation: ne ? void 0 : `none` },
          }),
        }),
      })
    )
  })
K.displayName = Il
var q = `PopperArrow`,
  J = { top: `bottom`, right: `left`, bottom: `top`, left: `right` },
  Y = u.forwardRef(function (e, t) {
    let { __scopePopper: n, ...r } = e,
      i = Rl(q, n),
      a = J[i.placedSide]
    return (0, R.jsx)(`span`, {
      ref: i.onArrowChange,
      style: {
        position: `absolute`,
        left: i.arrowX,
        top: i.arrowY,
        [a]: 0,
        transformOrigin: { top: ``, right: `0 0`, bottom: `center 0`, left: `100% 0` }[
          i.placedSide
        ],
        transform: {
          top: `translateY(100%)`,
          right: `translateY(50%) rotate(90deg) translateX(-50%)`,
          bottom: `rotate(180deg)`,
          left: `translateY(50%) rotate(-90deg) translateX(50%)`,
        }[i.placedSide],
        visibility: i.shouldHideArrow ? `hidden` : void 0,
      },
      children: (0, R.jsx)(El, { ...r, ref: t, style: { ...r.style, display: `block` } }),
    })
  })
Y.displayName = q
function X(e) {
  return e !== null
}
var zl = (e) => ({
  name: `transformOrigin`,
  options: e,
  fn(t) {
    let { placement: n, rects: r, middlewareData: i } = t,
      a = i.arrow?.centerOffset !== 0,
      o = a ? 0 : e.arrowWidth,
      s = a ? 0 : e.arrowHeight,
      [c, l] = Bl(n),
      u = { start: `0%`, center: `50%`, end: `100%` }[l],
      d = (i.arrow?.x ?? 0) + o / 2,
      f = (i.arrow?.y ?? 0) + s / 2,
      p = ``,
      m = ``
    return (
      c === `bottom`
        ? ((p = a ? u : `${d}px`), (m = `${-s}px`))
        : c === `top`
          ? ((p = a ? u : `${d}px`), (m = `${r.floating.height + s}px`))
          : c === `right`
            ? ((p = `${-s}px`), (m = a ? u : `${f}px`))
            : c === `left` && ((p = `${r.floating.width + s}px`), (m = a ? u : `${f}px`)),
      { data: { x: p, y: m } }
    )
  },
})
function Bl(e) {
  let [t, n = `center`] = e.split(`-`)
  return [t, n]
}
var Vl = Nl,
  Hl = Fl,
  Ul = K,
  Wl = Y,
  [Gl, Kl] = nr(`Tooltip`, [Al]),
  ql = Al(),
  Jl = `TooltipProvider`,
  Yl = 700,
  Xl = `tooltip.open`,
  [Zl, Ql] = Gl(Jl),
  $l = (e) => {
    let {
        __scopeTooltip: t,
        delayDuration: n = Yl,
        skipDelayDuration: r = 300,
        disableHoverableContent: i = !1,
        children: a,
      } = e,
      o = u.useRef(!0),
      s = u.useRef(!1),
      c = u.useRef(0)
    return (
      u.useEffect(() => {
        let e = c.current
        return () => window.clearTimeout(e)
      }, []),
      (0, R.jsx)(Zl, {
        scope: t,
        isOpenDelayedRef: o,
        delayDuration: n,
        onOpen: u.useCallback(() => {
          ;(window.clearTimeout(c.current), (o.current = !1))
        }, []),
        onClose: u.useCallback(() => {
          ;(window.clearTimeout(c.current),
            (c.current = window.setTimeout(() => (o.current = !0), r)))
        }, [r]),
        isPointerInTransitRef: s,
        onPointerInTransitChange: u.useCallback((e) => {
          s.current = e
        }, []),
        disableHoverableContent: i,
        children: a,
      })
    )
  }
$l.displayName = Jl
var eu = `Tooltip`,
  [tu, nu] = Gl(eu),
  ru = (e) => {
    let {
        __scopeTooltip: t,
        children: n,
        open: r,
        defaultOpen: i,
        onOpenChange: a,
        disableHoverableContent: o,
        delayDuration: s,
      } = e,
      c = Ql(eu, e.__scopeTooltip),
      l = ql(t),
      [d, f] = u.useState(null),
      p = ds(),
      m = u.useRef(0),
      h = o ?? c.disableHoverableContent,
      g = s ?? c.delayDuration,
      _ = u.useRef(!1),
      [v, y] = zr({
        prop: r,
        defaultProp: i ?? !1,
        onChange: (e) => {
          ;(e ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Xl))) : c.onClose(), a?.(e))
        },
        caller: eu,
      }),
      b = u.useMemo(() => (v ? (_.current ? `delayed-open` : `instant-open`) : `closed`), [v]),
      x = u.useCallback(() => {
        ;(window.clearTimeout(m.current), (m.current = 0), (_.current = !1), y(!0))
      }, [y]),
      S = u.useCallback(() => {
        ;(window.clearTimeout(m.current), (m.current = 0), y(!1))
      }, [y]),
      C = u.useCallback(() => {
        ;(window.clearTimeout(m.current),
          (m.current = window.setTimeout(() => {
            ;((_.current = !0), y(!0), (m.current = 0))
          }, g)))
      }, [g, y])
    return (
      u.useEffect(
        () => () => {
          m.current &&= (window.clearTimeout(m.current), 0)
        },
        [],
      ),
      (0, R.jsx)(Vl, {
        ...l,
        children: (0, R.jsx)(tu, {
          scope: t,
          contentId: p,
          open: v,
          stateAttribute: b,
          trigger: d,
          onTriggerChange: f,
          onTriggerEnter: u.useCallback(() => {
            c.isOpenDelayedRef.current ? C() : x()
          }, [c.isOpenDelayedRef, C, x]),
          onTriggerLeave: u.useCallback(() => {
            h ? S() : (window.clearTimeout(m.current), (m.current = 0))
          }, [S, h]),
          onOpen: x,
          onClose: S,
          disableHoverableContent: h,
          children: n,
        }),
      })
    )
  }
ru.displayName = eu
var iu = `TooltipTrigger`,
  au = u.forwardRef((e, t) => {
    let { __scopeTooltip: n, ...r } = e,
      i = nu(iu, n),
      a = Ql(iu, n),
      o = ql(n),
      s = L(t, u.useRef(null), i.onTriggerChange),
      c = u.useRef(!1),
      l = u.useRef(!1),
      d = u.useCallback(() => (c.current = !1), [])
    return (
      u.useEffect(() => () => document.removeEventListener(`pointerup`, d), [d]),
      (0, R.jsx)(Hl, {
        asChild: !0,
        ...o,
        children: (0, R.jsx)(z.button, {
          'aria-describedby': i.open ? i.contentId : void 0,
          'data-state': i.stateAttribute,
          ...r,
          ref: s,
          onPointerMove: I(e.onPointerMove, (e) => {
            e.pointerType !== `touch` &&
              !l.current &&
              !a.isPointerInTransitRef.current &&
              (i.onTriggerEnter(), (l.current = !0))
          }),
          onPointerLeave: I(e.onPointerLeave, () => {
            ;(i.onTriggerLeave(), (l.current = !1))
          }),
          onPointerDown: I(e.onPointerDown, () => {
            ;(i.open && i.onClose(),
              (c.current = !0),
              document.addEventListener(`pointerup`, d, { once: !0 }))
          }),
          onFocus: I(e.onFocus, () => {
            c.current || i.onOpen()
          }),
          onBlur: I(e.onBlur, i.onClose),
          onClick: I(e.onClick, i.onClose),
        }),
      })
    )
  })
au.displayName = iu
var ou = `TooltipPortal`,
  [su, cu] = Gl(ou, { forceMount: void 0 }),
  lu = (e) => {
    let { __scopeTooltip: t, forceMount: n, children: r, container: i } = e,
      a = nu(ou, t)
    return (0, R.jsx)(su, {
      scope: t,
      forceMount: n,
      children: (0, R.jsx)(Pr, {
        present: n || a.open,
        children: (0, R.jsx)(Mr, { asChild: !0, container: i, children: r }),
      }),
    })
  }
lu.displayName = ou
var uu = `TooltipContent`,
  du = u.forwardRef((e, t) => {
    let n = cu(uu, e.__scopeTooltip),
      { forceMount: r = n.forceMount, side: i = `top`, ...a } = e,
      o = nu(uu, e.__scopeTooltip)
    return (0, R.jsx)(Pr, {
      present: r || o.open,
      children: o.disableHoverableContent
        ? (0, R.jsx)(gu, { side: i, ...a, ref: t })
        : (0, R.jsx)(fu, { side: i, ...a, ref: t }),
    })
  }),
  fu = u.forwardRef((e, t) => {
    let n = nu(uu, e.__scopeTooltip),
      r = Ql(uu, e.__scopeTooltip),
      i = u.useRef(null),
      a = L(t, i),
      [o, s] = u.useState(null),
      { trigger: c, onClose: l } = n,
      d = i.current,
      { onPointerInTransitChange: f } = r,
      p = u.useCallback(() => {
        ;(s(null), f(!1))
      }, [f]),
      m = u.useCallback(
        (e, t) => {
          let n = e.currentTarget,
            r = { x: e.clientX, y: e.clientY },
            i = bu(r, yu(r, n.getBoundingClientRect())),
            a = xu(t.getBoundingClientRect())
          ;(s(Cu([...i, ...a])), f(!0))
        },
        [f],
      )
    return (
      u.useEffect(() => () => p(), [p]),
      u.useEffect(() => {
        if (c && d) {
          let e = (e) => m(e, d),
            t = (e) => m(e, c)
          return (
            c.addEventListener(`pointerleave`, e),
            d.addEventListener(`pointerleave`, t),
            () => {
              ;(c.removeEventListener(`pointerleave`, e), d.removeEventListener(`pointerleave`, t))
            }
          )
        }
      }, [c, d, m, p]),
      u.useEffect(() => {
        if (o) {
          let e = (e) => {
            let t = e.target,
              n = { x: e.clientX, y: e.clientY },
              r = c?.contains(t) || d?.contains(t),
              i = !Su(n, o)
            r ? p() : i && (p(), l())
          }
          return (
            document.addEventListener(`pointermove`, e),
            () => document.removeEventListener(`pointermove`, e)
          )
        }
      }, [c, d, o, l, p]),
      (0, R.jsx)(gu, { ...e, ref: a })
    )
  }),
  [pu, mu] = Gl(eu, { isInside: !1 }),
  hu = sr(`TooltipContent`),
  gu = u.forwardRef((e, t) => {
    let {
        __scopeTooltip: n,
        children: r,
        'aria-label': i,
        onEscapeKeyDown: a,
        onPointerDownOutside: o,
        ...s
      } = e,
      c = nu(uu, n),
      l = ql(n),
      { onClose: d } = c
    return (
      u.useEffect(
        () => (document.addEventListener(Xl, d), () => document.removeEventListener(Xl, d)),
        [d],
      ),
      u.useEffect(() => {
        if (c.trigger) {
          let e = (e) => {
            e.target?.contains(c.trigger) && d()
          }
          return (
            window.addEventListener(`scroll`, e, { capture: !0 }),
            () => window.removeEventListener(`scroll`, e, { capture: !0 })
          )
        }
      }, [c.trigger, d]),
      (0, R.jsx)(xr, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: o,
        onFocusOutside: (e) => e.preventDefault(),
        onDismiss: d,
        children: (0, R.jsxs)(Ul, {
          'data-state': c.stateAttribute,
          ...l,
          ...s,
          ref: t,
          style: {
            ...s.style,
            '--radix-tooltip-content-transform-origin': `var(--radix-popper-transform-origin)`,
            '--radix-tooltip-content-available-width': `var(--radix-popper-available-width)`,
            '--radix-tooltip-content-available-height': `var(--radix-popper-available-height)`,
            '--radix-tooltip-trigger-width': `var(--radix-popper-anchor-width)`,
            '--radix-tooltip-trigger-height': `var(--radix-popper-anchor-height)`,
          },
          children: [
            (0, R.jsx)(hu, { children: r }),
            (0, R.jsx)(pu, {
              scope: n,
              isInside: !0,
              children: (0, R.jsx)(Gr, { id: c.contentId, role: `tooltip`, children: i || r }),
            }),
          ],
        }),
      })
    )
  })
du.displayName = uu
var _u = `TooltipArrow`,
  vu = u.forwardRef((e, t) => {
    let { __scopeTooltip: n, ...r } = e,
      i = ql(n)
    return mu(_u, n).isInside ? null : (0, R.jsx)(Wl, { ...i, ...r, ref: t })
  })
vu.displayName = _u
function yu(e, t) {
  let n = Math.abs(t.top - e.y),
    r = Math.abs(t.bottom - e.y),
    i = Math.abs(t.right - e.x),
    a = Math.abs(t.left - e.x)
  switch (Math.min(n, r, i, a)) {
    case a:
      return `left`
    case i:
      return `right`
    case n:
      return `top`
    case r:
      return `bottom`
    default:
      throw Error(`unreachable`)
  }
}
function bu(e, t, n = 5) {
  let r = []
  switch (t) {
    case `top`:
      r.push({ x: e.x - n, y: e.y + n }, { x: e.x + n, y: e.y + n })
      break
    case `bottom`:
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x + n, y: e.y - n })
      break
    case `left`:
      r.push({ x: e.x + n, y: e.y - n }, { x: e.x + n, y: e.y + n })
      break
    case `right`:
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x - n, y: e.y + n })
      break
  }
  return r
}
function xu(e) {
  let { top: t, right: n, bottom: r, left: i } = e
  return [
    { x: i, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: i, y: r },
  ]
}
function Su(e, t) {
  let { x: n, y: r } = e,
    i = !1
  for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
    let o = t[e],
      s = t[a],
      c = o.x,
      l = o.y,
      u = s.x,
      d = s.y
    l > r != d > r && n < ((u - c) * (r - l)) / (d - l) + c && (i = !i)
  }
  return i
}
function Cu(e) {
  let t = e.slice()
  return (t.sort((e, t) => (e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y))), wu(t))
}
function wu(e) {
  if (e.length <= 1) return e.slice()
  let t = []
  for (let n = 0; n < e.length; n++) {
    let r = e[n]
    for (; t.length >= 2; ) {
      let e = t[t.length - 1],
        n = t[t.length - 2]
      if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop()
      else break
    }
    t.push(r)
  }
  t.pop()
  let n = []
  for (let t = e.length - 1; t >= 0; t--) {
    let r = e[t]
    for (; n.length >= 2; ) {
      let e = n[n.length - 1],
        t = n[n.length - 2]
      if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop()
      else break
    }
    n.push(r)
  }
  return (
    n.pop(),
    t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n)
  )
}
var Tu = $l,
  Eu = ru,
  Du = au,
  Ou = du,
  ku = Tu,
  Au = Eu,
  ju = Du,
  Mu = u.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) =>
    (0, R.jsx)(Ou, {
      ref: r,
      sideOffset: t,
      className: G(
        `z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]`,
        e,
      ),
      ...n,
    }),
  )
Mu.displayName = Ou.displayName
var Nu = Symbol.for(`react.lazy`),
  Pu = u.use
function Fu(e) {
  return typeof e == `object` && !!e && `then` in e
}
function Iu(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `$$typeof` in e &&
    e.$$typeof === Nu &&
    `_payload` in e &&
    Fu(e._payload)
  )
}
function Lu(e) {
  let t = zu(e),
    n = u.forwardRef((e, n) => {
      let { children: r, ...i } = e
      Iu(r) && typeof Pu == `function` && (r = Pu(r._payload))
      let a = u.Children.toArray(r),
        o = a.find(Vu)
      if (o) {
        let e = o.props.children,
          r = a.map((t) =>
            t === o
              ? u.Children.count(e) > 1
                ? u.Children.only(null)
                : u.isValidElement(e)
                  ? e.props.children
                  : null
              : t,
          )
        return (0, R.jsx)(t, {
          ...i,
          ref: n,
          children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null,
        })
      }
      return (0, R.jsx)(t, { ...i, ref: n, children: r })
    })
  return ((n.displayName = `${e}.Slot`), n)
}
var Ru = Lu(`Slot`)
function zu(e) {
  let t = u.forwardRef((e, t) => {
    let { children: n, ...r } = e
    if ((Iu(n) && typeof Pu == `function` && (n = Pu(n._payload)), u.isValidElement(n))) {
      let e = Uu(n),
        i = Hu(r, n.props)
      return (n.type !== u.Fragment && (i.ref = t ? er(t, e) : e), u.cloneElement(n, i))
    }
    return u.Children.count(n) > 1 ? u.Children.only(null) : null
  })
  return ((t.displayName = `${e}.SlotClone`), t)
}
var Bu = Symbol(`radix.slottable`)
function Vu(e) {
  return (
    u.isValidElement(e) &&
    typeof e.type == `function` &&
    `__radixId` in e.type &&
    e.type.__radixId === Bu
  )
}
function Hu(e, t) {
  let n = { ...t }
  for (let r in t) {
    let i = e[r],
      a = t[r]
    ;/^on[A-Z]/.test(r)
      ? i && a
        ? (n[r] = (...e) => {
            let t = a(...e)
            return (i(...e), t)
          })
        : i && (n[r] = i)
      : r === `style`
        ? (n[r] = { ...i, ...a })
        : r === `className` && (n[r] = [i, a].filter(Boolean).join(` `))
  }
  return { ...e, ...n }
}
function Uu(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref)
}
var Wu = 768
function Z() {
  let [e, t] = u.useState(void 0)
  return (
    u.useEffect(() => {
      let e = window.matchMedia(`(max-width: ${Wu - 1}px)`),
        n = () => {
          t(window.innerWidth < Wu)
        }
      return (
        e.addEventListener(`change`, n),
        t(window.innerWidth < Wu),
        () => e.removeEventListener(`change`, n)
      )
    }, []),
    !!e
  )
}
var Gu = Ui(
    `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
    {
      variants: {
        variant: {
          default: `bg-primary text-primary-foreground hover:bg-primary/90`,
          destructive: `bg-destructive text-destructive-foreground hover:bg-destructive/90`,
          outline: `border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground`,
          secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80`,
          ghost: `text-foreground hover:bg-accent hover:text-accent-foreground`,
          link: `text-foreground underline-offset-4 hover:underline`,
        },
        size: {
          default: `h-10 px-4 py-2`,
          sm: `h-9 rounded-md px-3`,
          lg: `h-11 rounded-md px-8`,
          icon: `h-10 w-10`,
        },
      },
      defaultVariants: { variant: `default`, size: `default` },
    },
  ),
  Ku = u.forwardRef(({ className: e, variant: t, size: n, asChild: r = !1, ...i }, a) =>
    (0, R.jsx)(r ? Ru : `button`, {
      className: G(Gu({ variant: t, size: n, className: e })),
      ref: a,
      ...i,
    }),
  )
Ku.displayName = `Button`
var qu = u.forwardRef(({ className: e, type: t, ...n }, r) =>
  (0, R.jsx)(`input`, {
    type: t,
    className: G(
      `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
      e,
    ),
    ref: r,
    ...n,
  }),
)
qu.displayName = `Input`
var Ju = [
    `a`,
    `button`,
    `div`,
    `form`,
    `h2`,
    `h3`,
    `img`,
    `input`,
    `label`,
    `li`,
    `nav`,
    `ol`,
    `p`,
    `select`,
    `span`,
    `svg`,
    `ul`,
  ].reduce((e, t) => {
    let n = Lu(`Primitive.${t}`),
      r = u.forwardRef((e, r) => {
        let { asChild: i, ...a } = e,
          o = i ? n : t
        return (
          typeof window < `u` && (window[Symbol.for(`radix-ui`)] = !0),
          (0, R.jsx)(o, { ...a, ref: r })
        )
      })
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r })
  }, {}),
  Yu = `Separator`,
  Xu = `horizontal`,
  Zu = [`horizontal`, `vertical`],
  Qu = u.forwardRef((e, t) => {
    let { decorative: n, orientation: r = Xu, ...i } = e,
      a = $u(r) ? r : Xu,
      o = n
        ? { role: `none` }
        : { 'aria-orientation': a === `vertical` ? a : void 0, role: `separator` }
    return (0, R.jsx)(Ju.div, { 'data-orientation': a, ...o, ...i, ref: t })
  })
Qu.displayName = Yu
function $u(e) {
  return Zu.includes(e)
}
var ed = Qu,
  td = u.forwardRef(
    ({ className: e, orientation: t = `horizontal`, decorative: n = !0, ...r }, i) =>
      (0, R.jsx)(ed, {
        ref: i,
        decorative: n,
        orientation: t,
        className: G(
          `shrink-0 bg-border`,
          t === `horizontal` ? `h-[1px] w-full` : `h-full w-[1px]`,
          e,
        ),
        ...r,
      }),
  )
td.displayName = ed.displayName
var nd = `focusScope.autoFocusOnMount`,
  rd = `focusScope.autoFocusOnUnmount`,
  id = { bubbles: !1, cancelable: !0 },
  ad = `FocusScope`,
  od = u.forwardRef((e, t) => {
    let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: a, ...o } = e,
      [s, c] = u.useState(null),
      l = pr(i),
      d = pr(a),
      f = u.useRef(null),
      p = L(t, (e) => c(e)),
      m = u.useRef({
        paused: !1,
        pause() {
          this.paused = !0
        },
        resume() {
          this.paused = !1
        },
      }).current
    ;(u.useEffect(() => {
      if (r) {
        let e = function (e) {
            if (m.paused || !s) return
            let t = e.target
            s.contains(t) ? (f.current = t) : pd(f.current, { select: !0 })
          },
          t = function (e) {
            if (m.paused || !s) return
            let t = e.relatedTarget
            t !== null && (s.contains(t) || pd(f.current, { select: !0 }))
          },
          n = function (e) {
            if (document.activeElement === document.body)
              for (let t of e) t.removedNodes.length > 0 && pd(s)
          }
        ;(document.addEventListener(`focusin`, e), document.addEventListener(`focusout`, t))
        let r = new MutationObserver(n)
        return (
          s && r.observe(s, { childList: !0, subtree: !0 }),
          () => {
            ;(document.removeEventListener(`focusin`, e),
              document.removeEventListener(`focusout`, t),
              r.disconnect())
          }
        )
      }
    }, [r, s, m.paused]),
      u.useEffect(() => {
        if (s) {
          md.add(m)
          let e = document.activeElement
          if (!s.contains(e)) {
            let t = new CustomEvent(nd, id)
            ;(s.addEventListener(nd, l),
              s.dispatchEvent(t),
              t.defaultPrevented ||
                (sd(_d(ld(s)), { select: !0 }), document.activeElement === e && pd(s)))
          }
          return () => {
            ;(s.removeEventListener(nd, l),
              setTimeout(() => {
                let t = new CustomEvent(rd, id)
                ;(s.addEventListener(rd, d),
                  s.dispatchEvent(t),
                  t.defaultPrevented || pd(e ?? document.body, { select: !0 }),
                  s.removeEventListener(rd, d),
                  md.remove(m))
              }, 0))
          }
        }
      }, [s, l, d, m]))
    let h = u.useCallback(
      (e) => {
        if ((!n && !r) || m.paused) return
        let t = e.key === `Tab` && !e.altKey && !e.ctrlKey && !e.metaKey,
          i = document.activeElement
        if (t && i) {
          let t = e.currentTarget,
            [r, a] = cd(t)
          r && a
            ? !e.shiftKey && i === a
              ? (e.preventDefault(), n && pd(r, { select: !0 }))
              : e.shiftKey && i === r && (e.preventDefault(), n && pd(a, { select: !0 }))
            : i === t && e.preventDefault()
        }
      },
      [n, r, m.paused],
    )
    return (0, R.jsx)(z.div, { tabIndex: -1, ...o, ref: p, onKeyDown: h })
  })
od.displayName = ad
function sd(e, { select: t = !1 } = {}) {
  let n = document.activeElement
  for (let r of e) if ((pd(r, { select: t }), document.activeElement !== n)) return
}
function cd(e) {
  let t = ld(e)
  return [ud(t, e), ud(t.reverse(), e)]
}
function ld(e) {
  let t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (e) => {
        let t = e.tagName === `INPUT` && e.type === `hidden`
        return e.disabled || e.hidden || t
          ? NodeFilter.FILTER_SKIP
          : e.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP
      },
    })
  for (; n.nextNode(); ) t.push(n.currentNode)
  return t
}
function ud(e, t) {
  for (let n of e) if (!dd(n, { upTo: t })) return n
}
function dd(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === `hidden`) return !0
  for (; e; ) {
    if (t !== void 0 && e === t) return !1
    if (getComputedStyle(e).display === `none`) return !0
    e = e.parentElement
  }
  return !1
}
function fd(e) {
  return e instanceof HTMLInputElement && `select` in e
}
function pd(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    let n = document.activeElement
    ;(e.focus({ preventScroll: !0 }), e !== n && fd(e) && t && e.select())
  }
}
var md = hd()
function hd() {
  let e = []
  return {
    add(t) {
      let n = e[0]
      ;(t !== n && n?.pause(), (e = gd(e, t)), e.unshift(t))
    },
    remove(t) {
      ;((e = gd(e, t)), e[0]?.resume())
    },
  }
}
function gd(e, t) {
  let n = [...e],
    r = n.indexOf(t)
  return (r !== -1 && n.splice(r, 1), n)
}
function _d(e) {
  return e.filter((e) => e.tagName !== `A`)
}
var vd = 0
function yd() {
  u.useEffect(() => {
    let e = document.querySelectorAll(`[data-radix-focus-guard]`)
    return (
      document.body.insertAdjacentElement(`afterbegin`, e[0] ?? Q()),
      document.body.insertAdjacentElement(`beforeend`, e[1] ?? Q()),
      vd++,
      () => {
        ;(vd === 1 &&
          document.querySelectorAll(`[data-radix-focus-guard]`).forEach((e) => e.remove()),
          vd--)
      }
    )
  }, [])
}
function Q() {
  let e = document.createElement(`span`)
  return (
    e.setAttribute(`data-radix-focus-guard`, ``),
    (e.tabIndex = 0),
    (e.style.outline = `none`),
    (e.style.opacity = `0`),
    (e.style.position = `fixed`),
    (e.style.pointerEvents = `none`),
    e
  )
}
var bd = function () {
  return (
    (bd =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var i in ((t = arguments[n]), t))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        return e
      }),
    bd.apply(this, arguments)
  )
}
function xd(e, t) {
  var n = {}
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r])
  if (e != null && typeof Object.getOwnPropertySymbols == `function`)
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]])
  return n
}
function Sd(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) && ((a ||= Array.prototype.slice.call(t, 0, r)), (a[r] = t[r]))
  return e.concat(a || Array.prototype.slice.call(t))
}
var Cd = `right-scroll-bar-position`,
  wd = `width-before-scroll-bar`,
  Td = `with-scroll-bars-hidden`,
  Ed = `--removed-body-scroll-bar-size`
function Dd(e, t) {
  return (typeof e == `function` ? e(t) : e && (e.current = t), e)
}
function Od(e, t) {
  var n = (0, u.useState)(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value
        },
        set current(e) {
          var t = n.value
          t !== e && ((n.value = e), n.callback(e, t))
        },
      },
    }
  })[0]
  return ((n.callback = t), n.facade)
}
var kd = typeof window < `u` ? u.useLayoutEffect : u.useEffect,
  Ad = new WeakMap()
function jd(e, t) {
  var n = Od(t || null, function (t) {
    return e.forEach(function (e) {
      return Dd(e, t)
    })
  })
  return (
    kd(
      function () {
        var t = Ad.get(n)
        if (t) {
          var r = new Set(t),
            i = new Set(e),
            a = n.current
          ;(r.forEach(function (e) {
            i.has(e) || Dd(e, null)
          }),
            i.forEach(function (e) {
              r.has(e) || Dd(e, a)
            }))
        }
        Ad.set(n, e)
      },
      [e],
    ),
    n
  )
}
function Md(e) {
  return e
}
function $(e, t) {
  t === void 0 && (t = Md)
  var n = [],
    r = !1
  return {
    read: function () {
      if (r)
        throw Error(
          'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.',
        )
      return n.length ? n[n.length - 1] : e
    },
    useMedium: function (e) {
      var i = t(e, r)
      return (
        n.push(i),
        function () {
          n = n.filter(function (e) {
            return e !== i
          })
        }
      )
    },
    assignSyncMedium: function (e) {
      for (r = !0; n.length; ) {
        var t = n
        ;((n = []), t.forEach(e))
      }
      n = {
        push: function (t) {
          return e(t)
        },
        filter: function () {
          return n
        },
      }
    },
    assignMedium: function (e) {
      r = !0
      var t = []
      if (n.length) {
        var i = n
        ;((n = []), i.forEach(e), (t = n))
      }
      var a = function () {
          var n = t
          ;((t = []), n.forEach(e))
        },
        o = function () {
          return Promise.resolve().then(a)
        }
      ;(o(),
        (n = {
          push: function (e) {
            ;(t.push(e), o())
          },
          filter: function (e) {
            return ((t = t.filter(e)), n)
          },
        }))
    },
  }
}
function Nd(e) {
  e === void 0 && (e = {})
  var t = $(null)
  return ((t.options = bd({ async: !0, ssr: !1 }, e)), t)
}
var Pd = function (e) {
  var t = e.sideCar,
    n = xd(e, [`sideCar`])
  if (!t) throw Error('Sidecar: please provide `sideCar` property to import the right car')
  var r = t.read()
  if (!r) throw Error(`Sidecar medium not found`)
  return u.createElement(r, bd({}, n))
}
Pd.isSideCarExport = !0
function Fd(e, t) {
  return (e.useMedium(t), Pd)
}
var Id = Nd(),
  Ld = function () {},
  Rd = u.forwardRef(function (e, t) {
    var n = u.useRef(null),
      r = u.useState({ onScrollCapture: Ld, onWheelCapture: Ld, onTouchMoveCapture: Ld }),
      i = r[0],
      a = r[1],
      o = e.forwardProps,
      s = e.children,
      c = e.className,
      l = e.removeScrollBar,
      d = e.enabled,
      f = e.shards,
      p = e.sideCar,
      m = e.noRelative,
      h = e.noIsolation,
      g = e.inert,
      _ = e.allowPinchZoom,
      v = e.as,
      y = v === void 0 ? `div` : v,
      b = e.gapMode,
      x = xd(e, [
        `forwardProps`,
        `children`,
        `className`,
        `removeScrollBar`,
        `enabled`,
        `shards`,
        `sideCar`,
        `noRelative`,
        `noIsolation`,
        `inert`,
        `allowPinchZoom`,
        `as`,
        `gapMode`,
      ]),
      S = p,
      C = jd([n, t]),
      w = bd(bd({}, x), i)
    return u.createElement(
      u.Fragment,
      null,
      d &&
        u.createElement(S, {
          sideCar: Id,
          removeScrollBar: l,
          shards: f,
          noRelative: m,
          noIsolation: h,
          inert: g,
          setCallbacks: a,
          allowPinchZoom: !!_,
          lockRef: n,
          gapMode: b,
        }),
      o
        ? u.cloneElement(u.Children.only(s), bd(bd({}, w), { ref: C }))
        : u.createElement(y, bd({}, w, { className: c, ref: C }), s),
    )
  })
;((Rd.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
  (Rd.classNames = { fullWidth: wd, zeroRight: Cd }))
var zd,
  Bd = function () {
    if (zd) return zd
    if (typeof __webpack_nonce__ < `u`) return __webpack_nonce__
  }
function Vd() {
  if (!document) return null
  var e = document.createElement(`style`)
  e.type = `text/css`
  var t = Bd()
  return (t && e.setAttribute(`nonce`, t), e)
}
function Hd(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t))
}
function Ud(e) {
  ;(document.head || document.getElementsByTagName(`head`)[0]).appendChild(e)
}
var Wd = function () {
    var e = 0,
      t = null
    return {
      add: function (n) {
        ;(e == 0 && (t = Vd()) && (Hd(t, n), Ud(t)), e++)
      },
      remove: function () {
        ;(e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)))
      },
    }
  },
  Gd = function () {
    var e = Wd()
    return function (t, n) {
      u.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove()
            }
          )
        },
        [t && n],
      )
    }
  },
  Kd = function () {
    var e = Gd()
    return function (t) {
      var n = t.styles,
        r = t.dynamic
      return (e(n, r), null)
    }
  },
  qd = { left: 0, top: 0, right: 0, gap: 0 },
  Jd = function (e) {
    return parseInt(e || ``, 10) || 0
  },
  Yd = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === `padding` ? `paddingLeft` : `marginLeft`],
      r = t[e === `padding` ? `paddingTop` : `marginTop`],
      i = t[e === `padding` ? `paddingRight` : `marginRight`]
    return [Jd(n), Jd(r), Jd(i)]
  },
  Xd = function (e) {
    if ((e === void 0 && (e = `margin`), typeof window > `u`)) return qd
    var t = Yd(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth
    return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) }
  },
  Zd = Kd(),
  Qd = `data-scroll-locked`,
  $d = function (e, t, n, r) {
    var i = e.left,
      a = e.top,
      o = e.right,
      s = e.gap
    return (
      n === void 0 && (n = `margin`),
      `
  .${Td} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Qd}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
      t && `position: relative ${r};`,
      n === `margin` &&
        `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
      n === `padding` && `padding-right: ${s}px ${r};`,
    ]
      .filter(Boolean)
      .join(``)}
  }
  
  .${Cd} {
    right: ${s}px ${r};
  }
  
  .${wd} {
    margin-right: ${s}px ${r};
  }
  
  .${Cd} .${Cd} {
    right: 0 ${r};
  }
  
  .${wd} .${wd} {
    margin-right: 0 ${r};
  }
  
  body[${Qd}] {
    ${Ed}: ${s}px;
  }
`
    )
  },
  ef = function () {
    var e = parseInt(document.body.getAttribute(`data-scroll-locked`) || `0`, 10)
    return isFinite(e) ? e : 0
  },
  tf = function () {
    u.useEffect(function () {
      return (
        document.body.setAttribute(Qd, (ef() + 1).toString()),
        function () {
          var e = ef() - 1
          e <= 0 ? document.body.removeAttribute(Qd) : document.body.setAttribute(Qd, e.toString())
        }
      )
    }, [])
  },
  nf = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      i = r === void 0 ? `margin` : r
    tf()
    var a = u.useMemo(
      function () {
        return Xd(i)
      },
      [i],
    )
    return u.createElement(Zd, { styles: $d(a, !t, i, n ? `` : `!important`) })
  },
  rf = !1
if (typeof window < `u`)
  try {
    var af = Object.defineProperty({}, `passive`, {
      get: function () {
        return ((rf = !0), !0)
      },
    })
    ;(window.addEventListener(`test`, af, af), window.removeEventListener(`test`, af, af))
  } catch {
    rf = !1
  }
var of = rf ? { passive: !1 } : !1,
  sf = function (e) {
    return e.tagName === `TEXTAREA`
  },
  cf = function (e, t) {
    if (!(e instanceof Element)) return !1
    var n = window.getComputedStyle(e)
    return n[t] !== `hidden` && !(n.overflowY === n.overflowX && !sf(e) && n[t] === `visible`)
  },
  lf = function (e) {
    return cf(e, `overflowY`)
  },
  uf = function (e) {
    return cf(e, `overflowX`)
  },
  df = function (e, t) {
    var n = t.ownerDocument,
      r = t
    do {
      if ((typeof ShadowRoot < `u` && r instanceof ShadowRoot && (r = r.host), mf(e, r))) {
        var i = hf(e, r)
        if (i[1] > i[2]) return !0
      }
      r = r.parentNode
    } while (r && r !== n.body)
    return !1
  },
  ff = function (e) {
    return [e.scrollTop, e.scrollHeight, e.clientHeight]
  },
  pf = function (e) {
    return [e.scrollLeft, e.scrollWidth, e.clientWidth]
  },
  mf = function (e, t) {
    return e === `v` ? lf(t) : uf(t)
  },
  hf = function (e, t) {
    return e === `v` ? ff(t) : pf(t)
  },
  gf = function (e, t) {
    return e === `h` && t === `rtl` ? -1 : 1
  },
  _f = function (e, t, n, r, i) {
    var a = gf(e, window.getComputedStyle(t).direction),
      o = a * r,
      s = n.target,
      c = t.contains(s),
      l = !1,
      u = o > 0,
      d = 0,
      f = 0
    do {
      if (!s) break
      var p = hf(e, s),
        m = p[0],
        h = p[1] - p[2] - a * m
      ;(m || h) && mf(e, s) && ((d += h), (f += m))
      var g = s.parentNode
      s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g
    } while ((!c && s !== document.body) || (c && (t.contains(s) || t === s)))
    return (
      ((u && ((i && Math.abs(d) < 1) || (!i && o > d))) ||
        (!u && ((i && Math.abs(f) < 1) || (!i && -o > f)))) &&
        (l = !0),
      l
    )
  },
  vf = function (e) {
    return `changedTouches` in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0]
  },
  yf = function (e) {
    return [e.deltaX, e.deltaY]
  },
  bf = function (e) {
    return e && `current` in e ? e.current : e
  },
  xf = function (e, t) {
    return e[0] === t[0] && e[1] === t[1]
  },
  Sf = function (e) {
    return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`
  },
  Cf = 0,
  wf = []
function Tf(e) {
  var t = u.useRef([]),
    n = u.useRef([0, 0]),
    r = u.useRef(),
    i = u.useState(Cf++)[0],
    a = u.useState(Kd)[0],
    o = u.useRef(e)
  ;(u.useEffect(
    function () {
      o.current = e
    },
    [e],
  ),
    u.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add(`block-interactivity-${i}`)
          var t = Sd([e.lockRef.current], (e.shards || []).map(bf), !0).filter(Boolean)
          return (
            t.forEach(function (e) {
              return e.classList.add(`allow-interactivity-${i}`)
            }),
            function () {
              ;(document.body.classList.remove(`block-interactivity-${i}`),
                t.forEach(function (e) {
                  return e.classList.remove(`allow-interactivity-${i}`)
                }))
            }
          )
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ))
  var s = u.useCallback(function (e, t) {
      if ((`touches` in e && e.touches.length === 2) || (e.type === `wheel` && e.ctrlKey))
        return !o.current.allowPinchZoom
      var i = vf(e),
        a = n.current,
        s = `deltaX` in e ? e.deltaX : a[0] - i[0],
        c = `deltaY` in e ? e.deltaY : a[1] - i[1],
        l,
        u = e.target,
        d = Math.abs(s) > Math.abs(c) ? `h` : `v`
      if (`touches` in e && d === `h` && u.type === `range`) return !1
      var f = window.getSelection(),
        p = f && f.anchorNode
      if (p && (p === u || p.contains(u))) return !1
      var m = df(d, u)
      if (!m) return !0
      if ((m ? (l = d) : ((l = d === `v` ? `h` : `v`), (m = df(d, u))), !m)) return !1
      if ((!r.current && `changedTouches` in e && (s || c) && (r.current = l), !l)) return !0
      var h = r.current || l
      return _f(h, t, e, h === `h` ? s : c, !0)
    }, []),
    c = u.useCallback(function (e) {
      var n = e
      if (!(!wf.length || wf[wf.length - 1] !== a)) {
        var r = `deltaY` in n ? yf(n) : vf(n),
          i = t.current.filter(function (e) {
            return (
              e.name === n.type &&
              (e.target === n.target || n.target === e.shadowParent) &&
              xf(e.delta, r)
            )
          })[0]
        if (i && i.should) {
          n.cancelable && n.preventDefault()
          return
        }
        if (!i) {
          var c = (o.current.shards || [])
            .map(bf)
            .filter(Boolean)
            .filter(function (e) {
              return e.contains(n.target)
            })
          ;(c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) &&
            n.cancelable &&
            n.preventDefault()
        }
      }
    }, []),
    l = u.useCallback(function (e, n, r, i) {
      var a = { name: e, delta: n, target: r, should: i, shadowParent: Ef(r) }
      ;(t.current.push(a),
        setTimeout(function () {
          t.current = t.current.filter(function (e) {
            return e !== a
          })
        }, 1))
    }, []),
    d = u.useCallback(function (e) {
      ;((n.current = vf(e)), (r.current = void 0))
    }, []),
    f = u.useCallback(function (t) {
      l(t.type, yf(t), t.target, s(t, e.lockRef.current))
    }, []),
    p = u.useCallback(function (t) {
      l(t.type, vf(t), t.target, s(t, e.lockRef.current))
    }, [])
  u.useEffect(function () {
    return (
      wf.push(a),
      e.setCallbacks({ onScrollCapture: f, onWheelCapture: f, onTouchMoveCapture: p }),
      document.addEventListener(`wheel`, c, of),
      document.addEventListener(`touchmove`, c, of),
      document.addEventListener(`touchstart`, d, of),
      function () {
        ;((wf = wf.filter(function (e) {
          return e !== a
        })),
          document.removeEventListener(`wheel`, c, of),
          document.removeEventListener(`touchmove`, c, of),
          document.removeEventListener(`touchstart`, d, of))
      }
    )
  }, [])
  var m = e.removeScrollBar,
    h = e.inert
  return u.createElement(
    u.Fragment,
    null,
    h ? u.createElement(a, { styles: Sf(i) }) : null,
    m ? u.createElement(nf, { noRelative: e.noRelative, gapMode: e.gapMode }) : null,
  )
}
function Ef(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode))
  return t
}
var Df = Fd(Id, Tf),
  Of = u.forwardRef(function (e, t) {
    return u.createElement(Rd, bd({}, e, { ref: t, sideCar: Df }))
  })
Of.classNames = Rd.classNames
var kf = function (e) {
    return typeof document > `u` ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body
  },
  Af = new WeakMap(),
  jf = new WeakMap(),
  Mf = {},
  Nf = 0,
  Pf = function (e) {
    return e && (e.host || Pf(e.parentNode))
  },
  Ff = function (e, t) {
    return t
      .map(function (t) {
        if (e.contains(t)) return t
        var n = Pf(t)
        return n && e.contains(n)
          ? n
          : (console.error(`aria-hidden`, t, `in not contained inside`, e, `. Doing nothing`), null)
      })
      .filter(function (e) {
        return !!e
      })
  },
  If = function (e, t, n, r) {
    var i = Ff(t, Array.isArray(e) ? e : [e])
    Mf[n] || (Mf[n] = new WeakMap())
    var a = Mf[n],
      o = [],
      s = new Set(),
      c = new Set(i),
      l = function (e) {
        !e || s.has(e) || (s.add(e), l(e.parentNode))
      }
    i.forEach(l)
    var u = function (e) {
      !e ||
        c.has(e) ||
        Array.prototype.forEach.call(e.children, function (e) {
          if (s.has(e)) u(e)
          else
            try {
              var t = e.getAttribute(r),
                i = t !== null && t !== `false`,
                c = (Af.get(e) || 0) + 1,
                l = (a.get(e) || 0) + 1
              ;(Af.set(e, c),
                a.set(e, l),
                o.push(e),
                c === 1 && i && jf.set(e, !0),
                l === 1 && e.setAttribute(n, `true`),
                i || e.setAttribute(r, `true`))
            } catch (t) {
              console.error(`aria-hidden: cannot operate on `, e, t)
            }
        })
    }
    return (
      u(t),
      s.clear(),
      Nf++,
      function () {
        ;(o.forEach(function (e) {
          var t = Af.get(e) - 1,
            i = a.get(e) - 1
          ;(Af.set(e, t),
            a.set(e, i),
            t || (jf.has(e) || e.removeAttribute(r), jf.delete(e)),
            i || e.removeAttribute(n))
        }),
          Nf--,
          Nf || ((Af = new WeakMap()), (Af = new WeakMap()), (jf = new WeakMap()), (Mf = {})))
      }
    )
  },
  Lf = function (e, t, n) {
    n === void 0 && (n = `data-aria-hidden`)
    var r = Array.from(Array.isArray(e) ? e : [e]),
      i = t || kf(e)
    return i
      ? (r.push.apply(r, Array.from(i.querySelectorAll(`[aria-live], script`))),
        If(r, i, n, `aria-hidden`))
      : function () {
          return null
        }
  },
  Rf = `Dialog`,
  [zf, Bf] = nr(Rf),
  [Vf, Hf] = zf(Rf),
  Uf = (e) => {
    let {
        __scopeDialog: t,
        children: n,
        open: r,
        defaultOpen: i,
        onOpenChange: a,
        modal: o = !0,
      } = e,
      s = u.useRef(null),
      c = u.useRef(null),
      [l, d] = zr({ prop: r, defaultProp: i ?? !1, onChange: a, caller: Rf })
    return (0, R.jsx)(Vf, {
      scope: t,
      triggerRef: s,
      contentRef: c,
      contentId: ds(),
      titleId: ds(),
      descriptionId: ds(),
      open: l,
      onOpenChange: d,
      onOpenToggle: u.useCallback(() => d((e) => !e), [d]),
      modal: o,
      children: n,
    })
  }
Uf.displayName = Rf
var Wf = `DialogTrigger`,
  Gf = u.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = Hf(Wf, n),
      a = L(t, i.triggerRef)
    return (0, R.jsx)(z.button, {
      type: `button`,
      'aria-haspopup': `dialog`,
      'aria-expanded': i.open,
      'aria-controls': i.contentId,
      'data-state': dp(i.open),
      ...r,
      ref: a,
      onClick: I(e.onClick, i.onOpenToggle),
    })
  })
Gf.displayName = Wf
var Kf = `DialogPortal`,
  [qf, Jf] = zf(Kf, { forceMount: void 0 }),
  Yf = (e) => {
    let { __scopeDialog: t, forceMount: n, children: r, container: i } = e,
      a = Hf(Kf, t)
    return (0, R.jsx)(qf, {
      scope: t,
      forceMount: n,
      children: u.Children.map(r, (e) =>
        (0, R.jsx)(Pr, {
          present: n || a.open,
          children: (0, R.jsx)(Mr, { asChild: !0, container: i, children: e }),
        }),
      ),
    })
  }
Yf.displayName = Kf
var Xf = `DialogOverlay`,
  Zf = u.forwardRef((e, t) => {
    let n = Jf(Xf, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...i } = e,
      a = Hf(Xf, e.__scopeDialog)
    return a.modal
      ? (0, R.jsx)(Pr, { present: r || a.open, children: (0, R.jsx)($f, { ...i, ref: t }) })
      : null
  })
Zf.displayName = Xf
var Qf = ir(`DialogOverlay.RemoveScroll`),
  $f = u.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = Hf(Xf, n)
    return (0, R.jsx)(Of, {
      as: Qf,
      allowPinchZoom: !0,
      shards: [i.contentRef],
      children: (0, R.jsx)(z.div, {
        'data-state': dp(i.open),
        ...r,
        ref: t,
        style: { pointerEvents: `auto`, ...r.style },
      }),
    })
  }),
  ep = `DialogContent`,
  tp = u.forwardRef((e, t) => {
    let n = Jf(ep, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...i } = e,
      a = Hf(ep, e.__scopeDialog)
    return (0, R.jsx)(Pr, {
      present: r || a.open,
      children: a.modal ? (0, R.jsx)(np, { ...i, ref: t }) : (0, R.jsx)(rp, { ...i, ref: t }),
    })
  })
tp.displayName = ep
var np = u.forwardRef((e, t) => {
    let n = Hf(ep, e.__scopeDialog),
      r = u.useRef(null),
      i = L(t, n.contentRef, r)
    return (
      u.useEffect(() => {
        let e = r.current
        if (e) return Lf(e)
      }, []),
      (0, R.jsx)(ip, {
        ...e,
        ref: i,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: I(e.onCloseAutoFocus, (e) => {
          ;(e.preventDefault(), n.triggerRef.current?.focus())
        }),
        onPointerDownOutside: I(e.onPointerDownOutside, (e) => {
          let t = e.detail.originalEvent,
            n = t.button === 0 && t.ctrlKey === !0
          ;(t.button === 2 || n) && e.preventDefault()
        }),
        onFocusOutside: I(e.onFocusOutside, (e) => e.preventDefault()),
      })
    )
  }),
  rp = u.forwardRef((e, t) => {
    let n = Hf(ep, e.__scopeDialog),
      r = u.useRef(!1),
      i = u.useRef(!1)
    return (0, R.jsx)(ip, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (t) => {
        ;(e.onCloseAutoFocus?.(t),
          t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()),
          (r.current = !1),
          (i.current = !1))
      },
      onInteractOutside: (t) => {
        ;(e.onInteractOutside?.(t),
          t.defaultPrevented ||
            ((r.current = !0), t.detail.originalEvent.type === `pointerdown` && (i.current = !0)))
        let a = t.target
        ;(n.triggerRef.current?.contains(a) && t.preventDefault(),
          t.detail.originalEvent.type === `focusin` && i.current && t.preventDefault())
      },
    })
  }),
  ip = u.forwardRef((e, t) => {
    let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e,
      s = Hf(ep, n),
      c = u.useRef(null),
      l = L(t, c)
    return (
      yd(),
      (0, R.jsxs)(R.Fragment, {
        children: [
          (0, R.jsx)(od, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: i,
            onUnmountAutoFocus: a,
            children: (0, R.jsx)(xr, {
              role: `dialog`,
              id: s.contentId,
              'aria-describedby': s.descriptionId,
              'aria-labelledby': s.titleId,
              'data-state': dp(s.open),
              ...o,
              ref: l,
              onDismiss: () => s.onOpenChange(!1),
            }),
          }),
          (0, R.jsxs)(R.Fragment, {
            children: [
              (0, R.jsx)(hp, { titleId: s.titleId }),
              (0, R.jsx)(_p, { contentRef: c, descriptionId: s.descriptionId }),
            ],
          }),
        ],
      })
    )
  }),
  ap = `DialogTitle`,
  op = u.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = Hf(ap, n)
    return (0, R.jsx)(z.h2, { id: i.titleId, ...r, ref: t })
  })
op.displayName = ap
var sp = `DialogDescription`,
  cp = u.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = Hf(sp, n)
    return (0, R.jsx)(z.p, { id: i.descriptionId, ...r, ref: t })
  })
cp.displayName = sp
var lp = `DialogClose`,
  up = u.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = Hf(lp, n)
    return (0, R.jsx)(z.button, {
      type: `button`,
      ...r,
      ref: t,
      onClick: I(e.onClick, () => i.onOpenChange(!1)),
    })
  })
up.displayName = lp
function dp(e) {
  return e ? `open` : `closed`
}
var fp = `DialogTitleWarning`,
  [pp, mp] = tr(fp, { contentName: ep, titleName: ap, docsSlug: `dialog` }),
  hp = ({ titleId: e }) => {
    let t = mp(fp),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`
    return (
      u.useEffect(() => {
        e && (document.getElementById(e) || console.error(n))
      }, [n, e]),
      null
    )
  },
  gp = `DialogDescriptionWarning`,
  _p = ({ contentRef: e, descriptionId: t }) => {
    let n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${mp(gp).contentName}}.`
    return (
      u.useEffect(() => {
        let r = e.current?.getAttribute(`aria-describedby`)
        t && r && (document.getElementById(t) || console.warn(n))
      }, [n, e, t]),
      null
    )
  },
  vp = Uf,
  yp = Gf,
  bp = Yf,
  xp = Zf,
  Sp = tp,
  Cp = op,
  wp = cp,
  Tp = up,
  Ep = vp,
  Dp = yp,
  Op = Tp,
  kp = bp,
  Ap = u.forwardRef(({ className: e, ...t }, n) =>
    (0, R.jsx)(xp, {
      className: G(
        `fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`,
        e,
      ),
      ...t,
      ref: n,
    }),
  )
Ap.displayName = xp.displayName
var jp = Ui(
    `fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500`,
    {
      variants: {
        side: {
          top: `inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top`,
          bottom: `inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom`,
          left: `inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm`,
          right: `inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm`,
        },
      },
      defaultVariants: { side: `right` },
    },
  ),
  Mp = u.forwardRef(({ side: e = `right`, className: t, children: n, ...r }, i) =>
    (0, R.jsxs)(kp, {
      children: [
        (0, R.jsx)(Ap, {}),
        (0, R.jsxs)(Sp, {
          ref: i,
          className: G(jp({ side: e }), t),
          ...r,
          children: [
            n,
            (0, R.jsxs)(Tp, {
              className: `absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary`,
              children: [
                (0, R.jsx)(ya, { className: `h-4 w-4` }),
                (0, R.jsx)(`span`, { className: `sr-only`, children: `Close` }),
              ],
            }),
          ],
        }),
      ],
    }),
  )
Mp.displayName = Sp.displayName
var Np = ({ className: e, ...t }) =>
  (0, R.jsx)(`div`, { className: G(`flex flex-col space-y-2 text-center sm:text-left`, e), ...t })
Np.displayName = `SheetHeader`
var Pp = ({ className: e, ...t }) =>
  (0, R.jsx)(`div`, {
    className: G(`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2`, e),
    ...t,
  })
Pp.displayName = `SheetFooter`
var Fp = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(Cp, { ref: n, className: G(`text-lg font-semibold text-foreground`, e), ...t }),
)
Fp.displayName = Cp.displayName
var Ip = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(wp, { ref: n, className: G(`text-sm text-muted-foreground`, e), ...t }),
)
Ip.displayName = wp.displayName
function Lp({ className: e, ...t }) {
  return (0, R.jsx)(`div`, { className: G(`animate-pulse rounded-md bg-muted`, e), ...t })
}
var Rp = `sidebar_state`,
  zp = 3600 * 24 * 7,
  Bp = `16rem`,
  Vp = `18rem`,
  Hp = `3rem`,
  Up = `b`,
  Wp = u.createContext(null)
function Gp() {
  let e = u.useContext(Wp)
  if (!e) throw Error(`useSidebar must be used within a SidebarProvider.`)
  return e
}
var Kp = u.forwardRef(
  (
    { defaultOpen: e = !0, open: t, onOpenChange: n, className: r, style: i, children: a, ...o },
    s,
  ) => {
    let c = Z(),
      [l, d] = u.useState(!1),
      [f, p] = u.useState(e),
      m = t ?? f,
      h = u.useCallback(
        (e) => {
          let t = typeof e == `function` ? e(m) : e
          ;(n ? n(t) : p(t), (document.cookie = `${Rp}=${t}; path=/; max-age=${zp}`))
        },
        [n, m],
      ),
      g = u.useCallback(() => (c ? d((e) => !e) : h((e) => !e)), [c, h, d])
    u.useEffect(() => {
      let e = (e) => {
        e.key === Up && (e.metaKey || e.ctrlKey) && (e.preventDefault(), g())
      }
      return (window.addEventListener(`keydown`, e), () => window.removeEventListener(`keydown`, e))
    }, [g])
    let _ = m ? `expanded` : `collapsed`,
      v = u.useMemo(
        () => ({
          state: _,
          open: m,
          setOpen: h,
          isMobile: c,
          openMobile: l,
          setOpenMobile: d,
          toggleSidebar: g,
        }),
        [_, m, h, c, l, d, g],
      )
    return (0, R.jsx)(Wp.Provider, {
      value: v,
      children: (0, R.jsx)(ku, {
        delayDuration: 0,
        children: (0, R.jsx)(`div`, {
          style: { '--sidebar-width': Bp, '--sidebar-width-icon': Hp, ...i },
          className: G(
            `group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar`,
            r,
          ),
          ref: s,
          ...o,
          children: a,
        }),
      }),
    })
  },
)
Kp.displayName = `SidebarProvider`
var qp = u.forwardRef(
  (
    {
      side: e = `left`,
      variant: t = `sidebar`,
      collapsible: n = `offcanvas`,
      className: r,
      children: i,
      ...a
    },
    o,
  ) => {
    let { isMobile: s, state: c, openMobile: l, setOpenMobile: u } = Gp()
    return n === `none`
      ? (0, R.jsx)(`div`, {
          className: G(
            `flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground`,
            r,
          ),
          ref: o,
          ...a,
          children: i,
        })
      : s
        ? (0, R.jsx)(Ep, {
            open: l,
            onOpenChange: u,
            ...a,
            children: (0, R.jsxs)(Mp, {
              'data-sidebar': `sidebar`,
              'data-mobile': `true`,
              className: `w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden`,
              style: { '--sidebar-width': Vp },
              side: e,
              children: [
                (0, R.jsxs)(Np, {
                  className: `sr-only`,
                  children: [
                    (0, R.jsx)(Fp, { children: `Sidebar` }),
                    (0, R.jsx)(Ip, { children: `Displays the mobile sidebar.` }),
                  ],
                }),
                (0, R.jsx)(`div`, { className: `flex h-full w-full flex-col`, children: i }),
              ],
            }),
          })
        : (0, R.jsxs)(`div`, {
            ref: o,
            className: `group peer hidden text-sidebar-foreground md:block`,
            'data-state': c,
            'data-collapsible': c === `collapsed` ? n : ``,
            'data-variant': t,
            'data-side': e,
            children: [
              (0, R.jsx)(`div`, {
                className: G(
                  `relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear`,
                  `group-data-[collapsible=offcanvas]:w-0`,
                  `group-data-[side=right]:rotate-180`,
                  t === `floating` || t === `inset`
                    ? `group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]`
                    : `group-data-[collapsible=icon]:w-[--sidebar-width-icon]`,
                ),
              }),
              (0, R.jsx)(`div`, {
                className: G(
                  `fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex`,
                  e === `left`
                    ? `left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]`
                    : `right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]`,
                  t === `floating` || t === `inset`
                    ? `p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]`
                    : `group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l`,
                  r,
                ),
                ...a,
                children: (0, R.jsx)(`div`, {
                  'data-sidebar': `sidebar`,
                  className: `flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow`,
                  children: i,
                }),
              }),
            ],
          })
  },
)
qp.displayName = `Sidebar`
var Jp = u.forwardRef(({ className: e, onClick: t, ...n }, r) => {
  let { toggleSidebar: i } = Gp()
  return (0, R.jsx)(Ku, {
    ref: r,
    'data-sidebar': `trigger`,
    variant: `ghost`,
    size: `icon`,
    className: G(`h-7 w-7`, e),
    onClick: (e) => {
      ;(t?.(e), i())
    },
    ...n,
    children: (0, R.jsxs)(`span`, {
      children: [
        (0, R.jsx)(fa, {}),
        (0, R.jsx)(`span`, { className: `sr-only`, children: `Toggle Sidebar` }),
      ],
    }),
  })
})
Jp.displayName = `SidebarTrigger`
var Yp = u.forwardRef(({ className: e, ...t }, n) => {
  let { toggleSidebar: r } = Gp()
  return (0, R.jsx)(`button`, {
    ref: n,
    'data-sidebar': `rail`,
    'aria-label': `Toggle Sidebar`,
    tabIndex: -1,
    onClick: r,
    title: `Toggle Sidebar`,
    className: G(
      `absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex`,
      `[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize`,
      `[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize`,
      `group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar`,
      `[[data-side=left][data-collapsible=offcanvas]_&]:-right-2`,
      `[[data-side=right][data-collapsible=offcanvas]_&]:-left-2`,
      e,
    ),
    ...t,
  })
})
Yp.displayName = `SidebarRail`
var Xp = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(`main`, {
    ref: n,
    className: G(
      `relative flex w-full flex-1 flex-col bg-background`,
      `md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow`,
      e,
    ),
    ...t,
  }),
)
Xp.displayName = `SidebarInset`
var Zp = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(qu, {
    ref: n,
    'data-sidebar': `input`,
    className: G(
      `h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring`,
      e,
    ),
    ...t,
  }),
)
Zp.displayName = `SidebarInput`
var Qp = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(`div`, {
    ref: n,
    'data-sidebar': `header`,
    className: G(`flex flex-col gap-2 p-2`, e),
    ...t,
  }),
)
Qp.displayName = `SidebarHeader`
var $p = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(`div`, {
    ref: n,
    'data-sidebar': `footer`,
    className: G(`flex flex-col gap-2 p-2`, e),
    ...t,
  }),
)
$p.displayName = `SidebarFooter`
var em = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(td, {
    ref: n,
    'data-sidebar': `separator`,
    className: G(`mx-2 w-auto bg-sidebar-border`, e),
    ...t,
  }),
)
em.displayName = `SidebarSeparator`
var tm = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(`div`, {
    ref: n,
    'data-sidebar': `content`,
    className: G(
      `flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden`,
      e,
    ),
    ...t,
  }),
)
tm.displayName = `SidebarContent`
var nm = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(`div`, {
    ref: n,
    'data-sidebar': `group`,
    className: G(`relative flex w-full min-w-0 flex-col p-2`, e),
    ...t,
  }),
)
nm.displayName = `SidebarGroup`
var rm = u.forwardRef(({ className: e, asChild: t = !1, ...n }, r) =>
  (0, R.jsx)(t ? Ru : `div`, {
    ref: r,
    'data-sidebar': `group-label`,
    className: G(
      `flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0`,
      `group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0`,
      e,
    ),
    ...n,
  }),
)
rm.displayName = `SidebarGroupLabel`
var im = u.forwardRef(({ className: e, asChild: t = !1, ...n }, r) =>
  (0, R.jsx)(t ? Ru : `button`, {
    ref: r,
    'data-sidebar': `group-action`,
    className: G(
      `absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0`,
      `after:absolute after:-inset-2 after:md:hidden`,
      `group-data-[collapsible=icon]:hidden`,
      e,
    ),
    ...n,
  }),
)
im.displayName = `SidebarGroupAction`
var am = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(`div`, {
    ref: n,
    'data-sidebar': `group-content`,
    className: G(`w-full text-sm`, e),
    ...t,
  }),
)
am.displayName = `SidebarGroupContent`
var om = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(`ul`, {
    ref: n,
    'data-sidebar': `menu`,
    className: G(`flex w-full min-w-0 flex-col gap-1`, e),
    ...t,
  }),
)
om.displayName = `SidebarMenu`
var sm = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(`li`, {
    ref: n,
    'data-sidebar': `menu-item`,
    className: G(`group/menu-item relative`, e),
    ...t,
  }),
)
sm.displayName = `SidebarMenuItem`
var cm = Ui(
    `peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0`,
    {
      variants: {
        variant: {
          default: `hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`,
          outline: `bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]`,
        },
        size: {
          default: `h-8 text-sm`,
          sm: `h-7 text-xs`,
          lg: `h-12 text-sm group-data-[collapsible=icon]:!p-0`,
        },
      },
      defaultVariants: { variant: `default`, size: `default` },
    },
  ),
  lm = u.forwardRef(
    (
      {
        asChild: e = !1,
        isActive: t = !1,
        variant: n = `default`,
        size: r = `default`,
        tooltip: i,
        className: a,
        ...o
      },
      s,
    ) => {
      let c = e ? Ru : `button`,
        { isMobile: l, state: u } = Gp(),
        d = (0, R.jsx)(c, {
          ref: s,
          'data-sidebar': `menu-button`,
          'data-size': r,
          'data-active': t,
          className: G(cm({ variant: n, size: r }), a),
          ...o,
        })
      return i
        ? (typeof i == `string` && (i = { children: i }),
          (0, R.jsxs)(Au, {
            children: [
              (0, R.jsx)(ju, { asChild: !0, children: d }),
              (0, R.jsx)(Mu, {
                side: `right`,
                align: `center`,
                hidden: u !== `collapsed` || l,
                ...i,
              }),
            ],
          }))
        : d
    },
  )
lm.displayName = `SidebarMenuButton`
var um = u.forwardRef(({ className: e, asChild: t = !1, showOnHover: n = !1, ...r }, i) =>
  (0, R.jsx)(t ? Ru : `button`, {
    ref: i,
    'data-sidebar': `menu-action`,
    className: G(
      `absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0`,
      `after:absolute after:-inset-2 after:md:hidden`,
      `peer-data-[size=sm]/menu-button:top-1`,
      `peer-data-[size=default]/menu-button:top-1.5`,
      `peer-data-[size=lg]/menu-button:top-2.5`,
      `group-data-[collapsible=icon]:hidden`,
      n &&
        `group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0`,
      e,
    ),
    ...r,
  }),
)
um.displayName = `SidebarMenuAction`
var dm = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(`div`, {
    ref: n,
    'data-sidebar': `menu-badge`,
    className: G(
      `pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground`,
      `peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground`,
      `peer-data-[size=sm]/menu-button:top-1`,
      `peer-data-[size=default]/menu-button:top-1.5`,
      `peer-data-[size=lg]/menu-button:top-2.5`,
      `group-data-[collapsible=icon]:hidden`,
      e,
    ),
    ...t,
  }),
)
dm.displayName = `SidebarMenuBadge`
var fm = u.forwardRef(({ className: e, showIcon: t = !1, ...n }, r) => {
  let i = u.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, [])
  return (0, R.jsxs)(`div`, {
    ref: r,
    'data-sidebar': `menu-skeleton`,
    className: G(`flex h-8 items-center gap-2 rounded-md px-2`, e),
    ...n,
    children: [
      t && (0, R.jsx)(Lp, { className: `size-4 rounded-md`, 'data-sidebar': `menu-skeleton-icon` }),
      (0, R.jsx)(Lp, {
        className: `h-4 max-w-[--skeleton-width] flex-1`,
        'data-sidebar': `menu-skeleton-text`,
        style: { '--skeleton-width': i },
      }),
    ],
  })
})
fm.displayName = `SidebarMenuSkeleton`
var pm = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(`ul`, {
    ref: n,
    'data-sidebar': `menu-sub`,
    className: G(
      `mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5`,
      `group-data-[collapsible=icon]:hidden`,
      e,
    ),
    ...t,
  }),
)
pm.displayName = `SidebarMenuSub`
var mm = u.forwardRef(({ ...e }, t) => (0, R.jsx)(`li`, { ref: t, ...e }))
mm.displayName = `SidebarMenuSubItem`
var hm = u.forwardRef(({ asChild: e = !1, size: t = `md`, isActive: n, className: r, ...i }, a) =>
  (0, R.jsx)(e ? Ru : `a`, {
    ref: a,
    'data-sidebar': `menu-sub-button`,
    'data-size': t,
    'data-active': n,
    className: G(
      `flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground`,
      `data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground`,
      t === `sm` && `text-xs`,
      t === `md` && `text-sm`,
      `group-data-[collapsible=icon]:hidden`,
      r,
    ),
    ...i,
  }),
)
hm.displayName = `SidebarMenuSubButton`
var gm = u.createContext(void 0)
function _m(e) {
  let t = u.useContext(gm)
  return e || t || `ltr`
}
var vm = `rovingFocusGroup.onEntryFocus`,
  ym = { bubbles: !1, cancelable: !0 },
  bm = `RovingFocusGroup`,
  [xm, Sm, Cm] = dr(bm),
  [wm, Tm] = nr(bm, [Cm]),
  [Em, Dm] = wm(bm),
  Om = u.forwardRef((e, t) =>
    (0, R.jsx)(xm.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: (0, R.jsx)(xm.Slot, {
        scope: e.__scopeRovingFocusGroup,
        children: (0, R.jsx)(km, { ...e, ref: t }),
      }),
    }),
  )
Om.displayName = bm
var km = u.forwardRef((e, t) => {
    let {
        __scopeRovingFocusGroup: n,
        orientation: r,
        loop: i = !1,
        dir: a,
        currentTabStopId: o,
        defaultCurrentTabStopId: s,
        onCurrentTabStopIdChange: c,
        onEntryFocus: l,
        preventScrollOnEntryFocus: d = !1,
        ...f
      } = e,
      p = u.useRef(null),
      m = L(t, p),
      h = _m(a),
      [g, _] = zr({ prop: o, defaultProp: s ?? null, onChange: c, caller: bm }),
      [v, y] = u.useState(!1),
      b = pr(l),
      x = Sm(n),
      S = u.useRef(!1),
      [C, w] = u.useState(0)
    return (
      u.useEffect(() => {
        let e = p.current
        if (e) return (e.addEventListener(vm, b), () => e.removeEventListener(vm, b))
      }, [b]),
      (0, R.jsx)(Em, {
        scope: n,
        orientation: r,
        dir: h,
        loop: i,
        currentTabStopId: g,
        onItemFocus: u.useCallback((e) => _(e), [_]),
        onItemShiftTab: u.useCallback(() => y(!0), []),
        onFocusableItemAdd: u.useCallback(() => w((e) => e + 1), []),
        onFocusableItemRemove: u.useCallback(() => w((e) => e - 1), []),
        children: (0, R.jsx)(z.div, {
          tabIndex: v || C === 0 ? -1 : 0,
          'data-orientation': r,
          ...f,
          ref: m,
          style: { outline: `none`, ...e.style },
          onMouseDown: I(e.onMouseDown, () => {
            S.current = !0
          }),
          onFocus: I(e.onFocus, (e) => {
            let t = !S.current
            if (e.target === e.currentTarget && t && !v) {
              let t = new CustomEvent(vm, ym)
              if ((e.currentTarget.dispatchEvent(t), !t.defaultPrevented)) {
                let e = x().filter((e) => e.focusable)
                Fm(
                  [e.find((e) => e.active), e.find((e) => e.id === g), ...e]
                    .filter(Boolean)
                    .map((e) => e.ref.current),
                  d,
                )
              }
            }
            S.current = !1
          }),
          onBlur: I(e.onBlur, () => y(!1)),
        }),
      })
    )
  }),
  Am = `RovingFocusGroupItem`,
  jm = u.forwardRef((e, t) => {
    let {
        __scopeRovingFocusGroup: n,
        focusable: r = !0,
        active: i = !1,
        tabStopId: a,
        children: o,
        ...s
      } = e,
      c = ds(),
      l = a || c,
      d = Dm(Am, n),
      f = d.currentTabStopId === l,
      p = Sm(n),
      { onFocusableItemAdd: m, onFocusableItemRemove: h, currentTabStopId: g } = d
    return (
      u.useEffect(() => {
        if (r) return (m(), () => h())
      }, [r, m, h]),
      (0, R.jsx)(xm.ItemSlot, {
        scope: n,
        id: l,
        focusable: r,
        active: i,
        children: (0, R.jsx)(z.span, {
          tabIndex: f ? 0 : -1,
          'data-orientation': d.orientation,
          ...s,
          ref: t,
          onMouseDown: I(e.onMouseDown, (e) => {
            r ? d.onItemFocus(l) : e.preventDefault()
          }),
          onFocus: I(e.onFocus, () => d.onItemFocus(l)),
          onKeyDown: I(e.onKeyDown, (e) => {
            if (e.key === `Tab` && e.shiftKey) {
              d.onItemShiftTab()
              return
            }
            if (e.target !== e.currentTarget) return
            let t = Pm(e, d.orientation, d.dir)
            if (t !== void 0) {
              if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
              e.preventDefault()
              let n = p()
                .filter((e) => e.focusable)
                .map((e) => e.ref.current)
              if (t === `last`) n.reverse()
              else if (t === `prev` || t === `next`) {
                t === `prev` && n.reverse()
                let r = n.indexOf(e.currentTarget)
                n = d.loop ? Im(n, r + 1) : n.slice(r + 1)
              }
              setTimeout(() => Fm(n))
            }
          }),
          children: typeof o == `function` ? o({ isCurrentTabStop: f, hasTabStop: g != null }) : o,
        }),
      })
    )
  })
jm.displayName = Am
var Mm = {
  ArrowLeft: `prev`,
  ArrowUp: `prev`,
  ArrowRight: `next`,
  ArrowDown: `next`,
  PageUp: `first`,
  Home: `first`,
  PageDown: `last`,
  End: `last`,
}
function Nm(e, t) {
  return t === `rtl` ? (e === `ArrowLeft` ? `ArrowRight` : e === `ArrowRight` ? `ArrowLeft` : e) : e
}
function Pm(e, t, n) {
  let r = Nm(e.key, n)
  if (
    !(t === `vertical` && [`ArrowLeft`, `ArrowRight`].includes(r)) &&
    !(t === `horizontal` && [`ArrowUp`, `ArrowDown`].includes(r))
  )
    return Mm[r]
}
function Fm(e, t = !1) {
  let n = document.activeElement
  for (let r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return
}
function Im(e, t) {
  return e.map((n, r) => e[(t + r) % e.length])
}
var Lm = Om,
  Rm = jm,
  zm = [`Enter`, ` `],
  Bm = [`ArrowDown`, `PageUp`, `Home`],
  Vm = [`ArrowUp`, `PageDown`, `End`],
  Hm = [...Bm, ...Vm],
  Um = { ltr: [...zm, `ArrowRight`], rtl: [...zm, `ArrowLeft`] },
  Wm = { ltr: [`ArrowLeft`], rtl: [`ArrowRight`] },
  Gm = `Menu`,
  [Km, qm, Jm] = dr(Gm),
  [Ym, Xm] = nr(Gm, [Jm, Al, Tm]),
  Zm = Al(),
  Qm = Tm(),
  [$m, eh] = Ym(Gm),
  [th, nh] = Ym(Gm),
  rh = (e) => {
    let { __scopeMenu: t, open: n = !1, children: r, dir: i, onOpenChange: a, modal: o = !0 } = e,
      s = Zm(t),
      [c, l] = u.useState(null),
      d = u.useRef(!1),
      f = pr(a),
      p = _m(i)
    return (
      u.useEffect(() => {
        let e = () => {
            ;((d.current = !0),
              document.addEventListener(`pointerdown`, t, { capture: !0, once: !0 }),
              document.addEventListener(`pointermove`, t, { capture: !0, once: !0 }))
          },
          t = () => (d.current = !1)
        return (
          document.addEventListener(`keydown`, e, { capture: !0 }),
          () => {
            ;(document.removeEventListener(`keydown`, e, { capture: !0 }),
              document.removeEventListener(`pointerdown`, t, { capture: !0 }),
              document.removeEventListener(`pointermove`, t, { capture: !0 }))
          }
        )
      }, []),
      (0, R.jsx)(Vl, {
        ...s,
        children: (0, R.jsx)($m, {
          scope: t,
          open: n,
          onOpenChange: f,
          content: c,
          onContentChange: l,
          children: (0, R.jsx)(th, {
            scope: t,
            onClose: u.useCallback(() => f(!1), [f]),
            isUsingKeyboardRef: d,
            dir: p,
            modal: o,
            children: r,
          }),
        }),
      })
    )
  }
rh.displayName = Gm
var ih = `MenuAnchor`,
  ah = u.forwardRef((e, t) => {
    let { __scopeMenu: n, ...r } = e,
      i = Zm(n)
    return (0, R.jsx)(Hl, { ...i, ...r, ref: t })
  })
ah.displayName = ih
var oh = `MenuPortal`,
  [sh, ch] = Ym(oh, { forceMount: void 0 }),
  lh = (e) => {
    let { __scopeMenu: t, forceMount: n, children: r, container: i } = e,
      a = eh(oh, t)
    return (0, R.jsx)(sh, {
      scope: t,
      forceMount: n,
      children: (0, R.jsx)(Pr, {
        present: n || a.open,
        children: (0, R.jsx)(Mr, { asChild: !0, container: i, children: r }),
      }),
    })
  }
lh.displayName = oh
var uh = `MenuContent`,
  [dh, fh] = Ym(uh),
  ph = u.forwardRef((e, t) => {
    let n = ch(uh, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...i } = e,
      a = eh(uh, e.__scopeMenu),
      o = nh(uh, e.__scopeMenu)
    return (0, R.jsx)(Km.Provider, {
      scope: e.__scopeMenu,
      children: (0, R.jsx)(Pr, {
        present: r || a.open,
        children: (0, R.jsx)(Km.Slot, {
          scope: e.__scopeMenu,
          children: o.modal ? (0, R.jsx)(mh, { ...i, ref: t }) : (0, R.jsx)(hh, { ...i, ref: t }),
        }),
      }),
    })
  }),
  mh = u.forwardRef((e, t) => {
    let n = eh(uh, e.__scopeMenu),
      r = u.useRef(null),
      i = L(t, r)
    return (
      u.useEffect(() => {
        let e = r.current
        if (e) return Lf(e)
      }, []),
      (0, R.jsx)(_h, {
        ...e,
        ref: i,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: I(e.onFocusOutside, (e) => e.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => n.onOpenChange(!1),
      })
    )
  }),
  hh = u.forwardRef((e, t) => {
    let n = eh(uh, e.__scopeMenu)
    return (0, R.jsx)(_h, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    })
  }),
  gh = ir(`MenuContent.ScrollLock`),
  _h = u.forwardRef((e, t) => {
    let {
        __scopeMenu: n,
        loop: r = !1,
        trapFocus: i,
        onOpenAutoFocus: a,
        onCloseAutoFocus: o,
        disableOutsidePointerEvents: s,
        onEntryFocus: c,
        onEscapeKeyDown: l,
        onPointerDownOutside: d,
        onFocusOutside: f,
        onInteractOutside: p,
        onDismiss: m,
        disableOutsideScroll: h,
        ...g
      } = e,
      _ = eh(uh, n),
      v = nh(uh, n),
      y = Zm(n),
      b = Qm(n),
      x = qm(n),
      [S, C] = u.useState(null),
      w = u.useRef(null),
      T = L(t, w, _.onContentChange),
      E = u.useRef(0),
      D = u.useRef(``),
      O = u.useRef(0),
      k = u.useRef(null),
      A = u.useRef(`right`),
      j = u.useRef(0),
      ee = h ? Of : u.Fragment,
      te = h ? { as: gh, allowPinchZoom: !0 } : void 0,
      ne = (e) => {
        let t = D.current + e,
          n = x().filter((e) => !e.disabled),
          r = document.activeElement,
          i = n.find((e) => e.ref.current === r)?.textValue,
          a = tg(
            n.map((e) => e.textValue),
            t,
            i,
          ),
          o = n.find((e) => e.textValue === a)?.ref.current
        ;((function e(t) {
          ;((D.current = t),
            window.clearTimeout(E.current),
            t !== `` && (E.current = window.setTimeout(() => e(``), 1e3)))
        })(t),
          o && setTimeout(() => o.focus()))
      }
    ;(u.useEffect(() => () => window.clearTimeout(E.current), []), yd())
    let M = u.useCallback((e) => A.current === k.current?.side && rg(e, k.current?.area), [])
    return (0, R.jsx)(dh, {
      scope: n,
      searchRef: D,
      onItemEnter: u.useCallback(
        (e) => {
          M(e) && e.preventDefault()
        },
        [M],
      ),
      onItemLeave: u.useCallback(
        (e) => {
          M(e) || (w.current?.focus(), C(null))
        },
        [M],
      ),
      onTriggerLeave: u.useCallback(
        (e) => {
          M(e) && e.preventDefault()
        },
        [M],
      ),
      pointerGraceTimerRef: O,
      onPointerGraceIntentChange: u.useCallback((e) => {
        k.current = e
      }, []),
      children: (0, R.jsx)(ee, {
        ...te,
        children: (0, R.jsx)(od, {
          asChild: !0,
          trapped: i,
          onMountAutoFocus: I(a, (e) => {
            ;(e.preventDefault(), w.current?.focus({ preventScroll: !0 }))
          }),
          onUnmountAutoFocus: o,
          children: (0, R.jsx)(xr, {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onEscapeKeyDown: l,
            onPointerDownOutside: d,
            onFocusOutside: f,
            onInteractOutside: p,
            onDismiss: m,
            children: (0, R.jsx)(Lm, {
              asChild: !0,
              ...b,
              dir: v.dir,
              orientation: `vertical`,
              loop: r,
              currentTabStopId: S,
              onCurrentTabStopIdChange: C,
              onEntryFocus: I(c, (e) => {
                v.isUsingKeyboardRef.current || e.preventDefault()
              }),
              preventScrollOnEntryFocus: !0,
              children: (0, R.jsx)(Ul, {
                role: `menu`,
                'aria-orientation': `vertical`,
                'data-state': Xh(_.open),
                'data-radix-menu-content': ``,
                dir: v.dir,
                ...y,
                ...g,
                ref: T,
                style: { outline: `none`, ...g.style },
                onKeyDown: I(g.onKeyDown, (e) => {
                  let t = e.target.closest(`[data-radix-menu-content]`) === e.currentTarget,
                    n = e.ctrlKey || e.altKey || e.metaKey,
                    r = e.key.length === 1
                  t && (e.key === `Tab` && e.preventDefault(), !n && r && ne(e.key))
                  let i = w.current
                  if (e.target !== i || !Hm.includes(e.key)) return
                  e.preventDefault()
                  let a = x()
                    .filter((e) => !e.disabled)
                    .map((e) => e.ref.current)
                  ;(Vm.includes(e.key) && a.reverse(), $h(a))
                }),
                onBlur: I(e.onBlur, (e) => {
                  e.currentTarget.contains(e.target) ||
                    (window.clearTimeout(E.current), (D.current = ``))
                }),
                onPointerMove: I(
                  e.onPointerMove,
                  ig((e) => {
                    let t = e.target,
                      n = j.current !== e.clientX
                    e.currentTarget.contains(t) &&
                      n &&
                      ((A.current = e.clientX > j.current ? `right` : `left`),
                      (j.current = e.clientX))
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    })
  })
ph.displayName = uh
var vh = `MenuGroup`,
  yh = u.forwardRef((e, t) => {
    let { __scopeMenu: n, ...r } = e
    return (0, R.jsx)(z.div, { role: `group`, ...r, ref: t })
  })
yh.displayName = vh
var bh = `MenuLabel`,
  xh = u.forwardRef((e, t) => {
    let { __scopeMenu: n, ...r } = e
    return (0, R.jsx)(z.div, { ...r, ref: t })
  })
xh.displayName = bh
var Sh = `MenuItem`,
  Ch = `menu.itemSelect`,
  wh = u.forwardRef((e, t) => {
    let { disabled: n = !1, onSelect: r, ...i } = e,
      a = u.useRef(null),
      o = nh(Sh, e.__scopeMenu),
      s = fh(Sh, e.__scopeMenu),
      c = L(t, a),
      l = u.useRef(!1),
      d = () => {
        let e = a.current
        if (!n && e) {
          let t = new CustomEvent(Ch, { bubbles: !0, cancelable: !0 })
          ;(e.addEventListener(Ch, (e) => r?.(e), { once: !0 }),
            fr(e, t),
            t.defaultPrevented ? (l.current = !1) : o.onClose())
        }
      }
    return (0, R.jsx)(Th, {
      ...i,
      ref: c,
      disabled: n,
      onClick: I(e.onClick, d),
      onPointerDown: (t) => {
        ;(e.onPointerDown?.(t), (l.current = !0))
      },
      onPointerUp: I(e.onPointerUp, (e) => {
        l.current || e.currentTarget?.click()
      }),
      onKeyDown: I(e.onKeyDown, (e) => {
        let t = s.searchRef.current !== ``
        n ||
          (t && e.key === ` `) ||
          (zm.includes(e.key) && (e.currentTarget.click(), e.preventDefault()))
      }),
    })
  })
wh.displayName = Sh
var Th = u.forwardRef((e, t) => {
    let { __scopeMenu: n, disabled: r = !1, textValue: i, ...a } = e,
      o = fh(Sh, n),
      s = Qm(n),
      c = u.useRef(null),
      l = L(t, c),
      [d, f] = u.useState(!1),
      [p, m] = u.useState(``)
    return (
      u.useEffect(() => {
        let e = c.current
        e && m((e.textContent ?? ``).trim())
      }, [a.children]),
      (0, R.jsx)(Km.ItemSlot, {
        scope: n,
        disabled: r,
        textValue: i ?? p,
        children: (0, R.jsx)(Rm, {
          asChild: !0,
          ...s,
          focusable: !r,
          children: (0, R.jsx)(z.div, {
            role: `menuitem`,
            'data-highlighted': d ? `` : void 0,
            'aria-disabled': r || void 0,
            'data-disabled': r ? `` : void 0,
            ...a,
            ref: l,
            onPointerMove: I(
              e.onPointerMove,
              ig((e) => {
                r
                  ? o.onItemLeave(e)
                  : (o.onItemEnter(e),
                    e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }))
              }),
            ),
            onPointerLeave: I(
              e.onPointerLeave,
              ig((e) => o.onItemLeave(e)),
            ),
            onFocus: I(e.onFocus, () => f(!0)),
            onBlur: I(e.onBlur, () => f(!1)),
          }),
        }),
      })
    )
  }),
  Eh = `MenuCheckboxItem`,
  Dh = u.forwardRef((e, t) => {
    let { checked: n = !1, onCheckedChange: r, ...i } = e
    return (0, R.jsx)(Fh, {
      scope: e.__scopeMenu,
      checked: n,
      children: (0, R.jsx)(wh, {
        role: `menuitemcheckbox`,
        'aria-checked': Zh(n) ? `mixed` : n,
        ...i,
        ref: t,
        'data-state': Qh(n),
        onSelect: I(i.onSelect, () => r?.(Zh(n) ? !0 : !n), { checkForDefaultPrevented: !1 }),
      }),
    })
  })
Dh.displayName = Eh
var Oh = `MenuRadioGroup`,
  [kh, Ah] = Ym(Oh, { value: void 0, onValueChange: () => {} }),
  jh = u.forwardRef((e, t) => {
    let { value: n, onValueChange: r, ...i } = e,
      a = pr(r)
    return (0, R.jsx)(kh, {
      scope: e.__scopeMenu,
      value: n,
      onValueChange: a,
      children: (0, R.jsx)(yh, { ...i, ref: t }),
    })
  })
jh.displayName = Oh
var Mh = `MenuRadioItem`,
  Nh = u.forwardRef((e, t) => {
    let { value: n, ...r } = e,
      i = Ah(Mh, e.__scopeMenu),
      a = n === i.value
    return (0, R.jsx)(Fh, {
      scope: e.__scopeMenu,
      checked: a,
      children: (0, R.jsx)(wh, {
        role: `menuitemradio`,
        'aria-checked': a,
        ...r,
        ref: t,
        'data-state': Qh(a),
        onSelect: I(r.onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 }),
      }),
    })
  })
Nh.displayName = Mh
var Ph = `MenuItemIndicator`,
  [Fh, Ih] = Ym(Ph, { checked: !1 }),
  Lh = u.forwardRef((e, t) => {
    let { __scopeMenu: n, forceMount: r, ...i } = e,
      a = Ih(Ph, n)
    return (0, R.jsx)(Pr, {
      present: r || Zh(a.checked) || a.checked === !0,
      children: (0, R.jsx)(z.span, { ...i, ref: t, 'data-state': Qh(a.checked) }),
    })
  })
Lh.displayName = Ph
var Rh = `MenuSeparator`,
  zh = u.forwardRef((e, t) => {
    let { __scopeMenu: n, ...r } = e
    return (0, R.jsx)(z.div, { role: `separator`, 'aria-orientation': `horizontal`, ...r, ref: t })
  })
zh.displayName = Rh
var Bh = `MenuArrow`,
  Vh = u.forwardRef((e, t) => {
    let { __scopeMenu: n, ...r } = e,
      i = Zm(n)
    return (0, R.jsx)(Wl, { ...i, ...r, ref: t })
  })
Vh.displayName = Bh
var Hh = `MenuSub`,
  [Uh, Wh] = Ym(Hh),
  Gh = (e) => {
    let { __scopeMenu: t, children: n, open: r = !1, onOpenChange: i } = e,
      a = eh(Hh, t),
      o = Zm(t),
      [s, c] = u.useState(null),
      [l, d] = u.useState(null),
      f = pr(i)
    return (
      u.useEffect(() => (a.open === !1 && f(!1), () => f(!1)), [a.open, f]),
      (0, R.jsx)(Vl, {
        ...o,
        children: (0, R.jsx)($m, {
          scope: t,
          open: r,
          onOpenChange: f,
          content: l,
          onContentChange: d,
          children: (0, R.jsx)(Uh, {
            scope: t,
            contentId: ds(),
            triggerId: ds(),
            trigger: s,
            onTriggerChange: c,
            children: n,
          }),
        }),
      })
    )
  }
Gh.displayName = Hh
var Kh = `MenuSubTrigger`,
  qh = u.forwardRef((e, t) => {
    let n = eh(Kh, e.__scopeMenu),
      r = nh(Kh, e.__scopeMenu),
      i = Wh(Kh, e.__scopeMenu),
      a = fh(Kh, e.__scopeMenu),
      o = u.useRef(null),
      { pointerGraceTimerRef: s, onPointerGraceIntentChange: c } = a,
      l = { __scopeMenu: e.__scopeMenu },
      d = u.useCallback(() => {
        ;(o.current && window.clearTimeout(o.current), (o.current = null))
      }, [])
    return (
      u.useEffect(() => d, [d]),
      u.useEffect(() => {
        let e = s.current
        return () => {
          ;(window.clearTimeout(e), c(null))
        }
      }, [s, c]),
      (0, R.jsx)(ah, {
        asChild: !0,
        ...l,
        children: (0, R.jsx)(Th, {
          id: i.triggerId,
          'aria-haspopup': `menu`,
          'aria-expanded': n.open,
          'aria-controls': i.contentId,
          'data-state': Xh(n.open),
          ...e,
          ref: er(t, i.onTriggerChange),
          onClick: (t) => {
            ;(e.onClick?.(t),
              !(e.disabled || t.defaultPrevented) &&
                (t.currentTarget.focus(), n.open || n.onOpenChange(!0)))
          },
          onPointerMove: I(
            e.onPointerMove,
            ig((t) => {
              ;(a.onItemEnter(t),
                !t.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !o.current &&
                  (a.onPointerGraceIntentChange(null),
                  (o.current = window.setTimeout(() => {
                    ;(n.onOpenChange(!0), d())
                  }, 100))))
            }),
          ),
          onPointerLeave: I(
            e.onPointerLeave,
            ig((e) => {
              d()
              let t = n.content?.getBoundingClientRect()
              if (t) {
                let r = n.content?.dataset.side,
                  i = r === `right`,
                  o = i ? -5 : 5,
                  c = t[i ? `left` : `right`],
                  l = t[i ? `right` : `left`]
                ;(a.onPointerGraceIntentChange({
                  area: [
                    { x: e.clientX + o, y: e.clientY },
                    { x: c, y: t.top },
                    { x: l, y: t.top },
                    { x: l, y: t.bottom },
                    { x: c, y: t.bottom },
                  ],
                  side: r,
                }),
                  window.clearTimeout(s.current),
                  (s.current = window.setTimeout(() => a.onPointerGraceIntentChange(null), 300)))
              } else {
                if ((a.onTriggerLeave(e), e.defaultPrevented)) return
                a.onPointerGraceIntentChange(null)
              }
            }),
          ),
          onKeyDown: I(e.onKeyDown, (t) => {
            let i = a.searchRef.current !== ``
            e.disabled ||
              (i && t.key === ` `) ||
              (Um[r.dir].includes(t.key) &&
                (n.onOpenChange(!0), n.content?.focus(), t.preventDefault()))
          }),
        }),
      })
    )
  })
qh.displayName = Kh
var Jh = `MenuSubContent`,
  Yh = u.forwardRef((e, t) => {
    let n = ch(uh, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...i } = e,
      a = eh(uh, e.__scopeMenu),
      o = nh(uh, e.__scopeMenu),
      s = Wh(Jh, e.__scopeMenu),
      c = u.useRef(null),
      l = L(t, c)
    return (0, R.jsx)(Km.Provider, {
      scope: e.__scopeMenu,
      children: (0, R.jsx)(Pr, {
        present: r || a.open,
        children: (0, R.jsx)(Km.Slot, {
          scope: e.__scopeMenu,
          children: (0, R.jsx)(_h, {
            id: s.contentId,
            'aria-labelledby': s.triggerId,
            ...i,
            ref: l,
            align: `start`,
            side: o.dir === `rtl` ? `left` : `right`,
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (e) => {
              ;(o.isUsingKeyboardRef.current && c.current?.focus(), e.preventDefault())
            },
            onCloseAutoFocus: (e) => e.preventDefault(),
            onFocusOutside: I(e.onFocusOutside, (e) => {
              e.target !== s.trigger && a.onOpenChange(!1)
            }),
            onEscapeKeyDown: I(e.onEscapeKeyDown, (e) => {
              ;(o.onClose(), e.preventDefault())
            }),
            onKeyDown: I(e.onKeyDown, (e) => {
              let t = e.currentTarget.contains(e.target),
                n = Wm[o.dir].includes(e.key)
              t && n && (a.onOpenChange(!1), s.trigger?.focus(), e.preventDefault())
            }),
          }),
        }),
      }),
    })
  })
Yh.displayName = Jh
function Xh(e) {
  return e ? `open` : `closed`
}
function Zh(e) {
  return e === `indeterminate`
}
function Qh(e) {
  return Zh(e) ? `indeterminate` : e ? `checked` : `unchecked`
}
function $h(e) {
  let t = document.activeElement
  for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return
}
function eg(e, t) {
  return e.map((n, r) => e[(t + r) % e.length])
}
function tg(e, t, n) {
  let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1,
    a = eg(e, Math.max(i, 0))
  r.length === 1 && (a = a.filter((e) => e !== n))
  let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()))
  return o === n ? void 0 : o
}
function ng(e, t) {
  let { x: n, y: r } = e,
    i = !1
  for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
    let o = t[e],
      s = t[a],
      c = o.x,
      l = o.y,
      u = s.x,
      d = s.y
    l > r != d > r && n < ((u - c) * (r - l)) / (d - l) + c && (i = !i)
  }
  return i
}
function rg(e, t) {
  return t ? ng({ x: e.clientX, y: e.clientY }, t) : !1
}
function ig(e) {
  return (t) => (t.pointerType === `mouse` ? e(t) : void 0)
}
var ag = rh,
  og = ah,
  sg = lh,
  cg = ph,
  lg = yh,
  ug = xh,
  dg = wh,
  fg = Dh,
  pg = jh,
  mg = Nh,
  hg = Lh,
  gg = zh,
  _g = Vh,
  vg = qh,
  yg = Yh,
  bg = `DropdownMenu`,
  [xg, Sg] = nr(bg, [Xm]),
  Cg = Xm(),
  [wg, Tg] = xg(bg),
  Eg = (e) => {
    let {
        __scopeDropdownMenu: t,
        children: n,
        dir: r,
        open: i,
        defaultOpen: a,
        onOpenChange: o,
        modal: s = !0,
      } = e,
      c = Cg(t),
      l = u.useRef(null),
      [d, f] = zr({ prop: i, defaultProp: a ?? !1, onChange: o, caller: bg })
    return (0, R.jsx)(wg, {
      scope: t,
      triggerId: ds(),
      triggerRef: l,
      contentId: ds(),
      open: d,
      onOpenChange: f,
      onOpenToggle: u.useCallback(() => f((e) => !e), [f]),
      modal: s,
      children: (0, R.jsx)(ag, { ...c, open: d, onOpenChange: f, dir: r, modal: s, children: n }),
    })
  }
Eg.displayName = bg
var Dg = `DropdownMenuTrigger`,
  Og = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e,
      a = Tg(Dg, n),
      o = Cg(n)
    return (0, R.jsx)(og, {
      asChild: !0,
      ...o,
      children: (0, R.jsx)(z.button, {
        type: `button`,
        id: a.triggerId,
        'aria-haspopup': `menu`,
        'aria-expanded': a.open,
        'aria-controls': a.open ? a.contentId : void 0,
        'data-state': a.open ? `open` : `closed`,
        'data-disabled': r ? `` : void 0,
        disabled: r,
        ...i,
        ref: er(t, a.triggerRef),
        onPointerDown: I(e.onPointerDown, (e) => {
          !r &&
            e.button === 0 &&
            e.ctrlKey === !1 &&
            (a.onOpenToggle(), a.open || e.preventDefault())
        }),
        onKeyDown: I(e.onKeyDown, (e) => {
          r ||
            ([`Enter`, ` `].includes(e.key) && a.onOpenToggle(),
            e.key === `ArrowDown` && a.onOpenChange(!0),
            [`Enter`, ` `, `ArrowDown`].includes(e.key) && e.preventDefault())
        }),
      }),
    })
  })
Og.displayName = Dg
var kg = `DropdownMenuPortal`,
  Ag = (e) => {
    let { __scopeDropdownMenu: t, ...n } = e,
      r = Cg(t)
    return (0, R.jsx)(sg, { ...r, ...n })
  }
Ag.displayName = kg
var jg = `DropdownMenuContent`,
  Mg = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Tg(jg, n),
      a = Cg(n),
      o = u.useRef(!1)
    return (0, R.jsx)(cg, {
      id: i.contentId,
      'aria-labelledby': i.triggerId,
      ...a,
      ...r,
      ref: t,
      onCloseAutoFocus: I(e.onCloseAutoFocus, (e) => {
        ;(o.current || i.triggerRef.current?.focus(), (o.current = !1), e.preventDefault())
      }),
      onInteractOutside: I(e.onInteractOutside, (e) => {
        let t = e.detail.originalEvent,
          n = t.button === 0 && t.ctrlKey === !0,
          r = t.button === 2 || n
        ;(!i.modal || r) && (o.current = !0)
      }),
      style: {
        ...e.style,
        '--radix-dropdown-menu-content-transform-origin': `var(--radix-popper-transform-origin)`,
        '--radix-dropdown-menu-content-available-width': `var(--radix-popper-available-width)`,
        '--radix-dropdown-menu-content-available-height': `var(--radix-popper-available-height)`,
        '--radix-dropdown-menu-trigger-width': `var(--radix-popper-anchor-width)`,
        '--radix-dropdown-menu-trigger-height': `var(--radix-popper-anchor-height)`,
      },
    })
  })
Mg.displayName = jg
var Ng = `DropdownMenuGroup`,
  Pg = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Cg(n)
    return (0, R.jsx)(lg, { ...i, ...r, ref: t })
  })
Pg.displayName = Ng
var Fg = `DropdownMenuLabel`,
  Ig = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Cg(n)
    return (0, R.jsx)(ug, { ...i, ...r, ref: t })
  })
Ig.displayName = Fg
var Lg = `DropdownMenuItem`,
  Rg = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Cg(n)
    return (0, R.jsx)(dg, { ...i, ...r, ref: t })
  })
Rg.displayName = Lg
var zg = `DropdownMenuCheckboxItem`,
  Bg = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Cg(n)
    return (0, R.jsx)(fg, { ...i, ...r, ref: t })
  })
Bg.displayName = zg
var Vg = `DropdownMenuRadioGroup`,
  Hg = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Cg(n)
    return (0, R.jsx)(pg, { ...i, ...r, ref: t })
  })
Hg.displayName = Vg
var Ug = `DropdownMenuRadioItem`,
  Wg = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Cg(n)
    return (0, R.jsx)(mg, { ...i, ...r, ref: t })
  })
Wg.displayName = Ug
var Gg = `DropdownMenuItemIndicator`,
  Kg = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Cg(n)
    return (0, R.jsx)(hg, { ...i, ...r, ref: t })
  })
Kg.displayName = Gg
var qg = `DropdownMenuSeparator`,
  Jg = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Cg(n)
    return (0, R.jsx)(gg, { ...i, ...r, ref: t })
  })
Jg.displayName = qg
var Yg = `DropdownMenuArrow`,
  Xg = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Cg(n)
    return (0, R.jsx)(_g, { ...i, ...r, ref: t })
  })
Xg.displayName = Yg
var Zg = `DropdownMenuSubTrigger`,
  Qg = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Cg(n)
    return (0, R.jsx)(vg, { ...i, ...r, ref: t })
  })
Qg.displayName = Zg
var $g = `DropdownMenuSubContent`,
  e_ = u.forwardRef((e, t) => {
    let { __scopeDropdownMenu: n, ...r } = e,
      i = Cg(n)
    return (0, R.jsx)(yg, {
      ...i,
      ...r,
      ref: t,
      style: {
        ...e.style,
        '--radix-dropdown-menu-content-transform-origin': `var(--radix-popper-transform-origin)`,
        '--radix-dropdown-menu-content-available-width': `var(--radix-popper-available-width)`,
        '--radix-dropdown-menu-content-available-height': `var(--radix-popper-available-height)`,
        '--radix-dropdown-menu-trigger-width': `var(--radix-popper-anchor-width)`,
        '--radix-dropdown-menu-trigger-height': `var(--radix-popper-anchor-height)`,
      },
    })
  })
e_.displayName = $g
var t_ = Eg,
  n_ = Og,
  r_ = Ag,
  i_ = Mg,
  a_ = Ig,
  o_ = Rg,
  s_ = Bg,
  c_ = Wg,
  l_ = Kg,
  u_ = Jg,
  d_ = Qg,
  f_ = e_,
  p_ = t_,
  m_ = n_,
  h_ = u.forwardRef(({ className: e, inset: t, children: n, ...r }, i) =>
    (0, R.jsxs)(d_, {
      ref: i,
      className: G(
        `flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
        t && `pl-8`,
        e,
      ),
      ...r,
      children: [n, (0, R.jsx)(ra, { className: `ml-auto` })],
    }),
  )
h_.displayName = d_.displayName
var g_ = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(f_, {
    ref: n,
    className: G(
      `z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]`,
      e,
    ),
    ...t,
  }),
)
g_.displayName = f_.displayName
var __ = u.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) =>
  (0, R.jsx)(r_, {
    children: (0, R.jsx)(i_, {
      ref: r,
      sideOffset: t,
      className: G(
        `z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]`,
        e,
      ),
      ...n,
    }),
  }),
)
__.displayName = i_.displayName
var v_ = u.forwardRef(({ className: e, inset: t, ...n }, r) =>
  (0, R.jsx)(o_, {
    ref: r,
    className: G(
      `relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
      t && `pl-8`,
      e,
    ),
    ...n,
  }),
)
v_.displayName = o_.displayName
var y_ = u.forwardRef(({ className: e, children: t, checked: n, ...r }, i) =>
  (0, R.jsxs)(s_, {
    ref: i,
    className: G(
      `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
      e,
    ),
    checked: n,
    ...r,
    children: [
      (0, R.jsx)(`span`, {
        className: `absolute left-2 flex h-3.5 w-3.5 items-center justify-center`,
        children: (0, R.jsx)(l_, { children: (0, R.jsx)(ta, { className: `h-4 w-4` }) }),
      }),
      t,
    ],
  }),
)
y_.displayName = s_.displayName
var b_ = u.forwardRef(({ className: e, children: t, ...n }, r) =>
  (0, R.jsxs)(c_, {
    ref: r,
    className: G(
      `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
      e,
    ),
    ...n,
    children: [
      (0, R.jsx)(`span`, {
        className: `absolute left-2 flex h-3.5 w-3.5 items-center justify-center`,
        children: (0, R.jsx)(l_, {
          children: (0, R.jsx)(oa, { className: `h-2 w-2 fill-current` }),
        }),
      }),
      t,
    ],
  }),
)
b_.displayName = c_.displayName
var x_ = u.forwardRef(({ className: e, inset: t, ...n }, r) =>
  (0, R.jsx)(a_, {
    ref: r,
    className: G(`px-2 py-1.5 text-sm font-semibold`, t && `pl-8`, e),
    ...n,
  }),
)
x_.displayName = a_.displayName
var S_ = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(u_, { ref: n, className: G(`-mx-1 my-1 h-px bg-muted`, e), ...t }),
)
S_.displayName = u_.displayName
var C_ = ({ className: e, ...t }) =>
  (0, R.jsx)(`span`, { className: G(`ml-auto text-xs tracking-widest opacity-60`, e), ...t })
C_.displayName = `DropdownMenuShortcut`
var w_ = `Popover`,
  [T_, E_] = nr(w_, [Al]),
  D_ = Al(),
  [O_, k_] = T_(w_),
  A_ = (e) => {
    let {
        __scopePopover: t,
        children: n,
        open: r,
        defaultOpen: i,
        onOpenChange: a,
        modal: o = !1,
      } = e,
      s = D_(t),
      c = u.useRef(null),
      [l, d] = u.useState(!1),
      [f, p] = zr({ prop: r, defaultProp: i ?? !1, onChange: a, caller: w_ })
    return (0, R.jsx)(Vl, {
      ...s,
      children: (0, R.jsx)(O_, {
        scope: t,
        contentId: ds(),
        triggerRef: c,
        open: f,
        onOpenChange: p,
        onOpenToggle: u.useCallback(() => p((e) => !e), [p]),
        hasCustomAnchor: l,
        onCustomAnchorAdd: u.useCallback(() => d(!0), []),
        onCustomAnchorRemove: u.useCallback(() => d(!1), []),
        modal: o,
        children: n,
      }),
    })
  }
A_.displayName = w_
var j_ = `PopoverAnchor`,
  M_ = u.forwardRef((e, t) => {
    let { __scopePopover: n, ...r } = e,
      i = k_(j_, n),
      a = D_(n),
      { onCustomAnchorAdd: o, onCustomAnchorRemove: s } = i
    return (u.useEffect(() => (o(), () => s()), [o, s]), (0, R.jsx)(Hl, { ...a, ...r, ref: t }))
  })
M_.displayName = j_
var N_ = `PopoverTrigger`,
  P_ = u.forwardRef((e, t) => {
    let { __scopePopover: n, ...r } = e,
      i = k_(N_, n),
      a = D_(n),
      o = L(t, i.triggerRef),
      s = (0, R.jsx)(z.button, {
        type: `button`,
        'aria-haspopup': `dialog`,
        'aria-expanded': i.open,
        'aria-controls': i.contentId,
        'data-state': Y_(i.open),
        ...r,
        ref: o,
        onClick: I(e.onClick, i.onOpenToggle),
      })
    return i.hasCustomAnchor ? s : (0, R.jsx)(Hl, { asChild: !0, ...a, children: s })
  })
P_.displayName = N_
var F_ = `PopoverPortal`,
  [I_, L_] = T_(F_, { forceMount: void 0 }),
  R_ = (e) => {
    let { __scopePopover: t, forceMount: n, children: r, container: i } = e,
      a = k_(F_, t)
    return (0, R.jsx)(I_, {
      scope: t,
      forceMount: n,
      children: (0, R.jsx)(Pr, {
        present: n || a.open,
        children: (0, R.jsx)(Mr, { asChild: !0, container: i, children: r }),
      }),
    })
  }
R_.displayName = F_
var z_ = `PopoverContent`,
  B_ = u.forwardRef((e, t) => {
    let n = L_(z_, e.__scopePopover),
      { forceMount: r = n.forceMount, ...i } = e,
      a = k_(z_, e.__scopePopover)
    return (0, R.jsx)(Pr, {
      present: r || a.open,
      children: a.modal ? (0, R.jsx)(H_, { ...i, ref: t }) : (0, R.jsx)(U_, { ...i, ref: t }),
    })
  })
B_.displayName = z_
var V_ = ir(`PopoverContent.RemoveScroll`),
  H_ = u.forwardRef((e, t) => {
    let n = k_(z_, e.__scopePopover),
      r = u.useRef(null),
      i = L(t, r),
      a = u.useRef(!1)
    return (
      u.useEffect(() => {
        let e = r.current
        if (e) return Lf(e)
      }, []),
      (0, R.jsx)(Of, {
        as: V_,
        allowPinchZoom: !0,
        children: (0, R.jsx)(W_, {
          ...e,
          ref: i,
          trapFocus: n.open,
          disableOutsidePointerEvents: !0,
          onCloseAutoFocus: I(e.onCloseAutoFocus, (e) => {
            ;(e.preventDefault(), a.current || n.triggerRef.current?.focus())
          }),
          onPointerDownOutside: I(
            e.onPointerDownOutside,
            (e) => {
              let t = e.detail.originalEvent,
                n = t.button === 0 && t.ctrlKey === !0
              a.current = t.button === 2 || n
            },
            { checkForDefaultPrevented: !1 },
          ),
          onFocusOutside: I(e.onFocusOutside, (e) => e.preventDefault(), {
            checkForDefaultPrevented: !1,
          }),
        }),
      })
    )
  }),
  U_ = u.forwardRef((e, t) => {
    let n = k_(z_, e.__scopePopover),
      r = u.useRef(!1),
      i = u.useRef(!1)
    return (0, R.jsx)(W_, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (t) => {
        ;(e.onCloseAutoFocus?.(t),
          t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()),
          (r.current = !1),
          (i.current = !1))
      },
      onInteractOutside: (t) => {
        ;(e.onInteractOutside?.(t),
          t.defaultPrevented ||
            ((r.current = !0), t.detail.originalEvent.type === `pointerdown` && (i.current = !0)))
        let a = t.target
        ;(n.triggerRef.current?.contains(a) && t.preventDefault(),
          t.detail.originalEvent.type === `focusin` && i.current && t.preventDefault())
      },
    })
  }),
  W_ = u.forwardRef((e, t) => {
    let {
        __scopePopover: n,
        trapFocus: r,
        onOpenAutoFocus: i,
        onCloseAutoFocus: a,
        disableOutsidePointerEvents: o,
        onEscapeKeyDown: s,
        onPointerDownOutside: c,
        onFocusOutside: l,
        onInteractOutside: u,
        ...d
      } = e,
      f = k_(z_, n),
      p = D_(n)
    return (
      yd(),
      (0, R.jsx)(od, {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: i,
        onUnmountAutoFocus: a,
        children: (0, R.jsx)(xr, {
          asChild: !0,
          disableOutsidePointerEvents: o,
          onInteractOutside: u,
          onEscapeKeyDown: s,
          onPointerDownOutside: c,
          onFocusOutside: l,
          onDismiss: () => f.onOpenChange(!1),
          children: (0, R.jsx)(Ul, {
            'data-state': Y_(f.open),
            role: `dialog`,
            id: f.contentId,
            ...p,
            ...d,
            ref: t,
            style: {
              ...d.style,
              '--radix-popover-content-transform-origin': `var(--radix-popper-transform-origin)`,
              '--radix-popover-content-available-width': `var(--radix-popper-available-width)`,
              '--radix-popover-content-available-height': `var(--radix-popper-available-height)`,
              '--radix-popover-trigger-width': `var(--radix-popper-anchor-width)`,
              '--radix-popover-trigger-height': `var(--radix-popper-anchor-height)`,
            },
          }),
        }),
      })
    )
  }),
  G_ = `PopoverClose`,
  K_ = u.forwardRef((e, t) => {
    let { __scopePopover: n, ...r } = e,
      i = k_(G_, n)
    return (0, R.jsx)(z.button, {
      type: `button`,
      ...r,
      ref: t,
      onClick: I(e.onClick, () => i.onOpenChange(!1)),
    })
  })
K_.displayName = G_
var q_ = `PopoverArrow`,
  J_ = u.forwardRef((e, t) => {
    let { __scopePopover: n, ...r } = e,
      i = D_(n)
    return (0, R.jsx)(Wl, { ...i, ...r, ref: t })
  })
J_.displayName = q_
function Y_(e) {
  return e ? `open` : `closed`
}
var X_ = A_,
  Z_ = P_,
  Q_ = R_,
  $_ = B_,
  ev = X_,
  tv = Z_,
  nv = u.forwardRef(({ className: e, align: t = `center`, sideOffset: n = 4, ...r }, i) =>
    (0, R.jsx)(Q_, {
      children: (0, R.jsx)($_, {
        ref: i,
        align: t,
        sideOffset: n,
        className: G(
          `z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]`,
          e,
        ),
        ...r,
      }),
    }),
  )
nv.displayName = $_.displayName
var rv = vp,
  iv = yp,
  av = bp,
  ov = u.forwardRef(({ className: e, ...t }, n) =>
    (0, R.jsx)(xp, {
      ref: n,
      className: G(
        `fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`,
        e,
      ),
      ...t,
    }),
  )
ov.displayName = xp.displayName
var sv = u.forwardRef(({ className: e, children: t, ...n }, r) =>
  (0, R.jsxs)(av, {
    children: [
      (0, R.jsx)(ov, {}),
      (0, R.jsxs)(Sp, {
        ref: r,
        className: G(
          `fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg overflow-y-auto max-h-[90vh]`,
          e,
        ),
        ...n,
        children: [
          t,
          (0, R.jsxs)(Tp, {
            className: `absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground`,
            children: [
              (0, R.jsx)(ya, { className: `h-4 w-4` }),
              (0, R.jsx)(`span`, { className: `sr-only`, children: `Close` }),
            ],
          }),
        ],
      }),
    ],
  }),
)
sv.displayName = Sp.displayName
var cv = ({ className: e, ...t }) =>
  (0, R.jsx)(`div`, { className: G(`flex flex-col space-y-1.5 text-center sm:text-left`, e), ...t })
cv.displayName = `DialogHeader`
var lv = ({ className: e, ...t }) =>
  (0, R.jsx)(`div`, {
    className: G(`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2`, e),
    ...t,
  })
lv.displayName = `DialogFooter`
var uv = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(Cp, {
    ref: n,
    className: G(`text-lg font-semibold leading-none tracking-tight`, e),
    ...t,
  }),
)
uv.displayName = Cp.displayName
var dv = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(wp, { ref: n, className: G(`text-sm text-muted-foreground`, e), ...t }),
)
dv.displayName = wp.displayName
function fv(e, [t, n]) {
  return Math.min(n, Math.max(t, e))
}
function pv(e, t) {
  return u.useReducer((e, n) => t[e][n] ?? e, e)
}
var mv = `ScrollArea`,
  [hv, gv] = nr(mv),
  [_v, vv] = hv(mv),
  yv = u.forwardRef((e, t) => {
    let { __scopeScrollArea: n, type: r = `hover`, dir: i, scrollHideDelay: a = 600, ...o } = e,
      [s, c] = u.useState(null),
      [l, d] = u.useState(null),
      [f, p] = u.useState(null),
      [m, h] = u.useState(null),
      [g, _] = u.useState(null),
      [v, y] = u.useState(0),
      [b, x] = u.useState(0),
      [S, C] = u.useState(!1),
      [w, T] = u.useState(!1),
      E = L(t, (e) => c(e)),
      D = _m(i)
    return (0, R.jsx)(_v, {
      scope: n,
      type: r,
      dir: D,
      scrollHideDelay: a,
      scrollArea: s,
      viewport: l,
      onViewportChange: d,
      content: f,
      onContentChange: p,
      scrollbarX: m,
      onScrollbarXChange: h,
      scrollbarXEnabled: S,
      onScrollbarXEnabledChange: C,
      scrollbarY: g,
      onScrollbarYChange: _,
      scrollbarYEnabled: w,
      onScrollbarYEnabledChange: T,
      onCornerWidthChange: y,
      onCornerHeightChange: x,
      children: (0, R.jsx)(z.div, {
        dir: D,
        ...o,
        ref: E,
        style: {
          position: `relative`,
          '--radix-scroll-area-corner-width': v + `px`,
          '--radix-scroll-area-corner-height': b + `px`,
          ...e.style,
        },
      }),
    })
  })
yv.displayName = mv
var bv = `ScrollAreaViewport`,
  xv = u.forwardRef((e, t) => {
    let { __scopeScrollArea: n, children: r, nonce: i, ...a } = e,
      o = vv(bv, n),
      s = L(t, u.useRef(null), o.onViewportChange)
    return (0, R.jsxs)(R.Fragment, {
      children: [
        (0, R.jsx)(`style`, {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`,
          },
          nonce: i,
        }),
        (0, R.jsx)(z.div, {
          'data-radix-scroll-area-viewport': ``,
          ...a,
          ref: s,
          style: {
            overflowX: o.scrollbarXEnabled ? `scroll` : `hidden`,
            overflowY: o.scrollbarYEnabled ? `scroll` : `hidden`,
            ...e.style,
          },
          children: (0, R.jsx)(`div`, {
            ref: o.onContentChange,
            style: { minWidth: `100%`, display: `table` },
            children: r,
          }),
        }),
      ],
    })
  })
xv.displayName = bv
var Sv = `ScrollAreaScrollbar`,
  Cv = u.forwardRef((e, t) => {
    let { forceMount: n, ...r } = e,
      i = vv(Sv, e.__scopeScrollArea),
      { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: o } = i,
      s = e.orientation === `horizontal`
    return (
      u.useEffect(
        () => (
          s ? a(!0) : o(!0),
          () => {
            s ? a(!1) : o(!1)
          }
        ),
        [s, a, o],
      ),
      i.type === `hover`
        ? (0, R.jsx)(wv, { ...r, ref: t, forceMount: n })
        : i.type === `scroll`
          ? (0, R.jsx)(Tv, { ...r, ref: t, forceMount: n })
          : i.type === `auto`
            ? (0, R.jsx)(Ev, { ...r, ref: t, forceMount: n })
            : i.type === `always`
              ? (0, R.jsx)(Dv, { ...r, ref: t })
              : null
    )
  })
Cv.displayName = Sv
var wv = u.forwardRef((e, t) => {
    let { forceMount: n, ...r } = e,
      i = vv(Sv, e.__scopeScrollArea),
      [a, o] = u.useState(!1)
    return (
      u.useEffect(() => {
        let e = i.scrollArea,
          t = 0
        if (e) {
          let n = () => {
              ;(window.clearTimeout(t), o(!0))
            },
            r = () => {
              t = window.setTimeout(() => o(!1), i.scrollHideDelay)
            }
          return (
            e.addEventListener(`pointerenter`, n),
            e.addEventListener(`pointerleave`, r),
            () => {
              ;(window.clearTimeout(t),
                e.removeEventListener(`pointerenter`, n),
                e.removeEventListener(`pointerleave`, r))
            }
          )
        }
      }, [i.scrollArea, i.scrollHideDelay]),
      (0, R.jsx)(Pr, {
        present: n || a,
        children: (0, R.jsx)(Ev, { 'data-state': a ? `visible` : `hidden`, ...r, ref: t }),
      })
    )
  }),
  Tv = u.forwardRef((e, t) => {
    let { forceMount: n, ...r } = e,
      i = vv(Sv, e.__scopeScrollArea),
      a = e.orientation === `horizontal`,
      o = qv(() => c(`SCROLL_END`), 100),
      [s, c] = pv(`hidden`, {
        hidden: { SCROLL: `scrolling` },
        scrolling: { SCROLL_END: `idle`, POINTER_ENTER: `interacting` },
        interacting: { SCROLL: `interacting`, POINTER_LEAVE: `idle` },
        idle: { HIDE: `hidden`, SCROLL: `scrolling`, POINTER_ENTER: `interacting` },
      })
    return (
      u.useEffect(() => {
        if (s === `idle`) {
          let e = window.setTimeout(() => c(`HIDE`), i.scrollHideDelay)
          return () => window.clearTimeout(e)
        }
      }, [s, i.scrollHideDelay, c]),
      u.useEffect(() => {
        let e = i.viewport,
          t = a ? `scrollLeft` : `scrollTop`
        if (e) {
          let n = e[t],
            r = () => {
              let r = e[t]
              ;(n !== r && (c(`SCROLL`), o()), (n = r))
            }
          return (e.addEventListener(`scroll`, r), () => e.removeEventListener(`scroll`, r))
        }
      }, [i.viewport, a, c, o]),
      (0, R.jsx)(Pr, {
        present: n || s !== `hidden`,
        children: (0, R.jsx)(Dv, {
          'data-state': s === `hidden` ? `hidden` : `visible`,
          ...r,
          ref: t,
          onPointerEnter: I(e.onPointerEnter, () => c(`POINTER_ENTER`)),
          onPointerLeave: I(e.onPointerLeave, () => c(`POINTER_LEAVE`)),
        }),
      })
    )
  }),
  Ev = u.forwardRef((e, t) => {
    let n = vv(Sv, e.__scopeScrollArea),
      { forceMount: r, ...i } = e,
      [a, o] = u.useState(!1),
      s = e.orientation === `horizontal`,
      c = qv(() => {
        if (n.viewport) {
          let e = n.viewport.offsetWidth < n.viewport.scrollWidth,
            t = n.viewport.offsetHeight < n.viewport.scrollHeight
          o(s ? e : t)
        }
      }, 10)
    return (
      Jv(n.viewport, c),
      Jv(n.content, c),
      (0, R.jsx)(Pr, {
        present: r || a,
        children: (0, R.jsx)(Dv, { 'data-state': a ? `visible` : `hidden`, ...i, ref: t }),
      })
    )
  }),
  Dv = u.forwardRef((e, t) => {
    let { orientation: n = `vertical`, ...r } = e,
      i = vv(Sv, e.__scopeScrollArea),
      a = u.useRef(null),
      o = u.useRef(0),
      [s, c] = u.useState({
        content: 0,
        viewport: 0,
        scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
      }),
      l = Bv(s.viewport, s.content),
      d = {
        ...r,
        sizes: s,
        onSizesChange: c,
        hasThumb: l > 0 && l < 1,
        onThumbChange: (e) => (a.current = e),
        onThumbPointerUp: () => (o.current = 0),
        onThumbPointerDown: (e) => (o.current = e),
      }
    function f(e, t) {
      return Hv(e, o.current, s, t)
    }
    return n === `horizontal`
      ? (0, R.jsx)(Ov, {
          ...d,
          ref: t,
          onThumbPositionChange: () => {
            if (i.viewport && a.current) {
              let e = i.viewport.scrollLeft,
                t = Uv(e, s, i.dir)
              a.current.style.transform = `translate3d(${t}px, 0, 0)`
            }
          },
          onWheelScroll: (e) => {
            i.viewport && (i.viewport.scrollLeft = e)
          },
          onDragScroll: (e) => {
            i.viewport && (i.viewport.scrollLeft = f(e, i.dir))
          },
        })
      : n === `vertical`
        ? (0, R.jsx)(kv, {
            ...d,
            ref: t,
            onThumbPositionChange: () => {
              if (i.viewport && a.current) {
                let e = i.viewport.scrollTop,
                  t = Uv(e, s)
                a.current.style.transform = `translate3d(0, ${t}px, 0)`
              }
            },
            onWheelScroll: (e) => {
              i.viewport && (i.viewport.scrollTop = e)
            },
            onDragScroll: (e) => {
              i.viewport && (i.viewport.scrollTop = f(e))
            },
          })
        : null
  }),
  Ov = u.forwardRef((e, t) => {
    let { sizes: n, onSizesChange: r, ...i } = e,
      a = vv(Sv, e.__scopeScrollArea),
      [o, s] = u.useState(),
      c = u.useRef(null),
      l = L(t, c, a.onScrollbarXChange)
    return (
      u.useEffect(() => {
        c.current && s(getComputedStyle(c.current))
      }, [c]),
      (0, R.jsx)(Mv, {
        'data-orientation': `horizontal`,
        ...i,
        ref: l,
        sizes: n,
        style: {
          bottom: 0,
          left: a.dir === `rtl` ? `var(--radix-scroll-area-corner-width)` : 0,
          right: a.dir === `ltr` ? `var(--radix-scroll-area-corner-width)` : 0,
          '--radix-scroll-area-thumb-width': Vv(n) + `px`,
          ...e.style,
        },
        onThumbPointerDown: (t) => e.onThumbPointerDown(t.x),
        onDragScroll: (t) => e.onDragScroll(t.x),
        onWheelScroll: (t, n) => {
          if (a.viewport) {
            let r = a.viewport.scrollLeft + t.deltaX
            ;(e.onWheelScroll(r), Gv(r, n) && t.preventDefault())
          }
        },
        onResize: () => {
          c.current &&
            a.viewport &&
            o &&
            r({
              content: a.viewport.scrollWidth,
              viewport: a.viewport.offsetWidth,
              scrollbar: {
                size: c.current.clientWidth,
                paddingStart: zv(o.paddingLeft),
                paddingEnd: zv(o.paddingRight),
              },
            })
        },
      })
    )
  }),
  kv = u.forwardRef((e, t) => {
    let { sizes: n, onSizesChange: r, ...i } = e,
      a = vv(Sv, e.__scopeScrollArea),
      [o, s] = u.useState(),
      c = u.useRef(null),
      l = L(t, c, a.onScrollbarYChange)
    return (
      u.useEffect(() => {
        c.current && s(getComputedStyle(c.current))
      }, [c]),
      (0, R.jsx)(Mv, {
        'data-orientation': `vertical`,
        ...i,
        ref: l,
        sizes: n,
        style: {
          top: 0,
          right: a.dir === `ltr` ? 0 : void 0,
          left: a.dir === `rtl` ? 0 : void 0,
          bottom: `var(--radix-scroll-area-corner-height)`,
          '--radix-scroll-area-thumb-height': Vv(n) + `px`,
          ...e.style,
        },
        onThumbPointerDown: (t) => e.onThumbPointerDown(t.y),
        onDragScroll: (t) => e.onDragScroll(t.y),
        onWheelScroll: (t, n) => {
          if (a.viewport) {
            let r = a.viewport.scrollTop + t.deltaY
            ;(e.onWheelScroll(r), Gv(r, n) && t.preventDefault())
          }
        },
        onResize: () => {
          c.current &&
            a.viewport &&
            o &&
            r({
              content: a.viewport.scrollHeight,
              viewport: a.viewport.offsetHeight,
              scrollbar: {
                size: c.current.clientHeight,
                paddingStart: zv(o.paddingTop),
                paddingEnd: zv(o.paddingBottom),
              },
            })
        },
      })
    )
  }),
  [Av, jv] = hv(Sv),
  Mv = u.forwardRef((e, t) => {
    let {
        __scopeScrollArea: n,
        sizes: r,
        hasThumb: i,
        onThumbChange: a,
        onThumbPointerUp: o,
        onThumbPointerDown: s,
        onThumbPositionChange: c,
        onDragScroll: l,
        onWheelScroll: d,
        onResize: f,
        ...p
      } = e,
      m = vv(Sv, n),
      [h, g] = u.useState(null),
      _ = L(t, (e) => g(e)),
      v = u.useRef(null),
      y = u.useRef(``),
      b = m.viewport,
      x = r.content - r.viewport,
      S = pr(d),
      C = pr(c),
      w = qv(f, 10)
    function T(e) {
      v.current && l({ x: e.clientX - v.current.left, y: e.clientY - v.current.top })
    }
    return (
      u.useEffect(() => {
        let e = (e) => {
          let t = e.target
          h?.contains(t) && S(e, x)
        }
        return (
          document.addEventListener(`wheel`, e, { passive: !1 }),
          () => document.removeEventListener(`wheel`, e, { passive: !1 })
        )
      }, [b, h, x, S]),
      u.useEffect(C, [r, C]),
      Jv(h, w),
      Jv(m.content, w),
      (0, R.jsx)(Av, {
        scope: n,
        scrollbar: h,
        hasThumb: i,
        onThumbChange: pr(a),
        onThumbPointerUp: pr(o),
        onThumbPositionChange: C,
        onThumbPointerDown: pr(s),
        children: (0, R.jsx)(z.div, {
          ...p,
          ref: _,
          style: { position: `absolute`, ...p.style },
          onPointerDown: I(e.onPointerDown, (e) => {
            e.button === 0 &&
              (e.target.setPointerCapture(e.pointerId),
              (v.current = h.getBoundingClientRect()),
              (y.current = document.body.style.webkitUserSelect),
              (document.body.style.webkitUserSelect = `none`),
              m.viewport && (m.viewport.style.scrollBehavior = `auto`),
              T(e))
          }),
          onPointerMove: I(e.onPointerMove, T),
          onPointerUp: I(e.onPointerUp, (e) => {
            let t = e.target
            ;(t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId),
              (document.body.style.webkitUserSelect = y.current),
              m.viewport && (m.viewport.style.scrollBehavior = ``),
              (v.current = null))
          }),
        }),
      })
    )
  }),
  Nv = `ScrollAreaThumb`,
  Pv = u.forwardRef((e, t) => {
    let { forceMount: n, ...r } = e,
      i = jv(Nv, e.__scopeScrollArea)
    return (0, R.jsx)(Pr, { present: n || i.hasThumb, children: (0, R.jsx)(Fv, { ref: t, ...r }) })
  }),
  Fv = u.forwardRef((e, t) => {
    let { __scopeScrollArea: n, style: r, ...i } = e,
      a = vv(Nv, n),
      o = jv(Nv, n),
      { onThumbPositionChange: s } = o,
      c = L(t, (e) => o.onThumbChange(e)),
      l = u.useRef(void 0),
      d = qv(() => {
        l.current &&= (l.current(), void 0)
      }, 100)
    return (
      u.useEffect(() => {
        let e = a.viewport
        if (e) {
          let t = () => {
            ;(d(), l.current || ((l.current = Kv(e, s)), s()))
          }
          return (s(), e.addEventListener(`scroll`, t), () => e.removeEventListener(`scroll`, t))
        }
      }, [a.viewport, d, s]),
      (0, R.jsx)(z.div, {
        'data-state': o.hasThumb ? `visible` : `hidden`,
        ...i,
        ref: c,
        style: {
          width: `var(--radix-scroll-area-thumb-width)`,
          height: `var(--radix-scroll-area-thumb-height)`,
          ...r,
        },
        onPointerDownCapture: I(e.onPointerDownCapture, (e) => {
          let t = e.target.getBoundingClientRect(),
            n = e.clientX - t.left,
            r = e.clientY - t.top
          o.onThumbPointerDown({ x: n, y: r })
        }),
        onPointerUp: I(e.onPointerUp, o.onThumbPointerUp),
      })
    )
  })
Pv.displayName = Nv
var Iv = `ScrollAreaCorner`,
  Lv = u.forwardRef((e, t) => {
    let n = vv(Iv, e.__scopeScrollArea),
      r = !!(n.scrollbarX && n.scrollbarY)
    return n.type !== `scroll` && r ? (0, R.jsx)(Rv, { ...e, ref: t }) : null
  })
Lv.displayName = Iv
var Rv = u.forwardRef((e, t) => {
  let { __scopeScrollArea: n, ...r } = e,
    i = vv(Iv, n),
    [a, o] = u.useState(0),
    [s, c] = u.useState(0),
    l = !!(a && s)
  return (
    Jv(i.scrollbarX, () => {
      let e = i.scrollbarX?.offsetHeight || 0
      ;(i.onCornerHeightChange(e), c(e))
    }),
    Jv(i.scrollbarY, () => {
      let e = i.scrollbarY?.offsetWidth || 0
      ;(i.onCornerWidthChange(e), o(e))
    }),
    l
      ? (0, R.jsx)(z.div, {
          ...r,
          ref: t,
          style: {
            width: a,
            height: s,
            position: `absolute`,
            right: i.dir === `ltr` ? 0 : void 0,
            left: i.dir === `rtl` ? 0 : void 0,
            bottom: 0,
            ...e.style,
          },
        })
      : null
  )
})
function zv(e) {
  return e ? parseInt(e, 10) : 0
}
function Bv(e, t) {
  let n = e / t
  return isNaN(n) ? 0 : n
}
function Vv(e) {
  let t = Bv(e.viewport, e.content),
    n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd,
    r = (e.scrollbar.size - n) * t
  return Math.max(r, 18)
}
function Hv(e, t, n, r = `ltr`) {
  let i = Vv(n),
    a = i / 2,
    o = t || a,
    s = i - o,
    c = n.scrollbar.paddingStart + o,
    l = n.scrollbar.size - n.scrollbar.paddingEnd - s,
    u = n.content - n.viewport,
    d = r === `ltr` ? [0, u] : [u * -1, 0]
  return Wv([c, l], d)(e)
}
function Uv(e, t, n = `ltr`) {
  let r = Vv(t),
    i = t.scrollbar.paddingStart + t.scrollbar.paddingEnd,
    a = t.scrollbar.size - i,
    o = t.content - t.viewport,
    s = a - r,
    c = fv(e, n === `ltr` ? [0, o] : [o * -1, 0])
  return Wv([0, o], [0, s])(c)
}
function Wv(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0]
    let r = (t[1] - t[0]) / (e[1] - e[0])
    return t[0] + r * (n - e[0])
  }
}
function Gv(e, t) {
  return e > 0 && e < t
}
var Kv = (e, t = () => {}) => {
  let n = { left: e.scrollLeft, top: e.scrollTop },
    r = 0
  return (
    (function i() {
      let a = { left: e.scrollLeft, top: e.scrollTop },
        o = n.left !== a.left,
        s = n.top !== a.top
      ;((o || s) && t(), (n = a), (r = window.requestAnimationFrame(i)))
    })(),
    () => window.cancelAnimationFrame(r)
  )
}
function qv(e, t) {
  let n = pr(e),
    r = u.useRef(0)
  return (
    u.useEffect(() => () => window.clearTimeout(r.current), []),
    u.useCallback(() => {
      ;(window.clearTimeout(r.current), (r.current = window.setTimeout(n, t)))
    }, [n, t])
  )
}
function Jv(e, t) {
  let n = pr(t)
  Ar(() => {
    let t = 0
    if (e) {
      let r = new ResizeObserver(() => {
        ;(cancelAnimationFrame(t), (t = window.requestAnimationFrame(n)))
      })
      return (
        r.observe(e),
        () => {
          ;(window.cancelAnimationFrame(t), r.unobserve(e))
        }
      )
    }
  }, [e, n])
}
var Yv = yv,
  Xv = xv,
  Zv = Lv,
  Qv = u.forwardRef(({ className: e, children: t, ...n }, r) =>
    (0, R.jsxs)(Yv, {
      ref: r,
      className: G(`relative overflow-hidden`, e),
      ...n,
      children: [
        (0, R.jsx)(Xv, { className: `h-full w-full rounded-[inherit]`, children: t }),
        (0, R.jsx)($v, {}),
        (0, R.jsx)(Zv, {}),
      ],
    }),
  )
Qv.displayName = Yv.displayName
var $v = u.forwardRef(({ className: e, orientation: t = `vertical`, ...n }, r) =>
  (0, R.jsx)(Cv, {
    ref: r,
    orientation: t,
    className: G(
      `flex touch-none select-none transition-colors`,
      t === `vertical` && `h-full w-2.5 border-l border-l-transparent p-[1px]`,
      t === `horizontal` && `h-2.5 flex-col border-t border-t-transparent p-[1px]`,
      e,
    ),
    ...n,
    children: (0, R.jsx)(Pv, { className: `relative flex-1 rounded-full bg-border` }),
  }),
)
$v.displayName = Cv.displayName
function ey(e) {
  let t = u.useRef({ value: e, previous: e })
  return u.useMemo(
    () => (
      t.current.value !== e && ((t.current.previous = t.current.value), (t.current.value = e)),
      t.current.previous
    ),
    [e],
  )
}
var ty = [` `, `Enter`, `ArrowUp`, `ArrowDown`],
  ny = [` `, `Enter`],
  ry = `Select`,
  [iy, ay, oy] = dr(ry),
  [sy, cy] = nr(ry, [oy, Al]),
  ly = Al(),
  [uy, dy] = sy(ry),
  [fy, py] = sy(ry),
  my = (e) => {
    let {
        __scopeSelect: t,
        children: n,
        open: r,
        defaultOpen: i,
        onOpenChange: a,
        value: o,
        defaultValue: s,
        onValueChange: c,
        dir: l,
        name: d,
        autoComplete: f,
        disabled: p,
        required: m,
        form: h,
      } = e,
      g = ly(t),
      [_, v] = u.useState(null),
      [y, b] = u.useState(null),
      [x, S] = u.useState(!1),
      C = _m(l),
      [w, T] = zr({ prop: r, defaultProp: i ?? !1, onChange: a, caller: ry }),
      [E, D] = zr({ prop: o, defaultProp: s, onChange: c, caller: ry }),
      O = u.useRef(null),
      k = _ ? h || !!_.closest(`form`) : !0,
      [A, j] = u.useState(new Set()),
      ee = Array.from(A)
        .map((e) => e.props.value)
        .join(`;`)
    return (0, R.jsx)(Vl, {
      ...g,
      children: (0, R.jsxs)(uy, {
        required: m,
        scope: t,
        trigger: _,
        onTriggerChange: v,
        valueNode: y,
        onValueNodeChange: b,
        valueNodeHasChildren: x,
        onValueNodeHasChildrenChange: S,
        contentId: ds(),
        value: E,
        onValueChange: D,
        open: w,
        onOpenChange: T,
        dir: C,
        triggerPointerDownPosRef: O,
        disabled: p,
        children: [
          (0, R.jsx)(iy.Provider, {
            scope: t,
            children: (0, R.jsx)(fy, {
              scope: e.__scopeSelect,
              onNativeOptionAdd: u.useCallback((e) => {
                j((t) => new Set(t).add(e))
              }, []),
              onNativeOptionRemove: u.useCallback((e) => {
                j((t) => {
                  let n = new Set(t)
                  return (n.delete(e), n)
                })
              }, []),
              children: n,
            }),
          }),
          k
            ? (0, R.jsxs)(
                lb,
                {
                  'aria-hidden': !0,
                  required: m,
                  tabIndex: -1,
                  name: d,
                  autoComplete: f,
                  value: E,
                  onChange: (e) => D(e.target.value),
                  disabled: p,
                  form: h,
                  children: [
                    E === void 0 ? (0, R.jsx)(`option`, { value: `` }) : null,
                    Array.from(A),
                  ],
                },
                ee,
              )
            : null,
        ],
      }),
    })
  }
my.displayName = ry
var hy = `SelectTrigger`,
  gy = u.forwardRef((e, t) => {
    let { __scopeSelect: n, disabled: r = !1, ...i } = e,
      a = ly(n),
      o = dy(hy, n),
      s = o.disabled || r,
      c = L(t, o.onTriggerChange),
      l = ay(n),
      d = u.useRef(`touch`),
      [f, p, m] = db((e) => {
        let t = l().filter((e) => !e.disabled),
          n = fb(
            t,
            e,
            t.find((e) => e.value === o.value),
          )
        n !== void 0 && o.onValueChange(n.value)
      }),
      h = (e) => {
        ;(s || (o.onOpenChange(!0), m()),
          e &&
            (o.triggerPointerDownPosRef.current = {
              x: Math.round(e.pageX),
              y: Math.round(e.pageY),
            }))
      }
    return (0, R.jsx)(Hl, {
      asChild: !0,
      ...a,
      children: (0, R.jsx)(z.button, {
        type: `button`,
        role: `combobox`,
        'aria-controls': o.contentId,
        'aria-expanded': o.open,
        'aria-required': o.required,
        'aria-autocomplete': `none`,
        dir: o.dir,
        'data-state': o.open ? `open` : `closed`,
        disabled: s,
        'data-disabled': s ? `` : void 0,
        'data-placeholder': ub(o.value) ? `` : void 0,
        ...i,
        ref: c,
        onClick: I(i.onClick, (e) => {
          ;(e.currentTarget.focus(), d.current !== `mouse` && h(e))
        }),
        onPointerDown: I(i.onPointerDown, (e) => {
          d.current = e.pointerType
          let t = e.target
          ;(t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId),
            e.button === 0 &&
              e.ctrlKey === !1 &&
              e.pointerType === `mouse` &&
              (h(e), e.preventDefault()))
        }),
        onKeyDown: I(i.onKeyDown, (e) => {
          let t = f.current !== ``
          ;(!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && p(e.key),
            !(t && e.key === ` `) && ty.includes(e.key) && (h(), e.preventDefault()))
        }),
      }),
    })
  })
gy.displayName = hy
var _y = `SelectValue`,
  vy = u.forwardRef((e, t) => {
    let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = ``, ...s } = e,
      c = dy(_y, n),
      { onValueNodeHasChildrenChange: l } = c,
      u = a !== void 0,
      d = L(t, c.onValueNodeChange)
    return (
      Ar(() => {
        l(u)
      }, [l, u]),
      (0, R.jsx)(z.span, {
        ...s,
        ref: d,
        style: { pointerEvents: `none` },
        children: ub(c.value) ? (0, R.jsx)(R.Fragment, { children: o }) : a,
      })
    )
  })
vy.displayName = _y
var yy = `SelectIcon`,
  by = u.forwardRef((e, t) => {
    let { __scopeSelect: n, children: r, ...i } = e
    return (0, R.jsx)(z.span, { 'aria-hidden': !0, ...i, ref: t, children: r || `▼` })
  })
by.displayName = yy
var xy = `SelectPortal`,
  Sy = (e) => (0, R.jsx)(Mr, { asChild: !0, ...e })
Sy.displayName = xy
var Cy = `SelectContent`,
  wy = u.forwardRef((e, t) => {
    let n = dy(Cy, e.__scopeSelect),
      [r, i] = u.useState()
    if (
      (Ar(() => {
        i(new DocumentFragment())
      }, []),
      !n.open)
    ) {
      let t = r
      return t
        ? d.createPortal(
            (0, R.jsx)(Ey, {
              scope: e.__scopeSelect,
              children: (0, R.jsx)(iy.Slot, {
                scope: e.__scopeSelect,
                children: (0, R.jsx)(`div`, { children: e.children }),
              }),
            }),
            t,
          )
        : null
    }
    return (0, R.jsx)(Ay, { ...e, ref: t })
  })
wy.displayName = Cy
var Ty = 10,
  [Ey, Dy] = sy(Cy),
  Oy = `SelectContentImpl`,
  ky = ir(`SelectContent.RemoveScroll`),
  Ay = u.forwardRef((e, t) => {
    let {
        __scopeSelect: n,
        position: r = `item-aligned`,
        onCloseAutoFocus: i,
        onEscapeKeyDown: a,
        onPointerDownOutside: o,
        side: s,
        sideOffset: c,
        align: l,
        alignOffset: d,
        arrowPadding: f,
        collisionBoundary: p,
        collisionPadding: m,
        sticky: h,
        hideWhenDetached: g,
        avoidCollisions: _,
        ...v
      } = e,
      y = dy(Cy, n),
      [b, x] = u.useState(null),
      [S, C] = u.useState(null),
      w = L(t, (e) => x(e)),
      [T, E] = u.useState(null),
      [D, O] = u.useState(null),
      k = ay(n),
      [A, j] = u.useState(!1),
      ee = u.useRef(!1)
    ;(u.useEffect(() => {
      if (b) return Lf(b)
    }, [b]),
      yd())
    let te = u.useCallback(
        (e) => {
          let [t, ...n] = k().map((e) => e.ref.current),
            [r] = n.slice(-1),
            i = document.activeElement
          for (let n of e)
            if (
              n === i ||
              (n?.scrollIntoView({ block: `nearest` }),
              n === t && S && (S.scrollTop = 0),
              n === r && S && (S.scrollTop = S.scrollHeight),
              n?.focus(),
              document.activeElement !== i)
            )
              return
        },
        [k, S],
      ),
      ne = u.useCallback(() => te([T, b]), [te, T, b])
    u.useEffect(() => {
      A && ne()
    }, [A, ne])
    let { onOpenChange: M, triggerPointerDownPosRef: N } = y
    ;(u.useEffect(() => {
      if (b) {
        let e = { x: 0, y: 0 },
          t = (t) => {
            e = {
              x: Math.abs(Math.round(t.pageX) - (N.current?.x ?? 0)),
              y: Math.abs(Math.round(t.pageY) - (N.current?.y ?? 0)),
            }
          },
          n = (n) => {
            ;(e.x <= 10 && e.y <= 10 ? n.preventDefault() : b.contains(n.target) || M(!1),
              document.removeEventListener(`pointermove`, t),
              (N.current = null))
          }
        return (
          N.current !== null &&
            (document.addEventListener(`pointermove`, t),
            document.addEventListener(`pointerup`, n, { capture: !0, once: !0 })),
          () => {
            ;(document.removeEventListener(`pointermove`, t),
              document.removeEventListener(`pointerup`, n, { capture: !0 }))
          }
        )
      }
    }, [b, M, N]),
      u.useEffect(() => {
        let e = () => M(!1)
        return (
          window.addEventListener(`blur`, e),
          window.addEventListener(`resize`, e),
          () => {
            ;(window.removeEventListener(`blur`, e), window.removeEventListener(`resize`, e))
          }
        )
      }, [M]))
    let [P, re] = db((e) => {
        let t = k().filter((e) => !e.disabled),
          n = fb(
            t,
            e,
            t.find((e) => e.ref.current === document.activeElement),
          )
        n && setTimeout(() => n.ref.current.focus())
      }),
      ie = u.useCallback(
        (e, t, n) => {
          let r = !ee.current && !n
          ;((y.value !== void 0 && y.value === t) || r) && (E(e), r && (ee.current = !0))
        },
        [y.value],
      ),
      ae = u.useCallback(() => b?.focus(), [b]),
      oe = u.useCallback(
        (e, t, n) => {
          let r = !ee.current && !n
          ;((y.value !== void 0 && y.value === t) || r) && O(e)
        },
        [y.value],
      ),
      se = r === `popper` ? Py : My,
      F =
        se === Py
          ? {
              side: s,
              sideOffset: c,
              align: l,
              alignOffset: d,
              arrowPadding: f,
              collisionBoundary: p,
              collisionPadding: m,
              sticky: h,
              hideWhenDetached: g,
              avoidCollisions: _,
            }
          : {}
    return (0, R.jsx)(Ey, {
      scope: n,
      content: b,
      viewport: S,
      onViewportChange: C,
      itemRefCallback: ie,
      selectedItem: T,
      onItemLeave: ae,
      itemTextRefCallback: oe,
      focusSelectedItem: ne,
      selectedItemText: D,
      position: r,
      isPositioned: A,
      searchRef: P,
      children: (0, R.jsx)(Of, {
        as: ky,
        allowPinchZoom: !0,
        children: (0, R.jsx)(od, {
          asChild: !0,
          trapped: y.open,
          onMountAutoFocus: (e) => {
            e.preventDefault()
          },
          onUnmountAutoFocus: I(i, (e) => {
            ;(y.trigger?.focus({ preventScroll: !0 }), e.preventDefault())
          }),
          children: (0, R.jsx)(xr, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: a,
            onPointerDownOutside: o,
            onFocusOutside: (e) => e.preventDefault(),
            onDismiss: () => y.onOpenChange(!1),
            children: (0, R.jsx)(se, {
              role: `listbox`,
              id: y.contentId,
              'data-state': y.open ? `open` : `closed`,
              dir: y.dir,
              onContextMenu: (e) => e.preventDefault(),
              ...v,
              ...F,
              onPlaced: () => j(!0),
              ref: w,
              style: { display: `flex`, flexDirection: `column`, outline: `none`, ...v.style },
              onKeyDown: I(v.onKeyDown, (e) => {
                let t = e.ctrlKey || e.altKey || e.metaKey
                if (
                  (e.key === `Tab` && e.preventDefault(),
                  !t && e.key.length === 1 && re(e.key),
                  [`ArrowUp`, `ArrowDown`, `Home`, `End`].includes(e.key))
                ) {
                  let t = k()
                    .filter((e) => !e.disabled)
                    .map((e) => e.ref.current)
                  if (
                    ([`ArrowUp`, `End`].includes(e.key) && (t = t.slice().reverse()),
                    [`ArrowUp`, `ArrowDown`].includes(e.key))
                  ) {
                    let n = e.target,
                      r = t.indexOf(n)
                    t = t.slice(r + 1)
                  }
                  ;(setTimeout(() => te(t)), e.preventDefault())
                }
              }),
            }),
          }),
        }),
      }),
    })
  })
Ay.displayName = Oy
var jy = `SelectItemAlignedPosition`,
  My = u.forwardRef((e, t) => {
    let { __scopeSelect: n, onPlaced: r, ...i } = e,
      a = dy(Cy, n),
      o = Dy(Cy, n),
      [s, c] = u.useState(null),
      [l, d] = u.useState(null),
      f = L(t, (e) => d(e)),
      p = ay(n),
      m = u.useRef(!1),
      h = u.useRef(!0),
      { viewport: g, selectedItem: _, selectedItemText: v, focusSelectedItem: y } = o,
      b = u.useCallback(() => {
        if (a.trigger && a.valueNode && s && l && g && _ && v) {
          let e = a.trigger.getBoundingClientRect(),
            t = l.getBoundingClientRect(),
            n = a.valueNode.getBoundingClientRect(),
            i = v.getBoundingClientRect()
          if (a.dir !== `rtl`) {
            let r = i.left - t.left,
              a = n.left - r,
              o = e.left - a,
              c = e.width + o,
              l = Math.max(c, t.width),
              u = window.innerWidth - Ty,
              d = fv(a, [Ty, Math.max(Ty, u - l)])
            ;((s.style.minWidth = c + `px`), (s.style.left = d + `px`))
          } else {
            let r = t.right - i.right,
              a = window.innerWidth - n.right - r,
              o = window.innerWidth - e.right - a,
              c = e.width + o,
              l = Math.max(c, t.width),
              u = window.innerWidth - Ty,
              d = fv(a, [Ty, Math.max(Ty, u - l)])
            ;((s.style.minWidth = c + `px`), (s.style.right = d + `px`))
          }
          let o = p(),
            c = window.innerHeight - Ty * 2,
            u = g.scrollHeight,
            d = window.getComputedStyle(l),
            f = parseInt(d.borderTopWidth, 10),
            h = parseInt(d.paddingTop, 10),
            y = parseInt(d.borderBottomWidth, 10),
            b = parseInt(d.paddingBottom, 10),
            x = f + h + u + b + y,
            S = Math.min(_.offsetHeight * 5, x),
            C = window.getComputedStyle(g),
            w = parseInt(C.paddingTop, 10),
            T = parseInt(C.paddingBottom, 10),
            E = e.top + e.height / 2 - Ty,
            D = c - E,
            O = _.offsetHeight / 2,
            k = _.offsetTop + O,
            A = f + h + k,
            j = x - A
          if (A <= E) {
            let e = o.length > 0 && _ === o[o.length - 1].ref.current
            s.style.bottom = `0px`
            let t = l.clientHeight - g.offsetTop - g.offsetHeight,
              n = A + Math.max(D, O + (e ? T : 0) + t + y)
            s.style.height = n + `px`
          } else {
            let e = o.length > 0 && _ === o[0].ref.current
            s.style.top = `0px`
            let t = Math.max(E, f + g.offsetTop + (e ? w : 0) + O) + j
            ;((s.style.height = t + `px`), (g.scrollTop = A - E + g.offsetTop))
          }
          ;((s.style.margin = `${Ty}px 0`),
            (s.style.minHeight = S + `px`),
            (s.style.maxHeight = c + `px`),
            r?.(),
            requestAnimationFrame(() => (m.current = !0)))
        }
      }, [p, a.trigger, a.valueNode, s, l, g, _, v, a.dir, r])
    Ar(() => b(), [b])
    let [x, S] = u.useState()
    return (
      Ar(() => {
        l && S(window.getComputedStyle(l).zIndex)
      }, [l]),
      (0, R.jsx)(Fy, {
        scope: n,
        contentWrapper: s,
        shouldExpandOnScrollRef: m,
        onScrollButtonChange: u.useCallback(
          (e) => {
            e && h.current === !0 && (b(), y?.(), (h.current = !1))
          },
          [b, y],
        ),
        children: (0, R.jsx)(`div`, {
          ref: c,
          style: { display: `flex`, flexDirection: `column`, position: `fixed`, zIndex: x },
          children: (0, R.jsx)(z.div, {
            ...i,
            ref: f,
            style: { boxSizing: `border-box`, maxHeight: `100%`, ...i.style },
          }),
        }),
      })
    )
  })
My.displayName = jy
var Ny = `SelectPopperPosition`,
  Py = u.forwardRef((e, t) => {
    let { __scopeSelect: n, align: r = `start`, collisionPadding: i = Ty, ...a } = e,
      o = ly(n)
    return (0, R.jsx)(Ul, {
      ...o,
      ...a,
      ref: t,
      align: r,
      collisionPadding: i,
      style: {
        boxSizing: `border-box`,
        ...a.style,
        '--radix-select-content-transform-origin': `var(--radix-popper-transform-origin)`,
        '--radix-select-content-available-width': `var(--radix-popper-available-width)`,
        '--radix-select-content-available-height': `var(--radix-popper-available-height)`,
        '--radix-select-trigger-width': `var(--radix-popper-anchor-width)`,
        '--radix-select-trigger-height': `var(--radix-popper-anchor-height)`,
      },
    })
  })
Py.displayName = Ny
var [Fy, Iy] = sy(Cy, {}),
  Ly = `SelectViewport`,
  Ry = u.forwardRef((e, t) => {
    let { __scopeSelect: n, nonce: r, ...i } = e,
      a = Dy(Ly, n),
      o = Iy(Ly, n),
      s = L(t, a.onViewportChange),
      c = u.useRef(0)
    return (0, R.jsxs)(R.Fragment, {
      children: [
        (0, R.jsx)(`style`, {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`,
          },
          nonce: r,
        }),
        (0, R.jsx)(iy.Slot, {
          scope: n,
          children: (0, R.jsx)(z.div, {
            'data-radix-select-viewport': ``,
            role: `presentation`,
            ...i,
            ref: s,
            style: { position: `relative`, flex: 1, overflow: `hidden auto`, ...i.style },
            onScroll: I(i.onScroll, (e) => {
              let t = e.currentTarget,
                { contentWrapper: n, shouldExpandOnScrollRef: r } = o
              if (r?.current && n) {
                let e = Math.abs(c.current - t.scrollTop)
                if (e > 0) {
                  let r = window.innerHeight - Ty * 2,
                    i = parseFloat(n.style.minHeight),
                    a = parseFloat(n.style.height),
                    o = Math.max(i, a)
                  if (o < r) {
                    let i = o + e,
                      a = Math.min(r, i),
                      s = i - a
                    ;((n.style.height = a + `px`),
                      n.style.bottom === `0px` &&
                        ((t.scrollTop = s > 0 ? s : 0), (n.style.justifyContent = `flex-end`)))
                  }
                }
              }
              c.current = t.scrollTop
            }),
          }),
        }),
      ],
    })
  })
Ry.displayName = Ly
var zy = `SelectGroup`,
  [By, Vy] = sy(zy),
  Hy = u.forwardRef((e, t) => {
    let { __scopeSelect: n, ...r } = e,
      i = ds()
    return (0, R.jsx)(By, {
      scope: n,
      id: i,
      children: (0, R.jsx)(z.div, { role: `group`, 'aria-labelledby': i, ...r, ref: t }),
    })
  })
Hy.displayName = zy
var Uy = `SelectLabel`,
  Wy = u.forwardRef((e, t) => {
    let { __scopeSelect: n, ...r } = e,
      i = Vy(Uy, n)
    return (0, R.jsx)(z.div, { id: i.id, ...r, ref: t })
  })
Wy.displayName = Uy
var Gy = `SelectItem`,
  [Ky, qy] = sy(Gy),
  Jy = u.forwardRef((e, t) => {
    let { __scopeSelect: n, value: r, disabled: i = !1, textValue: a, ...o } = e,
      s = dy(Gy, n),
      c = Dy(Gy, n),
      l = s.value === r,
      [d, f] = u.useState(a ?? ``),
      [p, m] = u.useState(!1),
      h = L(t, (e) => c.itemRefCallback?.(e, r, i)),
      g = ds(),
      _ = u.useRef(`touch`),
      v = () => {
        i || (s.onValueChange(r), s.onOpenChange(!1))
      }
    if (r === ``)
      throw Error(
        `A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.`,
      )
    return (0, R.jsx)(Ky, {
      scope: n,
      value: r,
      disabled: i,
      textId: g,
      isSelected: l,
      onItemTextChange: u.useCallback((e) => {
        f((t) => t || (e?.textContent ?? ``).trim())
      }, []),
      children: (0, R.jsx)(iy.ItemSlot, {
        scope: n,
        value: r,
        disabled: i,
        textValue: d,
        children: (0, R.jsx)(z.div, {
          role: `option`,
          'aria-labelledby': g,
          'data-highlighted': p ? `` : void 0,
          'aria-selected': l && p,
          'data-state': l ? `checked` : `unchecked`,
          'aria-disabled': i || void 0,
          'data-disabled': i ? `` : void 0,
          tabIndex: i ? void 0 : -1,
          ...o,
          ref: h,
          onFocus: I(o.onFocus, () => m(!0)),
          onBlur: I(o.onBlur, () => m(!1)),
          onClick: I(o.onClick, () => {
            _.current !== `mouse` && v()
          }),
          onPointerUp: I(o.onPointerUp, () => {
            _.current === `mouse` && v()
          }),
          onPointerDown: I(o.onPointerDown, (e) => {
            _.current = e.pointerType
          }),
          onPointerMove: I(o.onPointerMove, (e) => {
            ;((_.current = e.pointerType),
              i
                ? c.onItemLeave?.()
                : _.current === `mouse` && e.currentTarget.focus({ preventScroll: !0 }))
          }),
          onPointerLeave: I(o.onPointerLeave, (e) => {
            e.currentTarget === document.activeElement && c.onItemLeave?.()
          }),
          onKeyDown: I(o.onKeyDown, (e) => {
            ;(c.searchRef?.current !== `` && e.key === ` `) ||
              (ny.includes(e.key) && v(), e.key === ` ` && e.preventDefault())
          }),
        }),
      }),
    })
  })
Jy.displayName = Gy
var Yy = `SelectItemText`,
  Xy = u.forwardRef((e, t) => {
    let { __scopeSelect: n, className: r, style: i, ...a } = e,
      o = dy(Yy, n),
      s = Dy(Yy, n),
      c = qy(Yy, n),
      l = py(Yy, n),
      [f, p] = u.useState(null),
      m = L(
        t,
        (e) => p(e),
        c.onItemTextChange,
        (e) => s.itemTextRefCallback?.(e, c.value, c.disabled),
      ),
      h = f?.textContent,
      g = u.useMemo(
        () => (0, R.jsx)(`option`, { value: c.value, disabled: c.disabled, children: h }, c.value),
        [c.disabled, c.value, h],
      ),
      { onNativeOptionAdd: _, onNativeOptionRemove: v } = l
    return (
      Ar(() => (_(g), () => v(g)), [_, v, g]),
      (0, R.jsxs)(R.Fragment, {
        children: [
          (0, R.jsx)(z.span, { id: c.textId, ...a, ref: m }),
          c.isSelected && o.valueNode && !o.valueNodeHasChildren
            ? d.createPortal(a.children, o.valueNode)
            : null,
        ],
      })
    )
  })
Xy.displayName = Yy
var Zy = `SelectItemIndicator`,
  Qy = u.forwardRef((e, t) => {
    let { __scopeSelect: n, ...r } = e
    return qy(Zy, n).isSelected ? (0, R.jsx)(z.span, { 'aria-hidden': !0, ...r, ref: t }) : null
  })
Qy.displayName = Zy
var $y = `SelectScrollUpButton`,
  eb = u.forwardRef((e, t) => {
    let n = Dy($y, e.__scopeSelect),
      r = Iy($y, e.__scopeSelect),
      [i, a] = u.useState(!1),
      o = L(t, r.onScrollButtonChange)
    return (
      Ar(() => {
        if (n.viewport && n.isPositioned) {
          let e = function () {
              a(t.scrollTop > 0)
            },
            t = n.viewport
          return (e(), t.addEventListener(`scroll`, e), () => t.removeEventListener(`scroll`, e))
        }
      }, [n.viewport, n.isPositioned]),
      i
        ? (0, R.jsx)(rb, {
            ...e,
            ref: o,
            onAutoScroll: () => {
              let { viewport: e, selectedItem: t } = n
              e && t && (e.scrollTop -= t.offsetHeight)
            },
          })
        : null
    )
  })
eb.displayName = $y
var tb = `SelectScrollDownButton`,
  nb = u.forwardRef((e, t) => {
    let n = Dy(tb, e.__scopeSelect),
      r = Iy(tb, e.__scopeSelect),
      [i, a] = u.useState(!1),
      o = L(t, r.onScrollButtonChange)
    return (
      Ar(() => {
        if (n.viewport && n.isPositioned) {
          let e = function () {
              let e = t.scrollHeight - t.clientHeight
              a(Math.ceil(t.scrollTop) < e)
            },
            t = n.viewport
          return (e(), t.addEventListener(`scroll`, e), () => t.removeEventListener(`scroll`, e))
        }
      }, [n.viewport, n.isPositioned]),
      i
        ? (0, R.jsx)(rb, {
            ...e,
            ref: o,
            onAutoScroll: () => {
              let { viewport: e, selectedItem: t } = n
              e && t && (e.scrollTop += t.offsetHeight)
            },
          })
        : null
    )
  })
nb.displayName = tb
var rb = u.forwardRef((e, t) => {
    let { __scopeSelect: n, onAutoScroll: r, ...i } = e,
      a = Dy(`SelectScrollButton`, n),
      o = u.useRef(null),
      s = ay(n),
      c = u.useCallback(() => {
        o.current !== null && (window.clearInterval(o.current), (o.current = null))
      }, [])
    return (
      u.useEffect(() => () => c(), [c]),
      Ar(() => {
        s()
          .find((e) => e.ref.current === document.activeElement)
          ?.ref.current?.scrollIntoView({ block: `nearest` })
      }, [s]),
      (0, R.jsx)(z.div, {
        'aria-hidden': !0,
        ...i,
        ref: t,
        style: { flexShrink: 0, ...i.style },
        onPointerDown: I(i.onPointerDown, () => {
          o.current === null && (o.current = window.setInterval(r, 50))
        }),
        onPointerMove: I(i.onPointerMove, () => {
          ;(a.onItemLeave?.(), o.current === null && (o.current = window.setInterval(r, 50)))
        }),
        onPointerLeave: I(i.onPointerLeave, () => {
          c()
        }),
      })
    )
  }),
  ib = `SelectSeparator`,
  ab = u.forwardRef((e, t) => {
    let { __scopeSelect: n, ...r } = e
    return (0, R.jsx)(z.div, { 'aria-hidden': !0, ...r, ref: t })
  })
ab.displayName = ib
var ob = `SelectArrow`,
  sb = u.forwardRef((e, t) => {
    let { __scopeSelect: n, ...r } = e,
      i = ly(n),
      a = dy(ob, n),
      o = Dy(ob, n)
    return a.open && o.position === `popper` ? (0, R.jsx)(Wl, { ...i, ...r, ref: t }) : null
  })
sb.displayName = ob
var cb = `SelectBubbleInput`,
  lb = u.forwardRef(({ __scopeSelect: e, value: t, ...n }, r) => {
    let i = u.useRef(null),
      a = L(r, i),
      o = ey(t)
    return (
      u.useEffect(() => {
        let e = i.current
        if (!e) return
        let n = window.HTMLSelectElement.prototype,
          r = Object.getOwnPropertyDescriptor(n, `value`).set
        if (o !== t && r) {
          let n = new Event(`change`, { bubbles: !0 })
          ;(r.call(e, t), e.dispatchEvent(n))
        }
      }, [o, t]),
      (0, R.jsx)(z.select, { ...n, style: { ...Hr, ...n.style }, ref: a, defaultValue: t })
    )
  })
lb.displayName = cb
function ub(e) {
  return e === `` || e === void 0
}
function db(e) {
  let t = pr(e),
    n = u.useRef(``),
    r = u.useRef(0),
    i = u.useCallback(
      (e) => {
        let i = n.current + e
        ;(t(i),
          (function e(t) {
            ;((n.current = t),
              window.clearTimeout(r.current),
              t !== `` && (r.current = window.setTimeout(() => e(``), 1e3)))
          })(i))
      },
      [t],
    ),
    a = u.useCallback(() => {
      ;((n.current = ``), window.clearTimeout(r.current))
    }, [])
  return (u.useEffect(() => () => window.clearTimeout(r.current), []), [n, i, a])
}
function fb(e, t, n) {
  let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1,
    a = pb(e, Math.max(i, 0))
  r.length === 1 && (a = a.filter((e) => e !== n))
  let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()))
  return o === n ? void 0 : o
}
function pb(e, t) {
  return e.map((n, r) => e[(t + r) % e.length])
}
var mb = my,
  hb = gy,
  gb = vy,
  _b = by,
  vb = Sy,
  yb = wy,
  bb = Ry,
  xb = Hy,
  Sb = Wy,
  Cb = Jy,
  wb = Xy,
  Tb = Qy,
  Eb = eb,
  Db = nb,
  Ob = ab,
  kb = mb,
  Ab = xb,
  jb = gb,
  Mb = u.forwardRef(({ className: e, children: t, ...n }, r) =>
    (0, R.jsxs)(hb, {
      ref: r,
      className: G(
        `flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`,
        e,
      ),
      ...n,
      children: [
        t,
        (0, R.jsx)(_b, {
          asChild: !0,
          children: (0, R.jsx)(na, { className: `h-4 w-4 opacity-50` }),
        }),
      ],
    }),
  )
Mb.displayName = hb.displayName
var Nb = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(Eb, {
    ref: n,
    className: G(`flex cursor-default items-center justify-center py-1`, e),
    ...t,
    children: (0, R.jsx)(ia, { className: `h-4 w-4` }),
  }),
)
Nb.displayName = Eb.displayName
var Pb = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(Db, {
    ref: n,
    className: G(`flex cursor-default items-center justify-center py-1`, e),
    ...t,
    children: (0, R.jsx)(na, { className: `h-4 w-4` }),
  }),
)
Pb.displayName = Db.displayName
var Fb = u.forwardRef(({ className: e, children: t, position: n = `popper`, ...r }, i) =>
  (0, R.jsx)(vb, {
    children: (0, R.jsxs)(yb, {
      ref: i,
      className: G(
        `relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]`,
        n === `popper` &&
          `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
        e,
      ),
      position: n,
      ...r,
      children: [
        (0, R.jsx)(Nb, {}),
        (0, R.jsx)(bb, {
          className: G(
            `p-1`,
            n === `popper` &&
              `h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]`,
          ),
          children: t,
        }),
        (0, R.jsx)(Pb, {}),
      ],
    }),
  }),
)
Fb.displayName = yb.displayName
var Ib = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(Sb, { ref: n, className: G(`py-1.5 pl-8 pr-2 text-sm font-semibold`, e), ...t }),
)
Ib.displayName = Sb.displayName
var Lb = u.forwardRef(({ className: e, children: t, ...n }, r) =>
  (0, R.jsxs)(Cb, {
    ref: r,
    className: G(
      `relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
      e,
    ),
    ...n,
    children: [
      (0, R.jsx)(`span`, {
        className: `absolute left-2 flex h-3.5 w-3.5 items-center justify-center`,
        children: (0, R.jsx)(Tb, { children: (0, R.jsx)(ta, { className: `h-4 w-4` }) }),
      }),
      (0, R.jsx)(wb, { children: t }),
    ],
  }),
)
Lb.displayName = Cb.displayName
var Rb = u.forwardRef(({ className: e, ...t }, n) =>
  (0, R.jsx)(Ob, { ref: n, className: G(`-mx-1 my-1 h-px bg-muted`, e), ...t }),
)
Rb.displayName = Ob.displayName
var zb = class e extends Error {
    constructor(t) {
      ;(super(`ClientResponseError`),
        (this.url = ``),
        (this.status = 0),
        (this.response = {}),
        (this.isAbort = !1),
        (this.originalError = null),
        Object.setPrototypeOf(this, e.prototype),
        typeof t == `object` &&
          t &&
          ((this.originalError = t.originalError),
          (this.url = typeof t.url == `string` ? t.url : ``),
          (this.status = typeof t.status == `number` ? t.status : 0),
          (this.isAbort = !!t.isAbort || t.name === `AbortError` || t.message === `Aborted`),
          t.response !== null && typeof t.response == `object`
            ? (this.response = t.response)
            : t.data !== null && typeof t.data == `object`
              ? (this.response = t.data)
              : (this.response = {})),
        this.originalError || t instanceof e || (this.originalError = t),
        (this.name = `ClientResponseError ` + this.status),
        (this.message = this.response?.message),
        this.message ||
          (this.isAbort
            ? (this.message = `The request was aborted (most likely autocancelled; you can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation).`)
            : this.originalError?.cause?.message?.includes(`ECONNREFUSED ::1`)
              ? (this.message = `Failed to connect to the PocketBase server. Try changing the SDK URL from localhost to 127.0.0.1 (https://github.com/pocketbase/js-sdk/issues/21).`)
              : (this.message = `Something went wrong.`)),
        (this.cause = this.originalError))
    }
    get data() {
      return this.response
    }
    toJSON() {
      return { ...this }
    }
  },
  Bb = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/
function Vb(e, t) {
  let n = {}
  if (typeof e != `string`) return n
  let r = Object.assign({}, t || {}).decode || Ub,
    i = 0
  for (; i < e.length; ) {
    let t = e.indexOf(`=`, i)
    if (t === -1) break
    let a = e.indexOf(`;`, i)
    if (a === -1) a = e.length
    else if (a < t) {
      i = e.lastIndexOf(`;`, t - 1) + 1
      continue
    }
    let o = e.slice(i, t).trim()
    if (n[o] === void 0) {
      let i = e.slice(t + 1, a).trim()
      i.charCodeAt(0) === 34 && (i = i.slice(1, -1))
      try {
        n[o] = r(i)
      } catch {
        n[o] = i
      }
    }
    i = a + 1
  }
  return n
}
function Hb(e, t, n) {
  let r = Object.assign({}, n || {}),
    i = r.encode || Wb
  if (!Bb.test(e)) throw TypeError(`argument name is invalid`)
  let a = i(t)
  if (a && !Bb.test(a)) throw TypeError(`argument val is invalid`)
  let o = e + `=` + a
  if (r.maxAge != null) {
    let e = r.maxAge - 0
    if (isNaN(e) || !isFinite(e)) throw TypeError(`option maxAge is invalid`)
    o += `; Max-Age=` + Math.floor(e)
  }
  if (r.domain) {
    if (!Bb.test(r.domain)) throw TypeError(`option domain is invalid`)
    o += `; Domain=` + r.domain
  }
  if (r.path) {
    if (!Bb.test(r.path)) throw TypeError(`option path is invalid`)
    o += `; Path=` + r.path
  }
  if (r.expires) {
    if (
      !(function (e) {
        return Object.prototype.toString.call(e) === `[object Date]` || e instanceof Date
      })(r.expires) ||
      isNaN(r.expires.valueOf())
    )
      throw TypeError(`option expires is invalid`)
    o += `; Expires=` + r.expires.toUTCString()
  }
  if ((r.httpOnly && (o += `; HttpOnly`), r.secure && (o += `; Secure`), r.priority))
    switch (typeof r.priority == `string` ? r.priority.toLowerCase() : r.priority) {
      case `low`:
        o += `; Priority=Low`
        break
      case `medium`:
        o += `; Priority=Medium`
        break
      case `high`:
        o += `; Priority=High`
        break
      default:
        throw TypeError(`option priority is invalid`)
    }
  if (r.sameSite)
    switch (typeof r.sameSite == `string` ? r.sameSite.toLowerCase() : r.sameSite) {
      case !0:
        o += `; SameSite=Strict`
        break
      case `lax`:
        o += `; SameSite=Lax`
        break
      case `strict`:
        o += `; SameSite=Strict`
        break
      case `none`:
        o += `; SameSite=None`
        break
      default:
        throw TypeError(`option sameSite is invalid`)
    }
  return o
}
function Ub(e) {
  return e.indexOf(`%`) === -1 ? e : decodeURIComponent(e)
}
function Wb(e) {
  return encodeURIComponent(e)
}
var Gb =
    (typeof navigator < `u` && navigator.product === `ReactNative`) ||
    (typeof global < `u` && global.HermesInternal),
  Kb
function qb(e) {
  if (e)
    try {
      let t = decodeURIComponent(
        Kb(e.split(`.`)[1])
          .split(``)
          .map(function (e) {
            return `%` + (`00` + e.charCodeAt(0).toString(16)).slice(-2)
          })
          .join(``),
      )
      return JSON.parse(t) || {}
    } catch {}
  return {}
}
function Jb(e, t = 0) {
  let n = qb(e)
  return !(Object.keys(n).length > 0 && (!n.exp || n.exp - t > Date.now() / 1e3))
}
Kb =
  typeof atob != `function` || Gb
    ? (e) => {
        let t = String(e).replace(/=+$/, ``)
        if (t.length % 4 == 1)
          throw Error(`'atob' failed: The string to be decoded is not correctly encoded.`)
        for (
          var n, r, i = 0, a = 0, o = ``;
          (r = t.charAt(a++));
          ~r &&
          ((n = i % 4 ? 64 * n + r : r), i++ % 4) &&
          (o += String.fromCharCode(255 & (n >> ((-2 * i) & 6))))
        )
          r = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`.indexOf(r)
        return o
      }
    : atob
var Yb = `pb_auth`,
  Xb = class {
    constructor() {
      ;((this.baseToken = ``), (this.baseModel = null), (this._onChangeCallbacks = []))
    }
    get token() {
      return this.baseToken
    }
    get record() {
      return this.baseModel
    }
    get model() {
      return this.baseModel
    }
    get isValid() {
      return !Jb(this.token)
    }
    get isSuperuser() {
      let e = qb(this.token)
      return (
        e.type == `auth` &&
        (this.record?.collectionName == `_superusers` ||
          (!this.record?.collectionName && e.collectionId == `pbc_3142635823`))
      )
    }
    get isAdmin() {
      return (
        console.warn(
          `Please replace pb.authStore.isAdmin with pb.authStore.isSuperuser OR simply check the value of pb.authStore.record?.collectionName`,
        ),
        this.isSuperuser
      )
    }
    get isAuthRecord() {
      return (
        console.warn(
          `Please replace pb.authStore.isAuthRecord with !pb.authStore.isSuperuser OR simply check the value of pb.authStore.record?.collectionName`,
        ),
        qb(this.token).type == `auth` && !this.isSuperuser
      )
    }
    save(e, t) {
      ;((this.baseToken = e || ``), (this.baseModel = t || null), this.triggerChange())
    }
    clear() {
      ;((this.baseToken = ``), (this.baseModel = null), this.triggerChange())
    }
    loadFromCookie(e, t = Yb) {
      let n = Vb(e || ``)[t] || ``,
        r = {}
      try {
        ;((r = JSON.parse(n)), (typeof r != `object` || Array.isArray(r)) && (r = {}))
      } catch {}
      this.save(r.token || ``, r.record || r.model || null)
    }
    exportToCookie(e, t = Yb) {
      let n = { secure: !0, sameSite: !0, httpOnly: !0, path: `/` },
        r = qb(this.token)
      ;((n.expires = r?.exp ? new Date(1e3 * r.exp) : new Date(`1970-01-01`)),
        (e = Object.assign({}, n, e)))
      let i = {
          token: this.token,
          record: this.record ? JSON.parse(JSON.stringify(this.record)) : null,
        },
        a = Hb(t, JSON.stringify(i), e),
        o = typeof Blob < `u` ? new Blob([a]).size : a.length
      if (i.record && o > 4096) {
        i.record = { id: i.record?.id, email: i.record?.email }
        let n = [`collectionId`, `collectionName`, `verified`]
        for (let e in this.record) n.includes(e) && (i.record[e] = this.record[e])
        a = Hb(t, JSON.stringify(i), e)
      }
      return a
    }
    onChange(e, t = !1) {
      return (
        this._onChangeCallbacks.push(e),
        t && e(this.token, this.record),
        () => {
          for (let t = this._onChangeCallbacks.length - 1; t >= 0; t--)
            if (this._onChangeCallbacks[t] == e)
              return (delete this._onChangeCallbacks[t], void this._onChangeCallbacks.splice(t, 1))
        }
      )
    }
    triggerChange() {
      for (let e of this._onChangeCallbacks) e && e(this.token, this.record)
    }
  },
  Zb = class extends Xb {
    constructor(e = `pocketbase_auth`) {
      ;(super(), (this.storageFallback = {}), (this.storageKey = e), this._bindStorageEvent())
    }
    get token() {
      return (this._storageGet(this.storageKey) || {}).token || ``
    }
    get record() {
      let e = this._storageGet(this.storageKey) || {}
      return e.record || e.model || null
    }
    get model() {
      return this.record
    }
    save(e, t) {
      ;(this._storageSet(this.storageKey, { token: e, record: t }), super.save(e, t))
    }
    clear() {
      ;(this._storageRemove(this.storageKey), super.clear())
    }
    _storageGet(e) {
      if (typeof window < `u` && window?.localStorage) {
        let t = window.localStorage.getItem(e) || ``
        try {
          return JSON.parse(t)
        } catch {
          return t
        }
      }
      return this.storageFallback[e]
    }
    _storageSet(e, t) {
      if (typeof window < `u` && window?.localStorage) {
        let n = t
        ;(typeof t != `string` && (n = JSON.stringify(t)), window.localStorage.setItem(e, n))
      } else this.storageFallback[e] = t
    }
    _storageRemove(e) {
      ;(typeof window < `u` && window?.localStorage && window.localStorage?.removeItem(e),
        delete this.storageFallback[e])
    }
    _bindStorageEvent() {
      typeof window < `u` &&
        window?.localStorage &&
        window.addEventListener &&
        window.addEventListener(`storage`, (e) => {
          if (e.key != this.storageKey) return
          let t = this._storageGet(this.storageKey) || {}
          super.save(t.token || ``, t.record || t.model || null)
        })
    }
  },
  Qb = class {
    constructor(e) {
      this.client = e
    }
  },
  $b = class extends Qb {
    async getAll(e) {
      return ((e = Object.assign({ method: `GET` }, e)), this.client.send(`/api/settings`, e))
    }
    async update(e, t) {
      return (
        (t = Object.assign({ method: `PATCH`, body: e }, t)), this.client.send(`/api/settings`, t)
      )
    }
    async testS3(e = `storage`, t) {
      return (
        (t = Object.assign({ method: `POST`, body: { filesystem: e } }, t)),
        this.client.send(`/api/settings/test/s3`, t).then(() => !0)
      )
    }
    async testEmail(e, t, n, r) {
      return (
        (r = Object.assign({ method: `POST`, body: { email: t, template: n, collection: e } }, r)),
        this.client.send(`/api/settings/test/email`, r).then(() => !0)
      )
    }
    async generateAppleClientSecret(e, t, n, r, i, a) {
      return (
        (a = Object.assign(
          {
            method: `POST`,
            body: { clientId: e, teamId: t, keyId: n, privateKey: r, duration: i },
          },
          a,
        )),
        this.client.send(`/api/settings/apple/generate-client-secret`, a)
      )
    }
  },
  ex = [
    `requestKey`,
    `$cancelKey`,
    `$autoCancel`,
    `fetch`,
    `headers`,
    `body`,
    `query`,
    `params`,
    `cache`,
    `credentials`,
    `headers`,
    `integrity`,
    `keepalive`,
    `method`,
    `mode`,
    `redirect`,
    `referrer`,
    `referrerPolicy`,
    `signal`,
    `window`,
  ]
function tx(e) {
  if (e) {
    e.query = e.query || {}
    for (let t in e) ex.includes(t) || ((e.query[t] = e[t]), delete e[t])
  }
}
function nx(e) {
  let t = []
  for (let n in e) {
    let r = encodeURIComponent(n),
      i = Array.isArray(e[n]) ? e[n] : [e[n]]
    for (let e of i) ((e = rx(e)), e !== null && t.push(r + `=` + e))
  }
  return t.join(`&`)
}
function rx(e) {
  return e == null
    ? null
    : e instanceof Date
      ? encodeURIComponent(e.toISOString().replace(`T`, ` `))
      : encodeURIComponent(typeof e == `object` ? JSON.stringify(e) : e)
}
var ix = class extends Qb {
    constructor() {
      ;(super(...arguments),
        (this.clientId = ``),
        (this.eventSource = null),
        (this.subscriptions = {}),
        (this.lastSentSubscriptions = []),
        (this.maxConnectTimeout = 15e3),
        (this.reconnectAttempts = 0),
        (this.maxReconnectAttempts = 1 / 0),
        (this.predefinedReconnectIntervals = [200, 300, 500, 1e3, 1200, 1500, 2e3]),
        (this.pendingConnects = []))
    }
    get isConnected() {
      return !!this.eventSource && !!this.clientId && !this.pendingConnects.length
    }
    async subscribe(e, t, n) {
      if (!e) throw Error(`topic must be set.`)
      let r = e
      if (n) {
        tx((n = Object.assign({}, n)))
        let e =
          `options=` + encodeURIComponent(JSON.stringify({ query: n.query, headers: n.headers }))
        r += (r.includes(`?`) ? `&` : `?`) + e
      }
      let i = function (e) {
        let n = e,
          r
        try {
          r = JSON.parse(n?.data)
        } catch {}
        t(r || {})
      }
      return (
        this.subscriptions[r] || (this.subscriptions[r] = []),
        this.subscriptions[r].push(i),
        this.isConnected
          ? this.subscriptions[r].length === 1
            ? await this.submitSubscriptions()
            : this.eventSource?.addEventListener(r, i)
          : await this.connect(),
        async () => this.unsubscribeByTopicAndListener(e, i)
      )
    }
    async unsubscribe(e) {
      let t = !1
      if (e) {
        let n = this.getSubscriptionsByTopic(e)
        for (let e in n)
          if (this.hasSubscriptionListeners(e)) {
            for (let t of this.subscriptions[e]) this.eventSource?.removeEventListener(e, t)
            ;(delete this.subscriptions[e], (t ||= !0))
          }
      } else this.subscriptions = {}
      this.hasSubscriptionListeners() ? t && (await this.submitSubscriptions()) : this.disconnect()
    }
    async unsubscribeByPrefix(e) {
      let t = !1
      for (let n in this.subscriptions)
        if ((n + `?`).startsWith(e)) {
          t = !0
          for (let e of this.subscriptions[n]) this.eventSource?.removeEventListener(n, e)
          delete this.subscriptions[n]
        }
      t && (this.hasSubscriptionListeners() ? await this.submitSubscriptions() : this.disconnect())
    }
    async unsubscribeByTopicAndListener(e, t) {
      let n = !1,
        r = this.getSubscriptionsByTopic(e)
      for (let e in r) {
        if (!Array.isArray(this.subscriptions[e]) || !this.subscriptions[e].length) continue
        let r = !1
        for (let n = this.subscriptions[e].length - 1; n >= 0; n--)
          this.subscriptions[e][n] === t &&
            ((r = !0),
            delete this.subscriptions[e][n],
            this.subscriptions[e].splice(n, 1),
            this.eventSource?.removeEventListener(e, t))
        r &&
          (this.subscriptions[e].length || delete this.subscriptions[e],
          n || this.hasSubscriptionListeners(e) || (n = !0))
      }
      this.hasSubscriptionListeners() ? n && (await this.submitSubscriptions()) : this.disconnect()
    }
    hasSubscriptionListeners(e) {
      if (((this.subscriptions = this.subscriptions || {}), e))
        return !!this.subscriptions[e]?.length
      for (let e in this.subscriptions) if (this.subscriptions[e]?.length) return !0
      return !1
    }
    async submitSubscriptions() {
      if (this.clientId)
        return (
          this.addAllSubscriptionListeners(),
          (this.lastSentSubscriptions = this.getNonEmptySubscriptionKeys()),
          this.client
            .send(`/api/realtime`, {
              method: `POST`,
              body: { clientId: this.clientId, subscriptions: this.lastSentSubscriptions },
              requestKey: this.getSubscriptionsCancelKey(),
            })
            .catch((e) => {
              if (!e?.isAbort) throw e
            })
        )
    }
    getSubscriptionsCancelKey() {
      return `realtime_` + this.clientId
    }
    getSubscriptionsByTopic(e) {
      let t = {}
      e = e.includes(`?`) ? e : e + `?`
      for (let n in this.subscriptions) (n + `?`).startsWith(e) && (t[n] = this.subscriptions[n])
      return t
    }
    getNonEmptySubscriptionKeys() {
      let e = []
      for (let t in this.subscriptions) this.subscriptions[t].length && e.push(t)
      return e
    }
    addAllSubscriptionListeners() {
      if (this.eventSource) {
        this.removeAllSubscriptionListeners()
        for (let e in this.subscriptions)
          for (let t of this.subscriptions[e]) this.eventSource.addEventListener(e, t)
      }
    }
    removeAllSubscriptionListeners() {
      if (this.eventSource)
        for (let e in this.subscriptions)
          for (let t of this.subscriptions[e]) this.eventSource.removeEventListener(e, t)
    }
    async connect() {
      if (!(this.reconnectAttempts > 0))
        return new Promise((e, t) => {
          ;(this.pendingConnects.push({ resolve: e, reject: t }),
            this.pendingConnects.length > 1 || this.initConnect())
        })
    }
    initConnect() {
      ;(this.disconnect(!0),
        clearTimeout(this.connectTimeoutId),
        (this.connectTimeoutId = setTimeout(() => {
          this.connectErrorHandler(Error(`EventSource connect took too long.`))
        }, this.maxConnectTimeout)),
        (this.eventSource = new EventSource(this.client.buildURL(`/api/realtime`))),
        (this.eventSource.onerror = (e) => {
          this.connectErrorHandler(Error(`Failed to establish realtime connection.`))
        }),
        this.eventSource.addEventListener(`PB_CONNECT`, (e) => {
          let t = e
          ;((this.clientId = t?.lastEventId),
            this.submitSubscriptions()
              .then(async () => {
                let e = 3
                for (; this.hasUnsentSubscriptions() && e > 0; )
                  (e--, await this.submitSubscriptions())
              })
              .then(() => {
                for (let e of this.pendingConnects) e.resolve()
                ;((this.pendingConnects = []),
                  (this.reconnectAttempts = 0),
                  clearTimeout(this.reconnectTimeoutId),
                  clearTimeout(this.connectTimeoutId))
                let t = this.getSubscriptionsByTopic(`PB_CONNECT`)
                for (let n in t) for (let r of t[n]) r(e)
              })
              .catch((e) => {
                ;((this.clientId = ``), this.connectErrorHandler(e))
              }))
        }))
    }
    hasUnsentSubscriptions() {
      let e = this.getNonEmptySubscriptionKeys()
      if (e.length != this.lastSentSubscriptions.length) return !0
      for (let t of e) if (!this.lastSentSubscriptions.includes(t)) return !0
      return !1
    }
    connectErrorHandler(e) {
      if (
        (clearTimeout(this.connectTimeoutId),
        clearTimeout(this.reconnectTimeoutId),
        (!this.clientId && !this.reconnectAttempts) ||
          this.reconnectAttempts > this.maxReconnectAttempts)
      ) {
        for (let t of this.pendingConnects) t.reject(new zb(e))
        ;((this.pendingConnects = []), this.disconnect())
        return
      }
      this.disconnect(!0)
      let t =
        this.predefinedReconnectIntervals[this.reconnectAttempts] ||
        this.predefinedReconnectIntervals[this.predefinedReconnectIntervals.length - 1]
      ;(this.reconnectAttempts++,
        (this.reconnectTimeoutId = setTimeout(() => {
          this.initConnect()
        }, t)))
    }
    disconnect(e = !1) {
      if (
        (this.clientId && this.onDisconnect && this.onDisconnect(Object.keys(this.subscriptions)),
        clearTimeout(this.connectTimeoutId),
        clearTimeout(this.reconnectTimeoutId),
        this.removeAllSubscriptionListeners(),
        this.client.cancelRequest(this.getSubscriptionsCancelKey()),
        this.eventSource?.close(),
        (this.eventSource = null),
        (this.clientId = ``),
        !e)
      ) {
        this.reconnectAttempts = 0
        for (let e of this.pendingConnects) e.resolve()
        this.pendingConnects = []
      }
    }
  },
  ax = class extends Qb {
    decode(e) {
      return e
    }
    async getFullList(e, t) {
      if (typeof e == `number`) return this._getFullList(e, t)
      let n = 1e3
      return (
        (t = Object.assign({}, e, t)).batch && ((n = t.batch), delete t.batch),
        this._getFullList(n, t)
      )
    }
    async getList(e = 1, t = 30, n) {
      return (
        ((n = Object.assign({ method: `GET` }, n)).query = Object.assign(
          { page: e, perPage: t },
          n.query,
        )),
        this.client
          .send(this.baseCrudPath, n)
          .then((e) => ((e.items = e.items?.map((e) => this.decode(e)) || []), e))
      )
    }
    async getFirstListItem(e, t) {
      return (
        ((t = Object.assign(
          { requestKey: `one_by_filter_` + this.baseCrudPath + `_` + e },
          t,
        )).query = Object.assign({ filter: e, skipTotal: 1 }, t.query)),
        this.getList(1, 1, t).then((e) => {
          if (!e?.items?.length)
            throw new zb({
              status: 404,
              response: { code: 404, message: `The requested resource wasn't found.`, data: {} },
            })
          return e.items[0]
        })
      )
    }
    async getOne(e, t) {
      if (!e)
        throw new zb({
          url: this.client.buildURL(this.baseCrudPath + `/`),
          status: 404,
          response: { code: 404, message: `Missing required record id.`, data: {} },
        })
      return (
        (t = Object.assign({ method: `GET` }, t)),
        this.client
          .send(this.baseCrudPath + `/` + encodeURIComponent(e), t)
          .then((e) => this.decode(e))
      )
    }
    async create(e, t) {
      return (
        (t = Object.assign({ method: `POST`, body: e }, t)),
        this.client.send(this.baseCrudPath, t).then((e) => this.decode(e))
      )
    }
    async update(e, t, n) {
      return (
        (n = Object.assign({ method: `PATCH`, body: t }, n)),
        this.client
          .send(this.baseCrudPath + `/` + encodeURIComponent(e), n)
          .then((e) => this.decode(e))
      )
    }
    async delete(e, t) {
      return (
        (t = Object.assign({ method: `DELETE` }, t)),
        this.client.send(this.baseCrudPath + `/` + encodeURIComponent(e), t).then(() => !0)
      )
    }
    _getFullList(e = 1e3, t) {
      ;(t ||= {}).query = Object.assign({ skipTotal: 1 }, t.query)
      let n = [],
        r = async (i) =>
          this.getList(i, e || 1e3, t).then((e) => {
            let t = e.items
            return ((n = n.concat(t)), t.length == e.perPage ? r(i + 1) : n)
          })
      return r(1)
    }
  }
function ox(e, t, n, r) {
  let i = r !== void 0
  return i || n !== void 0
    ? i
      ? (console.warn(e),
        (t.body = Object.assign({}, t.body, n)),
        (t.query = Object.assign({}, t.query, r)),
        t)
      : Object.assign(t, n)
    : t
}
function sx(e) {
  e._resetAutoRefresh?.()
}
var cx = class extends ax {
  constructor(e, t) {
    ;(super(e), (this.collectionIdOrName = t))
  }
  get baseCrudPath() {
    return this.baseCollectionPath + `/records`
  }
  get baseCollectionPath() {
    return `/api/collections/` + encodeURIComponent(this.collectionIdOrName)
  }
  get isSuperusers() {
    return this.collectionIdOrName == `_superusers` || this.collectionIdOrName == `_pbc_2773867675`
  }
  async subscribe(e, t, n) {
    if (!e) throw Error(`Missing topic.`)
    if (!t) throw Error(`Missing subscription callback.`)
    return this.client.realtime.subscribe(this.collectionIdOrName + `/` + e, t, n)
  }
  async unsubscribe(e) {
    return e
      ? this.client.realtime.unsubscribe(this.collectionIdOrName + `/` + e)
      : this.client.realtime.unsubscribeByPrefix(this.collectionIdOrName)
  }
  async getFullList(e, t) {
    if (typeof e == `number`) return super.getFullList(e, t)
    let n = Object.assign({}, e, t)
    return super.getFullList(n)
  }
  async getList(e = 1, t = 30, n) {
    return super.getList(e, t, n)
  }
  async getFirstListItem(e, t) {
    return super.getFirstListItem(e, t)
  }
  async getOne(e, t) {
    return super.getOne(e, t)
  }
  async create(e, t) {
    return super.create(e, t)
  }
  async update(e, t, n) {
    return super.update(e, t, n).then((e) => {
      if (
        this.client.authStore.record?.id === e?.id &&
        (this.client.authStore.record?.collectionId === this.collectionIdOrName ||
          this.client.authStore.record?.collectionName === this.collectionIdOrName)
      ) {
        let t = Object.assign({}, this.client.authStore.record.expand),
          n = Object.assign({}, this.client.authStore.record, e)
        ;(t && (n.expand = Object.assign(t, e.expand)),
          this.client.authStore.save(this.client.authStore.token, n))
      }
      return e
    })
  }
  async delete(e, t) {
    return super
      .delete(e, t)
      .then(
        (t) => (
          !t ||
            this.client.authStore.record?.id !== e ||
            (this.client.authStore.record?.collectionId !== this.collectionIdOrName &&
              this.client.authStore.record?.collectionName !== this.collectionIdOrName) ||
            this.client.authStore.clear(),
          t
        ),
      )
  }
  authResponse(e) {
    let t = this.decode(e?.record || {})
    return (
      this.client.authStore.save(e?.token, t),
      Object.assign({}, e, { token: e?.token || ``, record: t })
    )
  }
  async listAuthMethods(e) {
    return (
      (e = Object.assign({ method: `GET`, fields: `mfa,otp,password,oauth2` }, e)),
      this.client.send(this.baseCollectionPath + `/auth-methods`, e)
    )
  }
  async authWithPassword(e, t, n) {
    let r
    ;((n = Object.assign({ method: `POST`, body: { identity: e, password: t } }, n)),
      this.isSuperusers &&
        ((r = n.autoRefreshThreshold),
        delete n.autoRefreshThreshold,
        n.autoRefresh || sx(this.client)))
    let i = await this.client.send(this.baseCollectionPath + `/auth-with-password`, n)
    return (
      (i = this.authResponse(i)),
      r &&
        this.isSuperusers &&
        (function (e, t, n, r) {
          sx(e)
          let i = e.beforeSend,
            a = e.authStore.record,
            o = e.authStore.onChange((t, n) => {
              ;(!t ||
                n?.id != a?.id ||
                ((n?.collectionId || a?.collectionId) && n?.collectionId != a?.collectionId)) &&
                sx(e)
            })
          ;((e._resetAutoRefresh = function () {
            ;(o(), (e.beforeSend = i), delete e._resetAutoRefresh)
          }),
            (e.beforeSend = async (a, o) => {
              let s = e.authStore.token
              if (o.query?.autoRefresh) return i ? i(a, o) : { url: a, sendOptions: o }
              let c = e.authStore.isValid
              if (c && Jb(e.authStore.token, t))
                try {
                  await n()
                } catch {
                  c = !1
                }
              c || (await r())
              let l = o.headers || {}
              for (let t in l)
                if (t.toLowerCase() == `authorization` && s == l[t] && e.authStore.token) {
                  l[t] = e.authStore.token
                  break
                }
              return ((o.headers = l), i ? i(a, o) : { url: a, sendOptions: o })
            }))
        })(
          this.client,
          r,
          () => this.authRefresh({ autoRefresh: !0 }),
          () => this.authWithPassword(e, t, Object.assign({ autoRefresh: !0 }, n)),
        ),
      i
    )
  }
  async authWithOAuth2Code(e, t, n, r, i, a, o) {
    let s = {
      method: `POST`,
      body: { provider: e, code: t, codeVerifier: n, redirectURL: r, createData: i },
    }
    return (
      (s = ox(
        `This form of authWithOAuth2Code(provider, code, codeVerifier, redirectURL, createData?, body?, query?) is deprecated. Consider replacing it with authWithOAuth2Code(provider, code, codeVerifier, redirectURL, createData?, options?).`,
        s,
        a,
        o,
      )),
      this.client
        .send(this.baseCollectionPath + `/auth-with-oauth2`, s)
        .then((e) => this.authResponse(e))
    )
  }
  authWithOAuth2(...e) {
    if (e.length > 1 || typeof e?.[0] == `string`)
      return (
        console.warn(
          `PocketBase: This form of authWithOAuth2() is deprecated and may get removed in the future. Please replace with authWithOAuth2Code() OR use the authWithOAuth2() realtime form as shown in https://pocketbase.io/docs/authentication/#oauth2-integration.`,
        ),
        this.authWithOAuth2Code(
          e?.[0] || ``,
          e?.[1] || ``,
          e?.[2] || ``,
          e?.[3] || ``,
          e?.[4] || {},
          e?.[5] || {},
          e?.[6] || {},
        )
      )
    let t = e?.[0] || {},
      n = null
    t.urlCallback || (n = lx(void 0))
    let r = new ix(this.client)
    function i() {
      ;(n?.close(), r.unsubscribe())
    }
    let a = {},
      o = t.requestKey
    return (
      o && (a.requestKey = o),
      this.listAuthMethods(a)
        .then((e) => {
          let a = e.oauth2.providers.find((e) => e.name === t.provider)
          if (!a) throw new zb(Error(`Missing or invalid provider "${t.provider}".`))
          let s = this.client.buildURL(`/api/oauth2-redirect`)
          return new Promise(async (e, c) => {
            let l = o ? this.client.cancelControllers?.[o] : void 0
            ;(l &&
              (l.signal.onabort = () => {
                ;(i(), c(new zb({ isAbort: !0, message: `manually cancelled` })))
              }),
              (r.onDisconnect = (e) => {
                e.length && c && (i(), c(new zb(Error(`realtime connection interrupted`))))
              }))
            try {
              await r.subscribe(`@oauth2`, async (n) => {
                let o = r.clientId
                try {
                  if (!n.state || o !== n.state) throw Error(`State parameters don't match.`)
                  if (n.error || !n.code)
                    throw Error(`OAuth2 redirect error or missing code: ` + n.error)
                  let r = Object.assign({}, t)
                  ;(delete r.provider,
                    delete r.scopes,
                    delete r.createData,
                    delete r.urlCallback,
                    l?.signal?.onabort && (l.signal.onabort = null),
                    e(
                      await this.authWithOAuth2Code(
                        a.name,
                        n.code,
                        a.codeVerifier,
                        s,
                        t.createData,
                        r,
                      ),
                    ))
                } catch (e) {
                  c(new zb(e))
                }
                i()
              })
              let o = { state: r.clientId }
              t.scopes?.length && (o.scope = t.scopes.join(` `))
              let u = this._replaceQueryParams(a.authURL + s, o)
              await (
                t.urlCallback ||
                function (e) {
                  n ? (n.location.href = e) : (n = lx(e))
                }
              )(u)
            } catch (e) {
              ;(l?.signal?.onabort && (l.signal.onabort = null), i(), c(new zb(e)))
            }
          })
        })
        .catch((e) => {
          throw (i(), e)
        })
    )
  }
  async authRefresh(e, t) {
    let n = { method: `POST` }
    return (
      (n = ox(
        `This form of authRefresh(body?, query?) is deprecated. Consider replacing it with authRefresh(options?).`,
        n,
        e,
        t,
      )),
      this.client
        .send(this.baseCollectionPath + `/auth-refresh`, n)
        .then((e) => this.authResponse(e))
    )
  }
  async requestPasswordReset(e, t, n) {
    let r = { method: `POST`, body: { email: e } }
    return (
      (r = ox(
        `This form of requestPasswordReset(email, body?, query?) is deprecated. Consider replacing it with requestPasswordReset(email, options?).`,
        r,
        t,
        n,
      )),
      this.client.send(this.baseCollectionPath + `/request-password-reset`, r).then(() => !0)
    )
  }
  async confirmPasswordReset(e, t, n, r, i) {
    let a = { method: `POST`, body: { token: e, password: t, passwordConfirm: n } }
    return (
      (a = ox(
        `This form of confirmPasswordReset(token, password, passwordConfirm, body?, query?) is deprecated. Consider replacing it with confirmPasswordReset(token, password, passwordConfirm, options?).`,
        a,
        r,
        i,
      )),
      this.client.send(this.baseCollectionPath + `/confirm-password-reset`, a).then(() => !0)
    )
  }
  async requestVerification(e, t, n) {
    let r = { method: `POST`, body: { email: e } }
    return (
      (r = ox(
        `This form of requestVerification(email, body?, query?) is deprecated. Consider replacing it with requestVerification(email, options?).`,
        r,
        t,
        n,
      )),
      this.client.send(this.baseCollectionPath + `/request-verification`, r).then(() => !0)
    )
  }
  async confirmVerification(e, t, n) {
    let r = { method: `POST`, body: { token: e } }
    return (
      (r = ox(
        `This form of confirmVerification(token, body?, query?) is deprecated. Consider replacing it with confirmVerification(token, options?).`,
        r,
        t,
        n,
      )),
      this.client.send(this.baseCollectionPath + `/confirm-verification`, r).then(() => {
        let t = qb(e),
          n = this.client.authStore.record
        return (
          n &&
            !n.verified &&
            n.id === t.id &&
            n.collectionId === t.collectionId &&
            ((n.verified = !0), this.client.authStore.save(this.client.authStore.token, n)),
          !0
        )
      })
    )
  }
  async requestEmailChange(e, t, n) {
    let r = { method: `POST`, body: { newEmail: e } }
    return (
      (r = ox(
        `This form of requestEmailChange(newEmail, body?, query?) is deprecated. Consider replacing it with requestEmailChange(newEmail, options?).`,
        r,
        t,
        n,
      )),
      this.client.send(this.baseCollectionPath + `/request-email-change`, r).then(() => !0)
    )
  }
  async confirmEmailChange(e, t, n, r) {
    let i = { method: `POST`, body: { token: e, password: t } }
    return (
      (i = ox(
        `This form of confirmEmailChange(token, password, body?, query?) is deprecated. Consider replacing it with confirmEmailChange(token, password, options?).`,
        i,
        n,
        r,
      )),
      this.client.send(this.baseCollectionPath + `/confirm-email-change`, i).then(() => {
        let t = qb(e),
          n = this.client.authStore.record
        return (
          n && n.id === t.id && n.collectionId === t.collectionId && this.client.authStore.clear(),
          !0
        )
      })
    )
  }
  async listExternalAuths(e, t) {
    return this.client
      .collection(`_externalAuths`)
      .getFullList(
        Object.assign({}, t, { filter: this.client.filter(`recordRef = {:id}`, { id: e }) }),
      )
  }
  async unlinkExternalAuth(e, t, n) {
    let r = await this.client.collection(`_externalAuths`).getFirstListItem(
      this.client.filter(`recordRef = {:recordId} && provider = {:provider}`, {
        recordId: e,
        provider: t,
      }),
    )
    return this.client
      .collection(`_externalAuths`)
      .delete(r.id, n)
      .then(() => !0)
  }
  async requestOTP(e, t) {
    return (
      (t = Object.assign({ method: `POST`, body: { email: e } }, t)),
      this.client.send(this.baseCollectionPath + `/request-otp`, t)
    )
  }
  async authWithOTP(e, t, n) {
    return (
      (n = Object.assign({ method: `POST`, body: { otpId: e, password: t } }, n)),
      this.client
        .send(this.baseCollectionPath + `/auth-with-otp`, n)
        .then((e) => this.authResponse(e))
    )
  }
  async impersonate(e, t, n) {
    ;(((n = Object.assign({ method: `POST`, body: { duration: t } }, n)).headers = n.headers || {}),
      n.headers.Authorization || (n.headers.Authorization = this.client.authStore.token))
    let r = new Cx(this.client.baseURL, new Xb(), this.client.lang),
      i = await r.send(this.baseCollectionPath + `/impersonate/` + encodeURIComponent(e), n)
    return (r.authStore.save(i?.token, this.decode(i?.record || {})), r)
  }
  _replaceQueryParams(e, t = {}) {
    let n = e,
      r = ``
    e.indexOf(`?`) >= 0 &&
      ((n = e.substring(0, e.indexOf(`?`))), (r = e.substring(e.indexOf(`?`) + 1)))
    let i = {},
      a = r.split(`&`)
    for (let e of a) {
      if (e == ``) continue
      let t = e.split(`=`)
      i[decodeURIComponent(t[0].replace(/\+/g, ` `))] = decodeURIComponent(
        (t[1] || ``).replace(/\+/g, ` `),
      )
    }
    for (let e in t) t.hasOwnProperty(e) && (t[e] == null ? delete i[e] : (i[e] = t[e]))
    r = ``
    for (let e in i)
      i.hasOwnProperty(e) &&
        (r != `` && (r += `&`),
        (r +=
          encodeURIComponent(e.replace(/%20/g, `+`)) +
          `=` +
          encodeURIComponent(i[e].replace(/%20/g, `+`))))
    return r == `` ? n : n + `?` + r
  }
}
function lx(e) {
  if (typeof window > `u` || !window?.open)
    throw new zb(Error(`Not in a browser context - please pass a custom urlCallback function.`))
  let t = 1024,
    n = 768,
    r = window.innerWidth,
    i = window.innerHeight
  ;((t = t > r ? r : t), (n = n > i ? i : n))
  let a = r / 2 - t / 2,
    o = i / 2 - n / 2
  return window.open(
    e,
    `popup_window`,
    `width=` + t + `,height=` + n + `,top=` + o + `,left=` + a + `,resizable,menubar=no`,
  )
}
var ux = class extends ax {
    get baseCrudPath() {
      return `/api/collections`
    }
    async import(e, t = !1, n) {
      return (
        (n = Object.assign({ method: `PUT`, body: { collections: e, deleteMissing: t } }, n)),
        this.client.send(this.baseCrudPath + `/import`, n).then(() => !0)
      )
    }
    async getScaffolds(e) {
      return (
        (e = Object.assign({ method: `GET` }, e)),
        this.client.send(this.baseCrudPath + `/meta/scaffolds`, e)
      )
    }
    async truncate(e, t) {
      return (
        (t = Object.assign({ method: `DELETE` }, t)),
        this.client
          .send(this.baseCrudPath + `/` + encodeURIComponent(e) + `/truncate`, t)
          .then(() => !0)
      )
    }
  },
  dx = class extends Qb {
    async getList(e = 1, t = 30, n) {
      return (
        ((n = Object.assign({ method: `GET` }, n)).query = Object.assign(
          { page: e, perPage: t },
          n.query,
        )),
        this.client.send(`/api/logs`, n)
      )
    }
    async getOne(e, t) {
      if (!e)
        throw new zb({
          url: this.client.buildURL(`/api/logs/`),
          status: 404,
          response: { code: 404, message: `Missing required log id.`, data: {} },
        })
      return (
        (t = Object.assign({ method: `GET` }, t)),
        this.client.send(`/api/logs/` + encodeURIComponent(e), t)
      )
    }
    async getStats(e) {
      return ((e = Object.assign({ method: `GET` }, e)), this.client.send(`/api/logs/stats`, e))
    }
  },
  fx = class extends Qb {
    async check(e) {
      return ((e = Object.assign({ method: `GET` }, e)), this.client.send(`/api/health`, e))
    }
  },
  px = class extends Qb {
    getUrl(e, t, n = {}) {
      return (
        console.warn(`Please replace pb.files.getUrl() with pb.files.getURL()`),
        this.getURL(e, t, n)
      )
    }
    getURL(e, t, n = {}) {
      if (!t || !e?.id || (!e?.collectionId && !e?.collectionName)) return ``
      let r = []
      ;(r.push(`api`),
        r.push(`files`),
        r.push(encodeURIComponent(e.collectionId || e.collectionName)),
        r.push(encodeURIComponent(e.id)),
        r.push(encodeURIComponent(t)))
      let i = this.client.buildURL(r.join(`/`))
      !1 === n.download && delete n.download
      let a = nx(n)
      return (a && (i += (i.includes(`?`) ? `&` : `?`) + a), i)
    }
    async getToken(e) {
      return (
        (e = Object.assign({ method: `POST` }, e)),
        this.client.send(`/api/files/token`, e).then((e) => e?.token || ``)
      )
    }
  },
  mx = class extends Qb {
    async getFullList(e) {
      return ((e = Object.assign({ method: `GET` }, e)), this.client.send(`/api/backups`, e))
    }
    async create(e, t) {
      return (
        (t = Object.assign({ method: `POST`, body: { name: e } }, t)),
        this.client.send(`/api/backups`, t).then(() => !0)
      )
    }
    async upload(e, t) {
      return (
        (t = Object.assign({ method: `POST`, body: e }, t)),
        this.client.send(`/api/backups/upload`, t).then(() => !0)
      )
    }
    async delete(e, t) {
      return (
        (t = Object.assign({ method: `DELETE` }, t)),
        this.client.send(`/api/backups/${encodeURIComponent(e)}`, t).then(() => !0)
      )
    }
    async restore(e, t) {
      return (
        (t = Object.assign({ method: `POST` }, t)),
        this.client.send(`/api/backups/${encodeURIComponent(e)}/restore`, t).then(() => !0)
      )
    }
    getDownloadUrl(e, t) {
      return (
        console.warn(`Please replace pb.backups.getDownloadUrl() with pb.backups.getDownloadURL()`),
        this.getDownloadURL(e, t)
      )
    }
    getDownloadURL(e, t) {
      return this.client.buildURL(
        `/api/backups/${encodeURIComponent(t)}?token=${encodeURIComponent(e)}`,
      )
    }
  },
  hx = class extends Qb {
    async getFullList(e) {
      return ((e = Object.assign({ method: `GET` }, e)), this.client.send(`/api/crons`, e))
    }
    async run(e, t) {
      return (
        (t = Object.assign({ method: `POST` }, t)),
        this.client.send(`/api/crons/${encodeURIComponent(e)}`, t).then(() => !0)
      )
    }
  }
function gx(e) {
  return (
    (typeof Blob < `u` && e instanceof Blob) ||
    (typeof File < `u` && e instanceof File) ||
    (typeof e == `object` &&
      !!e &&
      e.uri &&
      ((typeof navigator < `u` && navigator.product === `ReactNative`) ||
        (typeof global < `u` && global.HermesInternal)))
  )
}
function _x(e) {
  return (
    e && (e.constructor?.name === `FormData` || (typeof FormData < `u` && e instanceof FormData))
  )
}
function vx(e) {
  for (let t in e) {
    let n = Array.isArray(e[t]) ? e[t] : [e[t]]
    for (let e of n) if (gx(e)) return !0
  }
  return !1
}
var yx = /^[\-\.\d]+$/
function bx(e) {
  if (typeof e != `string`) return e
  if (e == `true`) return !0
  if (e == `false`) return !1
  if ((e[0] === `-` || (e[0] >= `0` && e[0] <= `9`)) && yx.test(e)) {
    let t = +e
    if (`` + t === e) return t
  }
  return e
}
var xx = class extends Qb {
    constructor() {
      ;(super(...arguments), (this.requests = []), (this.subs = {}))
    }
    collection(e) {
      return (this.subs[e] || (this.subs[e] = new Sx(this.requests, e)), this.subs[e])
    }
    async send(e) {
      let t = new FormData(),
        n = []
      for (let e = 0; e < this.requests.length; e++) {
        let r = this.requests[e]
        if ((n.push({ method: r.method, url: r.url, headers: r.headers, body: r.json }), r.files))
          for (let n in r.files) {
            let i = r.files[n] || []
            for (let r of i) t.append(`requests.` + e + `.` + n, r)
          }
      }
      return (
        t.append(`@jsonPayload`, JSON.stringify({ requests: n })),
        (e = Object.assign({ method: `POST`, body: t }, e)),
        this.client.send(`/api/batch`, e)
      )
    }
  },
  Sx = class {
    constructor(e, t) {
      ;((this.requests = []), (this.requests = e), (this.collectionIdOrName = t))
    }
    upsert(e, t) {
      t = Object.assign({ body: e || {} }, t)
      let n = {
        method: `PUT`,
        url: `/api/collections/` + encodeURIComponent(this.collectionIdOrName) + `/records`,
      }
      ;(this.prepareRequest(n, t), this.requests.push(n))
    }
    create(e, t) {
      t = Object.assign({ body: e || {} }, t)
      let n = {
        method: `POST`,
        url: `/api/collections/` + encodeURIComponent(this.collectionIdOrName) + `/records`,
      }
      ;(this.prepareRequest(n, t), this.requests.push(n))
    }
    update(e, t, n) {
      n = Object.assign({ body: t || {} }, n)
      let r = {
        method: `PATCH`,
        url:
          `/api/collections/` +
          encodeURIComponent(this.collectionIdOrName) +
          `/records/` +
          encodeURIComponent(e),
      }
      ;(this.prepareRequest(r, n), this.requests.push(r))
    }
    delete(e, t) {
      t = Object.assign({}, t)
      let n = {
        method: `DELETE`,
        url:
          `/api/collections/` +
          encodeURIComponent(this.collectionIdOrName) +
          `/records/` +
          encodeURIComponent(e),
      }
      ;(this.prepareRequest(n, t), this.requests.push(n))
    }
    prepareRequest(e, t) {
      if ((tx(t), (e.headers = t.headers), (e.json = {}), (e.files = {}), t.query !== void 0)) {
        let n = nx(t.query)
        n && (e.url += (e.url.includes(`?`) ? `&` : `?`) + n)
      }
      let n = t.body
      _x(n) &&
        (n = (function (e) {
          let t = {}
          return (
            e.forEach((e, n) => {
              if (n === `@jsonPayload` && typeof e == `string`)
                try {
                  let n = JSON.parse(e)
                  Object.assign(t, n)
                } catch (e) {
                  console.warn(`@jsonPayload error:`, e)
                }
              else
                t[n] === void 0
                  ? (t[n] = bx(e))
                  : (Array.isArray(t[n]) || (t[n] = [t[n]]), t[n].push(bx(e)))
            }),
            t
          )
        })(n))
      for (let t in n) {
        let r = n[t]
        if (gx(r)) ((e.files[t] = e.files[t] || []), e.files[t].push(r))
        else if (Array.isArray(r)) {
          let n = [],
            i = []
          for (let e of r) gx(e) ? n.push(e) : i.push(e)
          if (n.length > 0 && n.length == r.length) {
            e.files[t] = e.files[t] || []
            for (let r of n) e.files[t].push(r)
          } else if (((e.json[t] = i), n.length > 0)) {
            let r = t
            ;(t.startsWith(`+`) || t.endsWith(`+`) || (r += `+`), (e.files[r] = e.files[r] || []))
            for (let t of n) e.files[r].push(t)
          }
        } else e.json[t] = r
      }
    }
  },
  Cx = class {
    get baseUrl() {
      return this.baseURL
    }
    set baseUrl(e) {
      this.baseURL = e
    }
    constructor(e = `/`, t, n = `en-US`) {
      ;((this.cancelControllers = {}),
        (this.recordServices = {}),
        (this.enableAutoCancellation = !0),
        (this.baseURL = e),
        (this.lang = n),
        t
          ? (this.authStore = t)
          : typeof window < `u` && window.Deno
            ? (this.authStore = new Xb())
            : (this.authStore = new Zb()),
        (this.collections = new ux(this)),
        (this.files = new px(this)),
        (this.logs = new dx(this)),
        (this.settings = new $b(this)),
        (this.realtime = new ix(this)),
        (this.health = new fx(this)),
        (this.backups = new mx(this)),
        (this.crons = new hx(this)))
    }
    get admins() {
      return this.collection(`_superusers`)
    }
    createBatch() {
      return new xx(this)
    }
    collection(e) {
      return (
        this.recordServices[e] || (this.recordServices[e] = new cx(this, e)), this.recordServices[e]
      )
    }
    autoCancellation(e) {
      return ((this.enableAutoCancellation = !!e), this)
    }
    cancelRequest(e) {
      return (
        this.cancelControllers[e] &&
          (this.cancelControllers[e].abort(), delete this.cancelControllers[e]),
        this
      )
    }
    cancelAllRequests() {
      for (let e in this.cancelControllers) this.cancelControllers[e].abort()
      return ((this.cancelControllers = {}), this)
    }
    filter(e, t) {
      if (!t) return e
      for (let n in t) {
        let r = t[n]
        switch (typeof r) {
          case `boolean`:
          case `number`:
            r = `` + r
            break
          case `string`:
            r = `'` + r.replace(/'/g, `\\'`) + `'`
            break
          default:
            r =
              r === null
                ? `null`
                : r instanceof Date
                  ? `'` + r.toISOString().replace(`T`, ` `) + `'`
                  : `'` + JSON.stringify(r).replace(/'/g, `\\'`) + `'`
        }
        e = e.replaceAll(`{:` + n + `}`, r)
      }
      return e
    }
    getFileUrl(e, t, n = {}) {
      return (
        console.warn(`Please replace pb.getFileUrl() with pb.files.getURL()`),
        this.files.getURL(e, t, n)
      )
    }
    buildUrl(e) {
      return (console.warn(`Please replace pb.buildUrl() with pb.buildURL()`), this.buildURL(e))
    }
    buildURL(e) {
      let t = this.baseURL
      return (
        typeof window > `u` ||
          !window.location ||
          t.startsWith(`https://`) ||
          t.startsWith(`http://`) ||
          ((t = window.location.origin?.endsWith(`/`)
            ? window.location.origin.substring(0, window.location.origin.length - 1)
            : window.location.origin || ``),
          this.baseURL.startsWith(`/`) ||
            ((t += window.location.pathname || `/`), (t += t.endsWith(`/`) ? `` : `/`)),
          (t += this.baseURL)),
        e && ((t += t.endsWith(`/`) ? `` : `/`), (t += e.startsWith(`/`) ? e.substring(1) : e)),
        t
      )
    }
    async send(e, t) {
      t = this.initSendOptions(e, t)
      let n = this.buildURL(e)
      if (this.beforeSend) {
        let e = Object.assign({}, await this.beforeSend(n, t))
        e.url !== void 0 || e.options !== void 0
          ? ((n = e.url || n), (t = e.options || t))
          : Object.keys(e).length &&
            ((t = e),
            console?.warn &&
              console.warn(
                'Deprecated format of beforeSend return: please use `return { url, options }`, instead of `return options`.',
              ))
      }
      if (t.query !== void 0) {
        let e = nx(t.query)
        ;(e && (n += (n.includes(`?`) ? `&` : `?`) + e), delete t.query)
      }
      return (
        this.getHeader(t.headers, `Content-Type`) == `application/json` &&
          t.body &&
          typeof t.body != `string` &&
          (t.body = JSON.stringify(t.body)),
        (t.fetch || fetch)(n, t)
          .then(async (e) => {
            let n = {}
            try {
              n = await e.json()
            } catch (e) {
              if (t.signal?.aborted || e?.name == `AbortError` || e?.message == `Aborted`) throw e
            }
            if ((this.afterSend && (n = await this.afterSend(e, n, t)), e.status >= 400))
              throw new zb({ url: e.url, status: e.status, data: n })
            return n
          })
          .catch((e) => {
            throw new zb(e)
          })
      )
    }
    initSendOptions(e, t) {
      if (
        (((t = Object.assign({ method: `GET` }, t)).body = (function (e) {
          if (
            typeof FormData > `u` ||
            e === void 0 ||
            typeof e != `object` ||
            !e ||
            _x(e) ||
            !vx(e)
          )
            return e
          let t = new FormData()
          for (let n in e) {
            let r = e[n]
            if (r !== void 0)
              if (typeof r != `object` || vx({ data: r })) {
                let e = Array.isArray(r) ? r : [r]
                for (let r of e) t.append(n, r)
              } else {
                let e = {}
                ;((e[n] = r), t.append(`@jsonPayload`, JSON.stringify(e)))
              }
          }
          return t
        })(t.body)),
        tx(t),
        (t.query = Object.assign({}, t.params, t.query)),
        t.requestKey === void 0 &&
          (!1 === t.$autoCancel || !1 === t.query.$autoCancel
            ? (t.requestKey = null)
            : (t.$cancelKey || t.query.$cancelKey) &&
              (t.requestKey = t.$cancelKey || t.query.$cancelKey)),
        delete t.$autoCancel,
        delete t.query.$autoCancel,
        delete t.$cancelKey,
        delete t.query.$cancelKey,
        this.getHeader(t.headers, `Content-Type`) !== null ||
          _x(t.body) ||
          (t.headers = Object.assign({}, t.headers, { 'Content-Type': `application/json` })),
        this.getHeader(t.headers, `Accept-Language`) === null &&
          (t.headers = Object.assign({}, t.headers, { 'Accept-Language': this.lang })),
        this.authStore.token &&
          this.getHeader(t.headers, `Authorization`) === null &&
          (t.headers = Object.assign({}, t.headers, { Authorization: this.authStore.token })),
        this.enableAutoCancellation && t.requestKey !== null)
      ) {
        let n = t.requestKey || (t.method || `GET`) + e
        ;(delete t.requestKey, this.cancelRequest(n))
        let r = new AbortController()
        ;((this.cancelControllers[n] = r), (t.signal = r.signal))
      }
      return t
    }
    getHeader(e, t) {
      ;((e ||= {}), (t = t.toLowerCase()))
      for (let n in e) if (n.toLowerCase() == t) return e[n]
      return null
    }
  },
  wx = new Cx(`https://barbearia-pro-cee5d.shrd00.internal.goskip.dev`)
wx.autoCancellation(!1)
var Tx = (0, u.createContext)(void 0),
  Ex = () => {
    let e = (0, u.useContext)(Tx)
    if (!e) throw Error(`useAuth must be used within an AuthProvider`)
    return e
  },
  Dx = ({ children: e }) => {
    let [t, n] = (0, u.useState)(wx.authStore.isValid ? wx.authStore.record : null),
      [r, i] = (0, u.useState)(wx.authStore.isValid),
      [a, o] = (0, u.useState)(!0)
    return (
      (0, u.useEffect)(() => {
        let e = wx.authStore.onChange((e, t) => {
          ;(n(wx.authStore.isValid ? t : null), i(wx.authStore.isValid))
        })
        return (
          wx.authStore.isValid
            ? wx
                .collection(`users`)
                .authRefresh()
                .catch(() => wx.authStore.clear())
                .finally(() => o(!1))
            : (wx.authStore.record && wx.authStore.clear(), o(!1)),
          () => {
            e()
          }
        )
      }, []),
      (0, R.jsx)(Tx.Provider, {
        value: {
          user: t,
          isAuthenticated: r,
          signUp: async (e, t) => {
            try {
              return (
                await wx.collection(`users`).create({ email: e, password: t, passwordConfirm: t }),
                await wx.collection(`users`).authWithPassword(e, t),
                { error: null }
              )
            } catch (e) {
              return { error: e }
            }
          },
          signIn: async (e, t) => {
            try {
              return (await wx.collection(`users`).authWithPassword(e, t), { error: null })
            } catch (e) {
              return { error: e }
            }
          },
          resetPassword: async (e) => {
            try {
              return (await wx.collection(`users`).requestPasswordReset(e), { error: null })
            } catch (e) {
              return { error: e }
            }
          },
          signOut: () => {
            wx.authStore.clear()
          },
          loading: a,
        },
        children: e,
      })
    )
  },
  Ox = {
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
  },
  kx = null,
  Ax = null
function jx() {
  let { user: e } = Ex(),
    t =
      e?.access_level === `Admin` ||
      e?.email === `reginaldo.segundo@planagroup.com.br` ||
      e?.email === `alissonmayer7@gmail.com`,
    [n, r] = (0, u.useState)(kx || Ox),
    [i, a] = (0, u.useState)(!kx)
  ;(0, u.useEffect)(() => {
    if (kx) {
      a(!1)
      return
    }
    ;((Ax ||= wx
      .collection(`settings`)
      .getFirstListItem(`key="role_permissions"`, { requestKey: null })
      .then((e) => ((kx = e.value || Ox), kx))
      .catch(() => ((kx = Ox), kx))),
      Ax.then((e) => {
        ;(r(e), a(!1))
      }))
  }, [])
  let o = n[e?.access_level || `Autonomo`] || Ox[e?.access_level] || []
  return {
    hasAccess: (n) =>
      t ||
      o.includes(`*`) ||
      ((n === `settings` || n === `users`) && e?.access_level === `Socio`) ||
      (n.startsWith(`staff_`) && o.includes(`staff`)) ||
      (n.startsWith(`dash_`) && o.includes(`dashboard`))
        ? !0
        : o.includes(n),
    rolePerms: n,
    isAdmin: t,
    loadingPerms: i,
  }
}
function Mx(e, t, n = !0) {
  let r = (0, u.useRef)(t)
  ;((r.current = t),
    (0, u.useEffect)(() => {
      if (!n) return
      let t,
        i = !1
      return (
        wx
          .collection(e)
          .subscribe(`*`, (e) => {
            r.current(e)
          })
          .then((e) => {
            i ? e().catch(() => {}) : (t = e)
          })
          .catch(() => {}),
        () => {
          ;((i = !0), t && t().catch(() => {}))
        }
      )
    }, [e, n]))
}
var Nx = `Label`,
  Px = u.forwardRef((e, t) =>
    (0, R.jsx)(Ju.label, {
      ...e,
      ref: t,
      onMouseDown: (t) => {
        t.target.closest(`button, input, select, textarea`) ||
          (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault())
      },
    }),
  )
Px.displayName = Nx
var Fx = Px,
  Ix = Ui(
    `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,
  ),
  Lx = u.forwardRef(({ className: e, ...t }, n) =>
    (0, R.jsx)(Fx, { ref: n, className: G(Ix(), e), ...t }),
  )
Lx.displayName = Fx.displayName
function Rx() {
  let e = Ze(),
    t = et(),
    { user: n, signOut: r } = Ex(),
    [i, a] = (0, u.useState)([]),
    [o, s] = (0, u.useState)(!1),
    [c, l] = (0, u.useState)([]),
    [d, f] = (0, u.useState)(``),
    { hasAccess: p, isAdmin: m } = jx(),
    h = m || p(`settings`),
    [g, _] = (0, u.useState)(!1),
    [v, y] = (0, u.useState)({
      name: ``,
      surname: ``,
      whatsapp: ``,
      oldPassword: ``,
      password: ``,
      passwordConfirm: ``,
    }),
    { toast: b } = Qn()
  ;(0, u.useEffect)(() => {
    n &&
      y({
        name: n.name || ``,
        surname: n.surname || ``,
        whatsapp: n.whatsapp || ``,
        oldPassword: ``,
        password: ``,
        passwordConfirm: ``,
      })
  }, [n])
  let x = async () => {
      if (v.password && v.password !== v.passwordConfirm) {
        b({ title: `As senhas não coincidem`, variant: `destructive` })
        return
      }
      if ((v.password || v.oldPassword) && !v.oldPassword) {
        b({ title: `Senha atual é obrigatória para alterar a senha`, variant: `destructive` })
        return
      }
      try {
        let e = { name: v.name, surname: v.surname, whatsapp: v.whatsapp }
        ;(v.password &&
          ((e.oldPassword = v.oldPassword),
          (e.password = v.password),
          (e.passwordConfirm = v.passwordConfirm)),
          await wx.collection(`users`).update(n.id, e),
          b({ title: `Perfil atualizado com sucesso!` }),
          _(!1))
      } catch (e) {
        b({ title: `Erro ao atualizar perfil`, description: e.message, variant: `destructive` })
      }
    },
    S = [
      { id: `dashboard`, title: `Dashboard`, url: `/dashboard`, icon: ca },
      { id: `agenda`, title: `Agenda`, url: `/agenda`, icon: ea },
      { id: `clientes`, title: `Clientes`, url: `/clientes`, icon: _a },
      { id: `estoque`, title: `Serviços & Pacotes`, url: `/estoque`, icon: da },
      { id: `produtos`, title: `Produtos`, url: `/produtos`, icon: ha },
      { id: `fornecedores`, title: `Compras/Fornec.`, url: `/fornecedores`, icon: ga },
      { id: `staff`, title: `Equipe & Comissões`, url: `/staff`, icon: _a },
      { id: `checkout`, title: `Checkout (POS)`, url: `/checkout`, icon: Qi },
      { id: `financeiro`, title: `Financeiro`, url: `/financeiro`, icon: va },
      { id: `users`, title: `Usuários e Acessos`, url: `/users`, icon: aa },
      { id: `settings`, title: `Configurações`, url: `/settings`, icon: ma },
    ].filter((e) => p(e.id) || m),
    C = n?.plan || `Free`,
    w = async (e) => {
      n && (await wx.collection(`users`).update(n.id, { plan: e }))
    },
    T = () => {
      ;(r(), t(`/`))
    },
    E = async () => {
      try {
        ;(a(
          await wx
            .collection(`client_packages`)
            .getFullList({ filter: `remaining_uses = 1`, expand: `client_id,package_id` }),
        ),
          n &&
            l(
              await wx
                .collection(`notifications`)
                .getFullList({ filter: `user_id="${n.id}" && is_read=false`, sort: `-created` }),
            ))
      } catch (e) {
        console.error(`Failed to load alerts`, e)
      }
    },
    D = async (e, t) => {
      e.stopPropagation()
      try {
        ;(await wx.collection(`notifications`).update(t, { is_read: !0 }),
          l((e) => e.filter((e) => e.id !== t)))
      } catch (e) {
        console.error(e)
      }
    },
    O = async (e, t) => {
      await D(e, t)
    },
    k = async () => {
      try {
        let e = await wx.collection(`settings`).getFullList({ filter: `key="logo"` })
        e.length > 0 && e[0].logo && f(wx.files.getURL(e[0], e[0].logo))
      } catch {}
    }
  return (
    (0, u.useEffect)(
      () => (
        n && E(),
        k(),
        window.addEventListener(`logo-updated`, k),
        () => window.removeEventListener(`logo-updated`, k)
      ),
      [n],
    ),
    Mx(`client_packages`, () => {
      E()
    }),
    Mx(`notifications`, () => {
      E()
    }),
    Mx(`appointments`, () => {
      E()
    }),
    (0, R.jsxs)(Kp, {
      children: [
        (0, R.jsxs)(qp, {
          variant: `inset`,
          className: `hidden md:flex`,
          children: [
            (0, R.jsx)(Qp, {
              className: `p-4 flex flex-row items-center gap-3`,
              children: d
                ? (0, R.jsx)(`img`, {
                    src: d,
                    alt: `Barbearia Pro`,
                    className: `h-10 max-w-[200px] object-contain drop-shadow-md`,
                  })
                : (0, R.jsx)(`span`, {
                    className: `text-xl font-bold tracking-tight text-primary`,
                    children: `BARBEARIA PRO`,
                  }),
            }),
            (0, R.jsx)(tm, {
              children: (0, R.jsx)(nm, {
                children: (0, R.jsx)(am, {
                  children: (0, R.jsx)(om, {
                    children: S.map((t) =>
                      (0, R.jsx)(
                        sm,
                        {
                          children: (0, R.jsx)(lm, {
                            asChild: !0,
                            isActive:
                              e.pathname === t.url ||
                              (t.url !== `/` && e.pathname.startsWith(t.url)),
                            tooltip: t.title,
                            children: (0, R.jsxs)(Cn, {
                              to: t.url,
                              children: [
                                (0, R.jsx)(t.icon, {}),
                                (0, R.jsx)(`span`, { children: t.title }),
                              ],
                            }),
                          }),
                        },
                        t.title,
                      ),
                    ),
                  }),
                }),
              }),
            }),
            (0, R.jsx)($p, {
              children: (0, R.jsx)(om, {
                children: (0, R.jsx)(sm, {
                  children: (0, R.jsxs)(lm, {
                    onClick: T,
                    tooltip: `Sair`,
                    children: [(0, R.jsx)(la, {}), (0, R.jsx)(`span`, { children: `Sair` })],
                  }),
                }),
              }),
            }),
          ],
        }),
        (0, R.jsxs)(Xp, {
          className: `h-[100dvh] flex flex-col overflow-hidden`,
          children: [
            (0, R.jsxs)(`header`, {
              className: `flex h-16 shrink-0 items-center gap-2 sm:gap-4 border-b border-border bg-card/50 backdrop-blur px-4 sm:px-6 shadow-sm z-10`,
              children: [
                (0, R.jsx)(Jp, { className: `-ml-2 hidden md:flex min-h-[44px] min-w-[44px]` }),
                (0, R.jsxs)(`div`, {
                  className: `md:hidden flex items-center gap-2`,
                  children: [
                    (0, R.jsxs)(Ep, {
                      children: [
                        (0, R.jsx)(Dp, {
                          asChild: !0,
                          children: (0, R.jsx)(Ku, {
                            variant: `ghost`,
                            size: `icon`,
                            className: `-ml-2 min-h-[44px] min-w-[44px]`,
                            children: (0, R.jsx)(ua, { className: `size-5` }),
                          }),
                        }),
                        (0, R.jsxs)(Mp, {
                          side: `left`,
                          className: `w-[280px] p-0 flex flex-col`,
                          children: [
                            (0, R.jsx)(`div`, {
                              className: `p-4 border-b flex items-center gap-3`,
                              children: d
                                ? (0, R.jsx)(`img`, {
                                    src: d,
                                    alt: `Barbearia Pro`,
                                    className: `h-8 max-w-[150px] object-contain drop-shadow-md`,
                                  })
                                : (0, R.jsx)(`span`, {
                                    className: `font-bold tracking-tight text-primary`,
                                    children: `BARBEARIA PRO`,
                                  }),
                            }),
                            (0, R.jsx)(Qv, {
                              className: `flex-1`,
                              children: (0, R.jsx)(`div`, {
                                className: `flex flex-col gap-1 p-2`,
                                children: S.map((t) => {
                                  let n =
                                    e.pathname === t.url ||
                                    (t.url !== `/` && e.pathname.startsWith(t.url))
                                  return (0, R.jsx)(
                                    Op,
                                    {
                                      asChild: !0,
                                      children: (0, R.jsxs)(Cn, {
                                        to: t.url,
                                        className: G(
                                          `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors`,
                                          n
                                            ? `bg-primary/10 text-primary`
                                            : `hover:bg-muted text-muted-foreground`,
                                        ),
                                        children: [
                                          (0, R.jsx)(t.icon, { className: `size-4` }),
                                          t.title,
                                        ],
                                      }),
                                    },
                                    t.title,
                                  )
                                }),
                              }),
                            }),
                            (0, R.jsx)(`div`, {
                              className: `p-4 border-t`,
                              children: (0, R.jsxs)(Ku, {
                                variant: `ghost`,
                                className: `w-full justify-start text-muted-foreground`,
                                onClick: T,
                                children: [(0, R.jsx)(la, { className: `size-4 mr-2` }), `Sair`],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, R.jsxs)(`div`, {
                      className: `text-primary font-bold flex items-center gap-2`,
                      children: [
                        d
                          ? (0, R.jsx)(`img`, {
                              src: d,
                              alt: `Barbearia Pro`,
                              className: `h-8 max-w-[120px] object-contain drop-shadow-md hidden sm:block`,
                            })
                          : (0, R.jsx)(`span`, {
                              className: `text-lg tracking-tight hidden sm:block`,
                              children: `BARBEARIA PRO`,
                            }),
                        (0, R.jsx)(`span`, {
                          className: `text-xs border border-primary/20 px-1.5 py-0.5 rounded-md bg-primary/5`,
                          children: C,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, R.jsxs)(`div`, {
                  className: `flex-1 flex items-center max-w-md relative ml-2 md:ml-0`,
                  children: [
                    (0, R.jsx)(pa, { className: `absolute left-3 size-4 text-muted-foreground` }),
                    (0, R.jsx)(qu, {
                      placeholder: `Buscar...`,
                      className: `pl-9 bg-background border-border min-h-[44px]`,
                    }),
                  ],
                }),
                (0, R.jsxs)(`div`, {
                  className: `flex items-center gap-2 sm:gap-3 ml-auto`,
                  children: [
                    (0, R.jsxs)(kb, {
                      value: C,
                      onValueChange: w,
                      children: [
                        (0, R.jsxs)(Mb, {
                          className: `w-[110px] sm:w-[130px] h-9 bg-secondary/50 text-xs border-dashed min-h-[44px]`,
                          children: [
                            (0, R.jsx)(sa, { className: `size-3 mr-1 text-primary` }),
                            (0, R.jsx)(jb, {}),
                          ],
                        }),
                        (0, R.jsxs)(Fb, {
                          children: [
                            (0, R.jsx)(Lb, { value: `Free`, children: `Plano Free` }),
                            (0, R.jsx)(Lb, { value: `Basic`, children: `Plano Basic` }),
                            (0, R.jsx)(Lb, { value: `Pro`, children: `Plano Pro` }),
                            (0, R.jsx)(Lb, { value: `Platinum`, children: `Plano Platinum` }),
                          ],
                        }),
                      ],
                    }),
                    (0, R.jsxs)(ev, {
                      children: [
                        (0, R.jsx)(tv, {
                          asChild: !0,
                          children: (0, R.jsxs)(Ku, {
                            variant: `ghost`,
                            size: `icon`,
                            className: `relative min-h-[44px] min-w-[44px]`,
                            children: [
                              (0, R.jsx)($i, { className: `size-5` }),
                              (i.length > 0 || c.length > 0) &&
                                (0, R.jsx)(`span`, {
                                  className: `absolute top-2 right-2 size-2 bg-destructive rounded-full animate-pulse`,
                                }),
                            ],
                          }),
                        }),
                        (0, R.jsx)(nv, {
                          align: `end`,
                          className: `w-80 p-4`,
                          children: (0, R.jsxs)(`div`, {
                            className: `space-y-4 max-h-[300px] overflow-y-auto`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `flex items-center justify-between`,
                                children: [
                                  (0, R.jsx)(`h4`, {
                                    className: `font-semibold text-sm`,
                                    children: `Notificações`,
                                  }),
                                  c.length > 0 &&
                                    (0, R.jsx)(Ku, {
                                      variant: `ghost`,
                                      size: `sm`,
                                      className: `h-auto p-1 text-xs text-muted-foreground`,
                                      onClick: async () => {
                                        try {
                                          ;(await Promise.all(
                                            c.map((e) =>
                                              wx
                                                .collection(`notifications`)
                                                .update(e.id, { is_read: !0 }),
                                            ),
                                          ),
                                            l([]))
                                        } catch (e) {
                                          console.error(e)
                                        }
                                      },
                                      children: `Marcar todas como lidas`,
                                    }),
                                ],
                              }),
                              c.map((e) =>
                                (0, R.jsxs)(
                                  `div`,
                                  {
                                    className: `p-3 bg-muted/30 border rounded-md relative flex items-start justify-between group cursor-pointer hover:bg-muted/50 transition-colors`,
                                    onClick: (t) => O(t, e.id),
                                    children: [
                                      (0, R.jsxs)(`div`, {
                                        className: `pr-6`,
                                        children: [
                                          (0, R.jsx)(`p`, {
                                            className: `text-sm font-bold text-primary`,
                                            children: e.title,
                                          }),
                                          (0, R.jsx)(`p`, {
                                            className: `text-xs text-muted-foreground mt-0.5`,
                                            children: e.message,
                                          }),
                                        ],
                                      }),
                                      (0, R.jsx)(Ku, {
                                        variant: `ghost`,
                                        size: `icon`,
                                        className: `size-6 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity`,
                                        onClick: (t) => D(t, e.id),
                                        title: `Marcar como lida`,
                                        children: (0, R.jsx)(ta, {
                                          className: `size-4 text-emerald-500`,
                                        }),
                                      }),
                                    ],
                                  },
                                  e.id,
                                ),
                              ),
                              i.length > 0 &&
                                (0, R.jsxs)(`div`, {
                                  className: `p-3 bg-amber-500/10 text-amber-600 rounded-md cursor-pointer hover:bg-amber-500/20 transition-colors`,
                                  onClick: () => s(!0),
                                  children: [
                                    (0, R.jsxs)(`p`, {
                                      className: `text-sm font-bold flex items-center gap-2`,
                                      children: [
                                        (0, R.jsx)(da, { className: `size-4` }),
                                        ` Pacotes Vencendo (`,
                                        i.length,
                                        `)`,
                                      ],
                                    }),
                                    (0, R.jsx)(`p`, {
                                      className: `text-xs mt-1`,
                                      children: `Existem clientes com apenas 1 uso restante.`,
                                    }),
                                  ],
                                }),
                              c.length === 0 &&
                                i.length === 0 &&
                                (0, R.jsx)(`p`, {
                                  className: `text-sm text-muted-foreground`,
                                  children: `Nenhuma notificação no momento.`,
                                }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, R.jsxs)(p_, {
                      children: [
                        (0, R.jsx)(m_, {
                          asChild: !0,
                          children: (0, R.jsx)(Ku, {
                            variant: `ghost`,
                            size: `icon`,
                            className: `hidden sm:flex min-h-[44px] min-w-[44px]`,
                            children: (0, R.jsx)(aa, { className: `size-6` }),
                          }),
                        }),
                        (0, R.jsxs)(__, {
                          align: `end`,
                          children: [
                            (0, R.jsx)(x_, { children: `Minha Conta` }),
                            (0, R.jsx)(S_, {}),
                            (0, R.jsxs)(v_, {
                              onClick: () => _(!0),
                              className: `cursor-pointer`,
                              children: [
                                (0, R.jsx)(aa, { className: `mr-2 size-4` }),
                                `Meu Perfil`,
                              ],
                            }),
                            h &&
                              (0, R.jsx)(v_, {
                                asChild: !0,
                                children: (0, R.jsxs)(Cn, {
                                  to: `/settings`,
                                  className: `cursor-pointer w-full flex items-center`,
                                  children: [
                                    (0, R.jsx)(ma, { className: `mr-2 size-4` }),
                                    `Configurações`,
                                  ],
                                }),
                              }),
                            (0, R.jsxs)(v_, {
                              onClick: T,
                              className: `cursor-pointer text-destructive focus:text-destructive`,
                              children: [(0, R.jsx)(la, { className: `mr-2 size-4` }), `Sair`],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, R.jsx)(rv, {
              open: g,
              onOpenChange: _,
              children: (0, R.jsxs)(sv, {
                className: `max-w-md`,
                children: [
                  (0, R.jsx)(cv, { children: (0, R.jsx)(uv, { children: `Meu Perfil` }) }),
                  (0, R.jsxs)(`div`, {
                    className: `space-y-4 py-4`,
                    children: [
                      (0, R.jsxs)(`div`, {
                        className: `grid grid-cols-2 gap-4`,
                        children: [
                          (0, R.jsxs)(`div`, {
                            className: `space-y-2`,
                            children: [
                              (0, R.jsx)(Lx, { children: `Nome` }),
                              (0, R.jsx)(qu, {
                                value: v.name,
                                onChange: (e) => y({ ...v, name: e.target.value }),
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `space-y-2`,
                            children: [
                              (0, R.jsx)(Lx, { children: `Sobrenome` }),
                              (0, R.jsx)(qu, {
                                value: v.surname,
                                onChange: (e) => y({ ...v, surname: e.target.value }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, R.jsx)(Lx, { children: `WhatsApp` }),
                          (0, R.jsx)(qu, {
                            value: v.whatsapp,
                            onChange: (e) => y({ ...v, whatsapp: e.target.value }),
                            placeholder: `(00) 00000-0000`,
                          }),
                        ],
                      }),
                      (0, R.jsxs)(`div`, {
                        className: `pt-4 border-t space-y-4`,
                        children: [
                          (0, R.jsx)(`h4`, {
                            className: `font-medium text-sm text-muted-foreground`,
                            children: `Alterar Senha`,
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `space-y-2`,
                            children: [
                              (0, R.jsx)(Lx, { children: `Senha Atual` }),
                              (0, R.jsx)(qu, {
                                type: `password`,
                                value: v.oldPassword,
                                onChange: (e) => y({ ...v, oldPassword: e.target.value }),
                                placeholder: `Obrigatório para alterar senha`,
                              }),
                            ],
                          }),
                          (0, R.jsxs)(`div`, {
                            className: `grid grid-cols-2 gap-4`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                className: `space-y-2`,
                                children: [
                                  (0, R.jsx)(Lx, { children: `Nova Senha` }),
                                  (0, R.jsx)(qu, {
                                    type: `password`,
                                    value: v.password,
                                    onChange: (e) => y({ ...v, password: e.target.value }),
                                  }),
                                ],
                              }),
                              (0, R.jsxs)(`div`, {
                                className: `space-y-2`,
                                children: [
                                  (0, R.jsx)(Lx, { children: `Confirmar Nova Senha` }),
                                  (0, R.jsx)(qu, {
                                    type: `password`,
                                    value: v.passwordConfirm,
                                    onChange: (e) => y({ ...v, passwordConfirm: e.target.value }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, R.jsxs)(`div`, {
                    className: `flex justify-end gap-2`,
                    children: [
                      (0, R.jsx)(Ku, {
                        variant: `outline`,
                        onClick: () => _(!1),
                        children: `Cancelar`,
                      }),
                      (0, R.jsx)(Ku, { onClick: x, children: `Salvar` }),
                    ],
                  }),
                ],
              }),
            }),
            (0, R.jsx)(rv, {
              open: o,
              onOpenChange: s,
              children: (0, R.jsxs)(sv, {
                className: `max-w-md w-[95vw]`,
                children: [
                  (0, R.jsx)(cv, {
                    children: (0, R.jsx)(uv, { children: `Pacotes Quase no Fim` }),
                  }),
                  (0, R.jsxs)(`div`, {
                    className: `space-y-3 max-h-[60vh] overflow-y-auto mt-2`,
                    children: [
                      i.map((e) =>
                        (0, R.jsxs)(
                          `div`,
                          {
                            className: `flex justify-between items-center p-3 border rounded-lg bg-card shadow-sm`,
                            children: [
                              (0, R.jsxs)(`div`, {
                                children: [
                                  (0, R.jsx)(`p`, {
                                    className: `font-bold text-sm text-primary`,
                                    children: e.expand?.client_id?.name || `Cliente não informado`,
                                  }),
                                  (0, R.jsx)(`p`, {
                                    className: `text-xs text-muted-foreground`,
                                    children: e.expand?.package_id?.name || `Pacote sem nome`,
                                  }),
                                ],
                              }),
                              (0, R.jsx)(`span`, {
                                className: `text-xs font-semibold bg-amber-500/20 text-amber-600 px-2.5 py-1 rounded-full whitespace-nowrap ml-2`,
                                children: `1 uso restante`,
                              }),
                            ],
                          },
                          e.id,
                        ),
                      ),
                      i.length === 0 &&
                        (0, R.jsx)(`p`, {
                          className: `text-sm text-muted-foreground text-center py-4`,
                          children: `Nenhum pacote vencendo.`,
                        }),
                    ],
                  }),
                ],
              }),
            }),
            (0, R.jsx)(`main`, {
              className: `flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 pb-safe animate-fade-in w-full max-w-full`,
              children: (0, R.jsx)(kt, {}),
            }),
          ],
        }),
      ],
    })
  )
}
var zx = (0, u.lazy)(() => g(() => import(`./Login-BMotmTfT.js`), __vite__mapDeps([0, 1, 2, 3]))),
  Bx = (0, u.lazy)(() =>
    g(() => import(`./RecuperarSenha-DtCS3SUu.js`), __vite__mapDeps([4, 1, 2, 5, 3])),
  ),
  Vx = (0, u.lazy)(() =>
    g(
      () => import(`./Index-5qTMb0v4.js`),
      __vite__mapDeps([6, 1, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 3, 17, 18]),
    ),
  ),
  Hx = (0, u.lazy)(() =>
    g(
      () => import(`./Agenda-Dmxe8SSj.js`),
      __vite__mapDeps([19, 1, 20, 10, 11, 12, 8, 13, 21, 22, 14, 23, 24, 25, 26, 18]),
    ),
  ),
  Ux = (0, u.lazy)(() =>
    g(
      () => import(`./Clientes-CyLN5AJK.js`),
      __vite__mapDeps([27, 1, 28, 8, 9, 10, 11, 21, 29, 30, 7, 31, 16, 3, 17, 18]),
    ),
  ),
  Wx = (0, u.lazy)(() =>
    g(() => import(`./ClienteDetail-DwyB9cb7.js`), __vite__mapDeps([32, 1, 7, 10, 33, 16, 3, 18])),
  ),
  Gx = (0, u.lazy)(() =>
    g(() => import(`./Estoque-Kaz3JeSb.js`), __vite__mapDeps([34, 1, 28, 8, 24, 31, 16, 3, 17])),
  ),
  Kx = (0, u.lazy)(() =>
    g(
      () => import(`./Checkout-Csx1Rtf5.js`),
      __vite__mapDeps([35, 1, 8, 10, 29, 24, 25, 36, 3, 17, 26, 18]),
    ),
  ),
  qx = (0, u.lazy)(() =>
    g(
      () => import(`./Staff-Dja8RVPM.js`),
      __vite__mapDeps([37, 1, 20, 10, 11, 12, 38, 21, 22, 5, 15, 24, 31, 16, 3, 17, 26, 18]),
    ),
  ),
  Jx = (0, u.lazy)(() =>
    g(() => import(`./Settings-Ct8jVHuF.js`), __vite__mapDeps([39, 1, 28, 8, 3, 17])),
  ),
  Yx = (0, u.lazy)(() =>
    g(() => import(`./Users-s_RTRIik.js`), __vite__mapDeps([40, 1, 23, 24, 36, 16, 3, 17, 26])),
  ),
  Xx = (0, u.lazy)(() =>
    g(() => import(`./Financeiro--OiGoda8.js`), __vite__mapDeps([41, 1, 28, 24, 31, 36, 3, 17])),
  ),
  Zx = (0, u.lazy)(() =>
    g(
      () => import(`./ProdutosCategorias-DQjAXKCM.js`),
      __vite__mapDeps([42, 1, 28, 8, 10, 30, 7, 24, 25, 36, 16, 17, 43]),
    ),
  ),
  Qx = (0, u.lazy)(() =>
    g(
      () => import(`./Fornecedores-CTUzGguU.js`),
      __vite__mapDeps([44, 1, 38, 14, 30, 7, 24, 16, 17, 26, 43]),
    ),
  ),
  $x = (0, u.lazy)(() =>
    g(() => import(`./FornecedorDetail-BKP5FlbY.js`), __vite__mapDeps([45, 1, 10, 33, 22, 3])),
  ),
  eS = (0, u.lazy)(() => g(() => import(`./NotFound-DzQBMWdM.js`), __vite__mapDeps([46, 1])))
function tS() {
  return (0, R.jsxs)(`div`, {
    className: `h-screen w-screen flex flex-col items-center justify-center bg-gray-50`,
    children: [
      (0, R.jsx)(`div`, {
        className: `animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4`,
      }),
      (0, R.jsx)(`p`, { className: `text-gray-600 font-medium`, children: `Carregando...` }),
    ],
  })
}
function nS() {
  return (0, R.jsx)(`div`, {
    className: `h-full w-full flex flex-col items-center justify-center min-h-[50vh]`,
    children: (0, R.jsx)(`div`, {
      className: `animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4`,
    }),
  })
}
function rS({ children: e }) {
  let { isAuthenticated: t, loading: n } = Ex()
  return n
    ? (0, R.jsx)(tS, {})
    : t
      ? (0, R.jsx)(R.Fragment, { children: e })
      : (0, R.jsx)(Ot, { to: `/`, replace: !0 })
}
function iS({ module: e, children: t }) {
  let { hasAccess: n, isAdmin: r, loadingPerms: i } = jx()
  return (
    (0, u.useEffect)(
      () => (
        document.body.classList.add(`page-${e}`),
        () => {
          document.body.classList.remove(`page-${e}`)
        }
      ),
      [e],
    ),
    i && !r
      ? (0, R.jsx)(nS, {})
      : !r && !n(e)
        ? (setTimeout(() => {
            Ko.error(`Acesso Negado`, {
              description: `Você não tem permissão para acessar esta página.`,
            })
          }, 100),
          (0, R.jsx)(Ot, { to: `/dashboard`, replace: !0 }))
        : (0, R.jsx)(u.Suspense, { fallback: (0, R.jsx)(nS, {}), children: t })
  )
}
function aS({ children: e }) {
  let { isAuthenticated: t, loading: n } = Ex()
  return n
    ? (0, R.jsx)(tS, {})
    : t
      ? (0, R.jsx)(Ot, { to: `/dashboard`, replace: !0 })
      : (0, R.jsx)(u.Suspense, { fallback: (0, R.jsx)(tS, {}), children: e })
}
;(0, f.createRoot)(document.getElementById(`root`)).render(
  (0, R.jsx)(
    () =>
      (0, R.jsx)(Dx, {
        children: (0, R.jsx)(bn, {
          future: { v7_startTransition: !1, v7_relativeSplatPath: !1 },
          children: (0, R.jsxs)(ku, {
            children: [
              (0, R.jsx)(Do, {}),
              (0, R.jsx)(cs, {}),
              (0, R.jsxs)(Mt, {
                children: [
                  (0, R.jsx)(At, {
                    path: `/`,
                    element: (0, R.jsx)(aS, { children: (0, R.jsx)(zx, {}) }),
                  }),
                  (0, R.jsx)(At, {
                    path: `/recuperar-senha`,
                    element: (0, R.jsx)(aS, { children: (0, R.jsx)(Bx, {}) }),
                  }),
                  (0, R.jsxs)(At, {
                    element: (0, R.jsx)(rS, { children: (0, R.jsx)(Rx, {}) }),
                    children: [
                      (0, R.jsx)(At, {
                        path: `/dashboard`,
                        element: (0, R.jsx)(u.Suspense, {
                          fallback: (0, R.jsx)(nS, {}),
                          children: (0, R.jsx)(Vx, {}),
                        }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/agenda`,
                        element: (0, R.jsx)(iS, { module: `agenda`, children: (0, R.jsx)(Hx, {}) }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/clientes`,
                        element: (0, R.jsx)(iS, {
                          module: `clientes`,
                          children: (0, R.jsx)(Ux, {}),
                        }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/clientes/:id`,
                        element: (0, R.jsx)(iS, {
                          module: `clientes`,
                          children: (0, R.jsx)(Wx, {}),
                        }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/estoque`,
                        element: (0, R.jsx)(iS, {
                          module: `estoque`,
                          children: (0, R.jsx)(Gx, {}),
                        }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/staff`,
                        element: (0, R.jsx)(iS, { module: `staff`, children: (0, R.jsx)(qx, {}) }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/financeiro`,
                        element: (0, R.jsx)(iS, {
                          module: `financeiro`,
                          children: (0, R.jsx)(Xx, {}),
                        }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/checkout`,
                        element: (0, R.jsx)(iS, {
                          module: `checkout`,
                          children: (0, R.jsx)(Kx, {}),
                        }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/produtos`,
                        element: (0, R.jsx)(iS, {
                          module: `produtos`,
                          children: (0, R.jsx)(Zx, {}),
                        }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/fornecedores`,
                        element: (0, R.jsx)(iS, {
                          module: `fornecedores`,
                          children: (0, R.jsx)(Qx, {}),
                        }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/fornecedores/:id`,
                        element: (0, R.jsx)(iS, {
                          module: `fornecedores`,
                          children: (0, R.jsx)($x, {}),
                        }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/settings`,
                        element: (0, R.jsx)(iS, {
                          module: `settings`,
                          children: (0, R.jsx)(Jx, {}),
                        }),
                      }),
                      (0, R.jsx)(At, {
                        path: `/users`,
                        element: (0, R.jsx)(iS, { module: `users`, children: (0, R.jsx)(Yx, {}) }),
                      }),
                    ],
                  }),
                  (0, R.jsx)(At, {
                    path: `*`,
                    element: (0, R.jsx)(u.Suspense, {
                      fallback: (0, R.jsx)(tS, {}),
                      children: (0, R.jsx)(eS, {}),
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
    {},
  ),
)
export {
  da as $,
  _m as A,
  Dl as B,
  iv as C,
  Rm as D,
  tv as E,
  td as F,
  vo as G,
  Ko as H,
  Ju as I,
  va as J,
  ho as K,
  qu as L,
  xp as M,
  bp as N,
  Lm as O,
  vp as P,
  pa as Q,
  Ku as R,
  uv as S,
  nv as T,
  G as U,
  ds as V,
  go as W,
  ga as X,
  _a as Y,
  ha as Z,
  rv as _,
  Qn as _t,
  wx as a,
  ea as at,
  lv as b,
  et as bt,
  Fb as c,
  Ui as ct,
  Ib as d,
  Pr as dt,
  oa as et,
  Mb as f,
  z as ft,
  $v as g,
  I as gt,
  Qv as h,
  L as ht,
  Ex as i,
  ta as it,
  Sp as j,
  Tm as k,
  Ab as l,
  Bi as lt,
  ey as m,
  er as mt,
  Mx as n,
  ra as nt,
  zb as o,
  Qi as ot,
  jb as p,
  nr as pt,
  _o as q,
  jx as r,
  na as rt,
  kb as s,
  Zi as st,
  Lx as t,
  ia as tt,
  Lb as u,
  zr as ut,
  sv as v,
  Cn as vt,
  ev as w,
  cv as x,
  it as xt,
  dv as y,
  Ze as yt,
  Gu as z,
}
