import React, { useCallback, useEffect, useRef, useState } from "react";
import { FilterMatchMode, FilterService } from "primereact/api";
import * as yup from "yup";
import { columnBodyChecker, Table } from "./ui/table/Table";
import axios from "axios";
import { MultiSelect } from "primereact/multiselect";
import { Column } from "primereact/column";
import { Loading } from "./ui/LoadingComponent";
import { mutationTypes, useMutation } from "./hooks/useMutation";
import { useFetch } from "./hooks/useFetch";
import { Form } from "./ui/form/Form";
import { Field } from "./ui/form/Field";
import { isEmpty } from "lodash";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";

export const Servicios = () => {
  const [servicios, setServicios] = useState(null);
  const [subservicios, setSubservicios] = useState(null);
  const [file, setFile] = useState(null);
  const [fetch, loading, error] = useFetch("servicios");
  const [fetchSubservicios, loadingSubservicios, errorSubservicios] =
    useFetch("subservicios");
  const [create] = useMutation(mutationTypes.CREATE, "servicios");
  const [modify] = useMutation(mutationTypes.MODIFY, "servicios");
  const [remove] = useMutation(mutationTypes.REMOVE, "servicios");
  const [bulkRemove] = useMutation(mutationTypes.BULK_REMOVE, "servicios");
  const ref = useRef(null);

  const cargarDatos = useCallback(async () => {
    setServicios(await fetch());
    cargarSubservicios();
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const modifyElement = async (element) => {
    const formData = new FormData();
    formData.append("idServicio", element.idServicio);
    formData.append("descripcionBreve", element.descripcionBreve);
    formData.append("imagen", file);
    formData.append("descripcion", element.descripcion);
    formData.append("nombre", element.nombre);
    formData.append("subservicios", JSON.stringify(element.subservicios));

    if (
      await modify(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    )
      cargarDatos();
  };
  const createElement = async (element) => {
    const formData = new FormData();
    formData.append("nombre", element.nombre);
    formData.append("imagen", file);
    formData.append("descripcion", element.descripcion);
    formData.append("descripcionBreve", element.descripcionBreve);
    formData.append("subservicios", JSON.stringify(element.subservicios));
    if (
      await create(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    )
      cargarDatos();
  };
  const deleteElement = async (id) => {
    if (await remove(id)) cargarDatos();
  };

  const deleteSeveralElement = async (arrayId) => {
    if (await bulkRemove(arrayId)) cargarDatos();
  };

  const cargarSubservicios = async () => {
    setSubservicios(await fetchSubservicios());
  };

  const saveElement = (action, data) => {
    action === "create" ? createElement(data) : modifyElement(data);
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

  const representativeFilterTemplate = ( options ) => {
    return (
      <MultiSelect
        value={options.value}
        options={subservicios}
        onChange={(e) => {
          return options.filterApplyCallback(e.value)
          }}
        optionLabel="nombre"
        className="p-column-filter"
        maxSelectedLabels={1}
      />
    );
  };

  //Template
  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.imagen}`}
        alt={rowData.image}
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
    descripcionBreve: { value: null, matchMode: FilterMatchMode.CONTAINS },
    subservicios: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };

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
    descripcionBreve: yup
      .string()
      .max(100, "La descripción breve debe contener menos de 100 carácteres")
      .required("Descripción breve es requerido"),
    descripcion: yup
      .string()
      .max(250, "La descripción debe contener menos de 250 carácteres")
      .required("Descripción es requerido"),
    subservicios: yup
      .array()
      .min(1, "Seleccione al menos un subservicio")
      .typeError("Subservicios es requerido"),
    imagen: yup.object().nullable("Debe seleccionar una imagen"),
  });
  const renderForm = (handle, defaultValues) => (
    <Form ref={ref} handle={handle} schema={schema}>
      <Field
        label="Nombre:*"
        defaultValue={isEmpty(defaultValues) ? "" : defaultValues["nombre"]}
        name="nombre"
        render={(field) => <InputText {...field} />}
      />
      <Field
        label="Imagen:*"
        defaultValue={isEmpty(defaultValues) ? "" : defaultValues["imagen"]}
        name="imagen"
        render={(field) => (
          <FileUpload
            {...field}
            accept="image/*"
            customUpload
            onSelect={(e) => {
              setFile(e.files[0]);
            }}
            uploadOptions={{ className: "hidden" }}
          />
        )}
      />
      <Field
        label="Descripción breve:*"
        defaultValue={
          isEmpty(defaultValues) ? "" : defaultValues["descripcionBreve"]
        }
        name="descripcionBreve"
        render={(field) => <InputTextarea {...field} />}
      />
      <Field
        label="Descripción:*"
        defaultValue={
          isEmpty(defaultValues) ? "" : defaultValues["descripcion"]
        }
        name="descripcion"
        render={(field) => <InputTextarea {...field} />}
      />
      <Field
        label="Subservicios:*"
        defaultValue={
          isEmpty(defaultValues) ? "" : defaultValues["subservicios"]
        }
        name="subservicios"
        render={(field) => (
          <MultiSelect
            {...field}
            options={subservicios}
            optionLabel="nombre"
            placeholder="Selecciona los subservicios"
          />
        )}
      />
    </Form>
  );
  if (loading || loadingSubservicios) return <Loading />;
  if (error || errorSubservicios) return <div>Something when wrong!!</div>;
  return (
    <Table
      value={servicios}
      header="Servicios"
      size="small"
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
      renderForm={renderForm}
      actionSubmit={saveElement}
      emptyElement={emptyElement}
    >
      <Column
        field="nombre"
        header="Nombre"
        body={columnBodyChecker}
        sortable
        filter
        filterField="nombre"
      />
      <Column
        field="imagen"
        header="Imagen"
        body={imageBodyTemplate}
        sortable
      />
      <Column
        field="descripcionBreve"
        header="Descripción breve"
        body={columnBodyChecker}
        sortable
        filter
        filterField="descripcionBreve"
      />
      <Column
        field="descripcion"
        header="Descripción"
        body={columnBodyChecker}
        sortable
        filter
        filterField="descripcion"
      />
      <Column
        field="subservicios"
        header="Subservicios"
        body={columnBodyChecker}
        sortable
        filter
        showFilterMenu={false} 
        filterField="subservicios"
        filterElement={representativeFilterTemplate}
        filterMatchMode={[{ label: "Subservicios", value: "filterArray" }]}
      />
    </Table>
  );
};
