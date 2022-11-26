import { wait } from '@/utils'

export const saveObject = (key: string, object: any) => {
  localStorage.setItem(key, JSON.stringify(object))
}

export const getObject = async (key: string): Promise<any> => {
  await wait(200)
  const data = localStorage.getItem(key)
  return data != null ? JSON.parse(data) : null
}
