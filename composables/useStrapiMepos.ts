import { Datum } from "@/models/StrapiMeposProduct"
import { useAdminStore } from '~~/stores/useAdminStore'


const toMeposProductFormat = (item: Datum) => {
  return {
    id: item.id,
    ...item.attributes,
  }
}
const getAuthToken =  () => {
  return localStorage.getItem('token')        
}  

export const useStrapiMepos = () => {
  const API_ENDPOINT = "http://localhost:1337/api/products/"
  const API_AUTH_ENDPOINT = "http://localhost:1337/api/auth/local/"

  return {
    login: async (identifier: string, password: string ,saveToLocalStorage=true, saveToPiniaStore=true) => {
      
      
      console.log('useStrapiMepos.login() HERE')
      
      const { data, error, pending } = await useFetch(API_AUTH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      })
      

      if(!error.value) {
        console.log(' NO ERROR , PROCEED TO KEEP!!')
        if(saveToLocalStorage) {
          localStorage.setItem('currentUser', JSON.stringify(data.value.user))
          localStorage.setItem('token' , data.value.jwt)        
        }
        if(saveToPiniaStore) {
          const { setCurrentUser , getCurrentUser } = useAdminStore()  
          
          console.log('goinig to save')
          console.log(data.value.user)
          
          console.log(' now fetching back ')
          let wth = getCurrentUser()
          console.log(wth)
          
          
          
          
          setCurrentUser(data.value.user)
        }
      }
      
      
      
      return { data, error, pending }
    },
    
    logout: async() => {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('token')     
        
        const { setCurrentUser } = useAdminStore()
        setCurrentUser({})
    } , 
    

    storeTokens: (token: string, currentUser: object) => {
      localStorage.setItem("token", token)
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    },
    
    getAuthToken , 

    importProduct: async (meposProduct: Object) => {
      // const { $getAuthToken } = useNuxtApp()

      let token = getAuthToken()

      console.log(`token ${token}`)
      console.log(meposProduct)
      console.log(`meposProduct ${JSON.stringify(meposProduct)}`)

      const { data, error, pending } = await useFetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: meposProduct }),
      })

      return { data, error, pending }
    },

    getProducts: async ({ page = 1 }) => {
      // const { $getAuthToken } = useNuxtApp()

      const token = getAuthToken()
      //      console.log(`token ${token}`)

      let url = API_ENDPOINT

      if (page > 1) {
        url += `?pagination%5Bpage%5D=${page}`
      }

      console.log(`loading ${url}`)
      const { data, error, pending, refresh } = await useFetch(() => url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const formattedData = data.value.data.map((item) =>
        toMeposProductFormat(item)
      )

      return {
        data: {
          data: formattedData,
          meta: data.value.meta,
        },
        error,
        pending,
        refresh,
      }
    },
  }
}
