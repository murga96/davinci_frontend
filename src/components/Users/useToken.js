import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTokenExpiration } from "./useTokenExpiration";
import { useNavigate } from "react-router-dom";
import { fireError } from "../components/utils";
import { consoleLog } from "../utils";

export function useToken(onTokenInvalid, onRefreshRequired) {
  const history = useNavigate();
  const { clearAutomaticTokenRefresh, setTokenExpiration } =
    useTokenExpiration(onRefreshRequired);

  //init token with timeout
  const setToken = useCallback(
    (token_expiration, access_token) => {
      localStorage.setItem("token", access_token);
      setTokenExpiration(token_expiration);
    },
    [setTokenExpiration]
  );

  const isAuthenticated = useCallback(() => {
    return !!localStorage.getItem("token");
  }, []);

  const clearToken = useCallback(async () => {
    consoleLog("clearToken");
    localStorage.removeItem("token");
    // clear auto refresh interval
    clearAutomaticTokenRefresh();
  }, [clearAutomaticTokenRefresh]);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        consoleLog(JSON.parse(JSON.stringify(error)));
        if (error.response) {
          switch (error.response?.status) {
            case 403: {
              if (localStorage.getItem("token")) {
                clearToken();
                // let the app know that the current token was cleared
                onTokenInvalid();
                break;
              } else {
                fireError("El usuario no tiene permiso para acceder a la página")
                // fireError("El usuario no tiene permiso para acceder a la página");
                history("/login");
              }
              break;
            }
            default:
              if (error.response.data.message) {
                fireError(error.response?.data?.message);
              } else {
                fireError(
                  "Ocurrió un error en la respuesta del servidor. " +
                    error.message
                );
              }
              break;
          }
        } else if (error.request) {
          switch (error.message) {
            case "Network Error":
              fireError(
                "Ocurrió un error en la conexión con el servidor. Revise su conexión a internet"
              );
              break;
            default:
              fireError("Ocurrió un error en el request");
              break;
          }
        } else {
          consoleLog(error.toJSON(), "json");
          if (error) fireError("Error", error.message);
        }
      }
    );

    // configure axios-hooks to use this instance of axios
  }, [clearToken, onTokenInvalid]);

  return {
    clearToken,
    setToken,
    isAuthenticated,
  };
}
