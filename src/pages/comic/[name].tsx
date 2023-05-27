import ComicInfo from "@/components/ComicDetails/ComicInfo"
import ComicRelate from "@/components/ComicDetails/ComicRelate"
import { Container, Grid } from "@mui/material";



import Navbar from "@/components/Navbar/Navbar"
import ComicChapter from "@/components/ComicDetails/ComicChapter";
import CommentBox from "@/components/ComicDetails/CommentBox";
import { getComicDetail } from "@/service/backend/ComicControllers";
import { useState,useEffect, use } from "react";
import NoticeBoard from "@/components/NoticeBoard/NoticeBoard";


const  ComicDetail = ()=>{

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
    const [chapters,setChapters] = useState([])

    const fetchComicData = async()=>{
        try {
            const name  = window.location.href.split('/')[window.location.href.split('/').length - 1];
            const data = await getComicDetail(name);
            setComic(data.result.comic);
            setChapters(data.result.chapters)

          } catch (error) {
            // Xử lý lỗi tại đây
          }
    }

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

    useEffect(() => {
        fetchComicData();
      }, []);



    let comics_author=[comic]

    return(
        <>
            
            <Navbar ></Navbar>
            {noticeIsShow&&<NoticeBoard status={notice.status} mess={notice.mess} handleClose={closeNotice}/>}
            <ComicInfo comic={comic} first_chapter={chapters[0]} noticeShow={noticeShow}></ComicInfo>

            <Container>
                <Grid container spacing={1} rowSpacing={1} columnSpacing={{ md: 1 }}>
                    <Grid item md={8}>
                        <ComicChapter comic={comic} chapters={chapters}></ComicChapter>
                        <CommentBox comic={comic} noticeShow={noticeShow}></CommentBox>
                    </Grid>
                    <Grid item md={4}>
                        <ComicRelate isShowLoading={false} authors={comic.authors} comics_author={comics_author} ></ComicRelate>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}

export default ComicDetail