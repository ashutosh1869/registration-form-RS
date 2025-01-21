import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    
      <div className=' w-full min-h-screen'>
        <Outlet />
      </div>
      
   
  )
}

export default App
