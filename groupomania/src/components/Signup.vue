<!-- Create component 'Signup' > Implement Groupomania User registration -->

<template>

  <div class="registration">
    <img
      class="icon"
      alt="Icône du logo Groupomania"
      src="../assets/icon.png"
    />
    <h1>Bienvenue !</h1>

    <!-- Registration form -->
    <!-- Implement function 'sendRegistrationData' for submission -->
    <!-- Include v-model directive in order to bind form input elements -->
    <form @submit.prevent="sendRegistrationData"> <!-- (prevent: page won't refresh) -->
      <!-- {{ form }} (for test data entries)-->
      <div class="form-group">
        <label for="email">Email: </label>
        <input
          type="email"
          v-model="email"
          id="email"
          placeholder="Saisissez ici votre email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password: </label>
        <input
          type="password"
          v-model="password"
          id="password"
          placeholder="Saisissez votre mot de passe"
          required
        />
      </div>

      <div class="form-group">
        <label for="username">Username: </label>
        <input
          type="text"
          v-model="username"
          id="username"
          placeholder="Saisissez un username"
          required
        />
      </div>

      <div class="form-group">
        <label for="service">Service: </label>
        <input
          type="text"
          v-model="service"
          id="service"
          placeholder="Nom de votre service (facultatif)"
        />
      </div>
      
      <div class="form__submit">
        <!-- (submit the form) -->
        <button
          type="submit" 
          aria-label="créer un compte"
        >
          CREER UN COMPTE
        </button>
      </div>
    </form>

    <p>
      Déjà un compte ?
      <router-link to="/users/login">Me connecter</router-link>
    </p>
  </div>

</template>

<script>
// Import 'axios' > perform API requests (used to send/get data from API)
import axios from "axios";

export default {
  name: "sign-up",
  // Retrieve user data from input form once fiels completed
  data() {
    return {
      //form: {
      email: "",
      password: "",
      username: "",
      service: "",
      // }
    };
  },

  methods: {
    // Call function 'sendRegistrationData()' > submit the form
    sendRegistrationData() {
      const userData = {
        email: this.email,
        password: this.password,
        username: this.username,
        service: this.service,
      };
      // Perform here POST request: use 'axios'
      axios
        .post("http://localhost:8080/api/users/signup", userData)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      // --> new user is now added to database Groupomania and will redirect to Homepage
      this.$router.push({ name: "HomePage" });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.registration {
    margin-top: 40px;
}

.icon {
  width: 130px;
}

.registration h1 {
  color: #132644;
  font-size: large;
}
.registration label {
  color: #132644;
  font-size: small;
  font-weight: bold;
  margin-bottom: 10px;
  position: absolute;
}
.registration input {
  width: 260px;
  height: 35px;
  border: 1px solid transparent;
  border-radius: 30px;
  box-shadow: rgb(189 25 25 / 30%) 3px 5px 5px 2px;
  box-sizing: border-box;
  color: #132644;
  margin: 20px auto 15px auto;
  outline: 0;
  text-align: center;
}
.registration input:focus {
  border: 2px solid #d1515a;
  font-weight: bold;
  outline:none !important;
}
.registration button {
  width: 230px;
  border-radius: 30px;
  border: 1px solid;
  background-color: #d1515a;
  color: white;
  cursor: pointer;
  font-weight: bold;
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
}
.registration button:active {
  transform: scale(0.96)
}
.registration p {
  font-size: 0.8em;
}
.registration p a {
  color: blue;
  font-weight: bold;
  font-size: 1em;
}

</style>
