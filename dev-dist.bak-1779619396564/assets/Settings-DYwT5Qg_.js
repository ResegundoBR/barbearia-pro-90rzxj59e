import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-CpkZU50A.js'
import { t as Building2 } from './building-2-Db-5AdEX.js'
import { t as Clock } from './clock-BZ7LHsGf.js'
import { t as Upload } from './upload-DFmTZ3N7.js'
import {
  I as Input,
  L as Button,
  V as toast,
  a as pb,
  at as createLucideIcon,
  g as ScrollBar,
  h as ScrollArea,
  t as Label,
} from './index-DGvWxLYe.js'
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from './tabs-HKzXS95f.js'
import {
  a as CardHeader,
  n as CardContent,
  o as CardTitle,
  r as CardDescription,
  t as Card,
} from './card-Bbf0jma7.js'
var Database = createLucideIcon('database', [
  [
    'ellipse',
    {
      cx: '12',
      cy: '5',
      rx: '9',
      ry: '3',
      key: 'msslwz',
    },
  ],
  [
    'path',
    {
      d: 'M3 5V19A9 3 0 0 0 21 19V5',
      key: '1wlel7',
    },
  ],
  [
    'path',
    {
      d: 'M3 12A9 3 0 0 0 21 12',
      key: 'mv7ke4',
    },
  ],
])
var Download = createLucideIcon('download', [
  [
    'path',
    {
      d: 'M12 15V3',
      key: 'm9g1x1',
    },
  ],
  [
    'path',
    {
      d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
      key: 'ih7n3h',
    },
  ],
  [
    'path',
    {
      d: 'm7 10 5 5 5-5',
      key: 'brsn70',
    },
  ],
])
var ShieldCheck = createLucideIcon('shield-check', [
  [
    'path',
    {
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
      key: 'oel41y',
    },
  ],
  [
    'path',
    {
      d: 'm9 12 2 2 4-4',
      key: 'dzmm74',
    },
  ],
])
//#endregion
//#region src/pages/Settings.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
function parseCSV(text) {
  const lines = text.split(/\r?\n/)
  if (lines.length === 0) return []
  const parseLine = (line) => {
    const result = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') inQuotes = !inQuotes
      else if (char === ',' && !inQuotes) {
        result.push(current)
        current = ''
      } else current += char
    }
    result.push(current)
    return result
  }
  const headers = parseLine(lines[0]).map((h) => h.trim())
  const data = []
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue
    const values = parseLine(lines[i]).map((v) => v.trim())
    const obj = {}
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || ''
    })
    data.push(obj)
  }
  return data
}
var CLIENT_TEMPLATE_URL =
  'data:text/csv;charset=utf-8,' +
  encodeURIComponent('Nome,Sobrenome,Celular,Fone Secundário,Nascimento,Profissional,Localização\n')
var PRODUCT_TEMPLATE_URL =
  'data:text/csv;charset=utf-8,' +
  encodeURIComponent('Produto,Categoria,Preço de Venda,Preço de Custo,Estoque Atual\n')
var SUPPLIER_TEMPLATE_URL =
  'data:text/csv;charset=utf-8,' +
  encodeURIComponent('Nome,CPF/CNPJ,Endereço,Pessoa de Contato,WhatsApp/Fone,Categoria\n')
