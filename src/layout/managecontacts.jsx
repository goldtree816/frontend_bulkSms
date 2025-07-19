import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import handleClick from "../components/common/alert";
import handleEditClick from "../components/common/alert/edit";
import Pagination from "../components/pagination";
import axiosInstance from "../config/axios.config";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  f_name: Yup.string().required("First name is required"),
  l_name: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d{7,15}$/, "Phone number is invalid")
    .required("Phone number is required"),
});

const ManageContacts = () => {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedContacts, setCheckedContacts] = useState(new Set());
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    address: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const toggleContactCheck = (index) => {
    setCheckedContacts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const fetchContacts = async () => {
    try {
      const response = await axiosInstance.get("/usersContact/contacts");
      setContacts(response.Contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactSchema.validate(formData, { abortEarly: false });
      setErrors({});

      console.log("Validated Contact:", formData);

      setShowModal(false);
      setFormData({ f_name: "", l_name: "", address: "", phoneNumber: "" });
      fetchContacts();
    } catch (err) {
      if (err.inner) {
        const formErrors = {};
        err.inner.forEach((e) => {
          formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      }
    }
  };
  const submitContact = async () => {
    try {
      const response = await axiosInstance.post("/usersContact/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
      });
      console.log("Contact created:", response.data);
    } catch (error) {
      console.error("Error creating contact:", error);
      alert("Failed to create contact. Please try again.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Contacts</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded inline-flex items-center text-sm"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Add Contact
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1.5 rounded w-full max-w-xs"
        />
        <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded text-sm">
          Reset
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">First Name</th>
              <th className="border px-4 py-2 text-left">Last Name</th>
              <th className="border px-4 py-2 text-left">Address</th>
              <th className="border px-4 py-2 text-left">Phone Number</th>
              <th className="border px-4 py-2 text-center">Edit</th>
              <th className="border px-4 py-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={checkedContacts.has(index)}
                    onChange={() => toggleContactCheck(index)}
                    className="mx-2"
                  />
                  {item.id}
                </td>
                <td className="border px-4 py-2">{item.f_name}</td>
                <td className="border px-4 py-2">{item.l_name}</td>
                <td className="border px-4 py-2">{item.address}</td>
                <td className="border px-4 py-2">{item.phoneNumber}</td>
                <td className="border px-4 py-2 text-center">
                  <button onClick={handleEditClick} className="text-blue-600 hover:text-blue-800">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button onClick={handleClick} className="text-red-600 hover:text-red-800">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {checkedContacts.size > 0 && (

          <button
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
            onClick={() => {
              const selectedContacts = Array.from(checkedContacts)
                .map((index) => contacts[index]?.phoneNumber)
                .filter(Boolean);
              localStorage.setItem("selectedContacts", JSON.stringify(selectedContacts));
              navigate("/user/calendar");
            }}
          >
            Send Message
          </button>
        )}

      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>
          Displaying {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, contacts.length)} of {contacts.length}
        </span>
        <div className="flex items-center gap-1">
          <Pagination
            totalItems={contacts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-lg font-semibold mb-4">Create a New Contact</h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="f_name"
                  placeholder="First Name"
                  value={formData.f_name}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
                {errors.f_name && <p className="text-red-600 text-sm">{errors.f_name}</p>}
              </div>

              <div>
                <input
                  type="text"
                  name="l_name"
                  placeholder="Last Name"
                  value={formData.l_name}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
                {errors.l_name && <p className="text-red-600 text-sm">{errors.l_name}</p>}
              </div>

              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
                {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
              </div>

              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 text-sm">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={() => submitContact()}
                  className="bg-green-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                >
                  Create Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContacts;
