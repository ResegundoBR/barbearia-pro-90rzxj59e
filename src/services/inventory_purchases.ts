import pb from '@/lib/pocketbase/client'
import { withOrgFilter } from '@/lib/pocketbase/helpers'

export const getInventoryPurchases = () =>
  pb.collection('inventory_purchases').getFullList({
    sort: '-created',
    expand: 'product_id,supplier_id',
    filter: withOrgFilter(),
  })

export const getInventoryPurchase = (id: string) => pb.collection('inventory_purchases').getOne(id)

export const createInventoryPurchase = (data: any) =>
  pb.collection('inventory_purchases').create(data)

export const updateInventoryPurchase = (id: string, data: any) =>
  pb.collection('inventory_purchases').update(id, data)

export const deleteInventoryPurchase = (id: string) =>
  pb.collection('inventory_purchases').delete(id)
