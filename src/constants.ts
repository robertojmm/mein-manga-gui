const API = {
  AUTH: {
    LOGIN: `/auth/login`,
    PROFILE: `/auth/profile`,
  },
  CHAPTER: {
    UPLOAD_CHAPTER: "/manga/:id/chapters",
    DELETE_CHAPTER: "/manga/:mangaId/chapters/:chapterNo",
    PREPARE_CHAPTER: "/manga/prepareChapter",
    GET_CHAPTER_PROGRESS: "/manga/getChapterProgress",
    UPDATE_CHAPTER_PROGRESS: "/manga/updateChapterProgress",
  },
  MANGA: {
    GET_MANGAS: `/manga`,
    CREATE_MANGA: `/manga`,
    DELETE_MANGA_WITH_CHATPERS: "/manga/deleteManga/:id",
    GET_MANGA_AND_CHAPTERS: `/manga/:id/chapters`,
  },
  USER: {
    GET_USERS: "/users",
    CREATE_USER: "/users",
    UPDATE_USER: "/users",
    DELETE_USER: "/users/:id",
  },
};

export default API;
