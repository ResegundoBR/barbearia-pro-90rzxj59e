import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-CpkZU50A.js";
import { B as Scissors, b as Button, k as toast, n as useAuth, r as pb, y as Input } from "./index-DNpRsLNe.js";
import { t as Label } from "./label-DUPEKbh4.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DlZjZUyM.js";
//#region src/pages/Login.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { signIn } = useAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [orgName, setOrgName] = (0, import_react.useState)("La Barberiá");
	(0, import_react.useEffect)(() => {
		pb.send("/backend/v1/public-org", { method: "GET" }).then((res) => {
			if (res.name) setOrgName(res.name);
		}).catch(() => {});
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { error } = await signIn(email, password);
		if (error) {
			toast.error("Credenciais inválidas. Verifique e tente novamente.");
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Login.tsx:44:5",
		"data-prohibitions": "[editContent]",
		className: "min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Login.tsx:45:7",
			"data-prohibitions": "[editContent]",
			className: "mb-8 text-center animate-fade-in-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Login.tsx:46:9",
					"data-prohibitions": "[]",
					className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4 shadow-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, {
						"data-uid": "src/pages/Login.tsx:47:11",
						"data-prohibitions": "[editContent]",
						className: "w-8 h-8 text-primary-foreground"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/Login.tsx:49:9",
					"data-prohibitions": "[editContent]",
					className: "text-4xl font-bold text-gray-900 tracking-tight",
					children: orgName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Login.tsx:50:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-2 font-medium",
					children: "Acesso ao sistema de gestão"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/Login.tsx:53:7",
			"data-prohibitions": "[editContent]",
			className: "w-full max-w-md shadow-xl border-t-4 border-t-primary animate-fade-in-up",
			style: { animationDelay: "100ms" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/pages/Login.tsx:57:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					"data-uid": "src/pages/Login.tsx:58:11",
					"data-prohibitions": "[]",
					className: "text-2xl",
					children: "Login"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					"data-uid": "src/pages/Login.tsx:59:11",
					"data-prohibitions": "[]",
					children: "Insira suas credenciais para acessar a plataforma."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/pages/Login.tsx:61:9",
				"data-prohibitions": "[editContent]",
				onSubmit: handleSubmit,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/Login.tsx:62:11",
					"data-prohibitions": "[]",
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Login.tsx:63:13",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Login.tsx:64:15",
							"data-prohibitions": "[]",
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Login.tsx:65:15",
							"data-prohibitions": "[editContent]",
							id: "email",
							type: "email",
							placeholder: "seu@email.com",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Login.tsx:74:13",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/Login.tsx:75:15",
							"data-prohibitions": "[]",
							htmlFor: "password",
							children: "Senha"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/Login.tsx:76:15",
							"data-prohibitions": "[editContent]",
							id: "password",
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
					"data-uid": "src/pages/Login.tsx:85:11",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/Login.tsx:86:13",
						"data-prohibitions": "[editContent]",
						type: "submit",
						className: "w-full h-11",
						disabled: loading,
						children: loading ? "Autenticando..." : "Acessar Plataforma"
					})
				})]
			})]
		})]
	});
}
//#endregion
export { Login as default };

//# sourceMappingURL=Login-CYdWxkV-.js.map