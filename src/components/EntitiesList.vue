<template>
  <div class="root">
    <Header />
    <div class="movies">
      <EntityCard
        v-for="(movie, index) in movies"
        :key="index"
        :movie="movie"
      />
    </div>
    <form
      action=""
      @submit.prevent="addMovie"
      class="form"
    >
      <input
        type="text"
        class="input"
        placeholder="Название фильма..."
        v-model="newMovieName"
      >
    </form>
  </div>
</template>

<script>
import db from '@/main';
import authService from '@/services/authService';
import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';
import EntityCard from './EntityCard.vue';
import Header from './Header.vue';

export default {
  name: 'home',
  components: {
    EntityCard,
    Header,
  },
  data() {
    return {
      newMovieName: '',
      movies: [],
    };
  },
  methods: {
    addMovie() {
      db.collection('movies').add({
        name: this.newMovieName,
        uid: this.user.uid,
      });

      this.newMovieName = '';
    },
    subscribeToMovies() {
      this.queryUnsubscribe = db.collection('movies')
        .where('uid', '==', this.user.uid)
        .onSnapshot((querySnapshot) => {
          const movies = [];
          querySnapshot.forEach((doc) => {
            movies.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          this.movies = movies;
        });
    },
  },
  created() {
    authService.state
      .pipe(
        filter(user => user),
        take(1),
      ).subscribe((user) => {
        this.user = user;
        this.subscribeToMovies();
      });
  },
  beforeDestroy() {
    this.queryUnsubscribe();
  },
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
}

.movies {
  padding-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
}

.input {
  width: 100%;
}

.form {
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  position: fixed;
  display: block;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--background);
}

</style>
