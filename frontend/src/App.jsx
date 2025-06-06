import { useState } from 'react'

import Navbar from './components/Navbar/Navbar'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Placeholder from './Pages/Placeorder/Placeholder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'
function App() {
     const[showLogin , setShowLogin]=useState(false)

  return (
    <>
     {showLogin?<LoginPopup setShowLogin={setShowLogin}/>: <></>}
    <div className='app'>
         <Navbar setShowLogin= {setShowLogin}/>
      <Routes>
        <Route path='/' element= {<Home/>}/>
         <Route path='/cart' element= {<Cart/>}/>
          <Route path='/order' element= {<Placeholder/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
