<script lang="ts">
export default defineComponent({
  setup(props) {
    const meRef :Ref<HTMLInputElement | null>  = ref(null)
    const appendText = () => {
      if(meRef.value) { 
        meRef.value.focus()
      }
    }

    return {
      appendText,
      meRef,
    }
  },
})
</script>

<template>
  <div>
    FANCY!!!
    <input type="text" value="XXX" ref="meRef" />
    
    {{  meRef  }}
  </div>
</template>

<style scoped></style>
