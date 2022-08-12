import React, { useEffect, useState } from "react";
import { GMap } from "primereact/gmap";
import "./Footer.css";
import { loadGoogleMaps, removeGoogleMaps } from "../../utils";

export const Footer = ({ config }) => {
  const [googleMapsReady, setGoogleMapsReady] = useState(false);
  const [overlays, setOverlays] = useState([]);

  //googlemaps
  useEffect(() => {
    loadGoogleMaps(() => {
      setGoogleMapsReady(true);
    });

    return () => {
      removeGoogleMaps();
    };
  }, []);
  const options = {
    center: {
      lat: parseFloat(config[0]?.latitud),
      lng: parseFloat(config[0]?.longitud),
    },
    zoom: 16,
  };
  const onMapReady = (event) => {
    setOverlays([
      //eslint-disable-next-line
      new google.maps.Marker({
        position: {
          lat: parseFloat(config[0]?.latitud),
          lng: parseFloat(config[0]?.longitud),
        },
        title: "DaVinci\nArtes Gráficas",
      }),
    ]);
  };

  return (
    <div
      className="footer grid p-4" /* style={{backgroundColor: "#005F60"}} */
    >
          <div
            className="contact-div col-12 sm:col-6 grid"
          >
            <div className="col-12 flex justify-content-center text-orange-500 ">
              <div className="ml-2 w-10 text-lg text-center sm:text-2xl">Información de contacto</div>
            </div>
            <div className="col-12 sm:col-6 flex justify-content-center md:justify-content-end">
              <i className="text-gray-600 pi pi-whatsapp" />
              <div className="ml-2 w-10 sm:w-auto sm:text-md md:text-lg text-gray-600">
                {config[0]?.whatsapp}
              </div>
            </div>
            <div className="col-12 sm:col-6 flex justify-content-center xl:justify-content-start">
              <i className="text-gray-600 pi pi-envelope" />
              <div className="ml-2 w-10 sm:w-auto sm:text-md md:text-lg text-gray-600">{config[0]?.correo}</div>
            </div>
            <div className="col-12 flex justify-content-center text-orange-500">
              <div className="ml-2 w-10 text-lg text-center sm:text-2xl">
                Síguenos en redes sociales
              </div>
            </div>
            <div className="col-12 flex justify-content-center">
              <a
                className="text-gray-600 pi pi-instagram text-3xl no-underline"
                href={`https://www.instagram.com/${config[0]?.instagram}/`}
              />
              <a
                className="text-gray-600 pi pi-facebook text-3xl ml-3 no-underline"
                href={`https://www.facebook.com/${config[0]?.facebook}`}
              />
            </div>
          </div>
          <div className="col-12 sm:col-6 grid ml-2">
            {/* {googleMapsReady && (
              <GMap
                overlays={overlays}
                onMapReady={onMapReady}
                options={options}
                style={{ width: "100%", minHeight: "220px" }}
              />
            )} */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500.765459630876!2d-82.40474672109035!3d23.121404632532055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88cd7746aa57bbcb%3A0x32a9972d63dc527d!2sApartamento%20Hugo!5e0!3m2!1ses!2scu!4v1657113880563!5m2!1ses!2scu" style={{ width: "100%", minHeight: "220px" }} /* width="600" height="220" */ allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="col-12 w-12 mt-2 sm:text-lg text-sm text-center text-gray-600">
            © 2022 DaVinci Artes Gráficas. Todos los derechos reservados
          </div>
      </div>
  );
};
