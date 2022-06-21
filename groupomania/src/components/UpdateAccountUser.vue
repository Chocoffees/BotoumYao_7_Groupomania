<!-- Create component 'AccountUser' > Allow user to update personal data -->

<template>
  <h1>Je modifie mes informations</h1>

  <div class="edit">
    <form @submit.prevent="updateUserData">
      <!-- (prevent: page won't refresh) -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="user.email"
          id="email"
          placeholder="Votre email"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          v-model="user.username"
          id="username"
          placeholder="Username"
          required
        />
      </div>

      <div class="form-group">
        <label for="service">Service</label>
        <input
          type="text"
          v-model="user.service"
          id="service"
          placeholder="Nom de votre service (facultatif)"
        />
      </div>

      <div class="form-group">
        <label for="attachment">Insérer une image de profil (facultative) </label>
        <input
          type="file"
          @change="onFileChange"
          id="avatar"
          name="avatar"
          accept="image/jpg, image/jpeg, image/png, image/gif"
          placeholder="Insérer une image de profil"
        />
      </div>

      <div class="form__submit">
        <!-- (submit the form) -->
        <button
          type="submit"
          aria-label="sauvegarder mes informations"
          title="Sauvegarder mes informations"
        >
          SAUVEGARDER
        </button>
      </div>
    </form>
  </div>

  <nav>
      <router-link to="/users/myaccount"><font-awesome-icon :icon="['fas', 'rotate-left']" /> Revenir à mon compte</router-link>
    </nav>

</template>


<script>
// Import 'axios' > perform API requests (used to send/get data from API)
import axios from "axios";
// Getters from auth module
import { mapGetters } from "vuex";

export default {
  name: "UpdateAccountUser",

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      user: "auth/user",
    }),
  },

  data() {
    return {
        user: {
        email: "",
        username: "",
        avatar: "",
        service: ""
        }
    }
  },

  methods: {
    onFileChange(event) {
      console.log(event); // see selected file properties
      this.avatar = event.target.files[0];
      console.log(this.avatar); // return files properties ok
    },
    // ---------- Update user account: call function 'updateUserData()' ----------
     async updateUserData() {
      console.log(this.user); // return new data entered ok
      
      const upUserData = new FormData();
      
      upUserData.append("email", this.user.email),
      upUserData.append("username", this.user.username),
      upUserData.append("service", this.user.service),
      upUserData.append("avatar", this.avatar);

      // Perform here PUT request: use 'axios'
      await axios
        .put('http://localhost:8080/api/users/myaccount-update/' + this.$route.params.id, upUserData)
        
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

        alert("ℹ️ Vos informations ont été mises à jour.")
        // --> user has now updated his data and will be redirect
        this.$router.push({ name: "AccountUser" });
    }
    },
  

  // ---------- Retrieve user data ----------
  async mounted() {
    const result = await axios.get('http://localhost:8080/api/users/myaccount');
    console.log(result);
    this.user = result.data.user;
    console.log(this.user); // ok :)
  },
}
</script>

<style scoped>
.edit {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.icon {
  width: 130px;
}
.edit h1 {
  color: #132644;
  font-size: large;
}
.form-group-content textarea {
  border: 1px solid transparent;
  box-shadow: rgb(189 25 25 / 30%) 3px 5px 5px 2px;
  box-sizing: border-box;
  color: #132644;
  font-family: sans-serif;
  height: 100px;
  margin: 30px auto 15px auto;
  outline: 0;
  padding: 5px 5px 70px 5px;
  width: 400px;
}
.edit label {
  color: #132644;
  font-size: medium;
  font-weight: bold;
  margin-bottom: 10px;
  position: absolute;
}
.edit input {
  width: 400px;
  height: 35px;
  border: 1px solid transparent;
  box-shadow: rgb(189 25 25 / 30%) 3px 5px 5px 2px;
  box-sizing: border-box;
  color: #132644;
  margin: 30px auto 15px auto;
  outline: 0;
  text-align: left;
}
.edit input:focus {
  border: 2px solid #d1515a;
  font-weight: bold;
  outline: none !important;
}
.assistance {
  color: orange;
  margin-top: 0;
}
.edit button {
  width: 200px;
  background-image: linear-gradient(
    rgb(189 25 25) 0,
    rgb(255 255 255 / 30%) 100%
  );
  background-color: #d1515a;
  border: 1px solid;
  box-shadow: rgb(189 25 25 / 40%) 1px 4px 5px 2px;
  color: white;
  cursor: pointer;
  font-size: medium;
  font-weight: bold;
  margin: 10px 10px 30px 10px;
  opacity: 1;
  padding: 15px 45px;
  text-align: center;
  transition: all 0.3s;
}
.edit button:hover {
  background-color: bisque;
}
.edit button:active {
  transform: scale(0.96);
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