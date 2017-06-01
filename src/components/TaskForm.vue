<template>

  <div>
    <popup>
      <div slot="header">
        <span v-if="!isEditFormType">Create task</span>
        <span v-if="isEditFormType && isEdit">Edit task: {{model.title}}</span>
        <span v-if="isEditFormType && !isEdit">Show task: {{model.title}}</span>
      </div>
      <div slot="content">
        <form class="ui form">
          <div class="ui grid">
            <div class="eight wide column">
              <div class="field" :class="{'error': isSubmitForm && errors.has('model.title') }">
                <label for="title">Title</label>
                <div v-if="isEdit">
                  <input id="title" type="text" v-model="model.title" v-validate.initial="model.title" data-vv-rules="required|min:3|max:25" name="title" placeholder="Task title">
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
                  <textarea id="description" v-model="model.description" v-validate.initial="model.description" data-vv-rules="required|min:3|max:70" name="description" placeholder="Task description"></textarea>
                  <div class="ui error message" v-if="isSubmitForm && errors.has('model.description')">
                    <p>{{ errors.first('model.description') }}</p>
                  </div>
                </div>
                <div v-if="!isEdit">
                  {{model.description}}
                </div>
              </div>
              <div class="field" v-if="isEditFormType && !isEdit && model.weather && weatherTitle()">
                <label>Weather</label>
                <div>
                  {{ weatherTitle() }} ({{ weatherInfo() }})
                </div>
              </div>
            </div>

            <div class="eight wide column">
              <div class="field" :class="{'error': isSubmitForm && !model.date }">
                <label>Delivery date</label>
                <div class="date-picker" :class="{'disabled': !isEdit}">
                  <date-picker v-model="model.date" :inline="true" :disabled="disabledDates"></date-picker>
                </div>
                <div class="ui error message" v-if="isSubmitForm && !model.date">
                  <p>Date should not be empty</p>
                </div>
              </div>
            </div>
            <div class="sixteen wide column">
              <div class="field" :class="{'error': isSubmitForm && !modelAddress }">
                <label>Address location</label>
                <div v-if="!isEdit">
                  {{modelAddress}}
                </div>
                <div class="ui error message" v-if="isSubmitForm && !modelAddress">
                  <p>Address should not be empty</p>
                </div>
                <google-map v-model="model.address" data-vv-rules="required" :resize="resize" :isEdit="isEdit"></google-map>
              </div>
            </div>
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
import moment from 'moment'
import WeatherManager from '../util/weather'
import DatePicker from 'vuejs-datepicker' // https://github.com/charliekassel/vuejs-datepicker
import GoogleMap from '../components/common/GoogleMap.vue'

Vue.use(VeeValidate)

export default {
  name: 'task-form',
  components: {
    Popup,
    DatePicker,
    GoogleMap
  },
  props: ['task'],
  computed: {
    modelAddress () {
      return this.model.address ? this.model.address.name : ''
    }
  },
  data () {
    let today = new Date()
    return {
      model: {},
      isSubmitForm: false,
      isEditFormType: false,
      isEdit: true,
      disabledDates: {
        to: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)
      },
      resize: false
    }
  },
  methods: {
    ...mapMutations([
      'createTask',
      'updateTask',
      'deleteTask'
    ]),
    weatherInfo () {
      if (this.model.weather) {
        return this.task.weather.weather[0].description
      }
    },
    weatherTitle () {
      if (this.model.weather) {
        return this.task.weather.weather[0].main
      }
    },
    create () {
      if (this.isFormValid()) {
        WeatherManager.getWeather(this.model.address.location, this.dateObject(), (weather) => {
          this.model.weather = weather
          this.createTask(this.model)
          this.hidePopup()
        })
      }
    },
    update () {
      if (this.isFormValid()) {
        WeatherManager.getWeather(this.model.address.location, this.dateObject(), (weather) => {
          this.model.weather = weather
          this.updateTask(this.model)
          this.isEdit = false
        })
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
      this.resizeMap()
    },
    hidePopup () {
      this.$emit('toggle-task-form', false)
      this.resizeMap()
    },
    resizeMap () {
      this.resize = !this.resize
    },
    dateObject () {
      return moment(this.model.date).toDate()
    }
  },
  created () {
    this.$parent.$on('toggle-task-form', (value) => {
      this.resizeMap()
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
  margin-top: 15px;
}
.field.error .ui.error.message {
  display: block;
}
.date-picker.disabled {
  position: relative;
}
.date-picker.disabled::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.vdp-datepicker__calendar {
  width: 100%;
}
</style>
