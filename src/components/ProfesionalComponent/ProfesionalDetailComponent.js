import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../NavBar/Navbar";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";
import { ListBox } from "primereact/listbox";
import "./ProfesionalDetailComponent.css";
import { Loading } from "../ui/LoadingComponent";

export const ProfesionalDetailComponent = () => {
  const idProfesional = useParams("idProfesional").idProfesional;
  const [profesionales, setProfesionales] = useState(null);
  const [profesional, setProfesional] = useState(null);

  useEffect(() => {
    axios
      .get(`/profesionales/${idProfesional}`)
      .then((resp) => {
        if (resp) {
          setProfesional(resp.data);
        }
        axios
          .get("/profesionales")
          .then((resp) => {
            if (resp) {
              setProfesionales(resp.data);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Navbar />
      {(!profesional || !profesionales) && (
        <Loading />
      )}
      {profesional && profesionales && (
        <div className="grid profesionales">
          <ListBox
            className="col-12 border-0 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4"
            options={profesionales}
            optionLabel={"nombre"}
            onChange={(e) => {
              setProfesional(e.target.value);
            }}
            listClassName="listbox-list p-0"
          />
          <div className="col-12 sm:col-3">
            <Image
              imageClassName="w-7rem h-7rem sm:w-9rem sm:h-9rem md:w-9rem md:h-9rem border-circle"
              className="flex justify-content-start profesional-image"
              alt="profesional?.nombre"
              preview
              src={profesional?.imagen}
            />
          </div>
          <div className="col-12 sm:col-9 grid">
            <div className="col-12 text-3xl sm:text-5xl text-orange-500">
              {profesional.nombre}
            </div>
            <div className="col-12 text-xl sm:text-2xl text-black-alpha-50">
              {profesional.cargo}
            </div>
            <Divider className="col-2 my-0 sm:col-3" />
            <div className="col-9" />
            <i className="pi pi-envelope col-fixed w-2rem sm:w-1rem sm:mr-2 text-orange-400" />
            <div className="col text-orange-400">{profesional.correo}</div>
            <div className="profesional-desc col-12 text-justify font-italic text-black-alpha-50">
              Cursó estudios de Ingeniería Industrial en la Universidad de
              Holguín y de Producción de Audiovisuales en el ICRT. Formación
              autodidacta. Incursiona en la producción de videos musicales y en
              proyectos de Ficción y Documental, participando en numerosas
              producciones nacionales y foráneas, desempeñándose como productor,
              productor ejecutivo, director de producción, productor de rodaje y
              asistente de dirección. Ha participado en la fundación y
              desarrollo de varios grupos creativos como INXANE Pro-Films y
              Estudio 50. Funda en 2019 el grupo creativo audiovisual i4fims
              junto a Inti Herrera.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
