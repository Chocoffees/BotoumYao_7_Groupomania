<!-- Create component 'Login' > Implement Groupomania User login -->

<template>
  <div class="container">
    <div class="login">
      <img
        class="icon"
        alt="Icône du logo Groupomania"
        src="../assets/icon.png"
      />
      <h1>Ravis de vous revoir !</h1>

      <!-- Login form -->
      <form @submit.prevent="logUser">
        <!-- (prevent: page won't refresh) -->
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
          <label for="password">Password: </label>
          <input
            type="password"
            v-model="password"
            id="password"
            placeholder="Saisissez votre mot de passe"
            required
          />
        </div>

        <div class="form__submit">
          <!-- Implement function 'logUser' at click -->
          <button type="submit" aria-label="créer un compte">
            JE ME CONNECTE
          </button>
        </div>
      </form>

      <p>
        Pas de compte ?
        <router-link to="/users/signup">Créer un compte</router-link>
      </p>
    </div>
  </div>
</template>

<script>

// Use logIn action (implemented in auth module)
import { mapActions } from "vuex";

export default {
  // Module name
  name: "log-in",
  // Retrieve user data from input form once fiels completed
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    ...mapActions({
      // spread logIn action here from auth module
      logIn: "auth/logIn",
    }),
    // Call function implemented on submit form > retrieve user data + token
    async logUser() {
      await this.logIn({
        username: this.username,
        password: this.password,
      });
    //console.log('test');
      //(test ok: data retrieved :)

      // Store token in ls once user logged in
      //localStorage.setItem('token', response.data.token);
      // --> new user is now logged in and will redirect to the forum
      this.$router.push({ name: "ListOfPosts" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  margin-top: 20px;
}
.icon {
  width: 90px;
}
.login h1 {
  color: #132644;
  font-size: large;
}
.login label {
  color: #132644;
  font-size: small;
  font-weight: bold;
  margin-bottom: 10px;
  position: absolute;
}
.login input {
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
.login input:focus {
  border: 2px solid #d1515a;
  font-weight: bold;
  outline: none !important;
}
.login button {
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
.login button:active {
  transform: scale(0.96);
}
.login p {
  font-size: 0.8em;
}
.login p a {
  color: blue;
  font-weight: bold;
  font-size: 1em;
}
</style>