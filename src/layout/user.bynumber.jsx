import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Pagination from "../components/pagination";
import axios from "axios";

const FilterByCountry = () => {
    const [filterCountry, setFilterCountry] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState([]);

    const handleBuy = (phone) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to buy this number: ${phone}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, buy it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Bought!", `You bought ${phone}`, "success");
            }
        });
    };

    const fetchPhoneNumbers = async () => {
        if (!filterCountry) {
            // setPhoneNumbers([]);
            return;
        }

        try {
            const params = new URLSearchParams();
            params.append("country", filterCountry);

            const response = await axios.get(`http://localhost:3000/buynumbers/country?${params.toString()}`);
            setPhoneNumbers(response.data.data);
            console.log(response.data);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Could not fetch phone numbers", "error");
        }
    };

    useEffect(() => {
        fetchPhoneNumbers();
    }, [filterCountry]);

    return (
        <div className="border border-black rounded w-full h-auto bg-gray-100">
            <div className="space-x-2 mt-2 mb-2 pl-1 flex flex-wrap gap-2">
                <div>
                    <label className="font-semibold">Choose the Country</label>
                    <select
                        className="border border-gray-500 rounded ml-2"
                        onChange={(e) => setFilterCountry(e.target.value)}
                        value={filterCountry}
                    >
                        <option value="">Select Country</option>
                        <option value="US">USA</option>
                        <option value="GB">UK</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                    </select>
                </div>
            </div>

            <table className="table-auto w-[98%] mt-4 ml-1 bg-white shadow-lg rounded-md overflow-hidden">
                <thead className="bg-blue-600 text-white text-md">
                    <tr className="h-14">
                        <th className="px-4 py-2 text-center">Phone Number</th>
                        <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {phoneNumbers.length > 0 ? (
                        phoneNumbers.map((number, index) => (
                            <tr
                                key={index}
                                className={`h-14 hover:bg-blue-50 transition duration-200 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                            >
                                <td className="px-4 py-2 text-center">{number}</td>
                                <td className="text-center">
                                    <button
                                        className="border-2 rounded-full bg-green-600 text-white w-28 h-8 hover:bg-red-600"
                                        onClick={() => handleBuy(number)}
                                    >
                                        Buy Number
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center py-4 text-gray-500">
                                No numbers found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-4 flex justify-end text-sm text-gray-600 mb-2 px-2">
                <div className="flex items-center gap-1">
                    <Pagination />
                </div>
            </div>
        </div>
    );
};

export default FilterByCountry;
