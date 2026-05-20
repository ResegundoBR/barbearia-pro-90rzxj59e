import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { ArrowDownCircle, ArrowUpCircle, DollarSign, Wallet } from 'lucide-react'
export function FinancialView({
  completedPeriod,
  productPurchasesPeriod,
  packagesPeriod,
  commissions,
  isAdmin,
  effectiveBarberFilter,
  paymentMethods = [],
  checkouts = [],
}: any) {
  const serviceRevenue = completedPeriod.reduce(
    (acc: number, curr: any) =>
      acc + (curr.client_package_id ? 0 : curr.price || curr.expand?.service_id?.price || 0),
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

  const servicePct = totalRevenue > 0 ? ((serviceRevenue / totalRevenue) * 100).toFixed(1) : '0.0'
  const productPct = totalRevenue > 0 ? ((productRevenue / totalRevenue) * 100).toFixed(1) : '0.0'
  const packagePct = totalRevenue > 0 ? ((packagesRevenue / totalRevenue) * 100).toFixed(1) : '0.0'

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
      } else if (type === 'package') {
        comm = commissions.find(
          (c: any) =>
            (c.type === 'package' || c.type === 'package_sale') &&
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
      addVal(a, 'service', a.client_package_id ? 0 : a.price || a.expand?.service_id?.price || 0),
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
    .reduce((acc: number, c: any) => acc + (c.gross_amount || c.amount || 0), 0)

  // Total Financial Fees (Taxas das transações)
  const totalFinancialFees = useMemo(() => {
    let fees = 0
    const addFee = (item: any, type: string, val: number) => {
      let comm
      if (type === 'service') {
        comm = commissions.find(
          (c: any) =>
            c.barber_id === item.barber_id &&
            c.type === type &&
            Math.abs(new Date(c.created).getTime() - new Date(item.created).getTime()) < 15000,
        )
      } else if (type === 'package') {
        comm = commissions.find(
          (c: any) =>
            (c.type === 'package' || c.type === 'package_sale') &&
            Math.abs(new Date(c.created).getTime() - new Date(item.created).getTime()) < 15000,
        )
      } else {
        comm = commissions.find(
          (c: any) =>
            c.type === type &&
            Math.abs(new Date(c.created).getTime() - new Date(item.created).getTime()) < 15000,
        )
      }

      const methodRaw = comm?.payment_method || 'other'
      const methodMapping: Record<string, string> = {
        credito: 'credit_card',
        debito: 'debit_card',
        pix: 'pix',
        cash: 'cash',
      }
      const pmType = methodMapping[methodRaw] || methodRaw
      const pmRecord = paymentMethods.find((p: any) => p.type === pmType)
      const feePct = pmRecord?.fee_percentage || 0
      fees += Number((val * (feePct / 100)).toFixed(2))
    }

    completedPeriod.forEach((a: any) =>
      addFee(a, 'service', a.client_package_id ? 0 : a.price || a.expand?.service_id?.price || 0),
    )
    productPurchasesPeriod.forEach((p: any) =>
      addFee(p, 'product', p.price_at_sale || p.expand?.product_id?.price || 0),
    )
    packagesPeriod.forEach((pkg: any) => addFee(pkg, 'package', pkg.expand?.package_id?.price || 0))

    return fees
  }, [completedPeriod, productPurchasesPeriod, packagesPeriod, commissions, paymentMethods])

  const totalCosts = autonomousCosts + partnerTransfers + totalFinancialFees
  const netBalance = totalRevenue - totalCosts

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#6b7280']

  const chartConfig = useMemo(() => {
    const cfg: Record<string, any> = {}
    paymentMethodsDist.forEach((item, i) => {
      cfg[item.name] = { label: item.name, color: COLORS[i % COLORS.length] }
    })
    return cfg
  }, [paymentMethodsDist])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
              Taxas Financeiras
            </CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">
              R$ {totalFinancialFees.toFixed(2)}
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
              <div className="pt-4 flex justify-between text-xs text-muted-foreground border-t mt-4">
                <span>Serviços: {servicePct}%</span>
                <span>Produtos: {productPct}%</span>
                <span>Pacotes: {packagePct}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
