<!-- Create component 'AccountUser' > Allow user to access to personal data -->

<template>
  <h1>Mon compte</h1>

  <div class="user-card">
    <img :src="user.avatar" alt="Ma photo de profil" v-if="user.avatar" />
    <font-awesome-icon class="picture" :icon="['fas', 'user']" viewBox="0 0 700 300" v-else />
    <table>
      <thead>
        <tr>
          <th colspan="2">Vos informations</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Email :</td>
          <td>{{ user.email }}</td>
        </tr>
        <tr>
          <td>Username :</td>
          <td>{{ user.username }}</td>
        </tr>
        <tr>
          <td>Service :</td>
          <td>{{ user.service }}</td>
        </tr>
      </tbody>
    </table>
    <div class="post-functions">
      <button
        @click="updateUserData(user.id)"
        aria-label="mettre à jour mes informations"
        title="Mettre à jour mes informations"
        class="post-edit"
      >
        <font-awesome-icon :icon="['fas', 'file-pen']" />
      </button>
      <button
        @click="deleteAccount(user.id)"
        aria-label="supprimer mon compte"
        title="Supprimer mon compte"
        class="post-delete"
      >
        <font-awesome-icon :icon="['fas', 'trash-can']" />
      </button>
    </div>
  </div>

  <nav>
      <router-link :to="{ name: 'ListOfPosts' }">Accès au forum <font-awesome-icon :icon="['fas', 'angles-right']" /></router-link>
    </nav>
</template>


<script>
// Import 'axios' > perform API requests (used to send/get data from API)
import axios from "axios";
// Getters from auth module
import { mapGetters } from "vuex";

export default {
  name: "AccountUser",

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      user: "auth/user",
    }),
  },

  data() {
    return {
      user: {},
    };
  },

  methods: {
    // ---------- Update user account: call function 'updateUserData()' ----------
    async updateUserData(id) {
      let userId = id;
      console.log("user.id:", userId);
      console.log(this.user) // return new data entered ok
      // --> user will be direct to update form
      this.$router.push(`/users/myaccount-update/${id}`);
    },

    // ---------- Delete user: call function 'deletePost()' ----------
    // Check post before action
    async deleteAccount(id) {
      let accountToDelete = id;
      console.log("Ready to ❌ > member n°", accountToDelete);

      if (confirm("⚠️ Cher Membre, votre compte va être supprimé. Confirmer ?")) {

        await axios.delete("http://localhost:8080/api/users/myaccount/" + id);
        console.log("Member account n°", id, "now destroyed");

        alert("ℹ️ Le compte est maintenant supprimé.")
        localStorage.removeItem('token');
        this.$router.push('/users/signup');
        document.location = '/users/signup'
      }
    },
  },

  // ---------- Retrieve all user data ----------
  async mounted() {
    const result = await axios.get("http://localhost:8080/api/users/myaccount/" + this.$route.params.id)
    console.log(result);
    this.user = result.data.user;
    console.log(this.user);
  },
};
</script>

<style scoped>
h1 {
  margin: 50px auto 40px auto;
}
.user-card > img {
  border-radius: 40% 0;
  height: 120px;
  margin-bottom: 20px;
  width: 140px;
}
.picture {
  background-color: darkslateblue;
  border: 2px solid;
  border-radius: 40% 0;
  color: #fff;
  height:100px;
  margin-bottom: 20px;
  width: 140px;  
}
.post-functions {
  margin: 30px auto 30px auto;
  padding-right: 15px;
}
.post-edit {
  background: none;
  border: none;
  color: limegreen;
  cursor: pointer;
  font-size: 1.2em;
}
.post-edit:hover {
  color: black;
}
.post-delete {
  background: none;
  border: none;
  color: darkred;
  cursor: pointer;
  font-size: 1.2em;
}
.post-delete:hover {
  color: black;
}
table {
  margin: 10px auto 30px auto;
}
td {
  border-bottom: 2px solid gainsboro;
  font-size: medium;
  height: 30px;
  width: 230px;
}
th {
  height: 30px;
}
thead {
  background-color: #d1515d;
  color: #fff;
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