<template>
  <v-navigation-drawer
    app
    clipped
    v-model="drawer"
    :expand-on-hover="true"
    :mini-variant="true"
    dark
    fixed
  >
    <v-list dense nav class="py-0">
      <!-- <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Application</v-list-item-title>
          <v-list-item-subtitle>Subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>-->

      <div v-for="item in items" :key="item.title">
        <v-list-item v-if="showItem(item)" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link :to="item.route">{{ item.title }}</router-link>
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-divider />

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content @click="logout">
          <router-link to="./">Logout</router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Drawer",
  props: {
    open: Boolean,
    items: Array,
  },
  computed: {
    drawer: {
      get() {
        return this.open;
      },
      set(state) {
        this.$emit("update:open", state);
      },
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push({ name: "Login" }));
    },
    userIsAdmin(): boolean {
      return this.$store.getters.userIsAdmin;
    },
    showItem(item: any) {
      return item.requiresAdmin ? this.userIsAdmin() : true;
    },
  },
});
</script>


<style lang="css" scoped>
.v-list-item__content > a {
  color: white;
  text-decoration: none;
  padding-left: 1.5em;
}
</style>