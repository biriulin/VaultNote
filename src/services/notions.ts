import { getAuth } from 'firebase/auth'
import { getDatabase, ref, get, set, push, remove } from 'firebase/database'

export const getNotions = async () => {
  const database = getDatabase()
  const { currentUser } = getAuth()

  if (!currentUser) {
    throw new Error('Пользователь не найден')
  }

  const userNotionIdsRef = ref(database, `user_notions/${currentUser.uid}`)
  const userNotionIdsSnapshot = await get(userNotionIdsRef)
  const userNotionIdsObject = userNotionIdsSnapshot.val()
  const userNotionIds = userNotionIdsObject ? Object.keys(userNotionIdsObject) : []

  const notions = await Promise.all(
    userNotionIds.map(async (userNotionId) => {
      const notionIdRef = ref(database, `notions/${userNotionId}`)
      const notionIdSnapshot = await get(notionIdRef)
      const notionIdObject = notionIdSnapshot.val()

      if (!notionIdObject) {
        return
      }

      notionIdObject.id = userNotionId

      return notionIdObject
    }),
  )

  return notions.filter(Boolean)
}

export const getNotion = async (notionId: string) => {
  const database = getDatabase()

  const notionIdRef = ref(database, `notions/${notionId}`)
  const notionIdSnapshot = await get(notionIdRef)
  const notionIdObject = notionIdSnapshot.val()

  if (!notionIdObject) {
    throw new Error('Заметка не найдена')
  }

  notionIdObject.id = notionId
  notionIdObject.src = notionIdObject.src.replace('\\n', '\n')

  return notionIdObject
}

export const editNotion = async (notionId: string, title: string, src: string, description: string) => {
  const database = getDatabase()

  const notionIdRef = ref(database, `notions/${notionId}`)
  await set(notionIdRef, {
    src,
    title,
    description,
  })
}

export const createNotion = async () => {
  const database = getDatabase()
  const { currentUser } = getAuth()

  if (!currentUser) {
    throw new Error('Пользователь не найден')
  }

  const notionsRef = ref(database, 'notions')
  const newNotionRef = push(notionsRef)

  const userRef = ref(database, `user_notions/${currentUser.uid}/${newNotionRef.key}`)

  await Promise.all([
    set(newNotionRef, {
      createdBy: currentUser.uid,
      src: '',
      title: '',
      description: '',
    }),
    set(userRef, true),
  ])

  return newNotionRef.key
}

export const deleteNotion = async (notionId: string) => {
  const database = getDatabase()
  const { currentUser } = getAuth()

  if (!currentUser) {
    throw new Error('Пользователь не найден')
  }

  const notionIdRef = ref(database, `notions/${notionId}`)
  const userNotionIdsRef = ref(database, `user_notions/${currentUser.uid}/${notionId}`)

  await Promise.all([remove(notionIdRef), remove(userNotionIdsRef)])

  return
}
