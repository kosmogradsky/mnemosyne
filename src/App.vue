<template>
  <div>
    <Header />
    <router-view class="router-view" />
  </div>
</template>

<script>
import firebase from '@firebase/app';
import authService from '@/services/authService';
import Header from './components/Header.vue';

export default {
  components: {
    Header,
  },
  created() {
    firebase.auth().onAuthStateChanged(user => authService.updateUser(user));
  },
};
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&subset=cyrillic');
/* https://material.io/color/#!/?view.left=0&view.right=1&primary.color=f44334&secondary.color=6A1B9A&primary.text.color=000000 */

:root {
  --primary: #d53035;
  --secondary: #35d530;
  --background: #fafafa;
}

body {
  margin: 0;
  font-family: 'Roboto', serif;
  background-color: var(--background);
}

.router-view {
  padding-top: 65px;
}

input {
  font-family: inherit;
  font-size: 1rem;
  padding-left: 0;
  padding-right: 0;
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.42);
  background-color: transparent;
  height: 40px;
  border-radius: 0;
}

button {
  font-family: inherit;
  font-size: 1rem;
  padding: .5em 1em;
  border: none;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),
    0 2px 2px 0 rgba(0,0,0,.14),
    0 1px 5px 0 rgba(0,0,0,.12);
  background-color: white;
  border-radius: 2px;
}

* {
  box-sizing: border-box;
}

svg {
  height: 100%;
  width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

</style>
