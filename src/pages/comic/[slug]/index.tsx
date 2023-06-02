import ComicInfo from "@/components/ComicDetails/ComicInfo";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Response } from "@/types/Response.type";
import { Comic } from "@/types/Comic";
import { Chapter } from "@/types/Chapter";
import axiosClient from "@/services/backend/axiosClient";
import ComicChapter from "@/components/ComicDetails/ComicChapter";
import CommentBox from "@/components/ComicDetails/CommentBox";
import ComicRelate from "@/components/ComicDetails/ComicRelate";

const ComicDetail = () => {
  const router = useRouter();

  //TODO: Uncomment later

  // useEffect(() => {
  //   axiosClient.get(
  //     `/api/comic/${router.query.slug}/increment?field=view&jump=1`
  //   );
  // }, [router.query.slug]);

  const { data: comicResponse } = useSWR<
    Response<{ chapters: Chapter[]; comic: Comic }>
  >(`/api/comic/${router.query.slug}`);

  return (
    <>
      {comicResponse && (
        <>
          <ComicInfo comic={comicResponse?.result?.comic} />
          <ComicChapter
            comic={comicResponse?.result?.comic}
            chapters={comicResponse.result?.chapters}
          />
          {/* <CommentBox comic={comic}  />
          <ComicRelate
            isShowLoading={false}
            authors={comic.authors}
            comics_author={comics_author}
          /> */}
        </>
      )}
    </>
  );
};

export default ComicDetail;
