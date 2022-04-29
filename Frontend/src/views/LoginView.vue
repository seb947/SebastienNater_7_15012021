<template>
  <div class="login">
    {{ maPropComputed }}
    <h3>{{ loginTitle }}</h3>
    <input type="text" id="login" v-model="email">
    <h3>{{ passwordTitle }}</h3>
    <input type="password" id="password" v-model="password"><br><br>
    <button @click="login">Connexion</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      loginTitle: 'Login',
      passwordTitle: 'Mot de passe',
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions({
      loginAction: 'login'
    }),
    login() {
      this.loginAction({ email: this.email, password: this.password });
    }
  },
  computed: {
    maPropComputed() {
      return this.email + this.password;
    }
  },
  mounted() {
    
  },
}
</script>

<style scoped>

</style>