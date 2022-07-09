<!-- Create component 'AddNewPost' > Allow user to share post -->

<template>
  <h1>Ajoutez une publication</h1>
  <p class="info">Restez courtois et ne partagez pas de contenu illégal.</p>
  
  <div class="creation">
    <form @submit.prevent="sharePost">
      <!-- (prevent: page won't refresh) -->
      <div class="form-group">
        <label for="title">Titre</label>
        <input
          type="text"
          v-model="title"
          id="title"
          placeholder="Titre de votre publication"
          required
        />
        <p class="assistance">{{ titleError }}</p>
      </div>

      <div class="form-group-content">
        <label for="content">Description</label>
        <textarea
          type="text"
          v-model="content"
          id="content"
          placeholder="Exprimez-vous"
        />
      </div>

      <div class="form-group">
        <label for="attachment">Insérer une image (extensions autorisées : jpg, jpeg, png, gif)</label>
        <input
          type="file"
          @change="onFileChange"
          id="attachment"
          ref="file"
          name="attachment"
          accept="image/jpg, image/jpeg, image/png, image/gif"
          placeholder="Joindre un fichier"
          required
        />
        <p class="assistance">{{ attachmentError }}</p>
      </div>

      <div class="form__submit">
        <!-- (submit the form) -->
        <button type="submit" aria-label="partager ma publication">
          C'EST PARTI !
        </button>
      </div>
    </form>
  </div>

  <nav>
      <router-link to="/posts"><font-awesome-icon :icon="['fas', 'rotate-left']" /> Retour au forum</router-link>
    </nav>

</template>

<script>
// Import 'axios' > perform API requests (used to send/get data from API)
import axios from "axios";

export default {
  name: "AddNewPost",
  data() {
    return {
      title: "",
      content: "",
      attachment: "",
    };
  },

  methods: {
    onFileChange(event) {
      console.log(event); // see selected file properties
      this.attachment = event.target.files[0];
      console.log(this.attachment); // return files properties ok
    },
    // Call function 'sharePost()' > submit post creation form
    async sharePost() {
      const postData = new FormData();
      
      postData.append("title", this.title),
      postData.append("content", this.content),
      postData.append("attachment", this.attachment);
      
      alert("Publication créée avec succès 👏")
      
      // Perform here POST request: use 'axios'
      await axios
        .post("http://localhost:8080/api/posts/new", postData)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        // --> user has now created post ready to publish and will be redirect to forum (ListOfPosts)
        this.$router.push({ name: "ListOfPosts" });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin-top: 50px;
}
.info {
  font-size: 0.9em;
  color: blueviolet;
}
.creation {
  display: flex;
  justify-content: center;
  margin: 30px auto 30px auto;
  width: 50%;
}
/* --- responsive --- */
@media (min-width: 580px) and (max-width: 768px) {
  .creation {
    width: 60%;
  }
}
@media (min-width: 400px) and (max-width: 579px) {
  .creation {
    width: 80%;
  }
}
@media (min-width: 320px) and (max-width: 399px) {
  .creation {
    width: 80%;
  }
  .form-group > label {
    font-size: small;
    font-weight: bold;
  }
}
/* --- end responsive --- */
.icon {
  width: 130px;
}
.creation h1 {
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
  margin: 15px auto 15px auto;
  outline: 0;
  padding: 5px 5px 70px 5px;
  width: 100%;
}
.creation label {
  color: #132644;
  font-size: medium;
  font-weight: bold;
  margin-bottom: 10px;
}
.creation input {
  width: 100%;
  height: 35px;
  border: 1px solid transparent;
  box-shadow: rgb(189 25 25 / 30%) 3px 5px 5px 2px;
  box-sizing: border-box;
  color: #132644;
  margin: 15px auto 15px auto;
  outline: 0;
  text-align: left;
}
.creation input:focus {
  border: 2px solid #d1515a;
  font-weight: bold;
  outline: none !important;
}
.assistance {
  color: orange;
  margin-top: 0;
}
.creation button {
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
  margin: 10px;
  opacity: 1;
  padding: 15px 45px;
  text-align: center;
  transition: all 0.3s;
}
.creation button:hover {
  background-color: bisque;
}
.creation button:active {
  transform: scale(0.96);
}
nav {
  padding: 30px;
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