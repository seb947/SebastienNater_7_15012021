<template>
  <div class="home">
    <button v-on:click="displayMessages">Afficher les messages</button>
    <Message v-for="(msg, index) in myMsgs"
             :key="index"
             :text="msg.text" 
             :title="msg.title" 
             :author="msg.author"/>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
const axios = require('axios').default;
import Message from '../components/Message.vue';

export default {
  name: 'HomeView',
  components: { Message },
  data() {
    return {
      myMsgs: [],
    };
  },
  methods: {
    displayMessages(){ 
      axios.get('http://localhost:80/api/message/find-all', {
        headers: {
          'x-access-token': localStorage.getItem('userToken')
        }
      }
      )
      .then((response) => {
        this.myMsgs = response.data.messages
        console.log(response);
      })
      .catch((error) => console.log(error));
    }
  },
  computed: {
    maPropComputed() {
      return this.myMsgs
    }
  },
  mounted() {
    
  },
}
</script>
