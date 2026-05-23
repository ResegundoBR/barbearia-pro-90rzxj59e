import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { t as Calendar } from "./calendar-CJlw9_zP.js";
import { a as addMonths, i as addWeeks, n as isSameMonth, o as ChevronLeft, r as normalizeInterval, t as Calendar$1 } from "./calendar-DU7U0NOJ.js";
import { t as Clock } from "./clock-BZxdHtBB.js";
import { t as Pen } from "./pen-B8kH3TFe.js";
import { t as Plus } from "./plus-C1TFYWhM.js";
import { t as Scissors } from "./scissors-ClaauGh5.js";
import { $ as Search, C as Popover, F as Root, H as Input, J as cn, K as useId, N as Overlay, P as Portal, S as DialogTitle, T as PopoverTrigger, U as Button, V as Primitive, Y as getContrastColor, _ as Dialog, a as pb, at as Check, b as DialogFooter, c as SelectContent, ct as createLucideIcon, d as SelectLabel, f as SelectTrigger, g as ScrollBar, gt as composeRefs, h as ScrollArea, i as useAuth, j as Content, l as SelectGroup, n as useRealtime, ot as CalendarDays, p as SelectValue, rt as ChevronRight, s as Select, t as Label, u as SelectItem, v as DialogContent, w as PopoverContent, x as DialogHeader, y as DialogDescription, yt as useToast } from "./index-DGnO80YW.js";
import { b as millisecondsInMinute, g as startOfWeek, t as format, u as isValid, v as toDate, y as constructFrom } from "./format-BfI_WwAb.js";
import { n as addDays, t as startOfMonth } from "./startOfMonth-2OCUkoeN.js";
import { n as endOfMonth, r as isSameDay, t as endOfWeek } from "./endOfWeek-Bs8sjMGp.js";
import { t as subDays } from "./subDays-D7_va67k.js";
import { t as ptBR } from "./pt-BR-BECjjW2f.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-D5ONMoVr.js";
import { _ as getServices, a as getBarbers, l as getClientPackages, n as createClient, r as getAppointments, t as createAppointment, u as getClients, v as updateAppointment } from "./api-Cw78yZj3.js";
import { n as getErrorMessage } from "./errors-Df7y1F38.js";
var ChevronsUpDown = createLucideIcon("chevrons-up-down", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]);
var User = createLucideIcon("user", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]);
//#endregion
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMinutes.js
/**
* The {@link addMinutes} function options.
*/
/**
* @name addMinutes
* @category Minute Helpers
* @summary Add the specified number of minutes to the given date.
*
* @description
* Add the specified number of minutes to the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The date to be changed
* @param amount - The amount of minutes to be added.
* @param options - An object with options
*
* @returns The new date with the minutes added
*
* @example
* // Add 30 minutes to 10 July 2014 12:00:00:
* const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
* //=> Thu Jul 10 2014 12:30:00
*/
function addMinutes(date, amount, options) {
	const _date = toDate(date, options?.in);
	_date.setTime(_date.getTime() + amount * millisecondsInMinute);
	return _date;
}
//#endregion
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/eachDayOfInterval.js
/**
* The {@link eachDayOfInterval} function options.
*/
/**
* The {@link eachDayOfInterval} function result type. It resolves the proper data type.
* It uses the first argument date object type, starting from the date argument,
* then the start interval date, and finally the end interval date. If
* a context function is passed, it uses the context function return type.
*/
/**
* @name eachDayOfInterval
* @category Interval Helpers
* @summary Return the array of dates within the specified time interval.
*
* @description
* Return the array of dates within the specified time interval.
*
* @typeParam IntervalType - Interval type.
* @typeParam Options - Options type.
*
* @param interval - The interval.
* @param options - An object with options.
*
* @returns The array with starts of days from the day of the interval start to the day of the interval end
*
* @example
* // Each day between 6 October 2014 and 10 October 2014:
* const result = eachDayOfInterval({
*   start: new Date(2014, 9, 6),
*   end: new Date(2014, 9, 10)
* })
* //=> [
* //   Mon Oct 06 2014 00:00:00,
* //   Tue Oct 07 2014 00:00:00,
* //   Wed Oct 08 2014 00:00:00,
* //   Thu Oct 09 2014 00:00:00,
* //   Fri Oct 10 2014 00:00:00
* // ]
*/
function eachDayOfInterval(interval, options) {
	const { start, end } = normalizeInterval(options?.in, interval);
	let reversed = +start > +end;
	const endTime = reversed ? +start : +end;
	const date = reversed ? end : start;
	date.setHours(0, 0, 0, 0);
	let step = options?.step ?? 1;
	if (!step) return [];
	if (step < 0) {
		step = -step;
		reversed = !reversed;
	}
	const dates = [];
	while (+date <= endTime) {
		dates.push(constructFrom(start, date));
		date.setDate(date.getDate() + step);
		date.setHours(0, 0, 0, 0);
	}
	return reversed ? dates.reverse() : dates;
}
//#endregion
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subMonths.js
/**
* The subMonths function options.
*/
/**
* @name subMonths
* @category Month Helpers
* @summary Subtract the specified number of months from the given date.
*
* @description
* Subtract the specified number of months from the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The date to be changed
* @param amount - The amount of months to be subtracted.
* @param options - An object with options
*
* @returns The new date with the months subtracted
*
* @example
* // Subtract 5 months from 1 February 2015:
* const result = subMonths(new Date(2015, 1, 1), 5)
* //=> Mon Sep 01 2014 00:00:00
*/
function subMonths(date, amount, options) {
	return addMonths(date, -amount, options);
}
//#endregion
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subWeeks.js
/**
* The {@link subWeeks} function options.
*/
/**
* @name subWeeks
* @category Week Helpers
* @summary Subtract the specified number of weeks from the given date.
*
* @description
* Subtract the specified number of weeks from the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The date to be changed
* @param amount - The amount of weeks to be subtracted.
* @param options - An object with options
*
* @returns The new date with the weeks subtracted
*
* @example
* // Subtract 4 weeks from 1 September 2014:
* const result = subWeeks(new Date(2014, 8, 1), 4)
* //=> Mon Aug 04 2014 00:00:00
*/
function subWeeks(date, amount, options) {
	return addWeeks(date, -amount, options);
}
//#endregion
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/cmdk@1.1.1_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@19.2.14_react-dom_3d47b27abe92d75583fac7218a36b921/node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var U = 1, Y$1 = .9, H = .8, J = .17, p = .1, u = .999, $ = .9999;
var k$1 = .99, m = /[\\\/_+.#"@\[\(\{&]/, B$1 = /[\\\/_+.#"@\[\(\{&]/g, K$1 = /[\s-]/, X = /[\s-]/g;
function G(_, C, h, P, A, f, O) {
	if (f === C.length) return A === _.length ? U : k$1;
	var T = `${A},${f}`;
	if (O[T] !== void 0) return O[T];
	for (var L = P.charAt(f), c = h.indexOf(L, A), S = 0, E, N, R, M; c >= 0;) E = G(_, C, h, P, c + 1, f + 1, O), E > S && (c === A ? E *= U : m.test(_.charAt(c - 1)) ? (E *= H, R = _.slice(A, c - 1).match(B$1), R && A > 0 && (E *= Math.pow(u, R.length))) : K$1.test(_.charAt(c - 1)) ? (E *= Y$1, M = _.slice(A, c - 1).match(X), M && A > 0 && (E *= Math.pow(u, M.length))) : (E *= J, A > 0 && (E *= Math.pow(u, c - A))), _.charAt(c) !== C.charAt(f) && (E *= $)), (E < p && h.charAt(c - 1) === P.charAt(f + 1) || P.charAt(f + 1) === P.charAt(f) && h.charAt(c - 1) !== P.charAt(f)) && (N = G(_, C, h, P, c + 1, f + 2, O), N * p > E && (E = N * p)), E > S && (S = E), c = h.indexOf(L, c + 1);
	return O[T] = S, S;
}
function D(_) {
	return _.toLowerCase().replace(X, " ");
}
function W(_, C, h) {
	return _ = h && h.length > 0 ? `${_ + " " + h.join(" ")}` : _, G(_, C, D(_), D(C), 0, 0, {});
}
//#endregion
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/cmdk@1.1.1_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@19.2.14_react-dom_3d47b27abe92d75583fac7218a36b921/node_modules/cmdk/dist/index.mjs
var N = "[cmdk-group=\"\"]", Y = "[cmdk-group-items=\"\"]", be = "[cmdk-group-heading=\"\"]", le = "[cmdk-item=\"\"]", ce = `${le}:not([aria-disabled="true"])`, Z = "cmdk-item-select", T = "data-value", Re = (r, o, n) => W(r, o, n), ue = import_react.createContext(void 0), K = () => import_react.useContext(ue), de = import_react.createContext(void 0), ee = () => import_react.useContext(de), fe = import_react.createContext(void 0), me = import_react.forwardRef((r, o) => {
	let n = L(() => {
		var e, a;
		return {
			search: "",
			value: (a = (e = r.value) != null ? e : r.defaultValue) != null ? a : "",
			selectedItemId: void 0,
			filtered: {
				count: 0,
				items: /* @__PURE__ */ new Map(),
				groups: /* @__PURE__ */ new Set()
			}
		};
	}), u = L(() => /* @__PURE__ */ new Set()), c = L(() => /* @__PURE__ */ new Map()), d = L(() => /* @__PURE__ */ new Map()), f = L(() => /* @__PURE__ */ new Set()), p = pe(r), { label: b, children: m, value: R, onValueChange: x, filter: C, shouldFilter: S, loop: A, disablePointerSelection: ge = !1, vimBindings: j = !0, ...O } = r, $ = useId(), q = useId(), _ = useId(), I = import_react.useRef(null), v = ke();
	k(() => {
		if (R !== void 0) {
			let e = R.trim();
			n.current.value = e, E.emit();
		}
	}, [R]), k(() => {
		v(6, ne);
	}, []);
	let E = import_react.useMemo(() => ({
		subscribe: (e) => (f.current.add(e), () => f.current.delete(e)),
		snapshot: () => n.current,
		setState: (e, a, s) => {
			var i, l, g, y;
			if (!Object.is(n.current[e], a)) {
				if (n.current[e] = a, e === "search") J(), z(), v(1, W);
				else if (e === "value") {
					if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
						let h = document.getElementById(_);
						h ? h.focus() : (i = document.getElementById($)) == null || i.focus();
					}
					if (v(7, () => {
						var h;
						n.current.selectedItemId = (h = M()) == null ? void 0 : h.id, E.emit();
					}), s || v(5, ne), ((l = p.current) == null ? void 0 : l.value) !== void 0) {
						let h = a != null ? a : "";
						(y = (g = p.current).onValueChange) == null || y.call(g, h);
						return;
					}
				}
				E.emit();
			}
		},
		emit: () => {
			f.current.forEach((e) => e());
		}
	}), []), U = import_react.useMemo(() => ({
		value: (e, a, s) => {
			var i;
			a !== ((i = d.current.get(e)) == null ? void 0 : i.value) && (d.current.set(e, {
				value: a,
				keywords: s
			}), n.current.filtered.items.set(e, te(a, s)), v(2, () => {
				z(), E.emit();
			}));
		},
		item: (e, a) => (u.current.add(e), a && (c.current.has(a) ? c.current.get(a).add(e) : c.current.set(a, new Set([e]))), v(3, () => {
			J(), z(), n.current.value || W(), E.emit();
		}), () => {
			d.current.delete(e), u.current.delete(e), n.current.filtered.items.delete(e);
			let s = M();
			v(4, () => {
				J(), (s == null ? void 0 : s.getAttribute("id")) === e && W(), E.emit();
			});
		}),
		group: (e) => (c.current.has(e) || c.current.set(e, /* @__PURE__ */ new Set()), () => {
			d.current.delete(e), c.current.delete(e);
		}),
		filter: () => p.current.shouldFilter,
		label: b || r["aria-label"],
		getDisablePointerSelection: () => p.current.disablePointerSelection,
		listId: $,
		inputId: _,
		labelId: q,
		listInnerRef: I
	}), []);
	function te(e, a) {
		var i, l;
		let s = (l = (i = p.current) == null ? void 0 : i.filter) != null ? l : Re;
		return e ? s(e, n.current.search, a) : 0;
	}
	function z() {
		if (!n.current.search || p.current.shouldFilter === !1) return;
		let e = n.current.filtered.items, a = [];
		n.current.filtered.groups.forEach((i) => {
			let l = c.current.get(i), g = 0;
			l.forEach((y) => {
				let h = e.get(y);
				g = Math.max(h, g);
			}), a.push([i, g]);
		});
		let s = I.current;
		V().sort((i, l) => {
			var h, F;
			let g = i.getAttribute("id"), y = l.getAttribute("id");
			return ((h = e.get(y)) != null ? h : 0) - ((F = e.get(g)) != null ? F : 0);
		}).forEach((i) => {
			let l = i.closest(Y);
			l ? l.appendChild(i.parentElement === l ? i : i.closest(`${Y} > *`)) : s.appendChild(i.parentElement === s ? i : i.closest(`${Y} > *`));
		}), a.sort((i, l) => l[1] - i[1]).forEach((i) => {
			var g;
			let l = (g = I.current) == null ? void 0 : g.querySelector(`${N}[${T}="${encodeURIComponent(i[0])}"]`);
			l?.parentElement.appendChild(l);
		});
	}
	function W() {
		let e = V().find((s) => s.getAttribute("aria-disabled") !== "true"), a = e == null ? void 0 : e.getAttribute(T);
		E.setState("value", a || void 0);
	}
	function J() {
		var a, s, i, l;
		if (!n.current.search || p.current.shouldFilter === !1) {
			n.current.filtered.count = u.current.size;
			return;
		}
		n.current.filtered.groups = /* @__PURE__ */ new Set();
		let e = 0;
		for (let g of u.current) {
			let F = te((s = (a = d.current.get(g)) == null ? void 0 : a.value) != null ? s : "", (l = (i = d.current.get(g)) == null ? void 0 : i.keywords) != null ? l : []);
			n.current.filtered.items.set(g, F), F > 0 && e++;
		}
		for (let [g, y] of c.current) for (let h of y) if (n.current.filtered.items.get(h) > 0) {
			n.current.filtered.groups.add(g);
			break;
		}
		n.current.filtered.count = e;
	}
	function ne() {
		var a, s, i;
		let e = M();
		e && (((a = e.parentElement) == null ? void 0 : a.firstChild) === e && ((i = (s = e.closest(N)) == null ? void 0 : s.querySelector(be)) == null || i.scrollIntoView({ block: "nearest" })), e.scrollIntoView({ block: "nearest" }));
	}
	function M() {
		var e;
		return (e = I.current) == null ? void 0 : e.querySelector(`${le}[aria-selected="true"]`);
	}
	function V() {
		var e;
		return Array.from(((e = I.current) == null ? void 0 : e.querySelectorAll(ce)) || []);
	}
	function X(e) {
		let s = V()[e];
		s && E.setState("value", s.getAttribute(T));
	}
	function Q(e) {
		var g;
		let a = M(), s = V(), i = s.findIndex((y) => y === a), l = s[i + e];
		(g = p.current) != null && g.loop && (l = i + e < 0 ? s[s.length - 1] : i + e === s.length ? s[0] : s[i + e]), l && E.setState("value", l.getAttribute(T));
	}
	function re(e) {
		let a = M(), s = a == null ? void 0 : a.closest(N), i;
		for (; s && !i;) s = e > 0 ? we(s, N) : De(s, N), i = s == null ? void 0 : s.querySelector(ce);
		i ? E.setState("value", i.getAttribute(T)) : Q(e);
	}
	let oe = () => X(V().length - 1), ie = (e) => {
		e.preventDefault(), e.metaKey ? oe() : e.altKey ? re(1) : Q(1);
	}, se = (e) => {
		e.preventDefault(), e.metaKey ? X(0) : e.altKey ? re(-1) : Q(-1);
	};
	return import_react.createElement(Primitive.div, {
		ref: o,
		tabIndex: -1,
		...O,
		"cmdk-root": "",
		onKeyDown: (e) => {
			var s;
			(s = O.onKeyDown) == null || s.call(O, e);
			let a = e.nativeEvent.isComposing || e.keyCode === 229;
			if (!(e.defaultPrevented || a)) switch (e.key) {
				case "n":
				case "j":
					j && e.ctrlKey && ie(e);
					break;
				case "ArrowDown":
					ie(e);
					break;
				case "p":
				case "k":
					j && e.ctrlKey && se(e);
					break;
				case "ArrowUp":
					se(e);
					break;
				case "Home":
					e.preventDefault(), X(0);
					break;
				case "End":
					e.preventDefault(), oe();
					break;
				case "Enter": {
					e.preventDefault();
					let i = M();
					if (i) {
						let l = new Event(Z);
						i.dispatchEvent(l);
					}
				}
			}
		}
	}, import_react.createElement("label", {
		"cmdk-label": "",
		htmlFor: U.inputId,
		id: U.labelId,
		style: Te
	}, b), B(r, (e) => import_react.createElement(de.Provider, { value: E }, import_react.createElement(ue.Provider, { value: U }, e))));
}), he = import_react.forwardRef((r, o) => {
	var _, I;
	let n = useId(), u = import_react.useRef(null), c = import_react.useContext(fe), d = K(), f = pe(r), p = (I = (_ = f.current) == null ? void 0 : _.forceMount) != null ? I : c == null ? void 0 : c.forceMount;
	k(() => {
		if (!p) return d.item(n, c == null ? void 0 : c.id);
	}, [p]);
	let b = ve(n, u, [
		r.value,
		r.children,
		u
	], r.keywords), m = ee(), R = P((v) => v.value && v.value === b.current), x = P((v) => p || d.filter() === !1 ? !0 : v.search ? v.filtered.items.get(n) > 0 : !0);
	import_react.useEffect(() => {
		let v = u.current;
		if (!(!v || r.disabled)) return v.addEventListener(Z, C), () => v.removeEventListener(Z, C);
	}, [
		x,
		r.onSelect,
		r.disabled
	]);
	function C() {
		var v, E;
		S(), (E = (v = f.current).onSelect) == null || E.call(v, b.current);
	}
	function S() {
		m.setState("value", b.current, !0);
	}
	if (!x) return null;
	let { disabled: A, value: ge, onSelect: j, forceMount: O, keywords: $, ...q } = r;
	return import_react.createElement(Primitive.div, {
		ref: composeRefs(u, o),
		...q,
		id: n,
		"cmdk-item": "",
		role: "option",
		"aria-disabled": !!A,
		"aria-selected": !!R,
		"data-disabled": !!A,
		"data-selected": !!R,
		onPointerMove: A || d.getDisablePointerSelection() ? void 0 : S,
		onClick: A ? void 0 : C
	}, r.children);
}), Ee = import_react.forwardRef((r, o) => {
	let { heading: n, children: u, forceMount: c, ...d } = r, f = useId(), p = import_react.useRef(null), b = import_react.useRef(null), m = useId(), R = K(), x = P((S) => c || R.filter() === !1 ? !0 : S.search ? S.filtered.groups.has(f) : !0);
	k(() => R.group(f), []), ve(f, p, [
		r.value,
		r.heading,
		b
	]);
	let C = import_react.useMemo(() => ({
		id: f,
		forceMount: c
	}), [c]);
	return import_react.createElement(Primitive.div, {
		ref: composeRefs(p, o),
		...d,
		"cmdk-group": "",
		role: "presentation",
		hidden: x ? void 0 : !0
	}, n && import_react.createElement("div", {
		ref: b,
		"cmdk-group-heading": "",
		"aria-hidden": !0,
		id: m
	}, n), B(r, (S) => import_react.createElement("div", {
		"cmdk-group-items": "",
		role: "group",
		"aria-labelledby": n ? m : void 0
	}, import_react.createElement(fe.Provider, { value: C }, S))));
}), ye = import_react.forwardRef((r, o) => {
	let { alwaysRender: n, ...u } = r, c = import_react.useRef(null), d = P((f) => !f.search);
	return !n && !d ? null : import_react.createElement(Primitive.div, {
		ref: composeRefs(c, o),
		...u,
		"cmdk-separator": "",
		role: "separator"
	});
}), Se = import_react.forwardRef((r, o) => {
	let { onValueChange: n, ...u } = r, c = r.value != null, d = ee(), f = P((m) => m.search), p = P((m) => m.selectedItemId), b = K();
	return import_react.useEffect(() => {
		r.value != null && d.setState("search", r.value);
	}, [r.value]), import_react.createElement(Primitive.input, {
		ref: o,
		...u,
		"cmdk-input": "",
		autoComplete: "off",
		autoCorrect: "off",
		spellCheck: !1,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": !0,
		"aria-controls": b.listId,
		"aria-labelledby": b.labelId,
		"aria-activedescendant": p,
		id: b.inputId,
		type: "text",
		value: c ? r.value : f,
		onChange: (m) => {
			c || d.setState("search", m.target.value), n?.(m.target.value);
		}
	});
}), Ce = import_react.forwardRef((r, o) => {
	let { children: n, label: u = "Suggestions", ...c } = r, d = import_react.useRef(null), f = import_react.useRef(null), p = P((m) => m.selectedItemId), b = K();
	return import_react.useEffect(() => {
		if (f.current && d.current) {
			let m = f.current, R = d.current, x, C = new ResizeObserver(() => {
				x = requestAnimationFrame(() => {
					let S = m.offsetHeight;
					R.style.setProperty("--cmdk-list-height", S.toFixed(1) + "px");
				});
			});
			return C.observe(m), () => {
				cancelAnimationFrame(x), C.unobserve(m);
			};
		}
	}, []), import_react.createElement(Primitive.div, {
		ref: composeRefs(d, o),
		...c,
		"cmdk-list": "",
		role: "listbox",
		tabIndex: -1,
		"aria-activedescendant": p,
		"aria-label": u,
		id: b.listId
	}, B(r, (m) => import_react.createElement("div", {
		ref: composeRefs(f, b.listInnerRef),
		"cmdk-list-sizer": ""
	}, m)));
}), xe = import_react.forwardRef((r, o) => {
	let { open: n, onOpenChange: u, overlayClassName: c, contentClassName: d, container: f, ...p } = r;
	return import_react.createElement(Root, {
		open: n,
		onOpenChange: u
	}, import_react.createElement(Portal, { container: f }, import_react.createElement(Overlay, {
		"cmdk-overlay": "",
		className: c
	}), import_react.createElement(Content, {
		"aria-label": r.label,
		"cmdk-dialog": "",
		className: d
	}, import_react.createElement(me, {
		ref: o,
		...p
	}))));
}), Ie = import_react.forwardRef((r, o) => P((u) => u.filtered.count === 0) ? import_react.createElement(Primitive.div, {
	ref: o,
	...r,
	"cmdk-empty": "",
	role: "presentation"
}) : null), Pe = import_react.forwardRef((r, o) => {
	let { progress: n, children: u, label: c = "Loading...", ...d } = r;
	return import_react.createElement(Primitive.div, {
		ref: o,
		...d,
		"cmdk-loading": "",
		role: "progressbar",
		"aria-valuenow": n,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": c
	}, B(r, (f) => import_react.createElement("div", { "aria-hidden": !0 }, f)));
}), _e = Object.assign(me, {
	List: Ce,
	Item: he,
	Input: Se,
	Group: Ee,
	Separator: ye,
	Dialog: xe,
	Empty: Ie,
	Loading: Pe
});
function we(r, o) {
	let n = r.nextElementSibling;
	for (; n;) {
		if (n.matches(o)) return n;
		n = n.nextElementSibling;
	}
}
function De(r, o) {
	let n = r.previousElementSibling;
	for (; n;) {
		if (n.matches(o)) return n;
		n = n.previousElementSibling;
	}
}
function pe(r) {
	let o = import_react.useRef(r);
	return k(() => {
		o.current = r;
	}), o;
}
var k = typeof window == "undefined" ? import_react.useEffect : import_react.useLayoutEffect;
function L(r) {
	let o = import_react.useRef();
	return o.current === void 0 && (o.current = r()), o;
}
function P(r) {
	let o = ee(), n = () => r(o.snapshot());
	return import_react.useSyncExternalStore(o.subscribe, n, n);
}
function ve(r, o, n, u = []) {
	let c = import_react.useRef(), d = K();
	return k(() => {
		var b;
		let f = (() => {
			var m;
			for (let R of n) {
				if (typeof R == "string") return R.trim();
				if (typeof R == "object" && "current" in R) return R.current ? (m = R.current.textContent) == null ? void 0 : m.trim() : c.current;
			}
		})(), p = u.map((m) => m.trim());
		d.value(r, f, p), (b = o.current) == null || b.setAttribute(T, f), c.current = f;
	}), c;
}
var ke = () => {
	let [r, o] = import_react.useState(), n = L(() => /* @__PURE__ */ new Map());
	return k(() => {
		n.current.forEach((u) => u()), n.current = /* @__PURE__ */ new Map();
	}, [r]), (u, c) => {
		n.current.set(u, c), o({});
	};
};
function Me(r) {
	let o = r.type;
	return typeof o == "function" ? o(r.props) : "render" in o ? o.render(r.props) : r;
}
function B({ asChild: r, children: o }, n) {
	return r && import_react.isValidElement(o) ? import_react.cloneElement(Me(o), { ref: o.ref }, n(o.props.children)) : n(o);
}
var Te = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0"
};
//#endregion
//#region src/components/ui/command.tsx
var import_jsx_runtime = require_jsx_runtime();
var Command = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
	"data-uid": "src/components/ui/command.tsx:14:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
	...props
}));
Command.displayName = _e.displayName;
var CommandInput = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-uid": "src/components/ui/command.tsx:41:3",
	"data-prohibitions": "[editContent]",
	className: "flex items-center border-b px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
		"data-uid": "src/components/ui/command.tsx:42:5",
		"data-prohibitions": "[editContent]",
		className: "mr-2 h-4 w-4 shrink-0 opacity-50"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
		"data-uid": "src/components/ui/command.tsx:43:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	})]
}));
CommandInput.displayName = _e.Input.displayName;
var CommandList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
	"data-uid": "src/components/ui/command.tsx:60:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
	...props
}));
CommandList.displayName = _e.List.displayName;
var CommandEmpty = import_react.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
	"data-uid": "src/components/ui/command.tsx:73:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: "py-6 text-center text-sm",
	...props
}));
CommandEmpty.displayName = _e.Empty.displayName;
var CommandGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
	"data-uid": "src/components/ui/command.tsx:82:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className),
	...props
}));
CommandGroup.displayName = _e.Group.displayName;
var CommandSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Separator, {
	"data-uid": "src/components/ui/command.tsx:98:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("-mx-1 h-px bg-border", className),
	...props
}));
CommandSeparator.displayName = _e.Separator.displayName;
var CommandItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
	"data-uid": "src/components/ui/command.tsx:110:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className),
	...props
}));
CommandItem.displayName = _e.Item.displayName;
var CommandShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/command.tsx:124:5",
		"data-prohibitions": "[editContent]",
		className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
		...props
	});
};
CommandShortcut.displayName = "CommandShortcut";
//#endregion
//#region src/services/barber_blocks.ts
var getBarberBlocks = (filter = "") => pb.collection("barber_blocks").getFullList({ filter });
var createBarberBlock = (data) => pb.collection("barber_blocks").create(data);
var deleteBarberBlock = (id) => pb.collection("barber_blocks").delete(id);
var updateBarberBlock = (id, data) => pb.collection("barber_blocks").update(id, data);
//#endregion
//#region src/pages/Agenda.tsx
var HOURS = Array.from({ length: 13 }, (_, i) => i + 8);
function Agenda() {
	const { user } = useAuth();
	const { toast } = useToast();
	const [data, setData] = (0, import_react.useState)({
		barbers: [],
		apts: [],
		clients: [],
		services: [],
		packages: []
	});
	const [blocks, setBlocks] = (0, import_react.useState)([]);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("week");
	const [agendaFormat, setAgendaFormat] = (0, import_react.useState)("grid");
	const [selectedDate, setSelectedDate] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const [barberFilter, setBarberFilter] = (0, import_react.useState)("all");
	const [blockDialogOpen, setBlockDialogOpen] = (0, import_react.useState)(false);
	const [blockForm, setBlockForm] = (0, import_react.useState)({
		barber_id: "",
		start_date: /* @__PURE__ */ new Date(),
		start_time: "09:00",
		end_date: /* @__PURE__ */ new Date(),
		end_time: "18:00",
		reason: ""
	});
	const [form, setForm] = (0, import_react.useState)({
		barber_id: "",
		client_id: "",
		item_id: "",
		time: "09:00",
		date: /* @__PURE__ */ new Date()
	});
	const [clientSearchOpen, setClientSearchOpen] = (0, import_react.useState)(false);
	const [newClient, setNewClient] = (0, import_react.useState)({
		name: "",
		phone: ""
	});
	const [newClientDialogOpen, setNewClientDialogOpen] = (0, import_react.useState)(false);
	const [detailOpen, setDetailOpen] = (0, import_react.useState)(false);
	const [selectedApt, setSelectedApt] = (0, import_react.useState)(null);
	const [isEditMode, setIsEditMode] = (0, import_react.useState)(false);
	const [editForm, setEditForm] = (0, import_react.useState)({
		barber_id: "",
		service_id: "",
		date: /* @__PURE__ */ new Date(),
		time: "",
		end_time: "",
		status: ""
	});
	const [editBlockForm, setEditBlockForm] = (0, import_react.useState)({
		barber_id: "",
		start_date: /* @__PURE__ */ new Date(),
		start_time: "09:00",
		end_date: /* @__PURE__ */ new Date(),
		end_time: "18:00",
		reason: ""
	});
	const loadData = async () => {
		let start, end;
		if (view === "day") {
			start = selectedDate;
			end = selectedDate;
		} else if (view === "week") {
			start = startOfWeek(selectedDate, { weekStartsOn: 0 });
			end = endOfWeek(selectedDate, { weekStartsOn: 0 });
		} else {
			start = startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 0 });
			end = endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 0 });
		}
		if (!isValid(start) || !isValid(end)) return;
		const startStr = format(start, "yyyy-MM-dd 00:00:00");
		const endStr = format(end, "yyyy-MM-dd 23:59:59");
		setData({
			barbers: await getBarbers(),
			apts: await getAppointments(`date >= "${startStr}" && date <= "${endStr}"`),
			clients: await getClients(),
			services: await getServices(),
			packages: await getClientPackages()
		});
		setBlocks(await getBarberBlocks(`start_time <= "${endStr}" && end_time >= "${startStr}"`));
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, [selectedDate, view]);
	useRealtime("appointments", loadData);
	useRealtime("product_purchases", loadData);
	useRealtime("payment_methods", loadData);
	useRealtime("barber_blocks", loadData);
	const canSeeAll = user?.access_level === "Admin" || user?.access_level === "Socio";
	const visibleBarbers = (0, import_react.useMemo)(() => canSeeAll ? data.barbers : data.barbers.filter((b) => b.user_id === user?.id || b.name === user?.name), [
		canSeeAll,
		data.barbers,
		user
	]);
	(0, import_react.useEffect)(() => {
		if (!canSeeAll && visibleBarbers.length > 0 && barberFilter === "all") setBarberFilter(visibleBarbers[0].id);
	}, [
		canSeeAll,
		visibleBarbers,
		barberFilter
	]);
	const handleOpen = (timeStr = "09:00", day = /* @__PURE__ */ new Date()) => {
		setForm({
			barber_id: canSeeAll ? "" : visibleBarbers[0]?.id || "",
			client_id: "",
			item_id: "",
			time: timeStr,
			date: day
		});
		setNewClient({
			name: "",
			phone: ""
		});
		setNewClientDialogOpen(false);
		setClientSearchOpen(false);
		setIsOpen(true);
	};
	const navigatePrev = () => {
		if (view === "day") setSelectedDate(subDays(selectedDate, 1));
		if (view === "week") setSelectedDate(subWeeks(selectedDate, 1));
		if (view === "month") setSelectedDate(subMonths(selectedDate, 1));
	};
	const navigateNext = () => {
		if (view === "day") setSelectedDate(addDays(selectedDate, 1));
		if (view === "week") setSelectedDate(addWeeks(selectedDate, 1));
		if (view === "month") setSelectedDate(addMonths(selectedDate, 1));
	};
	const handleCreateBlock = async () => {
		if (!blockForm.barber_id) return toast({
			title: "Selecione um profissional",
			variant: "destructive"
		});
		if (!blockForm.start_date || !blockForm.end_date) return toast({
			title: "Selecione as datas",
			variant: "destructive"
		});
		if (!isValid(blockForm.start_date) || !isValid(blockForm.end_date)) return toast({
			title: "Datas inválidas",
			variant: "destructive"
		});
		const [sh, sm] = blockForm.start_time.split(":").map(Number);
		const start = new Date(blockForm.start_date);
		start.setHours(sh, sm, 0, 0);
		const [eh, em] = blockForm.end_time.split(":").map(Number);
		const end = new Date(blockForm.end_date);
		end.setHours(eh, em, 0, 0);
		if (end <= start) return toast({
			title: "Data/Hora final deve ser maior que a inicial",
			variant: "destructive"
		});
		try {
			await createBarberBlock({
				barber_id: blockForm.barber_id,
				start_time: start.toISOString(),
				end_time: end.toISOString(),
				reason: blockForm.reason
			});
			toast({ title: "Horário bloqueado com sucesso!" });
			setBlockDialogOpen(false);
			loadData();
		} catch (err) {
			toast({
				title: getErrorMessage(err) || "Erro ao bloquear horário",
				variant: "destructive"
			});
		}
	};
	const handleUpdateBlock = async () => {
		if (!editBlockForm.barber_id) return toast({
			title: "Selecione um profissional",
			variant: "destructive"
		});
		if (!editBlockForm.start_date || !editBlockForm.end_date) return toast({
			title: "Selecione as datas",
			variant: "destructive"
		});
		if (!isValid(editBlockForm.start_date) || !isValid(editBlockForm.end_date)) return toast({
			title: "Datas inválidas",
			variant: "destructive"
		});
		const [sh, sm] = editBlockForm.start_time.split(":").map(Number);
		const start = new Date(editBlockForm.start_date);
		start.setHours(sh, sm, 0, 0);
		const [eh, em] = editBlockForm.end_time.split(":").map(Number);
		const end = new Date(editBlockForm.end_date);
		end.setHours(eh, em, 0, 0);
		if (end <= start) return toast({
			title: "Data/Hora final deve ser maior que a inicial",
			variant: "destructive"
		});
		try {
			await updateBarberBlock(selectedApt.id, {
				barber_id: editBlockForm.barber_id,
				start_time: start.toISOString(),
				end_time: end.toISOString(),
				reason: editBlockForm.reason
			});
			toast({ title: "Bloqueio atualizado com sucesso!" });
			setDetailOpen(false);
			loadData();
		} catch (err) {
			toast({
				title: getErrorMessage(err) || "Erro ao atualizar bloqueio",
				variant: "destructive"
			});
		}
	};
	const handleDeleteBlock = async (id) => {
		try {
			await deleteBarberBlock(id);
			toast({ title: "Bloqueio removido!" });
			setDetailOpen(false);
			loadData();
		} catch (err) {
			toast({
				title: getErrorMessage(err) || "Erro ao remover bloqueio",
				variant: "destructive"
			});
		}
	};
	const handleClientCreate = async () => {
		if (!newClient.name || !newClient.phone) return toast({
			title: "Preencha nome e celular",
			variant: "destructive"
		});
		try {
			const c = await createClient({
				...newClient,
				location_type: "nearby",
				is_active: true
			});
			setData((prev) => ({
				...prev,
				clients: [c, ...prev.clients]
			}));
			setForm((f) => ({
				...f,
				client_id: c.id
			}));
			setNewClientDialogOpen(false);
			toast({ title: "Cliente criado!" });
		} catch (err) {
			toast({
				title: getErrorMessage(err) || "Erro ao criar cliente",
				variant: "destructive"
			});
		}
	};
	const handleBooking = async () => {
		if (!form.client_id) return toast({
			title: "Selecione um cliente",
			variant: "destructive"
		});
		if (!form.item_id) return toast({
			title: "Selecione um serviço ou pacote",
			variant: "destructive"
		});
		if (!form.barber_id) return toast({
			title: "Selecione um profissional",
			variant: "destructive"
		});
		if (!form.date) return toast({
			title: "Selecione a data",
			variant: "destructive"
		});
		if (!form.time) return toast({
			title: "Selecione um horário",
			variant: "destructive"
		});
		if (!isValid(form.date)) return toast({
			title: "Data inválida",
			variant: "destructive"
		});
		try {
			const isPkg = form.item_id.startsWith("pkg_");
			const id = form.item_id.replace("pkg_", "").replace("svc_", "");
			const activePackage = isPkg ? data.packages.find((p) => p.id === id) : null;
			const svc = isPkg ? activePackage?.expand?.package_id?.expand?.service_id : data.services.find((s) => s.id === id);
			const svcId = isPkg ? activePackage?.expand?.package_id?.service_id || svc?.id : form.item_id.replace("svc_", "");
			const duration = activePackage?.expand?.package_id?.duration_minutes || svc?.duration_minutes || 30;
			const [h, m] = form.time.split(":").map(Number);
			const startDate = /* @__PURE__ */ new Date();
			startDate.setHours(h, m, 0, 0);
			const end_time = format(addMinutes(startDate, duration), "HH:mm");
			const payload = {
				barber_id: form.barber_id,
				client_id: form.client_id,
				service_id: svcId,
				time: form.time,
				end_time,
				date: format(form.date, "yyyy-MM-dd 12:00:00"),
				status: "Confirmado",
				price: isPkg ? 0 : svc?.price || 0
			};
			if (isPkg && activePackage) payload.client_package_id = activePackage.id;
			await createAppointment(payload);
			if (isPkg && activePackage) toast({ title: "Agendamento salvo. 1 crédito será deduzido no checkout." });
			else toast({ title: "Agendamento salvo!" });
			setIsOpen(false);
			loadData();
		} catch (err) {
			toast({
				title: getErrorMessage(err) || "Erro ao agendar",
				variant: "destructive"
			});
		}
	};
	const handleOpenDetail = (apt) => {
		setSelectedApt(apt);
		if (apt.isBlock) {
			const startDate = new Date(apt.original_start_time || apt.start_time);
			const endDate = new Date(apt.original_end_time || apt.end_time);
			setEditBlockForm({
				barber_id: apt.barber_id || "",
				start_date: isValid(startDate) ? startDate : /* @__PURE__ */ new Date(),
				start_time: isValid(startDate) ? format(startDate, "HH:mm") : "09:00",
				end_date: isValid(endDate) ? endDate : /* @__PURE__ */ new Date(),
				end_time: isValid(endDate) ? format(endDate, "HH:mm") : "18:00",
				reason: apt.reason || ""
			});
		} else {
			let parsedDate = /* @__PURE__ */ new Date();
			if (apt.date) {
				const d = new Date(apt.date);
				if (isValid(d)) parsedDate = d;
			}
			setEditForm({
				barber_id: apt.barber_id || "",
				service_id: apt.service_id || "",
				date: parsedDate,
				time: apt.time || "",
				end_time: apt.end_time || "",
				status: apt.status || "Confirmado"
			});
		}
		setIsEditMode(false);
		setDetailOpen(true);
	};
	const handleUpdateBooking = async () => {
		if (!editForm.barber_id || !editForm.service_id || !editForm.date || !editForm.time) return toast({
			title: "Preencha os campos obrigatórios.",
			variant: "destructive"
		});
		if (!isValid(editForm.date)) return toast({
			title: "Data inválida.",
			variant: "destructive"
		});
		try {
			const payload = {
				barber_id: editForm.barber_id,
				service_id: editForm.service_id,
				time: editForm.time,
				end_time: editForm.end_time,
				date: format(editForm.date, "yyyy-MM-dd 12:00:00"),
				status: editForm.status
			};
			await updateAppointment(selectedApt.id, payload);
			toast({ title: "Agendamento atualizado com sucesso!" });
			setDetailOpen(false);
			loadData();
		} catch (err) {
			toast({
				title: getErrorMessage(err) || "Erro ao atualizar",
				variant: "destructive"
			});
		}
	};
	const timeSlots = Array.from({ length: 52 }, (_, i) => {
		const h = Math.floor(i / 4) + 8;
		const m = i % 4 * 15;
		return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
	});
	const clientPkgs = data.packages.filter((p) => p.client_id === form.client_id && p.remaining_uses > 0 && (!p.expires_at || new Date(p.expires_at) >= /* @__PURE__ */ new Date()));
	const filteredApts = (0, import_react.useMemo)(() => {
		if (barberFilter === "all") return data.apts;
		return data.apts.filter((a) => a.barber_id === barberFilter);
	}, [data.apts, barberFilter]);
	const filteredBlocks = (0, import_react.useMemo)(() => {
		if (barberFilter === "all") return blocks;
		return blocks.filter((b) => b.barber_id === barberFilter);
	}, [blocks, barberFilter]);
	const getEventsForDay = (day) => {
		if (!isValid(day)) return [];
		const dayStr = format(day, "yyyy-MM-dd");
		const dayApts = filteredApts.filter((a) => a.date && a.date.startsWith(dayStr));
		const dStart = new Date(day);
		dStart.setHours(0, 0, 0, 0);
		const dEnd = new Date(day);
		dEnd.setHours(23, 59, 59, 999);
		const dayBlocks = filteredBlocks.filter((b) => {
			if (!b.start_time || !b.end_time) return false;
			const bStart = new Date(b.start_time);
			const bEnd = new Date(b.end_time);
			if (!isValid(bStart) || !isValid(bEnd)) return false;
			return bStart <= dEnd && bEnd >= dStart;
		}).map((b) => {
			const bStart = new Date(b.start_time);
			const bEnd = new Date(b.end_time);
			const isSameStartDay = isValid(bStart) && format(bStart, "yyyy-MM-dd") === dayStr;
			const isSameEndDay = isValid(bEnd) && format(bEnd, "yyyy-MM-dd") === dayStr;
			return {
				...b,
				isBlock: true,
				date: format(day, "yyyy-MM-dd 12:00:00"),
				time: isSameStartDay ? format(bStart, "HH:mm") : "08:00",
				end_time: isSameEndDay ? format(bEnd, "HH:mm") : "20:00",
				original_start_time: b.start_time,
				original_end_time: b.end_time,
				status: "Bloqueado",
				expand: { barber_id: data.barbers.find((barb) => barb.id === b.barber_id) }
			};
		});
		return [...dayApts, ...dayBlocks];
	};
	const renderDayColumn = (day) => {
		const eventsWithMins = getEventsForDay(day).map((apt) => {
			let status = apt.status;
			if (status === "Concluído" && apt.date) {
				const aptDateTime = /* @__PURE__ */ new Date(`${apt.date.split(" ")[0]}T${apt.time || "00:00"}`);
				if (isValid(aptDateTime) && aptDateTime > /* @__PURE__ */ new Date()) status = "Confirmado";
			}
			const [sH, sM] = (apt.time || "00:00").split(":").map(Number);
			const [eH, eM] = (apt.end_time || apt.time || "00:00").split(":").map(Number);
			const startMins = sH * 60 + sM;
			const durationMinutes = (eH - sH) * 60 + (eM - sM);
			const minDuration = apt.isBlock ? 15 : 30;
			const endMins = startMins + Math.max(15, durationMinutes > 0 ? durationMinutes : minDuration);
			return {
				...apt,
				status,
				startMins,
				endMins
			};
		}).sort((a, b) => a.startMins - b.startMins);
		const groups = [];
		let currentGroup = [];
		let groupEnd = 0;
		eventsWithMins.forEach((evt) => {
			if (currentGroup.length === 0) {
				currentGroup.push(evt);
				groupEnd = evt.endMins;
			} else if (evt.startMins < groupEnd) {
				currentGroup.push(evt);
				groupEnd = Math.max(groupEnd, evt.endMins);
			} else {
				groups.push(currentGroup);
				currentGroup = [evt];
				groupEnd = evt.endMins;
			}
		});
		if (currentGroup.length > 0) groups.push(currentGroup);
		const positionedEvents = [];
		groups.forEach((group) => {
			const cols = [];
			group.forEach((evt) => {
				let placed = false;
				for (let col of cols) if (col[col.length - 1].endMins <= evt.startMins) {
					col.push(evt);
					placed = true;
					break;
				}
				if (!placed) cols.push([evt]);
			});
			const numCols = cols.length;
			cols.forEach((col, colIndex) => {
				col.forEach((evt) => {
					positionedEvents.push({
						...evt,
						overlapIndex: colIndex,
						overlapCount: numCols
					});
				});
			});
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Agenda.tsx:581:7",
			"data-prohibitions": "[editContent]",
			className: "flex-1 border-r min-w-[120px] relative",
			children: [view === "week" && isValid(day) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Agenda.tsx:586:11",
				"data-prohibitions": "[editContent]",
				className: "h-12 border-b flex flex-col items-center justify-center bg-muted/20 sticky top-0 z-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/pages/Agenda.tsx:587:13",
					"data-prohibitions": "[editContent]",
					className: "text-xs uppercase font-medium",
					children: format(day, "EEE", { locale: ptBR })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/pages/Agenda.tsx:590:13",
					"data-prohibitions": "[editContent]",
					className: cn("text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center", isSameDay(day, /* @__PURE__ */ new Date()) ? "bg-primary text-primary-foreground" : ""),
					children: format(day, "dd")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Agenda.tsx:600:9",
				"data-prohibitions": "[editContent]",
				className: "relative",
				style: { height: HOURS.length * 60 },
				children: [HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Agenda.tsx:602:13",
					"data-prohibitions": "[editContent]",
					className: "h-[60px] border-b border-border/50 hover:bg-muted/10 cursor-pointer",
					onClick: () => handleOpen(`${h.toString().padStart(2, "0")}:00`, day)
				}, h)), positionedEvents.map((apt) => {
					const top = apt.startMins - 480;
					const height = apt.endMins - apt.startMins;
					const widthPct = 100 / apt.overlapCount;
					const leftPct = apt.overlapIndex * widthPct;
					const barberColor = apt.expand?.barber_id?.color || "hsl(var(--primary))";
					const isCanceled = apt.status === "Cancelado";
					const isCompleted = apt.status === "Concluído";
					const isFaltou = apt.status === "FALTOU";
					const isBlock = apt.isBlock;
					const bgColor = isFaltou ? "#000000" : isBlock ? "#e5e7eb" : barberColor;
					const textColor = isBlock ? "#374151" : getContrastColor(bgColor);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Agenda.tsx:625:15",
						"data-prohibitions": "[editContent]",
						className: cn("absolute rounded-sm p-1 overflow-hidden shadow-sm transition-all hover:scale-[1.02] cursor-pointer border border-black/5 flex flex-col gap-0.5", isCompleted ? "opacity-50" : "opacity-100", !isCompleted && isCanceled && "opacity-50 grayscale", isBlock && "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.03)_10px,rgba(0,0,0,0.03)_20px)] border-gray-300"),
						style: {
							top,
							height,
							left: `calc(${leftPct}% + 2px)`,
							width: `calc(${widthPct}% - 4px)`,
							backgroundColor: bgColor,
							color: textColor
						},
						onClick: (e) => {
							e.stopPropagation();
							handleOpenDetail(apt);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Agenda.tsx:647:17",
								"data-prohibitions": "[editContent]",
								className: "text-[10px] font-bold leading-none truncate",
								children: isBlock ? apt.reason || "Bloqueio" : `${apt.expand?.client_id?.name || ""} ${apt.expand?.client_id?.surname || ""}`
							}),
							!isBlock && height >= 45 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Agenda.tsx:653:19",
								"data-prohibitions": "[editContent]",
								className: "text-[9px] font-medium opacity-95 leading-none truncate",
								children: apt.expand?.service_id?.name || "Serviço"
							}),
							height >= 60 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Agenda.tsx:658:19",
								"data-prohibitions": "[editContent]",
								className: "text-[9px] opacity-80 leading-none font-medium truncate",
								children: [
									apt.time,
									" - ",
									apt.end_time || "--:--"
								]
							})
						]
					}, apt.id);
				})]
			})]
		}, isValid(day) ? day.toISOString() : Math.random());
	};
	const renderMonthView = () => {
		const days = eachDayOfInterval({
			start: startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 0 }),
			end: endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 0 })
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Agenda.tsx:677:7",
			"data-prohibitions": "[editContent]",
			className: "flex-1 flex flex-col min-h-0 bg-card rounded-md border overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Agenda.tsx:678:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-7 border-b bg-muted/20 shrink-0",
				children: [
					"Dom",
					"Seg",
					"Ter",
					"Qua",
					"Qui",
					"Sex",
					"Sáb"
				].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Agenda.tsx:680:13",
					"data-prohibitions": "[editContent]",
					className: "p-2 text-center text-xs font-semibold uppercase",
					children: d
				}, d))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
				"data-uid": "src/pages/Agenda.tsx:685:9",
				"data-prohibitions": "[editContent]",
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Agenda.tsx:686:11",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-7 min-h-full auto-rows-[minmax(120px,1fr)]",
					children: days.map((day) => {
						const events = getEventsForDay(day);
						const isToday = isValid(day) ? isSameDay(day, /* @__PURE__ */ new Date()) : false;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Agenda.tsx:691:17",
							"data-prohibitions": "[editContent]",
							className: cn("border-b border-r p-1 overflow-hidden hover:bg-muted/10 cursor-pointer flex flex-col", (!isValid(day) || !isSameMonth(day, selectedDate)) && "opacity-40"),
							onClick: () => {
								if (isValid(day)) {
									setSelectedDate(day);
									setView("day");
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Agenda.tsx:704:19",
								"data-prohibitions": "[editContent]",
								className: "text-right mb-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Agenda.tsx:705:21",
									"data-prohibitions": "[editContent]",
									className: cn("inline-flex items-center justify-center text-xs w-6 h-6 rounded-full", isToday ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground"),
									children: isValid(day) ? format(day, "d") : ""
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Agenda.tsx:716:19",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col gap-1 flex-1 overflow-hidden",
								children: [events.slice(0, 4).map((apt) => {
									let status = apt.status;
									if (status === "Concluído" && apt.date) {
										const aptDateTime = /* @__PURE__ */ new Date(`${apt.date.split(" ")[0]}T${apt.time || "00:00"}`);
										if (isValid(aptDateTime) && aptDateTime > /* @__PURE__ */ new Date()) status = "Confirmado";
									}
									const isCompleted = status === "Concluído";
									const isCanceled = status === "Cancelado";
									const isMissed = status === "FALTOU";
									const isBlock = apt.isBlock;
									const bgColor = isMissed ? "#000000" : isBlock ? "#e5e7eb" : apt.expand?.barber_id?.color || "hsl(var(--primary))";
									const textColor = isBlock ? "#374151" : getContrastColor(bgColor);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:742:25",
										"data-prohibitions": "[editContent]",
										className: cn("text-[8px] truncate px-1 py-0.5 mb-0.5 rounded-sm shadow-sm font-bold border border-black/5 leading-none flex flex-col gap-0.5", isCompleted ? "opacity-50" : "opacity-100", !isCompleted && isCanceled && "opacity-50 grayscale", isBlock && "border-gray-300"),
										style: {
											backgroundColor: bgColor,
											color: textColor
										},
										onClick: (e) => {
											e.stopPropagation();
											handleOpenDetail(apt);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Agenda.tsx:759:27",
											"data-prohibitions": "[editContent]",
											className: "truncate",
											children: isBlock ? apt.reason || "Bloqueio" : apt.expand?.client_id?.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Agenda.tsx:762:27",
											"data-prohibitions": "[editContent]",
											className: "truncate text-[7px] font-medium opacity-90",
											children: apt.time
										})]
									}, apt.id);
								}), events.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Agenda.tsx:769:23",
									"data-prohibitions": "[editContent]",
									className: "text-[10px] text-muted-foreground font-medium pl-1",
									children: [
										"+",
										events.length - 4,
										" mais"
									]
								})]
							})]
						}, isValid(day) ? day.toISOString() : Math.random());
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
					"data-uid": "src/pages/Agenda.tsx:778:11",
					"data-prohibitions": "[editContent]",
					orientation: "vertical"
				})]
			})]
		});
	};
	const renderGrid = () => {
		let daysToRender = [];
		if (view === "day") daysToRender = [selectedDate];
		if (view === "week") daysToRender = eachDayOfInterval({
			start: startOfWeek(selectedDate, { weekStartsOn: 0 }),
			end: endOfWeek(selectedDate, { weekStartsOn: 0 })
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
			"data-uid": "src/pages/Agenda.tsx:795:7",
			"data-prohibitions": "[editContent]",
			className: "flex-1 rounded-xl border bg-card/50 shadow-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Agenda.tsx:796:9",
					"data-prohibitions": "[editContent]",
					className: "flex min-w-[600px] h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Agenda.tsx:797:11",
						"data-prohibitions": "[editContent]",
						className: "w-16 border-r flex flex-col bg-background/95 backdrop-blur sticky left-0 z-30 shadow-[1px_0_5px_rgba(0,0,0,0.05)]",
						children: [view === "week" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Agenda.tsx:798:33",
							"data-prohibitions": "[editContent]",
							className: "h-12 border-b bg-muted/20 sticky top-0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Agenda.tsx:799:13",
							"data-prohibitions": "[editContent]",
							className: "relative",
							style: { height: HOURS.length * 60 },
							children: HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Agenda.tsx:801:17",
								"data-prohibitions": "[editContent]",
								className: "absolute w-full text-xs font-medium text-right pr-2 text-muted-foreground bg-background/80",
								style: { top: (h - 8) * 60 - 8 },
								children: [h.toString().padStart(2, "0"), ":00"]
							}, h))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/Agenda.tsx:811:11",
						"data-prohibitions": "[editContent]",
						className: "flex-1 flex",
						children: daysToRender.map(renderDayColumn)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
					"data-uid": "src/pages/Agenda.tsx:813:9",
					"data-prohibitions": "[editContent]",
					orientation: "horizontal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
					"data-uid": "src/pages/Agenda.tsx:814:9",
					"data-prohibitions": "[editContent]",
					orientation: "vertical"
				})
			]
		});
	};
	const renderListView = () => {
		let daysToRender = [];
		if (view === "day") daysToRender = [selectedDate];
		if (view === "week") daysToRender = eachDayOfInterval({
			start: startOfWeek(selectedDate, { weekStartsOn: 0 }),
			end: endOfWeek(selectedDate, { weekStartsOn: 0 })
		});
		if (view === "month") daysToRender = eachDayOfInterval({
			start: startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 0 }),
			end: endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 0 })
		});
		const allEvents = daysToRender.flatMap((day) => {
			return getEventsForDay(day).map((e) => ({
				...e,
				displayDate: day
			}));
		}).sort((a, b) => {
			const dateA = /* @__PURE__ */ new Date(`${a.date?.split(" ")[0] || ""}T${a.time || "00:00"}:00`);
			const dateB = /* @__PURE__ */ new Date(`${b.date?.split(" ")[0] || ""}T${b.time || "00:00"}:00`);
			return (isValid(dateA) ? dateA.getTime() : 0) - (isValid(dateB) ? dateB.getTime() : 0);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/Agenda.tsx:848:7",
			"data-prohibitions": "[editContent]",
			className: "flex-1 bg-card rounded-xl border shadow-inner overflow-hidden flex flex-col",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				"data-uid": "src/pages/Agenda.tsx:849:9",
				"data-prohibitions": "[editContent]",
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Agenda.tsx:850:11",
					"data-prohibitions": "[editContent]",
					className: "p-0 sm:p-4 space-y-1",
					children: allEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/Agenda.tsx:852:15",
						"data-prohibitions": "[]",
						className: "text-center text-muted-foreground py-10",
						children: "Nenhum agendamento encontrado no período."
					}) : allEvents.map((apt) => {
						let status = apt.status;
						if (status === "Concluído" && apt.date) {
							const aptDateTime = /* @__PURE__ */ new Date(`${apt.date.split(" ")[0]}T${apt.time || "00:00"}`);
							if (isValid(aptDateTime) && aptDateTime > /* @__PURE__ */ new Date()) status = "Confirmado";
						}
						const isCompleted = status === "Concluído";
						const isCanceled = status === "Cancelado";
						const isFaltou = status === "FALTOU";
						const isBlock = apt.isBlock;
						const barberColor = apt.expand?.barber_id?.color || "hsl(var(--primary))";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Agenda.tsx:872:19",
							"data-prohibitions": "[editContent]",
							className: cn("group relative flex items-center justify-between p-3 sm:p-4 border-b sm:border sm:rounded-xl hover:bg-muted/50 transition-colors cursor-pointer bg-card", isCompleted && "opacity-60", isCanceled && "opacity-50 grayscale", isFaltou && "border-red-900/20 bg-red-50/50 dark:bg-red-900/10", isBlock && "bg-muted/30 border-dashed"),
							onClick: () => handleOpenDetail(apt),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/Agenda.tsx:883:21",
									"data-prohibitions": "[editContent]",
									className: "absolute left-0 top-0 bottom-0 w-2 sm:rounded-l-xl",
									style: { backgroundColor: isBlock ? "#9ca3af" : barberColor }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Agenda.tsx:888:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-4 pl-3 py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:889:23",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col items-center justify-center w-16 h-14 bg-muted/30 rounded-md border shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Agenda.tsx:890:25",
											"data-prohibitions": "[editContent]",
											className: "text-sm font-extrabold text-foreground",
											children: apt.displayDate && isValid(apt.displayDate) ? format(apt.displayDate, "dd/MM") : ""
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Agenda.tsx:895:25",
											"data-prohibitions": "[editContent]",
											className: "text-xs font-bold text-foreground",
											children: apt.time
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:897:23",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col justify-center gap-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Agenda.tsx:898:25",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-sm text-foreground leading-none",
											children: isBlock ? apt.reason || "Período Bloqueado" : `${apt.expand?.client_id?.name || ""} ${apt.expand?.client_id?.surname || ""}`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:903:25",
											"data-prohibitions": "[editContent]",
											className: "text-[11px] font-medium text-muted-foreground flex items-center gap-2 mt-0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Agenda.tsx:904:27",
													"data-prohibitions": "[editContent]",
													children: isBlock ? apt.end_time ? `Até ${apt.end_time}` : "Bloqueio" : apt.expand?.service_id?.name || "Serviço"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Agenda.tsx:911:27",
													"data-prohibitions": "[editContent]",
													className: "w-1 h-1 rounded-full bg-border"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/Agenda.tsx:912:27",
													"data-prohibitions": "[editContent]",
													className: "flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/Agenda.tsx:913:29",
														"data-prohibitions": "[editContent]",
														className: "w-2 h-2 rounded-full shadow-sm",
														style: { backgroundColor: barberColor }
													}), apt.expand?.barber_id?.name || "Profissional"]
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/Agenda.tsx:923:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-4 pr-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Agenda.tsx:924:23",
										"data-prohibitions": "[editContent]",
										className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold shadow-sm", status === "Concluído" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : status === "Cancelado" ? "bg-rose-100 text-rose-800 border border-rose-200" : status === "FALTOU" ? "bg-red-600 text-white border border-red-700" : status === "Bloqueado" ? "bg-gray-100 text-gray-800 border border-gray-200" : "bg-amber-100 text-amber-800 border border-amber-200"),
										children: status
									})
								})
							]
						}, apt.id);
					})
				})
			})
		});
	};
	const headerLabel = isValid(selectedDate) ? view === "day" ? format(selectedDate, "dd 'de' MMMM, yyyy", { locale: ptBR }) : view === "week" ? `${format(startOfWeek(selectedDate, { weekStartsOn: 0 }), "dd MMM", { locale: ptBR })} - ${format(endOfWeek(selectedDate, { weekStartsOn: 0 }), "dd MMM, yyyy", { locale: ptBR })}` : format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR }) : "Data Inválida";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Agenda.tsx:960:5",
		"data-prohibitions": "[editContent]",
		className: "h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col space-y-4 max-w-7xl mx-auto animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Agenda.tsx:961:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Agenda.tsx:962:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/Agenda.tsx:963:11",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold tracking-tight hidden md:block",
						children: "Agenda"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Agenda.tsx:964:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Agenda.tsx:965:13",
								"data-prohibitions": "[]",
								variant: "outline",
								size: "sm",
								onClick: () => setSelectedDate(/* @__PURE__ */ new Date()),
								children: "Hoje"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Agenda.tsx:968:13",
								"data-prohibitions": "[]",
								className: "flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/Agenda.tsx:969:15",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									className: "size-8",
									onClick: navigatePrev,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
										"data-uid": "src/pages/Agenda.tsx:970:17",
										"data-prohibitions": "[editContent]",
										className: "size-4"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/Agenda.tsx:972:15",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									className: "size-8",
									onClick: navigateNext,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
										"data-uid": "src/pages/Agenda.tsx:973:17",
										"data-prohibitions": "[editContent]",
										className: "size-4"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Agenda.tsx:976:13",
								"data-prohibitions": "[editContent]",
								className: "text-base font-medium capitalize ml-2",
								children: headerLabel
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Agenda.tsx:980:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-3 overflow-x-auto pb-1 md:pb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/Agenda.tsx:981:11",
							"data-prohibitions": "[editContent]",
							value: barberFilter,
							onValueChange: setBarberFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/Agenda.tsx:982:13",
								"data-prohibitions": "[]",
								className: "w-[160px] h-9 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/Agenda.tsx:983:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Profissional"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/pages/Agenda.tsx:985:13",
								"data-prohibitions": "[editContent]",
								children: [canSeeAll && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/Agenda.tsx:986:29",
									"data-prohibitions": "[]",
									value: "all",
									children: "Todos"
								}), visibleBarbers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/Agenda.tsx:988:17",
									"data-prohibitions": "[editContent]",
									value: b.id,
									children: b.name
								}, b.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
							"data-uid": "src/pages/Agenda.tsx:995:11",
							"data-prohibitions": "[]",
							value: view,
							onValueChange: (v) => setView(v),
							className: "w-[160px] md:w-[200px] shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								"data-uid": "src/pages/Agenda.tsx:1000:13",
								"data-prohibitions": "[]",
								className: "grid w-full grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										"data-uid": "src/pages/Agenda.tsx:1001:15",
										"data-prohibitions": "[]",
										value: "day",
										children: "Dia"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										"data-uid": "src/pages/Agenda.tsx:1002:15",
										"data-prohibitions": "[]",
										value: "week",
										children: "Sem"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										"data-uid": "src/pages/Agenda.tsx:1003:15",
										"data-prohibitions": "[]",
										value: "month",
										children: "Mês"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
							"data-uid": "src/pages/Agenda.tsx:1007:11",
							"data-prohibitions": "[]",
							value: agendaFormat,
							onValueChange: (v) => setAgendaFormat(v),
							className: "w-[120px] md:w-[140px] shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								"data-uid": "src/pages/Agenda.tsx:1012:13",
								"data-prohibitions": "[]",
								className: "grid w-full grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/Agenda.tsx:1013:15",
									"data-prohibitions": "[]",
									value: "grid",
									children: "Grid"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/Agenda.tsx:1014:15",
									"data-prohibitions": "[]",
									value: "list",
									children: "Lista"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/Agenda.tsx:1018:11",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: () => setBlockDialogOpen(true),
							className: "gap-2 shrink-0 hidden md:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
									"data-uid": "src/pages/Agenda.tsx:1023:13",
									"data-prohibitions": "[editContent]",
									className: "size-4"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Agenda.tsx:1023:49",
									"data-prohibitions": "[]",
									children: "Bloquear"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/Agenda.tsx:1026:11",
							"data-prohibitions": "[]",
							onClick: () => handleOpen(),
							className: "gap-2 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									"data-uid": "src/pages/Agenda.tsx:1027:13",
									"data-prohibitions": "[editContent]",
									className: "size-4"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Agenda.tsx:1027:41",
									"data-prohibitions": "[]",
									className: "hidden sm:inline",
									children: "Agendar"
								})
							]
						})
					]
				})]
			}),
			agendaFormat === "list" ? renderListView() : view === "month" ? renderMonthView() : renderGrid(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Agenda.tsx:1039:7",
				"data-prohibitions": "[editContent]",
				open: isOpen,
				onOpenChange: setIsOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Agenda.tsx:1040:9",
					"data-prohibitions": "[editContent]",
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/Agenda.tsx:1041:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/Agenda.tsx:1042:13",
								"data-prohibitions": "[]",
								children: "Novo Agendamento"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Agenda.tsx:1044:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Agenda.tsx:1045:13",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Agenda.tsx:1046:15",
										"data-prohibitions": "[]",
										children: "Cliente"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1047:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
											"data-uid": "src/pages/Agenda.tsx:1048:17",
											"data-prohibitions": "[editContent]",
											open: clientSearchOpen,
											onOpenChange: setClientSearchOpen,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
												"data-uid": "src/pages/Agenda.tsx:1049:19",
												"data-prohibitions": "[editContent]",
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													"data-uid": "src/pages/Agenda.tsx:1050:21",
													"data-prohibitions": "[editContent]",
													variant: "outline",
													role: "combobox",
													className: "flex-1 justify-between",
													children: [form.client_id ? data.clients.find((c) => c.id === form.client_id)?.name : "Buscar cliente...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
														"data-uid": "src/pages/Agenda.tsx:1054:23",
														"data-prohibitions": "[editContent]",
														className: "ml-2 size-4 shrink-0 opacity-50"
													})]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
												"data-uid": "src/pages/Agenda.tsx:1057:19",
												"data-prohibitions": "[editContent]",
												className: "w-[380px] p-0",
												style: { zIndex: 9999 },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
													"data-uid": "src/pages/Agenda.tsx:1058:21",
													"data-prohibitions": "[editContent]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
														"data-uid": "src/pages/Agenda.tsx:1059:23",
														"data-prohibitions": "[editContent]",
														placeholder: "Buscar nome ou telefone..."
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
														"data-uid": "src/pages/Agenda.tsx:1060:23",
														"data-prohibitions": "[editContent]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
															"data-uid": "src/pages/Agenda.tsx:1061:25",
															"data-prohibitions": "[]",
															children: "Nenhum cliente encontrado."
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
															"data-uid": "src/pages/Agenda.tsx:1062:25",
															"data-prohibitions": "[editContent]",
															children: data.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
																"data-uid": "src/pages/Agenda.tsx:1064:29",
																"data-prohibitions": "[editContent]",
																value: `${c.name} ${c.phone}`,
																onSelect: () => {
																	const updates = { client_id: c.id };
																	if (c.preferred_barber_id) updates.barber_id = c.preferred_barber_id;
																	setForm({
																		...form,
																		...updates
																	});
																	setClientSearchOpen(false);
																},
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
																		"data-uid": "src/pages/Agenda.tsx:1076:31",
																		"data-prohibitions": "[editContent]",
																		className: cn("mr-2 size-4", form.client_id === c.id ? "opacity-100" : "opacity-0")
																	}),
																	c.name,
																	" ",
																	c.surname || "",
																	" (",
																	c.phone,
																	")"
																]
															}, c.id))
														})]
													})]
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/Agenda.tsx:1090:17",
											"data-prohibitions": "[]",
											variant: "outline",
											size: "icon",
											className: "shrink-0",
											onClick: () => {
												setNewClient({
													name: "",
													phone: ""
												});
												setNewClientDialogOpen(true);
											},
											title: "Novo Cliente",
											type: "button",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
												"data-uid": "src/pages/Agenda.tsx:1101:19",
												"data-prohibitions": "[editContent]",
												className: "size-4"
											})
										})]
									})]
								}),
								clientPkgs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Agenda.tsx:1107:15",
									"data-prohibitions": "[]",
									className: "text-xs bg-amber-500/10 text-amber-600 p-2 rounded flex items-center font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										"data-uid": "src/pages/Agenda.tsx:1108:17",
										"data-prohibitions": "[editContent]",
										className: "size-3 mr-1"
									}), " Pacote Ativo Encontrado! Use-o abaixo."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Agenda.tsx:1112:13",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Agenda.tsx:1113:15",
										"data-prohibitions": "[]",
										children: "Serviço ou Pacote"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/Agenda.tsx:1114:15",
										"data-prohibitions": "[editContent]",
										value: form.item_id,
										onValueChange: (v) => setForm({
											...form,
											item_id: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/Agenda.tsx:1115:17",
											"data-prohibitions": "[editContent]",
											className: clientPkgs.length > 0 ? "border-amber-400" : "",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/Agenda.tsx:1116:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Selecione..."
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/Agenda.tsx:1118:17",
											"data-prohibitions": "[editContent]",
											children: [clientPkgs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, {
												"data-uid": "src/pages/Agenda.tsx:1120:21",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel, {
													"data-uid": "src/pages/Agenda.tsx:1121:23",
													"data-prohibitions": "[]",
													className: "text-amber-500 font-bold",
													children: "Pacotes do Cliente"
												}), clientPkgs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
													"data-uid": "src/pages/Agenda.tsx:1125:25",
													"data-prohibitions": "[editContent]",
													value: `pkg_${p.id}`,
													children: [
														p.expand?.package_id?.name,
														" (Restam: ",
														p.remaining_uses,
														")"
													]
												}, `pkg_${p.id}`))]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectGroup, {
												"data-uid": "src/pages/Agenda.tsx:1131:19",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel, {
													"data-uid": "src/pages/Agenda.tsx:1132:21",
													"data-prohibitions": "[]",
													children: "Serviços Avulsos"
												}), data.services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
													"data-uid": "src/pages/Agenda.tsx:1134:23",
													"data-prohibitions": "[editContent]",
													value: `svc_${s.id}`,
													children: [
														s.name,
														" - R$",
														s.price
													]
												}, `svc_${s.id}`))]
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Agenda.tsx:1143:13",
									"data-prohibitions": "[editContent]",
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1144:15",
										"data-prohibitions": "[editContent]",
										className: "space-y-2 flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Agenda.tsx:1145:17",
											"data-prohibitions": "[]",
											children: "Data"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
											"data-uid": "src/pages/Agenda.tsx:1146:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
												"data-uid": "src/pages/Agenda.tsx:1147:19",
												"data-prohibitions": "[editContent]",
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													"data-uid": "src/pages/Agenda.tsx:1148:21",
													"data-prohibitions": "[editContent]",
													variant: "outline",
													className: cn("w-full justify-start text-left font-normal", !form.date && "text-muted-foreground"),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
														"data-uid": "src/pages/Agenda.tsx:1155:23",
														"data-prohibitions": "[editContent]",
														className: "mr-2 size-4"
													}), form.date && isValid(form.date) ? format(form.date, "dd/MM/yyyy", { locale: ptBR }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/Agenda.tsx:1159:25",
														"data-prohibitions": "[]",
														children: "Selecione"
													})]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
												"data-uid": "src/pages/Agenda.tsx:1163:19",
												"data-prohibitions": "[]",
												className: "w-auto p-0",
												style: { zIndex: 9999 },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
													"data-uid": "src/pages/Agenda.tsx:1164:21",
													"data-prohibitions": "[editContent]",
													mode: "single",
													selected: form.date,
													onSelect: (d) => d && setForm({
														...form,
														date: d
													}),
													initialFocus: true
												})
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1174:15",
										"data-prohibitions": "[editContent]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Agenda.tsx:1175:17",
											"data-prohibitions": "[]",
											children: "Horário"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/Agenda.tsx:1176:17",
											"data-prohibitions": "[editContent]",
											value: form.time,
											onValueChange: (v) => setForm({
												...form,
												time: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/Agenda.tsx:1177:19",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/Agenda.tsx:1178:21",
													"data-prohibitions": "[editContent]"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/Agenda.tsx:1180:19",
												"data-prohibitions": "[editContent]",
												className: "max-h-[200px]",
												children: timeSlots.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Agenda.tsx:1182:23",
													"data-prohibitions": "[editContent]",
													value: t,
													children: t
												}, t))
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Agenda.tsx:1191:13",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Agenda.tsx:1192:15",
										"data-prohibitions": "[]",
										children: "Profissional"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/Agenda.tsx:1193:15",
										"data-prohibitions": "[editContent]",
										value: form.barber_id,
										onValueChange: (v) => setForm({
											...form,
											barber_id: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/Agenda.tsx:1197:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/Agenda.tsx:1198:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Selecione..."
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
											"data-uid": "src/pages/Agenda.tsx:1200:17",
											"data-prohibitions": "[editContent]",
											children: data.barbers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Agenda.tsx:1202:21",
												"data-prohibitions": "[editContent]",
												value: b.id,
												children: b.name
											}, b.id))
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							"data-uid": "src/pages/Agenda.tsx:1210:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Agenda.tsx:1211:13",
								"data-prohibitions": "[]",
								onClick: handleBooking,
								className: "w-full",
								children: "Confirmar Agendamento"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Agenda.tsx:1219:7",
				"data-prohibitions": "[]",
				open: newClientDialogOpen,
				onOpenChange: setNewClientDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Agenda.tsx:1220:9",
					"data-prohibitions": "[]",
					className: "max-w-sm",
					style: { zIndex: 1e4 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/Agenda.tsx:1221:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/Agenda.tsx:1222:13",
								"data-prohibitions": "[]",
								children: "Novo Cliente"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Agenda.tsx:1224:11",
							"data-prohibitions": "[]",
							className: "space-y-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Agenda.tsx:1225:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/Agenda.tsx:1226:15",
									"data-prohibitions": "[]",
									children: "Nome"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/Agenda.tsx:1227:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Nome do cliente",
									value: newClient.name,
									onChange: (e) => setNewClient({
										...newClient,
										name: e.target.value
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Agenda.tsx:1233:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/Agenda.tsx:1234:15",
									"data-prohibitions": "[]",
									children: "Celular"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/Agenda.tsx:1235:15",
									"data-prohibitions": "[editContent]",
									placeholder: "(00) 00000-0000",
									value: newClient.phone,
									onChange: (e) => setNewClient({
										...newClient,
										phone: e.target.value
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							"data-uid": "src/pages/Agenda.tsx:1242:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Agenda.tsx:1243:13",
								"data-prohibitions": "[]",
								onClick: handleClientCreate,
								className: "w-full",
								children: "Salvar Cliente"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Agenda.tsx:1251:7",
				"data-prohibitions": "[editContent]",
				open: blockDialogOpen,
				onOpenChange: setBlockDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Agenda.tsx:1252:9",
					"data-prohibitions": "[editContent]",
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/Agenda.tsx:1253:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/Agenda.tsx:1254:13",
								"data-prohibitions": "[]",
								children: "Bloquear Horário"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/Agenda.tsx:1255:13",
								"data-prohibitions": "[]",
								children: "Selecione o período para bloquear a agenda."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Agenda.tsx:1257:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Agenda.tsx:1258:13",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Agenda.tsx:1259:15",
										"data-prohibitions": "[]",
										children: "Profissional"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/Agenda.tsx:1260:15",
										"data-prohibitions": "[editContent]",
										value: blockForm.barber_id,
										onValueChange: (v) => setBlockForm({
											...blockForm,
											barber_id: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/Agenda.tsx:1264:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/Agenda.tsx:1265:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Selecione..."
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
											"data-uid": "src/pages/Agenda.tsx:1267:17",
											"data-prohibitions": "[editContent]",
											children: visibleBarbers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Agenda.tsx:1269:21",
												"data-prohibitions": "[editContent]",
												value: b.id,
												children: b.name
											}, b.id))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Agenda.tsx:1277:13",
									"data-prohibitions": "[editContent]",
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1278:15",
										"data-prohibitions": "[editContent]",
										className: "space-y-2 flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Agenda.tsx:1279:17",
											"data-prohibitions": "[]",
											children: "Data Inicial"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
											"data-uid": "src/pages/Agenda.tsx:1280:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
												"data-uid": "src/pages/Agenda.tsx:1281:19",
												"data-prohibitions": "[editContent]",
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													"data-uid": "src/pages/Agenda.tsx:1282:21",
													"data-prohibitions": "[editContent]",
													variant: "outline",
													className: cn("w-full justify-start text-left font-normal", !blockForm.start_date && "text-muted-foreground"),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
														"data-uid": "src/pages/Agenda.tsx:1289:23",
														"data-prohibitions": "[editContent]",
														className: "mr-2 size-4"
													}), blockForm.start_date && isValid(blockForm.start_date) ? format(blockForm.start_date, "dd/MM/yyyy", { locale: ptBR }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/Agenda.tsx:1293:25",
														"data-prohibitions": "[]",
														children: "Selecione"
													})]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
												"data-uid": "src/pages/Agenda.tsx:1297:19",
												"data-prohibitions": "[]",
												className: "w-auto p-0",
												style: { zIndex: 9999 },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
													"data-uid": "src/pages/Agenda.tsx:1298:21",
													"data-prohibitions": "[editContent]",
													mode: "single",
													selected: blockForm.start_date,
													onSelect: (d) => d && setBlockForm({
														...blockForm,
														start_date: d
													}),
													initialFocus: true
												})
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1307:15",
										"data-prohibitions": "[editContent]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Agenda.tsx:1308:17",
											"data-prohibitions": "[]",
											children: "Hora Inicial"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/Agenda.tsx:1309:17",
											"data-prohibitions": "[editContent]",
											value: blockForm.start_time,
											onValueChange: (v) => setBlockForm({
												...blockForm,
												start_time: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/Agenda.tsx:1313:19",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/Agenda.tsx:1314:21",
													"data-prohibitions": "[editContent]"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/Agenda.tsx:1316:19",
												"data-prohibitions": "[editContent]",
												className: "max-h-[200px]",
												children: timeSlots.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Agenda.tsx:1318:23",
													"data-prohibitions": "[editContent]",
													value: t,
													children: t
												}, t))
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Agenda.tsx:1327:13",
									"data-prohibitions": "[editContent]",
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1328:15",
										"data-prohibitions": "[editContent]",
										className: "space-y-2 flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Agenda.tsx:1329:17",
											"data-prohibitions": "[]",
											children: "Data Final"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
											"data-uid": "src/pages/Agenda.tsx:1330:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
												"data-uid": "src/pages/Agenda.tsx:1331:19",
												"data-prohibitions": "[editContent]",
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													"data-uid": "src/pages/Agenda.tsx:1332:21",
													"data-prohibitions": "[editContent]",
													variant: "outline",
													className: cn("w-full justify-start text-left font-normal", !blockForm.end_date && "text-muted-foreground"),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
														"data-uid": "src/pages/Agenda.tsx:1339:23",
														"data-prohibitions": "[editContent]",
														className: "mr-2 size-4"
													}), blockForm.end_date && isValid(blockForm.end_date) ? format(blockForm.end_date, "dd/MM/yyyy", { locale: ptBR }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/Agenda.tsx:1343:25",
														"data-prohibitions": "[]",
														children: "Selecione"
													})]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
												"data-uid": "src/pages/Agenda.tsx:1347:19",
												"data-prohibitions": "[]",
												className: "w-auto p-0",
												style: { zIndex: 9999 },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
													"data-uid": "src/pages/Agenda.tsx:1348:21",
													"data-prohibitions": "[editContent]",
													mode: "single",
													selected: blockForm.end_date,
													onSelect: (d) => d && setBlockForm({
														...blockForm,
														end_date: d
													}),
													initialFocus: true
												})
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1357:15",
										"data-prohibitions": "[editContent]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Agenda.tsx:1358:17",
											"data-prohibitions": "[]",
											children: "Hora Final"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/Agenda.tsx:1359:17",
											"data-prohibitions": "[editContent]",
											value: blockForm.end_time,
											onValueChange: (v) => setBlockForm({
												...blockForm,
												end_time: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/Agenda.tsx:1363:19",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/Agenda.tsx:1364:21",
													"data-prohibitions": "[editContent]"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/Agenda.tsx:1366:19",
												"data-prohibitions": "[editContent]",
												className: "max-h-[200px]",
												children: timeSlots.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Agenda.tsx:1368:23",
													"data-prohibitions": "[editContent]",
													value: t,
													children: t
												}, t))
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Agenda.tsx:1377:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Agenda.tsx:1378:15",
										"data-prohibitions": "[]",
										children: "Motivo (opcional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Agenda.tsx:1379:15",
										"data-prohibitions": "[editContent]",
										placeholder: "Ex: Almoço, Médico, Folga...",
										value: blockForm.reason,
										onChange: (e) => setBlockForm({
											...blockForm,
											reason: e.target.value
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							"data-uid": "src/pages/Agenda.tsx:1386:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Agenda.tsx:1387:13",
								"data-prohibitions": "[]",
								onClick: handleCreateBlock,
								className: "w-full",
								children: "Confirmar Bloqueio"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Agenda.tsx:1395:7",
				"data-prohibitions": "[editContent]",
				open: detailOpen,
				onOpenChange: setDetailOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Agenda.tsx:1396:9",
					"data-prohibitions": "[editContent]",
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/Agenda.tsx:1397:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/Agenda.tsx:1398:13",
								"data-prohibitions": "[editContent]",
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Agenda.tsx:1399:15",
									"data-prohibitions": "[editContent]",
									children: selectedApt?.isBlock ? isEditMode ? "Editar Bloqueio" : "Detalhes do Bloqueio" : isEditMode ? "Editar Agendamento" : "Detalhes do Agendamento"
								}), !isEditMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/Agenda.tsx:1409:17",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									onClick: () => setIsEditMode(true),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
										"data-uid": "src/pages/Agenda.tsx:1410:19",
										"data-prohibitions": "[editContent]",
										className: "size-4"
									})
								})]
							}), !isEditMode && selectedApt && !selectedApt.isBlock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/Agenda.tsx:1415:15",
								"data-prohibitions": "[]",
								children: "Informações do atendimento agendado."
							})]
						}),
						selectedApt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Agenda.tsx:1420:13",
							"data-prohibitions": "[editContent]",
							className: "py-4",
							children: selectedApt.isBlock ? !isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Agenda.tsx:1423:19",
								"data-prohibitions": "[editContent]",
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1424:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Agenda.tsx:1425:23",
											"data-prohibitions": "[]",
											className: "bg-primary/10 p-2 rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, {
												"data-uid": "src/pages/Agenda.tsx:1426:25",
												"data-prohibitions": "[editContent]",
												className: "size-5 text-primary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1428:23",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Agenda.tsx:1429:25",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Profissional"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Agenda.tsx:1430:25",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: selectedApt.expand?.barber_id?.name
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1433:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Agenda.tsx:1434:23",
											"data-prohibitions": "[]",
											className: "bg-primary/10 p-2 rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
												"data-uid": "src/pages/Agenda.tsx:1435:25",
												"data-prohibitions": "[editContent]",
												className: "size-5 text-primary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1437:23",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Agenda.tsx:1438:25",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Início"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Agenda.tsx:1439:25",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-foreground",
												children: (selectedApt.original_start_time || selectedApt.start_time) && isValid(new Date(selectedApt.original_start_time || selectedApt.start_time)) ? format(new Date(selectedApt.original_start_time || selectedApt.start_time), "dd/MM/yyyy HH:mm") : "N/A"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1452:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Agenda.tsx:1453:23",
											"data-prohibitions": "[]",
											className: "bg-primary/10 p-2 rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
												"data-uid": "src/pages/Agenda.tsx:1454:25",
												"data-prohibitions": "[editContent]",
												className: "size-5 text-primary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1456:23",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Agenda.tsx:1457:25",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Fim"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Agenda.tsx:1458:25",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-foreground",
												children: (selectedApt.original_end_time || selectedApt.end_time) && isValid(new Date(selectedApt.original_end_time || selectedApt.end_time)) ? format(new Date(selectedApt.original_end_time || selectedApt.end_time), "dd/MM/yyyy HH:mm") : "N/A"
											})]
										})]
									}),
									selectedApt.reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1470:23",
										"data-prohibitions": "[editContent]",
										className: "bg-muted p-3 rounded-md mt-4 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/pages/Agenda.tsx:1471:25",
												"data-prohibitions": "[]",
												children: "Motivo:"
											}),
											" ",
											selectedApt.reason
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/Agenda.tsx:1474:21",
										"data-prohibitions": "[]",
										className: "pt-4 border-t mt-4 flex justify-between",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/Agenda.tsx:1475:23",
											"data-prohibitions": "[]",
											variant: "destructive",
											onClick: () => handleDeleteBlock(selectedApt.id),
											children: "Remover Bloqueio"
										})
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Agenda.tsx:1484:19",
								"data-prohibitions": "[editContent]",
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1485:21",
										"data-prohibitions": "[editContent]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Agenda.tsx:1486:23",
											"data-prohibitions": "[]",
											children: "Profissional"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/Agenda.tsx:1487:23",
											"data-prohibitions": "[editContent]",
											value: editBlockForm.barber_id,
											onValueChange: (v) => setEditBlockForm({
												...editBlockForm,
												barber_id: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/Agenda.tsx:1491:25",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/Agenda.tsx:1492:27",
													"data-prohibitions": "[editContent]",
													placeholder: "Selecione..."
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/Agenda.tsx:1494:25",
												"data-prohibitions": "[editContent]",
												children: visibleBarbers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Agenda.tsx:1496:29",
													"data-prohibitions": "[editContent]",
													value: b.id,
													children: b.name
												}, b.id))
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1504:21",
										"data-prohibitions": "[editContent]",
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1505:23",
											"data-prohibitions": "[editContent]",
											className: "space-y-2 flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Agenda.tsx:1506:25",
												"data-prohibitions": "[]",
												children: "Data Inicial"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
												"data-uid": "src/pages/Agenda.tsx:1507:25",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
													"data-uid": "src/pages/Agenda.tsx:1508:27",
													"data-prohibitions": "[editContent]",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														"data-uid": "src/pages/Agenda.tsx:1509:29",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: cn("w-full justify-start text-left font-normal", !editBlockForm.start_date && "text-muted-foreground"),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
															"data-uid": "src/pages/Agenda.tsx:1516:31",
															"data-prohibitions": "[editContent]",
															className: "mr-2 size-4"
														}), editBlockForm.start_date && isValid(editBlockForm.start_date) ? format(editBlockForm.start_date, "dd/MM/yyyy", { locale: ptBR }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/Agenda.tsx:1520:33",
															"data-prohibitions": "[]",
															children: "Selecione"
														})]
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
													"data-uid": "src/pages/Agenda.tsx:1524:27",
													"data-prohibitions": "[]",
													className: "w-auto p-0",
													style: { zIndex: 9999 },
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
														"data-uid": "src/pages/Agenda.tsx:1525:29",
														"data-prohibitions": "[editContent]",
														mode: "single",
														selected: editBlockForm.start_date,
														onSelect: (d) => d && setEditBlockForm({
															...editBlockForm,
															start_date: d
														}),
														initialFocus: true
													})
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1536:23",
											"data-prohibitions": "[editContent]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Agenda.tsx:1537:25",
												"data-prohibitions": "[]",
												children: "Hora Inicial"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/Agenda.tsx:1538:25",
												"data-prohibitions": "[editContent]",
												value: editBlockForm.start_time,
												onValueChange: (v) => setEditBlockForm({
													...editBlockForm,
													start_time: v
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/Agenda.tsx:1544:27",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/Agenda.tsx:1545:29",
														"data-prohibitions": "[editContent]"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
													"data-uid": "src/pages/Agenda.tsx:1547:27",
													"data-prohibitions": "[editContent]",
													className: "max-h-[200px]",
													children: timeSlots.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Agenda.tsx:1549:31",
														"data-prohibitions": "[editContent]",
														value: t,
														children: t
													}, t))
												})]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1558:21",
										"data-prohibitions": "[editContent]",
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1559:23",
											"data-prohibitions": "[editContent]",
											className: "space-y-2 flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Agenda.tsx:1560:25",
												"data-prohibitions": "[]",
												children: "Data Final"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
												"data-uid": "src/pages/Agenda.tsx:1561:25",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
													"data-uid": "src/pages/Agenda.tsx:1562:27",
													"data-prohibitions": "[editContent]",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														"data-uid": "src/pages/Agenda.tsx:1563:29",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: cn("w-full justify-start text-left font-normal", !editBlockForm.end_date && "text-muted-foreground"),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
															"data-uid": "src/pages/Agenda.tsx:1570:31",
															"data-prohibitions": "[editContent]",
															className: "mr-2 size-4"
														}), editBlockForm.end_date && isValid(editBlockForm.end_date) ? format(editBlockForm.end_date, "dd/MM/yyyy", { locale: ptBR }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/Agenda.tsx:1574:33",
															"data-prohibitions": "[]",
															children: "Selecione"
														})]
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
													"data-uid": "src/pages/Agenda.tsx:1578:27",
													"data-prohibitions": "[]",
													className: "w-auto p-0",
													style: { zIndex: 9999 },
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
														"data-uid": "src/pages/Agenda.tsx:1579:29",
														"data-prohibitions": "[editContent]",
														mode: "single",
														selected: editBlockForm.end_date,
														onSelect: (d) => d && setEditBlockForm({
															...editBlockForm,
															end_date: d
														}),
														initialFocus: true
													})
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1590:23",
											"data-prohibitions": "[editContent]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Agenda.tsx:1591:25",
												"data-prohibitions": "[]",
												children: "Hora Final"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/Agenda.tsx:1592:25",
												"data-prohibitions": "[editContent]",
												value: editBlockForm.end_time,
												onValueChange: (v) => setEditBlockForm({
													...editBlockForm,
													end_time: v
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/Agenda.tsx:1596:27",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/Agenda.tsx:1597:29",
														"data-prohibitions": "[editContent]"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
													"data-uid": "src/pages/Agenda.tsx:1599:27",
													"data-prohibitions": "[editContent]",
													className: "max-h-[200px]",
													children: timeSlots.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Agenda.tsx:1601:31",
														"data-prohibitions": "[editContent]",
														value: t,
														children: t
													}, t))
												})]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1610:21",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Agenda.tsx:1611:23",
											"data-prohibitions": "[]",
											children: "Motivo (opcional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/Agenda.tsx:1612:23",
											"data-prohibitions": "[editContent]",
											placeholder: "Ex: Almoço, Médico, Folga...",
											value: editBlockForm.reason,
											onChange: (e) => setEditBlockForm({
												...editBlockForm,
												reason: e.target.value
											})
										})]
									})
								]
							}) : !isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Agenda.tsx:1623:17",
								"data-prohibitions": "[editContent]",
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1624:19",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Agenda.tsx:1625:21",
											"data-prohibitions": "[]",
											className: "bg-primary/10 p-2 rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
												"data-uid": "src/pages/Agenda.tsx:1626:23",
												"data-prohibitions": "[editContent]",
												className: "size-5 text-primary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1628:21",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Agenda.tsx:1629:23",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Cliente"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Agenda.tsx:1630:23",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-lg",
												children: selectedApt.expand?.client_id?.name
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1633:19",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Agenda.tsx:1634:21",
											"data-prohibitions": "[]",
											className: "bg-primary/10 p-2 rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, {
												"data-uid": "src/pages/Agenda.tsx:1635:23",
												"data-prohibitions": "[editContent]",
												className: "size-5 text-primary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1637:21",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Agenda.tsx:1638:23",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Serviço / Profissional"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												"data-uid": "src/pages/Agenda.tsx:1639:23",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: [
													selectedApt.expand?.service_id?.name,
													" com",
													" ",
													selectedApt.expand?.barber_id?.name
												]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1645:19",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Agenda.tsx:1646:21",
											"data-prohibitions": "[]",
											className: "bg-primary/10 p-2 rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
												"data-uid": "src/pages/Agenda.tsx:1647:23",
												"data-prohibitions": "[editContent]",
												className: "size-5 text-primary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1649:21",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Agenda.tsx:1650:23",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Data e Hora"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												"data-uid": "src/pages/Agenda.tsx:1651:23",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: [
													selectedApt.date && isValid(new Date(selectedApt.date)) ? format(new Date(selectedApt.date), "dd/MM/yyyy") : "N/A",
													" ",
													"• ",
													selectedApt.time || "--:--",
													" às ",
													selectedApt.end_time || "--:--"
												]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1659:19",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Agenda.tsx:1660:21",
											"data-prohibitions": "[]",
											className: "bg-primary/10 p-2 rounded-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
												"data-uid": "src/pages/Agenda.tsx:1661:23",
												"data-prohibitions": "[editContent]",
												className: "size-5 text-primary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1663:21",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Agenda.tsx:1664:23",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground",
												children: "Status"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Agenda.tsx:1665:23",
												"data-prohibitions": "[editContent]",
												className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", selectedApt.status === "Concluído" ? "bg-green-100 text-green-800" : selectedApt.status === "Cancelado" ? "bg-red-100 text-red-800" : selectedApt.status === "FALTOU" ? "bg-red-600 text-white" : "bg-yellow-100 text-yellow-800"),
												children: selectedApt.status
											})]
										})]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Agenda.tsx:1683:17",
								"data-prohibitions": "[editContent]",
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1684:19",
										"data-prohibitions": "[editContent]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Agenda.tsx:1685:21",
											"data-prohibitions": "[]",
											children: "Profissional"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/Agenda.tsx:1686:21",
											"data-prohibitions": "[editContent]",
											value: editForm.barber_id,
											onValueChange: (v) => setEditForm({
												...editForm,
												barber_id: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/Agenda.tsx:1690:23",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/Agenda.tsx:1691:25",
													"data-prohibitions": "[editContent]",
													placeholder: "Selecione o profissional"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/Agenda.tsx:1693:23",
												"data-prohibitions": "[editContent]",
												children: data.barbers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Agenda.tsx:1695:27",
													"data-prohibitions": "[editContent]",
													value: b.id,
													children: b.name
												}, b.id))
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1702:19",
										"data-prohibitions": "[editContent]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Agenda.tsx:1703:21",
											"data-prohibitions": "[]",
											children: "Serviço"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/Agenda.tsx:1704:21",
											"data-prohibitions": "[editContent]",
											value: editForm.service_id,
											onValueChange: (v) => setEditForm({
												...editForm,
												service_id: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/Agenda.tsx:1708:23",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/Agenda.tsx:1709:25",
													"data-prohibitions": "[editContent]",
													placeholder: "Selecione o serviço"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/Agenda.tsx:1711:23",
												"data-prohibitions": "[editContent]",
												children: data.services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Agenda.tsx:1713:27",
													"data-prohibitions": "[editContent]",
													value: s.id,
													children: s.name
												}, s.id))
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1720:19",
										"data-prohibitions": "[editContent]",
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1721:21",
											"data-prohibitions": "[editContent]",
											className: "space-y-2 flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Agenda.tsx:1722:23",
												"data-prohibitions": "[]",
												children: "Data"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
												"data-uid": "src/pages/Agenda.tsx:1723:23",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
													"data-uid": "src/pages/Agenda.tsx:1724:25",
													"data-prohibitions": "[editContent]",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														"data-uid": "src/pages/Agenda.tsx:1725:27",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: cn("w-full justify-start text-left font-normal", !editForm.date && "text-muted-foreground"),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
															"data-uid": "src/pages/Agenda.tsx:1732:29",
															"data-prohibitions": "[editContent]",
															className: "mr-2 size-4"
														}), editForm.date && isValid(editForm.date) ? format(editForm.date, "dd/MM/yyyy", { locale: ptBR }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/Agenda.tsx:1736:31",
															"data-prohibitions": "[]",
															children: "Selecione"
														})]
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
													"data-uid": "src/pages/Agenda.tsx:1740:25",
													"data-prohibitions": "[]",
													className: "w-auto p-0",
													style: { zIndex: 9999 },
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
														"data-uid": "src/pages/Agenda.tsx:1741:27",
														"data-prohibitions": "[editContent]",
														mode: "single",
														selected: editForm.date,
														onSelect: (d) => d && setEditForm({
															...editForm,
															date: d
														}),
														initialFocus: true
													})
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1750:21",
											"data-prohibitions": "[editContent]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Agenda.tsx:1751:23",
												"data-prohibitions": "[]",
												children: "Início"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/Agenda.tsx:1752:23",
												"data-prohibitions": "[editContent]",
												value: editForm.time,
												onValueChange: (v) => setEditForm({
													...editForm,
													time: v
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/Agenda.tsx:1756:25",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/Agenda.tsx:1757:27",
														"data-prohibitions": "[editContent]"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
													"data-uid": "src/pages/Agenda.tsx:1759:25",
													"data-prohibitions": "[editContent]",
													className: "max-h-[200px]",
													children: timeSlots.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Agenda.tsx:1761:29",
														"data-prohibitions": "[editContent]",
														value: t,
														children: t
													}, t))
												})]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Agenda.tsx:1769:19",
										"data-prohibitions": "[editContent]",
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1770:21",
											"data-prohibitions": "[editContent]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Agenda.tsx:1771:23",
												"data-prohibitions": "[]",
												children: "Fim"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/Agenda.tsx:1772:23",
												"data-prohibitions": "[editContent]",
												value: editForm.end_time,
												onValueChange: (v) => setEditForm({
													...editForm,
													end_time: v
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/Agenda.tsx:1776:25",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/Agenda.tsx:1777:27",
														"data-prohibitions": "[editContent]"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
													"data-uid": "src/pages/Agenda.tsx:1779:25",
													"data-prohibitions": "[editContent]",
													className: "max-h-[200px]",
													children: timeSlots.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Agenda.tsx:1781:29",
														"data-prohibitions": "[editContent]",
														value: t,
														children: t
													}, t))
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Agenda.tsx:1788:21",
											"data-prohibitions": "[]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Agenda.tsx:1789:23",
												"data-prohibitions": "[]",
												children: "Status"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/Agenda.tsx:1790:23",
												"data-prohibitions": "[]",
												value: editForm.status,
												onValueChange: (v) => setEditForm({
													...editForm,
													status: v
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/Agenda.tsx:1794:25",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/Agenda.tsx:1795:27",
														"data-prohibitions": "[editContent]"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/Agenda.tsx:1797:25",
													"data-prohibitions": "[]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/Agenda.tsx:1798:27",
															"data-prohibitions": "[]",
															value: "Pendente",
															children: "Pendente"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/Agenda.tsx:1799:27",
															"data-prohibitions": "[]",
															value: "Confirmado",
															children: "Confirmado"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/Agenda.tsx:1800:27",
															"data-prohibitions": "[]",
															value: "Concluído",
															children: "Concluído"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/Agenda.tsx:1801:27",
															"data-prohibitions": "[]",
															value: "Cancelado",
															children: "Cancelado"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/Agenda.tsx:1802:27",
															"data-prohibitions": "[]",
															value: "FALTOU",
															children: "FALTOU"
														})
													]
												})]
											})]
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							"data-uid": "src/pages/Agenda.tsx:1812:11",
							"data-prohibitions": "[editContent]",
							className: "sm:justify-end gap-2",
							children: isEditMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Agenda.tsx:1815:17",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setIsEditMode(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Agenda.tsx:1818:17",
								"data-prohibitions": "[]",
								onClick: selectedApt?.isBlock ? handleUpdateBlock : handleUpdateBooking,
								children: "Salvar Alterações"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Agenda.tsx:1823:15",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setDetailOpen(false),
								children: "Fechar"
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Agenda as default };

//# sourceMappingURL=Agenda-GU2yI-a0.js.map