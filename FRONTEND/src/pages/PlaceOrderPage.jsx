import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DeliveryInfo from '../components/DeliveryInfo'
import PaymentMethods from '../components/PaymentMethods'
import CartTotals from '../components/CartTotals'
import CartBuy from '../components/CartBuy'

const PlaceOrderPage = () => {
    
    return (
        <>

            <Navbar/>
            <div className='flex flex-row w-full gap-5'>

                <DeliveryInfo/>
                <div className='flex flex-col w-[40%] items-center justify-center'>
                    
                    <CartBuy/>
                </div>
            </div>
            <Footer/>
        
        </>
    )
}

export default PlaceOrderPage
