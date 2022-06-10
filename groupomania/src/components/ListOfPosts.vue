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

    <!-- access post-comment(s) -->
    <button
      @click="accessComment(post.id)"
      aria-label="accéder aux commentaires"
      title="Accéder aux commentaires"
      class="post-comment"
    >
      COMMENTAIRES
    </button>

    <!-- post-comment: allow user to comment a post -->
    <div class="comment">
      <form @submit.prevent="createComment(post.id)">
        <div class="form-group-comment-content">
          <div class="comment-header">
            <img src="../assets/Mee.png" alt="Avatar miniature" />
            <textarea
              type="text"
              v-model="content"
              id="content"
              placeholder="Ajoutez un commentaire"
              required
            />

            <button
              type="button"
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
            <button type="submit" aria-label="ajouter mon commentaire">
              AJOUTER MON COMMENTAIRE
            </button>
          </div>
        </div>
      </form>

      <div v-for="comment in comments" v-bind:key="comment.id">
        <div class="comments" v-if="comment.postId === post.id">
          <div class="comment-header">
            <img src="../assets/Mee.png" alt="Avatar miniature" /><strong>{{
              comment.User.username
            }}</strong>
            <p>- le {{ comment.createdAt }}</p>
          </div>
          <br />
          <div class="comment-content">
            {{ comment.content }}
          </div>

          <!-- post-comment: allow user to delete his comment -->
          <div v-if="comment.userId == user.user.id">
            <button
              @click="deleteComment(comment.id)"
              aria-label="supprimer mon commentaire"
              title="Supprimer"
              class="post-delete"
            >
              <font-awesome-icon :icon="['fas', 'trash-can']" />
            </button>
          </div>
          
        </div>
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

      comment: {
        userId: "",
        postId: "",
        content: "",
      },
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
        console.log("Post n°", id, "now destroyed")
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
      let content = this.contentOfComment;

      console.log("Post n°", postToComment, "ready for 🗫");
      console.log(postId, this.user.user.id, this.content);

      if (content !== "") {
        console.log("Comment added 👏 >", this.content);

        // Perform here POST request: use 'axios'
        await axios
          .post("http://localhost:8080/api/comments/post/" + postId, {
            userId: this.user.user.id,
            postId: postId,
            content: this.content,
          })
          .then(function (response) {
            console.log("Status:", response.status);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    // ---------- Cancel comment: call function 'cancelComment()' ----------
    async cancelComment() {
      this.content = "";
      console.log(this.content);
    },

    // ---------- Get comments for each post: call function 'accessComment()' ----------
    async accessComment(postId) {
      let postToComment = postId;

      console.log("See 🗫 post n°", postToComment);

      // Perform here GET request: use 'axios'
      const result = await axios.get(
        "http://localhost:8080/api/comments/post/" + postId,
        {
          userId: this.user.user.id,
          postId: postId,
          content: this.content,
        }
      );
      console.log(result); // return array including all comments ok (data>comments)
      this.comments = result.data.comments;
      console.log(this.comments) // return comments properties ok
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  
  // >> return all comments but still appear an error:
  // 'ListOfPosts.vue?70c1:226 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'then')'
  // --- to fix! ---

    // ---------- Delete comment: call function 'deleteComment()' ----------
    async deleteComment(id) {
      let commentToDelete = id;
      console.log("Ready to ❌ > Comment n°", commentToDelete);

      if (
        confirm(
          "ℹ️ La supression du commentaire est irréversible. Voulez-vous continuer ?"
        )
        ) {
        // path: '/post/:id'
        await axios.delete("http://localhost:8080/api/comments/post/" + id);
          console.log("Comment n°", id, "now destroyed")
          .then(function (response) {
            console.log(response); 
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
        }
    },

  // >> comment selected delete - check db ok but still appear an error:
  //'ListOfPosts.vue?70c1:252 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'then')
  // --- to fix! ---

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

.post-comment {
  width: 150px;
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
  margin: 0 10px 20px 10px;
  opacity: 1;
  padding: 10px;
  text-align: center;
  transition: all 0.3s;
}
.post-comment:hover {
  background-color: bisque;
}
.post-comment:active {
  transform: scale(0.96);
}

/* ----- comment ----- */
.comment .comments {
  display: flex;
  margin: 0 auto 20px auto;
  width: 80vh;
}
.comment-header {
  align-items: center;
  display: flex;
  padding: 15px 5px 5px 15px;
}
.comment-header-list {
  align-items: center;
  display: flex;
  padding: 15px 5px 5px 15px;
}
.comment-header > p {
  color: gray;
  font-size: smaller;
  margin-left: 5px;
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
.comment-content {
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
  width: 200px;
}
</style>
