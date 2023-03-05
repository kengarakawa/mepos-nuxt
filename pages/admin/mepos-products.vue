<script lang="ts" setup>
// import { MakeupFromExternal } from "~~/models/MakeupFromExternal"
// import makeupJson from "@/raw/makeup.json"

import { MeposProduct } from "~~/models/MeposProduct"

import { useStrapiMepos } from '~~/composables/useStrapiMepos'



definePageMeta({
  layout: "backend",
})

const dataTableRef = ref(null)

const { data:response , error, pending  } =
  // await useExternalMakeupData().fetchFromExternal()
  await useStrapiMepos().getProducts({})
console.log("PRODUCT AFTER FECTH (STRAPI MEPOS) ... ")

console.log(response.data)

const makeupData = ref(response.data)
const meta = ref(response.meta)





// const makeupData = ref(
//   data.map( item => {
//     return { ...item }
//   })
// )



// const makeupData = ref([])

// const makeupData = ref(
// makeupJson.map((item) => {
//   return { ...item, price: parseFloat(item.price) }
// })
// []

//)

const tableOptions = {
  allowSearchIndividualField: true,
  checkboxes: true,
  idField: "id",
}

const columnOptions = [
  {
    label: "Id",
    displayField: "id",
    sortable: true,
    cellClass: {
      "text-center": true,
      "w-10": true,
    },
    cellType: "text",
    componentClass: {},
  },
  {
    label: "",
    displayField: "thumbnail",
    cellType: "thumbnail",
    filter: false,
    cellClass: {
      "w-1/8": true,
    },
  },
  {
    label: "Name",
    displayField: "name",
    sortable: true,
    cellType: "text",
    componentClass: {},
  },
  {
    label: "Desc",
    displayField: "description",
    sortable: true,
    cellType: "text",
    cellClass: {
      "w-1/8": true,
    },
    componentClass: {
      "text-xs": true,
    },
    maxLength: 100,
  },
  {
    label: "Price",
    displayField: "price",
    sortable: true,
    cellType: "price",
    format: {
      value: "price",
      currency: "currency",
    },
    cellClass: {
      "text-right": true,
      "w-1/16": true,
      // 'align-top' : true
    },
  },
  {
    label: "Rating",
    displayField: "rating",
    sortable: true,
    cellType: "rating",
    cellClass: {
      "text-center": true,
      "w-1/16": true,
      // 'align-top' : true
    },
  },
  {
    label: "Create",
    displayField: "createdAt",
    sortable: true,
    cellType: "date",
  },
]

const resetFilter = () => {
  if (dataTableRef.value) {
    dataTableRef.value.resetFilter()
  }
}


</script>

<template>
  
  
  <section class="p-5">
      <h1 class="text-xl text-blue-600"> STRAPI MeposProducts</h1>
    </section>
  <div>
    
    
    
    <div v-if="pending" class="pt-10">
      <InlineLoading />
    </div>
    
    
    <div v-else class="container flex flex-row justify-end mx-auto text-right">      
      <button
        class="px-5 py-2 text-white rounded-md bg-slate-600"
        @click="resetFilter"
      >
        RESET FILTER FROM EXTERNAL
      </button>
    </div>
    
    
    {{  meta }}
      <SharedLiveDataTable
        ref="dataTableRef"
        :data="(makeupData as Array<MeposProduct>)"
        :meta="meta.pagination"
        :columns="columnOptions"
        :options="tableOptions"
      />
    
  </div>
  
  
</template>

<style scoped></style>
