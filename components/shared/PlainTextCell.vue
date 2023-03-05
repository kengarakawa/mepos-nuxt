<script lang="ts">
export default defineComponent({
  name: "PlainTextCell",
  props: {
    maxLength: {
      type: Number,
      default: 100,
    },
    text: {
      type: [String, Number],
    },
    className: {
      type: Object,
      require: false,
    },
  },
  setup(props) {
    const displayText = () => {
      let theText = props.text === null ? "" : props.text?.toString() ?? ""
      return theText.length > props.maxLength
        ? theText?.substring(0, props.maxLength ?? 100) + "..."
        : theText
    }

    const getClass = () => {
      // return (typeof props.class === "Object") ? props.class : {}
      return props.className ?? {}
    }
    return {
      displayText,
      getClass,
    }
  },
})
</script>

<template>
  <span class="text-xs">
    {{ displayText() }}
  </span>
</template>
