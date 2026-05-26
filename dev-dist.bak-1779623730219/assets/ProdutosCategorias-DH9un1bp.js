import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-CpkZU50A.js'
import { n as Upload, t as ImportDialog } from './ImportDialog-BI1ynrF5.js'
import { t as Plus } from './plus-DvjhZ_cM.js'
import { t as Scissors } from './scissors-DdcPwRbB.js'
import { t as Trash2 } from './trash-2-pYjEA2AN.js'
import {
  L as Input,
  R as Button,
  S as DialogTitle,
  U as cn,
  _ as Dialog,
  _t as useToast,
  a as pb,
  b as DialogFooter,
  c as SelectContent,
  f as SelectTrigger,
  n as useRealtime,
  p as SelectValue,
  s as Select,
  st as createLucideIcon,
  t as Label,
  u as SelectItem,
  v as DialogContent,
  x as DialogHeader,
} from './index-BcGnSmFb.js'
import { t as format } from './format-BWFAnkIi.js'
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from './tabs-Cw6ihMfc.js'
import {
  a as TableHeader,
  i as TableHead,
  n as TableBody,
  o as TableRow,
  r as TableCell,
  t as Table,
} from './table-TwBqvL7o.js'
import { t as Badge } from './badge-DRj6JnG1.js'
import { t as Switch } from './switch-WmctPexT.js'
import { n as getCategories } from './categories-VhnWVJJv.js'
var Pencil = createLucideIcon('pencil', [
  [
    'path',
    {
      d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
      key: '1a8usu',
    },
  ],
  [
    'path',
    {
      d: 'm15 5 4 4',
      key: '1mk7zo',
    },
  ],
])
//#endregion
//#region src/services/products.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var getProducts = () =>
  pb.collection('products').getFullList({
    sort: '-created',
    expand: 'category_id,supplier_ids',
  })
