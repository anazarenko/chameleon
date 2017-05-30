<template>

  <div>
    <popup :active="active">
      <div slot="header">Create task</div>
      <div slot="content">
        <form class="ui form">
          <div class="field" :class="{'error': isSubmitForm && errors.has('title') }">
            <label for="title">Title</label>
            <input id="title" type="text" v-model="title" v-validate.initial="title" data-vv-rules="required|alpha|min:3|max:25" name="title" placeholder="Task title">
            <div class="ui error message" v-if="isSubmitForm && errors.has('title')">
              <p>{{ errors.first('title') }}</p>
            </div>
          </div>
          <div class="field" :class="{'error': isSubmitForm && errors.has('description') }">
            <label for="description">Description</label>
            <input id="description" type="text" v-model="description" v-validate.initial="description" data-vv-rules="required|alpha|min:3|max:50" name="description" placeholder="Task description">
            <div class="ui error message" v-if="isSubmitForm && errors.has('description')">
              <p>{{ errors.first('description') }}</p>
            </div>
          </div>
          <div class="field">
            <label>Delivery date</label>
            <input type="text" name="last-name" placeholder="Delivery date">
          </div>
          <div class="field">
            <label>Address location</label>
            <input type="text" name="last-name" placeholder="Address / Location">
          </div>

          <div class="buttons">
            <div class="ui button" @click="create">
              Create
            </div>
            <div class="ui button">
              Cancel
            </div>
          </div>

        </form>
      </div>
    </popup>
  </div>

</template>

<script>

import Popup from '../components/common/Popup.vue'
import { mapMutations } from 'vuex'
import Vue from 'vue'
import { TASK_STATUS } from '../enum/Task'
import VeeValidate from 'vee-validate' // https://github.com/hootlex/vuejs-form-validation-example/blob/master/src/App.vue

Vue.use(VeeValidate)

export default {
  name: 'task-form',
  components: {
    Popup
  },
  props: ['active'],
  data () {
    return {
      title: '',
      description: '',
      isSubmitForm: false
    }
  },
  watch: {
    active () {
      this.showPopup()
    }
  },
  methods: {
    ...mapMutations([
      'addTask'
    ]),
    create () {
      this.isSubmitForm = true
      if (this.isFormValid()) {
        this.$store.commit('addTask', {
          id: Math.random(),
          title: this.title,
          description: this.description,
          status: TASK_STATUS.TODO
        })
      }
    },
    isFormValid () {
      this.$validator.validateAll()
      return !this.errors.any()
    },
    showPopup () {
      this.$emit('toggle-task-form', true)
    },
    hidePopup () {
      this.$emit('toggle-task-form', false)
    }
  },
  created () {
    this.$on('hide-task-form', (value) => {
      console.log('event', value)
    })
  }
}
</script>

<style scoped>
.buttons {
  text-align: right;
}
.field.error .ui.error.message {
  display: block;
}
</style>
