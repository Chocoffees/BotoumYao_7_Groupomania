<!-- Create component 'Nav' -->

<template>
  
  <template v-if="isAuthenticated">
  <nav class="nav">
    <input type="checkbox" id="nav-check" />
    <div class="nav-header">
        <img src="../assets/logo_de_groupomania.png" alt="Logo de Groupomania"/>
    </div>
    <div class="nav-links">
      <ul>
        <li class="user_connected">👤{{ user.user.username }}</li>
        <li><router-link :to="{ name: 'HomePage' }">Accueil</router-link></li>
        <li><a href="#" target="_blank">Assistance</a></li>
        <li><a href="#" target="_blank">Déconnexion</a></li>
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
        <img src="../assets/logo_de_groupomania.png" alt="Logo de Groupomania"/>
    </div>
    <div class="nav-links">
      <ul>
        <li><router-link :to="{ name: 'HomePage' }">Accueil</router-link></li>
        <li><router-link :to="{ name: 'sign-up' }">Créer un compte</router-link></li>
        <li><router-link :to="{ name: 'log-in' }">Se connecter</router-link></li>
        <li><a href="#" target="_blank">Assistance</a></li>
        <li><a href="#" target="_blank">Déconnexion</a></li>
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
      })
    },
}
</script>


<style>
</style>