export type MakeupFromExternal = {
  id: number
  brand: string
  name: string
  // price: String
  price?: number
  price_sign: string | null
  // currency : String | null 
  image_link: string
  product_link: string
  website_link: string
  description: string
  rating: number
  category: string | null 
  product_type: string | null 
  tag_list: Array<string>
  created_at: string
  updated_at: string
  product_api_url: string
  product_colors: Array<MakeupFromExternalColorOption>
}


export type MakeupFromExternalColorOption = {
  hex_value: string 
  colour_name: string 
} 
