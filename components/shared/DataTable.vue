<script lang="ts">
import { MeposProduct } from "~~/models/MeposProduct"
import { DataTableColumnOptions } from "~~/models/DataTableColumnOptions"
import { useAdminStore } from '~~/stores/useAdminStore'


export default defineComponent({
  props: {
    data: {
      type: Array<MeposProduct>,
      require: true,
    },
    columns: {
      type: Array<DataTableColumnOptions>,
      require: true,
    },
    options: {
      type: Object,
      require: false,
      default: {},
    },
  },

  setup(props) {
    
    const { $sortString, $sortValue } = useNuxtApp()    
    const { setBottomStatusText } = useAdminStore()
    
    
    const selectedMessage = ref('')

    let filteredData = ref([])
    let filterFields = {}

    let sortOptions = ref({
      sort: "",
      desc: false,
    })

    // setting up filterFields from props.columns
    if (props.options?.allowSearchIndividualField) {
      let temp = props.columns?.reduce((acc, col) => {
        // skip for noSearch or checkbox columns
        if (col?.noSearch === true || col?.checkbox === true) {
          return acc
        }
        acc[col?.displayField] = ""
        return acc
      }, {})

      filterFields = { ...temp }
    }

    const filters = ref(filterFields)

    const resetFilter = () => {
      let temp = {}
      Object.keys(filters.value).map((key) => (temp[key] = ""))
      filters.value = temp
      selected.value = []
      selectAllRef.value= false 
      filterItems()
    }

    const selected = ref([])
    const selectAllRef = ref(false)

    const selectAll = () => {
      let idField = props.options.idField ?? "id"
      //let temp = props.data?.map((item) => item[idField])
      
      let temp = filteredData.value.map( item => item[ idField ])      
      selected.value = temp

    }
    const selectNone = () => {
      selected.value = []
    }

    const recheckSelectAllBox = () => {
      console.log("recheck : ")
      console.log(selected.value.length !== 0)
      console.log(selected.value.length, filteredData.value.length)
      selectAllRef.value =
        selected.value.length !== 0 &&
        selected.value.length === filteredData.value.length
    }

    const setSort = (field: string, desc = false) => {
      sortOptions.value = {
        sort: field,
        desc: desc,
      }
      filterItems()
    }

    const getColumnType = (currentCol: string) => {
      let fieldType = "string"

      if (props.data.length > 0) {
        let item = props.data[0]
        if (item[currentCol] !== undefined) {
          fieldType = typeof item[currentCol]
        }
      }
      return fieldType
    }

    const filterItems = () => {
      let items = props.data
      for (let currentCol in filters.value) {
        if (filters.value[currentCol] === "") {
          continue
        }
        let fieldType = getColumnType(currentCol)
        console.log(` fieldType ${fieldType}`)
        items = items?.filter((item) => {
          // if (filters.value[currentCol] === "") {
          //   return true
          // }
          if (fieldType === "number") {
            return (
              parseFloat(item[currentCol]) ===
              parseFloat(filters.value[currentCol])
            )
          }
          return item[currentCol]
            .toLowerCase()
            .includes(filters.value[currentCol].toLowerCase())
        })
      }

      // console.log(` after filtered, ${items.length} items`)
      
      
      setBottomStatusText('sorting...')
      if (sortOptions.value.sort !== "") {
        let fieldType = getColumnType(sortOptions.value.sort)
        console.log(` sort mode = ${fieldType}`)
        items = items?.sort((a, b) => {
          return fieldType === "number"
            ? $sortValue(
                a[sortOptions.value.sort],
                b[sortOptions.value.sort],
                sortOptions.value.desc,
                -1
              )
            : $sortString(
                a[sortOptions.value.sort],
                b[sortOptions.value.sort],
                sortOptions.value.desc,
                ""
              )
        })
      }

      if (items !== undefined && items.length > 0) {
        console.log(`returning items ${items.length}`)
        console.log(`First ITEM ID ${items[0]["id"]}`)
      }
      
      setBottomStatusText('done')

      filteredData.value = items
      return items
    }

    const debugMe = (a: Object, b: Object) => {
      console.log(" ==debugMe()==")
      console.log(a.id)
      console.log(b)
    }

    const getSelectedItems = (returnType: string = "id") => {
      if (returnType === "id") {
        return [...selected.value]
      }

      let selectedItems = [...selected.value]
      console.log("SHIT", selectedItems)

      let temp = props.data.reduce((acc, item) => {
        if (selectedItems.includes(item.id)) {
          return [...acc, { ...item }]
        }
        return acc
      }, [])

      console.log(temp)
      return temp
    }
    
    
    watch(selected , (newSelected) => {
      console.log('WATCH')
      console.log(newSelected.length)
      
      if(newSelected.length === 0) {
        selectedMessage.value = ''
        selectAllRef.value = false 
      } else {
        selectedMessage.value = `, ${newSelected.length} ${newSelected.length === 1 ? 'item' : 'items'} selected`        
        selectAllRef.value = newSelected.length === filteredData.value.length        
      }      
    })

    // do filter once in setup
    filterItems()

    return {
      filterItems,
      filteredData,
      filters,
      sortOptions,
      getColumnType,
      setSort,
      resetFilter,
      selected,
      selectAll,
      selectNone,
      selectAllRef,
      selectedMessage , 
      recheckSelectAllBox,
      getSelectedItems,
      setBottomStatusText, 

      debugMe,
    }
  },
})
</script>

