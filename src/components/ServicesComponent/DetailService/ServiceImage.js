import React from "react";
import { Image } from "primereact/image";

export const ServiceImage = React.memo(({ imagen, alt }) => {
  console.log("ServiceImage Render");
  return <Image imageClassName="w-full" src={imagen} alt={alt}></Image>;
});
