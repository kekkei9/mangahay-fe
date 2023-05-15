import React, { useState } from "react";


const ReportTable = (props:any)=>{
    const [description,setDescription] = useState("")
    const [selectedItems, setSelectedItems] = useState(props.items.map(() => false));

    const handleChange = (event:any, index:any) => {
        const newSelectedItems = [...selectedItems];
        

        newSelectedItems[index] = event.target.checked;
        setSelectedItems(newSelectedItems);
      };
    
      const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log("Description:", description);
        console.log("Selected items:", selectedItems);
        props.onClose();
      };

    return(
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
           
            <div className="bg-white rounded-md shadow-lg ">
                <div className="flex justify-between items-center mb-4 bg-gray-100 p-2 px-4 rounded-md">
                    <h2 className="text-lg font-semibold">Report</h2>
                    <button onClick={props.onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path
                            fillRule="evenodd"
                            d="M13.414 12l4.293-4.293a1 1 0 1 0-1.414-1.414L12 10.586 7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 1 0 1.414-1.414L13.414 12z"
                        />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="space-y-2 p-4 px-8">
                    {props.items.map((item:any, index:any) => (
                    <div key={index} className="flex items-center">
                        <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-indigo-600"
                        checked={selectedItems[index]}
                        onChange={(event) => handleChange(event, index)}
                        />
                        <span className="ml-2 text-gray-700">{item}</span>
                    </div>
                    ))}
                    <div className="flex flex-col pt-2">
                        <label htmlFor="description" className="text-gray-700">
                            Mô tả:
                        </label>
                        <textarea
                            id="description"
                            className="form-textarea mt-1 block w-full rounded-md border border-black shadow-sm ml-2"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                </div>
                <div className="bg-gray-100 flex justify-end p-2 rounded-md">
                    <button type="button" onClick={props.onClose} className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md">
                    Cancel
                    </button>
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">
                    Submit
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default ReportTable;