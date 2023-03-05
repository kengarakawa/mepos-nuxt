<script lang="ts" setup>
  import { useGlobalStore } from '@/stores';  
  definePageMeta({
    middleware: ['auth']
  })  
  const { hasFlashSwal , getFlashSwal } = useGlobalStore() 
  if(hasFlashSwal()) {
    const flashSwal = getFlashSwal(false)
    const { $swal } = useNuxtApp()
    $swal.fire(flashSwal)        
  }  
</script>


<template>
  <NuxtPage />
</template>