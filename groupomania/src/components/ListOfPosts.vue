<!-- Create component 'ListOfPosts' > Access to shared posts including comments -->

<template>
  <h1>📰 Les news de votre réseau</h1>
  <p class="intro">Envie de partager un contenu ?</p>
  <button
    @click="addPost"
    aria-label="ajouter une publication"
    title="Ajouter une publication"
    class="add-btn"
  >
    CLIQUEZ-MOI 😀
  </button>

  <!-- render list of posts -->
  <div class="post" v-for="post in posts" v-bind:key="post.id">
    <div class="post-header">
      <div class="post-identity">
        <!--{{ post.User.avatar }}
        <div>{{ post.User.avatar }}</div>-->
        <font-awesome-icon class="picture" :icon="['fas', 'circle-user']" />
        <p class="username">{{ post.User.username }}</p>
        <p class="post-date">- mis à jour le {{ post.updatedAt }}</p>
      </div>

      <!-- once user/app moderator is logged: show available functions > edit & delete -->
      <div v-if="user.user.id == post.UserId || user.user.admin == true" class="post-functions">
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
            <font-awesome-icon class="picture-s" :icon="['fas', 'circle-user']" />
            <textarea
              type="text"
              v-model="content"
              id="content"
              placeholder="Ajoutez ici un commentaire"
              required
            />
            <!-- possibility to re initialize input -->
            <button
              type="button"
              @click="cancelComment()"
              aria-label="annuler la saisie de mon commentaire"
              title="Annuler ma saisie"
              class="comment-cancel"
            >
              <font-awesome-icon :icon="['fas', 'eraser']" />
            </button>
          </div>

          <div class="form__submit">
            <!-- (submit the form) -->
            <button type="submit" aria-label="ajouter mon commentaire" title="Ajouter mon commentaire">
              AJOUTER MON COMMENTAIRE
            </button>
          </div>
        </div>
      </form>
      
      <!-- render list of comment(s) -->
      <div v-for="comment in comments" v-bind:key="comment.id">
        <div class="comments" v-if="comment.postId === post.id">
          <div class="comment-header">
            <font-awesome-icon class="picture-s" :icon="['fas', 'circle-user']" />
            <strong>{{ comment.User.username }}</strong>
            <p>- le {{ comment.createdAt }} <strong> a écrit :</strong></p>
            <!-- post-comment: allow user to delete his comment -->
            <div v-if="comment.userId == user.user.id">
              <button
                @click.prevent="deleteComment(comment.id)"
                aria-label="supprimer mon commentaire"
                title="Supprimer mon commentaire"
                class="comment-delete"
              >
                <font-awesome-icon :icon="['fas', 'trash-can']" />
              </button>
            </div>
          </div>
          <div class="comment-content">
            {{ comment.content }}
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
      content: "",
    };
  },

  methods: {
    // ---------- Add post: call function 'addPost()' > direct user to 'AddNewPost' ----------
    addPost() {
      this.$router.push({ name: "AddNewPost" });
    },
    
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
        console.log("Post n°", id, "now destroyed");
        window.location.reload()
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    // ---------- Create comment: call function 'createComment()' ----------
    async createComment(postId) {
      let postToComment = postId;
      let content = this.content;

      console.log("Post n°", postToComment, "ready for 🗫");
      console.log(postId, "👤:", this.user.user.id, "📝:", content);

      if (this.content !== "") {
        console.log("Comment that will be added >", content);
      }
      let askToPublish = confirm(
        "ℹ️ Votre commentaire va maintenant être publié."
      );
      if (askToPublish == true) {
        // Perform here POST request: use 'axios'
        const res = await axios.post(
          "http://localhost:8080/api/comments/post/" + postId,
          {
            userId: this.user.user.id,
            postId: postId,
            content: this.content,
          }
        );
        console.log(res);
        console.log(res.data);
        console.log("Comment added 👏");

        this.content = "";

        // ---------- > get comments for each post ----------
        // -> Sort the list of comments like posts: last created at the top of the list > relevant info to user
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
        this.comments = result.data.comments.slice().reverse();
        console.log(this.comments); // return comments properties ok

      } else if (askToPublish == false) {
        console.log(
          "Comment not takes in account and not registered in database."
        );
        this.content = "";
      }
    },

    // ---------- Cancel comment: call function 'cancelComment()' ----------
    async cancelComment() {
      console.log("👁️ dataBeforeCancel:", this.content);
      this.content = "";
    },

    // ---------- Get comments for each post: call function 'accessComment()' ----------
    // -> Sort the list of comments like posts: last created at the top of the list > relevant info to user
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
      this.comments = result.data.comments.slice().reverse();
      console.log(this.comments); // return comments properties ok
    },

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
        console.log("Comment n°", id, "now destroyed");

        window.location.reload();
      }
    },

  },

  // ---------- Get all posts created ----------
  // -> Sort the list of messages: last created at the top of the list > relevant info to user
  async mounted() {
    /*if (localStorage.getItem('token')) {
     console.log('User connected');
    }
    // memo to resolve loop reload before axios request: https://stackoverflow.com/a/50214060
    if (localStorage.getItem('reloaded')) {
      localStorage.removeItem('reloaded');
    } else {
      localStorage.setItem('reloaded', '1');
      location.reload();
    }*/
    const result = await axios.get("http://localhost:8080/api/posts");
    console.log(result);
    this.posts = result.data.posts.slice().reverse();
    //console.log(this.posts.slice(2, 5)); // test rendering on selection: expected results ok
    console.log(this.posts);
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin-top: 50px
}
.intro {
  color: darkviolet;
  font-size: large;
  font-weight: bold;
}
.add-btn {
  width: 170px;
    background-image: linear-gradient( rgb(189 25 25) 0, rgb(255 255 255 / 30%) 100% );
    background-color: #d1515a;
    border: 1px solid;
    box-shadow: rgb(189 25 25 / 40%) 1px 4px 5px 2px;
    color: white;
    cursor: pointer;
    font-size: medium;
    font-weight: bold;
    opacity: 1;
    padding: 10px;
    text-align: center;
    transition: all 0.3s;
}
.add-btn:hover {
  background-color: bisque;
}

