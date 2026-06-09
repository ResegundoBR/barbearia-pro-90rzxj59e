import pb from '@/lib/pocketbase/client'
import { withOrgFilter } from '@/lib/pocketbase/helpers'

export const getPackages = () =>
  pb.collection('packages').getFullList({ sort: '-created', filter: withOrgFilter() })
export const getPackage = (id: string) => pb.collection('packages').getOne(id)
export const createPackage = (data: any) => pb.collection('packages').create(data)
export const updatePackage = (id: string, data: any) => pb.collection('packages').update(id, data)
export const deletePackage = (id: string) => pb.collection('packages').delete(id)

export const getClientPackages = () =>
  pb
    .collection('client_packages')
    .getFullList({
      sort: '-created',
      expand: 'client_id,package_id,barber_id',
      filter: withOrgFilter(),
    })
export const getClientPackage = (id: string) =>
  pb.collection('client_packages').getOne(id, { expand: 'client_id,package_id,barber_id' })
export const createClientPackage = (data: any) => pb.collection('client_packages').create(data)
export const updateClientPackage = (id: string, data: any) =>
  pb.collection('client_packages').update(id, data)
export const deleteClientPackage = (id: string) => pb.collection('client_packages').delete(id)
