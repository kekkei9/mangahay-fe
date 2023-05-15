
const ComicChapter = (props:any)=>{

    return (
        <div className="p-4 bg-white  shadow-md mb-4">
            <h2 className="text-lg font-medium mb-4">Chapter List</h2>
            <div className="max-h-96 scrollbar-thin scrollbar-thumb-yellow-200 scrollbar-track-gray-200 overflow-y-scroll">
            <ul className="py-2 ">
                {
                     props.chapters.slice().reverse().map((chap:any)=>(
                        <li key={chap.num} className="flex justify-between items-center py-2 border-b border-gray-200">
                            <a href="#" className="text-black visited:text-slate-300">Chapter {chap.num}</a>
                            <span className="text-gray-400 text-sm mr-5">{chap.date}</span>
                        </li>)
                    )
                }
            </ul>
            </div>
        </div>

    )
}

export default ComicChapter