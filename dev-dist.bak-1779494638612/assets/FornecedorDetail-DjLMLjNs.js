import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { t as ArrowLeft } from "./arrow-left-BoFEkOz1.js";
import { t as Calendar } from "./calendar-0Z8pjn2X.js";
import { Ct as useParams, H as Input, S as DialogTitle, U as Button, _ as Dialog, a as pb, at as Check, b as DialogFooter, bt as Link, c as SelectContent, ct as createLucideIcon, f as SelectTrigger, n as useRealtime, p as SelectValue, s as Select, t as Label, u as SelectItem, v as DialogContent, x as DialogHeader, yt as useToast } from "./index-BGBBwOnB.js";
import { t as format } from "./format-BWFAnkIi.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BwjqyGS_.js";
var ShoppingCart = createLucideIcon("shopping-cart", [
	["circle", {
		cx: "8",
		cy: "21",
		r: "1",
		key: "jimo8o"
	}],
	["circle", {
		cx: "19",
		cy: "21",
		r: "1",
		key: "13723u"
	}],
	["path", {
		d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
		key: "9zh506"
	}]
]);
//#endregion
//#region src/pages/FornecedorDetail.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function FornecedorDetail() {
	const { id } = useParams();
	const [supplier, setSupplier] = (0, import_react.useState)(null);
	const [purchases, setPurchases] = (0, import_react.useState)([]);
	const [products, setProducts] = (0, import_react.useState)([]);
	const [purchaseDialogOpen, setPurchaseDialogOpen] = (0, import_react.useState)(false);
	const [purchaseForm, setPurchaseForm] = (0, import_react.useState)({
		product_id: "",
		quantity: "1",
		unit_price: "",
		price_paid: "",
		purchase_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		status: "pending"
	});
	const [fieldErrors, setFieldErrors] = (0, import_react.useState)({});
	const [lastPurchase, setLastPurchase] = (0, import_react.useState)(null);
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		if (purchaseForm.product_id) pb.collection("inventory_purchases").getFirstListItem(`product_id="${purchaseForm.product_id}"`, {
			sort: "-purchase_date",
			expand: "supplier_id"
		}).then((res) => setLastPurchase(res)).catch(() => setLastPurchase(null));
		else setLastPurchase(null);
	}, [purchaseForm.product_id]);
	const handleQuantityChange = (val) => {
		setPurchaseForm((prev) => {
			const unitPrice = Number(prev.unit_price) || 0;
			const qty = Number(val) || 0;
			return {
				...prev,
				quantity: val,
				price_paid: qty > 0 && unitPrice > 0 ? (qty * unitPrice).toFixed(2) : prev.price_paid
			};
		});
	};
	const handleUnitPriceChange = (val) => {
		setPurchaseForm((prev) => {
			const qty = Number(prev.quantity) || 0;
			const unitPrice = Number(val) || 0;
			return {
				...prev,
				unit_price: val,
				price_paid: qty > 0 && unitPrice > 0 ? (qty * unitPrice).toFixed(2) : prev.price_paid
			};
		});
	};
	const loadData = async () => {
		if (!id) return;
		try {
			setSupplier(await pb.collection("suppliers").getOne(id, { expand: "category_id" }));
			setPurchases(await pb.collection("inventory_purchases").getFullList({
				filter: `supplier_id="${id}"`,
				sort: "-purchase_date",
				expand: "product_id"
			}));
			setProducts(await pb.collection("products").getFullList());
		} catch (e) {
			console.error(e);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, [id]);
	useRealtime("suppliers", loadData);
	useRealtime("inventory_purchases", loadData);
	const handleSavePurchase = async () => {
		const errors = {};
		if (!purchaseForm.product_id) errors.product_id = "Selecione um produto";
		if (!purchaseForm.price_paid) errors.price_paid = "Informe o total da compra";
		if (!purchaseForm.purchase_date) errors.purchase_date = "Informe a data";
		if (Object.keys(errors).length > 0) {
			setFieldErrors(errors);
			toast({
				title: "Verifique os campos obrigatórios",
				variant: "destructive"
			});
			return;
		}
		setFieldErrors({});
		try {
			let dateIso = (/* @__PURE__ */ new Date()).toISOString();
			if (purchaseForm.purchase_date) {
				const d = new Date(purchaseForm.purchase_date);
				if (!isNaN(d.getTime())) dateIso = (/* @__PURE__ */ new Date(purchaseForm.purchase_date + "T12:00:00.000Z")).toISOString();
			}
			await pb.collection("inventory_purchases").create({
				supplier_id: id,
				product_id: purchaseForm.product_id,
				quantity: Number(purchaseForm.quantity) || 1,
				unit_price: Number(purchaseForm.unit_price) || 0,
				price_paid: Number(purchaseForm.price_paid) || 0,
				purchase_date: dateIso,
				status: purchaseForm.status,
				received_at: purchaseForm.status === "received" ? (/* @__PURE__ */ new Date()).toISOString() : null
			});
			toast({ title: "Compra registrada com sucesso" });
			setPurchaseDialogOpen(false);
			setPurchaseForm({
				...purchaseForm,
				price_paid: "",
				unit_price: "",
				product_id: "",
				quantity: "1",
				status: "pending"
			});
			loadData();
		} catch (e) {
			toast({
				title: "Erro ao registrar",
				description: e.message,
				variant: "destructive"
			});
		}
	};
	const handleConfirmReceipt = async (purchaseId) => {
		try {
			await pb.collection("inventory_purchases").update(purchaseId, {
				status: "received",
				received_at: (/* @__PURE__ */ new Date()).toISOString()
			});
			toast({ title: "Recebimento confirmado com sucesso" });
			loadData();
		} catch (e) {
			toast({
				title: "Erro ao confirmar",
				description: e.message,
				variant: "destructive"
			});
		}
	};
	if (!supplier) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/FornecedorDetail.tsx:170:25",
		"data-prohibitions": "[]",
		className: "p-8",
		children: "Carregando..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/FornecedorDetail.tsx:173:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 max-w-5xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/FornecedorDetail.tsx:174:7",
				"data-prohibitions": "[editContent]",
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/FornecedorDetail.tsx:175:9",
					"data-prohibitions": "[]",
					variant: "outline",
					size: "icon",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-uid": "src/pages/FornecedorDetail.tsx:176:11",
						"data-prohibitions": "[]",
						to: "/fornecedores",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							"data-uid": "src/pages/FornecedorDetail.tsx:177:13",
							"data-prohibitions": "[editContent]",
							className: "size-4"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/FornecedorDetail.tsx:180:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/FornecedorDetail.tsx:181:11",
						"data-prohibitions": "[editContent]",
						className: "text-2xl font-bold tracking-tight",
						children: supplier.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/FornecedorDetail.tsx:182:11",
						"data-prohibitions": "[editContent]",
						className: "text-muted-foreground text-sm",
						children: [
							supplier.document && `Documento: ${supplier.document} | `,
							"Contato: ",
							supplier.contact_person || "N/A",
							" ",
							supplier.whatsapp && `(${supplier.whatsapp})`
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/FornecedorDetail.tsx:190:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/FornecedorDetail.tsx:191:9",
					"data-prohibitions": "[editContent]",
					className: "md:col-span-1 h-min",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/FornecedorDetail.tsx:192:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/FornecedorDetail.tsx:193:13",
							"data-prohibitions": "[]",
							children: "Detalhes do Fornecedor"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/FornecedorDetail.tsx:195:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/FornecedorDetail.tsx:196:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/FornecedorDetail.tsx:197:15",
									"data-prohibitions": "[]",
									className: "text-sm font-semibold",
									children: "Endereço"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/FornecedorDetail.tsx:198:15",
									"data-prohibitions": "[editContent]",
									className: "text-sm text-muted-foreground",
									children: supplier.address || "Não informado"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/FornecedorDetail.tsx:200:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/FornecedorDetail.tsx:201:15",
									"data-prohibitions": "[]",
									className: "text-sm font-semibold",
									children: "Telefone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/FornecedorDetail.tsx:202:15",
									"data-prohibitions": "[editContent]",
									className: "text-sm text-muted-foreground",
									children: supplier.phone || "Não informado"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/FornecedorDetail.tsx:204:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/FornecedorDetail.tsx:205:15",
									"data-prohibitions": "[]",
									className: "text-sm font-semibold",
									children: "Categorias Fornecidas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/FornecedorDetail.tsx:206:15",
									"data-prohibitions": "[editContent]",
									className: "flex flex-wrap gap-1 mt-1",
									children: [supplier.expand?.category_id?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/FornecedorDetail.tsx:208:19",
										"data-prohibitions": "[editContent]",
										className: "text-xs bg-secondary px-2 py-1 rounded-full",
										children: c.name
									}, c.id)), !supplier.expand?.category_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/FornecedorDetail.tsx:213:19",
										"data-prohibitions": "[]",
										className: "text-sm text-muted-foreground",
										children: "Nenhuma categoria"
									})]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/FornecedorDetail.tsx:220:9",
					"data-prohibitions": "[editContent]",
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/FornecedorDetail.tsx:221:11",
						"data-prohibitions": "[]",
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/FornecedorDetail.tsx:222:13",
							"data-prohibitions": "[]",
							children: "Histórico de Compras"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/FornecedorDetail.tsx:223:13",
							"data-prohibitions": "[]",
							size: "sm",
							onClick: () => setPurchaseDialogOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
								"data-uid": "src/pages/FornecedorDetail.tsx:224:15",
								"data-prohibitions": "[editContent]",
								className: "size-4 mr-2"
							}), " Registrar Compra"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/FornecedorDetail.tsx:227:11",
						"data-prohibitions": "[editContent]",
						children: purchases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/FornecedorDetail.tsx:229:15",
							"data-prohibitions": "[]",
							className: "text-muted-foreground py-4 text-center",
							children: "Nenhuma compra registrada com este fornecedor."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/FornecedorDetail.tsx:233:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-3 mt-4 max-h-[500px] overflow-y-auto pr-2",
							children: purchases.map((purch) => {
								const status = purch.status || "pending";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/FornecedorDetail.tsx:237:21",
									"data-prohibitions": "[editContent]",
									className: "flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-muted/10 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/FornecedorDetail.tsx:241:23",
										"data-prohibitions": "[editContent]",
										className: "flex items-start sm:items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/FornecedorDetail.tsx:242:25",
											"data-prohibitions": "[]",
											className: "bg-primary/10 p-2 rounded-full mt-1 sm:mt-0 shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
												"data-uid": "src/pages/FornecedorDetail.tsx:243:27",
												"data-prohibitions": "[editContent]",
												className: "size-4 text-primary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/FornecedorDetail.tsx:245:25",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/FornecedorDetail.tsx:246:27",
													"data-prohibitions": "[editContent]",
													className: "flex flex-wrap items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														"data-uid": "src/pages/FornecedorDetail.tsx:247:29",
														"data-prohibitions": "[editContent]",
														className: "font-semibold text-sm",
														children: purch.expand?.product_id?.name || "Produto Excluído"
													}), status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/FornecedorDetail.tsx:251:31",
														"data-prohibitions": "[]",
														className: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] font-medium px-2 py-0.5 rounded-full",
														children: "Pendente"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/FornecedorDetail.tsx:255:31",
														"data-prohibitions": "[]",
														className: "bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-medium px-2 py-0.5 rounded-full",
														children: "Recebido"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/FornecedorDetail.tsx:260:27",
													"data-prohibitions": "[editContent]",
													className: "text-xs text-muted-foreground mt-1",
													children: [
														"Data: ",
														format(new Date(purch.purchase_date), "dd/MM/yyyy"),
														" | Qtd:",
														" ",
														purch.quantity
													]
												}),
												status === "received" && purch.received_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/FornecedorDetail.tsx:265:29",
													"data-prohibitions": "[editContent]",
													className: "text-xs text-muted-foreground mt-0.5",
													children: ["Recebido em: ", format(new Date(purch.received_at), "dd/MM/yyyy HH:mm")]
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/FornecedorDetail.tsx:271:23",
										"data-prohibitions": "[editContent]",
										className: "flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0 border-t sm:border-t-0 pt-2 sm:pt-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/FornecedorDetail.tsx:272:25",
											"data-prohibitions": "[editContent]",
											className: "text-left sm:text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												"data-uid": "src/pages/FornecedorDetail.tsx:273:27",
												"data-prohibitions": "[editContent]",
												className: "font-bold text-sm",
												children: ["R$ ", purch.price_paid?.toFixed(2)]
											}), purch.unit_price && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												"data-uid": "src/pages/FornecedorDetail.tsx:275:29",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground",
												children: ["Unit: R$ ", purch.unit_price.toFixed(2)]
											})]
										}), status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/FornecedorDetail.tsx:281:27",
											"data-prohibitions": "[]",
											size: "sm",
											variant: "secondary",
											onClick: () => handleConfirmReceipt(purch.id),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												"data-uid": "src/pages/FornecedorDetail.tsx:286:29",
												"data-prohibitions": "[editContent]",
												className: "size-4 mr-1"
											}), "Confirmar"]
										})]
									})]
								}, purch.id);
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/FornecedorDetail.tsx:300:7",
				"data-prohibitions": "[editContent]",
				open: purchaseDialogOpen,
				onOpenChange: setPurchaseDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/FornecedorDetail.tsx:301:9",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/FornecedorDetail.tsx:302:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/FornecedorDetail.tsx:303:13",
								"data-prohibitions": "[]",
								children: "Registrar Nova Compra"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/FornecedorDetail.tsx:305:11",
							"data-prohibitions": "[editContent]",
							className: "grid gap-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/FornecedorDetail.tsx:306:13",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/FornecedorDetail.tsx:307:15",
											"data-prohibitions": "[]",
											children: "Produto *"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/FornecedorDetail.tsx:308:15",
											"data-prohibitions": "[editContent]",
											value: purchaseForm.product_id,
											onValueChange: (v) => {
												setPurchaseForm({
													...purchaseForm,
													product_id: v
												});
												setFieldErrors((prev) => ({
													...prev,
													product_id: ""
												}));
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/FornecedorDetail.tsx:315:17",
												"data-prohibitions": "[editContent]",
												className: fieldErrors.product_id ? "border-red-500" : "",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/FornecedorDetail.tsx:316:19",
													"data-prohibitions": "[editContent]",
													placeholder: "Selecione o produto..."
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/FornecedorDetail.tsx:318:17",
												"data-prohibitions": "[editContent]",
												children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/FornecedorDetail.tsx:320:21",
													"data-prohibitions": "[editContent]",
													value: p.id,
													children: p.name
												}, p.id))
											})]
										}),
										fieldErrors.product_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/FornecedorDetail.tsx:327:17",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-red-500",
											children: fieldErrors.product_id
										})
									]
								}),
								lastPurchase && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/FornecedorDetail.tsx:331:15",
									"data-prohibitions": "[editContent]",
									className: "bg-muted/50 p-3 rounded-md text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/FornecedorDetail.tsx:332:17",
											"data-prohibitions": "[]",
											className: "font-semibold text-muted-foreground mb-1",
											children: "Última Compra do Produto:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/FornecedorDetail.tsx:335:17",
											"data-prohibitions": "[editContent]",
											children: ["Fornecedor: ", lastPurchase.expand?.supplier_id?.name || "Desconhecido"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/FornecedorDetail.tsx:336:17",
											"data-prohibitions": "[editContent]",
											children: [
												"Preço Unitário: R$",
												" ",
												lastPurchase.unit_price ? lastPurchase.unit_price.toFixed(2) : (lastPurchase.price_paid / lastPurchase.quantity).toFixed(2)
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/FornecedorDetail.tsx:342:17",
											"data-prohibitions": "[editContent]",
											children: ["Data: ", format(new Date(lastPurchase.purchase_date), "dd/MM/yyyy")]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/FornecedorDetail.tsx:345:13",
									"data-prohibitions": "[editContent]",
									className: "grid grid-cols-2 md:grid-cols-3 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/FornecedorDetail.tsx:346:15",
											"data-prohibitions": "[]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/FornecedorDetail.tsx:347:17",
												"data-prohibitions": "[]",
												children: "Qtd"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/FornecedorDetail.tsx:348:17",
												"data-prohibitions": "[editContent]",
												type: "number",
												value: purchaseForm.quantity,
												onChange: (e) => handleQuantityChange(e.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/FornecedorDetail.tsx:354:15",
											"data-prohibitions": "[]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/FornecedorDetail.tsx:355:17",
												"data-prohibitions": "[]",
												children: "Preço Unit."
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/FornecedorDetail.tsx:356:17",
												"data-prohibitions": "[editContent]",
												type: "number",
												step: "0.01",
												value: purchaseForm.unit_price,
												onChange: (e) => handleUnitPriceChange(e.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/FornecedorDetail.tsx:363:15",
											"data-prohibitions": "[editContent]",
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													"data-uid": "src/pages/FornecedorDetail.tsx:364:17",
													"data-prohibitions": "[]",
													children: "Total Compra *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/FornecedorDetail.tsx:365:17",
													"data-prohibitions": "[editContent]",
													type: "number",
													step: "0.01",
													className: fieldErrors.price_paid ? "border-red-500" : "",
													value: purchaseForm.price_paid,
													onChange: (e) => {
														setPurchaseForm({
															...purchaseForm,
															price_paid: e.target.value
														});
														setFieldErrors((prev) => ({
															...prev,
															price_paid: ""
														}));
													}
												}),
												fieldErrors.price_paid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/FornecedorDetail.tsx:376:19",
													"data-prohibitions": "[editContent]",
													className: "text-xs text-red-500",
													children: fieldErrors.price_paid
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/FornecedorDetail.tsx:379:15",
											"data-prohibitions": "[editContent]",
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													"data-uid": "src/pages/FornecedorDetail.tsx:380:17",
													"data-prohibitions": "[]",
													children: "Data *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/FornecedorDetail.tsx:381:17",
													"data-prohibitions": "[editContent]",
													type: "date",
													className: fieldErrors.purchase_date ? "border-red-500" : "",
													value: purchaseForm.purchase_date,
													onChange: (e) => {
														setPurchaseForm({
															...purchaseForm,
															purchase_date: e.target.value
														});
														setFieldErrors((prev) => ({
															...prev,
															purchase_date: ""
														}));
													}
												}),
												fieldErrors.purchase_date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/FornecedorDetail.tsx:391:19",
													"data-prohibitions": "[editContent]",
													className: "text-xs text-red-500",
													children: fieldErrors.purchase_date
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/FornecedorDetail.tsx:394:15",
											"data-prohibitions": "[]",
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												"data-uid": "src/pages/FornecedorDetail.tsx:395:17",
												"data-prohibitions": "[]",
												children: "Status *"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/FornecedorDetail.tsx:396:17",
												"data-prohibitions": "[]",
												value: purchaseForm.status,
												onValueChange: (v) => setPurchaseForm({
													...purchaseForm,
													status: v
												}),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/FornecedorDetail.tsx:400:19",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/FornecedorDetail.tsx:401:21",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/FornecedorDetail.tsx:403:19",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/FornecedorDetail.tsx:404:21",
														"data-prohibitions": "[]",
														value: "pending",
														children: "Pendente"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/FornecedorDetail.tsx:405:21",
														"data-prohibitions": "[]",
														value: "received",
														children: "Recebido"
													})]
												})]
											})]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/FornecedorDetail.tsx:411:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/FornecedorDetail.tsx:412:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => {
									setPurchaseDialogOpen(false);
									setFieldErrors({});
								},
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/FornecedorDetail.tsx:421:13",
								"data-prohibitions": "[]",
								onClick: handleSavePurchase,
								children: "Salvar Compra"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { FornecedorDetail as default };

//# sourceMappingURL=FornecedorDetail-DjLMLjNs.js.map