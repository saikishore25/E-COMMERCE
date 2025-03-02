import React from 'react'
import AboutUs from '../components/AboutUs'
import Navbar from '../components/Navbar'
import WhyUs from '../components/WhyUs'
import Footer from '../components/Footer'
import Subscription from '../components/Subscription'

const AboutPage = () => {
    
  return (
    <>
      <Navbar/>
      
      <div className="about-us-container max-w-screen-xl mx-auto px-5">
        <AboutUs/>
        <WhyUs/>
        <Subscription/>
        <Footer/>
        
      </div>
      
    </>
  )
}

export default AboutPage
