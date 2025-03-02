import express from "express"
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js"

const addProduct = async (req, res) => {
    
    try{
        
        console.log("Files received:", req.files);
        console.log("Request Body:", req.body);

        // Extract images safely
        const img1 = req.files?.image1?.[0];
        const img2 = req.files?.image2?.[0];
        const img3 = req.files?.image3?.[0];
        const img4 = req.files?.image4?.[0];

        // Filter out undefined images
        const images = [img1, img2, img3, img4].filter(Boolean);

        if(images.length === 0){

            return res.status(400).json({ message: "No images uploaded" });
        }

        console.log("Images to be uploaded:", images);

        // Ensure all images have a valid path before Cloudinary upload
        const images_Url = await Promise.all(
            
            images.map(async (item) => {
                
                if(!item.path){
                    
                    throw new Error("Image path is missing");
                }
                
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url;
            })
        );

        console.log("Uploaded Image URLs:", images_Url);

        // Extract product data from request body
        const { name, description, price, category, subCategory, brand, sizes, bestSeller } = req.body;

        // Save product to DB
        const productData = await productModel.create({
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true",
            sizes: JSON.parse(sizes),
            image: images_Url,
            date: Date.now(),
            brand
        });

        return res.status(201).json({ message: "Success", product: productData });

    } 
    
    catch(error){

        console.error("Error in Adding the Product", error);
        return res.status(500).json({ message: "Failure", error: error.message });
    }
};


const listProduct = async(req, res)=>{

    try{

        const products  = await productModel.find({})
        return res.json({"message":"All Products Fetched Sucessfully", products:products})

    }

    catch(error){

        console.log("Error in Listing the Product",error)
        return res.status(500).json({"message": "Failure"})
    
    }

}

const removeProduct = async()=>{

    try{

        const {id} = req.body;

        await productModel.findByIdAndDelete(id);
        res.json({"message":"Item Deletion Succesfull"})

    }

    catch(erro){

        console.log("Error in Deleting the Product",error)
        return res.status(500).json({"message": "Failure"})
    

    }

}

const singleProduct = async()=>{

    try{

        const {productID} = req.body;
        const product = await productModel.findById(productID);
        return res.json({"message":"Success"})

    }

    catch(erro){

        console.log("Error in Finding the Product",error)
        return res.status(500).json({"message": "Failure"})
    

    }

}

export  {addProduct, listProduct, removeProduct, singleProduct}