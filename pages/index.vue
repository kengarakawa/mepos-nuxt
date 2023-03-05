<script lang="ts" setup>
  const loginHandler = () => {
    const router = useRouter()  
    router.push('/login')
  }
  

</script>

<template>
  <div>
    Goddamn , this is index page
    <br />
    try 
    <button class="rounded-md bg-blue-400 px-5 py-2 text-white text-xl" @click="loginHandler" >Login</button>
  </div>
</template>

<style scoped></style>
