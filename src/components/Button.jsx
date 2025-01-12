import React from 'react'



function button(
    {
      children,
      type='button',
      bgColour='bg-blue-400',
      textColour = 'white',
      className ='', 
      ...props
    }
 

) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColour} ${textColour} ${className}`} {...props}>
        {children}
    </button>
  )
}


export default button