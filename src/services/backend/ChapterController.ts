import axiosClient from "@/services/backend/axiosClient";
import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";

export const appendToHistory = async (chapter?: Chapter, comic?: Comic) => {
  if (!chapter || !comic) return;
  try {
    await axiosClient.post("/api/user/history", {
      id_comic: comic.id,
      id_chapter: chapter.id,
    });
  } catch (e) {
    console.error(e);
  }
};
