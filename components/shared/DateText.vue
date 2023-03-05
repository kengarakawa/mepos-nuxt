<script lang="ts">
// TODO Validator
  import dayjs from 'dayjs'
  import { Props } from 'nuxt/dist/head/runtime/types'
  import relativeTime from 'dayjs/plugin/relativeTime';
  import i18n from 'dayjs/locale/th'

  
  
  dayjs.extend(relativeTime)
  

  export default defineComponent({
    name: 'DateText' , 
    props : {
      date : {
        type: String ,
        require: false ,
        // validator: (value:any) => {          
        //   console.log(value)
        //   return true
        // }, 
        // default: null 
      } 
    }, 
    
    setup(props: Props, context) {
      
      
      const theDate = ref(
        dayjs(props.date ?? null )
      )
      
      const fromNow = (theDate: dayjs.Dayjs) => {        
        return dayjs().locale(i18n).to( theDate )
      }
      
      
      
      return {
        theDate  , 
        fromNow 
      }
    }
  })

</script>

<template>
  <span :aria-label="theDate">{{  fromNow(theDate) }} </span>  
</template>

<style scoped></style>
