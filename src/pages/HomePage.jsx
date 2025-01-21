import React from 'react'
import Home from '../components/Home'
import Container from '../components/Container'

function HomePage() {
  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
        <Container>
            <Home />
        </Container>
    </div>
  )
}

export default HomePage