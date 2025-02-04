import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    
      <div className=' w-full flex text-center min-h-screen'>
        {/* <Outlet /> */}
        <p className='text-center text-4xl text-red-500 font-bold'>
          We have closed due to server issues we will be back in few hours.
        </p>
      </div>
      
   
  )
}

export default App
