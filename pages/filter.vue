<script lang="ts">
import { Input } from 'postcss'

export default defineComponent({
  setup() {
    const defaultInput = [
      { id: 1, name: "Item 1 " },
      { id: 2, name: "Item 2 " },
      { id: 3, name: "Item 3 " },
      { id: 4, name: "Item 4 " },
      { id: 5, name: "Item 5 " },
      { id: 6, name: "Item 6 " },
    ]
    const items = ref(defaultInput)
    
    const output = ref([])
    
    
    const oddOnly = () => {
      
      
      const me = items.value
      
      console.log(me)
      
      
      if(me) { 
        output.value = me.filter(i =>  i.id %2 === 1  )
        items.value = output.value
      }
      
      
      
    }
    
    return {
      items  ,
      oddOnly , 
      output
      
    }
  },
})
</script>

<template>
  <h1>Goddamn</h1>
  <ul v-if="items !== undefined && items.length > 0">    
    <li  v-for="item in items">
      {{  item }}
    </li>            
  </ul>
  <button @click="oddOnly">oddOnly</button>
  
  <hr />
  <div>
    
    <h3>Output</h3>
  <ul v-if="output !== undefined && output.length > 0">    
    <li  v-for="item in output">
      {{  item }}
    </li>            
  </ul>
</div>
  
  


  
</template>

<style scoped></style>
