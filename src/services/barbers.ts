import pb from '@/lib/pocketbase/client'

export const getBarbers = () => pb.collection('barbers').getFullList()
export const createBarber = (data: any) => pb.collection('barbers').create(data)
export const updateBarber = (id: string, data: any) => pb.collection('barbers').update(id, data)
