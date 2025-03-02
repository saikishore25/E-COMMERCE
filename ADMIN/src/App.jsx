import React from 'react'
import { Route,  Link, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage'
import AdminLogin from './components/AdminLogin'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
    
    return (
      <>    

            <div className=' mx-16'>
                
                <ToastContainer/>
                <Routes>

                    <Route path="/admin-login" element={<AdminLogin/>}></Route>
                    <Route path="/admin" element={<AdminPage/>}></Route>

                </Routes>

            </div>

        
      </>
    )
}

export default App
