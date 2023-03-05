<script lang="ts">
import { MakeupFromExternal } from '../models/MakeupFromExternal'


type CellData = "text" | "mixed" | "thumbnail" | "long_text"

const ListTable =  defineComponent({
  name: 'ListTable',
  props: {
    items: {
      type: Array<MakeupFromExternal>,
      require: true,
    },
    columns: {
      type: Object,
      require: true,
    },
    withCheckboxes: {
      type: Boolean,
      require: false,
      default: false,
    }
    
  },
  setup(props: Props, context) {
    const list = ref(props.items)
    const showCheckboxes = ref(props.withCheckboxes)
    const selectedItems = ref([])
    const selectAllCheckboxValue = ref(false)
    
    // const headerRow:any = ref(['sss'])

    function badgeClickHandler(label: String, badgeType: String) {
      context.emit("badgeClick", {
        label,
        badgeType,
      })      
    }
    
    
    function getSelectedItems() {      
      return [...selectedItems.value ]
    }
    
    const selectAll = () => {
      console.log([...list.value])
      selectedItems.value = []
      selectedItems.value = list.value.map( item => item.id )
      return selectedItems.value
      
    }
    const selectNone = () => {
      selectedItems.value = []
      return []
    }
    
    
    const workingButton = () => {      
      selectedItems.value.length === 0 ? selectAll() : selectNone()      
    }
    
    const toggleSelectAll = () => {
      console.log(selectAllCheckboxValue.value)
      selectAllCheckboxValue.value ? selectAll() : selectNone()
    }
        

    return {
      badgeClickHandler,
      showCheckboxes,
      selectedItems ,
      getSelectedItems , 
      selectAllCheckboxValue, 
      toggleSelectAll , 
      selectAll ,
      selectNone , 
      workingButton
    }
  },
})


export default ListTable 
</script>

<template>
  <div>
    {{ selectedItems }}
    
    <button class="rounded-md p-3 bg-red-500" @click="workingButton">Me</button>
    
    <table class="container mx-auto">
      <tr class="bg-green-300 ">
        <th v-for="(header, key) in columns" :key="key" class="py-3">
          
          <template v-if="key !== 'id'">
            {{ key }}
          </template>
          <template v-else>
            <input type="checkbox" ref="selectAllCheckbox" v-model="selectAllCheckboxValue"  
            
            @change="toggleSelectAll"
            />
          </template>
          
        </th>
      </tr>

      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
          class="hover:bg-gray-300 border-b-2 even:bg-gray-100 odd:bg-gray-200"
        >
          <td class="px-2 text-center w-1/16">
            <span v-if="!showCheckboxes">{{ index + 1 }} </span>
            <span v-else>
              <input
                type="checkbox"
                name="list[]"
                :value="item.id"
                v-model="selectedItems"                
              />
            </span>
          </td>

          <td class="px-2 w-24">
            <!-- <img
              class="object-cover"
              :src="item.image_link"
              :title="item.name"
            />&nbsp; -->
            <SharedThumbnailImage :src="item.image_link"
              :title="item.name" />
          </td>
          <td class="flex flex-col px-2 w-13/16">
            <span class="text-sm">{{ item.name }}</span>

            <span>
              <SharedClickableBadge
                v-if="item.category"
                :label="item.category"
                badgeClass="bg-gray-500"
                @badgeClick="badgeClickHandler(item.category, 'category')"
              />
              <SharedClickableBadge
                v-if="item.product_type"
                :label="item.product_type"
                badgeClass="bg-blue-300"
                @badgeClick="
                  badgeClickHandler(item.product_type, 'product_type')
                "
              />
            </span>
          </td>
          <td class="px-2">
            {{ item.price }}
          </td>
          <td class="px-2">
            <SharedDateText :date="item.updated_at"/>
            <!--  items.updated_at -->
          </td>

          <td class="text-xs text-gray-600">
            {{ item.description.replace(/<[^>]+>/g, "") }}
          </td>

          <td class="w-5/12">
            <template v-if="item.product_colors.length > 0">
              <div class="flex align-middle">
                <button
                  class="w-10 h-10 mr-2 border-black border-solid cursor-pointer"
                  v-for="(colorOption, colorKey) in item.product_colors"
                  :style="{ 'background-color': colorOption.hex_value }"
                  :tilte="colorOption.colour_name"
                ></button>
              </div>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
