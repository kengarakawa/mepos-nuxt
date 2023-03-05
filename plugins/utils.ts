export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      sortString: (a?: String, b?: String, desc: boolean=false,  ifNullValue: String = "") => {
        if(desc) {
            return (a ?? ifNullValue) < (b ?? ifNullValue)    
        }
        return (a ?? ifNullValue) > (b ?? ifNullValue)
      },
      sortValue: (a:String , b: String, desc: boolean=false, ifNullValue: String = "-1") => {        
        if(desc) {
            return parseFloat(a ?? ifNullValue) < parseFloat(b ?? ifNullValue)    
        }
        return parseFloat(a ?? ifNullValue) > parseFloat(b ?? ifNullValue)
      },
      
      // login : () => {
      //   localStorage.setItem("adminToken", "ThisIsMockupAdminToken")
      //   return localStorage.getItem("adminToken")
      // } , 
    
      // logout : () => {
      //   localStorage.removeItem("adminToken")
      // } , 
      // isLoggedIn : () =>{
      //   if(localStorage.getItem("adminToken") === null) {          
      //     return false
      //   }
      //   return true 
      // }       
    //   makeComponentCell: (componentType: string ) => {
    //     switch(componentType.toLowerCase()) {            
    //         case 'a' : return InlineLoading
    //         default : return ComponentA 
    //     }
    //   }
    },
  }
})
