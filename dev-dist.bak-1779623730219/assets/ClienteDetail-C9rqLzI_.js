import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { t as ArrowLeft } from "./arrow-left-B4H8m05g.js";
import { $ as Package, G as getContrastColor, R as Button, S as DialogTitle, U as cn, Z as ShoppingBag, _ as Dialog, a as pb, at as CalendarDays, b as DialogFooter, c as SelectContent, f as SelectTrigger, n as useRealtime, p as SelectValue, q as phoneMask, rt as ChevronDown, s as Select, st as createLucideIcon, t as Label, tt as ChevronUp, u as SelectItem, v as DialogContent, vt as Link, x as DialogHeader, xt as useParams } from "./index-BcGnSmFb.js";
import { t as format } from "./format-BWFAnkIi.js";
import { h as getProductPurchasesByClient, i as getAppointmentsByClient, l as getClientPackages } from "./api-DQTD47bI.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-Dk6qdK90.js";
import { t as Badge } from "./badge-DRj6JnG1.js";
import { t as Progress } from "./progress-Bg5B0Er8.js";
var FileText = createLucideIcon("file-text", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]);
var ThumbsDown = createLucideIcon("thumbs-down", [["path", {
	d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
	key: "m61m77"
}], ["path", {
	d: "M17 14V2",
	key: "8ymqnk"
}]]);
var ThumbsUp = createLucideIcon("thumbs-up", [["path", {
	d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
	key: "emmmcr"
}], ["path", {
	d: "M7 10v12",
	key: "1qc93n"
}]]);
//#endregion
//#region src/components/ui/textarea.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-uid": "src/components/ui/textarea.tsx:9:7",
		"data-prohibitions": "[editContent]",
		className: cn("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/pages/ClienteDetail.tsx
function PackageCard({ p, status, used, total, progress, packageAppointments }) {
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/ClienteDetail.tsx:47:5",
		"data-prohibitions": "[editContent]",
		className: "overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/ClienteDetail.tsx:48:7",
			"data-prohibitions": "[editContent]",
			className: "p-4 cursor-pointer hover:bg-muted/10 transition-colors",
			onClick: () => setExpanded(!expanded),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ClienteDetail.tsx:52:9",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/ClienteDetail.tsx:53:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-1 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/ClienteDetail.tsx:54:13",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								"data-uid": "src/pages/ClienteDetail.tsx:55:15",
								"data-prohibitions": "[editContent]",
								className: "font-bold text-lg",
								children: p.expand?.package_id?.name || "Pacote"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/ClienteDetail.tsx:56:15",
								"data-prohibitions": "[editContent]",
								variant: status === "Ativo" ? "default" : status === "Concluído" ? "secondary" : "destructive",
								children: status
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/ClienteDetail.tsx:68:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/pages/ClienteDetail.tsx:69:15",
								"data-prohibitions": "[editContent]",
								children: ["Data da Compra: ", format(new Date(p.created), "dd/MM/yyyy")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/pages/ClienteDetail.tsx:70:15",
								"data-prohibitions": "[editContent]",
								children: [
									"Validade:",
									" ",
									p.expires_at ? format(new Date(p.expires_at), "dd/MM/yyyy") : "Sem validade"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/ClienteDetail.tsx:76:11",
						"data-prohibitions": "[editContent]",
						className: "w-full md:w-64 space-y-1 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/ClienteDetail.tsx:77:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/pages/ClienteDetail.tsx:78:15",
								"data-prohibitions": "[editContent]",
								children: [
									used,
									" / ",
									total,
									" usadas"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/pages/ClienteDetail.tsx:81:15",
								"data-prohibitions": "[editContent]",
								className: "font-medium",
								children: [p.remaining_uses, " sessões restantes"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							"data-uid": "src/pages/ClienteDetail.tsx:83:13",
							"data-prohibitions": "[editContent]",
							value: progress,
							className: `h-2 ${progress <= 25 ? "[&>div]:bg-green-500" : progress <= 50 ? "[&>div]:bg-blue-500" : progress <= 75 ? "[&>div]:bg-orange-500" : "[&>div]:bg-red-500"}`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/ClienteDetail.tsx:96:11",
						"data-prohibitions": "[editContent]",
						variant: "ghost",
						size: "icon",
						className: "shrink-0 hidden md:flex",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/ClienteDetail.tsx:97:13",
							"data-prohibitions": "[editContent]",
							children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
								"data-uid": "src/pages/ClienteDetail.tsx:98:27",
								"data-prohibitions": "[editContent]",
								className: "size-5"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
								"data-uid": "src/pages/ClienteDetail.tsx:98:62",
								"data-prohibitions": "[editContent]",
								className: "size-5"
							})
						})
					})
				]
			})
		}), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/ClienteDetail.tsx:104:9",
			"data-prohibitions": "[editContent]",
			className: "p-4 border-t bg-muted/5 space-y-3 animate-fade-in-down",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				"data-uid": "src/pages/ClienteDetail.tsx:105:11",
				"data-prohibitions": "[]",
				className: "font-semibold text-sm",
				children: "Histórico de Uso"
			}), packageAppointments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/ClienteDetail.tsx:107:13",
				"data-prohibitions": "[]",
				className: "text-sm text-muted-foreground",
				children: "Nenhuma sessão utilizada ainda."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/ClienteDetail.tsx:109:13",
				"data-prohibitions": "[editContent]",
				className: "space-y-2",
				children: packageAppointments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/ClienteDetail.tsx:111:17",
					"data-prohibitions": "[editContent]",
					className: "flex justify-between items-center bg-background border p-2 rounded-md text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/ClienteDetail.tsx:115:19",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/ClienteDetail.tsx:116:21",
							"data-prohibitions": "[editContent]",
							className: "font-medium",
							children: a.expand?.service_id?.name || "Serviço"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/ClienteDetail.tsx:117:21",
							"data-prohibitions": "[editContent]",
							className: "text-xs text-muted-foreground",
							children: format(new Date(a.date), "dd/MM/yyyy")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-uid": "src/pages/ClienteDetail.tsx:121:19",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						children: a.status
					})]
				}, a.id))
			})]
		})]
	});
}
function ClienteDetail() {
	const { id } = useParams();
	const [client, setClient] = (0, import_react.useState)(null);
	const [appointments, setAppointments] = (0, import_react.useState)([]);
	const [purchases, setPurchases] = (0, import_react.useState)([]);
	const [packages, setPackages] = (0, import_react.useState)([]);
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [logDialogOpen, setLogDialogOpen] = (0, import_react.useState)(false);
	const [barbers, setBarbers] = (0, import_react.useState)([]);
	const [logForm, setLogForm] = (0, import_react.useState)({
		details: "",
		sentiment: "neutral",
		barber_id: ""
	});
	const loadData = async () => {
		if (!id) return;
		try {
			setClient(await pb.collection("clients").getOne(id));
			setAppointments(await getAppointmentsByClient(id));
			setPurchases(await getProductPurchasesByClient(id));
			setPackages((await getClientPackages()).filter((p) => p.client_id === id));
			try {
				setLogs(await pb.collection("client_logs").getFullList({
					filter: `client_id="${id}"`,
					sort: "-created",
					expand: "barber_id"
				}));
				setBarbers(await pb.collection("barbers").getFullList());
			} catch {}
		} catch (e) {
			console.error(e);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, [id]);
	useRealtime("clients", (e) => {
		if (e.record.id === id) loadData();
	});
	useRealtime("appointments", loadData);
	useRealtime("product_purchases", loadData);
	useRealtime("client_packages", loadData);
	useRealtime("client_logs", loadData);
	const stats = (0, import_react.useMemo)(() => {
		const completedApts = appointments.filter((a) => a.status === "Concluído");
		const totalServices = completedApts.reduce((sum, a) => sum + (a.price || a.expand?.service_id?.price || 0), 0);
		const totalProducts = purchases.reduce((sum, p) => sum + (p.price_at_sale || 0), 0);
		const sCounts = {};
		completedApts.forEach((a) => {
			const sName = a.expand?.service_id?.name;
			if (sName) sCounts[sName] = (sCounts[sName] || 0) + 1;
		});
		const mostUsedEntry = Object.entries(sCounts).sort((a, b) => b[1] - a[1])[0];
		const mostUsed = mostUsedEntry ? `${mostUsedEntry[0]} (${mostUsedEntry[1]})` : "Nenhum";
		return {
			visits: completedApts.length,
			totalServices,
			totalProducts,
			mostUsed
		};
	}, [appointments, purchases]);
	const activity = (0, import_react.useMemo)(() => {
		const list = [];
		appointments.forEach((a) => list.push({
			id: a.id,
			type: "service",
			date: new Date(a.date),
			title: a.expand?.service_id?.name || "Serviço",
			barberName: a.expand?.barber_id?.name || "Sem profissional",
			barberColor: a.expand?.barber_id?.color || "hsl(var(--primary))",
			val: a.price || a.expand?.service_id?.price
		}));
		purchases.forEach((p) => list.push({
			id: p.id,
			type: "product",
			date: new Date(p.date || p.created),
			title: p.expand?.product_id?.name || "Produto",
			barberName: p.expand?.barber_id?.name || "Sem profissional",
			barberColor: p.expand?.barber_id?.color || "hsl(var(--primary))",
			val: p.price_at_sale
		}));
		packages.forEach((p) => list.push({
			id: p.id,
			type: "package",
			date: new Date(p.created),
			title: p.expand?.package_id?.name || "Pacote",
			barberName: p.expand?.barber_id?.name || "Sem profissional",
			barberColor: p.expand?.barber_id?.color || "hsl(var(--primary))",
			val: p.expand?.package_id?.price
		}));
		return list.sort((a, b) => b.date.getTime() - a.date.getTime());
	}, [
		appointments,
		purchases,
		packages
	]);
	const handleSaveLog = async () => {
		if (!id || !logForm.details) return;
		try {
			await pb.collection("client_logs").create({
				client_id: id,
				event_type: "manual_entry",
				details: logForm.details,
				sentiment: logForm.sentiment === "neutral" ? "" : logForm.sentiment,
				barber_id: logForm.barber_id || null
			});
			setLogDialogOpen(false);
			setLogForm({
				details: "",
				sentiment: "neutral",
				barber_id: ""
			});
			loadData();
		} catch (e) {
			console.error(e);
		}
	};
	if (!client) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/ClienteDetail.tsx:258:23",
		"data-prohibitions": "[]",
		className: "p-8",
		children: "Carregando..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/ClienteDetail.tsx:261:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-5xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ClienteDetail.tsx:262:7",
				"data-prohibitions": "[editContent]",
				className: "flex items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/ClienteDetail.tsx:263:9",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "icon",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-uid": "src/pages/ClienteDetail.tsx:264:11",
							"data-prohibitions": "[]",
							to: "/clientes",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								"data-uid": "src/pages/ClienteDetail.tsx:265:13",
								"data-prohibitions": "[editContent]",
								className: "size-4"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/ClienteDetail.tsx:268:9",
						"data-prohibitions": "[editContent]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								"data-uid": "src/pages/ClienteDetail.tsx:269:11",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold tracking-tight",
								children: [
									client.name,
									" ",
									client.surname
								]
							}),
							(client.phone || client.phone_secondary) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/ClienteDetail.tsx:273:13",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-2 mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/ClienteDetail.tsx:274:15",
									"data-prohibitions": "[editContent]",
									className: "text-muted-foreground text-sm font-medium",
									children: [phoneMask(client.phone), client.phone_secondary && ` | ${phoneMask(client.phone_secondary)}`]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/ClienteDetail.tsx:280:11",
								"data-prohibitions": "[editContent]",
								className: "text-muted-foreground mt-1 text-sm",
								children: [
									"Cadastrado em: ",
									format(new Date(client.created), "dd/MM/yyyy"),
									" | Cliente desde:",
									" ",
									activity.length > 0 ? format(activity[activity.length - 1].date, "dd/MM/yyyy") : "N/A"
								]
							})
						]
					}),
					client.is_active === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-uid": "src/pages/ClienteDetail.tsx:286:11",
						"data-prohibitions": "[]",
						variant: "destructive",
						className: "ml-auto",
						children: "Inativo"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ClienteDetail.tsx:292:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/ClienteDetail.tsx:293:9",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/ClienteDetail.tsx:294:11",
							"data-prohibitions": "[editContent]",
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ClienteDetail.tsx:295:13",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Total Visitas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ClienteDetail.tsx:296:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: stats.visits
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/ClienteDetail.tsx:299:9",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/ClienteDetail.tsx:300:11",
							"data-prohibitions": "[editContent]",
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ClienteDetail.tsx:301:13",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Serviço Favorito"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ClienteDetail.tsx:302:13",
								"data-prohibitions": "[editContent]",
								className: "text-xl font-bold truncate",
								children: stats.mostUsed
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/ClienteDetail.tsx:305:9",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/ClienteDetail.tsx:306:11",
							"data-prohibitions": "[editContent]",
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ClienteDetail.tsx:307:13",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Gasto Serviços"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/ClienteDetail.tsx:308:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: ["R$ ", stats.totalServices.toFixed(2)]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/ClienteDetail.tsx:311:9",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/ClienteDetail.tsx:312:11",
							"data-prohibitions": "[editContent]",
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/ClienteDetail.tsx:313:13",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Gasto Produtos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/ClienteDetail.tsx:314:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: ["R$ ", stats.totalProducts.toFixed(2)]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ClienteDetail.tsx:319:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/pages/ClienteDetail.tsx:320:9",
					"data-prohibitions": "[]",
					className: "text-xl font-bold tracking-tight",
					children: "Meus Pacotes"
				}), packages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/ClienteDetail.tsx:322:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground bg-muted/20 p-4 rounded-lg border",
					children: "Este cliente não possui pacotes ativos."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/ClienteDetail.tsx:326:11",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-1 gap-4",
					children: packages.map((p) => {
						const isExpired = p.expires_at && new Date(p.expires_at) < /* @__PURE__ */ new Date();
						const status = p.remaining_uses === 0 ? "Concluído" : isExpired ? "Expirado" : "Ativo";
						const total = p.expand?.package_id?.quantity || 1;
						const used = total - p.remaining_uses;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCard, {
							"data-uid": "src/pages/ClienteDetail.tsx:336:17",
							"data-prohibitions": "[editContent]",
							p,
							status,
							used,
							total,
							progress: used / total * 100,
							packageAppointments: appointments.filter((a) => a.client_package_id === p.id)
						}, p.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/ClienteDetail.tsx:351:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/ClienteDetail.tsx:352:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/ClienteDetail.tsx:353:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/ClienteDetail.tsx:354:13",
							"data-prohibitions": "[]",
							children: "Histórico de Atividades"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/ClienteDetail.tsx:356:11",
						"data-prohibitions": "[editContent]",
						children: activity.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/ClienteDetail.tsx:358:15",
							"data-prohibitions": "[]",
							className: "text-muted-foreground",
							children: "Nenhuma atividade registrada."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/ClienteDetail.tsx:360:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-4 max-h-[500px] overflow-y-auto pr-2",
							children: activity.map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/ClienteDetail.tsx:362:19",
								"data-prohibitions": "[editContent]",
								className: "flex items-center justify-between p-3 border rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/ClienteDetail.tsx:366:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-3",
									children: [
										act.type === "service" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
											"data-uid": "src/pages/ClienteDetail.tsx:367:50",
											"data-prohibitions": "[editContent]",
											className: "size-5 text-blue-500"
										}),
										act.type === "product" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
											"data-uid": "src/pages/ClienteDetail.tsx:368:50",
											"data-prohibitions": "[editContent]",
											className: "size-5 text-green-500"
										}),
										act.type === "package" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
											"data-uid": "src/pages/ClienteDetail.tsx:369:50",
											"data-prohibitions": "[editContent]",
											className: "size-5 text-purple-500"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/ClienteDetail.tsx:370:23",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/ClienteDetail.tsx:371:25",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/ClienteDetail.tsx:372:27",
													"data-prohibitions": "[editContent]",
													className: "font-medium",
													children: act.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/ClienteDetail.tsx:373:27",
													"data-prohibitions": "[editContent]",
													className: "text-[10px] font-bold px-2 py-0.5 rounded-full",
													style: {
														backgroundColor: act.barberColor,
														color: getContrastColor(act.barberColor)
													},
													children: act.barberName
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/ClienteDetail.tsx:383:25",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground mt-0.5",
												children: format(act.date, "dd/MM/yyyy HH:mm")
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/ClienteDetail.tsx:388:21",
									"data-prohibitions": "[editContent]",
									className: "font-bold",
									children: ["R$ ", (act.val || 0).toFixed(2)]
								})]
							}, act.id))
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/ClienteDetail.tsx:396:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/ClienteDetail.tsx:397:11",
						"data-prohibitions": "[]",
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/ClienteDetail.tsx:398:13",
							"data-prohibitions": "[]",
							children: "Observações e Ocorrências"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/ClienteDetail.tsx:399:13",
							"data-prohibitions": "[]",
							size: "sm",
							onClick: () => setLogDialogOpen(true),
							children: "Nova Ocorrência"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/ClienteDetail.tsx:403:11",
						"data-prohibitions": "[editContent]",
						children: logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/ClienteDetail.tsx:405:15",
							"data-prohibitions": "[]",
							className: "text-muted-foreground",
							children: "Nenhuma ocorrência registrada."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/ClienteDetail.tsx:407:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-4 max-h-[500px] overflow-y-auto pr-2 pt-2",
							children: logs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/ClienteDetail.tsx:409:19",
								"data-prohibitions": "[editContent]",
								className: `p-3 border rounded-lg ${log.sentiment === "positive" ? "bg-green-500/5 border-green-200" : log.sentiment === "negative" ? "bg-red-500/5 border-red-200" : "bg-muted/20"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/ClienteDetail.tsx:413:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2 mb-1",
									children: [
										log.sentiment === "positive" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, {
											"data-uid": "src/pages/ClienteDetail.tsx:415:25",
											"data-prohibitions": "[editContent]",
											className: "size-4 text-green-500"
										}) : log.sentiment === "negative" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, {
											"data-uid": "src/pages/ClienteDetail.tsx:417:25",
											"data-prohibitions": "[editContent]",
											className: "size-4 text-red-500"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
											"data-uid": "src/pages/ClienteDetail.tsx:419:25",
											"data-prohibitions": "[editContent]",
											className: "size-4 text-muted-foreground"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/ClienteDetail.tsx:421:23",
											"data-prohibitions": "[editContent]",
											className: `text-xs font-semibold px-2 py-0.5 rounded ${log.sentiment === "positive" ? "bg-green-500/10 text-green-700" : log.sentiment === "negative" ? "bg-red-500/10 text-red-700" : "bg-primary/10 text-primary"}`,
											children: log.event_type === "no_show" ? "FALTOU" : log.event_type === "reschedule" ? "Remarcação" : log.event_type === "manual_entry" ? "Registro Manual" : log.event_type
										}),
										log.expand?.barber_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/ClienteDetail.tsx:433:25",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground ml-2",
											children: ["por ", log.expand.barber_id.name]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/ClienteDetail.tsx:437:23",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground ml-auto",
											children: format(new Date(log.created), "dd/MM/yyyy HH:mm")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/ClienteDetail.tsx:441:21",
									"data-prohibitions": "[editContent]",
									className: "text-sm mt-2",
									children: log.details
								})]
							}, log.id))
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/ClienteDetail.tsx:450:7",
				"data-prohibitions": "[editContent]",
				open: logDialogOpen,
				onOpenChange: setLogDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/ClienteDetail.tsx:451:9",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/ClienteDetail.tsx:452:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/ClienteDetail.tsx:453:13",
								"data-prohibitions": "[]",
								children: "Nova Ocorrência / Observação"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/ClienteDetail.tsx:455:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/ClienteDetail.tsx:456:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/ClienteDetail.tsx:457:15",
									"data-prohibitions": "[]",
									children: "Descrição"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									"data-uid": "src/pages/ClienteDetail.tsx:458:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Detalhes da ocorrência...",
									value: logForm.details,
									onChange: (e) => setLogForm({
										...logForm,
										details: e.target.value
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/ClienteDetail.tsx:464:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/ClienteDetail.tsx:465:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/ClienteDetail.tsx:466:17",
										"data-prohibitions": "[]",
										children: "Sentimento"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/ClienteDetail.tsx:467:17",
										"data-prohibitions": "[]",
										value: logForm.sentiment,
										onValueChange: (v) => setLogForm({
											...logForm,
											sentiment: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/ClienteDetail.tsx:471:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/ClienteDetail.tsx:472:21",
												"data-prohibitions": "[editContent]",
												placeholder: "Selecione..."
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/ClienteDetail.tsx:474:19",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/ClienteDetail.tsx:475:21",
													"data-prohibitions": "[]",
													value: "neutral",
													children: "Neutro"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/ClienteDetail.tsx:476:21",
													"data-prohibitions": "[]",
													value: "positive",
													children: "Positivo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/ClienteDetail.tsx:477:21",
													"data-prohibitions": "[]",
													value: "negative",
													children: "Negativo"
												})
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/ClienteDetail.tsx:481:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/ClienteDetail.tsx:482:17",
										"data-prohibitions": "[]",
										children: "Profissional"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/ClienteDetail.tsx:483:17",
										"data-prohibitions": "[editContent]",
										value: logForm.barber_id,
										onValueChange: (v) => setLogForm({
											...logForm,
											barber_id: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/ClienteDetail.tsx:487:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/ClienteDetail.tsx:488:21",
												"data-prohibitions": "[editContent]",
												placeholder: "Selecione o profissional..."
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
											"data-uid": "src/pages/ClienteDetail.tsx:490:19",
											"data-prohibitions": "[editContent]",
											children: barbers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/ClienteDetail.tsx:492:23",
												"data-prohibitions": "[editContent]",
												value: b.id,
												children: b.name
											}, b.id))
										})]
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/ClienteDetail.tsx:501:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/ClienteDetail.tsx:502:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setLogDialogOpen(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/ClienteDetail.tsx:505:13",
								"data-prohibitions": "[]",
								onClick: handleSaveLog,
								disabled: !logForm.details,
								children: "Salvar"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { ClienteDetail as default };

//# sourceMappingURL=ClienteDetail-C9rqLzI_.js.map