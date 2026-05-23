import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { t as Plus } from "./plus-qmKontFq.js";
import { t as SquarePen } from "./square-pen-C_qeuHud.js";
import { t as Trash2 } from "./trash-2-DoKYmUmJ.js";
import { H as Input, S as DialogTitle, U as Button, _ as Dialog, a as pb, b as DialogFooter, c as SelectContent, f as SelectTrigger, i as useAuth, n as useRealtime, p as SelectValue, r as usePermissions, s as Select, t as Label, u as SelectItem, v as DialogContent, wt as useToast, x as DialogHeader } from "./index-C5u061c7.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-ahfq9tsI.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-Ltl_F7lh.js";
import { t as Switch } from "./switch-Cs2DXH8S.js";
//#region src/pages/Financeiro.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Financeiro() {
	const { user } = useAuth();
	const { toast } = useToast();
	const [methods, setMethods] = (0, import_react.useState)([]);
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		type: "other",
		fee_percentage: 0,
		is_active: true
	});
	const loadMethods = async () => {
		try {
			setMethods(await pb.collection("payment_methods").getFullList({ sort: "name" }));
		} catch (e) {
			console.error(e);
		}
	};
	const { hasAccess, isAdmin } = usePermissions();
	const canAccess = isAdmin || hasAccess("financeiro");
	(0, import_react.useEffect)(() => {
		if (canAccess) loadMethods();
	}, [user, canAccess]);
	useRealtime("payment_methods", () => {
		if (canAccess) loadMethods();
	}, canAccess);
	if (!canAccess) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Financeiro.tsx:70:12",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-muted-foreground",
		children: "Acesso Restrito."
	});
	const handleOpen = (m) => {
		if (m) {
			setForm({
				name: m.name,
				type: m.type,
				fee_percentage: m.fee_percentage || 0,
				is_active: m.is_active
			});
			setEditingId(m.id);
		} else {
			setForm({
				name: "",
				type: "other",
				fee_percentage: 0,
				is_active: true
			});
			setEditingId(null);
		}
		setIsModalOpen(true);
	};
	const handleSave = async () => {
		try {
			const payload = {
				name: form.name,
				type: form.type,
				fee_percentage: Number(form.fee_percentage),
				is_active: form.is_active
			};
			if (editingId) {
				await pb.collection("payment_methods").update(editingId, payload);
				toast({ title: "Método atualizado!" });
			} else {
				await pb.collection("payment_methods").create(payload);
				toast({ title: "Método criado!" });
			}
			setIsModalOpen(false);
			loadMethods();
		} catch (err) {
			toast({
				title: "Erro ao salvar",
				variant: "destructive"
			});
		}
	};
	const handleDelete = async (id) => {
		if (confirm("Remover este método de pagamento?")) try {
			await pb.collection("payment_methods").delete(id);
			toast({ title: "Removido" });
			loadMethods();
		} catch (e) {
			toast({
				title: "Erro ao remover",
				variant: "destructive"
			});
		}
	};
	const handleToggleActive = async (id, active) => {
		try {
			await pb.collection("payment_methods").update(id, { is_active: active });
			loadMethods();
		} catch (e) {
			toast({
				title: "Erro ao atualizar",
				variant: "destructive"
			});
		}
	};
	const typeLabels = {
		credit_card: "Cartão de Crédito",
		debit_card: "Cartão de Débito",
		pix: "Pix",
		cash: "Dinheiro",
		other: "Outro"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Financeiro.tsx:141:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Financeiro.tsx:142:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/Financeiro.tsx:143:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight",
					children: "Financeiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Financeiro.tsx:144:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Gerencie métodos de pagamento, taxas de cartão e Pix."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/Financeiro.tsx:149:7",
				"data-prohibitions": "[editContent]",
				className: "border-border shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/Financeiro.tsx:150:9",
					"data-prohibitions": "[]",
					className: "flex flex-row items-center justify-between pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Financeiro.tsx:151:11",
						"data-prohibitions": "[]",
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/Financeiro.tsx:152:13",
							"data-prohibitions": "[]",
							children: "Métodos de Pagamento e Taxas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							"data-uid": "src/pages/Financeiro.tsx:153:13",
							"data-prohibitions": "[]",
							children: "Configure as taxas cobradas por cada método para dedução de comissões e repasses."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Financeiro.tsx:157:11",
						"data-prohibitions": "[]",
						onClick: () => handleOpen(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-uid": "src/pages/Financeiro.tsx:158:13",
							"data-prohibitions": "[editContent]",
							className: "size-4 mr-2"
						}), " Novo Método"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/Financeiro.tsx:161:9",
					"data-prohibitions": "[editContent]",
					className: "p-0 md:p-6 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/Financeiro.tsx:162:11",
						"data-prohibitions": "[editContent]",
						className: "min-w-[600px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/Financeiro.tsx:163:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Financeiro.tsx:164:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Financeiro.tsx:165:17",
										"data-prohibitions": "[]",
										children: "Nome"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Financeiro.tsx:166:17",
										"data-prohibitions": "[]",
										children: "Tipo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Financeiro.tsx:167:17",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Taxa (%)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Financeiro.tsx:168:17",
										"data-prohibitions": "[]",
										className: "text-center",
										children: "Ativo no Checkout"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Financeiro.tsx:169:17",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/pages/Financeiro.tsx:172:13",
							"data-prohibitions": "[editContent]",
							children: [methods.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Financeiro.tsx:174:17",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Financeiro.tsx:175:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: m.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Financeiro.tsx:176:19",
										"data-prohibitions": "[editContent]",
										children: typeLabels[m.type] || m.type
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										"data-uid": "src/pages/Financeiro.tsx:177:19",
										"data-prohibitions": "[editContent]",
										className: "text-right",
										children: [m.fee_percentage, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Financeiro.tsx:178:19",
										"data-prohibitions": "[]",
										className: "text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											"data-uid": "src/pages/Financeiro.tsx:179:21",
											"data-prohibitions": "[editContent]",
											checked: m.is_active,
											onCheckedChange: (c) => handleToggleActive(m.id, c)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
										"data-uid": "src/pages/Financeiro.tsx:184:19",
										"data-prohibitions": "[]",
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/Financeiro.tsx:185:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											onClick: () => handleOpen(m),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
												"data-uid": "src/pages/Financeiro.tsx:186:23",
												"data-prohibitions": "[editContent]",
												className: "size-4"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/Financeiro.tsx:188:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											className: "text-destructive hover:bg-destructive/10",
											onClick: () => handleDelete(m.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												"data-uid": "src/pages/Financeiro.tsx:194:23",
												"data-prohibitions": "[editContent]",
												className: "size-4"
											})
										})]
									})
								]
							}, m.id)), methods.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/Financeiro.tsx:200:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/Financeiro.tsx:201:19",
									"data-prohibitions": "[]",
									colSpan: 5,
									className: "text-center py-6 text-muted-foreground",
									children: "Nenhum método cadastrado."
								})
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Financeiro.tsx:211:7",
				"data-prohibitions": "[editContent]",
				open: isModalOpen,
				onOpenChange: setIsModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Financeiro.tsx:212:9",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/Financeiro.tsx:213:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/Financeiro.tsx:214:13",
								"data-prohibitions": "[editContent]",
								children: editingId ? "Editar Método" : "Novo Método"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Financeiro.tsx:216:11",
							"data-prohibitions": "[]",
							className: "space-y-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Financeiro.tsx:217:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Financeiro.tsx:218:15",
										"data-prohibitions": "[]",
										children: "Nome do Método"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Financeiro.tsx:219:15",
										"data-prohibitions": "[editContent]",
										className: "min-h-[44px]",
										value: form.name,
										onChange: (e) => setForm({
											...form,
											name: e.target.value
										}),
										placeholder: "Ex: Cartão de Crédito - Visa"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Financeiro.tsx:226:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Financeiro.tsx:227:15",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Financeiro.tsx:228:17",
											"data-prohibitions": "[]",
											children: "Tipo"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/Financeiro.tsx:229:17",
											"data-prohibitions": "[]",
											value: form.type,
											onValueChange: (v) => setForm({
												...form,
												type: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/Financeiro.tsx:230:19",
												"data-prohibitions": "[]",
												className: "min-h-[44px]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/Financeiro.tsx:231:21",
													"data-prohibitions": "[editContent]"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
												"data-uid": "src/pages/Financeiro.tsx:233:19",
												"data-prohibitions": "[]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Financeiro.tsx:234:21",
														"data-prohibitions": "[]",
														value: "credit_card",
														children: "Cartão de Crédito"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Financeiro.tsx:235:21",
														"data-prohibitions": "[]",
														value: "debit_card",
														children: "Cartão de Débito"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Financeiro.tsx:236:21",
														"data-prohibitions": "[]",
														value: "pix",
														children: "Pix"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Financeiro.tsx:237:21",
														"data-prohibitions": "[]",
														value: "cash",
														children: "Dinheiro"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/Financeiro.tsx:238:21",
														"data-prohibitions": "[]",
														value: "other",
														children: "Outro"
													})
												]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Financeiro.tsx:242:15",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Financeiro.tsx:243:17",
											"data-prohibitions": "[]",
											children: "Taxa / Fee (%)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/Financeiro.tsx:244:17",
											"data-prohibitions": "[editContent]",
											type: "number",
											className: "min-h-[44px]",
											min: "0",
											step: "0.01",
											value: form.fee_percentage,
											onChange: (e) => setForm({
												...form,
												fee_percentage: Number(e.target.value)
											}),
											placeholder: "0.00"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Financeiro.tsx:255:13",
									"data-prohibitions": "[]",
									className: "flex items-center space-x-2 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										"data-uid": "src/pages/Financeiro.tsx:256:15",
										"data-prohibitions": "[editContent]",
										checked: form.is_active,
										onCheckedChange: (c) => setForm({
											...form,
											is_active: c
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Financeiro.tsx:260:15",
										"data-prohibitions": "[]",
										children: "Ativo no Checkout"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							"data-uid": "src/pages/Financeiro.tsx:263:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Financeiro.tsx:264:13",
								"data-prohibitions": "[]",
								onClick: handleSave,
								className: "w-full sm:w-auto",
								children: "Salvar Método"
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Financeiro as default };

//# sourceMappingURL=Financeiro-C5s5F3M0.js.map