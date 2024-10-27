<script setup lang="ts">
import Banner from './components/Banner.vue';
import Cricketers from './components/Cricketers.vue';
import Navbar from './components/Navbar.vue';
import { ref } from 'vue';
const coins = ref(0);

// Function to handle coin updates
const updateCoins = (amount: number) => {
  coins.value += amount;
};
</script>

<template>
  <header>
    <Navbar :coins="coins" />
  </header>

  <main class="min-h-[calc(100vh-80px)] mx-6">
    <Banner @update-coins="updateCoins" />
    <Cricketers/>
  </main>
</template>
