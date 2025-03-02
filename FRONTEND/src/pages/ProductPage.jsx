import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../contexts/ShopContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductOverview from '../components/ProductOverview';
import RelatedProducts from '../components/RelatedProducts';

const ProductPage = () => {
    
    

    return  (
        <>

            <Navbar/>
            <hr className='h-0.25 bg-gray-400'></hr>
            <ProductOverview/>
            {/* <RelatedProducts/> */}
            <Footer/>

        
        </>
    )
}

export default ProductPage
