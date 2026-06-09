import pb from '@/lib/pocketbase/client'
import { withOrgFilter } from '@/lib/pocketbase/helpers'

export const getBarberBlocks = (filter = '') =>
  pb.collection('barber_blocks').getFullList({ filter: withOrgFilter(filter) })
export const createBarberBlock = (data: any) => pb.collection('barber_blocks').create(data)
export const deleteBarberBlock = (id: string) => pb.collection('barber_blocks').delete(id)
export const updateBarberBlock = (id: string, data: any) =>
  pb.collection('barber_blocks').update(id, data)
