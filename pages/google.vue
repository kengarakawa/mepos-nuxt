<script lang="ts" setup>
import {
  GoogleSignInButton,
  type CredentialResponse,
  hasGrantedAllScopes,
} from "vue3-google-signin"
import jwt_decode from "jwt-decode";

const handleLoginSuccess = (response: CredentialResponse) => {
  console.log(response)
  const { credential } = response
  console.log("Access Token", credential)

  localStorage.setItem("googleToken", credential ?? "NOTFOUND")

  
}

// handle an error event
const handleLoginError = () => {
  console.error("Login failed")
}



const result = ref(null)

const token = localStorage.getItem('googleToken')
if(token) {
  const out = jwt_decode(token)
  
  result.value = out 
}
</script>

<template>
  <div>
    Page: Login

    <GoogleSignInButton
      @success="handleLoginSuccess"
      @error="handleLoginError"
      auto-login
    />

    <hr />
    {{ result }}
  </div>
</template>

<style scoped></style>
