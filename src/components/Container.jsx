import React from 'react'

function Container({children}) {
  return (
    <div className='flex items-center justify-center w-full bg-gray-600 '>
        {children}
    </div>
  )
}

export default Container