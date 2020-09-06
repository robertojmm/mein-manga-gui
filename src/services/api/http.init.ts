import axios, { AxiosInstance } from "axios";
import store from "@/store";

let http: AxiosInstance;

function setAuthToken() {
  //http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  http.interceptors.request.use(function(config) {
    const token = store.state.token;
    config.headers.Authorization = `Bearer ${token}`; //localStorage.getItem("token"); //`Bearer ${token}`; // token;

    return config;
  });
}

function initHttp(baseURL: string) {
  http = axios.create({
    baseURL,
    /* headers: {
      Authorization: localStorage.getItem("token"),
    }, */
  });

  setAuthToken();

  console.log("HTTP INITIED");
}

export { http, initHttp, setAuthToken };
