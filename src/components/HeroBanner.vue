<template>
  <div class="bg-blue-600 text-white text-center p-6">
    <h2 class="text-3xl font-bold">Create Your Dream Team</h2>
    <p class="mt-2">Use coins to select the best players</p>
    <button @click="addCoins" class="mt-4 px-4 py-2 bg-green-500 hover:bg-green-700 rounded">
      Add Coins
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['update-coins'],
  methods: {
    addCoins() {
      this.$emit('update-coins', 100);
    }
  }
});
</script>
