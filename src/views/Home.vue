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
          Последний раз просмотрено: {{ new Date(movie.lastWatched).toLocaleDateString() }}
        </div>
      </div>
    </div>
    <form action="" @submit.prevent="addMovie">
      <input
        type="text"
        class="input"
        placeholder="Добавить фильм"
        v-model="newMovieName"
      >
    </form>
  </div>
</template>

<script>
import firebase from '@firebase/app';

export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      newMovieName: '',
      movies: {},
    };
  },
  methods: {
    addMovie() {
      const newMovieRef = this.ref.push();
      newMovieRef.set({
        name: this.newMovieName,
        lastWatched: Date.now(),
      });

      this.newMovieName = '';
    },
  },
  watch: {
    '$store.state.user': {
      immediate: true,
      handler: function watchAuth(user) {
        if (user) {
          if (this.ref) this.ref.off();
          this.ref = firebase.database().ref(`/${user.uid}/movies`);
          this.ref.on('value', (snapshot) => { this.movies = snapshot.val(); });
        }
      },
    },
  },
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  padding: 15px;
  overflow: auto;
  flex-grow: 1;
}

.input {
  height: 40px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}

</style>
