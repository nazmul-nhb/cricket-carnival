<template>
  <section>Selected Players</section>
</template>

<script lang="ts">
import type { IStoredCricketer, IStoredId } from '@/types/interface';
import { cricketers } from '@/utilities/cricketers';
import { defineComponent } from 'vue';

export default defineComponent({
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

    console.log(storedCricketers);
  },
});
</script>
