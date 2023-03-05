<script lang="ts" setup>
defineProps<{
  name? : String ;
  value? : String;
  
}>()
</script>

<template>  
    <input type="checkbox" name="${name}" value="${value}">  
</template>

<style scoped></style>
