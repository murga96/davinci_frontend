import React, { useState } from 'react'
import {Outlet} from "react-router-dom"
import { Navbar } from './Navbar'

export const OutletNavbar = () => {
    const a = () => {
        // throw Error("Somet")
         return 1 +""
          /* eslint-disable */
         const [first, setfirst] = useState(null)
    }
    a()
    return (
        <div>
            <Navbar/>
            <div className='p-3'>
            <Outlet />
            </div>
        </div>
    )
}
