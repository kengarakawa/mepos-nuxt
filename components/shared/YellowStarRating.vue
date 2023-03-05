<script lang="ts">
import StarsRating from "vue-star-rating"

export default defineComponent({
  name: "YellowStarRating",
  components: {
    StarsRating,
  },
  props: {
    rating: {
      type: Number,
      require: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    roundStartRating: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const nullRating = () => {
      // console.log(props.rating, typeof props.rating)
      return props.rating ?? 0
    }

    return {
      nullRating,
    }
  },
})
</script>

<template>
  <StarsRating
    :inline="true"
    :show-rating="$props.readonly"
    Xrating="$props.rating ?? 0"
    :rating="nullRating()"
    :round-start-rating="$props.roundStartRating"
    :star-size="15"
    :border-color="'#000'"
    :border-width="1"
    :rounded-corners="true"
    :read-only="true"
  />

  <!--  -->
</template>

<style scoped></style>
