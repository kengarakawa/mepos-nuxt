<script lang="ts" setup>
// import { MakeupFromExternal } from "~~/models/MakeupFromExternal"
// import makeupJson from "@/raw/makeup.json"

import { MeposProduct } from "~~/models/MeposProduct"
import { useExternalMakeupData } from "~~/composables/useExternalMakeupData"

import { useStrapiMepos } from "~~/composables/useStrapiMepos"
import { v4 as uuidv4 } from "uuid"

definePageMeta({
  layout: "backend",
})

const dataTableRef = ref(null)

const { data, error, pending } =
  await useExternalMakeupData().fetchFromExternal()
console.log("PRODUCT AFTER FECTH")
console.log(data)

const makeupData = ref(data.value)

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
    displayField: "image_link",
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

const importToStrapiMepos = () => {
  if (dataTableRef.value) {
    const selected = dataTableRef.value.getSelectedItems("object")
    console.log(selected)

    const { $getCurrentUser } = useNuxtApp()
    const { id } = $getCurrentUser()

    const preparedProducts = selected.map((product) => {
      return {
        uuid: uuidv4(),
        name: product.name,
        price: parseFloat(product.price),

        // images: [ product.image_link] ,
        thumbnail: product.image_link,
        description: product.description,
        rating: parseFloat(product.rating),
        category: "",
        tags: "",
        variation: "",
        original_id: product.id.toString(),
        original_source: "makeupProductJson",
        users: id,
      }
    })

    console.log(preparedProducts)

    const { importProduct } = useStrapiMepos()
    // importProduct(preparedProducts)

    preparedProducts.map(async (product) => {
      const { data: responseData, error: responseError } = await importProduct(
        product
      )
      console.log(responseData)
      console.log(responseError)
    })

    const { $swal } = useNuxtApp()
    $swal.fire({
      title: "Imported",
      text: `Done importing ${preparedProducts.length} items `,
      icon: "info",
      confirmButtonText: "OK",
    })
  }
}
</script>

<template>
  
  
  <div>
    <section class="p-5">
      <h1 class="text-xl">Products from LIVE JSON</h1>
      <h3 class="text-xs">
        https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&sort=price
      </h3>
    </section>

    <div v-if="pending" class="pt-10">
      <InlineLoading />
    </div>

    <div
      v-else
      class="text-right container mx-auto flex flex-row justify-between"
    >
      <button
        class="bg-red-600 text-black rounded-md px-5 py-2"
        @click="importToStrapiMepos"
      >
        IMPORT SELECTED TO STRAPI MEPOS
      </button>
      <button
        class="bg-slate-600 text-white rounded-md px-5 py-2"
        @click="resetFilter"
      >
        RESET FILTER FROM EXTERNAL
      </button>
    </div>

    <SharedDataTable
      ref="dataTableRef"
      :data="(makeupData as Array<MeposProduct>)"
      :columns="columnOptions"
      :options="tableOptions"
    />
  </div>
</template>

<style scoped></style>
