<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="cricketer in storedCricketers"
      class="border shadow-md shadow-gray-500 rounded-lg p-4 bg-gray-100 hover:bg-gray-200 hover:-translate-y-1 transition-all duration-500"
    >
      <div class="flex items-center justify-between flex-wrap">
        <figure class="flex gap-3 items-center">
          <img
            :src="cricketer.image"
            :alt="cricketer.name"
            class="w-32 rounded-md hover:scale-110 transition-all duration-500"
          />
          <div class="flex flex-col gap-1 justify-around flex-wrap">
            <h3 class="font-semibold text:lg sm:text-xl">
              {{ cricketer.name }}
            </h3>
            <h6 class="text-sm text-gray-600">
              {{ cricketer.type }}
            </h6>
            <h3
              class="text-gray-900 text-xs flex items-center gap-0.5"
            >
              <LuHistory /> {{ formatDateTime(cricketer.selectedAt) }}
            </h3>
          </div>
        </figure>
        <HiOutlineTrash
          class="text-red-800 font-bold text-3xl cursor-pointer hover:scale-110 transition-all duration-500"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { IStoredCricketer, IStoredId } from '@/types/interface';
import { HiOutlineTrash } from 'vue3-icons/hi2';
import { LuHistory } from 'vue3-icons/lu';
import { defineComponent } from 'vue';
import { cricketers } from '@/utilities/cricketers';
import { formatDateTime } from '@/utilities/formatDate';

export default defineComponent({
  components: { HiOutlineTrash, LuHistory },
  props: {
    selectedIds: {
      type: Array as () => IStoredId[],
      required: true,
    },
  },
  setup(props) {
    const { selectedIds } = props;

    const storedCricketers: IStoredCricketer[] = selectedIds.flatMap(stored => {
      const matchedCric = cricketers.find(cric => cric.id === stored.id);
      return matchedCric
        ? [{ ...matchedCric, selectedAt: stored.selectedAt }]
        : [];
    });

    return { storedCricketers, formatDateTime };
  },
});
</script>
