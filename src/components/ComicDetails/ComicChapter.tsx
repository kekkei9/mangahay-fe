
import Link from "next/link"

const formatDate = (dateString:string) =>{
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    return formattedDate;
}

const ComicChapter = ({comic,chapters}:any)=>{
    
    return (
        <div className="p-4 bg-white  shadow-md mb-4">
            <h2 className="text-lg font-medium mb-4">Chapter List</h2>
            <div className="max-h-96 scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-gray-200 overflow-y-scroll">
            <ul className="py-2 ">
                {
                     chapters.slice().sort((a:any,b:any)=> b.name.split(" ")[1]-a.name.split(" ")[1]).map((chap:any)=>(
                        <li key={chap.name} className="flex justify-between py-2 border-b border-gray-200">
                            <Link href={`/comic/${comic.slug}/${chap.slug}`} className="text-black visited:text-slate-300">Chapter {chap.name.split(" ")[1]} </Link>
                            <span className="text-gray-400 text-sm mr-5">{formatDate(chap.createdAt)}</span>
                        </li>)
                    )
                }
            </ul>
            </div>
        </div>

    )
}

export default ComicChapter