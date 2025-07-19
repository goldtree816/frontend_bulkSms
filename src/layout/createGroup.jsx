import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import * as Yup from "yup";
import axiosInstance from "../config/axios.config";
import handleClick from "../components/common/alert";
import handleEditClick from "../components/common/alert/edit";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState("");
    const [groupType, setGroupType] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [fileName, setFileName] = useState("");
    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGroups = groups.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(groups.length / itemsPerPage);

    const validGroupTypes = ["Contact Group", "WhatsApp Group", "Email Group"];

    const phoneOrEmailSchema = Yup.string()
        .test("is-valid-contact", "Must be a valid phone number or email", (value) => {
            if (!value) return false;

            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            const isPhone = /^\d{7,15}$/.test(value);

            return isEmail || isPhone;
        });

    const validationSchema = Yup.object({
        groupName: Yup.string().min(2).max(20).required("Group name is required"),
        fileName: Yup.string().required("File is required"),
        contactList: Yup.array()
            .of(phoneOrEmailSchema)
            .min(1, "At least one valid phone number or email is required")
            .required("Contact list is required"),
        groupType: Yup.string()
            .oneOf(validGroupTypes, "Invalid group type")
            .required("Group type is required"),
    });


    const fetchGroups = async () => {
        try {
            const response = await axiosInstance.get("/groups/getGroups", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            const formattedGroups = response.groups.map(group => ({
                ...group,
                contactList: typeof group.contactList === "string"
                    ? JSON.parse(group.contactList)
                    : group.contactList,
            }));

            console.log("the greous are:", formattedGroups)

            setGroups(formattedGroups);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleXLSXUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

            const contacts = data
                .map((row) => {
                    const value = row.phoneNumber || row.phone || row.email;

                    if (!value) return null;

                    const strValue = String(value).trim();
                    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strValue);
                    if (isEmail) return strValue;
                    const cleanPhone = strValue.replace(/\D/g, "");
                    return cleanPhone ? cleanPhone : null;
                })
                .filter((val) => val !== null);

            setPhoneNumbers(contacts);
            console.log("The extracted phone numbers or emails are:", contacts);

        };
        reader.readAsBinaryString(file);
    };

    const handleSubmitGroup = async () => {
        const formData = {
            groupName: groupName.trim(),
            fileName,
            contactList: phoneNumbers,
            groupType,
        };

        try {
            await validationSchema.validate(formData, { abortEarly: false });

            await axiosInstance.post("/groups", formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            alert("Group Created Successfully!");
            setGroupName("");
            setGroupType("");
            setFileName("");
            setPhoneNumbers([]);
            setShowModal(false);
            fetchGroups();
        } catch (err) {
            if (err.name === "ValidationError") {
                alert(err.errors.join("\n"));
            } else if (err.response) {
                alert("Server Error: " + err.response.data.message);
            } else {
                alert("Error: " + err.message);
            }
        }
    };

    return (
        <>
            <div className="flex justify-between items-center px-4 py-2">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search groups..."
                        className="border h-10 px-3 rounded"
                    />
                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                        Search
                    </button>
                </div>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowModal(true)}
                >
                    + Add Group
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-md mb-6">
                <table className="min-w-full text-sm text-left text-gray-700 bg-white">
                    <thead className="bg-gray-100 text-gray-900 uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-3 border-b">ID</th>
                            <th className="px-6 py-3 border-b">Group Name</th>
                            <th className="px-6 py-3 border-b">Group Type</th>
                            <th className="px-6 py-3 border-b">File Name</th>
                            <th className="px-6 py-3 border-b">Contact List</th>
                            <th className="px-6 py-3 border-b">Created By</th>
                            <th className="px-6 py-3 border-b">Created Time</th>
                            <th className="px-6 py-3 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentGroups.map((group, index) => (
                            <tr key={group._id || index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-b">{group.id}</td>
                                <td className="px-6 py-4 border-b">{group.groupName}</td>
                                <td className="px-6 py-4 border-b">{group.groupType || "N/A"}</td>
                                <td className="px-6 py-4 border-b">{group.fileName}</td>
                                <td className="px-6 py-4 border-b">{group.contactList?.length || 0} contacts</td>
                                <td className="px-6 py-4 border-b">{group.createdBy || "N/A"}</td>
                                <td className="px-6 py-4 border-b">{new Date(group.createdAt).toLocaleString()}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleEditClick(group.id, navigate)}
                                        className="text-blue-600 mx-4 hover:text-blue-800"
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleClick(group.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-600 px-4">
                <span>
                    Displaying {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, groups.length)} of {groups.length}
                </span>
                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1
                                ? "bg-green-500 text-white"
                                : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
                    <div className="bg-white w-full max-w-xl rounded p-6 space-y-4 shadow-xl">
                        <h2 className="text-lg font-bold">Create New Group</h2>

                        <div>
                            <label className="block font-bold mb-1">Group Name</label>
                            <input
                                className="border border-black w-full p-2 rounded"
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block font-bold mb-1">Group Type</label>
                            <select
                                value={groupType}
                                onChange={(e) => setGroupType(e.target.value)}
                                className="block w-full border p-2 border-gray-400 rounded"
                            >
                                <option value="">-- Select Group Type --</option>
                                {validGroupTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block font-bold mb-1">Upload Contacts (.xlsx)</label>
                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleXLSXUpload}
                                className="block w-full border p-2 border-gray-400 rounded"
                            />
                            {fileName && <p className="text-sm mt-1 text-gray-600">Uploaded: {fileName}</p>}
                        </div>

                        {phoneNumbers.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-2">Imported Phone Numbers:</h3>
                                <ul className="list-disc pl-5 max-h-32 overflow-y-auto">
                                    {phoneNumbers.map((number, idx) => (
                                        <li key={idx}>{number}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded"
                                onClick={handleSubmitGroup}
                            >
                                + Create Group
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateGroup;
