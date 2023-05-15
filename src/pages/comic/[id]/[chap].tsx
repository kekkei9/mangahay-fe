import ChapterNav from "@/components/Chapter/ChapterNav"
import ComicImages from "@/components/Chapter/ComicImages"
import CommentBox from "@/components/ComicDetails/CommentBox"

const chapterDetail = (props:any)=>{
    const images=['/assets/comic/1.jpg','/assets/comic/2.jpg','/assets/comic/3.jpg','/assets/comic/4.jpg']
    return (
        <>
        <ChapterNav></ChapterNav>
        <div className="container mx-auto flex justify-center items-center flex-col bg-white">
            <ComicImages images={images}></ComicImages>
            <div className="w-4/5 border-t border-black py-2 ">
                <CommentBox></CommentBox>
            </div>
        </div>
        
        </>
    )
}

export default chapterDetail