function Settings() {
  const [loading, setLoading] = (0, import_react.useState)(false)
  const handleImport = async (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (event) => {
      const text = event.target?.result
      const data = parseCSV(text)
      setLoading(true)
      let successCount = 0
      let errorCount = 0
      try {
        if (type === 'clientes')
          for (const row of data)
            try {
              let birthDate = ''
              if (row['Nascimento']) {
                const parts = row['Nascimento'].split('/')
                if (parts.length === 3)
                  birthDate = `${parts[2]}-${parts[1]}-${parts[0]} 12:00:00.000Z`
              }
              await pb.collection('clients').create({
                name: row['Nome'],
                surname: row['Sobrenome'],
                phone: row['Celular'],
                phone_secondary: row['Fone Secundário'],
                birthday: birthDate || void 0,
                location_type:
                  row['Localização']?.toLowerCase() === 'passagem' ? 'passage' : 'nearby',
                is_active: true,
              })
              successCount++
            } catch (err) {
              console.error(err)
              errorCount++
            }
        else if (type === 'produtos')
          for (const row of data)
            try {
              await pb.collection('products').create({
                name: row['Produto'],
                category: row['Categoria'],
                price: parseFloat(row['Preço de Venda']?.replace(',', '.') || '0'),
                cost_price: parseFloat(row['Preço de Custo']?.replace(',', '.') || '0'),
                stock_quantity: parseInt(row['Estoque Atual'] || '0', 10),
                is_active: true,
              })
              successCount++
            } catch (err) {
              console.error(err)
              errorCount++
            }
        else if (type === 'fornecedores')
          for (const row of data)
            try {
              await pb.collection('suppliers').create({
                name: row['Nome'],
                document: row['CPF/CNPJ'],
                address: row['Endereço'],
                contact_person: row['Pessoa de Contato'] || row['Pesso de Contato'],
                whatsapp: row['WhatsApp/Fone'],
              })
              successCount++
            } catch (err) {
              console.error(err)
              errorCount++
            }
        toast.success(`Importação concluída. Sucesso: ${successCount}. Erros: ${errorCount}.`)
      } catch (error) {
        toast.error('Erro ao processar arquivo.')
      } finally {
        setLoading(false)
        e.target.value = ''
      }
    }
    reader.readAsText(file)
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/pages/Settings.tsx:158:5',
    'data-prohibitions': '[editContent]',
    className: 'container mx-auto py-8 max-w-5xl space-y-6 px-4 md:px-0',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/Settings.tsx:159:7',
        'data-prohibitions': '[]',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
            'data-uid': 'src/pages/Settings.tsx:160:9',
            'data-prohibitions': '[]',
            className: 'text-3xl font-bold tracking-tight',
            children: 'Configurações',
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
            'data-uid': 'src/pages/Settings.tsx:161:9',
            'data-prohibitions': '[]',
            className: 'text-muted-foreground mt-2',
            children: 'Gerencie as preferências da sua barbearia e importe dados.',
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
        'data-uid': 'src/pages/Settings.tsx:166:7',
        'data-prohibitions': '[editContent]',
        defaultValue: 'geral',
        className: 'w-full',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea, {
            'data-uid': 'src/pages/Settings.tsx:168:9',
            'data-prohibitions': '[]',
            className: 'w-full border-b mb-6',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
                'data-uid': 'src/pages/Settings.tsx:169:11',
                'data-prohibitions': '[]',
                className:
                  'inline-flex h-12 items-center justify-start rounded-none bg-transparent p-0 w-max min-w-full',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
                    'data-uid': 'src/pages/Settings.tsx:170:13',
                    'data-prohibitions': '[]',
                    value: 'geral',
                    className:
                      'inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground rounded-none shadow-none data-[state=active]:bg-transparent',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
                        'data-uid': 'src/pages/Settings.tsx:174:15',
                        'data-prohibitions': '[editContent]',
                        className: 'w-4 h-4 mr-2',
                      }),
                      'Geral',
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
                    'data-uid': 'src/pages/Settings.tsx:177:13',
                    'data-prohibitions': '[]',
                    value: 'horario',
                    className:
                      'inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground rounded-none shadow-none data-[state=active]:bg-transparent',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
                        'data-uid': 'src/pages/Settings.tsx:181:15',
                        'data-prohibitions': '[editContent]',
                        className: 'w-4 h-4 mr-2',
                      }),
                      'Horário',
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
                    'data-uid': 'src/pages/Settings.tsx:184:13',
                    'data-prohibitions': '[]',
                    value: 'permissoes',
                    className:
                      'inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground rounded-none shadow-none data-[state=active]:bg-transparent',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
                        'data-uid': 'src/pages/Settings.tsx:188:15',
                        'data-prohibitions': '[editContent]',
                        className: 'w-4 h-4 mr-2',
                      }),
                      'Permissões',
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
                    'data-uid': 'src/pages/Settings.tsx:191:13',
                    'data-prohibitions': '[]',
                    value: 'importacao',
                    className:
                      'inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground rounded-none shadow-none data-[state=active]:bg-transparent',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
                        'data-uid': 'src/pages/Settings.tsx:195:15',
                        'data-prohibitions': '[editContent]',
                        className: 'w-4 h-4 mr-2',
                      }),
                      'Central de Importação',
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {
                'data-uid': 'src/pages/Settings.tsx:199:11',
                'data-prohibitions': '[editContent]',
                orientation: 'horizontal',
                className: 'invisible sm:visible',
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/Settings.tsx:202:9',
            'data-prohibitions': '[]',
            value: 'geral',
            className: 'space-y-4',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
              'data-uid': 'src/pages/Settings.tsx:203:11',
              'data-prohibitions': '[]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                  'data-uid': 'src/pages/Settings.tsx:204:13',
                  'data-prohibitions': '[]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                      'data-uid': 'src/pages/Settings.tsx:205:15',
                      'data-prohibitions': '[]',
                      children: 'Detalhes da Barbearia',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                      'data-uid': 'src/pages/Settings.tsx:206:15',
                      'data-prohibitions': '[]',
                      children: 'Informações básicas do seu negócio.',
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
                  'data-uid': 'src/pages/Settings.tsx:208:13',
                  'data-prohibitions': '[]',
                  className: 'space-y-4',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:209:15',
                      'data-prohibitions': '[]',
                      className: 'grid gap-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                          'data-uid': 'src/pages/Settings.tsx:210:17',
                          'data-prohibitions': '[]',
                          htmlFor: 'name',
                          children: 'Nome da Barbearia',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          'data-uid': 'src/pages/Settings.tsx:211:17',
                          'data-prohibitions': '[editContent]',
                          id: 'name',
                          defaultValue: 'La Barberiá',
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:213:15',
                      'data-prohibitions': '[]',
                      className: 'grid gap-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                          'data-uid': 'src/pages/Settings.tsx:214:17',
                          'data-prohibitions': '[]',
                          htmlFor: 'address',
                          children: 'Endereço',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          'data-uid': 'src/pages/Settings.tsx:215:17',
                          'data-prohibitions': '[editContent]',
                          id: 'address',
                          defaultValue: 'Rua Principal, 123',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/Settings.tsx:221:9',
            'data-prohibitions': '[]',
            value: 'horario',
            className: 'space-y-4',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
              'data-uid': 'src/pages/Settings.tsx:222:11',
              'data-prohibitions': '[]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                  'data-uid': 'src/pages/Settings.tsx:223:13',
                  'data-prohibitions': '[]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                      'data-uid': 'src/pages/Settings.tsx:224:15',
                      'data-prohibitions': '[]',
                      children: 'Horário de Funcionamento',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                      'data-uid': 'src/pages/Settings.tsx:225:15',
                      'data-prohibitions': '[]',
                      children: 'Defina os horários em que a barbearia está aberta.',
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
                  'data-uid': 'src/pages/Settings.tsx:227:13',
                  'data-prohibitions': '[]',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    'data-uid': 'src/pages/Settings.tsx:228:15',
                    'data-prohibitions': '[]',
                    className: 'text-sm text-muted-foreground',
                    children: 'Em breve: gerenciamento detalhado de horários por dia da semana.',
                  }),
                }),
              ],
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/Settings.tsx:235:9',
            'data-prohibitions': '[]',
            value: 'permissoes',
            className: 'space-y-4',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
              'data-uid': 'src/pages/Settings.tsx:236:11',
              'data-prohibitions': '[]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                  'data-uid': 'src/pages/Settings.tsx:237:13',
                  'data-prohibitions': '[]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                      'data-uid': 'src/pages/Settings.tsx:238:15',
                      'data-prohibitions': '[]',
                      children: 'Controle de Acesso',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                      'data-uid': 'src/pages/Settings.tsx:239:15',
                      'data-prohibitions': '[]',
                      children: 'Gerencie o que cada perfil pode acessar no sistema.',
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
                  'data-uid': 'src/pages/Settings.tsx:241:13',
                  'data-prohibitions': '[]',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                    'data-uid': 'src/pages/Settings.tsx:242:15',
                    'data-prohibitions': '[]',
                    className: 'text-sm text-muted-foreground',
                    children:
                      'Configuração de permissões para administradores, sócios e autônomos.',
                  }),
                }),
              ],
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/Settings.tsx:249:9',
            'data-prohibitions': '[editContent]',
            value: 'importacao',
            className: 'space-y-4',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
              'data-uid': 'src/pages/Settings.tsx:250:11',
              'data-prohibitions': '[editContent]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                  'data-uid': 'src/pages/Settings.tsx:251:13',
                  'data-prohibitions': '[]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                      'data-uid': 'src/pages/Settings.tsx:252:15',
                      'data-prohibitions': '[]',
                      children: 'Central de Importação',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                      'data-uid': 'src/pages/Settings.tsx:253:15',
                      'data-prohibitions': '[]',
                      children:
                        'Importe seus dados em massa a partir de planilhas CSV para popular o sistema rapidamente.',
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
                  'data-uid': 'src/pages/Settings.tsx:258:13',
                  'data-prohibitions': '[editContent]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:260:15',
                      'data-prohibitions': '[editContent]',
                      className: 'grid grid-cols-1 md:grid-cols-3 gap-6',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/pages/Settings.tsx:262:17',
                          'data-prohibitions': '[]',
                          className:
                            'flex flex-col border rounded-xl p-5 bg-card text-card-foreground shadow-sm h-full',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                              'data-uid': 'src/pages/Settings.tsx:263:19',
                              'data-prohibitions': '[]',
                              className: 'mb-4',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
                                  'data-uid': 'src/pages/Settings.tsx:264:21',
                                  'data-prohibitions': '[]',
                                  className: 'font-semibold text-lg',
                                  children: 'Clientes',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                                  'data-uid': 'src/pages/Settings.tsx:265:21',
                                  'data-prohibitions': '[]',
                                  className: 'text-sm text-muted-foreground mt-1',
                                  children:
                                    'Importe sua base de clientes com contato e data de nascimento.',
                                }),
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                              'data-uid': 'src/pages/Settings.tsx:269:19',
                              'data-prohibitions': '[]',
                              className: 'mt-auto flex flex-col gap-3',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                  'data-uid': 'src/pages/Settings.tsx:270:21',
                                  'data-prohibitions': '[]',
                                  asChild: true,
                                  variant: 'outline',
                                  className: 'w-full flex items-center justify-center gap-2',
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('a', {
                                    'data-uid': 'src/pages/Settings.tsx:275:23',
                                    'data-prohibitions': '[]',
                                    href: CLIENT_TEMPLATE_URL,
                                    download: 'template_clientes.csv',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
                                        'data-uid': 'src/pages/Settings.tsx:276:25',
                                        'data-prohibitions': '[editContent]',
                                        className: 'w-4 h-4',
                                      }),
                                      'Baixar Template',
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                  'data-uid': 'src/pages/Settings.tsx:280:21',
                                  'data-prohibitions': '[]',
                                  className: 'relative w-full',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                                      'data-uid': 'src/pages/Settings.tsx:281:23',
                                      'data-prohibitions': '[editContent]',
                                      type: 'file',
                                      accept: '.csv',
                                      onChange: (e) => handleImport(e, 'clientes'),
                                      className:
                                        'absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10',
                                      disabled: loading,
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                                      'data-uid': 'src/pages/Settings.tsx:288:23',
                                      'data-prohibitions': '[]',
                                      className: 'w-full flex items-center justify-center gap-2',
                                      disabled: loading,
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
                                          'data-uid': 'src/pages/Settings.tsx:292:25',
                                          'data-prohibitions': '[editContent]',
                                          className: 'w-4 h-4',
                                        }),
                                        'Importar Planilha',
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/pages/Settings.tsx:300:17',
                          'data-prohibitions': '[]',
                          className:
                            'flex flex-col border rounded-xl p-5 bg-card text-card-foreground shadow-sm h-full',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                              'data-uid': 'src/pages/Settings.tsx:301:19',
                              'data-prohibitions': '[]',
                              className: 'mb-4',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
                                  'data-uid': 'src/pages/Settings.tsx:302:21',
                                  'data-prohibitions': '[]',
                                  className: 'font-semibold text-lg',
                                  children: 'Produtos',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                                  'data-uid': 'src/pages/Settings.tsx:303:21',
                                  'data-prohibitions': '[]',
                                  className: 'text-sm text-muted-foreground mt-1',
                                  children:
                                    'Atualize seu estoque com produtos, categorias e preços.',
                                }),
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                              'data-uid': 'src/pages/Settings.tsx:307:19',
                              'data-prohibitions': '[]',
                              className: 'mt-auto flex flex-col gap-3',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                  'data-uid': 'src/pages/Settings.tsx:308:21',
                                  'data-prohibitions': '[]',
                                  asChild: true,
                                  variant: 'outline',
                                  className: 'w-full flex items-center justify-center gap-2',
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('a', {
                                    'data-uid': 'src/pages/Settings.tsx:313:23',
                                    'data-prohibitions': '[]',
                                    href: PRODUCT_TEMPLATE_URL,
                                    download: 'template_produtos.csv',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
                                        'data-uid': 'src/pages/Settings.tsx:314:25',
                                        'data-prohibitions': '[editContent]',
                                        className: 'w-4 h-4',
                                      }),
                                      'Baixar Template',
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                  'data-uid': 'src/pages/Settings.tsx:318:21',
                                  'data-prohibitions': '[]',
                                  className: 'relative w-full',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                                      'data-uid': 'src/pages/Settings.tsx:319:23',
                                      'data-prohibitions': '[editContent]',
                                      type: 'file',
                                      accept: '.csv',
                                      onChange: (e) => handleImport(e, 'produtos'),
                                      className:
                                        'absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10',
                                      disabled: loading,
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                                      'data-uid': 'src/pages/Settings.tsx:326:23',
                                      'data-prohibitions': '[]',
                                      className: 'w-full flex items-center justify-center gap-2',
                                      disabled: loading,
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
                                          'data-uid': 'src/pages/Settings.tsx:330:25',
                                          'data-prohibitions': '[editContent]',
                                          className: 'w-4 h-4',
                                        }),
                                        'Importar Planilha',
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/pages/Settings.tsx:338:17',
                          'data-prohibitions': '[]',
                          className:
                            'flex flex-col border rounded-xl p-5 bg-card text-card-foreground shadow-sm h-full',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                              'data-uid': 'src/pages/Settings.tsx:339:19',
                              'data-prohibitions': '[]',
                              className: 'mb-4',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
                                  'data-uid': 'src/pages/Settings.tsx:340:21',
                                  'data-prohibitions': '[]',
                                  className: 'font-semibold text-lg',
                                  children: 'Fornecedores',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                                  'data-uid': 'src/pages/Settings.tsx:341:21',
                                  'data-prohibitions': '[]',
                                  className: 'text-sm text-muted-foreground mt-1',
                                  children:
                                    'Adicione a lista de fornecedores com seus respectivos contatos.',
                                }),
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                              'data-uid': 'src/pages/Settings.tsx:345:19',
                              'data-prohibitions': '[]',
                              className: 'mt-auto flex flex-col gap-3',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                  'data-uid': 'src/pages/Settings.tsx:346:21',
                                  'data-prohibitions': '[]',
                                  asChild: true,
                                  variant: 'outline',
                                  className: 'w-full flex items-center justify-center gap-2',
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('a', {
                                    'data-uid': 'src/pages/Settings.tsx:351:23',
                                    'data-prohibitions': '[]',
                                    href: SUPPLIER_TEMPLATE_URL,
                                    download: 'template_fornecedores.csv',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
                                        'data-uid': 'src/pages/Settings.tsx:352:25',
                                        'data-prohibitions': '[editContent]',
                                        className: 'w-4 h-4',
                                      }),
                                      'Baixar Template',
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                  'data-uid': 'src/pages/Settings.tsx:356:21',
                                  'data-prohibitions': '[]',
                                  className: 'relative w-full',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                                      'data-uid': 'src/pages/Settings.tsx:357:23',
                                      'data-prohibitions': '[editContent]',
                                      type: 'file',
                                      accept: '.csv',
                                      onChange: (e) => handleImport(e, 'fornecedores'),
                                      className:
                                        'absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10',
                                      disabled: loading,
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                                      'data-uid': 'src/pages/Settings.tsx:364:23',
                                      'data-prohibitions': '[]',
                                      className: 'w-full flex items-center justify-center gap-2',
                                      disabled: loading,
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
                                          'data-uid': 'src/pages/Settings.tsx:368:25',
                                          'data-prohibitions': '[editContent]',
                                          className: 'w-4 h-4',
                                        }),
                                        'Importar Planilha',
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:375:15',
                      'data-prohibitions': '[]',
                      className: 'mt-6 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                          'data-uid': 'src/pages/Settings.tsx:376:17',
                          'data-prohibitions': '[]',
                          className: 'font-medium text-foreground mb-1',
                          children: 'Dicas para importação (Google Sheets/Excel):',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('ul', {
                          'data-uid': 'src/pages/Settings.tsx:379:17',
                          'data-prohibitions': '[]',
                          className: 'list-disc pl-5 space-y-1',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('li', {
                              'data-uid': 'src/pages/Settings.tsx:380:19',
                              'data-prohibitions': '[]',
                              children: 'Baixe o template acima e abra no Google Sheets ou Excel.',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('li', {
                              'data-uid': 'src/pages/Settings.tsx:381:19',
                              'data-prohibitions': '[]',
                              children:
                                'Preencha os dados seguindo o cabeçalho (não altere os nomes das colunas).',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('li', {
                              'data-uid': 'src/pages/Settings.tsx:382:19',
                              'data-prohibitions': '[]',
                              children: [
                                'A coluna ',
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('strong', {
                                  'data-uid': 'src/pages/Settings.tsx:383:30',
                                  'data-prohibitions': '[]',
                                  children: 'Nascimento',
                                }),
                                ' deve ser inserida no formato',
                                ' ',
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('code', {
                                  'data-uid': 'src/pages/Settings.tsx:384:21',
                                  'data-prohibitions': '[]',
                                  className: 'bg-muted px-1 py-0.5 rounded text-foreground',
                                  children: 'DD/MM/AAAA',
                                }),
                                ' ',
                                '(ex: 15/04/1990).',
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('li', {
                              'data-uid': 'src/pages/Settings.tsx:387:19',
                              'data-prohibitions': '[]',
                              children: [
                                'Após preencher, exporte o arquivo como ',
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('strong', {
                                  'data-uid': 'src/pages/Settings.tsx:388:60',
                                  'data-prohibitions': '[]',
                                  children: '.csv',
                                }),
                                ' (Valores Separados por Vírgula) e importe usando o botão correspondente.',
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  })
}
//#endregion
export { Settings as default }

//# sourceMappingURL=Settings-DYwT5Qg_.js.map
