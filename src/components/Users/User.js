import React, { useCallback, useEffect, useRef, useState } from "react";
import { FilterMatchMode, FilterService } from "primereact/api";
import * as yup from "yup";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Table } from "../ui/table/Table";
import axios from "axios";
import { confirmDialog } from "primereact/confirmdialog";
import { consoleLog, fireError, fireInfo } from "../utils";
import { Loading } from "../ui/LoadingComponent";
import { useFetch } from "../hooks/useFetch";
import { mutationTypes, useMutation } from "../hooks/useMutation";
import { columnBodyChecker } from "../ui/table/Table";
import { Column } from "primereact/column";
import { Form } from "../ui/form/Form";
import { Field } from "../ui/form/Field";
import { isEmpty } from "lodash";
import { InputText } from "primereact/inputtext";

export const Users = () => {
  const [users, setUsers] = useState(null);
  const [fetch, loading, error] = useFetch("usuarios");
  const [create] = useMutation(mutationTypes.CREATE, "usuarios");
  const [modify] = useMutation(mutationTypes.CREATE, "usuarios");
  const [remove] = useMutation(mutationTypes.REMOVE, "usuarios");
  const [bulkRemove] = useMutation(mutationTypes.BULK_REMOVE, "usuarios");
  const ref = useRef(null);

  const cargarDatos = useCallback(async () => {
    setUsers(await fetch());
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const modifyElement = async (element) => {
    if (await modify(element)) cargarDatos();
  };
  const createElement = async (element) => {
    if (await create(element)) cargarDatos();
  };
  const deleteElement = async (id) => {
    // if (JSON.parse(localStorage.getItem("user")).idUsuario === id) {
    //   fireError("No puede eliminar el usuario actualmente logeado");
    //   return;
    // }
    if (await remove(id)) cargarDatos();
  };

  const deleteSeveralElement = async (arrayId) => {
    if (await bulkRemove(arrayId)) cargarDatos();
  };

  const saveElement = (action, data) => {
    action === "create" ? createElement(data) : modifyElement(data);
  };

  const filters = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    username: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
  let c = [{ field: "username", header: "Nombre de Usuario" }];

  let emptyElement = { username: "" };

  const confirmForcePassword = (elem) => {
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
  const renderForm = (handle, defaultValues) => (
    <Form ref={ref} handle={handle} schema={schema}>
      <Field
        label="Nombre de usuario"
        defaultValue={isEmpty(defaultValues) ? "" : defaultValues["username"]}
        name="username"
        render={(field) => <InputText {...field} />}
      />
    </Form>
  );

  if (loading) return <Loading />;
  if (error) return <div>Something when wrong!!</div>;
  return (
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
      renderForm={renderForm}
      actionSubmit={saveElement}
      emptyElement={emptyElement}
      additionalButtons={[
        [
          <Button
            icon="pi pi-unlock"
            className="p-button-rounded p-button-text mr-2"
            data-pr-tooltip="Forzar contraseña"
          />,
          confirmForcePassword,
        ],
      ]}
    >
      <Column
        field="username"
        header="Nombre de usuario"
        body={columnBodyChecker}
        sortable
        filter
        filterField="username"
      />
    </Table>
  );
};
