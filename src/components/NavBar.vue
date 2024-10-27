<template>
  <nav class="bg-gray-800/85 h-20 p-4 text-white sticky top-0 z-30 backdrop-blur-sm backdrop-filter">
    <div class="container mx-auto flex justify-between items-center">
      <figure class="flex items-center gap-2">
        <img :src="logo" alt="Cricket Carnival Logo" class="w-14" />
        <h1 class="text-xl font-bold">Cricket Carnival</h1>
      </figure>
      <div class="flex gap-8">
        <div class="hidden lg:flex items-center gap-6">
          <button>Home</button>
          <button>Fixture</button>
          <button>Teams</button>
          <button>Schedule</button>
        </div>
        <div class="flex items-center gap-2">
          <span>Coins: {{ coins }}</span>
          <img :src="coin" alt="Coin" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import logo from '../assets/icons/logo.svg';
import coin from '../assets/icons/coin.svg';

export default defineComponent({
  data() {
    return { logo, coin };
  },
  props: {
    coins: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
});
</script>
