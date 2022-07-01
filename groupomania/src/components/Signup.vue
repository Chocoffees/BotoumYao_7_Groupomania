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
    <form @submit.prevent="sendRegistrationData">
      <!-- (prevent: page won't refresh) -->
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
        <p class="assistance">{{ emailError }}</p>
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
        <p class="assistance">{{ passwordError }}</p>
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
        <p class="assistance">{{ usernameError }}</p>
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
        <button type="submit" aria-label="créer un compte">
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

// Handle inputs validation > use 'VeeValidate' library 
import { useForm, useField } from "vee-validate";
// Add 'Yup' (schema builder) for expected data
import * as yup from "yup";

export default {
  name: "sign-up",

  setup() {
    // Define validation schema
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      username: yup.string().required().min(3),
      service: yup.string(),
    });

    // Create form context with the validation schema
    useForm({
      validationSchema: schema,
    });

    const { value: email, errorMessage: emailError } 
    = useField("email");
    const { value: password, errorMessage: passwordError } 
    = useField("password");
    const { value: username, errorMessage: usernameError }
    = useField("username");
    const { value: service }
    = useField("service");

    return {
      email,
      emailError,
      password,
      passwordError,
      username,
      usernameError,
      service,
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

      // note l.146: 'this.$router' not working > 'TypeError: Cannot read properties of undefined (reading '$router')'
      // to fix > https://stackoverflow.com/a/69666526
      let self = this;

      // Perform here POST request: use 'axios'
      axios
        .post("http://localhost:8080/api/users/signup", userData)
        .then(function (response) {
          console.log(response.data);
          alert('Félicitations 🎉 Votre compte a été créé avec succès ! Vous allez maintenant accéder à la page de connexion.')
          // --> new user is now added to database Groupomania and will redirect to login page for secure access to app
          self.$router.push('/users/login');
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.registration {
  margin-top: 50px;
}

.icon {
  width: 90px;
}
@media (max-width: 750px) {
  .icon {
    width: 50px;
  }
  .registration {
   margin-top: 10px;
  }
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
  outline: none !important;
}
.assistance {
  color: red;
  margin-top: 0;
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
  transform: scale(0.96);
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