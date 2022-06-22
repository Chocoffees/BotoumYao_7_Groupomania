<!-- Create component 'Admin' -->

<template>
  <h1>Administration</h1>

  <div class="list">
    <table>
      <caption>
        - Membres du réseau -
      </caption>
      <thead>
        <tr>
          <th scope="col">id Membre</th>
          <th scope="col">Email</th>
          <th scope="col">Username</th>
          <th scope="col">Avatar</th>
          <th scope="col">Service</th>
          <th scope="col">Rôle</th>
          <th scope="col">Date d'adhésion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" v-bind:key="user.id">
          <td class="id">{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.avatar }}</td>
          <td>{{ user.service }}</td>
          <td>{{ user.admin }}</td>
          <td>{{ user.createdAt }}</td>
          <td>
            <button
              @click.prevent="deleteUser(user.id)"
              aria-label="retirer ce membre du réseau"
              title="Retirer ce membre du réseau"
              class="delete"
            >
              <font-awesome-icon :icon="['fas', 'trash-can']" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// Import 'axios' > perform API requests (used to send/get data from API)
import axios from "axios";
// Getters from auth module
import { mapGetters } from "vuex";

export default {
  name: "AdminPage",

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      user: "auth/user",
    }),
  },

  data() {
    return {
      users: [],
    };
  },

  methods: {
    // ---------- Delete user account: call function 'deleteUser()' ----------
    async deleteUser(id) {
      let memberToDelete = id;
      console.log("Ready to ❌ > member n°", memberToDelete);

      if (confirm("ℹ️ Le compte de cet employé va être supprimé.")) {
        await axios.delete("http://localhost:8080/api/users/myaccount/" + id);
        console.log("Member account n°", id, "now destroyed");

        alert("ℹ️ Le compte est maintenant supprimé.")
        document.location = '/users'
        //window.location.reload();
      }
    },
  },

  // ---------- Retrieve all users data ----------
  async mounted() {
    const result = await axios.get("http://localhost:8080/api/users");
    console.log(result);
    this.users = result.data.users;
    console.log(this.users);
  },
};
</script>

<style scoped>
h1 {
  margin: 50px auto 0 auto;
}
/* memo: https://developer.mozilla.org/fr/docs/Web/CSS/overflow-x */
.list {
  overflow-x: auto;
}
table {
  border-collapse: separate;
  margin: 50px auto;
  width: 750px;
}
caption {
  caption-side: top;
  font-size: large;
  font-weight: bold;
  padding: 15px;
}
/* memo: https://developer.mozilla.org/fr/docs/Web/CSS/:nth-of-type */
tr:nth-of-type(2n) {
  background: whitesmoke;
}
th {
  background: #d1515a;
  color: white;
  font-weight: bold;
}
.id {
  font-weight: bold;
}
td,
th {
  border: 1px solid whitesmoke;
  font-size: 0.9em;
  padding: 10px;
  text-align: center;
}
.delete {
  background: none;
  border: none;
  color: darkred;
  cursor: pointer;
  font-size: 1.2em;
}
.delete:hover {
  color: black;
}
</style>