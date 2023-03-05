<script lang="ts">
import YellowStarRating from "./YellowStarRating.vue"

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "text",
    },
    data: {
      type: Object,
      require: true,
    },
    options: Object,
  },
  components: { YellowStarRating },
  setup(props) {
    const getCurrencySymbol = () => {
      return props?.data[props?.options?.format?.currency] ?? "$"
    }
    const getDisplayField = () => {
      return props.options?.displayField ?? "id"
    }

    let temp =
      ["text", "date", "price", "thumbnail", "description", "rating"].indexOf(
        props.type
      ) !== -1
        ? props.type
        : "text"
    const cellType = ref(temp)
    const displayField = ref(props?.options?.displayField ?? "id")

    // ORIGINAL
    // const displayText = ref(props?.data[props?.options.displayField] ?? "");

    const defaultValue = props.data[getDisplayField()] ?? ""
    const checkMe = ref(defaultValue)
    const displayText = ref(defaultValue)

    const trueRef = ref(true)
    const falseRef = ref(false)

    const ratingRef = ref(props.data?.displayField ?? 0)
    return {
      cellType,
      displayText,
      displayField,
      getDisplayField,
      getCurrencySymbol,

      defaultValue,
      checkMe,

      trueRef,
      falseRef,
    }
  },
})
</script>

<template>
  <div class="pr-2">
    <template v-if="cellType === 'date'">
      <SharedDateText :date="displayText" />
    </template>
    <template v-if="cellType === 'price'">
      <SharedPriceText
        :value="displayText"
        :currencySymbol="getCurrencySymbol()"
      />
    </template>
    <template v-if="cellType === 'thumbnail'">
      <SharedThumbnailImage :src="displayText" size="sm" />
    </template>
    <template v-if="cellType === 'rating'">
      <YellowStarRating
        :rating="displayText === '' ? 0 : displayText"
        :readonly="trueRef"
        :roundStartRating="falseRef"
      />
    </template>
    <template v-if="cellType === 'text'">
      <SharedPlainTextCell
        :text="displayText"
        :className="$props.options?.componentClass ?? {}"
      />
    </template>
  </div>
</template>

<style scoped></style>
