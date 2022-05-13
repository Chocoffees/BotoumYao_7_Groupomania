<!-- Create component 'HomePage' -->

<template>
  
<h1>(HomePage) - Bienvenue sur votre réseau 😃</h1>
<!-- to check! -->
<!--<h1 v-if="user">(HomePage) - Bienvenue sur votre réseau {{ user.username }} 😃</h1>-->
<!--<h1 v-if="!user"(HomePage) - Bienvenue sur le réseau Groupomania 😃</h1>-->
<nav>
<router-link to="/">J'accède au forum</router-link>
</nav>

</template>

<script>
// @ is an alias to /src
//import SignUp from '@/components/SignUp.vue'
// Import 'axios' > perform API requests (used to send/get data from API)
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      user: ""
    }
  },
  // Implement token authentication > get current user logged
  async connected() {
    const response = await axios.get('user', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
    this.user = response.data;
      console.log(response);
    
  }
  
}
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