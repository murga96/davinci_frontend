import React from "react";

export const ServiceDescription = React.memo(({ descripcion }) => {
  console.log("ServiceDescription Render");
  return <div className="my-6 text-lg text-black-alpha-60">{descripcion}</div>;
});
