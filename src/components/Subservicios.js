import React, { useEffect, useRef, useState } from "react";
import { FilterMatchMode, FilterService } from "primereact/api";
import * as yup from "yup";
import { ProgressSpinner } from "primereact/progressspinner";
import { Table } from "./ui/Table";
import axios from "axios";
import { consoleLog } from "./utils";

export const Subservicios = () => {
  const [subservicios, setSubservicios] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);
  const cargarDatos = () => {
    axios
      .get("subservicios")
      .then((resp) => {
        if (resp) {
          console.log(resp.data);
          setSubservicios(resp.data);
        }
      })
      .catch((error) => console.log(error.message));
  };
  const modifyElement = (element) => {
    console.log(element);
    axios
      .patch("subservicios", element)
      .then((resp) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.message));
  };
  const createElement = (element) => {
    axios
      .post("subservicios", element)
      .then((resp) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.toJSON()));
  };
  const deleteElement = (id) => {
    axios
      .delete(`subservicios/${id}`, id)
      .then((_) => {
        cargarDatos();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const deleteSeveralElement = (arrayId) => {
    axios
      .delete("subservicios/", { data: arrayId })
      .then((_) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.message));
  };
  const filters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
  let c = [
    { field: "nombre", header: "Subservicio" },
  ];

  let emptyElement = { nombre: "" };


  //Form
  //React-hook-form
  const schema = yup.object().shape({
    nombre: yup
      .string()
      .required("Subservicio es requerido")
  });
  let dataStruct = [
    {
      id: 1,
      label: "Subservicio:*",
      component: "InputText",
      name: "nombre",
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
      {!subservicios && (
        <div className="flex h-30rem justify-content-center align-items-center">
          <ProgressSpinner strokeWidth="3" />
        </div>
      )}
      {subservicios ? (
        <div>
          <Table
            value={subservicios}
            header="Subservicios"
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
