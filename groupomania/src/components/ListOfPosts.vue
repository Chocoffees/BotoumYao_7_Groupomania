<!-- Create component 'ListOfPosts' > Access to shared posts -->

<template>
  <h1>(ListOfPosts) Quoi de neuf aujourd'hui ?</h1>
  <!-- render list of posts -->
  <div class="post" v-for="post in posts" v-bind:key="post.id">
    <div class="post-header">
      <img src="../assets/Mee.png" alt="Avatar miniature" /><strong>{{
        post.User.username
      }}</strong
      ><br />
      <p>- mis à jour le {{ post.updatedAt }}</p>

      <!-- once user is logged: show available functions > edit & delete -->
      <div v-if="user.user.id == post.UserId">
        <button
          @click="editPost(post.id)"
          aria-label="modifier ma publication"
          title="Modifier"
          class="post-edit"
        >
          <font-awesome-icon :icon="['fas', 'file-pen']" />
        </button>
        <button
          @click="deletePost(post.id, post.UserId)"
          aria-label="supprimer ma publication"
          title="Supprimer"
          class="post-delete"
        >
          <font-awesome-icon :icon="['fas', 'trash-can']" />
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
    <div class="comment" v-if="user.user.id !== post.UserId">
      <form>
        <div class="form-group-comment-content">
          <div class="comment-header">
            <img src="../assets/Mee.png" alt="Avatar miniature" />
            <textarea
              type="text"
              v-model="contentOfComment"
              id="content"
              placeholder="Ajoutez un commentaire"
              required
            />

            <button
              @click="cancelComment()"
              aria-label="annuler la saisie de mon commentaire"
              title="Annuler"
              class="comment-cancel"
            >
              <font-awesome-icon :icon="['fas', 'eraser']" />
            </button>
          </div>

          <div class="form__submit">
            <!-- (submit the form) -->
            <button
              @click="createComment(post.id)"
              type="submit"
              aria-label="ajouter mon commentaire"
            >
              AJOUTER MON COMMENTAIRE
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-for="comment in post.comments" v-bind:key="comment.id">
      <div class="comment-header-list">
        <img src="../assets/Mee.png" alt="Avatar miniature" /><strong>{{ comment.User.username }}</strong><br />
        <p>- le {{ comment.createdAt }}</p>
      </div>
      <div class="comment-content">
        {{ comment.content }}
      </div>
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
      comments: [],
      contentOfComment: "",
    };
  },

  methods: {
    // ---------- Update post: call function 'editPost()' > direct user to 'updatePost' ----------
    editPost(id) {
      let actualPost = id;
      console.log("Ready to ✏️ > Post n°", actualPost);
      this.$router.push(`/posts/${id}`);
    },

    // ---------- Delete post: call function 'deletePost()' ----------
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
    // ---------- Create comment: call function 'createComment()' ----------
    async createComment(postId) {
      let postToComment = postId;
      console.log("Post n°", postToComment, "ready for 🗫");
      let content = this.contentOfComment;

      /*********** Why it not worked? ***********
      const commentData = new FormData();

      commentData.append("userId", this.user.user.id),
      commentData.append("postId", postId),
      commentData.append("content", this.contentOfComment);

      console.log(postId, this.user.user.id, this.contentOfComment);*/

      if (content !== "") {
        console.log(content);
        // Perform here POST request: use 'axios'
        await axios
          .post("http://localhost:8080/api/comments/post/" + postId, {
            userId: this.user.user.id,
            postId: postId,
            content: this.contentOfComment,
          })
          .then(function (response) {
            console.log(response.status);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    async cancelComment() {
      this.contentOfComment = "";
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
/* ----- post ----- */
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
/* ----- comment ----- */
.comment {
  display: flex;
  margin: 0 auto 20px auto;
  width: 80vh;
}
.comment-header {
  align-items: center;
  display: flex;
  padding: 15px 5px 5px 15px;
}
.comment-header > img {
  height: 30px;
  margin-right: 5px;
  width: 30px;
}
.form-group-comment-content textarea {
  border: 1px solid transparent;
  box-shadow: rgb(189 25 25 / 30%) 5px 5px 2px;
  box-sizing: border-box;
  color: #132644;
  font-family: sans-serif;
  height: 30px;
  margin-left: 5px;
  outline: 0;
  padding-left: 7px;
  padding-top: 5px;
  resize: none;
  width: 400px;
}
.comment-cancel {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  margin-left: 10px;
}
.comment-cancel:hover {
  background-color: bisque;
  border-radius: 5px;
}
.comment .form__submit > button {
  width: 270px;
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
  margin: 10px;
  opacity: 1;
  padding: 10px;
  text-align: center;
  transition: all 0.3s;
}
.comment button:hover {
  background-color: bisque;
}
.comment button:active {
  transform: scale(0.96);
}
.comment-header-list {
  border: 1;
}
</style>
