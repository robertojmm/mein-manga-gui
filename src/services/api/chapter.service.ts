import { http } from "@/services/api/http.init";
import API from "@/constants";
import store from "@/store";

function uploadChapter(mangaId: string, payload: any) {
  return http.post(API.CHAPTER.UPLOAD_CHAPTER.replace(":id", mangaId), payload); // file, number
}

function updateChapter(mangaId: string, chapterNo: string, payload: any) {
  return http.put(
    API.CHAPTER.UPDATE_CHAPTER.replace(":id", mangaId).replace(
      ":chapterNo",
      chapterNo
    ),
    payload
  );
}

function deleteChapter(mangaId: string, chapterNo: string) {
  return http.delete(
    API.CHAPTER.DELETE_CHAPTER.replace(":mangaId", mangaId).replace(
      ":chapterNo",
      chapterNo
    )
  );
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
  updateChapter,
  deleteChapter,
  prepareChapter,
  updateChapterProgress,
  getChapterProgress,
};
