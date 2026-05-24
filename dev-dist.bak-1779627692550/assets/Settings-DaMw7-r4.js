import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { $ as Package, C as DialogTrigger, H as toast, L as Input, R as Button, S as DialogTitle, X as Truck, Y as Users, _ as Dialog, a as pb, c as SelectContent, f as SelectTrigger, p as SelectValue, s as Select, st as createLucideIcon, t as Label, u as SelectItem, v as DialogContent, x as DialogHeader } from "./index-BIx1wWQ0.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-EZcyP9t0.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DcQoPXwD.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CEKTZr8T.js";
import { t as Switch } from "./switch-BCWznPe1.js";
var Download = createLucideIcon("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]);
//#endregion
//#region src/services/settings.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var getCollection = async (collection, expand) => {
	return pb.collection(collection).getFullList({ expand });
};
var createRecord = async (collection, data) => {
	return pb.collection(collection).create(data);
};
var updateRecord = async (collection, id, data) => {
	return pb.collection(collection).update(id, data);
};
var deleteRecord = async (collection, id) => {
	return pb.collection(collection).delete(id);
};
//#endregion
//#region src/pages/settings/GeneralTab.tsx
var import_jsx_runtime = require_jsx_runtime();
function GeneralTab() {
	const [settings, setSettings] = (0, import_react.useState)([]);
	const [appName, setAppName] = (0, import_react.useState)("");
	const load = async () => {
		try {
			const data = await getCollection("settings");
			setSettings(data);
			const nameSetting = data.find((s) => s.key === "app_name");
			if (nameSetting) setAppName(nameSetting.value?.name || "");
		} catch (error) {
			toast.error("Erro ao carregar configurações");
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const handleSave = async () => {
		try {
			const nameSetting = settings.find((s) => s.key === "app_name");
			if (nameSetting) await updateRecord("settings", nameSetting.id, { value: { name: appName } });
			else await createRecord("settings", {
				key: "app_name",
				value: { name: appName }
			});
			toast.success("Configurações salvas com sucesso");
			load();
		} catch (error) {
			toast.error("Erro ao salvar configurações");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/settings/GeneralTab.tsx:44:5",
		"data-prohibitions": "[]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			"data-uid": "src/pages/settings/GeneralTab.tsx:45:7",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				"data-uid": "src/pages/settings/GeneralTab.tsx:46:9",
				"data-prohibitions": "[]",
				children: "Configurações Gerais"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			"data-uid": "src/pages/settings/GeneralTab.tsx:48:7",
			"data-prohibitions": "[]",
			className: "space-y-4 max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/settings/GeneralTab.tsx:49:9",
				"data-prohibitions": "[]",
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-uid": "src/pages/settings/GeneralTab.tsx:50:11",
					"data-prohibitions": "[]",
					children: "Nome da Barbearia"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/pages/settings/GeneralTab.tsx:51:11",
					"data-prohibitions": "[editContent]",
					value: appName,
					onChange: (e) => setAppName(e.target.value),
					placeholder: "Ex: La Barberiá"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/settings/GeneralTab.tsx:57:9",
				"data-prohibitions": "[]",
				onClick: handleSave,
				children: "Salvar Configurações"
			})]
		})]
	});
}
//#endregion
//#region src/pages/settings/BusinessHoursTab.tsx
var DAYS = [
	"Domingo",
	"Segunda",
	"Terça",
	"Quarta",
	"Quinta",
	"Sexta",
	"Sábado"
];
function BusinessHoursTab() {
	const [hours, setHours] = (0, import_react.useState)([]);
	const load = async () => {
		try {
			setHours(await getCollection("business_hours"));
		} catch (error) {
			toast.error("Erro ao carregar horários");
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const handleUpdate = async (id, data) => {
		try {
			if (id) await updateRecord("business_hours", id, data);
			else await createRecord("business_hours", data);
			toast.success("Horário atualizado");
			load();
		} catch (error) {
			toast.error("Erro ao atualizar horário");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/settings/BusinessHoursTab.tsx:50:5",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			"data-uid": "src/pages/settings/BusinessHoursTab.tsx:51:7",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				"data-uid": "src/pages/settings/BusinessHoursTab.tsx:52:9",
				"data-prohibitions": "[]",
				children: "Horário de Funcionamento"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/pages/settings/BusinessHoursTab.tsx:54:7",
			"data-prohibitions": "[editContent]",
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/pages/settings/BusinessHoursTab.tsx:55:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/pages/settings/BusinessHoursTab.tsx:56:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/pages/settings/BusinessHoursTab.tsx:57:13",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/BusinessHoursTab.tsx:58:15",
								"data-prohibitions": "[]",
								children: "Dia"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/BusinessHoursTab.tsx:59:15",
								"data-prohibitions": "[]",
								children: "Abertura"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/BusinessHoursTab.tsx:60:15",
								"data-prohibitions": "[]",
								children: "Fechamento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/BusinessHoursTab.tsx:61:15",
								"data-prohibitions": "[]",
								children: "Ativo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/BusinessHoursTab.tsx:62:15",
								"data-prohibitions": "[]",
								children: "Ações"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/pages/settings/BusinessHoursTab.tsx:65:11",
					"data-prohibitions": "[editContent]",
					children: DAYS.map((dayName, index) => {
						const h = hours.find((h) => String(h.day_of_week) === String(index)) || {
							day_of_week: String(index),
							open_time: "09:00",
							close_time: "18:00",
							is_active: false
						};
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/settings/BusinessHoursTab.tsx:74:17",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/settings/BusinessHoursTab.tsx:75:19",
									"data-prohibitions": "[editContent]",
									children: dayName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/settings/BusinessHoursTab.tsx:76:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/settings/BusinessHoursTab.tsx:77:21",
										"data-prohibitions": "[editContent]",
										type: "time",
										defaultValue: h.open_time,
										onBlur: (e) => {
											h.open_time = e.target.value;
										},
										className: "w-32"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/settings/BusinessHoursTab.tsx:86:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/settings/BusinessHoursTab.tsx:87:21",
										"data-prohibitions": "[editContent]",
										type: "time",
										defaultValue: h.close_time,
										onBlur: (e) => {
											h.close_time = e.target.value;
										},
										className: "w-32"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/settings/BusinessHoursTab.tsx:96:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										"data-uid": "src/pages/settings/BusinessHoursTab.tsx:97:21",
										"data-prohibitions": "[editContent]",
										checked: h.is_active,
										onCheckedChange: (c) => {
											h.is_active = c;
											handleUpdate(h.id, h);
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/settings/BusinessHoursTab.tsx:105:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/settings/BusinessHoursTab.tsx:106:21",
										"data-prohibitions": "[]",
										variant: "outline",
										size: "sm",
										onClick: () => handleUpdate(h.id, h),
										children: "Salvar"
									})
								})
							]
						}, index);
					})
				})]
			})
		})]
	});
}
//#endregion
//#region src/pages/settings/PermissionsTab.tsx
function PermissionsTab() {
	const [users, setUsers] = (0, import_react.useState)([]);
	const load = async () => {
		try {
			setUsers(await getCollection("users"));
		} catch (error) {
			toast.error("Erro ao carregar usuários");
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const handleRoleChange = async (userId, newRole) => {
		try {
			await updateRecord("users", userId, { access_level: newRole });
			toast.success("Nível de acesso atualizado com sucesso");
			load();
		} catch (error) {
			toast.error("Erro ao atualizar permissão");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/settings/PermissionsTab.tsx:48:5",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			"data-uid": "src/pages/settings/PermissionsTab.tsx:49:7",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				"data-uid": "src/pages/settings/PermissionsTab.tsx:50:9",
				"data-prohibitions": "[]",
				children: "Permissões de Usuário"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/pages/settings/PermissionsTab.tsx:52:7",
			"data-prohibitions": "[editContent]",
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/pages/settings/PermissionsTab.tsx:53:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/pages/settings/PermissionsTab.tsx:54:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/pages/settings/PermissionsTab.tsx:55:13",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/PermissionsTab.tsx:56:15",
								"data-prohibitions": "[]",
								children: "Nome"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/PermissionsTab.tsx:57:15",
								"data-prohibitions": "[]",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/PermissionsTab.tsx:58:15",
								"data-prohibitions": "[]",
								children: "Nível de Acesso"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/pages/settings/PermissionsTab.tsx:61:11",
					"data-prohibitions": "[editContent]",
					children: users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/pages/settings/PermissionsTab.tsx:63:15",
						"data-prohibitions": "[editContent]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/PermissionsTab.tsx:64:17",
								"data-prohibitions": "[editContent]",
								children: user.name || user.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/PermissionsTab.tsx:65:17",
								"data-prohibitions": "[editContent]",
								children: user.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/PermissionsTab.tsx:66:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/settings/PermissionsTab.tsx:67:19",
									"data-prohibitions": "[]",
									value: user.access_level || "Autonomo",
									onValueChange: (v) => handleRoleChange(user.id, v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/settings/PermissionsTab.tsx:71:21",
										"data-prohibitions": "[]",
										className: "w-40",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/settings/PermissionsTab.tsx:72:23",
											"data-prohibitions": "[editContent]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/settings/PermissionsTab.tsx:74:21",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/settings/PermissionsTab.tsx:75:23",
												"data-prohibitions": "[]",
												value: "Admin",
												children: "Administrador"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/settings/PermissionsTab.tsx:76:23",
												"data-prohibitions": "[]",
												value: "Socio",
												children: "Sócio"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/settings/PermissionsTab.tsx:77:23",
												"data-prohibitions": "[]",
												value: "Autonomo",
												children: "Autônomo"
											})
										]
									})]
								})
							})
						]
					}, user.id))
				})]
			})
		})]
	});
}
//#endregion
//#region src/pages/settings/CategoriesTab.tsx
function CategoriesTab() {
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		type: "service",
		commission_percentage: 0
	});
	const load = async () => {
		try {
			setCategories(await getCollection("categories"));
		} catch (error) {
			toast.error("Erro ao carregar categorias");
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (editingId) {
				await updateRecord("categories", editingId, formData);
				toast.success("Categoria atualizada com sucesso");
			} else {
				await createRecord("categories", formData);
				toast.success("Categoria criada com sucesso");
			}
			setIsOpen(false);
			load();
		} catch (error) {
			toast.error("Erro ao salvar categoria");
		}
	};
	const handleDelete = async (id) => {
		if (!confirm("Deseja realmente excluir esta categoria?")) return;
		try {
			await deleteRecord("categories", id);
			toast.success("Categoria excluída");
			load();
		} catch (error) {
			toast.error("Erro ao excluir categoria");
		}
	};
	const openEdit = (cat) => {
		setFormData({
			name: cat.name,
			type: cat.type,
			commission_percentage: cat.commission_percentage || 0
		});
		setEditingId(cat.id);
		setIsOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/settings/CategoriesTab.tsx:90:5",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/pages/settings/CategoriesTab.tsx:91:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-row items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				"data-uid": "src/pages/settings/CategoriesTab.tsx:92:9",
				"data-prohibitions": "[]",
				children: "Categorias"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				"data-uid": "src/pages/settings/CategoriesTab.tsx:93:9",
				"data-prohibitions": "[editContent]",
				open: isOpen,
				onOpenChange: setIsOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					"data-uid": "src/pages/settings/CategoriesTab.tsx:94:11",
					"data-prohibitions": "[]",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/settings/CategoriesTab.tsx:95:13",
						"data-prohibitions": "[]",
						onClick: () => {
							setFormData({
								name: "",
								type: "service",
								commission_percentage: 0
							});
							setEditingId(null);
						},
						children: "Nova Categoria"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/settings/CategoriesTab.tsx:104:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						"data-uid": "src/pages/settings/CategoriesTab.tsx:105:13",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/pages/settings/CategoriesTab.tsx:106:15",
							"data-prohibitions": "[editContent]",
							children: editingId ? "Editar Categoria" : "Nova Categoria"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						"data-uid": "src/pages/settings/CategoriesTab.tsx:108:13",
						"data-prohibitions": "[]",
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:109:15",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/settings/CategoriesTab.tsx:110:17",
									"data-prohibitions": "[]",
									children: "Nome da Categoria"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/settings/CategoriesTab.tsx:111:17",
									"data-prohibitions": "[editContent]",
									value: formData.name,
									onChange: (e) => setFormData({
										...formData,
										name: e.target.value
									}),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:117:15",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/settings/CategoriesTab.tsx:118:17",
									"data-prohibitions": "[]",
									children: "Tipo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/settings/CategoriesTab.tsx:119:17",
									"data-prohibitions": "[]",
									value: formData.type,
									onValueChange: (v) => setFormData({
										...formData,
										type: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/settings/CategoriesTab.tsx:123:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/settings/CategoriesTab.tsx:124:21",
											"data-prohibitions": "[editContent]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/settings/CategoriesTab.tsx:126:19",
										"data-prohibitions": "[]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/settings/CategoriesTab.tsx:127:21",
											"data-prohibitions": "[]",
											value: "service",
											children: "Serviço"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/settings/CategoriesTab.tsx:128:21",
											"data-prohibitions": "[]",
											value: "product",
											children: "Produto"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:132:15",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/settings/CategoriesTab.tsx:133:17",
									"data-prohibitions": "[]",
									children: "Comissão Padrão (%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/settings/CategoriesTab.tsx:134:17",
									"data-prohibitions": "[editContent]",
									type: "number",
									step: "0.1",
									value: formData.commission_percentage,
									onChange: (e) => setFormData({
										...formData,
										commission_percentage: Number(e.target.value)
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:143:15",
								"data-prohibitions": "[]",
								type: "submit",
								className: "w-full",
								children: "Salvar"
							})
						]
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/pages/settings/CategoriesTab.tsx:150:7",
			"data-prohibitions": "[editContent]",
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/pages/settings/CategoriesTab.tsx:151:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/pages/settings/CategoriesTab.tsx:152:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/pages/settings/CategoriesTab.tsx:153:13",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:154:15",
								"data-prohibitions": "[]",
								children: "Nome"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:155:15",
								"data-prohibitions": "[]",
								children: "Tipo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:156:15",
								"data-prohibitions": "[]",
								children: "Comissão"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:157:15",
								"data-prohibitions": "[]",
								children: "Ações"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/pages/settings/CategoriesTab.tsx:160:11",
					"data-prohibitions": "[editContent]",
					children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/pages/settings/CategoriesTab.tsx:162:15",
						"data-prohibitions": "[editContent]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:163:17",
								"data-prohibitions": "[editContent]",
								children: cat.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:164:17",
								"data-prohibitions": "[editContent]",
								children: cat.type === "service" ? "Serviço" : "Produto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:165:17",
								"data-prohibitions": "[editContent]",
								children: [cat.commission_percentage, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								"data-uid": "src/pages/settings/CategoriesTab.tsx:166:17",
								"data-prohibitions": "[]",
								className: "space-x-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/settings/CategoriesTab.tsx:167:19",
									"data-prohibitions": "[]",
									variant: "outline",
									size: "sm",
									onClick: () => openEdit(cat),
									children: "Editar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/settings/CategoriesTab.tsx:170:19",
									"data-prohibitions": "[]",
									variant: "destructive",
									size: "sm",
									onClick: () => handleDelete(cat.id),
									children: "Excluir"
								})]
							})
						]
					}, cat.id))
				})]
			})
		})]
	});
}
//#endregion
//#region src/pages/settings/FinancialRulesTab.tsx
function FinancialRulesTab() {
	const [rules, setRules] = (0, import_react.useState)([]);
	const [barbers, setBarbers] = (0, import_react.useState)([]);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		barber_id: "",
		item_type: "service",
		value: 0,
		type: "percentage"
	});
	const load = async () => {
		try {
			setRules(await getCollection("commission_rules", "barber_id"));
			setBarbers(await getCollection("barbers"));
		} catch (error) {
			toast.error("Erro ao carregar regras");
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createRecord("commission_rules", formData);
			toast.success("Regra criada com sucesso");
			setIsOpen(false);
			load();
		} catch (error) {
			toast.error("Erro ao salvar regra");
		}
	};
	const handleDelete = async (id) => {
		if (!confirm("Deseja realmente excluir esta regra?")) return;
		try {
			await deleteRecord("commission_rules", id);
			toast.success("Regra excluída");
			load();
		} catch (error) {
			toast.error("Erro ao excluir regra");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/settings/FinancialRulesTab.tsx:82:5",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/pages/settings/FinancialRulesTab.tsx:83:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-row items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				"data-uid": "src/pages/settings/FinancialRulesTab.tsx:84:9",
				"data-prohibitions": "[]",
				children: "Regras Financeiras (Comissões)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				"data-uid": "src/pages/settings/FinancialRulesTab.tsx:85:9",
				"data-prohibitions": "[editContent]",
				open: isOpen,
				onOpenChange: setIsOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					"data-uid": "src/pages/settings/FinancialRulesTab.tsx:86:11",
					"data-prohibitions": "[]",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/settings/FinancialRulesTab.tsx:87:13",
						"data-prohibitions": "[]",
						onClick: () => setFormData({
							barber_id: "",
							item_type: "service",
							value: 0,
							type: "percentage"
						}),
						children: "Nova Regra"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/settings/FinancialRulesTab.tsx:95:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						"data-uid": "src/pages/settings/FinancialRulesTab.tsx:96:13",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/pages/settings/FinancialRulesTab.tsx:97:15",
							"data-prohibitions": "[]",
							children: "Nova Regra de Comissão"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						"data-uid": "src/pages/settings/FinancialRulesTab.tsx:99:13",
						"data-prohibitions": "[editContent]",
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:100:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/settings/FinancialRulesTab.tsx:101:17",
									"data-prohibitions": "[]",
									children: "Profissional"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/settings/FinancialRulesTab.tsx:102:17",
									"data-prohibitions": "[editContent]",
									value: formData.barber_id,
									onValueChange: (v) => setFormData({
										...formData,
										barber_id: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/settings/FinancialRulesTab.tsx:106:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/settings/FinancialRulesTab.tsx:107:21",
											"data-prohibitions": "[editContent]",
											placeholder: "Geral (Todos)"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/settings/FinancialRulesTab.tsx:109:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/settings/FinancialRulesTab.tsx:110:21",
											"data-prohibitions": "[]",
											value: "general",
											children: "Geral (Todos os profissionais)"
										}), barbers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/settings/FinancialRulesTab.tsx:112:23",
											"data-prohibitions": "[editContent]",
											value: b.id,
											children: b.name
										}, b.id))]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:119:15",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/settings/FinancialRulesTab.tsx:120:17",
									"data-prohibitions": "[]",
									children: "Aplicável A"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/settings/FinancialRulesTab.tsx:121:17",
									"data-prohibitions": "[]",
									value: formData.item_type,
									onValueChange: (v) => setFormData({
										...formData,
										item_type: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/settings/FinancialRulesTab.tsx:125:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/settings/FinancialRulesTab.tsx:126:21",
											"data-prohibitions": "[editContent]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/settings/FinancialRulesTab.tsx:128:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/settings/FinancialRulesTab.tsx:129:21",
												"data-prohibitions": "[]",
												value: "service",
												children: "Serviços"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/settings/FinancialRulesTab.tsx:130:21",
												"data-prohibitions": "[]",
												value: "product",
												children: "Produtos"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/settings/FinancialRulesTab.tsx:131:21",
												"data-prohibitions": "[]",
												value: "category",
												children: "Categorias"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/settings/FinancialRulesTab.tsx:132:21",
												"data-prohibitions": "[]",
												value: "package",
												children: "Pacotes"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:136:15",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/settings/FinancialRulesTab.tsx:137:17",
									"data-prohibitions": "[]",
									children: "Tipo de Comissão"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/settings/FinancialRulesTab.tsx:138:17",
									"data-prohibitions": "[]",
									value: formData.type,
									onValueChange: (v) => setFormData({
										...formData,
										type: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/settings/FinancialRulesTab.tsx:142:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/settings/FinancialRulesTab.tsx:143:21",
											"data-prohibitions": "[editContent]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/settings/FinancialRulesTab.tsx:145:19",
										"data-prohibitions": "[]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/settings/FinancialRulesTab.tsx:146:21",
											"data-prohibitions": "[]",
											value: "percentage",
											children: "Porcentagem (%)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/settings/FinancialRulesTab.tsx:147:21",
											"data-prohibitions": "[]",
											value: "fixed",
											children: "Valor Fixo (R$)"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:151:15",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/settings/FinancialRulesTab.tsx:152:17",
									"data-prohibitions": "[]",
									children: "Valor da Comissão"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/settings/FinancialRulesTab.tsx:153:17",
									"data-prohibitions": "[editContent]",
									type: "number",
									step: "0.01",
									value: formData.value,
									onChange: (e) => setFormData({
										...formData,
										value: Number(e.target.value)
									}),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:161:15",
								"data-prohibitions": "[]",
								type: "submit",
								className: "w-full",
								children: "Adicionar Regra"
							})
						]
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/pages/settings/FinancialRulesTab.tsx:168:7",
			"data-prohibitions": "[editContent]",
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/pages/settings/FinancialRulesTab.tsx:169:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/pages/settings/FinancialRulesTab.tsx:170:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/pages/settings/FinancialRulesTab.tsx:171:13",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:172:15",
								"data-prohibitions": "[]",
								children: "Profissional"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:173:15",
								"data-prohibitions": "[]",
								children: "Aplicado A"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:174:15",
								"data-prohibitions": "[]",
								children: "Tipo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:175:15",
								"data-prohibitions": "[]",
								children: "Valor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:176:15",
								"data-prohibitions": "[]",
								children: "Ações"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/pages/settings/FinancialRulesTab.tsx:179:11",
					"data-prohibitions": "[editContent]",
					children: rules.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/pages/settings/FinancialRulesTab.tsx:181:15",
						"data-prohibitions": "[editContent]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:182:17",
								"data-prohibitions": "[editContent]",
								children: rule.expand?.barber_id?.name || "Geral"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:183:17",
								"data-prohibitions": "[editContent]",
								className: "capitalize",
								children: rule.item_type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:184:17",
								"data-prohibitions": "[editContent]",
								children: rule.type === "percentage" ? "%" : "R$"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:185:17",
								"data-prohibitions": "[editContent]",
								children: rule.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/FinancialRulesTab.tsx:186:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/settings/FinancialRulesTab.tsx:187:19",
									"data-prohibitions": "[]",
									variant: "destructive",
									size: "sm",
									onClick: () => handleDelete(rule.id),
									children: "Excluir"
								})
							})
						]
					}, rule.id))
				})]
			})
		})]
	});
}
//#endregion
//#region src/pages/settings/NotificationsTab.tsx
function NotificationsTab() {
	const [rules, setRules] = (0, import_react.useState)([]);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		event_type: "",
		is_active: true,
		timing_offset: 0,
		timing_unit: "hours_minutes"
	});
	const load = async () => {
		try {
			setRules(await getCollection("notification_rules"));
		} catch (error) {
			toast.error("Erro ao carregar notificações");
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (editingId) await updateRecord("notification_rules", editingId, formData);
			else await createRecord("notification_rules", formData);
			toast.success("Notificação salva");
			setIsOpen(false);
			load();
		} catch (error) {
			toast.error("Erro ao salvar notificação");
		}
	};
	const handleDelete = async (id) => {
		if (!confirm("Deseja realmente excluir esta notificação?")) return;
		try {
			await deleteRecord("notification_rules", id);
			toast.success("Notificação excluída");
			load();
		} catch (error) {
			toast.error("Erro ao excluir");
		}
	};
	const openEdit = (rule) => {
		setFormData({
			event_type: rule.event_type,
			is_active: rule.is_active,
			timing_offset: rule.timing_offset || 0,
			timing_unit: rule.timing_unit || "hours_minutes"
		});
		setEditingId(rule.id);
		setIsOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/settings/NotificationsTab.tsx:96:5",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/pages/settings/NotificationsTab.tsx:97:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-row items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				"data-uid": "src/pages/settings/NotificationsTab.tsx:98:9",
				"data-prohibitions": "[]",
				children: "Regras de Notificação"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				"data-uid": "src/pages/settings/NotificationsTab.tsx:99:9",
				"data-prohibitions": "[editContent]",
				open: isOpen,
				onOpenChange: setIsOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					"data-uid": "src/pages/settings/NotificationsTab.tsx:100:11",
					"data-prohibitions": "[]",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/settings/NotificationsTab.tsx:101:13",
						"data-prohibitions": "[]",
						onClick: () => {
							setFormData({
								event_type: "",
								is_active: true,
								timing_offset: 0,
								timing_unit: "hours_minutes"
							});
							setEditingId(null);
						},
						children: "Nova Regra"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/settings/NotificationsTab.tsx:115:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						"data-uid": "src/pages/settings/NotificationsTab.tsx:116:13",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/pages/settings/NotificationsTab.tsx:117:15",
							"data-prohibitions": "[editContent]",
							children: editingId ? "Editar Regra" : "Nova Regra"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						"data-uid": "src/pages/settings/NotificationsTab.tsx:119:13",
						"data-prohibitions": "[]",
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:120:15",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/settings/NotificationsTab.tsx:121:17",
									"data-prohibitions": "[]",
									children: "Evento (ex: Lembrete de Agendamento)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/settings/NotificationsTab.tsx:122:17",
									"data-prohibitions": "[editContent]",
									value: formData.event_type,
									onChange: (e) => setFormData({
										...formData,
										event_type: e.target.value
									}),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:128:15",
								"data-prohibitions": "[]",
								className: "flex items-center space-x-2 my-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									"data-uid": "src/pages/settings/NotificationsTab.tsx:129:17",
									"data-prohibitions": "[editContent]",
									checked: formData.is_active,
									onCheckedChange: (c) => setFormData({
										...formData,
										is_active: c
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/settings/NotificationsTab.tsx:133:17",
									"data-prohibitions": "[]",
									children: "Notificação Ativa"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:135:15",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/settings/NotificationsTab.tsx:136:17",
									"data-prohibitions": "[]",
									children: "Tempo Antes do Evento"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/settings/NotificationsTab.tsx:137:17",
									"data-prohibitions": "[editContent]",
									type: "number",
									value: formData.timing_offset,
									onChange: (e) => setFormData({
										...formData,
										timing_offset: Number(e.target.value)
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:145:15",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/settings/NotificationsTab.tsx:146:17",
									"data-prohibitions": "[]",
									children: "Unidade de Tempo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/settings/NotificationsTab.tsx:147:17",
									"data-prohibitions": "[]",
									value: formData.timing_unit,
									onValueChange: (v) => setFormData({
										...formData,
										timing_unit: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/settings/NotificationsTab.tsx:151:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/settings/NotificationsTab.tsx:152:21",
											"data-prohibitions": "[editContent]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/settings/NotificationsTab.tsx:154:19",
										"data-prohibitions": "[]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/settings/NotificationsTab.tsx:155:21",
											"data-prohibitions": "[]",
											value: "hours_minutes",
											children: "Horas/Minutos"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/settings/NotificationsTab.tsx:156:21",
											"data-prohibitions": "[]",
											value: "days",
											children: "Dias"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:160:15",
								"data-prohibitions": "[]",
								type: "submit",
								className: "w-full",
								children: "Salvar"
							})
						]
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/pages/settings/NotificationsTab.tsx:167:7",
			"data-prohibitions": "[editContent]",
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/pages/settings/NotificationsTab.tsx:168:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/pages/settings/NotificationsTab.tsx:169:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/pages/settings/NotificationsTab.tsx:170:13",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:171:15",
								"data-prohibitions": "[]",
								children: "Evento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:172:15",
								"data-prohibitions": "[]",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:173:15",
								"data-prohibitions": "[]",
								children: "Antecedência"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:174:15",
								"data-prohibitions": "[]",
								children: "Ações"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/pages/settings/NotificationsTab.tsx:177:11",
					"data-prohibitions": "[editContent]",
					children: rules.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/pages/settings/NotificationsTab.tsx:179:15",
						"data-prohibitions": "[editContent]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:180:17",
								"data-prohibitions": "[editContent]",
								children: rule.event_type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:181:17",
								"data-prohibitions": "[editContent]",
								children: rule.is_active ? "Ativo" : "Inativo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:182:17",
								"data-prohibitions": "[editContent]",
								children: [
									rule.timing_offset,
									" ",
									rule.timing_unit === "days" ? "dias" : "h/m"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								"data-uid": "src/pages/settings/NotificationsTab.tsx:185:17",
								"data-prohibitions": "[]",
								className: "space-x-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/settings/NotificationsTab.tsx:186:19",
									"data-prohibitions": "[]",
									variant: "outline",
									size: "sm",
									onClick: () => openEdit(rule),
									children: "Editar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/settings/NotificationsTab.tsx:189:19",
									"data-prohibitions": "[]",
									variant: "destructive",
									size: "sm",
									onClick: () => handleDelete(rule.id),
									children: "Excluir"
								})]
							})
						]
					}, rule.id))
				})]
			})
		})]
	});
}
//#endregion
//#region src/pages/settings/TemplatesTab.tsx
function TemplatesTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/settings/TemplatesTab.tsx:7:5",
		"data-prohibitions": "[]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/pages/settings/TemplatesTab.tsx:8:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				"data-uid": "src/pages/settings/TemplatesTab.tsx:9:9",
				"data-prohibitions": "[]",
				children: "Modelos de Importação"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
				"data-uid": "src/pages/settings/TemplatesTab.tsx:10:9",
				"data-prohibitions": "[]",
				children: "Baixe nossos modelos do Google Sheets para facilitar a importação de dados em massa na sua barbearia."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			"data-uid": "src/pages/settings/TemplatesTab.tsx:15:7",
			"data-prohibitions": "[]",
			className: "grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/settings/TemplatesTab.tsx:16:9",
					"data-prohibitions": "[]",
					className: "flex flex-col h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/settings/TemplatesTab.tsx:17:11",
						"data-prohibitions": "[]",
						className: "pb-2 flex-grow-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							"data-uid": "src/pages/settings/TemplatesTab.tsx:18:13",
							"data-prohibitions": "[]",
							className: "text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
								"data-uid": "src/pages/settings/TemplatesTab.tsx:19:15",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5"
							}), " Clientes"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/settings/TemplatesTab.tsx:22:11",
						"data-prohibitions": "[]",
						className: "space-y-4 flex flex-col flex-grow justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/settings/TemplatesTab.tsx:23:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground",
							children: "Colunas obrigatórias: Nome, Sobrenome, Telefone, Email, Data de Nascimento."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/settings/TemplatesTab.tsx:26:13",
							"data-prohibitions": "[]",
							className: "w-full mt-auto",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								"data-uid": "src/pages/settings/TemplatesTab.tsx:27:15",
								"data-prohibitions": "[]",
								href: "https://docs.google.com/spreadsheets/d/1_CLIENTS_TEMPLATE/edit",
								target: "_blank",
								rel: "noopener noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
									"data-uid": "src/pages/settings/TemplatesTab.tsx:32:17",
									"data-prohibitions": "[editContent]",
									className: "mr-2 h-4 w-4"
								}), " Importar Clientes"]
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/settings/TemplatesTab.tsx:38:9",
					"data-prohibitions": "[]",
					className: "flex flex-col h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/settings/TemplatesTab.tsx:39:11",
						"data-prohibitions": "[]",
						className: "pb-2 flex-grow-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							"data-uid": "src/pages/settings/TemplatesTab.tsx:40:13",
							"data-prohibitions": "[]",
							className: "text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
								"data-uid": "src/pages/settings/TemplatesTab.tsx:41:15",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5"
							}), " Produtos"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/settings/TemplatesTab.tsx:44:11",
						"data-prohibitions": "[]",
						className: "space-y-4 flex flex-col flex-grow justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/settings/TemplatesTab.tsx:45:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground",
							children: "Colunas obrigatórias: Nome, Preço, Categoria, Quantidade em Estoque."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/settings/TemplatesTab.tsx:48:13",
							"data-prohibitions": "[]",
							className: "w-full mt-auto",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								"data-uid": "src/pages/settings/TemplatesTab.tsx:49:15",
								"data-prohibitions": "[]",
								href: "https://docs.google.com/spreadsheets/d/1_PRODUCTS_TEMPLATE/edit",
								target: "_blank",
								rel: "noopener noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
									"data-uid": "src/pages/settings/TemplatesTab.tsx:54:17",
									"data-prohibitions": "[editContent]",
									className: "mr-2 h-4 w-4"
								}), " Importar Produtos"]
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/settings/TemplatesTab.tsx:60:9",
					"data-prohibitions": "[]",
					className: "flex flex-col h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/settings/TemplatesTab.tsx:61:11",
						"data-prohibitions": "[]",
						className: "pb-2 flex-grow-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							"data-uid": "src/pages/settings/TemplatesTab.tsx:62:13",
							"data-prohibitions": "[]",
							className: "text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
								"data-uid": "src/pages/settings/TemplatesTab.tsx:63:15",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5"
							}), " Fornecedores"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/settings/TemplatesTab.tsx:66:11",
						"data-prohibitions": "[]",
						className: "space-y-4 flex flex-col flex-grow justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/settings/TemplatesTab.tsx:67:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground",
							children: "Colunas obrigatórias: Nome, Documento (CNPJ/CPF), Telefone, Pessoa de Contato."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/settings/TemplatesTab.tsx:70:13",
							"data-prohibitions": "[]",
							className: "w-full mt-auto",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								"data-uid": "src/pages/settings/TemplatesTab.tsx:71:15",
								"data-prohibitions": "[]",
								href: "https://docs.google.com/spreadsheets/d/1_SUPPLIERS_TEMPLATE/edit",
								target: "_blank",
								rel: "noopener noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
									"data-uid": "src/pages/settings/TemplatesTab.tsx:76:17",
									"data-prohibitions": "[editContent]",
									className: "mr-2 h-4 w-4"
								}), " Importar Fornecedores"]
							})
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/pages/Settings.tsx
function Settings() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Settings.tsx:12:5",
		"data-prohibitions": "[editContent]",
		className: "flex-1 space-y-4 p-4 md:p-8 pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/Settings.tsx:13:7",
			"data-prohibitions": "[]",
			className: "flex items-center justify-between space-y-2 mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/pages/Settings.tsx:14:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight",
				children: "Configurações"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			"data-uid": "src/pages/Settings.tsx:17:7",
			"data-prohibitions": "[editContent]",
			defaultValue: "geral",
			className: "space-y-6 w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Settings.tsx:19:9",
					"data-prohibitions": "[]",
					className: "w-full overflow-x-auto pb-2 -mb-2 scrollbar-hide",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/Settings.tsx:20:11",
						"data-prohibitions": "[]",
						className: "flex w-max min-w-full justify-start h-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/Settings.tsx:21:13",
								"data-prohibitions": "[]",
								className: "px-4",
								value: "geral",
								children: "Geral"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/Settings.tsx:24:13",
								"data-prohibitions": "[]",
								className: "px-4",
								value: "horario",
								children: "Horário"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/Settings.tsx:27:13",
								"data-prohibitions": "[]",
								className: "px-4",
								value: "permissoes",
								children: "Permissões"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/Settings.tsx:30:13",
								"data-prohibitions": "[]",
								className: "px-4",
								value: "categorias",
								children: "Categorias"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/Settings.tsx:33:13",
								"data-prohibitions": "[]",
								className: "px-4",
								value: "regras",
								children: "Regras Financeiras"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/Settings.tsx:36:13",
								"data-prohibitions": "[]",
								className: "px-4",
								value: "notificacoes",
								children: "Notificações"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/Settings.tsx:39:13",
								"data-prohibitions": "[]",
								className: "px-4",
								value: "modelos",
								children: "Modelos"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Settings.tsx:45:9",
					"data-prohibitions": "[]",
					value: "geral",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GeneralTab, {
						"data-uid": "src/pages/Settings.tsx:46:11",
						"data-prohibitions": "[editContent]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Settings.tsx:48:9",
					"data-prohibitions": "[]",
					value: "horario",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessHoursTab, {
						"data-uid": "src/pages/Settings.tsx:49:11",
						"data-prohibitions": "[editContent]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Settings.tsx:51:9",
					"data-prohibitions": "[]",
					value: "permissoes",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionsTab, {
						"data-uid": "src/pages/Settings.tsx:52:11",
						"data-prohibitions": "[editContent]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Settings.tsx:54:9",
					"data-prohibitions": "[]",
					value: "categorias",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesTab, {
						"data-uid": "src/pages/Settings.tsx:55:11",
						"data-prohibitions": "[editContent]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Settings.tsx:57:9",
					"data-prohibitions": "[]",
					value: "regras",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialRulesTab, {
						"data-uid": "src/pages/Settings.tsx:58:11",
						"data-prohibitions": "[editContent]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Settings.tsx:60:9",
					"data-prohibitions": "[]",
					value: "notificacoes",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsTab, {
						"data-uid": "src/pages/Settings.tsx:61:11",
						"data-prohibitions": "[editContent]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/Settings.tsx:63:9",
					"data-prohibitions": "[]",
					value: "modelos",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplatesTab, {
						"data-uid": "src/pages/Settings.tsx:64:11",
						"data-prohibitions": "[editContent]"
					})
				})
			]
		})]
	});
}
//#endregion
export { Settings as default };

//# sourceMappingURL=Settings-DaMw7-r4.js.map