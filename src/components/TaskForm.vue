<template>

  <div>
    <popup>
      <div slot="header">Create task</div>
      <div slot="content">
        <form class="ui form">
          <div class="field" :class="{'error': isSubmitForm && errors.has('model.title') }">
            <label for="title">Title</label>
            <div v-if="isEdit">
              <input id="title" type="text" v-model="model.title" v-validate.initial="model.title" data-vv-rules="required|alpha|min:3|max:25" name="title" placeholder="Task title">
              <div class="ui error message" v-if="isSubmitForm && errors.has('model.title')">
                <p>{{ errors.first('model.title') }}</p>
              </div>
            </div>
            <div v-if="!isEdit">
              {{model.title}}
            </div>
          </div>
          <div class="field" :class="{'error': isSubmitForm && errors.has('model.description') }">
            <label for="description">Description</label>
            <div v-if="isEdit">
              <input id="description" type="text" v-model="model.description" v-validate.initial="model.description" data-vv-rules="required|alpha|min:3|max:50" name="description" placeholder="Task description">
              <div class="ui error message" v-if="isSubmitForm && errors.has('model.description')">
                <p>{{ errors.first('model.description') }}</p>
              </div>
            </div>
            <div v-if="!isEdit">
              {{model.description}}
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
            <div class="ui button" @click="update" v-if="isEditFormType && isEdit">Update</div>
            <div class="ui button" @click="isEdit = true" v-if="isEditFormType && !isEdit">Edit</div>
            <div class="ui button" @click="create" v-if="!isEditFormType">Create</div>
            <div class="ui button" @click="remove" v-if="isEditFormType && !isEdit">Delete</div>
            <div class="ui button" @click="hidePopup">Cancel</div>
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
import VeeValidate from 'vee-validate' // https://github.com/hootlex/vuejs-form-validation-example/blob/master/src/App.vue
import _ from 'underscore'

Vue.use(VeeValidate)

export default {
  name: 'task-form',
  components: {
    Popup
  },
  props: ['task'],
  data () {
    return {
      model: {},
      isSubmitForm: false,
      isEditFormType: false,
      isEdit: true
    }
  },
  methods: {
    ...mapMutations([
      'createTask',
      'updateTask',
      'deleteTask'
    ]),
    create () {
      if (this.isFormValid()) {
        this.createTask(this.model)
        this.hidePopup()
      }
    },
    update () {
      if (this.isFormValid()) {
        this.updateTask(this.model)
        this.isEdit = false
      }
    },
    remove () {
      this.deleteTask(this.model)
      this.hidePopup()
    },
    isFormValid () {
      this.isSubmitForm = true
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
    this.$parent.$on('toggle-task-form', (value) => {
      if (value) {
        if (this.task) {
          this.model = _.clone(this.task) || {}
          this.isEditFormType = true
          this.isEdit = false
        } else {
          this.isSubmitForm = false
          this.model = {}
        }
        this.$emit('toggle-task-form', true)
      }
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
