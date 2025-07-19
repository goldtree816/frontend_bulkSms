import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../config/axios.config";

const EditGroup = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    groupName: "",
    fileName: "",
    contactList: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axiosInstance.get(`/groups/${id}`);
        const data = response;

        let parsedContacts = [];
        try {
          parsedContacts = JSON.parse(data.contactList);
          if (!Array.isArray(parsedContacts)) parsedContacts = [];
        } catch (err) {
          parsedContacts = [];
        }

        setForm({
          groupName: data.groupName || "",
          fileName: data.fileName || "",
          contactList: parsedContacts,
        });

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch group data:", error);
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneNumberChange = (index, value) => {
    const updatedList = [...form.contactList];
    updatedList[index] = value;
    setForm((prev) => ({ ...prev, contactList: updatedList }));
  };

  const addPhoneNumber = () => {
    setForm((prev) => ({
      ...prev,
      contactList: [...prev.contactList, ""],
    }));
  };

  const removePhoneNumber = (index) => {
    const updatedList = [...form.contactList];
    updatedList.splice(index, 1);
    setForm((prev) => ({ ...prev, contactList: updatedList }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/groups/${id}`, form);
      alert("Group updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update group");
    }
  };

  if (loading) return <p className="p-4">Loading group data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Group Name</label>
          <input
            type="text"
            name="groupName"
            value={form.groupName}
            onChange={handleChange}
            placeholder="Group Name"
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">File Name</label>
          <input
            type="text"
            name="fileName"
            value={form.fileName}
            onChange={handleChange}
            placeholder="File Name"
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Contact List</label>
          {form.contactList.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border border-gray-200 p-2 rounded">
              {form.contactList.map((number, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={number}
                    onChange={(e) =>
                      handlePhoneNumberChange(index, e.target.value)
                    }
                    className="border p-1 rounded flex-grow"
                    placeholder="Phone number"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoneNumber(index)}
                    className="text-red-600 hover:text-red-800 font-bold"
                    title="Remove phone number"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No phone numbers available</p>
          )}
          <button
            type="button"
            onClick={addPhoneNumber}
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            + Add Phone Number
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditGroup;
