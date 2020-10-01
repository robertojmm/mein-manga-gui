import { http, setAuthToken } from '@web/services/api/http.init';
import API from '@web/constants';

function makeLogin(payload: { username: string; password: string }) {
  return http.post(API.AUTH.LOGIN, payload);
}

function checkLogin() {
  return http.get(API.AUTH.PROFILE).then(({ data }) => {
    return data;
  });
}

function logOut() {
  localStorage.removeItem('token');
}

export { makeLogin, logOut, checkLogin };
