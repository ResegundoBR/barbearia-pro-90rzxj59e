import pb from '@/lib/pocketbase/client'

export const getCollection = async (collection: string, expand?: string) => {
  return pb.collection(collection).getFullList({ expand })
}

export const createRecord = async (collection: string, data: any) => {
  return pb.collection(collection).create(data)
}

export const updateRecord = async (collection: string, id: string, data: any) => {
  return pb.collection(collection).update(id, data)
}

export const deleteRecord = async (collection: string, id: string) => {
  return pb.collection(collection).delete(id)
}
