<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { checkLogin } from "@/services/api/auth.service";

export default Vue.extend({
  name: "App",
  beforeCreate() {
    this.$store.dispatch("loadUser");
    //checkLogin()
    //.then(() => this.$router.push({ name: "Home" }))
    //.catch(() => this.$router.push({ name: "Login" }));
  },
});
</script>
