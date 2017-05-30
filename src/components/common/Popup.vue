<template>
  <div class="ui modal">
    <i class="close icon"></i>
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import 'semantic-ui-js'

export default {
  name: 'popup',
  mounted () {
    const el = $('.ui.modal').modal({
      onHide: () => {
        this.$parent.$emit('hide-task-form')
      }
    })
    this.$parent.$on('toggle-task-form', (active) => {
      console.log('par')
      let event = 'show'
      if (!active) {
        event = 'hide'
      }
      el.modal(event)
    })
  }
}
</script>
