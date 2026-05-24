import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-CpkZU50A.js'
import { n as Upload, t as ImportDialog } from './ImportDialog-B5cY4_H6.js'
import { t as Pencil } from './pencil-Cxi7R3cs.js'
import { t as Plus } from './plus-B2osS5qf.js'
import { t as SquarePen } from './square-pen-YHd6bD3E.js'
import { t as Trash2 } from './trash-2-D5iz36Pd.js'
import {
  A as Close,
  F as Root,
  H as Input,
  I as Title,
  J as cn,
  L as Trigger,
  M as Description,
  N as Overlay,
  P as Portal,
  Q as Truck,
  R as WarningProvider,
  S as DialogTitle,
  U as Button,
  W as buttonVariants,
  Z as Users,
  _ as Dialog,
  a as pb,
  b as DialogFooter,
  bt as useToast,
  c as SelectContent,
  f as SelectTrigger,
  gt as createContextScope,
  ht as createSlottable,
  i as useAuth,
  j as Content,
  lt as createLucideIcon,
  n as useRealtime,
  p as SelectValue,
  r as usePermissions,
  s as Select,
  t as Label,
  tt as Package,
  u as SelectItem,
  v as DialogContent,
  vt as useComposedRefs,
  x as DialogHeader,
  yt as composeEventHandlers,
  z as createDialogScope,
} from './index-CvpHv2Ny.js'
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from './tabs-BAoDXqxV.js'
import { t as extractFieldErrors } from './errors-BKAVhdtr.js'
import {
  a as CardHeader,
  n as CardContent,
  o as CardTitle,
  r as CardDescription,
  t as Card,
} from './card-CkI-50fb.js'
import {
  a as TableHeader,
  i as TableHead,
  n as TableBody,
  o as TableRow,
  r as TableCell,
  t as Table,
} from './table-IkAPGYyL.js'
import { t as Badge } from './badge-Dk-n5f2N.js'
import { t as Switch } from './switch-CmRLveBk.js'
import {
  i as updateCategory,
  n as deleteCategory,
  r as getCategories,
  t as createCategory,
} from './categories-DCL9PYAm.js'
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
//#endregion
//#region src/lib/tiers.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var TIER_LIMITS = {
  Free: {
    barbers: 1,
    clients: 10,
  },
  Basic: {
    barbers: 3,
    clients: Infinity,
  },
  Pro: {
    barbers: 7,
    clients: Infinity,
  },
  Platinum: {
    barbers: Infinity,
    clients: Infinity,
  },
}
//#endregion
//#region ../../cache/modules/barbearia-pro-cee5d/node_modules/.pnpm/@radix-ui+react-alert-dialog@1.1.15_@types+react-dom@19.2.3_@types+react@19.2.14__@type_6e0a7cb35458ca16bb65361e77642bec/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
var import_jsx_runtime = require_jsx_runtime()
var ROOT_NAME = 'AlertDialog'
var [createAlertDialogContext, createAlertDialogScope] = createContextScope(ROOT_NAME, [
  createDialogScope,
])
var useDialogScope = createDialogScope()
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props
  const dialogScope = useDialogScope(__scopeAlertDialog)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
    ...dialogScope,
    ...alertDialogProps,
    modal: true,
  })
}
AlertDialog$1.displayName = ROOT_NAME
var TRIGGER_NAME = 'AlertDialogTrigger'
var AlertDialogTrigger = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...triggerProps } = props
  const dialogScope = useDialogScope(__scopeAlertDialog)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
    ...dialogScope,
    ...triggerProps,
    ref: forwardedRef,
  })
})
AlertDialogTrigger.displayName = TRIGGER_NAME
var PORTAL_NAME = 'AlertDialogPortal'
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props
  const dialogScope = useDialogScope(__scopeAlertDialog)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
    ...dialogScope,
    ...portalProps,
  })
}
AlertDialogPortal$1.displayName = PORTAL_NAME
var OVERLAY_NAME = 'AlertDialogOverlay'
var AlertDialogOverlay$1 = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...overlayProps } = props
  const dialogScope = useDialogScope(__scopeAlertDialog)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
    ...dialogScope,
    ...overlayProps,
    ref: forwardedRef,
  })
})
AlertDialogOverlay$1.displayName = OVERLAY_NAME
var CONTENT_NAME = 'AlertDialogContent'
var [AlertDialogContentProvider, useAlertDialogContentContext] =
  createAlertDialogContext(CONTENT_NAME)
