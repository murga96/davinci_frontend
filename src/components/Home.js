import React from 'react'
import { Hero } from './Hero/Hero'
import { Profesionals } from './ProfesionalComponent/ProfesionalComponent'
import { Services } from './ServicesComponent/ServicesComponent'

export const Home  = () => {
  return (
    <div>
        <Hero/>
        <Services />
        <Profesionals />
    </div>
  )
}
