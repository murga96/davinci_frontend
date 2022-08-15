import { useState } from "react";
import API from "../../API";
/*
* Hooks para obtener los datos de una entidad
*/
export const useFetch = (path, all = true) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAll = async () => {
    let resp = null;
    try {
      setLoading(true);
      setError(false);
      resp = await API.fetchAll(path);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
    return resp?.data;
  };

  const fetchOne = async (id) => {
    let resp = null;
    try {
      setLoading(true);
      setError(false);
      resp = await API.fetchOne(path, id);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
    return resp?.data;
  };

  return [all ? fetchAll : fetchOne, loading, error];
};
