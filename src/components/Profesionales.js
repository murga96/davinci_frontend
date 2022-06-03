import React, { useEffect, useRef, useState } from "react";
import { FilterMatchMode, FilterService } from "primereact/api";
import * as yup from "yup";
import { ProgressSpinner } from "primereact/progressspinner";
import { Table } from "./ui/Table";
import axios from "axios";
import { consoleLog } from "./utils";

export const Profesionales = () => {
  const [profesionales, setProfesionales] = useState(null);

  const [name, setName] = useState("my-upload")
  
  useEffect(() => {
    cargarDatos();
  }, []);
  const cargarDatos = () => {
    axios
    .get("profesionales")
    .then((resp) => {
      if (resp) {
        console.log(resp.data);
        setProfesionales(resp.data);
      }
    })
    .catch((error) => console.log(error.message));
  };

  const onError = err => {
    console.log("Error", err);
  };
  
  const onSuccess = (res) => {
    console.log("Success", res);
    setName(res.name)

  };

  const modifyElement = (element) => {
    console.log(element);
    axios
      .patch("profesionales", element)
      .then((resp) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.message));
  };
  const createElement = (element) => {
    axios
      .post("profesionales", element)
      .then((resp) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.toJSON()));
  };
  const deleteElement = (id) => {
    axios
      .delete(`profesionales/${id}`, id)
      .then((_) => {
        cargarDatos();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const deleteSeveralElement = (arrayId) => {
    axios
      .delete("profesionales/", { data: arrayId })
      .then((_) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.message));
  };
  const filters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    descripcion: { value: null, matchMode: FilterMatchMode.CONTAINS },
    correo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cargo: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
  let c = [
    { field: "nombre", header: "Nombre" },
    { field: "descripcion", header: "Descripción" },
    { field: "correo", header: "Correo" },
    { field: "cargo", header: "Cargo" },
  ];

  let emptyElement = { nombre: "", descripcion: "", correo: "", cargo: "" };

  //Form
  //React-hook-form
  const schema = yup.object().shape({
    nombre: yup.string().required("Nombre es requerido"),
    descripcion: yup
      .string()
      .max(100, "La descripción debe contener menos de 250 carácteres")
      .required("Descripción es requerido"),
    correo: yup
      .string()
      .email("Correo electrónico inválido. Ej: contratos@davinci.com")
      .required("Correo es requerido")
      .nullable("Correo es requerido"),
    imagen: yup.object(),
  });
  let dataStruct = [
    {
      id: 1,
      label: "Nombre:*",
      component: "InputText",
      name: "nombre",
      defaultValue: "",
    },
    {
      id: 1,
      label: "Imagen:*",
      component: "IKUpload",
      name: "imagen",
      defaultValue: "",
      props: {
        fileName: "my-upload",
        publicKey:"public_PP+4MOwvDLetX4MDEzb+0thdVG0=",
        urlEndpoint:"https://ik.imagekit.io/u7qql60ut",
        authenticationEndpoint:"http://localhost:3001/imagekit-io/auth",
        useUniqueFileName: false,
        responseFields: ["tags", "customCoordinates"],
        onError: onError,
        onSuccess: onSuccess,
      },
    },
    {
      id: 1,
      label: "Descripción:*",
      component: "InputTextArea",
      name: "descripcion",
      defaultValue: "",
    },
    {
      id: 1,
      label: "Correo:*",
      component: "InputText",
      name: "correo",
      defaultValue: "",
    },
    {
      id: 1,
      label: "Cargo:",
      component: "InputText",
      name: "cargo",
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
      {!profesionales && (
        <div className="flex h-30rem justify-content-center align-items-center">
          <ProgressSpinner strokeWidth="3" />
        </div>
      )}
      {profesionales ? (
        <div>
          <Table
            value={profesionales}
            header="Profesionales"
            size="small"
            columns={c}
            pagination={true}
            rowNumbers={[10, 20, 30]}
            selectionType="multiple"
            sortRemove
            orderSort={1}
            fieldSort="nombre"
            filterDplay="row"
            filtersValues={filters}
            edit={true}
            exportData={true}
            removeOne={deleteElement}
            removeSeveral={deleteSeveralElement}
            formProps={formProps}
            emptyElement={emptyElement}
          />
        </div>
      ) : //poner cargar
      undefined}
    </div>
  );
};
