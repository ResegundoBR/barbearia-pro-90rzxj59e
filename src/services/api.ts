import pb from '@/lib/pocketbase/client'

export const getClients = () => pb.collection('clients').getFullList({ sort: '-created' })
export const createClient = (data: any) => pb.collection('clients').create(data)
export const updateClient = (id: string, data: any) => pb.collection('clients').update(id, data)

export const getClientPackages = () =>
  pb.collection('client_packages').getFullList({ expand: 'package_id', sort: '-created' })

export const getBarbers = () => pb.collection('barbers').getFullList({ sort: '-created' })
export const createBarber = (data: any) => pb.collection('barbers').create(data)
export const updateBarber = (id: string, data: any) => pb.collection('barbers').update(id, data)

export const getAppointments = () =>
  pb
    .collection('appointments')
    .getFullList({ expand: 'service_id,barber_id,client_id', sort: '-date' })
export const getAppointmentsByClient = (clientId: string) =>
  pb
    .collection('appointments')
    .getFullList({
      filter: `client_id='${clientId}'`,
      expand: 'service_id,barber_id',
      sort: '-date',
    })

export const getServices = () => pb.collection('services').getFullList({ sort: '-created' })
export const createService = (data: any) => pb.collection('services').create(data)
export const updateService = (id: string, data: any) => pb.collection('services').update(id, data)

export const getPackages = () =>
  pb.collection('packages').getFullList({ expand: 'service_id', sort: '-created' })
export const createPackage = (data: any) => pb.collection('packages').create(data)
export const updatePackage = (id: string, data: any) => pb.collection('packages').update(id, data)

export const getProducts = () => pb.collection('products').getFullList({ sort: '-created' })
export const getProductPurchasesByClient = (clientId: string) =>
  pb
    .collection('product_purchases')
    .getFullList({ filter: `client_id='${clientId}'`, expand: 'product_id', sort: '-date' })
