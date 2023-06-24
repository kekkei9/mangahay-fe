import { Chapter } from "./Chapter";

export type Genre = {
  slug: string;
  genre: string;
};

export type ComicAuthStatus = {
  isEvaluate: boolean;
  isFollow: boolean;
  isLike: boolean;
};

export type Comic = {
  another_name: string;
  authors: string[];
  brief_desc: string;
  createdAt: string;
  follow: number;
  genres: string[];
  id: number;
  id_owner: number;
  like: number;
  name: string;
  new_chapter?: Chapter;
  slug: string;
  star: string;
  state: "Đang tiến hành" | string;
  thumb: string;
  updatedAt: string;
  view: number;
  newest_chapter_name?: string;
  newest_chapter_slug?: string;
  newest_chapter_id?: number;
};

export type FollowingComic = {
  follow_comic_id_user: number;
  follow_comic_id_comic: number;
  comics_id: number;
  comics_slug: string;
  comics_name: string;
  comics_another_name: string;
  comics_genres: string[];
  comics_authors: string[];
  comics_state: string;
  comics_thumb: string;
  comics_brief_desc: string;
  comics_view: number;
  comics_like: number;
  comics_follow: number;
  comics_star: string;
  comics_id_owner: number;
  comics_createdAt: string;
  comics_updatedAt: string;
};
