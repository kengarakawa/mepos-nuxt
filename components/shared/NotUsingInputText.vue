<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    validator: (value: string) => ["text", "password"].includes(value),
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  icon : {
    type:String , 
    default:null 
  }
})

const onSubmit = () => {
  console.log("just click")
}
</script>

<template>
  <div class="relative text-gray-600 focus-within:text-gray-400">
    <label class="relative block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">      
      <template v-if="props.icon === 'search'">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-6 h-6"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        </span>
      </template>
      <input
        :type="props.type"
        name="identifier"
        :placeholder="props.placeholder"
        class="text-md px-2 py-1  rounded-md placeholder:italic focus:outline-none focus:border-sky-500 text-gray-800"
        :class="{
          'pl-10' : props.icon !== null ,
          'pl-3' : props.icon === null , 
        }"
      />
    </label>
  </div>

  <!-- <div class="relative text-gray-600 focus-within:text-gray-400">
    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
      <button
        @click.stop="onSubmit"
        class="p-1 focus:outline-none focus:shadow-outline"
      >
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-6 h-6"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </span>
    <input
      type="text"
      name="q"
      class="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
      placeholder="Search..."
      autocomplete="off"
    />
  </div> -->
</template>
