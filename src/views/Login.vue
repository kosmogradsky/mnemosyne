<template>
  <div class="root">
    <h1>Mnemosyne</h1>
    <form action="" @submit.prevent="login">
      <div class="field">
        <label for="login-email" class="label">E-mail:</label>
        <input type="email" id="login-email" v-model="email">
      </div>
      <div class="field">
        <label for="login-password" class="label">Пароль:</label>
        <input type="password" id="login-password" v-model="password">
      </div>
      <button class="submit">
        Войти
      </button>
    </form>
  </div>
</template>

<script>
import firebase from '@firebase/app';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password);
    },
  },
  watch: {
    '$store.state.user': {
      immediate: true,
      handler: function watchAuth(user) {
        if (user) {
          this.$router.push('/');
        }
      },
    },
  },
};
</script>

<style scoped>

.root {
  height: 100vh;
  padding-top: 26vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--primary);
  color: white;
}

.label {
  display: block;
}

.field {
  margin-bottom: .75em;
}

.submit {
  margin-top: .75em;
  background-color: var(--secondary);
  border: none;
  width: 100%;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2);
}

</style>

