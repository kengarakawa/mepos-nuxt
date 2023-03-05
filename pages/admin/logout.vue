<script lang="ts">

import { useStrapiMepos } from '@/composables/useStrapiMepos'


export default defineComponent({
  
  name: 'Logout', 
  setup(props) {
    
    const { logout } = useStrapiMepos()
    
    // const { $loggedIn, $logout } = useNuxtApp()    
    // console.log($logout)

    function redirectToHome() {
      
    }

    logout()
    const router = useRouter()
      router.push("/login")

  },
})
</script>

<template>
  <div>L O G G I N G . . . O U T . . .</div>
</template>

<style scoped></style>
