import React, { useEffect, useState } from 'react'

const ItemsList = () => {
    
    const [items, setItems] = useState([])

    console.log(items)
    const showListItems = async ()=>{

        try{

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/product/list`);
            const responseData = await response.json();
            console.log(responseData);

            if(response.ok){

                setItems(responseData.products)

            }
        }
        catch(error){

            console.log("Error in Fetching List Items", error)

        }

    }

    useEffect(()=>{
        
        showListItems();
          
    }, [])
    // console.log(items)

    return (
        <>
            <div className="products-list flex flex-col w-full mt-5 gap-2">

                <p>All Products</p>

                <div className='flex flex-row border-gray-400 bg-gray-200 w-full items-center justify-between p-2 rounded-md'>

                    <p>Image</p>
                    <p>Name</p>
                    <p>Category</p>
                    <p>Price</p>
                    <p>Action</p>

                </div>

                <div>
                    {items.length > 0 ? (
                        items.map((value, index) => (
                        <div key={value._id || index} className="flex flex-row items-center justify-between p-2 border-b">
                            <img
                            src={value.image?.[0] || "https://via.placeholder.com/50"}
                            alt={value.name}
                            className="w-12 h-12 object-cover rounded-md"
                            />
                            <p className='w-10'>{value.name}</p>
                            <p className='w-10'>{value.category}</p>
                            <p className='w-10'>${value.price}</p>
                            <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                        </div>
                        ))
                    ) : (
                        <p className="text-gray-500 mt-2">No products available</p>
                    )}
                </div>



            </div>
        
        </>
    )
}

export default ItemsList
