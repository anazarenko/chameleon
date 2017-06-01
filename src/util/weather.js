import Vue from 'vue'
import Config from '../config'

export default {
  apiKey: Config.apiKey,
  route: Config.route,
  getWeather (location, date, cb) {
    let route = window.location.protocol === 'http' ? this.route : this.route.replace(/http:/, 'https:')
    let lat = typeof location.lat === 'function' ? location.lat() : location.lat
    let lon = typeof location.lng === 'function' ? location.lng() : location.lng
    Vue.http.get(`${route}?lat=${lat}&lon=${lon}&cnt=14&appid=${this.apiKey}`)
    .then((response) => {
      let today = new Date()
      let diff = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) // Get index of selected day
      // If response correct
      if (response && response.body && response.body.list && Array.isArray(response.body.list)) {
        cb(response.body.list[diff])
      } else {
        throw new Error('Wrong response')
      }
    }, () => {
      throw new Error('Bad request')
    })
  }
}
