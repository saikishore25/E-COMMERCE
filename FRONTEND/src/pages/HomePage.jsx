import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import Subscribe from '../components/Subscribe.jsx'
import LatestCollection from '../components/LatestCollection.jsx'
import BestSeller from '../components/BestSeller.jsx'
import Footer from '../components/Footer.jsx'

const HomePage = () => {
    return (
        <>
            <Navbar/>
            <Hero/>
            <LatestCollection category="Clothing"/>
            <BestSeller/>
            <LatestCollection category="Electronics"/>
            <Features/>
            <Subscribe/>
            <Footer/>
        
        </>
    )
}

export default HomePage
