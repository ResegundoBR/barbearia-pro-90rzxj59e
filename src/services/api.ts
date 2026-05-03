import pb from '@/lib/pocketbase/client'

export const getClients = (filter?: string) =>
  pb.collection('clients').getFullList({ sort: '-created', filter })
export const createClient = (data: any) => pb.collection('clients').create(data)
export const updateClient = (id: string, data: any) => pb.collection('clients').update(id, data)

export const getBusinessHours = () =>
  pb.collection('business_hours').getFullList({ sort: 'day_of_week' })

export const getClientPackages = (filter?: string) =>
  pb
    .collection('client_packages')
    .getFullList({ expand: 'package_id,client_id,barber_id', sort: '-created', filter })

export const getBarbers = () => pb.collection('barbers').getFullList({ sort: '-created' })
export const createBarber = (data: any) => pb.collection('barbers').create(data)
export const updateBarber = (id: string, data: any) => pb.collection('barbers').update(id, data)

export const getCommissionRules = (filter?: string) =>
  pb.collection('commission_rules').getFullList({ sort: '-created', filter })
export const createCommissionRule = (data: any) => pb.collection('commission_rules').create(data)
export const updateCommissionRule = (id: string, data: any) =>
  pb.collection('commission_rules').update(id, data)
export const deleteCommissionRule = (id: string) => pb.collection('commission_rules').delete(id)

export const getAppointments = (filter?: string) =>
  pb.collection('appointments').getFullList({
    expand: 'service_id,barber_id,client_id,client_package_id.package_id',
    sort: '-date',
    filter,
  })
export const getAppointmentsByClient = (clientId: string) =>
  pb.collection('appointments').getFullList({
    filter: `client_id='${clientId}'`,
    expand: 'service_id,barber_id',
    sort: '-date',
  })
export const createAppointment = (data: any) => pb.collection('appointments').create(data)
export const updateAppointment = (id: string, data: any) =>
  pb.collection('appointments').update(id, data)
export const consumePackage = (id: string, data: any) =>
  pb.collection('client_packages').update(id, data)

export const getServices = () => pb.collection('services').getFullList({ sort: '-created' })
export const createService = (data: any) => pb.collection('services').create(data)
export const updateService = (id: string, data: any) => pb.collection('services').update(id, data)

export const getPackages = () =>
  pb.collection('packages').getFullList({ expand: 'service_id', sort: '-created' })
export const createPackage = (data: any) => pb.collection('packages').create(data)
export const updatePackage = (id: string, data: any) => pb.collection('packages').update(id, data)

export const getProducts = () => pb.collection('products').getFullList({ sort: '-created' })
export const createProduct = (data: any) => pb.collection('products').create(data)
export const updateProduct = (id: string, data: any) => pb.collection('products').update(id, data)
export const getProductPurchasesByClient = (clientId: string) =>
  pb.collection('product_purchases').getFullList({
    filter: `client_id='${clientId}'`,
    expand: 'product_id,barber_id',
    sort: '-date',
  })
export const getProductPurchases = (filter?: string) =>
  pb
    .collection('product_purchases')
    .getFullList({ expand: 'product_id,client_id', sort: '-date', filter })

export const createProductPurchase = (data: any) => pb.collection('product_purchases').create(data)

export const createClientPackage = (data: any) => pb.collection('client_packages').create(data)
export const createCommission = (data: any) => pb.collection('commissions').create(data)

export const getCommissions = (filter?: string) =>
  pb.collection('commissions').getFullList({ expand: 'barber_id', sort: '-created', filter })