var Slottable = createSlottable('AlertDialogContent')
var AlertDialogContent$1 = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, children, ...contentProps } = props
  const dialogScope = useDialogScope(__scopeAlertDialog)
  const contentRef = import_react.useRef(null)
  const composedRefs = useComposedRefs(forwardedRef, contentRef)
  const cancelRef = import_react.useRef(null)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningProvider, {
    contentName: CONTENT_NAME,
    titleName: TITLE_NAME,
    docsSlug: 'alert-dialog',
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContentProvider, {
      scope: __scopeAlertDialog,
      cancelRef,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
        role: 'alertdialog',
        ...dialogScope,
        ...contentProps,
        ref: composedRefs,
        onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
          event.preventDefault()
          cancelRef.current?.focus({ preventScroll: true })
        }),
        onPointerDownOutside: (event) => event.preventDefault(),
        onInteractOutside: (event) => event.preventDefault(),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slottable, { children }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionWarning, { contentRef }),
        ],
      }),
    }),
  })
})
AlertDialogContent$1.displayName = CONTENT_NAME
var TITLE_NAME = 'AlertDialogTitle'
var AlertDialogTitle$1 = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...titleProps } = props
  const dialogScope = useDialogScope(__scopeAlertDialog)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
    ...dialogScope,
    ...titleProps,
    ref: forwardedRef,
  })
})
AlertDialogTitle$1.displayName = TITLE_NAME
var DESCRIPTION_NAME = 'AlertDialogDescription'
var AlertDialogDescription$1 = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props
  const dialogScope = useDialogScope(__scopeAlertDialog)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
    ...dialogScope,
    ...descriptionProps,
    ref: forwardedRef,
  })
})
AlertDialogDescription$1.displayName = DESCRIPTION_NAME
var ACTION_NAME = 'AlertDialogAction'
var AlertDialogAction$1 = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...actionProps } = props
  const dialogScope = useDialogScope(__scopeAlertDialog)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
    ...dialogScope,
    ...actionProps,
    ref: forwardedRef,
  })
})
AlertDialogAction$1.displayName = ACTION_NAME
var CANCEL_NAME = 'AlertDialogCancel'
var AlertDialogCancel$1 = import_react.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...cancelProps } = props
  const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog)
  const dialogScope = useDialogScope(__scopeAlertDialog)
  const ref = useComposedRefs(forwardedRef, cancelRef)
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
    ...dialogScope,
    ...cancelProps,
    ref,
  })
})
AlertDialogCancel$1.displayName = CANCEL_NAME
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`
  import_react.useEffect(() => {
    if (!document.getElementById(contentRef.current?.getAttribute('aria-describedby')))
      console.warn(MESSAGE)
  }, [MESSAGE, contentRef])
  return null
}
var Root2 = AlertDialog$1
var Portal2 = AlertDialogPortal$1
var Overlay2 = AlertDialogOverlay$1
var Content2 = AlertDialogContent$1
var Action = AlertDialogAction$1
var Cancel = AlertDialogCancel$1
var Title2 = AlertDialogTitle$1
var Description2 = AlertDialogDescription$1
//#endregion
//#region src/components/ui/alert-dialog.tsx
var AlertDialog = Root2
var AlertDialogPortal = Portal2
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
    'data-uid': 'src/components/ui/alert-dialog.tsx:18:3',
    'data-prohibitions': '[editContent]',
    className: cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    ),
    ...props,
    ref,
  }),
)
AlertDialogOverlay.displayName = Overlay2.displayName
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, {
    'data-uid': 'src/components/ui/alert-dialog.tsx:33:3',
    'data-prohibitions': '[editContent]',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {
        'data-uid': 'src/components/ui/alert-dialog.tsx:34:5',
        'data-prohibitions': '[editContent]',
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
        'data-uid': 'src/components/ui/alert-dialog.tsx:35:5',
        'data-prohibitions': '[editContent]',
        ref,
        className: cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          className,
        ),
        ...props,
      }),
    ],
  }),
)
AlertDialogContent.displayName = Content2.displayName
var AlertDialogHeader = ({ className, ...props }) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-uid': 'src/components/ui/alert-dialog.tsx:48:3',
    'data-prohibitions': '[editContent]',
    className: cn('flex flex-col space-y-2 text-center sm:text-left', className),
    ...props,
  })
AlertDialogHeader.displayName = 'AlertDialogHeader'
var AlertDialogFooter = ({ className, ...props }) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
    'data-uid': 'src/components/ui/alert-dialog.tsx:53:3',
    'data-prohibitions': '[editContent]',
    className: cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className),
    ...props,
  })
AlertDialogFooter.displayName = 'AlertDialogFooter'
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
    'data-uid': 'src/components/ui/alert-dialog.tsx:64:3',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn('text-lg font-semibold', className),
    ...props,
  }),
)
AlertDialogTitle.displayName = Title2.displayName
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
    'data-uid': 'src/components/ui/alert-dialog.tsx:76:3',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn('text-sm text-muted-foreground', className),
    ...props,
  }),
)
AlertDialogDescription.displayName = Description2.displayName
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
    'data-uid': 'src/components/ui/alert-dialog.tsx:88:3',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn(buttonVariants(), className),
    ...props,
  }),
)
AlertDialogAction.displayName = Action.displayName
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
    'data-uid': 'src/components/ui/alert-dialog.tsx:96:3',
    'data-prohibitions': '[editContent]',
    ref,
    className: cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className),
    ...props,
  }),
)
AlertDialogCancel.displayName = Cancel.displayName
//#endregion
//#region src/pages/produtos-categorias/CategoriasTab.tsx
function CategoriasTab() {
  const [categories, setCategories] = (0, import_react.useState)([])
  const [loading, setLoading] = (0, import_react.useState)(true)
  const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false)
  const [editingId, setEditingId] = (0, import_react.useState)(null)
  const [formData, setFormData] = (0, import_react.useState)({
    name: '',
    type: 'product',
    commission_percentage: '',
  })
  const [errors, setErrors] = (0, import_react.useState)({})
  const [deletePromptId, setDeletePromptId] = (0, import_react.useState)(null)
  const { toast } = useToast()
  const loadData = async () => {
    try {
      setCategories(await getCategories())
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  ;(0, import_react.useEffect)(() => {
    loadData()
  }, [])
  useRealtime('categories', () => {
    loadData()
  })
  const openDialog = (cat) => {
    setErrors({})
    if (cat) {
      setEditingId(cat.id)
      setFormData({
        name: cat.name || '',
        type: cat.type || 'product',
        commission_percentage: cat.commission_percentage?.toString() || '',
      })
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        type: 'product',
        commission_percentage: '',
      })
    }
    setDialogOpen(true)
  }
  const handleSave = async () => {
    setErrors({})
    if (formData.commission_percentage) {
      const p = Number(formData.commission_percentage)
      if (isNaN(p) || p < 0 || p > 100) {
        setErrors({ commission_percentage: 'O valor deve estar entre 0 e 100' })
        return
      }
    }
    try {
      const payload = {
        name: formData.name,
        type: formData.type,
        commission_percentage: formData.commission_percentage
          ? Number(formData.commission_percentage)
          : null,
      }
      if (editingId) {
        await updateCategory(editingId, payload)
        toast({ title: 'Categoria atualizada' })
      } else {
        await createCategory(payload)
        toast({ title: 'Categoria criada' })
      }
      setDialogOpen(false)
    } catch (err) {
      const fieldErrs = extractFieldErrors(err)
      if (Object.keys(fieldErrs).length > 0) setErrors(fieldErrs)
      else
        toast({
          title: 'Erro ao salvar',
          description: err.message,
          variant: 'destructive',
        })
    }
  }
  const confirmDelete = async () => {
    if (!deletePromptId) return
    try {
      await deleteCategory(deletePromptId)
      toast({ title: 'Categoria excluída' })
      setDeletePromptId(null)
    } catch (err) {
      toast({
        title: 'Erro ao excluir',
        description: err.message,
        variant: 'destructive',
      })
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:152:5',
    'data-prohibitions': '[editContent]',
    className: 'space-y-4',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:153:7',
        'data-prohibitions': '[]',
        className: 'flex justify-between items-center',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:154:9',
            'data-prohibitions': '[]',
            className: 'text-lg font-semibold',
            children: 'Listagem de Categorias',
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:155:9',
            'data-prohibitions': '[]',
            onClick: () => openDialog(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:156:11',
                'data-prohibitions': '[editContent]',
                className: 'size-4 mr-2',
              }),
              'Nova Categoria',
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:161:7',
        'data-prohibitions': '[editContent]',
        className: 'border rounded-md',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
          'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:162:9',
          'data-prohibitions': '[editContent]',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:163:11',
              'data-prohibitions': '[]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
                'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:164:13',
                'data-prohibitions': '[]',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:165:15',
                    'data-prohibitions': '[]',
                    children: 'Nome',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:166:15',
                    'data-prohibitions': '[]',
                    children: 'Tipo',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:167:15',
                    'data-prohibitions': '[]',
                    children: 'Comissão (%)',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:168:15',
                    'data-prohibitions': '[]',
                    className: 'text-right',
                    children: 'Ações',
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:171:11',
              'data-prohibitions': '[editContent]',
              children: loading
                ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                    'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:173:15',
                    'data-prohibitions': '[]',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                      'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:174:17',
                      'data-prohibitions': '[]',
                      colSpan: 4,
                      className: 'text-center py-6 text-muted-foreground',
                      children: 'Carregando...',
                    }),
                  })
                : categories.length === 0
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                      'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:179:15',
                      'data-prohibitions': '[]',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                        'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:180:17',
                        'data-prohibitions': '[]',
                        colSpan: 4,
                        className: 'text-center py-6 text-muted-foreground',
                        children: 'Nenhuma categoria encontrada.',
                      }),
                    })
                  : categories.map((cat) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        TableRow,
                        {
                          'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:186:17',
                          'data-prohibitions': '[editContent]',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:187:19',
                              'data-prohibitions': '[editContent]',
                              className: 'font-medium',
                              children: cat.name,
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:188:19',
                              'data-prohibitions': '[editContent]',
                              children: cat.type === 'service' ? 'Serviço' : 'Produto',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:189:19',
                              'data-prohibitions': '[editContent]',
                              children: cat.commission_percentage ?? '-',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
                              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:190:19',
                              'data-prohibitions': '[]',
                              className: 'text-right space-x-2',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                  'data-uid':
                                    'src/pages/produtos-categorias/CategoriasTab.tsx:191:21',
                                  'data-prohibitions': '[]',
                                  variant: 'ghost',
                                  size: 'icon',
                                  onClick: () => openDialog(cat),
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
                                    'data-uid':
                                      'src/pages/produtos-categorias/CategoriasTab.tsx:192:23',
                                    'data-prohibitions': '[editContent]',
                                    className: 'size-4 text-muted-foreground',
                                  }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                  'data-uid':
                                    'src/pages/produtos-categorias/CategoriasTab.tsx:194:21',
                                  'data-prohibitions': '[]',
                                  variant: 'ghost',
                                  size: 'icon',
                                  onClick: () => setDeletePromptId(cat.id),
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
                                    'data-uid':
                                      'src/pages/produtos-categorias/CategoriasTab.tsx:195:23',
                                    'data-prohibitions': '[editContent]',
                                    className: 'size-4 text-destructive/80 hover:text-destructive',
                                  }),
                                }),
                              ],
                            }),
                          ],
                        },
                        cat.id,
                      ),
                    ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
        'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:205:7',
        'data-prohibitions': '[editContent]',
        open: dialogOpen,
        onOpenChange: setDialogOpen,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
          'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:206:9',
          'data-prohibitions': '[editContent]',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:207:11',
              'data-prohibitions': '[editContent]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
                'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:208:13',
                'data-prohibitions': '[editContent]',
                children: editingId ? 'Editar Categoria' : 'Nova Categoria',
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:210:11',
              'data-prohibitions': '[editContent]',
              className: 'space-y-4 py-4',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:211:13',
                  'data-prohibitions': '[editContent]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:212:15',
                      'data-prohibitions': '[]',
                      children: 'Nome *',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:213:15',
                      'data-prohibitions': '[editContent]',
                      value: formData.name,
                      onChange: (e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        }),
                      placeholder: 'Ex: Cabelo, Barba, Pomadas...',
                    }),
                    errors.name &&
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                        'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:218:31',
                        'data-prohibitions': '[editContent]',
                        className: 'text-sm text-destructive font-medium',
                        children: errors.name,
                      }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:220:13',
                  'data-prohibitions': '[editContent]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:221:15',
                      'data-prohibitions': '[]',
                      children: 'Tipo *',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                      'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:222:15',
                      'data-prohibitions': '[]',
                      value: formData.type,
                      onValueChange: (v) =>
                        setFormData({
                          ...formData,
                          type: v,
                        }),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                          'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:226:17',
                          'data-prohibitions': '[]',
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                            'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:227:19',
                            'data-prohibitions': '[editContent]',
                          }),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
                          'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:229:17',
                          'data-prohibitions': '[]',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:230:19',
                              'data-prohibitions': '[]',
                              value: 'product',
                              children: 'Produto',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:231:19',
                              'data-prohibitions': '[]',
                              value: 'service',
                              children: 'Serviço',
                            }),
                          ],
                        }),
                      ],
                    }),
                    errors.type &&
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                        'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:234:31',
                        'data-prohibitions': '[editContent]',
                        className: 'text-sm text-destructive font-medium',
                        children: errors.type,
                      }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:236:13',
                  'data-prohibitions': '[editContent]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:237:15',
                      'data-prohibitions': '[]',
                      children: 'Porcentagem de Comissão (%)',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:238:15',
                      'data-prohibitions': '[editContent]',
                      type: 'number',
                      step: '0.01',
                      placeholder: 'Ex: 50',
                      value: formData.commission_percentage,
                      onChange: (e) =>
                        setFormData({
                          ...formData,
                          commission_percentage: e.target.value,
                        }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                      'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:247:15',
                      'data-prohibitions': '[]',
                      className: 'text-xs text-muted-foreground',
                      children: 'Comissão padrão aplicada aos itens desta categoria.',
                    }),
                    errors.commission_percentage &&
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                        'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:251:17',
                        'data-prohibitions': '[editContent]',
                        className: 'text-sm text-destructive font-medium',
                        children: errors.commission_percentage,
                      }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:257:11',
              'data-prohibitions': '[]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:258:13',
                  'data-prohibitions': '[]',
                  variant: 'outline',
                  onClick: () => setDialogOpen(false),
                  children: 'Cancelar',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:261:13',
                  'data-prohibitions': '[]',
                  onClick: handleSave,
                  children: 'Salvar',
                }),
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
        'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:266:7',
        'data-prohibitions': '[]',
        open: !!deletePromptId,
        onOpenChange: (v) => !v && setDeletePromptId(null),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
          'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:267:9',
          'data-prohibitions': '[]',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:268:11',
              'data-prohibitions': '[]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
                  'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:269:13',
                  'data-prohibitions': '[]',
                  children: 'Excluir categoria',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
                  'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:270:13',
                  'data-prohibitions': '[]',
                  children:
                    'Deseja realmente excluir esta categoria? Esta ação não pode ser desfeita.',
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
              'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:274:11',
              'data-prohibitions': '[]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
                  'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:275:13',
                  'data-prohibitions': '[]',
                  children: 'Cancelar',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
                  'data-uid': 'src/pages/produtos-categorias/CategoriasTab.tsx:276:13',
                  'data-prohibitions': '[]',
                  className: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                  onClick: confirmDelete,
                  children: 'Excluir',
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
//#region src/pages/Settings.tsx
function Settings() {
  const { user } = useAuth()
  const { isAdmin } = usePermissions()
  const { toast } = useToast()
  const [logoConfigId, setLogoConfigId] = (0, import_react.useState)('')
  const [logoPreview, setLogoPreview] = (0, import_react.useState)('')
  const [selectedLogoFile, setSelectedLogoFile] = (0, import_react.useState)(null)
  const [finConfigId, setFinConfigId] = (0, import_react.useState)('')
  const [finForm, setFinForm] = (0, import_react.useState)({
    inventory_owner_id: '',
    default_product_commission: 10,
    enable_third_party_commission: true,
    enable_professional_consumption: true,
  })
  const [barbers, setBarbers] = (0, import_react.useState)([])
  const [isNotifOpen, setIsNotifOpen] = (0, import_react.useState)(false)
  const [editingNotifId, setEditingNotifId] = (0, import_react.useState)(null)
  const [notifForm, setNotifForm] = (0, import_react.useState)({
    event_type: 'new_appointment',
    recipients: [],
    channel: 'internal',
    timing_unit: 'hours_minutes',
    timing_hours: 0,
    timing_minutes: 0,
    timing_days: 0,
    is_active: true,
  })
  const loadData = async () => {
    try {
      const sett = await pb.collection('settings').getFullList()
      const logoSett = sett.find((s) => s.key === 'logo')
      if (logoSett) {
        setLogoConfigId(logoSett.id)
        if (logoSett.logo) setLogoPreview(pb.files.getURL(logoSett, logoSett.logo))
      }
      const finSett = sett.find((s) => s.key === 'financial_config')
      if (finSett) {
        setFinConfigId(finSett.id)
        setFinForm(
          finSett.value || {
            inventory_owner_id: '',
            default_product_commission: 10,
            enable_third_party_commission: true,
          },
        )
      }
      const permSett = sett.find((s) => s.key === 'role_permissions')
      if (permSett) {
        setPermConfigId(permSett.id)
        setPermForm(
          permSett.value || {
            Admin: ['*'],
            Socio: [],
            Autonomo: [],
          },
        )
      } else
        setPermForm({
          Admin: ['*'],
          Socio: [
            'agenda',
            'clientes',
            'checkout',
            'staff',
            'dash_tab_overview',
            'dash_block_revenue',
            'dash_block_clients',
            'dash_block_new_clients',
            'dash_block_ticket_serv',
            'dash_block_ticket_prod',
            'dash_block_peak',
            'dash_block_history',
            'dash_block_top_sellers',
            'dash_block_forecast',
            'dash_block_alerts',
          ],
          Autonomo: [
            'agenda',
            'dash_tab_overview',
            'dash_block_revenue',
            'dash_block_history',
            'dash_block_peak',
            'dash_block_forecast',
          ],
        })
      setBarbers(await pb.collection('barbers').getFullList({ sort: 'name' }))
      const bhList = await pb.collection('business_hours').getFullList({ sort: 'day_of_week' })
      setBusinessHours(
        [
          {
            day_of_week: '0',
            is_active: false,
            open_time: '09:00',
            close_time: '18:00',
          },
          {
            day_of_week: '1',
            is_active: true,
            open_time: '09:00',
            close_time: '18:00',
          },
          {
            day_of_week: '2',
            is_active: true,
            open_time: '09:00',
            close_time: '18:00',
          },
          {
            day_of_week: '3',
            is_active: true,
            open_time: '09:00',
            close_time: '18:00',
          },
          {
            day_of_week: '4',
            is_active: true,
            open_time: '09:00',
            close_time: '18:00',
          },
          {
            day_of_week: '5',
            is_active: true,
            open_time: '09:00',
            close_time: '18:00',
          },
          {
            day_of_week: '6',
            is_active: true,
            open_time: '09:00',
            close_time: '18:00',
          },
        ].map((def) => {
          return bhList.find((b) => b.day_of_week === def.day_of_week) || def
        }),
      )
    } catch (e) {
      console.error(e)
    }
  }
  ;(0, import_react.useEffect)(() => {
    if (isAdmin) {
      loadData()
      loadNotificationRules()
    }
  }, [user, isAdmin])
  const [permConfigId, setPermConfigId] = (0, import_react.useState)('')
  const [permForm, setPermForm] = (0, import_react.useState)({
    Admin: ['*'],
    Socio: [],
    Autonomo: [],
  })
  const [notifRules, setNotifRules] = (0, import_react.useState)([])
  const [businessHours, setBusinessHours] = (0, import_react.useState)([])
  const [importType, setImportType] = (0, import_react.useState)(null)
  const handleSaveBusinessHours = async () => {
    try {
      for (const bh of businessHours)
        if (bh.id) await pb.collection('business_hours').update(bh.id, bh)
        else await pb.collection('business_hours').create(bh)
      toast({ title: 'Horários atualizados com sucesso!' })
    } catch (err) {
      toast({
        title: 'Erro ao salvar horários',
        variant: 'destructive',
      })
    }
  }
  const updateBusinessHour = (index, field, value) => {
    const newBh = [...businessHours]
    newBh[index] = {
      ...newBh[index],
      [field]: value,
    }
    setBusinessHours(newBh)
  }
  const loadNotificationRules = async () => {
    try {
      setNotifRules(await pb.collection('notification_rules').getFullList())
    } catch {}
  }
  if (!isAdmin)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
      'data-uid': 'src/pages/Settings.tsx:226:7',
      'data-prohibitions': '[]',
      className: 'p-8 text-center text-muted-foreground',
      children: 'Acesso Restrito. Apenas administradores podem acessar esta página.',
    })
  const handleLogoFile = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }
  const handleSaveLogo = async () => {
    if (!selectedLogoFile) return
    const formData = new FormData()
    formData.append('logo', selectedLogoFile)
    formData.append('key', 'logo')
    formData.append('value', JSON.stringify({}))
    try {
      if (logoConfigId) await pb.collection('settings').update(logoConfigId, formData)
      else setLogoConfigId((await pb.collection('settings').create(formData)).id)
      toast({
        title: 'Logo atualizado com sucesso!',
        description: 'O logotipo foi salvo e já está ativo.',
      })
      setSelectedLogoFile(null)
      window.dispatchEvent(new Event('logo-updated'))
    } catch (err) {
      console.error('Save logo error:', err)
      toast({
        title: 'Erro ao salvar logo',
        description: 'Verifique se o arquivo é um PNG/JPG válido e tente novamente.',
        variant: 'destructive',
      })
    }
  }
  const handleSavePermissions = async () => {
    const payload = {
      key: 'role_permissions',
      value: permForm,
    }
    try {
      if (permConfigId) await pb.collection('settings').update(permConfigId, payload)
      else setPermConfigId((await pb.collection('settings').create(payload)).id)
      toast({ title: 'Permissões atualizadas com sucesso! Recarregue a página para aplicar.' })
    } catch (err) {
      toast({
        title: 'Erro ao salvar permissões',
        variant: 'destructive',
      })
    }
  }
  const togglePermission = (role, permId) => {
    setPermForm((prev) => {
      const rolePerms = prev[role] || []
      const newPerms = rolePerms.includes(permId)
        ? rolePerms.filter((p) => p !== permId)
        : [...rolePerms, permId]
      return {
        ...prev,
        [role]: newPerms,
      }
    })
  }
  const ALL_PERMISSIONS = [
    {
      id: 'agenda',
      label: 'Agenda',
      category: 'Módulos do Menu',
    },
    {
      id: 'clientes',
      label: 'Clientes',
      category: 'Módulos do Menu',
    },
    {
      id: 'checkout',
      label: 'Checkout (POS)',
      category: 'Módulos do Menu',
    },
    {
      id: 'financeiro',
      label: 'Financeiro',
      category: 'Módulos do Menu',
    },
    {
      id: 'estoque',
      label: 'Serviços & Pacotes',
      category: 'Módulos do Menu',
    },
    {
      id: 'produtos',
      label: 'Produtos',
      category: 'Módulos do Menu',
    },
    {
      id: 'fornecedores',
      label: 'Compras / Fornecedores',
      category: 'Módulos do Menu',
    },
    {
      id: 'staff',
      label: 'Equipe & Comissões',
      category: 'Módulos do Menu',
    },
    {
      id: 'settings',
      label: 'Configurações',
      category: 'Módulos do Menu',
    },
    {
      id: 'users',
      label: 'Usuários e Acessos',
      category: 'Módulos do Menu',
    },
    {
      id: 'dash_tab_overview',
      label: 'Aba: Visão Geral',
      category: 'Dashboard',
    },
    {
      id: 'dash_tab_financial',
      label: 'Aba: Financeiro',
      category: 'Dashboard',
    },
    {
      id: 'dash_tab_packages',
      label: 'Aba: Pacotes Ativos',
      category: 'Dashboard',
    },
    {
      id: 'dash_block_revenue',
      label: 'Bloco: Faturamento',
      category: 'Dashboard (Visão Geral)',
    },
    {
      id: 'dash_block_clients',
      label: 'Bloco: Clientes Atendidos',
      category: 'Dashboard (Visão Geral)',
    },
    {
      id: 'dash_block_new_clients',
      label: 'Bloco: Novos Clientes',
      category: 'Dashboard (Visão Geral)',
    },
    {
      id: 'dash_block_ticket_serv',
      label: 'Bloco: Ticket Médio Serv.',
      category: 'Dashboard (Visão Geral)',
    },
    {
      id: 'dash_block_ticket_prod',
      label: 'Bloco: Ticket Médio Prod.',
      category: 'Dashboard (Visão Geral)',
    },
    {
      id: 'dash_block_peak',
      label: 'Bloco: Horários de Pico',
      category: 'Dashboard (Visão Geral)',
    },
    {
      id: 'dash_block_top_sellers',
      label: 'Bloco: Top Vendas / Mix',
      category: 'Dashboard (Visão Geral)',
    },
    {
      id: 'dash_block_forecast',
      label: 'Bloco: Previsão de Recebimento',
      category: 'Dashboard (Visão Geral)',
    },
    {
      id: 'dash_block_alerts',
      label: 'Bloco: Alertas',
      category: 'Dashboard (Visão Geral)',
    },
    {
      id: 'dash_block_history',
      label: 'Bloco: Histórico/Gráficos',
      category: 'Dashboard (Visão Geral)',
    },
  ]
  const categoriesSet = Array.from(new Set(ALL_PERMISSIONS.map((p) => p.category)))
  const handleSaveFinConfig = async () => {
    if (!finForm.inventory_owner_id) {
      toast({
        title: 'Selecione o Gestor de Estoque.',
        variant: 'destructive',
      })
      return
    }
    const payload = {
      key: 'financial_config',
      value: finForm,
    }
    try {
      if (finConfigId) await pb.collection('settings').update(finConfigId, payload)
      else setFinConfigId((await pb.collection('settings').create(payload)).id)
      toast({ title: 'Regras Financeiras atualizadas com sucesso!' })
    } catch (err) {
      toast({
        title: 'Erro ao salvar regras financeiras',
        variant: 'destructive',
      })
    }
  }
  const handleOpenNotif = (r) => {
    if (r) {
      const unit = r.timing_unit || 'hours_minutes'
      let h = 0,
        m = 0,
        d = 0
      if (unit === 'days') d = r.timing_offset || 0
      else {
        const totalMin = r.timing_offset || 0
        h = Math.floor(totalMin / 60)
        m = totalMin % 60
      }
      setNotifForm({
        event_type: r.event_type,
        recipients: r.recipients || [],
        channel: r.channel || 'internal',
        timing_unit: unit,
        timing_hours: h,
        timing_minutes: m,
        timing_days: d,
        is_active: r.is_active,
      })
      setEditingNotifId(r.id)
    } else {
      setNotifForm({
        event_type: 'new_appointment',
        recipients: [],
        channel: 'internal',
        timing_unit: 'hours_minutes',
        timing_hours: 0,
        timing_minutes: 0,
        timing_days: 0,
        is_active: true,
      })
      setEditingNotifId(null)
    }
    setIsNotifOpen(true)
  }
  const handleSaveNotif = async () => {
    try {
      let offset = 0
      if (notifForm.timing_unit === 'days') offset = Number(notifForm.timing_days) || 0
      else
        offset =
          (Number(notifForm.timing_hours) || 0) * 60 + (Number(notifForm.timing_minutes) || 0)
      const payload = {
        event_type: notifForm.event_type,
        recipients: notifForm.recipients,
        channel: notifForm.channel,
        timing_unit: notifForm.timing_unit,
        timing_offset: offset,
        is_active: notifForm.is_active,
      }
      if (editingNotifId) {
        await pb.collection('notification_rules').update(editingNotifId, payload)
        toast({ title: 'Regra atualizada!' })
      } else {
        await pb.collection('notification_rules').create(payload)
        toast({ title: 'Regra criada!' })
      }
      setIsNotifOpen(false)
      loadNotificationRules()
    } catch (err) {
      toast({
        title: 'Erro ao salvar regra',
        variant: 'destructive',
      })
    }
  }
  const handleDeleteNotif = async (id) => {
    if (confirm('Tem certeza que deseja remover esta regra?'))
      try {
        await pb.collection('notification_rules').delete(id)
        toast({ title: 'Regra removida' })
        loadNotificationRules()
      } catch (err) {
        toast({
          title: 'Erro ao remover regra',
          variant: 'destructive',
        })
      }
  }
  const toggleFormRecipient = (role) => {
    setNotifForm((prev) => ({
      ...prev,
      recipients: prev.recipients.includes(role)
        ? prev.recipients.filter((r) => r !== role)
        : [...prev.recipients, role],
    }))
  }
  const handleDownloadTemplate = (type) => {
    let headers = ''
    if (type === 'clientes')
      headers =
        'Nome,Sobrenome,Celular,Fone Secundario,Nascimento,Profissional,Localização\nExemplo,Silva,11999999999,,01/01/1990,João,Mora Perto'
    else if (type === 'produtos')
      headers = 'Nome,Preço,Preço de Custo,Categoria,Estoque\nPomada,35.50,15.00,Cabelo,10'
    else if (type === 'fornecedores')
      headers =
        'Nome,Documento,Telefone,WhatsApp,Endereço,Contato\nFornecedor XYZ,12.345.678/0001-90,1133333333,11999999999,Rua A 123,Carlos'
    const blob = new Blob([headers], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `modelo_${type}.csv`
    link.click()
  }
  const handleImportData = async (data) => {
    if (importType === 'clientes') {
      try {
        const plan =
          (await pb.collection('users').getOne(user.id, { expand: 'organization_id' })).expand
            ?.organization_id?.plan ||
          user.plan ||
          'Free'
        const limit = TIER_LIMITS[plan]?.clients
        if (limit && limit !== Infinity) {
          if ((await pb.collection('clients').getList(1, 1)).totalItems + data.length > limit)
            throw new Error(`Limite do plano (${plan}) excedido. O limite é de ${limit} clientes.`)
        }
      } catch (e) {
        return {
          success: 0,
          errors: data.length,
          errorsList: [e.message || 'Erro ao validar limites do plano.'],
        }
      }
      const allBarbers = await pb.collection('barbers').getFullList()
      let success = 0,
        errors = 0
      const errorsList = []
      for (let i = 0; i < data.length; i++) {
        const row = data[i]
        try {
          const payload = {
            name: row.Nome?.trim(),
            surname: row.Sobrenome?.trim(),
            phone: row.Celular?.replace(/\D/g, ''),
            phone_secondary: row['Fone Secundario']?.replace(/\D/g, ''),
          }
          if (row.Nascimento) {
            const parts = row.Nascimento.split('/')
            if (parts.length === 3)
              payload.birthday = `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00.000Z`
          }
          if (row.Localização) {
            const loc = row.Localização.toLowerCase()
            if (loc.includes('passagem')) payload.location_type = 'passage'
            else if (loc.includes('perto')) payload.location_type = 'nearby'
            else if (loc.includes('mora cidade')) payload.location_type = 'mora_cidade'
            else if (loc.includes('outra cidade')) payload.location_type = 'other_city'
          }
          if (row.Profissional) {
            const b = allBarbers.find(
              (b) => b.name.toLowerCase() === row.Profissional.toLowerCase().trim(),
            )
            if (b) payload.preferred_barber_id = b.id
          }
          await pb.collection('clients').create(payload)
          success++
        } catch (e) {
          errors++
          errorsList.push(`Linha ${i + 2} (${row.Nome || 'Sem Nome'}): ${e.message}`)
        }
      }
      return {
        success,
        errors,
        errorsList,
      }
    } else if (importType === 'produtos') {
      const cats = await pb.collection('categories').getFullList()
      let success = 0,
        errors = 0
      const errorsList = []
      for (let i = 0; i < data.length; i++) {
        const row = data[i]
        try {
          let catId = void 0
          if (row.Categoria) {
            const cName = row.Categoria.trim()
            let c = cats.find((c) => c.name.toLowerCase() === cName.toLowerCase())
            if (!c) {
              c = await pb.collection('categories').create({
                name: cName,
                type: 'product',
              })
              cats.push(c)
            }
            catId = c.id
          }
          const payload = {
            name: row.Nome?.trim(),
            price: parseFloat(row['Preço']?.replace(',', '.') || '0'),
            cost_price: parseFloat(row['Preço de Custo']?.replace(',', '.') || '0'),
            category_id: catId,
            stock_quantity: parseInt(row.Estoque || '0', 10),
            is_active: true,
          }
          await pb.collection('products').create(payload)
          success++
        } catch (e) {
          errors++
          errorsList.push(`Linha ${i + 2} (${row.Nome || 'Sem Nome'}): ${e.message}`)
        }
      }
      return {
        success,
        errors,
        errorsList,
      }
    } else if (importType === 'fornecedores') {
      let success = 0,
        errors = 0
      const errorsList = []
      for (let i = 0; i < data.length; i++) {
        const row = data[i]
        try {
          const payload = {
            name: row.Nome?.trim(),
            document: row.Documento?.replace(/[.\-/]/g, ''),
            phone: row.Telefone?.replace(/\D/g, ''),
            whatsapp: row.WhatsApp?.replace(/\D/g, ''),
            address: row.Endereço?.trim(),
            contact_person: row.Contato?.trim(),
          }
          await pb.collection('suppliers').create(payload)
          success++
        } catch (e) {
          errors++
          errorsList.push(`Linha ${i + 2} (${row.Nome || 'Sem Nome'}): ${e.message}`)
        }
      }
      return {
        success,
        errors,
        errorsList,
      }
    }
    return {
      success: 0,
      errors: 0,
      errorsList: [],
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/pages/Settings.tsx:619:5',
    'data-prohibitions': '[editContent]',
    className: 'space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/Settings.tsx:620:7',
        'data-prohibitions': '[]',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
            'data-uid': 'src/pages/Settings.tsx:621:9',
            'data-prohibitions': '[]',
            className: 'text-3xl font-bold tracking-tight',
            children: 'Configurações do Sistema',
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
            'data-uid': 'src/pages/Settings.tsx:622:9',
            'data-prohibitions': '[]',
            className: 'text-muted-foreground',
            children: 'Gerencie a identidade visual e as categorias de serviços e produtos.',
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
        'data-uid': 'src/pages/Settings.tsx:627:7',
        'data-prohibitions': '[editContent]',
        defaultValue: 'geral',
        className: 'w-full',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
            'data-uid': 'src/pages/Settings.tsx:628:9',
            'data-prohibitions': '[]',
            className: 'mb-6 flex-wrap h-auto',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                'data-uid': 'src/pages/Settings.tsx:629:11',
                'data-prohibitions': '[]',
                value: 'geral',
                children: 'Geral (Marca)',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                'data-uid': 'src/pages/Settings.tsx:630:11',
                'data-prohibitions': '[]',
                value: 'business_hours',
                children: 'Horário de Funcionamento',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                'data-uid': 'src/pages/Settings.tsx:631:11',
                'data-prohibitions': '[]',
                value: 'permissions',
                children: 'Permissões de Acesso',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                'data-uid': 'src/pages/Settings.tsx:632:11',
                'data-prohibitions': '[]',
                value: 'categories',
                children: 'Configurações de Categorias',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                'data-uid': 'src/pages/Settings.tsx:633:11',
                'data-prohibitions': '[]',
                value: 'financial',
                children: 'Regras Financeiras',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                'data-uid': 'src/pages/Settings.tsx:634:11',
                'data-prohibitions': '[]',
                value: 'notifications',
                children: 'Gerenciamento de Notificações',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                'data-uid': 'src/pages/Settings.tsx:635:11',
                'data-prohibitions': '[]',
                value: 'imports',
                children: 'Modelos de Importação',
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/Settings.tsx:638:9',
            'data-prohibitions': '[editContent]',
            value: 'business_hours',
            className: 'space-y-4',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
              'data-uid': 'src/pages/Settings.tsx:639:11',
              'data-prohibitions': '[editContent]',
              className: 'border-border shadow-sm max-w-3xl',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                  'data-uid': 'src/pages/Settings.tsx:640:13',
                  'data-prohibitions': '[]',
                  className: 'flex flex-row items-center justify-between',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:641:15',
                      'data-prohibitions': '[]',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                          'data-uid': 'src/pages/Settings.tsx:642:17',
                          'data-prohibitions': '[]',
                          children: 'Horário de Funcionamento',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                          'data-uid': 'src/pages/Settings.tsx:643:17',
                          'data-prohibitions': '[]',
                          children: 'Defina os dias e horários de funcionamento da barbearia.',
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                      'data-uid': 'src/pages/Settings.tsx:647:15',
                      'data-prohibitions': '[]',
                      onClick: handleSaveBusinessHours,
                      children: 'Salvar Horários',
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
                  'data-uid': 'src/pages/Settings.tsx:649:13',
                  'data-prohibitions': '[editContent]',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                    'data-uid': 'src/pages/Settings.tsx:650:15',
                    'data-prohibitions': '[editContent]',
                    className: 'space-y-4',
                    children: businessHours.map((bh, i) => {
                      const dayName = [
                        'Domingo',
                        'Segunda',
                        'Terça',
                        'Quarta',
                        'Quinta',
                        'Sexta',
                        'Sábado',
                      ][parseInt(bh.day_of_week)]
                      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        'div',
                        {
                          'data-uid': 'src/pages/Settings.tsx:663:21',
                          'data-prohibitions': '[editContent]',
                          className: 'flex items-center justify-between p-3 border rounded-md',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                              'data-uid': 'src/pages/Settings.tsx:667:23',
                              'data-prohibitions': '[editContent]',
                              className: 'flex items-center gap-4 w-1/3',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
                                  'data-uid': 'src/pages/Settings.tsx:668:25',
                                  'data-prohibitions': '[editContent]',
                                  checked: bh.is_active,
                                  onCheckedChange: (v) => updateBusinessHour(i, 'is_active', v),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                  'data-uid': 'src/pages/Settings.tsx:672:25',
                                  'data-prohibitions': '[editContent]',
                                  className: 'font-semibold',
                                  children: dayName,
                                }),
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                              'data-uid': 'src/pages/Settings.tsx:675:23',
                              'data-prohibitions': '[editContent]',
                              className: 'flex items-center gap-2 flex-1 justify-end',
                              children: bh.is_active
                                ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                    import_jsx_runtime.Fragment,
                                    {
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                                          'data-uid': 'src/pages/Settings.tsx:678:29',
                                          'data-prohibitions': '[editContent]',
                                          type: 'time',
                                          value: bh.open_time,
                                          onChange: (e) =>
                                            updateBusinessHour(i, 'open_time', e.target.value),
                                          className: 'w-32',
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                          'data-uid': 'src/pages/Settings.tsx:684:29',
                                          'data-prohibitions': '[]',
                                          className: 'text-muted-foreground',
                                          children: 'até',
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                                          'data-uid': 'src/pages/Settings.tsx:685:29',
                                          'data-prohibitions': '[editContent]',
                                          type: 'time',
                                          value: bh.close_time,
                                          onChange: (e) =>
                                            updateBusinessHour(i, 'close_time', e.target.value),
                                          className: 'w-32',
                                        }),
                                      ],
                                    },
                                  )
                                : /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                    'data-uid': 'src/pages/Settings.tsx:693:27',
                                    'data-prohibitions': '[]',
                                    className: 'text-muted-foreground text-sm italic mr-12',
                                    children: 'Fechado',
                                  }),
                            }),
                          ],
                        },
                        bh.day_of_week,
                      )
                    }),
                  }),
                }),
              ],
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/Settings.tsx:706:9',
            'data-prohibitions': '[editContent]',
            value: 'permissions',
            className: 'space-y-4',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
              'data-uid': 'src/pages/Settings.tsx:707:11',
              'data-prohibitions': '[editContent]',
              className: 'border-border shadow-sm',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                  'data-uid': 'src/pages/Settings.tsx:708:13',
                  'data-prohibitions': '[]',
                  className: 'flex flex-row items-center justify-between',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:709:15',
                      'data-prohibitions': '[]',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                          'data-uid': 'src/pages/Settings.tsx:710:17',
                          'data-prohibitions': '[]',
                          children: 'Controle de Acesso (RBAC)',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                          'data-uid': 'src/pages/Settings.tsx:711:17',
                          'data-prohibitions': '[]',
                          children: 'Defina o que cada perfil pode acessar no sistema.',
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                      'data-uid': 'src/pages/Settings.tsx:713:15',
                      'data-prohibitions': '[]',
                      onClick: handleSavePermissions,
                      children: 'Salvar Permissões',
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
                  'data-uid': 'src/pages/Settings.tsx:715:13',
                  'data-prohibitions': '[editContent]',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
                    'data-uid': 'src/pages/Settings.tsx:716:15',
                    'data-prohibitions': '[editContent]',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
                        'data-uid': 'src/pages/Settings.tsx:717:17',
                        'data-prohibitions': '[]',
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
                          'data-uid': 'src/pages/Settings.tsx:718:19',
                          'data-prohibitions': '[]',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                              'data-uid': 'src/pages/Settings.tsx:719:21',
                              'data-prohibitions': '[]',
                              children: 'Permissão',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                              'data-uid': 'src/pages/Settings.tsx:720:21',
                              'data-prohibitions': '[]',
                              className: 'text-center w-[120px]',
                              children: 'Sócio',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                              'data-uid': 'src/pages/Settings.tsx:721:21',
                              'data-prohibitions': '[]',
                              className: 'text-center w-[120px]',
                              children: 'Autônomo',
                            }),
                          ],
                        }),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
                        'data-uid': 'src/pages/Settings.tsx:724:17',
                        'data-prohibitions': '[editContent]',
                        children: categoriesSet.map((cat) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            import_react.Fragment,
                            {
                              'data-uid': 'src/pages/Settings.tsx:726:21',
                              'data-prohibitions': '[editContent]',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                                  'data-uid': 'src/pages/Settings.tsx:727:23',
                                  'data-prohibitions': '[editContent]',
                                  className: 'bg-muted/50 hover:bg-muted/50',
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                    'data-uid': 'src/pages/Settings.tsx:728:25',
                                    'data-prohibitions': '[editContent]',
                                    colSpan: 3,
                                    className: 'font-bold text-primary py-2',
                                    children: cat,
                                  }),
                                }),
                                ALL_PERMISSIONS.filter((p) => p.category === cat).map((perm) =>
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                                    TableRow,
                                    {
                                      'data-uid': 'src/pages/Settings.tsx:733:25',
                                      'data-prohibitions': '[editContent]',
                                      children: [
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                          'data-uid': 'src/pages/Settings.tsx:734:27',
                                          'data-prohibitions': '[editContent]',
                                          className: 'font-medium text-sm pl-6',
                                          children: perm.label,
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                          'data-uid': 'src/pages/Settings.tsx:735:27',
                                          'data-prohibitions': '[]',
                                          className: 'text-center',
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            Switch,
                                            {
                                              'data-uid': 'src/pages/Settings.tsx:736:29',
                                              'data-prohibitions': '[editContent]',
                                              checked: (permForm.Socio || []).includes(perm.id),
                                              onCheckedChange: () =>
                                                togglePermission('Socio', perm.id),
                                            },
                                          ),
                                        }),
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                          'data-uid': 'src/pages/Settings.tsx:741:27',
                                          'data-prohibitions': '[]',
                                          className: 'text-center',
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            Switch,
                                            {
                                              'data-uid': 'src/pages/Settings.tsx:742:29',
                                              'data-prohibitions': '[editContent]',
                                              checked: (permForm.Autonomo || []).includes(perm.id),
                                              onCheckedChange: () =>
                                                togglePermission('Autonomo', perm.id),
                                            },
                                          ),
                                        }),
                                      ],
                                    },
                                    perm.id,
                                  ),
                                ),
                              ],
                            },
                            cat,
                          ),
                        ),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/Settings.tsx:757:9',
            'data-prohibitions': '[editContent]',
            value: 'geral',
            className: 'space-y-4',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
              'data-uid': 'src/pages/Settings.tsx:758:11',
              'data-prohibitions': '[editContent]',
              className: 'max-w-2xl border-border shadow-sm',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                  'data-uid': 'src/pages/Settings.tsx:759:13',
                  'data-prohibitions': '[]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                      'data-uid': 'src/pages/Settings.tsx:760:15',
                      'data-prohibitions': '[]',
                      children: 'Identidade Visual',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                      'data-uid': 'src/pages/Settings.tsx:761:15',
                      'data-prohibitions': '[]',
                      children: 'Faça upload do logotipo da barbearia (PNG recomendado).',
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
                  'data-uid': 'src/pages/Settings.tsx:765:13',
                  'data-prohibitions': '[editContent]',
                  className: 'space-y-4',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/pages/Settings.tsx:766:15',
                    'data-prohibitions': '[editContent]',
                    className: 'flex items-center gap-6',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                        'data-uid': 'src/pages/Settings.tsx:767:17',
                        'data-prohibitions': '[editContent]',
                        className:
                          'w-32 h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-card overflow-hidden shrink-0',
                        children: logoPreview
                          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('img', {
                              'data-uid': 'src/pages/Settings.tsx:769:21',
                              'data-prohibitions': '[editContent]',
                              src: logoPreview,
                              alt: 'Logo',
                              className: 'w-full h-full object-contain p-2',
                            })
                          : /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                              'data-uid': 'src/pages/Settings.tsx:775:21',
                              'data-prohibitions': '[]',
                              className: 'text-xs text-muted-foreground text-center px-4',
                              children: 'Sem Logo',
                            }),
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                        'data-uid': 'src/pages/Settings.tsx:778:17',
                        'data-prohibitions': '[]',
                        className: 'space-y-2 flex-1',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                            'data-uid': 'src/pages/Settings.tsx:779:19',
                            'data-prohibitions': '[]',
                            children: 'Arquivo de Logo',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                            'data-uid': 'src/pages/Settings.tsx:780:19',
                            'data-prohibitions': '[editContent]',
                            type: 'file',
                            accept: 'image/png, image/jpeg, image/svg+xml',
                            onChange: handleLogoFile,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                            'data-uid': 'src/pages/Settings.tsx:785:19',
                            'data-prohibitions': '[]',
                            onClick: handleSaveLogo,
                            disabled: !selectedLogoFile,
                            className: 'mt-2 w-full sm:w-auto',
                            children: 'Atualizar Logo',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/Settings.tsx:798:9',
            'data-prohibitions': '[]',
            value: 'categories',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
              'data-uid': 'src/pages/Settings.tsx:799:11',
              'data-prohibitions': '[]',
              className: 'border-border shadow-sm',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                  'data-uid': 'src/pages/Settings.tsx:800:13',
                  'data-prohibitions': '[]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                      'data-uid': 'src/pages/Settings.tsx:801:15',
                      'data-prohibitions': '[]',
                      children: 'Categorias do Sistema',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                      'data-uid': 'src/pages/Settings.tsx:802:15',
                      'data-prohibitions': '[]',
                      children:
                        'Gerencie as classificações de serviços e produtos e suas comissões padrão.',
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
                  'data-uid': 'src/pages/Settings.tsx:806:13',
                  'data-prohibitions': '[]',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriasTab, {
                    'data-uid': 'src/pages/Settings.tsx:807:15',
                    'data-prohibitions': '[editContent]',
                  }),
                }),
              ],
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/Settings.tsx:812:9',
            'data-prohibitions': '[editContent]',
            value: 'financial',
            className: 'space-y-4',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
              'data-uid': 'src/pages/Settings.tsx:813:11',
              'data-prohibitions': '[editContent]',
              className: 'border-border shadow-sm max-w-2xl',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                  'data-uid': 'src/pages/Settings.tsx:814:13',
                  'data-prohibitions': '[]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                      'data-uid': 'src/pages/Settings.tsx:815:15',
                      'data-prohibitions': '[]',
                      children: 'Regras Financeiras',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                      'data-uid': 'src/pages/Settings.tsx:816:15',
                      'data-prohibitions': '[]',
                      children:
                        'Configure as regras globais de financeiro, comissões e gestão de estoque.',
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
                  'data-uid': 'src/pages/Settings.tsx:820:13',
                  'data-prohibitions': '[editContent]',
                  className: 'space-y-4',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:821:15',
                      'data-prohibitions': '[editContent]',
                      className: 'space-y-2 border-b pb-4',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                          'data-uid': 'src/pages/Settings.tsx:822:17',
                          'data-prohibitions': '[]',
                          children: 'Gestor Global de Estoque',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                          'data-uid': 'src/pages/Settings.tsx:823:17',
                          'data-prohibitions': '[editContent]',
                          value: finForm.inventory_owner_id,
                          onValueChange: (v) =>
                            setFinForm({
                              ...finForm,
                              inventory_owner_id: v,
                            }),
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                              'data-uid': 'src/pages/Settings.tsx:827:19',
                              'data-prohibitions': '[]',
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                                'data-uid': 'src/pages/Settings.tsx:828:21',
                                'data-prohibitions': '[editContent]',
                                placeholder: 'Selecione o gestor de estoque...',
                              }),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                              'data-uid': 'src/pages/Settings.tsx:830:19',
                              'data-prohibitions': '[editContent]',
                              children: barbers.map((b) =>
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  SelectItem,
                                  {
                                    'data-uid': 'src/pages/Settings.tsx:832:23',
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
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                          'data-uid': 'src/pages/Settings.tsx:838:17',
                          'data-prohibitions': '[]',
                          className: 'text-xs text-muted-foreground',
                          children:
                            'O gestor de estoque recebe o lucro das vendas de produtos não-comissionadas.',
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:843:15',
                      'data-prohibitions': '[]',
                      className:
                        'flex items-center justify-between rounded-lg border p-4 bg-card/50',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/pages/Settings.tsx:844:17',
                          'data-prohibitions': '[]',
                          className: 'space-y-1 mr-4',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                              'data-uid': 'src/pages/Settings.tsx:845:19',
                              'data-prohibitions': '[]',
                              className: 'text-base',
                              children: 'Comissão de Venda de Terceiros',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                              'data-uid': 'src/pages/Settings.tsx:846:19',
                              'data-prohibitions': '[]',
                              className: 'text-sm text-muted-foreground',
                              children:
                                'Ativa o repasse de comissão para barbeiros quando venderem produtos do gestor de estoque. Se desativado, toda a venda vai para o gestor.',
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
                          'data-uid': 'src/pages/Settings.tsx:851:17',
                          'data-prohibitions': '[editContent]',
                          checked: finForm.enable_third_party_commission,
                          onCheckedChange: (v) =>
                            setFinForm({
                              ...finForm,
                              enable_third_party_commission: v,
                            }),
                        }),
                      ],
                    }),
                    finForm.enable_third_party_commission &&
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                        'data-uid': 'src/pages/Settings.tsx:860:17',
                        'data-prohibitions': '[]',
                        className: 'space-y-2 bg-muted/30 p-4 rounded-md border border-dashed',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                            'data-uid': 'src/pages/Settings.tsx:861:19',
                            'data-prohibitions': '[]',
                            children: 'Comissão Padrão de Produtos (%)',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                            'data-uid': 'src/pages/Settings.tsx:862:19',
                            'data-prohibitions': '[editContent]',
                            type: 'number',
                            min: '0',
                            max: '100',
                            value: finForm.default_product_commission,
                            onChange: (e) =>
                              setFinForm({
                                ...finForm,
                                default_product_commission: Number(e.target.value),
                              }),
                            className: 'max-w-[200px]',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                            'data-uid': 'src/pages/Settings.tsx:872:19',
                            'data-prohibitions': '[]',
                            className: 'text-xs text-muted-foreground',
                            children:
                              'Aplicada se o produto não possuir uma regra de categoria específica.',
                          }),
                        ],
                      }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:878:15',
                      'data-prohibitions': '[]',
                      className:
                        'flex items-center justify-between rounded-lg border p-4 bg-card/50',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/pages/Settings.tsx:879:17',
                          'data-prohibitions': '[]',
                          className: 'space-y-1 mr-4',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                              'data-uid': 'src/pages/Settings.tsx:880:19',
                              'data-prohibitions': '[]',
                              className: 'text-base',
                              children: 'Consumo Profissional',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                              'data-uid': 'src/pages/Settings.tsx:881:19',
                              'data-prohibitions': '[]',
                              className: 'text-sm text-muted-foreground',
                              children:
                                'Permite registrar produtos consumidos internamente pelos profissionais, deduzindo o preço de custo de suas comissões automaticamente.',
                            }),
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
                          'data-uid': 'src/pages/Settings.tsx:886:17',
                          'data-prohibitions': '[editContent]',
                          checked: finForm.enable_professional_consumption ?? true,
                          onCheckedChange: (v) =>
                            setFinForm({
                              ...finForm,
                              enable_professional_consumption: v,
                            }),
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                      'data-uid': 'src/pages/Settings.tsx:894:15',
                      'data-prohibitions': '[]',
                      onClick: handleSaveFinConfig,
                      className: 'mt-4',
                      children: 'Salvar Regras Financeiras',
                    }),
                  ],
                }),
              ],
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
            'data-uid': 'src/pages/Settings.tsx:901:9',
            'data-prohibitions': '[editContent]',
            value: 'notifications',
            className: 'space-y-4',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/pages/Settings.tsx:902:11',
                'data-prohibitions': '[]',
                className: 'flex justify-between items-center',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
                    'data-uid': 'src/pages/Settings.tsx:903:13',
                    'data-prohibitions': '[]',
                    className: 'text-lg font-semibold',
                    children: 'Regras de Notificação',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                    'data-uid': 'src/pages/Settings.tsx:904:13',
                    'data-prohibitions': '[]',
                    onClick: () => handleOpenNotif(),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                        'data-uid': 'src/pages/Settings.tsx:905:15',
                        'data-prohibitions': '[editContent]',
                        className: 'size-4 mr-2',
                      }),
                      ' Nova Regra',
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
                'data-uid': 'src/pages/Settings.tsx:909:11',
                'data-prohibitions': '[editContent]',
                className: 'border-border shadow-sm',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
                  'data-uid': 'src/pages/Settings.tsx:910:13',
                  'data-prohibitions': '[editContent]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
                      'data-uid': 'src/pages/Settings.tsx:911:15',
                      'data-prohibitions': '[]',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
                        'data-uid': 'src/pages/Settings.tsx:912:17',
                        'data-prohibitions': '[]',
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                            'data-uid': 'src/pages/Settings.tsx:913:19',
                            'data-prohibitions': '[]',
                            children: 'Evento',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                            'data-uid': 'src/pages/Settings.tsx:914:19',
                            'data-prohibitions': '[]',
                            children: 'Destinatários',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                            'data-uid': 'src/pages/Settings.tsx:915:19',
                            'data-prohibitions': '[]',
                            children: 'Canal',
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                            'data-uid': 'src/pages/Settings.tsx:916:19',
                            'data-prohibitions': '[]',
                            className: 'text-right',
                            children: 'Ações',
                          }),
                        ],
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
                      'data-uid': 'src/pages/Settings.tsx:919:15',
                      'data-prohibitions': '[editContent]',
                      children: [
                        notifRules.map((r) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            TableRow,
                            {
                              'data-uid': 'src/pages/Settings.tsx:921:19',
                              'data-prohibitions': '[editContent]',
                              className: !r.is_active ? 'opacity-50' : '',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
                                  'data-uid': 'src/pages/Settings.tsx:922:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'font-medium',
                                  children: [
                                    r.event_type === 'new_appointment' && 'Novo Agendamento',
                                    r.event_type === 'cancellation' &&
                                      'Cancelamento de Agendamento',
                                    r.event_type === 'no_show' && 'Não Comparecimento (No-Show)',
                                    r.event_type === 'retention' && 'Alerta de Retenção Geral',
                                    r.event_type === 'recorrencia_barba' &&
                                      'Alerta de Retenção (Barba)',
                                    r.event_type === 'recorrencia_cabelo' &&
                                      'Alerta de Retenção (Cabelo)',
                                    r.event_type === 'no_show_3dias' && 'No-show após 3 dias',
                                    r.event_type === 'other' && 'Outros',
                                  ],
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                  'data-uid': 'src/pages/Settings.tsx:932:21',
                                  'data-prohibitions': '[editContent]',
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Settings.tsx:933:23',
                                    'data-prohibitions': '[editContent]',
                                    className: 'flex gap-2',
                                    children: [
                                      r.recipients?.map((role) =>
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                          Badge,
                                          {
                                            'data-uid': 'src/pages/Settings.tsx:935:27',
                                            'data-prohibitions': '[editContent]',
                                            variant: 'outline',
                                            children: role,
                                          },
                                          role,
                                        ),
                                      ),
                                      (!r.recipients || r.recipients.length === 0) &&
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                          'data-uid': 'src/pages/Settings.tsx:940:27',
                                          'data-prohibitions': '[]',
                                          className: 'text-muted-foreground text-xs',
                                          children: 'Nenhum',
                                        }),
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                  'data-uid': 'src/pages/Settings.tsx:944:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'capitalize text-muted-foreground',
                                  children:
                                    r.channel === 'internal' ? 'Sistema Interno' : r.channel,
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
                                  'data-uid': 'src/pages/Settings.tsx:947:21',
                                  'data-prohibitions': '[]',
                                  className: 'text-right',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                      'data-uid': 'src/pages/Settings.tsx:948:23',
                                      'data-prohibitions': '[]',
                                      variant: 'ghost',
                                      size: 'icon',
                                      onClick: () => handleOpenNotif(r),
                                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                        SquarePen,
                                        {
                                          'data-uid': 'src/pages/Settings.tsx:949:25',
                                          'data-prohibitions': '[editContent]',
                                          className: 'size-4',
                                        },
                                      ),
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                      'data-uid': 'src/pages/Settings.tsx:951:23',
                                      'data-prohibitions': '[]',
                                      variant: 'ghost',
                                      size: 'icon',
                                      className: 'text-destructive hover:bg-destructive/10',
                                      onClick: () => handleDeleteNotif(r.id),
                                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                        Trash2,
                                        {
                                          'data-uid': 'src/pages/Settings.tsx:957:25',
                                          'data-prohibitions': '[editContent]',
                                          className: 'size-4',
                                        },
                                      ),
                                    }),
                                  ],
                                }),
                              ],
                            },
                            r.id,
                          ),
                        ),
                        notifRules.length === 0 &&
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                            'data-uid': 'src/pages/Settings.tsx:963:19',
                            'data-prohibitions': '[]',
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                              'data-uid': 'src/pages/Settings.tsx:964:21',
                              'data-prohibitions': '[]',
                              colSpan: 4,
                              className: 'text-center py-6 text-muted-foreground',
                              children: 'Nenhuma regra encontrada.',
                            }),
                          }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/Settings.tsx:974:9',
            'data-prohibitions': '[]',
            value: 'imports',
            className: 'space-y-4',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
              'data-uid': 'src/pages/Settings.tsx:975:11',
              'data-prohibitions': '[]',
              className: 'border-border shadow-sm max-w-4xl',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
                  'data-uid': 'src/pages/Settings.tsx:976:13',
                  'data-prohibitions': '[]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
                      'data-uid': 'src/pages/Settings.tsx:977:15',
                      'data-prohibitions': '[]',
                      children: 'Central de Importação',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
                      'data-uid': 'src/pages/Settings.tsx:978:15',
                      'data-prohibitions': '[]',
                      children: 'Baixe os modelos e importe seus dados em massa para o sistema.',
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
                  'data-uid': 'src/pages/Settings.tsx:982:13',
                  'data-prohibitions': '[]',
                  className: 'grid grid-cols-1 md:grid-cols-3 gap-4',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:983:15',
                      'data-prohibitions': '[]',
                      className:
                        'border rounded-xl p-4 flex flex-col items-center text-center space-y-4 bg-muted/10',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                          'data-uid': 'src/pages/Settings.tsx:984:17',
                          'data-prohibitions': '[]',
                          className: 'p-3 bg-primary/10 text-primary rounded-full',
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
                            'data-uid': 'src/pages/Settings.tsx:985:19',
                            'data-prohibitions': '[editContent]',
                            className: 'size-6',
                          }),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h4', {
                          'data-uid': 'src/pages/Settings.tsx:987:17',
                          'data-prohibitions': '[]',
                          className: 'font-bold',
                          children: 'Clientes',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                          'data-uid': 'src/pages/Settings.tsx:988:17',
                          'data-prohibitions': '[]',
                          className: 'text-sm text-muted-foreground',
                          children:
                            'Importe sua base de clientes com datas de nascimento e preferências.',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/pages/Settings.tsx:991:17',
                          'data-prohibitions': '[]',
                          className: 'flex w-full gap-2 mt-auto',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                              'data-uid': 'src/pages/Settings.tsx:992:19',
                              'data-prohibitions': '[]',
                              variant: 'outline',
                              className: 'flex-1 text-xs',
                              onClick: () => handleDownloadTemplate('clientes'),
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
                                  'data-uid': 'src/pages/Settings.tsx:997:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'size-4 mr-1',
                                }),
                                ' Modelo',
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                              'data-uid': 'src/pages/Settings.tsx:999:19',
                              'data-prohibitions': '[]',
                              className: 'flex-1 text-xs',
                              onClick: () => setImportType('clientes'),
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
                                  'data-uid': 'src/pages/Settings.tsx:1000:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'size-4 mr-1',
                                }),
                                ' Importar',
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:1004:15',
                      'data-prohibitions': '[]',
                      className:
                        'border rounded-xl p-4 flex flex-col items-center text-center space-y-4 bg-muted/10',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                          'data-uid': 'src/pages/Settings.tsx:1005:17',
                          'data-prohibitions': '[]',
                          className: 'p-3 bg-primary/10 text-primary rounded-full',
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
                            'data-uid': 'src/pages/Settings.tsx:1006:19',
                            'data-prohibitions': '[editContent]',
                            className: 'size-6',
                          }),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h4', {
                          'data-uid': 'src/pages/Settings.tsx:1008:17',
                          'data-prohibitions': '[]',
                          className: 'font-bold',
                          children: 'Produtos',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                          'data-uid': 'src/pages/Settings.tsx:1009:17',
                          'data-prohibitions': '[]',
                          className: 'text-sm text-muted-foreground',
                          children:
                            'Importe o inventário com preços e crie categorias automaticamente.',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/pages/Settings.tsx:1012:17',
                          'data-prohibitions': '[]',
                          className: 'flex w-full gap-2 mt-auto',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                              'data-uid': 'src/pages/Settings.tsx:1013:19',
                              'data-prohibitions': '[]',
                              variant: 'outline',
                              className: 'flex-1 text-xs',
                              onClick: () => handleDownloadTemplate('produtos'),
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
                                  'data-uid': 'src/pages/Settings.tsx:1018:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'size-4 mr-1',
                                }),
                                ' Modelo',
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                              'data-uid': 'src/pages/Settings.tsx:1020:19',
                              'data-prohibitions': '[]',
                              className: 'flex-1 text-xs',
                              onClick: () => setImportType('produtos'),
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
                                  'data-uid': 'src/pages/Settings.tsx:1021:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'size-4 mr-1',
                                }),
                                ' Importar',
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:1025:15',
                      'data-prohibitions': '[]',
                      className:
                        'border rounded-xl p-4 flex flex-col items-center text-center space-y-4 bg-muted/10',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                          'data-uid': 'src/pages/Settings.tsx:1026:17',
                          'data-prohibitions': '[]',
                          className: 'p-3 bg-primary/10 text-primary rounded-full',
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
                            'data-uid': 'src/pages/Settings.tsx:1027:19',
                            'data-prohibitions': '[editContent]',
                            className: 'size-6',
                          }),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h4', {
                          'data-uid': 'src/pages/Settings.tsx:1029:17',
                          'data-prohibitions': '[]',
                          className: 'font-bold',
                          children: 'Fornecedores',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                          'data-uid': 'src/pages/Settings.tsx:1030:17',
                          'data-prohibitions': '[]',
                          className: 'text-sm text-muted-foreground',
                          children: 'Importe dados de contato e documentos dos fornecedores.',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/pages/Settings.tsx:1033:17',
                          'data-prohibitions': '[]',
                          className: 'flex w-full gap-2 mt-auto',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                              'data-uid': 'src/pages/Settings.tsx:1034:19',
                              'data-prohibitions': '[]',
                              variant: 'outline',
                              className: 'flex-1 text-xs',
                              onClick: () => handleDownloadTemplate('fornecedores'),
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
                                  'data-uid': 'src/pages/Settings.tsx:1039:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'size-4 mr-1',
                                }),
                                ' Modelo',
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                              'data-uid': 'src/pages/Settings.tsx:1041:19',
                              'data-prohibitions': '[]',
                              className: 'flex-1 text-xs',
                              onClick: () => setImportType('fornecedores'),
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
                                  'data-uid': 'src/pages/Settings.tsx:1042:21',
                                  'data-prohibitions': '[editContent]',
                                  className: 'size-4 mr-1',
                                }),
                                ' Importar',
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportDialog, {
        'data-uid': 'src/pages/Settings.tsx:1051:7',
        'data-prohibitions': '[editContent]',
        open: !!importType,
        onOpenChange: (v) => {
          if (!v) setImportType(null)
        },
        title: `Importar ${importType === 'clientes' ? 'Clientes' : importType === 'produtos' ? 'Produtos' : 'Fornecedores'}`,
        onImport: handleImportData,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
        'data-uid': 'src/pages/Settings.tsx:1060:7',
        'data-prohibitions': '[editContent]',
        open: isNotifOpen,
        onOpenChange: setIsNotifOpen,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
          'data-uid': 'src/pages/Settings.tsx:1061:9',
          'data-prohibitions': '[editContent]',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
              'data-uid': 'src/pages/Settings.tsx:1062:11',
              'data-prohibitions': '[editContent]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
                'data-uid': 'src/pages/Settings.tsx:1063:13',
                'data-prohibitions': '[editContent]',
                children: editingNotifId
                  ? 'Editar Regra de Notificação'
                  : 'Nova Regra de Notificação',
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/pages/Settings.tsx:1067:11',
              'data-prohibitions': '[editContent]',
              className: 'space-y-4 py-4',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Settings.tsx:1068:13',
                  'data-prohibitions': '[]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/pages/Settings.tsx:1069:15',
                      'data-prohibitions': '[]',
                      children: 'Tipo de Evento',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                      'data-uid': 'src/pages/Settings.tsx:1070:15',
                      'data-prohibitions': '[]',
                      value: notifForm.event_type,
                      onValueChange: (v) =>
                        setNotifForm({
                          ...notifForm,
                          event_type: v,
                        }),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                          'data-uid': 'src/pages/Settings.tsx:1074:17',
                          'data-prohibitions': '[]',
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                            'data-uid': 'src/pages/Settings.tsx:1075:19',
                            'data-prohibitions': '[editContent]',
                          }),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
                          'data-uid': 'src/pages/Settings.tsx:1077:17',
                          'data-prohibitions': '[]',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                              'data-uid': 'src/pages/Settings.tsx:1078:19',
                              'data-prohibitions': '[]',
                              value: 'new_appointment',
                              children: 'Novo Agendamento',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                              'data-uid': 'src/pages/Settings.tsx:1079:19',
                              'data-prohibitions': '[]',
                              value: 'cancellation',
                              children: 'Cancelamento de Agendamento',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                              'data-uid': 'src/pages/Settings.tsx:1080:19',
                              'data-prohibitions': '[]',
                              value: 'no_show',
                              children: 'Não Comparecimento (No-Show)',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                              'data-uid': 'src/pages/Settings.tsx:1081:19',
                              'data-prohibitions': '[]',
                              value: 'retention',
                              children: 'Alerta de Retenção Geral',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                              'data-uid': 'src/pages/Settings.tsx:1082:19',
                              'data-prohibitions': '[]',
                              value: 'recorrencia_barba',
                              children: 'Alerta de Retenção (Barba)',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                              'data-uid': 'src/pages/Settings.tsx:1083:19',
                              'data-prohibitions': '[]',
                              value: 'recorrencia_cabelo',
                              children: 'Alerta de Retenção (Cabelo)',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                              'data-uid': 'src/pages/Settings.tsx:1084:19',
                              'data-prohibitions': '[]',
                              value: 'no_show_3dias',
                              children: 'No-show após 3 dias',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                              'data-uid': 'src/pages/Settings.tsx:1085:19',
                              'data-prohibitions': '[]',
                              value: 'other',
                              children: 'Outros',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Settings.tsx:1090:13',
                  'data-prohibitions': '[editContent]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/pages/Settings.tsx:1091:15',
                      'data-prohibitions': '[]',
                      children: 'Destinatários (Perfis)',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                      'data-uid': 'src/pages/Settings.tsx:1092:15',
                      'data-prohibitions': '[editContent]',
                      className: 'flex gap-2 border p-3 rounded-md',
                      children: ['Admin', 'Socio', 'Autonomo'].map((role) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          Badge,
                          {
                            'data-uid': 'src/pages/Settings.tsx:1094:19',
                            'data-prohibitions': '[editContent]',
                            variant: notifForm.recipients.includes(role) ? 'default' : 'outline',
                            className: 'cursor-pointer',
                            onClick: () => toggleFormRecipient(role),
                            children: role,
                          },
                          role,
                        ),
                      ),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Settings.tsx:1106:13',
                  'data-prohibitions': '[editContent]',
                  className: 'grid grid-cols-2 gap-4',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:1107:15',
                      'data-prohibitions': '[]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                          'data-uid': 'src/pages/Settings.tsx:1108:17',
                          'data-prohibitions': '[]',
                          children: 'Canal de Envio',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                          'data-uid': 'src/pages/Settings.tsx:1109:17',
                          'data-prohibitions': '[]',
                          value: notifForm.channel,
                          onValueChange: (v) =>
                            setNotifForm({
                              ...notifForm,
                              channel: v,
                            }),
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                              'data-uid': 'src/pages/Settings.tsx:1113:19',
                              'data-prohibitions': '[]',
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                                'data-uid': 'src/pages/Settings.tsx:1114:21',
                                'data-prohibitions': '[editContent]',
                              }),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
                              'data-uid': 'src/pages/Settings.tsx:1116:19',
                              'data-prohibitions': '[]',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Settings.tsx:1117:21',
                                  'data-prohibitions': '[]',
                                  value: 'internal',
                                  children: 'Sistema Interno',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Settings.tsx:1118:21',
                                  'data-prohibitions': '[]',
                                  value: 'whatsapp',
                                  children: 'WhatsApp',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Settings.tsx:1119:21',
                                  'data-prohibitions': '[]',
                                  value: 'email',
                                  children: 'Email',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Settings.tsx:1123:15',
                      'data-prohibitions': '[editContent]',
                      className: 'space-y-3',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                          'data-uid': 'src/pages/Settings.tsx:1124:17',
                          'data-prohibitions': '[]',
                          children: 'Tempo de Disparo (Offset)',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                          'data-uid': 'src/pages/Settings.tsx:1125:17',
                          'data-prohibitions': '[]',
                          className: 'flex gap-4 mb-2',
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('label', {
                              'data-uid': 'src/pages/Settings.tsx:1126:19',
                              'data-prohibitions': '[]',
                              className: 'flex items-center gap-2 cursor-pointer',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('input', {
                                  'data-uid': 'src/pages/Settings.tsx:1127:21',
                                  'data-prohibitions': '[editContent]',
                                  type: 'radio',
                                  name: 'timing_unit',
                                  checked: notifForm.timing_unit === 'hours_minutes',
                                  onChange: () =>
                                    setNotifForm({
                                      ...notifForm,
                                      timing_unit: 'hours_minutes',
                                    }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                  'data-uid': 'src/pages/Settings.tsx:1133:21',
                                  'data-prohibitions': '[]',
                                  className: 'text-sm',
                                  children: 'Horas/Minutos',
                                }),
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('label', {
                              'data-uid': 'src/pages/Settings.tsx:1135:19',
                              'data-prohibitions': '[]',
                              className: 'flex items-center gap-2 cursor-pointer',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('input', {
                                  'data-uid': 'src/pages/Settings.tsx:1136:21',
                                  'data-prohibitions': '[editContent]',
                                  type: 'radio',
                                  name: 'timing_unit',
                                  checked: notifForm.timing_unit === 'days',
                                  onChange: () =>
                                    setNotifForm({
                                      ...notifForm,
                                      timing_unit: 'days',
                                    }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                  'data-uid': 'src/pages/Settings.tsx:1142:21',
                                  'data-prohibitions': '[]',
                                  className: 'text-sm',
                                  children: 'Dias',
                                }),
                              ],
                            }),
                          ],
                        }),
                        notifForm.timing_unit === 'hours_minutes'
                          ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                              'data-uid': 'src/pages/Settings.tsx:1147:19',
                              'data-prohibitions': '[]',
                              className: 'flex gap-2',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                  'data-uid': 'src/pages/Settings.tsx:1148:21',
                                  'data-prohibitions': '[]',
                                  className: 'flex-1 space-y-1',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                      'data-uid': 'src/pages/Settings.tsx:1149:23',
                                      'data-prohibitions': '[]',
                                      className: 'text-xs',
                                      children: 'Horas',
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                                      'data-uid': 'src/pages/Settings.tsx:1150:23',
                                      'data-prohibitions': '[editContent]',
                                      type: 'number',
                                      min: '0',
                                      value: notifForm.timing_hours,
                                      onChange: (e) =>
                                        setNotifForm({
                                          ...notifForm,
                                          timing_hours: Number(e.target.value),
                                        }),
                                    }),
                                  ],
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                  'data-uid': 'src/pages/Settings.tsx:1159:21',
                                  'data-prohibitions': '[]',
                                  className: 'flex-1 space-y-1',
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                      'data-uid': 'src/pages/Settings.tsx:1160:23',
                                      'data-prohibitions': '[]',
                                      className: 'text-xs',
                                      children: 'Minutos',
                                    }),
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                                      'data-uid': 'src/pages/Settings.tsx:1161:23',
                                      'data-prohibitions': '[editContent]',
                                      type: 'number',
                                      min: '0',
                                      max: '59',
                                      value: notifForm.timing_minutes,
                                      onChange: (e) =>
                                        setNotifForm({
                                          ...notifForm,
                                          timing_minutes: Number(e.target.value),
                                        }),
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                              'data-uid': 'src/pages/Settings.tsx:1173:19',
                              'data-prohibitions': '[]',
                              className: 'space-y-1',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                                  'data-uid': 'src/pages/Settings.tsx:1174:21',
                                  'data-prohibitions': '[]',
                                  className: 'text-xs',
                                  children: 'Dias',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                                  'data-uid': 'src/pages/Settings.tsx:1175:21',
                                  'data-prohibitions': '[editContent]',
                                  type: 'number',
                                  min: '0',
                                  value: notifForm.timing_days,
                                  onChange: (e) =>
                                    setNotifForm({
                                      ...notifForm,
                                      timing_days: Number(e.target.value),
                                    }),
                                }),
                              ],
                            }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Settings.tsx:1188:13',
                  'data-prohibitions': '[]',
                  className: 'flex items-center space-x-2 pt-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)('input', {
                      'data-uid': 'src/pages/Settings.tsx:1189:15',
                      'data-prohibitions': '[editContent]',
                      type: 'checkbox',
                      id: 'is_active',
                      checked: notifForm.is_active,
                      onChange: (e) =>
                        setNotifForm({
                          ...notifForm,
                          is_active: e.target.checked,
                        }),
                      className: 'rounded border-gray-300 text-primary focus:ring-primary',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/pages/Settings.tsx:1196:15',
                      'data-prohibitions': '[]',
                      htmlFor: 'is_active',
                      className: 'cursor-pointer',
                      children: 'Regra Ativa',
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
              'data-uid': 'src/pages/Settings.tsx:1201:11',
              'data-prohibitions': '[]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                'data-uid': 'src/pages/Settings.tsx:1202:13',
                'data-prohibitions': '[]',
                onClick: handleSaveNotif,
                className: 'w-full sm:w-auto',
                children: 'Salvar Regra',
              }),
            }),
          ],
        }),
      }),
    ],
  })
}
//#endregion
export { Settings as default }

//# sourceMappingURL=Settings-GCBJL3xf.js.map
