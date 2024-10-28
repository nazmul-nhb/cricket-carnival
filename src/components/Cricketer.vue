<template>
  <div
    class="border rounded-lg shadow-md shadow-gray-600 p-6 flex flex-col gap-4"
  >
    <h2 class="text-lg font-bold flex items-center gap-1">
      <FaUser /> {{ name }}
    </h2>
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div class="flex items-center gap-2">
        <img class="w-8" :src="logo" alt="Board Logo" />
        <h3 class="text-gray-600">{{ country }}</h3>
      </div>
      <h4 class="text-gray-700">{{ type }}</h4>
    </div>
    <h3 class="font-semibold !mt-8 flex items-center gap-1">
      <FaRankingStar /> Rating: {{ rating }}
    </h3>
    <div class="flex items-center justify-between gap-4 flex-wrap flex-1">
      <h4 class="flex items-center gap-1"><TbCricket />{{ battingStyle }}</h4>
      <h4 class="flex items-center gap-1">
        <BiCricketBall /> {{ bowlingStyle }}
      </h4>
    </div>
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <h4 class="flex items-center gap-1"><GiPriceTag /> ${{ price }}</h4>
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

<script lang="ts">
import type { ICricketer } from '@/types/interface';
import { logos } from '@/utilities/cricketers';
import { defineComponent, ref, type PropType } from 'vue';
import { BiCricketBall } from 'vue3-icons/bi';
import { TbCricket } from 'vue3-icons/tb';
import { GiPriceTag } from 'vue3-icons/gi';
import { FaRankingStar, FaUser } from 'vue3-icons/fa6';
import { toast } from 'vue3-toastify';
import { saveItemToStorage } from '@/utilities/localStorage';

export default defineComponent({
  props: {
    cricketer: {
      type: Object as () => ICricketer,
      required: true,
    },
    coins: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  components: {
    BiCricketBall,
    TbCricket,
    GiPriceTag,
    FaRankingStar,
    FaUser,
  },
  emits: ['update-coins'],
  setup(props, { emit }) {
    const {
      id,
      name,
      country,
      type,
      rating,
      battingStyle,
      bowlingStyle,
      price,
    } = props.cricketer;

    const logo = logos[country];

    const hover = ref(false);
    const pressed = ref(false);

    const choosePlayer = () => {
      if (props.coins >= price) {
        const result = saveItemToStorage('selected', id);

        if (!result.success) {
          return toast.warn(
            `${name.split(' ')[1] || name} is already in your team!`,
          );
        }
        emit('update-coins', price, false);
        toast.success(`You have selected ${name.split(' ')[1] || name}!`);
      } else {
        toast.error(`Insufficient Balance!`);
      }
    };

    return {
      name,
      country,
      type,
      rating,
      battingStyle,
      bowlingStyle,
      price,
      logo,
      hover,
      pressed,
      choosePlayer,
    };
  },
});
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
