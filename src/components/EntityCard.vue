<template>
  <router-link class="movie" :to="`/${movie.id}`">
    <div class="movie-header">
      <div class="movie-name">{{ movie.name }}</div>
      <div class="movie-edit-btn">
        <svg><use xlink:href="#edit"></use></svg>
      </div>
    </div>
    <div class="movie-last-watched">
      Просмотрено {{ timesWatched }} {{ ['раз', 'раза', 'раза'] | noun(timesWatched) }}.<br />
      В последний раз: {{ lastWatched }}
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['movie'],
  computed: {
    timesWatched() {
      return Object.keys(this.movie.views).length;
    },
    lastWatched() {
      return new Date(Math.max(...Object.keys(this.movie.views))).toLocaleDateString();
    },
  },
};
</script>

<style>
.movie {
  padding-bottom: 10px;
  width: 300px;
  padding-top: 10px;
  padding-left: 15px;
  background-color: white;
  padding-right: 15px;
  margin-right: 5px;
  margin-bottom: 10px;
  margin-left: 5px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2);
  display: flex;
  flex-direction: column;
}

.movie-last-watched {
  font-size: 0.75em;
}

.movie-header {
  flex-grow: 1;
  padding-bottom: 10px;
  font-size: 1.125em;
  display: flex;
}

.movie-name {
  flex-grow: 1;
  padding-right: 5px;
}

.movie-edit-btn {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  opacity: 0.2;
  color: inherit;
}
</style>
