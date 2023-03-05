<script lang="ts">
import { useAdminStore } from "~~/stores/useAdminStore"

export default defineComponent({
  
  setup(props) {
    
    
    const adminStore = useAdminStore()
    const userInit = computed(() => {      
      let userObject = adminStore.getCurrentUser() 
      let temp = userObject?.username ?? '😀'
      return temp.substring(0,1) 
    })
    
    const currentUser = computed(() => adminStore.getCurrentUser())
    
    const links = ref([
      {
        text: "dashboard",
        url: "/admin/",
      },
      // {
      //   text: "dummy ♥",
      //   url: "/dummy",
      // },
      {
        text: "Live JSON",
        url: "/admin/products",
      },
      {
        text: "Strapi",
        url: "/admin/mepos-products",
      },
      {
        text: "static products",
        url: "/admin/products-static",
      },
      {
        text: "logout",
        url: "/admin/logout",
      },
    ])

    const { statusText , currentUserObject } = toRefs(useAdminStore())

    return {
      links,
      statusText,
      currentUser , 
      userInit , 
      
    }
  },
})


</script>

<template>
  <div class="bg-red-200">
    <div class="container flex flex-row justify-between mx-auto">
      <div class="px-2 py-4 text-lg text-red-700 flex-grow-1">This is BACKEND layout</div>

      <div class="flex justify-end flex-grow-0 gap-1 align-middle flew-row align-end">
        
        <div
          v-for="(link, index) in links"
          :key="index"
          class="self-center inline px-5 text-center bg-blue-300 hover:bg-blue-600 hover:text-white"
        >
          <NuxtLink :to="link.url">{{ link.text }}</NuxtLink>
        </div>

        <div
          class="relative flex items-center self-center justify-center ml-5 font-bold text-gray-700 uppercase bg-white rounded-full"
          :style="{ width: '35px', height: '35px' }"
          :title="`${currentUser.username} - ${currentUser.id}`"
        >
          {{  userInit  }}
          <div
            class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full cursor-pointer -top-2 -right-2"
          >
            <button class="p-0 m-0">10</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container mx-auto mt-5 mb-5 bg-gray-200">
    <slot />
  </div>

  <div class="fixed bottom-0 w-full p-1 bg-red-200">
    <div class="flex flex-row justify-between mx-auto text-xs">
      <div>{{ statusText }}</div>
      <div>&copy; 2023 Mepos</div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
