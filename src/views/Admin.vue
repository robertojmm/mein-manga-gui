<template>
  <v-container>
    <div class="admin">
      <h1>Admin</h1>

      <v-container>
        <v-row>
          <v-col cols="2">
            <admin-panel />
          </v-col>
          <v-spacer />
          <v-col cols="9">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminPanel from '@web/components/AdminPanel.vue';

export default Vue.extend({
  name: 'Admin',
  data() {
    return {
      items: [
        {
          title: 'Mangas',
          icon: 'mdi-book-multiple',
          children: [
            {
              title: 'Add Manga',
              icon: 'mdi-book-plus',
              route: '/admin/user/add',
            },
            {
              title: 'Edit Manga',
              icon: 'mdi-book-open-page-variant',
              route: '/admin/user/add',
            },
            {
              title: 'Delete Manga',
              icon: 'mdi-book-remove',
              route: '/admin/user/add',
            },
          ],
        },
        {
          title: 'Chapters',
          icon: 'mdi-bookmark',
          children: [
            {
              title: 'Add Chapter',
              icon: 'mdi-bookmark-plus',
              route: '/admin/user/add',
            },
            {
              title: 'Edit Chapter',
              icon: 'mdi-bookmark-outline',
              route: '/admin/user/add',
            },
            {
              title: 'Delete Chapter',
              icon: 'mdi-bookmark-remove',
              route: '/admin/user/add',
            },
          ],
        },
        {
          title: 'Users',
          icon: 'mdi-account',
          children: [
            {
              title: 'Add User',
              icon: 'mdi-account-plus',
              route: '/admin/user/add',
            },
            {
              title: 'Edit User',
              icon: 'mdi-account-star',
              route: '/admin/user/add',
            },
            {
              title: 'Delete User',
              icon: 'mdi-account-remove',
              route: '/admin/user/add',
            },
          ],
        },
        {
          title: 'Settings',
          icon: 'mdi-cog',
          children: [
            { title: 'Unknown', icon: 'mdi-cog', route: '/admin/user/add' },
          ],
        },
      ],
    };
  },
  components: { AdminPanel },
});
</script>

<style>
.border {
  border: 3px solid black;
  height: 80vh;
  border-radius: 20px;
}
</style>