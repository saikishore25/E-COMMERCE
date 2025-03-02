import React from 'react'
import exchange_icon from "../assets/frontend_assets/exchange_icon.png"
import return_icon from "../assets/frontend_assets/quality_icon.png"
import support_icon from "../assets/frontend_assets/support_img.png"

const Features = () => {
    return (
        <>

            <div className="features w-full flex sm:flex-row flex-col items-center justify-evenly mt-10 gap-5">

                <div className="exchange flex flex-col items-center justify-center bg-gray-50 p-5 rounded-3xl text-center">

                    <img src={exchange_icon} alt="" className='h-10 w-10'/>
                    <p>Easy Exchange Policy</p>
                    <p>We Offer Hastle Free Exchange Policy</p>

                </div>

                <div className="return flex flex-col items-center justify-center bg-gray-50 p-5 rounded-3xl text-center">

                    <img src={return_icon} alt="" className='h-10 w-10'/>
                    <p>7 Days Return Policy</p>
                    <p>We provide 7 days free return policy</p>
                
                </div>

                <div className="support flex flex-col items-center justify-center bg-gray-50 p-5 rounded-3xl text-center">
                    
                    <img src={support_icon} alt="" className='h-10 w-10'/>
                    <p>Best customer support</p>
                    <p>we provide 24/7 customer support</p>

                </div>
            </div>
        
        </>
    )
}

export default Features
