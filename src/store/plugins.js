import { STORE_KEY } from './mutations'

const localStoragePlugin = store => {
  store.subscribe((mutation, { tasks }) => {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(tasks))
  })
}

export default [localStoragePlugin]
