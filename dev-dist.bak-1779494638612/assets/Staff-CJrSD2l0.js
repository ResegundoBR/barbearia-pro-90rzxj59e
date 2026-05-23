import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { t as Calendar } from "./calendar-0Z8pjn2X.js";
import { t as Calendar$1 } from "./calendar-B3fzNk_Y.js";
import { t as CircleCheck } from "./circle-check-BmWdbAdv.js";
import { t as DollarSign } from "./dollar-sign-dXbt71iH.js";
import { t as Plus } from "./plus-W8yM_fkd.js";
import { t as SquarePen } from "./square-pen-DX80yKom.js";
import { C as Popover, H as Input, J as cn, S as DialogTitle, T as PopoverTrigger, U as Button, X as Wallet, _ as Dialog, a as pb, b as DialogFooter, c as SelectContent, ct as createLucideIcon, f as SelectTrigger, n as useRealtime, p as SelectValue, r as usePermissions, s as Select, t as Label, u as SelectItem, v as DialogContent, w as PopoverContent, x as DialogHeader, y as DialogDescription, yt as useToast } from "./index-BGBBwOnB.js";
import { g as startOfWeek, p as startOfDay, t as format, v as toDate } from "./format-BWFAnkIi.js";
import { t as startOfMonth } from "./startOfMonth-mft3RUay.js";
import { n as endOfMonth, t as endOfWeek } from "./endOfWeek-B_VK7YAC.js";
import { t as subDays } from "./subDays-qxAcF-RQ.js";
import { d as getCommissions, l as getClientPackages, m as getProductPurchases, p as getPaymentMethods, r as getAppointments } from "./api-CFTtaB6J.js";
import { n as getErrorMessage } from "./errors-BhrJgJzy.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-BwjqyGS_.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-qy8VJYSD.js";
import { t as Badge } from "./badge-ChMj_r5M.js";
import { t as Checkbox } from "./checkbox-CzYx_bOQ.js";
var Copy = createLucideIcon("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]);
var Printer = createLucideIcon("printer", [
	["path", {
		d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
		key: "143wyd"
	}],
	["path", {
		d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
		key: "1itne7"
	}],
	["rect", {
		x: "6",
		y: "14",
		width: "12",
		height: "8",
		rx: "1",
		key: "1ue0tg"
	}]
]);
var Receipt = createLucideIcon("receipt", [
	["path", {
		d: "M12 17V7",
		key: "pyj7ub"
	}],
	["path", {
		d: "M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8",
		key: "1elt7d"
	}],
	["path", {
		d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
		key: "ycz6yz"
	}]
]);
var RefreshCw = createLucideIcon("refresh-cw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]);
var Trash = createLucideIcon("trash", [
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]);
//#endregion
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfDay.js
/**
* The {@link endOfDay} function options.
*/
/**
* @name endOfDay
* @category Day Helpers
* @summary Return the end of a day for the given date.
*
* @description
* Return the end of a day for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The end of a day
*
* @example
* // The end of a day for 2 September 2014 11:55:00:
* const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
* //=> Tue Sep 02 2014 23:59:59.999
*/
function endOfDay(date, options) {
	const _date = toDate(date, options?.in);
	_date.setHours(23, 59, 59, 999);
	return _date;
}
//#endregion
//#region src/services/barbers.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var getBarbers = () => pb.collection("barbers").getFullList({
	sort: "-created",
	expand: "user_id"
});
var createBarber = (data) => pb.collection("barbers").create(data);
var updateBarber = (id, data) => pb.collection("barbers").update(id, data);
//#endregion
//#region src/pages/Staff.tsx
var import_jsx_runtime = require_jsx_runtime();
var WEEK_DAYS = [
	{
		value: 0,
		label: "Dom"
	},
	{
		value: 1,
		label: "Seg"
	},
	{
		value: 2,
		label: "Ter"
	},
	{
		value: 3,
		label: "Qua"
	},
	{
		value: 4,
		label: "Qui"
	},
	{
		value: 5,
		label: "Sex"
	},
	{
		value: 6,
		label: "Sáb"
	}
];
function Staff() {
	const { hasAccess } = usePermissions();
	const canEdit = hasAccess("staff_edit");
	const [barbers, setBarbers] = (0, import_react.useState)([]);
	const [commissions, setCommissions] = (0, import_react.useState)([]);
	const [services, setServices] = (0, import_react.useState)([]);
	const [products, setProducts] = (0, import_react.useState)([]);
	const [packages, setPackages] = (0, import_react.useState)([]);
	const [commissionRules, setCommissionRules] = (0, import_react.useState)([]);
	const [dateFilter, setDateFilter] = (0, import_react.useState)("this_month");
	const [dateRange, setDateRange] = (0, import_react.useState)();
	const [bDialog, setBDialog] = (0, import_react.useState)(false);
	const [selectedBarberDetailed, setSelectedBarberDetailed] = (0, import_react.useState)(null);
	const [reportItems, setReportItems] = (0, import_react.useState)([]);
	const [reportStatusFilter, setReportStatusFilter] = (0, import_react.useState)("tudo");
	const [paymentMethods, setPaymentMethods] = (0, import_react.useState)([]);
	const [ticketItem, setTicketItem] = (0, import_react.useState)(null);
	const [payDialog, setPayDialog] = (0, import_react.useState)(false);
	const [barberToPay, setBarberToPay] = (0, import_react.useState)(null);
	const [pendingCommsToPay, setPendingCommsToPay] = (0, import_react.useState)([]);
	const [selectedComms, setSelectedComms] = (0, import_react.useState)([]);
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("pix");
	const [isPaying, setIsPaying] = (0, import_react.useState)(false);
	const [receiptDialog, setReceiptDialog] = (0, import_react.useState)(false);
	const [paymentReceipt, setPaymentReceipt] = (0, import_react.useState)(null);
	const [paymentReceiptDetails, setPaymentReceiptDetails] = (0, import_react.useState)(null);
	const [businessName, setBusinessName] = (0, import_react.useState)("Barbearia Pro");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [isReconciling, setIsReconciling] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		work_level: "autonomo",
		work_regime: "fixed",
		commission_type: "percentage",
		commission_value: 0,
		color: "#3b82f6",
		payment_schedule_config: {
			frequency: "semanal",
			cycles: [{
				workDays: [
					1,
					2,
					3
				],
				paymentDay: 4
			}, {
				workDays: [
					4,
					5,
					6
				],
				paymentDay: 1
			}]
		}
	});
	const getNextPayDate = (date, config) => {
		const day = date.getDay();
		let frequency = "semanal";
		let cycles = [
			{
				workDays: [
					1,
					2,
					3
				],
				paymentDay: 4
			},
			{
				workDays: [
					4,
					5,
					6
				],
				paymentDay: 1
			},
			{
				workDays: [0],
				paymentDay: 1
			}
		];
		if (config && config.cycles && config.cycles.length > 0) {
			frequency = config.frequency || "semanal";
			cycles = config.cycles;
		}
		let activeCycle = cycles.find((c) => c.workDays.includes(day));
		if (!activeCycle) activeCycle = {
			workDays: [day],
			paymentDay: (day + 7) % 7 || 1
		};
		let daysToAdd = (activeCycle.paymentDay - day + 7) % 7;
		if (daysToAdd === 0) daysToAdd = 7;
		const d = new Date(date);
		d.setDate(d.getDate() + daysToAdd);
		if (frequency === "quinzenal") d.setDate(d.getDate() + 7);
		return d;
	};
	const { toast } = useToast();
	const loadData = async () => {
		setBarbers(await getBarbers());
		setCommissions(await getCommissions());
		try {
			setPaymentMethods(await getPaymentMethods());
			setServices(await pb.collection("services").getFullList({ expand: "category_id" }));
			setProducts(await pb.collection("products").getFullList({ expand: "category_id" }));
			setPackages(await pb.collection("packages").getFullList());
			setCommissionRules(await pb.collection("commission_rules").getFullList());
		} catch {}
		try {
			const settings = await pb.collection("settings").getFirstListItem(`key='business_info'`);
			if (settings && settings.value && settings.value.name) setBusinessName(settings.value.name);
		} catch (e) {}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	useRealtime("barbers", loadData);
	useRealtime("commissions", loadData);
	useRealtime("appointments", loadData);
	useRealtime("checkouts", loadData);
	(0, import_react.useEffect)(() => {
		if (selectedBarberDetailed) openDetailedReport(selectedBarberDetailed);
	}, [
		commissions,
		dateFilter,
		dateRange
	]);
	const getRange = () => {
		const today = /* @__PURE__ */ new Date();
		switch (dateFilter) {
			case "this_month": return {
				from: startOfMonth(today),
				to: endOfMonth(today)
			};
			case "this_week": return {
				from: startOfWeek(today),
				to: endOfWeek(today)
			};
			case "last_30": return {
				from: subDays(today, 30),
				to: endOfDay(today)
			};
			case "last_7": return {
				from: subDays(today, 7),
				to: endOfDay(today)
			};
			case "all_time": return {
				from: /* @__PURE__ */ new Date(0),
				to: new Date(2100, 1, 1)
			};
			case "custom": return dateRange && dateRange.from ? {
				from: startOfDay(dateRange.from),
				to: dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from)
			} : {
				from: /* @__PURE__ */ new Date(0),
				to: new Date(2100, 1, 1)
			};
			default: return {
				from: startOfMonth(today),
				to: endOfMonth(today)
			};
		}
	};
	const range = getRange();
	commissions.filter((c) => {
		const d = c.date ? new Date(c.date) : new Date(c.created);
		return d >= range.from && d <= range.to;
	});
	const getCommissionInfo = (type, itemId, barberId) => {
		let rule = commissionRules.find((r) => r.barber_id === barberId && (r.item_type === type || type === "package_sale" && r.item_type === "package") && r.item_id === itemId);
		if (!rule) rule = commissionRules.find((r) => !r.barber_id && (r.item_type === type || type === "package_sale" && r.item_type === "package") && r.item_id === itemId);
		if (rule) return {
			type: rule.type,
			value: rule.value
		};
		let svcRate = 0;
		let catRate = 0;
		if (type === "service") {
			const svc = services.find((s) => s.id === itemId);
			svcRate = svc?.commission_rate || 0;
			catRate = svc?.expand?.category_id?.commission_percentage || 0;
		} else if (type === "product") catRate = products.find((p) => p.id === itemId)?.expand?.category_id?.commission_percentage || 0;
		else if (type === "package" || type === "package_sale") {
			const pkg = packages.find((p) => p.id === itemId);
			const svc = services.find((s) => s.id === pkg?.service_id);
			svcRate = svc?.commission_rate || 0;
			catRate = svc?.expand?.category_id?.commission_percentage || 0;
		}
		if (svcRate > 0) return {
			type: "percentage",
			value: svcRate
		};
		return {
			type: "percentage",
			value: catRate
		};
	};
	const openDetailedReport = async (b) => {
		setSelectedBarberDetailed(b);
		try {
			const apts = await getAppointments(`barber_id='${b.id}' && status='Concluído'`);
			const prods = await getProductPurchases(`barber_id='${b.id}'`);
			const packs = await getClientPackages(`barber_id='${b.id}'`);
			const checks = await pb.collection("checkouts").getFullList({
				filter: `barber_id='${b.id}'`,
				expand: "client_id"
			}).catch(() => []);
			const currentRange = getRange();
			const matchedComms = commissions.filter((c) => {
				if (c.barber_id !== b.id || c.is_advance) return false;
				const d = c.date ? new Date(c.date) : new Date(c.created);
				return d >= currentRange.from && d <= currentRange.to;
			});
			matchedComms.forEach((c) => {
				let itemName = typeMap[c.type] || c.type;
				let itemPrice = c.gross_amount || 0;
				let packageUsed = false;
				let cInfo = null;
				if (c.appointment_id) {
					const a = apts.find((apt) => apt.id === c.appointment_id);
					if (a) {
						itemName = a.expand?.service_id?.name || "Serviço";
						if (!itemPrice) itemPrice = a.price || a.expand?.service_id?.price || 0;
						packageUsed = !!a.client_package_id;
						cInfo = getCommissionInfo("service", a.service_id, b.id);
					}
				} else if (c.product_purchase_id) {
					const p = prods.find((prod) => prod.id === c.product_purchase_id);
					if (p) {
						itemName = p.expand?.product_id?.name || "Produto";
						if (!itemPrice) itemPrice = p.price_at_sale || 0;
						cInfo = getCommissionInfo("product", p.product_id, b.id);
					}
				} else if (c.client_package_id) {
					const pk = packs.find((pack) => pack.id === c.client_package_id);
					if (pk) {
						itemName = pk.expand?.package_id?.name || "Pacote";
						if (!itemPrice) itemPrice = pk.expand?.package_id?.price || 0;
						cInfo = getCommissionInfo("package", pk.package_id, b.id);
					}
				} else if (c.type === "consumption") {
					itemName = "Consumo Interno";
					cInfo = {
						type: "fixed",
						value: Math.abs(c.amount)
					};
				}
				c._itemName = itemName;
				c._itemPrice = itemPrice;
				c._packageUsed = packageUsed;
				c._commissionInfo = cInfo;
			});
			const grouped = /* @__PURE__ */ new Map();
			const singles = [];
			matchedComms.forEach((c) => {
				if (c.checkout_id) {
					if (!grouped.has(c.checkout_id)) grouped.set(c.checkout_id, []);
					grouped.get(c.checkout_id).push(c);
				} else singles.push(c);
			});
			const items = [];
			grouped.forEach((groupComms, checkoutId) => {
				const checkout = checks.find((chk) => chk.id === checkoutId);
				const totalGross = groupComms.reduce((acc, c) => acc + (c.gross_amount || 0), 0);
				const totalComm = groupComms.reduce((acc, c) => acc + (c.amount || 0), 0);
				const clientName = checkout?.expand?.client_id?.name || "Avulso";
				const date = checkout?.date ? new Date(checkout.date) : new Date(groupComms[0].created);
				const types = new Set(groupComms.map((c) => c.type));
				const itemDesc = groupComms.length > 1 ? `${groupComms.length} Itens (${Array.from(types).map((t) => typeMap[t] || t).join(", ")})` : groupComms[0]._itemName;
				const allPaid = groupComms.every((c) => c.status === "paid");
				const somePaid = groupComms.some((c) => c.status === "paid");
				const status = allPaid ? "paid" : somePaid ? "partial" : "pending";
				items.push({
					id: checkoutId,
					isConsolidated: true,
					checkoutNumber: checkout?.checkout_number,
					checkoutObj: checkout,
					type: "Pedido",
					client: clientName,
					item: itemDesc,
					date,
					time: format(date, "HH:mm"),
					packageUsed: groupComms.some((c) => c._packageUsed),
					price: checkout?.total_amount !== void 0 ? checkout.total_amount : totalGross,
					commission: totalComm,
					dueDate: groupComms[0].due_date ? new Date(groupComms[0].due_date) : null,
					commDate: groupComms[0].date ? new Date(groupComms[0].date) : date,
					commissionObj: groupComms[0],
					basePrice: totalGross,
					comms: groupComms,
					status
				});
			});
			singles.forEach((c) => {
				let date = c.date ? new Date(c.date) : new Date(c.created);
				let typeStr = typeMap[c.type] || c.type;
				if (c.type === "consumption") typeStr = "Consumo";
				else if (c.appointment_id) typeStr = "Serviço";
				else if (c.product_purchase_id) typeStr = "Produto";
				else if (c.client_package_id) typeStr = "Pacote";
				let clientName = "-";
				if (c.appointment_id) {
					const a = apts.find((apt) => apt.id === c.appointment_id);
					if (a) clientName = a.expand?.client_id?.name || "Avulso";
				} else if (c.product_purchase_id) {
					const p = prods.find((prod) => prod.id === c.product_purchase_id);
					if (p) clientName = p.expand?.client_id?.name || "Avulso";
				} else if (c.client_package_id) {
					const pk = packs.find((pack) => pack.id === c.client_package_id);
					if (pk) clientName = pk.expand?.client_id?.name || "Avulso";
				}
				items.push({
					id: c.id,
					isConsolidated: false,
					checkoutNumber: null,
					checkoutObj: null,
					type: typeStr,
					client: clientName,
					item: c._itemName,
					date,
					time: format(date, "HH:mm"),
					packageUsed: c._packageUsed,
					price: c._itemPrice,
					commission: c.amount || 0,
					dueDate: c.due_date ? new Date(c.due_date) : null,
					commDate: c.date ? new Date(c.date) : new Date(c.created),
					commissionObj: c,
					basePrice: c._itemPrice,
					comms: [c],
					status: c.status || "pending"
				});
			});
			items.sort((a, b) => b.commDate.getTime() - a.commDate.getTime());
			setReportItems(items);
		} catch (e) {
			toast({
				title: "Erro ao carregar detalhes",
				variant: "destructive"
			});
		}
	};
	const displayedReportItems = (0, import_react.useMemo)(() => {
		return reportItems.filter((item) => {
			if (reportStatusFilter === "pago") return item.status === "paid";
			if (reportStatusFilter === "a_pagar") return item.status !== "paid";
			return true;
		});
	}, [reportItems, reportStatusFilter]);
	const reportSummary = (0, import_react.useMemo)(() => {
		let totalVendas = 0;
		let totalPago = 0;
		let totalAPagar = 0;
		reportItems.forEach((item) => {
			totalVendas += item.price;
			if (item.status === "paid") totalPago += item.commission;
			else if (item.status === "partial") item.comms.forEach((c) => {
				if (c.status === "paid") totalPago += c.amount || 0;
				else totalAPagar += c.amount || 0;
			});
			else totalAPagar += item.commission;
		});
		return {
			totalVendas,
			totalPago,
			totalAPagar
		};
	}, [reportItems]);
	const printReport = () => {
		const content = document.getElementById("printable-report")?.innerHTML;
		if (!content) return;
		const win = window.open("", "", "width=900,height=650");
		if (win) {
			win.document.write(`
        <html>
          <head>
            <title>Relatório Detalhado de Comissões</title>
            <style>
              body { font-family: sans-serif; padding: 20px; color: #333; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; border: none; }
              th, td { padding: 12px 8px; text-align: left; border: none; }
              th { background-color: #f4f4f4; border: none; }
              .text-right { text-align: right; }
              .font-bold { font-weight: bold; }
              .header { margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
              .summary { display: flex; justify-content: space-between; margin-top: 20px; font-size: 16px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>Relatório Detalhado - ${selectedBarberDetailed?.name}</h2>
              <p>Comissões Pendentes</p>
              <p>Gerado em: ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}</p>
            </div>
            ${content}
          </body>
        </html>
      `);
			win.document.close();
			win.focus();
			setTimeout(() => {
				win.print();
				win.close();
			}, 250);
		}
	};
	const openBarber = () => {
		setForm({
			name: "",
			work_level: "autonomo",
			work_regime: "fixed",
			commission_type: "percentage",
			commission_value: 0,
			color: "#3b82f6",
			payment_schedule_config: {
				frequency: "semanal",
				cycles: [{
					workDays: [
						1,
						2,
						3
					],
					paymentDay: 4
				}, {
					workDays: [
						4,
						5,
						6
					],
					paymentDay: 1
				}]
			}
		});
		setBDialog(true);
	};
	const editBarber = (b) => {
		setForm({
			id: b.id,
			name: b.name || "",
			work_level: b.work_level || "autonomo",
			work_regime: b.work_regime || "fixed",
			commission_type: b.commission_type || "percentage",
			commission_value: b.commission_value || 0,
			color: b.color || "#3b82f6",
			payment_schedule_config: b.payment_schedule_config || {
				frequency: "semanal",
				cycles: [{
					workDays: [
						1,
						2,
						3
					],
					paymentDay: 4
				}, {
					workDays: [
						4,
						5,
						6
					],
					paymentDay: 1
				}]
			}
		});
		setBDialog(true);
	};
	const addCycle = () => {
		setForm((prev) => ({
			...prev,
			payment_schedule_config: {
				...prev.payment_schedule_config,
				cycles: [...prev.payment_schedule_config?.cycles || [], {
					workDays: [],
					paymentDay: 1
				}]
			}
		}));
	};
	const removeCycle = (index) => {
		const newCycles = [...form.payment_schedule_config.cycles];
		newCycles.splice(index, 1);
		setForm((prev) => ({
			...prev,
			payment_schedule_config: {
				...prev.payment_schedule_config,
				cycles: newCycles
			}
		}));
	};
	const updateCycleWorkDays = (index, day, checked) => {
		const newCycles = [...form.payment_schedule_config.cycles];
		const cycle = newCycles[index];
		if (checked) cycle.workDays = [...cycle.workDays, day];
		else cycle.workDays = cycle.workDays.filter((d) => d !== day);
		setForm((prev) => ({
			...prev,
			payment_schedule_config: {
				...prev.payment_schedule_config,
				cycles: newCycles
			}
		}));
	};
	const updateCyclePaymentDay = (index, day) => {
		const newCycles = [...form.payment_schedule_config.cycles];
		newCycles[index].paymentDay = day;
		setForm((prev) => ({
			...prev,
			payment_schedule_config: {
				...prev.payment_schedule_config,
				cycles: newCycles
			}
		}));
	};
	const typeMap = {
		service: "Serviço",
		product: "Produto",
		package_sale: "Pacote",
		package: "Pacote",
		category: "Categoria",
		consumption: "Consumo Interno"
	};
	const handleReconcile = async () => {
		setIsReconciling(true);
		try {
			const fromStr = startOfDay(range.from).toISOString().replace("T", " ");
			const toStr = endOfDay(range.to).toISOString().replace("T", " ");
			const res = await pb.send("/backend/v1/commissions/reconcile", {
				method: "POST",
				body: JSON.stringify({
					startDate: fromStr,
					endDate: toStr
				}),
				headers: { "Content-Type": "application/json" }
			});
			toast({
				title: "Reconciliação concluída",
				description: `Foram geradas ${res.createdCount} e atualizadas ${res.updatedCount} comissões.`
			});
			loadData();
		} catch (e) {
			toast({
				title: "Erro",
				description: getErrorMessage(e),
				variant: "destructive"
			});
		} finally {
			setIsReconciling(false);
		}
	};
	const openPayModal = async (b) => {
		setBarberToPay(b);
		try {
			const records = await pb.collection("commissions").getFullList({
				filter: `barber_id='${b.id}' && status!='paid'`,
				sort: "due_date,-created"
			});
			setPendingCommsToPay(records);
			setSelectedComms(records.map((r) => r.id));
			setPaymentMethod("pix");
			setPaymentReceipt(null);
			setPayDialog(true);
		} catch (e) {
			toast({
				title: "Erro ao carregar comissões",
				variant: "destructive"
			});
		}
	};
	const handleToggleComm = (id) => {
		setSelectedComms((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
	};
	const handleToggleAll = (checked) => {
		if (checked) setSelectedComms(pendingCommsToPay.map((c) => c.id));
		else setSelectedComms([]);
	};
	const handleConfirmPayment = async () => {
		if (selectedComms.length === 0) return toast({
			title: "Selecione ao menos uma comissão",
			variant: "destructive"
		});
		if (!paymentMethod) return toast({
			title: "Selecione a forma de pagamento",
			variant: "destructive"
		});
		setIsPaying(true);
		try {
			await pb.send("/backend/v1/commissions/pay", {
				method: "POST",
				body: JSON.stringify({
					commissionIds: selectedComms,
					paymentMethod
				}),
				headers: { "Content-Type": "application/json" }
			});
			const paidItems = pendingCommsToPay.filter((c) => selectedComms.includes(c.id));
			const totalPaid = paidItems.reduce((acc, c) => acc + (c.amount || 0), 0);
			const paidEarnings = paidItems.filter((c) => (c.amount || 0) >= 0);
			const paidDeductions = paidItems.filter((c) => (c.amount || 0) < 0);
			let receiptText = `*Recibo de Pagamento*\n\nOlá ${barberToPay?.name},\nRecebemos o pagamento de suas comissões no valor de *R$ ${totalPaid.toFixed(2)}*.\n\nDetalhes:\n${paidEarnings.map((c) => `- ${format(c.date ? new Date(c.date) : new Date(c.created), "dd/MM/yyyy")}: R$ ${(c.amount || 0).toFixed(2)} (${typeMap[c.type] || c.type})`).join("\n")}`;
			if (paidDeductions.length > 0) receiptText += `\n\nDeduções / Consumo Interno:\n${paidDeductions.map((c) => `- ${format(c.date ? new Date(c.date) : new Date(c.created), "dd/MM/yyyy")}: R$ ${(c.amount || 0).toFixed(2)} (${typeMap[c.type] || c.type})`).join("\n")}`;
			receiptText += `\n\nObrigado!`;
			const cleanPhone = (barberToPay?.expand?.user_id?.whatsapp || barberToPay?.expand?.user_id?.phone || "").replace(/\D/g, "");
			const url = cleanPhone ? `https://api.whatsapp.com/send?phone=55${cleanPhone}&text=${encodeURIComponent(receiptText)}` : `https://api.whatsapp.com/send?text=${encodeURIComponent(receiptText)}`;
			const paymentMethodName = paymentMethod === "pix" ? "Pix" : paymentMethod === "cash" ? "Dinheiro" : paymentMethod === "debito" ? "Débito" : "Crédito";
			setPaymentReceiptDetails({
				barberName: barberToPay?.name,
				date: /* @__PURE__ */ new Date(),
				items: paidItems,
				total: totalPaid,
				method: paymentMethodName
			});
			setPaymentReceipt({
				url,
				text: receiptText
			});
			toast({ title: "Pagamento registrado com sucesso!" });
			setPayDialog(false);
			setReceiptDialog(true);
			loadData();
		} catch (e) {
			toast({
				title: "Erro ao processar pagamento",
				description: getErrorMessage(e),
				variant: "destructive"
			});
		} finally {
			setIsPaying(false);
		}
	};
	const mapCommPayMethod = (pm) => {
		if (pm === "credito") return "credit_card";
		if (pm === "debito") return "debit_card";
		return pm;
	};
	const ticketData = (0, import_react.useMemo)(() => {
		if (!ticketItem) return null;
		const comms = ticketItem.comms || [];
		const pmType = ticketItem.commissionObj?.payment_method || "other";
		const matchedPm = paymentMethods.find((p) => p.type === mapCommPayMethod(pmType) || p.name.toLowerCase() === pmType.toLowerCase());
		const feePercentage = matchedPm?.fee_percentage || 0;
		const isSocio = selectedBarberDetailed?.work_level === "socio";
		const commissionableItemsCalc = comms.map((c) => {
			const isCommissionable = c.amount !== 0 || isSocio && c._itemPrice > 0;
			return {
				item: c._itemName,
				type: typeMap[c.type] || c.type,
				price: c._itemPrice,
				netCommission: c.amount || 0,
				isCommissionable,
				commissionInfo: c._commissionInfo,
				rawType: c.type
			};
		}).filter((i) => i.isCommissionable);
		const nonCommissionableItemsCalc = comms.map((c) => {
			const isCommissionable = c.amount !== 0 || isSocio && c._itemPrice > 0;
			return {
				item: c._itemName,
				type: typeMap[c.type] || c.type,
				price: c._itemPrice,
				netCommission: c.amount || 0,
				isCommissionable,
				rawType: c.type
			};
		}).filter((i) => !i.isCommissionable);
		const nonCommProductsLocal = nonCommissionableItemsCalc.filter((i) => i.rawType === "product");
		const nonCommOthersLocal = nonCommissionableItemsCalc.filter((i) => i.rawType !== "product");
		const commissionBaseCalc = commissionableItemsCalc.reduce((acc, i) => acc + i.price, 0);
		const memoryLines = commissionableItemsCalc.map((i) => {
			let rateStr = "";
			if (isSocio) rateStr = `Sócio 100%`;
			else if (i.commissionInfo?.type === "percentage") rateStr = `${i.commissionInfo.value}%`;
			else if (i.commissionInfo?.type === "fixed") rateStr = `Fixo R$ ${i.commissionInfo.value.toFixed(2)}`;
			else rateStr = "Desconhecido";
			return {
				label: `${i.item} (${rateStr})`,
				value: i.netCommission
			};
		});
		const paymentMethodName = ticketItem.packageUsed ? "Uso de Pacote" : ticketItem.checkoutObj?.payment_method || matchedPm?.name || pmType || "Não informado";
		return {
			professionalName: selectedBarberDetailed?.name,
			clientName: ticketItem.client,
			date: ticketItem.date || ticketItem.commDate,
			paymentMethodName,
			checkoutNumber: ticketItem.checkoutNumber,
			snapshot: ticketItem.checkoutObj?.items_snapshot || null,
			totalPaid: ticketItem.price,
			nonCommProducts: nonCommProductsLocal,
			nonCommOthers: nonCommOthersLocal,
			commissionableItems: commissionableItemsCalc,
			commissionBase: commissionBaseCalc,
			memoryLines,
			feePercentage,
			netCommission: ticketItem.commission
		};
	}, [
		ticketItem,
		selectedBarberDetailed,
		paymentMethods
	]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const payload = { ...form };
			if (payload.work_level === "socio") {
				payload.commission_type = "percentage";
				payload.commission_value = 100;
			} else payload.commission_value = Math.max(0, Number(payload.commission_value));
			if (payload.id) {
				const { id, ...data } = payload;
				await updateBarber(id, data);
				toast({ title: "Profissional atualizado!" });
			} else {
				const { id, ...data } = payload;
				await createBarber(data);
				toast({ title: "Profissional salvo!" });
			}
			setBDialog(false);
			loadData();
		} catch (err) {
			toast({
				title: "Erro ao salvar",
				description: getErrorMessage(err),
				variant: "destructive"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Staff.tsx:865:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-6xl mx-auto pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Staff.tsx:866:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/Staff.tsx:867:9",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold tracking-tight",
					children: "Equipes & Comissões"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Staff.tsx:868:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Gestão de profissionais e acompanhamento de comissões."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Staff.tsx:873:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Staff.tsx:874:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Staff.tsx:875:11",
							"data-prohibitions": "[]",
							variant: dateFilter === "all_time" ? "default" : "outline",
							size: "sm",
							onClick: () => setDateFilter("all_time"),
							children: "Período Todo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Staff.tsx:882:11",
							"data-prohibitions": "[]",
							variant: dateFilter === "this_month" ? "default" : "outline",
							size: "sm",
							onClick: () => setDateFilter("this_month"),
							children: "Este mês"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Staff.tsx:889:11",
							"data-prohibitions": "[]",
							variant: dateFilter === "this_week" ? "default" : "outline",
							size: "sm",
							onClick: () => setDateFilter("this_week"),
							children: "Esta semana"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Staff.tsx:896:11",
							"data-prohibitions": "[]",
							variant: dateFilter === "last_30" ? "default" : "outline",
							size: "sm",
							onClick: () => setDateFilter("last_30"),
							children: "Últimos 30 dias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Staff.tsx:903:11",
							"data-prohibitions": "[]",
							variant: dateFilter === "last_7" ? "default" : "outline",
							size: "sm",
							onClick: () => setDateFilter("last_7"),
							children: "Últimos 7 dias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							"data-uid": "src/pages/Staff.tsx:910:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								"data-uid": "src/pages/Staff.tsx:911:13",
								"data-prohibitions": "[editContent]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/Staff.tsx:912:15",
									"data-prohibitions": "[editContent]",
									variant: dateFilter === "custom" ? "default" : "outline",
									size: "sm",
									className: "gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
										"data-uid": "src/pages/Staff.tsx:917:17",
										"data-prohibitions": "[editContent]",
										className: "size-4"
									}), dateFilter === "custom" && dateRange?.from ? dateRange.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										format(dateRange.from, "dd/MM/yy"),
										" - ",
										format(dateRange.to, "dd/MM/yy")
									] }) : format(dateRange.from, "dd/MM/yy") : "Intervalo"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								"data-uid": "src/pages/Staff.tsx:931:13",
								"data-prohibitions": "[]",
								className: "w-auto p-0",
								align: "end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
									"data-uid": "src/pages/Staff.tsx:932:15",
									"data-prohibitions": "[editContent]",
									initialFocus: true,
									mode: "range",
									defaultMonth: dateRange?.from,
									selected: dateRange,
									onSelect: (range) => {
										setDateRange(range);
										setDateFilter("custom");
									},
									numberOfMonths: 2
								})
							})]
						})
					]
				}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Staff.tsx:947:11",
					"data-prohibitions": "[editContent]",
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Staff.tsx:948:13",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						onClick: handleReconcile,
						disabled: isReconciling,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							"data-uid": "src/pages/Staff.tsx:949:15",
							"data-prohibitions": "[editContent]",
							className: `size-4 mr-2 ${isReconciling ? "animate-spin" : ""}`
						}), "Recalcular"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Staff.tsx:952:13",
						"data-prohibitions": "[]",
						onClick: openBarber,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-uid": "src/pages/Staff.tsx:953:15",
							"data-prohibitions": "[editContent]",
							className: "size-4 mr-2"
						}), " Adicionar Profissional"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/Staff.tsx:959:7",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/Staff.tsx:960:9",
					"data-prohibitions": "[editContent]",
					className: "p-0 overflow-x-auto overflow-y-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/Staff.tsx:961:11",
						"data-prohibitions": "[editContent]",
						className: "min-w-[800px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/Staff.tsx:962:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Staff.tsx:963:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Staff.tsx:964:17",
										"data-prohibitions": "[]",
										className: "whitespace-nowrap",
										children: "Profissional"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Staff.tsx:965:17",
										"data-prohibitions": "[]",
										className: "whitespace-nowrap",
										children: "Contato (WhatsApp)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Staff.tsx:966:17",
										"data-prohibitions": "[]",
										className: "whitespace-nowrap",
										children: "Nível"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Staff.tsx:967:17",
										"data-prohibitions": "[]",
										className: "whitespace-nowrap",
										children: "Comissão a Receber"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Staff.tsx:968:17",
										"data-prohibitions": "[]",
										className: "whitespace-nowrap",
										children: "A Pagar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Staff.tsx:969:17",
										"data-prohibitions": "[]",
										className: "text-right whitespace-nowrap",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/pages/Staff.tsx:972:13",
							"data-prohibitions": "[editContent]",
							children: [barbers.map((b) => {
								const pendingComms = commissions.filter((c) => c.barber_id === b.id).filter((c) => c.status !== "paid");
								const aReceber = pendingComms.reduce((acc, c) => acc + (c.amount || 0), 0);
								const earliestDue = pendingComms.reduce((earliest, c) => {
									const cDate = c.due_date ? new Date(c.due_date) : getNextPayDate(c.date ? new Date(c.date) : new Date(c.created), b.payment_schedule_config);
									if (!earliest || cDate < earliest) return cDate;
									return earliest;
								}, null);
								const displayPayDate = earliestDue ? format(earliestDue, "dd/MM/yyyy") : format(getNextPayDate(/* @__PURE__ */ new Date(), b.payment_schedule_config), "dd/MM/yyyy");
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									"data-uid": "src/pages/Staff.tsx:996:19",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Staff.tsx:997:21",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:998:23",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"data-uid": "src/pages/Staff.tsx:999:25",
													"data-prohibitions": "[editContent]",
													className: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0",
													children: b.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														"data-uid": "src/pages/Staff.tsx:1001:29",
														"data-prohibitions": "[editContent]",
														src: b.avatar,
														alt: b.name,
														className: "h-full w-full object-cover"
													}) : b.expand?.user_id?.avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														"data-uid": "src/pages/Staff.tsx:1007:29",
														"data-prohibitions": "[editContent]",
														src: pb.files.getUrl(b.expand.user_id, b.expand.user_id.avatar),
														alt: b.name,
														className: "h-full w-full object-cover"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/Staff.tsx:1013:29",
														"data-prohibitions": "[editContent]",
														className: "text-primary font-bold",
														children: b.name.charAt(0).toUpperCase()
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"data-uid": "src/pages/Staff.tsx:1018:25",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/Staff.tsx:1019:27",
														"data-prohibitions": "[editContent]",
														children: b.name
													})
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Staff.tsx:1023:21",
											"data-prohibitions": "[editContent]",
											children: b.expand?.user_id?.whatsapp || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Staff.tsx:1025:25",
												"data-prohibitions": "[]",
												className: "text-muted-foreground italic",
												children: "Não informado"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Staff.tsx:1028:21",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Staff.tsx:1029:23",
												"data-prohibitions": "[editContent]",
												variant: "outline",
												className: b.work_level === "socio" ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700" : "bg-slate-100 text-slate-800 border-slate-300",
												children: b.work_level === "socio" ? "Sócio" : "Autônomo"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
											"data-uid": "src/pages/Staff.tsx:1040:21",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-base text-amber-600",
											children: ["R$ ", aReceber.toFixed(2)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Staff.tsx:1043:21",
											"data-prohibitions": "[editContent]",
											children: b.work_level === "socio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Staff.tsx:1045:25",
												"data-prohibitions": "[]",
												className: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide border-0 shadow-sm",
												children: "Pago na hora"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1049:25",
												"data-prohibitions": "[editContent]",
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Staff.tsx:1050:27",
													"data-prohibitions": "[editContent]",
													className: "font-bold text-yellow-500 dark:text-yellow-400",
													children: displayPayDate
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Staff.tsx:1053:27",
													"data-prohibitions": "[]",
													className: "text-xs text-muted-foreground",
													children: "Próx. Acerto"
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Staff.tsx:1057:21",
											"data-prohibitions": "[editContent]",
											className: "text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1058:23",
												"data-prohibitions": "[editContent]",
												className: "flex justify-end gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Staff.tsx:1059:25",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														onClick: () => openDetailedReport(b),
														title: "Relatório Detalhado",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
															"data-uid": "src/pages/Staff.tsx:1065:27",
															"data-prohibitions": "[editContent]",
															className: "size-4 text-emerald-600"
														})
													}),
													canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Staff.tsx:1068:27",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														onClick: () => openPayModal(b),
														title: "Pagar Comissões",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
															"data-uid": "src/pages/Staff.tsx:1074:29",
															"data-prohibitions": "[editContent]",
															className: "size-4 text-blue-600"
														})
													}),
													canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Staff.tsx:1078:27",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														onClick: () => editBarber(b),
														title: "Editar Profissional",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
															"data-uid": "src/pages/Staff.tsx:1084:29",
															"data-prohibitions": "[editContent]",
															className: "size-4 text-slate-600"
														})
													})
												]
											})
										})
									]
								}, b.id);
							}), barbers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/Staff.tsx:1093:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/Staff.tsx:1094:19",
									"data-prohibitions": "[]",
									colSpan: 6,
									className: "text-center py-6 text-muted-foreground",
									children: "Nenhum profissional encontrado."
								})
							})]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Staff.tsx:1104:7",
				"data-prohibitions": "[editContent]",
				open: !!selectedBarberDetailed,
				onOpenChange: (v) => !v && setSelectedBarberDetailed(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Staff.tsx:1108:9",
					"data-prohibitions": "[editContent]",
					className: "max-w-[95vw] lg:max-w-6xl xl:max-w-7xl max-h-[90vh] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/Staff.tsx:1109:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/Staff.tsx:1110:13",
								"data-prohibitions": "[editContent]",
								children: ["Relatório Financeiro - ", selectedBarberDetailed?.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1111:13",
								"data-prohibitions": "[editContent]",
								className: "flex flex-wrap gap-2 sm:mr-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/Staff.tsx:1112:15",
										"data-prohibitions": "[]",
										value: reportStatusFilter,
										onValueChange: setReportStatusFilter,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/Staff.tsx:1113:17",
											"data-prohibitions": "[]",
											className: "w-[140px] h-9",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/Staff.tsx:1114:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Status"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/Staff.tsx:1116:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Staff.tsx:1117:19",
													"data-prohibitions": "[]",
													value: "tudo",
													children: "Tudo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Staff.tsx:1118:19",
													"data-prohibitions": "[]",
													value: "pago",
													children: "Pago"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Staff.tsx:1119:19",
													"data-prohibitions": "[]",
													value: "a_pagar",
													children: "A Pagar"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/Staff.tsx:1122:15",
										"data-prohibitions": "[editContent]",
										variant: "outline",
										size: "sm",
										onClick: async () => {
											await handleReconcile();
											if (selectedBarberDetailed) openDetailedReport(selectedBarberDetailed);
										},
										disabled: isReconciling,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
											"data-uid": "src/pages/Staff.tsx:1133:17",
											"data-prohibitions": "[editContent]",
											className: `size-4 mr-2 ${isReconciling ? "animate-spin" : ""}`
										}), "Recalcular"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/Staff.tsx:1136:15",
										"data-prohibitions": "[]",
										variant: "outline",
										size: "sm",
										onClick: printReport,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
											"data-uid": "src/pages/Staff.tsx:1137:17",
											"data-prohibitions": "[editContent]",
											className: "size-4 mr-2"
										}), " Imprimir"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Staff.tsx:1142:11",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/Staff.tsx:1143:13",
									"data-prohibitions": "[editContent]",
									className: "bg-muted/30 border-none shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/Staff.tsx:1144:15",
										"data-prohibitions": "[editContent]",
										className: "p-4 flex flex-col items-center justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Staff.tsx:1145:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-muted-foreground uppercase tracking-wider",
											children: "Total Vendas"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/Staff.tsx:1148:17",
											"data-prohibitions": "[editContent]",
											className: "text-2xl font-bold mt-1",
											children: ["R$ ", reportSummary.totalVendas.toFixed(2)]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/Staff.tsx:1153:13",
									"data-prohibitions": "[editContent]",
									className: "bg-emerald-50 border-emerald-100 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/Staff.tsx:1154:15",
										"data-prohibitions": "[editContent]",
										className: "p-4 flex flex-col items-center justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Staff.tsx:1155:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-emerald-700 uppercase tracking-wider",
											children: "Total Pago"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/Staff.tsx:1158:17",
											"data-prohibitions": "[editContent]",
											className: "text-2xl font-bold text-emerald-600 mt-1",
											children: ["R$ ", reportSummary.totalPago.toFixed(2)]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/Staff.tsx:1163:13",
									"data-prohibitions": "[editContent]",
									className: "bg-amber-50 border-amber-100 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/Staff.tsx:1164:15",
										"data-prohibitions": "[editContent]",
										className: "p-4 flex flex-col items-center justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Staff.tsx:1165:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-amber-700 uppercase tracking-wider",
											children: "Total a Pagar"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/Staff.tsx:1168:17",
											"data-prohibitions": "[editContent]",
											className: "text-2xl font-bold text-amber-600 mt-1",
											children: ["R$ ", reportSummary.totalAPagar.toFixed(2)]
										})]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Staff.tsx:1175:11",
							"data-prohibitions": "[editContent]",
							className: "flex-1 mt-4 min-h-0 bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Staff.tsx:1176:13",
								"data-prohibitions": "[editContent]",
								id: "printable-report",
								className: "h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
									"data-uid": "src/pages/Staff.tsx:1177:15",
									"data-prohibitions": "[editContent]",
									wrapperClassName: "styled-scrollbar border-none",
									className: "min-w-[1100px] border-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										"data-uid": "src/pages/Staff.tsx:1181:17",
										"data-prohibitions": "[]",
										className: "border-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/Staff.tsx:1182:19",
											"data-prohibitions": "[]",
											className: "border-none hover:bg-transparent",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1183:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap sticky left-0 z-20 bg-background px-4 py-3 border-none",
													children: "# Checkout"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1186:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap px-4 py-3 border-none",
													children: "Data/Hora"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1189:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap px-4 py-3 border-none",
													children: "Tipo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1190:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap min-w-[200px] px-4 py-3 border-none",
													children: "Descrição"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1193:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap px-4 py-3 border-none",
													children: "Cliente"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1196:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap px-4 py-3 border-none",
													children: "Vencimento"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1199:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap px-4 py-3 border-none",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1202:21",
													"data-prohibitions": "[]",
													className: "text-right whitespace-nowrap px-4 py-3 border-none",
													children: "Valor Bruto"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1205:21",
													"data-prohibitions": "[]",
													className: "text-right whitespace-nowrap px-4 py-3 border-none",
													children: "Comissão"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1208:21",
													"data-prohibitions": "[]",
													className: "text-right whitespace-nowrap sticky right-0 z-20 bg-background px-4 py-3 border-none",
													children: "Ações"
												})
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
										"data-uid": "src/pages/Staff.tsx:1213:17",
										"data-prohibitions": "[editContent]",
										className: "border-none",
										children: [displayedReportItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/Staff.tsx:1215:21",
											"data-prohibitions": "[editContent]",
											className: "group/row border-none hover:bg-muted/50 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1219:23",
													"data-prohibitions": "[editContent]",
													className: "font-mono text-muted-foreground sticky left-0 z-10 bg-background group-hover/row:bg-muted/50 transition-colors px-4 py-3 border-none",
													children: item.checkoutNumber ? `#${item.checkoutNumber}` : "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1222:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: [
														format(item.date, "dd/MM/yyyy"),
														" às ",
														item.time
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1225:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/Staff.tsx:1226:25",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: item.type === "Pedido" ? "bg-orange-100 text-orange-800 border-orange-200" : item.type === "Serviço" ? "bg-blue-100 text-blue-800 border-blue-200" : item.type === "Produto" ? "bg-purple-100 text-purple-800 border-purple-200" : "bg-gray-100 text-gray-800 border-gray-200",
														children: item.type
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1241:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: item.item
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1242:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: item.client
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1243:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/Staff.tsx:1244:25",
														"data-prohibitions": "[editContent]",
														className: "font-medium text-muted-foreground",
														children: item.dueDate ? format(item.dueDate, "dd/MM/yyyy") : format(getNextPayDate(item.commDate, selectedBarberDetailed?.payment_schedule_config), "dd/MM/yyyy")
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1256:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/Staff.tsx:1257:25",
														"data-prohibitions": "[editContent]",
														className: cn("font-bold uppercase border-0 text-[11px] tracking-wider shadow-sm", item.status === "paid" ? "bg-[#10b981] hover:bg-[#059669] text-white" : item.status === "partial" ? "bg-orange-400 hover:bg-orange-500 text-white" : "bg-[#f59e0b] hover:bg-[#d97706] text-white"),
														children: item.status === "paid" ? "Pago" : item.status === "partial" ? "Parcial" : "Pendente"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1274:23",
													"data-prohibitions": "[editContent]",
													className: "text-right px-4 py-3 border-none",
													children: ["R$ ", item.price.toFixed(2)]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1277:23",
													"data-prohibitions": "[editContent]",
													className: `text-right font-semibold px-4 py-3 border-none ${item.commission < 0 ? "text-red-600" : "text-emerald-600"}`,
													children: ["R$ ", item.commission.toFixed(2)]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1282:23",
													"data-prohibitions": "[]",
													className: "text-right sticky right-0 z-10 bg-background group-hover/row:bg-muted/50 transition-colors px-4 py-3 border-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Staff.tsx:1283:25",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														onClick: () => setTicketItem(item),
														title: "Memória de Cálculo",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
															"data-uid": "src/pages/Staff.tsx:1289:27",
															"data-prohibitions": "[editContent]",
															className: "size-4 text-slate-600"
														})
													})
												})
											]
										}, `${item.id}-${i}`)), displayedReportItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
											"data-uid": "src/pages/Staff.tsx:1295:21",
											"data-prohibitions": "[]",
											className: "border-none",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Staff.tsx:1296:23",
												"data-prohibitions": "[]",
												colSpan: 10,
												className: "text-center py-8 text-muted-foreground border-none",
												children: "Nenhuma transação encontrada com os filtros selecionados."
											})
										})]
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							"data-uid": "src/pages/Staff.tsx:1308:11",
							"data-prohibitions": "[]",
							className: "mt-4 border-t pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Staff.tsx:1309:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								onClick: () => setSelectedBarberDetailed(null),
								children: "Fechar"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Staff.tsx:1316:7",
				"data-prohibitions": "[]",
				className: "mt-8 border-none shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/Staff.tsx:1317:9",
					"data-prohibitions": "[]",
					className: "bg-muted/30 pb-4 border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/Staff.tsx:1318:11",
						"data-prohibitions": "[]",
						className: "text-xl",
						children: "Configurações de Pagamento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/Staff.tsx:1319:11",
						"data-prohibitions": "[]",
						children: "As regras de vencimento agora são configuradas individualmente para cada profissional Autônomo."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/Staff.tsx:1324:9",
					"data-prohibitions": "[]",
					className: "pt-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Staff.tsx:1325:11",
						"data-prohibitions": "[]",
						className: "p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Staff.tsx:1326:13",
							"data-prohibitions": "[]",
							className: "mt-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Staff.tsx:1327:15",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "bg-blue-100 text-blue-800 border-blue-200",
								children: "Autônomo"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/Staff.tsx:1331:13",
							"data-prohibitions": "[]",
							className: "text-sm text-blue-800 dark:text-blue-200",
							children: "As datas da coluna \"A Pagar\" são calculadas automaticamente com base nos ciclos definidos no perfil de cada profissional."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Staff.tsx:1336:11",
						"data-prohibitions": "[]",
						className: "p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Staff.tsx:1337:13",
							"data-prohibitions": "[]",
							className: "mt-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Staff.tsx:1338:15",
								"data-prohibitions": "[]",
								className: "bg-emerald-500 hover:bg-emerald-600 border-0",
								children: "Sócio"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-uid": "src/pages/Staff.tsx:1340:13",
							"data-prohibitions": "[]",
							className: "text-sm text-emerald-800 dark:text-emerald-200",
							children: [
								"Profissionais com nível de trabalho configurado como \"Sócio\" recebem comissionamento integral. O status de suas transações é sempre classificado como",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									"data-uid": "src/pages/Staff.tsx:1343:15",
									"data-prohibitions": "[]",
									children: "\"Pago na hora\""
								}),
								"."
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Staff.tsx:1349:7",
				"data-prohibitions": "[editContent]",
				open: bDialog,
				onOpenChange: setBDialog,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Staff.tsx:1350:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-[425px] max-h-[85vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						"data-uid": "src/pages/Staff.tsx:1351:11",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/pages/Staff.tsx:1352:13",
							"data-prohibitions": "[editContent]",
							children: form.id ? "Editar Profissional" : "Novo Profissional"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						"data-uid": "src/pages/Staff.tsx:1354:11",
						"data-prohibitions": "[editContent]",
						onSubmit: handleSubmit,
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1355:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/Staff.tsx:1356:15",
									"data-prohibitions": "[]",
									children: "Nome"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/Staff.tsx:1357:15",
									"data-prohibitions": "[editContent]",
									required: true,
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1363:13",
								"data-prohibitions": "[]",
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1364:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Staff.tsx:1365:17",
										"data-prohibitions": "[]",
										children: "Nível de Trabalho"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/Staff.tsx:1366:17",
										"data-prohibitions": "[]",
										value: form.work_level,
										onValueChange: (v) => setForm({
											...form,
											work_level: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/Staff.tsx:1370:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/Staff.tsx:1371:21",
												"data-prohibitions": "[editContent]"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/Staff.tsx:1373:19",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1374:21",
												"data-prohibitions": "[]",
												value: "autonomo",
												children: "Autônomo (Comissionado)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1375:21",
												"data-prohibitions": "[]",
												value: "socio",
												children: "Sócio (100% Repasse)"
											})]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1380:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Staff.tsx:1381:17",
										"data-prohibitions": "[]",
										children: "Regime (Disponibilidade)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/Staff.tsx:1382:17",
										"data-prohibitions": "[]",
										value: form.work_regime || "fixed",
										onValueChange: (v) => setForm({
											...form,
											work_regime: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/Staff.tsx:1386:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/Staff.tsx:1387:21",
												"data-prohibitions": "[editContent]"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/Staff.tsx:1389:19",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1390:21",
												"data-prohibitions": "[]",
												value: "fixed",
												children: "Horário Fixo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1391:21",
												"data-prohibitions": "[]",
												value: "on_demand",
												children: "Sob Demanda"
											})]
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1397:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/Staff.tsx:1398:15",
									"data-prohibitions": "[]",
									children: "Cor de Identificação"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1399:15",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Staff.tsx:1400:17",
										"data-prohibitions": "[editContent]",
										type: "color",
										value: form.color || "#3b82f6",
										onChange: (e) => setForm({
											...form,
											color: e.target.value
										}),
										className: "w-12 h-10 p-1 cursor-pointer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Staff.tsx:1406:17",
										"data-prohibitions": "[editContent]",
										type: "text",
										value: form.color || "#3b82f6",
										onChange: (e) => setForm({
											...form,
											color: e.target.value
										}),
										className: "flex-1 font-mono uppercase",
										placeholder: "#000000"
									})]
								})]
							}),
							form.work_level === "autonomo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1417:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-4 border p-4 rounded-lg bg-muted/20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1418:17",
										"data-prohibitions": "[]",
										className: "grid grid-cols-2 gap-4 pb-4 border-b border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1419:19",
											"data-prohibitions": "[]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Staff.tsx:1420:21",
												"data-prohibitions": "[]",
												className: "text-sm",
												children: "Tipo de Comissão"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/Staff.tsx:1421:21",
												"data-prohibitions": "[]",
												value: form.commission_type || "percentage",
												onValueChange: (v) => setForm({
													...form,
													commission_type: v
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/Staff.tsx:1425:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/Staff.tsx:1426:25",
														"data-prohibitions": "[editContent]"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/Staff.tsx:1428:23",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Staff.tsx:1429:25",
														"data-prohibitions": "[]",
														value: "percentage",
														children: "Porcentagem (%)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Staff.tsx:1430:25",
														"data-prohibitions": "[]",
														value: "fixed",
														children: "Valor Fixo (R$)"
													})]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1434:19",
											"data-prohibitions": "[]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Staff.tsx:1435:21",
												"data-prohibitions": "[]",
												className: "text-sm",
												children: "Valor Base"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/Staff.tsx:1436:21",
												"data-prohibitions": "[editContent]",
												type: "number",
												min: "0",
												step: "0.01",
												value: form.commission_value ?? "",
												onChange: (e) => setForm({
													...form,
													commission_value: e.target.value
												}),
												placeholder: form.commission_type === "percentage" ? "%" : "R$"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/Staff.tsx:1447:17",
										"data-prohibitions": "[]",
										className: "flex items-center justify-between pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Staff.tsx:1448:19",
											"data-prohibitions": "[]",
											className: "text-base font-semibold",
											children: "Configuração de Pagamento"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1451:17",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Staff.tsx:1452:19",
											"data-prohibitions": "[]",
											className: "text-sm",
											children: "Frequência"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/Staff.tsx:1453:19",
											"data-prohibitions": "[]",
											value: form.payment_schedule_config?.frequency || "semanal",
											onValueChange: (v) => setForm({
												...form,
												payment_schedule_config: {
													...form.payment_schedule_config,
													frequency: v
												}
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/Staff.tsx:1462:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/Staff.tsx:1463:23",
													"data-prohibitions": "[editContent]"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
												"data-uid": "src/pages/Staff.tsx:1465:21",
												"data-prohibitions": "[]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Staff.tsx:1466:23",
													"data-prohibitions": "[]",
													value: "semanal",
													children: "Semanal"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Staff.tsx:1467:23",
													"data-prohibitions": "[]",
													value: "quinzenal",
													children: "Quinzenal"
												})]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1472:17",
										"data-prohibitions": "[editContent]",
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1473:19",
												"data-prohibitions": "[]",
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													"data-uid": "src/pages/Staff.tsx:1474:21",
													"data-prohibitions": "[]",
													className: "text-sm",
													children: "Ciclos de Pagamento"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													"data-uid": "src/pages/Staff.tsx:1475:21",
													"data-prohibitions": "[]",
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: addCycle,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
														"data-uid": "src/pages/Staff.tsx:1476:23",
														"data-prohibitions": "[editContent]",
														className: "size-3 mr-1"
													}), " Adicionar"]
												})]
											}),
											form.payment_schedule_config?.cycles?.map((cycle, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1481:21",
												"data-prohibitions": "[editContent]",
												className: "border p-3 rounded-md space-y-3 bg-background relative",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Staff.tsx:1485:23",
														"data-prohibitions": "[]",
														type: "button",
														variant: "ghost",
														size: "icon",
														className: "absolute right-2 top-2 h-6 w-6 text-destructive hover:bg-destructive/10",
														onClick: () => removeCycle(index),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {
															"data-uid": "src/pages/Staff.tsx:1492:25",
															"data-prohibitions": "[editContent]",
															className: "size-3"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/Staff.tsx:1495:23",
														"data-prohibitions": "[editContent]",
														className: "space-y-2 pr-8",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															"data-uid": "src/pages/Staff.tsx:1496:25",
															"data-prohibitions": "[]",
															className: "text-xs text-muted-foreground",
															children: "Dias Trabalhados"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															"data-uid": "src/pages/Staff.tsx:1497:25",
															"data-prohibitions": "[editContent]",
															className: "flex flex-wrap gap-2",
															children: WEEK_DAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/Staff.tsx:1499:29",
																"data-prohibitions": "[editContent]",
																className: "flex items-center space-x-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																	"data-uid": "src/pages/Staff.tsx:1500:31",
																	"data-prohibitions": "[editContent]",
																	id: `cycle-${index}-day-${day.value}`,
																	checked: cycle.workDays?.includes(day.value),
																	onCheckedChange: (checked) => updateCycleWorkDays(index, day.value, !!checked)
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																	"data-uid": "src/pages/Staff.tsx:1507:31",
																	"data-prohibitions": "[editContent]",
																	htmlFor: `cycle-${index}-day-${day.value}`,
																	className: "text-xs font-normal cursor-pointer",
																	children: day.label
																})]
															}, day.value))
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/Staff.tsx:1518:23",
														"data-prohibitions": "[editContent]",
														className: "space-y-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															"data-uid": "src/pages/Staff.tsx:1519:25",
															"data-prohibitions": "[]",
															className: "text-xs text-muted-foreground",
															children: "Dia do Pagamento"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
															"data-uid": "src/pages/Staff.tsx:1520:25",
															"data-prohibitions": "[editContent]",
															value: cycle.paymentDay?.toString(),
															onValueChange: (v) => updateCyclePaymentDay(index, parseInt(v)),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																"data-uid": "src/pages/Staff.tsx:1524:27",
																"data-prohibitions": "[]",
																className: "h-8",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																	"data-uid": "src/pages/Staff.tsx:1525:29",
																	"data-prohibitions": "[editContent]"
																})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
																"data-uid": "src/pages/Staff.tsx:1527:27",
																"data-prohibitions": "[editContent]",
																children: WEEK_DAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																	"data-uid": "src/pages/Staff.tsx:1529:31",
																	"data-prohibitions": "[editContent]",
																	value: day.value.toString(),
																	children: day.label
																}, day.value))
															})]
														})]
													})
												]
											}, index)),
											(!form.payment_schedule_config?.cycles || form.payment_schedule_config.cycles.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Staff.tsx:1540:21",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground text-center py-2 border border-dashed rounded-md",
												children: "Nenhum ciclo configurado."
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
								"data-uid": "src/pages/Staff.tsx:1548:13",
								"data-prohibitions": "[]",
								className: "pt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/Staff.tsx:1549:15",
									"data-prohibitions": "[]",
									type: "submit",
									children: "Salvar"
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Staff.tsx:1555:7",
				"data-prohibitions": "[editContent]",
				open: payDialog,
				onOpenChange: setPayDialog,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Staff.tsx:1556:9",
					"data-prohibitions": "[editContent]",
					className: "max-w-3xl max-h-[90vh] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/Staff.tsx:1557:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/Staff.tsx:1558:13",
								"data-prohibitions": "[editContent]",
								children: ["Pagar Comissões - ", barberToPay?.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/Staff.tsx:1559:13",
								"data-prohibitions": "[]",
								children: "Selecione as comissões que deseja baixar como pagas."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Staff.tsx:1564:11",
							"data-prohibitions": "[editContent]",
							className: "overflow-x-auto overflow-y-auto flex-1 mt-4 border rounded-md max-h-[40vh]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/Staff.tsx:1565:13",
								"data-prohibitions": "[editContent]",
								className: "min-w-[500px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/pages/Staff.tsx:1566:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Staff.tsx:1567:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Staff.tsx:1568:19",
												"data-prohibitions": "[]",
												className: "w-[50px]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													"data-uid": "src/pages/Staff.tsx:1569:21",
													"data-prohibitions": "[editContent]",
													checked: selectedComms.length === pendingCommsToPay.length && pendingCommsToPay.length > 0,
													onCheckedChange: (c) => handleToggleAll(!!c)
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Staff.tsx:1577:19",
												"data-prohibitions": "[]",
												className: "whitespace-nowrap",
												children: "Data"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Staff.tsx:1578:19",
												"data-prohibitions": "[]",
												className: "whitespace-nowrap",
												children: "Tipo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Staff.tsx:1579:19",
												"data-prohibitions": "[]",
												className: "text-right whitespace-nowrap",
												children: "Valor"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
									"data-uid": "src/pages/Staff.tsx:1582:15",
									"data-prohibitions": "[editContent]",
									children: (() => {
										const allEarnings = pendingCommsToPay.filter((c) => (c.amount || 0) >= 0);
										const allDeductions = pendingCommsToPay.filter((c) => (c.amount || 0) < 0);
										const periodComms = allEarnings.filter((c) => {
											const d = c.date ? new Date(c.date) : new Date(c.created);
											return d >= range.from && d <= range.to;
										});
										const previousComms = allEarnings.filter((c) => {
											return (c.date ? new Date(c.date) : new Date(c.created)) < range.from;
										});
										const futureComms = allEarnings.filter((c) => {
											return (c.date ? new Date(c.date) : new Date(c.created)) > range.to;
										});
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											periodComms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1604:27",
												"data-prohibitions": "[]",
												className: "bg-muted/50 hover:bg-muted/50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1605:29",
													"data-prohibitions": "[]",
													colSpan: 4,
													className: "font-semibold text-xs uppercase text-muted-foreground",
													children: "Comissões do Período"
												})
											}), periodComms.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1613:29",
												"data-prohibitions": "[editContent]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1614:31",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
															"data-uid": "src/pages/Staff.tsx:1615:33",
															"data-prohibitions": "[editContent]",
															checked: selectedComms.includes(c.id),
															onCheckedChange: () => handleToggleComm(c.id)
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1620:31",
														"data-prohibitions": "[editContent]",
														children: format(c.date ? new Date(c.date) : new Date(c.created), "dd/MM/yyyy")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1626:31",
														"data-prohibitions": "[editContent]",
														children: typeMap[c.type] || c.type
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1627:31",
														"data-prohibitions": "[editContent]",
														className: "text-right",
														children: ["R$ ", (c.amount || 0).toFixed(2)]
													})
												]
											}, c.id))] }),
											previousComms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1637:27",
												"data-prohibitions": "[]",
												className: "bg-muted/50 hover:bg-muted/50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1638:29",
													"data-prohibitions": "[]",
													colSpan: 4,
													className: "font-semibold text-xs uppercase text-muted-foreground",
													children: "Saldos Anteriores"
												})
											}), previousComms.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1646:29",
												"data-prohibitions": "[editContent]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1647:31",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
															"data-uid": "src/pages/Staff.tsx:1648:33",
															"data-prohibitions": "[editContent]",
															checked: selectedComms.includes(c.id),
															onCheckedChange: () => handleToggleComm(c.id)
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1653:31",
														"data-prohibitions": "[editContent]",
														children: format(c.date ? new Date(c.date) : new Date(c.created), "dd/MM/yyyy")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1659:31",
														"data-prohibitions": "[editContent]",
														children: typeMap[c.type] || c.type
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1660:31",
														"data-prohibitions": "[editContent]",
														className: "text-right",
														children: ["R$ ", (c.amount || 0).toFixed(2)]
													})
												]
											}, c.id))] }),
											futureComms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1670:27",
												"data-prohibitions": "[]",
												className: "bg-muted/50 hover:bg-muted/50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1671:29",
													"data-prohibitions": "[]",
													colSpan: 4,
													className: "font-semibold text-xs uppercase text-muted-foreground",
													children: "Comissões Futuras"
												})
											}), futureComms.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1679:29",
												"data-prohibitions": "[editContent]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1680:31",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
															"data-uid": "src/pages/Staff.tsx:1681:33",
															"data-prohibitions": "[editContent]",
															checked: selectedComms.includes(c.id),
															onCheckedChange: () => handleToggleComm(c.id)
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1686:31",
														"data-prohibitions": "[editContent]",
														children: format(c.date ? new Date(c.date) : new Date(c.created), "dd/MM/yyyy")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1692:31",
														"data-prohibitions": "[editContent]",
														children: typeMap[c.type] || c.type
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1693:31",
														"data-prohibitions": "[editContent]",
														className: "text-right",
														children: ["R$ ", (c.amount || 0).toFixed(2)]
													})
												]
											}, c.id))] }),
											allDeductions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1703:27",
												"data-prohibitions": "[]",
												className: "bg-red-50 hover:bg-red-50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1704:29",
													"data-prohibitions": "[]",
													colSpan: 4,
													className: "font-semibold text-xs uppercase text-red-600",
													children: "Deduções / Consumo Interno"
												})
											}), allDeductions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1712:29",
												"data-prohibitions": "[editContent]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1713:31",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
															"data-uid": "src/pages/Staff.tsx:1714:33",
															"data-prohibitions": "[editContent]",
															checked: selectedComms.includes(c.id),
															onCheckedChange: () => handleToggleComm(c.id)
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1719:31",
														"data-prohibitions": "[editContent]",
														children: format(c.date ? new Date(c.date) : new Date(c.created), "dd/MM/yyyy")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1725:31",
														"data-prohibitions": "[editContent]",
														className: "text-red-600",
														children: typeMap[c.type] || c.type
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1728:31",
														"data-prohibitions": "[editContent]",
														className: "text-right text-red-600 font-medium",
														children: ["R$ ", (c.amount || 0).toFixed(2)]
													})
												]
											}, c.id))] }),
											pendingCommsToPay.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1737:25",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1738:27",
													"data-prohibitions": "[]",
													colSpan: 4,
													className: "text-center py-8 text-muted-foreground",
													children: "Nenhuma comissão pendente encontrada."
												})
											})
										] });
									})()
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Staff.tsx:1750:11",
							"data-prohibitions": "[editContent]",
							className: "mt-4 flex flex-col gap-4 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1751:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-center bg-muted/30 p-4 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Staff.tsx:1752:15",
									"data-prohibitions": "[]",
									className: "font-semibold",
									children: "Total Selecionado:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/Staff.tsx:1753:15",
									"data-prohibitions": "[editContent]",
									className: "text-xl font-bold text-emerald-600",
									children: [
										"R$",
										" ",
										pendingCommsToPay.filter((c) => selectedComms.includes(c.id)).reduce((acc, c) => acc + (c.amount || 0), 0).toFixed(2)
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1762:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/Staff.tsx:1763:15",
									"data-prohibitions": "[]",
									children: "Forma de Pagamento"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/Staff.tsx:1764:15",
									"data-prohibitions": "[]",
									value: paymentMethod,
									onValueChange: setPaymentMethod,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/Staff.tsx:1765:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/Staff.tsx:1766:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione..."
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/Staff.tsx:1768:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1769:19",
												"data-prohibitions": "[]",
												value: "pix",
												children: "Pix"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1770:19",
												"data-prohibitions": "[]",
												value: "cash",
												children: "Dinheiro"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1771:19",
												"data-prohibitions": "[]",
												value: "debito",
												children: "Cartão de Débito"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1772:19",
												"data-prohibitions": "[]",
												value: "credito",
												children: "Cartão de Crédito"
											})
										]
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/Staff.tsx:1778:11",
							"data-prohibitions": "[editContent]",
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Staff.tsx:1779:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								onClick: () => setPayDialog(false),
								disabled: isPaying,
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Staff.tsx:1782:13",
								"data-prohibitions": "[editContent]",
								onClick: handleConfirmPayment,
								disabled: isPaying || selectedComms.length === 0,
								children: isPaying ? "Processando..." : "Confirmar Pagamento"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Staff.tsx:1792:7",
				"data-prohibitions": "[editContent]",
				open: receiptDialog,
				onOpenChange: setReceiptDialog,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Staff.tsx:1793:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md bg-stone-50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/Staff.tsx:1794:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/Staff.tsx:1795:13",
								"data-prohibitions": "[]",
								className: "text-center text-xl text-primary",
								children: "Pagamento Concluído!"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Staff.tsx:1800:11",
							"data-prohibitions": "[editContent]",
							className: "bg-white p-6 border-y-2 border-dashed border-gray-300 shadow-sm font-mono text-sm space-y-4 my-2 max-h-[50vh] overflow-y-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1801:13",
									"data-prohibitions": "[editContent]",
									className: "text-center space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											"data-uid": "src/pages/Staff.tsx:1802:15",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-lg",
											children: businessName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:1803:15",
											"data-prohibitions": "[]",
											children: "Recibo de Comissões"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:1804:15",
											"data-prohibitions": "[editContent]",
											children: format(paymentReceiptDetails?.date || /* @__PURE__ */ new Date(), "dd/MM/yyyy HH:mm")
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1807:13",
									"data-prohibitions": "[editContent]",
									className: "border-t border-dashed border-gray-300 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/Staff.tsx:1808:15",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/pages/Staff.tsx:1809:17",
												"data-prohibitions": "[]",
												children: "Profissional:"
											}),
											" ",
											paymentReceiptDetails?.barberName
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/Staff.tsx:1811:15",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/pages/Staff.tsx:1812:17",
												"data-prohibitions": "[]",
												children: "Forma de Pag.:"
											}),
											" ",
											paymentReceiptDetails?.method
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1816:13",
									"data-prohibitions": "[editContent]",
									className: "border-t border-dashed border-gray-300 pt-3 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1817:15",
											"data-prohibitions": "[]",
											className: "grid grid-cols-12 font-bold mb-1 border-b border-gray-100 pb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Staff.tsx:1818:17",
												"data-prohibitions": "[]",
												className: "col-span-8",
												children: "Descrição"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Staff.tsx:1819:17",
												"data-prohibitions": "[]",
												className: "col-span-4 text-right",
												children: "Valor"
											})]
										}),
										paymentReceiptDetails?.items.filter((i) => (i.amount || 0) >= 0).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1824:19",
											"data-prohibitions": "[editContent]",
											className: "grid grid-cols-12 text-gray-700 py-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1825:21",
												"data-prohibitions": "[editContent]",
												className: "col-span-8 truncate pr-2",
												title: `${format(item.date ? new Date(item.date) : new Date(item.created), "dd/MM/yy")} - ${typeMap[item.type] || item.type}`,
												children: [
													format(item.date ? new Date(item.date) : new Date(item.created), "dd/MM/yy"),
													" ",
													typeMap[item.type] || item.type
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1832:21",
												"data-prohibitions": "[editContent]",
												className: "col-span-4 text-right",
												children: ["R$ ", (item.amount || 0).toFixed(2)]
											})]
										}, i)),
										paymentReceiptDetails?.items.some((i) => (i.amount || 0) < 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Staff.tsx:1838:19",
											"data-prohibitions": "[]",
											className: "grid grid-cols-12 font-bold mt-4 mb-1 border-b border-gray-100 pb-1 text-red-800",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Staff.tsx:1839:21",
												"data-prohibitions": "[]",
												className: "col-span-12",
												children: "Deduções / Consumo Interno"
											})
										}), paymentReceiptDetails?.items.filter((i) => (i.amount || 0) < 0).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1844:23",
											"data-prohibitions": "[editContent]",
											className: "grid grid-cols-12 text-red-600 py-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1845:25",
												"data-prohibitions": "[editContent]",
												className: "col-span-8 truncate pr-2",
												title: `${format(item.date ? new Date(item.date) : new Date(item.created), "dd/MM/yy")} - ${typeMap[item.type] || item.type}`,
												children: [
													format(item.date ? new Date(item.date) : new Date(item.created), "dd/MM/yy"),
													" ",
													typeMap[item.type] || item.type
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1855:25",
												"data-prohibitions": "[editContent]",
												className: "col-span-4 text-right",
												children: ["R$ ", (item.amount || 0).toFixed(2)]
											})]
										}, `deduction-${i}`))] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1864:13",
									"data-prohibitions": "[editContent]",
									className: "border-t border-dashed border-gray-300 pt-3 flex justify-between font-bold text-base",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Staff.tsx:1865:15",
										"data-prohibitions": "[]",
										children: "TOTAL PAGO"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/Staff.tsx:1866:15",
										"data-prohibitions": "[editContent]",
										children: ["R$ ", paymentReceiptDetails?.total.toFixed(2)]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Staff.tsx:1870:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-3 mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Staff.tsx:1871:13",
								"data-prohibitions": "[editContent]",
								onClick: () => {
									const text = paymentReceipt?.text || "";
									navigator.clipboard.writeText(text.replace(/\*/g, ""));
									setCopied(true);
									setTimeout(() => setCopied(false), 2e3);
								},
								className: "w-full gap-2 bg-[#F97316] hover:bg-[#EA580C] text-black border-none",
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/pages/Staff.tsx:1881:17",
									"data-prohibitions": "[editContent]",
									className: "size-4 text-black"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									"data-uid": "src/pages/Staff.tsx:1883:17",
									"data-prohibitions": "[editContent]",
									className: "size-4 text-black"
								}), copied ? "Copiado!" : "Copiar Recibo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Staff.tsx:1887:13",
								"data-prohibitions": "[]",
								onClick: () => {
									if (paymentReceipt?.url) window.open(paymentReceipt.url, "_blank");
								},
								className: "bg-green-600 hover:bg-green-700 text-white gap-2 w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
									"data-uid": "src/pages/Staff.tsx:1893:15",
									"data-prohibitions": "[editContent]",
									className: "size-4"
								}), "Enviar via WhatsApp"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							"data-uid": "src/pages/Staff.tsx:1897:11",
							"data-prohibitions": "[]",
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Staff.tsx:1898:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								onClick: () => setReceiptDialog(false),
								children: "Fechar"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Staff.tsx:1904:7",
				"data-prohibitions": "[editContent]",
				open: !!ticketItem,
				onOpenChange: (v) => !v && setTicketItem(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Staff.tsx:1905:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-sm bg-white text-black font-mono shadow-xl max-h-[90vh] overflow-y-auto rounded-md border border-gray-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/Staff.tsx:1906:11",
							"data-prohibitions": "[]",
							className: "mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/Staff.tsx:1907:13",
								"data-prohibitions": "[]",
								className: "flex flex-col items-center justify-center space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
									"data-uid": "src/pages/Staff.tsx:1908:15",
									"data-prohibitions": "[editContent]",
									className: "size-8 text-black"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Staff.tsx:1909:15",
									"data-prohibitions": "[]",
									className: "text-xl font-bold uppercase tracking-widest text-black",
									children: "Recibo de Comissão"
								})]
							})
						}),
						ticketData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Staff.tsx:1916:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1917:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-1 text-center border-b border-dashed border-gray-400 pb-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:1918:17",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-base uppercase tracking-wider",
											children: businessName
										}),
										ticketData.checkoutNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/Staff.tsx:1920:19",
											"data-prohibitions": "[editContent]",
											className: "text-lg font-black uppercase tracking-widest text-primary mt-1 mb-2",
											children: ["Pedido #", ticketData.checkoutNumber]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/Staff.tsx:1924:17",
											"data-prohibitions": "[editContent]",
											className: "text-gray-600",
											children: ["Profissional: ", ticketData.professionalName]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/Staff.tsx:1925:17",
											"data-prohibitions": "[editContent]",
											className: "text-gray-600",
											children: ["Cliente: ", ticketData.clientName]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:1926:17",
											"data-prohibitions": "[editContent]",
											className: "text-gray-600",
											children: format(ticketData.date, "dd/MM/yyyy HH:mm")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/Staff.tsx:1927:17",
											"data-prohibitions": "[editContent]",
											className: "text-gray-600",
											children: ["Pgto: ", ticketData.paymentMethodName]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1930:15",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between font-bold text-base bg-gray-100 p-2 rounded",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Staff.tsx:1931:17",
										"data-prohibitions": "[]",
										children: "Total Pago:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/Staff.tsx:1932:17",
										"data-prohibitions": "[editContent]",
										children: ["R$ ", ticketData.totalPaid.toFixed(2)]
									})]
								}),
								ticketData.snapshot && ticketData.snapshot.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1936:17",
									"data-prohibitions": "[editContent]",
									className: "space-y-1 border border-gray-200 rounded p-2 bg-gray-50 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/Staff.tsx:1937:19",
										"data-prohibitions": "[]",
										className: "font-bold uppercase text-gray-800 text-xs mb-2 border-b pb-1",
										children: "Itens do Pedido (Snapshot)"
									}), ticketData.snapshot.map((sItem, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1941:21",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between text-gray-800 py-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/Staff.tsx:1942:23",
											"data-prohibitions": "[editContent]",
											className: "truncate max-w-[200px]",
											children: [
												sItem.quantity > 1 ? `${sItem.quantity}x ` : "",
												sItem.name,
												" ",
												sItem.packageUsed ? "(Pacote)" : ""
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/Staff.tsx:1946:23",
											"data-prohibitions": "[editContent]",
											children: [
												"R$",
												" ",
												sItem.packageUsed ? "0.00" : (sItem.price * (sItem.quantity || 1)).toFixed(2)
											]
										})]
									}, `snap-${idx}`))]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									ticketData.nonCommProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1958:21",
										"data-prohibitions": "[editContent]",
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Staff.tsx:1959:23",
												"data-prohibitions": "[]",
												className: "font-bold uppercase text-gray-500 text-xs mt-4 mb-2",
												children: "Produtos (Sem Comissão)"
											}),
											ticketData.nonCommProducts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1963:25",
												"data-prohibitions": "[editContent]",
												className: "flex justify-between text-gray-500",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Staff.tsx:1964:27",
													"data-prohibitions": "[editContent]",
													className: "truncate max-w-[200px]",
													children: p.item
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/Staff.tsx:1965:27",
													"data-prohibitions": "[editContent]",
													children: ["R$ ", p.price.toFixed(2)]
												})]
											}, i)),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Staff.tsx:1968:23",
												"data-prohibitions": "[editContent]",
												className: "border-t border-dashed border-gray-300 my-2"
											})
										]
									}),
									ticketData.nonCommOthers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1973:21",
										"data-prohibitions": "[editContent]",
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Staff.tsx:1974:23",
												"data-prohibitions": "[]",
												className: "font-bold uppercase text-gray-500 text-xs mt-4 mb-2",
												children: "Outros (Sem Comissão)"
											}),
											ticketData.nonCommOthers.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1978:25",
												"data-prohibitions": "[editContent]",
												className: "flex justify-between text-gray-500",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Staff.tsx:1979:27",
													"data-prohibitions": "[editContent]",
													className: "truncate max-w-[200px]",
													children: p.item
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/Staff.tsx:1980:27",
													"data-prohibitions": "[editContent]",
													children: ["R$ ", p.price.toFixed(2)]
												})]
											}, i)),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Staff.tsx:1983:23",
												"data-prohibitions": "[editContent]",
												className: "border-t border-dashed border-gray-300 my-2"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1987:19",
										"data-prohibitions": "[editContent]",
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:1988:21",
											"data-prohibitions": "[]",
											className: "font-bold uppercase text-gray-800 text-xs mt-4 mb-2",
											children: "Itens Comissionáveis"
										}), ticketData.commissionableItems.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1992:23",
											"data-prohibitions": "[editContent]",
											className: "flex justify-between text-gray-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Staff.tsx:1993:25",
												"data-prohibitions": "[editContent]",
												className: "truncate max-w-[200px]",
												children: i.item
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Staff.tsx:1994:25",
												"data-prohibitions": "[editContent]",
												children: ["R$ ", i.price.toFixed(2)]
											})]
										}, idx))]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/Staff.tsx:2001:15",
									"data-prohibitions": "[editContent]",
									className: "border-t border-dashed border-gray-400 my-4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:2003:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-1 bg-yellow-50/50 p-2 rounded border border-yellow-100",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:2004:17",
											"data-prohibitions": "[]",
											className: "font-bold uppercase text-gray-800 text-xs mb-2",
											children: "Memória de Cálculo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:2006:17",
											"data-prohibitions": "[editContent]",
											className: "flex justify-between text-sm text-gray-600 mb-2 border-b border-gray-200 pb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Staff.tsx:2007:19",
												"data-prohibitions": "[]",
												children: "Base Comissionável:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Staff.tsx:2008:19",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: ["R$ ", ticketData.commissionBase.toFixed(2)]
											})]
										}),
										ticketData.memoryLines.map((line, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:2012:19",
											"data-prohibitions": "[editContent]",
											className: "flex justify-between text-gray-800 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Staff.tsx:2013:21",
												"data-prohibitions": "[editContent]",
												children: line.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Staff.tsx:2014:21",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: ["R$ ", line.value.toFixed(2)]
											})]
										}, idx))
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/Staff.tsx:2019:15",
									"data-prohibitions": "[editContent]",
									className: "border-t border-black border-2 my-4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:2021:15",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between font-black text-lg uppercase tracking-wide",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Staff.tsx:2022:17",
										"data-prohibitions": "[]",
										children: "Total a Pagar:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/Staff.tsx:2023:17",
										"data-prohibitions": "[editContent]",
										children: ["R$ ", ticketData.netCommission.toFixed(2)]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/Staff.tsx:2028:11",
							"data-prohibitions": "[editContent]",
							className: "mt-4 flex-col sm:flex-col gap-2 border-t border-dashed border-gray-300 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Staff.tsx:2029:13",
								"data-prohibitions": "[editContent]",
								className: "w-full font-sans font-medium bg-[#F97316] hover:bg-[#EA580C] text-black border-none",
								onClick: () => {
									let text = `================================\n`;
									text += `       RECIBO DE COMISSÃO\n`;
									text += `================================\n\n`;
									text += `Pedido #${ticketData?.checkoutNumber || "N/A"}\n`;
									text += `Data: ${format(ticketData?.date || /* @__PURE__ */ new Date(), "dd/MM/yyyy HH:mm")}\n`;
									text += `Profissional: ${ticketData?.professionalName}\n`;
									text += `Cliente: ${ticketData?.clientName}\n\n`;
									text += `DETALHES DA VENDA:\n`;
									text += `--------------------------------\n`;
									ticketData?.commissionableItems?.forEach((i) => {
										text += `${i.item}\n`;
										text += `Valor: R$ ${i.price.toFixed(2)}\n`;
										text += `--------------------------------\n`;
									});
									text += `\nBase de Cálculo: R$ ${ticketData?.commissionBase?.toFixed(2)}\n\n`;
									text += `MEMÓRIA DE CÁLCULO:\n`;
									ticketData?.memoryLines?.forEach((l) => {
										text += `${l.label}: R$ ${l.value.toFixed(2)}\n`;
									});
									text += `--------------------------------\n`;
									text += `TOTAL A PAGAR: R$ ${ticketData?.netCommission?.toFixed(2)}\n`;
									text += `================================\n`;
									navigator.clipboard.writeText(text);
									setCopied(true);
									setTimeout(() => setCopied(false), 2e3);
								},
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/pages/Staff.tsx:2061:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									"data-uid": "src/pages/Staff.tsx:2063:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), copied ? "Copiado!" : "Copiar Recibo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Staff.tsx:2067:13",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "w-full font-sans border-gray-300 hover:bg-gray-100",
								onClick: () => setTicketItem(null),
								children: "Fechar"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Staff as default };

//# sourceMappingURL=Staff-CJrSD2l0.js.map