<template>
  <!-- Show No Selected Cricketer -->
  <div v-if="!storedCricketers.length">
    <Error
      heading="You Haven't Selected Any Player Yet!"
      subHeading="Please, Select Some Players!"
    />
  </div>
  <!-- Grid to Show Selected Cricketers -->
  <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="cricketer in storedCricketers"
      class="border shadow-md shadow-gray-500 rounded-lg p-4 bg-gray-100 hover:bg-gray-200 hover:-translate-y-1 transition-all duration-500 relative"
    >
      <figure class="flex gap-3 items-center">
        <!-- Image -->
        <img
          :src="cricketer.image"
          :alt="cricketer.name"
          class="w-32 rounded-md hover:scale-110 transition-all duration-500"
        />
        <div class="flex flex-col gap-1 justify-around flex-wrap">
          <!-- Name -->
          <h3 class="font-semibold text:lg sm:text-xl">
            {{ cricketer.name }}
          </h3>
          <!-- Type -->
          <h6 class="text-sm text-gray-600">
            {{ cricketer.type }}
          </h6>
          <!-- Selection Time -->
          <h3 class="text-gray-900 text-xs flex items-center gap-0.5">
            <LuHistory /> {{ formatDateTime(cricketer.selectedAt) }}
          </h3>
        </div>
      </figure>
      <!-- Remove/Delete Button -->
      <HiOutlineTrash
        size="36"
        @click="handleRemoveSelected(cricketer.id, cricketer.name)"
        class="text-red-800 cursor-pointer hover:scale-110 transition-all duration-500 absolute -top-4 -right-4 active:translate-y-1 focus:-translate-y-1"
      />
    </div>
  </div>
  <hr class="" />
  <button class="more-button" @click="addMorePlayers">Add More Players</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { LuHistory } from 'vue3-icons/lu';
import { HiOutlineTrash } from 'vue3-icons/hi2';
import { cricketers } from '@/utilities/cricketers';
import { formatDateTime } from '@/utilities/formatDate';
import type { IStoredCricketer, IStoredId } from '@/types/interface';
import { Confirm } from 'notiflix';
import Error from './Error.vue';

const { selectedIds } = defineProps<{ selectedIds: IStoredId[] }>();

const emit = defineEmits(['remove-selected', 'add-more']);

const storedCricketers = computed((): IStoredCricketer[] => {
  return selectedIds.flatMap(stored => {
    const matchedCric = cricketers.find(cric => cric.id === stored.id);
    return matchedCric
      ? [{ ...matchedCric, selectedAt: stored.selectedAt }]
      : [];
  });
});

const handleRemoveSelected = (id: string, name: string) => {
  Confirm.show(
    'Remove Player?',
    `Remove ${name} from your team?`,
    'Yes',
    'No',
    () => {
      emit('remove-selected', id, name);
    },
  );
};

const addMorePlayers = () => {
  emit('add-more', false);
};
</script>

<style scoped>
.more-button {
  @apply text-lg text-orange-700 border border-orange-700/20 font-semibold rounded-lg shadow-md shadow-orange-700 px-3 py-1.5 transition-all duration-300 ease-in-out;
}

.more-button:hover {
  @apply bg-orange-500 text-white -translate-y-1; /* Lift the button slightly */
}

.more-button:focus {
  @apply shadow-md bg-orange-600 text-white shadow-orange-600;
}

/* Add the click effect */
.more-button:active {
  @apply bg-orange-700 text-white transform translate-y-1 shadow-md shadow-orange-700/75; /* Move down when pressed */
}
</style>
