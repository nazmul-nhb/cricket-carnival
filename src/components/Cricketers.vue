<template>
  <section class="container mx-auto my-16 min-h-[50vh]">
    <div class="flex justify-end gap-4 mb-4 sticky top-24 z-30">
      <button
        class="toggle-button disabled:cursor-not-allowed"
        :disabled="!selectedView"
        :class="{ 'bg-orange-300': !selectedView, 'bg-white': selectedView }"
        @click="toggleView(false)"
      >
        Available
      </button>
      <button
        class="toggle-button disabled:cursor-not-allowed"
        :disabled="selectedView"
        :class="{ 'bg-orange-300': selectedView, 'bg-white': !selectedView }"
        @click="toggleView(true)"
      >
        Selected ({{ selectedCount }})
      </button>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center my-8">
      <div
        class="animate-spin w-16 h-16 border-8 border-t-orange-500 rounded-full"
      ></div>
    </div>

    <!-- Available Players -->
    <section v-if="!loading && !selectedView">
      <h3 class="text-xl font-semibold">
        Available Players ({{ filteredCricketers.length }})
      </h3>
      <div
        class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 lg:gap-4 my-6 pb-6 border-b border-gray-300 text-sm"
      >
        <!-- Filter by Country -->
        <div class="flex items-center gap-4">
          <label class="text:base lg:text-lg font-semibold" for="countries"
            >Filter by Country</label
          >
          <select
            id="countries"
            name="countries"
            @change="
              e => {
                const target = e.target as HTMLSelectElement;
                setCountry(target.value);
              }
            "
            class="bg-gray-100 shadow-md shadow-gray-600 outline-none focus:shadow-sm focus:shadow-gray-500 focus:bg-gray-200 focus:translate-y-1 px-3 py-1.5 rounded-lg transition-all duration-200"
          >
            <option value="">All Countries</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Australia">Australia</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="England">England</option>
            <option value="India">India</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Pakistan">Pakistan</option>
            <option value="South Africa">South Africa</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="West Indies">West Indies</option>
          </select>
        </div>

        <!-- Filter by Type -->
        <div class="flex items-center gap-4">
          <label class="text:base lg:text-lg font-semibold" for="types"
            >Filter by Type</label
          >
          <select
            id="types"
            name="types"
            @change="
              e => {
                const target = e.target as HTMLSelectElement;
                setType(target.value);
              }
            "
            class="border bg-gray-100 shadow-md shadow-gray-600 outline-none focus:shadow-sm focus:shadow-gray-500 focus:bg-gray-200 focus:translate-y-1 px-3 py-1.5 rounded-lg transition-all duration-200"
          >
            <option value="">All Types</option>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-Rounder">All-Rounder</option>
            <option value="Wicket-Keeper">Wicket-Keeper</option>
          </select>
        </div>

        <!-- Sort Cricketers -->
        <div class="flex items-center gap-4">
          <label class="text:base lg:text-lg font-semibold" for="sort"
            >Sort By</label
          >
          <select
            id="sort"
            name="sort"
            @change="
              e => {
                {
                  const target = e.target as HTMLSelectElement;
                  setSortBy(target.value);
                }
              }
            "
            class="border bg-gray-100 shadow-md shadow-gray-600 outline-none focus:shadow-sm focus:shadow-gray-500 focus:bg-gray-200 focus:translate-y-1 px-3 py-1.5 rounded-lg transition-all duration-200"
          >
            <option value="">None</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>
        </div>
      </div>

      <!-- Show No Cricketer -->
      <div
        v-if="!filteredCricketers.length"
        class="mb-6 mt-12 flex flex-col items-center justify-center"
      >
        <div class="relative w-20 h-20 mb-4">
          <div
            class="absolute inset-0 rounded-full border-8 border-red-200 border-t-red-600 animate-spin"
          ></div>
          <span
            class="absolute inset-0 text-5xl font-black text-red-600 flex items-center justify-center animate-pulse"
          >
            !
          </span>
        </div>

        <h3
          class="text-2xl lg:text-3xl font-bold text-red-700 mb-2 animate-pulse"
        >
          No Cricketer Found!
        </h3>
        <p class="text-lg text-red-400 mb-6">
          Please, Filter by Other Options!
        </p>
      </div>

      <!-- Show the Cricketers Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Cricketer
          v-for="cricketer in filteredCricketers"
          :key="cricketer.id"
          :cricketer="cricketer"
          @player-selected="handlePlayerSelection"
        />
      </div>
    </section>

    <!-- Selected Players -->
    <section v-if="!loading && selectedView" class="space-y-4">
      <h3 class="text-xl font-semibold">
        Selected Players ({{ selectedCount }})
      </h3>
      <Selected
        :selectedIds="storedIds"
        @remove-selected="removeSelectedPlayer"
        @add-more="toggleView"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { computed, onMounted, ref } from 'vue';
