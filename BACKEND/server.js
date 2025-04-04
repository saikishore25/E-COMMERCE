import express, { urlencoded } from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import mongoConnect from "./configs/mongoConnect.js"
import cloudinaryConnect from "./configs/cloudinaryConnect.js"
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://e-commerce-admin-six-henna.vercel.app",
        "https://e-commerce-frontend-theta-eight.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};
app.use(cors(corsOptions));



mongoConnect()
cloudinaryConnect()

app.get("/", (req, res)=>{

    res.json({"message":"hello kishore"})
    res.end();

})

app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)

app.listen(PORT, ()=>{

    console.log(`Server Listening on Port: ${PORT}`)

})