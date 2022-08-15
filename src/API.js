import axios from "axios"
/*
* Funciones básicas de la API(fetchAll, fetchOne, add, edit, delete ) 
*/
const apiFunctions = {
    fetchAll: async(baseEndpoint, options) => {
        return await axios.get(baseEndpoint)
    },
    fetchOne: async(baseEndpoint, id, options) => {
        return await axios.get(`${baseEndpoint}/${id}`)
    },
    add: async(baseEndpoint,value, options) => {
        return await axios.post(baseEndpoint, value, options)
    },
    edit: async(baseEndpoint,value, options) => {
        return await axios.patch(baseEndpoint, value, options)
    },
    delete: async(baseEndpoint, id, options) => {
        return await axios.delete(`${baseEndpoint}/${id}`, id)
    },
    bulkDelete: async(baseEndpoint,ids, options) => {
        return await axios.delete(`${baseEndpoint}/`, {data: ids})
    },
    

}
export default apiFunctions