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

                      <div class="ui stacked segment" v-for="element in toDoList">
                        <h4 class="header">{{element.title}}</h4>
                        <p>{{element.description}}</p>
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

                    <hr>

                    <div class="ui stacked segment" v-for="element in inProgressList">
                      <h4 class="header">{{element.title}}</h4>
                      <p>{{element.description}}</p>
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
              <p>Secondary Content</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <task-form :active="activePopup"></task-form>

  </div>

</template>

<script>

import draggable from 'vuedraggable' // https://github.com/SortableJS/Vue.Draggable
import Popup from '../components/common/Popup.vue'
import TaskForm from '../components/TaskForm.vue'
import { TASK_STATUS } from '../enum/Task'
import { mapMutations } from 'vuex'

const computedAccessor = function (status) {
  return {
    get () {
      return this.$store.state.list.filter((task) => status === task.status)
    },
    set (value) {
      let task = value[0]
      task.status = status
      this.updateTask(task)
      console.log(task, status)
    }
  }
}

const MainComponent = {
  name: 'app-main',
  components: {
    draggable,
    Popup,
    TaskForm
  },
  computed: {
    toDoList: computedAccessor.call(MainComponent, TASK_STATUS.TODO),
    inProgressList: computedAccessor.call(MainComponent, TASK_STATUS.IN_PROGRESS)
  },
  data () {
    return {
      list2: [{
        name: 'Ruslan'
      }],
      activePopup: false
    }
  },
  methods: {
    ...mapMutations([
      'updateTask'
    ]),
    showCreatePopup () {
      this.activePopup = !this.activePopup
    }
  }
}

export default MainComponent

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
