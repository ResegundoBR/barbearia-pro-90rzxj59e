import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { t as Clock } from "./clock-D8KXcWHl.js";
import { t as Plus } from "./plus-W8yM_fkd.js";
import { H as Input, S as DialogTitle, U as Button, _ as Dialog, a as pb, b as DialogFooter, bt as Link, ct as createLucideIcon, n as useRealtime, t as Label, v as DialogContent, x as DialogHeader, yt as useToast } from "./index-BGBBwOnB.js";
import { t as extractFieldErrors } from "./errors-BhrJgJzy.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-qy8VJYSD.js";
import { t as Badge } from "./badge-ChMj_r5M.js";
import { t as Checkbox } from "./checkbox-CzYx_bOQ.js";
import { t as createCategory } from "./categories-By7N79ep.js";
var Building2 = createLucideIcon("building-2", [
	["path", {
		d: "M10 12h4",
		key: "a56b0p"
	}],
	["path", {
		d: "M10 8h4",
		key: "1sr2af"
	}],
	["path", {
		d: "M14 21v-3a2 2 0 0 0-4 0v3",
		key: "1rgiei"
	}],
	["path", {
		d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
		key: "secmi2"
	}],
	["path", {
		d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",
		key: "16ra0t"
	}]
]);
var ExternalLink = createLucideIcon("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]);
//#endregion
//#region src/services/inventory_purchases.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var getInventoryPurchases = () => pb.collection("inventory_purchases").getFullList({
	sort: "-created",
	expand: "product_id,supplier_id"
});
//#endregion
//#region src/pages/Fornecedores.tsx
var import_jsx_runtime = require_jsx_runtime();
var applyCpfCnpjMask = (value) => {
	const digits = value.replace(/\D/g, "");
	if (digits.length <= 11) return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};
