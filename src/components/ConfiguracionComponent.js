import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";
import { Divider } from "primereact/divider";

export const ConfiguracionComponent = () => {
  const navigate = useNavigate();
  const [whatsApp, setWhatsApp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [correo, setCorreo] = useState("");
  const [facebook, setFacebook] = useState("");
  const [longitud, setLongitud] = useState("");
  const [latitud, setLatitud] = useState("");

  useEffect(() => {
    axios
      .get("configuraciones")
      .then(({ data }) => {
        console.log(data[0]);
        if (data) {
          setCorreo(data[0].correo);
          setWhatsApp(data[0].whatsapp);
          setInstagram(data[0].instagram);
          setFacebook(data[0].facebook);
          setLatitud(data[0].latitud);
          setLongitud(data[0].longitud);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const save = () => {
    axios
      .put("configuraciones", {
        whatsapp: whatsApp,
        correo: correo,
        facebook: facebook,
        instagram: instagram,
        latitud: latitud,
        longitud: longitud,
      })
      .then((resp) => {
        if (resp?.data)
          confirmDialog({
            header: "Información",
            message: "La configuración ha sido guardada exitosamente",
            icon: "pi pi-exclamation-triangle",
            accept: () => navigate(-1),
            rejectClassName: "hidden",
            acceptLabel: "Ok"
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-card p-4">
      <div className="grid">
        <div
          className="col-fixed text-lg text-teal-500 font-semibold sm:mb-3"
          style={{ width: "150px" }}
        >
          Configuración
        </div>
        <div className="col-8"></div>
        <div className="col-12 sm:col-6 md:col-4 mb-3">
          <span className="p-input-icon-left">
            <i className="pi pi-whatsapp" />
            <InputText
              // className="w-11"
              value={whatsApp}
              onChange={(e) => setWhatsApp(e.target.value)}
              placeholder="WhatsApp"
            />
          </span>
        </div>
        <div className="col-12 sm:col-6 md:col-4 mb-3">
          <span className="p-input-icon-left">
            <i className="pi pi-instagram" />
            <InputText
              // className="w-11"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Instagram"
            />
          </span>
        </div>
        <div className="col-12 sm:col-6 md:col-4 mb-3">
          <span className="p-input-icon-left">
            <i className="pi pi-envelope" />
            <InputText
              // className="w-11"
              keyfilter="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Correo"
            />
          </span>
        </div>
        <div className="col-12 sm:col-6 md:col-4 mb-3">
          <span className="p-input-icon-left">
            <i className="pi pi-facebook" />
            <InputText
              // className="w-11"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="Facebook"
            />
          </span>
        </div>
        <Divider className="col-12"/>
        <div
          className="col-fixed text-lg text-teal-500 font-semibold sm:mb-3"
          style={{ width: "200px" }}
        >
          Dirreción del negocio
        </div>
        <div className="col-8"></div>
        <div className="col-12 sm:col-6 md:col-4 mb-3">
          <span className="p-input-float-label">
            <html htmlFor="latitud">Latitud</html>
            <InputText
              id="latitud"
              // className="w-11"
              keyfilter="num"
              value={latitud}
              onChange={(e) => setLatitud(e.target.value)}
              placeholder="Latitud"
            />
          </span>
        </div>
        <div className="col-12 sm:col-6 md:col-4 mb-3">
        <span className="p-input-float-label">
            <html htmlFor="latitud">Latitud</html>
            <InputText
              // className="w-11"
              keyfilter="num"
              value={longitud}
              onChange={(e) => setLongitud(e.target.value)}
              placeholder="Longitud"
            />
          </span>
        </div>
        <div className="col-12 mt-3 md:col-offset-8 md:col-4 lg:col-3 lg:col-offset-8 lg:">
          <Button label="Guardar" onClick={save} className="w-full"></Button>
        </div>
      </div>
    </div>
  );
};
