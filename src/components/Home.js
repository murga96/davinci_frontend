import React from 'react'
import {Outlet} from "react-router-dom"
import { Navbar } from './NavBar/Navbar'

export const Home = () => {
    return (
        <div>
            <Navbar/>
            <div className='p-3'>
                <Outlet />
            </div>
        </div>
    )
}
