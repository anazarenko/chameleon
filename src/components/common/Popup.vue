<template>
  <div class="ui modal" :id="id">
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
import _ from 'underscore'

export default {
  name: 'popup',
  data () {
    return {
      id: _.uniqueId('modal_')
    }
  },
  mounted () {
    const el = $('#' + this.id).modal({
      onHide: () => {
        this.$parent.$emit('hide-task-form')
      }
    })
    this.$parent.$on('toggle-task-form', (active) => {
      let event = 'show'
      if (!active) {
        event = 'hide'
      }
      el.modal(event)
    })
  }
}
</script>
