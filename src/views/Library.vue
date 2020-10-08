<template>
  <v-container>
    <div class="Library">
      <h1>Library</h1>

      <v-container>
        <v-row>
          <template v-for="manga in mangas">
            <v-col :key="manga.id" cols="6" md="2">
              <manga :manga="manga" />
            </v-col>
          </template>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Manga from '@web/components/Manga.vue';
import { fetchMangas } from '@web/services/api/manga.service';

export default Vue.extend({
  name: 'Library',
  data() {
    return {
      mangas: [],
    };
  },
  mounted() {
    fetchMangas()
      .then(({ data }) => {
        this.mangas = data;
      })
  },
  components: { Manga },
});
</script>
