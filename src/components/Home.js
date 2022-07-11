import axios from "axios";
import { ListBox } from "primereact/listbox";
import React, { useEffect, useState } from "react";
import { ContactComponent } from "./ContactComponent/ContactComponent";
import { Footer } from "./ContactComponent/Footer/Footer";
import { Hero } from "./Hero/Hero";
import { Profesionals } from "./ProfesionalComponent/ProfesionalComponent";
import { Services } from "./ServicesComponent/ServicesComponent";
import "./Home.css";

export const Home = () => {
  const [configuraciones, setConfiguraciones] = useState(null);
  useEffect(() => {
    axios
      .get("configuraciones")
      .then((resp) => {
        if (resp) setConfiguraciones(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div id="someElement">
      {/* <h1 className="h" id="h">¡Aquí va un título!</h1> */}
      <Hero/>
        <Services />
        <Profesionals />
        <ContactComponent/>
       {configuraciones && <Footer config={configuraciones} />}
    </div>
  );
};
