import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}) => {
    
    const {products} = useContext(ShopContext);
    const [related, setRelated] = useState([]);
    // console.log(category, subCategory)

    useEffect(()=>{

        if(products.length >0){

            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((value)=> category === value.category)
            // console.log(productsCopy)
            productsCopy = productsCopy.filter((value)=> subCategory === value.subCategory)

            // console.log(related)
            setRelated(productsCopy.slice(0,5))

        }

    },[products])

    return (
        <>

            <div className='my-24'>

                <div className='text-center text-3xl py-2 '>

                    <p>Related Products</p>

                </div>
                
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                    {
                        related.map((value, index)=>(

                            <ProductItem key={index} id={value._id} name={value.name} price={value.price} image={value.image}></ProductItem>
                        ))
                    }
                </div>

            </div>

        
        </>
    )
}

export default RelatedProducts
