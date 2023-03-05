<script lang="ts" setup>
  import { useSimpleStore } from '@/stores/simpleStore'
  
  
  const simpleStore = useSimpleStore()
  const { theCount:count , increase , decrease} = simpleStore
  const theCount = computed( () => simpleStore.count )
  
  console.log(theCount)
  console.log(increase)
  console.log(decrease)

  

  

</script>

<template>
  <div class="container mx-auto text-center">
    
    <div class="text-2xl text-red-500">
    {{  theCount }}
  </div>
    
    
    <button @click="increase" class="rounded-md bg-blue-300 p-3 mr-5">Increase</button>
    <button @click="decrease" class="rounded-md bg-red-300 p-3">Decrease</button>
  </div>
</template>

<style scoped></style>
