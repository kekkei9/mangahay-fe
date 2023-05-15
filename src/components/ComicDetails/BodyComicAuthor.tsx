
import Link from 'next/link';
import classes from './ComicDetail.module.sass'
const BodyComicAuthor = (props:any)=>{
    return (
        <Link href={'/comic/' + props.comic.slug} className={classes.bodycomicauthor+ ' py-2 border-b border-gray-200'} >
            <img src={props.comic.thumb} alt="" />
            <div className='text-black hover:none'>
                {props.comic.name}
            </div>
        </Link>
    );
}

export default BodyComicAuthor