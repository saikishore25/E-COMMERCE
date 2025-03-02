import { generateToken } from "../configs/jwt.js";
import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"

const signUpUser = async (req, res) => {
    
    try{

        const {username, email, password} = req.body;
        // console.log(username, email, password)

        if(!username || !email || !password){

            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ username });

        if(existingUser){

            // console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = generateToken(newUser.email);
        // console.log(token)
        
        res.cookie("authToken", token,{

            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000

        })

        // console.log("User Created:", newUser);

        return res.status(201).json({message: "User created successfully", username:newUser.username});

    } 
    
    catch(error){

        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });

    }

};


const loginUser = async(req, res)=>{

    try{


        const {email, password} = req.body;
        // console.log(email, password);
    
        const user = await  userModel.findOne({email});
        // console.log(user)
    
        if(!user){
    
            console.log("User Doesn't Exists");
            return res.status(404).json({"message":"User Not Found"});
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){

            return res.status(400).json({ "message": "Incorrect Password" });
        }
        
        const token = generateToken(user.email);
        
        console.log(token)
        res.cookie("authToken", token,{
            
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000
            
        })
        
        return res.status(200).json({"message":"Credentials Accepted", "username":user.username});
        
    }

    catch(error){

        return res.status(500).json({"message":"Internal Server Error, Couldn't Login"})
        
    }





}

const logoutUser = async(req, res)=>{
    
    try{

        console.log("Logout request received");
        res.clearCookie("authToken", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({ message: "User logged out successfully" });
    } 
    
    catch(error){

        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
   
    

}


const forgotPassword = async(req, res)=>{


}

const adminLogin = async(req, res)=>{

    try{

        const {email, password} = req.body;
        // console.log(email, password)

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = generateToken(email);
            res.cookie("adminToken", token,{
            
                httpOnly:true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3600000
                
            })

            return res.json({"message":"Admin Log In Success"})
        }

        else{

            return res.json({"message":"Invalid Credentials"})

        }
    }

    catch(error){

        return res.json({"message":"Error Logging in Adming"})
    }

}

const adminLogout = async(req, res)=>{

    try{

        console.log("Logout request received");
        res.clearCookie("adminToken", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({ "message": "Admin logged out successfully" });
        
    } 
    
    catch(error){

        console.error("Logout error:", error);
        return res.status(500).json({ "message": "Internal server error" });
    }


}

const checkAuthUser = async (req, res) => {
    
    try{

        const { email } = req.user; // `req.user` comes from `verifyToken`
        // console.log(req.user, email)
        return res.status(200).json({ "message": "User authenticated"});
    } 
    
    catch(error){

        console.error("Error in authentication:", error);
        return res.status(500).json({ "message": "Internal server error" });
    }
};


const deliveryAddress = async (req, res) => {
    try {
        const { username, ...addressData } = req.body;  // Extract username & address

        console.log(username, addressData);

        if (!username || Object.keys(addressData).length === 0) {
            return res.status(400).json({ message: "Invalid request, username or data missing" });
        }

        const user = await userModel.findOneAndUpdate(
            { username },  
            { $set: { deliveryAddress: addressData } },  // Corrected update format
            { new: true, upsert: true }  // Returns updated user, inserts if not found
        );

        res.status(200).json({ message: "Address Added Successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Couldn't Add Address" });
    }
};



const verifyDeliveryAddress = async(req, res)=>{

    try{

        const {username} = req.body

        console.log(username)

        const user = await userModel.findOne({username})

        const address = user.deliveryAddress;
        console.log(address)
        
        if(!address){

            res.json({"message":false})
        }

        res.json({"message":true,"add":address})
    }

    catch(error){

        res.json({"message":"Failed to verify Address"})
    }
}

export {signUpUser, loginUser, forgotPassword, adminLogin, adminLogout, checkAuthUser, logoutUser, deliveryAddress, verifyDeliveryAddress}