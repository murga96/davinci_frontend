import React from "react";
import HeroSlider, { Slide, Nav, OverlayContainer } from "hero-slider";
import Wrapper from "../UI/Wrapper/Wrapper";
import { Navbar } from "../../NavBar/Navbar";
import car3 from "./../../../assets/images/car3.jpg";
// import car2 from "./../../../assets/images/car2.jpg";
import car4 from "./../../../assets/images/car4.jpg";
import { Button } from "primereact/button";

const BasicSlider = () => {
  return (
    <HeroSlider
      slidingAnimation="fade"
      orientation="horizontal"
      initialSlide={1}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.33)",
      }}
      settings={{
        slidingDuration: 2000,
        slidingDelay: 100,
        sliderFadeInDuration: 10,
        shouldAutoplay: true,
        shouldDisplayButtons: false,
        autoplayDuration: 5000,
        height: "100vh",
      }}
    >
      <OverlayContainer>
        <Navbar homeNavBar={true} />
        <Wrapper>
          <div className="w-full mb-5 text-center text-black-alpha-80 text-5xl lg:text-7xl font-medium">
            Tienda de Artes Gráficas
          </div>
          <div className="w-full lg:w-9 text-center text-black-alpha-80 text-2xl font-normal">
            Diseño gráfico de papelería empresarial, documentos profesionales, soportes publicitarios, entre otros
          </div>
          <Button className="mt-6" label="Contáctenos" />
        </Wrapper>
      </OverlayContainer>
      <Slide
        background={{
          backgroundImage: car3,
          backgroundAttachment: "fixed",
        }}
      />
      <Slide
        background={{
          backgroundImage: car4,
          backgroundAttachment: "fixed",
        }}
      />

    </HeroSlider>
  );
};

export default BasicSlider;
