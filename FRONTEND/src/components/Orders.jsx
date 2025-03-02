import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const { orders, isAuthenticated } = useContext(ShopContext);
    const [orderStatus, setOrderStatus] = useState()
    // console.log("Fetched Orders:", orders);
    // console.log("IsAuthenticated", isAuthenticated)
    const navigate = useNavigate()

    useEffect(() => {
        
        if(!isAuthenticated){
            
            
            const timeout = setTimeout(() => {
                
                navigate("/login");
                
            }, 3000); // Redirect after 3 seconds
            
            return () => clearTimeout(timeout); // Cleanup timeout on unmount
        }
        
    }, [isAuthenticated, navigate]);
    
    if(!isAuthenticated){
        
        return (
            <>
                <p className='text-center'>User Not Authenticated. Please Login/SignUp</p>
                <h1 className='text-center'>Redirecting to Login...</h1>
            </>
        ) // Show message before redirecting
    }
    
    

    if(!orders || !Array.isArray(orders) || orders.length === 0){

        return (
            <div className="text-center mt-10 text-gray-500 text-lg">
                No orders found.
            </div>
        );
    }

    const handleTrackOrder = async (orderId) => {
        
        try{
            const response = await fetch("http://localhost:3000/api/order/get-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId }),
            });
    
            const responseData = await response.json();
    
            if(response.ok){

                setOrderStatus(responseData.status)
            } 
            else{

                // alert(`Error: ${responseData.message}`);
                setOrderStatus(responseData.message)
            }
    
        } 
        catch(error){

            console.error("Error tracking order:", error);
            alert("Failed to track order");
        }
    };
    


    return (
        <>
            <div className="orders-container mt-10 px-4 md:px-10">
                
                <div className="inline-flex gap-2 items-center mb-3">
                    
                    <p className="text-gray-500 text-3xl">
                        MY <span className="text-gray-700 font-medium">ORDERS</span>
                    </p>

                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>

                </div>

                <div className="orders flex flex-col gap-5">
                    
                    {orders.map((order, index) => (
                        
                        <div key={index} className="p-4 rounded-lg shadow-md bg-white">
                            {/* Order ID */}
                            <p className="text-gray-600 text-sm mb-2">
                                <strong>Order ID:</strong> {order.orderId}
                            </p>

                            {/* Products in Order */}
                            {order.orderDetails.map((product, pIndex) => (
                                <div 
                                    key={pIndex} 
                                    className="flex flex-row items-center justify-between p-4 rounded-lg border mb-3"
                                >
                                    {/* Product Details */}
                                    <div className="flex flex-row items-center gap-5 w-[50%]">
                                        
                                        {/* Product Image */}
                                        <div className="img">
                                            <img 
                                                src={product.image?.[0] || '/placeholder.jpg'} 
                                                alt={product.name || 'Product'} 
                                                className="w-32 h-32 object-cover rounded-md"
                                            />
                                        </div>

                                        {/* Product Information */}
                                        <div className="details mt-3">  
                                            <p className="text-lg font-semibold">{product.name || 'No Name'}</p>
                                            
                                            <div className="mt-2">
                                                <p className="text-gray-700 font-bold">${product.price || '0.00'}</p>
                                                <p>Quantity: <span className="font-medium">{product.quantity || 1}</span></p>
                                                <p>Size: <span className="font-medium">{Array.isArray(product.orderedSizes) ? product.orderedSizes.join(', ') : 'N/A'}</span></p>
                                            </div>

                                            <p className="text-gray-500 mt-2">Payment: {product.paymentMethod || 'N/A'}</p>
                                        </div>

                                    </div> 

                                    <div className="status">

                                        <p>{orderStatus}</p>

                                    </div>

                                    {/* Track Order Button */}
                                    <div className="track-order border w-[10%] border-gray-400 p-2 text-center text-black rounded-md cursor-pointer hover:bg-gray-100">
                                        <button className="cursor-pointer" onClick={() => handleTrackOrder(order.orderId)}>Track Order</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Orders;
