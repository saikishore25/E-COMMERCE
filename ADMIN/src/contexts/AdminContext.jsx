import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
    // Get the initial state from localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });

    const [activeTab, setActiveTab] = useState("addItems");

    // ✅ Login Function
    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true"); // Store in localStorage
    };

    // ✅ Logout Function
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated"); // Remove from localStorage
    };

    return (
        <AdminContext.Provider value={{ activeTab, setActiveTab, isAuthenticated, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
