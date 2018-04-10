<template>
  <div class="root">
    <h1>Mnemosyne</h1>
    <form action="" @submit.prevent="login">
      <div class="field">
        <label for="login-email" class="label">E-mail:</label>
        <input type="email" id="login-email" ref="email" class="input">
      </div>
      <div class="field">
        <label for="login-password" class="label">Пароль:</label>
        <input type="password" id="login-password" ref="password" class="input">
      </div>
      <button class="submit">
        Войти
      </button>
    </form>
  </div>
</template>

<script>
import firebase from '@firebase/app';
import authService from '@/services/authService';
import { filter } from 'rxjs/operators/filter';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.$refs.email.value, this.$refs.password.value);
    },
  },
  created() {
    this.$subscribeTo(
      authService.state.pipe(filter(user => user)),
      () => this.$router.push('/'),
    );
  },
};
</script>

<style scoped>

.root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: white;
}

.label {
  display: block;
}

.field {
  margin-bottom: .75em;
}

.input {
  border-color: white;
  color: white;
}

.submit {
  margin-top: .75em;
  width: 100%;
}

</style>

