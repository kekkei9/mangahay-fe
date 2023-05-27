import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle,faTimes } from "@fortawesome/free-solid-svg-icons";

const NoticeBoard = ({status,mess,handleClose}:any)=>{
    const  [showBoard, setShowBoard] = useState(true);
    return (
       <div className="fixed top-0 left-0 w-full  h-full flex justify-center items-center bg-gray-900 bg-opacity-75 z-50 ">
            <div className="bg-white p-4 rounded-md shadow-md relative min-w-[25%]">
                <div className="flex items-center mb-2 flex-col ">
                    <span className="font-bold my-4 ">{mess}</span>
                    {status === "success" ? (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-green-500 mr-2" />
                    ) : (
                        <FontAwesomeIcon icon={faTimesCircle} className="text-6xl text-red-500 mr-2" />
                    )}
                    
                </div>
                <button className="absolute top-0 right-0 m-2" onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
       </div>
    )
}

export default NoticeBoard