// NOT USED at this step

// Configure an auth module for authentication

export default {
    // Store token and user data
    state: {
        user: null,
        token: null,
    },

    // = mutate the state: update data
    mutations: {
        config_User(state, user) {
            state.user = user;
        },
        config_Token(state, token) {
            state.token = token;
        },
    },
    
    // = called to commit a mutation
    actions: {
    
    },
}