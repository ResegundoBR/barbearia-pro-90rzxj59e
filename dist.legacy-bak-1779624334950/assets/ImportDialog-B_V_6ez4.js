import { a as e, n as t, t as n } from './jsx-runtime-m7G7yzlP.js'
import {
  R as r,
  S as i,
  _ as a,
  _t as o,
  b as s,
  st as c,
  v as l,
  x as u,
  y as d,
} from './index-CHmnQ-gm.js'
import { t as f } from './progress-Dbv_Mm3H.js'
var p = c(`file-spreadsheet`, [
    [
      `path`,
      {
        d: `M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,
        key: `1oefj6`,
      },
    ],
    [`path`, { d: `M14 2v5a1 1 0 0 0 1 1h5`, key: `wfsgrz` }],
    [`path`, { d: `M8 13h2`, key: `yr2amv` }],
    [`path`, { d: `M14 13h2`, key: `un5t4a` }],
    [`path`, { d: `M8 17h2`, key: `2yhykz` }],
    [`path`, { d: `M14 17h2`, key: `10kma7` }],
  ]),
  m = c(`upload`, [
    [`path`, { d: `M12 3v12`, key: `1x0j5s` }],
    [`path`, { d: `m17 8-5-5-5 5`, key: `7q97r8` }],
    [`path`, { d: `M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`, key: `ih7n3h` }],
  ]),
  h = e(t(), 1),
  g = n()
function _(e) {
  let t = e.replace(/^\uFEFF/, ``),
    n =
      t.split(`
`)[0] || ``,
    r = n.split(`;`).length > n.split(`,`).length ? `;` : `,`,
    i = [],
    a = [],
    o = !1,
    s = ``
  for (let n = 0; n < t.length; n++) {
    let c = t[n]
    o
      ? c === `"`
        ? e[n + 1] === `"`
          ? ((s += `"`), n++)
          : (o = !1)
        : (s += c)
      : c === `"`
        ? (o = !0)
        : c === r
          ? (a.push(s), (s = ``))
          : c ===
              `
`
            ? (a.push(s), i.push(a), (a = []), (s = ``))
            : c === `\r` || (s += c)
  }
  if ((a.push(s), i.push(a), i.length < 2)) return []
  let c = i[0].map((e) => e.trim().replace(/^"|"$/g, ``)),
    l = []
  for (let e = 1; e < i.length; e++) {
    if (i[e].length === 1 && i[e][0] === ``) continue
    let t = {},
      n = !1
    ;(c.forEach((r, a) => {
      let o = i[e][a]?.trim() || ``
      ;((t[r] = o), o && (n = !0))
    }),
      n && l.push(t))
  }
  return l
}
function v({ open: e, onOpenChange: t, title: n, onImport: c }) {
  let [v, y] = (0, h.useState)(!1),
    [b, x] = (0, h.useState)(0),
    [S, C] = (0, h.useState)(null),
    w = (0, h.useRef)(null),
    { toast: T } = o()
  return (0, g.jsx)(a, {
    open: e,
    onOpenChange: (e) => {
      v || (t(e), e || C(null))
    },
    children: (0, g.jsxs)(l, {
      children: [
        (0, g.jsxs)(u, {
          children: [
            (0, g.jsx)(i, { children: n }),
            (0, g.jsx)(d, {
              children: `Faça upload de um arquivo contendo os dados a serem importados. Para melhor compatibilidade, salve sua planilha como .CSV.`,
            }),
          ],
        }),
        (0, g.jsxs)(`div`, {
          className: `bg-muted/40 p-4 rounded-lg mt-2 text-sm border`,
          children: [
            (0, g.jsx)(`p`, {
              className: `font-semibold mb-2 text-foreground`,
              children: `Modelo Padrão (Google Sheets):`,
            }),
            (0, g.jsx)(`p`, {
              className: `text-muted-foreground mb-4`,
              children: `Para garantir que a importação funcione perfeitamente, utilize o nosso modelo oficial com os cabeçalhos corretos.`,
            }),
            (0, g.jsx)(r, {
              variant: `secondary`,
              size: `sm`,
              className: `w-full sm:w-auto`,
              asChild: !0,
              children: (0, g.jsxs)(`a`, {
                href: `https://docs.google.com/spreadsheets/d/1Xy9oZ02tVbOqXgT0WbVb_A_mXQ-d8lWn2l4_5aXfA/copy`,
                target: `_blank`,
                rel: `noreferrer`,
                children: [(0, g.jsx)(p, { className: `w-4 h-4 mr-2` }), `Fazer cópia do modelo`],
              }),
            }),
          ],
        }),
        (0, g.jsxs)(`div`, {
          className: `py-4 space-y-4`,
          children: [
            !v &&
              !S &&
              (0, g.jsxs)(`div`, {
                className: `flex justify-center flex-col items-center border-2 border-dashed border-border rounded-xl p-8 bg-muted/20`,
                children: [
                  (0, g.jsx)(p, { className: `w-10 h-10 text-muted-foreground mb-4` }),
                  (0, g.jsxs)(r, {
                    onClick: () => w.current?.click(),
                    children: [
                      (0, g.jsx)(m, { className: `w-4 h-4 mr-2` }),
                      `Selecionar Arquivo CSV`,
                    ],
                  }),
                  (0, g.jsx)(`input`, {
                    type: `file`,
                    accept: `.csv,.xlsx`,
                    className: `hidden`,
                    ref: w,
                    onChange: async (e) => {
                      let t = e.target.files?.[0]
                      if (t) {
                        if (!t.name.endsWith(`.csv`) && !t.name.endsWith(`.xlsx`)) {
                          ;(T({
                            title: `Formato inválido`,
                            description: `Por favor, envie um arquivo .csv (recomendado)`,
                            variant: `destructive`,
                          }),
                            w.current && (w.current.value = ``))
                          return
                        }
                        ;(y(!0), x(10), C(null))
                        try {
                          let e = _(await t.text())
                          if (e.length === 0) throw Error(`Arquivo vazio ou formato inválido`)
                          ;(x(30), C(await c(e)), x(100))
                        } catch (e) {
                          T({
                            title: `Erro ao processar`,
                            description: e.message,
                            variant: `destructive`,
                          })
                        } finally {
                          ;(y(!1), w.current && (w.current.value = ``))
                        }
                      }
                    },
                  }),
                ],
              }),
            v &&
              (0, g.jsxs)(`div`, {
                className: `space-y-2`,
                children: [
                  (0, g.jsx)(`p`, {
                    className: `text-sm text-center font-medium`,
                    children: `Processando linhas...`,
                  }),
                  (0, g.jsx)(f, { value: b }),
                ],
              }),
            S &&
              (0, g.jsxs)(`div`, {
                className: `space-y-4`,
                children: [
                  (0, g.jsxs)(`div`, {
                    className: `bg-muted p-4 rounded-md text-center`,
                    children: [
                      (0, g.jsxs)(`p`, {
                        className: `font-semibold text-emerald-600`,
                        children: [S.success, ` registros importados com sucesso!`],
                      }),
                      S.errors > 0 &&
                        (0, g.jsxs)(`p`, {
                          className: `font-semibold text-destructive mt-1`,
                          children: [S.errors, ` erros encontrados`],
                        }),
                    ],
                  }),
                  S.errorsList.length > 0 &&
                    (0, g.jsx)(`div`, {
                      className: `max-h-40 overflow-y-auto text-sm text-destructive bg-destructive/10 p-3 rounded-md`,
                      children: (0, g.jsx)(`ul`, {
                        className: `list-disc pl-4 space-y-1`,
                        children: S.errorsList.map((e, t) => (0, g.jsx)(`li`, { children: e }, t)),
                      }),
                    }),
                ],
              }),
          ],
        }),
        (0, g.jsx)(s, {
          children: (0, g.jsx)(r, {
            variant: `outline`,
            onClick: () => t(!1),
            disabled: v,
            children: S ? `Fechar` : `Cancelar`,
          }),
        }),
      ],
    }),
  })
}
export { m as n, v as t }
