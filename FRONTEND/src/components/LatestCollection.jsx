import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../contexts/ShopContext'
import ProductItem from './ProductItem';

const LatestCollection = (props) => {
    
    
    const {products} = useContext(ShopContext);
    // console.log(props.category)
    // console.log(products)
    // console.log(products)

    const [latestCollection, setLatestCollection] = useState([])

    useEffect(()=>{

        if(props.category === "Clothing"){

            setLatestCollection(products.filter((item)=> item.category === "Clothing"))

        }
        
        else{

            setLatestCollection(products.filter((item)=>item.category === "Electronics"))
        }

        
    }, [products])  // RUNS ONLY ON FIRST RENDER 


    return (
        <>
            
            <div className='mt-10 flex flex-col gap-5'>

                <div className="title flex items-center justify-center flex-col">

                    <div className='flex flex-row items-center justify-center gap-2'>

                        <p className='text-2xl font-semibold text-gray-800'><span className='text-gray-500'>LATEST</span> COLLECTIONS</p>
                        <div className='bg-gray-700 h-0.5 w-16'></div>

                    </div>

                    <p className='text-gray-600'>These are our latest collections with newer designs for our customers</p>


                </div>

                <div className="collections grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5">
                    {

                        latestCollection.map((item, index)=>(

                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                        ))
                    }

                </div>

            </div>
        
        </>
    )
}

export default LatestCollection
