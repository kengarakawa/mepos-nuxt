import { defineStore } from "pinia"

export const useSimpleStore = defineStore("simpleStore", {
  state: () => {
    return {
      count: 10,
    }
  },
  getters: {
    theCount: (state) => state.count,
  },
  actions: {
    increase() {
      this.count += 1
    },
    decrease() {
      this.count -= 1
    },
  },

  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
})
