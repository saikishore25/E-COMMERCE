import React, {useState} from 'react'
import search_icon from "../assets/frontend_assets/search_icon.png"
import cross_icon from "../assets/frontend_assets/cross_icon.png"


const SearchBar = () => {

    
    
    return (
        <>

            <div className="w-full flex justify-center items-center p-4 gap-2">
                
                <div className=' text-black bg-white border-2 border-black flex w-[40%] flex-row items-center justify-between rounded-4xl px-3'>
                    
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full max-w-2xl p-2  outline-0 rounded-lg outline-none "
                    />
                    <img src={search_icon} alt="" className='max-sm:h-3 max-sm:w-3 h-5 w-5 cursor-pointer' />

                    
                </div>
                {/* <img src={cross_icon} alt="" className='cursor-pointer' /> */}

            </div>
                    
        
        </>
    )
}

export default SearchBar
