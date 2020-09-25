<template>
  <div class="addUser">
    <v-container>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Create User</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <user-form :user="user"></user-form>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="sendRequest">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createUser } from '@web/services/api/user.service';
import UserForm from '@web/components/UserForm.vue';

export default Vue.extend({
  name: 'AddUser',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        roles: 'user',
      },
      valid: true,
    };
  },
  methods: {
    sendRequest() {
      if (!this.user.username || !this.user.email || !this.user.password) {
        return;
      }

      createUser(this.user).then(console.log);
    },
  },
  components: { UserForm },
});
</script>
