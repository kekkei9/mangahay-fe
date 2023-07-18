import { useContext, useState } from "react";
import { postComment } from "@/services/backend/CommentControllers";
import { formatDateTimeHour } from "@/utils/date";
import useSWR from "swr";
import { Comic } from "@/types/Comic";
import { Response } from "@/types/Response.type";
import { ToastContext } from "@/contexts/ToastContext";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

interface ICommentBoxProps {
  comic: Comic;
  onClickReport: (id: string) => void;
}

const CommentBox = ({ comic, onClickReport }: ICommentBoxProps) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: commentResponse, mutate } = useSWR<Response<any>>(
    `/api/comment/${comic.id}/comments`
  );

  const { toastRef, checkAuth } = useContext(ToastContext);

  const handlePostComment = async () => {
    if (!checkAuth(router.asPath)) return;
    try {
      setLoading(true);
      await postComment(comic.id, comment);
      mutate();
      setLoading(false);
      setComment("");
    } catch (error) {
      toastRef?.current?.show({
        severity: "error",
        detail: "Bình luận thất bại",
        summary: "Bình luận",
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
            className="form-input bg-gray-100 flex-1 border-gray-400 py-2 px-3 focus:border-transparent"
            rows={3}
            placeholder="Write your comment here"
            onChange={(e) => setComment(e.target.value.trim())}
          />
          <Button
            className="!rounded-sm"
            onClick={handlePostComment}
            disabled={!comment}
            loading={loading}
          >
            POST
          </Button>
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
                  onClick={() => onClickReport(cmt.id)}
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
