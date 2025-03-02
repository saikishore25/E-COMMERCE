import React, {useContext, useEffect} from 'react'
import { ShopContext } from '../contexts/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price}) => {
    
    const {currency} = useContext(ShopContext);


    return (
        <>

            <Link className='text-gray-700 cursor-pointer flex justify-center items-center w-full h-full flex-col ' to={`/product/${id}`}>
            
                <div className="overflow-hidden rounded-md ">

                    <img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out h-72 w-64 max-lg:h-64'/>

                </div>

                <p className='pt-3 pb-1 text-sm'>{name}</p>
                <p className='text-sm font-medium'>{currency}{price}</p>
            
            </Link>


        
        </>
    )
}

export default ProductItem
