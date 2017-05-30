<template>

  <div @click="show">
    <h4 class="header">{{ task.title }}</h4>
    <p>{{ task.description }}</p>

    <task-form :task="task"></task-form>
  </div>

</template>

<script>
import TaskForm from './TaskForm.vue'

export default {
  name: 'task',
  components: {
    TaskForm
  },
  props: ['task'],
  methods: {
    show () {
      this.$emit('toggle-task-form', true)
    }
  }
}
</script>
