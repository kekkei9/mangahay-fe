import React from "react";


const Navbar = (props:any) =>{
    return(
        <>
       <nav className="bg-white">
            <div className="mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                <a href="#" className="flex-shrink-0">
                    <img className="h-10 w-50" src="/assets/logo/logo_web.png" alt="logo" />
                </a>
                <div className="ml-10 flex items-baseline space-x-4">
                    <a href="#" className="text-black hover:text-yellow-400 px-3 py-2 rounded-md text-xl font-medium">Thể Loại</a>
                    <a href="#" className="text-black hover:text-yellow-400 px-3 py-2 rounded-md text-xl font-medium">BXH</a>
                    <a href="#" className="text-black hover:text-yellow-400 px-3 py-2 rounded-md text-xl font-medium">Contact</a>
                </div>
                </div>
                <div className="flex items-center">
                    <form className="ml-4 flex-1">
                        <div className="flex items-center border-b border-gray-500 py-2">
                            <input type="text" className="bg-transparent text-black placeholder-slate-600 flex-1 py-2 px-2 focus:outline-none" placeholder="Search..."/>
                            <button type="submit" className="text-slate-600  hover:text-white focus:outline-none focus:text-white ml-2">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l6-6M9 15l-6-6M21 5H3v6h18V5z" />

                                </svg>
                            </button>
                        </div>
                    </form>
                    <div className="ml-4 space-x-2">
                    <a href="#" className="bg-black text-white  px-4 py-2 rounded-md text-sm font-medium">Login</a>
                    <a href="#" className="bg-white text-slate-600 border px-3 py-2 rounded-md text-sm font-medium">Register</a>
                    </div>
                </div>
                </div>
            </div>
     
            </nav>
        </>
    )
}
export default Navbar