import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// 'VeeValidate': handle inputs form
//import VeeValidate from 'vee-validate';
// 'axios': allow requests
//import axios from 'axios';
// axios config default (set a base URL)
//axios.defaults.baseURL = 'http://localhost:8084/api'
// import store: allow access the data/state inside in a component
import store from './store';

createApp(App).use(router).use(store).mount('#app')
