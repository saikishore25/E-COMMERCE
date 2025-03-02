import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../contexts/ShopContext'

const CartTotals = () => {
    
    const {cartAmount, currency} = useContext(ShopContext)

    return (
        <>
            <div className='cart-totals w-full flex items-center justify-end mt-5'>

                <div className='w-[30%] flex items-start justify-center flex-col gap-3'>

                    <div className="inline-flex gap-2 items-center mb-3 ">
                        
                        <p className="text-gray-500">
                            CART <span className="text-gray-700 font-medium">TOTAL</span>
                        </p>
                        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>

                    </div>

                    <div className="calculate flex flex-col items-start justify-center gap-2 w-full">

                        <div className="subtotal flex flex-row items-center justify-between border-b-[1px] border-gray-400 w-full">

                            <p>Subtotal</p>
                            <p>{cartAmount}</p>


                        </div>
                        <div className="shipping-fee flex flex-row items-center justify-between border-b-[1px] border-gray-400 w-full">

                            <p>Shipping Fee</p>
                            <p>{currency}{10}</p>

                        </div>

                        <div className="total flex flex-row items-center justify-between w-full border-b-[1px] border-gray-400">
                            
                            <p className='font-bold text-xl'>Total</p>
                            <p>{cartAmount + 10}</p>

                        </div>
                    </div>

                    <div className="checkout bg-black w-fit h-10 flex items-center justify-end px-2 rounded-sm">

                        <div>

                            <Link to="/place-order"><p className='text-white'>Proceed To Checkout</p></Link>

                        </div>

                    </div>

                


                </div>


            </div>
        
        </>
    )
}

export default CartTotals
