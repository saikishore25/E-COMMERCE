import React from 'react'

const WhyUs = () => {
    
    return (
        <>
            <div className="text-xl py-4 text-center">
                
                <div className="inline-flex gap-2 items-center mb-3">
                    <p className="text-gray-500">
                        WHY <span className="text-gray-700 font-medium">CHOOSE US</span>
                    </p>
                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
                
            </div>

            <div className="flex flex-col md:flex-row text-sm mb-20 gap-5">
                
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Quality Assurance:</b>
                    <p className="text-gray-600">
                        We meticulously select and vet each product to ensure it meets our
                        stringent quality standards.
                    </p>
                </div>

                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Convenience:</b>
                    <p className="text-gray-600">
                        With our user-friendly interface and hassle-free ordering process,
                        shopping has never been easier.
                    </p>
                </div>

                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Exceptional Customer Service:</b>
                    <p className="text-gray-600">
                        Our team of dedicated professionals is here to assist you the way,
                        ensuring your satisfaction is our top priority.
                    </p>
                </div>

            </div>
        
        </>
    )
}

export default WhyUs
