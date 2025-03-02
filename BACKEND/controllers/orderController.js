import express from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import razorpay from "razorpay"
import crypto from "crypto";


const razorpayInstance = new razorpay({
    
    key_id: "rzp_test_XyEYMXhYSBl715",
    key_secret: "TVaU6zY2ysC8pJ9ouHoU1GyD",

});

const placeOrderCash = async (req, res) => {
    
    try{
        const { username, cartItems, amount, address } = req.body;
        console.log(username, cartItems, amount, address)

        if(!username || !cartItems || !amount || !address) {
            return res.status(400).json({ message: "Invalid order details." });
        }

        const orderData = {
            username,
            items: cartItems,
            amount,
            address,
            paymentMethod: "Cash",
            payment: false,
            date: Date.now(),
        };

        await orderModel.create(orderData);

        // ✅ Corrected update query
        await userModel.findOneAndUpdate({ username }, { cartData: {} });

        res.status(200).json({ message: "Order Placed Successfully" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Couldn't Place Order" });
    }
};


const placeOrderStripe = async(req, res)=>{

    try{

    }
    catch(error){


    }
}
const placeOrderRazorpay = async (req, res) => {
    try {
        const { username, cartItems, amount, address } = req.body;

        console.log(username, cartItems, amount, address)
        if (!username || !cartItems || !amount || !address) {
            return res.status(400).json({ message: "Invalid order details." });
        }

        const orderData = {
            username,
            items: cartItems,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: newOrder._id.toString(),
        };

        const order = await razorpayInstance.orders.create(options);

        return res.json({ message: "Success", order });
    } catch (error) {
        console.error("Error in Payment Gateway:", error);
        return res.json({ message: "Payment Gateway Error" });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        const { username, razorpay_order_id, payment_id, signature } = req.body;

        const secretKey = process.env.RAZORPAY_SECRET_KEY;
        if (!secretKey) {
            console.error("❌ RAZORPAY_SECRET_KEY is missing! Check .env file.");
            return res.status(500).json({ message: "Server error: Payment verification failed", success: false });
        }

        const generatedSignature = crypto
            .createHmac("sha256", secretKey)
            .update(`${razorpay_order_id}|${payment_id}`)
            .digest("hex");

        if (generatedSignature !== signature) {
            return res.status(400).json({ message: "Payment verification failed", success: false });
        }

        // ✅ Fetch order info from Razorpay
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        // ✅ Use `orderInfo.receipt` (MongoDB `_id`) to find the order
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderInfo.receipt,  // ✅ Use receipt (MongoDB _id)
            { payment: true },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found", success: false });
        }

        // ✅ Fix user cart clearing
        await userModel.findOneAndUpdate({ username }, { cartData: {} });

        return res.json({ message: "Payment Successful", success: true, order: updatedOrder });

    } catch (error) {
        console.error("Error in verifying payment:", error);
        return res.status(500).json({ message: "Payment Failed", success: false });
    }
};



const allOrders = async(req, res)=>{

    try{
        
        const orders = await orderModel.find({})

        if(!orders){

            return res.json({"message": "Unable to Fetch Orders"})

        }

        // const productDetails = orders.map((order, index)=>{
            
        //     console.log(order)
        //     const productID = order._id
        //     const product = productModel.findOne({productID})
        //     // return product
        //     console.log(product)

        // })


        return res.json({"message":"Fetched Order Data", orders:orders,})

    }

    catch(error){

        return res.json({"message": "Unable to Fetch Data"})
        
    }

}

const userOrders = async (req, res) => {
    
    try{
        const { username } = req.body;
        // console.log("Fetching orders for:", username);

        // Fetch all orders for the given user
        const userOrders = await orderModel.find({ username });
        console.log(userOrders)

        if(!userOrders.length){

            return res.status(404).json({ message: "No orders found for this user" });
        }

        // console.log("User Orders:", userOrders); // Debugging

        let allOrderDetails = [];

        for (const order of userOrders) {
            const orderItems = order.items || []; // Ensure it's always an array
            const paymentMethod = order.paymentMethod;

            // console.log("Order Items:", orderItems); // Debugging

            if (orderItems.length === 0) continue;

            // Collect all product IDs from the order items
            const itemIds = orderItems.flatMap(item => Object.keys(item));
            const uniqueItemIds = [...new Set(itemIds)]; // Remove duplicates

            // console.log("Unique Product IDs:", uniqueItemIds); // Debugging

            if (uniqueItemIds.length === 0) continue;

            // Fetch product details
            const products = await productModel.find({ _id: { $in: uniqueItemIds } });

            // console.log("Fetched Products:", products); // Debugging

            // Map product details with quantity and sizes
            const orderDetails = products.map(product => {
                const productId = product._id.toString();
                const orderData = orderItems.find(item => item[productId])?.[productId];

                return {
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    subCategory: product.subCategory,
                    availableSizes: product.sizes, // All available sizes
                    bestSeller: product.bestSeller,
                    date: product.date,
                    quantity: orderData?.M || 1, // Default quantity
                    orderedSizes: orderData || {}, // Include ordered sizes
                    paymentMethod: paymentMethod,
                };
            });

            allOrderDetails.push({ orderId: order._id, orderDetails });
        }

        // console.log("Final Order Details:", allOrderDetails); // Debugging

        res.json({ message: "Fetched Order Details", orders: allOrderDetails });

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to Fetch Order Details" });
    }
};






const updateStatus = async(req, res)=>{

    try{

        const {orderID, status} = req.body
        console.log(orderID, status)
        await orderModel.findByIdAndUpdate(orderID, {status})
        res.json({"message":"Status Updated Sucessfully", status})

    }

    catch(error){

        console.error("Error Updating Status", error);
        res.status(500).json({ message: "Status Update Failed" });

    }

}

const getStatus = async (req, res) => {
    
    try{
        const { orderId } = req.body;
        console.log("orderID", orderId)
        
        if(!orderId){

            return res.status(400).json({ message: "Order ID is required" });
        }

        const order = await orderModel.findById(orderId);
        
        if(!order){

            return res.status(404).json({ message: "Order not found" });
        }

        res.json({"message":"Order Status Fetched", status: order.status });

    } 
    catch(error){

        console.error("Error fetching order status:", error);
        res.status(500).json({ message: "Failed to fetch order status" });
    }
};


export {placeOrderCash, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, getStatus, verifyRazorpay}