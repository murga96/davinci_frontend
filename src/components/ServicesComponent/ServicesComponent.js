import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import axios from "axios";
import { Button } from "primereact/button";
import "./serviceComponent.css";
import {useNavigate} from 'react-router-dom'
import { Loading } from "../ui/LoadingComponent";

export const Services = () => {
  const [services, setServices] = useState(null);
  const navigate = useNavigate()

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
        <Button
          className="p-button-sm bg-orange-500 border-transparent hover:bg-orange-600"
          label="Ver más"
          onClick={() => navigate(`../Servicio/${service?.idServicio}`)}
        />
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
          <p
            className={`${
              service?.nombre.length > 17 ? "h-3rem" : "h-4rem"
            } service-desc`}
            style={{ wordWrap: "break-word" }}
          >
            {service?.descripcionBreve}
          </p>
        </Card>
      </div>
    );
  };

  return (
    <div className="service-background w-screen h-screen  flex justify-content-center align-items-center">
      {!services && (
        <Loading />
      )}
      {services && (
        <Carousel
          className="w-full md:w-9 mx-8"
          header={
            <div>
              <div className="mb-2 flex justify-content-center text-lg sm:text-xl md:text-2xl text-white car-title">
                Conoce nuestros
              </div>
              <div className="mb-6 flex justify-content-center text-4xl sm:text-5xl md:text-7xl text-teal-700 car-title">
                Servicios
              </div>
            </div>
          }
          value={services}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          circular
          autoplayInterval={6000}
          itemTemplate={servicesTemplate}
        />
      )}
    </div>
  );
};
