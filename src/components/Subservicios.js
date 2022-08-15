import React, { useEffect, useRef, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import * as yup from "yup";
import { columnBodyChecker, Table } from "./ui/table/Table";
import axios from "axios";
import { Loading } from "./ui/LoadingComponent";
import { Column } from "primereact/column";
import { Form } from "../components/ui/form/Form";
import { InputText } from "primereact/inputtext";
import { Field } from "./ui/form/Field";
import { isEmpty } from "lodash";

export const Subservicios = () => {
  const [subservicios, setSubservicios] = useState(null);
  const ref = useRef(null);

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

  const saveElement = (action, data) => {
    action === "create" ? createElement(data) : modifyElement(data);
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
        defaultValue={isEmpty(defaultValues) ? "": defaultValues['nombre'] }
        name="nombre"
        render={(field) => <InputText {...field} />}
      />
    </Form>
  );

  return (
    <>
      {!subservicios && <Loading />}
      {subservicios && (
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
      )}
    </>
  );
};
