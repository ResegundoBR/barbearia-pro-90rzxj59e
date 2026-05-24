import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { t as Plus } from "./plus-DjvlP01n.js";
import { t as SquarePen } from "./square-pen-BcMcE6Wt.js";
import { H as Input, S as DialogTitle, U as Button, _ as Dialog, a as pb, b as DialogFooter, c as SelectContent, f as SelectTrigger, p as SelectValue, s as Select, t as Label, u as SelectItem, v as DialogContent, wt as useToast, x as DialogHeader } from "./index-Dw6qfu4w.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-dL19f92T.js";
import { t as Card } from "./card-DvhcMp0V.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BXRoTL0V.js";
import { t as Badge } from "./badge-Ct9bmpZd.js";
import { t as Switch } from "./switch-k8KY2pdF.js";
//#region src/components/estoque/ServicesTab.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ServicesTab() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [filterCategory, setFilterCategory] = (0, import_react.useState)("all");
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		price: "",
		category_id: "",
		duration_minutes: 30,
		is_active: true
	});
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const { toast } = useToast();
	const loadData = async () => {
		setItems(await pb.collection("services").getFullList({
			sort: "-created",
			expand: "category_id"
		}));
		setCategories(await pb.collection("categories").getFullList({
			filter: "type='service'",
			sort: "name"
		}));
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	const handleOpen = (item) => {
		if (item) {
			setForm({
				...item,
				category_id: item.category_id || "none"
			});
			setEditingId(item.id);
		} else {
			setForm({
				name: "",
				price: "",
				category_id: "none",
				duration_minutes: 30,
				is_active: true
			});
			setEditingId(null);
		}
		setIsOpen(true);
	};
	const handleSave = async () => {
		try {
			const data = {
				...form,
				category_id: form.category_id === "none" ? "" : form.category_id,
				price: Number(form.price),
				duration_minutes: Number(form.duration_minutes)
			};
			if (editingId) {
				await pb.collection("services").update(editingId, data);
				toast({ title: "Serviço atualizado com sucesso!" });
			} else {
				await pb.collection("services").create(data);
				toast({ title: "Serviço criado com sucesso!" });
			}
			setIsOpen(false);
			loadData();
		} catch (err) {
			toast({
				title: "Erro ao salvar",
				variant: "destructive"
			});
		}
	};
	const toggleActive = async (id, current) => {
		try {
			await pb.collection("services").update(id, { is_active: !current });
			loadData();
		} catch (err) {
			toast({
				title: "Erro ao atualizar status",
				variant: "destructive"
			});
		}
	};
	const filteredItems = items.filter((item) => filterCategory === "all" || item.category_id === filterCategory);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/estoque/ServicesTab.tsx:111:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-4 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/estoque/ServicesTab.tsx:112:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/components/estoque/ServicesTab.tsx:113:9",
					"data-prohibitions": "[]",
					className: "text-lg font-semibold",
					children: "Catálogo de Serviços"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/estoque/ServicesTab.tsx:114:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/components/estoque/ServicesTab.tsx:115:11",
						"data-prohibitions": "[editContent]",
						value: filterCategory,
						onValueChange: setFilterCategory,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/components/estoque/ServicesTab.tsx:116:13",
							"data-prohibitions": "[]",
							className: "w-full sm:w-[200px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/components/estoque/ServicesTab.tsx:117:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Todas Categorias"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							"data-uid": "src/components/estoque/ServicesTab.tsx:119:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/estoque/ServicesTab.tsx:120:15",
								"data-prohibitions": "[]",
								value: "all",
								children: "Todas Categorias"
							}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/estoque/ServicesTab.tsx:122:17",
								"data-prohibitions": "[editContent]",
								value: c.id,
								children: c.name
							}, c.id))]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/estoque/ServicesTab.tsx:128:11",
						"data-prohibitions": "[]",
						onClick: () => handleOpen(),
						className: "w-full sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-uid": "src/components/estoque/ServicesTab.tsx:129:13",
							"data-prohibitions": "[editContent]",
							className: "size-4 mr-2"
						}), " Novo Serviço"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/components/estoque/ServicesTab.tsx:133:7",
				"data-prohibitions": "[editContent]",
				className: "border-none shadow-sm overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/estoque/ServicesTab.tsx:134:9",
					"data-prohibitions": "[editContent]",
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/components/estoque/ServicesTab.tsx:135:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/components/estoque/ServicesTab.tsx:136:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/estoque/ServicesTab.tsx:137:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:138:17",
										"data-prohibitions": "[]",
										children: "Nome"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:139:17",
										"data-prohibitions": "[]",
										children: "Preço"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:140:17",
										"data-prohibitions": "[]",
										children: "Categoria / Comissão (%)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:141:17",
										"data-prohibitions": "[]",
										children: "Duração (min)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:142:17",
										"data-prohibitions": "[]",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:143:17",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/components/estoque/ServicesTab.tsx:146:13",
							"data-prohibitions": "[editContent]",
							children: [filteredItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/estoque/ServicesTab.tsx:148:17",
								"data-prohibitions": "[editContent]",
								className: !item.is_active ? "opacity-60" : "",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:149:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: item.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:150:19",
										"data-prohibitions": "[editContent]",
										children: ["R$ ", item.price?.toFixed(2)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:151:19",
										"data-prohibitions": "[editContent]",
										children: item.expand?.category_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/estoque/ServicesTab.tsx:153:23",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/estoque/ServicesTab.tsx:154:25",
												"data-prohibitions": "[editContent]",
												children: item.expand.category_id.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/components/estoque/ServicesTab.tsx:155:25",
												"data-prohibitions": "[editContent]",
												variant: "outline",
												className: "text-[10px]",
												children: [item.expand.category_id.commission_percentage, "%"]
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/estoque/ServicesTab.tsx:160:23",
											"data-prohibitions": "[editContent]",
											children: [item.commission_rate || 0, "% (Legado)"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:163:19",
										"data-prohibitions": "[editContent]",
										children: [item.duration_minutes, " min"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:164:19",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/estoque/ServicesTab.tsx:165:21",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												"data-uid": "src/components/estoque/ServicesTab.tsx:166:23",
												"data-prohibitions": "[editContent]",
												checked: item.is_active,
												onCheckedChange: () => toggleActive(item.id, item.is_active)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/components/estoque/ServicesTab.tsx:170:23",
												"data-prohibitions": "[editContent]",
												variant: item.is_active ? "default" : "secondary",
												className: "text-[10px]",
												children: item.is_active ? "Ativo" : "Inativo"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:178:19",
										"data-prohibitions": "[]",
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/components/estoque/ServicesTab.tsx:179:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											onClick: () => handleOpen(item),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
												"data-uid": "src/components/estoque/ServicesTab.tsx:180:23",
												"data-prohibitions": "[editContent]",
												className: "size-4"
											})
										})
									})
								]
							}, item.id)), filteredItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/components/estoque/ServicesTab.tsx:186:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/estoque/ServicesTab.tsx:187:19",
									"data-prohibitions": "[]",
									colSpan: 6,
									className: "text-center py-6 text-muted-foreground",
									children: "Nenhum serviço encontrado."
								})
							})]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/components/estoque/ServicesTab.tsx:197:7",
				"data-prohibitions": "[editContent]",
				open: isOpen,
				onOpenChange: setIsOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/components/estoque/ServicesTab.tsx:198:9",
					"data-prohibitions": "[editContent]",
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/components/estoque/ServicesTab.tsx:199:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/components/estoque/ServicesTab.tsx:200:13",
								"data-prohibitions": "[editContent]",
								children: editingId ? "Editar Serviço" : "Novo Serviço"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/estoque/ServicesTab.tsx:202:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/estoque/ServicesTab.tsx:203:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:204:15",
										"data-prohibitions": "[]",
										children: "Nome"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/estoque/ServicesTab.tsx:205:15",
										"data-prohibitions": "[editContent]",
										value: form.name,
										onChange: (e) => setForm({
											...form,
											name: e.target.value
										}),
										placeholder: "Ex: Corte Degradê"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/estoque/ServicesTab.tsx:211:13",
									"data-prohibitions": "[editContent]",
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/estoque/ServicesTab.tsx:212:15",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/estoque/ServicesTab.tsx:213:17",
											"data-prohibitions": "[]",
											children: "Preço (R$)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/estoque/ServicesTab.tsx:214:17",
											"data-prohibitions": "[editContent]",
											type: "number",
											step: "0.01",
											value: form.price,
											onChange: (e) => setForm({
												...form,
												price: e.target.value
											}),
											placeholder: "35.00"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/estoque/ServicesTab.tsx:222:15",
										"data-prohibitions": "[editContent]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/estoque/ServicesTab.tsx:223:17",
											"data-prohibitions": "[]",
											children: "Categoria de Comissão"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/components/estoque/ServicesTab.tsx:224:17",
											"data-prohibitions": "[editContent]",
											value: form.category_id,
											onValueChange: (v) => setForm({
												...form,
												category_id: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/components/estoque/ServicesTab.tsx:228:19",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/components/estoque/ServicesTab.tsx:229:21",
													"data-prohibitions": "[editContent]",
													placeholder: "Selecione..."
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
												"data-uid": "src/components/estoque/ServicesTab.tsx:231:19",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/estoque/ServicesTab.tsx:232:21",
													"data-prohibitions": "[]",
													value: "none",
													children: "Nenhuma"
												}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
													"data-uid": "src/components/estoque/ServicesTab.tsx:234:23",
													"data-prohibitions": "[editContent]",
													value: c.id,
													children: [
														c.name,
														" (",
														c.commission_percentage,
														"%)"
													]
												}, c.id))]
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/estoque/ServicesTab.tsx:242:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/estoque/ServicesTab.tsx:243:15",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/estoque/ServicesTab.tsx:244:17",
											"data-prohibitions": "[]",
											children: "Duração (minutos)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/estoque/ServicesTab.tsx:245:17",
											"data-prohibitions": "[editContent]",
											type: "number",
											value: form.duration_minutes,
											onChange: (e) => setForm({
												...form,
												duration_minutes: e.target.value
											}),
											placeholder: "30"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/estoque/ServicesTab.tsx:252:15",
										"data-prohibitions": "[]",
										className: "flex items-center space-x-2 mt-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											"data-uid": "src/components/estoque/ServicesTab.tsx:253:17",
											"data-prohibitions": "[editContent]",
											checked: form.is_active,
											onCheckedChange: (c) => setForm({
												...form,
												is_active: c
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/estoque/ServicesTab.tsx:257:17",
											"data-prohibitions": "[]",
											children: "Serviço Ativo"
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							"data-uid": "src/components/estoque/ServicesTab.tsx:261:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/estoque/ServicesTab.tsx:262:13",
								"data-prohibitions": "[]",
								onClick: handleSave,
								className: "w-full sm:w-auto",
								children: "Salvar Serviço"
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/estoque/PackagesTab.tsx
function PackagesTab() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [services, setServices] = (0, import_react.useState)([]);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		quantity: 1,
		price: "",
		duration_minutes: 30,
		is_active: true,
		periodicity: "semanal",
		service_id: ""
	});
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const { toast } = useToast();
	const loadData = async () => {
		setItems(await pb.collection("packages").getFullList({
			sort: "-created",
			expand: "service_id"
		}));
		setServices(await pb.collection("services").getFullList({ sort: "name" }));
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	const handleOpen = (item) => {
		if (item) {
			setForm({
				...item,
				periodicity: item.periodicity || "semanal",
				service_id: item.service_id || "none"
			});
			setEditingId(item.id);
		} else {
			setForm({
				name: "",
				quantity: 1,
				price: "",
				duration_minutes: 30,
				is_active: true,
				periodicity: "semanal",
				service_id: "none"
			});
			setEditingId(null);
		}
		setIsOpen(true);
	};
	const handleSave = async () => {
		try {
			const data = {
				...form,
				service_id: form.service_id === "none" ? "" : form.service_id,
				price: Number(form.price),
				quantity: Number(form.quantity),
				duration_minutes: Number(form.duration_minutes)
			};
			if (editingId) {
				await pb.collection("packages").update(editingId, data);
				toast({ title: "Pacote atualizado com sucesso!" });
			} else {
				await pb.collection("packages").create(data);
				toast({ title: "Pacote criado com sucesso!" });
			}
			setIsOpen(false);
			loadData();
		} catch (err) {
			toast({
				title: "Erro ao salvar",
				variant: "destructive"
			});
		}
	};
	const toggleActive = async (id, current) => {
		try {
			await pb.collection("packages").update(id, { is_active: !current });
			loadData();
		} catch (err) {
			toast({
				title: "Erro ao atualizar status",
				variant: "destructive"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/estoque/PackagesTab.tsx:119:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-4 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/estoque/PackagesTab.tsx:120:7",
				"data-prohibitions": "[]",
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/components/estoque/PackagesTab.tsx:121:9",
					"data-prohibitions": "[]",
					className: "text-lg font-semibold",
					children: "Gestão de Pacotes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/components/estoque/PackagesTab.tsx:122:9",
					"data-prohibitions": "[]",
					onClick: () => handleOpen(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/components/estoque/PackagesTab.tsx:123:11",
						"data-prohibitions": "[editContent]",
						className: "size-4 mr-2"
					}), " Novo Pacote"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/components/estoque/PackagesTab.tsx:126:7",
				"data-prohibitions": "[editContent]",
				className: "border-none shadow-sm overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/estoque/PackagesTab.tsx:127:9",
					"data-prohibitions": "[editContent]",
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/components/estoque/PackagesTab.tsx:128:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/components/estoque/PackagesTab.tsx:129:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/estoque/PackagesTab.tsx:130:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:131:17",
										"data-prohibitions": "[]",
										children: "Nome"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:132:17",
										"data-prohibitions": "[]",
										children: "Serviço Vinculado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:133:17",
										"data-prohibitions": "[]",
										children: "Qtd. Usos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:134:17",
										"data-prohibitions": "[]",
										children: "Period."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:135:17",
										"data-prohibitions": "[]",
										children: "Preço Total"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:136:17",
										"data-prohibitions": "[]",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:137:17",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/components/estoque/PackagesTab.tsx:140:13",
							"data-prohibitions": "[editContent]",
							children: [items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/estoque/PackagesTab.tsx:142:17",
								"data-prohibitions": "[editContent]",
								className: !item.is_active ? "opacity-60" : "",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:143:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: item.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:144:19",
										"data-prohibitions": "[editContent]",
										children: item.expand?.service_id?.name || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:145:19",
										"data-prohibitions": "[editContent]",
										children: item.quantity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:146:19",
										"data-prohibitions": "[editContent]",
										className: "capitalize",
										children: item.periodicity || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:147:19",
										"data-prohibitions": "[editContent]",
										children: ["R$ ", item.price?.toFixed(2)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:148:19",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/estoque/PackagesTab.tsx:149:21",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												"data-uid": "src/components/estoque/PackagesTab.tsx:150:23",
												"data-prohibitions": "[editContent]",
												checked: item.is_active,
												onCheckedChange: () => toggleActive(item.id, item.is_active)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/components/estoque/PackagesTab.tsx:154:23",
												"data-prohibitions": "[editContent]",
												variant: item.is_active ? "default" : "secondary",
												className: "text-[10px]",
												children: item.is_active ? "Ativo" : "Inativo"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:162:19",
										"data-prohibitions": "[]",
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/components/estoque/PackagesTab.tsx:163:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											onClick: () => handleOpen(item),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
												"data-uid": "src/components/estoque/PackagesTab.tsx:164:23",
												"data-prohibitions": "[editContent]",
												className: "size-4"
											})
										})
									})
								]
							}, item.id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/components/estoque/PackagesTab.tsx:170:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/estoque/PackagesTab.tsx:171:19",
									"data-prohibitions": "[]",
									colSpan: 7,
									className: "text-center py-6 text-muted-foreground",
									children: "Nenhum pacote encontrado."
								})
							})]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/components/estoque/PackagesTab.tsx:181:7",
				"data-prohibitions": "[editContent]",
				open: isOpen,
				onOpenChange: setIsOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/components/estoque/PackagesTab.tsx:182:9",
					"data-prohibitions": "[editContent]",
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/components/estoque/PackagesTab.tsx:183:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/components/estoque/PackagesTab.tsx:184:13",
								"data-prohibitions": "[editContent]",
								children: editingId ? "Editar Pacote" : "Novo Pacote"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/estoque/PackagesTab.tsx:186:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/estoque/PackagesTab.tsx:187:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:188:15",
										"data-prohibitions": "[]",
										children: "Nome do Pacote"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:189:15",
										"data-prohibitions": "[editContent]",
										value: form.name,
										onChange: (e) => setForm({
											...form,
											name: e.target.value
										}),
										placeholder: "Ex: Pacote 5 Cortes"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/estoque/PackagesTab.tsx:195:13",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/estoque/PackagesTab.tsx:196:15",
											"data-prohibitions": "[]",
											children: "Serviço Vinculado"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/components/estoque/PackagesTab.tsx:197:15",
											"data-prohibitions": "[editContent]",
											value: form.service_id,
											onValueChange: (v) => setForm({
												...form,
												service_id: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/components/estoque/PackagesTab.tsx:201:17",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/components/estoque/PackagesTab.tsx:202:19",
													"data-prohibitions": "[editContent]",
													placeholder: "Selecione um serviço"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
												"data-uid": "src/components/estoque/PackagesTab.tsx:204:17",
												"data-prohibitions": "[editContent]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/estoque/PackagesTab.tsx:205:19",
													"data-prohibitions": "[]",
													value: "none",
													children: "Nenhum"
												}), services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/estoque/PackagesTab.tsx:207:21",
													"data-prohibitions": "[editContent]",
													value: s.id,
													children: s.name
												}, s.id))]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/estoque/PackagesTab.tsx:213:15",
											"data-prohibitions": "[]",
											className: "text-[13px] text-muted-foreground mt-1",
											children: "Vincular um serviço permite que o sistema deduza automaticamente os usos deste pacote ao realizar o serviço correspondente no checkout."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/estoque/PackagesTab.tsx:218:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/estoque/PackagesTab.tsx:219:15",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/estoque/PackagesTab.tsx:220:17",
											"data-prohibitions": "[]",
											children: "Qtd. de Usos"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/estoque/PackagesTab.tsx:221:17",
											"data-prohibitions": "[editContent]",
											type: "number",
											value: form.quantity,
											onChange: (e) => setForm({
												...form,
												quantity: e.target.value
											}),
											placeholder: "5"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/estoque/PackagesTab.tsx:228:15",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/estoque/PackagesTab.tsx:229:17",
											"data-prohibitions": "[]",
											children: "Periodicidade"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/components/estoque/PackagesTab.tsx:230:17",
											"data-prohibitions": "[]",
											value: form.periodicity,
											onValueChange: (v) => setForm({
												...form,
												periodicity: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/components/estoque/PackagesTab.tsx:234:19",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/components/estoque/PackagesTab.tsx:235:21",
													"data-prohibitions": "[editContent]",
													placeholder: "Selecione"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
												"data-uid": "src/components/estoque/PackagesTab.tsx:237:19",
												"data-prohibitions": "[]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/estoque/PackagesTab.tsx:238:21",
													"data-prohibitions": "[]",
													value: "semanal",
													children: "Semanal"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/estoque/PackagesTab.tsx:239:21",
													"data-prohibitions": "[]",
													value: "quinzenal",
													children: "Quinzenal"
												})]
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/estoque/PackagesTab.tsx:244:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/estoque/PackagesTab.tsx:245:15",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/estoque/PackagesTab.tsx:246:17",
											"data-prohibitions": "[]",
											children: "Preço Total (R$)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/estoque/PackagesTab.tsx:247:17",
											"data-prohibitions": "[editContent]",
											type: "number",
											step: "0.01",
											value: form.price,
											onChange: (e) => setForm({
												...form,
												price: e.target.value
											}),
											placeholder: "150.00"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/estoque/PackagesTab.tsx:255:15",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/estoque/PackagesTab.tsx:256:17",
											"data-prohibitions": "[]",
											children: "Duração Padrão (min)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/estoque/PackagesTab.tsx:257:17",
											"data-prohibitions": "[editContent]",
											type: "number",
											value: form.duration_minutes,
											onChange: (e) => setForm({
												...form,
												duration_minutes: e.target.value
											}),
											placeholder: "30"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/estoque/PackagesTab.tsx:265:13",
									"data-prohibitions": "[]",
									className: "flex items-center space-x-2 mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:266:15",
										"data-prohibitions": "[editContent]",
										checked: form.is_active,
										onCheckedChange: (c) => setForm({
											...form,
											is_active: c
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/estoque/PackagesTab.tsx:270:15",
										"data-prohibitions": "[]",
										children: "Pacote Ativo"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							"data-uid": "src/components/estoque/PackagesTab.tsx:273:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/estoque/PackagesTab.tsx:274:13",
								"data-prohibitions": "[]",
								onClick: handleSave,
								className: "w-full sm:w-auto",
								children: "Salvar Pacote"
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/pages/Estoque.tsx
function Estoque() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Estoque.tsx:7:5",
		"data-prohibitions": "[]",
		className: "p-6 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			"data-uid": "src/pages/Estoque.tsx:8:7",
			"data-prohibitions": "[]",
			className: "text-3xl font-bold tracking-tight",
			children: "Catálogo de Serviços e Pacotes"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			"data-uid": "src/pages/Estoque.tsx:10:7",
			"data-prohibitions": "[]",
			defaultValue: "services",
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					"data-uid": "src/pages/Estoque.tsx:11:9",
					"data-prohibitions": "[]",
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/Estoque.tsx:12:11",
						"data-prohibitions": "[]",
						value: "services",
						children: "Serviços"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/Estoque.tsx:13:11",
						"data-prohibitions": "[]",
						value: "packages",
						children: "Pacotes"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Estoque.tsx:16:9",
					"data-prohibitions": "[]",
					value: "services",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesTab, {
						"data-uid": "src/pages/Estoque.tsx:17:11",
						"data-prohibitions": "[editContent]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Estoque.tsx:20:9",
					"data-prohibitions": "[]",
					value: "packages",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagesTab, {
						"data-uid": "src/pages/Estoque.tsx:21:11",
						"data-prohibitions": "[editContent]"
					})
				})
			]
		})]
	});
}
//#endregion
export { Estoque as default };

//# sourceMappingURL=Estoque-Bt-HZzAa.js.map