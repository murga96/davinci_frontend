import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfiguracionComponent } from "./components/ConfiguracionComponent";
import { Home } from "./components/Home";
import { Users } from "./components/Users/User";
import { Subservicios } from "./components/Subservicios";
import { setPrimeReactInitialConfig } from "./components/config";
import { Profesionales } from "./components/Profesionales";
import { Servicios } from "./components/Servicios";

function App() {
  //primereact intial config
  setPrimeReactInitialConfig()
  
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Home/>} >
          <Route path="/configuracion" element={<ConfiguracionComponent/>} />
          <Route path="/usuarios" element={<Users/>} />
          <Route path="/servicios" element={<Servicios/>} />
          <Route path="/subservicios" element={<Subservicios/>} />
          <Route path="/profesionales" element={<Profesionales/>} />

        </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
