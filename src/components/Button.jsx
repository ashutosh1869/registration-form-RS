import React from 'react';

function Button({
  children,
  type = 'button',
  bgColour = 'bg-blue-400',
  textColour = 'white',
  className = '',
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColour} ${textColour} ${className} transition duration-300 ease-in-out hover:opacity-90`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
