import React, { useRef, useState } from "react";
import { Menubar } from "primereact/menubar";
import { Menu } from "primereact/menu";
import logo from "../../assets/images/logo.svg";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Avatar } from "primereact/avatar";
import { Icon } from "@iconify/react";
import "./NavBar.css";
// import { AuthContainer } from "../../Users/AuthContainer";
// import { havePermissionNavBar } from "../../Users/ProtectedRoute";
import { has } from "lodash";

export const Navbar = () => {
  const navigate = useNavigate();
  const menuUserRef = useRef(null);
  const user = "Gustavo"
  const menuTemplate = (item, options, arrow) => {
    return (
      <a
        className={options.className}
        target={item.target}
        onClick={options.onClick}
      >
        {item.icon && item.icon}
        <span className={options.labelClassName}>{item.label}</span>
        {arrow ? (
          <Icon
            icon="ep:arrow-down"
            vAlign="bottom"
            style={{ fontSize: "20px", marginLeft: "0.5rem" }}
          />
        ) : undefined}
      </a>
    );
  };
  let MenuModel = [
    {
      label: "Usuarios",
      icon: (
        <Icon
          icon="carbon:user-multiple"
          style={{ fontSize: "24px", marginRight: "0.5rem" }}
        />
      ),
      command: () => {
        navigate(`/usuarios`);
      },
      template: (item, options) => menuTemplate(item, options),
    },
    {
      label: "Profesionales",
      icon: (
        <Icon
          icon="carbon:user-multiple"
          style={{ fontSize: "24px", marginRight: "0.5rem" }}
        />
      ),
      command: () => {
        navigate(`/profesionales`);
      },
      template: (item, options) => menuTemplate(item, options),
    },
    {
      label: "Servicios",
      icon: (
        <Icon
          icon="carbon:user-multiple"
          style={{ fontSize: "24px", marginRight: "0.5rem" }}
        />
      ),
      command: () => {
        navigate(`/servicios`);
      },
      template: (item, options) => menuTemplate(item, options),
    },
    {
      label: "Subservicios",
      icon: (
        <Icon
          icon="carbon:user-multiple"
          style={{ fontSize: "24px", marginRight: "0.5rem" }}
        />
      ),
      command: () => {
        navigate(`/subservicios`);
      },
      template: (item, options) => menuTemplate(item, options),
    },
    {
      label: "Configuración",
      icon: (
        <Icon
          icon="carbon:user-multiple"
          style={{ fontSize: "24px", marginRight: "0.5rem" }}
        />
      ),
      command: () => {
        navigate(`/configuracion`);
      },
      template: (item, options) => menuTemplate(item, options),
    },
  ];
  const menuUser = [
    {
      label: "Contraseña",
      command: () => {
        navigate(`/CambiarContrasena`);
      },
      icon: (
        <Icon
          icon="carbon:password"
          style={{ fontSize: "24px", marginRight: "0.5rem" }}
        />
      ),
      template: (item, options) => menuTemplate(item, options),
    },
    {
      label: user ? "Salir" : "Entrar",
      command: () => {
        if (user) {
          // logout();
        } else {
          navigate(`/login`);
        }
      },
      icon: (
        <Icon
          icon={user ? "carbon:logout" : "carbon:login"}
          style={{ fontSize: "24px", marginRight: "0.5rem" }}
        />
      ),
      template: (item, options) => menuTemplate(item, options),
    },
  ];
  const end = () => {
    if (user && menuUser.length === 2) {
      menuUser.unshift({
        separator: true,
      });
      menuUser.unshift({
        label: user.userName,
        className: "flex justify-content-center text-pink-900",
        icon: (
          <Icon
            icon="la:user-check"
            style={{ fontSize: "24px", marginRight: "0.5rem" }}
          />
        ),
        template: (item, options) => menuTemplate(item, options),
      });
    } 
    
    return (
      <div className="flex align-items-center menu-end">
        <Menu model={menuUser} ref={menuUserRef} popup />
        <Button
          className="p-button p-button-rounded p-button-text text-700"
          icon="pi pi-user"
          onClick={(event) => menuUserRef.current.toggle(event)}
        />
        <i
          className="pi pi-chevron-down text-700"
          onClick={(event) => menuUserRef.current.toggle(event)}
        />
      </div>
    );
  };
  const start = () => {
    return (
      <Avatar
        image={logo}
        className="mr-1"
        size="xlarge"
        shape="circle"
        onClick={() => navigate("/")}
      />
    );
  };
  const recursiveMenuCheck = (item) => {
    if (Object.keys(item).includes("items") /* has(item, "items") */) {
      item.items = item.items.filter((i) => i);
      item.items.forEach((i) => {
        recursiveMenuCheck(i);
      });
    } else {
      return;
    }
  };

  //setting permissions
  const checkPermissionsNavBar = () => {
    //eliminar los falsos primer nivel
    MenuModel = MenuModel.filter((item) => item);
    MenuModel = MenuModel.map((item) => {
      recursiveMenuCheck(item);
      if (item.items?.length === 0) item = false;
      return item;
    });
    MenuModel = MenuModel.filter((item) => item);
  };
  checkPermissionsNavBar();

  return (
    <Menubar
      className="mb-2 border-none"
      break
      style={{ backgroundColor: "transparent" }}
      model={MenuModel}
      start={start}
      end={end}
    />
  );
};
