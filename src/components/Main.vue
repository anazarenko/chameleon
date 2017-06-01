<template>
  <div class="ui container">
      <div class="ui menu">
          <div class="header item">Delivery Manager "Chameleon"</div>
          <div class="right menu">
            <a class="ui item" @click="showCreatePopup">
              Create task
            </a>
          </div>
      </div>
    <div class="ui stackable grid">
      <div class="three column row">
        <div class="column">

          <div class="ui segments">
            <div class="ui segment">
              <p>To Do</p>
            </div>
            <div class="ui secondary segment">
              <draggable v-model="toDoList" class="dragArea" :options="{group:'list'}">

                  <div class="segment" v-for="task in toDoList">
                    <task :task="task"></task>
                  </div>

              </draggable>
            </div>
          </div>

        </div>
        <div class="column">

          <div class="ui segments">
            <div class="ui segment">
              <p>In Progress</p>
            </div>

              <div class="ui secondary segment">
                <draggable v-model="inProgressList" class="dragArea" :options="{group:'list'}">

                  <div class="segment" v-for="task in inProgressList">
                    <task :task="task"></task>
                  </div>

                </draggable>
              </div>

          </div>

        </div>
        <div class="column">

          <div class="ui segments">
            <div class="ui segment">
              <p>Delivered</p>
            </div>
            <div class="ui secondary segment">

              <draggable v-model="doneList" class="dragArea" :options="{group:'list'}">

                <div class="segment" v-for="task in doneList">
                  <task :task="task"></task>
                </div>

              </draggable>

            </div>
          </div>

        </div>
      </div>
    </div>


    <task-form></task-form>

  </div>

</template>

<script>

import draggable from 'vuedraggable' // https://github.com/SortableJS/Vue.Draggable
import Popup from '../components/common/Popup.vue'
import TaskForm from '../components/TaskForm.vue'
import Task from '../components/Task.vue'
import { mapMutations } from 'vuex'
import GoogleMap from './common/GoogleMap.vue'

const computedAccessor = function (listName) {
  return {
    get () {
      return this.$store.state.tasks[listName]
        .filter((task) => task)
    },
    set (list) {
      this.replaceList({list, name: listName})
    }
  }
}

const MainComponent = {
  name: 'app-main',
  components: {
    draggable,
    Popup,
    Task,
    TaskForm,
    GoogleMap
  },
  computed: {
    toDoList: computedAccessor.call(MainComponent, 'toDoList'),
    inProgressList: computedAccessor.call(MainComponent, 'inProgressList'),
    doneList: computedAccessor.call(MainComponent, 'doneList')
  },
  data () {
    return {
      activePopup: false
    }
  },
  methods: {
    ...mapMutations([
      'updateTask',
      'replaceList'
    ]),
    showCreatePopup () {
      this.$emit('toggle-task-form', true)
    }
  }
}

export default MainComponent

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dragArea {
  min-height: 50px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.segment {
  margin-bottom: 15px;
  border: 1px solid #d4c9c9;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}
div .segment:last-child {
  margin-bottom: 0;
}
</style>
