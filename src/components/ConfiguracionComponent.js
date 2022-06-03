import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import React, { useEffect, useState } from "react";
import {Image} from "primereact/image"
import {FileUpload} from "primereact/fileupload"
import { Button } from "primereact/button";
import { consoleLog } from "./utils";
// import * as dotenv from "dotenv"

export const ConfiguracionComponent = () => {
  const [name, setName] = useState("my-upload")
  
  const onError = err => {
    console.log("Error", err);
  };
  
  const onSuccess = (res,i) => {
    console.log("Success", res);
    console.log(i);
    setName(res.name)

  };

  return (
    <div>
      {/* <IKContext
        publicKey= process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY
        urlEndpoint= process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT
        transformationPosition="path"
        authenticationEndpoint=`${process.env.REACT_APP_API_URL}/imagekit-io/auth`
      >
        <div className="flex ">
        <IKImage
          src={`https://ik.imagekit.io/u7qql60ut/${name}`}
          transformation={[
            {
              height: "300",
              width: "400",
            },
          ]}
        /> */}
        {/* <Image src={`https://ik.imagekit.io/u7qql60ut/${name}`} alt="image" preview
        imageClassName="w-2 h-2"
        /> */}
        {/* <FileUpload/> */}

        {/* <IKUpload fileName="my-upload" useUniqueFileName={true} responseFields={["tags","customCoordinates"]} onError={onError} 
          onSuccess={onSuccess}  /> */}
        </div>
      // </IKContext>
    // </div>
  );
  
};
