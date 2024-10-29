<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import Navbar from './components/Navbar.vue';
import Banner from './components/Banner.vue';
import Cricketers from './components/Cricketers.vue';
import Footer from './components/Footer.vue';
import {
  addCoinsToLocalStorage,
  getCoinsFromLocalStorage,
} from './utilities/localStorage';

const coins = ref(getCoinsFromLocalStorage());

// Function to handle coin updates
const updateCoins = (amount: number, add: boolean) => {
  if (add) {
    if (coins.value >= 5000000) {
      return toast.warn('Reached maximum coin limit!');
    }
    coins.value += amount;
    toast.success(`You have claimed ${amount} coins!`);
    addCoinsToLocalStorage(coins.value);
  } else {
    if (coins.value < amount) {
      return toast.warn('Not enough coins!');
    }
    coins.value -= amount;
    addCoinsToLocalStorage(coins.value);
  }
};
</script>

<template>
  <!-- Navbar -->
  <header>
    <Navbar :coins="coins" />
  </header>

  <!-- Main Contents -->
  <main class="min-h-[calc(100vh-80px)] mx-6 md:mx-18 lg:mx-12 xl:mx-16">
    <Banner @update-coins="updateCoins" />
    <Cricketers :coins="coins" @update-coins="updateCoins" />
    <a class="add-coins inline-block sticky bottom-4 z-30" href="#add-coins"
      >Claim More Coins</a
    >
  </main>
  
  <!-- Footer -->
  <Footer />
</template>

<style scoped>
.add-coins {
  @apply bg-white text-orange-700 border border-orange-700/20 font-semibold rounded-lg shadow-md shadow-orange-700 px-3 py-1.5 transition-all duration-300 ease-in-out;
}

.add-coins:hover {
  @apply bg-orange-500 text-white -translate-y-1; /* Lift the button slightly */
}

.add-coins:focus {
  @apply shadow-md bg-orange-600 text-white shadow-orange-600;
}

/* Add the click effect */
.add-coins:active {
  @apply bg-orange-700 text-white transform translate-y-1 shadow-md shadow-orange-700/75; /* Move down when pressed */
}
</style>
