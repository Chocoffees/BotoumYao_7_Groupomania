<!-- Create component 'ListOfPosts' > Access to shared posts -->

<template>
  <h1>(ListOfPosts) Quoi de neuf aujourd'hui ?</h1>
  <!-- render list of posts -->
  <div class="post" v-for="post in posts" v-bind:key="post.id">
    <div class="post-header">
      <img src="../assets/Mee.png" alt="Avatar miniature" /><strong>{{ post.User.username }}</strong><br/>
      <p>- mis à jour le {{ post.updatedAt }}</p>

      <!-- once user is logged: show available functions > edit & delete -->
      <div v-if="user.user.id == post.UserId">
        <button
          @click="editPost(post.id)"
          aria-label="modifier ma publication"
          title="Modifier"
          class="post-edit"
        >
          ✏️
        </button>
        <button
          @click="deletePost(post.id, post.UserId)"
          aria-label="supprimer ma publication"
          title="Supprimer"
          class="post-delete"
        >
          ❌
        </button>
      </div>
    </div>

    <!-- post content -->
    <div class="post-content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <img :src="post.attachment" />
    </div>
  

  <!-- post-comment: interact -->
  <button
          @click="commentPost"
          aria-label="commenter la publication"
          title="Commenter"
          class="post-comment"
        >
          🗪 <p>Ajouter un commentaire</p>
        </button><br>
  
  <div class="comment">
    <img src="../assets/Mee.png" alt="Avatar miniature" /><strong>{{ user.user.username }}</strong><br/>
      <p>- le {{  }}</p>
  </div>
  </div>
</template>

<script>
// Import 'axios' > perform API requests (used to send/get data from API)
import axios from "axios";
// Getters from auth module
import { mapGetters } from "vuex";

export default {
  name: "ListOfPosts",

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      user: "auth/user",
    }),
  },

  data() {
    return {
      posts: [],
    };
  },

  methods: {
    // Call function 'editPost()' > direct user to 'updatePost'
    editPost(id) {
      let actualPost = id;
      console.log("Ready to ✏️ > Post n°", actualPost);
      this.$router.push(`/posts/${id}`);
    },

    // Call function 'deletePost()'
    // Check post before action
    async deletePost(id, UserId) {
      let postToDelete = id;
      let postOwner = UserId;
      console.log("Ready to ❌ > Post n°", postToDelete, "- User:", postOwner);

      if (
        confirm(
          "ℹ️ La supression du message est irréversible. Voulez-vous continuer ?"
        )
      ) {
        await axios.delete("http://localhost:8080/api/posts/" + id);
        console
          .log("Post n°", id, "now destroyed")
          .then(function (response) {
            console.log(response);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },

  async mounted() {
    const result = await axios.get("http://localhost:8080/api/posts");
    console.log(result);
    this.posts = result.data.posts;
    console.log(this.posts);
  },
};
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

.post {
  border: 1px solid transparent;
  box-shadow: rgb(189 25 25 / 30%) 3px 5px 5px 4px;
  box-sizing: border-box;
  margin: 0 auto 30px auto;
  width: 80vh;
}
.post-header {
  align-items: center;
  display: flex;
  padding: 15px 5px 5px 15px;
}
.post-header > img {
  height: 50px;
  margin-right: 5px;
  width: 50px;
}
.post-header > p {
  color: gray;
  font-size: smaller;
  margin-left: 5px;
}
/*.post-header > button {
  background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
}*/
.post-edit {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  margin-left: 200px;
}
.post-edit:hover {
  background-color: bisque;
  border-radius: 5px;
}
.post-delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
}
.post-delete:hover {
  background-color: bisque;
  border-radius: 5px;
}
.post-content {
  padding: 15px 15px;
  text-align: left;
}
.post-content h2 {
  font-size: 1.2em;
  margin: 0;
}
.post-content > img {
  max-width: 100%;
  height: auto;
}
.post-comment {
  align-items: center;
  display: flex;
  background: none;
  border: none;
  color: brown;
  cursor: pointer;
  font-size: 2em;
  padding: 15px 5px 5px 15px;
}
.post-comment > p {
  color: black;
  font-size: medium;
  margin-left: 10px;
}
.comment > img {
  height: 30px;
  margin-right: 5px;
  width: 30px;
}
.comment > p {
  color: gray;
  font-size: smaller;
  margin-left: 5px;
}
</style>
