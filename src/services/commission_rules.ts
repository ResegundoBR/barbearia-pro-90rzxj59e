import pb from '@/lib/pocketbase/client'
import { withOrgFilter } from '@/lib/pocketbase/helpers'

export const getCommissionRules = () =>
  pb.collection('commission_rules').getFullList({ sort: '-created', filter: withOrgFilter() })
export const getCommissionRule = (id: string) => pb.collection('commission_rules').getOne(id)
export const createCommissionRule = (data: any) => pb.collection('commission_rules').create(data)
export const updateCommissionRule = (id: string, data: any) =>
  pb.collection('commission_rules').update(id, data)
export const deleteCommissionRule = (id: string) => pb.collection('commission_rules').delete(id)
