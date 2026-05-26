import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-CpkZU50A.js'
import { t as Pen } from './pen-eoOPQvbk.js'
import { t as Plus } from './plus-Bmw6w3Gn.js'
import { t as Trash2 } from './trash-2-BTuL3_e1.js'
import {
  I as Input,
  K as phoneMask,
  L as Button,
  S as DialogTitle,
  V as toast,
  _ as Dialog,
  a as pb,
  at as createLucideIcon,
  b as DialogFooter,
  c as SelectContent,
  f as SelectTrigger,
  i as useAuth,
  p as SelectValue,
  s as Select,
  u as SelectItem,
  v as DialogContent,
  x as DialogHeader,
} from './index-DGvWxLYe.js'
import { t as extractFieldErrors } from './errors-DP6_FK0C.js'
import { n as CardContent, t as Card } from './card-Bbf0jma7.js'
import {
  a as TableHeader,
  i as TableHead,
  n as TableBody,
  o as TableRow,
  r as TableCell,
  t as Table,
} from './table-p-co-SvT.js'
import { t as Badge } from './badge-eoS9dLww.js'
var LoaderCircle = createLucideIcon('loader-circle', [
  [
    'path',
    {
      d: 'M21 12a9 9 0 1 1-6.219-8.56',
      key: '13zald',
    },
  ],
])
var Mail = createLucideIcon('mail', [
  [
    'path',
    {
      d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7',
      key: '132q7q',
    },
  ],
  [
    'rect',
    {
      x: '2',
      y: '4',
      width: '20',
      height: '16',
      rx: '2',
      key: 'izxlao',
    },
  ],
])
//#endregion
//#region src/pages/Users.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
function UsersPage() {
  const [users, setUsers] = (0, import_react.useState)([])
  const [loading, setLoading] = (0, import_react.useState)(true)
  const [modalOpen, setModalOpen] = (0, import_react.useState)(false)
  const [formData, setFormData] = (0, import_react.useState)({
    id: '',
    name: '',
    surname: '',
    email: '',
    oldPassword: '',
    password: '',
    passwordConfirm: '',
    access_level: 'Autonomo',
    plan: 'Free',
    whatsapp: '',
  })
  const [originalEmail, setOriginalEmail] = (0, import_react.useState)('')
  const [fieldErrors, setFieldErrors] = (0, import_react.useState)({})
  const [saving, setSaving] = (0, import_react.useState)(false)
  const { user: currentUser } = useAuth()
  const loadUsers = async () => {
    try {
      setLoading(true)
      setUsers(await pb.collection('users').getFullList({ sort: '-created' }))
    } catch (err) {
      toast.error('Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }
  ;(0, import_react.useEffect)(() => {
    loadUsers()
  }, [])
  const handleSave = async () => {
    setFieldErrors({})
    if (formData.password && formData.password !== formData.passwordConfirm) {
      setFieldErrors({ passwordConfirm: 'As senhas não coincidem.' })
      return
    }
    try {
      setSaving(true)
      if (formData.id) {
        const data = {
          name: formData.name,
          surname: formData.surname,
          access_level: formData.access_level,
          plan: formData.plan,
          whatsapp: formData.whatsapp,
        }
        let needsOldPassword = false
        if (formData.email !== originalEmail) {
          data.email = formData.email
          needsOldPassword = true
        }
        if (formData.password) {
          data.password = formData.password
          data.passwordConfirm = formData.passwordConfirm
          needsOldPassword = true
        }
        if (needsOldPassword) {
          if (!formData.oldPassword) {
            setFieldErrors({
              oldPassword: 'Senha atual é obrigatória para alterar email ou senha.',
            })
            setSaving(false)
            return
          }
          data.oldPassword = formData.oldPassword
        }
        await pb.collection('users').update(formData.id, data)
        toast.success('Usuário atualizado com sucesso')
      } else {
        const createData = {
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
          access_level: formData.access_level,
          plan: formData.plan,
          whatsapp: formData.whatsapp,
        }
        await pb.collection('users').create(createData)
        toast.success('Usuário criado com sucesso')
      }
      setModalOpen(false)
      loadUsers()
    } catch (err) {
      const errs = extractFieldErrors(err)
      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs)
        toast.error('Verifique os erros nos campos do formulário.')
      } else
        toast.error(
          'Erro ao salvar usuário. Verifique se as senhas coincidem e se o email já está em uso.',
        )
    } finally {
      setSaving(false)
    }
  }
  const handleDelete = async (id) => {
    if (!confirm('Deseja excluir este usuário? Esta ação é irreversível.')) return
    try {
      await pb.collection('users').delete(id)
      toast.success('Excluído com sucesso')
      loadUsers()
    } catch (err) {
      toast.error('Erro ao excluir')
    }
  }
  const openNew = () => {
    setOriginalEmail('')
    setFieldErrors({})
    setFormData({
      id: '',
      name: '',
      surname: '',
      email: '',
      oldPassword: '',
      password: '',
      passwordConfirm: '',
      access_level: 'Autonomo',
      plan: 'Free',
      whatsapp: '',
    })
    setModalOpen(true)
  }
  const openEdit = (u) => {
    setOriginalEmail(u.email || '')
    setFieldErrors({})
    setFormData({
      id: u.id,
      name: u.name || '',
      surname: u.surname || '',
      email: u.email || '',
      oldPassword: '',
      password: '',
      passwordConfirm: '',
      access_level: u.access_level || 'Autonomo',
      plan: u.plan || 'Free',
      whatsapp: u.whatsapp || '',
    })
    setModalOpen(true)
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/pages/Users.tsx:196:5',
    'data-prohibitions': '[editContent]',
    className: 'space-y-6 animate-fade-in pb-20 md:pb-6',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/Users.tsx:197:7',
        'data-prohibitions': '[]',
        className: 'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            'data-uid': 'src/pages/Users.tsx:198:9',
            'data-prohibitions': '[]',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
                'data-uid': 'src/pages/Users.tsx:199:11',
                'data-prohibitions': '[]',
                className: 'text-2xl font-bold tracking-tight',
                children: 'Usuários e Acessos',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                'data-uid': 'src/pages/Users.tsx:200:11',
                'data-prohibitions': '[]',
                className: 'text-muted-foreground text-sm',
                children: 'Gerencie quem tem acesso ao sistema',
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
            'data-uid': 'src/pages/Users.tsx:202:9',
            'data-prohibitions': '[]',
            onClick: openNew,
            className: 'w-full sm:w-auto',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                'data-uid': 'src/pages/Users.tsx:203:11',
                'data-prohibitions': '[editContent]',
                className: 'mr-2 h-4 w-4',
              }),
              ' Novo Usuário',
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
        'data-uid': 'src/pages/Users.tsx:207:7',
        'data-prohibitions': '[editContent]',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
          'data-uid': 'src/pages/Users.tsx:208:9',
          'data-prohibitions': '[editContent]',
          className: 'p-0',
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            'data-uid': 'src/pages/Users.tsx:209:11',
            'data-prohibitions': '[editContent]',
            className: 'overflow-x-auto w-full',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
              'data-uid': 'src/pages/Users.tsx:210:13',
              'data-prohibitions': '[editContent]',
              className: 'min-w-[600px]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
                  'data-uid': 'src/pages/Users.tsx:211:15',
                  'data-prohibitions': '[]',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
                    'data-uid': 'src/pages/Users.tsx:212:17',
                    'data-prohibitions': '[]',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                        'data-uid': 'src/pages/Users.tsx:213:19',
                        'data-prohibitions': '[]',
                        children: 'Usuário',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                        'data-uid': 'src/pages/Users.tsx:214:19',
                        'data-prohibitions': '[]',
                        children: 'Contatos',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                        'data-uid': 'src/pages/Users.tsx:215:19',
                        'data-prohibitions': '[]',
                        children: 'Nível',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                        'data-uid': 'src/pages/Users.tsx:216:19',
                        'data-prohibitions': '[]',
                        children: 'Plano',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                        'data-uid': 'src/pages/Users.tsx:217:19',
                        'data-prohibitions': '[]',
                        className: 'text-right',
                        children: 'Ações',
                      }),
                    ],
                  }),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
                  'data-uid': 'src/pages/Users.tsx:220:15',
                  'data-prohibitions': '[editContent]',
                  children: [
                    loading
                      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                          'data-uid': 'src/pages/Users.tsx:222:19',
                          'data-prohibitions': '[]',
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                            'data-uid': 'src/pages/Users.tsx:223:21',
                            'data-prohibitions': '[]',
                            colSpan: 5,
                            className: 'text-center py-12',
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
                              'data-uid': 'src/pages/Users.tsx:224:23',
                              'data-prohibitions': '[editContent]',
                              className: 'h-6 w-6 animate-spin mx-auto text-primary',
                            }),
                          }),
                        })
                      : users.map((u) =>
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            TableRow,
                            {
                              'data-uid': 'src/pages/Users.tsx:229:21',
                              'data-prohibitions': '[editContent]',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                  'data-uid': 'src/pages/Users.tsx:230:23',
                                  'data-prohibitions': '[editContent]',
                                  className: 'font-medium',
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Users.tsx:231:25',
                                    'data-prohibitions': '[editContent]',
                                    className: 'flex items-center gap-3',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                                        'data-uid': 'src/pages/Users.tsx:232:27',
                                        'data-prohibitions': '[editContent]',
                                        className:
                                          'h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0',
                                        children: u.avatar
                                          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('img', {
                                              'data-uid': 'src/pages/Users.tsx:234:31',
                                              'data-prohibitions': '[editContent]',
                                              src: pb.files.getUrl(u, u.avatar),
                                              alt: u.name,
                                              className: 'h-full w-full object-cover',
                                            })
                                          : /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                              'data-uid': 'src/pages/Users.tsx:240:31',
                                              'data-prohibitions': '[editContent]',
                                              className: 'text-primary font-bold',
                                              children: (u.name?.charAt(0) || 'U').toUpperCase(),
                                            }),
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                        'data-uid': 'src/pages/Users.tsx:245:27',
                                        'data-prohibitions': '[editContent]',
                                        children: [u.name || 'Sem nome', ' ', u.surname || ''],
                                      }),
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                  'data-uid': 'src/pages/Users.tsx:250:23',
                                  'data-prohibitions': '[editContent]',
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Users.tsx:251:25',
                                    'data-prohibitions': '[editContent]',
                                    className: 'flex flex-col gap-1 text-sm',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                        'data-uid': 'src/pages/Users.tsx:252:27',
                                        'data-prohibitions': '[editContent]',
                                        className: 'flex items-center gap-2',
                                        children: [
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
                                            'data-uid': 'src/pages/Users.tsx:253:29',
                                            'data-prohibitions': '[editContent]',
                                            className: 'h-3 w-3 text-muted-foreground shrink-0',
                                          }),
                                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                            'data-uid': 'src/pages/Users.tsx:254:29',
                                            'data-prohibitions': '[editContent]',
                                            className: 'break-all whitespace-normal',
                                            children:
                                              u.email ||
                                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                                'data-uid': 'src/pages/Users.tsx:256:33',
                                                'data-prohibitions': '[]',
                                                className: 'text-muted-foreground italic',
                                                children: 'Não informado',
                                              }),
                                          }),
                                        ],
                                      }),
                                      u.whatsapp &&
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                          'data-uid': 'src/pages/Users.tsx:261:29',
                                          'data-prohibitions': '[editContent]',
                                          className:
                                            'flex items-center gap-2 text-muted-foreground',
                                          children: [
                                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                              'data-uid': 'src/pages/Users.tsx:262:31',
                                              'data-prohibitions': '[]',
                                              className: 'text-xs',
                                              children: 'WA:',
                                            }),
                                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                              'data-uid': 'src/pages/Users.tsx:263:31',
                                              'data-prohibitions': '[editContent]',
                                              className: 'break-all whitespace-normal',
                                              children: phoneMask(u.whatsapp),
                                            }),
                                          ],
                                        }),
                                    ],
                                  }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                  'data-uid': 'src/pages/Users.tsx:270:23',
                                  'data-prohibitions': '[editContent]',
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                                    'data-uid': 'src/pages/Users.tsx:271:25',
                                    'data-prohibitions': '[editContent]',
                                    variant: 'outline',
                                    children: u.access_level || 'Autonomo',
                                  }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                  'data-uid': 'src/pages/Users.tsx:273:23',
                                  'data-prohibitions': '[editContent]',
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                                    'data-uid': 'src/pages/Users.tsx:274:25',
                                    'data-prohibitions': '[editContent]',
                                    variant: 'secondary',
                                    children: u.plan || 'Free',
                                  }),
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                  'data-uid': 'src/pages/Users.tsx:276:23',
                                  'data-prohibitions': '[]',
                                  className: 'text-right',
                                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                    'data-uid': 'src/pages/Users.tsx:277:25',
                                    'data-prohibitions': '[]',
                                    className: 'flex justify-end gap-1',
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                        'data-uid': 'src/pages/Users.tsx:278:27',
                                        'data-prohibitions': '[]',
                                        variant: 'ghost',
                                        size: 'icon',
                                        onClick: () => openEdit(u),
                                        title: 'Editar',
                                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
                                          'data-uid': 'src/pages/Users.tsx:284:29',
                                          'data-prohibitions': '[editContent]',
                                          className: 'h-4 w-4',
                                        }),
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                        'data-uid': 'src/pages/Users.tsx:286:27',
                                        'data-prohibitions': '[]',
                                        variant: 'ghost',
                                        size: 'icon',
                                        onClick: () => handleDelete(u.id),
                                        disabled: u.id === currentUser?.id,
                                        title: 'Excluir',
                                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                          Trash2,
                                          {
                                            'data-uid': 'src/pages/Users.tsx:293:29',
                                            'data-prohibitions': '[editContent]',
                                            className: 'h-4 w-4 text-destructive',
                                          },
                                        ),
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            u.id,
                          ),
                        ),
                    !loading &&
                      users.length === 0 &&
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                        'data-uid': 'src/pages/Users.tsx:301:19',
                        'data-prohibitions': '[]',
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                          'data-uid': 'src/pages/Users.tsx:302:21',
                          'data-prohibitions': '[]',
                          colSpan: 5,
                          className: 'text-center py-12 text-muted-foreground',
                          children: 'Nenhum usuário encontrado.',
                        }),
                      }),
                  ],
                }),
              ],
            }),
          }),
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
        'data-uid': 'src/pages/Users.tsx:313:7',
        'data-prohibitions': '[editContent]',
        open: modalOpen,
        onOpenChange: setModalOpen,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
          'data-uid': 'src/pages/Users.tsx:314:9',
          'data-prohibitions': '[editContent]',
          className: 'w-[95vw] max-w-lg',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
              'data-uid': 'src/pages/Users.tsx:315:11',
              'data-prohibitions': '[editContent]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
                'data-uid': 'src/pages/Users.tsx:316:13',
                'data-prohibitions': '[editContent]',
                children: [formData.id ? 'Editar' : 'Novo', ' Usuário'],
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/pages/Users.tsx:318:11',
              'data-prohibitions': '[editContent]',
              className: 'space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Users.tsx:319:13',
                  'data-prohibitions': '[editContent]',
                  className: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Users.tsx:320:15',
                      'data-prohibitions': '[editContent]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('label', {
                          'data-uid': 'src/pages/Users.tsx:321:17',
                          'data-prohibitions': '[]',
                          className: 'text-sm font-medium',
                          children: 'Nome',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          'data-uid': 'src/pages/Users.tsx:322:17',
                          'data-prohibitions': '[editContent]',
                          value: formData.name,
                          onChange: (e) =>
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            }),
                          placeholder: 'Nome',
                        }),
                        fieldErrors.name &&
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                            'data-uid': 'src/pages/Users.tsx:327:38',
                            'data-prohibitions': '[editContent]',
                            className: 'text-sm text-destructive',
                            children: fieldErrors.name,
                          }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Users.tsx:329:15',
                      'data-prohibitions': '[editContent]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('label', {
                          'data-uid': 'src/pages/Users.tsx:330:17',
                          'data-prohibitions': '[]',
                          className: 'text-sm font-medium',
                          children: 'Sobrenome',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          'data-uid': 'src/pages/Users.tsx:331:17',
                          'data-prohibitions': '[editContent]',
                          value: formData.surname,
                          onChange: (e) =>
                            setFormData({
                              ...formData,
                              surname: e.target.value,
                            }),
                          placeholder: 'Sobrenome',
                        }),
                        fieldErrors.surname &&
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                            'data-uid': 'src/pages/Users.tsx:337:19',
                            'data-prohibitions': '[editContent]',
                            className: 'text-sm text-destructive',
                            children: fieldErrors.surname,
                          }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Users.tsx:341:13',
                  'data-prohibitions': '[editContent]',
                  className: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Users.tsx:342:15',
                      'data-prohibitions': '[editContent]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('label', {
                          'data-uid': 'src/pages/Users.tsx:343:17',
                          'data-prohibitions': '[]',
                          className: 'text-sm font-medium',
                          children: 'E-mail',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          'data-uid': 'src/pages/Users.tsx:344:17',
                          'data-prohibitions': '[editContent]',
                          type: 'email',
                          value: formData.email,
                          onChange: (e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            }),
                          placeholder: 'exemplo@email.com',
                        }),
                        fieldErrors.email &&
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                            'data-uid': 'src/pages/Users.tsx:351:19',
                            'data-prohibitions': '[editContent]',
                            className: 'text-sm text-destructive',
                            children: fieldErrors.email,
                          }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Users.tsx:354:15',
                      'data-prohibitions': '[editContent]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('label', {
                          'data-uid': 'src/pages/Users.tsx:355:17',
                          'data-prohibitions': '[]',
                          className: 'text-sm font-medium',
                          children: 'WhatsApp',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          'data-uid': 'src/pages/Users.tsx:356:17',
                          'data-prohibitions': '[editContent]',
                          value: phoneMask(formData.whatsapp),
                          onChange: (e) =>
                            setFormData({
                              ...formData,
                              whatsapp: phoneMask(e.target.value),
                            }),
                          placeholder: '(00) 00000-0000',
                        }),
                        fieldErrors.whatsapp &&
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                            'data-uid': 'src/pages/Users.tsx:364:19',
                            'data-prohibitions': '[editContent]',
                            className: 'text-sm text-destructive',
                            children: fieldErrors.whatsapp,
                          }),
                      ],
                    }),
                  ],
                }),
                formData.id &&
                  (formData.email !== originalEmail || formData.password) &&
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/pages/Users.tsx:370:15',
                    'data-prohibitions': '[editContent]',
                    className: 'space-y-2',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('label', {
                        'data-uid': 'src/pages/Users.tsx:371:17',
                        'data-prohibitions': '[]',
                        className: 'text-sm font-medium',
                        children: 'Senha Atual (obrigatória para alterar email ou senha)',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                        'data-uid': 'src/pages/Users.tsx:374:17',
                        'data-prohibitions': '[editContent]',
                        type: 'password',
                        value: formData.oldPassword,
                        onChange: (e) =>
                          setFormData({
                            ...formData,
                            oldPassword: e.target.value,
                          }),
                        placeholder: 'Digite a senha atual',
                      }),
                      fieldErrors.oldPassword &&
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                          'data-uid': 'src/pages/Users.tsx:381:19',
                          'data-prohibitions': '[editContent]',
                          className: 'text-sm text-destructive',
                          children: fieldErrors.oldPassword,
                        }),
                    ],
                  }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Users.tsx:386:13',
                  'data-prohibitions': '[editContent]',
                  className: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Users.tsx:387:15',
                      'data-prohibitions': '[editContent]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('label', {
                          'data-uid': 'src/pages/Users.tsx:388:17',
                          'data-prohibitions': '[editContent]',
                          className: 'text-sm font-medium',
                          children: ['Senha ', formData.id && '(Opcional)'],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          'data-uid': 'src/pages/Users.tsx:389:17',
                          'data-prohibitions': '[editContent]',
                          type: 'password',
                          value: formData.password,
                          onChange: (e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            }),
                          placeholder: 'Mínimo 8 caracteres',
                        }),
                        fieldErrors.password &&
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                            'data-uid': 'src/pages/Users.tsx:396:19',
                            'data-prohibitions': '[editContent]',
                            className: 'text-sm text-destructive',
                            children: fieldErrors.password,
                          }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Users.tsx:399:15',
                      'data-prohibitions': '[editContent]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('label', {
                          'data-uid': 'src/pages/Users.tsx:400:17',
                          'data-prohibitions': '[]',
                          className: 'text-sm font-medium',
                          children: 'Confirmar Senha',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                          'data-uid': 'src/pages/Users.tsx:401:17',
                          'data-prohibitions': '[editContent]',
                          type: 'password',
                          value: formData.passwordConfirm,
                          onChange: (e) =>
                            setFormData({
                              ...formData,
                              passwordConfirm: e.target.value,
                            }),
                          placeholder: 'Repita a senha',
                        }),
                        fieldErrors.passwordConfirm &&
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                            'data-uid': 'src/pages/Users.tsx:408:19',
                            'data-prohibitions': '[editContent]',
                            className: 'text-sm text-destructive',
                            children: fieldErrors.passwordConfirm,
                          }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/pages/Users.tsx:412:13',
                  'data-prohibitions': '[editContent]',
                  className: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Users.tsx:413:15',
                      'data-prohibitions': '[editContent]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('label', {
                          'data-uid': 'src/pages/Users.tsx:414:17',
                          'data-prohibitions': '[]',
                          className: 'text-sm font-medium',
                          children: 'Nível de Acesso',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                          'data-uid': 'src/pages/Users.tsx:415:17',
                          'data-prohibitions': '[]',
                          value: formData.access_level,
                          onValueChange: (v) =>
                            setFormData({
                              ...formData,
                              access_level: v,
                            }),
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                              'data-uid': 'src/pages/Users.tsx:419:19',
                              'data-prohibitions': '[]',
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                                'data-uid': 'src/pages/Users.tsx:420:21',
                                'data-prohibitions': '[editContent]',
                              }),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
                              'data-uid': 'src/pages/Users.tsx:422:19',
                              'data-prohibitions': '[]',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Users.tsx:423:21',
                                  'data-prohibitions': '[]',
                                  value: 'Admin',
                                  children: 'Admin',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Users.tsx:424:21',
                                  'data-prohibitions': '[]',
                                  value: 'Socio',
                                  children: 'Socio',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Users.tsx:425:21',
                                  'data-prohibitions': '[]',
                                  value: 'Autonomo',
                                  children: 'Autonomo',
                                }),
                              ],
                            }),
                          ],
                        }),
                        fieldErrors.access_level &&
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                            'data-uid': 'src/pages/Users.tsx:429:19',
                            'data-prohibitions': '[editContent]',
                            className: 'text-sm text-destructive',
                            children: fieldErrors.access_level,
                          }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                      'data-uid': 'src/pages/Users.tsx:432:15',
                      'data-prohibitions': '[editContent]',
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('label', {
                          'data-uid': 'src/pages/Users.tsx:433:17',
                          'data-prohibitions': '[]',
                          className: 'text-sm font-medium',
                          children: 'Plano',
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                          'data-uid': 'src/pages/Users.tsx:434:17',
                          'data-prohibitions': '[]',
                          value: formData.plan,
                          onValueChange: (v) =>
                            setFormData({
                              ...formData,
                              plan: v,
                            }),
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                              'data-uid': 'src/pages/Users.tsx:438:19',
                              'data-prohibitions': '[]',
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                                'data-uid': 'src/pages/Users.tsx:439:21',
                                'data-prohibitions': '[editContent]',
                              }),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
                              'data-uid': 'src/pages/Users.tsx:441:19',
                              'data-prohibitions': '[]',
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Users.tsx:442:21',
                                  'data-prohibitions': '[]',
                                  value: 'Free',
                                  children: 'Free',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Users.tsx:443:21',
                                  'data-prohibitions': '[]',
                                  value: 'Basic',
                                  children: 'Basic',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Users.tsx:444:21',
                                  'data-prohibitions': '[]',
                                  value: 'Pro',
                                  children: 'Pro',
                                }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                  'data-uid': 'src/pages/Users.tsx:445:21',
                                  'data-prohibitions': '[]',
                                  value: 'Platinum',
                                  children: 'Platinum',
                                }),
                              ],
                            }),
                          ],
                        }),
                        fieldErrors.plan &&
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                            'data-uid': 'src/pages/Users.tsx:448:38',
                            'data-prohibitions': '[editContent]',
                            className: 'text-sm text-destructive',
                            children: fieldErrors.plan,
                          }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
              'data-uid': 'src/pages/Users.tsx:452:11',
              'data-prohibitions': '[editContent]',
              className: 'gap-2 sm:gap-0 mt-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/pages/Users.tsx:453:13',
                  'data-prohibitions': '[]',
                  variant: 'outline',
                  onClick: () => setModalOpen(false),
                  children: 'Cancelar',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                  'data-uid': 'src/pages/Users.tsx:456:13',
                  'data-prohibitions': '[editContent]',
                  onClick: handleSave,
                  disabled: saving,
                  children: [
                    saving
                      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
                          'data-uid': 'src/pages/Users.tsx:457:25',
                          'data-prohibitions': '[editContent]',
                          className: 'h-4 w-4 animate-spin mr-2',
                        })
                      : null,
                    ' Salvar',
                  ],
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
export { UsersPage as default }

//# sourceMappingURL=Users-BS27hnKa.js.map
