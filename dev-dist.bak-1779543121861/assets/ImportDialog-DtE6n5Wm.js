import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-CpkZU50A.js'
import {
  S as DialogTitle,
  U as Button,
  _ as Dialog,
  b as DialogFooter,
  pt as createLucideIcon,
  v as DialogContent,
  wt as useToast,
  x as DialogHeader,
  y as DialogDescription,
} from './index-BffIn0wv.js'
import { t as Progress } from './progress-DAmNx9de.js'
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
var Upload = createLucideIcon('upload', [
  [
    'path',
    {
      d: 'M12 3v12',
      key: '1x0j5s',
    },
  ],
  [
    'path',
    {
      d: 'm17 8-5-5-5 5',
      key: '7q97r8',
    },
  ],
  [
    'path',
    {
      d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
      key: 'ih7n3h',
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
          'data-prohibitions': '[editContent]',
          className: 'py-4 space-y-4',
          children: [
            !loading &&
              !results &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/components/ImportDialog.tsx:150:13',
                'data-prohibitions': '[]',
                className:
                  'flex justify-center flex-col items-center border-2 border-dashed border-border rounded-xl p-8 bg-muted/20',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {
                    'data-uid': 'src/components/ImportDialog.tsx:151:15',
                    'data-prohibitions': '[editContent]',
                    className: 'w-10 h-10 text-muted-foreground mb-4',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                    'data-uid': 'src/components/ImportDialog.tsx:152:15',
                    'data-prohibitions': '[]',
                    onClick: () => fileInputRef.current?.click(),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
                        'data-uid': 'src/components/ImportDialog.tsx:153:17',
                        'data-prohibitions': '[editContent]',
                        className: 'w-4 h-4 mr-2',
                      }),
                      'Selecionar Arquivo CSV',
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('input', {
                    'data-uid': 'src/components/ImportDialog.tsx:156:15',
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
                'data-uid': 'src/components/ImportDialog.tsx:167:13',
                'data-prohibitions': '[]',
                className: 'space-y-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    'data-uid': 'src/components/ImportDialog.tsx:168:15',
                    'data-prohibitions': '[]',
                    className: 'text-sm text-center font-medium',
                    children: 'Processando linhas...',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
                    'data-uid': 'src/components/ImportDialog.tsx:169:15',
                    'data-prohibitions': '[editContent]',
                    value: progress,
                  }),
                ],
              }),
            results &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/components/ImportDialog.tsx:174:13',
                'data-prohibitions': '[editContent]',
                className: 'space-y-4',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/components/ImportDialog.tsx:175:15',
                    'data-prohibitions': '[editContent]',
                    className: 'bg-muted p-4 rounded-md text-center',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                        'data-uid': 'src/components/ImportDialog.tsx:176:17',
                        'data-prohibitions': '[editContent]',
                        className: 'font-semibold text-emerald-600',
                        children: [results.success, ' registros importados com sucesso!'],
                      }),
                      results.errors > 0 &&
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                          'data-uid': 'src/components/ImportDialog.tsx:180:19',
                          'data-prohibitions': '[editContent]',
                          className: 'font-semibold text-destructive mt-1',
                          children: [results.errors, ' erros encontrados'],
                        }),
                    ],
                  }),
                  results.errorsList.length > 0 &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                      'data-uid': 'src/components/ImportDialog.tsx:186:17',
                      'data-prohibitions': '[editContent]',
                      className:
                        'max-h-40 overflow-y-auto text-sm text-destructive bg-destructive/10 p-3 rounded-md',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('ul', {
                        'data-uid': 'src/components/ImportDialog.tsx:187:19',
                        'data-prohibitions': '[editContent]',
                        className: 'list-disc pl-4 space-y-1',
                        children: results.errorsList.map((err, i) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            'li',
                            {
                              'data-uid': 'src/components/ImportDialog.tsx:189:23',
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
          'data-uid': 'src/components/ImportDialog.tsx:198:9',
          'data-prohibitions': '[editContent]',
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            'data-uid': 'src/components/ImportDialog.tsx:199:11',
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
export { Upload as n, ImportDialog as t }

//# sourceMappingURL=ImportDialog-DtE6n5Wm.js.map
