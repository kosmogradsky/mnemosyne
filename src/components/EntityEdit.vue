<template>
  <div class="root">
    <div class="card">
      <form @submit.prevent="save">
        <input type="text" class="entity-name-input input" v-model="movie.name">

        <div class="buttons">
          <button type="submit" class="save">Сохранить</button>
          <button type="button" class="watch-again">Пересмотреть</button>
        </div>
      </form>
      <div class="entity-view-history">
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/main';

export default {
  data() {
    return {
      movie: {},
    };
  },
  props: ['id'],
  methods: {
    save() {
      db.collection('movies').doc(this.id)
        .set(this.movie);
    },
  },
  watch: {
    $route: {
      handler() {
        this.queryUnsubscribe = db.collection('movies').doc(this.id)
          .onSnapshot((doc) => {
            this.movie = doc.data();
          });
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.queryUnsubscribe();
  },
};
</script>

<style scoped>

.root {
  padding-left: 15px;
  padding-right: 15px;
}

.card {
  padding-bottom: 30px;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: white;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2);
}

.entity-name-input {
  font-size: 1.25em;
  width: 100%;
}

.buttons {
  margin-top: 15px;
}

.watch-again {
  margin-left: 1em;
}

.save {
  background-color: var(--primary);
  color: white;
}

</style>

