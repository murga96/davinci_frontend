import axios from "axios"
/*
* Funciones básicas de la API(fetchAll, fetchOne, add, edit, delete ) 
*/
const apiFunctions = {
    fetchAll: async(baseEndpoint) => {
        return await axios.get(baseEndpoint)
    },
    fetchOne: async(baseEndpoint, id) => {
        return await axios.get(`${baseEndpoint}/${id}`)
    },
    add: async(baseEndpoint,value) => {
        return await axios.post(baseEndpoint, value)
    },
    edit: async(baseEndpoint,value) => {
        return await axios.patch(baseEndpoint, value)
    },
    delete: async(baseEndpoint, id) => {
        return await axios.delete(`${baseEndpoint}/${id}`, id)
    },
    bulkDelete: async(baseEndpoint,ids) => {
        return await axios.delete(`${baseEndpoint}/`, {data: ids})
    },
    

}
export default apiFunctions