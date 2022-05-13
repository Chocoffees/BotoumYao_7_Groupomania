<!-- Create component 'Nav' -->

<template>
  <nav class="nav">
    <input type="checkbox" id="nav-check" />
    <div class="nav-header">
        <img src="" alt="Logo de Groupomania">
    </div>
    <div class="nav-links">
      <ul>
        <li><a href="#" target="_blank">Accueil</a></li>
        <li><a href="#" target="_blank">Créer un compte</a></li>
        <li><a href="#" target="_blank">Se connecter</a></li>
        <li><a href="#" target="_blank">Assistance</a></li>
      </ul>
    </div>
    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  </nav>
</template>


<script>

export default {
    name: "app-nav"
};
</script>


<style>
</style>