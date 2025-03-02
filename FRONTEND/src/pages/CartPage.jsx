import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItems from '../components/CartItems'
import CartTotals from '../components/CartTotals'

const CartPage = () => {

    
    
    return (
        <>

            <Navbar/>
            <CartItems/>
            <CartTotals/>
            <Footer/>

            
        
        </>
    )
}

export default CartPage
