import Vue from 'vue';
import Router from 'vue-router';
import { take } from 'rxjs/operators/take';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import authService from './services/authService';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter: (to, from, next) => {
        authService.state
          .pipe(take(1))
          .subscribe(user => (user ? next() : next('/login')));
      },
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        authService.state
          .pipe(take(1))
          .subscribe(user => (user ? next('/') : next()));
      },
    },
  ],
});
