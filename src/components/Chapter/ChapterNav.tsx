import Link from "next/link"
import { useState,useEffect } from "react"

import ReportTable from "../ReportTable/ReportTable"
const reportItems=[
  'Lỗi ảnh'
]
const ChapterNav = ()=>{
    const [showNavbar,setShowNavbar]= useState(true)

    const [reportIsShown,setReportIsShown] = useState(true)
    const [reportId,setReportID] = useState('')

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 0) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeReport =()=>{
      setReportIsShown(false)
    }

    const handleReport = (id:any)=>{
        setReportID(id)
        setReportIsShown(true)
    }

    useEffect(() => {
      const handleMouseMove = (e:any) => {
        if (e.clientY <= 50 ) {
          setShowNavbar(true);
        } 
      };
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);


    return (
      <>
         {reportIsShown && <ReportTable items={reportItems} onClose={closeReport}></ReportTable>}
        <nav className={`fixed w-full grid grid-cols-3 items-center py-2 gap-4 bg-zinc-800 visibility: ${showNavbar? 'visible':'hidden'}`} >
          <div className="flex items-center">
            <Link href="#" className="text-gray-300 mr-4">
              <img className="h-10 w-50" src="/assets/logo/logo_web.png" alt="logo" />
            </Link>
            <Link href="#" className="text-white font-medium text-lg">Tên truyện </Link>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            <span className="text-gray-400 mr-4 text-lg">Chapter số</span>
          </div>
          <div className="flex items-center justify-center">
            <a href="#" className="text-gray-300 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 border-2 border-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <span className="text-white font-medium mr-4 text-lg">#1</span>
            <a href="#" className="text-gray-300 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 border-2 border-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
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