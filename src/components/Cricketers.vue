<template>
  <div>
<Cricketer/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { cricketers, logos } from '@/utilities/cricketers';
import Cricketer from './Cricketer.vue';

// console.log(
//   cricketers.map(cricketer => {
//     return {
//       logo: logos[cricketer.country],
//     };
//   }),
// );

export default defineComponent({
  components: {
    Cricketer
  },
});
</script>
