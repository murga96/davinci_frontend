import React, { useCallback, useEffect, useRef, useState } from "react";
import { FilterMatchMode, FilterService } from "primereact/api";
import * as yup from "yup";
import { Table } from "./ui/table/Table";
import { Loading } from "./ui/LoadingComponent";
import { mutationTypes, useMutation } from "./hooks/useMutation";
import { useFetch } from "./hooks/useFetch";
import { columnBodyChecker } from "./ui/table/Table";
import { Column } from "jspdf-autotable";
import { Field } from "./ui/form/Field";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { isEmpty } from "lodash";
import { InputTextarea } from "primereact/inputtextarea";
import { Form } from "./ui/form/Form";

export const Profesionales = () => {
  const [profesionales, setProfesionales] = useState(null);
  const [file, setFile] = useState(null);
  const [fetch, loading, error] = useFetch("profesionales");
  const [create] = useMutation(mutationTypes.CREATE, "profesionales");
  const [modify] = useMutation(mutationTypes.MODIFY, "profesionales");
  const [remove] = useMutation(mutationTypes.REMOVE, "profesionales");
  const [bulkRemove] = useMutation(mutationTypes.BULK_REMOVE, "profesionales");
  const ref = useRef(null);

  useEffect(() => {
    cargarDatos();
  }, []);
  const cargarDatos = useCallback(async () => {
    setProfesionales(await fetch());
  }, []);

  const modifyElement = async (element) => {
    console.log(element);
    const formData = new FormData();
    formData.append("idProfesional", element.idProfesional);
    formData.append("nombre", element.nombre);
    formData.append("imagen", file);
    formData.append("descripcion", element.descripcion);
    formData.append("cargo", element.cargo);
    formData.append("correo", element.correo);
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
    console.log(element);
    element.imagen = file;
    const formData = new FormData();
    formData.append("nombre", element.nombre);
    formData.append("imagen", element.imagen);
    formData.append("descripcion", element.descripcion);
    formData.append("cargo", element.cargo);
    formData.append("correo", element.correo);
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
  const saveElement = (action, data) => {
    action === "create" ? createElement(data) : modifyElement(data);
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
  const renderForm = (handle, defaultValues) => (
    <Form ref={ref} handle={handle} schema={schema}>
      <Field
        label="Nombre:*"
        defaultValue={isEmpty(defaultValues) ? "" : defaultValues["nombre"]}
        name="nombre"
        render={(field) => <InputTextarea {...field} />}
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
        label="Descripción:*"
        defaultValue={
          isEmpty(defaultValues) ? "" : defaultValues["descripcion"]
        }
        name="descripcion"
        render={(field) => <InputTextarea {...field} />}
      />
      <Field
        label="Correo:*"
        defaultValue={
          isEmpty(defaultValues) ? "" : defaultValues["correo"]
        }
        name="correo"
        render={(field) => <InputText {...field} />}
      />
      <Field
        label="Cargo:"
        defaultValue={
          isEmpty(defaultValues) ? "" : defaultValues["cargo"]
        }
        name="cargo"
        render={(field) => <InputText {...field} />}
      />
    </Form>
  );

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
  if (loading) return <Loading />;
  if (error) return <div>Something when wrong...</div>;

  return (
    <Table
      value={profesionales}
      header="Profesionales"
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
        field="descripcion"
        header="Descripción"
        body={columnBodyChecker}
        sortable
        filter
        filterField="descripcion"
      />
      <Column
        field="correo"
        header="Correo"
        body={columnBodyChecker}
        sortable
        filter
        filterField="correo"
      />
      <Column
        field="cargo"
        header="Cargo"
        body={columnBodyChecker}
        sortable
        filter
        filterField="cargo"
      />
    </Table>
  );
};
