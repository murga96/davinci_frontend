import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {roles_pages, unathourized_pages} from "./RolesPages";
import {fireError} from "./../components/utils"
import { consoleLog } from "../utils";


export const AuthenticateRoute = ({ component: Component, path }) => {
  // const { user } = AuthContainer.useContainer();
  const navigate = useNavigate();
  

  useEffect(() => {
    console.log(JSON.stringify(JSON.parse(localStorage.getItem("user"))));
    if (!JSON.parse(localStorage.getItem("user")) && !unathourized_pages.includes(path)) {
      fireError("El usuario no se encuentra autenticado para acceder a la página");
      navigate("/login");
    } else if (
      JSON.parse(localStorage.getItem("user"))?.authorities.length > 0 &&
      !roles_pages[
        JSON.parse(localStorage.getItem("user"))?.authorities[0].authority
      ]?.includes(path)
    ) {
      fireError("El rol del usuario no tiene permisos para acceder a la página");
      navigate(-1);
    }
  });

  return JSON.parse(localStorage.getItem("user")) || unathourized_pages.includes(path) ? <Component /> : <></>;
};

export const havePermissionNavBar = (role, navBarItem) => {
  //chequeo que la pagina se puede acceder sin autenticarse
  if(unathourized_pages.includes("/" + navBarItem)) return true 
  if (roles_pages[role]?.includes("/" + navBarItem)) return true;
  else return false;
};
