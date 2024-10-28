import './assets/main.css';
import 'vue3-toastify/dist/index.css';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import { createApp } from 'vue';
import App from './App.vue';

const toastOptions: ToastContainerOptions = {
  autoClose: 2500,
  closeButton: false,
  closeOnClick: true,
  hideProgressBar: false,
  transition: 'bounce',
  position: 'top-center',
  theme: 'dark',
};

createApp(App).use(Vue3Toastify, toastOptions).mount('#app');
