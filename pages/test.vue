<!-- Parent component -->
<template>
    <div>
      <ChildComponent>
        <template v-slot:default="{ value }" v-scope="{ item }">
          <div>{{ item.name }}: {{ value }}</div>
        </template>
      </ChildComponent>
    </div>
  </template>
  
  <script lang="ts">
  import ChildComponent from '../components/ChildComponent.vue';
  
  export default {
    components: {
      ChildComponent
    },
    data() {
      return {
        item: {
          name: 'Item 1',
          value: 100
        }
      }
    }
  }
  </script>
  
  <!-- Child component -->

  