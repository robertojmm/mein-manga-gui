import { http } from "@/services/api/http.init";
import API from "@/constants";

function fetchMangas() {
  return http.get(API.MANGA.GET_MANGAS);
}

function uploadManga(payload: any) {
  return http.post(API.MANGA.CREATE_MANGA, payload);
}

function deleteMangaWithChapters(id: string) {
  return http.delete(API.MANGA.DELETE_MANGA_WITH_CHATPERS.replace(":id", id));
}

function getMangaWithChapters(mangaId: string) {
  return http.get(API.MANGA.GET_MANGA_AND_CHAPTERS.replace(":id", mangaId));
}

export {
  fetchMangas,
  uploadManga,
  deleteMangaWithChapters,
  getMangaWithChapters,
};
