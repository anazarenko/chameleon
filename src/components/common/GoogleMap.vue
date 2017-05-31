<template>

  <div class="map-container">
      <input :id="searchId" type="text" class="controls pac-input" :class="{'active': isEdit}" name="last-name" placeholder="Address / Location">
      <div :id="mapId" class="map"></div>
  </div>

</template>

<script>
// import $ from 'jquery'
import GoogleMapsLoader from 'google-maps'
import _ from 'underscore'

GoogleMapsLoader.LIBRARIES = ['places']
GoogleMapsLoader.KEY = 'AIzaSyDUdN7NVRGJemyHZSmjFdUcsjy1siE_sa4'
GoogleMapsLoader.LANGUAGE = 'en'
GoogleMapsLoader.REGION = 'GB'

const drawMap = function (value, mapId, searchId, cb) {
  GoogleMapsLoader.load((google) => {
    let geocoder = new google.maps.Geocoder()
    let name = value && value.name || ''
    let location = value && value.location || {lat: 50.4501, lng: 30.523400000000038} // Kiev

    let map = new google.maps.Map(document.getElementById(mapId), {
      center: location,
      zoom: 13,
      mapTypeId: 'roadmap'
    })

    let marker = new google.maps.Marker({
      position: location,
      map: map
    })

    let input = document.getElementById(searchId)
    let detailedLevel = 0
    input.value = name

    google.maps.event.addListener(map, 'click', (event) => {
      geocoder.geocode({
        latLng: event.latLng
      }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          cb(results[detailedLevel].formatted_address, results[detailedLevel].geometry.location)
          input.value = results[detailedLevel].formatted_address
        }
      })
    })

    let searchBox = new google.maps.places.SearchBox(input)
//    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

    searchBox.addListener('places_changed', () => {
      let places = searchBox.getPlaces()

      if (places.length === 0) {
        return
      }

      console.log(places)

      let place = places[0]
      if (!place.geometry) {
        return
      }
      marker.setPosition(place.geometry.location)
      map.setCenter(place.geometry.location)
      cb(place.formatted_address, place.geometry.location)
    })

//      setInterval(() => {
//        google.maps.event.trigger(map, 'resize')
//        $(window).resize()
//        console.log('hello')
//      }, 2000)
  })
}

export default {
  name: 'google-map',
  props: ['value', 'isEdit'],
  data () {
    return {
      mapId: _.uniqueId('google-map-map-id_'),
      searchId: _.uniqueId('google-map-search-id_')
    }
  },
  watch: {
    value (value) {
      if (value) {
        this.$nextTick(() => {
          drawMap(value, this.mapId, this.searchId, this.updateValue.bind(this))
        })
      }
    }
  },
  methods: {
    updateValue (name, location) {
      if (this.isEdit) {
        this.$emit('input', {name, location})
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      drawMap(this.value, this.mapId, this.searchId, this.updateValue.bind(this))
    })
  }
}
</script>

<style scoped>
  .map {
    height: 250px;
    margin: 10px 0;
  }
  .pac-input {
    display: none;
  }
  .pac-input:focus {
    border-color: #4d90fe;
  }
  .map-container {
    height: 100%;
  }
  .map-container .field {
    height: 100%;
  }
  .active {
    display: block;
  }
</style>
