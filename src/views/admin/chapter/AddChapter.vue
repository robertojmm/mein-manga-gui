<template>
  <div class="addChapter">
    <v-container>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Add Chapter</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="chapterNo"
              :counter="10"
              :rules="nameRules"
              label="Chapter Number"
              required
            ></v-text-field>

            <v-select v-model="manga" :items="mangas" :rules="mangaRules" label="Manga" required></v-select>
            <v-file-input
              v-model="file"
              show-size
              label="Chapter file"
              truncate-length="999"
              :rules="fileRules"
            />
            <v-row justify="center" align="center">
              <v-container>
                <progress-bar ref="progressBar" messageLoading="Uploading..." />
              </v-container>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mr-4" :disabled="loading" @click="sendChapter">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { fetchMangas } from "@/services/api/manga.service";
import { uploadChapter } from "@/services/api/chapter.service";
import ProgressBar from "@/components/ProgressBar.vue";

export default Vue.extend({
  name: "AddChapter",
  data() {
    return {
      loading: false,
      valid: true,
      file: "",
      chapterNo: "",
      nameRules: [
        (v: any) => !!v || "Name is required",
        /* (v: any) =>
          (v && v.length <= 10) || "Name must be less than 10 characters", */
      ],
      mangaRules: [(v: any) => !!v || "Manga is required"],
      fileRules: [(v: any) => !!v || "File is required"],
      manga: null,
      mangas: [],
    };
  },
  methods: {
    getMangas() {
      fetchMangas().then(({ data }) => {
        this.mangas = data.map((manga: any) => {
          return { text: manga.name, value: manga.id };
        });
      });
    },
    sendChapter() {
      if (!this.chapterNo || !this.manga || !this.file) {
        return;
      }

      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("number", this.chapterNo);

      this.loading = true;
      this.$refs.progressBar.reset();
      this.$refs.progressBar.loading();

      uploadChapter(this.manga + "", formData)
        .then((res) => {
          console.log(res);
          this.$refs.progressBar.success();
        })
        .catch((res) => {
          console.log(res);
          this.$refs.progressBar.error();
        })
        .finally(() => (this.loading = false));
    },
  },
  created() {
    this.getMangas();
  },
  components: { ProgressBar },
});
</script>