/* ----- post ----- */
.post {
  border: 1px solid transparent;
  box-shadow: rgb(189 25 25 / 30%) 3px 5px 5px 4px;
  box-sizing: border-box;
  margin: 30px auto 30px auto;
  width: 80vh;
}
.post-header {
  display: flex;
  justify-content: space-between;
}
.post-identity {
  align-items: center;
  display: flex;
  padding: 15px 5px 5px 15px;
}
.picture {
  color: darkslateblue;
  height: 40px;
  margin-right: 5px;
  width: 40px;
}
.post-identity > p.username {
  font-weight: bold;
  font-size: medium;
  margin-left: 5px;
}
.post-identity > p.post-date {
  color: gray;
  font-size: smaller;
  margin-left: 5px;
}
.test {
  display: flex;
  justify-content: space-between;
}
.post-functions {
  display: flex;
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
.picture-s {
  color: darkslateblue;
  height: 25px;
  margin-right: 5px;
  width: 25px;
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
  border: 1px solid #d1515a;
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
.comment .form__submit > button:hover {
  background-color: bisque;
}
.comment button:active {
  transform: scale(0.96);
}
.comment-header-list {
  border: 1;
}
.comment-delete {
  background: none;
  border: none;
  color: darkred;
  cursor: pointer;
  font-size: 1.2em;
  margin-left: 50px;
}
.comment-delete:hover {
  color: black;
}
.comment-content {
  color: #132644;
  font-family: sans-serif;
  font-size: 0.9em;
  height: 30px;
  margin-left: 5px;
  padding-left: 7px;
  padding-top: 5px;
  width: 200px;
}
</style>
