<!-- Create component 'HomePage' -->

<template>
  <h1>Assistance</h1>

  <div>
    <font-awesome-icon class="assistance-icon" :icon="['fas', 'bugs']" />
  </div>

  <div class="assistance">
    <p class="help">
      <font-awesome-icon class="assistance-icon" :icon="['fas', 'headset']" />
      Besoin d'aide ? Contactez-nous
    </p>
    <p class="contact">Du lundi au vendredi de 08:00 à 18:00</p>
    <a href="mailto: assistance@groupomania.com"
      ><font-awesome-icon
        class="assistance-icon"
        :icon="['fas', 'square-envelope']"
    /></a>
    <font-awesome-icon
      class="assistance-icon"
      :icon="['fas', 'square-phone']"
    />: 01.23.45.67.89
  </div>

  <nav v-if="isAuthenticated">
    <router-link to="/posts"
      ><font-awesome-icon :icon="['fas', 'rotate-left']" /> 
      Retour au forum
    </router-link>
  </nav>
</template>

<script>
// Getters from auth module
import { mapGetters } from "vuex";

export default {
  name: "app-assistance",

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      user: "auth/user",
    }),
  },
};
</script>

<!-- Add "scoped" atribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 50px auto 15px auto;
}
.assistance {
  padding-top: 5px;
  padding-bottom: 15px;
}
.help {
  margin-top: 5px;
}
.assistance-icon {
  width: 30px;
  height: 30px;
  padding-right: 7px;
}
.contact {
  color: #d1515a;
  font-weight: bold;
}
nav a {
  color: blue;
  padding-bottom: 5px;
  text-decoration: none;
}
nav a:hover {
  border-bottom: 2px solid blue;
  font-weight: bold;
}
</style>
