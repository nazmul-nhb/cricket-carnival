<template>
  <section class="container mx-auto my-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Cricketer
      v-for="cricketer in cricketers"
      :key="cricketer.id"
      :cricketer="cricketer"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { cricketers } from '@/utilities/cricketers';
import Cricketer from './Cricketer.vue';

export default defineComponent({
  data() {
    return { cricketers };
  },
  components: {
    Cricketer,
  },
});
</script>
