import "primeflex/primeflex.css";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/ui/Form";
import axios from "axios";
import {fireError} from "./../components/utils"
import { consoleLog } from "../utils";
// import { actionTypes } from "../../Reducer";

export const ChangePassword = () => {
  const navigate = useNavigate();

  //React-hook-form
  const schema = yup.object().shape({
    password: yup.string().required("Contraseña es requerida"),
    newPassword: yup
      .string()
      .required("Nueva contraseña es requerida")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Contraseña nueva debe tener al menos 8 carácteres, mayúsculas y minúsculas y carácteres especiales"
      ),
    newPasswordConfirm: yup
      .string()
      .required("Confirmar nueva contraseña es requerido")
      .oneOf([yup.ref("newPassword"), null], "Las contraseñas deben coincidir"),
  });

  const handle = ({ password, newPassword }) => {
    const body = {
      passwordOld: password,
      passwordNew: newPassword,
      username: JSON.parse(localStorage.getItem("user")).userName,
    };
    consoleLog(body);
    axios
      .post("usuario_controller/cambiarContrasena", body)
      .then((resp) => {
        if(resp?.data){
          navigate(-1)
        }
      })
      .catch((error) => fireError(error));
  };
  let dataStruct = [
    {
      id: 1,
      label: "Contraseña vieja*",
      component: "Password",
      name: "password",
      defaultValue: "",
      props: { feedback: false },
      fieldLayout: { className: "col-12" },
    },
    {
      id: 2,
      label: "Contraseña nueva*",
      component: "Password",
      name: "newPassword",
      defaultValue: "",
      fieldLayout: { className: "col-12" },
      props: { feedback: false },
    },
    {
      id: 3,
      label: "Confirmar contraseña nueva*",
      component: "Password",
      name: "newPasswordConfirm",
      defaultValue: "",
      fieldLayout: { className: "col-12" },
      props: { feedback: false },
    },
  ];
  const formProps = {
    data: dataStruct,
    schema: schema,
    buttonsNames: ["Aceptar"],
  };
  return (
    <div className="flex flex-column align-items-center justify-content-center h-screen">
      <div className="surface-card py-6 px-6 xl:px-6 lg:px-4 md:px-4 sm:px-2 shadow-2 border-round xl:w-30rem lg:w-30rem md:w-30rem sm:w-30rem">
        <Form
          data={formProps.data}
          schema={formProps.schema}
          handle={handle}
          buttonsNames={formProps.buttonsNames}
        />
      </div>
    </div>
  );
};
