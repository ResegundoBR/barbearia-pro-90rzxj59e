import pb from '@/lib/pocketbase/client'

export const getPackages = () => pb.collection('packages').getFullList({ sort: '-created' })
export const getPackage = (id: string) => pb.collection('packages').getOne(id)
export const createPackage = (data: any) => pb.collection('packages').create(data)
export const updatePackage = (id: string, data: any) => pb.collection('packages').update(id, data)
export const deletePackage = (id: string) => pb.collection('packages').delete(id)
