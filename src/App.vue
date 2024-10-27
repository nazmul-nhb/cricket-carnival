<script setup lang="ts">
import HeroBanner from './components/HeroBanner.vue';
import NavBar from './components/NavBar.vue';
import { ref } from 'vue';
const coins = ref(0);

// Function to handle coin updates
const updateCoins = (amount: number) => {
  coins.value += amount;
};
</script>

<template>
  <header>
    <NavBar :coins="coins" />
  </header>

  <main class="min-h-[calc(100vh-80px)] mx-6">
    <HeroBanner @update-coins="updateCoins" />
  </main>
</template>
