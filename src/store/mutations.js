
export const STORE_KEY = 'chameleon_store'

export const state = {
  list: JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
}

export const mutations = {
  addTask (state, task) {
    state.list.push(task)
  },
  updateTask (state, task) {
    state.list.map((value) => {
      if (value.id === task.id) {
        return task
      }
      return value
    })
  }
}
