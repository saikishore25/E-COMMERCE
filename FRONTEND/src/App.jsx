import React from 'react'
import {Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import AboutPage from "./pages/AboutPage.jsx"
import ContactPage from "./pages/ContactPage.jsx"
import CollectionPage from "./pages/CollectionPage.jsx"
import ProductPage from './pages/ProductPage.jsx'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPage from './pages/CartPage.jsx'
import PlaceOrderPage from './pages/PlaceOrderPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OrdersPage from "./pages/OrdersPage.jsx"


const App = () => {
  
  return (
    <>
      <div className=' mx-16'>
        <ToastContainer/>
        
        <Routes>

            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/collection" element={<CollectionPage/>}></Route>
            <Route path="/about" element={<AboutPage/>}></Route>
            <Route path="/contact" element={<ContactPage/>}></Route>
            <Route path="/product/:productID" element={<ProductPage/>}></Route>
            <Route path="/product/cart" element={<CartPage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/signup" element={<SignUpPage/>}></Route>
            <Route path="/place-order" element={<PlaceOrderPage/>}></Route>
            <Route path="/orders" element={<OrdersPage/>}></Route>


        </Routes>

      </div>

    </>
  )
}

export default App
