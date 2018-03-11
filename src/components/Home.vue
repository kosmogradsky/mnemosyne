<template>
  <div class="root">
    <div class="header">
      Mnemosyne
    </div>
    <div class="movies">
      <div
        class="movie"
        v-for="(movie, index) in movies"
        :key="index"
      >
        <div>{{ movie.name }}</div>
        <div class="last-watched">
          В последний раз просмотрено: {{ new Date(movie.lastWatched).toLocaleDateString() }}
        </div>
      </div>
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

export default {
  name: 'home',
  components: {
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
        lastWatched: Date.now(),
        uid: this.user.uid,
      });

      this.newMovieName = '';
    },
    subscribeToMovies() {
      if (this.queryUnsubscribe) this.queryUnsubscribe();
      this.queryUnsubscribe = db.collection('movies')
        .where('uid', '==', this.user.uid)
        .orderBy('lastWatched', 'desc')
        .onSnapshot((querySnapshot) => {
          const movies = [];
          querySnapshot.forEach((doc) => {
            movies.push(doc.data());
          });
          this.movies = movies;
        });
    },
  },
  created() {
    this.$subscribeTo(
      authService.state.pipe(filter(user => user)),
      (user) => {
        this.user = user;
        this.subscribeToMovies();
      },
    );
  },
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: var(--primary);
  box-shadow: 0 2px 5px rgba(0,0,0,.26);
  padding: 17px 15px;
  color: white;
}

.movie {
  padding-bottom: 10px;
}

.last-watched {
  font-size: 0.8em;
}

.movies {
  padding: 10px 15px;
  overflow: auto;
  flex-grow: 1;
}

.input {
  width: 100%;
}

.form {
  padding: 10px 15px;
}

</style>
