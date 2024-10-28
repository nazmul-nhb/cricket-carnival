<template>
  <!-- <h3>Total {{ cricketers.length }}</h3>
  <h3 v-if="selectedCountry !== ''" >{{selectedCountry}} {{ countrySpecific.length }}</h3> -->
  <section class="container mx-auto my-16">
    <div>
      <h3 class="text-xl font-semibold">Available Players</h3>
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 my-6 pb-5 border-b border-gray-300 text-sm">
        <!-- Filter by Country -->
        <div class="flex items-center gap-4">
          <label class="text-lg font-semibold" for="countries"
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
            class="border bg-gray-100 shadow-md shadow-gray-600 outline-none focus:shadow-sm focus:shadow-gray-500 focus:bg-gray-200 focus:translate-y-1 px-3 py-1.5 rounded-lg transition-all duration-200"
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
          <label class="text-lg font-semibold" for="types"
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
          <label class="text-lg font-semibold" for="sort">Sort By</label>
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
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Cricketer
          v-for="cricketer in filteredCricketers"
          :key="cricketer.id"
          :coins="coins"
          :cricketer="cricketer"
          @update-coins="$emit('update-coins', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, type PropType } from 'vue';
import { cricketers } from '@/utilities/cricketers';
import Cricketer from './Cricketer.vue';

const selectedCountry = ref<string>('');
const selectedType = ref<string>('');
const sortBy = ref<string>('');

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

  // Sort by price or rating based on sortBy selection
  if (sortBy.value) {
    result = [...result];
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

export default defineComponent({
  data() {
    return {
      cricketers,
      filteredCricketers,
      selectedCountry,
      selectedType,
      sortBy,
      setCountry,
      setType,
      setSortBy,
    };
  },
  props: {
    coins: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  components: {
    Cricketer,
  },
});
</script>
