<template>
  <div class="deleteChapter">
    <v-container>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Delete Chapter</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-select
              v-model="manga"
              :items="mangas"
              :rules="[v => !!v || 'Manga is required']"
              label="Manga"
              required
              @change="loadChapters"
            ></v-select>

            <v-select
              v-model="chapterNo"
              :items="chapters"
              :rules="chapterNoRules"
              label="Chapter Number"
              required
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mr-4" @click="remove">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  fetchMangas,
  getMangaWithChapters,
} from '@web/services/api/manga.service';
import { deleteChapter } from '@web/services/api/chapter.service';
import API from '@web/constants';

export default Vue.extend({
  name: 'DeleteChapter',
  data() {
    return {
      valid: true,
      chapterNo: null,
      chapters: [],
      chapterNoRules: [(v: any) => !!v || 'Chapter Number is required'],
      manga: null,
      mangas: [],
    };
  },
  methods: {
    loadMangas() {
      fetchMangas().then(({ data }) => {
        this.mangas = data.map((manga: any) => {
          return { text: manga.name, value: manga.id };
        });
      });
    },
    loadChapters() {
      getMangaWithChapters(this.manga + '').then(({ data }) => {
        console.log(data.chapters);
        this.chapters = data.chapters.map((chapter: any) => chapter.number);
      });
    },
    remove() {
      if (this.chapterNo === null) {
        return;
      }

      const payload = {
        mangaId: this.manga,
        chapterNo: this.chapterNo,
      };

      const formData = new FormData();
      formData.append('mangaId', this.manga);
      formData.append('chapterNo', this.chapterNo);

      console.log(JSON.stringify(payload));
      deleteChapter(this.manga + '', this.chapterNo + '')
        .then(res => {
          console.log(res);

          const index = this.chapters.findIndex(
            chapter => chapter.number == this.chapterNo,
          );
          this.chapters.splice(index);

          this.chapterNo = null;
        })
        .catch(console.log);
    },
  },
  created() {
    this.loadMangas();
  },
});
</script>
