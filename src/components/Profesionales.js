import React, { useEffect, useState } from "react";
import { FilterMatchMode, FilterService } from "primereact/api";
import * as yup from "yup";
import { Table } from "./ui/Table";
import axios from "axios";
import { consoleLog } from "./utils";
import { Loading } from "./ui/LoadingComponent";

export const Profesionales = () => {
  const [profesionales, setProfesionales] = useState(null);
  const [file, setFile] = useState(null);

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

  const modifyElement = (element) => {
    console.log(element);
    const formData = new FormData();
    formData.append("idProfesional", element.idProfesional);
    formData.append("nombre", element.nombre);
    formData.append("imagen", file);
    formData.append("descripcion", element.descripcion);
    formData.append("cargo", element.cargo);
    formData.append("correo", element.correo);
    console.log(formData.get("idProfesional"));
    axios
      .patch("profesionales", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.message));
  };
  const createElement = (element) => {
    console.log(element);
    element.imagen = file;
    const formData = new FormData();
    formData.append("nombre", element.nombre);
    formData.append("imagen", element.imagen);
    formData.append("descripcion", element.descripcion);
    formData.append("cargo", element.cargo);
    formData.append("correo", element.correo);
    axios
      .post("profesionales", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
  //Template
  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.imagen}`}
        alt={rowData.image}
        className="product-image"
        style={{
          width: "80px",
          "box-shadow":
            "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
        }}
      />
    );
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
    { field: "imagen", header: "Imagen", body: imageBodyTemplate, noFilter: true },
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
    imagen: yup.object().nullable("Debe seleccionar una imagen"),
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
      component: "FileUpload",
      name: "imagen",
      defaultValue: "",
      props: {
        accept: "image/*",
        customUpload: true,
        onSelect: (e) => {
          setFile(e.files[0]);
        },
        uploadOptions: { className: "hidden" },
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
        <Loading />
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
