import pb from '@/lib/pocketbase/client'

export const getPackages = () => pb.collection('packages').getFullList()
