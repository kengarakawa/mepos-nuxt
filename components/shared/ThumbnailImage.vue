// TODO : add the sizes' classes 
<script lang="ts" >
  type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  const isSize = (value:any) => {
    return ['xs' , 'sm' , 'md' , 'lg' , 'xl'].includes(value)
  }
  
  export default defineComponent({
    name : 'ThumbnailImage' , 
    props : {
      src : {
        type: String ,
        require : true 
      } , 
      title : {
        type: String ,
        require : true 
      } , 
      size: {
        type : String as () => Size ,
        validator : (value: any) => isSize(value) ,
        default : 'md' ,
        require : false
      }
    }, 
    setup(props) {
       
       const theSize = ref(props.size ?? 'md')       
       return {
        theSize
       }
    }  
    
  })

</script>

<template>
  <img
              class="w-3/5 m-auto"
              :src="src"
              :title="title"
              
            />
</template>

<style scoped></style>
