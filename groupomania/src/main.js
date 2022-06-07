import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import store: allow access the data/state inside in a component
import store from './store';
require('@/store/member_config')
// Configure user re-authentication > use token saved locally
// -> Dispatch 'configAuth' action
store.dispatch('auth/configAuth', localStorage.getItem('token'))

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas);


createApp(App).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
