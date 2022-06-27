import React, { useEffect, useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { Carousel } from "primereact/carousel";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import axios from "axios";
import { Button } from "primereact/button";
import "./serviceComponent.css";

export const Services = () => {
  const [services, setServices] = useState(null);

  useEffect(() => {
    axios.get("servicios").then((resp) => {
      if (resp) setServices(resp.data);
    });
  }, []);

  const responsiveOptions = [
    // {
    //   breakpoint: "1200px",
    //   numVisible: 5,
    //   numScroll: 5,
    // },
    {
      breakpoint: "1100px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "920px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const servicesTemplate = (service) => {
    const header = (
      <Image
        imageClassName="w-12 service-image"
        className="flex justify-content-center"
        alt="service?.nombre"
        src={service?.imagen}
      />
    );
    const footer = (
      <div className="flex justify-content-end align-items-end">
        <Button className="p-button-sm" label="Ver más"/>
      </div>
    );
    return (
      <div className="flex justify-content-center">
        <Card
          className="m-3 w-12rem h-18rem"
          header={header}
          footer={footer}
          subTitle={service?.nombre}
        >
          <p className={`${service?.nombre.length > 17 ? "h-3rem" : "h-4rem"} service-desc`} style={{wordWrap: "break-word"}}>
          {service?.descripcionBreve}
        </p>
        </Card>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen bg-orange-400 flex justify-content-center align-items-center">
      {!services && (
        <div className="flex h-30rem justify-content-center align-items-center">
          <ProgressSpinner strokeWidth="3" />
        </div>
      )}
      {services && (
        <Carousel
          className="w-full md:w-9 mx-8"
          header={
            <div className="mb-6 flex justify-content-center text-4xl sm:text-5xl md:text-7xl text-white-alpha-90 car-title">
              Servicios
            </div>
          }
          value={services}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          circular
          autoplayInterval={3000}
          itemTemplate={servicesTemplate}
        />
      )}
    </div>
  );
};