import { cricketers } from '@/utilities/cricketers';
import Cricketer from './Cricketer.vue';
import Selected from './Selected.vue';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '@/utilities/localStorage';

const { coins } = defineProps<{ coins: number }>();

const emit = defineEmits(['update-coins']);

// Reactive States
const storedIds = ref(getFromLocalStorage('selected-cricketers'));
const selectedCountry = ref<string>('');
const selectedType = ref<string>('');
const sortBy = ref<string>('');
const selectedView = ref<boolean>(false);
const loading = ref(true);

// Set loading to false after component is mounted
onMounted(() => {
  loading.value = false;
});

const toggleView = (view: boolean) => {
  loading.value = true;
  selectedView.value = view;

  setTimeout(() => {
    loading.value = false;
  }, 500);
};

const setCountry = (country: string) => {
  selectedCountry.value = country;
};

const setType = (type: string) => {
  selectedType.value = type;
};

const setSortBy = (sortOption: string) => {
  sortBy.value = sortOption;
};

const filteredCricketers = computed(() => {
  let result = cricketers;

  // Filter by country
  if (selectedCountry.value) {
    result = result.filter(cric => cric.country === selectedCountry.value);
  }

  // Filter by type
  if (selectedType.value) {
    result = result.filter(cric => cric.type === selectedType.value);
  }

  // Sort by price or rating based on selection
  if (sortBy.value) {
    // Copy the original array
    result = [...result];

    // Sort based on options
    if (sortBy.value === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy.value === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy.value === 'rating-asc') {
      result.sort((a, b) => a.rating - b.rating);
    } else if (sortBy.value === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }
  }

  return result;
});

const selectedCount = computed(() => storedIds.value.length);

// Add Players to the Selected list
const handlePlayerSelection = (id: string, price: number, name: string) => {
  if (coins >= price) {
    const result = saveToLocalStorage('selected-cricketers', id);

    if (!result.success) {
      if (result.isExist) {
        return toast.warn(`${name} is already in your team!`);
      }
      return toast.error(`Already 11 players in your team!`);
    }

    emit('update-coins', price, false);
    toast.success(`You have selected ${name}!`);

    storedIds.value.push({ id, selectedAt: new Date() });
  } else {
    toast.error(`Insufficient Balance!`);
  }
};

// Remove Players from the Selected list
const removeSelectedPlayer = (id: string, name: string) => {
  const result = removeFromLocalStorage('selected-cricketers', id);

  if (!result.success) {
    return toast.error('Something Went Wrong!');
  }

  toast.success(`${name} is Removed!`);

  storedIds.value = getFromLocalStorage('selected-cricketers');
};
</script>

<style scoped>
.toggle-button {
  @apply font-semibold rounded-lg border border-orange-700/20 shadow-md shadow-orange-700 px-3 py-1.5 transition-all duration-300 ease-in-out;
}

.toggle-button:hover {
  @apply bg-orange-200 -translate-y-1; /* Lift the button slightly */
}

.toggle-button:focus {
  @apply shadow-md shadow-orange-600;
}

/* Add the click effect */
.toggle-button:active {
  @apply bg-orange-300 transform translate-y-1 shadow-sm shadow-orange-700; /* Move down when pressed */
}
</style>
