import { STORE_KEY } from './mutations'

const localStoragePlugin = store => {
  store.subscribe((mutation, { list }) => {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(list))
  })
}

export default [localStoragePlugin]
