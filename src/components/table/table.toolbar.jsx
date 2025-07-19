import React, { useState } from 'react';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, FunnelIcon, Cog6ToothIcon, TrashIcon } from '@heroicons/react/24/outline';

const TableToolbar = () => {
    const [actionOpen, setActionOpen] = useState(false);

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-gray-300">
            <div className="flex flex-wrap items-center gap-3">
                <label className="text-sm font-medium flex items-center">
                    Show entries
                    <select className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                </label>

                <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded border border-gray-300">
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    Import
                </button>

                <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded border border-gray-300">
                    <ArrowUpTrayIcon className="h-4 w-4" />
                    Export
                </button>
            </div>

            {/* Right section */}
            <div className="flex flex-wrap items-center gap-3 relative">
                <input
                    type="text"
                    placeholder="Search here..."
                    className="border border-gray-300 rounded px-3 py-1 text-sm w-[200px]"
                />

                <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded border border-gray-300">
                    <FunnelIcon className="h-4 w-4" />
                    Filter
                </button>
                <div className="relative">
                    <button
                        onClick={() => setActionOpen(!actionOpen)}
                        className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded border border-gray-300"
                    >
                        <Cog6ToothIcon className="h-4 w-4" />
                        Action
                    </button>

                    {actionOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                            <ul className="text-sm text-gray-700">

                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                    <TrashIcon className="h-5 w-5 text-red-600" />
                                    <span>Delete</span>
                                </li>

                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TableToolbar;
