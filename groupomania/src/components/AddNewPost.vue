<!-- Create component 'AddNewPost' > Allow user to share post -->

<template>
  <h1>(AddNewPost) - Ajoutez une publication</h1>

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
        <label for="attachment">Insérer une image</label>
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
.creation {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
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
  margin: 30px auto 15px auto;
  outline: 0;
  padding: 5px 5px 70px 5px;
  width: 400px;
}
.creation label {
  color: #132644;
  font-size: medium;
  font-weight: bold;
  margin-bottom: 10px;
  position: absolute;
}
.creation input {
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
.creation button:active {
  transform: scale(0.96);
}
</style>