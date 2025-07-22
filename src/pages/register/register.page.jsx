import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../config/axios.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa"

const RegisterPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPaword, setShowConfirmPassword] = useState(false);

    const rules = Yup.object({
        f_name: Yup.string().min(2).max(20).required("First Name is required"),
        l_name: Yup.string().min(2).max(20).required("Last Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, "Password must be strong")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Confirm password and password do not match")
            .required("Confirm Password is required"),
    });
    const togglePassword=()=>{
        setShowPassword(!showPassword);
    }
    const toggleConfirmPassword=()=>{
        setShowConfirmPassword(!showConfirmPaword);
    }
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(rules)
    });

    const submitEvent = async (data) => {
        try {
            const response = await axiosInstance.post("/users/register", data);
            console.log("Response:", response);

            toast.success("Registration Successful!");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (exception) {
            console.log("Register Exception:", exception.response?.data || exception.message);
            toast.error(exception.response?.data?.message || "Registration failed. Try again.");
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

            <div className="bg-gradient-to-r from-indigo-400 via-blue-400 to-green-400 h-[100vh] flex items-center justify-center">
                <div className="bg-white h-auto w-[50%] rounded-xl">
                    <h1 className="text-blue-500 text-center text-2xl font-bold">Register Page</h1>
                    <form onSubmit={handleSubmit(submitEvent)}>
                        <div className="flex w-full items-center justify-center mt-2 mb-6">
                            <div className="flex w-[80%] flex-col space-y-4">

                                <label>First Name</label>
                                <input {...register("f_name")} type="text" className="border-b-2 focus:outline-none" placeholder="Enter your name here" />
                                <p className="text-red-500">{errors?.f_name?.message}</p>

                                <label>Last Name</label>
                                <input {...register("l_name")} type="text" className="border-b-2 focus:outline-none" placeholder="Enter your username" />
                                <p className="text-red-500">{errors?.l_name?.message}</p>

                                <label>Email</label>
                                <input {...register("email")} type="text" className="border-b-2 focus:outline-none" placeholder="Enter your @email" />
                                <p className="text-red-500">{errors?.email?.message}</p>

                                <div className="flex flex-col">
                                    <label className="mb-1">Password</label>
                                    <div className="flex items-center border-b-2">
                                        <input
                                            {...register("password")}
                                            type={showPassword ? "text" : "password"}
                                            className="flex-1 focus:outline-none"
                                            placeholder="Enter your password"
                                        />
                                        <span onClick={togglePassword} className="cursor-pointer text-gray-600 px-2">
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    <p className="text-red-500 text-sm mt-1">{errors?.password?.message}</p>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="flex items-center border-b-2">
                                        <input type={showConfirmPaword? "text":"password"} 
                                        className="flex-1 focus:outline-none"
                                        placeholder="Enter you password again"/>

                                        <span onClick={toggleConfirmPassword}>
                                            {showConfirmPaword ? <FaEyeSlash/>:<FaEye/>}
                                        </span>

                                    </div>

                                </div>

                                <button type="button" className="text-blue-500" onClick={() => navigate("/login")}>
                                    You already have an Account?
                                </button>

                                <button type="submit" className="border-2 rounded-full bg-green-500 hover:bg-blue-500 h-10 text-white transition-colors duration-300">
                                    Sign Up
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
