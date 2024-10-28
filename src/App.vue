<script setup lang="ts">
import Banner from './components/Banner.vue';
import Cricketers from './components/Cricketers.vue';
import Navbar from './components/Navbar.vue';
import { toast } from 'vue3-toastify';
import { ref } from 'vue';
const coins = ref(0);

// Function to handle coin updates
const updateCoins = (amount: number, add: boolean) => {
  if (add) {
    if (coins.value >= 5000000) {
      return toast.warn('Reached maximum coin limit!');
    }
    coins.value += amount;
    toast.success(`You have claimed ${amount} coins!`);
  } else {
    if (coins.value < amount) {
      return toast.warn('Not enough coins!');
    }
    coins.value -= amount;
  }
};
</script>

<template>
  <header>
    <Navbar :coins="coins" />
  </header>

  <main class="min-h-[calc(100vh-80px)] mx-6">
    <Banner @update-coins="updateCoins" />
    <Cricketers :coins="coins" @update-coins="updateCoins" />
  </main>
</template>
