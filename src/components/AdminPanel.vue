<template>
  <v-card class="mx-auto">
    <v-list dense>
      <div>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.icon"
          :value="false"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <div v-for="child in item.children" :key="child.title">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="child.route">
                  <v-list-item-title>{{ child.title }}</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-group>
      </div>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AdminPanel",
  data() {
    return {
      items: [
        {
          title: "Mangas",
          icon: "mdi-book-multiple",
          children: [
            {
              title: "Add Manga",
              icon: "mdi-book-plus",
              route: "/admin/manga/add",
            },
            {
              title: "Edit Manga",
              icon: "mdi-book-open-page-variant",
              route: "/admin/manga/edit",
            },
            {
              title: "Delete Manga",
              icon: "mdi-book-remove",
              route: "/admin/manga/delete",
            },
          ],
        },
        {
          title: "Chapters",
          icon: "mdi-bookmark",
          children: [
            {
              title: "Add Chapter",
              icon: "mdi-bookmark-plus",
              route: "/admin/chapter/add",
            },
            {
              title: "Edit Chapter",
              icon: "mdi-bookmark-outline",
              route: "/admin/chapter/edit",
            },
            {
              title: "Delete Chapter",
              icon: "mdi-bookmark-remove",
              route: "/admin/chapter/delete",
            },
          ],
        },
        {
          title: "Users",
          icon: "mdi-account",
          children: [
            {
              title: "Add User",
              icon: "mdi-account-plus",
              route: "/admin/user/add",
            },
            {
              title: "Edit User",
              icon: "mdi-account-star",
              route: "/admin/user/edit",
            },
            {
              title: "Delete User",
              icon: "mdi-account-remove",
              route: "/admin/user/delete",
            },
          ],
        },
        {
          title: "Settings",
          icon: "mdi-cog",
          children: [
            { title: "Unknown", icon: "mdi-cog", route: "/admin/user/add" },
          ],
        },
      ],
    };
  },
  methods: {},
});
</script>


<style lang="css" scoped>
.v-list-item__content > a {
  color: black;
  text-decoration: none;
  padding-left: 0.5em;
}

.v-list-item__title {
  padding-left: 0.5em;
}

.v-icon {
  padding-left: 0.3em;
}
</style>