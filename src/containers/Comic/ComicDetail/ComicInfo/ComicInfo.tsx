import Link from "next/link";
import classes from "./ComicDetail.module.sass";
import { Skeleton } from "primereact/skeleton";
import { Comic } from "@/types/Comic";
import ComicInteractPanel from "./ComicInteractPanel";
import { Toast } from "primereact/toast";
import { RefObject, useRef } from "react";
import { KeyedMutator } from "swr";
import { Response } from "@/types/Response.type";
import { Chapter } from "@/types/Chapter";

interface IComicInfoProps {
  comic?: Comic;
  mutateComic?: KeyedMutator<
    Response<{
      chapters: Chapter[];
      comic: Comic;
    }>
  >;
}

const ComicInfo = ({ comic, mutateComic }: IComicInfoProps) => {
  return (
    <>
      <div className={classes.comicdetail__header}>
        <div className="main-image w-full h-[32rem] absolute md:relative overflow-hidden ">
          <img
            className="w-full h-full object-cover object-left-top filter blur-lg webkit-filter blur-md"
            src={comic?.thumb}
            alt="Cover"
          />
        </div>
        <div className={classes.header__detailinfo}>
          <div className={classes.detailinfo__thumb}>
            {comic?.thumb ? (
              <img src={comic.thumb} alt="" />
            ) : (
              <Skeleton height="300" width="200" animation="wave" />
            )}
          </div>

          <div className={classes.detailinfo__right}>
            {comic?.name ? (
              <div className={classes.detailinfo__name}>{comic.name}</div>
            ) : (
              <Skeleton height="25" animation="wave" />
            )}
            {comic?.authors ? (
              <div className={classes.detailinfo__author}>
                <span>Author: </span>
                {comic?.authors &&
                  comic?.authors.map((ele: any) => (
                    <Link href={"/find-comic?filterAuthor=" + ele} key={ele}>
                      {ele}
                    </Link>
                  ))}
              </div>
            ) : (
              <Skeleton height="20" width="100" animation="wave" />
            )}

            {comic?.genres ? (
              <div className={classes.detailinfo__genre}>
                {comic?.genres &&
                  comic?.genres.map((ele: any) => (
                    <Link key={ele} href={"/genre?genre=" + ele}>
                      {ele}
                    </Link>
                  ))}
              </div>
            ) : (
              <Skeleton height="20" width="100" animation="wave" />
            )}

            {comic?.brief_desc ? (
              <div
                className="detailinfo__brief max-h-36 scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-gray-200 overflow-y-scroll"
                dangerouslySetInnerHTML={{ __html: comic?.brief_desc }}
              ></div>
            ) : (
              <Skeleton height="20" animation="wave" />
            )}
            <div className={classes.detailinfo__evaluate}>
              {/* <EnvalueStar
                comic={comic}
                evaluteStarComic={evaluteStarComic}
                percent_rating={percent_rating}
              ></EnvalueStar> */}
              <div>
                <span>Lượt xem: </span>
                <span>{comic?.view}</span>
              </div>
              <div>
                <span>Lượt thích: </span>
                <span>{comic?.like}</span>
              </div>
              <div>
                <span>Lượt theo dõi: </span>
                <span>{comic?.follow}</span>
              </div>
            </div>
            <ComicInteractPanel comic={comic} mutateComic={mutateComic} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ComicInfo;
