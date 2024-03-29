import React from 'react'
import Header from '../header'
import FiliersHome from '../filiersHome'
import DepartementsHome from '../DepartementsHome'
import InfoHome from '../InfoHome'

const Index = () => {
  return (
    <div class="flex flex-col gap-4 gap-y-12 ">
        <Header/>
        <FiliersHome/>
        <InfoHome/>
        <DepartementsHome/>
        
    </div>
  )
}

export default Index