<script setup lang="ts">
import HeroBanner from './components/HeroBanner.vue';
import NavBar from './components/NavBar.vue';
import { ref } from 'vue';
const coins = ref(0);

// Function to handle coin updates
const updateCoins = (amount: number) => {
  coins.value += amount; // Update the coins
};
</script>

<template>
  <header>
    <NavBar :coins="coins" />
  </header>

  <main>
    <HeroBanner  @update-coins="updateCoins" />
  </main>
</template>
