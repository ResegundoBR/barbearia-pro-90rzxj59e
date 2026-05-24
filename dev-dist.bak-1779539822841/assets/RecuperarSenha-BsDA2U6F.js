import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-CpkZU50A.js'
import { t as CircleAlert } from './circle-alert-EvymgOCK.js'
import { t as CircleCheck } from './circle-check-CxQfdnxM.js'
import {
  H as Input,
  U as Button,
  bt as Link,
  ct as createLucideIcon,
  i as useAuth,
  t as Label,
} from './index-DGnO80YW.js'
import {
  a as CardHeader,
  n as CardContent,
  o as CardTitle,
  r as CardDescription,
  t as Card,
} from './card-mTedeVl1.js'
var KeyRound = createLucideIcon('key-round', [
  [
    'path',
    {
      d: 'M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z',
      key: '1s6t7t',
    },
  ],
  [
    'circle',
    {
      cx: '16.5',
      cy: '7.5',
      r: '.5',
      fill: 'currentColor',
      key: 'w0ekpg',
    },
  ],
])
//#endregion
//#region src/pages/RecuperarSenha.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
function RecuperarSenha() {
  const [email, setEmail] = (0, import_react.useState)('')
  const [error, setError] = (0, import_react.useState)('')
  const [isSuccess, setIsSuccess] = (0, import_react.useState)(false)
  const [isLoading, setIsLoading] = (0, import_react.useState)(false)
  const { resetPassword } = useAuth()
  const handleReset = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor, insira um e-mail válido.')
      setIsLoading(false)
      return
    }
    const res = await resetPassword(email)
    setIsLoading(false)
    if (res.error)
      setError(
        'Ocorreu um erro ao tentar enviar o link de recuperação. Tente novamente mais tarde.',
      )
    else setIsSuccess(true)
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-uid': 'src/pages/RecuperarSenha.tsx:41:5',
    'data-prohibitions': '[editContent]',
    className: 'min-h-screen flex items-center justify-center bg-gray-50 p-4',
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
      'data-uid': 'src/pages/RecuperarSenha.tsx:42:7',
      'data-prohibitions': '[editContent]',
      className: 'w-full max-w-md shadow-lg border-amber-100/50',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
          'data-uid': 'src/pages/RecuperarSenha.tsx:43:9',
          'data-prohibitions': '[editContent]',
          className: 'space-y-2 text-center pb-6',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
              'data-uid': 'src/pages/RecuperarSenha.tsx:44:11',
              'data-prohibitions': '[]',
              className:
                'mx-auto bg-amber-100 text-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-4',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
                'data-uid': 'src/pages/RecuperarSenha.tsx:45:13',
                'data-prohibitions': '[editContent]',
                className: 'w-8 h-8',
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
              'data-uid': 'src/pages/RecuperarSenha.tsx:47:11',
              'data-prohibitions': '[]',
              className: 'text-2xl font-bold',
              children: 'Recuperar Senha',
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
              'data-uid': 'src/pages/RecuperarSenha.tsx:48:11',
              'data-prohibitions': '[editContent]',
              children: isSuccess
                ? 'Verifique sua caixa de entrada'
                : 'Informe seu e-mail para receber um link de recuperação',
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
          'data-uid': 'src/pages/RecuperarSenha.tsx:54:9',
          'data-prohibitions': '[editContent]',
          children: isSuccess
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/pages/RecuperarSenha.tsx:56:13',
                'data-prohibitions': '[]',
                className: 'space-y-6 text-center animate-fade-in',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/pages/RecuperarSenha.tsx:57:15',
                    'data-prohibitions': '[]',
                    className:
                      'p-4 bg-green-50 text-green-700 rounded-lg flex flex-col items-center gap-2 border border-green-100',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
                        'data-uid': 'src/pages/RecuperarSenha.tsx:58:17',
                        'data-prohibitions': '[editContent]',
                        className: 'w-8 h-8 text-green-600',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                        'data-uid': 'src/pages/RecuperarSenha.tsx:59:17',
                        'data-prohibitions': '[]',
                        children:
                          'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha em instantes.',
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                    'data-uid': 'src/pages/RecuperarSenha.tsx:64:15',
                    'data-prohibitions': '[]',
                    asChild: true,
                    className: 'w-full bg-[#d99426] hover:bg-[#c48421] text-white',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                      'data-uid': 'src/pages/RecuperarSenha.tsx:65:17',
                      'data-prohibitions': '[]',
                      to: '/',
                      children: 'Voltar para o login',
                    }),
                  }),
                ],
              })
            : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                children: [
                  error &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/RecuperarSenha.tsx:71:17',
                      'data-prohibitions': '[editContent]',
                      className:
                        'mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-3 text-sm border border-red-100 animate-fade-in',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
                          'data-uid': 'src/pages/RecuperarSenha.tsx:72:19',
                          'data-prohibitions': '[editContent]',
                          className: 'w-5 h-5 shrink-0',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                          'data-uid': 'src/pages/RecuperarSenha.tsx:73:19',
                          'data-prohibitions': '[editContent]',
                          children: error,
                        }),
                      ],
                    }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
                    'data-uid': 'src/pages/RecuperarSenha.tsx:76:15',
                    'data-prohibitions': '[editContent]',
                    onSubmit: handleReset,
                    className: 'space-y-4',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                        'data-uid': 'src/pages/RecuperarSenha.tsx:77:17',
                        'data-prohibitions': '[]',
                        className: 'space-y-2',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                            'data-uid': 'src/pages/RecuperarSenha.tsx:78:19',
                            'data-prohibitions': '[]',
                            htmlFor: 'email',
                            children: 'E-mail',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                            'data-uid': 'src/pages/RecuperarSenha.tsx:79:19',
                            'data-prohibitions': '[editContent]',
                            id: 'email',
                            type: 'email',
                            placeholder: 'exemplo@email.com',
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            required: true,
                            className: 'focus-visible:ring-amber-500',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                        'data-uid': 'src/pages/RecuperarSenha.tsx:89:17',
                        'data-prohibitions': '[editContent]',
                        type: 'submit',
                        className:
                          'w-full bg-[#d99426] hover:bg-[#c48421] text-white font-medium py-2.5 mt-4 transition-colors',
                        disabled: isLoading || !email,
                        children: isLoading ? 'Enviando...' : 'Enviar link de recuperação',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                        'data-uid': 'src/pages/RecuperarSenha.tsx:97:17',
                        'data-prohibitions': '[]',
                        className: 'text-center mt-6',
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
                          'data-uid': 'src/pages/RecuperarSenha.tsx:98:19',
                          'data-prohibitions': '[]',
                          to: '/',
                          className: 'text-sm text-amber-600 hover:text-amber-700 font-medium',
                          children: 'Voltar para o login',
                        }),
                      }),
                    ],
                  }),
                ],
              }),
        }),
      ],
    }),
  })
}
//#endregion
export { RecuperarSenha as default }

//# sourceMappingURL=RecuperarSenha-BsDA2U6F.js.map
