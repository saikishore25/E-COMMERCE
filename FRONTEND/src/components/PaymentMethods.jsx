import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import razorpay_logo from "../assets/frontend_assets/razorpay_logo.png";
import stripe_logo from "../assets/frontend_assets/stripe_logo.png";
import { ShopContext } from "../contexts/ShopContext";

const PaymentMethods = () => {
    const { setPaymentMethod } = useContext(ShopContext);
    
    const { register, watch } = useForm({
        defaultValues: {
            paymentMethod: "COD", // Default selection
        }
    });

    // Watch selected payment method
    const selectedPaymentMethod = watch("paymentMethod");

    // Update global state when selection changes
    useEffect(() => {
        setPaymentMethod(selectedPaymentMethod);
    }, [selectedPaymentMethod, setPaymentMethod]);

    return (
        <div className="w-full flex flex-col mb-5">
            {/* Heading */}
            <div className="inline-flex gap-2 items-center mb-3">
                <p className="text-gray-500">
                    Payment <span className="text-gray-700 font-medium">Method</span>
                </p>
                <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>

            {/* Payment Options */}
            <div className="payment flex flex-row gap-5 items-center justify-between">
                {/* Stripe */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        {...register("paymentMethod")}
                        value="Stripe"
                    />
                    <img src={stripe_logo} alt="Stripe" className="w-16 h-auto" />
                </label>

                {/* Razorpay */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        {...register("paymentMethod")}
                        value="Razorpay"
                    />
                    <img src={razorpay_logo} alt="Razorpay" className="w-16 h-auto" />
                </label>

                {/* Cash On Delivery */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        {...register("paymentMethod")}
                        value="COD"
                    />
                    <p className="text-gray-700 font-medium">Cash On Delivery</p>
                </label>
            </div>
        </div>
    );
};

export default PaymentMethods;
