import React, { useEffect, useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { Carousel } from "primereact/carousel";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import axios from "axios";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import "./profesionalComponent.css";

export const Profesionals = () => {
  const [profesionals, setProfesionals] = useState(null);

  useEffect(() => {
    axios.get("profesionales").then((resp) => {
      if (resp) setProfesionals(resp.data);
    });
  }, []);

  const profesionalsTemplate = (profesionals) => {
    const footer = (
      <div className="flex justify-content-end align-items-end">
        <Button className="p-button-sm" label="Ver más" />
      </div>
    );
    return (
      <div className="container flex justify-content-center w-9">
        <div className="flex flex-column">
          <div className="image-div flex justify-content-center">
            <Avatar
              image={profesionals?.imagen}
              // className="mr-2"
              size="xlarge"
              shape="circle"
            />
            {/* <Image
              imageClassName="w-12 h-12rem"
              className="flex justify-content-center"
              alt="profesionals?.nombre"
              src={profesionals?.imagen}
            /> */}
          </div>
          <div className="flex flex-column">
            <Chip
              label={profesionals?.nombre}
              className="mt-3 mb-3 bg-gray-400"
            />
            <Chip
              label={profesionals?.correo}
              icon="pi pi-envelope"
              className="mb-3 bg-gray-500"
            />
            {profesionals.cargo && (
              <Tag rounded value={profesionals?.cargo} severity="success" className="mb-3" />
            )}
          </div>
        </div>
        <div className="m-3 w-12rem h-18rem">
          <p
            className={`${
              profesionals?.nombre.length > 17 ? "h-3rem" : "h-4rem"
            } service-desc text-gray-900 overflow-auto`}
            style={{ wordWrap: "break-word" }}
          >
            {profesionals?.descripcion}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen bg-gray-500 flex justify-content-center align-items-center p-4 pt-8">
      {!profesionals && (
        <div className="flex h-30rem justify-content-center align-items-center">
          <ProgressSpinner strokeWidth="3" />
        </div>
      )}
      <div className="container flex flex-column mt-8 w-full">
        {profesionals &&
          profesionals.length > 0 &&
          profesionals.map((p) => profesionalsTemplate(p))}
      </div>
    </div>
  );
};
