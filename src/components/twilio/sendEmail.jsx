import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axiosInstance from "../../config/axios.config";

const SendEmail = () => {
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState([]);
  const [message, setMessage] = useState("");
  const [groups, setGroups] = useState([]);
  const [checkedGroups, setCheckedGroups] = useState(new Set());
  const [expandedGroupIndex, setExpandedGroupIndex] = useState(null);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axiosInstance.get("/groups/getGroups");

        const filteredGroups = res.groups
          .map((group) => ({
            ...group,
            contactList:
              typeof group.contactList === "string"
                ? JSON.parse(group.contactList)
                : group.contactList,
          }))
          .filter((group) => group.groupType === "Email Group");


        console.log("the filtered group is :", filteredGroups)
        setGroups(filteredGroups);
      } catch (err) {
        console.error("Error fetching groups:", err);
      }
    };

    fetchGroups();
  }, []);

  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleEmailInputKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const enteredEmails = emailInput
        .split(/[,\s]+/)
        .map((email) => email.trim())
        .filter((email) => email && !emails.includes(email));
      setEmails((prev) => [...prev, ...enteredEmails]);
      setEmailInput("");
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

      const extractedEmails = jsonData
        .flat()
        .map((item) => String(item).trim())
        .filter((email) => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));

      setEmails((prev) => [...new Set([...prev, ...extractedEmails])]);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    if (!emails.length || !message.trim()) {
      alert("Please enter at least one email and a message.");
      return;
    }

    try {
      await axiosInstance.post("/numbers/email", {
        emails,
        message,
      });

      alert("Emails sent successfully!");
      setEmails([]);
      setMessage("");
      setEmailInput("");
      setCheckedGroups(new Set());
    } catch (err) {
      console.error("Error sending emails:", err);
      alert("Failed to send emails.");
    }
  };

  const toggleGroupCheck = (index) => {
    const updatedSet = new Set(checkedGroups);
    const group = groups[index];

    const groupEmails = group.contactList
      .map((contact) => contact.email?.trim())
      .filter(
        (email) =>
          email &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
          !emails.includes(email)
      );

    if (updatedSet.has(index)) {
      updatedSet.delete(index);
    } else {
      updatedSet.add(index);
      setEmails((prev) => [...prev, ...groupEmails]);
    }

    setCheckedGroups(updatedSet);
  };

  const selectedGroupEmails = Array.from(checkedGroups)
    .flatMap((index) => {
      const group = groups[index];
      if (!group || !Array.isArray(group.contactList)) return [];
      return group.contactList
        .map((contact) =>
          typeof contact === "object" ? contact.email : contact
        )
        .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    });

  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 p-6 bg-gray-100 min-h-screen">
      <div className="w-full md:w-[50%] bg-white shadow-lg rounded-2xl p-6 flex flex-col">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Addresses
          </label>
          <input
            type="text"
            value={emailInput}
            onChange={handleEmailInputChange}
            onKeyDown={handleEmailInputKeyPress}
            placeholder="Enter email addresses (comma or Enter)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload .xlsx File
          </label>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parsed Emails
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            value={emails.length ? emails.join("\n") : ""}
            readOnly
          />
        </div>
        <div className="flex flex-wrap gap-2 ml-15 w-auto">
          <div className="px-2 py-1 space-x-4">
            <label htmlFor="" className="font-medium">From</label>
            <input type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="px-2 py-1 space-x-4">
            <label htmlFor="" className="font-medium">To</label>
            <input type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)} />
          </div>

        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            rows={15}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Send Email
        </button>
      </div>
      <div className="w-full md:w-[30%] bg-white border rounded shadow-md flex flex-col">
        <div className="bg-gray-600 text-center py-2 rounded-t">
          <h1 className="text-white text-lg font-semibold">Email Groups</h1>
        </div>
        <div className="p-2 flex-1 overflow-y-auto">
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
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
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
                            ? contact.email || "No Email"
                            : contact}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No groups yet</p>
          )}

          {selectedGroupEmails.length > 0 && (
            <div className="mt-4 border-t pt-2">
              <h2 className="text-blue-600 font-semibold text-sm mb-2">
                Selected Group Emails
              </h2>
              <div className="text-xs max-h-40 overflow-y-auto bg-gray-50 p-2 border rounded">
                {selectedGroupEmails.map((email, i) => (
                  <div key={i}>{email}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
