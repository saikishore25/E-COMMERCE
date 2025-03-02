import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const Login = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userNotFound, setUserNotFound] = useState()
    const [passwordWrong, setPasswordWrong] = useState()

    const {setIsAuthenticated, setUsername} = useContext(ShopContext)
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        
        try{
            const response = await fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials:"include"
            });

            const responseData = await response.json();
            // console.log("Server Response:", responseData);
            
            if(response.ok){

                setIsAuthenticated(true)
                navigate("/")
                localStorage.setItem("username", responseData.username); // ✅ Store username
                setUsername(responseData.username);
                
            }
            else{

                if(responseData.message === "User Not Found"){

                    setUserNotFound("User Not Registered, Please enter registered Email ID")

                }

                else if(responseData.message === "Incorrect Password"){

                    setPasswordWrong("Wrong Password!!")

                }
            }
            
        } 
        
        catch(error){

            console.log("Error in Logging In:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">Login</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>

            <input
                type="email"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-600 font-bold text-sm">{errors.email.message}</p>}
            {userNotFound && <p className="text-red-600 font-bold text-sm">{userNotFound}</p>}

            <input
                type="password"
                className="w-full px-3 py-2 border border-gray-800"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-600 font-bold text-sm">{errors.password.message}</p>}
            {passwordWrong && <p className="text-red-600 font-bold text-sm">{passwordWrong}</p>}

            <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
                Login
            </button>

            <p className="text-sm cursor-pointer mt-2" >
                Don't have an account? <Link className="underline" to="/signup">Sign Up</Link>
            </p>
        </form>
    );
};

export default Login;
