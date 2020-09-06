import Vue from "vue";
import Vuex from "vuex";
import { makeLogin, checkLogin, logOut } from "@/services/api/auth.service";
import { prepareChapter } from "@/services/api/chapter.service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {
      userId: 0,
      username: "",
      roles: [""],
    },
    pagesUrls: [""],
    authority: "",
  },
  mutations: {
    authRequest(state) {
      state.status = "loading";
    },
    authSuccess(state, token) {
      state.status = "success";
      state.token = token;
    },
    authError(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = {
        userId: 0,
        username: "",
        roles: [""],
      };
      state.pagesUrls = [""];
    },
    loadUser(state, user) {
      state.user = user;
    },
    savePageUrls(state, pageUrls) {
      state.pagesUrls = pageUrls;
    },
    setAuthority(state, authority) {
      state.authority = authority;
    },
  },
  actions: {
    login({ commit, dispatch }, user) {
      return new Promise((resolve, reject) => {
        commit("authRequest");
        makeLogin(user).then((token) => {
          commit("authSuccess", token);
          dispatch("loadUser");
          resolve();
        });
      });
    },
    loadUser({ commit }) {
      return checkLogin().then((user) => commit("loadUser", user));
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        logOut();
        resolve();
      });
    },
    prepareChapter({ commit }, payload) {
      return prepareChapter(payload).then(({ data }) => {
        commit("savePageUrls", data);
        return data;
      });
    },
    setAuthority({ commit }, authority) {
      return new Promise((resolve) => {
        commit("setAuthority", authority);
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    userIsAdmin: (state) => state.user.roles.includes("admin"),
  },
});
