import './assets/main.css';
import { createApp } from 'vue';
import 'vue3-toastify/dist/index.css';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import Notiflix from 'notiflix';
import App from './App.vue';

Notiflix.Confirm.init({
  titleFontSize: '20px',
  titleColor: 'orange',
  okButtonBackground: 'green',
  cancelButtonBackground: 'red',
});

const toastOptions: ToastContainerOptions = {
  autoClose: 2500,
  closeButton: false,
  closeOnClick: true,
  hideProgressBar: true,
  transition: 'bounce',
  position: 'top-center',
  theme: 'dark',
};

createApp(App).use(Vue3Toastify, toastOptions).mount('#app');
