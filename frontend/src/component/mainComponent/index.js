import React from 'react'
import FirstPage from '../firstPage'
import SimpleSlider from '../SimpleSlider'
import ProductShow from '../productShow'
import Footer from '../Footer'


const MainComponent = () => {
  return (
    <div >
    <FirstPage className='first-page'/>  
    <SimpleSlider/>
    <ProductShow/>
    <Footer/>
    </div>
  )
}

export default MainComponent
