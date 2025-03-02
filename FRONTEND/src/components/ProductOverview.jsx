import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import star_icon from "../assets/frontend_assets/star_icon.png"
import RelatedProducts from "./RelatedProducts";

const ProductOverview = () => {
    
    const { productID } = useParams();
    //   console.log(productID);

    const navigate = useNavigate()

    const { products, currency, category, setCategory, type, setType, brand, setBrand, addToCart, isAuthenticated, username} = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("")

    // console.log(category)
    // console.log(productData)
    // console.log(username)

    const fetchProductData = () => {
        
        const product = products.find((value) => value._id === productID);
        
        if(product){
            
            setProductData(product);
            setImage(product.image[0]);
            setCategory(product.category);

        }   
    
    };
    useEffect(() => {
               
        fetchProductData();

    }, [productID, products]);



    if (!productData) return <div>Loading...</div>;

    return (
        
        <>
        <div className=" pt-10 transition-opacity ease-in duration-500 opacity-100">
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.75%] w-full">
                        {productData.image.map((value, index) => (
                        <img
                            src={value}
                            key={index}
                            alt=""
                            className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                            onClick={() => setImage(value)}
                        />
                        ))}
                    </div>

                    <div className="w-full sm:w-[80%]">
                        <img src={image} className="w-full h-auto" alt="" />
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
                    <div className=" flex items-center gap-1 mt-2">
                        
                        <img src={star_icon} alt="" className="h-3 w-3"/>
                        <img src={star_icon} alt="" className="h-3 w-3"/>
                        <img src={star_icon} alt="" className="h-3 w-3"/>
                        <img src={star_icon} alt="" className="h-3 w-3"/>
                        <img src={star_icon} alt="" className="h-3 w-3"/>

                    </div>

                    <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
                    <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
                    <div className="flex flex-col gap-4 my-8">
                        
                        
                        <div className="flex gap-2">

                            {category === "Clothing" && (
                                    <>
                                        <p>Select Size</p>
                                        <div className="flex gap-2">
                                        {productData.sizes.map((value, index) => (
                                            <button
                                            onClick={() => setSize(value)}
                                            className={`border py-2 px-4 cursor-pointer ${
                                                size === value ? "bg-black text-white" : "bg-gray-100"
                                            }`}
                                            key={index}
                                            >
                                            {value}
                                            </button>
                                        ))}
                                        </div>
                                    </>
                            )}

                        </div>
  
                    </div>

                    <button
                        className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer"
                        onClick={() => {
                            if(isAuthenticated){

                                addToCart(username, productData._id, category === "Clothing" ? size : null);
                            } 
                            else{

                                navigate("/login");
                            }
                        }}
                        >
                        ADD TO CART
                    </button>


                    
                    <hr className="mt-8 sm:w-4/5"></hr>
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    
                    </div>

                </div>
            </div>
        </div>

        <div className="mt-20">

            <div className="flex">
                
                <b className="border-gray-500 border px-5 py-3 text-sm border-r-0 border-b-0">Description</b>
                <b className="border-gray-500 border px-5 py-3 text-sm border-b-0">Reviews</b>
                            
            </div>

            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">

                <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>

                <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
            </div>

        </div>

        <div>
            
            <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

        </div>
        </>
  );
};

export default ProductOverview;
