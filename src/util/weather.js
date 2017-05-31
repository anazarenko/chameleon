import Vue from 'vue'

export default {
  apiKey: '3e15aaf730d10076ac1e60c9772cf238',
  route: 'http://api.openweathermap.org/data/2.5/forecast/daily',
  getWeather (location, date, cb) {
    let lat = location.lat
    let lon = location.lng
    Vue.http.get(`${this.route}?lat=${lat}&lon=${lon}&cnt=14&appid=${this.apiKey}`)
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
