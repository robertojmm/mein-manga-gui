<template>
  <div class="addManga">
    <v-container>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Add Manga</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="4">
                <img :src="poster" @click="openFilePicker" class="clickable" />
                <input type="file" @change="loadNewPoster" ref="filePicker" :hidden="true" />
              </v-col>
              <v-col cols="8">
                <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="loading" :disabled="loading" @click="createManga">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { uploadManga } from "@/services/api/manga.service";

export default Vue.extend({
  name: "AddManga",
  data() {
    return {
      loading: false,
      file: "",
      poster: "/not-found.jpg",
      valid: true,
      name: "",
      nameRules: [
        (v: any) => !!v || "Name is required",
        /* (v: any) =>
          (v && v.length <= 10) || "Name must be less than 10 characters", */
      ],
    };
  },
  methods: {
    loadNewPoster(event: any) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      this.poster = url;
      this.file = this.$refs.filePicker.files[0];
    },
    createManga() {
      if (!this.name || !this.file) {
        return;
      }

      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("name", this.name);

      this.loading = true;

      uploadManga(formData)
        .then(console.log)
        .finally(() => (this.loading = false));
    },
    openFilePicker() {
      this.$refs.filePicker.click();
    },
  },
});
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
