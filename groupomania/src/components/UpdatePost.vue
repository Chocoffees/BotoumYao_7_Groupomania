<!-- Create component 'UpdatePost' > Allow user to update post-->

<template>
<h1>Modifiez une publication</h1>

<div class="edit">
    <form @submit.prevent="editPost">
      <!-- (prevent: page won't refresh) -->
      <div class="form-group">
        <label for="title">Titre</label>
        <input
          type="text"
          v-model="post.title"
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
          v-model="post.content"
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
          name="attachment"
          accept="image/jpg, image/jpeg, image/png, image/gif"
          placeholder="Joindre un fichier"
          required
        />
        <p class="assistance">{{ attachmentError }}</p>
      </div>

      <div class="form__submit">
        <!-- (submit the form) -->
        <button type="submit"  aria-label="modifier ma publication" title="Modifier ma publication">
          MODIFIER MA PUBLICATION
          <!--onclick="alert('Publication modifiée avec succès !')"-->
        </button>
      </div>
    </form>
  </div>

  <nav>
      <router-link to="/posts"><font-awesome-icon :icon="['fas', 'rotate-left']" /> Retour au forum</router-link>
    </nav>

</template>

<script>
// @ is an alias to /src
// Import 'axios' > perform API requests (used to send/get data from API)
import axios from "axios";

export default {
  name: "UpdatePost",
  data() {
    return {
      post: {
        title: "",
        content: "",
        attachment: ""
      }
    }
  },

  methods: {

    /********* Function 'editPost' reviewed *********/
    onFileChange(event) {
      console.log(event); // see selected file properties
      this.attachment = event.target.files[0];
      console.log(this.attachment); // return files properties ok
    },
    // Call function 'editPost()'
    async editPost() {
      console.log(this.post); // return new data entered ok
      
      const upData = new FormData();
      
      upData.append("title", this.post.title),
      upData.append("content", this.post.content),
      upData.append("attachment", this.attachment);

      alert("ℹ️ Modification de votre publication prise en compte.")

      // Perform here PUT request: use 'axios'
      await axios
        .put('http://localhost:8080/api/posts/' + this.$route.params.id, upData)
        // note: `http://localhost:8080/api/posts/${id}` > can be also used with a variable
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        // --> user has now updated post to publish and will be redirect to forum (ListOfPosts)
        this.$router.push({ name: "ListOfPosts" });
      
      /********** also works ***********/
      /*axios
        .put('http://localhost:8080/api/posts/'+ this.$route.params.id, {
          title: this.post.title,
          content: this.post.content,
          attachment: this.post.attachment
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        // --> user has now updated post to publish and will be redirect to forum (ListOfPosts)
        this.$router.push({ name: "ListOfPosts" });*/
    }
  },

  async mounted() {
    // path: '/posts/:id'
    const result = await axios
    .get('http://localhost:8080/api/posts/' + this.$route.params.id); 
    console.log(this.$route.params.id); // return post id selected from 'ListOfPosts' ok
    //console.log(result);
    console.log('je suis là 😀');
    console.log(result.data); // return post data ok
    
    // Retrieve data to update
    this.post = result.data.post;
    console.log(this.post);
    /*this.title = result.data.post.title;
    this.content = result.data.post.content;
    this.attachment = result.data.post.attachment;*/
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edit{
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
  width: 320px;
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
.edit button:hover {
  background-color: bisque;
}
.edit button:active {
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