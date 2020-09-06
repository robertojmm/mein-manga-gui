<template>
  <v-container>
    <div class="home">
      <h1>Home</h1>

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

<script>
import Vue from "vue";
import Manga from "@/components/Manga.vue";
import { fetchMangas } from "@/services/api/manga.service";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      mangas: [],
    };
  },
  mounted() {
    console.log("HOME MOUNTED");
    fetchMangas().then(({ data }) => {
      this.mangas = data;
    });
  },
  components: { Manga },
});
</script>
