import pb from '@/lib/pocketbase/client'

export const getBarbers = () =>
  pb.collection('barbers').getFullList({ sort: '-created', expand: 'user_id' })
export const getBarber = (id: string) => pb.collection('barbers').getOne(id)
export const createBarber = (data: any) => {
  const payload = { ...data }
  if (pb.authStore.record?.organization_id && !payload.organization_id) {
    payload.organization_id = pb.authStore.record.organization_id
  }
  return pb.collection('barbers').create(payload)
}
export const updateBarber = (id: string, data: any) => pb.collection('barbers').update(id, data)
export const deleteBarber = (id: string) => pb.collection('barbers').delete(id)
