<template>
  <div>
    <nav>
      <div class="logo-container">
        <img id="logo" alt="Groupomania logo" src="./assets/icon-above-font.png">
      </div>
      <div class="nav-links">
        <router-link v-if="userToken !== ''" to="/">Accueil </router-link> 
        <router-link v-if="userToken === ''" to="/login">Connexion </router-link>
        <router-link v-if="userToken === ''" to="/signup">Inscription </router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
  name: 'App',
  computed: {
    ...mapState({
      userToken: 'userToken'
    }),
  },
  mounted() {
    //check si on est connecté grace au localStorage
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logo {
  height:150px;
  width:150px;
}

html {
   display:flex;
   justify-content: center;
}

body {
  margin: 0;
  max-width: 1440px;
  width: 100%;
}

.nav-links {
   display: flex;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;

  a {
    font-weight: bold;
    color: #122442;
    padding: 0 15px 0 15px;
    align-self:center;

    &.router-link-exact-active {
      color: #fd2d01;
    }
  }
}
</style>
