import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { t as Eye } from "./eye-BMR6jbHp.js";
import { t as ImportDialog } from "./ImportDialog-DBk1o44b.js";
import { t as SquarePen } from "./square-pen-CbubaXUu.js";
import { n as ToggleGroupItem, r as TriangleAlert, t as ToggleGroup } from "./toggle-group-BAa8Ii4o.js";
import { t as Upload } from "./upload-DFmTZ3N7.js";
import { D as Root, E as Item, H as cn, I as Input, K as phoneMask, L as Button, O as createRovingFocusGroupScope, Q as Circle, S as DialogTitle, W as getContrastColor, _ as Dialog, a as pb, at as createLucideIcon, b as DialogFooter, c as SelectContent, ct as useControllableState, dt as createContextScope, f as SelectTrigger, gt as Link, ht as useToast, i as useAuth, k as useDirection, lt as Presence, m as usePrevious, mt as composeEventHandlers, n as useRealtime, p as SelectValue, pt as useComposedRefs, r as usePermissions, s as Select, t as Label, u as SelectItem, ut as Primitive, v as DialogContent, x as DialogHeader, z as useSize } from "./index-DGvWxLYe.js";
import { t as format } from "./format-CWjaJ3sL.js";
import { t as startOfMonth } from "./startOfMonth-CxgXnncx.js";
import { t as subDays } from "./subDays-DKB-5ZOP.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-HKzXS95f.js";
import { a as getBarbers, c as getClientLogs, m as getProductPurchases, n as createClient, r as getAppointments, u as getClients, y as updateClient } from "./api-BrcyTEI5.js";
import { n as CardContent, t as Card } from "./card-Bbf0jma7.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-p-co-SvT.js";
import { t as Badge } from "./badge-eoS9dLww.js";
import { t as Switch } from "./switch-gM5hiLtR.js";
var ArrowUpRight = createLucideIcon("arrow-up-right", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]);
var Medal = createLucideIcon("medal", [
	["path", {
		d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
		key: "143lza"
	}],
	["path", {
		d: "M11 12 5.12 2.2",
		key: "qhuxz6"
	}],
	["path", {
		d: "m13 12 5.88-9.8",
		key: "hbye0f"
	}],
	["path", {
		d: "M8 7h8",
		key: "i86dvs"
	}],
	["circle", {
		cx: "12",
		cy: "17",
		r: "5",
		key: "qbz8iq"
	}],
	["path", {
		d: "M12 18v-2h-.5",
		key: "fawc4q"
	}]
]);
var Star = createLucideIcon("star", [["path", {
	d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
	key: "r04s7s"
}]]);
var UserPlus = createLucideIcon("user-plus", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["line", {
		x1: "19",
		x2: "19",
		y1: "8",
		y2: "14",
		key: "1bvyxn"
	}],
	["line", {
		x1: "22",
		x2: "16",
		y1: "11",
		y2: "11",
		key: "1shjgl"
	}]
]);
//#endregion
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/@radix-ui+react-radio-group@1.3.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+_cd32cc5d3acab82c80f5f32482bb55d0/node_modules/@radix-ui/react-radio-group/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadio, name, checked = false, required, disabled, value = "on", onCheck, form, ...radioProps } = props;
	const [button, setButton] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = button ? form || !!button.closest("form") : true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioProvider, {
		scope: __scopeRadio,
		checked,
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "radio",
			"aria-checked": checked,
			"data-state": getState(checked),
			"data-disabled": disabled ? "" : void 0,
			disabled,
			value,
			...radioProps,
			ref: composedRefs,
			onClick: composeEventHandlers(props.onClick, (event) => {
				if (!checked) onCheck?.();
				if (isFormControl) {
					hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
					if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
				}
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioBubbleInput, {
			control: button,
			bubbles: !hasConsumerStoppedPropagationRef.current,
			name,
			value,
			checked,
			required,
			disabled,
			form,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadio, forceMount, ...indicatorProps } = props;
	const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			"data-state": getState(context.checked),
			"data-disabled": context.disabled ? "" : void 0,
			...indicatorProps,
			ref: forwardedRef
		})
	});
});
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = import_react.forwardRef(({ __scopeRadio, control, checked, bubbles = true, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(ref, forwardedRef);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = ref.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			setChecked.call(input, checked);
			input.dispatchEvent(event);
		}
	}, [
		prevChecked,
		checked,
		bubbles
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		type: "radio",
		"aria-hidden": true,
		defaultChecked: checked,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
	return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext, createRadioGroupScope] = createContextScope(RADIO_GROUP_NAME, [createRovingFocusGroupScope, createRadioScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, name, defaultValue, value: valueProp, required = false, disabled = false, orientation, dir, loop = true, onValueChange, ...groupProps } = props;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? null,
		onChange: onValueChange,
		caller: RADIO_GROUP_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupProvider, {
		scope: __scopeRadioGroup,
		name,
		required,
		disabled,
		value,
		onValueChange: setValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			asChild: true,
			...rovingFocusGroupScope,
			orientation,
			dir: direction,
			loop,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				role: "radiogroup",
				"aria-required": required,
				"aria-orientation": orientation,
				"data-disabled": disabled ? "" : void 0,
				dir: direction,
				...groupProps,
				ref: forwardedRef
			})
		})
	});
});
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, disabled, ...itemProps } = props;
	const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
	const isDisabled = context.disabled || disabled;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
	const radioScope = useRadioScope(__scopeRadioGroup);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const checked = context.value === itemProps.value;
	const isArrowKeyPressedRef = import_react.useRef(false);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (ARROW_KEYS.includes(event.key)) isArrowKeyPressedRef.current = true;
		};
		const handleKeyUp = () => isArrowKeyPressedRef.current = false;
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !isDisabled,
		active: checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
			disabled: isDisabled,
			required: context.required,
			checked,
			...radioScope,
			...itemProps,
			name: context.name,
			ref: composedRefs,
			onCheck: () => context.onValueChange(itemProps.value),
			onKeyDown: composeEventHandlers((event) => {
				if (event.key === "Enter") event.preventDefault();
			}),
			onFocus: composeEventHandlers(itemProps.onFocus, () => {
				if (isArrowKeyPressedRef.current) ref.current?.click();
			})
		})
	});
});
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, ...indicatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioIndicator, {
		...useRadioScope(__scopeRadioGroup),
		...indicatorProps,
		ref: forwardedRef
	});
});
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
//#endregion
//#region src/components/ui/radio-group.tsx
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-uid": "src/components/ui/radio-group.tsx:12:10",
		"data-prohibitions": "[editContent]",
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = Root2.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		"data-uid": "src/components/ui/radio-group.tsx:21:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			"data-uid": "src/components/ui/radio-group.tsx:29:7",
			"data-prohibitions": "[]",
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
				"data-uid": "src/components/ui/radio-group.tsx:30:9",
				"data-prohibitions": "[editContent]",
				className: "h-2.5 w-2.5 fill-current text-current"
			})
		})
	});
});
RadioGroupItem.displayName = Item2.displayName;
//#endregion
//#region src/components/RankingDashboard.tsx
function RankingDashboard() {
	const [period, setPeriod] = (0, import_react.useState)("current_month");
	const [clientsData, setClientsData] = (0, import_react.useState)([]);
	const [itemsData, setItemsData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [metric, setMetric] = (0, import_react.useState)("revenue");
	const [itemMetric, setItemMetric] = (0, import_react.useState)("Qtd");
	const [refreshKey, setRefreshKey] = (0, import_react.useState)(0);
	const reload = () => setRefreshKey((k) => k + 1);
	useRealtime("appointments", reload);
	useRealtime("product_purchases", reload);
	useRealtime("client_logs", reload);
	(0, import_react.useEffect)(() => {
		async function loadData() {
			setLoading(true);
			try {
				const now = /* @__PURE__ */ new Date();
				let startDate = startOfMonth(now);
				if (period === "last_3_months") startDate = subDays(now, 90);
				if (period === "last_6_months") startDate = subDays(now, 180);
				const createdFilter = `created >= '${format(startDate, "yyyy-MM-dd") + " 00:00:00.000Z"}'`;
				const [clients, appointments, purchases, logs, servicesList, productsList] = await Promise.all([
					getClients(),
					getAppointments(createdFilter),
					getProductPurchases(createdFilter),
					getClientLogs(`event_type = 'no_show' && ${createdFilter}`),
					pb.collection("services").getFullList(),
					pb.collection("products").getFullList()
				]);
				const statsMap = {};
				const itemStats = {};
				clients.forEach((c) => {
					statsMap[c.id] = {
						client: c,
						totalSpent: 0,
						totalVisits: 0,
						noShows: 0
					};
				});
				appointments.forEach((app) => {
					if (app.status === "Concluído") {
						if (app.client_id && statsMap[app.client_id]) {
							statsMap[app.client_id].totalSpent += app.price || app.expand?.service_id?.price || 0;
							statsMap[app.client_id].totalVisits += 1;
						}
						if (app.service_id) {
							if (!itemStats[app.service_id]) {
								const svc = servicesList.find((s) => s.id === app.service_id);
								itemStats[app.service_id] = {
									id: app.service_id,
									name: svc?.name || "Serviço",
									type: "Serviço",
									qtd: 0,
									vlr: 0
								};
							}
							itemStats[app.service_id].qtd += 1;
							itemStats[app.service_id].vlr += app.price || app.expand?.service_id?.price || 0;
						}
					}
				});
				purchases.forEach((p) => {
					if (p.client_id && statsMap[p.client_id]) statsMap[p.client_id].totalSpent += p.price_at_sale || 0;
					if (p.product_id) {
						if (!itemStats[p.product_id]) {
							const prod = productsList.find((pr) => pr.id === p.product_id);
							itemStats[p.product_id] = {
								id: p.product_id,
								name: prod?.name || "Produto",
								type: "Produto",
								qtd: 0,
								vlr: 0
							};
						}
						itemStats[p.product_id].qtd += 1;
						itemStats[p.product_id].vlr += p.price_at_sale || 0;
					}
				});
				logs.forEach((log) => {
					if (statsMap[log.client_id]) statsMap[log.client_id].noShows += 1;
				});
				setClientsData(Object.values(statsMap));
				setItemsData(Object.values(itemStats));
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
		loadData();
	}, [period, refreshKey]);
	const topCustomers = (0, import_react.useMemo)(() => {
		const data = clientsData.filter((c) => c.totalVisits > 0 || c.totalSpent > 0);
		if (metric === "revenue") return data.sort((a, b) => b.totalSpent - a.totalSpent);
		return data.sort((a, b) => b.totalVisits - a.totalVisits);
	}, [clientsData, metric]);
	const noShowCustomers = (0, import_react.useMemo)(() => {
		return clientsData.filter((c) => c.noShows > 0).sort((a, b) => b.noShows - a.noShows);
	}, [clientsData]);
	const topItems = (0, import_react.useMemo)(() => {
		const data = [...itemsData];
		if (itemMetric === "Vlr") return data.sort((a, b) => b.vlr - a.vlr).slice(0, 10);
		return data.sort((a, b) => b.qtd - a.qtd).slice(0, 10);
	}, [itemsData, itemMetric]);
	const maxSpent = Math.max(...clientsData.map((c) => c.totalSpent), 1);
	const maxVisits = Math.max(...clientsData.map((c) => c.totalVisits), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/RankingDashboard.tsx:159:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			"data-uid": "src/components/RankingDashboard.tsx:160:7",
			"data-prohibitions": "[editContent]",
			defaultValue: "top",
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/RankingDashboard.tsx:161:9",
					"data-prohibitions": "[]",
					className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/components/RankingDashboard.tsx:162:11",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/components/RankingDashboard.tsx:163:13",
								"data-prohibitions": "[]",
								value: "top",
								children: "Top Clientes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/components/RankingDashboard.tsx:164:13",
								"data-prohibitions": "[]",
								value: "items",
								children: "Itens mais vendidos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/components/RankingDashboard.tsx:165:13",
								"data-prohibitions": "[]",
								value: "noshow",
								children: "Análise de Faltas"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/components/RankingDashboard.tsx:168:11",
						"data-prohibitions": "[]",
						value: period,
						onValueChange: setPeriod,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/components/RankingDashboard.tsx:169:13",
							"data-prohibitions": "[]",
							className: "w-[180px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/components/RankingDashboard.tsx:170:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Período"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							"data-uid": "src/components/RankingDashboard.tsx:172:13",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/components/RankingDashboard.tsx:173:15",
									"data-prohibitions": "[]",
									value: "current_month",
									children: "Mês Atual"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/components/RankingDashboard.tsx:174:15",
									"data-prohibitions": "[]",
									value: "last_3_months",
									children: "Últimos 3 Meses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/components/RankingDashboard.tsx:175:15",
									"data-prohibitions": "[]",
									value: "last_6_months",
									children: "Últimos 6 Meses"
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					"data-uid": "src/components/RankingDashboard.tsx:180:9",
					"data-prohibitions": "[editContent]",
					value: "top",
					className: "space-y-4 mt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/RankingDashboard.tsx:181:11",
						"data-prohibitions": "[]",
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroup, {
							"data-uid": "src/components/RankingDashboard.tsx:182:13",
							"data-prohibitions": "[]",
							type: "single",
							value: metric,
							onValueChange: (v) => {
								if (v) setMetric(v);
							},
							className: "bg-muted p-1 rounded-md border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
								"data-uid": "src/components/RankingDashboard.tsx:190:15",
								"data-prohibitions": "[]",
								value: "revenue",
								className: "px-4 font-medium text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-background data-[state=on]:shadow-sm",
								children: "Faturamento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
								"data-uid": "src/components/RankingDashboard.tsx:196:15",
								"data-prohibitions": "[]",
								value: "frequency",
								className: "px-4 font-medium text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-background data-[state=on]:shadow-sm",
								children: "Atendimento"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/components/RankingDashboard.tsx:204:11",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/components/RankingDashboard.tsx:205:13",
							"data-prohibitions": "[editContent]",
							className: "p-0 overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/components/RankingDashboard.tsx:206:15",
								"data-prohibitions": "[editContent]",
								className: "min-w-[600px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/components/RankingDashboard.tsx:207:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:208:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:209:21",
												"data-prohibitions": "[]",
												children: "Cliente"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:210:21",
												"data-prohibitions": "[]",
												className: "text-right",
												children: "Total Gasto"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:211:21",
												"data-prohibitions": "[]",
												className: "text-center",
												children: "Visitas"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:212:21",
												"data-prohibitions": "[]",
												className: "text-center",
												children: "Status"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
									"data-uid": "src/components/RankingDashboard.tsx:215:17",
									"data-prohibitions": "[editContent]",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:217:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/components/RankingDashboard.tsx:218:23",
											"data-prohibitions": "[]",
											colSpan: 4,
											className: "text-center py-8",
											children: "Carregando..."
										})
									}) : topCustomers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:223:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/components/RankingDashboard.tsx:224:23",
											"data-prohibitions": "[]",
											colSpan: 4,
											className: "text-center py-8 text-muted-foreground",
											children: "Nenhum dado encontrado para o período."
										})
									}) : topCustomers.slice(0, 7).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:230:23",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:231:25",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/components/RankingDashboard.tsx:232:27",
													"data-prohibitions": "[editContent]",
													className: "flex flex-col",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
														"data-uid": "src/components/RankingDashboard.tsx:233:29",
														"data-prohibitions": "[editContent]",
														to: `/clientes/${row.client.id}`,
														className: "font-medium hover:underline text-primary flex items-center gap-1",
														children: [
															row.client.name || "Cliente",
															" ",
															row.client.surname || "",
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
																"data-uid": "src/components/RankingDashboard.tsx:238:31",
																"data-prohibitions": "[editContent]",
																className: "size-3"
															})
														]
													}), row.client.expand?.preferred_barber_id?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														"data-uid": "src/components/RankingDashboard.tsx:241:31",
														"data-prohibitions": "[editContent]",
														className: "text-xs text-muted-foreground mt-0.5",
														children: ["Profissional: ", row.client.expand.preferred_barber_id.name]
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:247:25",
												"data-prohibitions": "[editContent]",
												className: "text-right",
												children: new Intl.NumberFormat("pt-BR", {
													style: "currency",
													currency: "BRL"
												}).format(row.totalSpent)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:253:25",
												"data-prohibitions": "[editContent]",
												className: "text-center",
												children: row.totalVisits
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:254:25",
												"data-prohibitions": "[editContent]",
												className: "text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/components/RankingDashboard.tsx:255:27",
													"data-prohibitions": "[editContent]",
													className: "flex justify-center gap-2",
													children: [
														row.totalSpent >= maxSpent * .7 && row.totalSpent > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
															"data-uid": "src/components/RankingDashboard.tsx:257:31",
															"data-prohibitions": "[]",
															className: "bg-amber-500 hover:bg-amber-600 gap-1 text-white",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, {
																"data-uid": "src/components/RankingDashboard.tsx:258:33",
																"data-prohibitions": "[editContent]",
																className: "size-3"
															}), " VIP"]
														}),
														row.totalVisits >= maxVisits * .7 && row.totalVisits > 0 && row.totalSpent < maxSpent * .7 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
															"data-uid": "src/components/RankingDashboard.tsx:264:33",
															"data-prohibitions": "[]",
															variant: "secondary",
															className: "gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
																"data-uid": "src/components/RankingDashboard.tsx:265:35",
																"data-prohibitions": "[editContent]",
																className: "size-3"
															}), " Frequente"]
														}),
														row.noShows > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															"data-uid": "src/components/RankingDashboard.tsx:268:49",
															"data-prohibitions": "[]",
															variant: "destructive",
															children: "Risco de Fuga"
														})
													]
												})
											})
										]
									}, row.client.id))
								})]
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					"data-uid": "src/components/RankingDashboard.tsx:280:9",
					"data-prohibitions": "[editContent]",
					value: "items",
					className: "space-y-4 mt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/RankingDashboard.tsx:281:11",
						"data-prohibitions": "[]",
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroup, {
							"data-uid": "src/components/RankingDashboard.tsx:282:13",
							"data-prohibitions": "[]",
							type: "single",
							value: itemMetric,
							onValueChange: (v) => {
								if (v) setItemMetric(v);
							},
							className: "bg-muted p-1 rounded-md border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
								"data-uid": "src/components/RankingDashboard.tsx:290:15",
								"data-prohibitions": "[]",
								value: "Qtd",
								className: "px-4 font-medium text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-background data-[state=on]:shadow-sm",
								children: "Qtd"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
								"data-uid": "src/components/RankingDashboard.tsx:296:15",
								"data-prohibitions": "[]",
								value: "Vlr",
								className: "px-4 font-medium text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-background data-[state=on]:shadow-sm",
								children: "Vlr"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/components/RankingDashboard.tsx:304:11",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/components/RankingDashboard.tsx:305:13",
							"data-prohibitions": "[editContent]",
							className: "p-0 overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/components/RankingDashboard.tsx:306:15",
								"data-prohibitions": "[editContent]",
								className: "min-w-[600px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/components/RankingDashboard.tsx:307:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:308:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:309:21",
												"data-prohibitions": "[]",
												children: "Item"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:310:21",
												"data-prohibitions": "[]",
												className: "text-center",
												children: "Tipo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:311:21",
												"data-prohibitions": "[]",
												className: "text-center",
												children: "Quantidade"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:312:21",
												"data-prohibitions": "[]",
												className: "text-right",
												children: "Valor Total"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
									"data-uid": "src/components/RankingDashboard.tsx:315:17",
									"data-prohibitions": "[editContent]",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:317:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/components/RankingDashboard.tsx:318:23",
											"data-prohibitions": "[]",
											colSpan: 4,
											className: "text-center py-8",
											children: "Carregando..."
										})
									}) : topItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:323:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/components/RankingDashboard.tsx:324:23",
											"data-prohibitions": "[]",
											colSpan: 4,
											className: "text-center py-8 text-muted-foreground",
											children: "Nenhum dado encontrado para o período."
										})
									}) : topItems.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:330:23",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:331:25",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-primary",
												children: row.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:332:25",
												"data-prohibitions": "[editContent]",
												className: "text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/components/RankingDashboard.tsx:333:27",
													"data-prohibitions": "[editContent]",
													variant: "outline",
													className: row.type === "Serviço" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-purple-50 text-purple-700 border-purple-200",
													children: row.type
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:344:25",
												"data-prohibitions": "[editContent]",
												className: "text-center font-bold",
												children: row.qtd
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:345:25",
												"data-prohibitions": "[editContent]",
												className: "text-right",
												children: new Intl.NumberFormat("pt-BR", {
													style: "currency",
													currency: "BRL"
												}).format(row.vlr)
											})
										]
									}, row.id))
								})]
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/components/RankingDashboard.tsx:360:9",
					"data-prohibitions": "[editContent]",
					value: "noshow",
					className: "space-y-4 mt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/components/RankingDashboard.tsx:361:11",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/components/RankingDashboard.tsx:362:13",
							"data-prohibitions": "[editContent]",
							className: "p-0 overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/components/RankingDashboard.tsx:363:15",
								"data-prohibitions": "[editContent]",
								className: "min-w-[600px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/components/RankingDashboard.tsx:364:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:365:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:366:21",
												"data-prohibitions": "[]",
												children: "Cliente"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:367:21",
												"data-prohibitions": "[]",
												className: "text-center",
												children: "Faltas"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:368:21",
												"data-prohibitions": "[]",
												className: "text-center",
												children: "Visitas Realizadas"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/components/RankingDashboard.tsx:369:21",
												"data-prohibitions": "[]",
												className: "text-center",
												children: "Status"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
									"data-uid": "src/components/RankingDashboard.tsx:372:17",
									"data-prohibitions": "[editContent]",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:374:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/components/RankingDashboard.tsx:375:23",
											"data-prohibitions": "[]",
											colSpan: 4,
											className: "text-center py-8",
											children: "Carregando..."
										})
									}) : noShowCustomers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:380:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/components/RankingDashboard.tsx:381:23",
											"data-prohibitions": "[]",
											colSpan: 4,
											className: "text-center py-8 text-muted-foreground",
											children: "Nenhum no-show registrado no período."
										})
									}) : noShowCustomers.slice(0, 7).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/components/RankingDashboard.tsx:387:23",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:388:25",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/components/RankingDashboard.tsx:389:27",
													"data-prohibitions": "[editContent]",
													className: "flex flex-col",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
														"data-uid": "src/components/RankingDashboard.tsx:390:29",
														"data-prohibitions": "[editContent]",
														to: `/clientes/${row.client.id}`,
														className: "font-medium hover:underline text-primary flex items-center gap-1",
														children: [
															row.client.name || "Cliente",
															" ",
															row.client.surname || "",
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
																"data-uid": "src/components/RankingDashboard.tsx:395:31",
																"data-prohibitions": "[editContent]",
																className: "size-3"
															})
														]
													}), row.client.expand?.preferred_barber_id?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														"data-uid": "src/components/RankingDashboard.tsx:398:31",
														"data-prohibitions": "[editContent]",
														className: "text-xs text-muted-foreground mt-0.5",
														children: ["Profissional: ", row.client.expand.preferred_barber_id.name]
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:404:25",
												"data-prohibitions": "[editContent]",
												className: "text-center font-bold text-destructive",
												children: row.noShows
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:407:25",
												"data-prohibitions": "[editContent]",
												className: "text-center",
												children: row.totalVisits
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/components/RankingDashboard.tsx:408:25",
												"data-prohibitions": "[editContent]",
												className: "text-center",
												children: row.noShows >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
													"data-uid": "src/components/RankingDashboard.tsx:410:29",
													"data-prohibitions": "[]",
													variant: "destructive",
													className: "gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
														"data-uid": "src/components/RankingDashboard.tsx:411:31",
														"data-prohibitions": "[editContent]",
														className: "size-3"
													}), " Atenção"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/components/RankingDashboard.tsx:414:29",
													"data-prohibitions": "[]",
													variant: "outline",
													children: "Monitorar"
												})
											})
										]
									}, row.client.id))
								})]
							})
						})
					})
				})
			]
		})
	});
}
//#endregion
//#region src/pages/Clientes.tsx
var defForm = {
	name: "",
	surname: "",
	phone: "",
	phone_secondary: "",
	email: "",
	birthday: "",
	location_type: "nearby",
	is_active: true,
	preferred_barber_id: ""
};
function Clientes() {
	const { user } = useAuth();
	const { hasAccess } = usePermissions();
	const [clients, setClients] = (0, import_react.useState)([]);
	const [barbers, setBarbers] = (0, import_react.useState)([]);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)(defForm);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [isImportOpen, setIsImportOpen] = (0, import_react.useState)(false);
	const { toast } = useToast();
	const handleImport = async (data) => {
		let success = 0;
		let errors = 0;
		const errorsList = [];
		const barbersMap = new Map(barbers.map((b) => [b.name.toLowerCase().trim(), b.id]));
		for (let i = 0; i < data.length; i++) {
			const row = data[i];
			try {
				const getCol = (r, keys) => {
					for (const k of Object.keys(r)) if (keys.includes(k.toLowerCase().trim())) return typeof r[k] === "string" ? r[k].trim() : String(r[k] || "");
					return "";
				};
				const name = getCol(row, ["nome"]);
				const surname = getCol(row, ["sobrenome"]);
				const phoneRaw = getCol(row, ["celular", "telefone"]);
				const phoneSecRaw = getCol(row, [
					"celular 2",
					"fone secundario",
					"telefone 2"
				]);
				const birthRaw = getCol(row, [
					"nascimento",
					"data de nascimento",
					"aniversario"
				]);
				const profRaw = getCol(row, [
					"profissional",
					"barbeiro",
					"atendente"
				]);
				const locRaw = getCol(row, [
					"localização",
					"localizacao",
					"local"
				]);
				if (!name) throw new Error("O campo [Nome] é obrigatório.");
				const cleanPhone = (p) => {
					if (!p) return "";
					return p.replace(/\D/g, "").slice(0, 11);
				};
				let birthday = "";
				if (birthRaw) {
					const raw = birthRaw.trim();
					const parts = raw.split("/");
					if (parts.length === 3) {
						const day = parseInt(parts[0], 10);
						const month = parseInt(parts[1], 10);
						const year = parseInt(parts[2], 10);
						if (!isNaN(day) && !isNaN(month) && !isNaN(year) && day > 0 && day <= 31 && month > 0 && month <= 12 && year > 1900 && year <= (/* @__PURE__ */ new Date()).getFullYear() + 1) birthday = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T12:00:00.000Z`;
						else throw new Error("O campo [Nascimento] possui um formato inválido.");
					} else {
						const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
						if (isoMatch) birthday = `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}T12:00:00.000Z`;
						else throw new Error("O campo [Nascimento] possui um formato inválido.");
					}
				}
				let preferred_barber_id = "";
				if (profRaw) {
					const bId = barbersMap.get(profRaw.toLowerCase().trim());
					if (bId) preferred_barber_id = bId;
					else throw new Error(`Profissional "${profRaw}" não encontrado.`);
				}
				let location_type = "nearby";
				const loc = locRaw.toLowerCase().trim();
				if (loc === "de passagem" || loc === "passage") location_type = "passage";
				else if (loc === "mora perto" || loc === "nearby") location_type = "nearby";
				else if (loc === "mora cidade" || loc === "mora_cidade") location_type = "mora_cidade";
				else if (loc === "outra cidade" || loc === "other_city") location_type = "other_city";
				const payload = {
					name,
					surname,
					phone: cleanPhone(phoneRaw),
					phone_secondary: cleanPhone(phoneSecRaw),
					location_type,
					is_active: true,
					organization_id: user?.organization_id || user?.expand?.organization_id?.id
				};
				if (birthday) payload.birthday = birthday;
				if (preferred_barber_id) payload.preferred_barber_id = preferred_barber_id;
				if (loggedInBarber) payload.created_by_id = loggedInBarber.id;
				await pb.collection("clients").create(payload);
				success++;
			} catch (err) {
				errors++;
				errorsList.push(`Erro na linha ${i + 2}: ${err.message}`);
			}
		}
		if (success > 0) loadData();
		return {
			success,
			errors,
			errorsList
		};
	};
	const loadData = async () => {
		setClients(await getClients());
		setBarbers(await getBarbers());
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	useRealtime("clients", loadData);
	const loggedInBarber = barbers.find((b) => b.user_id === user?.id || b.name === user?.name);
	const openEdit = (c) => {
		setFormData({
			...c,
			is_active: c.is_active ?? true,
			phone_secondary: c.phone_secondary || "",
			preferred_barber_id: c.preferred_barber_id || ""
		});
		setEditingId(c.id);
		setIsOpen(true);
	};
	const openNew = () => {
		setFormData(defForm);
		setEditingId(null);
		setIsOpen(true);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const payload = { ...formData };
			if (!editingId && loggedInBarber) payload.created_by_id = loggedInBarber.id;
			if (!payload.preferred_barber_id || payload.preferred_barber_id === "none") payload.preferred_barber_id = "";
			if (editingId) await updateClient(editingId, payload);
			else await createClient(payload);
			toast({ title: editingId ? "Cliente atualizado!" : "Cliente cadastrado com sucesso!" });
			setIsOpen(false);
		} catch (err) {
			toast({
				title: "Erro ao salvar",
				variant: "destructive"
			});
		}
	};
	const toggleActive = async (id, current) => {
		await updateClient(id, { is_active: !current });
	};
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [barberFilter, setBarberFilter] = (0, import_react.useState)("all");
	const filteredClients = clients.filter((c) => {
		const matchesSearch = !searchQuery || `${c.name} ${c.surname || ""}`.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone && c.phone.includes(searchQuery);
		const matchesBarber = barberFilter === "all" || c.preferred_barber_id === barberFilter;
		return matchesSearch && matchesBarber;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Clientes.tsx:245:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-5xl mx-auto pb-20 md:pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Clientes.tsx:246:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Clientes.tsx:247:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/Clientes.tsx:248:11",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold tracking-tight",
						children: "Clientes (CRM)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Clientes.tsx:249:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Gerencie seus clientes e acompanhe histórico."
					})]
				}), hasAccess("action_delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Clientes.tsx:252:11",
					"data-prohibitions": "[]",
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Clientes.tsx:253:13",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => setIsImportOpen(true),
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
							"data-uid": "src/pages/Clientes.tsx:254:15",
							"data-prohibitions": "[editContent]",
							className: "size-4"
						}), " Importar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Clientes.tsx:256:13",
						"data-prohibitions": "[]",
						onClick: openNew,
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {
							"data-uid": "src/pages/Clientes.tsx:257:15",
							"data-prohibitions": "[editContent]",
							className: "size-4"
						}), " Novo Cliente"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportDialog, {
				"data-uid": "src/pages/Clientes.tsx:263:7",
				"data-prohibitions": "[editContent]",
				open: isImportOpen,
				onOpenChange: setIsImportOpen,
				title: "Importar Clientes",
				onImport: handleImport
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/Clientes.tsx:270:7",
				"data-prohibitions": "[editContent]",
				defaultValue: "lista",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/Clientes.tsx:271:9",
						"data-prohibitions": "[editContent]",
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/Clientes.tsx:272:11",
							"data-prohibitions": "[]",
							value: "lista",
							children: "Lista de Clientes"
						}), (user?.access_level === "Admin" || user?.access_level === "Socio") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/Clientes.tsx:274:13",
							"data-prohibitions": "[]",
							value: "ranking",
							children: "Fidelidade e Rankings"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/Clientes.tsx:277:9",
						"data-prohibitions": "[editContent]",
						value: "lista",
						className: "space-y-4 mt-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Clientes.tsx:278:11",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col sm:flex-row items-center gap-4 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/Clientes.tsx:279:13",
									"data-prohibitions": "[editContent]",
									placeholder: "Buscar por nome ou telefone...",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									className: "w-full sm:max-w-sm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/Clientes.tsx:285:13",
									"data-prohibitions": "[editContent]",
									value: barberFilter,
									onValueChange: setBarberFilter,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/Clientes.tsx:286:15",
										"data-prohibitions": "[]",
										className: "w-full sm:max-w-[250px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/Clientes.tsx:287:17",
											"data-prohibitions": "[editContent]",
											placeholder: "Todos os profissionais"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/Clientes.tsx:289:15",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Clientes.tsx:290:17",
											"data-prohibitions": "[]",
											value: "all",
											children: "Todos os profissionais"
										}), barbers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Clientes.tsx:292:19",
											"data-prohibitions": "[editContent]",
											value: b.id,
											children: b.name
										}, b.id))]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
								"data-uid": "src/pages/Clientes.tsx:300:11",
								"data-prohibitions": "[editContent]",
								open: isOpen,
								onOpenChange: setIsOpen,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
									"data-uid": "src/pages/Clientes.tsx:301:13",
									"data-prohibitions": "[editContent]",
									className: "max-w-2xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
										"data-uid": "src/pages/Clientes.tsx:302:15",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
											"data-uid": "src/pages/Clientes.tsx:303:17",
											"data-prohibitions": "[editContent]",
											children: editingId ? "Editar Cliente" : "Cadastrar Cliente"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										"data-uid": "src/pages/Clientes.tsx:305:15",
										"data-prohibitions": "[editContent]",
										onSubmit: handleSubmit,
										className: "space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Clientes.tsx:306:17",
												"data-prohibitions": "[]",
												className: "grid grid-cols-1 md:grid-cols-2 gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/Clientes.tsx:307:19",
													"data-prohibitions": "[]",
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														"data-uid": "src/pages/Clientes.tsx:308:21",
														"data-prohibitions": "[]",
														children: "Nome"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/Clientes.tsx:309:21",
														"data-prohibitions": "[editContent]",
														required: true,
														className: "min-h-[44px]",
														value: formData.name,
														onChange: (e) => setFormData({
															...formData,
															name: e.target.value
														})
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/Clientes.tsx:316:19",
													"data-prohibitions": "[]",
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														"data-uid": "src/pages/Clientes.tsx:317:21",
														"data-prohibitions": "[]",
														children: "Sobrenome"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/Clientes.tsx:318:21",
														"data-prohibitions": "[editContent]",
														className: "min-h-[44px]",
														value: formData.surname,
														onChange: (e) => setFormData({
															...formData,
															surname: e.target.value
														})
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Clientes.tsx:326:17",
												"data-prohibitions": "[]",
												className: "grid grid-cols-1 md:grid-cols-2 gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/Clientes.tsx:327:19",
													"data-prohibitions": "[]",
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														"data-uid": "src/pages/Clientes.tsx:328:21",
														"data-prohibitions": "[]",
														children: "Celular Principal"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/Clientes.tsx:329:21",
														"data-prohibitions": "[editContent]",
														required: true,
														className: "min-h-[44px]",
														value: formData.phone,
														onChange: (e) => setFormData({
															...formData,
															phone: phoneMask(e.target.value)
														}),
														placeholder: "(00) 00000-0000"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/Clientes.tsx:339:19",
													"data-prohibitions": "[]",
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														"data-uid": "src/pages/Clientes.tsx:340:21",
														"data-prohibitions": "[]",
														children: "Celular Secundário"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/Clientes.tsx:341:21",
														"data-prohibitions": "[editContent]",
														className: "min-h-[44px]",
														value: formData.phone_secondary,
														onChange: (e) => setFormData({
															...formData,
															phone_secondary: phoneMask(e.target.value)
														}),
														placeholder: "(00) 00000-0000"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Clientes.tsx:355:17",
												"data-prohibitions": "[editContent]",
												className: "grid grid-cols-1 md:grid-cols-2 gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/Clientes.tsx:356:19",
													"data-prohibitions": "[]",
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														"data-uid": "src/pages/Clientes.tsx:357:21",
														"data-prohibitions": "[]",
														children: "Nascimento"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/Clientes.tsx:358:21",
														"data-prohibitions": "[editContent]",
														type: "date",
														className: "min-h-[44px]",
														value: formData.birthday ? formData.birthday.split("T")[0] : "",
														onChange: (e) => {
															const val = e.target.value;
															setFormData({
																...formData,
																birthday: val ? `${val}T12:00:00.000Z` : ""
															});
														}
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/Clientes.tsx:368:19",
													"data-prohibitions": "[editContent]",
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														"data-uid": "src/pages/Clientes.tsx:369:21",
														"data-prohibitions": "[]",
														children: "Profissional Preferido"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
														"data-uid": "src/pages/Clientes.tsx:370:21",
														"data-prohibitions": "[editContent]",
														value: formData.preferred_barber_id || "none",
														onValueChange: (v) => setFormData({
															...formData,
															preferred_barber_id: v
														}),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															"data-uid": "src/pages/Clientes.tsx:374:23",
															"data-prohibitions": "[]",
															className: "min-h-[44px]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																"data-uid": "src/pages/Clientes.tsx:375:25",
																"data-prohibitions": "[editContent]",
																placeholder: "Nenhum"
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
															"data-uid": "src/pages/Clientes.tsx:377:23",
															"data-prohibitions": "[editContent]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/pages/Clientes.tsx:378:25",
																"data-prohibitions": "[]",
																value: "none",
																children: "Nenhum"
															}), barbers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/pages/Clientes.tsx:380:27",
																"data-prohibitions": "[editContent]",
																value: b.id,
																children: b.name
															}, b.id))]
														})]
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Clientes.tsx:389:17",
												"data-prohibitions": "[]",
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													"data-uid": "src/pages/Clientes.tsx:390:19",
													"data-prohibitions": "[]",
													children: "Localização"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
													"data-uid": "src/pages/Clientes.tsx:391:19",
													"data-prohibitions": "[]",
													value: formData.location_type,
													onValueChange: (v) => setFormData({
														...formData,
														location_type: v
													}),
													className: "flex flex-wrap gap-4 mt-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/Clientes.tsx:396:21",
															"data-prohibitions": "[]",
															className: "flex items-center space-x-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
																"data-uid": "src/pages/Clientes.tsx:397:23",
																"data-prohibitions": "[editContent]",
																value: "passage",
																id: "r1"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/Clientes.tsx:398:23",
																"data-prohibitions": "[]",
																htmlFor: "r1",
																children: "De Passagem"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/Clientes.tsx:400:21",
															"data-prohibitions": "[]",
															className: "flex items-center space-x-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
																"data-uid": "src/pages/Clientes.tsx:401:23",
																"data-prohibitions": "[editContent]",
																value: "nearby",
																id: "r2"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/Clientes.tsx:402:23",
																"data-prohibitions": "[]",
																htmlFor: "r2",
																children: "Mora Perto"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/Clientes.tsx:404:21",
															"data-prohibitions": "[]",
															className: "flex items-center space-x-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
																"data-uid": "src/pages/Clientes.tsx:405:23",
																"data-prohibitions": "[editContent]",
																value: "mora_cidade",
																id: "r4"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/Clientes.tsx:406:23",
																"data-prohibitions": "[]",
																htmlFor: "r4",
																children: "Mora Cidade"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/Clientes.tsx:408:21",
															"data-prohibitions": "[]",
															className: "flex items-center space-x-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
																"data-uid": "src/pages/Clientes.tsx:409:23",
																"data-prohibitions": "[editContent]",
																value: "other_city",
																id: "r3"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																"data-uid": "src/pages/Clientes.tsx:410:23",
																"data-prohibitions": "[]",
																htmlFor: "r3",
																children: "Outra Cidade"
															})]
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
												"data-uid": "src/pages/Clientes.tsx:414:17",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													"data-uid": "src/pages/Clientes.tsx:415:19",
													"data-prohibitions": "[]",
													type: "submit",
													className: "w-full mt-4",
													children: "Salvar"
												})
											})
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/pages/Clientes.tsx:423:11",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/Clientes.tsx:424:13",
									"data-prohibitions": "[editContent]",
									className: "p-0 overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
										"data-uid": "src/pages/Clientes.tsx:425:15",
										"data-prohibitions": "[editContent]",
										className: "min-w-[600px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
											"data-uid": "src/pages/Clientes.tsx:426:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
												"data-uid": "src/pages/Clientes.tsx:427:19",
												"data-prohibitions": "[]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
														"data-uid": "src/pages/Clientes.tsx:428:21",
														"data-prohibitions": "[]",
														children: "Cliente"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
														"data-uid": "src/pages/Clientes.tsx:429:21",
														"data-prohibitions": "[]",
														children: "Contatos"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
														"data-uid": "src/pages/Clientes.tsx:430:21",
														"data-prohibitions": "[]",
														className: "text-center",
														children: "Ativo"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
														"data-uid": "src/pages/Clientes.tsx:431:21",
														"data-prohibitions": "[]",
														className: "text-right",
														children: "Ações"
													})
												]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
											"data-uid": "src/pages/Clientes.tsx:434:17",
											"data-prohibitions": "[editContent]",
											children: [filteredClients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
												"data-uid": "src/pages/Clientes.tsx:436:21",
												"data-prohibitions": "[editContent]",
												className: c.is_active === false ? "opacity-50" : "",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
														"data-uid": "src/pages/Clientes.tsx:437:23",
														"data-prohibitions": "[editContent]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/Clientes.tsx:438:25",
															"data-prohibitions": "[editContent]",
															className: "font-medium text-base",
															children: [
																c.name || "Cliente sem nome",
																" ",
																c.surname || ""
															]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/Clientes.tsx:441:25",
															"data-prohibitions": "[editContent]",
															className: "text-xs text-muted-foreground mt-1 space-y-0.5",
															children: [c.expand?.created_by_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/Clientes.tsx:443:29",
																"data-prohibitions": "[editContent]",
																className: "flex items-center gap-1.5 mt-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	"data-uid": "src/pages/Clientes.tsx:444:31",
																	"data-prohibitions": "[]",
																	className: "text-xs text-muted-foreground",
																	children: "Cadastrado por:"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	"data-uid": "src/pages/Clientes.tsx:445:31",
																	"data-prohibitions": "[editContent]",
																	className: "font-medium text-xs text-muted-foreground",
																	children: c.expand.created_by_id.name
																})]
															}), c.expand?.preferred_barber_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/Clientes.tsx:451:29",
																"data-prohibitions": "[editContent]",
																className: "flex items-center gap-1.5 mt-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	"data-uid": "src/pages/Clientes.tsx:452:31",
																	"data-prohibitions": "[]",
																	className: "text-xs text-muted-foreground",
																	children: "Atendido por:"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	"data-uid": "src/pages/Clientes.tsx:453:31",
																	"data-prohibitions": "[editContent]",
																	className: "text-[10px] font-bold px-2 py-0.5 rounded-full",
																	style: {
																		backgroundColor: c.expand.preferred_barber_id.color || "hsl(var(--primary))",
																		color: getContrastColor(c.expand.preferred_barber_id.color || "hsl(var(--primary))")
																	},
																	children: c.expand.preferred_barber_id.name
																})]
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Clientes.tsx:469:23",
														"data-prohibitions": "[editContent]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/Clientes.tsx:470:25",
															"data-prohibitions": "[editContent]",
															className: "space-y-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																"data-uid": "src/pages/Clientes.tsx:471:27",
																"data-prohibitions": "[editContent]",
																children: phoneMask(c.phone)
															}), c.phone_secondary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/Clientes.tsx:473:29",
																"data-prohibitions": "[editContent]",
																className: "text-sm text-muted-foreground",
																children: [phoneMask(c.phone_secondary), " (Sec)"]
															})]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Clientes.tsx:479:23",
														"data-prohibitions": "[]",
														className: "text-center",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
															"data-uid": "src/pages/Clientes.tsx:480:25",
															"data-prohibitions": "[editContent]",
															checked: c.is_active !== false,
															onCheckedChange: () => toggleActive(c.id, c.is_active !== false),
															disabled: !hasAccess("action_delete")
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
														"data-uid": "src/pages/Clientes.tsx:486:23",
														"data-prohibitions": "[editContent]",
														className: "text-right space-x-2",
														children: [hasAccess("action_delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															"data-uid": "src/pages/Clientes.tsx:488:27",
															"data-prohibitions": "[]",
															variant: "ghost",
															size: "icon",
															onClick: () => openEdit(c),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
																"data-uid": "src/pages/Clientes.tsx:489:29",
																"data-prohibitions": "[editContent]",
																className: "size-4"
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															"data-uid": "src/pages/Clientes.tsx:492:25",
															"data-prohibitions": "[]",
															variant: "ghost",
															size: "icon",
															asChild: true,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																"data-uid": "src/pages/Clientes.tsx:493:27",
																"data-prohibitions": "[]",
																to: `/clientes/${c.id}`,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
																	"data-uid": "src/pages/Clientes.tsx:494:29",
																	"data-prohibitions": "[editContent]",
																	className: "size-4"
																})
															})
														})]
													})
												]
											}, c.id)), filteredClients.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
												"data-uid": "src/pages/Clientes.tsx:501:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Clientes.tsx:502:23",
													"data-prohibitions": "[]",
													colSpan: 4,
													className: "text-center py-6 text-muted-foreground",
													children: "Nenhum cliente encontrado."
												})
											})]
										})]
									})
								})
							})
						]
					}),
					(user?.access_level === "Admin" || user?.access_level === "Socio") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/Clientes.tsx:513:11",
						"data-prohibitions": "[]",
						value: "ranking",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankingDashboard, {
							"data-uid": "src/pages/Clientes.tsx:514:13",
							"data-prohibitions": "[editContent]"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { Clientes as default };

//# sourceMappingURL=Clientes-CLgxppak.js.map