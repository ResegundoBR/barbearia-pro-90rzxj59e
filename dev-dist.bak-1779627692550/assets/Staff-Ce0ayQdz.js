import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { t as Calendar } from "./calendar-BPj1sJ5-.js";
import { t as Calendar$1 } from "./calendar-DLzHvYve.js";
import { t as CircleCheck } from "./circle-check-CkArVuhg.js";
import { t as DollarSign } from "./dollar-sign-pVaANfzw.js";
import { t as Plus } from "./plus-C05IfBmn.js";
import { t as SquarePen } from "./square-pen-GaMOE8ty.js";
import { E as PopoverTrigger, J as Wallet, L as Input, R as Button, S as DialogTitle, T as PopoverContent, U as cn, _ as Dialog, _t as useToast, a as pb, b as DialogFooter, c as SelectContent, f as SelectTrigger, n as useRealtime, p as SelectValue, q as phoneMask, r as usePermissions, s as Select, st as createLucideIcon, t as Label, u as SelectItem, v as DialogContent, w as Popover, x as DialogHeader, y as DialogDescription } from "./index-BIx1wWQ0.js";
import { g as startOfWeek, p as startOfDay, t as format, v as toDate } from "./format-BWFAnkIi.js";
import { t as startOfMonth } from "./startOfMonth-mft3RUay.js";
import { n as endOfMonth, t as endOfWeek } from "./endOfWeek-B_VK7YAC.js";
import { t as subDays } from "./subDays-qxAcF-RQ.js";
import { d as getCommissions, l as getClientPackages, m as getProductPurchases, p as getPaymentMethods, r as getAppointments } from "./api-BttlswRb.js";
import { n as getErrorMessage } from "./errors-LSdnChw5.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DcQoPXwD.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CEKTZr8T.js";
import { t as Badge } from "./badge-DXZ00RnO.js";
import { t as Checkbox } from "./checkbox-BviaQtvO.js";
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
											children: b.expand?.user_id?.whatsapp ? phoneMask(b.expand.user_id.whatsapp) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Staff.tsx:1027:25",
												"data-prohibitions": "[]",
												className: "text-muted-foreground italic",
												children: "Não informado"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Staff.tsx:1030:21",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Staff.tsx:1031:23",
												"data-prohibitions": "[editContent]",
												variant: "outline",
												className: b.work_level === "socio" ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700" : "bg-slate-100 text-slate-800 border-slate-300",
												children: b.work_level === "socio" ? "Sócio" : "Autônomo"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
											"data-uid": "src/pages/Staff.tsx:1042:21",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-base text-amber-600",
											children: ["R$ ", aReceber.toFixed(2)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Staff.tsx:1045:21",
											"data-prohibitions": "[editContent]",
											children: b.work_level === "socio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Staff.tsx:1047:25",
												"data-prohibitions": "[]",
												className: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide border-0 shadow-sm",
												children: "Pago na hora"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1051:25",
												"data-prohibitions": "[editContent]",
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Staff.tsx:1052:27",
													"data-prohibitions": "[editContent]",
													className: "font-bold text-yellow-500 dark:text-yellow-400",
													children: displayPayDate
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Staff.tsx:1055:27",
													"data-prohibitions": "[]",
													className: "text-xs text-muted-foreground",
													children: "Próx. Acerto"
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/Staff.tsx:1059:21",
											"data-prohibitions": "[editContent]",
											className: "text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1060:23",
												"data-prohibitions": "[editContent]",
												className: "flex justify-end gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Staff.tsx:1061:25",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														onClick: () => openDetailedReport(b),
														title: "Relatório Detalhado",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
															"data-uid": "src/pages/Staff.tsx:1067:27",
															"data-prohibitions": "[editContent]",
															className: "size-4 text-emerald-600"
														})
													}),
													canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Staff.tsx:1070:27",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														onClick: () => openPayModal(b),
														title: "Pagar Comissões",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
															"data-uid": "src/pages/Staff.tsx:1076:29",
															"data-prohibitions": "[editContent]",
															className: "size-4 text-blue-600"
														})
													}),
													canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Staff.tsx:1080:27",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														onClick: () => editBarber(b),
														title: "Editar Profissional",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
															"data-uid": "src/pages/Staff.tsx:1086:29",
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
								"data-uid": "src/pages/Staff.tsx:1095:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/Staff.tsx:1096:19",
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
				"data-uid": "src/pages/Staff.tsx:1106:7",
				"data-prohibitions": "[editContent]",
				open: !!selectedBarberDetailed,
				onOpenChange: (v) => !v && setSelectedBarberDetailed(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Staff.tsx:1110:9",
					"data-prohibitions": "[editContent]",
					className: "max-w-[95vw] lg:max-w-6xl xl:max-w-7xl max-h-[90vh] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/Staff.tsx:1111:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/Staff.tsx:1112:13",
								"data-prohibitions": "[editContent]",
								children: ["Relatório Financeiro - ", selectedBarberDetailed?.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1113:13",
								"data-prohibitions": "[editContent]",
								className: "flex flex-wrap gap-2 sm:mr-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/Staff.tsx:1114:15",
										"data-prohibitions": "[]",
										value: reportStatusFilter,
										onValueChange: setReportStatusFilter,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/Staff.tsx:1115:17",
											"data-prohibitions": "[]",
											className: "w-[140px] h-9",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/Staff.tsx:1116:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Status"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/Staff.tsx:1118:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Staff.tsx:1119:19",
													"data-prohibitions": "[]",
													value: "tudo",
													children: "Tudo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Staff.tsx:1120:19",
													"data-prohibitions": "[]",
													value: "pago",
													children: "Pago"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Staff.tsx:1121:19",
													"data-prohibitions": "[]",
													value: "a_pagar",
													children: "A Pagar"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/Staff.tsx:1124:15",
										"data-prohibitions": "[editContent]",
										variant: "outline",
										size: "sm",
										onClick: async () => {
											await handleReconcile();
											if (selectedBarberDetailed) openDetailedReport(selectedBarberDetailed);
										},
										disabled: isReconciling,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
											"data-uid": "src/pages/Staff.tsx:1135:17",
											"data-prohibitions": "[editContent]",
											className: `size-4 mr-2 ${isReconciling ? "animate-spin" : ""}`
										}), "Recalcular"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/Staff.tsx:1138:15",
										"data-prohibitions": "[]",
										variant: "outline",
										size: "sm",
										onClick: printReport,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
											"data-uid": "src/pages/Staff.tsx:1139:17",
											"data-prohibitions": "[editContent]",
											className: "size-4 mr-2"
										}), " Imprimir"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Staff.tsx:1144:11",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/Staff.tsx:1145:13",
									"data-prohibitions": "[editContent]",
									className: "bg-muted/30 border-none shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/Staff.tsx:1146:15",
										"data-prohibitions": "[editContent]",
										className: "p-4 flex flex-col items-center justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Staff.tsx:1147:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-muted-foreground uppercase tracking-wider",
											children: "Total Vendas"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/Staff.tsx:1150:17",
											"data-prohibitions": "[editContent]",
											className: "text-2xl font-bold mt-1",
											children: ["R$ ", reportSummary.totalVendas.toFixed(2)]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/Staff.tsx:1155:13",
									"data-prohibitions": "[editContent]",
									className: "bg-emerald-50 border-emerald-100 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/Staff.tsx:1156:15",
										"data-prohibitions": "[editContent]",
										className: "p-4 flex flex-col items-center justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Staff.tsx:1157:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-emerald-700 uppercase tracking-wider",
											children: "Total Pago"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/Staff.tsx:1160:17",
											"data-prohibitions": "[editContent]",
											className: "text-2xl font-bold text-emerald-600 mt-1",
											children: ["R$ ", reportSummary.totalPago.toFixed(2)]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									"data-uid": "src/pages/Staff.tsx:1165:13",
									"data-prohibitions": "[editContent]",
									className: "bg-amber-50 border-amber-100 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										"data-uid": "src/pages/Staff.tsx:1166:15",
										"data-prohibitions": "[editContent]",
										className: "p-4 flex flex-col items-center justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Staff.tsx:1167:17",
											"data-prohibitions": "[]",
											className: "text-sm font-medium text-amber-700 uppercase tracking-wider",
											children: "Total a Pagar"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/Staff.tsx:1170:17",
											"data-prohibitions": "[editContent]",
											className: "text-2xl font-bold text-amber-600 mt-1",
											children: ["R$ ", reportSummary.totalAPagar.toFixed(2)]
										})]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Staff.tsx:1177:11",
							"data-prohibitions": "[editContent]",
							className: "flex-1 mt-4 min-h-0 bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Staff.tsx:1178:13",
								"data-prohibitions": "[editContent]",
								id: "printable-report",
								className: "h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
									"data-uid": "src/pages/Staff.tsx:1179:15",
									"data-prohibitions": "[editContent]",
									wrapperClassName: "styled-scrollbar border-none",
									className: "min-w-[1100px] border-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										"data-uid": "src/pages/Staff.tsx:1183:17",
										"data-prohibitions": "[]",
										className: "border-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/Staff.tsx:1184:19",
											"data-prohibitions": "[]",
											className: "border-none hover:bg-transparent",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1185:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap sticky left-0 z-20 bg-background px-4 py-3 border-none",
													children: "# Checkout"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1188:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap px-4 py-3 border-none",
													children: "Data/Hora"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1191:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap px-4 py-3 border-none",
													children: "Tipo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1192:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap min-w-[200px] px-4 py-3 border-none",
													children: "Descrição"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1195:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap px-4 py-3 border-none",
													children: "Cliente"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1198:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap px-4 py-3 border-none",
													children: "Vencimento"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1201:21",
													"data-prohibitions": "[]",
													className: "whitespace-nowrap px-4 py-3 border-none",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1204:21",
													"data-prohibitions": "[]",
													className: "text-right whitespace-nowrap px-4 py-3 border-none",
													children: "Valor Bruto"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1207:21",
													"data-prohibitions": "[]",
													className: "text-right whitespace-nowrap px-4 py-3 border-none",
													children: "Comissão"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/Staff.tsx:1210:21",
													"data-prohibitions": "[]",
													className: "text-right whitespace-nowrap sticky right-0 z-20 bg-background px-4 py-3 border-none",
													children: "Ações"
												})
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
										"data-uid": "src/pages/Staff.tsx:1215:17",
										"data-prohibitions": "[editContent]",
										className: "border-none",
										children: [displayedReportItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/Staff.tsx:1217:21",
											"data-prohibitions": "[editContent]",
											className: "group/row border-none hover:bg-muted/50 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1221:23",
													"data-prohibitions": "[editContent]",
													className: "font-mono text-muted-foreground sticky left-0 z-10 bg-background group-hover/row:bg-muted/50 transition-colors px-4 py-3 border-none",
													children: item.checkoutNumber ? `#${item.checkoutNumber}` : "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1224:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: [
														format(item.date, "dd/MM/yyyy"),
														" às ",
														item.time
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1227:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/Staff.tsx:1228:25",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: item.type === "Pedido" ? "bg-orange-100 text-orange-800 border-orange-200" : item.type === "Serviço" ? "bg-blue-100 text-blue-800 border-blue-200" : item.type === "Produto" ? "bg-purple-100 text-purple-800 border-purple-200" : "bg-gray-100 text-gray-800 border-gray-200",
														children: item.type
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1243:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: item.item
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1244:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: item.client
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1245:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/Staff.tsx:1246:25",
														"data-prohibitions": "[editContent]",
														className: "font-medium text-muted-foreground",
														children: item.dueDate ? format(item.dueDate, "dd/MM/yyyy") : format(getNextPayDate(item.commDate, selectedBarberDetailed?.payment_schedule_config), "dd/MM/yyyy")
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1258:23",
													"data-prohibitions": "[editContent]",
													className: "px-4 py-3 border-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/Staff.tsx:1259:25",
														"data-prohibitions": "[editContent]",
														className: cn("font-bold uppercase border-0 text-[11px] tracking-wider shadow-sm", item.status === "paid" ? "bg-[#10b981] hover:bg-[#059669] text-white" : item.status === "partial" ? "bg-orange-400 hover:bg-orange-500 text-white" : "bg-[#f59e0b] hover:bg-[#d97706] text-white"),
														children: item.status === "paid" ? "Pago" : item.status === "partial" ? "Parcial" : "Pendente"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1276:23",
													"data-prohibitions": "[editContent]",
													className: "text-right px-4 py-3 border-none",
													children: ["R$ ", item.price.toFixed(2)]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1279:23",
													"data-prohibitions": "[editContent]",
													className: `text-right font-semibold px-4 py-3 border-none ${item.commission < 0 ? "text-red-600" : "text-emerald-600"}`,
													children: ["R$ ", item.commission.toFixed(2)]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1284:23",
													"data-prohibitions": "[]",
													className: "text-right sticky right-0 z-10 bg-background group-hover/row:bg-muted/50 transition-colors px-4 py-3 border-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Staff.tsx:1285:25",
														"data-prohibitions": "[]",
														variant: "ghost",
														size: "icon",
														onClick: () => setTicketItem(item),
														title: "Memória de Cálculo",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
															"data-uid": "src/pages/Staff.tsx:1291:27",
															"data-prohibitions": "[editContent]",
															className: "size-4 text-slate-600"
														})
													})
												})
											]
										}, `${item.id}-${i}`)), displayedReportItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
											"data-uid": "src/pages/Staff.tsx:1297:21",
											"data-prohibitions": "[]",
											className: "border-none",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/Staff.tsx:1298:23",
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
							"data-uid": "src/pages/Staff.tsx:1310:11",
							"data-prohibitions": "[]",
							className: "mt-4 border-t pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Staff.tsx:1311:13",
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
				"data-uid": "src/pages/Staff.tsx:1318:7",
				"data-prohibitions": "[]",
				className: "mt-8 border-none shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/Staff.tsx:1319:9",
					"data-prohibitions": "[]",
					className: "bg-muted/30 pb-4 border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/Staff.tsx:1320:11",
						"data-prohibitions": "[]",
						className: "text-xl",
						children: "Configurações de Pagamento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/Staff.tsx:1321:11",
						"data-prohibitions": "[]",
						children: "As regras de vencimento agora são configuradas individualmente para cada profissional Autônomo."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/Staff.tsx:1326:9",
					"data-prohibitions": "[]",
					className: "pt-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Staff.tsx:1327:11",
						"data-prohibitions": "[]",
						className: "p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Staff.tsx:1328:13",
							"data-prohibitions": "[]",
							className: "mt-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Staff.tsx:1329:15",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "bg-blue-100 text-blue-800 border-blue-200",
								children: "Autônomo"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/Staff.tsx:1333:13",
							"data-prohibitions": "[]",
							className: "text-sm text-blue-800 dark:text-blue-200",
							children: "As datas da coluna \"A Pagar\" são calculadas automaticamente com base nos ciclos definidos no perfil de cada profissional."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Staff.tsx:1338:11",
						"data-prohibitions": "[]",
						className: "p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Staff.tsx:1339:13",
							"data-prohibitions": "[]",
							className: "mt-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Staff.tsx:1340:15",
								"data-prohibitions": "[]",
								className: "bg-emerald-500 hover:bg-emerald-600 border-0",
								children: "Sócio"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-uid": "src/pages/Staff.tsx:1342:13",
							"data-prohibitions": "[]",
							className: "text-sm text-emerald-800 dark:text-emerald-200",
							children: [
								"Profissionais com nível de trabalho configurado como \"Sócio\" recebem comissionamento integral. O status de suas transações é sempre classificado como",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									"data-uid": "src/pages/Staff.tsx:1345:15",
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
				"data-uid": "src/pages/Staff.tsx:1351:7",
				"data-prohibitions": "[editContent]",
				open: bDialog,
				onOpenChange: setBDialog,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Staff.tsx:1352:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-[425px] max-h-[85vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						"data-uid": "src/pages/Staff.tsx:1353:11",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/pages/Staff.tsx:1354:13",
							"data-prohibitions": "[editContent]",
							children: form.id ? "Editar Profissional" : "Novo Profissional"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						"data-uid": "src/pages/Staff.tsx:1356:11",
						"data-prohibitions": "[editContent]",
						onSubmit: handleSubmit,
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1357:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/Staff.tsx:1358:15",
									"data-prohibitions": "[]",
									children: "Nome"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/Staff.tsx:1359:15",
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
								"data-uid": "src/pages/Staff.tsx:1365:13",
								"data-prohibitions": "[]",
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1366:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Staff.tsx:1367:17",
										"data-prohibitions": "[]",
										children: "Nível de Trabalho"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/Staff.tsx:1368:17",
										"data-prohibitions": "[]",
										value: form.work_level,
										onValueChange: (v) => setForm({
											...form,
											work_level: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/Staff.tsx:1372:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/Staff.tsx:1373:21",
												"data-prohibitions": "[editContent]"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/Staff.tsx:1375:19",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1376:21",
												"data-prohibitions": "[]",
												value: "autonomo",
												children: "Autônomo (Comissionado)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1377:21",
												"data-prohibitions": "[]",
												value: "socio",
												children: "Sócio (100% Repasse)"
											})]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1382:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Staff.tsx:1383:17",
										"data-prohibitions": "[]",
										children: "Regime (Disponibilidade)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/Staff.tsx:1384:17",
										"data-prohibitions": "[]",
										value: form.work_regime || "fixed",
										onValueChange: (v) => setForm({
											...form,
											work_regime: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/Staff.tsx:1388:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/Staff.tsx:1389:21",
												"data-prohibitions": "[editContent]"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/Staff.tsx:1391:19",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1392:21",
												"data-prohibitions": "[]",
												value: "fixed",
												children: "Horário Fixo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1393:21",
												"data-prohibitions": "[]",
												value: "on_demand",
												children: "Sob Demanda"
											})]
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1399:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/Staff.tsx:1400:15",
									"data-prohibitions": "[]",
									children: "Cor de Identificação"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1401:15",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Staff.tsx:1402:17",
										"data-prohibitions": "[editContent]",
										type: "color",
										value: form.color || "#3b82f6",
										onChange: (e) => setForm({
											...form,
											color: e.target.value
										}),
										className: "w-12 h-10 p-1 cursor-pointer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Staff.tsx:1408:17",
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
								"data-uid": "src/pages/Staff.tsx:1419:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-4 border p-4 rounded-lg bg-muted/20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1420:17",
										"data-prohibitions": "[]",
										className: "grid grid-cols-2 gap-4 pb-4 border-b border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1421:19",
											"data-prohibitions": "[]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Staff.tsx:1422:21",
												"data-prohibitions": "[]",
												className: "text-sm",
												children: "Tipo de Comissão"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/Staff.tsx:1423:21",
												"data-prohibitions": "[]",
												value: form.commission_type || "percentage",
												onValueChange: (v) => setForm({
													...form,
													commission_type: v
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/Staff.tsx:1427:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/Staff.tsx:1428:25",
														"data-prohibitions": "[editContent]"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/Staff.tsx:1430:23",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Staff.tsx:1431:25",
														"data-prohibitions": "[]",
														value: "percentage",
														children: "Porcentagem (%)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Staff.tsx:1432:25",
														"data-prohibitions": "[]",
														value: "fixed",
														children: "Valor Fixo (R$)"
													})]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1436:19",
											"data-prohibitions": "[]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/Staff.tsx:1437:21",
												"data-prohibitions": "[]",
												className: "text-sm",
												children: "Valor Base"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/Staff.tsx:1438:21",
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
										"data-uid": "src/pages/Staff.tsx:1449:17",
										"data-prohibitions": "[]",
										className: "flex items-center justify-between pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Staff.tsx:1450:19",
											"data-prohibitions": "[]",
											className: "text-base font-semibold",
											children: "Configuração de Pagamento"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1453:17",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Staff.tsx:1454:19",
											"data-prohibitions": "[]",
											className: "text-sm",
											children: "Frequência"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/Staff.tsx:1455:19",
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
												"data-uid": "src/pages/Staff.tsx:1464:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/Staff.tsx:1465:23",
													"data-prohibitions": "[editContent]"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
												"data-uid": "src/pages/Staff.tsx:1467:21",
												"data-prohibitions": "[]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Staff.tsx:1468:23",
													"data-prohibitions": "[]",
													value: "semanal",
													children: "Semanal"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/Staff.tsx:1469:23",
													"data-prohibitions": "[]",
													value: "quinzenal",
													children: "Quinzenal"
												})]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1474:17",
										"data-prohibitions": "[editContent]",
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1475:19",
												"data-prohibitions": "[]",
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													"data-uid": "src/pages/Staff.tsx:1476:21",
													"data-prohibitions": "[]",
													className: "text-sm",
													children: "Ciclos de Pagamento"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													"data-uid": "src/pages/Staff.tsx:1477:21",
													"data-prohibitions": "[]",
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: addCycle,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
														"data-uid": "src/pages/Staff.tsx:1478:23",
														"data-prohibitions": "[editContent]",
														className: "size-3 mr-1"
													}), " Adicionar"]
												})]
											}),
											form.payment_schedule_config?.cycles?.map((cycle, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1483:21",
												"data-prohibitions": "[editContent]",
												className: "border p-3 rounded-md space-y-3 bg-background relative",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/Staff.tsx:1487:23",
														"data-prohibitions": "[]",
														type: "button",
														variant: "ghost",
														size: "icon",
														className: "absolute right-2 top-2 h-6 w-6 text-destructive hover:bg-destructive/10",
														onClick: () => removeCycle(index),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {
															"data-uid": "src/pages/Staff.tsx:1494:25",
															"data-prohibitions": "[editContent]",
															className: "size-3"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/Staff.tsx:1497:23",
														"data-prohibitions": "[editContent]",
														className: "space-y-2 pr-8",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															"data-uid": "src/pages/Staff.tsx:1498:25",
															"data-prohibitions": "[]",
															className: "text-xs text-muted-foreground",
															children: "Dias Trabalhados"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															"data-uid": "src/pages/Staff.tsx:1499:25",
															"data-prohibitions": "[editContent]",
															className: "flex flex-wrap gap-2",
															children: WEEK_DAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/Staff.tsx:1501:29",
																"data-prohibitions": "[editContent]",
																className: "flex items-center space-x-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																	"data-uid": "src/pages/Staff.tsx:1502:31",
																	"data-prohibitions": "[editContent]",
																	id: `cycle-${index}-day-${day.value}`,
																	checked: cycle.workDays?.includes(day.value),
																	onCheckedChange: (checked) => updateCycleWorkDays(index, day.value, !!checked)
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																	"data-uid": "src/pages/Staff.tsx:1509:31",
																	"data-prohibitions": "[editContent]",
																	htmlFor: `cycle-${index}-day-${day.value}`,
																	className: "text-xs font-normal cursor-pointer",
																	children: day.label
																})]
															}, day.value))
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/Staff.tsx:1520:23",
														"data-prohibitions": "[editContent]",
														className: "space-y-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															"data-uid": "src/pages/Staff.tsx:1521:25",
															"data-prohibitions": "[]",
															className: "text-xs text-muted-foreground",
															children: "Dia do Pagamento"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
															"data-uid": "src/pages/Staff.tsx:1522:25",
															"data-prohibitions": "[editContent]",
															value: cycle.paymentDay?.toString(),
															onValueChange: (v) => updateCyclePaymentDay(index, parseInt(v)),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																"data-uid": "src/pages/Staff.tsx:1526:27",
																"data-prohibitions": "[]",
																className: "h-8",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																	"data-uid": "src/pages/Staff.tsx:1527:29",
																	"data-prohibitions": "[editContent]"
																})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
																"data-uid": "src/pages/Staff.tsx:1529:27",
																"data-prohibitions": "[editContent]",
																children: WEEK_DAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																	"data-uid": "src/pages/Staff.tsx:1531:31",
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
												"data-uid": "src/pages/Staff.tsx:1542:21",
												"data-prohibitions": "[]",
												className: "text-sm text-muted-foreground text-center py-2 border border-dashed rounded-md",
												children: "Nenhum ciclo configurado."
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
								"data-uid": "src/pages/Staff.tsx:1550:13",
								"data-prohibitions": "[]",
								className: "pt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/Staff.tsx:1551:15",
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
				"data-uid": "src/pages/Staff.tsx:1557:7",
				"data-prohibitions": "[editContent]",
				open: payDialog,
				onOpenChange: setPayDialog,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Staff.tsx:1558:9",
					"data-prohibitions": "[editContent]",
					className: "max-w-3xl max-h-[90vh] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/Staff.tsx:1559:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/Staff.tsx:1560:13",
								"data-prohibitions": "[editContent]",
								children: ["Pagar Comissões - ", barberToPay?.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/Staff.tsx:1561:13",
								"data-prohibitions": "[]",
								children: "Selecione as comissões que deseja baixar como pagas."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Staff.tsx:1566:11",
							"data-prohibitions": "[editContent]",
							className: "overflow-x-auto overflow-y-auto flex-1 mt-4 border rounded-md max-h-[40vh]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/Staff.tsx:1567:13",
								"data-prohibitions": "[editContent]",
								className: "min-w-[500px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/pages/Staff.tsx:1568:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/Staff.tsx:1569:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Staff.tsx:1570:19",
												"data-prohibitions": "[]",
												className: "w-[50px]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													"data-uid": "src/pages/Staff.tsx:1571:21",
													"data-prohibitions": "[editContent]",
													checked: selectedComms.length === pendingCommsToPay.length && pendingCommsToPay.length > 0,
													onCheckedChange: (c) => handleToggleAll(!!c)
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Staff.tsx:1579:19",
												"data-prohibitions": "[]",
												className: "whitespace-nowrap",
												children: "Data"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Staff.tsx:1580:19",
												"data-prohibitions": "[]",
												className: "whitespace-nowrap",
												children: "Tipo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/Staff.tsx:1581:19",
												"data-prohibitions": "[]",
												className: "text-right whitespace-nowrap",
												children: "Valor"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
									"data-uid": "src/pages/Staff.tsx:1584:15",
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
												"data-uid": "src/pages/Staff.tsx:1606:27",
												"data-prohibitions": "[]",
												className: "bg-muted/50 hover:bg-muted/50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1607:29",
													"data-prohibitions": "[]",
													colSpan: 4,
													className: "font-semibold text-xs uppercase text-muted-foreground",
													children: "Comissões do Período"
												})
											}), periodComms.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1615:29",
												"data-prohibitions": "[editContent]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1616:31",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
															"data-uid": "src/pages/Staff.tsx:1617:33",
															"data-prohibitions": "[editContent]",
															checked: selectedComms.includes(c.id),
															onCheckedChange: () => handleToggleComm(c.id)
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1622:31",
														"data-prohibitions": "[editContent]",
														children: format(c.date ? new Date(c.date) : new Date(c.created), "dd/MM/yyyy")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1628:31",
														"data-prohibitions": "[editContent]",
														children: typeMap[c.type] || c.type
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1629:31",
														"data-prohibitions": "[editContent]",
														className: "text-right",
														children: ["R$ ", (c.amount || 0).toFixed(2)]
													})
												]
											}, c.id))] }),
											previousComms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1639:27",
												"data-prohibitions": "[]",
												className: "bg-muted/50 hover:bg-muted/50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1640:29",
													"data-prohibitions": "[]",
													colSpan: 4,
													className: "font-semibold text-xs uppercase text-muted-foreground",
													children: "Saldos Anteriores"
												})
											}), previousComms.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1648:29",
												"data-prohibitions": "[editContent]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1649:31",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
															"data-uid": "src/pages/Staff.tsx:1650:33",
															"data-prohibitions": "[editContent]",
															checked: selectedComms.includes(c.id),
															onCheckedChange: () => handleToggleComm(c.id)
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1655:31",
														"data-prohibitions": "[editContent]",
														children: format(c.date ? new Date(c.date) : new Date(c.created), "dd/MM/yyyy")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1661:31",
														"data-prohibitions": "[editContent]",
														children: typeMap[c.type] || c.type
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1662:31",
														"data-prohibitions": "[editContent]",
														className: "text-right",
														children: ["R$ ", (c.amount || 0).toFixed(2)]
													})
												]
											}, c.id))] }),
											futureComms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1672:27",
												"data-prohibitions": "[]",
												className: "bg-muted/50 hover:bg-muted/50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1673:29",
													"data-prohibitions": "[]",
													colSpan: 4,
													className: "font-semibold text-xs uppercase text-muted-foreground",
													children: "Comissões Futuras"
												})
											}), futureComms.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1681:29",
												"data-prohibitions": "[editContent]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1682:31",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
															"data-uid": "src/pages/Staff.tsx:1683:33",
															"data-prohibitions": "[editContent]",
															checked: selectedComms.includes(c.id),
															onCheckedChange: () => handleToggleComm(c.id)
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1688:31",
														"data-prohibitions": "[editContent]",
														children: format(c.date ? new Date(c.date) : new Date(c.created), "dd/MM/yyyy")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1694:31",
														"data-prohibitions": "[editContent]",
														children: typeMap[c.type] || c.type
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1695:31",
														"data-prohibitions": "[editContent]",
														className: "text-right",
														children: ["R$ ", (c.amount || 0).toFixed(2)]
													})
												]
											}, c.id))] }),
											allDeductions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1705:27",
												"data-prohibitions": "[]",
												className: "bg-red-50 hover:bg-red-50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1706:29",
													"data-prohibitions": "[]",
													colSpan: 4,
													className: "font-semibold text-xs uppercase text-red-600",
													children: "Deduções / Consumo Interno"
												})
											}), allDeductions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1714:29",
												"data-prohibitions": "[editContent]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1715:31",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
															"data-uid": "src/pages/Staff.tsx:1716:33",
															"data-prohibitions": "[editContent]",
															checked: selectedComms.includes(c.id),
															onCheckedChange: () => handleToggleComm(c.id)
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1721:31",
														"data-prohibitions": "[editContent]",
														children: format(c.date ? new Date(c.date) : new Date(c.created), "dd/MM/yyyy")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1727:31",
														"data-prohibitions": "[editContent]",
														className: "text-red-600",
														children: typeMap[c.type] || c.type
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
														"data-uid": "src/pages/Staff.tsx:1730:31",
														"data-prohibitions": "[editContent]",
														className: "text-right text-red-600 font-medium",
														children: ["R$ ", (c.amount || 0).toFixed(2)]
													})
												]
											}, c.id))] }),
											pendingCommsToPay.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
												"data-uid": "src/pages/Staff.tsx:1739:25",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/Staff.tsx:1740:27",
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
							"data-uid": "src/pages/Staff.tsx:1752:11",
							"data-prohibitions": "[editContent]",
							className: "mt-4 flex flex-col gap-4 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1753:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-center bg-muted/30 p-4 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Staff.tsx:1754:15",
									"data-prohibitions": "[]",
									className: "font-semibold",
									children: "Total Selecionado:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/Staff.tsx:1755:15",
									"data-prohibitions": "[editContent]",
									className: "text-xl font-bold text-emerald-600",
									children: [
										"R$",
										" ",
										pendingCommsToPay.filter((c) => selectedComms.includes(c.id)).reduce((acc, c) => acc + (c.amount || 0), 0).toFixed(2)
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Staff.tsx:1764:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/Staff.tsx:1765:15",
									"data-prohibitions": "[]",
									children: "Forma de Pagamento"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/Staff.tsx:1766:15",
									"data-prohibitions": "[]",
									value: paymentMethod,
									onValueChange: setPaymentMethod,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/Staff.tsx:1767:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/Staff.tsx:1768:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione..."
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/Staff.tsx:1770:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1771:19",
												"data-prohibitions": "[]",
												value: "pix",
												children: "Pix"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1772:19",
												"data-prohibitions": "[]",
												value: "cash",
												children: "Dinheiro"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1773:19",
												"data-prohibitions": "[]",
												value: "debito",
												children: "Cartão de Débito"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/Staff.tsx:1774:19",
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
							"data-uid": "src/pages/Staff.tsx:1780:11",
							"data-prohibitions": "[editContent]",
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Staff.tsx:1781:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								onClick: () => setPayDialog(false),
								disabled: isPaying,
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Staff.tsx:1784:13",
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
				"data-uid": "src/pages/Staff.tsx:1794:7",
				"data-prohibitions": "[editContent]",
				open: receiptDialog,
				onOpenChange: setReceiptDialog,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Staff.tsx:1795:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md bg-stone-50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/Staff.tsx:1796:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/Staff.tsx:1797:13",
								"data-prohibitions": "[]",
								className: "text-center text-xl text-primary",
								children: "Pagamento Concluído!"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Staff.tsx:1802:11",
							"data-prohibitions": "[editContent]",
							className: "bg-white p-6 border-y-2 border-dashed border-gray-300 shadow-sm font-mono text-sm space-y-4 my-2 max-h-[50vh] overflow-y-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1803:13",
									"data-prohibitions": "[editContent]",
									className: "text-center space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											"data-uid": "src/pages/Staff.tsx:1804:15",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-lg",
											children: businessName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:1805:15",
											"data-prohibitions": "[]",
											children: "Recibo de Comissões"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:1806:15",
											"data-prohibitions": "[editContent]",
											children: format(paymentReceiptDetails?.date || /* @__PURE__ */ new Date(), "dd/MM/yyyy HH:mm")
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1809:13",
									"data-prohibitions": "[editContent]",
									className: "border-t border-dashed border-gray-300 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/Staff.tsx:1810:15",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/pages/Staff.tsx:1811:17",
												"data-prohibitions": "[]",
												children: "Profissional:"
											}),
											" ",
											paymentReceiptDetails?.barberName
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/Staff.tsx:1813:15",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/pages/Staff.tsx:1814:17",
												"data-prohibitions": "[]",
												children: "Forma de Pag.:"
											}),
											" ",
											paymentReceiptDetails?.method
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1818:13",
									"data-prohibitions": "[editContent]",
									className: "border-t border-dashed border-gray-300 pt-3 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1819:15",
											"data-prohibitions": "[]",
											className: "grid grid-cols-12 font-bold mb-1 border-b border-gray-100 pb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Staff.tsx:1820:17",
												"data-prohibitions": "[]",
												className: "col-span-8",
												children: "Descrição"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Staff.tsx:1821:17",
												"data-prohibitions": "[]",
												className: "col-span-4 text-right",
												children: "Valor"
											})]
										}),
										paymentReceiptDetails?.items.filter((i) => (i.amount || 0) >= 0).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1826:19",
											"data-prohibitions": "[editContent]",
											className: "grid grid-cols-12 text-gray-700 py-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1827:21",
												"data-prohibitions": "[editContent]",
												className: "col-span-8 truncate pr-2",
												title: `${format(item.date ? new Date(item.date) : new Date(item.created), "dd/MM/yy")} - ${typeMap[item.type] || item.type}`,
												children: [
													format(item.date ? new Date(item.date) : new Date(item.created), "dd/MM/yy"),
													" ",
													typeMap[item.type] || item.type
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1834:21",
												"data-prohibitions": "[editContent]",
												className: "col-span-4 text-right",
												children: ["R$ ", (item.amount || 0).toFixed(2)]
											})]
										}, i)),
										paymentReceiptDetails?.items.some((i) => (i.amount || 0) < 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Staff.tsx:1840:19",
											"data-prohibitions": "[]",
											className: "grid grid-cols-12 font-bold mt-4 mb-1 border-b border-gray-100 pb-1 text-red-800",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Staff.tsx:1841:21",
												"data-prohibitions": "[]",
												className: "col-span-12",
												children: "Deduções / Consumo Interno"
											})
										}), paymentReceiptDetails?.items.filter((i) => (i.amount || 0) < 0).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1846:23",
											"data-prohibitions": "[editContent]",
											className: "grid grid-cols-12 text-red-600 py-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1847:25",
												"data-prohibitions": "[editContent]",
												className: "col-span-8 truncate pr-2",
												title: `${format(item.date ? new Date(item.date) : new Date(item.created), "dd/MM/yy")} - ${typeMap[item.type] || item.type}`,
												children: [
													format(item.date ? new Date(item.date) : new Date(item.created), "dd/MM/yy"),
													" ",
													typeMap[item.type] || item.type
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1857:25",
												"data-prohibitions": "[editContent]",
												className: "col-span-4 text-right",
												children: ["R$ ", (item.amount || 0).toFixed(2)]
											})]
										}, `deduction-${i}`))] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1866:13",
									"data-prohibitions": "[editContent]",
									className: "border-t border-dashed border-gray-300 pt-3 flex justify-between font-bold text-base",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Staff.tsx:1867:15",
										"data-prohibitions": "[]",
										children: "TOTAL PAGO"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/Staff.tsx:1868:15",
										"data-prohibitions": "[editContent]",
										children: ["R$ ", paymentReceiptDetails?.total.toFixed(2)]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Staff.tsx:1872:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-3 mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Staff.tsx:1873:13",
								"data-prohibitions": "[editContent]",
								onClick: () => {
									const text = paymentReceipt?.text || "";
									navigator.clipboard.writeText(text.replace(/\*/g, ""));
									setCopied(true);
									setTimeout(() => setCopied(false), 2e3);
								},
								className: "w-full gap-2 bg-[#F97316] hover:bg-[#EA580C] text-black border-none",
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/pages/Staff.tsx:1883:17",
									"data-prohibitions": "[editContent]",
									className: "size-4 text-black"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									"data-uid": "src/pages/Staff.tsx:1885:17",
									"data-prohibitions": "[editContent]",
									className: "size-4 text-black"
								}), copied ? "Copiado!" : "Copiar Recibo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Staff.tsx:1889:13",
								"data-prohibitions": "[]",
								onClick: () => {
									if (paymentReceipt?.url) window.open(paymentReceipt.url, "_blank");
								},
								className: "bg-green-600 hover:bg-green-700 text-white gap-2 w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
									"data-uid": "src/pages/Staff.tsx:1895:15",
									"data-prohibitions": "[editContent]",
									className: "size-4"
								}), "Enviar via WhatsApp"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							"data-uid": "src/pages/Staff.tsx:1899:11",
							"data-prohibitions": "[]",
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Staff.tsx:1900:13",
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
				"data-uid": "src/pages/Staff.tsx:1906:7",
				"data-prohibitions": "[editContent]",
				open: !!ticketItem,
				onOpenChange: (v) => !v && setTicketItem(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Staff.tsx:1907:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-sm bg-white text-black font-mono shadow-xl max-h-[90vh] overflow-y-auto rounded-md border border-gray-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/Staff.tsx:1908:11",
							"data-prohibitions": "[]",
							className: "mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/Staff.tsx:1909:13",
								"data-prohibitions": "[]",
								className: "flex flex-col items-center justify-center space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
									"data-uid": "src/pages/Staff.tsx:1910:15",
									"data-prohibitions": "[editContent]",
									className: "size-8 text-black"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Staff.tsx:1911:15",
									"data-prohibitions": "[]",
									className: "text-xl font-bold uppercase tracking-widest text-black",
									children: "Recibo de Comissão"
								})]
							})
						}),
						ticketData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Staff.tsx:1918:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1919:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-1 text-center border-b border-dashed border-gray-400 pb-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:1920:17",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-base uppercase tracking-wider",
											children: businessName
										}),
										ticketData.checkoutNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/Staff.tsx:1922:19",
											"data-prohibitions": "[editContent]",
											className: "text-lg font-black uppercase tracking-widest text-primary mt-1 mb-2",
											children: ["Pedido #", ticketData.checkoutNumber]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/Staff.tsx:1926:17",
											"data-prohibitions": "[editContent]",
											className: "text-gray-600",
											children: ["Profissional: ", ticketData.professionalName]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/Staff.tsx:1927:17",
											"data-prohibitions": "[editContent]",
											className: "text-gray-600",
											children: ["Cliente: ", ticketData.clientName]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:1928:17",
											"data-prohibitions": "[editContent]",
											className: "text-gray-600",
											children: format(ticketData.date, "dd/MM/yyyy HH:mm")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/Staff.tsx:1929:17",
											"data-prohibitions": "[editContent]",
											className: "text-gray-600",
											children: ["Pgto: ", ticketData.paymentMethodName]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1932:15",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between font-bold text-base bg-gray-100 p-2 rounded",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Staff.tsx:1933:17",
										"data-prohibitions": "[]",
										children: "Total Pago:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/Staff.tsx:1934:17",
										"data-prohibitions": "[editContent]",
										children: ["R$ ", ticketData.totalPaid.toFixed(2)]
									})]
								}),
								ticketData.snapshot && ticketData.snapshot.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:1938:17",
									"data-prohibitions": "[editContent]",
									className: "space-y-1 border border-gray-200 rounded p-2 bg-gray-50 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/Staff.tsx:1939:19",
										"data-prohibitions": "[]",
										className: "font-bold uppercase text-gray-800 text-xs mb-2 border-b pb-1",
										children: "Itens do Pedido (Snapshot)"
									}), ticketData.snapshot.map((sItem, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1943:21",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between text-gray-800 py-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/Staff.tsx:1944:23",
											"data-prohibitions": "[editContent]",
											className: "truncate max-w-[200px]",
											children: [
												sItem.quantity > 1 ? `${sItem.quantity}x ` : "",
												sItem.name,
												" ",
												sItem.packageUsed ? "(Pacote)" : ""
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/Staff.tsx:1948:23",
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
										"data-uid": "src/pages/Staff.tsx:1960:21",
										"data-prohibitions": "[editContent]",
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Staff.tsx:1961:23",
												"data-prohibitions": "[]",
												className: "font-bold uppercase text-gray-500 text-xs mt-4 mb-2",
												children: "Produtos (Sem Comissão)"
											}),
											ticketData.nonCommProducts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1965:25",
												"data-prohibitions": "[editContent]",
												className: "flex justify-between text-gray-500",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Staff.tsx:1966:27",
													"data-prohibitions": "[editContent]",
													className: "truncate max-w-[200px]",
													children: p.item
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/Staff.tsx:1967:27",
													"data-prohibitions": "[editContent]",
													children: ["R$ ", p.price.toFixed(2)]
												})]
											}, i)),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Staff.tsx:1970:23",
												"data-prohibitions": "[editContent]",
												className: "border-t border-dashed border-gray-300 my-2"
											})
										]
									}),
									ticketData.nonCommOthers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1975:21",
										"data-prohibitions": "[editContent]",
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/Staff.tsx:1976:23",
												"data-prohibitions": "[]",
												className: "font-bold uppercase text-gray-500 text-xs mt-4 mb-2",
												children: "Outros (Sem Comissão)"
											}),
											ticketData.nonCommOthers.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/Staff.tsx:1980:25",
												"data-prohibitions": "[editContent]",
												className: "flex justify-between text-gray-500",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Staff.tsx:1981:27",
													"data-prohibitions": "[editContent]",
													className: "truncate max-w-[200px]",
													children: p.item
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/pages/Staff.tsx:1982:27",
													"data-prohibitions": "[editContent]",
													children: ["R$ ", p.price.toFixed(2)]
												})]
											}, i)),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/Staff.tsx:1985:23",
												"data-prohibitions": "[editContent]",
												className: "border-t border-dashed border-gray-300 my-2"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Staff.tsx:1989:19",
										"data-prohibitions": "[editContent]",
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:1990:21",
											"data-prohibitions": "[]",
											className: "font-bold uppercase text-gray-800 text-xs mt-4 mb-2",
											children: "Itens Comissionáveis"
										}), ticketData.commissionableItems.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:1994:23",
											"data-prohibitions": "[editContent]",
											className: "flex justify-between text-gray-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Staff.tsx:1995:25",
												"data-prohibitions": "[editContent]",
												className: "truncate max-w-[200px]",
												children: i.item
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Staff.tsx:1996:25",
												"data-prohibitions": "[editContent]",
												children: ["R$ ", i.price.toFixed(2)]
											})]
										}, idx))]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/Staff.tsx:2003:15",
									"data-prohibitions": "[editContent]",
									className: "border-t border-dashed border-gray-400 my-4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:2005:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-1 bg-yellow-50/50 p-2 rounded border border-yellow-100",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Staff.tsx:2006:17",
											"data-prohibitions": "[]",
											className: "font-bold uppercase text-gray-800 text-xs mb-2",
											children: "Memória de Cálculo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:2008:17",
											"data-prohibitions": "[editContent]",
											className: "flex justify-between text-sm text-gray-600 mb-2 border-b border-gray-200 pb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Staff.tsx:2009:19",
												"data-prohibitions": "[]",
												children: "Base Comissionável:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Staff.tsx:2010:19",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: ["R$ ", ticketData.commissionBase.toFixed(2)]
											})]
										}),
										ticketData.memoryLines.map((line, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Staff.tsx:2014:19",
											"data-prohibitions": "[editContent]",
											className: "flex justify-between text-gray-800 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Staff.tsx:2015:21",
												"data-prohibitions": "[editContent]",
												children: line.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Staff.tsx:2016:21",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: ["R$ ", line.value.toFixed(2)]
											})]
										}, idx))
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/Staff.tsx:2021:15",
									"data-prohibitions": "[editContent]",
									className: "border-t border-black border-2 my-4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Staff.tsx:2023:15",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between font-black text-lg uppercase tracking-wide",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Staff.tsx:2024:17",
										"data-prohibitions": "[]",
										children: "Total a Pagar:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/Staff.tsx:2025:17",
										"data-prohibitions": "[editContent]",
										children: ["R$ ", ticketData.netCommission.toFixed(2)]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/Staff.tsx:2030:11",
							"data-prohibitions": "[editContent]",
							className: "mt-4 flex-col sm:flex-col gap-2 border-t border-dashed border-gray-300 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Staff.tsx:2031:13",
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
									"data-uid": "src/pages/Staff.tsx:2063:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									"data-uid": "src/pages/Staff.tsx:2065:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), copied ? "Copiado!" : "Copiar Recibo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Staff.tsx:2069:13",
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

//# sourceMappingURL=Staff-Ce0ayQdz.js.map