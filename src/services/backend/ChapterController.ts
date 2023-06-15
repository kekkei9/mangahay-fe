import axiosClient from "@/services/backend/axiosClient";
import { Chapter } from "@/types/Chapter";

export const appendToHistory = async (chapter?: Chapter) => {
  if (!chapter || !chapter?.comicInfo) return;
  try {
    await axiosClient.post("/api/user/history", {
      id_comic: chapter.comicInfo.id,
      id_chapter: chapter.id,
    });
  } catch (e) {
    console.error(e);
  }
};
