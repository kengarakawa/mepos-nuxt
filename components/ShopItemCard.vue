<script lang="ts" setup>

defineProps<{
  product: Object 
}>()

</script>

<template>
  <div class="w-1/6 h-fit border-blue-400 rounded-xl bg-blue-200 inline-block pr-3 mr-3 mb-3">
    
    <div class="p-3 text-xl">
      {{  product.name  }}
    </div>
    <img :src="product.thumbnail" :title="product.thumbnail" class="w-full p-5"/>
    
  </div>
</template>

<style scoped></style>
