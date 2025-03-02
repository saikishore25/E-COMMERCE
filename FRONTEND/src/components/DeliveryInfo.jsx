import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ShopContext } from "../contexts/ShopContext";

const DeliveryInfo = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const {isAuthenticated, backendURL, username} = useContext(ShopContext)

    const onSubmit = async (data) => {
        // console.log(data)
        if (!isAuthenticated) {
            console.log("User is not authenticated");
            return;
        }
    
        if (!username) {
            console.log("Username is missing");
            return;
        }
    
        try {
            const response = await fetch(`${backendURL}/api/user/delivery-address`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ username, ...data })  // Spreading form data correctly
            });
    
            const responseData = await response.json();
            console.log(responseData);
    
            if (!response.ok) {
                console.log("Failed to add address");
            }
        } catch (error) {
            console.log("Some error occurred", error);
        }

        reset()
        
    };
    
    

    console.log(isAuthenticated)

    return (
        <>
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[60%]"
        >
        
            <div className="text-xl sm:text-2xl my-3">
                <div className="inline-flex gap-2 items-center mb-3">
                <p className="text-gray-500">
                    DELIVERY <span className="text-gray-700 font-medium">INFORMATION</span>
                </p>
                <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
            </div>

 
            <div className="flex gap-3">
                <input
                {...register("firstName", { required: "First name is required" })}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="First name"
                />
                <input
                {...register("lastName", { required: "Last name is required" })}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Last name"
                />
            </div>


            <input
                {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                },
                })}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="email"
                placeholder="Email address"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}


            <input
                {...register("street", { required: "Street address is required" })}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Street"
            />

    
            <div className="flex gap-3">
                <input
                {...register("city", { required: "City is required" })}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="City"
                />
                <input
                {...register("state")}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="State"
                />
            </div>

 
            <div className="flex gap-3">
                <input
                {...register("zipcode", {
                    required: "Zipcode is required",
                    minLength: { value: 5, message: "Zipcode must be at least 5 digits" },
                })}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="number"
                placeholder="Zipcode"
                />
                <input
                {...register("country", { required: "Country is required" })}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Country"
                />
            </div>

        
            <input
                {...register("phone", {
                required: "Phone number is required",
                minLength: { value: 10, message: "Phone number must be at least 10 digits" },
                })}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="number"
                placeholder="Phone"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

        
            <button
                type="submit"
                disabled={!isAuthenticated}
                className={`bg-black text-white font-light px-8 py-2 mt-4 transition-all duration-300 ${
                    isAuthenticated ?  "hover:bg-gray-900" :"bg-gray-400 cursor-not-allowed"
                }`}
                >
                Submit
            </button>

        </form>
    </>
  );
};

export default DeliveryInfo;
