import React, { useEffect, useRef, useState } from "react";
import { FilterMatchMode, FilterService } from "primereact/api";
import * as yup from "yup";
import { ProgressSpinner } from "primereact/progressspinner";
import { Table } from "./ui/Table";
import axios from "axios";
import { MultiSelect } from "primereact/multiselect";
import { consoleLog } from "./utils";

export const Servicios = () => {
  const [servicios, setServicios] = useState(null);
  const [subservicios, setSubservicios] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarSubservicios = () => {
    axios
      .get("subservicios/")
      .then((resp) => {
        if (resp?.data) {
          console.log(resp.data);
          setSubservicios(resp.data);
        }
      })
      .catch((error) => console.log(error.message));
  };
  const cargarDatos = () => {
    axios
      .get("servicios")
      .then((resp) => {
        if (resp) {
          console.log(resp.data);
          setServicios(resp.data);
          cargarSubservicios()
        }
      })
      .catch((error) => console.log(error.message));
  };
  const modifyElement = (element) => {
    console.log(element);
    axios
      .patch("servicios", element)
      .then((resp) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.message));
  };
  const createElement = (element) => {
    axios
      .post("servicios", element)
      .then((resp) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.toJSON()));
  };
  const deleteElement = (id) => {
    axios
      .delete(`servicios/${id}`, id)
      .then((_) => {
        cargarDatos();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const deleteSeveralElement = (arrayId) => {
    axios
      .delete("servicios/", { data: arrayId })
      .then((_) => {
        cargarDatos();
      })
      .catch((error) => console.log(error.message));
  };
  //Table
  FilterService.register("filterArray", (value, filters) => {
    let ret = false;
    if (filters && value && value.length > 0 && filters.length > 0) {
      filters.forEach((filter) => {
        value.forEach((v) => {
          if (filter.nombre === v.nombre) ret = true;
        });
      });
    } else {
      ret = true;
    }
    return ret;
  });

  const RepresentativeFilterTemplate = ({ options, onChange }) => {
    return (
      <MultiSelect
        value={options.value}
        options={subservicios}
        onChange={onChange}
        optionLabel="nombre"
        className="p-column-filter"
      />
    );
  };
  const filters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    descripcion: { value: null, matchMode: FilterMatchMode.CONTAINS },
    descripcionBreve: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "subservicios": { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
  let c = [
    { field: "nombre", header: "Nombre" },
    { field: "descripcionBreve", header: "Descripción breve" },
    { field: "descripcion", header: "Descripción" },
    {
      field: "subservicios",
      header: "Subservicios",
      filterElement: RepresentativeFilterTemplate,
      filterMatchModeOptions: [{ label: "Subservicios", value: "filterArray" }],
      filterField: "subservicios",
    },
  ];

  let emptyElement = {
    nombre: "",
    descripcion: "",
    descripcionBreve: "",
    subservicios: "",
  };

  //Form
  //React-hook-form
  const schema = yup.object().shape({
    nombre: yup.string().required("Nombre es requerido"),
    descripcionBreve: yup.string().max(100, "La descripción breve debe contener menos de 100 carácteres").required("Descripción breve es requerido"),
    descripcion: yup.string().max(250, "La descripción debe contener menos de 250 carácteres").required("Descripción es requerido"),
    subservicios: yup.array().min(1, "Seleccione al menos un subservicio").typeError("Subservicios es requerido"),
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
      id: 2,
      label: "Descripción breve:*",
      component: "InputTextArea",
      name: "descripcionBreve",
      defaultValue: "",
    },
    {
      id: 3,
      label: "Descripción:*",
      component: "InputTextArea",
      name: "descripcion",
      defaultValue: "",
    },
    {
      id: 4,
      label: "Subservicios:*",
      component: "MultiSelect",
      name: "subservicios",
      defaultValue: [],
      props: {
        options: subservicios,
        optionLabel: "nombre",
        placeholder: "Selecciona los subservicios",
      },
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
      {!servicios && (
        <div className="flex h-30rem justify-content-center align-items-center">
          <ProgressSpinner strokeWidth="3" />
        </div>
      )}
      {servicios ? (
        <div>
          <Table
            value={servicios}
            header="Servicios"
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
