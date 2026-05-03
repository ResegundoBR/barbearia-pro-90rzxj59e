import pb from '@/lib/pocketbase/client'

export const getCommissionRules = () => pb.collection('commission_rules').getFullList()
export const createCommissionRule = (data: any) => pb.collection('commission_rules').create(data)
export const deleteCommissionRule = (id: string) => pb.collection('commission_rules').delete(id)
