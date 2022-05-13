import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// import store: allow access the data/state inside in a component
import store from './store';

createApp(App).use(router).use(store).mount('#app')
