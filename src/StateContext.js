import React, { useContext, useReducer } from 'react'

export const StateContext = React.createContext()


export const StateProvider = ({value, reducer, children}) => {
    return (
        <StateContext.Provider value={useReducer(reducer, value)}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)
