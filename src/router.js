import Vue from 'vue';
import Router from 'vue-router';
import { take } from 'rxjs/operators/take';
import EntitiesList from './components/EntitiesList.vue';
import EntityEdit from './components/EntityEdit.vue';
import Login from './components/Login.vue';
import authService from './services/authService';

Vue.use(Router);

const authGuard = (to, from, next) => {
  authService.state
    .pipe(take(1))
    .subscribe(user => (user ? next() : next('/login')));
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: EntitiesList,
      beforeEnter: authGuard,
    },
    {
      path: '/:id',
      component: EntityEdit,
      beforeEnter: authGuard,
      props: true,
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
