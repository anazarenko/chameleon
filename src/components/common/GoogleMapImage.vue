<template>

  <div class="google-map-image" :style="{ 'background-image': 'url(\'' + path + '\')' }">
  </div>

</template>

<script>
import Config from '../../config'

export default {
  name: 'google-map-image',
  props: ['address', 'width', 'height', 'zoom'],
  computed: {
    path () {
      return `https://maps.googleapis.com/maps/api/staticmap?size=${this.width}x${this.height}&zoom=${this.zoom}&center=${this.address}&format=png&key=${Config.googleApiKey}`
    }
  }
}
</script>

<style scoped>
  .google-map-image {
    display: inline-block;
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
</style>
