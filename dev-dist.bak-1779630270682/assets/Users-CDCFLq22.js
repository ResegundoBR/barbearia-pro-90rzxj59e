import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { t as KeyRound } from "./key-round-DwQ-rzev.js";
import { H as createLucideIcon, b as Button, k as toast, n as useAuth, r as pb, y as Input } from "./index-C74PCxaV.js";
import { a as DialogFooter, c as DialogTrigger, n as Dialog, o as DialogHeader, r as DialogContent, s as DialogTitle } from "./dist-CecpbnDQ.js";
import { t as Label } from "./label-CIroGxRH.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-DDztjzQI.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-ByP266p_.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BcUqtVPX.js";
import { t as Switch } from "./switch-aoErGqe-.js";
var ShieldAlert = createLucideIcon("shield-alert", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M12 8v4",
		key: "1got3b"
	}],
	["path", {
		d: "M12 16h.01",
		key: "1drbdi"
	}]
]);
//#endregion
//#region src/components/PermissionsModal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var MODULES = [
	{
		id: "agenda",
		label: "Agenda"
	},
	{
		id: "financeiro",
		label: "Financeiro"
	},
	{
		id: "clientes",
		label: "Clientes"
	},
	{
		id: "estoque",
		label: "Estoque"
	},
	{
		id: "produtos",
		label: "Produtos e Serviços"
	},
	{
		id: "fornecedores",
		label: "Fornecedores"
	},
	{
		id: "staff",
		label: "Equipe / Staff"
	},
	{
		id: "checkout",
		label: "Checkout"
	},
	{
		id: "settings",
		label: "Configurações"
	},
	{
		id: "users",
		label: "Usuários"
	}
];
function PermissionsModal() {
	const { user } = useAuth();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [role, setRole] = (0, import_react.useState)("Socio");
	const [permissions, setPermissions] = (0, import_react.useState)({});
	const loadPerms = async () => {
		try {
			const records = await pb.collection("role_permissions").getFullList();
			const map = {};
			records.forEach((r) => {
				map[`${r.role}_${r.module_name}`] = r;
			});
			setPermissions(map);
		} catch {}
	};
	(0, import_react.useEffect)(() => {
		if (open) loadPerms();
	}, [open]);
	const togglePermission = async (module, currentVal) => {
		const key = `${role}_${module}`;
		const existing = permissions[key];
		try {
			if (existing) {
				const updated = await pb.collection("role_permissions").update(existing.id, { is_enabled: !currentVal });
				setPermissions((prev) => ({
					...prev,
					[key]: updated
				}));
			} else {
				const created = await pb.collection("role_permissions").create({
					role,
					module_name: module,
					is_enabled: true,
					organization_id: user?.organization_id
				});
				setPermissions((prev) => ({
					...prev,
					[key]: created
				}));
			}
			toast.success("Permissão atualizada");
		} catch (err) {
			toast.error("Erro ao salvar permissão");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		"data-uid": "src/components/PermissionsModal.tsx:78:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			"data-uid": "src/components/PermissionsModal.tsx:79:7",
			"data-prohibitions": "[]",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/PermissionsModal.tsx:80:9",
				"data-prohibitions": "[]",
				variant: "default",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
					"data-uid": "src/components/PermissionsModal.tsx:81:11",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 mr-2"
				}), "Configurar Permissões"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/PermissionsModal.tsx:85:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				"data-uid": "src/components/PermissionsModal.tsx:86:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/PermissionsModal.tsx:87:11",
					"data-prohibitions": "[]",
					children: "Acessos por Nível"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/components/PermissionsModal.tsx:89:9",
				"data-prohibitions": "[editContent]",
				value: role,
				onValueChange: setRole,
				className: "mt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					"data-uid": "src/components/PermissionsModal.tsx:90:11",
					"data-prohibitions": "[]",
					className: "grid w-full grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/components/PermissionsModal.tsx:91:13",
						"data-prohibitions": "[]",
						value: "Socio",
						children: "Sócio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/components/PermissionsModal.tsx:92:13",
						"data-prohibitions": "[]",
						value: "Autonomo",
						children: "Autônomo"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/PermissionsModal.tsx:94:11",
					"data-prohibitions": "[editContent]",
					className: "mt-6 grid gap-4",
					children: MODULES.map((m) => {
						const isEnabled = permissions[`${role}_${m.id}`]?.is_enabled ?? false;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PermissionsModal.tsx:98:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between border-b pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PermissionsModal.tsx:99:19",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-sm text-gray-700",
								children: m.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								"data-uid": "src/components/PermissionsModal.tsx:100:19",
								"data-prohibitions": "[editContent]",
								checked: isEnabled,
								onCheckedChange: () => togglePermission(m.id, isEnabled)
							})]
						}, m.id);
					})
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/ResetPasswordModal.tsx
function ResetPasswordModal({ targetUser }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleReset = async () => {
		if (password.length < 8) return toast.error("A senha deve ter no mínimo 8 caracteres");
		setLoading(true);
		try {
			await pb.send(`/backend/v1/users/${targetUser.id}/reset-password`, {
				method: "POST",
				body: JSON.stringify({ password })
			});
			toast.success(`Senha de ${targetUser.name || "usuário"} alterada!`);
			setOpen(false);
			setPassword("");
		} catch (err) {
			toast.error(err.message || "Erro ao redefinir senha");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		"data-uid": "src/components/ResetPasswordModal.tsx:41:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			"data-uid": "src/components/ResetPasswordModal.tsx:42:7",
			"data-prohibitions": "[]",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/components/ResetPasswordModal.tsx:43:9",
				"data-prohibitions": "[]",
				variant: "ghost",
				size: "icon",
				title: "Resetar Senha",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
					"data-uid": "src/components/ResetPasswordModal.tsx:44:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/ResetPasswordModal.tsx:47:7",
			"data-prohibitions": "[editContent]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					"data-uid": "src/components/ResetPasswordModal.tsx:48:9",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-uid": "src/components/ResetPasswordModal.tsx:49:11",
						"data-prohibitions": "[editContent]",
						children: ["Resetar Senha - ", targetUser.name || targetUser.email]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/ResetPasswordModal.tsx:51:9",
					"data-prohibitions": "[]",
					className: "space-y-4 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/ResetPasswordModal.tsx:52:11",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/components/ResetPasswordModal.tsx:53:13",
							"data-prohibitions": "[]",
							children: "Nova Senha"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/components/ResetPasswordModal.tsx:54:13",
							"data-prohibitions": "[editContent]",
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "Minimo 8 caracteres"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/ResetPasswordModal.tsx:62:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/ResetPasswordModal.tsx:63:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => setOpen(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/ResetPasswordModal.tsx:66:11",
						"data-prohibitions": "[editContent]",
						onClick: handleReset,
						disabled: loading,
						children: loading ? "Salvando..." : "Confirmar"
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/pages/Users.tsx
function UsersPage() {
	const { user } = useAuth();
	const [users, setUsers] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		pb.collection("users").getFullList({ sort: "-created" }).then(setUsers).catch(() => toast.error("Erro ao carregar usuários"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Users.tsx:29:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 sm:p-6 max-w-6xl mx-auto space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Users.tsx:30:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/Users.tsx:31:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold",
				children: "Gerenciar Acessos"
			}), (user?.access_level === "Admin" || user?.access_level === "Socio") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionsModal, {
				"data-uid": "src/pages/Users.tsx:32:80",
				"data-prohibitions": "[editContent]"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/Users.tsx:35:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				"data-uid": "src/pages/Users.tsx:36:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					"data-uid": "src/pages/Users.tsx:37:11",
					"data-prohibitions": "[]",
					children: "Usuários do Sistema"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/pages/Users.tsx:39:9",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Users.tsx:40:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-md border overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/Users.tsx:41:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/Users.tsx:42:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Users.tsx:43:17",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Users.tsx:44:19",
										"data-prohibitions": "[]",
										children: "Nome"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Users.tsx:45:19",
										"data-prohibitions": "[]",
										children: "Email"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Users.tsx:46:19",
										"data-prohibitions": "[]",
										children: "Nível"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/Users.tsx:47:19",
										"data-prohibitions": "[]",
										className: "w-[100px] text-right",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/pages/Users.tsx:50:15",
							"data-prohibitions": "[editContent]",
							children: [users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/Users.tsx:52:19",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Users.tsx:53:21",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: u.name || u.email.split("@")[0]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Users.tsx:54:21",
										"data-prohibitions": "[editContent]",
										children: u.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Users.tsx:55:21",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/Users.tsx:56:23",
											"data-prohibitions": "[editContent]",
											className: "inline-flex px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full",
											children: u.access_level || "N/A"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/Users.tsx:60:21",
										"data-prohibitions": "[editContent]",
										className: "text-right",
										children: (user?.access_level === "Admin" || user?.access_level === "Socio") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetPasswordModal, {
											"data-uid": "src/pages/Users.tsx:62:25",
											"data-prohibitions": "[editContent]",
											targetUser: u
										})
									})
								]
							}, u.id)), users.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/Users.tsx:68:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/Users.tsx:69:21",
									"data-prohibitions": "[]",
									colSpan: 4,
									className: "text-center py-6 text-muted-foreground",
									children: "Nenhum usuário encontrado"
								})
							})]
						})]
					})
				})
			})]
		})]
	});
}
//#endregion
export { UsersPage as default };

//# sourceMappingURL=Users-CDCFLq22.js.map