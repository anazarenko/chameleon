<template>

  <div @click="show">
    <weather-image v-if="isWeatherExists" :type="weatherType"></weather-image>
    <google-map-image v-if="isGoogleAddressExists" :address="googleAddress" :height="300" :width="300" :zoom="12"></google-map-image>
    <h4 class="header">{{ task.title }}</h4>
    <p>{{ task.description }}</p>

    <task-form :task="task"></task-form>
  </div>

</template>

<script>
import TaskForm from './TaskForm.vue'
import WeatherImage from './common/WeatherImage.vue'
import GoogleMapImage from './common/GoogleMapImage.vue'

export default {
  name: 'task',
  components: {
    TaskForm,
    WeatherImage,
    GoogleMapImage
  },
  props: ['task'],
  computed: {
    weatherType () {
      if (this.isWeatherExists) {
        return this.task.weather.weather[0].icon
      }
    },
    googleAddress () {
      if (this.isGoogleAddressExists) {
        return this.task.address.name
      }
    },
    isWeatherExists () {
      return this.task &&
        this.task.weather &&
        Array.isArray(this.task.weather.weather) &&
        this.task.weather.weather.length > 0
    },
    isGoogleAddressExists () {
      return this.task &&
        this.task.address &&
        this.task.address.name
    }
  },
  methods: {
    show () {
      this.$emit('toggle-task-form', true)
    }
  }
}
</script>

<style>
</style>
