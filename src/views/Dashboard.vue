<template>
  <v-app>
    <div id="main-container">
      <drawer :open.sync="drawer" :items="drawerItems" />
      <div class="container">
        <v-app-bar app dense clipped-left color="indigo" dark>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>Mein-Manga</v-toolbar-title>
        </v-app-bar>
        <div id="content">
          <v-main>
            <router-view />
          </v-main>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue';
import Drawer from '@/components/Drawer.vue';

export default Vue.extend({
  name: 'Dashboard',
  data: () => {
    return {
      drawer: true,
      drawerItems: [
        { title: 'Home', icon: 'mdi-home', route: '/' },
        {
          title: 'Admin',
          icon: 'mdi-lock-open',
          route: '/admin',
          requiresAdmin: true,
        },
        { title: 'Settings', icon: 'mdi-cog', route: '/settings' },
        { title: 'About', icon: 'mdi-information', route: '/about' },
      ],
    };
  },
  components: {
    Drawer,
  },
});
</script>
