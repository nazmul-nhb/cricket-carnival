<template>
  <div
    class="border rounded-lg shadow-md shadow-gray-600 p-6 flex flex-col gap-3 hover:scale-105 hover:bg-gray-200/70 transition-all duration-500"
  >
    <!-- Image and Name -->
    <figure>
      <img class="rounded-lg" :src="image" :alt="name" />
    </figure>
    <h2 class="text-lg font-bold flex items-center gap-1">
      <FaUser /> {{ name }}
    </h2>

    <!-- Country and Type -->
    <div class="flex items-center justify-between gap-4 flex-wrap font-semibold">
      <div class="flex items-center gap-2">
        <img class="w-8" :src="logo" alt="Board Logo" />
        <h3 class="text-gray-600">{{ country }}</h3>
      </div>
      <h4 class="text-gray-700">{{ type }}</h4>
    </div>

    <!-- Rating -->
    <h3 class="font-semibold !mt-3 flex items-center gap-1">
      <FaRankingStar /> Rating: {{ rating }}
    </h3>

    <!-- Batting and/or Bowling Styles -->
    <div class="flex items-center justify-between gap-4 flex-wrap flex-1 font-semibold">
      <h4 class="flex items-center gap-1"><MdSportsCricket class="text-green-900" />{{ battingStyle }}</h4>
      <h4 class="flex items-center gap-1">
        <BiSolidCricketBall class="text-red-900" /> {{ bowlingStyle }}
      </h4>
    </div>

    <!-- Price & Button to Select Player -->
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <h4 class="flex items-center gap-1 font-semibold">
        <FaCoins />{{ price }}
      </h4>
      <button
        class="choose-button"
        :aria-pressed="pressed"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        @mousedown="pressed = true"
        @mouseup="pressed = false"
        @click="choosePlayer"
      >
        Choose Player
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ICricketer } from '@/types/interface';
import { logos } from '@/utilities/cricketers';
import { BiSolidCricketBall } from 'vue3-icons/bi';
import { MdSportsCricket } from 'vue3-icons/md';
import { FaRankingStar, FaUser, FaCoins } from 'vue3-icons/fa6';

const { cricketer } = defineProps<{ cricketer: ICricketer }>();

const {
  id,
  name,
  image,
  country,
  type,
  rating,
  battingStyle,
  bowlingStyle,
  price,
} = cricketer;

const emit = defineEmits(['player-selected']);

const logo = logos[country];

const lastName = name.split(' ')[1] || name;

const hover = ref(false);
const pressed = ref(false);

const choosePlayer = () => {
  emit('player-selected', id, price, lastName);
};
</script>

<style scoped>
.choose-button {
  @apply font-semibold border rounded-lg shadow-md shadow-gray-700 px-3 py-1.5 transition-all duration-300 ease-in-out;
}

.choose-button:hover {
  @apply bg-gray-200 -translate-y-1; /* Lift the button slightly */
}

.choose-button:focus {
  @apply border shadow-md shadow-gray-600;
}

/* Add the click effect */
.choose-button:active {
  @apply transform translate-y-1 border shadow-sm shadow-gray-400; /* Move down when pressed */
}
</style>
