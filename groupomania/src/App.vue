<!-- html code -->
<template> 
<div id="app">

<!-- list using components -->
  <Nav />
  
  <div>
    <router-view />
  </div>
  
</div>

</template>


<!-- logic js -->
<script>

// Import components
import Nav from './components/Nav.vue'

export default {
  name: "App",
  components: {
    Nav,
    
  }
  
}
  
</script>


<!-- css -->
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.nav {

    width: 100%;
    height: 50px;
    position: relative;

  }

  .nav > .nav-header {

    display: inline;
    left: 0;
    position: absolute;

  }

  /** logo **/
  .nav > .nav-header img {

    display: inline-block;
    padding: 10px 10px 10px 10px;

  }

  .nav > .nav-links {
    
    display: inline;
    float: right;
    font-size: 18px;

  }

  .nav > .nav-links > ul li a{
    
    color: #d1515a;
    display: block;
    font-size: 18px;
    line-height: 40px;
    padding: 0 15px;
    text-decoration: none;

  }

  .nav > .nav-links > ul li a:hover{
    color: #fff;
  }

  .nav > .nav-links > ul{

    list-style: none;
    margin-top: 5px;
    padding: 0;
    position: relative;
    
  }

  .nav > .nav-links > ul li{

    display: inline-block;
    font-weight: bold;

  }

  .nav > .nav-links > ul li:hover{

      background-color: #d1515a;
      border-radius: 5px;
  }

  .nav > .nav-btn {
    display: none; /*Hide toggle button for desktop view*/
  }

   .nav > #nav-check {
    display: none;
  }  

/* --- responsive --- */
  @media (max-width:750px) {
    .nav > .nav-btn {

      display: inline-block;
      position: absolute;
      right: 0px;
      top: 0px;

    }

    .nav > .nav-btn > label {

      display: inline-block;
      height: 50px;
      padding: 13px;
      width: 50px;

    }

    .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label {
      background-color: rgba(0, 0, 0, 0.3);
    }

    .nav > .nav-btn > label > span {

      border-top: 2px solid #eee;
      display: block;
      height: 10px;
      width: 25px;

    }

    .nav > .nav-links {

      background-color: #333;
      display: block;
      height: 0px;
      left: 0px;
      overflow-y: hidden;
      position: absolute;
      transition: all 0.3s ease-in;
      top: 50px;
      width: 100%;
      
    }

    .nav > .nav-links > ul li a {

      display: block;
      width: 100%;

    }

    /*   */
      .nav > .nav-links > ul li{

        background-color: #333;
        display: block;
        margin-bottom: 20px;
        padding: 0;
        
      }

      .nav > .nav-links > ul li a{
          margin-left: 40%;
      }

      .nav .nav-links ul a.icon{
        margin-left: 33%;
      }

    /*   */
    .nav > #nav-check:not(:checked) ~ .nav-links {
      height: 0px;
    }

    .nav > #nav-check:checked ~ .nav-links {

      height: calc(100vh - 50px);
      overflow-y: auto;

    }
  }


</style>
