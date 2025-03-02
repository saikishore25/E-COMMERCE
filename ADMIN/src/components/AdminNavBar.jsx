import React from 'react'
import logo_png from "../assets/logo.png"
import { useContext } from 'react'
import { AdminContext } from '../contexts/adminContext'
import { useNavigate } from "react-router-dom";  // ✅ Fix: Add navigate

const AdminNavBar = () => {
    const { isAuthenticated, logout } = useContext(AdminContext);  // ✅ Use logout from AdminContext
    const navigate = useNavigate(); // ✅ Fix: Define navigate


const onLogout = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/user/admin-logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const responseData = await response.json();
        console.log("Server Response:", responseData);

        if (response.ok) {
            logout(); // Use the logout function
            navigate("/admin-login"); // Redirect to login page
        }
    } 
    catch(error){
        
        console.log("Error in Logging Out:", error)
    }
};

    
    console.log(isAuthenticated)
    return (
        <>
            <div className="flex items-center py-2 px-[4%] justify-between border-b-2 border-gray-400">
                <img className="w-[max(10%,80px)]" src={logo_png} alt=""/>
                
                {isAuthenticated && (
                    <button 
                        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm" 
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                )}
            </div>
        </>
    );
};

export default AdminNavBar;
