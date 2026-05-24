import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import { t as r } from './circle-alert-BTYaYrZk.js'
import { t as i } from './circle-check-B_EDai4A.js'
import { H as a, U as o, bt as s, ct as c, i as l, t as u } from './index-Bf5nkyu_.js'
import { a as d, n as f, o as p, r as m, t as h } from './card-CPm2bQdE.js'
var g = c(`key-round`, [
    [
      `path`,
      {
        d: `M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z`,
        key: `1s6t7t`,
      },
    ],
    [`circle`, { cx: `16.5`, cy: `7.5`, r: `.5`, fill: `currentColor`, key: `w0ekpg` }],
  ]),
  _ = e(t(), 1),
  v = n()
function y() {
  let [e, t] = (0, _.useState)(``),
    [n, c] = (0, _.useState)(``),
    [y, b] = (0, _.useState)(!1),
    [x, S] = (0, _.useState)(!1),
    { resetPassword: C } = l()
  return (0, v.jsx)(`div`, {
    className: `min-h-screen flex items-center justify-center bg-gray-50 p-4`,
    children: (0, v.jsxs)(h, {
      className: `w-full max-w-md shadow-lg border-amber-100/50`,
      children: [
        (0, v.jsxs)(d, {
          className: `space-y-2 text-center pb-6`,
          children: [
            (0, v.jsx)(`div`, {
              className: `mx-auto bg-amber-100 text-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-4`,
              children: (0, v.jsx)(g, { className: `w-8 h-8` }),
            }),
            (0, v.jsx)(p, { className: `text-2xl font-bold`, children: `Recuperar Senha` }),
            (0, v.jsx)(m, {
              children: y
                ? `Verifique sua caixa de entrada`
                : `Informe seu e-mail para receber um link de recuperação`,
            }),
          ],
        }),
        (0, v.jsx)(f, {
          children: y
            ? (0, v.jsxs)(`div`, {
                className: `space-y-6 text-center animate-fade-in`,
                children: [
                  (0, v.jsxs)(`div`, {
                    className: `p-4 bg-green-50 text-green-700 rounded-lg flex flex-col items-center gap-2 border border-green-100`,
                    children: [
                      (0, v.jsx)(i, { className: `w-8 h-8 text-green-600` }),
                      (0, v.jsx)(`p`, {
                        children: `Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha em instantes.`,
                      }),
                    ],
                  }),
                  (0, v.jsx)(o, {
                    asChild: !0,
                    className: `w-full bg-[#d99426] hover:bg-[#c48421] text-white`,
                    children: (0, v.jsx)(s, { to: `/`, children: `Voltar para o login` }),
                  }),
                ],
              })
            : (0, v.jsxs)(v.Fragment, {
                children: [
                  n &&
                    (0, v.jsxs)(`div`, {
                      className: `mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-3 text-sm border border-red-100 animate-fade-in`,
                      children: [
                        (0, v.jsx)(r, { className: `w-5 h-5 shrink-0` }),
                        (0, v.jsx)(`p`, { children: n }),
                      ],
                    }),
                  (0, v.jsxs)(`form`, {
                    onSubmit: async (t) => {
                      if (
                        (t.preventDefault(), c(``), S(!0), !e.includes(`@`) || !e.includes(`.`))
                      ) {
                        ;(c(`Por favor, insira um e-mail válido.`), S(!1))
                        return
                      }
                      let n = await C(e)
                      ;(S(!1),
                        n.error
                          ? c(
                              `Ocorreu um erro ao tentar enviar o link de recuperação. Tente novamente mais tarde.`,
                            )
                          : b(!0))
                    },
                    className: `space-y-4`,
                    children: [
                      (0, v.jsxs)(`div`, {
                        className: `space-y-2`,
                        children: [
                          (0, v.jsx)(u, { htmlFor: `email`, children: `E-mail` }),
                          (0, v.jsx)(a, {
                            id: `email`,
                            type: `email`,
                            placeholder: `exemplo@email.com`,
                            value: e,
                            onChange: (e) => t(e.target.value),
                            required: !0,
                            className: `focus-visible:ring-amber-500`,
                          }),
                        ],
                      }),
                      (0, v.jsx)(o, {
                        type: `submit`,
                        className: `w-full bg-[#d99426] hover:bg-[#c48421] text-white font-medium py-2.5 mt-4 transition-colors`,
                        disabled: x || !e,
                        children: x ? `Enviando...` : `Enviar link de recuperação`,
                      }),
                      (0, v.jsx)(`div`, {
                        className: `text-center mt-6`,
                        children: (0, v.jsx)(s, {
                          to: `/`,
                          className: `text-sm text-amber-600 hover:text-amber-700 font-medium`,
                          children: `Voltar para o login`,
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
export { y as default }
