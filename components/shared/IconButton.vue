<script setup lang="ts">
    const props =  defineProps({
        label: {
            type:String , 
            require: true 
        } ,
        icon : {
            type:String ,
            require: false 
        } ,
        ref : {
            type: Object as () => Ref<String>,
            require: false 
        } , 
        onclick : {
            type: Function 
        }
        
    })
</script>
<template>
    <button class="bg-gray-500 hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center" ref="props.ref" @click.stop="props.onclick">
        
    <template v-if="props.icon === 'download'">
    <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
    </template>
  <span>{{  props.label }}</span>
</button>
</template>