<template>
    <ChildComponent :list="list" :updateList="updateList" :selectAll="selectAll" />
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  
  export default {
    setup() {
      const list = ref([
        { id: 1, name: 'Item 1', selected: false },
        { id: 2, name: 'Item 2', selected: false },
        { id: 3, name: 'Item 3', selected: false }
      ])
  
      function updateList(id, checked) {
        list.value = list.value.map(item => {
          if (id === undefined) {
            item.selected = checked
          } else if (item.id === id) {
            item.selected = !item.selected
          }
          return item
        })
      }
  
      function selectAll() {
        updateList(undefined, true)
      }
  
      const selectedIds = computed(() => {
        return list.value.filter(item => item.selected).map(item => item.id)
      })
  
      return {
        list,
        updateList,
        selectAll,
        selectedIds
      }
    }
  }
  </script>
  