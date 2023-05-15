import ComicInfo from "@/components/ComicDetails/ComicInfo"
import ComicRelate from "@/components/ComicDetails/ComicRelate"
import { Container, Grid, Skeleton } from "@mui/material";


import Navbar from "@/components/Navbar/Navbar"
import ComicChapter from "@/components/ComicDetails/ComicChapter";
import CommentBox from "@/components/ComicDetails/CommentBox";
import ChapterNav from "@/components/Chapter/ChapterNav";



const  ComicDetail = ()=>{

   

    const comic={
        thumb : '/assets/comic/cover_test.jpg',
        name: 'Kubo-san wa Mob o Yurusanai',
        authors: ['Yukimori Nene'],
        genres: ['Comedy','Romance'],
        brief_desc: 'Mọi người dường như không nhận ra được sự tồn tại của tôi nhưng mà tại sao Kubo-san lại...!!',
        star: 4,
        view:100,
        like:69,
        follow:50,
        slug:1,
        first_chapter: {slug:1},
        chapters:[{num:1,date:'26/10/2019'},{num:2,date:'30/10/2019'},{num:3,date:'1/11/2019'},{num:4,date:'4/11/2019'}]

    } 

    let comics_author=[comic]

    return(
        <>
            
            <Navbar></Navbar>
            <ComicInfo comic={comic} first_chapter={comic.first_chapter}></ComicInfo>

            <Container>
                <Grid container spacing={1} rowSpacing={1} columnSpacing={{ md: 1 }}>
                    <Grid item md={8}>
                        <ComicChapter chapters={comic.chapters}></ComicChapter>
                        <CommentBox></CommentBox>
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