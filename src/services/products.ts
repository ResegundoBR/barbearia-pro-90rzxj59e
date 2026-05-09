import pb from '@/lib/pocketbase/client'

export const getProducts = () =>
  pb.collection('products').getFullList({ sort: '-created', expand: 'category_id' })
export const getProduct = (id: string) => pb.collection('products').getOne(id)
export const createProduct = (data: any) => pb.collection('products').create(data)
export const updateProduct = (id: string, data: any) => pb.collection('products').update(id, data)
export const deleteProduct = (id: string) => pb.collection('products').delete(id)
