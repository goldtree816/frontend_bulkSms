import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axiosInstance from "../../config/axios.config";

const SendWhatsAppMsg = () => {
    const [numberInput, setNumberInput] = useState("");
    const [numbers, setNumbers] = useState([]);
    const [message, setMessage] = useState("");

    const [groups, setGroups] = useState([]);
    const [checkedGroups, setCheckedGroups] = useState(new Set());
    const [expandedGroupIndex, setExpandedGroupIndex] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axiosInstance.get("/groups/getGroups");

                const formattedGroups = res.groups
                    .map((group) => ({
                        ...group,
                        contactList:
                            typeof group.contactList === "string"
                                ? JSON.parse(group.contactList)
                                : group.contactList,
                    }))
                    .filter((group) => group.groupType === "WhatsApp Group");

                setGroups(formattedGroups);
                console.log("the groups are:", formattedGroups);
            } catch (err) {
                console.error("Failed to load WhatsApp groups", err);
            }
        };

        fetchGroups();
    }, []);

    const handleNumberInputChange = (e) => {
        setNumberInput(e.target.value);
    };

    const handleNumberInputKeyPress = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const enteredNumbers = numberInput
                .split(/[,\s]+/)
                .map((num) => num.trim())
                .filter((num) => num && !numbers.includes(num));
            setNumbers((prev) => [...prev, ...enteredNumbers]);
            setNumberInput("");
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = evt.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const extractedNumbers = jsonData
                .flat()
                .map((item) => String(item).trim())
                .filter((num) => num.match(/^\+?\d{6,}$/));

            setNumbers((prev) => [...new Set([...prev, ...extractedNumbers])]);
        };
        reader.readAsBinaryString(file);
    };

    const toggleGroupCheck = (index) => {
        const updatedSet = new Set(checkedGroups);
        const group = groups[index];

        const groupNumbers = group.contactList
            .map((contact) => {
                if (typeof contact === "object" && contact?.number) return contact.number.trim();
                if (typeof contact === "string") return contact.trim();
                return null;
            })
            .filter((num) => num && /^\+?\d{6,}$/.test(num));

        if (updatedSet.has(index)) {
            updatedSet.delete(index);
            setNumbers((prev) => prev.filter((num) => !groupNumbers.includes(num)));
        } else {
            updatedSet.add(index);
            setNumbers((prev) => [...new Set([...prev, ...groupNumbers])]);
        }

        setCheckedGroups(updatedSet);
    };

    const handleSubmit = async () => {
        if (!numbers.length || !message.trim()) {
            alert("Please enter at least one number and a message.");
            return;
        }

        try {
            await axiosInstance.post("/numbers/whatsAppMessage", {
                numbers,
                message,
            });

            alert("WhatsApp messages sent successfully!");
            setNumbers([]);
            setMessage("");
            setNumberInput("");
            setCheckedGroups(new Set());
        } catch (err) {
            console.error("Error sending messages:", err);
            alert("Failed to send WhatsApp messages.");
        }
    };

    const selectedGroupContacts = Array.from(checkedGroups)
        .flatMap((index) => {
            const group = groups[index];
            if (!group || !Array.isArray(group.contactList)) return [];
            return group.contactList
                .map((contact) => (typeof contact === "object" ? contact.number : contact))
                .filter(Boolean);
        });

    return (
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 p-6 bg-gray-100 min-h-screen">
            <div className="w-full md:w-[60%] max-w-xl bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-bold mb-4 text-green-700">Send WhatsApp Message</h2>

                <input
                    type="text"
                    value={numberInput}
                    onChange={handleNumberInputChange}
                    onKeyDown={handleNumberInputKeyPress}
                    placeholder="Enter WhatsApp numbers (comma or Enter)"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <label className="block mb-2 font-semibold">Upload .xlsx file</label>
                <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileUpload}
                    className="w-full mb-4 border border-gray-300 rounded"
                />
                <div className="mb-4">
                    <label className="font-semibold mb-1">Numbers</label>
                    <div className="border border-gray-300 w-full rounded p-2 bg-gray-50 max-h-40 overflow-y-auto text-sm space-y-2">
                        {selectedGroupContacts.length > 0 && (
                            <div>
                                <div className="font-semibold text-green-700 mb-1">From Selected Groups:</div>
                                {selectedGroupContacts.map((num, idx) => (
                                    <div key={`group-${idx}`}>{num}</div>
                                ))}
                            </div>
                        )}

                        {numbers.filter(num => !selectedGroupContacts.includes(num)).length > 0 && (
                            <div>
                                <div className="font-semibold text-blue-700 mt-2 mb-1">From Manual Entry / File:</div>
                                {numbers
                                    .filter(num => !selectedGroupContacts.includes(num))
                                    .map((num, idx) => (
                                        <div key={`manual-${idx}`}>{num}</div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>


                <label className="font-semibold">Message</label>
                <textarea
                    rows={5}
                    className="border border-gray-300 w-full rounded mb-4 p-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                />

                <button
                    onClick={handleSubmit}
                    className="font-bold bg-green-500 hover:bg-green-600 text-white p-3 rounded w-full"
                >
                    Send Message
                </button>
            </div>

            <div className="w-full md:w-[30%] bg-white border rounded shadow-md h-fit">
                <div className="bg-green-600 text-center py-2 rounded-t">
                    <h1 className="text-white text-lg font-semibold">WhatsApp Groups</h1>
                </div>
                <div className="p-2 max-h-96 overflow-y-auto">
                    {groups.length > 0 ? (
                        groups.map((group, index) => (
                            <div key={index} className="p-2 border-b text-sm">
                                <div className="flex justify-between items-center">
                                    <label className="flex items-center space-x-2 cursor-pointer text-sm">
                                        <input
                                            type="checkbox"
                                            checked={checkedGroups.has(index)}
                                            onChange={() => toggleGroupCheck(index)}
                                            className="w-4 h-4"
                                        />
                                        <span>
                                            <strong>{group.groupName}</strong> -{" "}
                                            {Array.isArray(group.contactList)
                                                ? `${group.contactList.length} contacts`
                                                : "0 contacts"}
                                        </span>
                                    </label>
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                                        onClick={() =>
                                            setExpandedGroupIndex(
                                                expandedGroupIndex === index ? null : index
                                            )
                                        }
                                    >
                                        {expandedGroupIndex === index ? "Hide" : "View"}
                                    </button>
                                </div>

                                {expandedGroupIndex === index &&
                                    Array.isArray(group.contactList) && (
                                        <ul className="mt-2 ml-6 list-disc text-xs max-h-32 overflow-y-auto">
                                            {group.contactList.map((contact, i) => (
                                                <li key={i}>
                                                    {typeof contact === "object"
                                                        ? contact.number || "No Number"
                                                        : contact}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No groups available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SendWhatsAppMsg;

