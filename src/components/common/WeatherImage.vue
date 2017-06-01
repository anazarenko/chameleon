<template>

  <div class="weather-image">
    <img :src="path" />
  </div>

</template>

<script>
export default {
  name: 'weather-image',
  props: ['type'],
  computed: {
    path () {
      return `http://openweathermap.org/img/w/${this.type}.png`
    }
  }
}
</script>

<style scoped>
.weather-image {
  display: inline-block;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
