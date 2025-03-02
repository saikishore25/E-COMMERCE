import React, { useContext } from "react";
import PaymentMethods from "./PaymentMethods";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const CartBuy = () => {
    const { cartAmount, currency, cartItems, verifiedAddress,addressDetails, username, backendURL, paymentMethod } = useContext(ShopContext);
    const navigate = useNavigate();
    // console.log(cartItems)

    console.log(paymentMethod)
    const handleOrderPlaced = async () => {

        if(paymentMethod === "COD"){

            if (!verifiedAddress) {
                alert("Please verify your address before placing an order.");
                return;
            }
    
            try {
                const response = await fetch(`${backendURL}/api/order/place-cash`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        username,
                        cartItems,
                        amount: cartAmount + 10, // Including shipping fee
                        address: addressDetails, // Ensure this contains the correct address
                    }),
                });
    
                const responseData = await response.json();
                if (response.ok) {
                    alert("Order placed successfully!");
                    navigate("/orders");
                } else {
                    alert(responseData.message || "Failed to place order.");
                }
            } 
            catch (error) {
                console.error("Error placing order:", error);
                // alert("Something went wrong.");
            }

        }

        if (paymentMethod === "Razorpay") {
            const razorpayResponse = await fetch(`${backendURL}/api/order/place-razorpay`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    cartItems,
                    amount: cartAmount + 10, // Including shipping fee
                    address: addressDetails,
                }),
            });
        
            const responseData = await razorpayResponse.json();
        
            if (responseData.message === "Success") {
                const options = {
                    key: "rzp_test_XyEYMXhYSBl715",
                    amount: responseData.order.amount, // ✅ Use dynamic amount
                    currency: "INR",
                    name: "Your Shop",
                    description: "Order Payment",
                    order_id: responseData.order.id,
                    handler: async function (response) {
                        console.log("Razorpay Response:", response);
        
                        if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
                            alert("Payment failed. Missing details.");
                            return;
                        }
        
                        // ✅ Call backend to verify payment
                        const verifyResponse = await fetch(`${backendURL}/api/order/verify-razorpay`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                username,
                                razorpay_order_id: response.razorpay_order_id,
                                payment_id: response.razorpay_payment_id,
                                signature: response.razorpay_signature,
                            }),
                        });
        
                        const verifyData = await verifyResponse.json();
                        console.log("Verify Response:", verifyData);
        
                        if (verifyData.success) {
                            alert("Payment Successful! Order placed successfully!");
                            navigate("/orders");
                        } else {
                            alert("Payment verification failed. Please contact support.");
                        }
                    },
                    prefill: {
                        name: "Kishore",
                        email: "kishore@example.com",
                        contact: "9999999999",
                    },
                    theme: { color: "#3399cc" },
                };
        
                const rzp = new Razorpay(options);
                rzp.open();
            } else {
                alert("Failed to create Razorpay order.");
            }
        }
        
        

        else if(paymentMethod === "Stripe"){


        }

        else{

            console.log("Select a valid Payment Method")

        }

    };

    return (
        <>
            <div className="cart-totals w-full flex items-center justify-center mt-5">
                <div className="w-full flex items-start justify-center flex-col gap-3">
                    <div className="inline-flex gap-2 items-center mb-3">
                        <p className="text-gray-500">CONTACT <span className="text-gray-700 font-medium">US</span></p>
                        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                    </div>

                    <div className="calculate flex flex-col items-start justify-center gap-2 w-full">
                        <div className="subtotal flex flex-row items-center justify-between border-b-[1px] border-gray-400 w-full">
                            <p>Subtotal</p>
                            <p>{cartAmount}</p>
                        </div>
                        <div className="shipping-fee flex flex-row items-center justify-between border-b-[1px] border-gray-400 w-full">
                            <p>Shipping Fee</p>
                            <p>{currency}{10}</p>
                        </div>
                        <div className="total flex flex-row items-center justify-between w-full border-b-[1px] border-gray-400">
                            <p className="font-bold text-xl">Total</p>
                            <p>{currency}{cartAmount + 10}</p>
                        </div>
                    </div>
                </div>
            </div>

            <PaymentMethods />

            <div className="checkout">
                <div>
                    {verifiedAddress ? (
                        <button onClick={handleOrderPlaced} className="text-white bg-black w-fit h-10 flex items-center justify-end px-2 rounded-sm">
                            Place Order
                        </button>
                    ) : (
                        <>
                            <button className="text-white cursor-not-allowed bg-black w-fit h-10 flex items-center justify-end px-2 rounded-sm">
                                Place Order
                            </button>
                            <span className="text-red-500">Please Fill The Address Details</span>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartBuy;
