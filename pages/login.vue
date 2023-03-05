<script setup lang="ts">
import { useStrapiMepos } from "@/composables/useStrapiMepos"

const identifier = ref("staff1@thailog.biz")
const password = ref("Pass1234")

const usernameRef = ref(null)

const response = ref(null)
const responseError = ref(null)
const responsePending = ref(null)

const loginHandler = async () => {
  

  const { login, storeTokens } = useStrapiMepos()
  const { data, error, pending } = await login(identifier.value, password.value)

  
  if (error.value === null) {
    
    const router = useRouter()
    router.push("/admin/")
  } else {
    const { $swal } = useNuxtApp()
    const errorText =
      error.value.status === 400
        ? "Invalid username or password"
        : error.value.message

    $swal
      .fire({
        title: "Oops",
        text: errorText,
        icon: "error",
        confirmButtonText: "OK",
        toast: true,
      })
      .then(() => {
        
        
      })
  }
}

</script>

<template>
  <div class="h-full max-w-screen-sm p-5 px-5 m-5 mx-auto my-auto bg-blue-400 rounded-md xl:max-w-screen-sm bg-gradient-to-tr">
    <h1 class="mb-5 text-2xl">Login</h1>
    <form @submit.prevent="loginHandler">
      
      <div>
        <SharedInputText placeholder="Username or email" type="text" label="Username or email" v-model="identifier" icon="email" ref="usernameRef"/>
      </div>
      <div>
        <SharedInputText placeholder="password" type="password" label="Password" v-model="password"/>
      </div>
      <div>
        <SharedIconButton label="Login" />
      </div>                      

    </form>
  </div>
</template>
