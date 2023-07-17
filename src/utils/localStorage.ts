import { Chapter, HistoryChapter } from "@/types/Chapter";

const LOCAL_HISTORY_KEY = "history";
const isClient = typeof window !== "undefined";

export const getAllLocalComicHistory = (): HistoryChapter[] =>
  isClient && JSON.parse(localStorage.getItem(LOCAL_HISTORY_KEY) || "[]");

export const getLocalComicHistory = (page: number, pageSize: number) =>
  isClient &&
  getAllLocalComicHistory().slice((page - 1) * pageSize, page * pageSize);

export const appendToLocalHistory = (historyChapter: HistoryChapter) => {
  if (!isClient) return;
  const currentHistory = getAllLocalComicHistory();
  localStorage.setItem(
    LOCAL_HISTORY_KEY,
    JSON.stringify([historyChapter, ...currentHistory])
  );
};
