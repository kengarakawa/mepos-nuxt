<script lang="ts" setup>
import { MakeupFromExternal } from "~~/models/MakeupFromExternal"
import makeupJson from "@/raw/makeup.json"

const { $sortString, $sortValue } = useNuxtApp()

definePageMeta({
  layout: "backend",
})

const dataTableRef = ref(null)

const isFetching = ref(false)

const makeupData = ref(
  makeupJson.map((item) => {
    return { ...item, price: parseFloat(item.price) }
  })
)
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
  },
  {
    label: "",
    displayField: "image_link",
    cellType: "thumbnail",
    filter: false,
    cellClass : {
      'w-1/8' : true
    }
  },
  { label: "Name", displayField: "name", sortable: true, cellType: "text" },
  {
    label: "Desc",
    displayField: "description",
    sortable: true,
    cellType: "text",
    cellClass: {

      "w-1/8" : true 
    },
    componentClass : {
      "text-xs" : true 
    }, 
    maxLength : 100
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
    displayField: "created_at",
    sortable: true,
    cellType: "date",
  },
]

const resetFilter = () => {
  if (dataTableRef.value) {
    dataTableRef.value.resetFilter()
  }
}

const importToFirebase = () => {
  if (dataTableRef.value) {
    const selected = dataTableRef.value.getSelectedItems("object")
    console.log(selected)
  }
}
</script>

<template>
  <div>
    <div class="text-right container mx-auto flex flex-row justify-between">
      <button
        class="bg-red-600 text-black rounded-md px-5 py-2"
        @click="importToFirebase"
      >
        IMPORT SELECTED TO FIREBASE
      </button>
      <button
        class="bg-slate-600 text-white rounded-md px-5 py-2"
        @click="resetFilter"
      >
        RESET FILTER FROM EXTERNAL
      </button>
    </div>

    <div v-if="isFetching" class="pt-10">
      <InlineLoading />
    </div>
    <template v-else>
      <SharedDataTable
        ref="dataTableRef"
        :data="(makeupData as Array<MakeupFromExternal>)"
        :columns="columnOptions"
        :options="tableOptions"
      />
    </template>
  </div>
</template>

<style scoped></style>
