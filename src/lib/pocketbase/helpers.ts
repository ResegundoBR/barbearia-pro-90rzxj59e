import pb from './client'

export const withOrgFilter = (filter?: string) => {
  const orgId = pb.authStore.record?.organization_id
  if (!orgId) return filter
  return filter ? `(${filter}) && organization_id='${orgId}'` : `organization_id='${orgId}'`
}
