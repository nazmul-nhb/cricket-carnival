<script setup lang="ts">
import Banner from './components/Banner.vue';
import Cricketers from './components/Cricketers.vue';
import Navbar from './components/Temp.vue';
import { toast } from 'vue3-toastify';
import { ref } from 'vue';
const coins = ref(0);

// Function to handle coin updates
const updateCoins = (amount: number) => {
  if (coins.value >= 5000000) {
    return toast.warn('You have reached Max limit!');
  }

  coins.value += amount;
  toast.info(`${amount} Coins Added!`);
};
</script>

<template>
  <header>
    <Navbar :coins="coins" />
  </header>

  <main class="min-h-[calc(100vh-80px)] mx-6">
    <Banner @update-coins="updateCoins" />
    <Cricketers />
  </main>
</template>
