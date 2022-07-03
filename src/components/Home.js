import { ListBox } from 'primereact/listbox'
import React, { useState } from 'react'
import { ContactComponent } from './ContactComponent/ContactComponent'
import { Hero } from './Hero/Hero'
import { Profesionals } from './ProfesionalComponent/ProfesionalComponent'
import { Services } from './ServicesComponent/ServicesComponent'

export const Home  = () => {
  return (
    <div>
        <Hero/>
        <Services />
        <Profesionals />
        <ContactComponent/>
    </div>
  )
}
