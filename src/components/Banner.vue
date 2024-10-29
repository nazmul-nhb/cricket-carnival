<template>
  <!-- Dark BG -->
  <section
    id="add-coins"
    class="container mx-auto mb-8 mt-28 bg-black/90 rounded-xl"
  >
    <!-- Gradient BG from PNG (shadowBG) -->
    <div
      class="bg-shadowBG bg-center bg-cover text-white rounded-xl text-center p-6 py-12 space-y-6"
    >
      <!-- Logo on the Banner -->
      <figure class="w-full mx-auto flex items-center justify-center">
        <img class="w-48" :src="cricket" alt="Cricket Banner Logo" />
      </figure>
      <!-- Banner Heading -->
      <h2 class="text-3xl lg:text-4xl font-bold">
        Assemble Your Ultimate Dream 11 Cricket Team
      </h2>
      <!-- Banner Text -->
      <p class="mt-2 text-gray-300 text-lg">Beyond Boundaries Beyond Limits</p>
      <!-- Button to claim coins -->
      <button @click="addCoins" class="coin-button">Claim Free Credit</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import cricket from '../assets/images/cricket.png';

const emit = defineEmits(['update-coins']);

const addCoins = () => {
  emit('update-coins', 1000000, true);
};
</script>

<style scoped>
.coin-button {
  @apply font-semibold text-xl border border-yellow-500 rounded-lg shadow-md text-black bg-yellow-500 shadow-yellow-500 px-3 py-1.5 transition-all duration-300 ease-in-out;
}

.coin-button:hover {
  @apply bg-transparent text-yellow-500 -translate-y-1; /* Lift the button slightly */
}

.coin-button:focus {
  @apply border shadow-md shadow-yellow-600;
}

/* Add the click effect */
.coin-button:active {
  @apply transform translate-y-1 border shadow-sm shadow-yellow-400; /* Move down when pressed */
}
</style>
