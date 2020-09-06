<template>
  <v-card @click="moveToDetails">
    <v-img :src="authority + manga.coverWebPath" />
    <v-card-title>{{ manga.name }}</v-card-title>
    <v-card-subtitle>Chapters: {{ manga.chapterAmount }}</v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Manga",
  data() {
    return {
      authority: this.$store.state.authority,
    };
  },
  props: {
    manga: Object,
  },
  methods: {
    moveToDetails() {
      this.$router.push({ name: "Manga", params: { id: this.manga.id } });
    },
  },
});
</script>
