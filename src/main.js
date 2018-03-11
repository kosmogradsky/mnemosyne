import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import Vue from 'vue';
import VueRx from 'vue-rx';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import App from './App.vue';
import router from './router';

// tada!
Vue.use(VueRx, {
  Observable,
  Subscription,
  Subject,
});

const config = {
  apiKey: 'AIzaSyDkWZ7dmMfdvubYoFzX0DfMyDHaeyVZU8U',
  authDomain: 'histore-efe26.firebaseapp.com',
  databaseURL: 'https://histore-efe26.firebaseio.com',
  projectId: 'histore-efe26',
  storageBucket: 'histore-efe26.appspot.com',
  messagingSenderId: '111609673865',
};
firebase.initializeApp(config);

export default firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
