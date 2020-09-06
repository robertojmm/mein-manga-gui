<template>
  <div>
    <v-row>
      <v-progress-linear height="8" :indeterminate="isLoading" :value="value" :color="color"></v-progress-linear>
    </v-row>
    <v-row>
      <h2>{{ message }}</h2>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ProgressBar",
  data: function () {
    return {
      isLoading: false,
      value: 0,
      color: "light-blue",
      message: "",
    };
  },
  props: {
    messageLoading: String,
    messageSuccess: { type: String, default: "Success" },
    messageError: { type: String, default: "Error" },
  },
  methods: {
    loading() {
      this.isLoading = true;
      this.value = 100;
      this.message = this.messageLoading;
    },
    success() {
      this.isLoading = false;
      this.color = "success";
      this.message = this.messageSuccess;
    },
    error() {
      this.isLoading = false;
      this.color = "error";
      this.message = this.messageError;
    },
    reset() {
      this.isLoading = false;
      this.value = 0;
      this.color = "light-blue";
      this.message = "";
    },
  },
});
</script>