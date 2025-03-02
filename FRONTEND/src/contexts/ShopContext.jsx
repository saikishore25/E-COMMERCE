import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState, } from "react";

import { toast } from "react-toastify";

export const ShopContext = createContext();


const ShopContextProvider = (props) => {
    
    const currency = "$";
    const delivery_Fee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URI;

    const [category, setCategory] = useState([]);
    const [type, setType] = useState([]);
    const [brand, setBrand] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [cartCount, setCartCount] = useState(0);
    const [cartAmount, setCartAmount] = useState(0);
    const [products, setProducts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [username, setUsername] = useState(localStorage.getItem("username") || null);
    const [verifiedAddress, setVerifiedAddress] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [addressDetails, setAddressDetails] = useState({})
    const [orders, setOrders] = useState([])

    const navigate = useNavigate()

    // console.log(cartItems)
    // console.log("Username:", username);

    // ✅ Fetch Products Data And Setting Them Inside products 
    const getProductsData = async () => {
        
        try{
            const response = await fetch(`${backendURL}/api/product/list`);
            const responseData = await response.json();

            if(response.ok){

                setProducts(responseData.products);

            }
            
        } 
        
        catch(error){

            console.log("Error fetching products:", error);
        }

    };

    // ✅ Check Authentication
    const checkAuth = async () => {
        
        try{
            
            const response = await fetch(`${backendURL}/api/user/check-auth`, {
                method: "GET",
                credentials: "include",
            });

            const responseData = await response.json();

            if(response.ok){

                setIsAuthenticated(true);

            }
        } 
        
        catch(error){

            console.error("Error checking auth:", error);
            setIsAuthenticated(false);
        }
    };



    // ✅ Fetch User's Cart
    const getUserCart = async (username) => {
        
        if(!username) return; 

        try{

            const response = await fetch(`${backendURL}/api/cart/get-user-cart`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            const responseData = await response.json();

            // console.log(responseData)
            if(response.ok){

                setCartItems(responseData.cartData);
            }
        } 
        
        catch(error){

            console.log("Error fetching cart:", error);
        }

    };

    // ✅ Add to Cart
    const addToCart = async (username, itemID, size) => {
        let cartData = structuredClone(cartItems);
    
        if(!cartData[itemID]){

            cartData[itemID] = {};
        }
    
        const product = products.find((p) => p._id === itemID);
        if(!size && product.category === "Clothing"){

            toast.error("Select Product Size");
            return;
        }
    
        const key = size && product.category === "Clothing" ? size : "default";
        cartData[itemID][key] = (cartData[itemID][key] || 0) + 1;
    
        try{

            const response = await fetch(`${backendURL}/api/cart/add-to-cart`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, itemID, size }),
            });
    
            if (!response.ok) {
                console.log("Error adding item to cart");
                return;
            }
    
            // ✅ Increment cart count locally
            setCartCount((prev) => prev + 1);
        } 
        catch(error){

            console.log("Error:", error);
        }
    
        setCartItems(cartData);
    };
    

    
    const verifyDeliveryAddress = async(username)=>{

        try{

            const response = await fetch(`${backendURL}/api/user/verify-delivery-address`, {

                method: "POST", 
                credentials:"include", 
                headers:{

                    'Content-Type': 'application/json'

                },

                body: JSON.stringify({username})
            })

            const responseData = await response.json()
            // console.log(responseData.add)

            if(response.ok){

                setVerifiedAddress(() => responseData.message); // ✅ Ensure it triggers re-render
                setAddressDetails(responseData.add)
    
            }

        }

        catch(error){

            console.log("error in verifying address")
        }
    }

    const userOrdersList = async(username)=>{

        try{

            const response = await fetch (`${backendURL}/api/order/user-orders`, {

                method: "POST", 
                credentials: "include",
                headers:{

                    'Content-Type': "application/json"

                },

                body: JSON.stringify({
                    
                    username
                })

            })

            const responseData = await response.json()
            // console.log(responseData)

            if(!response.ok){

                console.log("Failed to Fetch orders")
            }

            // console.log("order details", responseData.orderdetails)
            setOrders(responseData.orders)


        }

        catch(error){

            console.log("Error Occured while fetching orders")

        }
    }

    useEffect(()=>{

        userOrdersList(username)

    }, [])
    // console.log(orders)

    
    useEffect(()=>{

        verifyDeliveryAddress(username)
        
    },[username])
    // console.log(addressDetails)
    
    

    // ✅ Fetch Products on Mount
    useEffect(() => {
        
        getProductsData();
        checkAuth();

    }, []);

    useEffect(() => {
        let newTotal = 0;
    
        for (const itemID in cartItems) {
            for (const size in cartItems[itemID]) {
                const product = products.find((p) => p._id === itemID);
                if (product) {
                    newTotal += product.price * cartItems[itemID][size];
                }
            }
        }
    
        setCartAmount(newTotal);
    }, [cartItems, products]);
    
    

    // ✅ Provide Context
    const value = {
        products,
        currency,
        delivery_Fee,
        category,
        setCategory,
        type,
        setType,
        brand,
        setBrand,
        addToCart,
        cartCount,
        setCartCount,
        cartAmount,
        setCartAmount,
        isAuthenticated,
        setIsAuthenticated,
        username,
        setUsername,
        getUserCart,
        backendURL,
        verifiedAddress, 
        setVerifiedAddress,
        verifyDeliveryAddress,
        paymentMethod, 
        setPaymentMethod,
        addressDetails,
        orders,
        cartItems,
        setCartItems

    };

    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
