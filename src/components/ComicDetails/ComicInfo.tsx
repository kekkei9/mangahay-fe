import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Skeleton, Container } from '@mui/material'

import Link from 'next/link'

import classes from './ComicDetail.module.sass'
import EnvalueStar from './EnvalueStar'
import { useState } from "react";



const ComicInfo = (props: any) =>{
    const state = {
        isLike:  false,
        isFollow: false,
        isEvalute: false,
       
    }
    
    const [isLike,setIsLike] = useState(false);
    const [isFollow,setIsFollow] = useState(false);
    const [isEvalute,setIsEvalute] = useState(false);
    const [percent_rating,setPercent_rating] = useState({ "width": "0%" })
    const evaluteStarComic = async(rate_star: any)=>{
        if(isEvalute){

        }else{
            setIsEvalute(true)
            const percent_star = rate_star / 5 * 100;
            setPercent_rating({"width": `${percent_star}%`})
        }
    }

    const likeComic = async()=>{
        setIsLike(pre=> !pre)
    }

    const followComic = async()=>{
        setIsFollow(pre => !pre)
    }

    return (
        <>
        <div className={classes.comicdetail__header}>
             <div className="main-image w-full h-96 relative overflow-hidden">
                <img className="w-full h-full object-cover object-left-top filter blur-lg webkit-filter blur-md " src="/assets/comic/cover_test.jpg" alt="Cover"/>
            </div>
            <Container>
                <div className={classes.header__detailinfo}>
                    <div className={classes.detailinfo__thumb}>
                        {props.comic.thumb ?
                            <img src={props.comic.thumb} alt="" />
                            : <Skeleton variant="rectangular" height={300} width={200} animation="wave" />
                        }
                    </div>

                    <div className={classes.detailinfo__right}>
                        {props.comic.name ?
                            <div className={classes.detailinfo__name}>
                                {props.comic.name}
                            </div>
                            : <Skeleton variant="rectangular" height={25} animation="wave" />
                        }
                        {props.comic.authors ?
                            <div className={classes.detailinfo__author}>
                                <span>Author: </span>
                                {props.comic.authors && props.comic.authors.map((ele: any) => (
                                    <Link href={'/search?filter_author=' + ele + '&advance=true'} key={ele}>
                                        {ele}
                                    </Link>
                                ))}
                            </div>
                            : <Skeleton variant="rectangular" height={20} width={100} animation="wave" />
                        }

                        {props.comic.genres ?
                            <div className={classes.detailinfo__genre}>
                                {props.comic.genres && props.comic.genres.map((ele: any) => (
                                    <Link href={'/search?filter_genre=' + ele + '&advance=true'}>
                                        {ele}
                                    </Link>
                                ))}
                            </div>
                            : <Skeleton variant="rectangular" height={20} width={100} animation="wave" />
                        }

                        {
                            props.comic.brief_desc ?
                                <div className="detailinfo__brief" dangerouslySetInnerHTML={{ __html: props.comic.brief_desc }}>
                                </div>
                                : <Skeleton variant="rectangular" height={20} animation="wave" />
                        }
                        <div className={classes.detailinfo__evaluate}>
                            <EnvalueStar comic={props.comic} evaluteStarComic={evaluteStarComic} percent_rating={percent_rating} ></EnvalueStar>
                            <div>
                                <span>Lượt xem: </span>
                                <span>{props.comic.view}</span>
                            </div>
                            <div>
                                <span>Lượt thích: </span>
                                <span>{props.comic.like}</span>
                            </div>
                            <div>
                                <span>Lượt theo dõi: </span>
                                <span>{props.comic.follow}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link href={'/comic/' + props.comic.slug + '/' + props.first_chapter.slug} className="py-2 px-4 bg-yellow-400 text-white rounded-md flex items-center">
                                <span>Đọc ngay</span>
                            </Link>
                            <button className={`py-2 px-4 rounded-md flex items-center ${isLike ? "bg-red-500 text-white" : "bg-white text-red-500 border border-red-500"}`} onClick={likeComic}>
                                <FontAwesomeIcon icon={faHeart} />
                                <span>{isLike ? ' Đã yêu thích' : ' Thêm vào danh sách yêu thích'}</span>
                            </button>
                            <button id="button-follow" className={`py-2 px-4 rounded-md flex items-center ${isFollow ? "bg-blue-500 text-white" : "bg-white text-blue-500 border border-blue-500"}`} onClick={followComic}>
                                <span>{isFollow ? 'Đang theo dõi' : 'Theo dõi'}</span>
                            </button>
                        </div>
                    </div>       
                </div>
            </Container>
        </div>    
        </>
    )
}

export default ComicInfo