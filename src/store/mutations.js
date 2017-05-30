import _ from 'underscore'

export const STORE_KEY = 'chameleon_store'

const serializedState = window.localStorage.getItem(STORE_KEY)

export const state = {
  tasks: serializedState ? JSON.parse(serializedState) : {
    toDoList: [],
    inProgressList: [],
    doneList: []
  }
}

export const mutations = {
  createTask (state, taskData) {
    state.tasks.toDoList.push({
      id: _.guid(),
      ...taskData
    })
  },
  updateTask (state, task) {
    Object.keys(state.tasks).forEach((listType) => {
      state.tasks[listType] = state.tasks[listType].map((value) => {
        if (value.id === task.id) {
          return _.clone(task)
        }
        return value
      })
    })
  },
  replaceList (state, { list, name }) {
    state.tasks[name] = list
  },
  deleteTask (state, task) {
    Object.keys(state.tasks).forEach((listType) => {
      state.tasks[listType] = state.tasks[listType].filter(value => value.id !== task.id)
    })
  }
}
