<script lang="ts">
export default defineComponent({
  props: {
    label: {
      type: String,
      require: true,
    },
    onclick: {
      type: Function,
      require: false,
    },
    badgeClass: {
      type: String,
      require: false,
    },
  },

  setup(props, context) {
    function componentClickHandler() {
      context.emit('badgeClick' , props.label )      
      // context.emit('')
    }        
    return {
      componentClickHandler
    }
  },
})
</script>

<template>
  
    <button
      class="px-2 mr-2 text-xs text-white bg-gray-500 rounded-full badge"
      :class="badgeClass"
      @click="componentClickHandler"
    >
      {{ label }}
    </button>
  
</template>

<style scoped></style>
