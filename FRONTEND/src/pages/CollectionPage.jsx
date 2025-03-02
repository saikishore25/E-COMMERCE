import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Filters from '../components/Filters'
import Collection from '../components/Collection'
import SearchBar from '../components/SearchBar'

const CollectionPage = () => {
    
    return (
      <>
        <Navbar/>
        <SearchBar/>
        <Collection/>
        <Footer/>
        
      </>
    )
}

export default CollectionPage
