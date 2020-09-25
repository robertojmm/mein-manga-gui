<template>
  <div class="editUser">
    <v-container>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Edit User</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-select
            v-model="user"
            :items="users"
            :rules="[v => !!v || 'User is required']"
            label="User"
            required
          ></v-select>
          <user-form :user="user"></user-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="sendRequest">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  getUsers as fetchUsers,
  editUser,
} from '@web/services/api/user.service';
import UserForm from '@web/components/UserForm.vue';

export default Vue.extend({
  name: 'EditUser',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        roles: 'user',
      },
      users: [],
    };
  },
  methods: {
    loadUsers() {
      fetchUsers().then(({ data }) => {
        this.users = data.map((user: any) => {
          return { text: user.username, value: user };
        });
      });
    },
    sendRequest() {
      editUser(this.user).then(console.log);
    },
  },
  created() {
    this.loadUsers();
  },
  components: { UserForm },
});
</script>
