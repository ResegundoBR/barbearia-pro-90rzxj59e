import pb from '@/lib/pocketbase/client'

export const getServices = () => pb.collection('services').getFullList({ sort: '-created' })
export const getService = (id: string) => pb.collection('services').getOne(id)
export const createService = (data: any) => pb.collection('services').create(data)
export const updateService = (id: string, data: any) => pb.collection('services').update(id, data)
export const deleteService = (id: string) => pb.collection('services').delete(id)
