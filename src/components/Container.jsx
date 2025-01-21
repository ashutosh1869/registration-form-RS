import React from 'react'

function Container({children}) {
  return (
    <div className='flex items-center justify-center w-full h-full '>
        {children}
    </div>
  )
}

export default Container