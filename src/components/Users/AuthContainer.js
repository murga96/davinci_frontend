import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContainer } from 'unstated-next';
import { fireError } from '../components/utils';
import { consoleLog } from '../utils';
import { useToken } from './useToken';
// import { AuthEvents } from '../services/AuthEvents';

function useAuth() {
  const [tokenExpiration, setTokenExpiration] = useState(null);
//   const refreshToken = useCallback(refresh, [])
  const navigate = useNavigate()
  const onTokenInvalid = () => {
    fireError("El usuario no tiene permiso para acceder al sistema")
    // fireError("El usuario no tiene permiso para acceder al sistema")
    navigate("/login")
};
  const { setToken, clearToken } = useToken(onTokenInvalid, refresh);

//   useEffect(() => {
//     // try to get new token on first render using refresh token
//     refreshToken();
//   }, [refreshToken]);

  // useEffect(() => {
  //   // add listener for login or logout from other tabs
  //   window.addEventListener('storage', async (event) => {
  //     if (/* event.key === AuthEvents.LOGOUT && */ isAuthenticated()) {
  //       await clearToken(false);
  //       setUser(null);
  //     } else /* if (event.key === AuthEvents.LOGIN) */ {
  //       refresh();
  //     }
  //   });
  // }, [clearToken, isAuthenticated, refresh]);

  const logout = useCallback(() => {
    clearToken().finally(() => {
      localStorage.clear()
      navigate('/login');
      // fire an event to logout from all tabs
    //   window.localStorage.setItem(AuthEvents.LOGOUT, new Date().toISOString());
    });
  }, [navigate, clearToken]);

  const register = useCallback(
    async (username, password) => {
      const {
        data: {userName, authorities, listPermits, token  },
      } = await axios.post('auth/register', {
        username: username, password: password 
      });
      localStorage.setItem("user", JSON.stringify({userName, authorities, listPermits}))
      setToken(tokenExpiration, token);
      navigate('/');
    },
    [setToken],
  );

  const login = useCallback(
    async (username, password, tokenExp) => {
      try {
        const resp = await axios.post('auth/login', {
            username: username, password: password 
        })
        if(resp?.data){
          const {data} = resp
          consoleLog(data)
          setTokenExpiration(tokenExp)
          localStorage.setItem("user", JSON.stringify({userName: data.userName,pkUsuario: data.pkUsuario, authorities: data.authorities, listPermits: data.listPermits}))
          consoleLog(data.token,"token")
          setToken(tokenExp, data.token);
          return data.authorities
        }
        // navigate('/');
      } catch (error) {
          fireError(error)
      }
      // fire an event to let all tabs know they should login
    //   window.localStorage.setItem(AuthEvents.LOGIN, new Date().toISOString());
    },
    [setToken],
  );

  async function refresh() {
      try {
          const {
            data: { token },
          } = await axios.post('auth/refresh', {
              token: localStorage.getItem("token")
          });
          consoleLog(token)
          setToken(tokenExpiration, token);
          //TODO hacer refresh al principio pa coger los datos si no ha expirado
          // consoleLog("hay k hacer refresh al principio")
      } catch (error) {
          clearToken()
          localStorage.removeItem("user")
          navigate('/login');
          consoleLog(error)
      }
  }

  return {
    register,
    login,
    logout,
    refresh,
  };
}

export const AuthContainer = createContainer(useAuth);