function Fornecedores() {
	const [suppliers, setSuppliers] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [purchases, setPurchases] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [newCatName, setNewCatName] = (0, import_react.useState)("");
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		document: "",
		address: "",
		phone: "",
		whatsapp: "",
		contact_person: "",
		category_id: []
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const { toast } = useToast();
	const loadData = async () => {
		try {
			const [supData, catData, purData] = await Promise.all([
				pb.collection("suppliers").getFullList({
					sort: "name",
					expand: "category_id"
				}),
				pb.collection("categories").getFullList({ filter: "type=\"product\"" }),
				getInventoryPurchases()
			]);
			setSuppliers(supData);
			setCategories(catData);
			setPurchases(purData);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	useRealtime("suppliers", loadData);
	useRealtime("categories", loadData);
	useRealtime("inventory_purchases", loadData);
	const handleSave = async () => {
		setErrors({});
		try {
			const cleanDocument = formData.document.replace(/\D/g, "");
			await pb.collection("suppliers").create({
				...formData,
				document: cleanDocument
			});
			toast({ title: "Fornecedor cadastrado" });
			setDialogOpen(false);
		} catch (err) {
			const fieldErrs = extractFieldErrors(err);
			if (Object.keys(fieldErrs).length > 0) setErrors(fieldErrs);
			else toast({
				title: "Erro",
				description: err.message,
				variant: "destructive"
			});
		}
	};
	const handleAddCategory = async () => {
		if (!newCatName.trim()) return;
		try {
			const cat = await createCategory({
				name: newCatName.trim(),
				type: "product"
			});
			setCategories([...categories, cat]);
			setFormData({
				...formData,
				category_id: [...formData.category_id, cat.id]
			});
			setNewCatName("");
		} catch (err) {
			toast({
				title: "Erro ao criar categoria",
				variant: "destructive"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Fornecedores.tsx:117:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-6xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Fornecedores.tsx:118:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/Fornecedores.tsx:119:9",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold tracking-tight",
					children: "Compras/Fornec."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Fornecedores.tsx:120:9",
					"data-prohibitions": "[]",
					onClick: () => {
						setFormData({
							name: "",
							document: "",
							address: "",
							phone: "",
							whatsapp: "",
							contact_person: "",
							category_id: []
						});
						setErrors({});
						setDialogOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/Fornecedores.tsx:135:11",
						"data-prohibitions": "[editContent]",
						className: "size-4 mr-2"
					}), "Novo Fornecedor"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Fornecedores.tsx:140:7",
				"data-prohibitions": "[editContent]",
				className: "border rounded-md bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/Fornecedores.tsx:141:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/Fornecedores.tsx:142:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/Fornecedores.tsx:143:13",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Fornecedores.tsx:144:15",
									"data-prohibitions": "[]",
									children: "Nome / Razão Social"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Fornecedores.tsx:145:15",
									"data-prohibitions": "[]",
									children: "CNPJ/CPF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Fornecedores.tsx:146:15",
									"data-prohibitions": "[]",
									children: "Contato"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Fornecedores.tsx:147:15",
									"data-prohibitions": "[]",
									children: "Categorias"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/Fornecedores.tsx:148:15",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Ações"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/pages/Fornecedores.tsx:151:11",
						"data-prohibitions": "[editContent]",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/pages/Fornecedores.tsx:153:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/Fornecedores.tsx:154:17",
								"data-prohibitions": "[]",
								colSpan: 5,
								className: "text-center py-6",
								children: "Carregando..."
							})
						}) : suppliers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/pages/Fornecedores.tsx:159:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/Fornecedores.tsx:160:17",
								"data-prohibitions": "[]",
								colSpan: 5,
								className: "text-center py-6",
								children: "Nenhum fornecedor cadastrado."
							})
						}) : suppliers.map((sup) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/Fornecedores.tsx:166:17",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/Fornecedores.tsx:167:19",
									"data-prohibitions": "[editContent]",
									className: "font-medium",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Fornecedores.tsx:168:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
												"data-uid": "src/pages/Fornecedores.tsx:169:23",
												"data-prohibitions": "[editContent]",
												className: "size-4 text-muted-foreground"
											}),
											sup.name,
											purchases.some((p) => p.supplier_id === sup.id && p.status === "pending") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/Fornecedores.tsx:174:25",
												"data-prohibitions": "[]",
												variant: "secondary",
												className: "bg-amber-500 text-white hover:bg-amber-600 border-0 ml-2 shadow-sm font-semibold tracking-wide",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
													"data-uid": "src/pages/Fornecedores.tsx:178:27",
													"data-prohibitions": "[editContent]",
													className: "w-3 h-3 mr-1"
												}), "Compra Pendente"]
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/Fornecedores.tsx:184:19",
									"data-prohibitions": "[editContent]",
									children: applyCpfCnpjMask(sup.document)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/pages/Fornecedores.tsx:185:19",
									"data-prohibitions": "[editContent]",
									children: [
										sup.contact_person,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {
											"data-uid": "src/pages/Fornecedores.tsx:187:21",
											"data-prohibitions": "[editContent]"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Fornecedores.tsx:188:21",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground",
											children: sup.whatsapp || sup.phone
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/Fornecedores.tsx:192:19",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/Fornecedores.tsx:193:21",
										"data-prohibitions": "[editContent]",
										className: "flex flex-wrap gap-1",
										children: sup.expand?.category_id?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Fornecedores.tsx:195:25",
											"data-prohibitions": "[editContent]",
											className: "text-[10px] bg-secondary px-1.5 py-0.5 rounded-full",
											children: c.name
										}, c.id))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/Fornecedores.tsx:204:19",
									"data-prohibitions": "[]",
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/Fornecedores.tsx:205:21",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											"data-uid": "src/pages/Fornecedores.tsx:206:23",
											"data-prohibitions": "[]",
											to: `/fornecedores/${sup.id}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
												"data-uid": "src/pages/Fornecedores.tsx:207:25",
												"data-prohibitions": "[editContent]",
												className: "size-4"
											})
										})
									})
								})
							]
						}, sup.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/Fornecedores.tsx:218:7",
				"data-prohibitions": "[editContent]",
				open: dialogOpen,
				onOpenChange: setDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/Fornecedores.tsx:219:9",
					"data-prohibitions": "[editContent]",
					className: "max-w-lg max-h-[90vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/Fornecedores.tsx:220:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/Fornecedores.tsx:221:13",
								"data-prohibitions": "[]",
								children: "Novo Fornecedor"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Fornecedores.tsx:223:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Fornecedores.tsx:224:13",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Fornecedores.tsx:225:15",
											"data-prohibitions": "[]",
											children: "Nome / Razão Social *"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/Fornecedores.tsx:226:15",
											"data-prohibitions": "[editContent]",
											value: formData.name,
											onChange: (e) => setFormData({
												...formData,
												name: e.target.value
											})
										}),
										errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Fornecedores.tsx:230:31",
											"data-prohibitions": "[editContent]",
											className: "text-sm text-destructive",
											children: errors.name
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Fornecedores.tsx:232:13",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Fornecedores.tsx:233:15",
											"data-prohibitions": "[]",
											children: "CPF / CNPJ *"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/Fornecedores.tsx:234:15",
											"data-prohibitions": "[editContent]",
											value: applyCpfCnpjMask(formData.document),
											onChange: (e) => setFormData({
												...formData,
												document: e.target.value
											}),
											maxLength: 18
										}),
										errors.document && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/Fornecedores.tsx:239:35",
											"data-prohibitions": "[editContent]",
											className: "text-sm text-destructive",
											children: errors.document
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Fornecedores.tsx:241:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/Fornecedores.tsx:242:15",
										"data-prohibitions": "[]",
										children: "Endereço"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/Fornecedores.tsx:243:15",
										"data-prohibitions": "[editContent]",
										value: formData.address,
										onChange: (e) => setFormData({
											...formData,
											address: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Fornecedores.tsx:248:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Fornecedores.tsx:249:15",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Fornecedores.tsx:250:17",
											"data-prohibitions": "[]",
											children: "Pessoa de Contato"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/Fornecedores.tsx:251:17",
											"data-prohibitions": "[editContent]",
											value: formData.contact_person,
											onChange: (e) => setFormData({
												...formData,
												contact_person: e.target.value
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Fornecedores.tsx:256:15",
										"data-prohibitions": "[]",
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Fornecedores.tsx:257:17",
											"data-prohibitions": "[]",
											children: "WhatsApp / Fone"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/Fornecedores.tsx:258:17",
											"data-prohibitions": "[editContent]",
											value: formData.whatsapp,
											onChange: (e) => setFormData({
												...formData,
												whatsapp: e.target.value
											})
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Fornecedores.tsx:264:13",
									"data-prohibitions": "[editContent]",
									className: "space-y-2 pt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/Fornecedores.tsx:265:15",
											"data-prohibitions": "[]",
											children: "Tipos de Produtos Fornecidos"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/Fornecedores.tsx:266:15",
											"data-prohibitions": "[editContent]",
											className: "flex flex-wrap gap-3 border p-3 rounded-md mb-2 max-h-[150px] overflow-y-auto",
											children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												"data-uid": "src/pages/Fornecedores.tsx:268:19",
												"data-prohibitions": "[editContent]",
												className: "flex items-center space-x-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													"data-uid": "src/pages/Fornecedores.tsx:269:21",
													"data-prohibitions": "[editContent]",
													checked: formData.category_id.includes(cat.id),
													onCheckedChange: (c) => {
														if (c) setFormData({
															...formData,
															category_id: [...formData.category_id, cat.id]
														});
														else setFormData({
															...formData,
															category_id: formData.category_id.filter((id) => id !== cat.id)
														});
													}
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Fornecedores.tsx:284:21",
													"data-prohibitions": "[editContent]",
													className: "text-sm",
													children: cat.name
												})]
											}, cat.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/Fornecedores.tsx:288:15",
											"data-prohibitions": "[]",
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/Fornecedores.tsx:289:17",
												"data-prohibitions": "[editContent]",
												placeholder: "Nova categoria...",
												value: newCatName,
												onChange: (e) => setNewCatName(e.target.value),
												className: "h-8 text-sm"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/pages/Fornecedores.tsx:295:17",
												"data-prohibitions": "[]",
												type: "button",
												size: "sm",
												variant: "secondary",
												onClick: handleAddCategory,
												children: "Adicionar"
											})]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/Fornecedores.tsx:301:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Fornecedores.tsx:302:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setDialogOpen(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Fornecedores.tsx:305:13",
								"data-prohibitions": "[]",
								onClick: handleSave,
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
export { Fornecedores as default };

//# sourceMappingURL=Fornecedores-LaPE2lzD.js.map