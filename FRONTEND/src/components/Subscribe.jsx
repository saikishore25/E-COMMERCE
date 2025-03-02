import React from 'react'
import { useForm } from "react-hook-form";


const Subscribe = () => {

    const {register, handleSubmit, formState: { errors },} = useForm();
    
    const onSubmit = (data) => {
        
        console.log("Email:", data);
    };
    return (
        <>

            <div className="subscribe-area flex items-center justify-center flex-col w-full mt-10 gap-3">

                <p className='font-semibold text-2xl '>Subscribe now & get 20% off</p>
                <p className='font-medium text-sm text-gray-500'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                
                <form className='flex items-center justify-center flex-row w-[70%]'>

                    <input
                        {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                        placeholder="Enter your email"
                        className="p-2 w-[50%] h-10 border-gray-300 border-2 outline-none"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <button type="submit" className='bg-black h-10 w-fit text-white p-2 '>Subscribe</button>
                </form>

            </div>
        
        </>
    )
}

export default Subscribe
