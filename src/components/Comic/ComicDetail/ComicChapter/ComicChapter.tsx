import { Chapter } from "@/types/Chapter";
import { Comic } from "@/types/Comic";
import { formatDate } from "@/utils/date";
import { normalizeChapterArray } from "@/utils/normalizeData";
import Link from "next/link";

interface IComicChapterProps {
  comic?: Comic;
  chapters?: Chapter[];
}

const ComicChapter = ({ comic, chapters }: IComicChapterProps) => {
  return (
    <div className="p-4 bg-white shadow-md">
      <h2 className="text-lg font-medium mb-4">Chapter List</h2>
      <div className="max-h-96 scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-gray-200 overflow-y-scroll">
        <ul className="py-2 ">
          {normalizeChapterArray(chapters)?.map((chap: any) => (
            <li
              key={chap.name}
              className="flex justify-between py-2 border-b border-gray-200"
            >
              <Link
                href={`/comic/${comic?.slug}/${chap.slug}`}
                className="text-black visited:text-slate-300"
              >
                {chap.name}
              </Link>
              <span className="text-gray-400 text-sm mr-5">
                {formatDate(chap.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComicChapter;
