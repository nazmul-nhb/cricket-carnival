<template>
  <footer
    id="footer"
    class="bg-[#06091a] text-white px-8 md:px-16 mx-auto w-full mt-8 py-6"
  >
    <!-- Logo -->
    <figure class="w-full flex items-center justify-center my-4 mb-6">
      <img
        class="hover:scale-125 transition-all duration-500"
        src="../assets/icons/logo-lg.svg"
        alt="Cricket Carnival Logo"
      />
    </figure>
    <div
      class="flex gap-4 flex-col md:flex-row items-center md:items-start justify-between min-h-40"
    >
      <!-- ABout Us -->
      <div class="md:w-1/3 text-center md:text-left">
        <h3 class="text-xl font-bold mb-2">About Us</h3>
        <p class="text-gray-200">
          Cricket Carnival allows you to form your dream cricket team. Enjoy the
          real cricket.
        </p>
      </div>
      <!-- Quick Links -->
      <div class="text-center">
        <h3 class="text-xl font-bold mb-2">Quick Links</h3>
        <div class="text-sm flex flex-col items-center gap-3">
          <a href="#add-coins" class="links"> Home </a>
          <a href="#add-coins" class="links" rel="noopener noreferrer">
            Services
          </a>
          <a
            href="mailto:cricket@carnival.com"
            class="links"
            rel="noopener noreferrer"
          >
            About
          </a>
          <a
            href="mailto:cricket@carnival.com"
            class="links"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </div>
      </div>

      <!-- Subscribe -->
      <div class="md:w-1/3 text-center md:text-right space-y-2">
        <h3 class="text-xl font-bold">Subscribe</h3>
        <p class="text-gray-200">
          Subscribe to our newsletter for the latest updates.
        </p>

        <form
          class="flex flex-col items-center md:items-end gap-3 text-black"
          @submit.prevent="handleSubscribe"
        >
          <input
            type="email"
            v-model="email"
            id="email"
            placeholder="Enter your email"
            class="border px-3 py-1.5 rounded-lg w-full outline-none shadow-md shadow-gray-500 focus:shadow-md focus:shadow-gray-700 focus:translate-y-1 transition-all duration-500"
          />
          <button
            type="submit"
            class="subscribe-button bg-orange-500 shadow-sm px-3 py-1.5"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
    <hr class="my-4 bg-gray-800" />
    <!-- Copyright section -->
    <div class="w-full text-center text-xs space-y-1">
      <h6>&copy; Copyright {{ currentYear }}</h6>
      <h6>Cricket Carnival, Inc.</h6>
      <h6>All Rights Reserved.</h6>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { ref } from 'vue';

const email = ref('');

// Get the current year for the copyright
const currentYear = new Date().getFullYear();

const handleSubscribe = () => {
  if (email.value.trim()) {
    toast.info(`Subscribed with ${email.value.trim()}`);
    email.value = '';
  } else {
    toast.error('Enter a valid email address!');
  }
};
</script>

<style scoped>
.links {
  @apply hover:text-yellow-300 transition-all duration-500;
}

.subscribe-button {
  @apply font-semibold rounded-lg border border-orange-700/20 shadow-orange-700 transition-all duration-300 ease-in-out;
}

.subscribe-button:hover {
  @apply bg-orange-400 -translate-y-1; /* Lift the button slightly */
}

.subscribe-button:focus {
  @apply shadow-orange-600;
}

/* Add the click effect */
.subscribe-button:active {
  @apply bg-orange-600 transform translate-y-1 shadow-orange-700; /* Move down when pressed */
}
</style>
