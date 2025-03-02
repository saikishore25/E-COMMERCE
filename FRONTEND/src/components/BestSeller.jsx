import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../contexts/ShopContext'
import ProductItem from './ProductItem';

const BestSeller = () => {
    
    const {products} = useContext(ShopContext);
        // console.log(products)
    
    const [bestSellers, setBestSellers] = useState([])

    useEffect(()=>{

        const bestSellersList = products.filter((item)=>(item.bestSeller))
        // console.log(bestSellersList)
        setBestSellers(bestSellersList.slice(0,5))

    }, [products])
    return (
        <>

            <div className='mt-10 flex flex-col gap-5 h-[60vh]'>

                <div className="title flex items-center justify-center flex-col">

                    <p className='text-2xl font-semibold'>Best Sellers-Clothing</p>
                    <p className='text-gray-600'>These are our most Sold Clothing items</p>


                </div>

                <div className="collections grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5">
                    {

                        bestSellers.map((item, index)=>(

                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                        ))
                    }

                </div>

            </div>
        
        </>
    )
}

export default BestSeller
