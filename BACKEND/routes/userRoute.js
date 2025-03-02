import express from "express";
import { loginUser, adminLogin, signUpUser, forgotPassword, checkAuthUser, logoutUser, deliveryAddress, verifyDeliveryAddress, adminLogout } from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", signUpUser)
router.post("/login", loginUser)
router.post("/admin-login", adminLogin)
router.post("/admin-logout", adminLogout)
router.get("/check-auth",verifyToken, checkAuthUser)
router.post("/logout", logoutUser)
router.post("/delivery-address", deliveryAddress)
router.post("/verify-delivery-address",verifyDeliveryAddress )

export default router;