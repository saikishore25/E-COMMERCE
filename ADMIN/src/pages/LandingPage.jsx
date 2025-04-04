import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    
    const navigate = useNavigate()

    return (
        <>
            <div className='w-full h-screen flex items-center justify-center'>
                
                <button onClick={()=> navigate("/admin-login")} className='bg-black p-2 rounded-xl hover:scale-110 hover:transform transition-all ease-in-out cursor-pointer'>

                    <p className='text-white'>ADMIN PAGE {"->"}</p>
                </button>
            </div>
        
        </>
    )
}

export default LandingPage
