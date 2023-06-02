import Link from "next/link";

import classes from "./ComicDetail.module.sass";
import EnvalueStar from "./EnvalueStar";
import { useState, useEffect } from "react";
import {
  getLikeAndFollowState,
  unLikeComic,
  likeComic,
  FollowComic,
  unFollowComic,
} from "@/service/backend/ComicControllers";
import { Skeleton } from "primereact/skeleton";

const ComicInfo = ({ comic, first_chapter }: any) => {
  const [isLike, setIsLike] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isEvalute, setIsEvalute] = useState(false);
  const [percent_rating, setPercent_rating] = useState({ width: "0%" });

  const fetchdata = async () => {
    try {
      const data = await getLikeAndFollowState(comic.id);
      setIsLike(data.result.isLike);
      setIsFollow(data.result.isFollow);
      setIsEvalute(data.result.isEvalute);
    } catch (error) {
      //xu ly error
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      fetchdata();
    }
  }, [comic]);

  // const ev

  const clickLikeComic = async () => {
    // if (!sessionStorage.getItem("access_token")) {
    //   noticeShow("error", "Đăng nhập để thực hiện chức năng");
    // } else {
    //   try {
    //     let data;
    //     if (isLike) {
    //       data = await unLikeComic(comic.slug);
    //     } else {
    //       data = await likeComic(comic.slug);
    //     }
    //     if (data.success == true) {
    //       setIsLike((pre) => !pre);
    //       noticeShow("success", "Thêm vào danh sách yêu thích thành công");
    //     }
    //   } catch (error) {
    //     noticeShow("error", error);
    //   }
    // }
  };

  const clickFollowComic = async () => {
    // if (!sessionStorage.getItem("access_token")) {
    //   noticeShow("error", "Đăng nhập để thực hiện chức năng");
    // } else {
    //   try {
    //     let data;
    //     if (isFollow) {
    //       data = await unFollowComic(comic.slug);
    //     } else {
    //       data = await FollowComic(comic.slug);
    //     }
    //     if (data.success == true) {
    //       setIsFollow((pre) => !pre);
    //       noticeShow("success", "Thêm vào danh sách theo dõi thành công");
    //     }
    //   } catch (error) {
    //     noticeShow("error", error);
    //   }
    // }
  };

  return (
    <>
      <div className={classes.comicdetail__header}>
        <div className="main-image w-full h-[32rem] relative overflow-hidden">
          <img
            className="w-full h-full object-cover object-left-top filter blur-lg webkit-filter blur-md "
            src={comic.thumb}
            alt="Cover"
          />
        </div>
        <div className={classes.header__detailinfo}>
          <div className={classes.detailinfo__thumb}>
            {comic.thumb ? (
              <img src={comic.thumb} alt="" />
            ) : (
              <Skeleton height="300" width="200" animation="wave" />
            )}
          </div>

          <div className={classes.detailinfo__right}>
            {comic.name ? (
              <div className={classes.detailinfo__name}>{comic.name}</div>
            ) : (
              <Skeleton height="25" animation="wave" />
            )}
            {comic.authors ? (
              <div className={classes.detailinfo__author}>
                <span>Author: </span>
                {comic.authors &&
                  comic.authors.map((ele: any) => (
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

            {comic.genres ? (
              <div className={classes.detailinfo__genre}>
                {comic.genres &&
                  comic.genres.map((ele: any) => (
                    <Link
                      key={ele}
                      href={"/search?filter_genre=" + ele + "&advance=true"}
                    >
                      {ele}
                    </Link>
                  ))}
              </div>
            ) : (
              <Skeleton height="20" width="100" animation="wave" />
            )}

            {comic.brief_desc ? (
              <div
                className="detailinfo__brief max-h-36 scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-gray-200 overflow-y-scroll"
                dangerouslySetInnerHTML={{ __html: comic.brief_desc }}
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
                <span>{comic.view}</span>
              </div>
              <div>
                <span>Lượt thích: </span>
                <span>{comic.like}</span>
              </div>
              <div>
                <span>Lượt theo dõi: </span>
                <span>{comic.follow}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={"/comic/" + comic.slug + "/" + ""}
                className="py-2 px-4 bg-yellow-400 text-white rounded-md flex items-center"
              >
                <span>Đọc ngay</span>
              </Link>
              <button
                className={`py-2 px-4 rounded-md flex items-center ${
                  isLike
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-500 border border-red-500"
                }`}
                onClick={clickLikeComic}
              >
                {/* <FontAwesomeIcon icon={faHeart} /> */}
                <span>
                  {isLike ? " Đã yêu thích" : " Thêm vào danh sách yêu thích"}
                </span>
              </button>
              <button
                id="button-follow"
                className={`py-2 px-4 rounded-md flex items-center ${
                  isFollow
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 border border-blue-500"
                }`}
                onClick={clickFollowComic}
              >
                <span>{isFollow ? "Đang theo dõi" : "Theo dõi"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComicInfo;
