import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import * as Yup from "yup";
import axiosInstance from "../../config/axios.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import AuthContext from "../../context/auth.context";

const LoginPage = () => {
    const navigate = useNavigate();
    const { setLoggedInUser } = useContext(AuthContext);

    const loginDto = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is compulsory"),
        password: Yup.string().required("Password is required")
    });

    const { control, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(loginDto),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const submitForm = async (data) => {
        try {
            const response = await axiosInstance.post("users/login", data);
            const accessToken = response.token;
            const loggedInUser = response.user;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            setLoggedInUser(loggedInUser);

            toast.success("Welcome to user Dashboard");
            setTimeout(() => {
                navigate("/user/dashboard");
            }, 1000);
        } catch (error) {
            console.log(error);
            if (error.response) {
                const { status, data: { message } } = error.response;
                if (status === 404) {
                    setError("email", { type: "manual", message: "Email is not registered" });
                } else if (status === 401) {
                    setError("password", { type: "manual", message: "Incorrect password" });
                } else {
                    alert(message || "An unexpected error occurred.");
                }
            } else {
                alert("Network error. Please try again.");
            }
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <div className="flex bg-gradient-to-r from-indigo-500 via-purple-500 to-green-400 h-[100vh] w-full justify-center items-center">
                <div className="flex flex-col bg-white w-[44%] h-[550px] rounded-xl items-center">
                    <h1 className="text-center mt-2 font-bold text-2xl">Login</h1>
                    <form onSubmit={handleSubmit(submitForm)} className="w-full flex flex-col items-center">
                        <div className="flex flex-col w-[90%] px-4 rounded mt-10 space-y-2">
                            <label>Email</label>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        className="border-b-2 focus:outline-none border-gray-300 h-10 flex items-center px-1"
                                        placeholder="Type your Email"
                                    />
                                )}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                            <label className="mt-4">Password</label>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="password"
                                        className="border-b-2 border-gray-300 focus:outline-none h-10 flex items-center px-1"
                                        placeholder="Type your Password"
                                    />
                                )}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                            <a className="text-gray-500 self-end hover:text-red-500 cursor-pointer">Forget Password?</a>
                        </div>

                        <button
                            type="submit"
                            className="border-2 mt-4 rounded-full w-[70%] h-10 bg-pink-500 hover:bg-blue-500 text-white flex items-center justify-center"
                        >
                            Login
                        </button>
                    </form>

                    <h3 className="mt-6 text-center text-blue-500">Or SignUp using</h3>
                    <div className="flex space-x-4 mt-3 justify-center">
                        <SocialIcon url="https://www.google.com" style={{ height: 30, width: 30 }} />
                        <SocialIcon url="https://www.facebook.com" style={{ height: 30, width: 30 }} />
                        <SocialIcon url="https://www.twitter.com" style={{ height: 30, width: 30 }} />
                    </div>

                    <h3 className="mt-4 text-blue-500">Don't have account?</h3>
                    <button
                        className="border-2 rounded-full h-10 bg-blue-400 w-[70%] mt-2 text-white hover:bg-blue-500"
                        onClick={() => navigate('/register')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
