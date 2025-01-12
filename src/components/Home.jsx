import React from 'react'
import {Link} from 'react-router-dom'
import Button from './Button'
function Home() {
  return (
    <div className='flex items-center justify-center w-full h-full bg-red-400 '>
        <h1 className='text-4xl text-white'>Welcome to the Home Page</h1>
            <p className='text-white text-xl'> Please click the button below to register</p>
            <Link to='/form'>
                <Button className='bg-blue-500 text-white p-2 rounded mt-4'>Register</Button>
            </Link>
    </div>
  )
}

export default Home