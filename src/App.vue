<template>
  <router-view/>
</template>

<script>
import firebase from '@firebase/app';
import authService from '@/services/AuthService';

export default {
  created() {
    firebase.auth().onAuthStateChanged(user => authService.updateUser(user));
  },
};
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,700&subset=cyrillic');
/* https://material.io/color/#!/?view.left=0&view.right=1&primary.color=f44334&secondary.color=6A1B9A&primary.text.color=000000 */

:root {
  --primary: #d53035;
  --secondary: #35d530;
}

body {
  margin: 0;
  font-family: 'Roboto Mono', monospace;
  background-color: #fafafa;
}

input {
  font-family: inherit;
  font-size: 1rem;
}

button {
  font-family: inherit;
  font-size: 1rem;
  padding-top: .375em;
  padding-bottom: .375em;
}

* {
  box-sizing: border-box;
}

.input {
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.42);
  background-color: transparent;
  height: 40px;
  border-radius: 0;
}

</style>
