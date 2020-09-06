import { http } from "@/services/api/http.init";
import API from "@/constants";

function getUsers() {
  return http.get(API.USER.GET_USERS);
}

function createUser(payload: any) {
  return http.post(API.USER.CREATE_USER, payload);
}

function editUser(payload: any) {
  return http.put(API.USER.UPDATE_USER, payload);
}

function deleteUser(id: string) {
  return http.delete(API.USER.DELETE_USER.replace(":id", id));
}

export { getUsers, createUser, editUser, deleteUser };
