import pb from '@/lib/pocketbase/client'
import { withOrgFilter } from '@/lib/pocketbase/helpers'

export const getClients = (filter?: string) =>
  pb.collection('clients').getFullList({
    expand: 'created_by_id,preferred_barber_id',
    sort: '-created',
    filter: withOrgFilter(filter),
  })
export const createClient = (data: any) => pb.collection('clients').create(data)
export const updateClient = (id: string, data: any) => pb.collection('clients').update(id, data)

export const getBusinessHours = () =>
  pb.collection('business_hours').getFullList({ sort: 'day_of_week', filter: withOrgFilter() })

export const getClientPackages = (filter?: string) =>
  pb.collection('client_packages').getFullList({
    expand: 'package_id,client_id,barber_id',
    sort: '-created',
    filter: withOrgFilter(filter),
  })

export const getBarbers = () =>
  pb
    .collection('barbers')
    .getFullList({ sort: '-created', expand: 'user_id', filter: withOrgFilter() })
export const createBarber = (data: any) => pb.collection('barbers').create(data)
export const updateBarber = (id: string, data: any) => pb.collection('barbers').update(id, data)

export const getCommissionRules = (filter?: string) =>
  pb.collection('commission_rules').getFullList({ sort: '-created', filter: withOrgFilter(filter) })
export const createCommissionRule = (data: any) => pb.collection('commission_rules').create(data)
export const updateCommissionRule = (id: string, data: any) =>
  pb.collection('commission_rules').update(id, data)
export const deleteCommissionRule = (id: string) => pb.collection('commission_rules').delete(id)

export const getCategories = () =>
  pb.collection('categories').getFullList({ sort: '-created', filter: withOrgFilter() })

export const getAppointments = (filter?: string) =>
  pb.collection('appointments').getFullList({
    expand: 'service_id.category_id,barber_id,client_id,client_package_id.package_id',
    sort: '-date',
    filter: withOrgFilter(filter),
  })
export const getAppointmentsByClient = (clientId: string) =>
  pb.collection('appointments').getFullList({
    filter: withOrgFilter(`client_id='${clientId}'`),
    expand: 'service_id,barber_id',
    sort: '-date',
  })
export const createAppointment = (data: any) => pb.collection('appointments').create(data)
export const updateAppointment = (id: string, data: any) =>
  pb.collection('appointments').update(id, data)
export const consumePackage = (id: string, data: any) =>
  pb.collection('client_packages').update(id, data)

export const getServices = () =>
  pb.collection('services').getFullList({ sort: '-created', filter: withOrgFilter() })
export const createService = (data: any) => pb.collection('services').create(data)
export const updateService = (id: string, data: any) => pb.collection('services').update(id, data)

export const getPackages = () =>
  pb
    .collection('packages')
    .getFullList({ expand: 'service_id', sort: '-created', filter: withOrgFilter() })
export const createPackage = (data: any) => pb.collection('packages').create(data)
export const updatePackage = (id: string, data: any) => pb.collection('packages').update(id, data)

export const getProducts = () =>
  pb.collection('products').getFullList({ sort: '-created', filter: withOrgFilter() })
export const createProduct = (data: any) => pb.collection('products').create(data)
export const updateProduct = (id: string, data: any) => pb.collection('products').update(id, data)
export const getProductPurchasesByClient = (clientId: string) =>
  pb.collection('product_purchases').getFullList({
    filter: withOrgFilter(`client_id='${clientId}'`),
    expand: 'product_id,barber_id',
    sort: '-date',
  })
export const getProductPurchases = (filter?: string) =>
  pb
    .collection('product_purchases')
    .getFullList({ expand: 'product_id,client_id', sort: '-date', filter: withOrgFilter(filter) })

export const createProductPurchase = (data: any) => pb.collection('product_purchases').create(data)

export const createClientPackage = (data: any) => pb.collection('client_packages').create(data)
export const createCommission = (data: any) => pb.collection('commissions').create(data)

export const getClientLogs = (filter?: string) =>
  pb.collection('client_logs').getFullList({ sort: '-created', filter: withOrgFilter(filter) })

export const getCommissions = (filter?: string) =>
  pb
    .collection('commissions')
    .getFullList({ expand: 'barber_id', sort: '-created', filter: withOrgFilter(filter) })

export const getPaymentMethods = () =>
  pb.collection('payment_methods').getFullList({ sort: '-created', filter: withOrgFilter() })
