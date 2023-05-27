import ChapterNav from "@/components/Chapter/ChapterNav"
import ComicImages from "@/components/Chapter/ComicImages"
import CommentBox from "@/components/ComicDetails/CommentBox"
import NoticeBoard from "@/components/NoticeBoard/NoticeBoard";
import { getComicDetail } from "@/service/backend/ComicControllers";
import {useRouter } from "next/router";
import { useState,useEffect } from "react";




const chapterDetail = ()=>{
    const router = useRouter();

    const [notice,setNotice] = useState({
        status: "success",
        mess:"Successful"
    })  
    const [noticeIsShow,setNoticeIsShow] = useState(false);
    const [comic,setComic] = useState({
        thumb : '',
        name: '',
        authors: [],
        genres: [],
        brief_desc: '',
        star: 0.00,
        view:0,
        like:0,
        follow:0,
        slug:"",
        
    })
    const [chapters,setChapters] = useState([]);
    const [chapter,setChapter] = useState({
        images:[]
    })

    const fetchComicData = async()=>{
        try {
            const name  = window.location.href.split('/')[window.location.href.split('/').length - 2];
            const chap  = window.location.href.split('/')[window.location.href.split('/').length - 1];
            console.log(chap)
            const data = await getComicDetail(name);
            setComic(data.result.comic);
            setChapters(data.result.chapters.slice().sort((a:any,b:any)=> b.name.split(" ")[1]-a.name.split(" ")[1]))
            for (let i = 0; i < data.result.chapters.length; i++) {
                if (data.result.chapters[i].slug === chap) {
                    setChapter(data.result.chapters[i]);
                    break;
                }
            }

          } catch (error) {
            // Xử lý lỗi tại đây
          }
    }

    useEffect(() => {
        fetchComicData();
      }, []);
    
    const images=['/assets/comic/1.jpg','/assets/comic/2.jpg','/assets/comic/3.jpg','/assets/comic/4.jpg']

    const noticeShow = (status:any,mess:any)=>{
        setNotice({
            status,
            mess,
        })
        setNoticeIsShow(true)
    }

    const closeNotice = ()=>{
        setNoticeIsShow(false)
    }
    return (
        <>
        <ChapterNav chapters={chapters} chapter={chapter} comic={comic} noticeShow={noticeShow}></ChapterNav>
        {noticeIsShow&&<NoticeBoard status={notice.status} mess={notice.mess} handleClose={closeNotice}/>}
        <div className="w-full mx-auto flex justify-center items-center flex-col bg-white">
            <ComicImages images={chapter.images}></ComicImages>
            <div className="w-4/5 border-t border-black py-2 ">
                <CommentBox comic={comic} noticeShow={noticeShow}/>
            </div>
        </div>
        
        </>
    )
}

export default chapterDetail