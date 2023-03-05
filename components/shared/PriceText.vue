<script lang="ts">

export default defineComponent({
  props: {
    value: {
      type: [Number , String] , 
      require: true
    } ,
    currencySymbol : {
      type: String , 
      require: false,
      default: '$'
    } , 
    format : {
      type: String  ,
      require: false ,
      default: '${currencySymbol}${value}'
    }
  }, 
  
  setup(props) {
    const printPrice = () => {
      return props.format
        .replace("${currencySymbol}", props.currencySymbol)
        .replace("${value}", props.value);
    }  
    
    return {
      printPrice 
      
    }
    
  }
})

</script>


<template>
  <span class="text-red-700">{{  printPrice() }}</span>
</template>

<style scoped></style>
