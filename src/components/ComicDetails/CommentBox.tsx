import { Pagination } from "@mui/material";
import { handleClientScriptLoad } from "next/script";
import { useState } from "react";
import ReportTable from "../ReportTable/ReportTable";

const reportItems = [
    'Spam: Nội dung bình luận không liên quan đến chủ đề hoặc là quảng cáo, spam.',
    'Quấy rối: Nội dung bình luận chứa nội dung kích động, gây tranh cãi, lạm dụng hoặc quấy rối người khác.',
    'Nội dung không thích hợp: Nội dung bình luận không phù hợp với đối tượng sử dụng hoặc có nội dung đồi trụy.',
    'Tấn công cá nhân: Nội dung bình luận tấn công hoặc phân biệt chủng tộc, tôn giáo, giới tính, địa phương, quốc gia,...',
]

const CommentBox =(props:any)=>{

    const [commentList,setCommentList] = useState<any[]>([])
    const [comment,setComment] = useState('')
    const [currentPage,setCurrentPage]= useState(1)
    const [totalPages,setTotalPage]= useState(5)
    const [reportIsShown,setReportIsShown] = useState(true)
    const [reportId,setReportID] = useState('')

    const handlePost = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        event.preventDefault();
        const newComment = {
            content: comment,
            time: 'a',
            name:'abc'
        }
        setCommentList((prev: any) => [newComment,...prev])
        setComment("");
    }

    const handleChangePage=(event:any,value:any)=>{
        setCurrentPage(value);
    }

    const closeReport =()=>{
        setReportIsShown(false)
    }

    const handleReport = (id:any)=>{
        setReportID(id)
        setReportIsShown(true)
    }


    return(
        <>
        {reportIsShown && <ReportTable items={reportItems} onClose={closeReport}></ReportTable>}
        <div className="p-4 bg-white">
            <h2 className="text-lg font-medium mb-4">Comment</h2>
            <form className="mb-4">
                <div className='flex mb-4  py-4 border-b border-gray-200'> 
                    <textarea id="comment" name="comment" className="form-input bg-gray-100 w-full block border-gray-400 py-2 px-3 focus:border-transparent" rows={3} placeholder="Write your comment here" value={comment} onChange={e=>setComment(e.target.value)}></textarea>
                    <button className="bg-gray-300 hover:bg-slate-300 text-white font-medium py-2 px-4" onClick={handlePost}>POST</button>
                </div>
            </form>
            <div className="space-y-4">
                {
                    commentList.map((cmt:any)=>(
                        <div className="bg-white rounded-md py-4 border-b border-gray-200" key={cmt.id}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{cmt.name}</span>
                                <span className="text-gray-400 text-sm">{cmt.time}</span>
                            </div>
                            <p className="text-gray-700">{cmt.content}</p>
                            <div className="flex justify-end mt-2">
                                <button className="text-gray-500 font-medium" onClick={handleReport}>Report</button>
                            </div>
                        </div>
                    ))
                }
                <div className="bg-white rounded-md py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">John Doe</span>
                        <span className="text-gray-400 text-sm">May 15, 2022</span>
                    </div>
                    <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec diam in diam lobortis gravida. Nunc mollis ante sit amet velit venenatis.</p>
                    <div className="flex justify-end mt-2">
                        <button className="text-gray-500 font-medium">Report</button>
                    </div>
                </div>
                <div className="bg-white rounded-md py-4 border-b border-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Jane Smith</span>
                    <span className="text-gray-400 text-sm">May 17, 2022</span>
                </div>
                <p className="text-gray-700">Duis sed ex sit amet purus pellentesque pharetra. Aenean finibus augue lectus, a luctus eros gravida in. Aliquam varius, lorem eu auctor congue, ipsum arcu ullamcorper nulla, nec euismod magna augue a sem.</p>
                <div className="flex justify-end mt-2">
                    <button className="text-gray-500 font-medium">Report</button>
                </div>
                </div>
            </div>
            <div className="mt-4 flex justify-center">
            <Pagination count={totalPages} page={currentPage} onChange={handleChangePage}></Pagination>
            </div>
        </div>
        </>
       

    )
}

export default CommentBox