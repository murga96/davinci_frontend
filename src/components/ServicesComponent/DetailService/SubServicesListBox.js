import React from "react";
import { ListBox } from "primereact/listbox";

export const SubServicesListBox = ({
  subservicios,
  selectedSubservicios,
  onChangeSubServiceListBox,
}) => {
  console.log("SubServiceListBox Render");
  return (
    <ListBox
      options={subservicios}
      optionLabel="nombre"
      value={selectedSubservicios}
      onChange={(e) => onChangeSubServiceListBox(e.target.value)}
    />
  );
};
