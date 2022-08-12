import React, { useEffect, useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import axios from "axios";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import "./profesionalComponent.css";
import { useNavigate } from "react-router-dom";
import { Loading } from "../ui/LoadingComponent";

export const Profesionals = () => {
  const [profesionals, setProfesionals] = useState(null);
  const navigate = useNavigate()

  const responsiveOptions = [
    {
      breakpoint: "1100px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "920px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    axios.get("profesionales").then((resp) => {
      if (resp) setProfesionals(resp.data);
    });
    window.screen.addEventListener("orientationchange", function () {
      console.log(
        "The orientation of the screen is: " + window.screen.orientation
      );
    });
  }, []);

  const profesionalsTemplate = (profesionals) => {
    return (
      <div className="flex flex-column align-items-center mx-8 my-3 cursor-pointer" onClick={() => navigate(`/../Profesional/Detalle/${profesionals.idProfesional}`)}>
        <Image
          imageClassName="w-7rem h-7rem sm:w-9rem sm:h-9rem md:w-11rem md:h-11rem profesional-image border-circle"
          className="flex justify-content-center"
          alt="profesionals?.nombre"
          src={profesionals?.imagen}
        />
        <div className="mt-3 text-xl md:text-2xl lg:3xl text-gray-800">
          {profesionals?.nombre}
        </div>
        <Tag
          rounded
          value={profesionals?.cargo}
          className="mt-3 bg-orange-400 text-white text-xs sm:text-sm"
        />
      </div>
    );
  };

  return (
    <div className="w-screen h-screen flex justify-content-center align-items-center">
      {!profesionals && (
        <Loading />
      )}
      {profesionals && (
        <Carousel
          className="w-full md:w-11 mx-8"
          containerClassName="profesional-car"
          indicatorsContentClassName="profesional-car"
          header={
            <div>
              <div className="mb-8 flex justify-content-center text-4xl sm:text-5xl md:text-7xl text-orange-700">
                Nuestro equipo
              </div>
            </div>
          }
          value={profesionals}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          circular
          // autoplayInterval={6000}
          itemTemplate={profesionalsTemplate}
        />
      )}
    </div>
  );
};
