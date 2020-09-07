<template>
  <v-container>
    <div class="home">
      <h1>Home</h1>

      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
            v-if="continueReadingLoaded"
            @click="continueReading.click"
          >
            NEW CHAPTERS
          </v-col>
          <v-col cols="12" md="6" v-if="continueReadingLoaded">
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
import Vue from "vue";
import Manga from "@/components/Manga.vue";
import { fetchMangas } from "@/services/api/manga.service";
import { continueReading } from "@/services/api/chapter.service";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      mangas: [],
      authority: this.$store.state.authority,
      continueReadingLoaded: false,
      continueReading: [],
    };
  },
  mounted() {
    console.log("HOME MOUNTED");
    fetchMangas()
      .then(({ data }) => {
        this.mangas = data;
      })
      .then(this.prepareContinueReading);

    //this.prepareContinueReading();
  },
  methods: {
    prepareContinueReading() {
      const payload = {
        userId: this.$store.state.user.userId,
      };
      console.log(payload);
      continueReading(payload).then(({ data }) => {
        this.continueReadingLoaded = true;

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

        /* this.continueReading = {
          coverWebPath: data.chapter.coverWebPath,
          click: () => {
            this.$router.push({
              name: "Chapter",
              params: {
                mangaId: data.manga.id,
                chapterNo: data.chapter.number,
              },
            });
          },
        }; */
      });
    },
  },
  components: { Manga },
});
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
