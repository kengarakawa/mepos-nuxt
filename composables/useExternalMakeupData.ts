import { MakeupFromExternal , MakeupFromExternalColorOption } from "~~/models/MakeupFromExternal"
import { MeposProduct } from "~~/models/meposProduct"


const mapToMeposProduct = (data: Array<MakeupFromExternal>):MeposProduct => {        
    let out = data.map( item => {
            return {
                
                id : null , 
                name : item.name , 
                price : item.price , 
                description : item.description , 
                rating : item.rating, 
                tags: [] ,
                categories: [] , 
                variations: 
                item.product_colors.map( (option:MakeupFromExternalColorOption) =>  {
                        return { 
                            name : option.colour_name , 
                            hex : option.hex_value    
                        }
                        
                    }                        
                ),                     
                original_source : 'makeup-api' , 
                original_id : item.id,                     
                created_at: Date(item.created_at) ?? Date(), 
                
            }
            
        }
        
    )    
    return out 
}

export const useExternalMakeupData = () => {
  return {
    fetchFromExternal : async (mapToMePos:boolean =true ) => {
      const sourceUrl = "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&sort=price"
        
      
      
      
      const { data, error , pending } = await useFetch(sourceUrl)        
      
      
      
      if(mapToMePos) {
        const products = ref(mapToMeposProduct( data.value ))      
        return { data, error , pending }  
      }      
      return { data, error , pending }
      
    },    
    mapToMeposProduct 
        
    
  }
}
