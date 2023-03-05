<script lang="ts">
export default defineComponent({
  // components : {
  //   ListTable
  // },
  async setup(props, context) {
    const url =
      "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"

    const products: any = ref([])
    const filteredProducts: any = ref([])
    const searchText = ref("")
    const searchBoxRef = ref(null)

    const { data, error, pending } = await useFetch(url)

    // console.log(products.value.length)
    // const error = ref(null)
    // const pending = ref(null)

    const columnOptions = {          
      id: {},
      "": {},
      name: {},
      price: {},
      description: {},
      options: {},
    }
    
    
    const columns = [
      {
        field : 'id' ,
        label : 'id' , 
        isCheckbox : true ,       
        align: 'center'  
      } ,  {
        label : '' , 
        field : 'image' , 
        content : {          
          type: 'props' , 
          propName : 'sharedThumbnailImage.vue' , 
          childProps : {
             value : 'price'  ,
             currencySymbol : 'price_sign'
          }          
        }        
        
      } ,  {
        label : 'Name' ,
        field : 'name'
      }, 
      { field : 'price' , 
        label : 'Price' , 
        content : {          
          type: 'props' , 
          propName : 'sharedPriceText.vue' ,
          childProps : {
             value : 'price'  ,
             currencySymbol : 'price_sign'
          }          
        }        
      } , {
        label : 'Description' ,
        // field : 'description'
      } , 
      {
        label : 'Options'
      }
    ]

    if (data) {
      //products.value = data.value
      products.value = Object.keys(data.value).map(         
      item => {
        return {
          ...item , 
          price : parseFloat(item.price) ?? null 
        }
      }
      
      
      )
      filteredProducts.value = data.value
      
      
      console.log(filteredProducts.values[0].price)
    }

    const listTableRef = ref(null)

    const showMe = () => {
      // if (listTableRef !== null) {
      //   let temp = listTableRef.value.getSelectedItems()
      //   console.log(temp)
      // }

      if (listTableRef !== null) {
        let filtered = products.value.filter(
          (i) => i.description.indexOf("face") !== -1
        )
        products.value = filtered
      }
    }

    const enterKeyword = () => {
      console.log(` ENTER : ${searchText.value}`)

      if (searchText.value === "") {
        filteredProducts.value = products.value
        return
      }

      let keywords = searchText.value.split(/\s+/)

      let out: Array<any> = []

      let i = 0

      let varProducts = products.value

      out = keywords.reduce((acc, keyword) => {
        keyword = keyword.toLowerCase()

        console.log(`start of the loop, now acc are`)
        console.log(acc)

        let me = acc.filter((item) => {
          if (keyword.startsWith("product_type:")) {
            let realKeyword = keyword.substring(
              "product_type:".length,
              keyword.length
            )
            console.log(
              ` CASE 1 - product_type , returning ${
                item.product_type == realKeyword
              }`
            )
            return item.product_type == realKeyword
          }
          if (keyword.startsWith("category:")) {
            let realKeyword = keyword.substring(
              "category:".length,
              keyword.length
            )
            console.log(
              ` CASE 2 - category , returning ${item.category == realKeyword}`
            )
            return item.category == realKeyword
          }
          let content = item.description.toLowerCase()
          console.log(
            ` CASE 3 - plain text , returning ${
              content.indexOf(keyword) !== -1
            }`
          )
          return content.indexOf(keyword) !== -1
        })
        console.log(` end of loop ${++i}, returning `)
        console.log(me)
        return (acc = me)
      }, varProducts)

      console.log("FINALLY")
      console.log(out)

      filteredProducts.value = out
    }
    
    
    const startOver = () => {
      products.value = data.value
      filteredProducts.value = data.value 
      searchText.value = ''
      listTableRef.value.selectNone()
    }

    function badgeClickHandler(args: Object) {
      let appendingKeyword = `${args.badgeType}:${args.label}`
      searchText.value =
        searchText.value == ""
          ? appendingKeyword
          : searchText.value + " " + appendingKeyword

      if (searchBoxRef !== null) {
        searchBoxRef?.value?.dispatchEvent(
          new KeyboardEvent("keyup", { key: "Enter", bubbles: true })
        )
      }
    }
    
    
    const importToFirebase = () => {
      console.log('me??')
      if(listTableRef === null) {
        return ;
      }
      let selected = listTableRef.value.getSelectedItems()
      if(selected.length === 0)  {
        alert('None selected')
      }
      const selectedP = products.value.filter( p => selected.includes(p.id))
      console.log('Seems OK')
      console.log(selectedP)
    }

    return {
      data,
      pending,
      error,
      products,
      filteredProducts,
      columnOptions,
      searchText,
      badgeClickHandler,
      listTableRef,
      showMe,
      enterKeyword,
      searchBoxRef,
      startOver  ,
      importToFirebase , 
      columns , 
    }
  },
})
</script>

<template>
  <div class="container p-3 mx-auto">
    <h1 class="text-xl text-green-800">Products!</h1>

    <div class="container flex items-center justify-between">
      <div class="px-3 py-2 text-left">
        <button class="px-5 py-2 text-white bg-blue-400 rounded-md" @click="startOver">
          Start Over
        </button>
      </div>
      <div class="px-3 py-2 text-right">
        <input
          class="px-2 border-2 border-gray-300"
          type="text"
          v-model="searchText"
          placeholder="keyword"
          @keyup.enter="enterKeyword"
          ref="searchBoxRef"
        />
      </div>
    </div>

    {{ searchText }}

    <div class="pt-10">
      <template v-if="filteredProducts.length <= 0">
        <InlineLoading />
      </template>
      <template v-else>
        <!-- <div>
          <button @click="showMe" class="p-3 bg-blue-300 rounded-md">
            Show selected
          </button>
        </div> -->
        <!-- <SharedDataTable
          
          :data="filteredProducts"
          :columns="columns"
          :withCheckboxes="true"
        /> -->
        <ListTable
          ORIG_items="filteredProducts"
          :items="filteredProducts"
          :columns="columnOptions"
          :withCheckboxes="true"
          @badgeClick="badgeClickHandler"
          @onImport="importToFirebase"
          ref="listTableRef"
        />
      </template>
    </div>
  </div>
</template>

<style scoped></style>

