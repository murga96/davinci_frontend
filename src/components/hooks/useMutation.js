import { useState } from 'react';
import API from '../../API'
/*
* Mutaciones disponibles para reallizar a una entidad
*/
export const mutationTypes = {
    CREATE: "CREATE",
    MODIFY: "MODIFY",
    REMOVE: "REMOVE",
    BULK_REMOVE: "BULK_REMOVE",
}

/*
* Hooks para realizar mutaciones a una entidad
*/
export const useMutation = (action, path) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const create = async( value, options) => {
        let resp = null
        try {
            setLoading(true)
            setError(false)
            resp = await API.add(path, value, options)
            setLoading(false)
        }catch(error){
            setError(true)
            console.log(error.message);
        } 
        return resp?.data
    }
    const modify = async( value, options) => {
        let resp = null
        try {
            setLoading(true)
            setError(false)
            resp = await API.edit(path, value, options)
            setLoading(false)
        }catch(error){
            setError(true)
            console.log(error.message);
        } 
        return resp?.data
    }
    const remove = async( id, options) => {
        let resp = null
        try {
            setLoading(true)
            setError(false)
            resp = await API.delete(path, id, options)
            setLoading(false)
        }catch(error){
            setError(true)
            console.log(error.message);
        } 
        return resp?.data
    }
    const bulkRemove = async( ids, options) => {
        let resp = null
        try {
            setLoading(true)
            setError(false)
            resp = await API.bulkDelete(path, ids, options)
            setLoading(false)
        }catch(error){
            setError(true)
            console.log(error.message);
        } 
        return resp?.data
    }
    const reducer = (action) => {
        switch (action) {
            case "CREATE":
                return create
            case "MODIFY":
                return modify
            case "REMOVE":
                return remove
            case "BULK_REMOVE":
                return bulkRemove
            default:
                break;
        }
    }
    
    return [reducer(action),loading, error]
}
