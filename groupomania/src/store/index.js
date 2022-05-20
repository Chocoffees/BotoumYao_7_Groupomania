// Handle centralized data to share it in whole app 
// Create a store > define shared state

import { createStore } from 'vuex'
import auth from './auth_module'

const store = createStore({

    state: { // state = objects, strings for example 
        
    },

    getters: { // = get pieces of the state or computed values from state

    },

    mutations: {  // = mutate the state: update data
        
    },

    actions: { // = called to commit a mutation
        
    },
    
    modules: { // = allow to divide the store into various modules
        auth
    }
})

// export the store
export default store;