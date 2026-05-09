import pb from '@/lib/pocketbase/client'

export const getCategories = () => pb.collection('categories').getFullList({ sort: '-created' })
export const getCategory = (id: string) => pb.collection('categories').getOne(id)
export const createCategory = (data: any) => pb.collection('categories').create(data)
export const updateCategory = (id: string, data: any) =>
  pb.collection('categories').update(id, data)
export const deleteCategory = (id: string) => pb.collection('categories').delete(id)
