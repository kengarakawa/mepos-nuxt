<script lang="ts" setup>
import { useStrapiMepos } from "~~/composables/useStrapiMepos"
const { getProducts } = useStrapiMepos()

const page = ref(1)

const { data, error, pending, refresh } = await getProducts({
  page: page.value,
})

watch(page, async (newPage, oldPage) => {
  console.log("page change!!!")
  if (newPage === oldPage) {
    return
  }
  console.log("refresh!")
  refresh()

  const {
    data: newData,
    error: newError,
    pending: newPending,
  } = await getProducts({
    page: newPage,
  })
  
  data.value = newData.value , 
  error.value = newError.value , 
  pending.value = newPending.value 
  
})

const setPage = (pageLink: number) => {
  console.log(pageLink)
  page.value = pageLink
}

// const  products = ref(data.data)

const testShop = {
  name: "Samsung X24",
  thumbnail:
    "https://images.samsung.com/th/smartphones/galaxy-s23/buy/product_color_green_plus.png",
}
</script>

<template>
  <div>
    <h1 class="text-2xl">Shop</h1>

    <div>
      {{ data.meta.pagination.total }} items matched

      <div>
        <template v-for="index in data.meta.pagination.pageCount" :key="index">
          <button
            class="rounded rounded-ml bg-blue-300 p-3 m-3 cursor-pointer"
            @click="setPage(index)"
          >
            {{ index }}
          </button>
        </template>
      </div>
    </div>

    <!-- <ShopItemCard :product="testShop" /> -->

    <template v-if="data.data.length > 0">
      <template v-for="(product, index) in data.data" :key="index">
        <ShopItemCard :product="product.attributes" />
        <!-- <div>
          {{ product }}
        </div> -->
      </template>
    </template>

    <template v-else>
      <h1>Nothing here?</h1>
    </template>

    <hr />
    product:
    {{ data }}
    <hr />
    error:
    {{ error }}
    <hr />
    pending:
    {{ pending }}
  </div>
</template>

<style scoped></style>
