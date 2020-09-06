import { http } from "@/services/api/http.init";
import API from "@/constants";
import store from "@/store";

function uploadChapter(mangaId: string, payload: any) {
  return http.post(API.CHAPTER.UPLOAD_CHAPTER.replace(":id", mangaId), payload); // file, number
}

function deleteChapter(mangaId: string, chapterNo: string) {
  console.log(store.state.authority);
  /* return fetch(`${store.state.authority}${API.CHAPTER.DELETE_CHAPTER}`, {
    method: "DELETE",
    body: payload,
    headers: new Headers({
      Authorization: `Bearer ${store.state.token}`,
    }),
  }); */
  return http.delete(
    API.CHAPTER.DELETE_CHAPTER.replace(":mangaId", mangaId).replace(
      ":chapterNo",
      chapterNo
    )
  ); // mangaId, ChapterNo
}

function prepareChapter(payload: any) {
  return http.post(API.CHAPTER.PREPARE_CHAPTER, payload);
}

function updateChapterProgress(payload: any) {
  return http.post(API.CHAPTER.UPDATE_CHAPTER_PROGRESS, payload);
}

function getChapterProgress(payload: any) {
  return http.post(API.CHAPTER.GET_CHAPTER_PROGRESS, payload);
}

export {
  uploadChapter,
  deleteChapter,
  prepareChapter,
  updateChapterProgress,
  getChapterProgress,
};
