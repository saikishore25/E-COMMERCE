import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AdminContext } from "../contexts/adminContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const { login, isAuthenticated } = useContext(AdminContext);  // ✅ Use login function
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = async (data) => {
    try {
        const response = await fetch("http://localhost:3000/api/user/admin-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        });

        const responseData = await response.json();
        console.log("Server Response:", responseData);

        if (response.ok) {
            login(); // Use the login function to set authentication state
            navigate("/admin");
        }
    } catch (error) {
        console.log("Error in Logging In:", error);
    }
};


    console.log(isAuthenticated)
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white shadow-2xl border border-gray-300 rounded-lg">
                
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                    
                    <input
                        type="email"
                        placeholder="Admin Email"
                        {...register("email", { 
                            required: "Email is required", 
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } 
                        })}
                        className="border-2 p-2 w-full rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { 
                            required: "Password is required", 
                            minLength: { value: 6, message: "Password must be at least 6 characters" } 
                        })}
                        className="border-2 p-2 w-full rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    <button type="submit" className="bg-black text-white py-2 rounded-md w-full hover:bg-gray-800 transition duration-300">
                        Login
                    </button>
                </form>

            </div>
        </div>
    );
};

export default AdminLogin;
