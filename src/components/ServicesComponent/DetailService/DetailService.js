import axios from "axios";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../ui/LoadingComponent";
import {ServiceDescription } from "./ServiceDescription";
import { ServiceImage } from "./ServiceImage";
import { SubServicesListBox } from "./SubServicesListBox";

export const DetailService = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [service, setService] = useState(null);
  const param = useParams();

  useEffect(() => {
    console.log("fetching data");
    axios.get(`servicios/${param.idServicio}`).then(({ data }) => {
      if (data) setService(data);
    });
  }, [param]);

  const handleWhatsAppReservation = () => {
    console.log(selectedValues, "selectedValues");
  };

  console.log("DetailService Render");

  return (
    <div className="p-5">
      {!service ? (
        <Loading />
      ) : (
        <>
          <div className="text-teal-500 text-lg sm:text-2xl md:text-4xl lg:text-5xl">
            {service?.nombre}
          </div>
          <ServiceDescription descripcion={service?.descripcion} />
          <div className="grid">
            <div className="col-12 sm:col-6">
              <SubServicesListBox
                subservicios={service?.subservicios}
                selectedSubservicios={selectedValues}
                onChangeSubServiceListBox={setSelectedValues}
              />
            </div>
            <div className="col-12 sm:col-6">
              <ServiceImage imagen={service?.imagen} />
            </div>
          </div>
          <div className="sm:flex justify-content-end">
            <Button
              className="w-full sm:w-3 mt-3"
              disabled={selectedValues?.length === 0}
              label="Reservar"
              icon="pi pi-whatsapp"
              iconPos="left"
              onClick={handleWhatsAppReservation}
            />
          </div>
        </>
      )}
    </div>
  );
};
