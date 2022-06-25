import React from 'react'
import {Outlet} from "react-router-dom"
import { Navbar } from './Navbar'

export const OutletNavbar = () => {
    return (
        <div>
            <Navbar/>
            <div className='p-3'>
            <Outlet />
            </div>
        </div>
    )
}
