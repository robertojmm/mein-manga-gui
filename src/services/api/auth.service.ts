import { http, setAuthToken } from "@/services/api/http.init";
import API from "@/constants";

function makeLogin(payload: { username: string; password: string }) {
  return http
    .post(API.AUTH.LOGIN, payload)
    .then(({ data }) => {
      const token = data.access_token;
      localStorage.setItem("token", token);
      setAuthToken();
      return token;
    })
    .catch((error) => console.error(error));
}

function checkLogin() {
  return http.get(API.AUTH.PROFILE).then(({ data }) => {
    return data;
  });
}

function logOut() {
  localStorage.removeItem("token");
}

export { makeLogin, logOut, checkLogin };
