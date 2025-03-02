import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../contexts/ShopContext'
import ProductItem from './ProductItem';
import Filters from './Filters';


const Collection = () => {
    
    const {products, electronicsData, category, setCategory, brand, setBrand, type, setType} = useContext(ShopContext);

    // console.log(category, type, brand)
    
    const [totalCollection, setTotalCollection] = useState([])
    
    const applyFilter = ()=>{

        let productsCopy = products.slice();
        if(category.length >0){

            productsCopy = productsCopy.filter((value)=>(category.includes(value.category)))
            
        }
        
        if(type.length >0){
            
            productsCopy = productsCopy.filter((value)=>(type.includes(value.subCategory)))
            
            
        }
        
        if(brand.length>0){
            
            productsCopy = productsCopy.filter((value)=>(brand.includes(value.brand)));
            
        }
        
        setTotalCollection(productsCopy)

    
    }

    useEffect(()=>{
        
        applyFilter()
        

    },[category, type, brand])


    useEffect(()=>{

        setTotalCollection(products.slice(1,70))
    }, [products])

    

    return (
        <>  

            <div className="collection-section flex flex-col sm:flex-row gap-1 sm:gap-10 pt-5">


                <Filters/>
            
                <div className="collections flex flex-col gap-5">

                    <div className="headers flex flex-row items-center justify-between">

                        <p className='font-semibold text-3xl '>All Collections</p>

                        <select className="sort border-2 border-gray-300 text-sm px-2 p-3 w-32">

                            <option value="relavent">Relavent</option>
                            <option value="low-high">Low-High</option>
                            <option value="high-low">High-Low</option>

                        </select>

                    </div>

                    <div className="collections grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 justify-center content-center">
                        {

                            totalCollection.map((item, index)=>(

                                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                            ))
                        }

                    </div>
                </div>

            </div>
        
        </>
    )

}

export default Collection
