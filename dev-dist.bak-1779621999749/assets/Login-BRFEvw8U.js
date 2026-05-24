import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { t as CircleAlert } from "./circle-alert-BqzzoKyi.js";
import { Dt as useNavigate, H as Input, Tt as Link, U as Button, i as useAuth, pt as createLucideIcon, t as Label } from "./index-Dw6qfu4w.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DvhcMp0V.js";
var Lock = createLucideIcon("lock", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 10 0v4",
	key: "fwvmzm"
}]]);
//#endregion
//#region src/pages/Login.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const { signIn } = useAuth();
	const navigate = useNavigate();
	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);
		const res = await signIn(email, password);
		setIsLoading(false);
		if (res.error) {
			const err = res.error;
			if (err.status === 400 || err.status === 401 || err.status === 403) setError("Credenciais inválidas. Verifique seu e-mail e senha.");
			else setError(`Erro de conexão ou servidor: ${err.message || "Tente novamente mais tarde."}`);
		} else navigate("/agenda");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Login.tsx:39:5",
		"data-prohibitions": "[editContent]",
		className: "min-h-screen flex items-center justify-center bg-gray-50 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/Login.tsx:40:7",
			"data-prohibitions": "[editContent]",
			className: "w-full max-w-md shadow-lg border-amber-100/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/pages/Login.tsx:41:9",
				"data-prohibitions": "[]",
				className: "space-y-2 text-center pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/Login.tsx:42:11",
						"data-prohibitions": "[]",
						className: "mx-auto bg-amber-100 text-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
							"data-uid": "src/pages/Login.tsx:43:13",
							"data-prohibitions": "[editContent]",
							className: "w-8 h-8"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/Login.tsx:45:11",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold",
						children: "Acesso ao Sistema"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/Login.tsx:46:11",
						"data-prohibitions": "[]",
						children: "Faça login para gerenciar sua barbearia"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				"data-uid": "src/pages/Login.tsx:48:9",
				"data-prohibitions": "[editContent]",
				children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Login.tsx:50:13",
					"data-prohibitions": "[editContent]",
					className: "mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-3 text-sm border border-red-100 animate-fade-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						"data-uid": "src/pages/Login.tsx:51:15",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Login.tsx:52:15",
						"data-prohibitions": "[editContent]",
						children: error
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/pages/Login.tsx:55:11",
					"data-prohibitions": "[editContent]",
					onSubmit: handleLogin,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Login.tsx:56:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/Login.tsx:57:15",
								"data-prohibitions": "[]",
								htmlFor: "email",
								children: "E-mail"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/Login.tsx:58:15",
								"data-prohibitions": "[editContent]",
								id: "email",
								type: "email",
								placeholder: "exemplo@email.com",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true,
								className: "focus-visible:ring-amber-500"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Login.tsx:68:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Login.tsx:69:15",
								"data-prohibitions": "[]",
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/Login.tsx:70:17",
									"data-prohibitions": "[]",
									htmlFor: "password",
									children: "Senha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-uid": "src/pages/Login.tsx:71:17",
									"data-prohibitions": "[]",
									to: "/recuperar-senha",
									className: "text-sm text-amber-600 hover:text-amber-700 font-medium",
									children: "Esqueci minha senha"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/Login.tsx:78:15",
								"data-prohibitions": "[editContent]",
								id: "password",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								required: true,
								className: "focus-visible:ring-amber-500"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Login.tsx:87:13",
							"data-prohibitions": "[editContent]",
							type: "submit",
							className: "w-full bg-[#d99426] hover:bg-[#c48421] text-white font-medium py-2.5 mt-4 transition-colors",
							disabled: isLoading,
							children: isLoading ? "Autenticando..." : "Entrar"
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { Login as default };

//# sourceMappingURL=Login-BRFEvw8U.js.map