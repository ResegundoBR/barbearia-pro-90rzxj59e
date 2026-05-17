import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { ArrowDownCircle, ArrowUpCircle, DollarSign, Wallet } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { format } from 'date-fns'

export function FinancialView({
  completedPeriod,
  productPurchasesPeriod,
  packagesPeriod,
  commissions,
  isAdmin,
  effectiveBarberFilter,
  paymentMethods = [],
}: any) {
  const serviceRevenue = completedPeriod.reduce(
    (acc: number, curr: any) => acc + (curr.price || curr.expand?.service_id?.price || 0),
    0,
  )
  const productRevenue = productPurchasesPeriod.reduce(
    (acc: number, curr: any) => acc + (curr.price_at_sale || curr.expand?.product_id?.price || 0),
    0,
  )
  const packagesRevenue = packagesPeriod.reduce(
    (acc: number, curr: any) => acc + (curr.expand?.package_id?.price || 0),
    0,
  )

  const totalRevenue = serviceRevenue + productRevenue + packagesRevenue

  const getMethodName = (m: string) => {
    if (!m) return 'Não Informado'
    const pmById = paymentMethods.find((p: any) => p.id === m)
    if (pmById) return pmById.name

    if (m === 'cash') return 'Dinheiro'
    if (m === 'pix') return 'Pix'
    if (m === 'debito' || m === 'debit_card') return 'Cartão de Débito'
    if (m === 'credito' || m === 'credit_card') return 'Cartão de Crédito'

    return 'Outro'
  }

  const paymentMethodsDist = useMemo(() => {
    const methods: Record<string, number> = {}

    const addVal = (item: any, type: string, val: number) => {
      let comm
      if (type === 'service') {
        comm = commissions.find(
          (c: any) =>
            c.barber_id === item.barber_id &&
            c.type === type &&
            Math.abs(new Date(c.created).getTime() - new Date(item.created).getTime()) < 15000,
        )
      } else {
        comm = commissions.find(
          (c: any) =>
            c.type === type &&
            Math.abs(new Date(c.created).getTime() - new Date(item.created).getTime()) < 15000,
        )
      }

      const methodRaw =
        comm?.payment_method || (paymentMethods.length > 0 ? paymentMethods[0].type : 'other')
      const methodName = getMethodName(methodRaw)
      methods[methodName] = (methods[methodName] || 0) + val
    }

    completedPeriod.forEach((a: any) =>
      addVal(a, 'service', a.price || a.expand?.service_id?.price || 0),
    )
    productPurchasesPeriod.forEach((p: any) =>
      addVal(p, 'product', p.price_at_sale || p.expand?.product_id?.price || 0),
    )
    packagesPeriod.forEach((pkg: any) => addVal(pkg, 'package', pkg.expand?.package_id?.price || 0))

    return Object.entries(methods)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [completedPeriod, productPurchasesPeriod, packagesPeriod, commissions, paymentMethods])

  const autonomousCosts = commissions
    .filter((c: any) => c.expand?.barber_id?.work_level === 'autonomo')
    .reduce((acc: number, c: any) => acc + (c.amount || 0), 0)

  const partnerTransfers = commissions
    .filter((c: any) => c.expand?.barber_id?.work_level === 'socio')
    .reduce((acc: number, c: any) => acc + (c.amount || 0), 0)

  const totalCosts = commissions.reduce((acc: number, c: any) => acc + (c.amount || 0), 0)
  const netBalance = totalRevenue - totalCosts

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#6b7280']

  const chartConfig = useMemo(() => {
    const cfg: Record<string, any> = {}
    paymentMethodsDist.forEach((item, i) => {
      cfg[item.name] = { label: item.name, color: COLORS[i % COLORS.length] }
    })
    return cfg
  }, [paymentMethodsDist])

  const transactions = useMemo(() => {
    const list: any[] = []

    completedPeriod.forEach((a: any) => {
      const comm = commissions.find(
        (c: any) =>
          c.barber_id === a.barber_id &&
          c.type === 'service' &&
          Math.abs(new Date(c.created).getTime() - new Date(a.created).getTime()) < 15000,
      )
      list.push({
        id: `apt_${a.id}`,
        date: new Date(a.created),
        client: a.expand?.client_id?.name || 'Avulso',
        item: a.expand?.service_id?.name || 'Serviço',
        barber: a.expand?.barber_id?.name || '-',
        method: getMethodName(
          comm?.payment_method || (paymentMethods.length > 0 ? paymentMethods[0].type : '-'),
        ),
        value: a.price || a.expand?.service_id?.price || 0,
        type: 'service',
      })
    })

    productPurchasesPeriod.forEach((p: any) => {
      const comm = commissions.find(
        (c: any) =>
          c.type === 'product' &&
          Math.abs(new Date(c.created).getTime() - new Date(p.created).getTime()) < 15000,
      )
      list.push({
        id: `prod_${p.id}`,
        date: new Date(p.created),
        client: p.expand?.client_id?.name || 'Avulso',
        item: p.expand?.product_id?.name || 'Produto',
        barber: p.expand?.barber_id?.name || '-',
        method: getMethodName(
          comm?.payment_method || (paymentMethods.length > 0 ? paymentMethods[0].type : '-'),
        ),
        value: p.price_at_sale || p.expand?.product_id?.price || 0,
        type: 'product',
      })
    })

    packagesPeriod.forEach((pkg: any) => {
      const comm = commissions.find(
        (c: any) =>
          c.type === 'package' &&
          Math.abs(new Date(c.created).getTime() - new Date(pkg.created).getTime()) < 15000,
      )
      list.push({
        id: `pkg_${pkg.id}`,
        date: new Date(pkg.created),
        client: pkg.expand?.client_id?.name || 'Avulso',
        item: pkg.expand?.package_id?.name || 'Pacote',
        barber: pkg.expand?.barber_id?.name || '-',
        method: getMethodName(
          comm?.payment_method || (paymentMethods.length > 0 ? paymentMethods[0].type : '-'),
        ),
        value: pkg.expand?.package_id?.price || 0,
        type: 'package',
      })
    })

    return list.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [completedPeriod, productPurchasesPeriod, packagesPeriod, commissions, paymentMethods])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Faturamento Bruto
            </CardTitle>
            <DollarSign className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">R$ {totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Custos (Autônomos)
            </CardTitle>
            <ArrowDownCircle className="size-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">R$ {autonomousCosts.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Repasses (Sócios)
            </CardTitle>
            <ArrowUpCircle className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              R$ {partnerTransfers.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo Líquido
            </CardTitle>
            <Wallet className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">R$ {netBalance.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Métodos de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {paymentMethodsDist.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodsDist}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentMethodsDist.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Nenhum dado para o período.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo de Receitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Serviços</span>
                <span className="font-medium">R$ {serviceRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Produtos</span>
                <span className="font-medium">R$ {productRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Pacotes</span>
                <span className="font-medium">R$ {packagesRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold text-emerald-500">R$ {totalRevenue.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Método de Pagamento</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{format(t.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                    <TableCell>{t.client}</TableCell>
                    <TableCell>{t.item}</TableCell>
                    <TableCell>{t.barber}</TableCell>
                    <TableCell>{t.method}</TableCell>
                    <TableCell className="text-right font-medium text-emerald-500">
                      R$ {t.value.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                {transactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Nenhuma transação encontrada no período.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
