import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import pb from '@/lib/pocketbase/client'
import { format } from 'date-fns'
import { Loader2, Package, Receipt } from 'lucide-react'
import { ProdutosTab } from './produtos-categorias/ProdutosTab'
import { ConsultasTab } from '@/components/produtos-categorias/ConsultasTab'

export default function ProdutosCategorias() {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Produtos</h2>
        <p className="text-muted-foreground text-sm">
          Gerencie o estoque e visualize o histórico de compras de produtos
        </p>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-4">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="size-4 hidden sm:block" /> Produtos
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Receipt className="size-4 hidden sm:block" /> Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Produtos em Estoque</CardTitle>
              <CardDescription>
                Gerencie todos os produtos do seu estoque, controle quantidades e preços.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ProdutosTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Compras de Estoque</CardTitle>
              <CardDescription>
                Gerencie e confirme o recebimento de compras de produtos.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ConsultasTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
