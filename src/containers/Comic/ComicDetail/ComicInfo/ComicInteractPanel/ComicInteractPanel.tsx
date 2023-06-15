import { RootState } from "@/redux";
import { Toast, ToastMessage } from "primereact/toast";
import { RefObject, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import useSWR, { KeyedMutator } from "swr";
import { Response } from "@/types/Response.type";
import { Comic, ComicAuthStatus } from "@/types/Comic";
import { authErrorToastBody } from "./toastBody";
import { useRouter } from "next/router";
import {
  followComic,
  likeComic,
  unFollowComic,
  unLikeComic,
} from "@/services/backend/ComicControllers";
import { PrimeIcons } from "primereact/api";
import { Chapter } from "@/types/Chapter";
import { ToastContext } from "@/contexts/ToastContext";

interface IComicInteractPanelProps {
  comic?: Comic;
  mutateComic?: KeyedMutator<
    Response<{
      chapters: Chapter[];
      comic: Comic;
    }>
  >;
}

const ComicInteractPanel = ({
  comic,
  mutateComic,
}: IComicInteractPanelProps) => {
  const { isAuthUser } = useSelector(
    (state: RootState) => state.authentication
  );
  const { toastRef, checkAuth } = useContext(ToastContext);

  const { data: statusResponse, mutate } = useSWR<Response<ComicAuthStatus>>(
    isAuthUser ? `/api/user/comic/check?id_comic=${comic?.id}` : null
  );

  const handleClickLike = async () => {
    if (!checkAuth()) return;
    try {
      let data;
      if (statusResponse?.result?.isLike) {
        data = await unLikeComic(comic);
      } else {
        data = await likeComic(comic);
      }

      if (data?.success == true) {
        toastRef?.current?.show({
          severity: "success",
          summary: "Yêu thích",
          detail: statusResponse?.result?.isLike
            ? "Hủy yêu thích thành công"
            : "Thích thành công",
        });
        mutate();
        mutateComic && mutateComic();
      }
    } catch (error) {
      toastRef?.current?.show({
        severity: "error",
        summary: "Yêu thích",
        detail: "Yêu cầu thất bại",
      });
    }
  };

  const handleClickFollow = async () => {
    if (!checkAuth()) return;

    try {
      let data;
      if (statusResponse?.result?.isFollow) {
        data = await unFollowComic(comic);
      } else {
        data = await followComic(comic);
      }

      if (data?.success == true) {
        toastRef?.current?.show({
          severity: "success",
          summary: "Theo dõi",
          detail: statusResponse?.result?.isFollow
            ? "Hủy theo dõi thành công"
            : "Theo dõi thành công",
        });
        mutate();
        mutateComic && mutateComic();
      }
    } catch (error) {
      toastRef?.current?.show({
        severity: "error",
        summary: "Theo dõi",
        detail: "Gửi yêu cầu thất bại",
      });
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          className={`py-2 px-4 rounded-md flex items-center ${
            statusResponse?.result?.isLike
              ? "bg-red-500 text-white"
              : "bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
          }`}
          onClick={handleClickLike}
        >
          <i
            className={`${
              statusResponse?.result?.isLike
                ? PrimeIcons.HEART_FILL
                : PrimeIcons.HEART
            } !mr-2`}
          />
          {statusResponse?.result?.isLike
            ? " Đã yêu thích"
            : " Thêm vào danh sách yêu thích"}
        </button>
        <button
          id="button-follow"
          className={`py-2 px-4 rounded-md flex items-center ${
            statusResponse?.result?.isFollow
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={handleClickFollow}
        >
          {statusResponse?.result?.isFollow ? "Đang theo dõi" : "Theo dõi"}
        </button>
      </div>
    </>
  );
};

export default ComicInteractPanel;
