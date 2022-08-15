import React, { useCallback, useEffect, useRef, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import * as yup from "yup";
import { columnBodyChecker, Table } from "./ui/table/Table";
import { Loading } from "./ui/LoadingComponent";
import { Column } from "primereact/column";
import { Form } from "../components/ui/form/Form";
import { InputText } from "primereact/inputtext";
import { Field } from "./ui/form/Field";
import { isEmpty } from "lodash";
import { useFetch } from "./hooks/useFetch";
import { useMutation, mutationTypes } from "./hooks/useMutation";

export const Subservicios = () => {
  const [subservicios, setSubservicios] = useState(null);
  const [fetch, loading, error] = useFetch("subservicios");
  const [create] = useMutation(mutationTypes.CREATE,"subservicios");
  const [modify] = useMutation(mutationTypes.MODIFY,"subservicios");
  const [remove] = useMutation(mutationTypes.REMOVE,"subservicios");
  const [bulkRemove] = useMutation(mutationTypes.BULK_REMOVE,"subservicios");
  const ref = useRef(null);

  const cargarDatos = useCallback(
    async () => {
      setSubservicios(await fetch());
    },
    []
  );

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
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };

  let emptyElement = { nombre: "" };

  //Form
  //React-hook-form
  const schema = yup.object().shape({
    nombre: yup.string().required("Subservicio es requerido"),
  });
  const renderForm = (handle, defaultValues) => (
    <Form ref={ref} handle={handle} schema={schema}>
      <Field
        label="Subservicio"
        defaultValue={isEmpty(defaultValues) ? "" : defaultValues["nombre"]}
        name="nombre"
        render={(field) => <InputText {...field} />}
      />
    </Form>
  );

  if (loading) return <Loading />;
  if (error) return <div>Something when wrong!!</div>;
  return (
    <Table
      value={subservicios}
      header="Subservicios"
      size="small"
      pagination
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
        header="Subservicio"
        body={columnBodyChecker}
        sortable
        filter
        filterField="nombre"
      />
    </Table>
  );
};
