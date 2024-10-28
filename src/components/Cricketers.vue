<template>
  <!-- <h3>Total {{ cricketers.length }}</h3>
  <h3 v-if="selectedCountry !== ''" >{{selectedCountry}} {{ countrySpecific.length }}</h3> -->
  <section class="container mx-auto my-16">
    <div>
      <h3 class="text-xl font-semibold">Available Players</h3>
      <div class="flex items-center gap-4 my-6">
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
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Cricketer
          v-for="cricketer in countrySpecific"
          :key="cricketer.id"
          :cricketer="cricketer"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { cricketers } from '@/utilities/cricketers';
import Cricketer from './Cricketer.vue';

const selectedCountry = ref<string>('');

const countrySpecific = computed(() => {
  return cricketers.filter(cric => {
    const selected = cric.country === selectedCountry.value;
    if (selectedCountry.value === '') {
      return cricketers;
    }

    return selected;
  });
});

export default defineComponent({
  data() {
    return { cricketers, countrySpecific, selectedCountry };
  },
  methods: {
    setCountry: (country: string) => {
      selectedCountry.value = country;
    },
  },
  components: {
    Cricketer,
  },
});
</script>
