import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import bin_icon from '../assets/frontend_assets/bin_icon.png';

const CartItems = () => {
    const { products, currency, cartItems, setCartItems,cartCount, setCartCount, getUserCart, username, isAuthenticated, backendURL } = useContext(ShopContext);
    
    const [cartData, setCartData] = useState([]);

    // Update cart data whenever `cartItems` change
    useEffect(() => {
        const tempData = [];

        Object.entries(cartItems).forEach(([itemID, sizes]) => {
            Object.entries(sizes).forEach(([size, quantity]) => {
                if (quantity > 0) {
                    tempData.push({
                        _id: itemID,
                        size: size === 'null' ? 'Default' : size,
                        quantity,
                    });
                }
            });
        });

        setCartData(tempData);
    }, [cartItems]);

    // Fetch cart when user logs in
    useEffect(() => {
        
        if (isAuthenticated && username) getUserCart(username);

    }, [isAuthenticated, username]);

    // Helper function to update cart via API
    const handleCartUpdate = async (action, itemID, size, quantity = 1) => {
        let updatedCart = { ...cartItems };
    
        switch (action) {
            case 'add':
                updatedCart[itemID] = updatedCart[itemID] || {};
                updatedCart[itemID][size] = (updatedCart[itemID][size] || 0) + 1;
                break;
            case 'update':
                if (updatedCart[itemID]?.[size]) {
                    const prevQuantity = updatedCart[itemID][size]; 
                    updatedCart[itemID][size] = Math.max(quantity, 1);
                    setCartCount(prevCount => prevCount + (updatedCart[itemID][size] - prevQuantity)); 
                }
                break;
            case 'remove':
                if (updatedCart[itemID]) {
                    delete updatedCart[itemID][size];
                    if (Object.keys(updatedCart[itemID]).length === 0) delete updatedCart[itemID];
                    setCartCount(prev => prev-1)
                }
                break;
            default:
                return;
        }
    
        // ✅ Update cart state
        setCartItems({ ...updatedCart });
    
        // ✅ Immediately update `cartData`
        const tempData = [];
        Object.entries(updatedCart).forEach(([id, sizes]) => {
            Object.entries(sizes).forEach(([s, q]) => {
                if (q > 0) {
                    tempData.push({
                        _id: id,
                        size: s === 'null' ? 'Default' : s,
                        quantity: q,
                    });
                }
            });
        });
        setCartData(tempData); // ✅ Forces a UI update
    
        // API request
        try {
            const endpoint = action === 'remove' ? 'delete-item-from-cart' : action === 'add' ? 'add-to-cart' : 'update-cart';
            await fetch(`${backendURL}/api/cart/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, itemID, size, quantity }),
            });
        } catch (error) {
            console.log(`Error in ${action} cart:`, error);
        }
    };
    

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3 font-semibold text-gray-800">
                <span className="text-gray-500">YOUR</span> CART
            </div>

            <div>
                {cartData.length === 0 ? (
                    <p className="text-center text-gray-600">Your cart is empty.</p>
                ) : (
                    cartData.map((value, index) => {
                        const product = products.find((p) => p._id === value._id);
                        if (!product) return null; // Skip if product not found

                        return (
                            <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols[4fr_3fr_0.5fr] items-center gap-4">
                                <div className="flex items-start gap-6">
                                    <img src={product.image?.[0] || ""} className="w-16 sm:w-20" alt={product.name} />
                                    <div>
                                        <p className="text-xs sm:text-lg font-medium">{product.name}</p>
                                        <div className="flex items-center gap-5 mt-2">
                                            <p>{currency}{product.price}</p>
                                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{value.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input 
                                    type="number" 
                                    min={1} 
                                    onChange={(e) => handleCartUpdate('update', value._id, value.size, parseInt(e.target.value))}   
                                    defaultValue={value.quantity} 
                                    className="border max-w-10 px-1 sm:px-2 py-1 text-center" 
                                />
                                <img 
                                    src={bin_icon} 
                                    className="w-4 mr-4 sm:w-5 cursor-pointer" 
                                    alt="Remove" 
                                    onClick={() => handleCartUpdate('remove', value._id, value.size)}  
                                />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CartItems;
