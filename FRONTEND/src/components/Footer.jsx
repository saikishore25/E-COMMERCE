import React from 'react';
import logo from "../assets/frontend_assets/logo.png";

const Footer = () => {
    return (
        <>
            <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-10 sm:gap-14 mt-20 px-5 sm:px-10 text-sm'>
                <div className='text-center sm:text-left'>
                    <img src={logo} className='mx-auto sm:mx-0 mb-5 w-28 sm:w-32' alt="Logo" />
                    <p className='w-full md:w-2/3 mx-auto sm:mx-0 text-gray-600'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis culpa perferendis voluptatum ipsum consequatur, excepturi dolor!
                    </p>
                </div>

                <div className='text-center sm:text-left'>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className='text-center sm:text-left'>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1-212-456-789</li>
                        <li>contact@foreverybuy.com</li>
                    </ul>
                </div>
            </div>

            <div className='mt-10 px-5 sm:px-10'>
                <hr className='border-gray-300' />
                <p className='py-5 text-sm text-center'>
                    © 2024 forever.com - All Rights Reserved
                </p>
            </div>
        </>
    );
};

export default Footer;
