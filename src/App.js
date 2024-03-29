import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ConfiguracionComponent } from "./components/ConfiguracionComponent";
import { Users } from "./components/Users/User";
import { Subservicios } from "./components/Subservicios";
import {
  setAxiosConfig,
  setPrimeReactInitialConfig,
} from "./components/config";
import { Profesionales } from "./components/Profesionales";
import { Servicios } from "./components/Servicios";
import { OutletNavbar } from "./components/NavBar/OutletNavbar";
import { Home } from "./components/Home";
import { ProfesionalDetailComponent } from "./components/ProfesionalComponent/ProfesionalDetailComponent";
import { DetailService } from "./components/ServicesComponent/DetailService/DetailService";
import { StateProvider } from "./StateContext";
import { initialState, reducer } from "./Reducer";
import ErrorPage from "./components/Error/ErrorPage";

function App() {
  //primereact initial config
  setPrimeReactInitialConfig();
  setAxiosConfig();

  return (
    <div className="App">
      <StateProvider value={initialState} reducer={reducer}>
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/Profesional/Detalle/:idProfesional"
              element={<ProfesionalDetailComponent />}
            />
            <Route path="/Servicio/:idServicio" element={<DetailService />} />
            <Route path="/" element={<OutletNavbar />}>
              <Route
                path="/configuracion"
                element={<ConfiguracionComponent />}
              />
              <Route path="/usuarios" element={<Users />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/subservicios" element={<Subservicios />} />
              <Route path="/profesionales" element={<Profesionales />} />
            </Route>
          </Routes>
        </Router>
      </StateProvider>
    </div>
  );
}

export default App;
