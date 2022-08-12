import React, { useRef } from "react";
import { Form } from "../ui/Form";
import * as yup from 'yup'
import "./ContactComponent.css"
import axios from "axios";
import {fireError, fireInfo} from "../utils"

export const ContactComponent = () => {
  const formRef = useRef(null)

 const sendEmail = (data) => {
    console.log(data)

    axios.post("mail", data).then((response)=>{
      console.log(response)
        if (response.data) {
          formRef?.current.resetForm()
          fireInfo("El mensaje fue enviado correctamente.");
        } else {
          fireError("El mensaje ha fallado en enviarse.")
        }
      })

 }
  const schema = yup.object().shape({
    nombre: yup.string().required("Nombre es requerido"),
    apellidos: yup.string().required("Apellidos es requerido"),
    correo: yup.string().email("Correo debe ser un correo válido").required("Correo es requerido"),
    telefono: yup.string().required("Teléfono es requerido"),
    mensaje: yup.string().required("Mensaje es requerido"),
  });
  let dataStruct = [
    {
      id: 2,
      // label: "Nombre:",
      component: "InputText",
      name: "nombre",
      defaultValue: "",
      fieldLayout: {className: "col-12 sm:col-6"},
      props: { 
          placeholder: "Nombre",
      }
    },
    {
      id: 2,
      component: "InputText",
      name: "apellidos",
      defaultValue: "",
      fieldLayout: {className: "col-12 sm:col-6 "},
      props: { 
        placeholder: "Apellidos",
    }
    },
    {
      id: 2,
      component: "InputText",
      name: "correo",
      defaultValue: "",
      fieldLayout: {className: "col-12 sm:col-6"},
      props: { 
        placeholder: "Correo",
    }
    },
    {
      id: 2,
      // label: "Teléfono:",
      component: "InputText",
      name: "telefono",
      defaultValue: "",
      fieldLayout: {className: "col-12 sm:col-6"},
      props: { 
        placeholder: "Teléfono",
    }
    },
    {
      id: 2,
      // label: "Mensaje:",
      component: "InputTextArea",
      name: "mensaje",
      defaultValue: "",
      props: {
          rows: 8,
          placeholder: "Escríbenos un mensaje",
      },
      fieldLayout: {className: "col-12"}
    },
  ];
  const formProps = {
    data: dataStruct,
    schema: schema,
    handle: sendEmail,
    buttonsNames: [["Enviar", "p-button-raised bg-orange-500 text-white hover:bg-orange-600"]],
    formLayout: {className: "grid"}
  };
  return <div className="div-contact flex justify-content-center align-items-center w-screen">
      <div className="contact p-card px-4 py-6 sm:px-6 md:px-7 lg:px-8 w-9 lg:w-6  bg-teal-200" >
      <div className="mb-4 sm:mb-5 flex justify-content-center text-3xl sm:text-5xl md:text-6xl text-white-alpha-90">
          Contáctenos
      </div>
      <Form
        ref={formRef}
        data={formProps?.data}
        schema={formProps?.schema}
        handle={formProps?.handle}
        buttonsNames={formProps?.buttonsNames}
        formLayout={formProps?.formLayout}
      />
      </div>
  </div>;
};
