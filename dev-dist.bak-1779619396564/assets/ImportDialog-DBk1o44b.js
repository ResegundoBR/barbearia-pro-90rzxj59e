import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-CpkZU50A.js'
import { t as Upload } from './upload-DFmTZ3N7.js'
import {
  L as Button,
  S as DialogTitle,
  _ as Dialog,
  at as createLucideIcon,
  b as DialogFooter,
  ht as useToast,
  v as DialogContent,
  x as DialogHeader,
  y as DialogDescription,
} from './index-DGvWxLYe.js'
import { t as Progress } from './progress-Doof0_dr.js'
var FileSpreadsheet = createLucideIcon('file-spreadsheet', [
  [
    'path',
    {
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
      key: '1oefj6',
    },
  ],
  [
    'path',
    {
      d: 'M14 2v5a1 1 0 0 0 1 1h5',
      key: 'wfsgrz',
    },
  ],
  [
    'path',
    {
      d: 'M8 13h2',
      key: 'yr2amv',
    },
  ],
  [
    'path',
    {
      d: 'M14 13h2',
      key: 'un5t4a',
    },
  ],
  [
    'path',
    {
      d: 'M8 17h2',
      key: '2yhykz',
    },
  ],
  [
    'path',
    {
      d: 'M14 17h2',
      key: '10kma7',
    },
  ],
])
//#endregion
//#region src/components/ImportDialog.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
function parseCSV(str) {
  const cleanStr = str.replace(/^\uFEFF/, '')
  const firstLine = cleanStr.split('\n')[0] || ''
  const separator = firstLine.split(';').length > firstLine.split(',').length ? ';' : ','
  const result = []
  let row = []
  let inQuotes = false
  let val = ''
  for (let i = 0; i < cleanStr.length; i++) {
    const char = cleanStr[i]
    if (inQuotes)
      if (char === '"')
        if (str[i + 1] === '"') {
          val += '"'
          i++
        } else inQuotes = false
      else val += char
    else if (char === '"') inQuotes = true
    else if (char === separator) {
      row.push(val)
      val = ''
    } else if (char === '\n') {
      row.push(val)
      result.push(row)
      row = []
      val = ''
    } else if (char === '\r') {
    } else val += char
  }
  row.push(val)
  result.push(row)
  if (result.length < 2) return []
  const headers = result[0].map((h) => h.trim().replace(/^"|"$/g, ''))
  const data = []
  for (let i = 1; i < result.length; i++) {
    if (result[i].length === 1 && result[i][0] === '') continue
    const obj = {}
    let hasValues = false
    headers.forEach((h, idx) => {
      const v = result[i][idx]?.trim() || ''
      obj[h] = v
      if (v) hasValues = true
    })
    if (hasValues) data.push(obj)
  }
  return data
}
function ImportDialog({ open, onOpenChange, title, onImport }) {
  const [loading, setLoading] = (0, import_react.useState)(false)
  const [progress, setProgress] = (0, import_react.useState)(0)
  const [results, setResults] = (0, import_react.useState)(null)
  const fileInputRef = (0, import_react.useRef)(null)
  const { toast } = useToast()
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      toast({
        title: 'Formato inválido',
        description: 'Por favor, envie um arquivo .csv (recomendado)',
        variant: 'destructive',
      })
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }
    setLoading(true)
    setProgress(10)
    setResults(null)
    try {
      const parsed = parseCSV(await file.text())
      if (parsed.length === 0) throw new Error('Arquivo vazio ou formato inválido')
      setProgress(30)
      setResults(await onImport(parsed))
      setProgress(100)
    } catch (err) {
      toast({
        title: 'Erro ao processar',
        description: err.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
    'data-uid': 'src/components/ImportDialog.tsx:130:5',
    'data-prohibitions': '[editContent]',
    open,
    onOpenChange: (val) => {
      if (!loading) {
        onOpenChange(val)
        if (!val) setResults(null)
      }
    },
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
      'data-uid': 'src/components/ImportDialog.tsx:139:7',
      'data-prohibitions': '[editContent]',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
          'data-uid': 'src/components/ImportDialog.tsx:140:9',
          'data-prohibitions': '[editContent]',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
              'data-uid': 'src/components/ImportDialog.tsx:141:11',
              'data-prohibitions': '[editContent]',
              children: title,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
              'data-uid': 'src/components/ImportDialog.tsx:142:11',
              'data-prohibitions': '[]',
              children:
                'Faça upload de um arquivo contendo os dados a serem importados. Para melhor compatibilidade, salve sua planilha como .CSV.',
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          'data-uid': 'src/components/ImportDialog.tsx:148:9',
          'data-prohibitions': '[]',
          className: 'bg-muted/40 p-4 rounded-lg mt-2 text-sm border',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              'data-uid': 'src/components/ImportDialog.tsx:149:11',
              'data-prohibitions': '[]',
              className: 'font-semibold mb-2 text-foreground',
              children: 'Modelo Padrão (Google Sheets):',
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
              'data-uid': 'src/components/ImportDialog.tsx:150:11',
              'data-prohibitions': '[]',
              className: 'text-muted-foreground mb-4',
              children:
                'Para garantir que a importação funcione perfeitamente, utilize o nosso modelo oficial com os cabeçalhos corretos.',
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
              'data-uid': 'src/components/ImportDialog.tsx:154:11',
              'data-prohibitions': '[]',
              variant: 'secondary',
              size: 'sm',
              className: 'w-full sm:w-auto',
              asChild: true,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('a', {
                'data-uid': 'src/components/ImportDialog.tsx:155:13',
                'data-prohibitions': '[]',
                href: 'https://docs.google.com/spreadsheets/d/1Xy9oZ02tVbOqXgT0WbVb_A_mXQ-d8lWn2l4_5aXfA/copy',
                target: '_blank',
                rel: 'noreferrer',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {
                    'data-uid': 'src/components/ImportDialog.tsx:160:15',
                    'data-prohibitions': '[editContent]',
                    className: 'w-4 h-4 mr-2',
                  }),
                  'Fazer cópia do modelo',
                ],
              }),
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          'data-uid': 'src/components/ImportDialog.tsx:166:9',
          'data-prohibitions': '[editContent]',
          className: 'py-4 space-y-4',
          children: [
            !loading &&
              !results &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/components/ImportDialog.tsx:168:13',
                'data-prohibitions': '[]',
                className:
                  'flex justify-center flex-col items-center border-2 border-dashed border-border rounded-xl p-8 bg-muted/20',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {
                    'data-uid': 'src/components/ImportDialog.tsx:169:15',
                    'data-prohibitions': '[editContent]',
                    className: 'w-10 h-10 text-muted-foreground mb-4',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                    'data-uid': 'src/components/ImportDialog.tsx:170:15',
                    'data-prohibitions': '[]',
                    onClick: () => fileInputRef.current?.click(),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
                        'data-uid': 'src/components/ImportDialog.tsx:171:17',
                        'data-prohibitions': '[editContent]',
                        className: 'w-4 h-4 mr-2',
                      }),
                      'Selecionar Arquivo CSV',
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('input', {
                    'data-uid': 'src/components/ImportDialog.tsx:174:15',
                    'data-prohibitions': '[editContent]',
                    type: 'file',
                    accept: '.csv,.xlsx',
                    className: 'hidden',
                    ref: fileInputRef,
                    onChange: handleFileChange,
                  }),
                ],
              }),
            loading &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/components/ImportDialog.tsx:185:13',
                'data-prohibitions': '[]',
                className: 'space-y-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    'data-uid': 'src/components/ImportDialog.tsx:186:15',
                    'data-prohibitions': '[]',
                    className: 'text-sm text-center font-medium',
                    children: 'Processando linhas...',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
                    'data-uid': 'src/components/ImportDialog.tsx:187:15',
                    'data-prohibitions': '[editContent]',
                    value: progress,
                  }),
                ],
              }),
            results &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/components/ImportDialog.tsx:192:13',
                'data-prohibitions': '[editContent]',
                className: 'space-y-4',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/components/ImportDialog.tsx:193:15',
                    'data-prohibitions': '[editContent]',
                    className: 'bg-muted p-4 rounded-md text-center',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                        'data-uid': 'src/components/ImportDialog.tsx:194:17',
                        'data-prohibitions': '[editContent]',
                        className: 'font-semibold text-emerald-600',
                        children: [results.success, ' registros importados com sucesso!'],
                      }),
                      results.errors > 0 &&
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                          'data-uid': 'src/components/ImportDialog.tsx:198:19',
                          'data-prohibitions': '[editContent]',
                          className: 'font-semibold text-destructive mt-1',
                          children: [results.errors, ' erros encontrados'],
                        }),
                    ],
                  }),
                  results.errorsList.length > 0 &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                      'data-uid': 'src/components/ImportDialog.tsx:204:17',
                      'data-prohibitions': '[editContent]',
                      className:
                        'max-h-40 overflow-y-auto text-sm text-destructive bg-destructive/10 p-3 rounded-md',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('ul', {
                        'data-uid': 'src/components/ImportDialog.tsx:205:19',
                        'data-prohibitions': '[editContent]',
                        className: 'list-disc pl-4 space-y-1',
                        children: results.errorsList.map((err, i) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            'li',
                            {
                              'data-uid': 'src/components/ImportDialog.tsx:207:23',
                              'data-prohibitions': '[editContent]',
                              children: err,
                            },
                            i,
                          ),
                        ),
                      }),
                    }),
                ],
              }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
          'data-uid': 'src/components/ImportDialog.tsx:216:9',
          'data-prohibitions': '[editContent]',
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            'data-uid': 'src/components/ImportDialog.tsx:217:11',
            'data-prohibitions': '[editContent]',
            variant: 'outline',
            onClick: () => onOpenChange(false),
            disabled: loading,
            children: results ? 'Fechar' : 'Cancelar',
          }),
        }),
      ],
    }),
  })
}
//#endregion
export { ImportDialog as t }

//# sourceMappingURL=ImportDialog-DBk1o44b.js.map
