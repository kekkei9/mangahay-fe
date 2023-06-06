import Link from "next/link";
import classes from "./ComicDetail.module.sass";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "primereact/skeleton";
import { Comic, ComicAuthStatus } from "@/types/Comic";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Toast, ToastMessage } from "primereact/toast";
import { useRouter } from "next/router";
import {
  followComic,
  likeComic,
  unFollowComic,
  unLikeComic,
} from "@/service/backend/ComicControllers";
import { Response } from "@/types/Response.type";
import { authErrorToastBody } from "./toastBody";

interface IComicInfoProps {
  comic?: Comic;
}

const ComicInfo = ({ comic }: IComicInfoProps) => {
  const router = useRouter();
  const toastRef = useRef<Toast>(null);

  const { isAuthUser } = useSelector(
    (state: RootState) => state.authentication
  );

  const { data: statusResponse, mutate } = useSWR<Response<ComicAuthStatus>>(
    isAuthUser ? `/api/user/comic/check?id_comic=${comic?.id}` : null
  );

  const checkAuth = () => {
    if (!isAuthUser) {
      toastRef.current?.show(
        authErrorToastBody(() => router.push("/signin")) as ToastMessage
      );
      return false;
    }
    return true;
  };

  //TODO: Move to container & fix show error

  const handleClickLike = async () => {
    if (!checkAuth()) return;
    try {
      let data;
      if (statusResponse?.result?.isLike) {
        data = await unLikeComic(comic);
      } else {
        data = await likeComic(comic);
      }

      if (data.success == true) {
        mutate();
      }
    } catch (error) {
      toastRef.current?.show({
        severity: "error",
        summary: "ERROR",
        detail: "ERROR",
      });
    }
  };

  const handleClickFollow = async () => {
    if (!checkAuth()) return;

    try {
      let data;
      if (statusResponse?.result?.isLike) {
        data = await unFollowComic(comic);
      } else {
        data = await followComic(comic);
      }

      if (data.success == true) {
        mutate();
      }
    } catch (error) {
      toastRef.current?.show({
        severity: "error",
        summary: "ERROR",
        detail: "ERROR",
      });
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <div className={classes.comicdetail__header}>
        <div className="main-image w-full h-[32rem] relative overflow-hidden">
          <img
            className="w-full h-full object-cover object-left-top filter blur-lg webkit-filter blur-md "
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
                    <Link
                      href={"/search?filter_author=" + ele + "&advance=true"}
                      key={ele}
                    >
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
            <div className="flex gap-2">
              <button
                className={`py-2 px-4 rounded-md flex items-center ${
                  statusResponse?.result?.isLike
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
                }`}
                onClick={handleClickLike}
              >
                {/* <FontAwesomeIcon icon={faHeart} /> */}
                {statusResponse?.result?.isLike
                  ? " Đã yêu thích"
                  : " Thêm vào danh sách yêu thích"}
              </button>
              <button
                id="button-follow"
                className={`py-2 px-4 rounded-md flex items-center ${
                  statusResponse?.result?.isFollow
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 border border-blue-500"
                }`}
                onClick={handleClickFollow}
              >
                <span>
                  {statusResponse?.result?.isFollow
                    ? "Đang theo dõi"
                    : "Theo dõi"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComicInfo;
