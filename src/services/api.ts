import pb from '@/lib/pocketbase/client'

export const getClients = () => pb.collection('clients').getFullList({ sort: '-created' })
export const getBarbers = () => pb.collection('barbers').getFullList({ sort: '-created' })
export const getServices = () => pb.collection('services').getFullList({ sort: '-created' })
export const getPackages = () =>
  pb.collection('packages').getFullList({ sort: '-created', expand: 'service_id' })
export const getClientPackages = () =>
  pb
    .collection('client_packages')
    .getFullList({ sort: '-created', expand: 'package_id,client_id,package_id.service_id' })
export const getAppointments = () =>
  pb
    .collection('appointments')
    .getFullList({ sort: '-date,-time', expand: 'barber_id,client_id,service_id' })
export const getCommissions = () =>
  pb.collection('commissions').getFullList({ sort: '-created', expand: 'barber_id' })

export const createClient = (data: any) => pb.collection('clients').create(data)
export const createAppointment = (data: any) => pb.collection('appointments').create(data)
export const usePackage = async (clientPackageId: string, remaining: number) => {
  return pb.collection('client_packages').update(clientPackageId, { remaining_uses: remaining - 1 })
}
