import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext({
    loggedInUser: null,
    setLoggedInUser: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
        if (user) {
            setLoggedInUser(user);
        }
    }, []);

    const logout = () => {
        setLoggedInUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
