<template>
  <div class="editChapter">
    <v-container>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Edit Chapter</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="8">
                <v-select
                  v-model="manga"
                  :items="mangas"
                  :rules="mangaRules"
                  label="Manga"
                  required
                  @change="loadChapters"
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="chapter"
                  :items="chapters"
                  :rules="mangaRules"
                  label="Chapter Number"
                  required
                  :disabled="!manga"
                  @change="chapterLoaded"
                />
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="1">
                <v-checkbox
                  v-model="activations.newChapterNo"
                  :disabled="!checkboxes"
                />
              </v-col>
              <v-col cols="11">
                <v-text-field
                  v-model="newChapterNo"
                  :counter="10"
                  :rules="nameRules"
                  label="New Chapter Number"
                  :disabled="!activations.newChapterNo"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="1">
                <v-checkbox
                  v-model="activations.newFile"
                  :disabled="!checkboxes"
                />
              </v-col>
              <v-col cols="11">
                <v-file-input
                  v-model="newFile"
                  show-size
                  label="Chapter file"
                  truncate-length="999"
                  :rules="fileRules"
                  :disabled="!activations.newFile"
                />
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="1">
                <v-checkbox
                  v-model="activations.newChapterPoster"
                  :disabled="!checkboxes"
                />
              </v-col>
              <v-col cols="11">
                <v-file-input
                  v-model="newChapterPoster"
                  show-size
                  label="New Chapter Poster"
                  truncate-length="999"
                  :rules="fileRules"
                  :disabled="!activations.newChapterPoster"
                />
              </v-col>
            </v-row>

            <v-row justify="center" align="center">
              <v-col cols="10">
                <progress-bar ref="progressBar" messageLoading="Uploading..." />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="mr-4"
            :disabled="!valid"
            @click="sendChapter"
            >Upload</v-btn
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
  getMangaWithChapters,
} from '@web/services/api/manga.service';
import {
  updateChapter,
  uploadChapter,
} from '@web/services/api/chapter.service';
import ProgressBar from '@web/components/ProgressBar.vue';

export default Vue.extend({
  name: 'EditChapter',
  data() {
    return {
      loading: false,
      newChapterNo: '',
      newFile: null,
      newChapterPoster: null,
      chapter: null,
      chapters: [],
      manga: null,
      mangas: [],
      nameRules: [(v: any) => !!v || 'Chapter number is required'],
      mangaRules: [(v: any) => !!v || 'Manga is required'],
      fileRules: [(v: any) => !!v || 'File is required'],
      checkboxes: false,
      activations: {
        newChapterNo: false,
        newFile: false,
        newChapterPoster: false,
      },
    };
  },
  computed: {
    valid: {
      get() {
        return (
          this.chapter !== null &&
          this.manga !== null &&
          (this.validateNewChapterNo() ||
            this.validateNewFile() ||
            this.validateNewChapterPoster())
        );
      },
      set(e) {
        console.log(e);
      },
    },
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
        this.chapters = data.chapters.map((chapter: any) => {
          return {
            text: chapter.number,
            value: chapter,
          };
        });
      });
    },
    chapterLoaded() {
      this.checkboxes = true;
    },
    validateNewChapterNo() {
      return this.activations.newChapterNo && this.newChapterNo;
    },
    validateNewFile() {
      return this.activations.newFile && this.newFile;
    },
    validateNewChapterPoster() {
      return this.activations.newChapterPoster && this.newChapterPoster;
    },
    sendChapter() {
      const formData = new FormData();

      if (this.validateNewChapterNo()) {
        formData.append('newChapterNo', this.newChapterNo);
      }

      if (this.validateNewFile()) {
        formData.append('newFile', this.newFile);
      }

      if (this.validateNewChapterPoster()) {
        formData.append('newChapterPoster', this.newChapterPoster);
      }

      this.loading = true;
      this.$refs.progressBar.reset();
      this.$refs.progressBar.loading();

      updateChapter(this.manga + '', this.chapter.number + '', formData)
        .then(res => {
          console.log(res);
          this.$refs.progressBar.success();
        })
        .catch(res => {
          console.log(res);
          this.$refs.progressBar.error();
        })
        .finally(() => (this.loading = false));
    },
  },
  created() {
    this.loadMangas();
  },
  components: { ProgressBar },
});
</script>
