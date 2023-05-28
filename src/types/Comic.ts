import { Chapter } from "./Chapter";

export type Genre = {
  slug: string;
  genre: string;
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
};
