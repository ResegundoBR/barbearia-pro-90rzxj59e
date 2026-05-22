import pb from '@/lib/pocketbase/client'

export const getBarberBlocks = (filter = '') =>
  pb.collection('barber_blocks').getFullList({ filter })
export const createBarberBlock = (data: any) => pb.collection('barber_blocks').create(data)
export const deleteBarberBlock = (id: string) => pb.collection('barber_blocks').delete(id)
