import { useState, useEffect } from "react";
import ReportTable from "../ReportTable/ReportTable";
import { getComment, postComment } from "@/service/backend/CommentControllers";

const reportItems = [
  "Spam: Nội dung bình luận không liên quan đến chủ đề hoặc là quảng cáo, spam.",
  "Quấy rối: Nội dung bình luận chứa nội dung kích động, gây tranh cãi, lạm dụng hoặc quấy rối người khác.",
  "Nội dung không thích hợp: Nội dung bình luận không phù hợp với đối tượng sử dụng hoặc có nội dung đồi trụy.",
  "Tấn công cá nhân: Nội dung bình luận tấn công hoặc phân biệt chủng tộc, tôn giáo, giới tính, địa phương, quốc gia,...",
];

const formatDateTime = (dateString: string) => {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
};

const CommentBox = ({ comic, noticeShow }: any) => {
  const [commentList, setCommentList] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(5);
  const [reportIsShown, setReportIsShown] = useState(false);
  const [reportId, setReportID] = useState("");

  const handlePost = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!sessionStorage.getItem("access_token")) {
      noticeShow("error", "Đăng nhập để thực hiện chức năng");
      return;
    } else {
      try {
        const data = await postComment(comic.id, comment);
        const newComment = data.result;
        setCommentList((prev: any) => [newComment, ...prev]);
        setComment("");
      } catch (error) {
        noticeShow("error", error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const data = await getComment(comic.id);
      setCommentList(data.result);
    } catch (error) {
      // Xử lý lỗi tại đây
    }
  };

  useEffect(() => {
    fetchData();
  }, [comic]);

  const handleChangePage = (event: any, value: any) => {
    setCurrentPage(value);
  };

  const closeReport = () => {
    setReportIsShown(false);
  };

  const handleReport = (id: any) => {
    if (!sessionStorage.getItem("access_token")) {
      noticeShow("error", "Đăng nhập để thực hiện chức năng");
    } else {
      setReportID(id);
      setReportIsShown(true);
    }
  };

  return (
    <>
      {reportIsShown && (
        <ReportTable
          type="comment"
          id={reportId}
          items={reportItems}
          onClose={closeReport}
          noticeShow={noticeShow}
        ></ReportTable>
      )}
      <div className="p-4 bg-white">
        <h2 className="text-lg font-medium mb-4">Comment</h2>
        <form className="mb-4">
          <div className="flex mb-4  py-4 border-b border-gray-200">
            <textarea
              id="comment"
              name="comment"
              className="form-input bg-gray-100 w-full block border-gray-400 py-2 px-3 focus:border-transparent"
              rows={3}
              placeholder="Write your comment here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              className="bg-gray-300 hover:bg-slate-300 text-white font-medium py-2 px-4"
              onClick={handlePost}
            >
              POST
            </button>
          </div>
        </form>
        <div className="space-y-4">
          {commentList.map((cmt: any) => (
            <div
              className="bg-white rounded-md py-4 border-b border-gray-200"
              key={cmt.id}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{cmt.id_user.fullname}</span>
                <span className="text-gray-400 text-sm">
                  {formatDateTime(cmt.createdAt)}
                </span>
              </div>
              <p className="text-gray-700">{cmt.content}</p>
              <div className="flex justify-end mt-2">
                <button
                  className="text-gray-500 font-medium"
                  onClick={handleReport}
                >
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          {/* <Pagination count={totalPages} page={currentPage} onChange={handleChangePage}></Pagination> */}
        </div>
      </div>
    </>
  );
};

export default CommentBox;
