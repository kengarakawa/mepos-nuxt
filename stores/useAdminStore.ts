import { defineStore } from "pinia"
import { ADMIN_STORE_STORAGE } from "./usePersistAdminStore"
import StrapiUser from "@/models/strapiUser"

interface AdminStoreState {
  contents: Record<string, Object>
}





export const useAdminStore = defineStore("admin", {
  state: () => {
      return {
          currentUser : {} ,
          bottomStatusText : ref('initializing...')
      }
    } , 
  actions: {
    setBottomStatusText(newStatus: string) {
      this.bottomStatusText = newStatus
    },

    setCurrentUser(newUser: Object) {
      this.currentUser = newUser
    },
    getCurrentUser():unknown {
      return this.currentUser
    },
  },

  getters: {
    statusText: (state) => state.bottomStatusText,
    currentUserObject: (state) => state.currentUser,
  },
  
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
})