var createProduct = (data) => pb.collection('products').create(data)
var updateProduct = (id, data) => pb.collection('products').update(id, data)
var deleteProduct = (id) => pb.collection('products').delete(id)
//#endregion
//#region src/components/estoque/ProductFormDialog.tsx
var import_jsx_runtime = require_jsx_runtime()
function ProductFormDialog({ open, onOpenChange, productToEdit, onSuccess }) {
  const { toast } = useToast()
  const [loading, setLoading] = (0, import_react.useState)(false)
  const [name, setName] = (0, import_react.useState)('')
  const [price, setPrice] = (0, import_react.useState)('')
  const [costPrice, setCostPrice] = (0, import_react.useState)('')
  const [stockQuantity, setStockQuantity] = (0, import_react.useState)('')
  const [categoryId, setCategoryId] = (0, import_react.useState)('')
  const [categories, setCategories] = (0, import_react.useState)([])
  ;(0, import_react.useEffect)(() => {
    getCategories()
      .then((data) => setCategories(data.filter((c) => c.type === 'product')))
      .catch(console.error)
  }, [])
  ;(0, import_react.useEffect)(() => {
    if (open)
      if (productToEdit) {
        setName(productToEdit.name)
        setPrice(productToEdit.price)
        setCostPrice(productToEdit.cost_price)
        setStockQuantity(productToEdit.stock_quantity)
        setCategoryId(productToEdit.category_id || '')
      } else {
        setName('')
        setPrice('')
        setCostPrice('')
        setStockQuantity(0)
        setCategoryId('')
      }
  }, [open, productToEdit])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      name,
      price: Number(price),
      cost_price: Number(costPrice),
      stock_quantity: Number(stockQuantity),
      category_id: categoryId || null,
      is_active: true,
    }
    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, data)
        toast({ title: 'Produto atualizado' })
      } else {
        await createProduct(data)
        toast({ title: 'Produto criado' })
      }
      onSuccess()
      onOpenChange(false)
    } catch (err) {
      toast({
        title: 'Erro',
        description: err.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
    'data-uid': 'src/components/estoque/ProductFormDialog.tsx:80:5',
    'data-prohibitions': '[editContent]',
    open,
    onOpenChange,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
      'data-uid': 'src/components/estoque/ProductFormDialog.tsx:81:7',
      'data-prohibitions': '[editContent]',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
          'data-uid': 'src/components/estoque/ProductFormDialog.tsx:82:9',
          'data-prohibitions': '[editContent]',
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
            'data-uid': 'src/components/estoque/ProductFormDialog.tsx:83:11',
            'data-prohibitions': '[editContent]',
            children: productToEdit ? 'Editar Produto' : 'Novo Produto',
          }),
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('form', {
          'data-uid': 'src/components/estoque/ProductFormDialog.tsx:85:9',
          'data-prohibitions': '[editContent]',
          onSubmit: handleSubmit,
          className: 'space-y-4 mt-4',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/components/estoque/ProductFormDialog.tsx:86:11',
              'data-prohibitions': '[]',
              className: 'space-y-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                  'data-uid': 'src/components/estoque/ProductFormDialog.tsx:87:13',
                  'data-prohibitions': '[]',
                  children: 'Nome',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                  'data-uid': 'src/components/estoque/ProductFormDialog.tsx:88:13',
                  'data-prohibitions': '[editContent]',
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  required: true,
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/components/estoque/ProductFormDialog.tsx:90:11',
              'data-prohibitions': '[editContent]',
              className: 'space-y-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                  'data-uid': 'src/components/estoque/ProductFormDialog.tsx:91:13',
                  'data-prohibitions': '[]',
                  children: 'Categoria',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                  'data-uid': 'src/components/estoque/ProductFormDialog.tsx:92:13',
                  'data-prohibitions': '[editContent]',
                  value: categoryId,
                  onValueChange: setCategoryId,
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                      'data-uid': 'src/components/estoque/ProductFormDialog.tsx:93:15',
                      'data-prohibitions': '[]',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                        'data-uid': 'src/components/estoque/ProductFormDialog.tsx:94:17',
                        'data-prohibitions': '[editContent]',
                        placeholder: 'Selecione uma categoria...',
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                      'data-uid': 'src/components/estoque/ProductFormDialog.tsx:96:15',
                      'data-prohibitions': '[editContent]',
                      children:
                        categories.length === 0
                          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                              'data-uid': 'src/components/estoque/ProductFormDialog.tsx:98:19',
                              'data-prohibitions': '[]',
                              className: 'p-2 text-sm text-muted-foreground',
                              children: 'Nenhuma categoria de produto encontrada',
                            })
                          : categories.map((c) =>
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                SelectItem,
                                {
                                  'data-uid': 'src/components/estoque/ProductFormDialog.tsx:103:21',
                                  'data-prohibitions': '[editContent]',
                                  value: c.id,
                                  children: c.name,
                                },
                                c.id,
                              ),
                            ),
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/components/estoque/ProductFormDialog.tsx:111:11',
              'data-prohibitions': '[]',
              className: 'grid grid-cols-2 gap-4',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/components/estoque/ProductFormDialog.tsx:112:13',
                  'data-prohibitions': '[]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/components/estoque/ProductFormDialog.tsx:113:15',
                      'data-prohibitions': '[]',
                      children: 'Preço de Venda (R$)',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      'data-uid': 'src/components/estoque/ProductFormDialog.tsx:114:15',
                      'data-prohibitions': '[editContent]',
                      type: 'number',
                      min: '0',
                      step: '0.01',
                      value: price,
                      onChange: (e) => setPrice(Number(e.target.value)),
                      required: true,
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/components/estoque/ProductFormDialog.tsx:123:13',
                  'data-prohibitions': '[]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/components/estoque/ProductFormDialog.tsx:124:15',
                      'data-prohibitions': '[]',
                      children: 'Preço de Custo (R$)',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      'data-uid': 'src/components/estoque/ProductFormDialog.tsx:125:15',
                      'data-prohibitions': '[editContent]',
                      type: 'number',
                      min: '0',
                      step: '0.01',
                      value: costPrice,
                      onChange: (e) => setCostPrice(Number(e.target.value)),
                      required: true,
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/components/estoque/ProductFormDialog.tsx:135:11',
              'data-prohibitions': '[]',
              className: 'space-y-2',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                  'data-uid': 'src/components/estoque/ProductFormDialog.tsx:136:13',
                  'data-prohibitions': '[]',
                  children: 'Estoque Inicial',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                  'data-uid': 'src/components/estoque/ProductFormDialog.tsx:137:13',
                  'data-prohibitions': '[editContent]',
                  type: 'number',
                  min: '0',
                  value: stockQuantity,
                  onChange: (e) => setStockQuantity(Number(e.target.value)),
                  required: true,
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/components/estoque/ProductFormDialog.tsx:145:11',
              'data-prohibitions': '[editContent]',
              className: 'flex justify-end gap-2 pt-4',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/components/estoque/ProductFormDialog.tsx:146:13',
                  'data-prohibitions': '[]',
                  type: 'button',
                  variant: 'outline',
                  onClick: () => onOpenChange(false),
                  children: 'Cancelar',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/components/estoque/ProductFormDialog.tsx:149:13',
                  'data-prohibitions': '[editContent]',
                  type: 'submit',
                  disabled: loading,
                  children: loading ? 'Salvando...' : 'Salvar',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  })
}
//#endregion
//#region src/components/estoque/ProductsTab.tsx
function ProductsTab() {
  const { toast } = useToast()
  const [products, setProducts] = (0, import_react.useState)([])
  const [categories, setCategories] = (0, import_react.useState)([])
  const [searchQuery, setSearchQuery] = (0, import_react.useState)('')
  const [categoryFilter, setCategoryFilter] = (0, import_react.useState)('all')
  const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false)
  const [productToEdit, setProductToEdit] = (0, import_react.useState)(null)
  const [consumeOpen, setConsumeOpen] = (0, import_react.useState)(false)
  const [consumeProduct, setConsumeProduct] = (0, import_react.useState)(null)
  const [consumeForm, setConsumeForm] = (0, import_react.useState)({
    quantity: 1,
    barber_id: '',
    description: '',
  })
  const [barbers, setBarbers] = (0, import_react.useState)([])
  const [isImportOpen, setIsImportOpen] = (0, import_react.useState)(false)
  const handleImport = async (data) => {
    let success = 0
    let errors = 0
    const errorsList = []
    const categoriesMap = new Map(categories.map((c) => [c.name.toLowerCase().trim(), c.id]))
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      try {
        const name = row['Produto'] || row['produto'] || ''
        const catRaw = row['Categoria'] || row['categoria'] || ''
        const priceRaw =
          row['Preço de venda'] || row['preço de venda'] || row['preco de venda'] || '0'
        const costRaw =
          row['Preço de Custo'] || row['preço de custo'] || row['preco de custo'] || '0'
        const stockRaw = row['Estoque atual'] || row['estoque atual'] || '0'
        if (!name) throw new Error('Produto é obrigatório')
        let category_id = ''
        if (catRaw) {
          const catName = catRaw.trim()
          const lowerCat = catName.toLowerCase()
          if (categoriesMap.has(lowerCat)) category_id = categoriesMap.get(lowerCat)
          else {
            const newCat = await pb.collection('categories').create({
              name: catName,
              type: 'product',
            })
            categoriesMap.set(lowerCat, newCat.id)
            category_id = newCat.id
          }
        }
        const parseNum = (v) => {
          if (!v) return 0
          let s = v.toString()
          if (s.includes(',') && s.includes('.')) s = s.replace(/\./g, '').replace(',', '.')
          else if (s.includes(',')) s = s.replace(',', '.')
          return parseFloat(s) || 0
        }
        await pb.collection('products').create({
          name,
          category_id: category_id || null,
          price: parseNum(priceRaw),
          cost_price: parseNum(costRaw),
          stock_quantity: parseInt(stockRaw.toString().replace(/\D/g, ''), 10) || 0,
          is_active: true,
        })
        success++
      } catch (err) {
        errors++
        errorsList.push(`Linha ${i + 2}: ${err.message}`)
      }
    }
    if (success > 0) loadData()
    return {
      success,
      errors,
      errorsList,
    }
  }
  const loadData = async () => {
    try {
      setProducts(await getProducts())
      setCategories(await pb.collection('categories').getFullList({ filter: 'type="product"' }))
      setBarbers(await pb.collection('barbers').getFullList())
    } catch (err) {
      console.error(err)
    }
  }
  ;(0, import_react.useEffect)(() => {
    loadData()
  }, [])
  useRealtime('products', () => loadData())
  const handleEdit = (product) => {
    setProductToEdit(product)
    setIsFormOpen(true)
  }
  const handleDelete = async (id) => {
    if (confirm('Excluir produto?'))
      try {
        await deleteProduct(id)
        toast({ title: 'Produto excluído' })
        loadData()
      } catch (err) {
        toast({
          title: 'Erro',
          description: err.message,
          variant: 'destructive',
        })
      }
  }
  const handleToggleActive = async (p) => {
    try {
      await updateProduct(p.id, { is_active: !p.is_active })
      toast({ title: `Produto ${!p.is_active ? 'ativado' : 'desativado'}` })
      loadData()
    } catch (err) {
      toast({
        title: 'Erro ao alterar status',
        description: err.message,
        variant: 'destructive',
      })
    }
  }
  const handleConsumeSubmit = async () => {
    if (!consumeForm.barber_id) {
      toast({
        title: 'Selecione um profissional',
        variant: 'destructive',
      })
      return
    }
    if (consumeForm.quantity <= 0) {
      toast({
        title: 'Quantidade inválida',
        variant: 'destructive',
      })
      return
    }
    try {
      await pb.send('/backend/v1/products/consume', {
        method: 'POST',
        body: JSON.stringify({
          product_id: consumeProduct.id,
          barber_id: consumeForm.barber_id,
          quantity: consumeForm.quantity,
          description: consumeForm.description,
        }),
      })
      toast({ title: 'Consumo registrado com sucesso' })
      setConsumeOpen(false)
      loadData()
    } catch (err) {
      toast({
        title: 'Erro ao registrar consumo',
        description: err.message,
        variant: 'destructive',
      })
    }
  }
  const formatCurrency = (val) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val || 0)
  const displayedProducts = products
    .filter(
      (p) =>
        categoryFilter === 'all' ||
        p.category_id === categoryFilter ||
        p.expand?.category_id?.id === categoryFilter,
    )
    .filter((p) => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/components/estoque/ProductsTab.tsx:211:5',
    'data-prohibitions': '[editContent]',
    className: 'space-y-4 mt-4',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/components/estoque/ProductsTab.tsx:212:7',
        'data-prohibitions': '[editContent]',
        className: 'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
            'data-uid': 'src/components/estoque/ProductsTab.tsx:213:9',
            'data-prohibitions': '[]',
            className: 'text-lg font-semibold whitespace-nowrap',
            children: 'Lista de Produtos',
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            'data-uid': 'src/components/estoque/ProductsTab.tsx:214:9',
            'data-prohibitions': '[editContent]',
            className: 'flex flex-wrap items-center gap-4 flex-1 sm:justify-end',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                'data-uid': 'src/components/estoque/ProductsTab.tsx:215:11',
                'data-prohibitions': '[editContent]',
                placeholder: 'Buscar produto...',
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: 'w-full sm:w-[200px]',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                'data-uid': 'src/components/estoque/ProductsTab.tsx:221:11',
                'data-prohibitions': '[editContent]',
                value: categoryFilter,
                onValueChange: setCategoryFilter,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                    'data-uid': 'src/components/estoque/ProductsTab.tsx:222:13',
                    'data-prohibitions': '[]',
                    className: 'w-[180px]',
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                      'data-uid': 'src/components/estoque/ProductsTab.tsx:223:15',
                      'data-prohibitions': '[editContent]',
                      placeholder: 'Categorias',
                    }),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
                    'data-uid': 'src/components/estoque/ProductsTab.tsx:225:13',
                    'data-prohibitions': '[editContent]',
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                        'data-uid': 'src/components/estoque/ProductsTab.tsx:226:15',
                        'data-prohibitions': '[]',
                        value: 'all',
                        children: 'Todas',
                      }),
                      categories.map((c) =>
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          SelectItem,
                          {
                            'data-uid': 'src/components/estoque/ProductsTab.tsx:228:17',
                            'data-prohibitions': '[editContent]',
                            value: c.id,
                            children: c.name,
                          },
                          c.id,
                        ),
                      ),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                'data-uid': 'src/components/estoque/ProductsTab.tsx:234:11',
                'data-prohibitions': '[]',
                variant: 'outline',
                onClick: () => setIsImportOpen(true),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
                    'data-uid': 'src/components/estoque/ProductsTab.tsx:235:13',
                    'data-prohibitions': '[editContent]',
                    className: 'w-4 h-4 mr-2',
                  }),
                  'Importar',
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                'data-uid': 'src/components/estoque/ProductsTab.tsx:238:11',
                'data-prohibitions': '[]',
                onClick: () => {
                  setProductToEdit(null)
                  setIsFormOpen(true)
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                    'data-uid': 'src/components/estoque/ProductsTab.tsx:244:13',
                    'data-prohibitions': '[editContent]',
                    className: 'w-4 h-4 mr-2',
                  }),
                  'Novo Produto',
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportDialog, {
        'data-uid': 'src/components/estoque/ProductsTab.tsx:250:7',
        'data-prohibitions': '[editContent]',
        open: isImportOpen,
        onOpenChange: setIsImportOpen,
        title: 'Importar Produtos',
        onImport: handleImport,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        'data-uid': 'src/components/estoque/ProductsTab.tsx:257:7',
        'data-prohibitions': '[editContent]',
        className: 'border rounded-md overflow-x-auto',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
          'data-uid': 'src/components/estoque/ProductsTab.tsx:258:9',
          'data-prohibitions': '[editContent]',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
              'data-uid': 'src/components/estoque/ProductsTab.tsx:259:11',
              'data-prohibitions': '[]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
                'data-uid': 'src/components/estoque/ProductsTab.tsx:260:13',
                'data-prohibitions': '[]',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/estoque/ProductsTab.tsx:261:15',
                    'data-prohibitions': '[]',
                    children: 'Nome',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/estoque/ProductsTab.tsx:262:15',
                    'data-prohibitions': '[]',
                    children: 'Categoria',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/estoque/ProductsTab.tsx:263:15',
                    'data-prohibitions': '[]',
                    className: 'text-right',
                    children: 'Preço Venda',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/estoque/ProductsTab.tsx:264:15',
                    'data-prohibitions': '[]',
                    className: 'text-right',
                    children: 'Preço Custo',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/estoque/ProductsTab.tsx:265:15',
                    'data-prohibitions': '[]',
                    className: 'text-right',
                    children: 'Estoque',
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                    'data-uid': 'src/components/estoque/ProductsTab.tsx:266:15',
                    'data-prohibitions': '[]',
                    className: 'text-right',
                    children: 'Ações',
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
              'data-uid': 'src/components/estoque/ProductsTab.tsx:269:11',
              'data-prohibitions': '[editContent]',
              children:
                displayedProducts.length === 0
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                      'data-uid': 'src/components/estoque/ProductsTab.tsx:271:15',
                      'data-prohibitions': '[]',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                        'data-uid': 'src/components/estoque/ProductsTab.tsx:272:17',
                        'data-prohibitions': '[]',
                        colSpan: 6,
                        className: 'text-center py-8',
                        children: 'Nenhum produto encontrado.',
                      }),
                    })
                  : displayedProducts.map((p) => {
                      const isZeroStock = p.stock_quantity <= 0
                      const isLowStock =
                        !isZeroStock &&
                        p.stock_quantity <= Math.max(p.min_stock || 0, p.reorder_point || 0)
                      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        TableRow,
                        {
                          'data-uid': 'src/components/estoque/ProductsTab.tsx:284:19',
                          'data-prohibitions': '[editContent]',
                          className: cn(
                            !p.is_active ? 'opacity-50 grayscale-[50%]' : '',
                            isZeroStock
                              ? 'bg-red-50/50 hover:bg-red-50/80 dark:bg-red-950/20 dark:hover:bg-red-950/30'
                              : '',
                            isLowStock
                              ? 'bg-amber-50/50 hover:bg-amber-50/80 dark:bg-amber-950/20 dark:hover:bg-amber-950/30'
                              : '',
                          ),
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                              'data-uid': 'src/components/estoque/ProductsTab.tsx:296:21',
                              'data-prohibitions': '[editContent]',
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                'data-uid': 'src/components/estoque/ProductsTab.tsx:297:23',
                                'data-prohibitions': '[editContent]',
                                className: 'flex items-center gap-2',
                                children: [
                                  p.name,
                                  !p.is_active &&
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                                      'data-uid': 'src/components/estoque/ProductsTab.tsx:300:27',
                                      'data-prohibitions': '[]',
                                      variant: 'secondary',
                                      className: 'text-[10px]',
                                      children: 'Inativo',
                                    }),
                                ],
                              }),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                              'data-uid': 'src/components/estoque/ProductsTab.tsx:306:21',
                              'data-prohibitions': '[editContent]',
                              children: p.expand?.category_id?.name || p.category || '-',
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                              'data-uid': 'src/components/estoque/ProductsTab.tsx:307:21',
                              'data-prohibitions': '[editContent]',
                              className: 'text-right',
                              children: formatCurrency(p.price),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                              'data-uid': 'src/components/estoque/ProductsTab.tsx:308:21',
                              'data-prohibitions': '[editContent]',
                              className: 'text-right',
                              children: formatCurrency(p.cost_price),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                              'data-uid': 'src/components/estoque/ProductsTab.tsx:309:21',
                              'data-prohibitions': '[editContent]',
                              className: 'text-right',
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                'data-uid': 'src/components/estoque/ProductsTab.tsx:310:23',
                                'data-prohibitions': '[editContent]',
                                className: 'flex items-center justify-end gap-2',
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                                    'data-uid': 'src/components/estoque/ProductsTab.tsx:311:25',
                                    'data-prohibitions': '[editContent]',
                                    className: cn(
                                      'font-medium',
                                      isZeroStock
                                        ? 'text-red-600 font-bold'
                                        : isLowStock
                                          ? 'text-amber-600 font-bold'
                                          : '',
                                    ),
                                    children: p.stock_quantity || 0,
                                  }),
                                  isZeroStock
                                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                                        'data-uid': 'src/components/estoque/ProductsTab.tsx:324:27',
                                        'data-prohibitions': '[]',
                                        variant: 'destructive',
                                        className: 'text-[10px] px-1 py-0 h-4',
                                        children: 'Zerado',
                                      })
                                    : isLowStock
                                      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                                          'data-uid':
                                            'src/components/estoque/ProductsTab.tsx:328:27',
                                          'data-prohibitions': '[]',
                                          variant: 'outline',
                                          className:
                                            'text-[10px] px-1 py-0 h-4 text-amber-600 border-amber-600 bg-amber-50',
                                          children: 'Baixo',
                                        })
                                      : null,
                                ],
                              }),
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                              'data-uid': 'src/components/estoque/ProductsTab.tsx:337:21',
                              'data-prohibitions': '[]',
                              className: 'text-right whitespace-nowrap',
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                                'data-uid': 'src/components/estoque/ProductsTab.tsx:338:23',
                                'data-prohibitions': '[]',
                                className: 'flex justify-end items-center gap-3',
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                                    'data-uid': 'src/components/estoque/ProductsTab.tsx:339:25',
                                    'data-prohibitions': '[]',
                                    className: 'flex items-center justify-center mr-2',
                                    title: p.is_active ? 'Desativar Produto' : 'Ativar Produto',
                                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
                                      'data-uid': 'src/components/estoque/ProductsTab.tsx:343:27',
                                      'data-prohibitions': '[editContent]',
                                      checked: p.is_active,
                                      onCheckedChange: () => handleToggleActive(p),
                                      className: 'data-[state=checked]:bg-emerald-500',
                                    }),
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                    'data-uid': 'src/components/estoque/ProductsTab.tsx:349:25',
                                    'data-prohibitions': '[]',
                                    variant: 'ghost',
                                    size: 'icon',
                                    className:
                                      'text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8',
                                    onClick: () => {
                                      setConsumeProduct(p)
                                      setConsumeForm({
                                        quantity: 1,
                                        barber_id: '',
                                        description: '',
                                      })
                                      setConsumeOpen(true)
                                    },
                                    title: 'Registrar Consumo Profissional',
                                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                      Scissors,
                                      {
                                        'data-uid': 'src/components/estoque/ProductsTab.tsx:360:27',
                                        'data-prohibitions': '[editContent]',
                                        className: 'w-4 h-4',
                                      },
                                    ),
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                    'data-uid': 'src/components/estoque/ProductsTab.tsx:362:25',
                                    'data-prohibitions': '[]',
                                    variant: 'ghost',
                                    size: 'icon',
                                    className: 'h-8 w-8',
                                    onClick: () => handleEdit(p),
                                    title: 'Editar Produto',
                                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
                                      'data-uid': 'src/components/estoque/ProductsTab.tsx:369:27',
                                      'data-prohibitions': '[editContent]',
                                      className: 'w-4 h-4',
                                    }),
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                                    'data-uid': 'src/components/estoque/ProductsTab.tsx:371:25',
                                    'data-prohibitions': '[]',
                                    variant: 'ghost',
                                    size: 'icon',
                                    className: 'h-8 w-8',
                                    onClick: () => handleDelete(p.id),
                                    title: 'Excluir Produto',
                                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
                                      'data-uid': 'src/components/estoque/ProductsTab.tsx:378:27',
                                      'data-prohibitions': '[editContent]',
                                      className: 'w-4 h-4 text-red-500',
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        },
                        p.id,
                      )
                    }),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductFormDialog, {
        'data-uid': 'src/components/estoque/ProductsTab.tsx:390:7',
        'data-prohibitions': '[editContent]',
        open: isFormOpen,
        onOpenChange: setIsFormOpen,
        productToEdit,
        onSuccess: loadData,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
        'data-uid': 'src/components/estoque/ProductsTab.tsx:397:7',
        'data-prohibitions': '[editContent]',
        open: consumeOpen,
        onOpenChange: setConsumeOpen,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
          'data-uid': 'src/components/estoque/ProductsTab.tsx:398:9',
          'data-prohibitions': '[editContent]',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
              'data-uid': 'src/components/estoque/ProductsTab.tsx:399:11',
              'data-prohibitions': '[]',
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
                'data-uid': 'src/components/estoque/ProductsTab.tsx:400:13',
                'data-prohibitions': '[]',
                children: 'Registrar Consumo Profissional',
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/components/estoque/ProductsTab.tsx:402:11',
              'data-prohibitions': '[editContent]',
              className: 'space-y-4 py-4',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/components/estoque/ProductsTab.tsx:403:13',
                  'data-prohibitions': '[]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/components/estoque/ProductsTab.tsx:404:15',
                      'data-prohibitions': '[]',
                      children: 'Produto',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      'data-uid': 'src/components/estoque/ProductsTab.tsx:405:15',
                      'data-prohibitions': '[editContent]',
                      value: consumeProduct?.name || '',
                      disabled: true,
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/components/estoque/ProductsTab.tsx:407:13',
                  'data-prohibitions': '[editContent]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/components/estoque/ProductsTab.tsx:408:15',
                      'data-prohibitions': '[]',
                      children: 'Profissional',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                      'data-uid': 'src/components/estoque/ProductsTab.tsx:409:15',
                      'data-prohibitions': '[editContent]',
                      value: consumeForm.barber_id,
                      onValueChange: (v) =>
                        setConsumeForm({
                          ...consumeForm,
                          barber_id: v,
                        }),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                          'data-uid': 'src/components/estoque/ProductsTab.tsx:413:17',
                          'data-prohibitions': '[]',
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                            'data-uid': 'src/components/estoque/ProductsTab.tsx:414:19',
                            'data-prohibitions': '[editContent]',
                            placeholder: 'Selecione o profissional',
                          }),
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                          'data-uid': 'src/components/estoque/ProductsTab.tsx:416:17',
                          'data-prohibitions': '[editContent]',
                          children: barbers.map((b) =>
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              SelectItem,
                              {
                                'data-uid': 'src/components/estoque/ProductsTab.tsx:418:21',
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
                  'data-uid': 'src/components/estoque/ProductsTab.tsx:425:13',
                  'data-prohibitions': '[]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/components/estoque/ProductsTab.tsx:426:15',
                      'data-prohibitions': '[]',
                      children: 'Quantidade',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      'data-uid': 'src/components/estoque/ProductsTab.tsx:427:15',
                      'data-prohibitions': '[editContent]',
                      type: 'number',
                      min: 1,
                      value: consumeForm.quantity,
                      onChange: (e) =>
                        setConsumeForm({
                          ...consumeForm,
                          quantity: Number(e.target.value),
                        }),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                  'data-uid': 'src/components/estoque/ProductsTab.tsx:436:13',
                  'data-prohibitions': '[]',
                  className: 'space-y-2',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                      'data-uid': 'src/components/estoque/ProductsTab.tsx:437:15',
                      'data-prohibitions': '[]',
                      children: 'Observação (Opcional)',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                      'data-uid': 'src/components/estoque/ProductsTab.tsx:438:15',
                      'data-prohibitions': '[editContent]',
                      value: consumeForm.description,
                      onChange: (e) =>
                        setConsumeForm({
                          ...consumeForm,
                          description: e.target.value,
                        }),
                      placeholder: 'Ex: Uso em cliente especial',
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
              'data-uid': 'src/components/estoque/ProductsTab.tsx:445:11',
              'data-prohibitions': '[]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/components/estoque/ProductsTab.tsx:446:13',
                  'data-prohibitions': '[]',
                  variant: 'outline',
                  onClick: () => setConsumeOpen(false),
                  children: 'Cancelar',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  'data-uid': 'src/components/estoque/ProductsTab.tsx:449:13',
                  'data-prohibitions': '[]',
                  onClick: handleConsumeSubmit,
                  variant: 'destructive',
                  children: 'Registrar Consumo',
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
//#region src/components/estoque/StockMovementsTab.tsx
function StockMovementsTab() {
  const [movements, setMovements] = (0, import_react.useState)([])
  const [loading, setLoading] = (0, import_react.useState)(true)
  const loadMovements = async () => {
    try {
      setMovements(
        await pb.collection('stock_movements').getFullList({
          sort: '-created',
          expand: 'product_id,barber_id,client_id',
        }),
      )
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  ;(0, import_react.useEffect)(() => {
    loadMovements()
  }, [])
  useRealtime('stock_movements', () => loadMovements())
  const getTypeInfo = (type) => {
    switch (type) {
      case 'purchase':
        return {
          label: 'Entrada (Compra)',
          color: 'bg-emerald-500/10 text-emerald-500 border-emerald-200',
        }
      case 'sale':
        return {
          label: 'Saída (Venda)',
          color: 'bg-blue-500/10 text-blue-500 border-blue-200',
        }
      case 'consumption':
        return {
          label: 'Consumo Profissional',
          color: 'bg-red-500/10 text-red-500 border-red-200',
        }
      case 'adjustment':
        return {
          label: 'Ajuste',
          color: 'bg-orange-500/10 text-orange-500 border-orange-200',
        }
      default:
        return {
          label: type,
          color: 'bg-gray-500/10 text-gray-500 border-gray-200',
        }
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/components/estoque/StockMovementsTab.tsx:58:5',
    'data-prohibitions': '[editContent]',
    className: 'space-y-4 mt-4 animate-fade-in',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        'data-uid': 'src/components/estoque/StockMovementsTab.tsx:59:7',
        'data-prohibitions': '[]',
        className: 'flex justify-between items-center',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
          'data-uid': 'src/components/estoque/StockMovementsTab.tsx:60:9',
          'data-prohibitions': '[]',
          className: 'text-lg font-semibold',
          children: 'Histórico de Estoque',
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        'data-uid': 'src/components/estoque/StockMovementsTab.tsx:63:7',
        'data-prohibitions': '[editContent]',
        className: 'border rounded-md overflow-hidden bg-card',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
          'data-uid': 'src/components/estoque/StockMovementsTab.tsx:64:9',
          'data-prohibitions': '[editContent]',
          className: 'overflow-x-auto',
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
            'data-uid': 'src/components/estoque/StockMovementsTab.tsx:65:11',
            'data-prohibitions': '[editContent]',
            className: 'min-w-[700px]',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
                'data-uid': 'src/components/estoque/StockMovementsTab.tsx:66:13',
                'data-prohibitions': '[]',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
                  'data-uid': 'src/components/estoque/StockMovementsTab.tsx:67:15',
                  'data-prohibitions': '[]',
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                      'data-uid': 'src/components/estoque/StockMovementsTab.tsx:68:17',
                      'data-prohibitions': '[]',
                      children: 'Data',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                      'data-uid': 'src/components/estoque/StockMovementsTab.tsx:69:17',
                      'data-prohibitions': '[]',
                      children: 'Produto',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                      'data-uid': 'src/components/estoque/StockMovementsTab.tsx:70:17',
                      'data-prohibitions': '[]',
                      children: 'Tipo',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                      'data-uid': 'src/components/estoque/StockMovementsTab.tsx:71:17',
                      'data-prohibitions': '[]',
                      className: 'text-right',
                      children: 'Quantidade',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                      'data-uid': 'src/components/estoque/StockMovementsTab.tsx:72:17',
                      'data-prohibitions': '[]',
                      children: 'Responsável / Cliente',
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
                      'data-uid': 'src/components/estoque/StockMovementsTab.tsx:73:17',
                      'data-prohibitions': '[]',
                      children: 'Observação',
                    }),
                  ],
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
                'data-uid': 'src/components/estoque/StockMovementsTab.tsx:76:13',
                'data-prohibitions': '[editContent]',
                children: loading
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                      'data-uid': 'src/components/estoque/StockMovementsTab.tsx:78:17',
                      'data-prohibitions': '[]',
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                        'data-uid': 'src/components/estoque/StockMovementsTab.tsx:79:19',
                        'data-prohibitions': '[]',
                        colSpan: 6,
                        className: 'text-center py-8 text-muted-foreground',
                        children: 'Carregando...',
                      }),
                    })
                  : movements.length === 0
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
                        'data-uid': 'src/components/estoque/StockMovementsTab.tsx:84:17',
                        'data-prohibitions': '[]',
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                          'data-uid': 'src/components/estoque/StockMovementsTab.tsx:85:19',
                          'data-prohibitions': '[]',
                          colSpan: 6,
                          className: 'text-center py-8 text-muted-foreground',
                          children: 'Nenhum movimento registrado.',
                        }),
                      })
                    : movements.map((m) => {
                        const typeInfo = getTypeInfo(m.type)
                        const isPositive = m.quantity > 0
                        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                          TableRow,
                          {
                            'data-uid': 'src/components/estoque/StockMovementsTab.tsx:95:21',
                            'data-prohibitions': '[editContent]',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                'data-uid': 'src/components/estoque/StockMovementsTab.tsx:96:23',
                                'data-prohibitions': '[editContent]',
                                className: 'whitespace-nowrap',
                                children: format(new Date(m.created), 'dd/MM/yyyy HH:mm'),
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                'data-uid': 'src/components/estoque/StockMovementsTab.tsx:99:23',
                                'data-prohibitions': '[editContent]',
                                className: 'font-medium',
                                children: m.expand?.product_id?.name || 'Produto Removido',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                'data-uid': 'src/components/estoque/StockMovementsTab.tsx:102:23',
                                'data-prohibitions': '[editContent]',
                                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                                  'data-uid': 'src/components/estoque/StockMovementsTab.tsx:103:25',
                                  'data-prohibitions': '[editContent]',
                                  variant: 'outline',
                                  className: typeInfo.color,
                                  children: typeInfo.label,
                                }),
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
                                'data-uid': 'src/components/estoque/StockMovementsTab.tsx:107:23',
                                'data-prohibitions': '[editContent]',
                                className: `text-right font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`,
                                children: [isPositive ? '+' : '', m.quantity],
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                'data-uid': 'src/components/estoque/StockMovementsTab.tsx:113:23',
                                'data-prohibitions': '[editContent]',
                                children:
                                  m.expand?.barber_id?.name || m.expand?.client_id?.name || '-',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
                                'data-uid': 'src/components/estoque/StockMovementsTab.tsx:116:23',
                                'data-prohibitions': '[editContent]',
                                className: 'max-w-[200px] truncate text-muted-foreground',
                                children: m.description || '-',
                              }),
                            ],
                          },
                          m.id,
                        )
                      }),
              }),
            ],
          }),
        }),
      }),
    ],
  })
}
//#endregion
//#region src/pages/ProdutosCategorias.tsx
function ProdutosCategorias() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/pages/ProdutosCategorias.tsx:7:5',
    'data-prohibitions': '[]',
    className: 'p-6 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
        'data-uid': 'src/pages/ProdutosCategorias.tsx:8:7',
        'data-prohibitions': '[]',
        className: 'text-3xl font-bold tracking-tight',
        children: 'Produtos e Estoque',
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
        'data-uid': 'src/pages/ProdutosCategorias.tsx:10:7',
        'data-prohibitions': '[]',
        defaultValue: 'products',
        className: 'w-full',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
            'data-uid': 'src/pages/ProdutosCategorias.tsx:11:9',
            'data-prohibitions': '[]',
            className: 'mb-4',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                'data-uid': 'src/pages/ProdutosCategorias.tsx:12:11',
                'data-prohibitions': '[]',
                value: 'products',
                children: 'Produtos',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
                'data-uid': 'src/pages/ProdutosCategorias.tsx:13:11',
                'data-prohibitions': '[]',
                value: 'history',
                children: 'Histórico de Estoque',
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/ProdutosCategorias.tsx:16:9',
            'data-prohibitions': '[]',
            value: 'products',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsTab, {
              'data-uid': 'src/pages/ProdutosCategorias.tsx:17:11',
              'data-prohibitions': '[editContent]',
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
            'data-uid': 'src/pages/ProdutosCategorias.tsx:20:9',
            'data-prohibitions': '[]',
            value: 'history',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockMovementsTab, {
              'data-uid': 'src/pages/ProdutosCategorias.tsx:21:11',
              'data-prohibitions': '[editContent]',
            }),
          }),
        ],
      }),
    ],
  })
}
//#endregion
export { ProdutosCategorias as default }

//# sourceMappingURL=ProdutosCategorias-DH9un1bp.js.map
