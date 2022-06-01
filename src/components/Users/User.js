import React, { useEffect, useRef, useState } from "react";
import { FilterMatchMode, FilterService } from "primereact/api";
import * as yup from "yup";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Table } from "../ui/Table";
import axios from "axios";
import { confirmDialog } from "primereact/confirmdialog";
import { fireError, fireInfo } from "../utils";

export const Users = () => {
  const [users, setUsers] = useState(null);
  // const [roles, setRoles] = useState(null);
  // const [roles1, setRoles1] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);
  // const cargarRoles = () => {
  //   axios
  //     .get("rol_controller/listar")
  //     .then((resp) => {
  //       if (resp?.data) {
  //         console.log(resp.data);
  //         setRoles(resp.data);
  //         setRoles1(
  //           resp.data.filter(
  //             (e) =>
  //               !(e.nombreRol === "CLIENTE" || e.nombreRol === "ENTRENADOR")
  //           )
  //         );
  //       }
  //     })
  //     .catch((error) => console.log(error.message));
  // };
  const cargarDatos = () => {
    axios
      .get("usuarios")
      .then((resp) => {
        if (resp) {
          console.log(resp.data);
          setUsers(resp.data);
          // cargarRoles();
        }
      })
      .catch((error) => console.log(error.message));
  };
  const modifyElement = (element) => {
    console.log(element);
    axios
      .patch("usuarios", element)
      .then((resp) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.message));
  };
  const createElement = (element) => {
    axios
      .post("usuarios", element)
      .then((resp) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.message));
  };
  const deleteElement = (id) => {
    // if (JSON.parse(localStorage.getItem("user")).idUsuario === id) {
    //   fireError("No puede eliminar el usuario actualmente logeado");
    //   return;
    // }
    axios
      .delete(`usuarios/${id}`, id)
      .then((_) => {
        cargarDatos();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const deleteSeveralElement = (arrayId) => {
    // if (arrayId.includes(JSON.parse(localStorage.getItem("user")).idUsuario)) {
    //   fireError("No puede eliminar el usuario actualmente logeado");
    //   return;
    // }
    axios
      .delete("usuarios", { data: arrayId })
      .then((_) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.message));
  };
  const filters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    username: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
  let c = [
    { field: "username", header: "Nombre de Usuario" },
  ];

  let emptyElement = { username: "" };

  const confirmForcePassword = (elem) => {
    console.log(elem,"first")
    confirmDialog({
      header: "Confirmación",
      message: `¿Desea resetear la contraseña al usuario ${elem.username}?`,
      icon: "pi pi-question-circle",
      accept: () => forzarPassword(elem),
    });
  };

  const forzarPassword = (elem) => {
    axios
      .patch(`usuarios/${elem.idUsuario}`, {
        headers: { "content-type": "application/json" },
      })
      .then((resp) => {
        if (resp.data) {
          fireInfo(
            "La contraseña del usuario " +
              elem.username +
              " fue modificada a Nombre de usuario + * + Año actual"
          );
        } else {
          fireError(
            "La contraseña del usuario no fue modificada. Contacte a los administradores"
          );
        }
      })
      .catch((error) => console.log(error.response.data.message));
  };

  //Form
  //React-hook-form
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Nombre de usuario es requerido")
      .min(5, "Nombre de usuario debe tener al menos 5 carácteres")
      .lowercase("Nombre de usuario debe ser en minúsculas")
      .trim("Nombre de usuario no puede contener espacios"),
  });
  let dataStruct = [
    {
      id: 1,
      label: "Nombre de usuario:*",
      component: "InputText",
      name: "username",
      defaultValue: "",
    },
  ];
  const formProps = {
    data: dataStruct,
    schema: schema,
    handle: [createElement, modifyElement],
    buttonsNames: ["Guardar", "Cancelar"],
  };
  return (
    <div>
      {!users && (
        <div className="flex h-30rem justify-content-center align-items-center">
          <ProgressSpinner strokeWidth="3" />
        </div>
      )}
      {users ? (
        <div>
          <Table
            value={users}
            header="Usuarios"
            size="small"
            columns={c}
            pagination={true}
            rowNumbers={[10, 20, 30]}
            selectionType="multiple"
            sortRemove
            orderSort={1}
            fieldSort="username"
            filterDplay="row"
            filtersValues={filters}
            edit={true}
            exportData={true}
            removeOne={deleteElement}
            removeSeveral={deleteSeveralElement}
            formProps={formProps}
            emptyElement={emptyElement}
            additionalButtons={[
              [
                <Button
                  icon="pi pi-unlock"
                  className="p-button-rounded p-button-text mr-2"
                  data-pr-tooltip="Forzar contraseña"
                />,
                // confirmForcePassword,
                forzarPassword,
              ],
            ]}
          />
        </div>
      ) : //poner cargar
      undefined}
    </div>
  );
};
