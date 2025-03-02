// SignUp.js
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const SignUp = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {setIsAuthenticated, setUsername} = useContext(ShopContext)

    const navigate = useNavigate()
    const onSubmit = async (data) => {
        
        try{
            const response = await fetch("http://localhost:3000/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            const responseData = await response.json();
            console.log("Server Response:", responseData);
            if(response.ok){

                setIsAuthenticated(true)
                navigate("/")
                localStorage.setItem("username", responseData.username); // ✅ Store username
                console.log(responseData.username)
                setUsername(responseData.username);
                
            }

            
        } 
        
        catch(error){

            console.log("Error in Signing Up:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">Sign Up</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>

            <input
                type="text"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="User Name"
                {...register("username", { required: "User Name is required" })}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

            <input
                type="email"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <input
                type="password"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Password"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
                Sign Up
            </button>

            <p className="text-sm cursor-pointer mt-2" >
                Already have an account? <Link className="underline" to="/login">Login</Link>
            </p>
        </form>
    );
};

export default SignUp;
