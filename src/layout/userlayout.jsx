import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../config/axios.config";

const UserLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    console.log("the logged in user is :", user)
    console.log("the selected image is:", selectedImage);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);

        if (user?.image_url) {
            setSelectedImage(user.image_url);
        }
    }, []);


    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure you want to Log Out?",
            showDenyButton: true,
            icon: "warning",
            confirmButtonText: "Yes",
            denyButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                setIsLoggedIn(false);
                Swal.fire("Logged Out", "", "success");
                navigate("/login");
            } else {
                Swal.fire("Logout Cancelled", "", "info");
            }
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);
        formData.append("userId", user.id)

        try {
            const token = localStorage.getItem("accessToken");
            const response = await axiosInstance.post("/users/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("the front end response is:", response)
            setSelectedImage(response.data.imageUrl);
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    return (
        <>
            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-50 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 pt-4 overflow-y-auto bg-white">
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center relative">
                            <div className="relative mb-2">
                                <img
                                    className="w-20 h-20 rounded-full object-cover"
                                    src={
                                        selectedImage ||
                                        "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    }
                                    alt="user"
                                />
                                {isLoggedIn && (
                                    <>
                                        <label
                                            htmlFor="imageUpload"
                                            className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4 text-gray-600"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487a2.121 2.121 0 0 1 3 3L7.5 19.5H4.5v-3L16.862 4.487z"
                                                />
                                            </svg>
                                        </label>
                                        <input
                                            type="file"
                                            id="imageUpload"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </>
                                )}
                            </div>
                            <p className="text-xs font-medium text-gray-900">
                                {user?.f_name || "User Name"}
                            </p>
                            <p className="text-xs text-gray-900 truncate mb-2">
                                {user?.email || "user@example.com"}
                            </p>
                            <NavLink
                                to="/user/compose"
                                className="flex items-center justify-between px-3 py-2 w-full text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                            >
                                <span>Quick Compose</span>
                                <span className="text-lg font-bold">+</span>
                            </NavLink>
                        </div>
                    </div>

                    <ul className="mt-5 space-y-2 font-medium">
                        <span className="ms-3 text-xs font-medium">Menu</span>
                        <li>
                            <NavLink to="/user/profile" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                    <path d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                </svg>
                                <span className="ms-3 text-xs">Report</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/user/contacts" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.5-1.632Z" />
                                </svg>
                                <span className="ms-3 text-xs">Manage Contact</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/user/calendar" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                                <span className="ms-3 text-xs">Calendar</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/user/creategroup" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                </svg>

                                <span className="ms-3 text-xs">Create Group</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/whatsApp" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>

                                <span className="ms-3 text-xs">WhatsApp Msg</span>
                            </NavLink>
                        </li>
                        <li>

                            <NavLink to="/user/email" className="flex itmes-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                                </svg>

                                <span className="ms-3 text-xs">Send Email</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/user/service" className="flex itmes-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                </svg>

                                <span className="ms-3 text-xs">Services</span>

                            </NavLink>
                        </li>
                        {isLoggedIn ? (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6A2.25 2.25 0 0 0 15.75 18.75V15m3 0 3-3m0 0-3-3m3 3H9" />
                                    </svg>
                                    <span className="ms-3 text-xs">Logout</span>
                                </button>
                            </li>
                        ) : (
                            <li>
                                <NavLink
                                    to="/login"
                                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                                >
                                    <span className="ms-3 text-xs">Login</span>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-44">
                <div className="border-2 border-gray-200 rounded-lg mt-0">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default UserLayout;

