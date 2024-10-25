<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-white text-xl font-bold">Cricket Mania</h1>
      <div class="text-white">
        Coins: <span>{{ coins }}</span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  props: {
    coins: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
});
</script>
