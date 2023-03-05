export type MeposProduct = {
  id?: string
  
  
  name: string
  description?: string
  price?: number
  images?: string[]
  
  rating: number   
  
  categories?:  string[]
  tags?: string[] 
    
  variations?: Object[] 

  original_source?: string
  original_id?: string
  
  created_at: Date
  updated_at?: Date
  deleted_at?: Date 
  
}
