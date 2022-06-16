import axios from "axios";
import PrimeReact from "primereact/api";
import { addLocale, locale } from "primereact/api";
import { consoleLog, fireError } from "./utils";

export const setPrimeReactInitialConfig = () => {
  //setting locale
  addLocale("es", {
    accept: "Si",
    addRule: "Agregar regla",
    apply: "Aplicar",
    cancel: "Cancelar",
    choose: "Elegir",
    clear: "Limpiar",
    contains: "Contiene",
    custom: "Defecto",
    dateAfter: "Fecha después de",
    dateBefore: "Fecha anterior a",
    dateFormat: "dd/mm/yy",
    dateIs: "Fecha igual",
    dateIsNot: "Fecha no es igual",
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    emptyFilterMessage: "No se encontraron resultados",
    emptyMessage: "No hay elementos disponibles",
    endsWith: "Termina con",
    equals: "Igual",
    firstDayOfWeek: 1,
    gt: "Mayor que",
    gte: "Mayor igual que",
    lt: "Menor que",
    lte: "Menor igual que",
    matchAll: "Coinciden todos",
    matchAny: "Coinciden algunos",
    medium: "Medio",
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    noFilter: "Sin filtros",
    notContains: "No contiene",
    notEquals: "No igual a",
    passwordPrompt: "Teclee una contraseña",
    reject: "No",
    removeRule: "Elimina regla",
    startsWith: "Comienza con",
    strong: "Fuerte",
    today: "Hoy",
    upload: "Subida",
    weak: "Débil",
    weekHeader: "Semana",
  });
  locale("es");
  //setting ripple effect
  PrimeReact.ripple = true;
};

export const setAxiosConfig = () => {
  //setting default configs for axios
  axios.defaults.baseURL = process.env.REACT_APP_URL_API;
  axios.interceptors.response.use(
    (response) => response,
    ({ response: errorResponse }) => {
      const serverResponse = errorResponse?.data;
      if (serverResponse) {
        // console.log(serverResponse)
        let message = serverResponse.message;
        switch (serverResponse.error) {
          case "QueryFailedError": {
            if (serverResponse.message.includes("UNIQUE"))
              message = `${serverResponse.message
                .split("(")[1]
                .replace(").", "")} existe y no puede ser duplicado.`;
            break;
          }
          case "HttpException": {
            if (serverResponse.message.includes("unique_")) {
              message = `Existen valores a añadir que se encuentran en el sistema y no puede ser duplicados.`;
            }
            break;
          }
          case "NotFoundException":
            message = `La dirección ${
              serverResponse.message.split("ENOTFOUND ")[1]
            } no se puede encontrar. Revise su conexión a internet.`;
            break;
          case "RequestTimeoutException":
            message = `Tiempo de espera agotado. Revise su conexión a internet.`;
            break;
        }
        console.log(serverResponse);
        fireError(message);
      }
    }
  );
};
