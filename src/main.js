import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const config = {
  apiKey: 'AIzaSyDkWZ7dmMfdvubYoFzX0DfMyDHaeyVZU8U',
  authDomain: 'histore-efe26.firebaseapp.com',
  databaseURL: 'https://histore-efe26.firebaseio.com',
  projectId: 'histore-efe26',
  storageBucket: 'histore-efe26.appspot.com',
  messagingSenderId: '111609673865',
};
firebase.initializeApp(config);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
