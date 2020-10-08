<template>
  <v-container>
    <div class="home">
      <h1>Home</h1>

      <v-container>
        <v-row>
          <v-col cols="12" >
            <h3>New Chapters</h3>
            <v-row>
              <template v-for="chapter in latestUploads">
                <v-col
                  :key="chapter.key"
                  cols="2"
                  @click="chapter.redirectToChapter"
                  ><v-img
                    class="clickable"
                    :src="authority + chapter.coverWebPath"
                  />
                </v-col>
              </template>
            </v-row>
          </v-col>
          
          <v-col cols="12">
            <h3>Continue reading</h3>
            <v-row>
              <template v-for="chapter in continueReading">
                <v-col
                  :key="chapter.key"
                  cols="2"
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
      </v-container>
    </div>
    <loading :value="showLoading" message="Extracting manga..." />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Loading from '@web/components/Loading.vue';
import {
  continueReading,
  getLatestUploads,
} from '@web/services/api/chapter.service';

export default Vue.extend({
  name: 'Home',
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
    console.log('HOME MOUNTED');
    new Promise(resolve => setTimeout(resolve, 0)).then(() => {
      this.prepareContinueReading();
      this.prepareLatestUploads();
    })
  },
  methods: {
    prepareContinueReading() {

      const userId = this.$store.state.user.userId;
      const time = userId == 0 ? 500 : 0;

      //TODO - Improve this.
      setTimeout(() => {

        const payload = {
          userId: this.$store.state.user.userId
        };

        console.log(payload);
        continueReading(payload).then(({ data }) => {
          this.continueReading = data.map((userMangaChapter: any) => {
            return {
              key: userMangaChapter.chapter.id,
              coverWebPath: userMangaChapter.chapter.coverWebPath,
              redirectToChapter: () => {
                this.$router.push({
                  name: 'Chapter',
                  params: {
                    mangaId: userMangaChapter.manga.id,
                    chapterNo: userMangaChapter.chapter.number,
                  },
                });
              },
            };
          });
        });


      }, time)
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

              this.$store.dispatch('prepareChapter', payload).then(() => {
                this.showLoading = false;
                this.$router.push({
                  name: 'Chapter',
                  params: payload,
                });
              });
            },
          };
        });
      });
    },
  },
  components: { Loading },
});
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
