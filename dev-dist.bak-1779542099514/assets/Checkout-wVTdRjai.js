import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-CpkZU50A.js'
import { t as Eye } from './eye-Cd4kWsBq.js'
import { t as Plus } from './plus-qmKontFq.js'
import { t as Scissors } from './scissors-BxVGDqqP.js'
import { t as Trash2 } from './trash-2-DoKYmUmJ.js'
import {
  B as Separator,
  H as Input,
  S as DialogTitle,
  U as Button,
  X as getContrastColor,
  _ as Dialog,
  a as pb,
  b as DialogFooter,
  c as SelectContent,
  f as SelectTrigger,
  it as Search,
  p as SelectValue,
  pt as createLucideIcon,
  rt as ShoppingBag,
  s as Select,
  t as Label,
  tt as Users,
  u as SelectItem,
  ut as Check,
  v as DialogContent,
  wt as useToast,
  x as DialogHeader,
} from './index-C5u061c7.js'
import { t as format } from './format-BfI_WwAb.js'
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from './tabs-f7DB4fRf.js'
import {
  a as getBarbers,
  f as getPackages,
  l as getClientPackages,
  r as getAppointments,
  u as getClients,
} from './api-Ev4o6R8r.js'
import { n as getErrorMessage } from './errors-sqadgif_.js'
import {
  a as CardHeader,
  i as CardFooter,
  n as CardContent,
  o as CardTitle,
  r as CardDescription,
  t as Card,
} from './card-ahfq9tsI.js'
import {
  a as TableHeader,
  i as TableHead,
  n as TableBody,
  o as TableRow,
  r as TableCell,
  t as Table,
} from './table-Ltl_F7lh.js'
var History = createLucideIcon('history', [
  [
    'path',
    {
      d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8',
      key: '1357e3',
    },
  ],
  [
    'path',
    {
      d: 'M3 3v5h5',
      key: '1xhq8a',
    },
  ],
  [
    'path',
    {
      d: 'M12 7v5l4 2',
      key: '1fdv2h',
    },
  ],
])
var Landmark = createLucideIcon('landmark', [
  [
    'path',
    {
      d: 'M10 18v-7',
      key: 'wt116b',
    },
  ],
  [
    'path',
    {
      d: 'M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z',
      key: '1m329m',
    },
  ],
  [
    'path',
    {
      d: 'M14 18v-7',
      key: 'vav6t3',
    },
  ],
  [
    'path',
    {
      d: 'M18 18v-7',
      key: 'aexdmj',
    },
  ],
  [
    'path',
    {
      d: 'M3 22h18',
      key: '8prr45',
    },
  ],
  [
    'path',
    {
      d: 'M6 18v-7',
      key: '1ivflk',
    },
  ],
])
var ReceiptText = createLucideIcon('receipt-text', [
  [
    'path',
    {
      d: 'M13 16H8',
      key: 'wsln4y',
    },
  ],
  [
    'path',
    {
      d: 'M14 8H8',
      key: '1l3xfs',
    },
  ],
  [
    'path',
    {
      d: 'M16 12H8',
      key: '1fr5h0',
    },
  ],
  [
    'path',
    {
      d: 'M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z',
      key: 'ycz6yz',
    },
  ],
])
var Tag = createLucideIcon('tag', [
  [
    'path',
    {
      d: 'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z',
      key: 'vktsd0',
    },
  ],
  [
    'circle',
    {
      cx: '7.5',
      cy: '7.5',
      r: '.5',
      fill: 'currentColor',
      key: 'kqv944',
    },
  ],
])
//#endregion
//#region src/components/CheckoutHistory.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
function CheckoutHistory() {
  const [checkouts, setCheckouts] = (0, import_react.useState)([])
  const [loading, setLoading] = (0, import_react.useState)(false)
  const [searchTerm, setSearchTerm] = (0, import_react.useState)('')
  const [selectedTicket, setSelectedTicket] = (0, import_react.useState)(null)
  const loadCheckouts = async () => {
    setLoading(true)
    try {
      let filter = ''
      if (searchTerm)
        if (!isNaN(Number(searchTerm))) filter = `checkout_number = ${searchTerm}`
        else filter = `client_id.name ~ "${searchTerm}" || barber_id.name ~ "${searchTerm}"`
      setCheckouts(
        (
          await pb.collection('checkouts').getList(1, 50, {
            filter,
            sort: '-checkout_number',
            expand: 'client_id,barber_id',
          })
        ).items,
      )
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  ;(0, import_react.useEffect)(() => {
    loadCheckouts()
  }, [searchTerm])
  const openTicket = (checkout) => {
    setSelectedTicket(checkout)
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
    'data-uid': 'src/components/CheckoutHistory.tsx:66:5',
    'data-prohibitions': '[editContent]',
    className: 'border-border shadow-sm',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
        'data-uid': 'src/components/CheckoutHistory.tsx:67:7',
        'data-prohibitions': '[]',
        className: 'bg-muted/30 pb-4 border-b',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          'data-uid': 'src/components/CheckoutHistory.tsx:68:9',
          'data-prohibitions': '[]',
          className: 'flex flex-col md:flex-row justify-between md:items-center gap-4',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/components/CheckoutHistory.tsx:69:11',
              'data-prohibitions': '[]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
                  'data-uid': 'src/components/CheckoutHistory.tsx:70:13',
                  'data-prohibitions': '[]',
                  className: 'flex items-center gap-2 text-xl',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
                      'data-uid': 'src/components/CheckoutHistory.tsx:71:15',
                      'data-prohibitions': '[editContent]',
                      className: 'size-5 text-primary',
                    }),
                    ' Histórico de Checkouts',
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                  'data-uid': 'src/components/CheckoutHistory.tsx:73:13',
                  'data-prohibitions': '[]',
                  children: 'Visualize o registro de todas as transações finalizadas.',
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
              'data-uid': 'src/components/CheckoutHistory.tsx:77:11',
              'data-prohibitions': '[]',
              className: 'flex items-center gap-2 w-full md:w-auto',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/components/CheckoutHistory.tsx:78:13',
                'data-prohibitions': '[]',
                className: 'relative flex-1 md:w-64',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
                    'data-uid': 'src/components/CheckoutHistory.tsx:79:15',
                    'data-prohibitions': '[editContent]',
                    className: 'absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                    'data-uid': 'src/components/CheckoutHistory.tsx:80:15',
                    'data-prohibitions': '[editContent]',
                    placeholder: 'Nº Checkout, Cliente ou Profissional...',
                    className: 'pl-9',
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value),
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
        'data-uid': 'src/components/CheckoutHistory.tsx:90:7',
        'data-prohibitions': '[editContent]',
        className: 'p-0',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
          'data-uid': 'src/components/CheckoutHistory.tsx:91:9',
          'data-prohibitions': '[editContent]',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
              'data-uid': 'src/components/CheckoutHistory.tsx:92:11',
              'data-prohibitions': '[]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
                'data-uid': 'src/components/CheckoutHistory.tsx:93:13',
                'data-prohibitions': '[]',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/CheckoutHistory.tsx:94:15',
                    'data-prohibitions': '[]',
                    children: 'Nº',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/CheckoutHistory.tsx:95:15',
                    'data-prohibitions': '[]',
                    children: 'Data',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/CheckoutHistory.tsx:96:15',
                    'data-prohibitions': '[]',
                    children: 'Profissional',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/CheckoutHistory.tsx:97:15',
                    'data-prohibitions': '[]',
                    children: 'Cliente',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/CheckoutHistory.tsx:98:15',
                    'data-prohibitions': '[]',
                    className: 'text-right',
                    children: 'Valor Total',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/CheckoutHistory.tsx:99:15',
                    'data-prohibitions': '[]',
                    className: 'text-right',
                    children: 'Ações',
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
              'data-uid': 'src/components/CheckoutHistory.tsx:102:11',
              'data-prohibitions': '[editContent]',
              children: [
                checkouts.map((c) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    TableRow,
                    {
                      'data-uid': 'src/components/CheckoutHistory.tsx:104:15',
                      'data-prohibitions': '[editContent]',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
                          'data-uid': 'src/components/CheckoutHistory.tsx:105:17',
                          'data-prohibitions': '[editContent]',
                          className: 'font-bold',
                          children: ['#', c.checkout_number],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                          'data-uid': 'src/components/CheckoutHistory.tsx:106:17',
                          'data-prohibitions': '[editContent]',
                          children: format(new Date(c.date), 'dd/MM/yyyy HH:mm'),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                          'data-uid': 'src/components/CheckoutHistory.tsx:107:17',
                          'data-prohibitions': '[editContent]',
                          children: c.expand?.barber_id
                            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                'data-uid': 'src/components/CheckoutHistory.tsx:109:21',
                                'data-prohibitions': '[editContent]',
                                className: 'text-xs font-bold px-2 py-1 rounded-md',
                                style: {
                                  backgroundColor:
                                    c.expand.barber_id.color || 'hsl(var(--primary))',
                                  color: getContrastColor(
                                    c.expand.barber_id.color || 'hsl(var(--primary))',
                                  ),
                                },
                                children: c.expand.barber_id.name,
                              })
                            : '-',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                          'data-uid': 'src/components/CheckoutHistory.tsx:122:17',
                          'data-prohibitions': '[editContent]',
                          children: c.expand?.client_id?.name || '-',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
                          'data-uid': 'src/components/CheckoutHistory.tsx:123:17',
                          'data-prohibitions': '[editContent]',
                          className: 'text-right font-medium',
                          children: ['R$ ', c.total_amount.toFixed(2)],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                          'data-uid': 'src/components/CheckoutHistory.tsx:126:17',
                          'data-prohibitions': '[]',
                          className: 'text-right',
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                            'data-uid': 'src/components/CheckoutHistory.tsx:127:19',
                            'data-prohibitions': '[]',
                            variant: 'ghost',
                            size: 'icon',
                            onClick: () => openTicket(c),
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
                              'data-uid': 'src/components/CheckoutHistory.tsx:128:21',
                              'data-prohibitions': '[editContent]',
                              className: 'size-4 text-primary',
                            }),
                          }),
                        }),
                      ],
                    },
                    c.id,
                  ),
                ),
                checkouts.length === 0 &&
                  !loading &&
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                    'data-uid': 'src/components/CheckoutHistory.tsx:134:15',
                    'data-prohibitions': '[]',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                      'data-uid': 'src/components/CheckoutHistory.tsx:135:17',
                      'data-prohibitions': '[]',
                      colSpan: 6,
                      className: 'text-center py-6 text-muted-foreground',
                      children: 'Nenhum checkout encontrado.',
                    }),
                  }),
                loading &&
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                    'data-uid': 'src/components/CheckoutHistory.tsx:141:15',
                    'data-prohibitions': '[]',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                      'data-uid': 'src/components/CheckoutHistory.tsx:142:17',
                      'data-prohibitions': '[]',
                      colSpan: 6,
                      className: 'text-center py-6 text-muted-foreground',
                      children: 'Carregando...',
                    }),
                  }),
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
        'data-uid': 'src/components/CheckoutHistory.tsx:151:7',
        'data-prohibitions': '[editContent]',
        open: !!selectedTicket,
        onOpenChange: (o) => !o && setSelectedTicket(null),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
          'data-uid': 'src/components/CheckoutHistory.tsx:152:9',
          'data-prohibitions': '[editContent]',
          className:
            'sm:max-w-md bg-white text-black font-mono shadow-xl rounded-md border border-gray-300',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
              'data-uid': 'src/components/CheckoutHistory.tsx:153:11',
              'data-prohibitions': '[editContent]',
              className: 'mb-2',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
                'data-uid': 'src/components/CheckoutHistory.tsx:154:13',
                'data-prohibitions': '[editContent]',
                className: 'flex flex-col items-center justify-center space-y-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptText, {
                    'data-uid': 'src/components/CheckoutHistory.tsx:155:15',
                    'data-prohibitions': '[editContent]',
                    className: 'size-8 text-black',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                    'data-uid': 'src/components/CheckoutHistory.tsx:156:15',
                    'data-prohibitions': '[editContent]',
                    className: 'text-xl font-bold uppercase tracking-widest text-black',
                    children: ['Checkout #', selectedTicket?.checkout_number],
                  }),
                ],
              }),
            }),
            selectedTicket &&
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/components/CheckoutHistory.tsx:163:13',
                'data-prohibitions': '[editContent]',
                className: 'space-y-4 text-sm mt-2 max-h-[60vh] overflow-y-auto pr-2',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/components/CheckoutHistory.tsx:164:15',
                    'data-prohibitions': '[editContent]',
                    className: 'space-y-1 text-center border-b border-dashed border-gray-400 pb-4',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                        'data-uid': 'src/components/CheckoutHistory.tsx:165:17',
                        'data-prohibitions': '[editContent]',
                        className: 'text-gray-600',
                        children: ['Profissional: ', selectedTicket.expand?.barber_id?.name],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                        'data-uid': 'src/components/CheckoutHistory.tsx:168:17',
                        'data-prohibitions': '[editContent]',
                        className: 'text-gray-600',
                        children: ['Cliente: ', selectedTicket.expand?.client_id?.name],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                        'data-uid': 'src/components/CheckoutHistory.tsx:169:17',
                        'data-prohibitions': '[editContent]',
                        className: 'text-gray-600',
                        children: format(new Date(selectedTicket.date), 'dd/MM/yyyy HH:mm'),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                        'data-uid': 'src/components/CheckoutHistory.tsx:172:17',
                        'data-prohibitions': '[editContent]',
                        className: 'text-gray-600',
                        children: ['Pgto: ', selectedTicket.payment_method || 'Não inf.'],
                      }),
                    ],
                  }),
                  selectedTicket.items_snapshot?.service &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                          'data-uid': 'src/components/CheckoutHistory.tsx:177:19',
                          'data-prohibitions': '[]',
                          className:
                            'font-semibold uppercase text-xs tracking-wider text-gray-500 mt-4 mb-2',
                          children: 'Serviços e Extras',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/components/CheckoutHistory.tsx:180:19',
                          'data-prohibitions': '[editContent]',
                          className: 'flex justify-between',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                              'data-uid': 'src/components/CheckoutHistory.tsx:181:21',
                              'data-prohibitions': '[editContent]',
                              children: [
                                selectedTicket.items_snapshot.service,
                                ' ',
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                  'data-uid': 'src/components/CheckoutHistory.tsx:183:23',
                                  'data-prohibitions': '[editContent]',
                                  className: 'text-xs text-gray-500',
                                  children: [
                                    '(',
                                    selectedTicket.items_snapshot.packageUsed ? 'Pacote' : 'Base',
                                    ')',
                                  ],
                                }),
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                              'data-uid': 'src/components/CheckoutHistory.tsx:187:21',
                              'data-prohibitions': '[editContent]',
                              children: [
                                'R$ ',
                                Number(selectedTicket.items_snapshot.scheduledPrice || 0).toFixed(
                                  2,
                                ),
                              ],
                            }),
                          ],
                        }),
                        selectedTicket.items_snapshot.additionalServices?.map((s, i) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            'div',
                            {
                              'data-uid': 'src/components/CheckoutHistory.tsx:192:21',
                              'data-prohibitions': '[editContent]',
                              className: 'flex justify-between',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                  'data-uid': 'src/components/CheckoutHistory.tsx:193:23',
                                  'data-prohibitions': '[editContent]',
                                  children: [
                                    s.name,
                                    ' ',
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                      'data-uid': 'src/components/CheckoutHistory.tsx:194:34',
                                      'data-prohibitions': '[]',
                                      className: 'text-xs text-gray-500',
                                      children: '(Adic.)',
                                    }),
                                  ],
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                  'data-uid': 'src/components/CheckoutHistory.tsx:196:23',
                                  'data-prohibitions': '[editContent]',
                                  children: ['R$ ', Number(s.price || 0).toFixed(2)],
                                }),
                              ],
                            },
                            i,
                          ),
                        ),
                        selectedTicket.items_snapshot.manualExtras?.map((m, i) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            'div',
                            {
                              'data-uid': 'src/components/CheckoutHistory.tsx:200:21',
                              'data-prohibitions': '[editContent]',
                              className: 'flex justify-between',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                  'data-uid': 'src/components/CheckoutHistory.tsx:201:23',
                                  'data-prohibitions': '[editContent]',
                                  children: [
                                    m.description,
                                    ' ',
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                      'data-uid': 'src/components/CheckoutHistory.tsx:202:41',
                                      'data-prohibitions': '[]',
                                      className: 'text-xs text-gray-500',
                                      children: '(Extra)',
                                    }),
                                  ],
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                  'data-uid': 'src/components/CheckoutHistory.tsx:204:23',
                                  'data-prohibitions': '[editContent]',
                                  children: ['R$ ', Number(m.price || 0).toFixed(2)],
                                }),
                              ],
                            },
                            i,
                          ),
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                          'data-uid': 'src/components/CheckoutHistory.tsx:207:19',
                          'data-prohibitions': '[editContent]',
                          className: 'border-t border-dashed border-gray-300 my-2',
                        }),
                      ],
                    }),
                  selectedTicket.items_snapshot?.products &&
                    selectedTicket.items_snapshot.products.length > 0 &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                          'data-uid': 'src/components/CheckoutHistory.tsx:214:21',
                          'data-prohibitions': '[]',
                          className:
                            'font-semibold uppercase text-xs tracking-wider text-gray-500 mt-4 mb-2',
                          children: 'Produtos',
                        }),
                        selectedTicket.items_snapshot.products.map((p, i) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            'div',
                            {
                              'data-uid': 'src/components/CheckoutHistory.tsx:218:23',
                              'data-prohibitions': '[editContent]',
                              className: 'flex justify-between',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                  'data-uid': 'src/components/CheckoutHistory.tsx:219:25',
                                  'data-prohibitions': '[editContent]',
                                  children: [p.quantity, 'x ', p.name],
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                  'data-uid': 'src/components/CheckoutHistory.tsx:222:25',
                                  'data-prohibitions': '[editContent]',
                                  children: ['R$ ', (p.quantity * p.price).toFixed(2)],
                                }),
                              ],
                            },
                            i,
                          ),
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                          'data-uid': 'src/components/CheckoutHistory.tsx:225:21',
                          'data-prohibitions': '[editContent]',
                          className: 'border-t border-dashed border-gray-300 my-2',
                        }),
                      ],
                    }),
                  selectedTicket.items_snapshot?.packages &&
                    selectedTicket.items_snapshot.packages.length > 0 &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                          'data-uid': 'src/components/CheckoutHistory.tsx:232:21',
                          'data-prohibitions': '[]',
                          className:
                            'font-semibold uppercase text-xs tracking-wider text-gray-500 mt-4 mb-2',
                          children: 'Pacotes Vendidos',
                        }),
                        selectedTicket.items_snapshot.packages.map((p, i) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            'div',
                            {
                              'data-uid': 'src/components/CheckoutHistory.tsx:236:23',
                              'data-prohibitions': '[editContent]',
                              className: 'flex justify-between',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                  'data-uid': 'src/components/CheckoutHistory.tsx:237:25',
                                  'data-prohibitions': '[editContent]',
                                  children: [p.quantity, 'x ', p.name],
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                  'data-uid': 'src/components/CheckoutHistory.tsx:240:25',
                                  'data-prohibitions': '[editContent]',
                                  children: ['R$ ', (p.quantity * p.price).toFixed(2)],
                                }),
                              ],
                            },
                            i,
                          ),
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                          'data-uid': 'src/components/CheckoutHistory.tsx:243:21',
                          'data-prohibitions': '[editContent]',
                          className: 'border-t border-dashed border-gray-300 my-2',
                        }),
                      ],
                    }),
                  selectedTicket.items_snapshot?.discount > 0 &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/components/CheckoutHistory.tsx:248:17',
                      'data-prohibitions': '[editContent]',
                      className: 'flex justify-between text-red-600 font-medium',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                          'data-uid': 'src/components/CheckoutHistory.tsx:249:19',
                          'data-prohibitions': '[]',
                          children: 'Desconto Aplicado',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                          'data-uid': 'src/components/CheckoutHistory.tsx:250:19',
                          'data-prohibitions': '[editContent]',
                          children: [
                            '- R$ ',
                            Number(selectedTicket.items_snapshot.discount).toFixed(2),
                          ],
                        }),
                      ],
                    }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/components/CheckoutHistory.tsx:254:15',
                    'data-prohibitions': '[editContent]',
                    className:
                      'flex justify-between font-black text-lg uppercase tracking-wide pt-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                        'data-uid': 'src/components/CheckoutHistory.tsx:255:17',
                        'data-prohibitions': '[]',
                        children: 'Total:',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                        'data-uid': 'src/components/CheckoutHistory.tsx:256:17',
                        'data-prohibitions': '[editContent]',
                        children: ['R$ ', selectedTicket.total_amount.toFixed(2)],
                      }),
                    ],
                  }),
                ],
              }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
              'data-uid': 'src/components/CheckoutHistory.tsx:261:11',
              'data-prohibitions': '[]',
              className: 'mt-4 border-t border-dashed border-gray-300 pt-4',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                'data-uid': 'src/components/CheckoutHistory.tsx:262:13',
                'data-prohibitions': '[]',
                variant: 'outline',
                className: 'w-full border-gray-300 hover:bg-gray-100',
                onClick: () => setSelectedTicket(null),
                children: 'Fechar',
              }),
            }),
          ],
        }),
      }),
    ],
  })
}
//#endregion
//#region src/pages/Checkout.tsx
function Checkout() {
  const [barbers, setBarbers] = (0, import_react.useState)([])
  const [clients, setClients] = (0, import_react.useState)([])
  const [packages, setPackages] = (0, import_react.useState)([])
  const [clientPackages, setClientPackages] = (0, import_react.useState)([])
  const [appointments, setAppointments] = (0, import_react.useState)([])
  const [products, setProducts] = (0, import_react.useState)([])
  const [services, setServices] = (0, import_react.useState)([])
  const [paymentMethods, setPaymentMethods] = (0, import_react.useState)([])
  const [commissionRules, setCommissionRules] = (0, import_react.useState)([])
  const [financialConfig, setFinancialConfig] = (0, import_react.useState)({})
  const [pkgForm, setPkgForm] = (0, import_react.useState)({
    barber_id: '',
    client_id: '',
    package_id: '',
    payment_method: '',
  })
  const [svcForm, setSvcForm] = (0, import_react.useState)({
    appointment_id: '',
    service_price: '',
    payment_method: '',
  })
  const [isManual, setIsManual] = (0, import_react.useState)(false)
  const [manualForm, setManualForm] = (0, import_react.useState)({
    client_id: '',
    barber_id: '',
    service_id: '',
  })
  const [packageToConsume, setPackageToConsume] = (0, import_react.useState)(null)
  const [additionalServices, setAdditionalServices] = (0, import_react.useState)([])
  const [manualExtras, setManualExtras] = (0, import_react.useState)([])
  const [serviceToAdd, setServiceToAdd] = (0, import_react.useState)('')
  const [extraDesc, setExtraDesc] = (0, import_react.useState)('')
  const [extraPrice, setExtraPrice] = (0, import_react.useState)('')
  const [selectedProducts, setSelectedProducts] = (0, import_react.useState)([])
  const [productToAdd, setProductToAdd] = (0, import_react.useState)('')
  const [discount, setDiscount] = (0, import_react.useState)({
    type: 'fixed',
    value: 0,
  })
  const [showTicket, setShowTicket] = (0, import_react.useState)(false)
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false)
  const [successState, setSuccessState] = (0, import_react.useState)(null)
  const { toast } = useToast()
  const loadData = () => {
    Promise.all([
      getBarbers(),
      getClients(),
      getPackages(),
      getAppointments(`status != 'Concluído' && status != 'Cancelado' && status != 'FALTOU'`),
      pb.collection('products').getFullList({
        filter: 'is_active=true',
        expand: 'category_id',
      }),
      getClientPackages(),
      pb.collection('services').getFullList({ filter: 'is_active=true' }),
      pb
        .collection('payment_methods')
        .getFullList({
          filter: 'is_active=true',
          sort: 'name',
        })
        .catch(() => []),
      pb
        .collection('commission_rules')
        .getFullList()
        .catch(() => []),
      pb
        .collection('settings')
        .getFullList()
        .catch(() => []),
    ]).then(([b, c, p, a, prods, cp, svcs, pms, rules, settingsArr]) => {
      setBarbers(b)
      setClients(c)
      setPackages(p)
      setAppointments(a)
      setProducts(prods.filter((prod) => prod.is_active !== false))
      setClientPackages(
        cp.filter(
          (pkg) =>
            pkg.remaining_uses > 0 &&
            (!pkg.expires_at || new Date(pkg.expires_at) >= /* @__PURE__ */ new Date()),
        ),
      )
      setServices(svcs)
      setPaymentMethods(pms)
      setCommissionRules(rules)
      setFinancialConfig(settingsArr.find((s) => s.key === 'financial_config')?.value || {})
    })
  }
  ;(0, import_react.useEffect)(() => {
    loadData()
  }, [])
  const handleSellPackage = async (e) => {
    e.preventDefault()
    if (!pkgForm.barber_id || !pkgForm.client_id || !pkgForm.package_id || !pkgForm.payment_method)
      return toast({
        title: 'Preencha todos os campos obrigatórios',
        variant: 'destructive',
      })
    setIsSubmitting(true)
    try {
      await pb.send('/backend/v1/checkout/package', {
        method: 'POST',
        body: JSON.stringify(pkgForm),
        headers: { 'Content-Type': 'application/json' },
      })
      const pkg = packages.find((p) => p.id === pkgForm.package_id)
      const pmRecord = paymentMethods.find((p) => p.id === pkgForm.payment_method)
      try {
        await pb.send('/backend/v1/checkouts/log', {
          method: 'POST',
          body: JSON.stringify({
            client_id: pkgForm.client_id,
            barber_id: pkgForm.barber_id,
            total_amount: pkg?.price || 0,
            payment_method: pmRecord?.name || pkgForm.payment_method,
            items_snapshot: {
              packages: [
                {
                  name: pkg?.name || 'Pacote',
                  price: pkg?.price || 0,
                  quantity: 1,
                },
              ],
              discount: 0,
            },
          }),
        })
      } catch {}
      setPkgForm({
        barber_id: '',
        client_id: '',
        package_id: '',
        payment_method: '',
      })
      setSuccessState({
        type: 'package',
        message: 'Pacote vendido com sucesso!',
      })
      loadData()
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : getErrorMessage(err),
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleAddService = () => {
    if (!serviceToAdd) return
    const svc = services.find((s) => s.id === serviceToAdd)
    if (!svc) return
    setAdditionalServices([
      ...additionalServices,
      {
        id: Math.random().toString(36).substr(2, 9),
        service_id: svc.id,
        name: svc.name,
        price: svc.price,
      },
    ])
    setServiceToAdd('')
  }
  const handleAddExtra = () => {
    if (!extraDesc || !extraPrice) return
    setManualExtras([
      ...manualExtras,
      {
        id: Math.random().toString(36).substr(2, 9),
        description: extraDesc,
        price: Number(extraPrice),
      },
    ])
    setExtraDesc('')
    setExtraPrice('')
  }
  const handleCloseService = async () => {
    setIsSubmitting(true)
    try {
      if (!paymentMethods.find((p) => p.id === svcForm.payment_method))
        throw new Error('Método de pagamento inválido')
      for (const sp of selectedProducts) {
        const prod = sp.product
        if ((prod.stock_quantity || 0) - sp.quantity < 0)
          throw new Error(`Estoque insuficiente para: ${prod.name}.`)
      }
      const payload = {
        isManual,
        manualForm: isManual ? manualForm : void 0,
        svcForm: {
          appointment_id: svcForm.appointment_id,
          service_price: scheduledPrice.toString(),
          payment_method: svcForm.payment_method,
        },
        selectedProducts: selectedProducts.map((sp) => ({
          product_id: sp.product_id,
          quantity: sp.quantity,
          product: sp.product,
        })),
        packageToConsume,
        extraServices: [
          ...additionalServices.map((s) => ({
            service_id: s.service_id,
            price: s.price,
            name: s.name,
          })),
          ...manualExtras.map((m) => ({
            description: m.description,
            name: m.description,
            price: m.price,
          })),
        ],
        discount,
      }
      await pb.send('/backend/v1/checkout/service', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      })
      setSvcForm({
        appointment_id: '',
        service_price: '',
        payment_method: '',
      })
      setManualForm({
        client_id: '',
        barber_id: '',
        service_id: '',
      })
      setIsManual(false)
      setSelectedProducts([])
      setAdditionalServices([])
      setManualExtras([])
      setDiscount({
        type: 'fixed',
        value: 0,
      })
      setPackageToConsume(null)
      setShowTicket(false)
      loadData()
      setSuccessState({
        type: 'service',
        message: 'Venda finalizada com sucesso!',
      })
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : getErrorMessage(err),
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleAppointmentChange = (val) => {
    setAdditionalServices([])
    setManualExtras([])
    setDiscount({
      type: 'fixed',
      value: 0,
    })
    if (val === 'manual') {
      setIsManual(true)
      setSvcForm({
        ...svcForm,
        appointment_id: 'manual',
        service_price: '',
      })
      setPackageToConsume(null)
      return
    }
    setIsManual(false)
    const apt = appointments.find((a) => a.id === val)
    let price = apt?.price?.toString() || apt?.expand?.service_id?.price?.toString() || '0'
    let pkgIdToConsume = apt?.client_package_id || null
    if (apt?.expand?.client_package_id?.expand?.package_id) price = '0'
    else if (apt) {
      const availablePkg = clientPackages.find(
        (cp) =>
          cp.client_id === apt.client_id && cp.expand?.package_id?.service_id === apt.service_id,
      )
      if (availablePkg && availablePkg.expand?.package_id) {
        price = '0'
        pkgIdToConsume = availablePkg.id
      }
    }
    setSvcForm({
      ...svcForm,
      appointment_id: val,
      service_price: price,
    })
    setPackageToConsume(pkgIdToConsume)
  }
  const handleAddProduct = () => {
    if (!productToAdd) return
    const prod = products.find((p) => p.id === productToAdd)
    if (!prod) return
    if (selectedProducts.find((sp) => sp.product_id === productToAdd))
      setSelectedProducts(
        selectedProducts.map((sp) =>
          sp.product_id === productToAdd
            ? {
                ...sp,
                quantity: sp.quantity + 1,
              }
            : sp,
        ),
      )
    else
      setSelectedProducts([
        ...selectedProducts,
        {
          product_id: prod.id,
          product: prod,
          quantity: 1,
        },
      ])
    setProductToAdd('')
  }
  const scheduledPrice = parseFloat(svcForm.service_price.replace(',', '.') || '0')
  const additionalServicesTotal = additionalServices.reduce((acc, curr) => acc + curr.price, 0)
  const manualExtrasTotal = manualExtras.reduce((acc, curr) => acc + curr.price, 0)
  const productsTotal = selectedProducts.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0,
  )
  const servicesTotal = scheduledPrice + additionalServicesTotal + manualExtrasTotal
  const subtotal = servicesTotal + productsTotal
  const discountAmount =
    discount.type === 'percentage' ? (subtotal * (discount.value || 0)) / 100 : discount.value || 0
  const grandTotal = Math.max(0, subtotal - discountAmount)
  let ticketClientName = ''
  let ticketServiceName = ''
  if (isManual) {
    const c = clients.find((x) => x.id === manualForm.client_id)
    if (c) ticketClientName = `${c.name} ${c.surname || ''}`
    const s = services.find((x) => x.id === manualForm.service_id)
    if (s) ticketServiceName = s.name
  } else {
    const apt = appointments.find((a) => a.id === svcForm.appointment_id)
    if (apt) {
      ticketClientName = `${apt.expand?.client_id?.name || ''} ${apt.expand?.client_id?.surname || ''}`
      ticketServiceName = apt.expand?.service_id?.name || ''
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/pages/Checkout.tsx:394:5',
    'data-prohibitions': '[editContent]',
    className: 'space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/Checkout.tsx:395:7',
        'data-prohibitions': '[]',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            'data-uid': 'src/pages/Checkout.tsx:396:9',
            'data-prohibitions': '[]',
            className: 'text-3xl font-bold tracking-tight text-gradient',
            children: 'Checkout POS',
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
            'data-uid': 'src/pages/Checkout.tsx:397:9',
            'data-prohibitions': '[]',
            className: 'text-muted-foreground',
            children: 'Finalize atendimentos, venda produtos e pacotes.',
          }),
        ],
      }),
      successState
        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
            'data-uid': 'src/pages/Checkout.tsx:401:9',
            'data-prohibitions': '[editContent]',
            className: 'animate-fade-in mt-6 border-emerald-500/20 bg-emerald-500/5',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
              'data-uid': 'src/pages/Checkout.tsx:402:11',
              'data-prohibitions': '[editContent]',
              className: 'flex flex-col items-center justify-center space-y-4 py-16',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                  'data-uid': 'src/pages/Checkout.tsx:403:13',
                  'data-prohibitions': '[]',
                  className:
                    'h-20 w-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
                    'data-uid': 'src/pages/Checkout.tsx:404:15',
                    'data-prohibitions': '[editContent]',
                    className: 'h-10 w-10',
                  }),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
                  'data-uid': 'src/pages/Checkout.tsx:406:13',
                  'data-prohibitions': '[editContent]',
                  className: 'text-3xl font-bold text-emerald-600',
                  children: successState.message,
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                  'data-uid': 'src/pages/Checkout.tsx:407:13',
                  'data-prohibitions': '[]',
                  className: 'text-muted-foreground text-center max-w-sm',
                  children:
                    'A transação foi registrada com sucesso no financeiro e o estoque foi atualizado.',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/pages/Checkout.tsx:410:13',
                  'data-prohibitions': '[]',
                  onClick: () => setSuccessState(null),
                  size: 'lg',
                  className: 'mt-4 shadow-md bg-emerald-600 hover:bg-emerald-700 text-white',
                  children: 'Novo Atendimento',
                }),
              ],
            }),
          })
        : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
            'data-uid': 'src/pages/Checkout.tsx:420:9',
            'data-prohibitions': '[editContent]',
            defaultValue: 'service',
            className: 'w-full',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
                'data-uid': 'src/pages/Checkout.tsx:421:11',
                'data-prohibitions': '[]',
                className: 'grid w-full grid-cols-3 max-w-2xl mb-6',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                    'data-uid': 'src/pages/Checkout.tsx:422:13',
                    'data-prohibitions': '[]',
                    value: 'service',
                    children: 'Checkout de Serviços',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                    'data-uid': 'src/pages/Checkout.tsx:423:13',
                    'data-prohibitions': '[]',
                    value: 'package',
                    children: 'Venda de Pacotes',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                    'data-uid': 'src/pages/Checkout.tsx:424:13',
                    'data-prohibitions': '[]',
                    value: 'history',
                    children: 'Histórico de Checkouts',
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
                'data-uid': 'src/pages/Checkout.tsx:427:11',
                'data-prohibitions': '[editContent]',
                value: 'service',
                className: 'space-y-6',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Checkout.tsx:428:13',
                  'data-prohibitions': '[editContent]',
                  className: 'grid grid-cols-1 lg:grid-cols-12 gap-6',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Checkout.tsx:429:15',
                      'data-prohibitions': '[editContent]',
                      className: 'lg:col-span-7 space-y-6',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
                          'data-uid': 'src/pages/Checkout.tsx:430:17',
                          'data-prohibitions': '[editContent]',
                          className: 'border-border shadow-sm',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                              'data-uid': 'src/pages/Checkout.tsx:431:19',
                              'data-prohibitions': '[]',
                              className: 'bg-muted/30 pb-4 border-b',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
                                  'data-uid': 'src/pages/Checkout.tsx:432:21',
                                  'data-prohibitions': '[]',
                                  className: 'flex items-center gap-2 text-lg',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, {
                                      'data-uid': 'src/pages/Checkout.tsx:433:23',
                                      'data-prohibitions': '[editContent]',
                                      className: 'size-5 text-primary',
                                    }),
                                    ' Dados do Atendimento',
                                  ],
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                                  'data-uid': 'src/pages/Checkout.tsx:435:21',
                                  'data-prohibitions': '[]',
                                  children: 'Selecione o serviço base do agendamento ou manual.',
                                }),
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
                              'data-uid': 'src/pages/Checkout.tsx:439:19',
                              'data-prohibitions': '[editContent]',
                              className: 'pt-6 space-y-5',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                  'data-uid': 'src/pages/Checkout.tsx:440:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'space-y-2',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                      'data-uid': 'src/pages/Checkout.tsx:441:23',
                                      'data-prohibitions': '[]',
                                      children: 'Agendamento ou Modalidade',
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                      'data-uid': 'src/pages/Checkout.tsx:442:23',
                                      'data-prohibitions': '[editContent]',
                                      value: svcForm.appointment_id,
                                      onValueChange: handleAppointmentChange,
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                                          'data-uid': 'src/pages/Checkout.tsx:446:25',
                                          'data-prohibitions': '[]',
                                          className: 'h-12 border-primary/20 bg-primary/5',
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            SelectValue,
                                            {
                                              'data-uid': 'src/pages/Checkout.tsx:447:27',
                                              'data-prohibitions': '[editContent]',
                                              placeholder: 'Selecione para iniciar...',
                                            },
                                          ),
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                          SelectContent,
                                          {
                                            'data-uid': 'src/pages/Checkout.tsx:449:25',
                                            'data-prohibitions': '[editContent]',
                                            children: [
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                                SelectItem,
                                                {
                                                  'data-uid': 'src/pages/Checkout.tsx:450:27',
                                                  'data-prohibitions': '[]',
                                                  value: 'manual',
                                                  className: 'font-bold text-primary',
                                                  children: [
                                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                      Users,
                                                      {
                                                        'data-uid': 'src/pages/Checkout.tsx:451:29',
                                                        'data-prohibitions': '[editContent]',
                                                        className: 'size-4 inline mr-2',
                                                      },
                                                    ),
                                                    ' Novo Atendimento Avulso',
                                                  ],
                                                },
                                              ),
                                              appointments.map((a) =>
                                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                                  SelectItem,
                                                  {
                                                    'data-uid': 'src/pages/Checkout.tsx:454:29',
                                                    'data-prohibitions': '[editContent]',
                                                    value: a.id,
                                                    children: [
                                                      a.date
                                                        ? a.date
                                                            .substring(0, 10)
                                                            .split('-')
                                                            .reverse()
                                                            .join('/')
                                                        : '',
                                                      ' ',
                                                      'às ',
                                                      a.time,
                                                      ' - ',
                                                      a.expand?.client_id?.name,
                                                      ' (',
                                                      a.expand?.service_id?.name,
                                                      ')',
                                                    ],
                                                  },
                                                  a.id,
                                                ),
                                              ),
                                            ],
                                          },
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                                isManual &&
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Checkout.tsx:465:23',
                                    'data-prohibitions': '[editContent]',
                                    className:
                                      'space-y-4 p-5 bg-card border border-dashed border-primary/30 rounded-xl animate-fade-in',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('h4', {
                                        'data-uid': 'src/pages/Checkout.tsx:466:25',
                                        'data-prohibitions': '[]',
                                        className:
                                          'font-semibold text-primary flex items-center gap-2',
                                        children: [
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
                                            'data-uid': 'src/pages/Checkout.tsx:467:27',
                                            'data-prohibitions': '[editContent]',
                                            className: 'size-4',
                                          }),
                                          ' Serviço Base (Manual)',
                                        ],
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                        'data-uid': 'src/pages/Checkout.tsx:469:25',
                                        'data-prohibitions': '[editContent]',
                                        className: 'grid grid-cols-1 md:grid-cols-2 gap-4',
                                        children: [
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                            'data-uid': 'src/pages/Checkout.tsx:470:27',
                                            'data-prohibitions': '[editContent]',
                                            className: 'space-y-2',
                                            children: [
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                                'data-uid': 'src/pages/Checkout.tsx:471:29',
                                                'data-prohibitions': '[]',
                                                children: 'Cliente',
                                              }),
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                                'data-uid': 'src/pages/Checkout.tsx:472:29',
                                                'data-prohibitions': '[editContent]',
                                                value: manualForm.client_id,
                                                onValueChange: (v) => {
                                                  setManualForm({
                                                    ...manualForm,
                                                    client_id: v,
                                                    service_id: '',
                                                  })
                                                  setPackageToConsume(null)
                                                  setSvcForm((prev) => ({
                                                    ...prev,
                                                    service_price: '',
                                                  }))
                                                },
                                                children: [
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                    SelectTrigger,
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:480:31',
                                                      'data-prohibitions': '[]',
                                                      children: /* @__PURE__ */ (0,
                                                      import_jsx_runtime.jsx)(SelectValue, {
                                                        'data-uid': 'src/pages/Checkout.tsx:481:33',
                                                        'data-prohibitions': '[editContent]',
                                                        placeholder: 'Selecione...',
                                                      }),
                                                    },
                                                  ),
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                    SelectContent,
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:483:31',
                                                      'data-prohibitions': '[editContent]',
                                                      children: clients.map((c) =>
                                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                          SelectItem,
                                                          {
                                                            'data-uid':
                                                              'src/pages/Checkout.tsx:485:35',
                                                            'data-prohibitions': '[editContent]',
                                                            value: c.id,
                                                            children: c.name,
                                                          },
                                                          c.id,
                                                        ),
                                                      ),
                                                    },
                                                  ),
                                                ],
                                              }),
                                            ],
                                          }),
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                            'data-uid': 'src/pages/Checkout.tsx:492:27',
                                            'data-prohibitions': '[editContent]',
                                            className: 'space-y-2',
                                            children: [
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                                'data-uid': 'src/pages/Checkout.tsx:493:29',
                                                'data-prohibitions': '[]',
                                                children: 'Profissional',
                                              }),
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                                'data-uid': 'src/pages/Checkout.tsx:494:29',
                                                'data-prohibitions': '[editContent]',
                                                value: manualForm.barber_id,
                                                onValueChange: (v) =>
                                                  setManualForm({
                                                    ...manualForm,
                                                    barber_id: v,
                                                  }),
                                                children: [
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                    SelectTrigger,
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:498:31',
                                                      'data-prohibitions': '[]',
                                                      children: /* @__PURE__ */ (0,
                                                      import_jsx_runtime.jsx)(SelectValue, {
                                                        'data-uid': 'src/pages/Checkout.tsx:499:33',
                                                        'data-prohibitions': '[editContent]',
                                                        placeholder: 'Selecione...',
                                                      }),
                                                    },
                                                  ),
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                    SelectContent,
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:501:31',
                                                      'data-prohibitions': '[editContent]',
                                                      children: barbers.map((b) =>
                                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                          SelectItem,
                                                          {
                                                            'data-uid':
                                                              'src/pages/Checkout.tsx:503:35',
                                                            'data-prohibitions': '[editContent]',
                                                            value: b.id,
                                                            children: b.name,
                                                          },
                                                          b.id,
                                                        ),
                                                      ),
                                                    },
                                                  ),
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                        'data-uid': 'src/pages/Checkout.tsx:511:25',
                                        'data-prohibitions': '[editContent]',
                                        className: 'space-y-2',
                                        children: [
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                            'data-uid': 'src/pages/Checkout.tsx:512:27',
                                            'data-prohibitions': '[]',
                                            children: 'Serviço Principal',
                                          }),
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                            'data-uid': 'src/pages/Checkout.tsx:513:27',
                                            'data-prohibitions': '[editContent]',
                                            value: manualForm.service_id,
                                            onValueChange: (v) => {
                                              setManualForm({
                                                ...manualForm,
                                                service_id: v,
                                              })
                                              let price =
                                                services
                                                  .find((s) => s.id === v)
                                                  ?.price?.toString() || '0'
                                              let pkgToConsume = null
                                              if (manualForm.client_id) {
                                                const availablePkg = clientPackages.find(
                                                  (cp) =>
                                                    cp.client_id === manualForm.client_id &&
                                                    cp.expand?.package_id?.service_id === v,
                                                )
                                                if (
                                                  availablePkg &&
                                                  availablePkg.remaining_uses > 0
                                                ) {
                                                  price = '0'
                                                  pkgToConsume = availablePkg.id
                                                }
                                              }
                                              setPackageToConsume(pkgToConsume)
                                              setSvcForm((prev) => ({
                                                ...prev,
                                                service_price: price,
                                              }))
                                            },
                                            disabled: !manualForm.client_id,
                                            children: [
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                SelectTrigger,
                                                {
                                                  'data-uid': 'src/pages/Checkout.tsx:536:29',
                                                  'data-prohibitions': '[]',
                                                  children: /* @__PURE__ */ (0,
                                                  import_jsx_runtime.jsx)(SelectValue, {
                                                    'data-uid': 'src/pages/Checkout.tsx:537:31',
                                                    'data-prohibitions': '[editContent]',
                                                    placeholder: 'Selecione o serviço...',
                                                  }),
                                                },
                                              ),
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                SelectContent,
                                                {
                                                  'data-uid': 'src/pages/Checkout.tsx:539:29',
                                                  'data-prohibitions': '[editContent]',
                                                  children: services.map((s) =>
                                                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                                      SelectItem,
                                                      {
                                                        'data-uid': 'src/pages/Checkout.tsx:541:33',
                                                        'data-prohibitions': '[editContent]',
                                                        value: s.id,
                                                        children: [
                                                          s.name,
                                                          ' - R$ ',
                                                          s.price.toFixed(2),
                                                        ],
                                                      },
                                                      s.id,
                                                    ),
                                                  ),
                                                },
                                              ),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                  'data-uid': 'src/pages/Checkout.tsx:551:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'space-y-2',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                      'data-uid': 'src/pages/Checkout.tsx:552:23',
                                      'data-prohibitions': '[]',
                                      children: 'Valor do Serviço Base (R$)',
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                      'data-uid': 'src/pages/Checkout.tsx:553:23',
                                      'data-prohibitions': '[editContent]',
                                      className: 'flex flex-col gap-1',
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                                          'data-uid': 'src/pages/Checkout.tsx:554:25',
                                          'data-prohibitions': '[editContent]',
                                          type: 'number',
                                          step: '0.01',
                                          min: '0',
                                          value: svcForm.service_price,
                                          onChange: (e) =>
                                            setSvcForm({
                                              ...svcForm,
                                              service_price: e.target.value,
                                            }),
                                          className: 'text-lg h-12',
                                        }),
                                        packageToConsume &&
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                            'data-uid': 'src/pages/Checkout.tsx:565:27',
                                            'data-prohibitions': '[]',
                                            className:
                                              'text-xs font-medium text-emerald-500 flex items-center gap-1 mt-1',
                                            children: [
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
                                                'data-uid': 'src/pages/Checkout.tsx:566:29',
                                                'data-prohibitions': '[editContent]',
                                                className: 'size-3',
                                              }),
                                              ' Pacote do cliente aplicado automaticamente.',
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
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
                          'data-uid': 'src/pages/Checkout.tsx:574:17',
                          'data-prohibitions': '[editContent]',
                          className: 'border-border shadow-sm',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
                              'data-uid': 'src/pages/Checkout.tsx:575:19',
                              'data-prohibitions': '[]',
                              className: 'bg-muted/30 pb-4 border-b',
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
                                'data-uid': 'src/pages/Checkout.tsx:576:21',
                                'data-prohibitions': '[]',
                                className: 'flex items-center gap-2 text-lg',
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                                    'data-uid': 'src/pages/Checkout.tsx:577:23',
                                    'data-prohibitions': '[editContent]',
                                    className: 'size-5 text-primary',
                                  }),
                                  ' Serviços Adicionais & Extras',
                                ],
                              }),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
                              'data-uid': 'src/pages/Checkout.tsx:580:19',
                              'data-prohibitions': '[editContent]',
                              className: 'pt-6 space-y-6',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                  'data-uid': 'src/pages/Checkout.tsx:581:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'space-y-2',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                      'data-uid': 'src/pages/Checkout.tsx:582:23',
                                      'data-prohibitions': '[]',
                                      children: 'Serviço do Catálogo',
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                      'data-uid': 'src/pages/Checkout.tsx:583:23',
                                      'data-prohibitions': '[editContent]',
                                      className: 'flex gap-2',
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                          'data-uid': 'src/pages/Checkout.tsx:584:25',
                                          'data-prohibitions': '[editContent]',
                                          value: serviceToAdd,
                                          onValueChange: setServiceToAdd,
                                          children: [
                                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                              SelectTrigger,
                                              {
                                                'data-uid': 'src/pages/Checkout.tsx:585:27',
                                                'data-prohibitions': '[]',
                                                className: 'flex-1',
                                                children: /* @__PURE__ */ (0,
                                                import_jsx_runtime.jsx)(SelectValue, {
                                                  'data-uid': 'src/pages/Checkout.tsx:586:29',
                                                  'data-prohibitions': '[editContent]',
                                                  placeholder: 'Buscar serviço adicional...',
                                                }),
                                              },
                                            ),
                                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                              SelectContent,
                                              {
                                                'data-uid': 'src/pages/Checkout.tsx:588:27',
                                                'data-prohibitions': '[editContent]',
                                                children: services.map((s) =>
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                                    SelectItem,
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:590:31',
                                                      'data-prohibitions': '[editContent]',
                                                      value: s.id,
                                                      children: [
                                                        s.name,
                                                        ' - R$ ',
                                                        s.price.toFixed(2),
                                                      ],
                                                    },
                                                    s.id,
                                                  ),
                                                ),
                                              },
                                            ),
                                          ],
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                          'data-uid': 'src/pages/Checkout.tsx:596:25',
                                          'data-prohibitions': '[]',
                                          type: 'button',
                                          variant: 'secondary',
                                          onClick: handleAddService,
                                          children: 'Adicionar',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                  'data-uid': 'src/pages/Checkout.tsx:602:21',
                                  'data-prohibitions': '[]',
                                  className: 'space-y-2',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                      'data-uid': 'src/pages/Checkout.tsx:603:23',
                                      'data-prohibitions': '[]',
                                      children: 'Extra Manual',
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                      'data-uid': 'src/pages/Checkout.tsx:604:23',
                                      'data-prohibitions': '[]',
                                      className: 'flex gap-2 items-end',
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                                          'data-uid': 'src/pages/Checkout.tsx:605:25',
                                          'data-prohibitions': '[]',
                                          className: 'flex-1 space-y-1',
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            Input,
                                            {
                                              'data-uid': 'src/pages/Checkout.tsx:606:27',
                                              'data-prohibitions': '[editContent]',
                                              placeholder: 'Descrição do Extra',
                                              value: extraDesc,
                                              onChange: (e) => setExtraDesc(e.target.value),
                                            },
                                          ),
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                                          'data-uid': 'src/pages/Checkout.tsx:612:25',
                                          'data-prohibitions': '[]',
                                          className: 'w-32 space-y-1',
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            Input,
                                            {
                                              'data-uid': 'src/pages/Checkout.tsx:613:27',
                                              'data-prohibitions': '[editContent]',
                                              type: 'number',
                                              placeholder: 'Valor (R$)',
                                              min: '0',
                                              step: '0.01',
                                              value: extraPrice,
                                              onChange: (e) => setExtraPrice(e.target.value),
                                            },
                                          ),
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                          'data-uid': 'src/pages/Checkout.tsx:622:25',
                                          'data-prohibitions': '[]',
                                          type: 'button',
                                          variant: 'secondary',
                                          onClick: handleAddExtra,
                                          children: 'Adicionar',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (additionalServices.length > 0 || manualExtras.length > 0) &&
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Checkout.tsx:629:23',
                                    'data-prohibitions': '[editContent]',
                                    className: 'mt-4 space-y-2',
                                    children: [
                                      additionalServices.map((s) =>
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                          'div',
                                          {
                                            'data-uid': 'src/pages/Checkout.tsx:631:27',
                                            'data-prohibitions': '[editContent]',
                                            className:
                                              'flex justify-between items-center p-3 border rounded-lg animate-fade-in',
                                            children: [
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                                'data-uid': 'src/pages/Checkout.tsx:635:29',
                                                'data-prohibitions': '[editContent]',
                                                children: [
                                                  s.name,
                                                  ' ',
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                    'span',
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:637:31',
                                                      'data-prohibitions': '[]',
                                                      className:
                                                        'text-xs text-muted-foreground ml-1',
                                                      children: '(Catálogo)',
                                                    },
                                                  ),
                                                ],
                                              }),
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                                'data-uid': 'src/pages/Checkout.tsx:639:29',
                                                'data-prohibitions': '[editContent]',
                                                className: 'flex items-center gap-4',
                                                children: [
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                                    'span',
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:640:31',
                                                      'data-prohibitions': '[editContent]',
                                                      className: 'font-semibold',
                                                      children: ['R$ ', s.price.toFixed(2)],
                                                    },
                                                  ),
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                    Button,
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:641:31',
                                                      'data-prohibitions': '[]',
                                                      type: 'button',
                                                      variant: 'ghost',
                                                      size: 'icon',
                                                      onClick: () =>
                                                        setAdditionalServices((prev) =>
                                                          prev.filter((x) => x.id !== s.id),
                                                        ),
                                                      children: /* @__PURE__ */ (0,
                                                      import_jsx_runtime.jsx)(Trash2, {
                                                        'data-uid': 'src/pages/Checkout.tsx:649:33',
                                                        'data-prohibitions': '[editContent]',
                                                        className: 'size-4 text-destructive',
                                                      }),
                                                    },
                                                  ),
                                                ],
                                              }),
                                            ],
                                          },
                                          s.id,
                                        ),
                                      ),
                                      manualExtras.map((m) =>
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                          'div',
                                          {
                                            'data-uid': 'src/pages/Checkout.tsx:655:27',
                                            'data-prohibitions': '[editContent]',
                                            className:
                                              'flex justify-between items-center p-3 border rounded-lg animate-fade-in',
                                            children: [
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                                'data-uid': 'src/pages/Checkout.tsx:659:29',
                                                'data-prohibitions': '[editContent]',
                                                children: [
                                                  m.description,
                                                  ' ',
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                    'span',
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:661:31',
                                                      'data-prohibitions': '[]',
                                                      className:
                                                        'text-xs text-muted-foreground ml-1',
                                                      children: '(Manual)',
                                                    },
                                                  ),
                                                ],
                                              }),
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                                'data-uid': 'src/pages/Checkout.tsx:663:29',
                                                'data-prohibitions': '[editContent]',
                                                className: 'flex items-center gap-4',
                                                children: [
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                                    'span',
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:664:31',
                                                      'data-prohibitions': '[editContent]',
                                                      className: 'font-semibold',
                                                      children: ['R$ ', m.price.toFixed(2)],
                                                    },
                                                  ),
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                    Button,
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:665:31',
                                                      'data-prohibitions': '[]',
                                                      type: 'button',
                                                      variant: 'ghost',
                                                      size: 'icon',
                                                      onClick: () =>
                                                        setManualExtras((prev) =>
                                                          prev.filter((x) => x.id !== m.id),
                                                        ),
                                                      children: /* @__PURE__ */ (0,
                                                      import_jsx_runtime.jsx)(Trash2, {
                                                        'data-uid': 'src/pages/Checkout.tsx:673:33',
                                                        'data-prohibitions': '[editContent]',
                                                        className: 'size-4 text-destructive',
                                                      }),
                                                    },
                                                  ),
                                                ],
                                              }),
                                            ],
                                          },
                                          m.id,
                                        ),
                                      ),
                                    ],
                                  }),
                              ],
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
                          'data-uid': 'src/pages/Checkout.tsx:683:17',
                          'data-prohibitions': '[editContent]',
                          className: 'border-border shadow-sm',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
                              'data-uid': 'src/pages/Checkout.tsx:684:19',
                              'data-prohibitions': '[]',
                              className: 'bg-muted/30 pb-4 border-b',
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
                                'data-uid': 'src/pages/Checkout.tsx:685:21',
                                'data-prohibitions': '[]',
                                className: 'flex items-center gap-2 text-lg',
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
                                    'data-uid': 'src/pages/Checkout.tsx:686:23',
                                    'data-prohibitions': '[editContent]',
                                    className: 'size-5 text-primary',
                                  }),
                                  ' Venda de Produtos',
                                ],
                              }),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
                              'data-uid': 'src/pages/Checkout.tsx:689:19',
                              'data-prohibitions': '[editContent]',
                              className: 'pt-6',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                  'data-uid': 'src/pages/Checkout.tsx:690:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'flex gap-2',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                      'data-uid': 'src/pages/Checkout.tsx:691:23',
                                      'data-prohibitions': '[editContent]',
                                      value: productToAdd,
                                      onValueChange: setProductToAdd,
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                                          'data-uid': 'src/pages/Checkout.tsx:692:25',
                                          'data-prohibitions': '[]',
                                          className: 'flex-1 h-12',
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            SelectValue,
                                            {
                                              'data-uid': 'src/pages/Checkout.tsx:693:27',
                                              'data-prohibitions': '[editContent]',
                                              placeholder: 'Buscar produto...',
                                            },
                                          ),
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                                          'data-uid': 'src/pages/Checkout.tsx:695:25',
                                          'data-prohibitions': '[editContent]',
                                          children: products.map((p) =>
                                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                              SelectItem,
                                              {
                                                'data-uid': 'src/pages/Checkout.tsx:697:29',
                                                'data-prohibitions': '[editContent]',
                                                value: p.id,
                                                children: [p.name, ' - R$ ', p.price.toFixed(2)],
                                              },
                                              p.id,
                                            ),
                                          ),
                                        }),
                                      ],
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                      'data-uid': 'src/pages/Checkout.tsx:703:23',
                                      'data-prohibitions': '[]',
                                      type: 'button',
                                      variant: 'secondary',
                                      onClick: handleAddProduct,
                                      className: 'h-12 w-12 shrink-0',
                                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                                        'data-uid': 'src/pages/Checkout.tsx:709:25',
                                        'data-prohibitions': '[editContent]',
                                        className: 'size-5',
                                      }),
                                    }),
                                  ],
                                }),
                                selectedProducts.length > 0 &&
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Checkout.tsx:714:23',
                                    'data-prohibitions': '[editContent]',
                                    className: 'mt-6 space-y-3',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                        'data-uid': 'src/pages/Checkout.tsx:715:25',
                                        'data-prohibitions': '[]',
                                        className:
                                          'text-xs text-muted-foreground uppercase tracking-wider',
                                        children: 'Itens no Carrinho',
                                      }),
                                      selectedProducts.map((sp) =>
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                          'div',
                                          {
                                            'data-uid': 'src/pages/Checkout.tsx:719:27',
                                            'data-prohibitions': '[editContent]',
                                            className:
                                              'flex items-center justify-between gap-4 p-3 rounded-lg border bg-background shadow-sm animate-fade-in',
                                            children: [
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                                                'data-uid': 'src/pages/Checkout.tsx:723:29',
                                                'data-prohibitions': '[editContent]',
                                                className: 'flex-1 font-medium truncate',
                                                children: sp.product.name,
                                              }),
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                                'data-uid': 'src/pages/Checkout.tsx:724:29',
                                                'data-prohibitions': '[editContent]',
                                                className: 'flex items-center gap-3',
                                                children: [
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                    Input,
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:725:31',
                                                      'data-prohibitions': '[editContent]',
                                                      type: 'number',
                                                      className: 'w-16 h-9 text-center',
                                                      min: 1,
                                                      value: sp.quantity,
                                                      onChange: (e) => {
                                                        const qty = parseInt(e.target.value)
                                                        if (qty <= 0)
                                                          setSelectedProducts(
                                                            selectedProducts.filter(
                                                              (x) => x.product_id !== sp.product_id,
                                                            ),
                                                          )
                                                        else
                                                          setSelectedProducts(
                                                            selectedProducts.map((x) =>
                                                              x.product_id === sp.product_id
                                                                ? {
                                                                    ...x,
                                                                    quantity: qty,
                                                                  }
                                                                : x,
                                                            ),
                                                          )
                                                      },
                                                    },
                                                  ),
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                                    'div',
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:748:31',
                                                      'data-prohibitions': '[editContent]',
                                                      className: 'w-20 text-right font-semibold',
                                                      children: [
                                                        'R$ ',
                                                        (sp.product.price * sp.quantity).toFixed(2),
                                                      ],
                                                    },
                                                  ),
                                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                    Button,
                                                    {
                                                      'data-uid': 'src/pages/Checkout.tsx:751:31',
                                                      'data-prohibitions': '[]',
                                                      type: 'button',
                                                      variant: 'ghost',
                                                      size: 'icon',
                                                      className: 'h-8 w-8 text-destructive',
                                                      onClick: () =>
                                                        setSelectedProducts(
                                                          selectedProducts.filter(
                                                            (x) => x.product_id !== sp.product_id,
                                                          ),
                                                        ),
                                                      children: /* @__PURE__ */ (0,
                                                      import_jsx_runtime.jsx)(Trash2, {
                                                        'data-uid': 'src/pages/Checkout.tsx:762:33',
                                                        'data-prohibitions': '[editContent]',
                                                        className: 'size-4',
                                                      }),
                                                    },
                                                  ),
                                                ],
                                              }),
                                            ],
                                          },
                                          sp.product_id,
                                        ),
                                      ),
                                    ],
                                  }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                      'data-uid': 'src/pages/Checkout.tsx:773:15',
                      'data-prohibitions': '[editContent]',
                      className: 'lg:col-span-5',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
                        'data-uid': 'src/pages/Checkout.tsx:774:17',
                        'data-prohibitions': '[editContent]',
                        className: 'border-border shadow-md sticky top-20 bg-card overflow-hidden',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                            'data-uid': 'src/pages/Checkout.tsx:775:19',
                            'data-prohibitions': '[editContent]',
                            className: 'h-2 w-full bg-primary',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
                            'data-uid': 'src/pages/Checkout.tsx:776:19',
                            'data-prohibitions': '[]',
                            className: 'pb-4 border-b',
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
                              'data-uid': 'src/pages/Checkout.tsx:777:21',
                              'data-prohibitions': '[]',
                              className: 'flex items-center gap-2 text-xl',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptText, {
                                  'data-uid': 'src/pages/Checkout.tsx:778:23',
                                  'data-prohibitions': '[editContent]',
                                  className: 'size-5 text-primary',
                                }),
                                ' Resumo da Venda',
                              ],
                            }),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
                            'data-uid': 'src/pages/Checkout.tsx:781:19',
                            'data-prohibitions': '[editContent]',
                            className: 'pt-6 space-y-6',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                'data-uid': 'src/pages/Checkout.tsx:782:21',
                                'data-prohibitions': '[editContent]',
                                className: 'space-y-3',
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Checkout.tsx:783:23',
                                    'data-prohibitions': '[editContent]',
                                    className: 'flex justify-between text-sm',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                        'data-uid': 'src/pages/Checkout.tsx:784:25',
                                        'data-prohibitions': '[]',
                                        className: 'text-muted-foreground',
                                        children: 'Serviços e Extras',
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                        'data-uid': 'src/pages/Checkout.tsx:785:25',
                                        'data-prohibitions': '[editContent]',
                                        className: 'font-medium',
                                        children: [
                                          'R$ ',
                                          isNaN(servicesTotal) ? '0.00' : servicesTotal.toFixed(2),
                                        ],
                                      }),
                                    ],
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Checkout.tsx:789:23',
                                    'data-prohibitions': '[editContent]',
                                    className: 'flex justify-between text-sm',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                        'data-uid': 'src/pages/Checkout.tsx:790:25',
                                        'data-prohibitions': '[]',
                                        className: 'text-muted-foreground',
                                        children: 'Produtos',
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                        'data-uid': 'src/pages/Checkout.tsx:791:25',
                                        'data-prohibitions': '[editContent]',
                                        className: 'font-medium',
                                        children: ['R$ ', productsTotal.toFixed(2)],
                                      }),
                                    ],
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Checkout.tsx:794:23',
                                    'data-prohibitions': '[]',
                                    className: 'space-y-3 pt-4 border-t',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                        'data-uid': 'src/pages/Checkout.tsx:795:25',
                                        'data-prohibitions': '[]',
                                        children: 'Desconto',
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                        'data-uid': 'src/pages/Checkout.tsx:796:25',
                                        'data-prohibitions': '[]',
                                        className: 'flex gap-2',
                                        children: [
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                            'data-uid': 'src/pages/Checkout.tsx:797:27',
                                            'data-prohibitions': '[]',
                                            value: discount.type,
                                            onValueChange: (v) =>
                                              setDiscount({
                                                ...discount,
                                                type: v,
                                              }),
                                            children: [
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                SelectTrigger,
                                                {
                                                  'data-uid': 'src/pages/Checkout.tsx:803:29',
                                                  'data-prohibitions': '[]',
                                                  className: 'w-[130px]',
                                                  children: /* @__PURE__ */ (0,
                                                  import_jsx_runtime.jsx)(SelectValue, {
                                                    'data-uid': 'src/pages/Checkout.tsx:804:31',
                                                    'data-prohibitions': '[editContent]',
                                                  }),
                                                },
                                              ),
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                                SelectContent,
                                                {
                                                  'data-uid': 'src/pages/Checkout.tsx:806:29',
                                                  'data-prohibitions': '[]',
                                                  children: [
                                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                      SelectItem,
                                                      {
                                                        'data-uid': 'src/pages/Checkout.tsx:807:31',
                                                        'data-prohibitions': '[]',
                                                        value: 'fixed',
                                                        children: 'Fixo (R$)',
                                                      },
                                                    ),
                                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                                      SelectItem,
                                                      {
                                                        'data-uid': 'src/pages/Checkout.tsx:808:31',
                                                        'data-prohibitions': '[]',
                                                        value: 'percentage',
                                                        children: 'Percent (%)',
                                                      },
                                                    ),
                                                  ],
                                                },
                                              ),
                                            ],
                                          }),
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                                            'data-uid': 'src/pages/Checkout.tsx:811:27',
                                            'data-prohibitions': '[editContent]',
                                            type: 'number',
                                            min: '0',
                                            step: discount.type === 'percentage' ? '1' : '0.01',
                                            value: discount.value,
                                            onChange: (e) =>
                                              setDiscount({
                                                ...discount,
                                                value: parseFloat(e.target.value) || 0,
                                              }),
                                            className: 'flex-1',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
                                    'data-uid': 'src/pages/Checkout.tsx:824:23',
                                    'data-prohibitions': '[editContent]',
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Checkout.tsx:825:23',
                                    'data-prohibitions': '[editContent]',
                                    className: 'flex justify-between items-center pt-2',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                        'data-uid': 'src/pages/Checkout.tsx:826:25',
                                        'data-prohibitions': '[]',
                                        className: 'font-bold text-lg',
                                        children: 'Total Geral',
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                        'data-uid': 'src/pages/Checkout.tsx:827:25',
                                        'data-prohibitions': '[editContent]',
                                        className: 'font-bold text-2xl text-primary',
                                        children: ['R$ ', grandTotal.toFixed(2)],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                'data-uid': 'src/pages/Checkout.tsx:833:21',
                                'data-prohibitions': '[editContent]',
                                className: 'space-y-3 pt-4',
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                    'data-uid': 'src/pages/Checkout.tsx:834:23',
                                    'data-prohibitions': '[]',
                                    children: 'Forma de Pagamento',
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                    'data-uid': 'src/pages/Checkout.tsx:835:23',
                                    'data-prohibitions': '[editContent]',
                                    required: true,
                                    value: svcForm.payment_method,
                                    onValueChange: (v) =>
                                      setSvcForm({
                                        ...svcForm,
                                        payment_method: v,
                                      }),
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                                        'data-uid': 'src/pages/Checkout.tsx:840:25',
                                        'data-prohibitions': '[]',
                                        className: 'h-12 text-base',
                                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                          SelectValue,
                                          {
                                            'data-uid': 'src/pages/Checkout.tsx:841:27',
                                            'data-prohibitions': '[editContent]',
                                            placeholder: 'Selecione o pagamento...',
                                          },
                                        ),
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                                        'data-uid': 'src/pages/Checkout.tsx:843:25',
                                        'data-prohibitions': '[editContent]',
                                        children: paymentMethods.map((pm) =>
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            SelectItem,
                                            {
                                              'data-uid': 'src/pages/Checkout.tsx:845:29',
                                              'data-prohibitions': '[editContent]',
                                              value: pm.id,
                                              children: pm.name,
                                            },
                                            pm.id,
                                          ),
                                        ),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
                            'data-uid': 'src/pages/Checkout.tsx:853:19',
                            'data-prohibitions': '[]',
                            className: 'pb-8 px-6',
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                              'data-uid': 'src/pages/Checkout.tsx:854:21',
                              'data-prohibitions': '[]',
                              type: 'button',
                              onClick: () => {
                                if (!svcForm.payment_method)
                                  return toast({
                                    title: 'Selecione o método de pagamento',
                                    variant: 'destructive',
                                  })
                                if (!isManual && !svcForm.appointment_id)
                                  return toast({
                                    title: 'Selecione o agendamento',
                                    variant: 'destructive',
                                  })
                                setShowTicket(true)
                              },
                              disabled: isSubmitting || (!isManual && !svcForm.appointment_id),
                              size: 'lg',
                              className: 'w-full text-base h-14 shadow-lg font-bold',
                              children: 'Revisar e Finalizar',
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
                'data-uid': 'src/pages/Checkout.tsx:878:11',
                'data-prohibitions': '[editContent]',
                value: 'package',
                className: 'space-y-6',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
                  'data-uid': 'src/pages/Checkout.tsx:879:13',
                  'data-prohibitions': '[editContent]',
                  className: 'max-w-2xl mx-auto border-border shadow-sm',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                      'data-uid': 'src/pages/Checkout.tsx:880:15',
                      'data-prohibitions': '[]',
                      className: 'bg-muted/30 pb-4 border-b',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
                          'data-uid': 'src/pages/Checkout.tsx:881:17',
                          'data-prohibitions': '[]',
                          className: 'text-xl flex items-center gap-2',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, {
                              'data-uid': 'src/pages/Checkout.tsx:882:19',
                              'data-prohibitions': '[editContent]',
                              className: 'size-5 text-primary',
                            }),
                            ' Vender Novo Pacote',
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                          'data-uid': 'src/pages/Checkout.tsx:884:17',
                          'data-prohibitions': '[]',
                          children: 'Selecione o cliente, pacote e quem está vendendo.',
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
                      'data-uid': 'src/pages/Checkout.tsx:886:15',
                      'data-prohibitions': '[editContent]',
                      className: 'pt-6',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
                        'data-uid': 'src/pages/Checkout.tsx:887:17',
                        'data-prohibitions': '[editContent]',
                        onSubmit: handleSellPackage,
                        className: 'space-y-5',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                            'data-uid': 'src/pages/Checkout.tsx:888:19',
                            'data-prohibitions': '[editContent]',
                            className: 'grid grid-cols-1 md:grid-cols-2 gap-5',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                'data-uid': 'src/pages/Checkout.tsx:889:21',
                                'data-prohibitions': '[editContent]',
                                className: 'space-y-2',
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                    'data-uid': 'src/pages/Checkout.tsx:890:23',
                                    'data-prohibitions': '[]',
                                    children: 'Profissional (Vendedor)',
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                    'data-uid': 'src/pages/Checkout.tsx:891:23',
                                    'data-prohibitions': '[editContent]',
                                    required: true,
                                    value: pkgForm.barber_id,
                                    onValueChange: (v) =>
                                      setPkgForm({
                                        ...pkgForm,
                                        barber_id: v,
                                      }),
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                                        'data-uid': 'src/pages/Checkout.tsx:896:25',
                                        'data-prohibitions': '[]',
                                        className: 'h-12',
                                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                          SelectValue,
                                          {
                                            'data-uid': 'src/pages/Checkout.tsx:897:27',
                                            'data-prohibitions': '[editContent]',
                                            placeholder: 'Quem vendeu?',
                                          },
                                        ),
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                                        'data-uid': 'src/pages/Checkout.tsx:899:25',
                                        'data-prohibitions': '[editContent]',
                                        children: barbers.map((b) =>
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            SelectItem,
                                            {
                                              'data-uid': 'src/pages/Checkout.tsx:901:29',
                                              'data-prohibitions': '[editContent]',
                                              value: b.id,
                                              children: b.name,
                                            },
                                            b.id,
                                          ),
                                        ),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                'data-uid': 'src/pages/Checkout.tsx:908:21',
                                'data-prohibitions': '[editContent]',
                                className: 'space-y-2',
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                    'data-uid': 'src/pages/Checkout.tsx:909:23',
                                    'data-prohibitions': '[]',
                                    children: 'Cliente',
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                    'data-uid': 'src/pages/Checkout.tsx:910:23',
                                    'data-prohibitions': '[editContent]',
                                    required: true,
                                    value: pkgForm.client_id,
                                    onValueChange: (v) =>
                                      setPkgForm({
                                        ...pkgForm,
                                        client_id: v,
                                      }),
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                                        'data-uid': 'src/pages/Checkout.tsx:915:25',
                                        'data-prohibitions': '[]',
                                        className: 'h-12',
                                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                          SelectValue,
                                          {
                                            'data-uid': 'src/pages/Checkout.tsx:916:27',
                                            'data-prohibitions': '[editContent]',
                                            placeholder: 'Para qual cliente?',
                                          },
                                        ),
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                                        'data-uid': 'src/pages/Checkout.tsx:918:25',
                                        'data-prohibitions': '[editContent]',
                                        children: clients.map((c) =>
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                            SelectItem,
                                            {
                                              'data-uid': 'src/pages/Checkout.tsx:920:29',
                                              'data-prohibitions': '[editContent]',
                                              value: c.id,
                                              children: [c.name, ' ', c.surname || ''],
                                            },
                                            c.id,
                                          ),
                                        ),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                            'data-uid': 'src/pages/Checkout.tsx:929:19',
                            'data-prohibitions': '[editContent]',
                            className: 'space-y-2',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                'data-uid': 'src/pages/Checkout.tsx:930:21',
                                'data-prohibitions': '[]',
                                children: 'Pacote',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                'data-uid': 'src/pages/Checkout.tsx:931:21',
                                'data-prohibitions': '[editContent]',
                                required: true,
                                value: pkgForm.package_id,
                                onValueChange: (v) =>
                                  setPkgForm({
                                    ...pkgForm,
                                    package_id: v,
                                  }),
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                                    'data-uid': 'src/pages/Checkout.tsx:936:23',
                                    'data-prohibitions': '[]',
                                    className: 'h-12',
                                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      SelectValue,
                                      {
                                        'data-uid': 'src/pages/Checkout.tsx:937:25',
                                        'data-prohibitions': '[editContent]',
                                        placeholder: 'Selecione o pacote...',
                                      },
                                    ),
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                                    'data-uid': 'src/pages/Checkout.tsx:939:23',
                                    'data-prohibitions': '[editContent]',
                                    children: packages.map((p) =>
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                        SelectItem,
                                        {
                                          'data-uid': 'src/pages/Checkout.tsx:941:27',
                                          'data-prohibitions': '[editContent]',
                                          value: p.id,
                                          children: [
                                            p.name,
                                            ' - R$ ',
                                            p.price.toFixed(2),
                                            ' (',
                                            p.quantity,
                                            'x)',
                                          ],
                                        },
                                        p.id,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                            'data-uid': 'src/pages/Checkout.tsx:949:19',
                            'data-prohibitions': '[editContent]',
                            className: 'space-y-2',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                'data-uid': 'src/pages/Checkout.tsx:950:21',
                                'data-prohibitions': '[]',
                                children: 'Método de Pagamento',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                                'data-uid': 'src/pages/Checkout.tsx:951:21',
                                'data-prohibitions': '[editContent]',
                                required: true,
                                value: pkgForm.payment_method,
                                onValueChange: (v) =>
                                  setPkgForm({
                                    ...pkgForm,
                                    payment_method: v,
                                  }),
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                                    'data-uid': 'src/pages/Checkout.tsx:956:23',
                                    'data-prohibitions': '[]',
                                    className: 'h-12',
                                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      SelectValue,
                                      {
                                        'data-uid': 'src/pages/Checkout.tsx:957:25',
                                        'data-prohibitions': '[editContent]',
                                        placeholder: 'Selecione o pagamento...',
                                      },
                                    ),
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                                    'data-uid': 'src/pages/Checkout.tsx:959:23',
                                    'data-prohibitions': '[editContent]',
                                    children: paymentMethods.map((pm) =>
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                        SelectItem,
                                        {
                                          'data-uid': 'src/pages/Checkout.tsx:961:27',
                                          'data-prohibitions': '[editContent]',
                                          value: pm.id,
                                          children: pm.name,
                                        },
                                        pm.id,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                            'data-uid': 'src/pages/Checkout.tsx:969:19',
                            'data-prohibitions': '[editContent]',
                            type: 'submit',
                            className: 'w-full h-14 text-base font-bold shadow-md mt-4',
                            disabled: isSubmitting,
                            children: isSubmitting ? 'Processando...' : 'Confirmar Venda de Pacote',
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
                'data-uid': 'src/pages/Checkout.tsx:981:11',
                'data-prohibitions': '[]',
                value: 'history',
                className: 'space-y-6',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutHistory, {
                  'data-uid': 'src/pages/Checkout.tsx:982:13',
                  'data-prohibitions': '[editContent]',
                }),
              }),
            ],
          }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
        'data-uid': 'src/pages/Checkout.tsx:987:7',
        'data-prohibitions': '[editContent]',
        open: showTicket,
        onOpenChange: setShowTicket,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
          'data-uid': 'src/pages/Checkout.tsx:988:9',
          'data-prohibitions': '[editContent]',
          className: 'max-w-md',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
              'data-uid': 'src/pages/Checkout.tsx:989:11',
              'data-prohibitions': '[]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
                'data-uid': 'src/pages/Checkout.tsx:990:13',
                'data-prohibitions': '[]',
                children: 'Ticket de Resumo',
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/pages/Checkout.tsx:992:11',
              'data-prohibitions': '[editContent]',
              className: 'space-y-4 text-sm mt-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Checkout.tsx:993:13',
                  'data-prohibitions': '[editContent]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                      'data-uid': 'src/pages/Checkout.tsx:994:15',
                      'data-prohibitions': '[]',
                      className: 'text-muted-foreground',
                      children: 'Cliente:',
                    }),
                    ' ',
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                      'data-uid': 'src/pages/Checkout.tsx:995:15',
                      'data-prohibitions': '[editContent]',
                      className: 'font-semibold text-base',
                      children: ticketClientName || 'Não identificado',
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
                  'data-uid': 'src/pages/Checkout.tsx:1000:13',
                  'data-prohibitions': '[editContent]',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                  'data-uid': 'src/pages/Checkout.tsx:1002:13',
                  'data-prohibitions': '[]',
                  className: 'font-semibold uppercase text-xs tracking-wider',
                  children: 'Serviços e Extras',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Checkout.tsx:1003:13',
                  'data-prohibitions': '[editContent]',
                  className: 'flex justify-between',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                      'data-uid': 'src/pages/Checkout.tsx:1004:15',
                      'data-prohibitions': '[editContent]',
                      children: [
                        ticketServiceName || 'Serviço Base',
                        ' ',
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                          'data-uid': 'src/pages/Checkout.tsx:1006:17',
                          'data-prohibitions': '[]',
                          className: 'text-muted-foreground text-xs',
                          children: '(Agendado)',
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                      'data-uid': 'src/pages/Checkout.tsx:1008:15',
                      'data-prohibitions': '[editContent]',
                      children: ['R$ ', scheduledPrice.toFixed(2)],
                    }),
                  ],
                }),
                additionalServices.map((s) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    'div',
                    {
                      'data-uid': 'src/pages/Checkout.tsx:1011:15',
                      'data-prohibitions': '[editContent]',
                      className: 'flex justify-between',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                          'data-uid': 'src/pages/Checkout.tsx:1012:17',
                          'data-prohibitions': '[editContent]',
                          children: s.name,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                          'data-uid': 'src/pages/Checkout.tsx:1013:17',
                          'data-prohibitions': '[editContent]',
                          children: ['R$ ', s.price.toFixed(2)],
                        }),
                      ],
                    },
                    s.id,
                  ),
                ),
                manualExtras.map((m) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    'div',
                    {
                      'data-uid': 'src/pages/Checkout.tsx:1017:15',
                      'data-prohibitions': '[editContent]',
                      className: 'flex justify-between text-muted-foreground',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                          'data-uid': 'src/pages/Checkout.tsx:1018:17',
                          'data-prohibitions': '[editContent]',
                          children: [m.description, ' (Extra)'],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                          'data-uid': 'src/pages/Checkout.tsx:1019:17',
                          'data-prohibitions': '[editContent]',
                          children: ['R$ ', m.price.toFixed(2)],
                        }),
                      ],
                    },
                    m.id,
                  ),
                ),
                selectedProducts.length > 0 &&
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
                        'data-uid': 'src/pages/Checkout.tsx:1025:17',
                        'data-prohibitions': '[editContent]',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                        'data-uid': 'src/pages/Checkout.tsx:1026:17',
                        'data-prohibitions': '[]',
                        className: 'font-semibold uppercase text-xs tracking-wider',
                        children: 'Produtos',
                      }),
                      selectedProducts.map((p) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                          'div',
                          {
                            'data-uid': 'src/pages/Checkout.tsx:1028:19',
                            'data-prohibitions': '[editContent]',
                            className: 'flex justify-between',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                'data-uid': 'src/pages/Checkout.tsx:1029:21',
                                'data-prohibitions': '[editContent]',
                                children: [p.quantity, 'x ', p.product.name],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                                'data-uid': 'src/pages/Checkout.tsx:1032:21',
                                'data-prohibitions': '[editContent]',
                                children: ['R$ ', (p.quantity * p.product.price).toFixed(2)],
                              }),
                            ],
                          },
                          p.product_id,
                        ),
                      ),
                    ],
                  }),
                discountAmount > 0 &&
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
                        'data-uid': 'src/pages/Checkout.tsx:1040:17',
                        'data-prohibitions': '[editContent]',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                        'data-uid': 'src/pages/Checkout.tsx:1041:17',
                        'data-prohibitions': '[editContent]',
                        className: 'flex justify-between text-destructive font-medium',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                            'data-uid': 'src/pages/Checkout.tsx:1042:19',
                            'data-prohibitions': '[]',
                            children: 'Desconto Aplicado',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                            'data-uid': 'src/pages/Checkout.tsx:1043:19',
                            'data-prohibitions': '[editContent]',
                            children: ['- R$ ', discountAmount.toFixed(2)],
                          }),
                        ],
                      }),
                    ],
                  }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
                  'data-uid': 'src/pages/Checkout.tsx:1048:13',
                  'data-prohibitions': '[editContent]',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Checkout.tsx:1049:13',
                  'data-prohibitions': '[editContent]',
                  className: 'flex justify-between font-bold text-xl pt-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                      'data-uid': 'src/pages/Checkout.tsx:1050:15',
                      'data-prohibitions': '[]',
                      children: 'Total a Pagar',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('span', {
                      'data-uid': 'src/pages/Checkout.tsx:1051:15',
                      'data-prohibitions': '[editContent]',
                      children: ['R$ ', grandTotal.toFixed(2)],
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
              'data-uid': 'src/pages/Checkout.tsx:1054:11',
              'data-prohibitions': '[editContent]',
              className: 'mt-6',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/pages/Checkout.tsx:1055:13',
                  'data-prohibitions': '[]',
                  variant: 'outline',
                  onClick: () => setShowTicket(false),
                  children: 'Voltar',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/pages/Checkout.tsx:1058:13',
                  'data-prohibitions': '[editContent]',
                  onClick: handleCloseService,
                  disabled: isSubmitting,
                  children: isSubmitting ? 'Processando...' : 'Confirmar e Cobrar',
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  })
}
//#endregion
export { Checkout as default }

//# sourceMappingURL=Checkout-wVTdRjai.js.map
