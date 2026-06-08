import PocketBase from 'pocketbase'

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL)
pb.autoCancellation(false)

pb.beforeSend = function (url, options) {
  const isCollectionsEndpoint = url.includes('/api/collections/') && !url.includes('/users/')
  if (
    isCollectionsEndpoint &&
    url.includes('/records') &&
    pb.authStore.isValid &&
    pb.authStore.record
  ) {
    const orgId = pb.authStore.record.organization_id
    if (orgId) {
      try {
        const isAbsolute = url.startsWith('http')
        const base = isAbsolute ? undefined : 'http://localhost'
        const urlObj = new URL(url, base)

        const currentFilter = urlObj.searchParams.get('filter')
        const orgFilter = `organization_id="${orgId}"`

        if (!currentFilter) {
          urlObj.searchParams.set('filter', orgFilter)
        } else if (!currentFilter.includes('organization_id=')) {
          urlObj.searchParams.set('filter', `(${currentFilter}) && ${orgFilter}`)
        }

        url = isAbsolute ? urlObj.toString() : urlObj.toString().replace('http://localhost', '')
      } catch (e) {
        // Ignore URL parsing errors
      }
    }
  }
  return { url, options }
}

export default pb
