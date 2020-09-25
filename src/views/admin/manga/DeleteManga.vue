<template>
  <div class="deleteManga">
    <v-container>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Delete Manga</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Manga is required']"
              label="Manga"
              required
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="mr-4"
            :loading="loading"
            :disabled="loading"
            @click="deleteManga"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  fetchMangas,
  deleteMangaWithChapters,
} from '@web/services/api/manga.service';

export default Vue.extend({
  name: 'DeleteManga',
  data() {
    return {
      loading: false,
      select: {},
      items: [{ text: 'a' }, { text: 'ba' }],
    };
  },
  methods: {
    getMangas() {
      fetchMangas().then(({ data }) => {
        this.items = data.map((manga: any) => {
          return { text: manga.name, value: manga.id };
        });
      });
    },
    deleteManga() {
      this.loading = true;
      deleteMangaWithChapters(this.select + '')
        .then(res => {
          console.log(res);
          this.removeFromSelect();
        })
        .finally(() => (this.loading = false));
    },
    removeFromSelect() {
      const mangaPosition = this.items.findIndex(
        manga => manga.value == this.select,
      );
      this.items.splice(mangaPosition);
    },
  },
  created() {
    this.getMangas();
    console.log(this);
  },
});
</script>
