<template>
  <v-card-text>
    <v-form>
      <v-text-field
        v-model="user.username"
        label="Username"
        name="username"
        prepend-icon="mdi-account"
        type="text"
        :rules="usernameRules"
      ></v-text-field>

      <v-text-field
        v-model="user.email"
        label="Email"
        name="email"
        prepend-icon="mdi-email"
        type="text"
        :rules="emailRules"
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        label="Password"
        name="password"
        prepend-icon="mdi-lock"
        type="password"
        :rules="passwordRules"
      ></v-text-field>

      <v-select
        v-model="role"
        label="Role"
        name="role"
        prepend-icon="mdi-account-multiple"
        :items="roles"
        :rules="[v => !!v || 'Role is required']"
        required
      ></v-select>
    </v-form>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "UserForm",
  data() {
    return {
      roles: ["user", "admin"],
      usernameRules: [
        (v: any) => !!v || "Name is required",
        /* (v: any) =>
          (v && v.length <= 10) || "Name must be less than 10 characters", */
      ],
      emailRules: [
        (v: any) => !!v || "Email is required",
        /* (v: any) =>
          (v && v.length <= 10) || "Name must be less than 10 characters", */
      ],
      passwordRules: [
        (v: any) => !!v || "Password is required",
        /* (v: any) =>
          (v && v.length <= 10) || "Name must be less than 10 characters", */
      ],
    };
  },
  computed: {
    role: {
      get() {
        return this.user.roles.includes("admin") ? "admin" : "user";
      },
      set(e) {
        this.user.roles = e === "admin" ? ["user", "admin"] : ["user"];
      },
    },
  },
  props: {
    user: Object,
  },
});
</script>