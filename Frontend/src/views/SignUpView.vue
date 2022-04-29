<template>
  <div class="signup">
    <h3>Email</h3>
    <input type="text" id="login">
    <h3>Mot de passe</h3>
    <input type="password" id="password">
    <h3>Nom</h3>
    <input type="text" id="lastname">
    <h3>Prénom</h3>
    <input type="text" id="firstname"><br><br>
    <button v-on:click="sendSignup">Connexion</button>
  </div>
</template>

<script>

const axios = require('axios').default;

export default {
  name: 'SignupView',
  methods: {
    sendSignup(){
      const email = document.getElementById('login').value;
      const password = document.getElementById('password').value;
      const lastName = document.getElementById('lastname').value;
      const firstName = document.getElementById('firstname').value;
      axios({
        method: 'post',
        url: 'http://localhost:80/api/user/signup',
        data: {
          email,
          password,
          lastName,
          firstName
        }
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    }
  }
}
</script>