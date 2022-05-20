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
    
    // = allow to read information from state
    getters: {
        // Create getters to check authentication
        // 2 indispensable elements: token + user
        isAuthenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        },
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
        async configAuth({ commit, state }, token) {
            //console.log(token); test
            if (token) {
            commit('config_Token', token)
            }
            if (!state.token) { //add state
                return
            }
            // 3- before request to next path: handle Authorization headers via 'member_config'

            // 4- send a request to path: '/users/myaccount' with Bearer
            try {
                const response = await axios.get("http://localhost:8080/api/users/myaccount")
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