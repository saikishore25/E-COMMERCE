import express from "express";
import { allOrders, getStatus, placeOrderCash, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyRazorpay } from "../controllers/orderController.js";

const router = express.Router()


router.post("/all-orders", allOrders)
router.post("/update-status", updateStatus)
router.post("/place-cash", placeOrderCash)
router.post("/place-razorpay", placeOrderRazorpay)
router.post("/place-stripe", placeOrderStripe)
router.post("/user-orders", userOrders)
router.post("/get-status", getStatus)
router.post("/verify-razorpay", verifyRazorpay)



export default router
