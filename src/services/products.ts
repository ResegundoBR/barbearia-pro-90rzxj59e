import pb from '@/lib/pocketbase/client'

export const getProducts = () => pb.collection('products').getFullList()
