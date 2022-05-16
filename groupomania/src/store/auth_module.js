// Configure an auth module for authentication
// >> store informations available for further resquests

import axios from "axios";

export default {
    namespaced: true,
    // Store token and user data
    state: {
        token: null,
        user: null,
    },

    // = mutate the state: update data
    // > get the current state and data
    mutations: {
        config_Token(state, token) {
            state.token = token;
        },
        config_User(state, data) {
            state.user = data;
        }
    },

    // = called to commit a mutation
    actions: {
        // 1- hit logIn: use dispatch function
        async logIn({ dispatch }, credentials) {
            const response = await axios.post("http://localhost:8080/api/users/login", credentials)
            //console.log(response.data); ok :)
            dispatch('configAuth', response.data.token) // dispatch 'configAuth' action
        },
        // 2- after sucess login > commit a mutation to store the token
        async configAuth({ commit }, token) {
            //console.log(token); test
            commit('config_Token', token)

            // 3 - send a request to path: '/users/myaccount' with 'Authorization' > check validity token
            try {
                const response = await axios.get("http://localhost:8080/api/users/myaccount", {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                // commit user data retrieved from previously request to store
                commit('config_User', response.data)

            } catch (e) {
                // token expiration delay: 1h > if user comes back: possibility expired token > clear info 
                commit('config_Token', null)
                commit('config_User', null)
            }
        }
    }
}

// Ability to authenticate user :)