<template>
  <div class="deleteUser">
    <v-container>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Delete User</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'User is required']"
              label="User"
              required
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mr-4" @click="remove">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  getUsers as fetchUsers,
  deleteUser,
} from '@web/services/api/user.service';

export default Vue.extend({
  name: 'DeleteUser',
  data() {
    return {
      select: null,
      items: [],
    };
  },
  methods: {
    loadUsers() {
      fetchUsers().then(({ data }) => {
        this.items = data.reduce((users: any[], user: any) => {
          if (this.$store.state.user.username !== user.username) {
            users.push({ text: user.username, value: user.uid });
          }
          return users;
        }, []);
      });
    },
    remove() {
      deleteUser(this.select + '').then(console.log);
    },
  },
  created() {
    this.loadUsers();
  },
});
</script>
