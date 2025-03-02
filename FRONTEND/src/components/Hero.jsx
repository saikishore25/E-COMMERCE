import React from 'react'
import hero_img from "../assets/frontend_assets/hero_img.png"

const Hero = () => {
    
    return (
        <>
            <div className="hero-section flex sm:flex-row flex-col lg:h-[65vh] sm:h-[40vh] h-[60vh]  mt-2 border-gray-400 border-2">

            
                <div className="hero-context sm:w-[50%] w-[100%] max-sm:h-[35%]  flex items-center justify-center flex-col ">

                    <div className="content flex items-start justify-center flex-col">

                        <div className="first-line flex flex-row items-center justify-center gap-2">
                            <div className='bg-gray-700 h-0.5 w-16'></div>
                            <p className='text-gray-800'>OUR BESTSELLERS</p>

                        </div>
                        <p className='lg:text-5xl text-xl font-semibold font text-gray-800'>Latest Arrivals</p>
                        <div className="second-line flex flex-row items-center justify-center gap-2">
                            <p className='text-gray-800'>SHOP NOW</p>
                            <div className='bg-gray-700 h-0.5 w-16'></div>
                        </div>


                    </div>

                </div>

                <div className="hero-img sm:w-[50%] w-[100%] max-sm:h-[65%]">

                    <img src={hero_img} alt="" className='h-full w-full'/>

                </div>
            </div>
        
        </>
    )
}

export default Hero
