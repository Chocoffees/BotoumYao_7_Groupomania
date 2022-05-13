// NOT USED at this step

// Handle centralized data to share it in whole app 
// Create a store > define shared state

import { createStore } from 'vuex'


const store = createStore({
    // Store user + token for authentication
    state: { // state = objects, strings for example 
        user: null,
        token: null,
    },

    getters: { // = get pieces of the state or computed values from state

    },

    mutations: {  // = mutate the state: update data
        config_User(state, user) {
            state.user = user;
        },
        config_Token(state, token) {
            state.token = token;
        },
    },

    actions: { // = called to commit a mutation
        
    },
    
    modules: { // = allow to divide the store into various modules
        
    }
})

// export the store
export default store;