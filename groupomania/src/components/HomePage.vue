<!-- Create component 'HomePage' -->

<template>
  <template v-if="isAuthenticated">
    <!-- to check! -->
    <h1>(HomePage User connecté) - Bonjour {{ user.user.username }} 👋</h1>
    <h2>Que fait-on aujourd'hui ?</h2>
    <nav>
      <router-link to="/posts/new">Je partage un contenu</router-link>
    </nav>

    <nav>
      <router-link to="/">J'accède au forum</router-link>
    </nav>
  </template>

  <template v-else>
    <h1>(HomePage) - Bienvenue sur votre réseau 😃</h1>
    <h2>Partagez, exprimez-vous en quelques clics !</h2>

    <nav>
      <router-link to="/users/signup"
        >Je créé mon compte maintenant !</router-link
      >
    </nav>
  </template>
</template>

<script>
// @ is an alias to /src
//import SignUp from '@/components/SignUp.vue'
// Import 'axios' > perform API requests (used to send/get data from API)
//import axios from "axios";

// Getters from auth module
import { mapGetters } from "vuex";

export default {
  name: "HomePage",

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      user: "auth/user",
    }),
  },
};
// Implement token authentication > get current user logged
/*async connected() {
    const response = await axios.get('user', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
    this.user = response.data;
      console.log(response);
    
  }*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome {
  background-color: rgb(209 81 90 / 10%);
}
.welcome img {
  width: 30%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>