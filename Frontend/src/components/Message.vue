<template>
  <div class="message">
    <div class="message__title">{{ title }}</div>
    <div class="message_text">{{ text }}</div> 
    <div class="message__author">{{ author }}</div>
 </div>
</template>

<script>
export default {
    name:"MonMsg",
    props:{
        text: { type: String },
        author: { type: String },
        title: { type: String }
    }
}
</script>

<style lang="scss">
.message {
    
    &__title {
       color: green;   
    }

    &__text {
        color: red;   
    }

    &__author {
        color: yellow;               
    }
}
</style>