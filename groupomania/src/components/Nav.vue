<!-- Create component 'Nav' -->

<template>
  
  <template v-if="isAuthenticated">
  <nav class="nav">
    <input type="checkbox" id="nav-check" />
    <div class="nav-header">
        <a href="www.groupomania.com">
          <img src="../assets/logo_de_groupomania.png" alt="Logo de Groupomania"/>
        </a>
    </div>
    <div class="nav-links">
      <ul>
        <li><router-link :to="{ name: 'ListOfPosts' }"><font-awesome-icon class="nav-links-icon" :icon="['fas', 'house-chimney']" />Accueil</router-link></li>
        <li v-if="user.user.admin == true"><router-link :to="{ name: 'AdminPage' }">Administration</router-link></li>
        <li v-if="user.user.admin == false"><router-link :to="{ name: 'AccountUser', params:{ id: user.user.id } }">Mon compte <font-awesome-icon class="user-icon" :icon="['fas', 'user']" /> {{ user.user.username }}</router-link></li>
        <li v-if="user.user.admin == true"><router-link :to="{ name: 'AccountUser', params:{ id: user.user.id } }">Mon compte <font-awesome-icon class="user-icon" :icon="['fas', 'user-gear']" /> {{ user.user.username }}</router-link></li>
        <li><router-link :to="{ name: 'app-assistance' }"><font-awesome-icon class="nav-links-icon" :icon="['fas', 'headset']" />Assistance</router-link></li>
        <button @click="logOut" class="logout-btn"><font-awesome-icon class="logout-icon" :icon="['fas', 'right-from-bracket']" /></button>
      </ul>
    </div>
    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  </nav>
</template>

<template v-else>
  <nav class="nav">
    <input type="checkbox" id="nav-check" />
    <div class="nav-header">
      <a href="www.groupomania.com">
        <img src="../assets/logo_de_groupomania.png" alt="Logo de Groupomania"/>
      </a>
    </div>
    <div class="nav-links">
      <ul>
        <li><router-link :to="{ name: 'sign-up' }">Créer un compte</router-link></li>
        <li><router-link :to="{ name: 'log-in' }">Se connecter</router-link></li>
        <li><router-link :to="{ name: 'app-assistance' }"><font-awesome-icon class="nav-links-icon" :icon="['fas', 'headset']" />Assistance</router-link></li>
        <button class="logout-btn"><font-awesome-icon class="logout-icon" :icon="['fas', 'right-from-bracket']" /></button>
      </ul>
    </div>
    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  </nav>
</template>
</template>


<script>
//import { computed } from '@vue/runtime-core';

// Getters from auth module
import { mapGetters } from 'vuex';

export default {
    name: "app-nav",
    
    computed: {
      ...mapGetters({
        isAuthenticated: 'auth/isAuthenticated',
        user: 'auth/user',
      }),
    },

    methods: {
    // ---------- Logout user: call function 'logOut()' and redirection to login page ----------
      logOut() {
        let action = confirm("ℹ️ Cher Membre, vous allez être déconnecté. Continuer ?");
        if (action == true) {
          localStorage.removeItem('token');
          this.$router.push('/users/login');
          console.log("User now logged out")
          window.location.reload()
          document.location = '/users/login'
        }
      },
    },
};
</script>

<style>
</style>