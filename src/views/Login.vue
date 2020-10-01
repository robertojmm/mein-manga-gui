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
                    v-on:keydown.enter="login()"
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    v-on:keydown.enter="login()"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <span class="login-error-message red--text">{{error}}</span>
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
import { makeLogin, checkLogin } from '@web/services/api/auth.service';

export default {
  name: 'Login',
  components: {},
  data: () => {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
    this.error = '';
      const payload = {
        username: this.username,
        password: this.password,
      };
      this.$store
        .dispatch('login', payload)
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          const ERROR_MESSAGES = {
            'auth-error': 'User or password incorrect',
            'unknow-error': 'Unknow server error'
          }
          if(error.response && error.response.status === 401){
            this.error = ERROR_MESSAGES['auth-error']
          }else{
            this.error = ERROR_MESSAGES['unknow-error']
          }
        });
    },
    register() {
      this.$router.push({ name: 'Register' });
    },
  },
  async created() {
    await checkLogin().then(() => this.$router.push({ name: 'Home' }));
  },
};
</script>
