import Link from "next/link"
import { useState,useEffect } from "react"

import ReportTable from "../ReportTable/ReportTable"
const reportItems=[
  'Lỗi ảnh'
]
const ChapterNav = ()=>{
    const [showNavbar,setShowNavbar]= useState(true)

    const [reportIsShown,setReportIsShown] = useState(false)
    const [reportId,setReportID] = useState('')

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        setShowNavbar(scrollTop <= 0)
       
      };
      const handleMouseMove = (e:any) => {
        if (e.clientY <= 50 ) {
          setShowNavbar(true);
        } 
      };
      document.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);
      return () =>{
        window.removeEventListener("scroll", handleScroll);
        document.removeEventListener("mousemove", handleMouseMove);
      } 
    }, []);


    const closeReport =()=>{
      setReportIsShown(false)
    }

    //TODO: Gửi Report đến BE
    const handleReport = (id:any)=>{
        setReportID(id)
        setReportIsShown(true)
    }

    return (
      <>
         {reportIsShown && <ReportTable items={reportItems} onClose={closeReport}></ReportTable>}
        <nav className={`fixed w-full grid grid-cols-3 items-center py-2 gap-4 bg-zinc-800 visibility: ${showNavbar? 'visible':'hidden'}`} >
          <div className="flex items-center">
            <Link href="#" className="text-gray-300 mr-4">
              <img className="h-10 w-50" src="/assets/logo/logo_web.png" alt="logo" />
            </Link>
            <Link href="#" className="text-white font-medium text-lg">Tên truyện </Link>
            <div className="h-4 w-4 text-white">
              <img src="/svg/RightArrow.svg" alt="Arrow" style={{ filter: 'invert(100%)' }}/>
            </div>
            <span className="text-gray-400 mr-4 text-lg">Chapter số</span>
          </div>
          <div className="flex items-center justify-center">
            <a href="#" className="text-gray-300 mr-4">
              <div  className="h-8 w-8 border-2 border-black" >
                <img src="/svg/LeftArrow.svg" alt="Arrow" style={{ filter: 'invert(100%)' }}/>
              </div>
            </a>
            <span className="text-white font-medium mr-4 text-lg">#1</span>
            <a href="#" className="text-gray-300 mr-4">
              <div  className="h-8 w-8 border-2 border-black" >
                <img src="/svg/RightArrow.svg" alt="Arrow" style={{ filter: 'invert(100%)' }}/>
              </div>
            </a>
          </div>
          <div className="flex items-center justify-end mr-4">
            <button className="px-4 py-1 font-medium text-white  rounded-md hover:bg-blue-700 border-2 border-black focus:outline-none">Report</button>
          </div>
        </nav>
      </>
    )
}
 export default ChapterNav