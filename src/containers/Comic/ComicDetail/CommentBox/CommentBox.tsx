import { useContext, useState } from "react";
import { postComment } from "@/service/backend/CommentControllers";
import { formatDateTimeHour } from "@/utils/date";
import useSWR from "swr";
import { Comic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { ToastContext } from "@/contexts/ToastContext";
import { authErrorToastBody } from "../ComicInfo/ComicInteractPanel/toastBody";
import { useRouter } from "next/router";
import { ToastMessage } from "primereact/toast";

interface ICommentBoxProps {
  comic: Comic;
  onClickReport: (id:string) => void;
}

const CommentBox = ({ comic, onClickReport }: ICommentBoxProps) => {
  const router = useRouter();
  const [comment, setComment] = useState("");

  const { data: commentResponse } = useSWR<Response<any>>(
    `/api/comment/${comic.id}/comments`
  );

  const { isAuthUser } = useSelector(
    (state: RootState) => state.authentication
  );
  const { toastRef } = useContext(ToastContext);

  const handlePost = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isAuthUser) {
      toastRef?.current?.show(
        authErrorToastBody(() => router.push("/auth/signin")) as ToastMessage
      );
      return false;
    }
    try {
      await postComment(comic.id, comment);
      setComment("");
    } catch (error) {
      toastRef?.current?.show({
        severity: "error",
        detail: "ERROR",
        summary: "ERROR",
      });
    }
  };

  return (
    <>
      <div className="p-4 bg-white">
        <h2 className="text-lg font-medium mb-4">Comment</h2>
        <div className="flex mb-4  py-4 border-b border-gray-200">
          <textarea
            id="comment"
            name="comment"
            className="form-input bg-gray-100 w-full block border-gray-400 py-2 px-3 focus:border-transparent"
            rows={3}
            placeholder="Write your comment here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="bg-gray-300 hover:bg-slate-300 text-white font-medium py-2 px-4"
            onClick={handlePost}
          >
            POST
          </button>
        </div>
        <div className="space-y-4 mt-4">
          {commentResponse?.result?.map((cmt: any) => (
            <div
              className="bg-white rounded-md py-4 border-b border-gray-200"
              key={cmt.id}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{cmt.id_user.fullname}</span>
                <span className="text-gray-400 text-sm">
                  {formatDateTimeHour(cmt.createdAt)}
                </span>
              </div>
              <p className="text-gray-700">{cmt.content}</p>
              <div className="flex justify-end mt-2">
                <button
                  className="text-gray-500 font-medium"
                  onClick={()=>onClickReport(cmt.id)}
                >
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentBox;
