<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="6" md="1" order="2" order-md="1">
        <v-btn block="true" @click="previousPage" class="center-vertically"
          >&lt;</v-btn
        >
      </v-col>
      <v-col cols="12" md="10" order="1" order-md="2">
        <div class="img-container">
          <img
            ref="image"
            class="page"
            :src="isUrlOrBuffer()"
            v-hammer:swipe="swipeHandler"
          />
        </div>
      </v-col>
      <v-col cols="6" md="1" order="3" order-md="3">
        <v-btn block="true" @click="nextPage" class="center-vertically"
          >&gt;</v-btn
        >
      </v-col>
      <v-col cols="12" md="1" order="4" order-md="4">
        <v-btn block="true" @click="getFullScreen" class="center-vertically"
          >FullScreen</v-btn
        >
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :left="x === 'left'"
      right="true"
      timeout="6000"
      top="true"
    >
      Use arrow keys to move between pages
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
  updateChapterProgress,
  getChapterProgress,
} from "@/services/api/chapter.service";
import { http } from "@/services/api/http.init";

export default Vue.extend({
  name: "Chapter",
  data() {
    return {
      snackbar: true,
      actualPage: 0,
      totalPages: 0,
      pages: [],
      authority: this.$store.state.authority,
    };
  },
  async created() {
    const pages = this.isPageListInVuex()
      ? this.$store.state.pagesUrls
      : await this.loadPages();
    this.totalPages = pages.length;
    this.pages = pages;
    console.log("Total pages: " + pages.length);

    const progress = await this.loadProgress();
    this.actualPage = progress;

    this.setEventListeners();
  },
  destroyed() {
    this.removeEventListeners();
  },
  methods: {
    isPageListInVuex() {
      const payload = {
        mangaId: parseInt(this.$route.params.mangaId),
        chapterNo: parseInt(this.$route.params.chapterNo),
      };

      return (
        JSON.stringify(payload) ===
          JSON.stringify(this.$store.state.actualChapterInfo) &&
        this.$store.state.pagesUrls.length > 1
      );
    },
    loadPages() {
      const payload = {
        mangaId: parseInt(this.$route.params.mangaId),
        chapterNo: parseInt(this.$route.params.chapterNo),
      };
      return this.$store.dispatch("prepareChapter", payload);
    },
    setEventListeners() {
      window.addEventListener("keyup", this.keyCodeManager);
    },
    removeEventListeners() {
      window.removeEventListener("keyup", this.keyCodeManager);
    },
    keyCodeManager(event: any) {
      const { keyCode } = event;

      const codes = {
        37: this.previousPage,
        39: this.nextPage,
      };

      if (!Object.keys(codes).includes(keyCode + "")) {
        return;
      }

      codes[keyCode]();
    },
    nextPage() {
      if (this.actualPage >= this.pages.length - 1) {
        return;
      }
      this.actualPage++;
      this.updateProgress();
      this.fetchExtraPage();
    },
    previousPage() {
      if (this.actualPage === 0) {
        return;
      }
      this.actualPage--;
      this.updateProgress();
    },
    updateProgress() {
      updateChapterProgress({
        mangaId: parseInt(this.$route.params.mangaId),
        chapterNo: parseInt(this.$route.params.chapterNo),
        page: this.actualPage,
      });
    },
    loadProgress() {
      return getChapterProgress({
        mangaId: parseInt(this.$route.params.mangaId),
        chapterNo: parseInt(this.$route.params.chapterNo),
      }).then(({ data }) => (data ? data.page : 0));
    },
    async fetchExtraPage() {
      const pageUrl: string = this.pages[this.actualPage + 2];

      if (pageUrl.startsWith("data")) {
        return;
      }

      const extraPageBase64 = await this.imageUrlToBase64(pageUrl);

      const urlSplitted = pageUrl.split(".");
      const extension = urlSplitted[urlSplitted.length - 1];

      this.pages[
        this.actualPage + 2
      ] = `data:image/${extension};base64,${extraPageBase64}`;
    },
    imageUrlToBase64(pageUrl: string) {
      return http
        .get(pageUrl, { responseType: "arraybuffer" })
        .then(({ data }) => Buffer.from(data, "binary").toString("base64"));
    },
    isUrlOrBuffer() {
      const page: string = this.pages[this.actualPage];
      if (!page) {
        return;
      }
      return page.startsWith("data") ? page : this.authority + page;
    },
    getFullScreen() {
      this.$refs.image.requestFullscreen();
    },
    swipeHandler(event: any) {
      const { direction } = event;
      // 4 is Swipe right, and 2 is swipe left
      direction == 4 ? this.previousPage() : this.nextPage();
    },
  },
  components: {},
});
</script>

<style scoped>
.page {
  /* background: blue; */
  max-height: 100%;
  height: 85vh;
}
.img-container {
  /* background: red; */
  text-align: center;
}
.center-vertically {
  top: 50%;
}
</style>
