import React from 'react'
import Home from '../components/Home'
import Container from '../components/Container'

function HomePage() {
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-zinc-900 '>
        <Container>
            <Home />
        </Container>
    </div>
  )
}

export default HomePage