<template>
  <div>
    <div class="container mx-auto">
      {{ filteredData.length }}
      {{ filteredData.length <= 1 ? "item" : "items" }} matched
      {{ selectedMessage }}
    </div>

    <table class="container px-3 py-2 border border-collapse">
      <thead>
        <tr>
          <th
            v-if="$props.options?.checkboxes === true"
            class="px-3 mx-3 bg-slate-500"
            rowspan="2"
          >
            <input
              type="checkbox"
              v-model="selectAllRef"
              @click="selectAllRef ? selectNone() : selectAll()"
            />
          </th>

          <th
            v-for="(col, index) in columns"
            :key="index"
            class="mx-3 bg-slate-500"
          >
            <template
              class="flex flex-row items-center justify-between align-middle"
            >
              <div class="px-2 py-2">
                {{ col.label ?? col.displayField }}&nbsp;
              </div>

              <div v-if="col?.sortable === true" class="flex flex-col pr-2 py-0">
                <Icon
                  name="fa-solid:caret-up"
                  size="15"
                  class="text-xs cursor-pointer hover:text-red-600 "
                  :class="{
                    active:
                      sortOptions.sort === col.displayField &&
                      sortOptions.desc === false,
                  }"
                  @click="setSort(col?.displayField)"
                />
                <Icon
                  name="fa-solid:caret-down"
                  size="15"
                  class="text-xs cursor-pointer sort hover:text-red-600"
                  :class="{
                    active:
                      sortOptions.sort === col.displayField &&
                      sortOptions.desc === true,
                  }"
                  @click="setSort(col?.displayField, true)"
                />
              </div>
            </template>
          </th>
        </tr>
        <!-- filter header row (optional) -->
        <tr v-if="$props.options?.allowSearchIndividualField">
          <th v-for="(col, index) in columns" class="mx-3 bg-slate-500 p-1">
            <template v-if="col?.checkbox || col?.filter === false">
              &nbsp;
            </template>
            <template v-else>
              <input
                type="text"
                placeholder="filter"
                class="w-full px-2 font-normal"
                v-model="filters[col?.displayField]"
                @keyup="filterItems"
              />
            </template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, key) in filteredData" :key="item.id"
         :class="{
           'odd:bg-gray-300' : true
         }"
        >
          <td
            v-if="$props.options?.checkboxes === true"
            class="text-center py-2 text-sm border-b-gray-900 border-b-2"
          >
            <input
              type="checkbox"
              :value="item[$props.options.idField] ?? item['id']"
              v-model="selected"
              Xchange="recheckSelectAllBox"
            />
          </td>
          <td
            v-for="(col, index) in $props.columns"
            :key="index"
            class="py-2 text-sm border-b-gray-900 border-b-2"
            :class="col.cellClass ?? {}"
          >
            <SharedDataTableCell
              :type="col?.cellType"
              :data="item"
              :options="col"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.active {
  color: red;
}
</style>
