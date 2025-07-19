import { useState } from "react";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import handleClick from "../common/alert";
import handleEditClick from "../common/alert/edit";
import Pagination from "../pagination";

const TableComponent = ({ data }) => {

  const [selectedRows, setSelectedRows] = useState([]);
  const allSelected = selectedRows.length === data.length && data.length > 0;
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, index) => index));
    }
  };

  const handleRowSelect = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="mt-1 w-full text-sm overflow-x-auto text-left rtl:text-right bg-white border border-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-white border border-gray-300">
          <tr>
            <th className="p-4">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={allSelected}
                onChange={handleSelectAll}
                aria-label="Select all rows"
              />
            </th>
            <th className="px-6 py-3">Time</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`bg-white border-b hover:bg-gray-50 ${selectedRows.includes(index) ? "bg-blue-50" : ""
                }`}
            >
              <td className="w-4 p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleRowSelect(index)}
                  aria-label={`Select row ${index + 1}`}
                />
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                {item.time}
              </th>
              <td className="px-6 py-4">{item.from}</td>
              <td className="px-6 py-4">{item.to}</td>
              <td className="px-6 py-4">{item.type}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-center
                ${item.status.toLowerCase() === "sending"
                      ? "text-yellow-700 bg-yellow-100"
                      : item.status.toLowerCase() === "failed"
                        ? "text-red-700 bg-red-100"
                        : item.status.toLowerCase() === "delivered"
                          ? "text-green-700 bg-green-100"
                          : "text-gray-700 bg-gray-100"
                    }`}
                  style={{ minWidth: "80px", height: "32px", lineHeight: "20px" }}
                >
                  {item.status}
                </span>
              </td>

              <td className="flex items-center gap-4 px-6 py-4">
                <button
                  onClick={handleEditClick}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={handleClick}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end text-sm text-gray-600 mb-2 px-2">
        <div className="flex items-center gap-1">
          <Pagination/>

        </div>
      </div>
    </div>
  );
};

export default TableComponent;
