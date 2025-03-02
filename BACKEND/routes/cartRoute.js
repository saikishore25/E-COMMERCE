import express from "express";
import { addToCart, deleteItemFromCart, getCartCount, getUserCart, updateCart } from "../controllers/cartController.js";

const router = express.Router()

router.post("/add-to-cart", addToCart)
router.post("/update-cart", updateCart)
router.post("/get-user-cart", getUserCart)
router.post("/delete-item-from-cart", deleteItemFromCart)
router.post("/get-cart-count", getCartCount )

export default router;