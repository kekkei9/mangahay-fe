import { ToastContext } from "@/contexts/ToastContext";
import { postReport } from "@/service/backend/ReportControllers";
import React, { useContext, useState } from "react";

interface IReportTableProps {
  id: number;
  type: string;
  items?: string[];
  onClose: () => void;
}

const ReportTable = ({ id, type, items, onClose }: IReportTableProps) => {
  const [description, setDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const { toastRef } = useContext(ToastContext);

  const handleChange = (event: any, index: any) => {
    if (event.target.checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, index]);
      return;
    }
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item !== index)
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const dataReport = {
      type: type,
      detail_report: description,
      errors: Array.from(selectedItems, (index: number) => items?.[index]),
      id_object: id,
    };
    try {
      const data = postReport(dataReport);
      toastRef?.current?.show({
        severity: "success",
        summary: "Báo cáo thành công",
        detail: "Báo cáo",
      });
    } catch (err) {
      toastRef?.current?.show({
        severity: "error",
        summary: "Báo cáo thất bại",
        detail: "Báo cáo",
      });
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="w-[40vw]">
      <div className="space-y-2 p-4">
        {items?.map((item: any, index: any) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600 flex-shrink-0"
              checked={selectedItems.includes(index)}
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
            className="form-textarea mt-1 block w-full rounded-md border border-black shadow-sm p-2"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center p-2 rounded-md">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReportTable;
