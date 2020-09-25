<template>
  <v-container>
    <h1>{{ manga.name }}</h1>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" md="3">
          <v-img :src="authority + manga.coverWebPath" />
        </v-col>
        <v-col cols="12" md="9">
          <v-container>
            <v-row>
              <template v-for="chapter in manga.chapters">
                <v-col
                  :key="chapter.id"
                  cols="6"
                  md="3"
                  @click="() => readChapter(chapter)"
                >
                  <v-img
                    class="clickable"
                    :src="authority + chapter.coverWebPath"
                  />
                </v-col>
              </template>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <loading :value="showLoading" message="Extracting manga..." />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Loading from '@web/components/Loading.vue';
import { getMangaWithChapters } from '@web/services/api/manga.service';

export default Vue.extend({
  name: 'Manga',
  data() {
    return {
      manga: {},
      authority: this.$store.state.authority,
      showLoading: false,
    };
  },
  mounted() {
    const mangaId = this.$route.params.id;
    getMangaWithChapters(mangaId)
      .then(({ data }) => (this.manga = data))
      .catch(() => this.$router.push({ name: 'NotFound' }));
  },
  methods: {
    readChapter(chapter) {
      console.log(chapter);
      const payload = {
        mangaId: this.manga.id,
        chapterNo: chapter.number,
      };

      this.showLoading = true;
      this.$store.dispatch('prepareChapter', payload).then(() => {
        this.showLoading = false;
        this.$router.push({
          name: 'Chapter',
          params: { mangaId: this.manga.id, chapterNo: chapter.number },
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