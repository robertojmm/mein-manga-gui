<template>
  <v-container>
    <div class="home">
      <h1>Home</h1>

      <v-container>
        <v-row>
          <v-col cols="12" md="6" v-if="latestUploads.length > 0">
            <h3>New Chapters</h3>
            <v-row>
              <template v-for="chapter in latestUploads">
                <v-col
                  :key="chapter.key"
                  cols="4"
                  md="4"
                  @click="chapter.redirectToChapter"
                  ><v-img
                    class="clickable"
                    :src="authority + chapter.coverWebPath"
                  />
                </v-col>
              </template>
            </v-row>
          </v-col>

          <v-col cols="12" md="6" v-if="continueReading.length > 0">
            <h3>Continue reading</h3>
            <v-row>
              <template v-for="chapter in continueReading">
                <v-col
                  :key="chapter.key"
                  cols="4"
                  md="4"
                  @click="chapter.redirectToChapter"
                  ><v-img
                    class="clickable"
                    :src="authority + chapter.coverWebPath"
                  />
                </v-col>
              </template>
            </v-row>
          </v-col>
        </v-row>
        <h3>Library</h3>
        <v-row>
          <template v-for="manga in mangas">
            <v-col :key="manga.id" cols="6" md="2">
              <manga :manga="manga" />
            </v-col>
          </template>
        </v-row>
      </v-container>
    </div>
    <loading :value="showLoading" message="Extracting manga..." />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Loading from "@/components/Loading.vue";
import Manga from "@/components/Manga.vue";
import { fetchMangas } from "@/services/api/manga.service";
import {
  continueReading,
  getLatestUploads,
} from "@/services/api/chapter.service";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      showLoading: false,
      mangas: [],
      authority: this.$store.state.authority,
      continueReading: [],
      latestUploads: [],
    };
  },
  mounted() {
    console.log("HOME MOUNTED");
    fetchMangas()
      .then(({ data }) => {
        this.mangas = data;
      })
      .then(() => {
        this.prepareContinueReading();
        this.prepareLatestUploads();
      });
  },
  methods: {
    prepareContinueReading() {
      const payload = {
        userId: this.$store.state.user.userId,
      };
      console.log(payload);
      continueReading(payload).then(({ data }) => {
        this.continueReading = data.map((userMangaChapter: any) => {
          return {
            key: userMangaChapter.chapter.id,
            coverWebPath: userMangaChapter.chapter.coverWebPath,
            redirectToChapter: () => {
              this.$router.push({
                name: "Chapter",
                params: {
                  mangaId: userMangaChapter.manga.id,
                  chapterNo: userMangaChapter.chapter.number,
                },
              });
            },
          };
        });
      });
    },
    prepareLatestUploads() {
      getLatestUploads().then(({ data }) => {
        this.latestUploads = data.map((chapter: any) => {
          return {
            key: chapter.id,
            coverWebPath: chapter.coverWebPath,
            redirectToChapter: () => {
              this.showLoading = true;

              const payload = {
                mangaId: chapter.manga.id,
                chapterNo: chapter.number,
              };

              this.$store.dispatch("prepareChapter", payload).then(() => {
                this.showLoading = false;
                this.$router.push({
                  name: "Chapter",
                  params: payload,
                });
              });
            },
          };
        });
      });
    },
  },
  components: { Manga, Loading },
});
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
