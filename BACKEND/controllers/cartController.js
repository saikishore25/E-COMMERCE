import express from "express"
import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
    try {
        const { username, itemID, size } = req.body;

        // Find user by username
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get existing cartData
        let cartData = user.cartData || {}; // Ensure cartData exists

        // Update cartData
        if (!cartData[itemID]) {
            cartData[itemID] = {};
        }
        cartData[itemID][size] = (cartData[itemID][size] || 0) + 1;

        // ✅ Correct way to update user's cart in MongoDB
        await userModel.updateOne(
            { username }, // Find the user
            { $set: { cartData } } // Update only `cartData`
        );

        return res.status(201).json({ message: "Added to Cart" });

    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({ message: "Failed to Add To Cart" });
    }
};




const updateCart = async(req, res)=>{

    try{

        const {username, itemID, size, quantity} = req.body
        const userData = await userModel.findOne({username})

        let cartData = await userData.cartData
        cartData[itemID][size] = quantity;
        await userModel.findOneAndUpdate({cartData})

        return res.status(200).json({"message":"Cart Updated"})


    }

    catch(error){

        return res.status(200).json({"message":"Cart Failed to Updated"})


    }

}

const getUserCart = async(req, res)=>{
 
    try{

        const {username} = req.body
        
        if(!username){

            console.error("Username is null. Cannot fetch cart.");
            return;
            
        }
        // console.log("Username For Get User Cart is:", username)

        const user = await userModel.findOne({username})

        let cartData = await user.cartData
        // console.log("Cart Items are:",cartData)

        return res.status(200).json({"message":"User Cart Fetched Sucessfully", cartData:cartData})


    }

    catch(error){

        return res.status(200).json({"message":"Failed to Get Cart Items"})


    }

}

const deleteItemFromCart = async (req, res) => {
    
    try{
        const { username, itemID } = req.body;
        console.log(username, itemID);

        const user = await userModel.findOneAndUpdate(
            { username },
            { $unset: { [`cartData.${itemID}`]: 1 } }, // Remove the field
            { new: true } // Return the updated document
        );

        if(!user){

            return res.status(404).json({ "message": "User not found" });
        }

        console.log(user);
        console.log(user.cartData);

        return res.status(200).json({ "message": "Item removed from cart successfully" });

    } 
    
    catch(error){

        console.error("Error removing item:", error);
        return res.status(400).json({ "message": "Failed to remove item" });
    }
};

const getCartCount = async(req, res)=>{

    try{

        const { username} = req.body;
        if (!username) return res.status(400).json({ error: "username is required" });

        // Fetch the user's cart
        const user = await userModel.findOne({ username });
        console.log(user)

        // If no cart exists, return 0 count
        if (!user || !user.cartData) return res.json({ cartCount: 0 });

        // Calculate total cart count
        let count = 0;
        for(const productId in user.cartData){

            for(const size in user.cartData[productId]){

                count += user.cartData[productId][size]; // Sum up all quantities
            }
        }

        res.json({"message":"Cart Count Fetched Sucessfully", cartCount: count });
    } 
    catch(error){

        console.error("Error fetching cart count:", error);
        res.status(500).json({ "message": "Internal server error" });
    }
}


export {addToCart, getUserCart, updateCart, deleteItemFromCart, getCartCount};