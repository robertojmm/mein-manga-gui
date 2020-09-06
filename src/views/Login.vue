<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { makeLogin, checkLogin } from "@/services/api/auth.service";

export default {
  name: "Login",
  components: {},
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const payload = {
        username: this.username,
        password: this.password,
      };
      this.$store
        .dispatch("login", payload)
        //makeLogin(payload)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => console.error(error));
    },
    register() {
      this.$router.push({ name: "Register" });
    },
  },
  async created() {
    await checkLogin().then(() => this.$router.push({ name: "Home" }));
  },
};
</script>
