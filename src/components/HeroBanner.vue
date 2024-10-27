<template>
  <section class="container mx-auto mb-8 mt-28 bg-black/90 rounded-xl">
    <div
      class="bg-shadowBG bg-center bg-cover text-white rounded-xl text-center p-6 py-12 space-y-6"
    >
      <figure class="w-full mx-auto flex items-center justify-center">
        <img class="w-48" :src="cricket" alt="Cricket Banner Logo" />
      </figure>
      <h2 class="text-3xl lg:text-4xl font-bold">
        Assemble Your Ultimate Dream 11 Cricket Team
      </h2>
      <p class="mt-2 text-gray-300 ">Beyond Boundaries Beyond Limits</p>
      <button
        @click="addCoins"
        class="p-2 bg-transparent rounded-2xl border border-yellow-600 text-lg font-semibold"
      >
        <span
          class="block bg-yellow-600 border border-yellow-600 rounded-xl px-4 py-2 hover:text-yellow-600 hover:bg-transparent hover:scale-105 transition-all duration-500"
          >Claim Free Credit</span
        >
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import cricket from '../assets/images/cricket.svg';

export default defineComponent({
  data() {
    return { cricket };
  },
  emits: ['update-coins'],
  methods: {
    addCoins() {
      this.$emit('update-coins', 100000);
    },
  },
});
</script>
