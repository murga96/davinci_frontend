import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfiguracionComponent } from "./components/ConfiguracionComponent";
import axios from "axios";
import PrimeReact from 'primereact/api';
import { addLocale, locale } from "primereact/api";
import { Home } from "./components/Home";
import { Users } from "./components/Users/User";
import { Subservicios } from "./components/Subservicios";
import { fireError } from "./components/utils";

function App() {
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
  PrimeReact.ripple = true;

  //setting default configs for axios
  axios.defaults.baseURL = "http://localhost:3001/";
  axios.interceptors.response.use((response) => (response), ({response: errorResponse}) => {
    const serverResponse = errorResponse?.data
    if(serverResponse){
      console.log(serverResponse)
      let message = serverResponse.message
      switch (serverResponse.error) {
        case "QueryFailedError":
          message = `${serverResponse.message.split("(")[1].replace(").","")} existe y no puede ser duplicado.`
          break;
      }
      fireError(message)
    } 
    
  })
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Home/>} >
          <Route path="/configuracion" element={<ConfiguracionComponent/>} />
          <Route path="/usuarios" element={<Users/>} />
          <Route path="/servicios" element={<Users/>} />
          <Route path="/subservicios" element={<Subservicios/>} />
          <Route path="/profesionales" element={<Users/>} />

        </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
