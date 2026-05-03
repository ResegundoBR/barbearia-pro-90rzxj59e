import pb from '@/lib/pocketbase/client'

export const getServices = () => pb.collection('services').getFullList()
