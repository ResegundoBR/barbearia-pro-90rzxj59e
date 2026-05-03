import pb from '@/lib/pocketbase/client'

export const getClients = (filter?: string) =>
  pb.collection('clients').getFullList({ sort: '-created', filter })

export const getBarbers = () => pb.collection('barbers').getFullList({ sort: '-created' })

export const getServices = () => pb.collection('services').getFullList({ sort: '-created' })

export const getPackages = () =>
  pb.collection('packages').getFullList({ sort: '-created', expand: 'service_id' })

export const getClientPackages = () =>
  pb
    .collection('client_packages')
    .getFullList({ sort: '-created', expand: 'package_id,client_id,package_id.service_id' })

export const getAppointments = (filter?: string) =>
  pb
    .collection('appointments')
    .getFullList({ sort: '-date', expand: 'barber_id,client_id,service_id', filter })

export const getCommissions = () =>
  pb.collection('commissions').getFullList({ sort: '-created', expand: 'barber_id' })

export const createClient = (data: any) => pb.collection('clients').create(data)

export const createAppointment = (data: any) => pb.collection('appointments').create(data)

export const consumePackage = async (clientPackageId: string, remaining: number) => {
  return pb.collection('client_packages').update(clientPackageId, { remaining_uses: remaining - 1 })
}
