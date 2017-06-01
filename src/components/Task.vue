<template>

  <div @click="show" class="task">
    <weather-image v-if="isWeatherExists" :type="weatherType"></weather-image>
    <google-map-image v-if="isGoogleAddressExists" :address="googleAddress" :height="400" :width="400" :zoom="12"></google-map-image>
    <div class="content-container">
      <h4 class="header">{{ task.title }}</h4>
      <p class="description">
      <div class="info">
        <div class="weather">{{ weatherTitle }} ({{ weatherInfo }})</div>
        <div class="date">{{ date }}</div>
      </div>
      <div class="description">{{ task.description }}</div>
      </p>
    </div>

    <task-form :task="task"></task-form>
  </div>

</template>

<script>
import moment from 'moment'
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
    date () {
      if (this.task.date) {
        return moment(this.task.date).format('DD/MM/YYYY')
      }
    },
    weatherTitle () {
      if (this.isWeatherExists) {
        return this.task.weather.weather[0].main
      }
    },
    weatherInfo () {
      if (this.isWeatherExists) {
        return this.task.weather.weather[0].description
      }
    },
    weatherType () {
      if (this.isWeatherExists) {
        return this.task.weather.weather[0].icon
      }
    },
    googleAddress () {
      if (this.isGoogleAddressExists) {
        let lat = typeof this.task.address.location.lat === 'function' ? this.task.address.location.lat() : this.task.address.location.lat
        let lng = typeof this.task.address.location.lng === 'function' ? this.task.address.location.lng() : this.task.address.location.lng
        return `${lat}, ${lng}`
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

<style scoped>
  .info {
    margin-top: -5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .date {
    font-size: 14px
  }
  .header {
    text-align: left;
    font-size: 18px;
  }
  .content-container {
    padding: 15px;
    text-align: left;
  }
  .description {
    margin-top: 10px;
  }
  .task {
    cursor: pointer;
  }
</style>
