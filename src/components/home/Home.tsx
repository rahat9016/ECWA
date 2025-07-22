import React from 'react'
import Hero from './Hero/Hero'

import Features from './Features'
import HowItWorks from './HowItWorks'
import PopulerProducts from './PopulerProducts'
import LatestProducts from './LatestProducts'
import Trusted from './Trusted'


const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <PopulerProducts />
      <LatestProducts />
      <Trusted />
    </div>
  )
}

export default Home